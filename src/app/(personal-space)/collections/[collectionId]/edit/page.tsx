import {DashboardLayout} from "@/components/ui/DashboardLayout";
import EditCollectionInfo from "@/app/(personal-space)/collections/[collectionId]/edit/EditCollectionInfo";
import {redirect} from "next/navigation";
import {getCollectionWithItems} from "@/repository/collections";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {getServerSession} from "next-auth";
import {PageHeading} from "@/components/ui/headings";

export default async function EditCollection({params}: {
    params: { collectionId: string },
}) {
    const session = await getServerSession(authOptions)

    const collectionId = (parseInt(params.collectionId))
    if (isNaN(collectionId)) {
        redirect("/collections")
    }

    const collection = await getCollectionWithItems(collectionId)

    if (!session || !session.user || !collection || session.user.id !== collection.creator) {
        redirect("/collections")
    }
    const breadcrumbItems = [
        {
            value: "My Collections",
            href: "/collections"
        },
        {
            value: collection.name || "Collection sans nom",
            href: `/collections/${collectionId}`
        },
        {
            value: "Edit",
            href: "#"
        }
    ]
    return (
        <DashboardLayout
            breadcrumbItems={breadcrumbItems}
        >
            <PageHeading>Edit Collection</PageHeading>
            <EditCollectionInfo collection={collection}/>
        </DashboardLayout>
    );
}