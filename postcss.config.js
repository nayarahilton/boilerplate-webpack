module.exports = ({ file, options, env }) => ({
    plugins: {
          'cssnano': env === 'production' ? { safe: true } : false,
          'autoprefixer': true,
          'lost': env === 'development' ? { safe: true } : false
    }
})