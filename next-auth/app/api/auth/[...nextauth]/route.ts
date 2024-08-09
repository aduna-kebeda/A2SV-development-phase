// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from 'next-auth';
import options  from './options';


export default NextAuth(options);
const handler = NextAuth(options);
export {handler as GET,handler as POST}