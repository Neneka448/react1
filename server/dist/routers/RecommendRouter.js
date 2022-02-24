"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const useMysql_1 = __importDefault(require("../hooks/useMysql"));
const router = new koa_router_1.default({
    prefix: '/api/passage/'
});
router.get('recommended', async (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    let startTime = new Date().getTime();
    let endTime = 0;
    let body = await useMysql_1.default(`SELECT id,title,abstract,date FROM passageData`).catch(e => e);
    if (body instanceof Error) {
        ctx.response.body = {
            status: 'error',
            data: JSON.stringify({ desc: 'error' }),
            temp: new Date().getTime().toString()
        };
    }
    else {
        ctx.response.body = {
            status: 'ok',
            data: JSON.stringify(body),
            temp: new Date().getTime().toString()
        };
    }
    endTime = new Date().getTime();
    console.log(endTime - startTime);
});
exports.default = router;
//# sourceMappingURL=RecommendRouter.js.map