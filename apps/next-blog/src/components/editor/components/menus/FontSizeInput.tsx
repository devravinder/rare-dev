import { Minus, Plus } from "lucide-react"
import { ChangeEventHandler, memo } from "react"

type FontSizeInputProps = {
    defaultValue?: number,
    max?: number,
    min?: number
    value?: string
    unit?: string
    onChange?: (value: string) => void
}
 function FontSizeInput({ defaultValue = 16, max=100, min=1, value,  onChange, unit='px'}: FontSizeInputProps) {
    const numValue = value ? parseInt(value.replace(unit, '')) : defaultValue

    const setValue = (value: number) => {
        onChange?.(`${value}${unit}`)
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        let value = e.currentTarget.value ? parseInt(e.currentTarget.value) : defaultValue;
        if (value)
            value = Math.min(Math.max(min,value), max)
        setValue(value)
    }
    const onBlur : ChangeEventHandler<HTMLInputElement> = (e) => {
        let value = e.currentTarget.value ? parseInt(e.currentTarget.value) : defaultValue;
       setValue(Math.min(Math.max(min, value), max))
    }
    
    return (
        <div className="relative flex flex-row gap-2 px-2 justify-center items-center">
            <button disabled={numValue <= min} onClick={() => setValue(numValue - 1)}>
                <Minus width={15} />
            </button>
            <input  value={`${numValue}`}
                onChange={handleChange}
                onBlur={onBlur}
                className='w-10 px-2 border border-gray-700 rounded-md outline-none'
            />
            <button disabled={numValue >= max} onClick={() => setValue(numValue + 1)}>
                <Plus width={15} />
            </button>
        </div>
    )
}

export default memo(FontSizeInput) 