import { Server } from './server';
import { config } from './config';

export const ServerConfig = {
  port: config.PORT,
  productPath: '/products',
};

const server = new Server(ServerConfig);

server.listen();
