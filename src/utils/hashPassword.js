import bcrypt from "bcryptjs";
export const hashPassword = (pwd) => bcrypt.hash(pwd, 10);