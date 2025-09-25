import logger from "../config/logger.config";
import { studentDTO } from "../DTO/student.dto";
import {prisma} from "../prisma/client";

export async function createStudent(studentData:studentDTO){
   const student =await prisma.students.create({
        data : studentData,
    });
    logger.info(`Student created ${student}`)
    return student;
};

export async function findStudentByReg(id : string){
    const student =await prisma.students.findUnique({
        where:{regNo:id},
    })
    return student;
}