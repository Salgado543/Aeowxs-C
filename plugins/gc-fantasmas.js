let handler = async (m, { conn, text, participants, command }) => {
  global.siderList = global.siderList || {}
  // Aseguramos variables visuales
  const emotg = global.emotg || '👻';

  // ==========================================
  // 👻 COMANDO: BUSCAR FANTASMAS
  // ==========================================
  if (command === 'fantasmas' || command === 'sider') {
    
    // --- 🛡️ ANTI-BAN FASE 1: BÚSQUEDA ---
    // Simula que el bot está analizando la lista de usuarios
    await conn.sendPresenceUpdate('composing', m.chat);
    
    const min = 3000;
    const max = 6000;
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    // --- 🏁 FIN ANTI-BAN FASE 1 ---

    const member = participants.map(u => u.id)
    let sum = text ? parseInt(text) : member.length
    if (isNaN(sum) || sum <= 0) sum = member.length
    if (sum > member.length) sum = member.length

    let total = 0
    let sider = []

    for (let i = 0; i < sum; i++) {
      const id = member[i]
      const users = m.isGroup ? participants.find(u => u.id === id) : {}
      const user = global.db.data.users[id]
      
      // Definición de inactividad
      const isInactive = !user || user.chat === 0
      const isNotAdmin = !users?.admin && !users?.superAdmin
      const isNotWhitelisted = user ? user.whitelist === false : true

      if (isInactive && isNotAdmin && isNotWhitelisted) {
        total++
        sider.push(id)
      }
    }

    if (total === 0) return conn.reply(m.chat, `*⚠️ En este grupo no hay fantasmas.*`, m)

    // Arreglé la sintaxis del map para que el emoji se vea bien
    let mensaje = `𝗙𝗔𝗡𝗧𝗔𝗦𝗠𝗔𝗦 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢𝗦 👻\n*INTEGRANTES:* ${sum}\n*INACTIVOS:* ${total}\n\nෆ *ETIQUETAS*\n${sider.map(v => `${emotg} @${v.split('@')[0]}`).join('\n')}`

    await conn.sendMessage(m.chat, {
      text: mensaje,
      mentions: sider,
      footer: '☕ Este mensaje puede no ser 100% preciso. El bot empieza a monitorear la inactividad desde que los usuarios se unen.',
      // Nota: Si usas una versión muy nueva de Baileys, los botones tipo 'buttons' pueden no verse.
      // Si no se ven, el usuario deberá escribir el comando manualmente.
      buttons: [
        {
          buttonId: '.kickfantasmas',
          buttonText: { displayText: '🚮 Eliminar fantasmas' },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m })

    global.siderList[m.chat] = sider
  }

  // ==========================================
  // 🚮 COMANDO: ELIMINAR FANTASMAS
  // ==========================================
  if (command === 'kickfantasmas') {
    let sider = global.siderList[m.chat]
    if (!sider || !sider.length) return conn.reply(m.chat, '*⚠️ No hay fantasmas registrados o ya fueron expulsados.*', m)

    // --- 🛡️ ANTI-BAN FASE 2: PREPARACIÓN ---
    await conn.reply(m.chat, `*⚠️ Iniciando eliminación de ${sider.length} usuarios con protocolo de seguridad (Anti-Ban)...*`, m)
    await conn.sendPresenceUpdate('composing', m.chat);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    // --- 🏁 FIN ANTI-BAN FASE 2 ---

    // Variable para contar eliminados reales
    let eliminados = 0;

    for (let user of sider) {
      try {
        // --- 🛡️ ANTI-BAN FASE 3: INTERVALO VARIABLE ---
        // En lugar de 3s fijos, usamos entre 3s y 6s.
        // Esto evita que WhatsApp detecte un patrón robótico exacto.
        const kickDelay = Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;
        
        await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
        eliminados++;
        
        // Esperamos el tiempo aleatorio antes del siguiente
        await new Promise(resolve => setTimeout(resolve, kickDelay)) 
        
      } catch (e) {
        // Si falla (ej. el usuario ya se salió), no detenemos el bucle
        // console.error(`No se pudo eliminar a ${user}`);
      }
    }

    conn.reply(m.chat, `✅ *Proceso finalizado.*\nSe eliminaron ${eliminados} fantasmas.\n\n_Nota: Se usaron intervalos variables para proteger el número._`, m)
    delete global.siderList[m.chat]
  }
}

handler.help = ['fantasmas', 'kickfantasmas']
handler.tags = ['gc']
handler.command = /^(fantasmas|sider|kickfantasmas)$/i
handler.admin = true
handler.botAdmin = true

export default handler