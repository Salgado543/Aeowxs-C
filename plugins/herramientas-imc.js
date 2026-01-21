let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0] || !args[1]) return m.reply(`*⚖️ CALCULADORA DE SALUD (IMC) ⚖️*\n\n*Uso:* ${usedPrefix + command} <peso_kg> <altura_metros>\n\n> *Ejemplo:* ${usedPrefix + command} 70 1.75`)

    let peso = parseFloat(args[0])
    let altura = parseFloat(args[1].replace(',', '.'))

    if (isNaN(peso) || isNaN(altura) || altura <= 0) return m.reply('*❌ Datos inválidos. Asegúrate de poner números correctos.*')

    try {
        m.react('⚖️')
        // Lógica local: IMC = peso / (altura * altura)
        let imc = peso / (altura * altura)
        let estado = ""
        let color = ""

        if (imc < 18.5) { estado = "Bajo peso"; color = "🟡" }
        else if (imc < 24.9) { estado = "Peso normal (Saludable)"; color = "🟢" }
        else if (imc < 29.9) { estado = "Sobrepeso"; color = "🟠" }
        else if (imc < 34.9) { estado = "Obesidad Grado I"; color = "🔴" }
        else if (imc < 39.9) { estado = "Obesidad Grado II"; color = "🛑" }
        else { estado = "Obesidad Grado III (Mórbida)"; color = "💀" }

        let txt = `*⚖️ RESULTADOS DE SALUD - AEOWXS ⚖️*\n\n`
        txt += `> *Peso:* ${peso} kg\n`
        txt += `> *Altura:* ${altura} m\n\n`
        txt += `*TU IMC:* ${imc.toFixed(2)}\n`
        txt += `*ESTADO:* ${color} ${estado}\n\n`
        
        txt += `*Nota:* Esta es una referencia matemática basada en estándares de la OMS.`

        m.reply(txt)
    } catch (e) {
        m.reply('*❌ Ocurrió un error al calcular.*')
    }
}

handler.help = ['imc']
handler.tags = ['tools']
handler.command = /^(imc|masa|salud)$/i

export default handler