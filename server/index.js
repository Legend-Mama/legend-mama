import app from "./server.js";
import dotenv from "dotenv";
dotenv.config();

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`legend-mama: listening on port ${port}`);
});