/**
 * List components for vertical/horizontal timelines and tree navigation.
 *
 * Features
 * - Vertical or horizontal layout
 * - Optional connector lines between items
 * - Custom bullet per item or a default bullet
 * - Collapsible sections (click header to toggle)
 * - Optional accordion behavior (only one section open at a time)
 * - Accessible by keyboard (Enter/Space toggles) and ARIA attributes
 *
 * Usage
 * <List collapsible defaultCollapsed accordion>
 *   <List.Item>
 *     <div className="flex items-center gap-2">
 *       <Icon /> <span>Docs</span>
 *     </div>
 *     <List>
 *       <List.Item>API Reference</List.Item>
 *       <List.Item>Components</List.Item>
 *     </List>
 *   </List.Item>
 * </List>
 */
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

/**
 * Props for an individual list item.
 */
interface ListItemProps {
	/** Item content; can include a nested <List> for tree structures. */
	children: React.ReactNode;
	/** Optional custom bullet element for this item. */
	bullet?: React.ReactNode;
	/** Additional className applied to the li container. */
	className?: string;
}

/**
 * Props for the List component.
 */
interface ListProps {
	/** One or more <List.Item> children. Nested <List> inside an item creates a tree. */
	children: React.ReactNode;
	/** Additional className for the root <ul>. */
	className?: string;
	/** Layout mode; vertical shows items in a column (default). */
	orientation?: 'vertical' | 'horizontal';
	/** Whether to render connector lines between items (default: true). */
	showConnector?: boolean;
	/** className for connector lines. */
	connectorClassName?: string;
	/** className for the bullet container. */
	bulletClassName?: string;
	/** className applied to each item row. */
	itemClassName?: string;
	/** Default bullet element used when item doesn't specify one. */
	defaultBullet?: React.ReactNode;
	/** Enable header click to expand/collapse nested lists (default: true). */
	collapsible?: boolean;
	/** Start items collapsed (true) or expanded (false). */
	defaultCollapsed?: boolean;
	/**
	 * @deprecated No visible carets are rendered anymore. This prop is kept for API compatibility
	 * but has no effect.
	 */
	caretClassName?: string;
	/** When true, only one top-level item is open at a time. */
	accordion?: boolean;
}

/**
 * A single list item. Use inside <List> and optionally nest another <List> inside for trees.
 */
const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
	({ children, bullet, className, ...props }, ref) => {
		return (
			<li ref={ref} className={cn('list-item', className)} {...props}>
				{children}
			</li>
		);
	}
);

ListItem.displayName = 'ListItem';

/**
 * List renders a vertical or horizontal list with optional bullets, connectors, and collapsible sections.
 */
