import bcrypt from 'bcrypt'

/* 
 bcrypt uses native node modules, so if we import other than actions file...it'll give error
 so try to import only in actions file

 even if we pass...serverExternalPackages: ['bcrypt'] in nextjs.config.ts file...it'll give error

*/

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result
}