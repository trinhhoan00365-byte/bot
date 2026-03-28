function getTweetId(url) {
  const match = url.match(/status\/(\d+)/)
  if (match) return match[1]
  return null
}

async function loadVideo() {

  const input = document.getElementById("url").value.trim()
  const id = getTweetId(input)

  if (!id) {
    alert("Invalid X/Twitter link")
    return
  }

  const api = "YOUR_WORKER_URL?id=" + id

  try {

    const res = await fetch(api)
    const data = await res.json()

    if (!data.videos || data.videos.length === 0) {
      alert("No video found")
      return
    }

    const variants = data.videos

    // video preview (quality cao nhất)
    const best = variants[0]

    document.getElementById("player").innerHTML =
      `<video controls src="${best.url}"></video>`

    // tạo nút download
    let html = ""

    variants.forEach(v => {

      const quality = Math.round(v.bitrate / 1000)

      html += `
      <a class="download" href="${v.url}" target="_blank">
        Download ${quality} kbps
      </a>
      `
    })

    document.getElementById("result").innerHTML = html

  } catch (err) {

    console.error(err)
    alert("Error loading video")

  }

}
