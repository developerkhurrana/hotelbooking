import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import hrouter from "./Routers/hotel.router";
import urouter from "./Routers/user.router";
import rrouter from "./Routers/room.router";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config()

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var corsOptions = {
  origin: ['http://localhost:5173','http://localhost:5174'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials:true
}

app.use(cors(corsOptions));

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
    console.log(`Welcome to the server side of the website`);
})

mongoose.connect(`${process.env.DB}HotelBooking`)
  .then(() => console.log('Connected!'))
  .catch(error => console.log(`Error connecting to Database: ${error}`))

app.use(cookieParser());
app.use('/hotel', hrouter);
app.use('/user', urouter);
app.use('/room', rrouter);
