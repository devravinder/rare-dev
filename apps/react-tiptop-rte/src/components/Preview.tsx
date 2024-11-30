
type PreviewProps = { 
    content?: string
}
export default function Preview({content}: PreviewProps) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none ProseMirror flex flex-col gap-2" dangerouslySetInnerHTML={{__html: content || ''}} ></div>
  )
}
