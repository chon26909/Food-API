import { Request, Response, NextFunction } from 'express';
import { CreateVandorInput } from '../dto';
import { Vandor } from '../models';


export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {

    console.log("create vandor")

    const { name, address, pincode, foodType, email, password, ownerName, phone } = <CreateVandorInput>req.body;

    const vandorData = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: password,
        salt:  '321ferrr',
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: []
    })

    return res.json(vandorData)
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {

}

export const GetVandorByID = async (req: Request, res: Response, next:NextFunction) => {

}