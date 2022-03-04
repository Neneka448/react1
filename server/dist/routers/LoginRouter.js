"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const useMysql_1 = __importDefault(require("../hooks/useMysql"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const router = new koa_router_1.default({
    prefix: '/api/auth/'
});
router.post('login', async (ctx, next) => {
    let userInfo = ctx.request.body;
    if (userInfo === undefined) {
        ctx.response.body = {
            status: 'error',
            data: JSON.stringify({ desc: 'NoInfo' }),
            temp: new Date().getTime().toString()
        };
        return;
    }
    if (userInfo.token !== undefined) {
        let user;
        try {
            user = jsonwebtoken_1.default.verify(userInfo.token, RSAPrivateKey);
        }
        catch (e) {
            if (e instanceof jsonwebtoken_1.TokenExpiredError) {
                ctx.response.body = {
                    status: 'error',
                    data: JSON.stringify({ desc: 'TokenExpired' }),
                    temp: new Date().getTime().toString()
                };
                return;
            }
            else if (e instanceof jsonwebtoken_1.JsonWebTokenError) {
                ctx.response.body = {
                    status: 'error',
                    data: JSON.stringify({ desc: 'TokenError' }),
                    temp: new Date().getTime().toString()
                };
                return;
            }
            else {
                ctx.response.body = {
                    status: 'error',
                    data: JSON.stringify({ desc: 'UnknownError' }),
                    temp: new Date().getTime().toString()
                };
                return;
            }
        }
        ctx.response.body = {
            status: 'ok',
            data: JSON.stringify({ token: jsonwebtoken_1.default.sign({
                    id: user.id
                }, RSAPrivateKey, {
                    expiresIn: '60s',
                }) }),
            temp: new Date().getTime().toString()
        };
        return;
    }
    console.log(userInfo);
    let userDataArr = await (0, useMysql_1.default)(`select id from user where acc='${userInfo.acc}' and psw='${userInfo.psw}'`);
    console.log(userDataArr);
    if (userDataArr instanceof Error || userDataArr.length < 1) {
        ctx.response.body = {
            status: 'error',
            data: JSON.stringify({ desc: 'AuthFailed' }),
            temp: new Date().getTime().toString()
        };
        return;
    }
    let userData = userDataArr[0];
    ctx.response.body = {
        status: 'ok',
        data: JSON.stringify({ token: jsonwebtoken_1.default.sign({
                id: userData.id
            }, RSAPrivateKey, {
                expiresIn: '60s',
            }) }),
        temp: new Date().getTime().toString()
    };
});
router.post('signup', async (ctx) => {
    let userInfo = ctx.request.body;
    if (userInfo === undefined) {
        ctx.response.body = {
            status: 'error',
            data: JSON.stringify({ desc: 'NoInfo' }),
            temp: new Date().getTime().toString()
        };
        return;
    }
    let data = await (0, useMysql_1.default)(`SELECT id from user where acc='${userInfo.acc}'`);
    if (data instanceof Error || data.length >= 1) {
        ctx.response.body = {
            status: 'error',
            data: JSON.stringify({ desc: 'duplicate' }),
            temp: new Date().getTime().toString()
        };
        return;
    }
    let signupInfo = await (0, useMysql_1.default)(`insert into user (acc,psw) values ('${userInfo.acc}','${userInfo.psw}')`);
    if (signupInfo instanceof Error) {
        console.log(signupInfo);
        ctx.response.body = {
            status: 'error',
            data: JSON.stringify({ desc: 'unknownError' }),
            temp: new Date().getTime().toString()
        };
        return;
    }
    let userDataArr = await (0, useMysql_1.default)(`select id from user where acc='${userInfo.acc}' and psw='${userInfo.psw}'`);
    if (userDataArr instanceof Error) {
        ctx.response.body = {
            status: 'error',
            data: JSON.stringify({ desc: 'unknownError' }),
            temp: new Date().getTime().toString()
        };
        return;
    }
    ctx.response.body = {
        status: 'ok',
        data: JSON.stringify({ token: jsonwebtoken_1.default.sign({
                id: userDataArr[0].id
            }, RSAPrivateKey, {
                expiresIn: '60s',
            }) }),
        temp: new Date().getTime().toString()
    };
});
router.post('update', async (ctx) => {
    let userInfo = ctx.request.body;
    console.log(userInfo);
    fs_1.default.writeFileSync('./aaa.gif', userInfo.aaa, {
        encoding: 'binary'
    });
    ctx.response.body = 1;
});
const RSAPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJ0sBvx/ZFqgtxaEHVYYIwenDncoPG7j9dfuIQy/RRxx7cyF/CGX
Tm1sbLz5hPvMwRaFjX35YDb2hJTT0czf8gsCAwEAAQJAQiSRHBmQZgNUiYk3v0+R
DltjXwnzxMbyYti31+F2eC1cF7OVcNgzm5aVZIScaHQdcAmm4AGr/O3d4nQVfZsI
YQIhAP9zX5mhMGiVJ9guaKa6bcNJV0bQh32G3Lf//h/mz6GnAiEAnYKNEjnhRMiw
1mTQpWbnKSD858yXKZQzPjpyMQKvUP0CIQCnREOoFBzfjjM94f2SluZChmaIrwjZ
EBK8xPoAp6DzZwIgQt3fYbNsrLS+TeXypaUv0UgN1aIHMkGWF37cZ24KW0kCIC/h
2Ztza/b9gjC3JRhEtLC5WKKU7+VIwcfV2EDDba++
-----END RSA PRIVATE KEY-----`;
const RSAPublicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ0sBvx/ZFqgtxaEHVYYIwenDncoPG7j
9dfuIQy/RRxx7cyF/CGXTm1sbLz5hPvMwRaFjX35YDb2hJTT0czf8gsCAwEAAQ==
-----END PUBLIC KEY-----`;
exports.default = router;
//# sourceMappingURL=LoginRouter.js.map