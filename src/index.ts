import express, {Response, Request} from "express";
require('dotenv').config()

const a = require("@/mod/a.json")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: a.b });
});

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
})