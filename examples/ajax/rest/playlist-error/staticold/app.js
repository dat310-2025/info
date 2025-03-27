let app = Vue.createApp({
    data: function(){
        return {
            playlist: [],
            loading: true,
            error: null
        }
    },
    created: async function(){ 
        try {
            let response = await fetch("/songs");
            if (response.status == 200){
                let result = await response.json()
                this.playlist = result;
                this.loading = false;

            }
        } catch (e) {
            this.error = "Connection error: " + e
        }
    },
    methods: {
        addSong: async function(song) {
            if (!song.name || !song.band){
                this.error = "Please enter song name and band name."
                return;
            }


            // add song to playlist and mark as not saved
            song.saving = true;
            this.playlist.push(song);
            this.trysave(song);
        },
        trysave: async function(song){
            try {
                response = await fetch("/songs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({name: song.name, band: song.band}),
                });
                let result = await response.json()
                if (response.status == 200){
                    this.playlist = result;
                }
                else {
                    this.error = "Request error: " + 
                        response.status + " " + 
                        response.statusText + ": " +
                        result.description;
                    song.retry = true;
                }
            } catch (e) {
                this.error = "Connection error: " + e
            }
            
        },
        remove: async function(song){
            // set as saving
            song.saving= true;
            console.log(JSON.stringify({name: song.name, band: song.band}));
            let response = await fetch("/songs/"+ song.idx, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: song.name, band: song.band}),
            });
            let result = await response.json()
            if (response.status == 200){
                this.playlist = result;
            }
            else {
                this.error = "Request error: " + 
                        response.status + " " + 
                        response.statusText + ": " +
                        result.description;
                song.saving= false;
            }
        }
    }
});
app.component("song-form", songFormC);
app.component("song-list-item", songListItemC);
let vm = app.mount("#app");