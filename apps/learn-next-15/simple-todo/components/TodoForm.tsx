"use client"
import { createTodo } from "@/actions/todoActions";
import { useActionState } from "react";
import SubmitButton from "./SubmitButton";


const initialState: CreateTodo = {
  title: '',

}

/* 
 'useActionState' is state is not much convient for forms
    1. preserving the form state is not easy
    2. validation is not easy ( in the client side, to give instant feedback to user)

  better to use 'server-actions with useTransition' along with recct-hook-form
*/
const TodoForm = () => {

  const [, formAction] = useActionState(createTodo, initialState)


  return <>
    <form action={formAction} className="flex flex-row gap-4">
      <input name='title' className="w-full px-4 py-2 rounded-md bg-white/25 focus:ring-2 focus:ring-green-500 focus:outline-none" />
      <SubmitButton />
    </form>
  </>
}
export default TodoForm;