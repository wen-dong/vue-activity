const PORT = 8866;
const CURRENT_PROJECT = 'myProject'; // string 当前构建项目

// 代理配置 -- 避免跨域问题
const PROXY = {
  '/api': {
    target: 'https://m.api.com',
    secure: false,
    changeOrigin: true
  },
}

// 是否开启打包图片压缩 { Boolean } trur 开启 false 不开启
const IMAGE_COMPRESS = true

module.exports = {
  PORT,
  CURRENT_PROJECT,
  PROXY,
  IMAGE_COMPRESS,
};
