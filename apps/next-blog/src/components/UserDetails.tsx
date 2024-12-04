import Image from "next/image";

export default function UserDetails() {
  return (
    <div className="flex flex-col items-center gap-8">
      <Image src="/images/profile.jpg" alt="Profile Pic" width={170} height={170} />
      <div className="flex flex-col gap-3 items-center">
        <div className="text-3xl font-semibold">Ravinder Reddy Kothabad</div>
        <div className="font-lora italic font-normal text-lg text-center text-slate-500">
          Full Stack Developer In Java, Node & ReactJs with 6+ years of experience. Writing tech blogs in free time.
        </div>
      </div>
    </div>
  )
}
