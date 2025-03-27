from time import sleep
from flask import Flask, request, abort
import json

app = Flask(__name__)

@app.route("/")
def index():
    return app.send_static_file("index.html")

PLAYLIST = [
        { "name": "My favorite",
          "band": "This band",
          "idx": 0,
        },
        { "name": "Second favorite",
          "band": "This other band",
          "idx": 1
        }
    ]

@app.route("/songs", methods=["GET"])
def playlist():
    sleep(1)
    return json.dumps(PLAYLIST)

@app.route("/songs", methods=["POST"])
def addSong():
    sleep(1)
    song = json.loads(request.data)
    if song.get("name",None) == None or song.get("band",None) == None:
        abort(400)
    song["idx"] = len(PLAYLIST)
    if song not in PLAYLIST:
        PLAYLIST.append(song)
    return json.dumps(PLAYLIST)

@app.route("/songs/<int:idx>", methods=["DELETE"])
def removeSong(idx):
    sleep(1)
    for song in PLAYLIST:
        if idx == song["idx"]:
            PLAYLIST.remove(song)
        
    return json.dumps(PLAYLIST)

if __name__ == "__main__":
    app.run(debug=True)