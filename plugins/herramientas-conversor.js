import axios from 'axios'

let handler = async (m, { args, usedPrefix, command }) => {
    // Formato: .cambio 100 usd mxn
    if (args.length < 3) return m.reply(`*💱 CONVERSOR DE DIVISAS 💱*\n\n*Uso:* ${usedPrefix + command} <cantidad> <moneda_base> <moneda_destino>\n\n> *Ejemplo:* ${usedPrefix + command} 100 USD MXN\n> *Ejemplo:* ${usedPrefix + command} 50 EUR ARS`)

    let cantidad = parseFloat(args[0])
    let de = args[1].toUpperCase()
    let a = args[2].toUpperCase()

    // Corrección automática de algunos códigos comunes que la gente escribe mal
    if (de === 'RP') de = 'IDR' // Rupia Indonesia
    if (a === 'RP') a = 'IDR'
    if (de === 'SOL') de = 'PEN' // Sol Peruano
    if (a === 'SOL') a = 'PEN'
    if (de === 'BS') de = 'VES' // Bolívar Venezolano

    if (isNaN(cantidad)) return m.reply('*❌ La cantidad debe ser un número válido.*')

    try {
        m.react('💱')
        
        // Usamos una API JSON pública y estable en lugar de scrapear Google
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${de}`)
        const data = response.data

        if (!data.rates[a]) {
            return m.reply(`*❌ No encontré la tasa de cambio para "${a}".*\n\nAsegúrate de usar códigos ISO válidos (USD, EUR, MXN, COP, ARS, etc).`)
        }

        let tasa = data.rates[a]
        let resultado = (cantidad * tasa).toFixed(2)
        let fecha = data.date

        let txt = `*💱 CAMBIO DE DIVISA - AEOWXS*\n\n`
        txt += `> *Cantidad:* ${cantidad} ${de}\n`
        txt += `> *Convertido:* ${resultado} ${a}\n\n`
        
        txt += `*📊 Detalles:*\n`
        txt += `> *Tasa:* 1 ${de} = ${tasa} ${a}\n`
        txt += `> *Fecha:* ${fecha}\n\n`
        
        txt += `*${global.wm || 'Aeowxs Club'}*`

        m.reply(txt)

    } catch (e) {
        console.error(e)
        // Manejo de errores específicos
        if (e.response && e.response.status === 404) {
            return m.reply(`*❌ La moneda base "${de}" no parece ser válida.*\nIntenta usar códigos internacionales como USD, MXN, EUR.`)
        }
        m.reply('*❌ Error de conexión con el servidor de divisas.*')
    }
}

handler.help = ['cambio']
handler.tags = ['tools']
handler.command = /^(cambio|divisa|convertir|moneda)$/i

export default handler