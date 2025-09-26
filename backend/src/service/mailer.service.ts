import serverConfig from "../config";
import logger from "../config/logger.config";
import  transporter  from "../config/mailer.config";
import { InternalServerError } from "../utils/errors/app.error";

export async function sendEmail(to:string,subject:string,name:string,body:string){
    try{
        await transporter.sendMail({
        from: serverConfig.MAIL_USER,
        to,
        subject:`Important reminder for ${name}`,
        html:body
    }) 
    logger.info(`Email sent to ${to}, with subject ${subject}`)
    }catch(error){
        throw new InternalServerError('Failed to send email')
    }
}