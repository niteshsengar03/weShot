import { Request, Response } from "express";
import { createStudentService } from "../service/student.service";

export async function createStudentController(req:Request,res:Response){
    const student = await createStudentService(req.body)

    res.status(200).json({
        message: student
    })
}

