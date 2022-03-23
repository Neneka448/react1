import Router from 'koa-router'
import { ResponseBody } from '../types/network';
import useMysql from "../hooks/useMysql";
import JWT, {JsonWebTokenError, TokenExpiredError }  from "jsonwebtoken";
import { rawUserInfoChecked } from '../types/login';
import fs from 'fs'

const router = new Router({
  prefix:'/api/dynamic/'
})









export default router