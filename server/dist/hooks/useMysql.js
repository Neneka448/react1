"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
class _Mysql {
    static _instance = new _Mysql();
    _mysql = mysql2_1.default.createConnection({
        host: '120.27.240.219',
        user: 'root',
        password: 'chenkai77',
        database: 'passages'
    });
    constructor() { }
    static getInstance() {
        return _Mysql._instance._mysql;
    }
    static retry() {
        _Mysql._instance._mysql = mysql2_1.default.createConnection({
            host: '120.27.240.219',
            user: 'root',
            password: 'chenkai77',
            database: 'passages'
        });
    }
}
async function useMysql(sql) {
    return new Promise((resolve, reject) => {
        _Mysql.getInstance().query(sql, (err, row) => {
            err ? reject(err) : resolve(row);
        });
    }).then((row) => row, (err) => {
        _Mysql.retry();
        return err;
    });
}
exports.default = useMysql;
//# sourceMappingURL=useMysql.js.map