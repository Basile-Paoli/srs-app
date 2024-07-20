import {GearIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {ComponentProps} from "react";

interface Props extends ComponentProps<"svg"> {
    absolute?: boolean;
}

export function SettingsIcon({absolute = true, className}: Props) {
    return (
        <GearIcon
            className={cn("size-7 text-primary mr-4 mt-4 hover:animate-spin-medium ", (absolute && "absolute right-0 top-0"), className)}/>
    );
}
