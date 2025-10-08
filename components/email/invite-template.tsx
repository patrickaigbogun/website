import {
	Body,
	Button,
	Container,
	Hr,
	Html,
	Section,
	Text,
} from '@react-email/components';

export type InviteTemplateProps = {
	new: boolean;
	inviteUrl: string;
	teamName?: string;
	inviterName?: string;
};

export default function InviteTemplate({
	new: isNew,
	inviteUrl,
	teamName,
	inviterName,
}: InviteTemplateProps) {
	return (
		<Html>
			<Body
				style={{
					background: '#f9f9f9',
					fontFamily: 'sans-serif',
					color: '#222',
				}}
			>
				<Container
					style={{
						maxWidth: 480,
						margin: '40px auto',
						background: '#fff',
						borderRadius: 8,
						boxShadow: '0 2px 8px #0001',
						padding: 32,
					}}
				>
					<Section>
						<Text
							style={{
								fontSize: 24,
								fontWeight: 700,
								marginBottom: 8,
							}}
						>
							{isNew
								? 'You’re invited to join ' +
									(teamName || 'our team')
								: 'Join ' + (teamName || 'your team')}
						</Text>
						<Text style={{ fontSize: 16, margin: '16px 0' }}>
							{isNew ? (
								<>
									{inviterName
										? `${inviterName} has invited you to join ${teamName || 'a team'} on our platform.`
										: 'You have been invited to join a team on our platform.'}
									<br />
									Click below to create your account and get
									started.
								</>
							) : (
								<>
									{inviterName
										? `${inviterName} has added you to the team ${teamName || ''}.`
										: 'You have been added to a team.'}
									<br />
									Click below to accept your invitation and
									join the team.
								</>
							)}
						</Text>
						<Button
							href={inviteUrl}
							style={{
								background: '#2563eb',
								color: '#fff',
								fontWeight: 600,
								fontSize: 16,
								borderRadius: 6,
								padding: '12px 24px',
								textDecoration: 'none',
								margin: '24px 0',
								display: 'inline-block',
							}}
						>
							{isNew
								? 'Create your account'
								: 'Accept invitation'}
						</Button>
						<Hr />
						<Text
							style={{
								fontSize: 12,
								color: '#888',
								marginTop: 24,
							}}
						>
							If you did not expect this invitation, you can
							safely ignore this email.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
