// Basile Pesin
// http://vertmo.github.io


// MetaBalls : p5.js implementation
var artist;
var songname;
var trackPic;
let angle = [];
let w = 24;
let ma;
let maxD;

let a;
let cRange;
let quantcolors = [];

let songlength;
let amp;
let particles = [];
let particlesFull = false;
let pitchesFull = false;
//const noiseScale = .1;
function setup(){
    //createCanvas(400,400);
    createCanvas(windowWidth,windowHeight);
    fullscreen();
    //noStroke();
    //strokeWeight(2);
    mastodon =  loadFont('assets/MASTOD__.ttf')
    textFont(mastodon,64);
    textAlign(CENTER,CENTER);
   // imageMode(CENTER);
   ma = atan(cos(QUARTER_PI));
  maxD = dist(0, 0, 200, 200);
  //angleMode(DEGREES)
  //clear();
  //blendMode(HARD_LIGHT)
}

function draw() {
  
 // frameRate(1)
  //background(0);
  loadLyrics();
  //fill(0,4);
  //screenText = createGraphics(width,height);
  
  //drawingContext.disable(drawingContext.DEPTH_TEST)
  //drawingContext.enable(drawingContext.BLEND)
 // image(screenText, -width/2, -height/2)
 // if (trackPic != null){
  //image(trackPic,displayWidth/2,displayHeight/2-75,100,100);
 // }
 //translate(width/2, height/2);
 //rectMode(CENTER);
 
  if (analysisLoaded == true){
    //console.log(analysisJSON);
    let rectColor=[];
    
      let colorFull =false;
      //console.log(quantcolors);
      for(let i=0;i < quantcolors.length;i++) {
        let c = color(quantcolors[i].r,quantcolors[i].g,quantcolors[i].b);
        rectColor.push(c);
        //console.log(c)

      }
      if (rectColor.length == quantcolors.length) {
        console.log(rectColor);
        colorFull = true;
if (colorFull == true){
  //console.log(rectColor);
  colorFull = false;
}
//colorFull = false;
      }
      
     
    //let r = random(rectColor.length)
    
    
    //console.log(rectColor);
    //console.log(songTime);
    //analysisLoaded = false;
    
    
  
    
    segmentData  = [];
    beatData = [];
    for(let i = 0; i < analysisJSON.segments.length; i++) {
      const segment = analysisJSON.segments[i];
      segmentData.push([segment.start,segment.duration,abs(segment.loudness_max),segment.pitches]);
    }
    for(let i = 0; i < analysisJSON.beats.length; i++) {
      const beats = analysisJSON.beats[i];
      beatData.push([beats.start,beats.duration]);
    }
  
    
    
    //console.log(amp);
    const num = segmentData.length * 2; 
    const noiseScale = map(analysisJSON.track.tempo,0,300,.001,.01);
  

    ;
    //stroke(0);
    
    drawCube(particles,beatData,rectColor,noiseScale,num,segmentData,analysisJSON.track.tempo,analysisJSON.track.time_signature,analysisJSON.sections,analysisJSON.bars);
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
       trackPic = loadImage(trackJSON.album.images[0].url,getColorPallete);
        //songname = trackJSON.name;
        //artist = trackJSON.artists[0].name;
        console.log(songname);
        console.log(artist);
        //loadJSON('https://api.musixmatch.com/ws/1.1/track.search?q_track='+songname+'&q_artist='+artist+'&f_has_lyrics=1&apikey=828251934ab71bde5ddf79419d12a713',searchLyrics);
        trackLoaded = false;
    }
    
    
    }
