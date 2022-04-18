const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // all options are optional
          filename: "styles.css",
          chunkFilename: "[id].css",
          ignoreOrder: true, // Enable to remove warnings about conflicting order
        }),
    ],

    entry: "./src/index.tsx",

    // mode: "development",
    // devtool: "inline-source-map",

    mode: "production",
    devtool: "source-map",

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {        
                test: /\.css$/,        
                use: [MiniCssExtractPlugin.loader, "css-loader"]  
                // use: ["style-loader", "css-loader"]      
            },       
            {
                test: /\.(webp)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
            },}
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
            parallel: true,
            minimizerOptions: {
                preset: [
                  "default",
                  {
                    discardComments: { removeAll: true },
                  },
                ],
              },         
          }),
        ],
    },
    
    watch: true,
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
}