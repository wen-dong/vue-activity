# vue-activity 活动框架

## 依赖安装
npm  i or cnpm i or yarn add

## 服务启动

npm run dev

## 构建打包

npm run build

## 创建新的目录

npm run create projectName
{projectName} 目录名 创建之后还需改下对应的 CURRENT_PROJECT

## config配置

PORT 端口号

CURRENT_DIR 当前目录名

CURRENT_PROJECT 当前开发目录名

proxy 代理

IMAGE_COMPRESS 是否开启图片压缩

## 图片转base64

如果图片名字含有ban64的文字，就表示不转base64, 否则图片小于10kb的就会转为base64
>如share_ban64.jpg表示不转

##### px-to-rem
默认开启px-to-rem 如果不想将 p x转为 rem，可以将文件名改为 xxx.pc.scss 或者 xxx.pc.css


