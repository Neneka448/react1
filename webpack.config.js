const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin =require('copy-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
process.env.NODE_ENV="production"

require('dotenv-expand')(
  require('dotenv').config({
      path:path.resolve(__dirname,'./.env.local')
    }
  )
)

module.exports={
  entry:'./src/index.tsx',
  devtool:process.env.NODE_ENV==='development'?"source-map":"cheap-module-source-map",
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name]_[contenthash].js',
    chunkFilename:'js/[name]_chunk_[contenthash].js',
    publicPath:process.env.NODE_ENV==="production"?'/':'/',
  },
  mode:process.env.NODE_ENV,
  resolve:{
    extensions:['.ts','.tsx','.css','.json','.js','.jsx'],
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  module:{
    rules:[
      {
        test:/\.tsx?$/i,
        use:[
          {
            loader:'esbuild-loader',
            options:{
              loader:'tsx',
              target:'es2015'
            }
          },
        ]
      },
      {
        test:/\.css/i,
        use:[
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader:'css-loader'
          },
          {
            loader:'postcss-loader'
          }
        ],
        sideEffects:true
      },
      {
        test:/\.(scss|sass)$/i,
        use:[
          {
            loader: 'style-loader'
          },
          {
            loader:'css-loader',
            options:{
              importLoaders:3
            }
          },
          {
            loader:'postcss-loader'
          },
          {
            loader:'resolve-url-loader'
          },
          {
            loader:'sass-loader'
          }
        ]
      },
      {
        test:/\.png$/,
        type:'asset/resource'
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/[name].[contenthash].css',
      chunkFilename:'css/[name]_chunk_[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'./public/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env':JSON.stringify(process.env.NODE_ENV)
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'public'),
          globOptions:{
            ignore:['**/*.html']
          },
          to:path.resolve(__dirname,'dist')
        }
      ]
    }),
    //new BundleAnalyzerPlugin()
    new webpack.ProvidePlugin({
      "React":"react"
    })
  ],
  devServer:{
    hot:true,
    open:true,
    compress:true,
    static:{
      directory:path.resolve(__dirname,'public'),
      publicPath: '/'
    },
    proxy:{
      '/passage':{
        pathRewrite:{
          '^/passage':""
        }
      }
    }
  },
  optimization:{
    minimize: true,
    runtimeChunk:'single',
    moduleIds:'deterministic',
    splitChunks:{
      cacheGroups:{
        vendor:{
          test:/[\\/]node_modules[\\/]/,
          name:'vendors',
          reuseExistingChunk:true,
          chunks:'all',
        },
        default:{
          minChunks:2,
          reuseExistingChunk:true
        }
      }
    }
  },
  performance: false
}