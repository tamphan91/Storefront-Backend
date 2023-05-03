
import bcrypt from 'bcrypt';
const saltRounds = process.env.SALT_PASSWORD;
const pepper = process.env.BCRYPT_PASSWORD;

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password + pepper, parseInt(saltRounds as string));
}