function searchLyrics(search){
    //console.log(search)
    trackId=search.message.body.track_list[0].track.track_id;
    trackname=search.message.body.track_list[0].track.track_name;
    artistname=search.message.body.track_list[0].track.artist_name;
    albumID=search.message.body.track_list[0].track.album_id;
    //console.log(trackId);
    //loadJSON("https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id="+trackId+"&apikey=828251934ab71bde5ddf79419d12a713",getLyrics);
    //loadJSON("https://api.musixmatch.com/ws/1.1/album.get?album_id="+albumID+"&apikey=828251934ab71bde5ddf79419d12a713",getAlbum);
    //loadJSON('http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=	ece64c4337c8a1bfd576483ec3c27355&artist='+artistname+'&track='+trackname+'&format=json',getAlbumart);
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
  var pixels = albumArt.pixels
  let rgbValues = [];
  for(var i = 0; i < pixels.length; i+=4){
    const rgb = {
      r: pixels[i],
      g: pixels[i + 1],
      b: pixels[i + 2],
    };
    rgbValues.push(rgb);
  }
  quantcolors = quantization(rgbValues,0);
  //console.log(quantcolors);
}
const quantization = (rgbValues, depth) => {
  const MAX_DEPTH = 3;

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }

  /**
   *  Recursively do the following:
   *  1. Find the pixel channel (red,green or blue) with biggest difference/range
   *  2. Order by this channel
   *  3. Divide in half the rgb colors list
   *  4. Repeat process again, until desired depth or base case
   */
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};



function drawCube(particles,beatData,rectColor,noiseScale,num,segmentData,tempo,timesign,sections,bars) {
 
  frameRate(map(tempo*60,0,tempo,30,60));
  //rectColor[1].setAlpha(10); 
  let currentposition; 
  let pitches = [[]];
  let spd;
  
//fill()
//console.log(timesign)
//console.log(amp);
;
player.getCurrentState().then(state => {

  rectColor[1].setAlpha(255)
  currentposition = floor(state.position/1000)
  songlength = state.duration/1000
  songname = state.track_window.current_track.name;
  artist = state.track_window.current_track.artists[0].name
  let tempoSect;
  for(let i = 0;i<sections.length;i++){
      if (floor(currentposition) >= sections[i].start && floor(currentposition) <= sections[i].start + sections[i].duration){
      spd = sections[i].tempo/60
      }
    }
      
  
  let counter = 0


    if (particles.length == num){
      particlesFull == true;
    }else{particlesFull = false}
    if (!particlesFull){
      for(let i = 0; i < num; i ++) {
        particles.push(createVector(random(width), random(height)));
      }
    }
    
      
    //}

  

//}


       // rectColor[2].setAlpha(100)
       //noiseSeed(millis())
      for (let j = 0; j < segmentData.length; j++) {
        //console.log(segmentData[j]);
        //rectColor[2].setGreen(green(rectColor[0]))
    //rectColor[2].setRed(red(rectColor[0]))
    //rectColor[2].setBlue(blue(rectColor[0]))
        if(floor(currentposition) >= segmentData[j][0] && floor(currentposition) <= segmentData[j][0]+segmentData[j][1]){  
      //amp = map(segmentData[j][2],0,100,0,100)
      //noiseSeed(currentposition)
      pitches = find3largest(segmentData[j][3],segmentData[j][3].length);
      amp = segmentData[j][2]
      
       
        
        //console.log(amp);
        
      // map(pitches[0][1],0,12,0,255);
       //pitchColor = (map(pitches[0][1],0,12,0,255));
       //stroke(map(pitches[0][1],0,12,0,255),map(pitches[0][2],0,12,0,255),map(pitches[0][3],0,12,0,255));
       strokeWeight(map(pitches[0][1],-1,11,1,2));
  // strokeWeight(map(amp,0,30,0,5));
   //console.log(pitches)
   //stroke(map(amp,0,30,0,255),map(amp,0,30,0,255),map(amp,0,30,0,255));
    rectColor[6].setAlpha(map(pitches[0][1],-1,11,255,0))
 //rectColor[4].setRed(red(rectColor[0])+map(amp,0,30,-5,5));
      //rectColor[4].setBlue(blue(rectColor[0])+map(amp,0,30,-5,5));
      //rectColor[4].setGreen(green(rectColor[0])+map(amp,0,30,-5,5));
    stroke(rectColor[6]);
    rectColor[2].setAlpha(map(pitches[0][1],-1,11,5,0,255));
      //console.log(amp)
    //\\}
    for(let h = 0;h<bars.length;h++){
       
      //for(let i = 0; i < beatData.length; i++) {
        
        //console.log(currentposition,beatData[i][0]);
        if (floor(currentposition) > bars[h].start && floor(currentposition) < bars[h].start + bars[h].duration && h%timesign == 0){
    //if(floor(currentposition) > beatData[i][0] && floor(currentposition) < beatData[i][0]+beatData[i][1] && i%timesign == 0){
      //rectColor[6].setAlpha(50);
        spd = -spd
        noiseSeed(currentposition)
      }
   // }
    
    }
       
  //}
  //strokeWeight(amp);
        }
    }
   
    
    
  

    

  
for(let i = 0; i < num; i ++) {
  let p = particles[i];
  //rectColor[0].setAlpha(50);
  
 // fill(rectColor[4]);
  point(p.x,p.y)
  
  let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
  let a = TAU * n;
  p.x += cos(a) * spd;
  p.y += sin(a) * spd;
  if(!onScreen(p)) {
    p.x = random(width);
    p.y = random(height);
  }
}


fill(rectColor[4]);
//strokeWeight(2);
//noStroke();
text(songname+' by '+artist,width/2,height/2);
//colorMode(HSB)
//rectColor[0].setHue(24)
//console.log(rectColor[0]);
background(rectColor[2]);
})
   //rectColor[3].setAlpha(10);

}





