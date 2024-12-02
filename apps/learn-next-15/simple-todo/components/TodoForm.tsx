"use client"
import { createTodoAction } from "@/actions/todoActions";
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

/* 
 Generally... we'll store component state in 'initialState', so then it'll return the same
  eg:  initialState:ApiResult = {message, type} , this can be used to show messages

  ref: SignupForm example from NextJs https://nextjs.org/docs/app/building-your-application/authentication
*/
const TodoForm = () => {

  const [, formAction] = useActionState(createTodoAction, initialState)


  return <>
    <form action={formAction} className="flex flex-row gap-4">
      <input name='title' className="w-full px-4 py-2 rounded-md bg-white/25 focus:ring-2 focus:ring-green-500 focus:outline-none" />
      <SubmitButton />
    </form>
  </>
}
export default TodoForm;