"use server"
import { getUser } from "@/db/users";
import { createSession, logout } from "@/lib/auth";
import { comparePassword } from "@/lib/bcrypt";
import { ApiMessage } from ".";
import { LoginInputs } from "@/components/LoginForm";
import { redirect } from "next/navigation";

export async function loginAction({email, password}: LoginInputs):Promise<ApiMessage> {

    const user = await getUser(email as string);
    if (!user) return { type:'error', message:'email not found' };

    const match =  await comparePassword(password as string, user.password);
    if (match) {

        await createSession({ email: user.email })
        //redirect("/login")
        return { type:'success', message:'login success' };
    }

    return { type:'error', message:'Password is not matching' };
}

export async function logoutAction() {
    await logout()
    redirect("/")
}