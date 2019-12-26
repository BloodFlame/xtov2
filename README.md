# xtov2
基于项目xto(npm搜索xto, 快递信息获取)更新到最新的接口

# 部署

## 下载并安装nodejs，https://nodejs.org/en/download/
	自带包管理工具npm

## 然后在项目根目录执行
	npm install

## 安装好依赖以后可以通过
	node app.js 启动项目

## 生产部署建议使用pm2代理 https://pm2.io/
### 首先全局安装
	npm install pm2 -g

### 然后启动服务
	pm2 start app.js --name '服务名称' -i x
	x 是启动的进程数，如果不加-i参数则是单进程服务，建议使用，x推荐和CPU核心数相同
### 常用指令
	pm2 stop xxx
	pm2 restart xxx 
	pm2 reload xxx		restart会终止当前请求，reload会等待当前请求处理结束
	pm2 delete xxx
	pm2 scale xxx n		修改进程数
	pm2 list			查看所有代理服务
	pm2 logs xxx		查看某一服务的日志
	
# 项目非常简单，没有集成日志系统，可以使用pm2的日志收集，目录默认~/.pm2/logs
