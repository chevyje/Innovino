import Style from "./TextInput.module.css"

interface TextInputProps {
    label: string
    name: string
    type?: string
    value?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    readOnly?: boolean
}

export default function TextInput({
                                      label,
                                      name,
                                      type = "text",
                                      value,
                                      placeholder,
                                      onChange,
                                      disabled = false,
                                      readOnly = false,
                                  }: TextInputProps) {
    const input_label: string = label ?? "label"

    return (
        <div className={Style.inputGroup}>
            <p className={Style.tag}>{input_label}</p>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                className={Style.inputField}
            />
        </div>
    )
}
