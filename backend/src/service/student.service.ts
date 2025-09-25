import { studentDTO } from "../DTO/student.dto";
import { createStudent, findStudentByReg } from "../repositories/student.repository";
import { ConflictError } from "../utils/errors/app.error";

export async function createStudentService(studentData : studentDTO){
    const student =  await findStudentByReg(studentData.regNo);
    if(student!=null)
        throw new ConflictError("User Already exists");
    return await createStudent(studentData);
}