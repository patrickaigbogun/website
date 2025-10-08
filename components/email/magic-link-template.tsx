import {
	Body,
	Container,
	Head,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface MagicLinkTemplateProps {
	userName?: string;
	signInLink: string;
	random?: React.ReactNode;
}

export function SignIn({ userName, signInLink }: MagicLinkTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>Sign in to your account</Preview>
			<Body
				style={{ backgroundColor: '#f4f4f4', fontFamily: 'sans-serif' }}
			>
				<Container
					style={{
						background: '#fff',
						borderRadius: 8,
						margin: '40px auto',
						padding: 32,
						maxWidth: 480,
						boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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
							Sign in to your account
						</Text>
						<Text style={{ fontSize: 16, marginBottom: 24 }}>
							{userName ? `Hi ${userName},` : 'Hello,'}
							<br />
							Click the button below to sign in securely. This
							link is valid for a limited time.
						</Text>
						<Section
							style={{ textAlign: 'center', margin: '32px 0' }}
						>
							<Link
								href={signInLink}
								style={{
									background: '#111827',
									color: '#fff',
									padding: '12px 32px',
									borderRadius: 6,
									fontWeight: 600,
									textDecoration: 'none',
									fontSize: 16,
								}}
							>
								Sign in
							</Link>
						</Section>
						<Text style={{ fontSize: 14, color: '#6b7280' }}>
							If you did not request this email, you can safely
							ignore it.
						</Text>
						<Text
							style={{
								fontSize: 12,
								color: '#9ca3af',
								marginTop: 32,
							}}
						>
							&copy; {new Date().getFullYear()} Levra. All rights
							reserved.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}
