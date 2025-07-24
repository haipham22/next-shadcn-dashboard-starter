import { Body, Container, Head, Hr, Html, Img, Preview, Text } from '@react-email/components'

export interface BaseProps extends React.PropsWithChildren {
  preview: string
}

export default function Base({ preview, children }: BaseProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Img src={`https://placehold.co/170x50`} width="170" height="50" alt="Koala" style={logo} />
        <Preview>{preview}</Preview>
        <Container style={container}>
          {children}
          <Text style={paragraph}>
            Best,
            <br />
            The MindTextChat team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>PVT, Paper Bridge, Hanoi, Vietnam</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
