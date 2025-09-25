import express from 'express';
import { createStudentController } from '../../controllers/student.controllers';
import { validateBody } from '../../validator';
import { studentSchema } from '../../validator/student.validator';
import { importStudent } from '../../controllers/import.controllers';
const studentRouter = express.Router();

studentRouter.post('/create-student',validateBody(studentSchema),createStudentController);
studentRouter.post('/n8n',importStudent);

export default studentRouter;