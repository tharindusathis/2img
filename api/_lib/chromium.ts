import { launch, Page } from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: Page | null;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(html: string, type: FileType, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: 2048, height: 1170 });
    await page.setContent(html);

    const heading = await page.$('.heading');
    if(heading != null){
        let h = 99999;
        let size = 500;
        while(h > 1170){
            const box = await heading.boundingBox();
            const height = (box || {}).height; 
            h = height || 0;
            size = size - 5;
            await page.addStyleTag({content: `.heading{font-size: ${size}px}`})
        }
    }
    const file = await page.screenshot({ type });
    return file;
}
