import { getBlogById, getBlogs } from "@/db/blogs"

export const fetchBlogs =async()=>{
    return getBlogs() 
}

export const fetchBlogById = async (id: string) => {
    return getBlogById(id)
}