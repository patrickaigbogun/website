import { ChildProcess, spawn } from 'child_process';
import chokidar from 'chokidar';
import path from 'path';

const SERVICES_DIR = path.resolve('services');
const CONFIG_DIR = path.resolve('config');

let workerProcess: ChildProcess | null = null;
let restarting = false;
let restartTimer: NodeJS.Timeout | null = null;

const RESTART_DEBOUNCE_MS = parseInt(
	process.env.WORKER_WATCH_DEBOUNCE_MS ?? '400',
	10
);
const FORCE_KILL_TIMEOUT_MS = parseInt(
	process.env.WORKER_FORCE_KILL_TIMEOUT_MS ?? '2000',
	10
);

function startWorker() {
	console.log('starting worker process...');
	workerProcess = spawn('tsx', ['scripts/worker.ts'], {
		stdio: 'inherit',
		cwd: process.cwd(),
	});

	workerProcess.on('exit', code => {
		console.log(` worker process exited with code ${code}`);
		// If it exited unexpectedly while we weren't intentionally restarting, consider auto-restart
		if (!restarting) {
			console.log('worker exited; restarting...');
			safeRestartNow();
		}
	});

	workerProcess.on('error', err => {
		console.error('failed to start worker process:', err);
	});
}

function safeRestartNow() {
	if (restarting) return; // prevent overlapping restarts
	restarting = true;
	if (workerProcess) {
		console.log('stopping current worker process...');
		const proc = workerProcess;
		workerProcess = null;
		proc.kill('SIGTERM');
		// Force-kill if it doesn't exit in time
		const killTimer = setTimeout(() => {
			try {
				// Some platforms may not support SIGKILL; ignore errors
				// @ts-ignore
				proc.kill('SIGKILL');
			} catch {}
		}, FORCE_KILL_TIMEOUT_MS);
		proc.once('exit', () => {
			clearTimeout(killTimer);
			restarting = false;
			startWorker();
		});
	} else {
		restarting = false;
		startWorker();
	}
}

function scheduleRestart() {
	if (restartTimer) clearTimeout(restartTimer);
	restartTimer = setTimeout(() => {
		restartTimer = null;
		safeRestartNow();
	}, RESTART_DEBOUNCE_MS);
}

console.log('watching services and config for changes...');
console.log('watching services and config for changes...');

chokidar
	.watch([SERVICES_DIR, CONFIG_DIR], {
		ignored: [
			'**/node_modules/**',
			'**/*.log',
			'**/*.tmp',
			'**/*.map',
			'**/*.d.ts',
		],
		persistent: true,
		ignoreInitial: true, // don't trigger on initial scan
	})
	.on('all', (event, filePath) => {
		if (
			event === 'add' ||
			event === 'change' ||
			event === 'unlink' ||
			event === 'addDir' ||
			event === 'unlinkDir'
		) {
			console.log(`${event}: ${filePath}`);
			scheduleRestart();
		}
	});

// Start the worker initially
startWorker();

// Handle process termination
for (const sig of ['SIGINT', 'SIGTERM'] as const) {
	process.on(sig, () => {
		if (workerProcess) workerProcess.kill('SIGTERM');
		process.exit(0);
	});
}
