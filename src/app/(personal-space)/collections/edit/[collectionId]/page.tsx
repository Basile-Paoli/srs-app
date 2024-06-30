import {sql} from "@vercel/postgres";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {redirect} from "next/navigation";
import {DashboardLayout} from "@/components/ui/DashboardLayout";

export default async function EditCollection({params}: {
    params: { collectionId: string },
    searchParams: { id: string }
}) {
    const sessionPromise = getServerSession(authOptions)
    const result = await sql`SELECT *
                             FROM collections
                             WHERE id = ${params.collectionId}`
    const collection = result.rows[0]
    if ((await sessionPromise)?.user.id !== collection?.creator) {
        redirect("/collections")
    }

    return (
        <DashboardLayout
            breadcrumbItems={[{value: "My Collections", href: "/collections"}, {value: "Edit", href: "#"}]}>
            <h1>Edit Collection {collection.name}</h1>
        </DashboardLayout>
    );
}