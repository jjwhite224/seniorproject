// Basile Pesin
// http://vertmo.github.io


// MetaBalls : p5.js implementation
var artist;
var songname;
var trackPic;
let angle = 0;
let w = 24;
let ma;
let maxD;

let a;


function setup(){
    //createCanvas(400,400,WEBGL);
    createCanvas(displayWidth,displayHeight);
    noStroke();
    mastodon =  loadFont('assets/MASTOD__.ttf')
    textFont(mastodon,144);
    textAlign(CENTER,CENTER);
   // imageMode(CENTER);
   ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 200, 200);
}

function draw() {
  frameRate(30)
  background(0);
  loadLyrics();
  //fill(0,4);
  //screenText = createGraphics(width,height);
  text(songname+' by '+artist,displayWidth/2,displayHeight/1.5);
  //drawingContext.disable(drawingContext.DEPTH_TEST)
  //drawingContext.enable(drawingContext.BLEND)
 // image(screenText, -width/2, -height/2)
 // if (trackPic != null){
  //image(trackPic,displayWidth/2,displayHeight/2-75,100,100);
 // }
 //translate(width/2, height/2);
 //rectMode(CENTER);
  if (analysisLoaded == true){
    console.log(analysisJSON);
    drawCube(analysisJSON);
    //console.log(songTime);
    //analysisLoaded = false;
}
//.if(isPrepared == true){
//player.getCurrentState().then(state => {
    //if (!state) {
      //console.error('User is not playing music through the Web Playback SDK');
      //return;
   // }
    //songTime = state.position;
    //songDur = state.duration;
    //})

        

}


function loadLyrics(){
    var lyrics;
    if (trackLoaded == true){
       console.log(trackJSON);
       trackPic = loadImage(trackJSON.album.images[0].url);
        songname = trackJSON.name;
        artist = trackJSON.artists[0].name;
        console.log(songname);
        console.log(artist);
        loadJSON('https://api.musixmatch.com/ws/1.1/track.search?q_track='+songname+'&q_artist='+artist+'&f_has_lyrics=1&apikey=828251934ab71bde5ddf79419d12a713',searchLyrics);
        trackLoaded = false;
    }
    
    
    }
function searchLyrics(search){
    console.log(search)
    trackId=search.message.body.track_list[0].track.track_id;
    trackname=search.message.body.track_list[0].track.track_name;
    artistname=search.message.body.track_list[0].track.artist_name;
    albumID=search.message.body.track_list[0].track.album_id;
    //console.log(trackId);
    loadJSON("https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="+trackId+"&apikey=828251934ab71bde5ddf79419d12a713",getLyrics);
    //loadJSON("https://api.musixmatch.com/ws/1.1/album.get?album_id="+albumID+"&apikey=828251934ab71bde5ddf79419d12a713",getAlbum);
    loadJSON('http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=	ece64c4337c8a1bfd576483ec3c27355&artist='+artistname+'&track='+trackname+'&format=json',getAlbumart);
}

function getLyrics(lyricData){
    lyrics=lyricData.message.body.lyrics.lyrics_body
    //text(lyricData)
    //console.log(lyricData);
    wordList=dataSplit(lyrics)[0];
    stanzaList=dataSplit(lyrics)[1];
    rhymeList=dataSplit(lyrics)[2];
    console.log(wordList);
    console.log(stanzaList);
    //console.log(rhymeList);
}
function dataSplit(lyrics){
    let wordCollector;
    let stanzaCollector='';
    let stanzaList=[];
    let wordList=[];
    let rhymeChecklist=[];
    let wordCounter=0;
    let stanzaCounter=0;
    for (let i=0;i<lyrics.length;i++){
      if (lyrics[i]!=','){
        stanzaCollector=stanzaCollector+lyrics[i];
      }
  
  
      if (str(lyrics[i])=='\n'){
        append(stanzaList,stanzaCollector);
        stanzaCollector=' ';
    }
  
    }
    for (let i=0;i<stanzaList.length;i++){
        wordCollector=split(stanzaList[i],' ');
        append(wordList,wordCollector);
        }
  
    for (let i=0;i<wordList.length;i++){
      for(let j=0;j<wordList[i].length;j++){
        if (wordList[i][j]!=''){
          append(rhymeChecklist,wordList[i][j]);
        }else if(wordList[i][j]=='...'||wordList[i][j]=='*******'){break;}
          }
        }
        return [wordList,stanzaList,rhymeChecklist];
        
  
  }
  function displayLyrics(){
  // textSize(analysisJSON.track.duration);
    //fill(analysisJSON.track.loudness);
        
  }

  function getAlbum(albumJSON){
    console.log(albumJSON);
    albumName=albumJSON.message.body.album.album_name;
    artistName=albumJSON.message.body.album.artist_name;
    
  }
  function getAlbumart(album){
    console.log(album);
    albumCoverPath=album.track.album.image['3']['#text'];
    loadImage(albumCoverPath,getColorPallete);
  }
function getColorPallete(albumArt){
  albumArt.loadPixels();
  var pixels = albumArt.pixel
  let rgbValues = [];
  for(var i = 0; i < pixels.length; i+=4){
    const rgb = {
      r: pixels[i],
      g: pixels[i + 1],
      b: pixels[i + 2],
    };
    rgbValues.push(rgb);
  }
console.log(rgbValues);
}

function drawCube(json) {
  //background(0);
 translate(0,height/2);
  rectMode(CENTER);
  angleMode(DEGREES)
  //console.log(json);
  //for (let z = 0; z < height; z += w) {
    let offset = 0;
    let w = 6
    for (let x = 0; x < width; x += w) {
      a = angle + offset
      let h = map(sin(a),-1,1,0,100)
      //console.log(sin(angle))
      fill(255)
      rect(x + w-4,0,w-4,h)
      //offset += .1;
      for (let x = 0; x < json.segments.length;x+=1){
        offset += map(abs(json.segments[x].loudness_max),0,100,0,1);
        for (let y = 0; y < json.segments[x].pitches.length;y+=1){
     offset += (json.segments[x].pitches[y],0,1,0,.1);
      
      
      
        }
      }  
      
    }
  
  
  
  for (let x = 0; x < json.sections.length;x+=1){
    angle += map(json.sections[x].tempo,0,1000,1,359);
  }

}