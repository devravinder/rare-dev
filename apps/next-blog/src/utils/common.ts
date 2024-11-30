import bcrypt from 'bcrypt'
import dayjs from 'dayjs'


export const uid = () => crypto.randomUUID()

export const hashPassword = async(password: string) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
}

export const comparePassword = async(password: string, hashedPassword: string) => {
        const result = await bcrypt.compare(password, hashedPassword);
        return result
}


const DEFAULT_FORMAT = "d MMM, YYYY h:mm A"
export const formatDate =(data: Date, format:string = DEFAULT_FORMAT)=>dayjs(data).format(format)