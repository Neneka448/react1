"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const koa_router_1 = __importDefault(require("koa-router"));
let connection = mysql2_1.default.createConnection({
    host: '120.27.240.219',
    user: 'root',
    password: 'chenkai77',
    database: 'passages'
});
const router = new koa_router_1.default({
    prefix: '/api/'
});
router.get('recommended', async (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    let startTime = new Date().getTime();
    let endTime = 0;
    ctx.response.body = await new Promise((resolve, reject) => {
        connection.query(`SELECT id,title,abstract,date FROM passageData`, (err, row) => {
            endTime = new Date().getTime();
            err ? reject(err) : resolve(row);
        });
    }).then(rows => rows, err => { console.log(err); throw err; });
    console.log(endTime - startTime);
});
const App = new koa_1.default();
App.use(koa2_cors_1.default({
    origin: function (ctx) {
        return 'http://localhost:3000';
    }
}));
App.use(async (ctx, next) => {
    console.log(ctx.request.url);
    await next();
});
App.use(router.routes());
App.listen(8888);
//# sourceMappingURL=app.js.map