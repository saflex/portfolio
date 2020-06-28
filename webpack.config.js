const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");


module.exports = {
    //mode: 'development',
    mode: 'production',

    entry: {
        'main': './src/js/index.js',
    },


    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "./js/[name].js"
    },

    devServer: {
        overlay: true,
        // host: '192.168.0.23',
    },


    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'index.html',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'about.html',
            template: './src/about.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'portfolio.html',
            template: './src/portfolio.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'skills.html',
            template: './src/skills.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'],
            filename: 'contacts.html',
            template: './src/contacts.html',
        }),

        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "./css/[name].css"
            //filename: './css/styles.css'
        }),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new MinifyPlugin({}, {
            comments: false
        }),

    ],


    module: {
        rules: [


            {
                test: /\.html$/,
                loader: 'html-loader',
            },



            {
                test: /\.(gif|png|jpg|jpeg|svg)$/i,
                include: /background-img/,
                use: [{
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            useRelativePath: true,
                            outputPath: "img",
                            publicPath: "../img",

                            //name: '[name].[ext]',
                            //useRelativePath: true
                        },


                    },



                ]
            },


            {
                test: /\.(pdf)$/i,
                include: /pdf/,
                use: [{
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            useRelativePath: true,
                            outputPath: "pdf",
                            publicPath: "pdf",
                        },


                    }

                ]
            },


            {
                test: /\.(png|ico)$/i,
                include: /favicons/,
                use: [{
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            useRelativePath: true,
                            outputPath: "img/favicons",
                            publicPath: "img/favicons",

                            //name: '[name].[ext]',
                            //useRelativePath: true
                        },


                    }

                ]
            },




            {
                test: /\.(gif|png|jpg|jpeg|svg|pdf)$/i,


                include: /inline-img/,
                use: [{
                        loader: 'file-loader',

                        options: {
                            name: '[name].[ext]',
                            useRelativePath: true,
                            outputPath: "img",
                            publicPath: "img",
                        },


                    },




                ]
            },



            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',

                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    grid: true,
                                    browsers: ['>1%']
                                })
                            ],

                        }
                    },


                    {
                        loader: "group-css-media-queries-loader",
                        options: {}
                    },

                    {
                        loader: 'sass-loader',

                    },



                ]
            },




            // {
            //     test: /\.(eot|ttf|woff|woff2)$/,
            //     use: [{
            //         loader: "file-loader?name=fonts/[name]-[hash].[ext]",
            //         options: {
            //             name: "[name].[ext]",
            //             outputPath: 'fonts/',
            //             publicPath: '../fonts/'
            //         }
            //     }]
            // },


                        {
                test: /\.(woff(2)?|ttf|eot)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/",
                        publicPath: '../fonts/'
                    }
                }]
            },



            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: "babel-loader",
                    //exclude: /node_modules/,
                }]
            },




        ],
    },
}