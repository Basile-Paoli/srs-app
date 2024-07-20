import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";
import {SettingsIcon} from "@/components/SettingsIcon";

export function CollectionSettingsPopover({collection}: { collection: Collection }) {
    return (
        <div className={"absolute top-0 right-0"}>
            <Popover>
                <PopoverTrigger className={"size-fit "}>
                    <SettingsIcon absolute={false}/>
                </PopoverTrigger>
                <PopoverContent>
                    {!collection.isPublic &&
                        <Link href={`/collections/${collection.id}/edit`}>
                            Edit
                        </Link>
                    }
                </PopoverContent>
            </Popover>
        </div>
    );
}
