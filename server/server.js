// Set up according to https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
import express from 'express';
import tempRouter from './routes/temp.route.js';
import accountRouter from './routes/account.route.js';
import characterSheetRouter from './routes/characterSheet.route.js';
import errorHandler from './middleware/errorHandlers.js';
import auth from './middleware/authenticate.js';
import cors from 'cors';

const corsOptions = {
  origin: [process.env.CLIENT_URL] // Set to an array of domains we accept requests from
}

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

// Middleware + Routes
// route, middleware, router
app.use('/', tempRouter);
app.use('/api/v1/account', [auth], accountRouter);
app.use('/api/v1/character-sheet', [auth], characterSheetRouter);
app.use('/api/v1/character-illustration', [auth], characterSheetRouter);

// Error Handling
app.use(errorHandler);

export default app;