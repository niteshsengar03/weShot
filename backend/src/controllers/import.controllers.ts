import { Request, Response } from "express";
import { scrapedStudents } from "../service/scrapStudents.service";

export async function importStudent(req:Request,res:Response){
    const result = await scrapedStudents(req.body);
    res.status(200).json({
        result
    }) 
}