import express from 'express';
import studentRouter from './student.router';
import { welcome } from '../../controllers/welcome.controllers';

const V1Router = express.Router();

V1Router.use('/student',studentRouter)
V1Router.use('/',welcome)

export default V1Router;