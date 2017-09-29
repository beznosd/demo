exports.files = {
  javascripts: {
    joinTo: {
      'js/app.js': /^app/,
      'js/vendor.js': /^(?!app)/
    }
  },
  stylesheets: {
    joinTo: 'css/app.css'
  },
};

exports.plugins = {
  babel: {
    presets: ['env', 'react']
  },
  postcss: {
    processors: [
      require('autoprefixer')(['> 1%', 'safari 9']),
      require('cssnano')
    ]
  }
};

exports.npm = {
  javascripts: {
    jquery: ['dist/jquery.min'],
    bootstrap: ['dist/js/bootstrap.min']
  },
  styles: {
    bootstrap: ['dist/css/bootstrap.css']
  }
};

exports.sourceMaps = true;