// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth';
import { Options } from './options';


export default NextAuth(Options);
const handler = NextAuth(Options);
export {handler as GET,handler as POST}