
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

let rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
let bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
let mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

const abhaya = readFileSync(`${__dirname}/../_fonts/UN-Abhaya.ttf`).toString('base64');
const abhaya_bold = readFileSync(`${__dirname}/../_fonts/UN-Abhaya-bold.ttf`).toString('base64');
const alakamanda = readFileSync(`${__dirname}/../_fonts/UN-Alakamanda.ttf`).toString('base64');
const arundathee = readFileSync(`${__dirname}/../_fonts/UN-Arundathee.ttf`).toString('base64');
const basuru = readFileSync(`${__dirname}/../_fonts/UN-Basuru.ttf`).toString('base64');
const bindumathi = readFileSync(`${__dirname}/../_fonts/UN-Bindumathi.ttf`).toString('base64');
const davasa = readFileSync(`${__dirname}/../_fonts/UN-Davasa.ttf`).toString('base64');
const derana = readFileSync(`${__dirname}/../_fonts/UN-Derana.ttf`).toString('base64');
const dharanee = readFileSync(`${__dirname}/../_fonts/UN-Dharanee.ttf`).toString('base64');
const disapamok = readFileSync(`${__dirname}/../_fonts/UN-Disapamok.ttf`).toString('base64');
const ganganee = readFileSync(`${__dirname}/../_fonts/UN-Ganganee.ttf`).toString('base64');
const gurulugomi = readFileSync(`${__dirname}/../_fonts/UN-Gurulugomi.ttf`).toString('base64');
const imanee = readFileSync(`${__dirname}/../_fonts/UN-Imanee.ttf`).toString('base64');
const indeewaree = readFileSync(`${__dirname}/../_fonts/UN-Indeewaree.ttf`).toString('base64');
const isiwara = readFileSync(`${__dirname}/../_fonts/UN-Isiwara.ttf`).toString('base64');
const malithi = readFileSync(`${__dirname}/../_fonts/UN-Malithi.ttf`).toString('base64');
const rajantha = readFileSync(`${__dirname}/../_fonts/UN-Rajantha.ttf`).toString('base64');
const rashmi = readFileSync(`${__dirname}/../_fonts/UN-Rashmi.ttf`).toString('base64');
const samantha = readFileSync(`${__dirname}/../_fonts/UN-Samantha.ttf`).toString('base64');
const sandhyanee = readFileSync(`${__dirname}/../_fonts/UN-Sandhyanee.ttf`).toString('base64');

const customFonts: {[key: string]: string} = {
    abhaya, 
    abhaya_bold, 
    alakamanda,
    arundathee,
    basuru,
    bindumathi,
    davasa,
    derana,
    dharanee,
    disapamok,
    ganganee,
    gurulugomi,
    imanee,
    indeewaree,
    isiwara,
    malithi,
    rajantha,
    rashmi,
    samantha,
    sandhyanee
}


function setFontFamily(fontFamily: string = 'abhaya'){
    console.log('setFontFamily', fontFamily);
    
    const font: string = customFonts[fontFamily] || customFonts['abhaya'];
    if(font){
        rglr = font;
        bold = font;
        mono = font;
    }
}

function getCss(theme: string, fontSize: string, fontFamily?: string) {

    setFontFamily(fontFamily);

    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    if (theme === 'dark') {
        background = 'black';
        foreground = 'white';
        radial = 'dimgray';
    }
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }

    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, theme, md, fontSize, fontFamily, images, widths, heights } = parsedReq;
    if (images.length === 0){
        return `<!DOCTYPE html>
        <html>
            <meta charset="utf-8">
            <title>Generated Image</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                ${getCss(theme, fontSize, fontFamily)}
            </style>
            <body>
                <div>
                    <div class="spacer">
                    <div class="heading">${emojify(
                        md ? marked(text) : sanitizeHtml(text)
                    )}
                    </div>
                </div>
            </body>
        </html>`;
    }

    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize, fontFamily)}
    </style>
    <body>
        <div>
            <div class="spacer">
            <div class="logo-wrapper">
                ${images.map((img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i])
                ).join('')}
            </div>
            <div class="spacer">
            <div class="heading">${emojify(
                md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus"> </div>';
}
