// Set up according to https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
import express from 'express';
import {default as tempRouter} from './routes/temp.js';

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Map routes
app.use("/", tempRouter)

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`legend-mama: listening on port ${port}`);
});