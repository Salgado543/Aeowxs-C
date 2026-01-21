import os from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

let handler = async (m, { conn }) => {
    const format = sizeFormatter({
        std: 'JEDEC',
        decimalPlaces: 2,
        keepTrailingZeros: false,
        render: (literal, symbol) => `${literal} ${symbol}B`,
    })

    // Cálculo de velocidad de respuesta
    const old = performance.now()
    const now = performance.now()
    const speed = (now - old).toFixed(4)

    // Información de memoria
    const used = process.memoryUsage()
    const totalRam = os.totalmem()
    const freeRam = os.freemem()
    const usedRam = totalRam - freeRam

    // Información del sistema
    const uptime = process.uptime() * 1000
    const platform = os.platform()
    const cpu = os.cpus()[0].model

    let txt = `*📊 STATUS DEL SISTEMA - AEOWXS 📊*\n\n`
    txt += `*🚀 VELOCIDAD:* ${speed} ms\n`
    txt += `*⏳ ACTIVIDAD:* ${clockString(uptime)}\n\n`
    
    txt += `*💻 SERVIDOR:*\n`
    txt += `> *Plataforma:* ${platform}\n`
    txt += `> *CPU:* ${cpu}\n`
    txt += `> *RAM:* ${format(usedRam)} / ${format(totalRam)}\n`
    txt += `> *Uso NodeJS:* ${format(used.heapUsed)}\n\n`
    
    txt += `> *${global.wm}*`

    await m.reply(txt)
}

handler.help = ['ping', 'stats']
handler.tags = ['main']
handler.command = /^(ping|stats|status|vps)$/i

export default handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}