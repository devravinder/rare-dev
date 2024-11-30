import { fetchBlogs } from "@/actions/blog"
import BlogCard from "./BlogCard"

export default async function BlogList() {
    const blogs = await fetchBlogs()
  return (
    <div className="flex flex-col gap-16">
        {blogs.map((blog,index) => <BlogCard key={`blog_${index}`} {...blog} />)}
    </div>
  )
}
