import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

interface Credentials {
  email: string;
  password: string;
}

interface CustomUser {
  id: string;
  email: string;
  role: string;
  name?: string;
  accessToken?: string;
}

// Extend the User type in next-auth to include role
declare module "next-auth" {
  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    role?: string;
    name?: string;
    accessToken?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string;
      role?: string;
      name?: string;
      accessToken?: string;
    };
  }
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
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          role: "Google User",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email Address", type: "text", placeholder: "Enter email address" },
        password: { label: "Password", type: "password", placeholder: "Enter password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<CustomUser | null> {
        if (!credentials) return null;
        try {
          const response = await axios.post("https://akil-backend.onrender.com/login", credentials, {
            headers: { "Content-Type": "application/json" },
          });

          if (response.status !== 200) {
            throw new Error('Login request failed');
          }

          const user: CustomUser | null = response.data.data;
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
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
