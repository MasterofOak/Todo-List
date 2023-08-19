const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, "public"),
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/, 
        poll: 1000,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
