*/import JsBarcode from 'jsbarcode';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const media = join(__dirname, '..', 'media');

const _svg = readFileSync(join(media, 'welcome.svg'), 'utf-8');

const barcode = (data) => {
  const dom = new JSDOM(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`);
  const svgNode = dom.window.document.querySelector('svg');

  JsBarcode(svgNode, data, {
    xmlDocument: dom.window.document,
  });

  return svgNode.outerHTML;
};

const imageSetter = (img, value) => img?.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', value);
const textSetter = (el, value) => { if (el) el.textContent = value };

const { document: svg } = new JSDOM(_svg).window;

const genSVG = async ({
  wid = '',
  pp = join(media, 'avatar_contact.png'),
  title = '',
  name = '',
  text = '',
  background = '',
} = {}) => {
  const el = {
    code: ['#_1661899539392 > g:nth-child(6) > image', imageSetter, toBase64(await toImg(barcode(wid.replace(/[^0-9]/g, '')), 'png'), 'image/png')],
    pp: ['#_1661899539392 > g:nth-child(3) > image', imageSetter, pp],
    text: ['#_1661899539392 > text.fil1.fnt0', textSetter, text],
    title: ['#_1661899539392 > text.fil2.fnt1', textSetter, title],
    name: ['#_1661899539392 > text.fil2.fnt2', textSetter, name],
    bg: ['#_1661899539392 > g:nth-child(2) > image', imageSetter, background],
  };

  for (const [selector, set, value] of Object.values(el)) {
    const target = svg.querySelector(selector);
    set(target, value);
  }

  return svg.body.innerHTML;
};

const toImg = (svg, format = 'png') => new Promise((resolve, reject) => {
  if (!svg) return resolve(Buffer.alloc(0));
  const bufs = [];
  const im = spawn('magick', ['convert', 'svg:-', format + ':-']);
  im.on('error', e => reject(e));
  im.stdout.on('data', chunk => bufs.push(chunk));
  im.stdin.write(Buffer.from(svg));
  im.stdin.end();
  im.on('close', code => {
    if (code !== 0) reject(code);
    else resolve(Buffer.concat(bufs));
  });
});

const toBase64 = (buffer, mime) => `data:${mime};base64,${buffer.toString('base64')}`;

const render = async ({
  wid = '',
  pp = toBase64(readFileSync(join(media, 'avatar_contact.png')), 'image/png'),
  name = '',
  title = '',
  text = '',
  background = toBase64(readFileSync(join(media, 'Aesthetic', 'Aesthetic_000.jpeg')), 'image/jpeg'),
} = {}, format = 'png') => {
  const svg = await genSVG({
    wid, pp, name, text, background, title,
  });
  return await toImg(svg, format);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  render({
    wid: '1234567890',
    name: 'John Doe',
    text: 'Lorem ipsum\ndot sit color',
    title: 'grup testing',
  }, 'jpg').then((result) => {
    process.stdout.write(result);
  });
}

export default render;*/