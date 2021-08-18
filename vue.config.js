module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "job to be done";
                return args;
            })
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/style/variables.scss";`
            }
        }
    }
}