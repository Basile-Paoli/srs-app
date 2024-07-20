import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Cross1Icon, QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import InlineEditText from "@/components/ui/InlineEditText";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useState} from "react";
import {SettingsIcon} from "@/components/SettingsIcon";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

export default function CollectionSettingsDialog({answerFields, setAnswerFields, save, publish}: {
    answerFields: string[],
    setAnswerFields: (fields: string[]) => void
    save: () => void,
    publish: () => void
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isToolTipOpen, setIsToolTipOpen] = useState(false);
    const [isToolTipActive, setIsToolTipActive] = useState(false);

    const handleDialogChange = (open: boolean) => {
        setIsDialogOpen(open);
        setTimeout(() => setIsToolTipActive(open), 1);
    };

    const handleToolTipChange = (open: boolean) => {
        if (!isToolTipActive) {
            setIsToolTipOpen(false);
        } else {
            setIsToolTipOpen(open);
        }
    };

    const addField = () => {
        setAnswerFields([...answerFields ?? [], ""]);
        save();
    };
    const removeField = (index: number) => {
        setAnswerFields(answerFields.filter(
            (_, i) => i !== index
        ));
        save();
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger>
                <SettingsIcon/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Collection settings</DialogTitle>
                </DialogHeader>
                <VisuallyHidden><DialogDescription></DialogDescription></VisuallyHidden>
                <Separator/>
                <div className={"flex"}>
                    Default answer fields
                    <TooltipProvider delayDuration={300}>
                        <Tooltip open={isToolTipOpen} onOpenChange={handleToolTipChange}>
                            <TooltipTrigger><QuestionMarkCircledIcon
                                className={"h-5 w-5 self-center justify-self-center ml-1"}/></TooltipTrigger>
                            <TooltipContent side={"bottom"}>
                                These fields will be set by default for all new items in this collection.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>


                <div className={"w-fit justify-self-center"}>
                    {answerFields?.map((field, index) => (
                        <div className={"flex justify-self-center justify-between"} key={index}>
                            <InlineEditText
                                value={field}
                                onChange={(e) => {
                                    setAnswerFields(answerFields.map((f, i) => i === index ? e.target.value : f) ?? []);
                                }}
                                onValidate={save}
                                placeholder={"Enter a field"}
                                maxLength={20}
                                className={"mr-2 w-full"}
                            />
                            <Button
                                size={"sm"} variant={"outline"}
                                onClick={() =>removeField(index)}
                            ><Cross1Icon/></Button>
                        </div>
                    ))}
                </div>
                <Button className={"w-fit justify-self-center"}
                        onClick={addField}
                >Add field</Button>
                <Separator/>
                <Button className={"w-fit justify-self-center"} onClick={publish}>Publish</Button>
            </DialogContent>
        </Dialog>
    );
}
