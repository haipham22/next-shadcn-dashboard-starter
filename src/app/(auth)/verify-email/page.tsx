'use client'

import { Suspense, useState } from 'react'

import Link from 'next/link'

import { AlertCircle, LoaderCircleIcon } from 'lucide-react'

import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export default function Page() {
  const [message, setMessage] = useState<string | null>('Verifying...')
  const [error, setError] = useState<string | null>(null)

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        {error && (
          <>
            <Alert variant="destructive">
              <AlertIcon>
                <AlertCircle />
              </AlertIcon>
              <AlertTitle>{error}</AlertTitle>
            </Alert>

            <Button asChild>
              <Link href="/signin" className="text-primary">
                Go back to Login
              </Link>
            </Button>
          </>
        )}
        {message && (
          <Alert>
            <AlertIcon>
              <LoaderCircleIcon className="size-4 animate-spin stroke-muted-foreground" />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        )}
      </div>
    </Suspense>
  )
}
