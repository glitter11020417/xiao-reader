const C="xiao-reader-v1";
const CORE=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png",
"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js","https://cdnjs.cloudflare.com/ajax/libs/epub.js/0.3.93/epub.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.hostname==="api.anthropic.com")return;
  e.respondWith(caches.match(e.request).then(r=>{
    const net=fetch(e.request).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>r);
    return r||net;
  }));
});
