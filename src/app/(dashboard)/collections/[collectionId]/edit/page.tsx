import DashboardLayout from "@/app/(dashboard)/DashboardLayout";
import EditCollectionInfo from "@/app/(dashboard)/collections/[collectionId]/edit/EditCollectionInfo";
import {redirect} from "next/navigation";
import {getCollectionById} from "@/repository/collections";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {getServerSession} from "next-auth";
import {PageHeading} from "@/components/ui/headings";

export default async function EditCollection({params}: {
    params: { collectionId: string },
}) {
    const session = await getServerSession(authOptions);

    const collectionId = (parseInt(params.collectionId));
    if (isNaN(collectionId)) {
        redirect("/collections");
    }

    const collection = await getCollectionById(collectionId);
    if (!session || !session.user || !collection || session.user.id !== collection.creator) {
        redirect("/collections");
    }
    if (collection.isStatic) {
        redirect(`/collections/${collectionId}`);
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
    ];
    return (
        <DashboardLayout breadcrumbItems={breadcrumbItems}>
            <PageHeading>Edit Collection</PageHeading>

            <EditCollectionInfo collection={collection}/>
        </DashboardLayout>
    );
}