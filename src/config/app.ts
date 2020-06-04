import express, { Application } from "express";
import path from 'path'
import cors from "cors";
import helmet from "helmet";
import exphbs from 'express-handlebars';
import routes from "../routes";

//import morgan from 'morgan';


class app {
  private app: Application;

  constructor() {
    this.app = express();

    this.settings();
    this.middleware();
    this.routes();
  }
  private settings = () => {
    this.app.disable("x-powered-by");
    this.app.set("PORT", process.env.PORT || process.env.PORT_HTTP || 4555);
    this.app.set("views", path.join(__dirname, '../views'));
    this.app.engine('.hbs', exphbs({
      defaultLayout: 'main',
      layoutsDir: path.join(this.app.get('views'), 'layouts'),
      partialsDir: path.join(this.app.get('views'), 'partials'),
      extname: '.hbs',
    }));
    this.app.set('view engine', '.hbs');
    this.app.use('/public', express.static(path.join(this.app.get('views'), 'assets')));
  };
  private middleware = () => {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    //process.env.NODE_ENV !== "production" ? this.app.use(morgan("dev")) : null;
  };
  private routes = () => {
    this.app.use(routes);
  };
  public listen = async (devPort?: number) => {
    const port: number | string = devPort ? devPort : this.app.get("PORT");
    this.app.listen(port, async () => {
      console.info(`Server run, on port ${port}`);
    });
  };
}

export default app;
