# lqsblog-frontend-midway-vue3-ssr

 它（[Github](https://github.com/lqsong/lqsblog-frontend-midway-vue3-ssr) 、 [Gitee](https://gitee.com/lqsong/lqsblog-frontend-midway-vue3-ssr)）是一个PC端、WAP端自适应展示的一个前端网站前台，它基于 [midway-vue3-ssr](http://midway-vue3-ssr.liqingsong.cc/)实现。

 
## 开发文档

- [DEMO](http://liqingsong.cc/)

- [lqsBlog官方文档](http://docs.liqingsong.cc/)。

- [使用文档](http://midway-vue3-ssr.liqingsong.cc/)

## 功能

```
- 首页
  -- 随笔作品列表
- 关于
- 随笔
- 作品
- 专题
- 邻居

- 音乐
- 主题
- 百度统计
```


## 界面展示

![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/index1.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/index2.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/index3.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/index4.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/index5.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/index6.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/index7.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index_nav.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index1.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index2.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index3.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index4.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index5.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index6.png) 
![index](http://docs.liqingsong.cc/img/midway-vue3-ssr/m_index7.png) 


## 快速入门

> 请使用 pnpm , **[pnpm的安装与使用](http://liqingsong.cc/article/detail/26)** 。

### 本地开发

```bash
$ pnpm i
$ pnpm dev
$ open http://localhost:8002/
```

> 推荐使用 pm2 部署 , **[PM2安装与常用命令](http://liqingsong.cc/article/detail/3)** 。

### 部署

```bash
$ pnpm i # 安装开发期依赖
$ pnpm build # 构建项目
$ pnpm prune --production  # 移除开发依赖
$ pnpm start # 启动项目，对应的 pm2 命令为: NODE_ENV=production pm2 start ./bootstrap.js --name lqsblog -i 4
```


### 配置 nginx 反向代理

```bash
http {
    # 内部添加以下内容
    server {
        # 监听 80 端口 ，你也可以设置其他端口但是访问域名时需要加上端口访问
        listen       80;
        # 你的网址，如果是本地测试，也可以设置你本地的ip
        server_name  liqingsong.cc;
        location / {
            # 代理地址，你本地 nuxt 的访问地址
		        proxy_pass  http://127.0.0.1:8002;
            index  index.html index.htm;
            
        }  
    }
}
```


## 捐赠

如果你觉得这个项目帮助到了你，请帮助点击 Star，你也可以请作者喝咖啡表示鼓励.

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](http://uploads.liqingsong.cc/20210430/f62d2436-8d92-407d-977f-35f1e4b891fc.png)  |  ![Wechat](http://uploads.liqingsong.cc/20210430/3e24efa9-8e79-4606-9bd9-8215ce1235ac.png)

