import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { ServerConfig } from '../app';
import { dbConnection } from '../database/config.database';
import { router as productsRouter } from '../routes/products.routes';

export class Server {
  private app: express.Application;

  constructor(private config: typeof ServerConfig) {
    this.app = express();

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  private middlewares = (): void => {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/uploads',
      })
    );
  };

  private routes = (): void => {
    this.app.use(`/api/v1${this.config.productPath}`, productsRouter);
  };

  public listen = (): void => {
    this.app.listen(this.config.port, () => {
      console.log(`Server listening on port ${this.config.port}`);
    });
  };
}
