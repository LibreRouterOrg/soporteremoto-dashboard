 const { override, fixBabelImports, addLessLoader } = require('customize-cra');
 const path = require('path');
 const fs  = require('fs');
 const lessToJs = require('less-vars-to-js');
 const themeVars = lessToJs(fs.readFileSync(path.join(__dirname, './src/antTheme.less'), 'utf8'));

 module.exports = override(
   fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   addLessLoader({
     javascriptEnabled:true,
     modifyVars: themeVars,
   }),
 );