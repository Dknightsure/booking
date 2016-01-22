var path = require("path");
var webpack = require("webpack");
module.exports = {
    cache: true,
    entry: {
        script: "./src/script.js"
    },
    output: {
        path: path.join(__dirname, "public/js"),
        // publicPath: "htt://www.baidu.com",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    plugins:[
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};
