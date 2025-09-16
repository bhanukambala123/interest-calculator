function toYears(y, m, d){
return (Number(y)||0) + (Number(m)||0)/12 + (Number(d)||0)/365;
}
function fmt(num){
if (!isFinite(num)) return '--';
return Number(num).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}


// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
tab.addEventListener('click', () => {
document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
document.querySelectorAll('.calc').forEach(c => c.classList.remove('active'));
tab.classList.add('active');
document.getElementById(tab.dataset.target).classList.add('active');
});
});


// Simple interest
const sBtn=document.getElementById('s-calc');
sBtn.addEventListener('click',()=>{
const P=parseFloat(document.getElementById('s-principal').value);
const rP=parseFloat(document.getElementById('s-rate').value);
const y=document.getElementById('s-years').value;
const m=document.getElementById('s-months').value;
const d=document.getElementById('s-days').value;
const out=document.getElementById('s-output');


if(isNaN(P)||P<0){out.innerHTML='<div class="muted">Enter valid principal.</div>';return;}
if(isNaN(rP)||rP<0){out.innerHTML='<div class="muted">Enter valid rate.</div>';return;}
const t=toYears(y,m,d);
if(t<=0){out.innerHTML='<div class="muted">Enter duration.</div>';return;}


const r=rP/100;
const interest=P*r*t;
const maturity=P+interest;


out.innerHTML=`<div><strong>Duration:</strong> ${fmt(t)} years</div>
<div><strong>Interest:</strong> ₹ ${fmt(interest)}</div>
<div><strong>Total:</strong> ₹ ${fmt(maturity)}</div>`;
});


// Compound interest
const cBtn=document.getElementById('c-calc');
cBtn.addEventListener('click',()=>{
const P=parseFloat(document.getElementById('c-principal').value);
const rP=parseFloat(document.getElementById('c-rate').value);
const y=document.getElementById('c-years').value;
const m=document.getElementById('c-months').value;
const d=document.getElementById('c-days').value;
const n=Number(document.getElementById('c-freq').value)||1;
const out=document.getElementById('c-output');


if(isNaN(P)||P<0){out.innerHTML='<div class="muted">Enter valid principal.</div>';return;}
if(isNaN(rP)||rP<0){out.innerHTML='<div class="muted">Enter valid rate.</div>';return;}
const t=toYears(y,m,d);
if(t<=0){out.innerHTML='<div class="muted">Enter duration.</div>';return;}


const r=rP/100;
const A=P*Math.pow(1+r/n,n*t);
const interest=A-P;


out.innerHTML=`<div><strong>Duration:</strong> ${fmt(t)} years</div>
<div><strong>Frequency:</strong> ${n}/yr</div>
<div><strong>Interest:</strong> ₹ ${fmt(interest)}</div>
<div><strong>Total:</strong> ₹ ${fmt(A)}</div>`;
});