const List = React.forwardRef<HTMLUListElement, ListProps>(
	(
		{
			children,
			className,
			orientation = 'vertical',
			showConnector = true,
			connectorClassName,
			bulletClassName,
			itemClassName,
			defaultBullet = <div className='w-2 h-2 bg-primary rounded-full' />,
			collapsible = true,
			defaultCollapsed = true,
			accordion = false,
			...props
		},
		ref
	) => {
		const childrenArray = React.Children.toArray(children);
		// Track which top-level item is open in accordion mode
		const [openIndex, setOpenIndex] = React.useState<number | null>(
			defaultCollapsed ? null : 0
		);

		if (orientation === 'horizontal') {
			return (
				<ul
					ref={ref}
					className={cn('flex items-center', className)}
					{...props}
				>
					{childrenArray.map((child, index) => {
						if (React.isValidElement<ListItemProps>(child)) {
							const bullet = child.props.bullet || defaultBullet;

							return (
								<React.Fragment key={index}>
									<li
										className={cn(
											'flex items-center',
											itemClassName
										)}
									>
										<div
											className={cn(
												'flex-shrink-0',
												bulletClassName
											)}
										>
											{bullet}
										</div>
										<div className='ml-3'>
											{child.props.children}
										</div>
									</li>

									{/* Connector line */}
									{showConnector &&
										index < childrenArray.length - 1 && (
											<div
												className={cn(
													'flex-1 h-0.5 bg-border mx-4 min-w-8',
													connectorClassName
												)}
											/>
										)}
								</React.Fragment>
							);
						}
						return child;
					})}
				</ul>
			);
		}

		const ItemRow: React.FC<{
			isLast: boolean;
			bullet: React.ReactNode;
			header: React.ReactNode;
			nested?: React.ReactNode;
			// Controlled open when accordion=true
			openControlled?: boolean;
			onToggle?: () => void;
		}> = ({ isLast, bullet, header, nested, openControlled, onToggle }) => {
			const [uncontrolledOpen, setUncontrolledOpen] =
				React.useState(!defaultCollapsed);
			const hasNested = !!nested;
			const canToggle = collapsible && hasNested;
			const open =
				openControlled !== undefined
					? openControlled
					: uncontrolledOpen;
			const nestedId = React.useId();
			const nestedRef = React.useRef<HTMLDivElement>(null);

			const handleToggle = () => {
				if (!canToggle) return;
				if (onToggle) onToggle();
				else setUncontrolledOpen(v => !v);
			};

			return (
				<li
					className={cn(
						'relative flex',
						!isLast && 'pb-4',
						itemClassName
					)}
				>
					{/* Bullet */}
					<div
						className={cn(
							'flex-shrink-0 z-10 flex items-center justify-center w-6 h-6',
							bulletClassName
						)}
					>
						{bullet}
					</div>

					{/* Content */}
					<div className='ml-3 flex-1'>
						<div
							className={cn(
								'flex items-start rounded-md px-2 py-1 -mx-2 -my-1 transition-colors outline-none',
								canToggle &&
									'cursor-pointer select-none active:bg-borderMuted',
								canToggle && (open ? 'bg-borderMuted' : '')
							)}
							data-state={
								canToggle
									? open
										? 'open'
										: 'closed'
									: undefined
							}
							onClick={canToggle ? handleToggle : undefined}
							onKeyDown={
								canToggle
									? e => {
											if (
												e.key === 'Enter' ||
												e.key === ' '
											) {
												e.preventDefault();
												handleToggle();
											}
										}
									: undefined
							}
							role={canToggle ? 'button' : undefined}
							aria-expanded={canToggle ? open : undefined}
							aria-controls={canToggle ? nestedId : undefined}
							tabIndex={canToggle ? 0 : undefined}
						>
							<div className='min-w-0'>{header}</div>
						</div>
						{/* Nested list */}
						{hasNested && (
							<div
								ref={nestedRef}
								id={nestedId}
								className={cn(
									'mt-2 overflow-hidden transition-all duration-500 ease-in-out',
									!open && 'max-h-0 opacity-0',
									open && 'max-h-[1000px] opacity-100'
								)}
							>
								{nested}
							</div>
						)}
					</div>

					{/* Connector line */}
					{showConnector && !isLast && (
						<div
							className={cn(
								'absolute left-[11px] w-0.5 bg-border',
								'top-[24px] bottom-0',
								connectorClassName
							)}
						/>
					)}
				</li>
			);
		};

		// Vertical orientation (default)
		return (
			<ul ref={ref} className={cn('relative', className)} {...props}>
				{childrenArray.map((child, index) => {
					if (React.isValidElement<ListItemProps>(child)) {
						const bullet = child.props.bullet || defaultBullet;

						// Split child content into header nodes and nested list nodes
						const rawNodes = React.Children.toArray(
							child.props.children
						);
						const nestedNodes: React.ReactNode[] = [];
						const headerNodes: React.ReactNode[] = [];
						rawNodes.forEach(node => {
							if (
								React.isValidElement(node) &&
								(node.type === (List as any) ||
									(node as any).type?.displayName === 'List')
							) {
								nestedNodes.push(node);
							} else {
								headerNodes.push(node);
							}
						});

						return (
							<ItemRow
								key={index}
								isLast={index === childrenArray.length - 1}
								bullet={bullet}
								header={<>{headerNodes}</>}
								nested={
									nestedNodes.length ? (
										<>{nestedNodes}</>
									) : undefined
								}
								openControlled={
									accordion ? openIndex === index : undefined
								}
								onToggle={
									accordion
										? () =>
												setOpenIndex(prev =>
													prev === index
														? null
														: index
												)
										: undefined
								}
							/>
						);
					}
					return child;
				})}
			</ul>
		);
	}
);

List.displayName = 'List';

// Export both components
export { List, ListItem };

// Compound component pattern
const ListRoot = Object.assign(List, {
	Item: ListItem,
});

export { ListRoot };
