import JWT, {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";

export default function useJWTCheck(token:string):string|Error{
  try{
    JWT.verify(token,RSAPrivateKey)
  }catch (e) {
    if(e instanceof TokenExpiredError){
      return new Error('TokenExpired')
    }else if(e instanceof  JsonWebTokenError){
      return new Error('TokenError')
    }else{
      return new Error('UnknownError')
    }
  }
  return 'ok'
}



const RSAPrivateKey=`-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJ0sBvx/ZFqgtxaEHVYYIwenDncoPG7j9dfuIQy/RRxx7cyF/CGX
Tm1sbLz5hPvMwRaFjX35YDb2hJTT0czf8gsCAwEAAQJAQiSRHBmQZgNUiYk3v0+R
DltjXwnzxMbyYti31+F2eC1cF7OVcNgzm5aVZIScaHQdcAmm4AGr/O3d4nQVfZsI
YQIhAP9zX5mhMGiVJ9guaKa6bcNJV0bQh32G3Lf//h/mz6GnAiEAnYKNEjnhRMiw
1mTQpWbnKSD858yXKZQzPjpyMQKvUP0CIQCnREOoFBzfjjM94f2SluZChmaIrwjZ
EBK8xPoAp6DzZwIgQt3fYbNsrLS+TeXypaUv0UgN1aIHMkGWF37cZ24KW0kCIC/h
2Ztza/b9gjC3JRhEtLC5WKKU7+VIwcfV2EDDba++
-----END RSA PRIVATE KEY-----`