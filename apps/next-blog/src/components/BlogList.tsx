import { getBlogsAction } from "@/actions"
import BlogCard from "./BlogCard"

export default async function BlogList() {
    const blogs = await getBlogsAction()
  return (
    <div className="flex flex-col gap-16">
        {blogs.map((blog,index) => <BlogCard key={`blog_${index}`} {...blog} />)}
    </div>
  )
}
