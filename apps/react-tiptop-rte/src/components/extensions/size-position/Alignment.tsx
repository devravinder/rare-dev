import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "../../Toolbar";
import { ALIGN } from "./SizeAndPosition";

type AlignmentProps = {
    onAlignment:(align:string)=>void
    active: string
}
export default function Alignment({onAlignment, active}:AlignmentProps) {
  return (
    <div className=" flex flex-row gap-1 invisible group-hover:visible absolute bottom-[100%] left-1/2 translate-x-[-50%] p-1  bg-white rounded-lg shadow-lg border">
        <Button onClick={()=>onAlignment(ALIGN.start)} $active={active === ALIGN.start} >
          <AlignLeft size={18} />
        </Button>
        <Button onClick={()=>onAlignment(ALIGN.center)} $active={active === ALIGN.center} >
          <AlignCenter size={18} />
        </Button>
        <Button onClick={()=>onAlignment(ALIGN.end)} $active={active === ALIGN.end}>
          <AlignRight size={18} />
        </Button>
      </div>
  )
}
