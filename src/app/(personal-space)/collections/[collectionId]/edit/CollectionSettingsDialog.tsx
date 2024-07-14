import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Cross1Icon, GearIcon} from "@radix-ui/react-icons";
import InlineEditText from "@/components/ui/InlineEditText";
import {Button} from "@/components/ui/button";

export default function CollectionSettingsDialog({answerFields, setAnswerFields, validate}: {
    answerFields: string[],
    setAnswerFields: (fields: string[]) => void
    validate: () => void
}) {
    return (
        <Dialog>
            <DialogTrigger>
                <GearIcon className={"size-7"}/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Paramètres de la collection</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>Champs de réponse par défaut :</div>
                <div className={"w-fit justify-self-center"}>
                    {answerFields?.map((field, index) => (
                        <div className={"flex justify-self-center justify-between"} key={index}>
                            <InlineEditText
                                value={field}
                                onChange={(e) => {
                                    console.log(e.target.value, index)
                                    setAnswerFields(answerFields.map((f, i) => i === index ? e.target.value : f) ?? [])
                                }}
                                onValidate={validate}
                                placeholder={"Enter a field"}
                                maxLength={20}
                                className={"mr-2 w-full"}
                            />
                            <Button
                                size={"sm"} variant={"outline"}
                                onClick={() => setAnswerFields(answerFields.filter((_, i) => i !== index) ?? [])}
                            ><Cross1Icon/></Button>
                        </div>
                    ))}
                </div>
                <Button className={"w-fit justify-self-center"}
                        onClick={() => setAnswerFields([...answerFields ?? [], ""])}
                >Ajouter un champ</Button>
            </DialogContent>
        </Dialog>
    );
}
