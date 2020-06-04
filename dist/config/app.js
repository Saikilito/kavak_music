"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const routes_1 = __importDefault(require("../routes"));
//import morgan from 'morgan';
class app {
    constructor() {
        this.settings = () => {
            this.app.disable("x-powered-by");
            this.app.set("PORT", process.env.PORT || process.env.PORT_HTTP || 4555);
            this.app.set("views", path_1.default.join(__dirname, '../views'));
            this.app.engine('.hbs', express_handlebars_1.default({
                defaultLayout: 'main',
                layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
                partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
                extname: '.hbs',
            }));
            this.app.set('view engine', '.hbs');
            this.app.use('/public', express_1.default.static(path_1.default.join(this.app.get('views'), 'assets')));
        };
        this.middleware = () => {
            this.app.use(cors_1.default());
            this.app.use(helmet_1.default());
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
            //process.env.NODE_ENV !== "production" ? this.app.use(morgan("dev")) : null;
        };
        this.routes = () => {
            this.app.use(routes_1.default);
        };
        this.listen = (devPort) => __awaiter(this, void 0, void 0, function* () {
            const port = devPort ? devPort : this.app.get("PORT");
            this.app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
                console.info(`Server run, on port ${port}`);
            }));
        });
        this.app = express_1.default();
        this.settings();
        this.middleware();
        this.routes();
    }
}
exports.default = app;
