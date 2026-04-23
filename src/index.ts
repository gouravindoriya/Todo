import createExpressApplication from './app/index.js'
import connectDB from './db/index.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT=process.env.PORT||3000
async function main(){
    try {
        await connectDB()
        const app=createExpressApplication()
        app.listen(PORT,()=>{
            console.log("http server running on port ",PORT)
        })
    } catch (error) {
        console.log
    }
}

main()

