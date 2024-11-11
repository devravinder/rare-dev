"use server"

import { addTodo, getTodoById, getTodos, updateTodo } from "@/db/todo";
import { revalidatePath } from "next/cache";


/* 
Note:- Actions should always return proper values (shouldn't throw errors)
*/


// if we are using action along with forms
// 'prevState' is the 'initialState' of 'useActionState'
export async function createTodo(prevState: CreateTodo, formData: FormData) {

   const todo:CreateTodo = {
    title: formData.get('title') as string
   }
   const newTodo = await addTodo(todo);

    revalidatePath("/")
   return newTodo; // it should return same as 'prevState'
 
  
  }


  export const toggleStatus=async(id: number)=>{

   const old = await getTodoById(id)

   if(old){
      old.status = old.status ==='completed'?'active':'completed'
      await updateTodo(old)
      revalidatePath("/")
     return ({error: false, message: "good to go."});
   }

   return ({error: true, message: `Todo with id ${id} not found`});

  }

  export const fetchTodos=async()=>{
    return getTodos();
  }