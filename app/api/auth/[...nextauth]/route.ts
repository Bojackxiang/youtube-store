import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const authOptions: AuthOptions = {
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
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }
          const response = await axios.post(
            `${process.env.PUBLIC_API_URL}/user-auth/signin`,
            {
              email: credentials.email,
              password: credentials.password,
              storeToken: process.env.STORE_TOKEN,
            }
          );

          console.log(response.data);

          if (!response.data) {
            throw new Error("Network issue, please try later.");
          }

          const { success, message, payload } = response.data;

          if (!success) {
            throw new Error(message);
          }

          const { token, id, email } = payload;

          return {
            token,
            id,
            email,
          };
        } catch (err: any) {
          throw new Error(err.message);
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    jwt: async ({ token, user }) => {
      if (token && user) {
        token.customerId = user.id;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        const customerId = token.customerId;
        const response = await axios.get(
          `${process.env.PUBLIC_API_URL}/user-auth/${customerId}/me`
        );
        const foundUserData = response?.data?.payload;
        if (foundUserData) {
          session.user = foundUserData;
        }
      }

      console.log(session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
