import { Request, Response } from "express";


export async function welcome(req:Request,res:Response){

    res.status(200).json({
        message: "Welcome"
    })
}
