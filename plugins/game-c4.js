let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.conecta4 = conn.conecta4 ? conn.conecta4 : {}
    let id = m.chat

    if (Object.values(conn.conecta4).find(room => room.id.startsWith('c4') && [room.p1, room.p2].includes(m.sender))) return m.reply('*⚠️ Ya estás en una partida.*')

    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    if (!who) return m.reply(`*⚠️ Etiqueta a alguien para jugar Conecta 4.*\n\n> *Ejemplo:* ${usedPrefix + command} @user`)
    if (who === m.sender) return m.reply('*🤖 No puedes jugar contra ti mismo.*')

    let room = {
        id: 'c4-' + (+new Date),
        p1: m.sender,
        p2: who,
        board: Array(6).fill(null).map(() => Array(7).fill('⚪')),
        turn: m.sender,
        status: 'WAITING'
    }

    conn.reply(m.chat, `*🔵 CONECTA 4 - AEOWXS 🔴*\n\n@${m.sender.split('@')[0]} reta a @${who.split('@')[0]}.\n\n> *Escribe:* "aceptar" para iniciar.`, m, { mentions: [m.sender, who] })
    conn.conecta4[room.id] = room
}

handler.before = async (m, { conn }) => {
    conn.conecta4 = conn.conecta4 ? conn.conecta4 : {}
    let room = Object.values(conn.conecta4).find(r => [r.p1, r.p2].includes(m.sender) && r.id.startsWith('c4'))
    if (!room) return

    // Aceptar reto
    if (room.status === 'WAITING' && m.text.toLowerCase() === 'aceptar' && m.sender === room.p2) {
        room.status = 'PLAYING'
        return m.reply(`*🎮 Partida Iniciada.*\nTurno de: @${room.turn.split('@')[0]}\n\n${renderBoard(room.board)}\n\n> *Para jugar, escribe el número de la columna (1-7).*`, null, { mentions: [room.turn] })
    }

    // Lógica de juego
    if (room.status === 'PLAYING' && m.sender === room.turn) {
        let col = parseInt(m.text) - 1
        if (isNaN(col) || col < 0 || col > 6) return
        
        // Buscar fila libre en la columna
        let row = -1
        for (let i = 5; i >= 0; i--) {
            if (room.board[i][col] === '⚪') {
                row = i
                break
            }
        }

        if (row === -1) return m.reply('*❌ Esa columna está llena.*')

        room.board[row][col] = room.turn === room.p1 ? '🔵' : '🔴'
        
        if (checkWin(room.board, row, col)) {
            let user = global.db.data.users[m.sender]
            user.coins += 1000
            m.reply(`*🎊 ¡CONECTA 4! 🎊*\n\n@${m.sender.split('@')[0]} ha ganado 1000 ${global.moneda}.\n\n${renderBoard(room.board)}`, null, { mentions: [m.sender] })
            delete conn.conecta4[room.id]
        } else if (room.board.every(row => row.every(cell => cell !== '⚪'))) {
            m.reply(`*🤝 EMPATE.*\n\n${renderBoard(room.board)}`)
            delete conn.conecta4[room.id]
        } else {
            room.turn = room.turn === room.p1 ? room.p2 : room.p1
            m.reply(`*🎮 Turno de:* @${room.turn.split('@')[0]}\n\n${renderBoard(room.board)}`, null, { mentions: [room.turn] })
        }
    }
}

function renderBoard(board) {
    return board.map(row => row.join('')).join('\n') + '\n1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣'
}

function checkWin(board, r, c) {
    const directions = [[0,1], [1,0], [1,1], [1,-1]]
    const color = board[r][c]
    for (let [dr, dc] of directions) {
        let count = 1
        for (let d of [1, -1]) {
            let nr = r + dr * d, nc = c + dc * d
            while (nr >= 0 && nr < 6 && nc >= 0 && nc < 7 && board[nr][nc] === color) {
                count++
                nr += dr * d; nc += dc * d
            }
        }
        if (count >= 4) return true
    }
    return false
}

handler.help = ['c4 @user']
handler.tags = ['game']
handler.command = /^(c4|conecta4)$/i
handler.group = true

export default handler