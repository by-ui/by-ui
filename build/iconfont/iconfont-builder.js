const path = require('path');
const fs = require('fs');
const color = require('colors-cli');
const {
    createSVG,
    createTTF,
    createEOT,
    createWOFF,
    createWOFF2,
    copyTemplate
} = require("svgtofont/src/utils");


const options = {
    src: path.resolve('docs/assets/icon-svgs'), // svg 图标目录路径
    dist: path.resolve('_intermediate/iconfonts'), // 输出到指定目录中
    fontName: 'by-icon', // 设置字体名称
    fontSize: '16px',
    clssaNamePrefix: 'icon',
    svgicons2svgfont: {
        fontHeight: 1000,
        normalize: true
    },
}

let cssString = [];

fs.exists("./_intermediate/iconfonts", exists => {
    if (!exists) {
        fs.mkdir('./_intermediate', error => {});
        fs.mkdir('./_intermediate/iconfonts/', error => {})
    }

    createSVG(options) // SVG => SVG Font
        .then(UnicodeObject => {
            Object.keys(UnicodeObject).forEach(name => {
                let _code = UnicodeObject[name];
                cssString.push(`.${options.clssaNamePrefix}-${name}:before { content: "\\${_code.charCodeAt(0).toString(16)}"; }\n`);
            });
        })
        .then(() => createTTF(options)) // SVG Font => TTF
        .then(() => createWOFF(options)) // TTF => WOFF
        .then(() => createWOFF2(options)) // TTF => WOFF2
        .then(() => {
            const font_temp = path.resolve(__dirname, "iconfont-builder-template");
            return copyTemplate(font_temp, options.dist, {
                fontname: options.fontName,
                fontsize: options.fontSize || '16px',
                cssString: cssString.join(""),
                timestamp: new Date().getTime(),
                prefix: options.clssaNamePrefix || options.fontName
            });
        }).then(() => {
            console.log(`${color.green('✔')} Iconfont Build Success\n`)
        })

})
