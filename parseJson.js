function parseJSON(json){
    const img = new Image(json.album.images[0].height, json.album.images[0].width);
  link.src = json.album.images[0].url
  document.body.appendChild(link)
  
}