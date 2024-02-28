import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../Config/sqlconfig'
import ejs from 'ejs'
import { sendMail } from '../Helpers/emailHelper'

dotenv.config()

export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig)


    
    const users = (await pool.request().query('SELECT * FROM Users WHERE isWelcomed = 0 and isDelete = 0')).recordset;

    console.log("your users",users);

    
    if (users.length === 0) {
        console.log('No new users to welcome.');
        return;
    }
    
    
    console.log(users);
    
    for(let user of users){

        if (!user.email) {
            console.log(`No email defined for user: ${user.name}`);
            continue; 
        }
        
        ejs.renderFile('Tempelates/welcomeUser.ejs', {name: user.name}, async(error, data)=>{
            
            if (error) {
                console.error('Error rendering email template:', error);
                return; 
            }

                      
            let mailOptions = {
                from: "favourbuyanzi@gmail.com",
                to: user.email,
                subject: "Welcome to XPLORA",
                html: data
            }

            if (!mailOptions.to) {
                console.error(`The email address is undefined for user: ${user.name}`);
                return;
            }

            console.log(`Sending email to ${mailOptions.to}`)

            

            try {
                await sendMail(mailOptions)

                await pool.request().query(`UPDATE Users SET isWelcomed = 1 WHERE user_id = '${user.user_id}'`)

                console.log(`Email sent to new user: ${user.email}`);
                
            } catch (error) {
                console.error('Failed to send email:', error);
                
            }
        })
    }
}