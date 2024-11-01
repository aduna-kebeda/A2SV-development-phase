import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  accessToken?: string;
}

export const Options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
      profile(profile) {
        // console.log
        return {
          ...profile,
          id: profile.sub,
          role: "Google User",
          name: profile.name,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "text",
          placeholder: "Enter email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        console.log(111,credentials)
        if (!credentials) return null;
        try {
          const response = await axios.post("https://akil-backend.onrender.com/login", credentials, {
            headers: { "Content-Type": "application/json" },
          });
          console.log(2222,response)
          if (response.status !== 200) {
            throw new Error('Login request failed');
          }


          
          const user: User | null = response.data.data;
          console.log(user,'addd')
          
          if (user) {
            return user;
          }

          return null;
        } catch (error) {
          console.error('Error during login:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};