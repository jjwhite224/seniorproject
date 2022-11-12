// Basile Pesin
// http://vertmo.github.io


// MetaBalls : p5.js implementation
var artist;
var songname;
var trackPic;
function setup(){
    createCanvas(displayWidth,displayHeight);
    noStroke();
    mastodon =  loadFont('assets/MASTOD__.ttf')
    textFont(mastodon,24);
    textAlign(CENTER,CENTER);
    imageMode(CENTER);
    
}

function draw() {
    background(255);
  loadLyrics();
  text(songname+' by '+artist,displayWidth/2,displayHeight/2);
  if (trackPic != null){
  image(trackPic,displayWidth/2,displayHeight/2-75,100,100);
  }
  if (analysisLoaded == true){
    console.log(analysisJSON);
    analysisLoaded = false;
    //console.log(songTime);

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