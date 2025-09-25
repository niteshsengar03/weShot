import { studentDTO } from "../DTO/student.dto";
import { createStudent } from "../repositories/student.repository";

export async function createStudentService(studentData : studentDTO){
    return createStudent(studentData);
}