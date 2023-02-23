import "dotenv/config"
import express from "express"
import router from "@routes"
import cors from 'cors';


var app = express()

app.use(cors());

app.use(router)

app.listen(process.env.PORT)

process.on("SIGINT", async function () {
  console.log("Closing...")
  process.exit(0)
})

console.log("Starting...")
