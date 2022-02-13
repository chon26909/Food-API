import { Request, Response } from 'express'
import {  VandorLoginInputs } from '../dto';
import { GenerateSignature, ValidatePassword } from '../utility';
import { FindVandor } from './AdminController';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { AuthPayload } from '../dto/Auth.dto';

export const VandorLogin = async (req: Request, res: Response) => {

    const { email, password } = <VandorLoginInputs>req.body;

    const existingVandor = await FindVandor('', email);

    if (existingVandor !== null) {
        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);

        if(validation) {

            const signature = GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodTypes: existingVandor.foodType,
                name: existingVandor.name
            })

            return res.json(signature)
        }
        else {
            return res.json({message : 'Password is not valid'})
        }
    }

    return res.json({ message: 'Login credential not valid' })
}

export const GetVandorProfile = async (req: Request, res: Response) => { 
    const user = req.user;

    if(user) { 
        const existingVandor = await FindVandor(user._id);
        return res.json(existingVandor)
    }
    else { 
        return res.json({ messsage: 'Vandor information not found' });
    }
}