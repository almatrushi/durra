(()=>{'use strict';
const slides=[...document.querySelectorAll('.slide')],stage=document.getElementById('stage'),overlay=document.getElementById('overlay');let current=0,activeVideo=null;
const items=[
{id:'v01',type:'video',group:'discovery',name:'التعرّف إلى الموسوعتين',description:'مشاهد من تعريف الطالبات بالموسوعة العُمانية والموسوعة العُمانية للناشئة.',src:'assets/video/01-intro.mp4',poster:'assets/poster/01-intro.jpg'},
{id:'v02',type:'video',group:'discovery',name:'البحث في مجلدات الموسوعة',description:'نشاط عملي تتصفح فيه الطالبات المجلدات بحثًا عن معلومات مرتبطة بموضوع النشاط.',src:'assets/video/02-search.mp4',poster:'assets/poster/02-search.jpg'},
{id:'v03',type:'video',group:'discovery',name:'التدريب على توثيق المعلومات',description:'لقطات من التدريب على استخدام الموسوعة مصدرًا للمعلومات وتوثيقها.',src:'assets/video/03-cite.mp4',poster:'assets/poster/03-cite.jpg'},
{id:'v04',type:'video',group:'application',name:'كتابة التقرير في الدراسات الاجتماعية',description:'مشاهد من توظيف الموسوعة في كتابة تقرير ضمن مادة الدراسات الاجتماعية.',src:'assets/video/04-report.mp4',poster:'assets/poster/04-report.jpg'},
{id:'v05',type:'video',group:'application',name:'الموسوعة والفنون التشكيلية',description:'مشاهد من استثمار موضوعات الموسوعة في أنشطة الفنون التشكيلية.',src:'assets/video/05-art.mp4',poster:'assets/poster/05-art.jpg'},
{id:'v06',type:'video',group:'interaction',name:'نشاط رقمي تفاعلي',description:'مقطع مصور لنشاط رقمي ضمن فعاليات المدرسة.',src:'assets/video/06-digital.mp4',poster:'assets/poster/06-digital.jpg'},
{id:'v07',type:'video',group:'interaction',name:'مشاركة الطالبات في الأنشطة',description:'مشاهد من مشاركة الطالبات وتفاعلهن في نشاط مدرسي.',src:'assets/video/07-engagement.mp4',poster:'assets/poster/07-engagement.jpg'},
{id:'v08',type:'video',group:'interaction',name:'التقديم والتواصل الشفهي',description:'لقطات من مشاركة طالبة في تقديم شفهي أمام الميكروفون.',src:'assets/video/08-voice.mp4',poster:'assets/poster/08-voice.jpg'},
{id:'p01',type:'image',group:'preparation',name:'لقاء فريق المدرسة',description:'صورة موثقة من لقاء فريق المدرسة الخاص بالمشاركة.',src:'assets/img/meeting.jpg',poster:'assets/img/meeting.jpg'},
{id:'p02',type:'image',group:'discovery',name:'القراءة في الموسوعة',description:'طالبة تتصفح صفحات الموسوعة وتطالع موضوعًا مصورًا.',src:'assets/img/reading-1.jpg',poster:'assets/img/reading-1.jpg'},
{id:'p03',type:'image',group:'discovery',name:'مطالعة الخريطة',description:'طالبة تطالع صفحات تحتوي على خريطة لعُمان.',src:'assets/img/reading-2.jpg',poster:'assets/img/reading-2.jpg'},
{id:'p04',type:'image',group:'discovery',name:'تصفح محتوى الموسوعة',description:'طالبة تقرأ موضوعًا مصورًا في الموسوعة.',src:'assets/img/reading-3.jpg',poster:'assets/img/reading-3.jpg'}
];
const notes=[
'ابدأ بمشهد الطالبات والموسوعة. قدم فكرة الرحلة في جملة واحدة، ثم انتقل مباشرة إلى محطات التنفيذ.',
'توضح هذه الشاشة تسلسل العرض: التعرف، والبحث، والتوثيق، والتطبيق، ثم الإنتاج. وهو تسلسل قصصي وليس بالضرورة تواريخ وقوع الأنشطة.',
'أظهر صورة اللقاء التنظيمي، ثم اذكر بإيجاز انتقال المدرسة من الإعداد إلى التنفيذ.',
'شغّل مقتطفًا من التعريف بالموسوعتين، ثم انتقل إلى البحث في المجلدات.',
'ركّز على مهارة توثيق المصدر باعتبارها جزءًا من الممارسة التعليمية، دون المبالغة في وصف مستوى الإتقان.',
'اعرض مقطعين قصيرين من التقرير والفنون. لا حاجة لتشغيل كلا المقطعين كاملين.',
'شغّل مقتطفًا من النشاط الرقمي ومقتطفًا من التقديم الشفهي، دون افتراض أن محتواهما مشتق بالكامل من الموسوعة.',
'دع الصور تبرز مشاركة الطالبات بصورة طبيعية. لا تستخدم نسبًا أو أعدادًا لم ترد في المستندات.',
'المخرجات الظاهرة تشمل ممارسات البحث والتوثيق وكتابة التقارير؛ استخدم لغة تصف ما شوهد دون الادعاء بوجود قياس قبلي وبعدي.',
'بيّن تكامل المجالات الدراسية ووسائط التعبير باختصار، ثم انتقل إلى الختام.',
'اختم باسم المدرسة ورسالة معرفية موجزة. يمكن فتح معرض مشاهد الأنشطة عند الرغبة في مشاهدة المواد كاملة.'
];
const htmlEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function resizeSlides(){let factor=Math.min(stage.clientWidth/1280,stage.clientHeight/720);for(let s of slides)s.style.transform=`scale(${factor})`}
window.addEventListener('resize',resizeSlides);if(typeof ResizeObserver!=='undefined')new ResizeObserver(resizeSlides).observe(stage);
function go(index){current=Math.max(0,Math.min(slides.length-1,index));for(let i=0;i<slides.length;i++){const on=i===current;slides[i].classList.toggle('current',on);slides[i].setAttribute('aria-hidden',String(!on))}document.getElementById('counter').textContent=`${String(current+1).padStart(2,'0')} / ${slides.length}`;document.getElementById('progressBar').style.width=`${(current+1)/slides.length*100}%`;document.getElementById('prevBtn').disabled=current===0;document.getElementById('nextBtn').disabled=current===slides.length-1;document.title=`سراج عُمان | ${slides[current].dataset.title}`;resizeSlides()}
function close(){const video=overlay.querySelector('video');if(video){video.pause();video.removeAttribute('src');video.load()}overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');activeVideo=null}
function modal(title,content){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=content;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.getElementById('closeModal').focus()}
function showMedia(id){const it=items.find(x=>x.id===id);if(!it)return;activeVideo=id;const player=it.type==='video'?`<video src="${it.src}" poster="${it.poster}" playsinline controls preload="metadata" aria-label="${htmlEscape(it.name)}"></video>`:`<img src="${it.src}" alt="${htmlEscape(it.name)}">`;modal(it.name,`<div class="media-view"><div class="media-surface">${player}</div><div class="media-description"><h4>${htmlEscape(it.name)}</h4><p>${htmlEscape(it.description)}</p><a href="${it.src}" target="_blank" rel="noopener">فتح الملف الأصلي ↗</a></div></div>`)}
function showIndex(){modal('محطات رحلة المدرسة',`<div class="chapter-grid">${slides.map((el,i)=>`<button data-go="${i}"><b>${String(i+1).padStart(2,'0')}</b><span>${htmlEscape(el.dataset.title)}</span></button>`).join('')}</div>`)}
function showGallery(filter='all'){let tabs=[['all','جميع المشاهد'],['preparation','الانطلاقة'],['discovery','الاكتشاف والبحث'],['application','التطبيق والإنتاج'],['interaction','التفاعل والتعبير']];let chosen=items.filter(i=>filter==='all'||i.group===filter);modal('مشاهد من رحلة سراج عُمان',`<div class="gallery-tabs">${tabs.map(([k,v])=>`<button class="${filter===k?'on':''}" data-filter="${k}">${v}</button>`).join('')}</div><div class="gallery-grid">${chosen.map(i=>`<button data-media="${i.id}"><img src="${i.poster}" alt=""><b>${htmlEscape(i.name)}</b><small>${i.type==='video'?'▶ تشغيل الفيديو':'▧ عرض الصورة'}</small></button>`).join('')}</div>`)}
function showNotes(){modal('ملاحظات المقدّم · الشاشة '+(current+1),`<div class="presenter-note"><strong>${htmlEscape(slides[current].dataset.title)}</strong><p>${htmlEscape(notes[current])}</p></div>`)}
document.addEventListener('click',e=>{let btn=e.target.closest('[data-media]');if(btn){showMedia(btn.dataset.media);return}btn=e.target.closest('[data-filter]');if(btn){showGallery(btn.dataset.filter);return}btn=e.target.closest('[data-go]');if(btn){close();go(+btn.dataset.go);return}btn=e.target.closest('[data-next]');if(btn){go(current+1);return}btn=e.target.closest('[data-action]');if(btn){let a=btn.dataset.action;if(a==='gallery')showGallery();if(a==='index')showIndex();if(a==='notes')showNotes();}});
document.getElementById('closeModal').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.getElementById('nextBtn').addEventListener('click',()=>go(current+1));document.getElementById('prevBtn').addEventListener('click',()=>go(current-1));document.getElementById('fullscreen').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.().catch(()=>{})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open')){close();return}if(overlay.classList.contains('open'))return;if(['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;if(['ArrowLeft','PageDown',' '].includes(e.key)){e.preventDefault();go(current+1)}else if(['ArrowRight','PageUp'].includes(e.key)){e.preventDefault();go(current-1)}else if(e.key==='Home')go(0);else if(e.key==='End')go(slides.length-1);else if(e.key.toLowerCase()==='g')showGallery();else if(e.key.toLowerCase()==='m')showIndex();else if(e.key.toLowerCase()==='n')showNotes()});
resizeSlides();go(0);
})();
