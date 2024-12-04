import { uid } from "@/lib/util";
import { db, Blog } from "."

export const getBlogs = async () => {
    return db.blog.findMany();
}

export const getBlogById = async (id: string) => {
    return db.blog.findFirst({
        where: {
            id
        }
    })
}

export const createBlog = async (data: Blog) => {
    data.id = uid()
    return db.blog.create({
        data
    })
}