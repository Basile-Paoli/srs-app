import {Pool} from "@neondatabase/serverless";
import {AuthOptions, Session, User} from "next-auth";
import Google from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import {Adapter} from "next-auth/adapters";

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

export const authOptions : AuthOptions = {



    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async session({session,token,user}) {
            session.user.id = user.id;
            return session;
        }
    },
    adapter: PostgresAdapter(pool) as Adapter,
}