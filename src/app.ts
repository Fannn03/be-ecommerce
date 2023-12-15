import 'source-map-support';
import "module-alias/register";
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import indexRouter from "@routers/index-router";

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public/images'));

app.use(indexRouter);

export default app;