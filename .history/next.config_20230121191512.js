const withOptimizedImages = require('next-optimized-images')
const fs = require('fs');
const dotenv = require('dotenv');
const env = dotenv.parse(fs.readFileSync('.env'));

module.exports = withOptimizedImages({
  reactStrictMode: true,
  env: env,
  images: {
    domains: ['drive.google.com', "combustible.vercel.app"],
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    optimizeImages: true,
    optimizeImagesInDev: false,
    mozjpeg: {
      quality: 80,
    },
    optipng: {
      optimizationLevel: 3,
    },
    pngquant: false,
    gifsicle: {
      interlaced: true,
      optimizationLevel: 3,
    },
    webp: {
      preset: 'default',
      quality: 75,
    },
  },
})
