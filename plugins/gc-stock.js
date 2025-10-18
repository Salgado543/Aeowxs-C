import fs from 'fs';

// Handler para el comando de stock
const handler = async (m, { conn, text }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language || global.defaultLenguaje;
  const chatId = m.chat;

  // Inicializar base de datos
  if (!global.db.data.stock) global.db.data.stock = {};
  if (!global.db.data.stock[chatId]) global.db.data.stock[chatId] = {};

  const groupStock = global.db.data.stock[chatId];

  // 📦 Ver stock
  if (m.text.startsWith('.stock')) {
    if (Object.keys(groupStock).length === 0) {
      m.reply("✨ *𝐈𝐧𝐯𝐞𝐧𝐭𝐚𝐫𝐢𝐨 𝐯𝐚𝐜𝐢𝐨*");
      return;
    }

    let stockMessage = "📦 *𝐒𝐓𝐎𝐂𝐊 𝐀𝐂𝐓𝐔𝐀𝐋:*\n\n";
    for (const product in groupStock) {
      stockMessage += `🔹 ${product}\n`;
    }

    m.reply(stockMessage.trim());
    return;
  }

  // ➕ Agregar productos al stock
  if (m.text.startsWith('.setstock')) {
    if (!text) {
      m.reply("📋 Escribe los productos que deseas agregar separados por coma.\n\nEjemplo:\n`.setstock Pizza, Hamburguesa, Gaseosa`");
      return;
    }

    // Dividir por coma, eliminar espacios y guardar
    const productos = text.split(',').map(p => p.trim()).filter(p => p);

    for (const producto of productos) {
      groupStock[producto] = true; // Añade o actualiza
    }

    fs.writeFileSync('./database.json', JSON.stringify(global.db));
    m.reply(`✅ *${productos.length} producto(s) agregado(s) al stock.*`);
    return;
  }

  // ❌ Eliminar producto específico
  if (m.text.startsWith('.delstock')) {
    if (!text) {
      m.reply("❌ Escribe el nombre del producto que deseas eliminar.\n\nEjemplo:\n`.delstock Pizza`");
      return;
    }

    const producto = text.trim();
    if (!groupStock[producto]) {
      m.reply(`⚠️ El producto *${producto}* no está en el stock.`);
      return;
    }

    delete groupStock[producto];
    fs.writeFileSync('./database.json', JSON.stringify(global.db));
    m.reply(`🗑️ *${producto}* eliminado del stock.`);
    return;
  }

  // 🔄 Reiniciar todo el stock
  if (m.text.startsWith('.resetstock')) {
    global.db.data.stock[chatId] = {};
    fs.writeFileSync('./database.json', JSON.stringify(global.db));
    m.reply("📦✨ *Stock reiniciado completamente.* ✨");
  }
};

handler.help = ['stock', 'setstock', 'delstock', 'resetstock'];
handler.tags = ['gc'];
handler.command = ['stock', 'setstock', 'delstock', 'resetstock'];
handler.alias = ['stocks', 'setstocks', 'delstocks'];
handler.admin = true;

export default handler;