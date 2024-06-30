import {CreateCollectionButton} from "@/app/(personal-space)/collections/CreateCollectionButton";
import {CollectionsDisplay} from "@/app/(personal-space)/collections/CollectionsDisplay";
import {DashboardLayout} from "@/components/ui/DashboardLayout";


export default async function Collections() {
    return (
        <DashboardLayout breadcrumbItems={[{value: "My Collections", href: "/collections"}]}>
            <h1 className={"text-center pt-6"}>My Collections</h1>
            <CollectionsDisplay/>
            <CreateCollectionButton/>
        </DashboardLayout>
    );
}