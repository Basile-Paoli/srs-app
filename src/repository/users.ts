import {sql} from "@vercel/postgres";
import {userFactory} from "@/repository/factories";

export async function getUser(userId: number): Promise<Nullable<User>> {
    const {rows} = await sql`
        SELECT *
        FROM users
        WHERE id = ${userId}`;

    if (rows.length === 0) {
        return null;
    }
    return userFactory(rows[0]);
}