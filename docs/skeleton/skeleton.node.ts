const fs = require('fs')
const htmlMinifier = require('html-minifier')
const path = require('path')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const renderer = createBundleRenderer(path.resolve('dist/skeleton.json'), {
    template: fs.readFileSync(path.resolve('dist/index.html'), 'utf-8')
})

renderer.renderToString({}, (err, html) => {
    html = htmlMinifier.minify(html, {
        collapseWhitespace: true,
        minifyCSS: true,
        inject: 'body',
    })

    fs.writeFileSync('dist/index.html', html, 'utf-8');
})
