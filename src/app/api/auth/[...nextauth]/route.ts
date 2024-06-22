import Google from "next-auth/providers/google";
import NextAuth, {AuthOptions, Session, User} from "next-auth";

import {authOptions} from "@/app/api/auth/[...nextauth]/auth";




const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};


