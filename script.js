// نجوم خفيفة
function createStars(){
    for(let i=0;i<120;i++){
        let star=document.createElement('div');
        star.className='star';
        star.style.width=(1+Math.random()*2)+'px';
        star.style.height=star.style.width;
        star.style.left=Math.random()*100+'vw';
        star.style.top=Math.random()*100+'vh';
        star.style.animationDuration=(4+Math.random()*4)+'s';
        star.style.opacity=Math.random()*0.6+0.2;
        document.body.appendChild(star);
    }
}
createStars();

// نيازك مع صوت
function createMeteors(){
    setInterval(()=>{
        let meteor=document.createElement('div');
        meteor.className='meteor';
        meteor.style.left=Math.random()*window.innerWidth+'px';
        meteor.style.top='-20px';
        meteor.style.animationDuration=(1+Math.random()*2)+'s';
        document.body.appendChild(meteor);

        document.getElementById('meteorSound').currentTime=0;
        document.getElementById('meteorSound').play();

        setTimeout(()=>{ meteor.remove(); }, 3000);
    }, 2500);
}
createMeteors();

// CodeMirror للأكواد
let htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {mode:"htmlmixed", theme:"dracula", lineNumbers:true});
let cssEditor = CodeMirror.fromTextArea(document.getElementById("cssCode"), {mode:"css", theme:"dracula", lineNumbers:true});
let jsEditor = CodeMirror.fromTextArea(document.getElementById("jsCode"), {mode:"javascript", theme:"dracula", lineNumbers:true});
let jsonEditors = [];
for(let i=1;i<=5;i++){
    let editor = CodeMirror.fromTextArea(document.getElementById('json'+i), {mode:"application/json", theme:"dracula", lineNumbers:true});
    jsonEditors.push(editor);
}

// توليد الموقع الناتج
function generateSite(){
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();
    const jsonData = jsonEditors.map(e=>e.getValue());

    let content=`<!DOCTYPE html>
<html lang="ar">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>الموقع الناتج</title>
<style>
${cssCode}
body{background:#001933;color:#fff;overflow:hidden;}
.star{position:absolute;border-radius:50%;background:#66ccff;animation:starFall linear infinite, twinkle 3s infinite;opacity:0.6;}
@keyframes twinkle{0%{opacity:0.2;}50%{opacity:0.6;}100%{opacity:0.2;}}
@keyframes starFall{0%{transform:translateY(-10px);}100%{transform:translateY(100vh);}}

/* نيازك */
.meteor{position:absolute;width:4px;height:18px;background:#ffcc33;border-radius:50%;box-shadow:0 0 8px #ffcc33,0 0 15px #ffcc33;animation:meteorFall linear infinite;}
@keyframes meteorFall{0%{transform:translate(-100px,-50px) rotate(45deg);}100%{transform:translate(120vw,100vh) rotate(45deg);}}
</style>
</head>
<body>
${htmlCode}
<script>${jsCode}</script>

<script>
for(let i=0;i<120;i++){
  let star=document.createElement('div');
  star.className='star';
  star.style.width=(1+Math.random()*2)+'px';
  star.style.height=star.style.width;
  star.style.left=Math.random()*100+'vw';
  star.style.top=Math.random()*100+'vh';
  star.style.animationDuration=(4+Math.random()*4)+'s';
  star.style.opacity=Math.random()*0.6+0.2;
  document.body.appendChild(star);
}

setInterval(()=>{
    let meteor=document.createElement('div');
    meteor.className='meteor';
    meteor.style.left=Math.random()*window.innerWidth+'px';
    meteor.style.top='-20px';
    meteor.style.animationDuration=(1+Math.random()*2)+'s';
    document.body.appendChild(meteor);
    setTimeout(()=>{ meteor.remove(); }, 3000);
},2500);

const dataFiles=${JSON.stringify(jsonData)};
console.log("ملفات JSON:",dataFiles);
</script>

<a href="https://wa.me/201206561893" target="_blank" style="position:fixed;bottom:60px;right:20px;background:#25D366;color:#fff;padding:10px 15px;border-radius:8px;text-decoration:none;">واتساب</a>

<div style="position:fixed;bottom:10px;width:100%;text-align:center;color:#ffcc33;font-size:12px;text-shadow:0 0 2px #ff3333;">
<p>هذا الموقع مصنوع في موقع النجم.</p>
<p>لصنع المواقع و عمل ليس مشترك بريميوم، إذا تريد تشيل هذه الخانة تحدث مع خدمة العملاء واشترك بريميوم للحصول على دومين.</p>
</div>

</body>
</html>`;

    const blob = new Blob([content], {type:"text/html"});
    const url = URL.createObjectURL(blob);
    window.open(url,"_blank");
}

document.getElementById('createBtn').addEventListener('click', generateSite);
document.getElementById('previewBtn').addEventListener('click', generateSite);
document.getElementById('installBtn').addEventListener('click', ()=>{
    alert("لتثبيت التطبيق كـ PWA، يجب إضافة manifest.json و service worker.");
});
