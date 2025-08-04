import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
   ['573155227977', 'Jota 🐼', true],
   ['51927238856', 'Dev Criss 🇦🇱', true],
   ['51990841568', 'Soporte', true],
   ['5216641784469', '《BrayanOFC》', true],
]

global.creator = [
   ['51927238856', 'Dev Criss 🇦🇱', true]
]

global.mods = ['51990841568', '51965911060', '51906168999']
global.prems = ['51965911060', '51906168999']


global.packname = 'Jota Bot MD'
global.botname = 'Jota Bot - MD'
global.wm = 'Jota Bot - MD'
global.author = '𝖲𝗁⍺𝖽ᦅ𝗐′𝗌 𝖢𝗅𝗎𝖻'
global.dev = '𝖯𑄜𝗐𝖾𝗋𝖾𝖽 𝖻𝗒 𝖲𝗁⍺𝖽ᦅ𝗐′𝗌 𝖢𝗅𝗎𝖻'
global.errorm = 'Error: ${error.message}'
global.namebot = 'Jota'
global.nameai = 'Jota Ai'
global.textbot = 'JOTA BOT MD'
global.textmain = 'JOTABOT'
global.textmain2 = 'Jota Bot MD'
global.vs = '2.1.0'
global.emotg = '🐼🤍'
global.msgtagall = '𝗝𝗢𝗧𝗔 𝗕𝗢𝗧 𝗟𝗢𝗦 𝗜𝗡𝗩𝗢𝗖𝗔 👹'
global.moneda = 'ShadowCoins 🪙'


global.catalogo = fs.readFileSync('./media/catalogo.jpg')


global.grupo = 'https://chat.whatsapp.com/IJyN3cklID5HVKU3nAi0XL?mode=ac_t'
global.comu = 'https://chat.whatsapp.com/Er5zgBnAW9A8rfGaXGIvhI?mode=ac_t'
global.channel = 'https://whatsapp.com/channel/0029VauTE8AHltY1muYir31n'
global.ig = 'https://www.instagram.com/dev.criss_vx'


global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "543876577197-120363317332020195@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '𝖲𝗁⍺𝖽ᦅ𝗐′𝗌  乂  𝖢𝗅𝗎𝖻', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}


global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        


global.multiplier = 69 
global.maxwarn = '3'


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})