//转自 https://www.jianshu.com/p/4b32151ceffa

/*Node.js源码解析-HTTP请求响应的过程
    在 Node.js 中，起一个HTTP Server 非常简单，只需要: */
    const http = require('http');

    http.createServer((req,res)=>{
        res.end('Hello World\n')
    }).listen(3000)

    // $ curl localhost:3000
    // Hello World

//∵ Node.js 已经把具体实现细节封装，只需要调用 http 模块提供的方法。

//下面是nodejs中  一个请求是如何处理，然后响应的
