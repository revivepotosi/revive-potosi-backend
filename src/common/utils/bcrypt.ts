import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

const generatePassword = async (password: string) => {
    return await bcrypt.hash(password, saltOrRounds);
};

const validePassword = async (password: string, passwordEncrypted: string) => {
    return await bcrypt.compare(password, passwordEncrypted);
};

export { generatePassword, validePassword };
