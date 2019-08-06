const path = require('path');
const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVars = lessToJs(fs.readFileSync(path.join(__dirname, '../src/antTheme.less'), 'utf8'));

module.exports = async ({ config, mode }) => {

  config.module.rules.push({
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      options: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: [
            "@babel/plugin-proposal-class-properties",
              ['import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
              }]
          ]
      },
  });

  config.module.rules.push({
      test: /\.less$/,
      loaders: [
          'style-loader',
          'css-loader',
          {
              loader: 'less-loader',
              options: {
                  modifyVars: themeVars,
                  javascriptEnabled: true
              }
          }
      ],
      include: [
        path.resolve(__dirname, '../src'),
        /[\\/]node_modules[\\/].*antd/
      ]
  });
  return config;
};
