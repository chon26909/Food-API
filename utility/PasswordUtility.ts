import { Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { VandorPayload } from '../dto';
import { AuthPayload } from '../dto/Auth.dto';

export const GenrateSalt = async () => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (enterPassword: string, savedPassword: string, salt: string) => { 

    return await GeneratePassword(enterPassword,salt) === savedPassword;
}

export const GenerateSignature = (payload: VandorPayload) => { 
    return jwt.sign(payload,APP_SECRET, { expiresIn:'1d' });

}

export const ValidateSignature = (req: Request) => { 
    const signature = req.get('Authorization');

    if (signature) {
        const token = signature.split(' ')[1];
        const payload = jwt.verify(token, APP_SECRET) as AuthPayload;
        
        req.user = payload;

        return true;
   }
    return false;

}