import {DashboardLayout} from "@/components/ui/DashboardLayout";
import {EditCollectionComponent} from "@/app/(personal-space)/collections/[collectionId]/edit/EditCollectionComponent";
import {redirect} from "next/navigation";

export default async function EditCollection({params}: {
    params: { collectionId: string },
}) {
    const collectionId = (parseInt(params.collectionId))
    if (isNaN(collectionId)) {
        redirect("/collections")
    }

    return (
        <DashboardLayout
            breadcrumbItems={[{value: "My Collections", href: "/collections"}, {value: "Edit", href: "#"}]}>
            <EditCollectionComponent collectionId={collectionId}/>
        </DashboardLayout>
    );
}