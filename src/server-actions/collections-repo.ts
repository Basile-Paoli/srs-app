"use server";
import {sql} from "@vercel/postgres";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";

export async function createCollection() : Promise<number|void> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return
    }
    const result = await sql`INSERT INTO collections (user_id)
                             VALUES (${session.user.id})
                             RETURNING id`;
    return result.rows[0].id;
}