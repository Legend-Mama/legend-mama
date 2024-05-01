// Set up according to https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
import express from 'express';
import tempRouter from './routes/temp.route.js';
import accountRouter from './routes/account.route.js';
import characterSheetRouter from './routes/characterSheet.route.js';
import errorHandler from './middleware/errorHandlers.js';
import auth, {devBypass} from './middleware/authenticate.js';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middleware + Routes
// route, middleware, router
app.use('/', tempRouter);
app.use('/api/v1/account', [auth], accountRouter);
app.use('/api/v1/character-sheet', [auth], characterSheetRouter);

// Error Handling
app.use(errorHandler);

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`legend-mama: listening on port ${port}`);
});

export {app};