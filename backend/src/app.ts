import express from "express";
import cors from 'cors';
import connectInDataBase from "./config/dbConnect";
import routes from './routes';
import { setupSwagger } from './swagger';

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test'){
    connectInDataBase();
  }

app.use('/api', routes);

setupSwagger(app);

export default app;