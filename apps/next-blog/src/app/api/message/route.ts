import { createMessage } from "@/db/messages";
import { Message } from "@/db";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {

    const data:Message = await request.json()
    const res = await createMessage(data)
    return  Response.json(res)
}