import { Metadata } from 'next'

import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.',
}

export default function Page() {
  return (
    <>
      <Input type="text" />
    </>
  )
}
