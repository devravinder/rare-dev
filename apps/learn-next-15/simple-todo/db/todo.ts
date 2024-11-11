import { PrismaClient, Todo } from '@prisma/client'

const prisma = new PrismaClient()


export const wait=(ms: number=2000) => new Promise(resolve => setTimeout(resolve, ms));

export const getTodos = async () => {
    //await wait();
    return prisma.todo.findMany()
}

export const getTodoByTitle=async(title: string)=>{
    const todo = await prisma.todo.findFirst({
        where: {
            title
        }
    })
    return todo;
}

export const getTodoById=async(id: number)=>{
    const todo = await prisma.todo.findFirst({
        where: {
            id
        }
    })
    return todo;
}


export const addTodo = async (todo: CreateTodo) => {
    const newTodo = await prisma.todo.create({
        data: {
            ...todo,
            status: 'active'
        }
    })
    return newTodo 
}

export const updateTodo = async (todo: Todo) => {
    const updatedTodo = await prisma.todo.update({
        where: {
            id: todo.id
        },
        data: todo
    })
    return updatedTodo 
}

export const deleteTodo = async (id: number) => {
    const deletedTodo = await prisma.todo.delete({
        where: {
            id
        }
    })
    return deletedTodo 
}