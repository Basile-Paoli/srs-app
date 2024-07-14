import {
    KeyboardEvent,
    ComponentProps,
    ChangeEventHandler,
    useState,
    ChangeEvent,
    FocusEvent
} from "react";
import {cn} from "@/lib/utils";


interface Props extends ComponentProps<"div"> {
    value: string,
    onTextChange: ChangeEventHandler<HTMLTextAreaElement>,
    onValidate: () => void
    placeholder?: string
}


export default function InlineEditTextArea(
    {
        value,
        onTextChange,
        onValidate,
        placeholder = "",
        className,
        ...props
    }
        : Props) {
    const [isEditing, setIsEditing] = useState(false)

    const handleBlur = () => {
        setIsEditing(false)
        onValidate()
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Escape") {
            setIsEditing(false)
            onValidate()
        }
    }
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onTextChange(e)
        e.currentTarget.style.setProperty('height', 'auto');
        e.currentTarget.style.setProperty('height', `${e.currentTarget.scrollHeight}px`);
    }

    const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.setProperty('height', 'auto');
        e.currentTarget.style.setProperty('height', `${e.currentTarget.scrollHeight}px`);
    }

    return <div  {...props} className={cn("w-full px-10 max-h-96", className)}>
        {isEditing ?
            <textarea
                placeholder={placeholder}
                className={`w-full p-1 `}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                onFocus={handleFocus}
            />
            :
            <div className={"p-1 hover:bg-gray-200/50 whitespace-pre-wrap "}
                 onClick={() => setIsEditing(true)}>{value || placeholder}</div>}
    </div>
}
