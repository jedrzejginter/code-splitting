const { join } = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias['@'] = join(__dirname, 'src')
    return config
  },
}
