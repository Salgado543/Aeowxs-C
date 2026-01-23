import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.botNumber = ''

global.owner = [
   ['5217341011505', 'Gio', true], // Tu número principal
   ['15796761978', '@Gio', true],
   ['16292869829', 'Santi', true]
]

global.own = ['5217341011505'] // Formato México 521
global.ownname = 'Gio'
global.ownp = 'Mexico 🇲🇽'

global.mods = ['']
global.prems = ['']

// DATOS DE AEOWXS CLUB
global.packname = 'Aeowxs Club'
global.botname = 'Aeowxs - Bot'
global.wm = 'Aeowxs Club'
global.wm2 = '@Aeoɯxs Club'
global.author = 'Aeoɯxs Club'
global.dev = 'Aeoɯxs - G'
global.namebot = 'Aeowxs'
global.nameai = 'Aeowxs AI'
global.textbot = 'AEOWXS CLUB'
global.vs = '1.0.0'
global.emotg = '⚜️'
global.msgtagall = '⚠️ ATENCIÓN GRUPO ⚠️'
global.sessions = 'Session'
global.jadi = 'JadiBots'
global.moneda = 'AeowxCoins 🪙'


global.catalogo = fs.readFileSync('./media/catalogo.jpeg')

// TUS ENLACES ACTUALIZADOS
global.grupo = 'https://chat.whatsapp.com/C4vXg9OadhNDVHFm1Q0fhv'
global.comu = 'https://chat.whatsapp.com'
global.channel = 'https://whatsapp.com/channel/0029Vb6Ys0q6xCSV5iyFfw1T'
global.ig = 'https://www.instagram.com/co.dxgio'


// Estilo visual del mensaje falso
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5217341011505-120363317332020195@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: 'Aeowxs ⚜️ Club', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}


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