const findBiggestColorRange = (rgbValues) => {
  
//console.log(rgbValues);
let rMin = Number.MAX_VALUE
let gMin = Number.MAX_VALUE
let bMin = Number.MAX_VALUE

let rMax = Number.MIN_VALUE
let gMax = Number.MIN_VALUE
let bMax = Number.MIN_VALUE

rgbValues.forEach((pixel) => {
rMin = Math.min(rMin,pixel.r)
gMin = Math.min(gMin,pixel.g)
bMin = Math.min(gMin,pixel.b)

rMax =Math.max(rMax,pixel.r)
gMax = Math.max(gMax,pixel.g)
bMax =Math.max(bMax,pixel.b)
});
  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;
  
  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return 'r'
  } else if (biggestRange === gRange) {
    return 'g'
  } else {
    return 'b'
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

function find3largest(arr, arr_size)
{
    let first, second, third;
 
    // There should be atleast three elements
    if (arr_size < 3)
    {
        //document.write(" Invalid Input ");
        return;
    }
 
    third = first = second = [Number.MIN_VALUE];
    for(let i = 0; i < arr_size; i++)
    {
         
        // If current element is
        // greater than first
        if (arr[i] > first[0])
        {
            third = second;
            second = first;
            first = [arr[i],i]
        }
 
        // If arr[i] is in between first
        // and second then update second
        else if (arr[i] > second[0])
        {
            third = second;
            second = [arr[i],i]
        }
 
        else if (arr[i] > third[0])
            third = [arr[i],i]
    }
    //console.log(first,second,third);
   return [first,second,third];
}

function windowResized(){resizeCanvas(windowWidth,windowHeight)}

function rgb_to_hsv(r , g , b) {
 colorMode(HSB)
  // R, G, B values are divided by 255
  // to change the range from 0..255 to 0..1
  r = r / 255.0;
  g = g / 255.0;
  b = b / 255.0;

  // h, s, v = hue, saturation, value
  var cmax = Math.max(r, Math.max(g, b)); // maximum of r, g, b
  var cmin = Math.min(r, Math.min(g, b)); // minimum of r, g, b
  var diff = cmax - cmin; // diff of cmax and cmin.
  var h = -1, s = -1;

  // if cmax and cmax are equal then h = 0
  if (cmax == cmin)
      h = 0;

  // if cmax equal r then compute h
  else if (cmax == r)
      h = (60 * ((g - b) / diff) + 360) % 360;

  // if cmax equal g then compute h
  else if (cmax == g)
      h = (60 * ((b - r) / diff) + 120) % 360;

  // if cmax equal b then compute h
  else if (cmax == b)
      h = (60 * ((r - g) / diff) + 240) % 360;

  // if cmax equal zero
  if (cmax == 0)
      s = 0;
  else
      s = (diff / cmax) * 100;

  // compute v
  var v = cmax * 100;
  //document.write("(" + h.toFixed(1) + ", " + s + ", " + v + ")");

  //let hsv = color(h,s,v)
  return [h,s,v]
}

 