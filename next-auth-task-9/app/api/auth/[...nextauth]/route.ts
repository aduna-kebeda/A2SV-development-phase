// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { Options } from './options'; // Adjust the path if necessary

// Initialize NextAuth with options and bind to GET and POST
const handler = NextAuth(Options);
export { handler as GET, handler as POST };
