// Set up according to https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
import express from 'express';
import {default as tempRouter} from './routes/temp.js';
import {default as accountRouter} from './routes/accounts.js';
import {errorHandler} from './middleware/errorHandlers.js';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middleware + Routes
// route, middleware, router
app.use('/', tempRouter);
app.use('/api/v1/account', accountRouter);

// Error Handling
app.use(errorHandler);

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`legend-mama: listening on port ${port}`);
});