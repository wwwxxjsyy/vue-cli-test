const plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}
//去掉所有页面的console
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}