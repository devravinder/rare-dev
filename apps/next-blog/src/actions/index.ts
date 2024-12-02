"use server"
import { getBlogById, getBlogs } from "@/db/blogs"
import { addSubscriber } from "@/db/subscribers"



export type ApiMessage = {
    message?: string,
    type?: 'success' | 'error'
  }
export const getBlogsAction =async()=>{
    return getBlogs() 
}

export const getBlogAction = async (id: string) => {
    return getBlogById(id)
}

export const subScribeAction = async (currentState:ApiMessage, formData:FormData):Promise<ApiMessage> => {
    try {
        const email = formData.get('email') as string
        await addSubscriber(email)
        return ({
            message: "Subscribed Successfully",
            type: 'success'
        })
    } catch (error) {
        return ({
            message: (error as Error)?.message || 'Something went wrong',
            type: 'error'
        })
    }
}