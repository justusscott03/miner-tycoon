const path = require("path");
console.log(">>> USING WEBPACK CONFIG <<<");

module.exports = {
  mode: "development",

  // ⭐ Multiple entry points (separate bundles)
  entry: {
    game: "./src/index.ts",
    shapeEditor: "./src/engine/tools/ShapeEditor.ts",
    prefabGenerator: "./src/engine/tools/PrefabGenerator.ts"
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  output: {
    filename: "[name].js",                 // ⭐ game.js, shapeEditor.js, prefabGenerator.js
    path: path.resolve(__dirname, "dist"),
    clean: true                            // optional: clears dist/ before each build
  },

  // ⭐ Fix for macOS file watching
  watchOptions: {
    poll: 500,
    ignored: /node_modules/
  },

  devServer: {
    static: "./",
    hot: true,

    // ⭐ Watch all source files
    watchFiles: ["src/**/*"]
  }
};
