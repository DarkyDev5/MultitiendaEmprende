import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Aquí deberías verificar las credenciales contra tu base de datos
        if (credentials?.username === "admin" && credentials?.password === "password") {
          return { id: "1", name: "Admin", email: "admin@example.com", isAdmin: true }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }