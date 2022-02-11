import { resolveSoa } from 'dns';
import { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto';
import { Vandor } from '../models';
import { GeneratePassword, GenrateSalt } from '../utility'


export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {

    console.log("create vandor")

    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVandorInput>req.body;

    const existingVandor = await Vandor.findOne({ email: email })

    if(existingVandor !== null) {
        return res.json({ message: 'A vandor is existing with this email' })
    }

    //gennerate a salt 
    const salt = await GenrateSalt();
    const userPassword = await GeneratePassword(password, salt);
    
    const vandorData = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: []
    })

    return res.json(vandorData)
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {

    const vandors = await Vandor.find();

    if(vandors !== null) return res.json(vandors) 
    return res.json({ message: 'vandors data not available' }) 
}

export const GetVandorByID = async (req: Request, res: Response, next:NextFunction) => {
    const vandorId = req.params.id;

    try {

        const vandor = await Vandor.findById(vandorId);
        return res.json(vandor);
        
    } catch (error) {

        return res.json({message: 'vandor data not available'})

    }
    
    

    
    
}