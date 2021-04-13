document.getElementById('search-btn').addEventListener('click',function(){
    const songValue = document.getElementById('song-value').value;
    fetch(`https://api.lyrics.ovh/suggest/${songValue}`)
    .then(response => response.json())
    .then(data => inputLyricsName(data))
    .catch(error => displayError('Something Wrong!! Please try again later...'))
});

function inputLyricsName(data){
    const dataInfo = data.data;
    document.getElementById('errorissue').innerText='';
    const output = document.getElementById('output');
    output.innerHTML = '';
    // console.log(dataInfo);
    for (let i = 0; i < 10; i++) {
        const songArray= dataInfo[i];
        // console.log(songArray);
        const songTitle = songArray.title;
        const albumBy = songArray.artist.name;

        const createDiv = document.createElement('div');
        createDiv.className = 'single-result row align-items-center my-3 p-3';
        createDiv.innerHTML=
        `<div class="col-md-9">
            <h3 class="lyrics-name">${songTitle}</h3>
            <p class="author lead">Album by <span>${albumBy}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick="getLyrics('${albumBy}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
        </div>
        <div class="single-lyrics text-center mx-auto" id="lyrics">`;
        output.appendChild(createDiv);
        
    }
}

function getLyrics(title, artist){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => displayLyrics(data.lyrics))
}

function displayLyrics(lyrics){
    document.getElementById('lyrics').innerText = lyrics;

}
const displayError = (textError) =>{
    document.getElementById('errorissue').innerText = textError;
}