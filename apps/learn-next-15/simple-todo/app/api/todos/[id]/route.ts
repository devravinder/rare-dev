import { deleteTodo } from "@/db/todo";
// export const revalidate = 60

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id
    const res = await deleteTodo(parseInt(id))
    return Response.json({message: `Deleted todo with id ${res.id}`})
}