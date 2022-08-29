import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import MainController from './app';
import { IGetResponseBody, IPostRequestBody, IPostResponseBody } from 'types';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  MainController.getUrls()
    .then(urls => {
      const resBody: IGetResponseBody = {
        urls,
      };
      res.status(200).json(resBody);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
      console.error(err.message); // Log to host platform
    });
});

app.post('/', (req: Request, res: Response) => {
  const body: IPostRequestBody = req.body;
  const { longUrl } = body;

  MainController.postUrl(longUrl)
    .then(result => {
      const resBody: IPostResponseBody = result;
      res.status(200).json(resBody);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
      console.error(err.message); // Log to host platform
    });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
