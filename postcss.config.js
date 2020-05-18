// module.exports = {
//   plugins: [
//     require('autoprefixer')(),
//     require('postcss-import')(),
//     require('postcss-pxtorem')({
//       rootValue: 75,
//       propList: ['*']
//     })
//   ]
// }

function postcssPlugins(isPc) {
  if (isPc) {
    return [
      require('autoprefixer')(),
      require('postcss-import')()
    ]
  }
  return [
    require('autoprefixer')(),
    require('postcss-import')(),
    require('postcss-pxtorem')({
      rootValue: 75,
      propList: ['*']
    })
  ]
};
module.exports = postcssPlugins;
