Element.prototype.toggleHide = function(disp) {
    if (this.style.display === "none") {
      this.style.display = disp || "block";
    } else {
      this.style.display = "none";
    }
} 

const ready = e => {

    const songs = [
        {
            "title": "Rage Room",
            "uri-title": "rage-room",
            "classes": "spaced-text light-text",
            "META": {
                "description": "I was making another track but when I listened through that Tom Scott sample I thought of this and I needed to practice my trap production so this way I feed two birds with one scone.",
                "genre":       "Industrial Trap",
                "tags":        ["Industrial", "Trap", "House", "Experimental", "Alternative"],
                "LICENSE":     "CC BY-NC-SA 3.0 | https://creativecommons.org/licenses/by-nc-sa/3.0/",
                "source":      true,
                "formats":     ["flac", "wav"]    
            }
        }
    ];

    const N_SONGS = 1;

    document.lz_song.songs = new Array(N_SONGS);
    document.wavesurfer    = new Array(N_SONGS);

    document.addEventListener(
        'PLAY_SONG',
        e => {
            document.wavesurfer[e.detail.song_n].play()
            document.getElementById(`control-${e.detail.song_n}-play`).toggleHide('inline-block') 
            document.getElementById(`control-${e.detail.song_n}-pause`).toggleHide('inline-block')
        }
    )

    document.addEventListener(
        'PAUSE_SONG',
        e => {
            document.wavesurfer[e.detail.song_n].pause()
            document.getElementById(`control-${e.detail.song_n}-play`).toggleHide('inline-block') 
            document.getElementById(`control-${e.detail.song_n}-pause`).toggleHide('inline-block')
        }
    )

    const colors = [
        new Color(0x0e83cd),
        new Color(0xf06060),
        new Color(0xfcd04b),
        new Color(0x2ecc71),
        new Color(0x9e54bd),
        new Color(0x4593e3),
        new Color(0x2ac56c),
        new Color(0xecf0f1),
        new Color(0x435a6b),
        new Color(0xf39c12),
        new Color(0xcd4436),
        new Color(0xf19f0f),
        new Color(0x3fa46a),
        new Color(0x9e487f),
        new Color(0x16a085),
        new Color(0xaab7b7)
    ]

    function getTheme(i){

        let theme = {};
        theme.wave = colors[i].lightness(colors[i].l/2)
        theme.progress = colors[i].lightness(colors[i].l*0.8)
    
        return theme
    }
    
    let i=0;
    document.lz_song.current = -1;

    for(let song of songs){

        document.lz_song.songs[i] = {
            pos: 0,
            playing: false
        }
    
        let theme = getTheme(i++)
    
        let node = `
    
        <section id='section-${i}' class='color-${i} ${song.classes}'>
    
            <article class="media music">
    
                <figure class="media-left">
    
                    <p class="image">
                        <img src="./songs/${song['uri-title']}/art">
                    </p>

                    <i id="control-${i}-backward" class="fas fa-step-backward" ></i>
                    <i id="control-${i}-play"     class="fas fa-play"          ></i>
                    <i id="control-${i}-pause"    class="fas fa-pause"         ></i>
                    <i id="control-${i}-forward"  class="fas fa-step-forward"  ></i>
                    <i id="control-${i}-random"   class="fas fa-random"        ></i>
                    <i id="control-${i}-repeat"   class="fas fa-repeat"        ></i>
    
                </figure>
    
                <div class="media-content">
    
                    <div class="content">
                        <p>
                            <strong>${song['title']}</strong> | <small>${song.META.genre}</small>
                            <br>
                            ${song.META.description}
                        </p>
    
                        <div id='${song['uri-title']}-cont'></div>
                    </div>
    
                </div>
                
            </article>
    
        </section>`
    
        document.getElementById(`section-${i-1}`)
         .insertAdjacentHTML(
            'afterend', 
            node
         );
         document.getElementById(`control-${i}-pause`).toggleHide('inline-block')
        
        document.wavesurfer[i] = WaveSurfer.create({
            container: `#${song['uri-title']}-cont`,
            waveColor: theme.wave,
            progressColor: theme.progress
        });
        document.wavesurfer[i].load(`./songs/${song['uri-title']}`);
        document.wavesurfer[i].reapeating = false;

        document.wavesurfer[i].on(
            'seek',
            e => {
                document.lz_song.songs[i].pos = document.wavesurfer[i].getCurrentTime()
            }
        )

        document.wavesurfer[i].on('error', e => {
            alert(`ERROR AT SONG ${i} | e: ${e}`)
         })

        document.getElementById(`control-${i}-backward`)
         .addEventListener('click', e => {
            if(document.lz_song.current == i){

                document.wavesurfer[i].pause()
                document.wavesurfer[i].seekTo(0)

                switch (document.lz_song.songs[i].pos < 3){

                    case true:{
                        {
                            document.dispatchEvent(
                                new CustomEvent(
                                    `PLAY_SONG`, 
                                    {
                                        detail: {
                                            time: new Date(),
                                            song_n: i-1
                                        },
                                        bubbles: true,
                                        cancelable: true
                                    }
                                )
                            )
                        }
                        break;
                    }
                    
                    case false:{
                        {
                            document.dispatchEvent(
                                new CustomEvent(
                                    `PLAY_SONG`, 
                                    {
                                        detail: {
                                            time: new Date(),
                                            song_n: i
                                        },
                                        bubbles: true,
                                        cancelable: true
                                    }
                                )
                            )
                        }
                        break;
                    }
                }
            }
         })

        document.getElementById(`control-${i}-play`)
         .addEventListener('click', e => {

            if(document.lz_song.current !== i && document.lz_song.current > 0){

                document.dispatchEvent(
                    new CustomEvent(
                        `PAUSE_SONG`, 
                        {
                            detail: {
                                time: new Date(),
                                song_n: document.lz_song.current
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    )
                )
                
                document.dispatchEvent(
                    new CustomEvent(
                        `PLAY_SONG`, 
                        {
                            detail: {
                                time: new Date(),
                                song_n: i
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    )
                )
            }

            else if(document.lz_song.current < 0){
                document.dispatchEvent(
                    new CustomEvent(
                        `PLAY_SONG`, 
                        {
                            detail: {
                                time: new Date(),
                                song_n: i
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    )
                )
            }

            document.lz_song.current = i;
         })

        document.getElementById(`control-${i}-pause`)
         .addEventListener('click', e => {
            if(document.lz_song.current == i){
                document.lz_song.current = -1;
                document.dispatchEvent(
                    new CustomEvent(
                        `PAUSE_SONG`, 
                        {
                            detail: {
                                time: new Date(),
                                song_n: i
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    )
                )
            }
         })

        document.getElementById(`control-${i}-forward`)
         .addEventListener('click', e => {
            if(document.lz_song.current == i){

                document.wavesurfer[i].pause()
                document.wavesurfer[i].seekTo(0)

                document.dispatchEvent(
                    new CustomEvent(
                        `PLAY_SONG`, 
                        {
                            detail: {
                                time: new Date(),
                                song_n: i+1
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    )
                )
            }
         })

        document.getElementById(`control-${i}-random`)
         .addEventListener('click', e => {
            document.wavesurfer[i].on('finish', e => {

                document.wavesurfer[i].seekTo(0)
                document.dispatchEvent(
                    new CustomEvent(
                        `PLAY_SONG`, 
                        {
                            detail: {
                                time: new Date(),
                                song_n: Math.round(Math.random() * N_SONGS)
                            },
                            bubbles: true,
                            cancelable: true
                        }
                    )
                )
            })
         })

        document.getElementById(`control-${i}-repeat`)
         .addEventListener('click', e => {

            if(document.lz_song.current == i){
                document.wavesurfer[i].reapeating != document.wavesurfer[i].reapeating
                if(document.wavesurfer[i].reapeating){
                    document.wavesurfer[i].on('finish', e => {
    
                        document.wavesurfer[i].seekTo(0)
                        document.dispatchEvent(
                            new CustomEvent(
                                `PLAY_SONG`, 
                                {
                                    detail: {
                                        time: new Date(),
                                        song_n: i
                                    },
                                    bubbles: true,
                                    cancelable: true
                                }
                            )
                        )
                    })
                }
                else{
                    document.wavesurfer[i].on('finish', e => {})
                }
            }

         })
    }
}

function awaitColor(){

    switch(typeof WaveSurfer == "undefined"){

        case true:{
            {
                document.addEventListener("WAVESURFER_READY", ready, false)
            }
            break;
        }
    
        case false:{
            {
                ready()
            }
            break;
        }
    }
}


switch(typeof Color == "undefined"){

    case true:{
        {
            document.addEventListener("COLOR_READY", awaitColor, false)
        }
        break;
    }

    case false:{
        {
            awaitColor()
        }
        break;
    }
}