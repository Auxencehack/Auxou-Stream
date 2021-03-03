//require('events').EventEmitter.defaultMaxListeners = 100;
require('dotenv').config();
import * as express from "express";
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import * as helmet from 'helmet';
import {router_v1} from './api/index';
import middleware from "./middleware/index";

class App {
  public app: express.Application = express();

  constructor() {
    this.config();
  }

  private config(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyparser.json({type: '*'}));
    this.app.use(bodyparser.urlencoded({ extended: false }));
    this.app.use(function(req: express.Request, res: express.Response , next: express.NextFunction){
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.json({
        message: 'ᕦ(ò_óˇ)ᕤ'
      });
    });
    this.app.use('/api/v1', router_v1);
    this.app.use(middleware);
  }
}

export default new App().app;
