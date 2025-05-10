import {
  useAuth as useMockAuth,
  SignedIn as MockSignedIn,
  SignedOut as MockSignedOut,
  SignInButton as MockSignInButton,
  SignUpButton as MockSignUpButton,
} from "@/components/auth/auth-provider"

// Re-export the mock components
export const useAuth = useMockAuth
export const SignedIn = MockSignedIn
export const SignedOut = MockSignedOut
export const SignInButton = MockSignInButton
export const SignUpButton = MockSignUpButton

// Mock auth functions
export async function currentUser() {
  return {
    id: "user_2NNKXpPQYGQzyaFdQlHEBTk8vXr",
    firstName: "John",
    lastName: "Smith",
    emailAddresses: [{ emailAddress: "john.smith@example.com" }],
  }
}

export async function auth() {
  return {
    userId: "user_2NNKXpPQYGQzyaFdQlHEBTk8vXr",
    sessionId: "mock_session_id",
    getToken: async () => "mock_token",
  }
}
