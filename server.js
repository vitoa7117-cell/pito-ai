
const http = require("http");

const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>PITO AI</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#090b16;color:white;font-family:Arial}
header{padding:22px;background:#11152a;border-bottom:1px solid #282d4b}
h2{margin:0;color:#9b8cff}
main{max-width:700px;margin:auto;padding:20px}
#chat{height:65vh;overflow:auto;padding:12px}
.msg{padding:13px;margin:12px 0;border-radius:13px;max-width:90%;line-height:1.5}
.user{background:#5144a8;margin-left:auto}
.ai{background:#1a2038}
.bottom{display:flex;gap:8px;position:sticky;bottom:0;background:#090b16;padding:10px 0}
input{flex:1;min-width:0;padding:15px;border-radius:12px;border:1px solid #444;background:#171b30;color:white}
button{background:#7965ff;color:white;border:0;padding:14px;border-radius:12px}
</style>
</head>
<body>
<header><h2>✦ PITO AI</h2><small>Your AI Assistant</small></header>
<main>
<div id="chat">
<div class="msg ai">Halo! 👋 Aku PITO AI. Selamat datang!</div>
</div>
<div class="bottom">
<input id="input" placeholder="Tulis pesan..." />
<button onclick="send()">Kirim</button>
</div>
</main>
<script>
function send(){
 const input=document.getElementById('input');
 const chat=document.getElementById('chat');
 const msg=input.value.trim();
 if(!msg)return;
 chat.innerHTML+='<div class="msg user"></div>';
 chat.lastElementChild.textContent=msg;
 input.value='';
 chat.scrollTop=chat.scrollHeight;
}
</script>
</body>
</html>`;

http.createServer((req,res)=>{
res.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
res.end(html);
}).listen(3000,"0.0.0.0",()=>{
console.log("PITO AI berjalan di port 3000");
});
