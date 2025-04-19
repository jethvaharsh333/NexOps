import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({              // Enables CORS
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({       // Parses incoming JSON requests and adds the data to req.body
    limit: "16kb"
}))

app.use(express.urlencoded({    // Parses incoming requests from traditional HTML forms
    extended: true,
    limit: "16kb",
}))

app.use(express.static("public"))   // Serves static files like images, CSS, JS or uploads from the public folder/

app.use(cookieParser())     // Allows reading and writing cookies on the server via req.cookies




export {app};