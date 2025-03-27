from time import sleep
from flask import Flask, request, abort
import json

app = Flask(__name__)



PLAYLIST = [
        { "name": "My favorite",
          "band": "This band",
          "idx": 0
        },
        { "name": "Second favorite",
          "band": "This other band",
          "idx": 1
        }
    ]

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/songs", methods=["GET"])
def getplace():
    return json.dumps(PLAYLIST)

@app.route("/songs", methods=["POST"])
def addSong():
    try:
        song = json.loads(request.data)
    except json.decoder.JSONDecodeError as err:
        print("Decoding error: ", err)
        abort(400, "unable to decode JSON") # bad request.
    name = song.get("name")
    band = song.get("band")
    if not name or not band:
        abort(400, "name or band missing")
    # get last id
    lastid = PLAYLIST[-1]["idx"]
    song = {
        "name": name,
        "band": band,
        "idx": lastid+1
    }
    PLAYLIST.append(song)
    return json.dumps(PLAYLIST)

@app.route("/songs/<int:idx>", methods=["DELETE"])
def removeSong(idx):
    sleep(1)
    found = False
    for song in PLAYLIST:
        if idx == song["idx"]:
            PLAYLIST.remove(song)
            found = True
    if not found:
        abort(404)
        
        
    return json.dumps(PLAYLIST)

@app.errorhandler(400)
def request_error(e):
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

if __name__ == "__main__":
    app.run(debug=True)