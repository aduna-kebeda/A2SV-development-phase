import type { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export type FormType = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
let x: User | JWT | null = null;

export async function fetchSignUp(formData: FormType) {
  console.log(124);
  try {
    const response = await fetch('https://akil-backend.onrender.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: 'user',  // Assuming a role is required; adjust accordingly
      }),
    });

    if (!response.ok) {
      throw new Error('Signup request failed');
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Error in fetchSignUp:', error.message);
    return { success: false, message: error.message };
  }
}

export async function fetchLogin(formData: FormType) {
  console.log(222);
  try {
    const response = await fetch('https://akil-backend.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login request failed');
    }

    const data = await response.json();
    console.log(1010101010, data);
    x = data;
    return { success: true, data };
  } catch (error: any) {
    console.log(1010101010, error);
    console.error('Error in fetchLogin:', error.message);
    return { success: false, message: error.message };
  }
}

const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // httpOptions: {
      //   timeout: 10000, 
      // },
      profile(profile) {
        console.log(profile, "profile");
        return {
          ...profile,
          id: profile.sub,
          role: "Google User",
        };
      },
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const allData = credentials as FormType;
        console.log(allData, "allData");

        if (
          allData.name &&
          allData.confirmPassword &&
          allData.email &&
          allData.password
        ) {
          const otpData = await fetchSignUp(allData);
          if (otpData.success) {
            console.log(otpData, "otp send successfully");
            return {
              id: x.id,
              email: x.email,
              name: x.name,
              // You can include additional fields if needed
            };
          }
        } else {
          console.log(allData, "login data");
          const loginRes = await fetchLogin(allData);
          if (loginRes.success) {
            x = loginRes.data;
            // console.log(loginRes.data, "login successfully", x, 'yes');
            
            return {
              id: loginRes.data.id,
              email: loginRes.data.email,
              name: loginRes.data.name,
              role: loginRes.data.role,
              accessToken: loginRes.data.accessToken,
              refreshToken: loginRes.data.refreshToken,
            };
          }
        }
        // return null; // Return null if authentication fails
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.role = "Google User";
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      console.log("JWT Callback11:", token);
      return token;
    },
    async session({ session, token }) {
      console.log(x,'ppp')
      if (token.name && token.email) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      
      else if (x) {
        x = x.data;
        console.log(8998,x)
        session.user.id = x.id;
        session.user.name = x.name;
        session.user.email = x.email;
        session.user.role = x.role;
        session.accessToken = x.accessToken;
        session.refreshToken = x.refreshToken;
        console.log('Session updated with x data:', session.user.name);
      }
      console.log(session.user.email, "3333", 'no',x);
      return session;
    },

  },
};

export default options;