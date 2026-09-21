const IP="flosmprevived.g-portal.works";
const toast=document.getElementById("toast");
document.querySelectorAll(".copy-ip").forEach(btn=>{
  btn.addEventListener("click",async()=>{
    try{await navigator.clipboard.writeText(btn.dataset.ip||IP);}
    catch(e){const t=document.createElement("textarea");t.value=btn.dataset.ip||IP;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();}
    if(toast){toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1700);}
  });
});
const dot=document.getElementById("status-dot"), statusText=document.getElementById("status-text"), playerText=document.getElementById("player-text");
async function checkServer(){
  if(!dot||!statusText)return;
  // Uses mcsrvstat.us so the static GitHub Pages site needs no backend or plugin.
  try{
    const r=await fetch("https://api.mcsrvstat.us/3/"+encodeURIComponent(IP),{cache:"no-store"});
    if(!r.ok)throw new Error("status");
    const d=await r.json();
    if(d.online){
      dot.parentElement.classList.add("online");dot.parentElement.classList.remove("offline");
      statusText.textContent="Online";
      const online=d.players?.online??0,max=d.players?.max??"?";
      playerText.textContent=`${online}/${max} Spieler online · ${IP}`;
    }else{
      dot.parentElement.classList.add("offline");dot.parentElement.classList.remove("online");
      statusText.textContent="Offline";playerText.textContent="Server aktuell nicht erreichbar · "+IP;
    }
  }catch(e){
    dot.parentElement.classList.remove("online","offline");
    statusText.textContent="Status nicht verfügbar";playerText.textContent="Minecraft Server · "+IP;
  }
}
checkServer();setInterval(checkServer,30000);
const menu=document.querySelector(".menu"),nav=document.querySelector("nav");
menu?.addEventListener("click",()=>{nav.style.display=nav.style.display==="flex"?"none":"flex";nav.style.position="absolute";nav.style.top="76px";nav.style.left="0";nav.style.right="0";nav.style.flexDirection="column";nav.style.padding="10px 18px";nav.style.background="#07100c";});
