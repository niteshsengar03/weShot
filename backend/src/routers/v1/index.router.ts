import express from 'express';
import pingRouter from './ping.router';
import studentRouter from './student.router';

const V1Router = express.Router();

V1Router.use('/', pingRouter);
V1Router.use('/student',studentRouter)


export default V1Router;