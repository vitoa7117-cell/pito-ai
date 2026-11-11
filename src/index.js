
export default {
  async fetch(request, env) {
    const cors = {
      "Content-Type": "application/json",
    };

    if (request.method === "GET") {
      return new Response(`<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>PITO AI</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#080b18;color:white;font-family:Arial}
header{padding:22px;background:#111831;border-bottom:1px solid #30365b}
h2{color:#9c8bff;margin:0}
main{max-width:700px;margin:auto;padding:15px}
#chat{height:65vh;overflow-y:auto;padding:10px}
.msg{padding:14px;margin:12px 0;border-radius:14px;line-height:1.5;white-space:pre-wrap}
.user{background:#5746b5;margin-left:30px}
.ai{background:#1b2540;margin-right:30px}
.bottom{display:flex;gap:8px}
input{flex:1;min-width:0;padding:14px;border-radius:12px;background:#151d35;color:white;border:1px solid #444}
button{padding:14px;background:#7965ff;color:white;border:0;border-radius:12px}
</style>
</head>
<body>
<header>
<h2>✦ PITO AI</h2>
<small>Your Ultimate AI Assistant</small>
</header>
<main>
<div id="chat">
<div class="msg ai">Halo! 👋 Aku PITO AI. Ada yang bisa kubantu?</div>
</div>
<div class="bottom">
<input id="input" placeholder="Tanyakan sesuatu..." />
<button id="send">Kirim</button>
</div>
</main>
<script>
const input=document.getElementById("input");
const chat=document.getElementById("chat");
const send=document.getElementById("send");

async function ask(){
 const message=input.value.trim();
 if(!message)return;
 input.value="";
 add(message,"user");
 const loading=add("Sedang berpikir...","ai");
 send.disabled=true;
 try{
  const response=await fetch("/",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({message})
  });
  const data=await response.json();
  loading.textContent=data.reply||data.error||"Terjadi kesalahan.";
 }catch(e){
  loading.textContent="Koneksi bermasalah.";
 }
 send.disabled=false;
 chat.scrollTop=chat.scrollHeight;
}
function add(text,type){
 const div=document.createElement("div");
 div.className="msg "+type;
 div.textContent=text;
 chat.appendChild(div);
 chat.scrollTop=chat.scrollHeight;
 return div;
}
send.onclick=ask;
input.addEventListener("keydown",e=>{
 if(e.key==="Enter")ask();
});
</script>
</body>
</html>`, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    if (request.method === "POST") {
      try {
        const { message } = await request.json();

        if (typeof message !== "string" || !message.trim()) {
          return Response.json({ error: "Pesan kosong." }, { status: 400 });
        }

        if (message.length > 2000) {
          return Response.json({ error: "Pesan maksimal 2000 karakter." }, { status: 400 });
        }

        const result = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct",
          {
            messages: [
              {
                role: "system",
                content: "Kamu adalah PITO AI, asisten AI yang ramah, pintar, dan menjawab dalam bahasa pengguna."
              },
              {
                role: "user",
                content: message
              }
            ]
          }
        );

        return Response.json({ reply: result.response || "Tidak ada jawaban." });
      } } catch (error) {
  console.error("PITO AI ERROR:", error);

  return Response.json({
    error: "AI gagal menjawab. Periksa log Cloudflare."
  }, { status: 500 });
}
