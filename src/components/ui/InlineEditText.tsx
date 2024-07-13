import {KeyboardEvent, ComponentProps, ChangeEventHandler, useState} from "react";
import {twMerge} from "tailwind-merge";


interface Props extends ComponentProps<"div"> {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onValidate: () => void
    placeholder?: string
    maxLength?: number
}

export default function InlineEditText(
    {
        value,
        onChange,
        onValidate,
        placeholder = "",
        maxLength,
        className,
        ...props
    }
        : Props) {

    const [isEditing, setIsEditing] = useState(false)

    const handleBlur = () => {
        setIsEditing(false)
        onValidate()
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape" || e.key === "Enter") {
            setIsEditing(false)
            onValidate()
        }
    }

    return <div  {...props} className={twMerge("w-full px-10", className)}>
        {isEditing ?
            <input
                placeholder={placeholder}
                type={""}
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className={"p-1 text-center w-full"}
                maxLength={maxLength}
            />
            :
            <p className={"p-1 hover:bg-gray-200/50 text-center"}
               onClick={() => setIsEditing(true)}>{value || placeholder}</p>}
    </div>
}