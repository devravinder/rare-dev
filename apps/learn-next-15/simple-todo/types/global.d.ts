
export {}

declare global {
    type Todo = {
        id: number,
        title: string,
        status: string
    }

    type CreateTodo = Omit<Todo, 'id' | 'status'>
}