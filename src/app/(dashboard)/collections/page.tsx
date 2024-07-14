import {CreateCollectionButton} from "@/app/(dashboard)/collections/CreateCollectionButton";
import {CollectionsDisplay} from "@/app/(dashboard)/collections/CollectionsDisplay";
import {DashboardLayout} from "@/app/(dashboard)/DashboardLayout";


export default async function Collections() {
    return (
        <DashboardLayout breadcrumbItems={[{value: "My Collections", href: "/collections"}]}>
            <h1 className={"text-center pt-6"}>My Collections</h1>
            <CollectionsDisplay/>
            <CreateCollectionButton/>
        </DashboardLayout>
    );
}