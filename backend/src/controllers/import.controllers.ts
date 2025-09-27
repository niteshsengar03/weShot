import { Request, Response } from "express";
import { scrapedStudents } from "../service/scrapStudents.service";
import { addEmailToQueue } from "../producer/email.producer";
import { BadRequestError } from "../utils/errors/app.error";

export async function importStudent(req:Request,res:Response){
    const result = await scrapedStudents(req.body);
    await handleApiData(result);
    res.status(200).json({
        message :"success"
    }) 
}



async function handleApiData(apiData: any) {
    // const result = Array.isArray(apiData) ? apiData : apiData?.result;
    const result = apiData;
    if (!Array.isArray(result) || result.length === 0) {
        throw new BadRequestError("No data to process for email queue");
    }

    await Promise.all(
        result.map(user => {
            if (!user.email) {
                console.warn(`Skipping user ${user.reg}: email missing`);
                return;
            }

            const payload = {
                to: user.email,
                subject: user.subject,
                templateId: "hello",
                params: { name: user.name, reg: user.reg,subject:user.subject},
            };

            return addEmailToQueue(payload);
        })
    );
}
