const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    require('tailwindcss'),
    process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,

    process.env.NODE_ENV === 'production'
      ? cssnano({ preset: 'default' })
      : null,

    process.env.NODE_ENV === 'production' ? purgecss({
      content: ['./layouts/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      whitelist: ['py-1.5, carousel, carousel__viewport, carousel__track']
    }) : null
  ]
}
