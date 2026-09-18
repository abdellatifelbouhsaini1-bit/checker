const emailInput=document.getElementById('email');
const checkBtn=document.getElementById('check');
const result=document.getElementById('result');
const checks=document.getElementById('checks');
const syntax=document.getElementById('syntax');
const domain=document.getElementById('domain');
const mx=document.getElementById('mx');

function set(v,ok){v.textContent=ok?'OK':'NO';v.style.color=ok?'#067647':'#b42318'}

checkBtn.onclick=async()=>{
 const email=emailInput.value.trim();
 result.className='result hidden'; checks.classList.add('hidden');
 if(!email){emailInput.focus();return}
 checkBtn.disabled=true; checkBtn.textContent='CHECKING...';
 try{
   const r=await fetch('/api/check',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});
   const data=await r.json();
   checks.classList.remove('hidden');
   set(syntax,data.syntax); set(domain,data.domain); set(mx,data.mx);
   if(data.status==='ok'){result.className='result ok';result.textContent='✓ OK — domain has a mail server'}
   else if(data.status==='invalid'){result.className='result bad';result.textContent='✕ INVALID'}
   else {result.className='result unknown';result.textContent='? UNKNOWN — could not verify MX'}
 }catch(e){
   result.className='result unknown';result.textContent='? SERVER ERROR';
 }finally{checkBtn.disabled=false;checkBtn.textContent='CHECK'}
};
emailInput.addEventListener('keydown',e=>{if(e.key==='Enter')checkBtn.click()});