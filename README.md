<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SHADOWZCLUB - Dev Criss</title>
<style>
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: #000;
    color: #fff;
    text-align: center;
    overflow-x: hidden;
  }

  /* Línea animada superior */
  .top-line {
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #ff0077, #9400ff, #00ffee, #ff0077);
    background-size: 300% 100%;
    animation: lineMove 6s linear infinite;
  }

  @keyframes lineMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 300% 50%; }
  }

  h1 {
    margin-top: 30px;
    font-size: 3em;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #ff0077, #00ffee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: glow 2.5s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from { text-shadow: 0 0 10px #ff0077; }
    to { text-shadow: 0 0 25px #00ffee; }
  }

  p {
    max-width: 700px;
    margin: 15px auto;
    font-size: 1.1em;
    line-height: 1.6;
  }

  .divider {
    width: 80%;
    height: 3px;
    background: linear-gradient(90deg, #ff0077, #00ffee, #9400ff);
    border-radius: 5px;
    margin: 25px auto;
    box-shadow: 0 0 15px #ff0077;
  }

  .features {
    color: #ff66cc;
    font-weight: bold;
    margin-top: 15px;
  }

  .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .card {
    background: #0a0a0a;
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #ff0077, #00ffee) 1;
    padding: 15px 30px;
    border-radius: 15px;
    font-size: 1.1em;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: scale(1.08);
    box-shadow: 0 0 25px #ff0077;
  }

  a {
    color: #00ffee;
    text-decoration: none;
    font-weight: bold;
    margin: 0 10px;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #ff0077;
  }

  footer {
    margin-top: 40px;
    font-style: italic;
    color: #bbb;
    font-size: 0.95em;
  }

  /* Línea inferior animada */
  .bottom-line {
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #00ffee, #9400ff, #ff0077, #00ffee);
    background-size: 300% 100%;
    animation: lineMove 6s linear infinite;
  }
</style>
</head>

<body>
  <div class="top-line"></div>

  <h1>💀 SHADOWZCLUB 💀</h1>

  <p><b>SHADOWZCLUB</b> presenta un poderoso <b>bot personalizado para WhatsApp</b>, con múltiples funciones, gran rendimiento y un diseño oscuro con estilo.  
  Creado por <b>Dev Criss 🇦🇱</b>, combina tecnología, velocidad y personalización para dominar tus grupos y automatizaciones.</p>

  <p class="features">⚡ Automatización • 💬 IA Inteligente • 🎵 Multimedia • 🛠️ Totalmente Personalizable</p>

  <div class="divider"></div>

  <h2>💰 Métodos de Pago</h2>
  <div class="cards">
    <div class="card">💸 PayPal</div>
    <div class="card">📱 Yape</div>
    <div class="card">💬 WhatsApp</div>
  </div>

  <div class="divider"></div>

  <h2>🌐 Redes Sociales</h2>
  <p>
    <a href="https://wa.me/51900000000" target="_blank">WhatsApp</a> |
    <a href="https://instagram.com/devcriss" target="_blank">Instagram</a> |
    <a href="https://paypal.me/devcriss" target="_blank">PayPal</a> |
    <a href="https://t.me/devcriss" target="_blank">Telegram</a>
  </p>

  <div class="divider"></div>

  <footer>“Donde la oscuridad se convierte en poder... Bienvenido a <b>SHADOWZCLUB</b>.”</footer>

  <div class="bottom-line"></div>
</body>
</html>