/*import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';

console.log(`\n💻 Iniciando Sistema`);

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, description, author, version } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say('Jota - MD', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
});
say(`Developed By Shadow's Club 🌹\n&&\nDev Criss 🇦🇱`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
});

let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  let args = [join(__dirname, file), ...process.argv.slice(2)];
  say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  });

  setupMaster({ exec: args[0], args: args.slice(1) });
  let p = fork();

  p.on('message', data => {
    switch (data) {
      case 'reset':
        p.kill();
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        p.send(process.uptime());
        break;
    }
  });

  p.on('exit', (code) => {
    isRunning = false;
    if (code === 0) return;
    console.error('❌ Error:\n', code);
    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
  if (!opts['test']) {
    if (!rl.listenerCount('line')) {
      rl.on('line', line => {
        p.emit('message', line.trim());
      });
    }
  }
}

process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn('🔴 Se excedió el límite de Listeners en:');
    console.warn(warning.stack);
  }
});

start('main.js');*/
import { say } from 'cfonts';
import { spawn, fork } from 'child_process';
import { watchFile } from 'fs';
import { createInterface } from 'readline';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let isRunning = false;
const args = [join(__dirname, 'main.js'), ...process.argv.slice(2)];

function start(file) {
  if (isRunning) return;
  isRunning = true;

  let child = fork(file, process.argv.slice(2));

  child.on('message', data => {
    console.log('[RECEIVED]', data);
    switch (data) {
      case 'reset':
        console.log('🔴 Reiniciando...');
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        child.send(process.uptime());
        break;
    }
  });

  child.on('exit', (code) => {
    isRunning = false;
    console.error('🟢 El proceso finalizó con código:', code);
    start(file);
  });

  // Asegura que no se acumulen múltiples listeners
  if (rl.listenerCount('line') === 0) {
    rl.on('line', line => {
      child.emit('message', line.trim());
    });
  }
}

const rl = createInterface(process.stdin, process.stdout);

// Leer datos del package.json de forma segura
let pkg = {};
try {
  pkg = await import(join(__dirname, './package.json'), { assert: { type: 'json' } }).then(m => m.default);
} catch (err) {
  console.warn('[WARN] No se pudo leer package.json:', err.message);
}

say({
  text: [process.argv[0], ...process.argv.slice(2)].join(' '),
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
});

say({
  text: pkg.name || 'JOTA BOT',
  font: 'block',
  align: 'center',
  colors: ['red', 'magenta']
});

watchFile(args[0], { persistent: false }, () => {
  console.log('\n📦 Archivo actualizado, reiniciando...\n');
  start(args[0]);
});

start(args[0]);