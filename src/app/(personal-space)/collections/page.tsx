import {SrsBreadcrumb} from "@/components/ui/SrsBreadcrumb";
import {CreateCollectionButton} from "@/app/(personal-space)/collections/CreateCollectionButton";
import {getCollections} from "@/app/repository/collections";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/auth";
import {CollectionCard} from "@/components/CollectionCard";


export default async function Collections() {
    const session = await getServerSession(authOptions)
    const collections = await getCollections(session!.user.id)
    console.log(collections)
    return (
        <>
            <SrsBreadcrumb items={[{value: "My Collections", href: "/collections"}]}/>
            <div className={"flex flex-col"}>
                <h1 className={"text-center"}>My Collections</h1>
                <div>
                    <div className="flex flex-wrap justify-evenly gap-6">
                        {collections.map((collection) =>
                            <CollectionCard key={collection.id} collection={collection}/>
                        )}
                    </div>
                    <CreateCollectionButton/>
                </div>
            </div>
        </>
    );
}