

            // ===========================         Search Option    =========================  //

                const searchButton = document.querySelector('#searchButton');
                searchButton.addEventListener('click',function(){
                    const serchInput = document.querySelector('#serchInput').value;

                    fetch(`https://api.lyrics.ovh/suggest/${serchInput}/`)
                    .then(response => response.json())
                    .then(data => serchResult(data));
                })


            //===================================  Search Result ======================== //

            function serchResult(search){
                let parent = document.querySelector('#parent');
                for(let i = 0; i<10 ;i++){
                    let title = search.data[i].title;
                    let albumTitle = search.data[i].album.title;
                    let artist = search.data[i].artist.name;
                    
                    let result = `<div class="single-result row align-items-center my-3 p-3">
                                        <div class="col-md-8">
                                            <h4 class="lyrics-name" id="title">${title}</h4>
                                            <p class="author lead">Name of Album  : <span id="artistName">${artist}</span></p>
                                            <p class="author lead">Title of Album :  <span id="artistName">${albumTitle}</span></p>
                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                            <button  onclick="singerTitle('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                                        </div>
                                    </div>`;
                    parent.innerHTML += result;
                    
                }
            }


            function singerTitle(artist,title){
                fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                .then(response => response.json())
                .then(song => lyrics(song,title));
            }

            function lyrics(song,title){
                if(song.lyrics === undefined){
                    document.querySelector('#showLyrics').innerText = "This Lyrics is Unavailable";
                }else{
                    document.querySelector('#showLyrics').innerText = song.lyrics;
                }
                document.querySelector('#songTitle').innerText = title;
            }