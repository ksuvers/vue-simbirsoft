const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    module.exports = {
        configureWebpack: {
            devtool: "source-map"
        },
        devServer: {
            proxy: process.env.VUE_APP_API_URL
        },
    };
} else {
    module.exports = {
        publicPath: "/vue-simbirsoft/",
    };
}