"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useJWTCheck_1 = __importDefault(require("./useJWTCheck"));
function default_1(ctx) {
    let auth = ctx.request.header.authorization;
    if (!auth) {
        let responseBody = {
            status: 'error',
            data: JSON.stringify({ desc: 'AuthorizeFailed' }),
            temp: new Date().getTime().toString()
        };
        return [false, responseBody];
    }
    let jwt = auth.match(/(?<=Basic )[\s\S]*/);
    if (!jwt) {
        let responseBody = {
            status: 'error',
            data: JSON.stringify({ desc: 'AuthorizeFailed' }),
            temp: new Date().getTime().toString()
        };
        return [false, responseBody];
    }
    let payload = null;
    try {
        payload = (0, useJWTCheck_1.default)(jwt[0]);
    }
    catch (e) {
        if (e instanceof Error) {
            let responseBody = {
                status: 'error',
                data: JSON.stringify({ desc: e.message }),
                temp: new Date().getTime().toString()
            };
            return [false, responseBody];
        }
    }
    return [true, payload];
}
exports.default = default_1;
//# sourceMappingURL=useAuth.js.map