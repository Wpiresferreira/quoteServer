import dotenv from 'dotenv' // To protect your sensible data
import express from 'express'
import bodyParser from 'body-parser';
import path  from 'path'; // To help the routes
import {fileURLToPath} from 'url'; // To help the routes
import cors from 'cors' // To allow test the app in the same machine
import {authenticateToken} from './middlewares/authMiddleware.js';
import * as apiController from './controllers/apiController.js'


dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname =   path.dirname(__filename);


const app = express();
// Serve the static files from the React app

app.use(bodyParser.json())


app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });


// Routes
app.get('/getquote', authenticateToken, apiController.getData);


        
app.listen(5123, async () => {
    try{
        console.log('Server ready on port 5000.');
    }
    catch (error){
        console.log(error)
    }
})

apiController.updateProfile()
  
 setInterval(async () => {
  await apiController.updateData();
 }, 60000);