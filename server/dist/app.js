"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const RecommendRouter_1 = __importDefault(require("./routers/RecommendRouter"));
const LoginRouter_1 = __importDefault(require("./routers/LoginRouter"));
const App = new koa_1.default();
App.use(koa2_cors_1.default({
    origin: function (ctx) {
        return 'http://localhost:3000';
    }
}));
App.use(koa_bodyparser_1.default());
App.use(RecommendRouter_1.default.routes());
App.use(LoginRouter_1.default.routes());
App.listen(8888);
//# sourceMappingURL=app.js.map