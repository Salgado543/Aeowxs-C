/*
import fs from 'fs';
import path from 'path';

var handler = async (m, { conn }) => {
  const ignoredFolders = ['node_modules', '.git'];
  const ignoredFiles = ['package-lock.json'];

  async function getAllJSFiles(dir) {
    let jsFiles = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (ignoredFolders.includes(item.name) || ignoredFiles.includes(item.name)) continue;

      if (item.isDirectory()) {
        jsFiles = jsFiles.concat(await getAllJSFiles(fullPath));
      } else if (item.isFile() && fullPath.endsWith('.js')) {
        jsFiles.push(fullPath);
      }
    }

    return jsFiles;
  }

  try {
    await m.react('🕒');
    conn.sendPresenceUpdate('composing', m.chat);

    const baseDir = path.resolve('./');
    const jsFiles = await getAllJSFiles(baseDir);

    let response = `📦 *Revisión de Syntax Errors en ${jsFiles.length} archivos:*\n\n`;
    let hasErrors = false;

    for (const file of jsFiles) {
      try {
        await import(`file://${file}`);
      } catch (error) {
        hasErrors = true;
        response += `🚩 *Error en:* ${file.replace(baseDir + '/', '')}\n📌 *Tipo:* ${error.name}\n📄 *Mensaje:* ${error.message}\n\n`;
      }
    }

    if (!hasErrors) {
      response += '🪐 ¡Todo está en orden! No se detectaron errores de sintaxis.';
    }

    await conn.reply(m.chat, response, m);
    await m.react('✅');
  } catch (err) {
    conn.reply(m.chat, `*Error:* ${err.message}`, m);
  }
};

handler.command = ['revsall'];
handler.help = ['revsall', 'revall', 'allrev'];
handler.tags = ['owner'];
handler.owner = true;

export default handler;*/

import fs from 'fs/promises'
import path from 'path'
import vm from 'vm'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const handler = async (m, { conn }) => {
  const ignoredFolders = ['node_modules', '.git', 'sessions', 'media', 'tmp', 'temp']
  const ignoredFiles = ['package-lock.json']

  async function getAllJSFiles(dir) {
    let jsFiles = []
    const items = await fs.readdir(dir, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      if (ignoredFolders.includes(item.name) || ignoredFiles.includes(item.name)) continue

      if (item.isDirectory()) {
        const subFiles = await getAllJSFiles(fullPath)
        jsFiles = jsFiles.concat(subFiles)
      } else if (item.isFile() && fullPath.endsWith('.js')) {
        jsFiles.push(fullPath)
      }
    }

    return jsFiles
  }

  async function checkSyntaxOnly(filePath) {
    try {
      const code = await fs.readFile(filePath, 'utf-8')
      new vm.Script(code, { filename: filePath }) // Solo revisa sintaxis
      return null
    } catch (err) {
      return err
    }
  }

  try {
    await m.react('🕒')
    conn.sendPresenceUpdate('composing', m.chat)

    const baseDir = path.resolve('./')
    const jsFiles = await getAllJSFiles(baseDir)

    let response = `📦 *Revisión de Syntax Errors en ${jsFiles.length} archivos:*\n\n`
    let hasErrors = false

    for (const file of jsFiles) {
      const error = await checkSyntaxOnly(file)
      if (error) {
        hasErrors = true
        response += `🚩 *Error en:* ${file.replace(baseDir + '/', '')}\n📌 *Tipo:* ${error.name}\n📄 *Mensaje:* ${error.message}\n\n`
      }
    }

    if (!hasErrors) {
      response += '🪐 ¡Todo está en orden! No se detectaron errores de sintaxis.'
    }

    await conn.reply(m.chat, response, m)
    await m.react('✅')
  } catch (err) {
    await conn.reply(m.chat, `*Error:* ${err.message}`, m)
  }
}

handler.command = ['revsall']
handler.help = ['revsall', 'revall', 'allrev']
handler.tags = ['owner']
handler.owner = true

export default handler