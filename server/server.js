// Set up according to https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
import express from 'express';
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Temporary ------------------------
import authenticateJWT from './middleware/authenticate.js';
app.get('/', (req, res) => {
    const name = process.env.NAME || 'World';
    res.send(`Hello ${name}!`);
});

app.get('/private', authenticateJWT, (req, res) => {
    res.send('This is a private route');
});
// -----------------------------------

// Map routes
// app.use("/", indexRouter)
// app.use("/character-sheet, characterSheetRouter)

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`legend-mama: listening on port ${port}`);
});