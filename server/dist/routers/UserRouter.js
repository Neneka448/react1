"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const useMysql_1 = __importDefault(require("../hooks/useMysql"));
const useJWTCheck_1 = __importDefault(require("../hooks/useJWTCheck"));
const useAuth_1 = __importDefault(require("../hooks/useAuth"));
const router = new koa_router_1.default({
    prefix: '/api/user/'
});
router.post('update', async (ctx) => {
    console.log(ctx.request.body);
    let userInfo = ctx.request.body;
    let userid;
    try {
        userid = (0, useJWTCheck_1.default)(userInfo.token);
    }
    catch (e) {
        if (e instanceof Error) {
            ctx.response.body = {
                status: 'error',
                data: JSON.stringify({ desc: e.message }),
                temp: new Date().getTime().toString()
            };
        }
        else {
            ctx.response.body = {
                status: 'error',
                data: JSON.stringify({ desc: 'unknownError' }),
                temp: new Date().getTime().toString()
            };
        }
        return;
    }
    console.log(userid);
    if (userInfo.type === 'newuser') {
        let res = await (0, useMysql_1.default)(`insert into UserBaseInfo (id,avatar,username,signature,occupation,company) 
        values 
        (${userid.id},'${userInfo.data.avatar}','${userInfo.data.username}','${userInfo.data.signature}','${userInfo.data.occupation}','${userInfo.data.company}') `);
        if (res instanceof Error) {
            console.log(res);
            ctx.response.body = {
                status: 'error',
                data: JSON.stringify({ desc: 'unknownError' }),
                temp: new Date().getTime().toString()
            };
        }
        ctx.response.body = {
            status: 'ok',
            data: JSON.stringify(userInfo.data),
            temp: new Date().getTime().toString()
        };
    }
    else if (userInfo.type === 'update') {
        let res = await (0, useMysql_1.default)(`update UserBaseInfo set
        avatar='${userInfo.data.avatar}',
        username='${userInfo.data.username}',
        signature='${userInfo.data.signature}', 
        occupation='${userInfo.data.occupation}',
        company='${userInfo.data.company}' 
        where id=${userid.id}
        `);
        if (res instanceof Error) {
            console.log(res);
            ctx.response.body = {
                status: 'error',
                data: JSON.stringify({ desc: 'unknownError' }),
                temp: new Date().getTime().toString()
            };
        }
        ctx.response.body = {
            status: 'ok',
            data: JSON.stringify(userInfo.data),
            temp: new Date().getTime().toString()
        };
    }
});
router.get('baseinfo', async (ctx) => {
    let answer = (0, useAuth_1.default)(ctx);
    if (answer[0]) {
        ctx.response.body = answer[1];
    }
    let payload = answer[1];
    let userid = payload.id;
    let userBaseInfo = await (0, useMysql_1.default)(`SELECT * From UserBaseInfo where id=${userid}`);
    let followingCnt = await (0, useMysql_1.default)(`SELECT COUNT(user_id) From Follower where follower_id=${userid}`);
    let followerCnt = await (0, useMysql_1.default)(`SELECT COUNT(follower_id From Follower where user_id=${userid}`);
    let dynamicList = await (0, useMysql_1.default)(`SELECT * From Dynamic where author_id=${userid} LIMIT=10`);
});
exports.default = router;
//# sourceMappingURL=UserRouter.js.map