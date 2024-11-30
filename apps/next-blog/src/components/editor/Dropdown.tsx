import { useOnClickOutside } from '@/hooks/onClickOutside'
import { ReactNode, useRef, useState } from 'react'


type DropdownProps = {
    label: string,
    children: ReactNode
}
export default function Dropdown({ label, children }: DropdownProps) {

    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useOnClickOutside(ref, () => setOpen(false))

    return <div ref={ref} className="relative" onClick={() => setOpen(!open)}>
        <button className='rounded p-2 hover:bg-gray-200'>{label}</button>
        {open && <div className="absolute top-8 -left-2 overflow-auto flex flex-col gap-2 border rounded-md shadow-md bg-gray-50 p-2 z-50">
            {children}
        </div>}
    </div>
}
