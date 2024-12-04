import { uid } from "@/lib/util";
import { db, Message } from "."


export const createMessage = async (data: Message) => {

    data.id = uid()

    return db.message.create({
        data
    })
}