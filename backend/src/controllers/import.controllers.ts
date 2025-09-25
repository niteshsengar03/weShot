import { Request, Response } from "express";

export async function importStudent(req:Request,res:Response){
    console.log(req.body);
}