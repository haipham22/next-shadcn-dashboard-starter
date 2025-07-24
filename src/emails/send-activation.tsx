import { Button, Container, Section, Text } from '@react-email/components'

import { User } from '@/models/user'

import Base from './base'

interface SendActivationEmailProps {
  user: User
  verificationUrl: string
}

export default function SendActivationEmail({ user, verificationUrl }: SendActivationEmailProps) {
  return (
    <Base preview="Activate your account">
      <Container style={container}>
        <Text style={paragraph}>Hi {user.name},</Text>
        <Text style={paragraph}>Click the below link to verify your email address and activate your account.</Text>
        <Text style={paragraph}>
          This link is valid for 1 hour. If you did not request this email you can safely ignore it.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={verificationUrl}>
            Activate account
          </Button>
        </Section>
      </Container>
    </Base>
  )
}

SendActivationEmail.PreviewProps = {
  user: {
    name: 'User Name',
  },
  verificationUrl: 'https://example.com/verify-email?token=exampleToken',
} as SendActivationEmailProps

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}
