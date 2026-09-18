const express=require('express');
const dns=require('dns').promises;
const path=require('path');

const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

function validSyntax(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

app.post('/api/check',async(req,res)=>{
  const email=String(req.body?.email||'').trim().toLowerCase();
  const syntax=validSyntax(email);
  if(!syntax) return res.json({status:'invalid',syntax:false,domain:false,mx:false});

  const d=email.split('@')[1];
  try{
    const records=await dns.resolveMx(d);
    const hasMx=Array.isArray(records)&&records.length>0;
    return res.json({status:hasMx?'ok':'invalid',syntax:true,domain:true,mx:hasMx});
  }catch{
    return res.json({status:'unknown',syntax:true,domain:true,mx:false});
  }
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Email Checker running on http://localhost:${PORT}`));