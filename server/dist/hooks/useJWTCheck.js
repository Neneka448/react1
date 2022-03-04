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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
function useJWTCheck(token) {
    try {
        let t = jsonwebtoken_1.default.verify(token, RSAPrivateKey);
        return t;
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new Error('TokenExpired');
        }
        else if (e instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new Error('TokenError');
        }
        else {
            throw new Error('UnknownError');
        }
    }
}
exports.default = useJWTCheck;
const RSAPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJ0sBvx/ZFqgtxaEHVYYIwenDncoPG7j9dfuIQy/RRxx7cyF/CGX
Tm1sbLz5hPvMwRaFjX35YDb2hJTT0czf8gsCAwEAAQJAQiSRHBmQZgNUiYk3v0+R
DltjXwnzxMbyYti31+F2eC1cF7OVcNgzm5aVZIScaHQdcAmm4AGr/O3d4nQVfZsI
YQIhAP9zX5mhMGiVJ9guaKa6bcNJV0bQh32G3Lf//h/mz6GnAiEAnYKNEjnhRMiw
1mTQpWbnKSD858yXKZQzPjpyMQKvUP0CIQCnREOoFBzfjjM94f2SluZChmaIrwjZ
EBK8xPoAp6DzZwIgQt3fYbNsrLS+TeXypaUv0UgN1aIHMkGWF37cZ24KW0kCIC/h
2Ztza/b9gjC3JRhEtLC5WKKU7+VIwcfV2EDDba++
-----END RSA PRIVATE KEY-----`;
//# sourceMappingURL=useJWTCheck.js.map