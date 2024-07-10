import {DashboardLayout} from "@/components/ui/DashboardLayout";
import {EditCollectionComponent} from "@/app/(personal-space)/collections/[collectionId]/edit/EditCollectionComponent";
import {redirect} from "next/navigation";
import {getCollectionById} from "@/app/repository/collections";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {getServerSession} from "next-auth";

export default async function EditCollection({params}: {
    params: { collectionId: string },
}) {
    const session = await getServerSession(authOptions)
    const collectionId = (parseInt(params.collectionId))
    if (isNaN(collectionId)) {
        redirect("/collections")
    }
    const collection = await getCollectionById(collectionId)

    if (!session || !session.user || !collection || session.user.id !== collection.creator) {
        redirect("/collections")
    }
    return (
        <DashboardLayout
            breadcrumbItems={[{value: "My Collections", href: "/collections"}, {value: "Edit", href: "#"}]}>
            <EditCollectionComponent collection={collection}/>
        </DashboardLayout>
    );
}