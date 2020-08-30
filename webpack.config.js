module.exports = {
    target: 'electron-renderer',
    module: {
      rules: [
        {
          test: /\.(t|j)(s|sx)$/,
          include: /frontend/,
          use: {
            loader: "ts-loader",
          },
          resolve: {
            extensions: [".tsx", ".ts", ".js"],
          },
        },
        {
          test: /\.(sc|c|sa)ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
          resolve: {
            extensions: ['png', 'jpg', 'jpeg', 'gif']
          }
        },
      ],
    },
  };
  