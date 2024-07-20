import DashboardLayout from "@/app/(dashboard)/DashboardLayout";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {redirect} from "next/navigation";
import {getCollectionById} from "@/repository/collections";
import {PageHeading, SectionHeading} from "@/components/ui/headings";
import {getUser} from "@/repository/users";
import {CollectionSettingsPopover} from "@/app/(dashboard)/collections/[collectionId]/CollectionSettingsPopover";

export default async function CollectionPage({params}: {
    params: {
        collectionId: string
    }
}) {
    const session = await getServerSession(authOptions);

    const collectionId = (parseInt(params.collectionId));
    if (isNaN(collectionId)) {
        redirect("/collections");
    }

    const collection = await getCollectionById(collectionId);
    if (!session || !session.user || !collection || (!collection.isPublic && collection.creator !== session.user.id)) {
        redirect("/collections");
    }
    const creator = await getUser(collection.creator);

    const isCreator = session.user.id === collection.creator;

    const breadcrumbItems = [
        {
            value: "My Collections",
            href: "/collections"
        },
        {
            value: collection.name || "Unnamed collection",
            href: `/collections/${collectionId}`
        },
    ];
    return (
        <DashboardLayout breadcrumbItems={breadcrumbItems}>
            {isCreator && <CollectionSettingsPopover collection={collection}/>}
            <div className={" w-full flex justify-between items-center"}>
                <PageHeading className={"mx-auto"}>{collection.name || "Unnamed collection"}</PageHeading>
            </div>
            <div className={"self-start pl-1 text-sm"}>
                <i>Created by {creator?.name}</i>
                {isCreator && <span className={"text-primary"}> (you)</span>}
            </div>
            <SectionHeading>Description</SectionHeading>
            <div className={"w-full whitespace-pre-wrap px-4 break-words"}>
                {collection.description}
            </div>
        </DashboardLayout>
    );
}