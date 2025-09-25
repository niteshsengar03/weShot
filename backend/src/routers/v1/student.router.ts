import express from 'express';
import { createStudentController } from '../../controllers/student.controllers';
import { validateBody } from '../../validator';
import { studentSchema } from '../../validator/student.validator';
const studentRouter = express.Router();

studentRouter.post('/create-student',validateBody(studentSchema),createStudentController);

export default studentRouter;