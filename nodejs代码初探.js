//转自 https://cnodejs.org/topic/4f571a16a680d212781ccf9f

//javascript 和 v8
/*
    做一个应用就是构建一套类型系统。JavaScript是动态语言，我们可以在程序的运行过程中增加类型，添加属性方法，甚至改变继承关系。JavaScript提供了这些能力，但这并不意味我们创建的应用中的类型系统在运行时是不断变化，琢磨不定的。事实上，大部分情况下，JavaScript程序运行一段时间以后，类型就基本稳定了。v8在执行JavaScript代码短的过程中动态地识别出类型，将类型直接编译成机器码，运行。同时，v8一直动态地优化代码，并且有高效的GC打扫运行场地。∴，v8是可以信任的，不用担心性能问题。
    "如何使用v8，官方有些例子，基本够用了。提供的API是C++风格的（参看v8.h/api.cc）。在阅读nodejs代码之前，熟悉v8的使用方式是很必要的。"
*/
//nodejs启动
/*
    入口在node_main.cc ,解析参数后进入node.cc *[1] 中的node::Start()
 */
    V8::Initialize()    //初始化v8
    SetupProcessObject()    //在v8中创建process对象
    Load()              //bootstrap,加载执行node.js
    uv_run()            //调用libuv,开始异步事件polling和处理

//模块装载
/* 
    为了和用户编写的模块做区别，作者将nodejs自带的模块称为系统模块，其中C++模块在src目录中，node_开头的那些文件大部分是，JavaScript模块在lib目录中。模块装载是指将C++或者JavaScript模块加载到v8引擎中，生成对象系统，可供JavaScript代码调用。nodejs采用了延迟加载的策略，系统模块只有用到的时候才会加载，加载完后放到binding_cache中。

    上面提到，nodejs在启动的时候会创建process对象。process.binding()方法用来将系统模块加载到v8中去(参见node.cc中的Binding函数)*[2]

    C++模块的装载比较直接，一个典型的C++模块具有如下形式，在register_func中将对象，函数等注册到v8中，这样JavaScript代码就能调用他们了。
 */
    void register_func(Handle<Object> target){
        //模块注册函数
    }
    NODE_MODILE(node_test,register_func)    //  加入C++模块列表
/*  对于上面的模块，调用process.binding('test')就可以装载。

    对于JavaScript模块，装载稍微麻烦。首先，lib目录中的js文件，编译nodejs的时候会通过js2c.py将他们转换成C数组，

*/ 

