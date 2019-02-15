const path = require('path');
const autoprefixer = require('autoprefixer');
const { injectBabelPlugin, getLoader } = require('react-app-rewired');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');

const fileLoaderMatcher = function (rule) {
    return rule.loader && rule.loader.indexOf(`file-loader`) != -1;
};


module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', {
        libraryName: 'antd',
        //style: 'css',
        style: true,
    }], config);

    config.module.rules.push({
        test: /\.scss$/,
        use: [
            require.resolve('style-loader'),
            {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                },
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9', // React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                        }),
                    ],
                },
            },
            {
                loader: require.resolve('sass-loader'),
                options: {},
            },
        ],
    });

    config.module.rules.push({
        test: /\.less$/,
        use: [
            {
                loader: 'style-loader',
                options: {},
            },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                },
            },
            AntdScssThemePlugin.themify('less-loader'),
        ],
    });

    config.plugins.push(new AntdScssThemePlugin(path.join(__dirname, 'src', 'theme.scss')));

    // file-loader exclude
    let l = getLoader(config.module.rules, fileLoaderMatcher);
    l.exclude.push(/\.less$/);
    l.exclude.push(/\.scss$/);

    return config;
};
