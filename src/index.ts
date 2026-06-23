import express, {Response, Request} from "express";
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`)
})