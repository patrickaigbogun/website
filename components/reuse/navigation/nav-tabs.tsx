/**
 * NavTabs: Accessible, themeable navigation tabs using Radix NavigationMenu and Tailwind.
 *
 * - Each tab can be a dropdown (with content) or a simple link (no content).
 * - Active tab is underlined (open or route match).
 * - Link-only tabs do not render a dropdown panel.
 * - Use NavTabRoot as the container, NavTabItem for each tab, and NavTabContent for custom panels.
 *
 * Example usage:
 * <NavTabRoot>
 *   <NavTabItem label="Recent">Panel content</NavTabItem>
 *   <NavTabItem label="Popular" href="#popular" />
 * </NavTabRoot>
 */
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { NavigationMenu } from 'radix-ui';
import { ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';

/**
 * Base props for a navigation tab item.
 */
interface BaseNavTabItemProps {
	/** Tab label (text or node) */
	label: React.ReactNode;
	/** Extra class for the tab trigger */
	className?: string;
	/** Extra class for the dropdown panel */
	contentClassName?: string;
	/** Disable underline for this tab */
	underline?: boolean;
}

/**
 * Tab with dropdown panel (shows content in a menu).
 */
interface NavTabItemWithPanel extends BaseNavTabItemProps {
	/** Content for the dropdown panel */
	children: React.ReactNode;
	/** Do not use href if using children */
	href?: never;
}

/**
 * Tab as a simple link (no dropdown panel).
 */
interface NavTabItemLink extends BaseNavTabItemProps {
	/** No children: renders as a link */
	children?: undefined;
	/** Link destination */
	href: string;
}

/**
 * Props for NavTabItem (union: dropdown or link).
 */
export type NavTabItemProps = NavTabItemWithPanel | NavTabItemLink;

/**
 * NavTabRoot: Container for navigation tabs. Place NavTabItem as children.
 */
export const NavTabRoot = ({
	className = '',
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<NavigationMenu.Root
		className={cn('relative flex flex-col items-stretch', className)}
	>
		<NavigationMenu.List className='flex flex-row bg-stone-500/20 backdrop:filter backdrop-blur-md space-x-5 px-3 py-[6px] items-center rounded-full'>
			{children}
		</NavigationMenu.List>
		<NavigationMenu.Viewport
			className={cn(
				'absolute left-0 top-full z-[60] mt-3 origin-top overflow-hidden rounded-xl border border-border',
				'bg-bg/95 backdrop-blur-md shadow-xl',
				'data-[state=open]:animate-in data-[state=closed]:animate-out',
				'transition-[width,height] duration-200 ease-out',
				'w-[var(--radix-navigation-menu-viewport-width)] h-[var(--radix-navigation-menu-viewport-height)]'
			)}
		/>
	</NavigationMenu.Root>
);

/**
 * NavTabItem: A single tab, either as a dropdown (with children) or a link (with href).
 *
 * @param label Tab label (text or node)
 * @param children Dropdown panel content (if present)
 * @param href Link destination (if no children)
 * @param underline Show underline for active/open tab
 * @param className Extra class for tab trigger
 * @param contentClassName Extra class for dropdown panel
 */
export const NavTabItem = ({
	label,
	children,
	className = '',
	contentClassName = '',
	underline = true,
	href,
}: NavTabItemProps) => {
	const pathname = usePathname();
	const isLink = !children || !!href;
	const activeByRoute = useMemo(
		() => (href ? pathname === href : false),
		[pathname, href]
	);

	const baseTriggerClasses = cn(
		'group/navtab relative inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold',
		'text-text select-none outline-none transition-colors',
		underline && [
			'after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:rounded-full after:bg-primary',
			'after:origin-center after:scale-x-0 after:transition-transform after:duration-200',
			'data-[state=open]:after:scale-x-100 data-[active=true]:after:scale-x-100 hover:after:scale-x-100',
		]
	);

	if (isLink && href) {
		return (
			<NavigationMenu.Item className={cn('relative', className)}>
				<NavigationMenu.Link asChild active={activeByRoute}>
					<a
						href={href}
						data-active={activeByRoute ? 'true' : undefined}
						className={baseTriggerClasses}
					>
						{label}
					</a>
				</NavigationMenu.Link>
			</NavigationMenu.Item>
		);
	}

	return (
		<NavigationMenu.Item className={cn('relative', className)}>
			<NavigationMenu.Trigger className={baseTriggerClasses}>
				{label}
			</NavigationMenu.Trigger>
			<NavigationMenu.Content
				className={cn(
					'w-80 p-4 rounded-xl border border-border bg-bg/95 backdrop-blur-md shadow-lg',
					'data-[motion=from-start]:animate-slide-in-left data-[motion=from-end]:animate-slide-in-right',
					'data-[motion=to-start]:animate-slide-out-left data-[motion=to-end]:animate-slide-out-right',
					contentClassName
				)}
			>
				{children}
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	);
};

/**
 * NavTabContent: Custom content panel for advanced use (optional).
 */
export const NavTabContent = forwardRef<
	HTMLDivElement,
	ComponentPropsWithoutRef<typeof NavigationMenu.Content>
>(function NavTabContent({ className = '', ...props }, ref) {
	return (
		<NavigationMenu.Content
			ref={ref}
			className={cn(
				'w-80 p-4 rounded-xl border border-border bg-bg/95 backdrop-blur-md shadow-lg',
				className
			)}
			{...props}
		/>
	);
});
