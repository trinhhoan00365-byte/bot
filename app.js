const id = location.pathname.replace("/","")

const api =
"https://cdn.syndication.twimg.com/tweet-result?id="+id

fetch(api)
.then(r=>r.json())
.then(data=>{

if(!data.video){
 document.body.innerHTML="No video found"
 return
}

let variants = data.video.variants
 .filter(v=>v.bitrate)
 .sort((a,b)=>b.bitrate-a.bitrate)

let best = variants[0]

document.getElementById("player").innerHTML =
`<video controls src="${best.url}"></video>`

let html=""

variants.forEach(v=>{

let quality = Math.round(v.bitrate/1000)

html += `
<a class="btn" href="${v.url}">
Download ${quality} kbps
</a>`

})

document.getElementById("downloads").innerHTML = html

})
