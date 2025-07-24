export interface User {
  id: string
  email: string
  name?: string | null
  status: UserStatus
  lastSignInAt?: Date | null
  emailVerifiedAt?: Date | null
  avatar?: string | null
  invitedByUserId?: string | null
  createdAt: Date
  updatedAt: Date
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum VerificationTokenType {
  SIGN_UP = 'sign_up',
  PASSWORD_RESET = 'password_reset',
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
  type: VerificationTokenType
}
