const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    devtool: "none",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname,"dist")
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader','sass-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
                }
              }
            ]
          }
    ],
  },
  watch: true
}