import { userRegisterRequest } from '@/actions/user-register-request'
import {sign, verify} from 'jsonwebtoken'
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
        phone: { label: 'phone', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await userRegisterRequest({
          email: credentials.email,
          password: credentials.password,
          phone: credentials.phone
        })


        return {
          id: '', 
          email: '', 
        }; 
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  // session: {
  //   strategy: "jwt",
  // },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
