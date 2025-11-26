import Style from "./CheckBox.module.css"

interface CheckBoxProps {
    label?: string
    name: string
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CheckBox({ label, name, checked, onChange }: CheckBoxProps) {
    return (
        <label className={Style.checkboxWrapper}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className={Style.checkbox}
            />
            {label && <span className={Style.label}>{label}</span>}
        </label>
    )
}
