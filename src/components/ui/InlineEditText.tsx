import {KeyboardEvent, ComponentProps, ChangeEventHandler, useState} from "react";


interface Props extends ComponentProps<"input"> {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onValidate: () => void
    placeholder?: string
    spanProps?: ComponentProps<"span">
    inputProps?: ComponentProps<"input">
}

export default function InlineEditText({
                                           value,
                                           onChange,
                                           onValidate,
                                           placeholder = "",
                                           ...props
                                       }: Props) {
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

    return <div  {...props}>
        {isEditing ?
            <input placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   onBlur={handleBlur}
                   onKeyDown={handleKeyDown}
                   autoFocus/>
            :
            <span className={"p-1 hover:bg-gray-200/50"}
                  onClick={() => setIsEditing(true)}>{value || placeholder}</span>}
    </div>
}