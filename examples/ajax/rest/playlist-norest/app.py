from time import sleep
from flask import Flask, request, abort
import json
import random
    

app = Flask(__name__)

@app.route("/")
def index():
    return app.send_static_file("index.html")

PLAYLIST = [
        { "name": "My favorite",
          "band": "This band"
        },
        { "name": "Second favorite",
          "band": "This other band"
        }
    ]

FAIL = True

@app.route("/playlist", methods=["GET"])
def getplace():
    sleep(1)
    return json.dumps(PLAYLIST)

@app.route("/add", methods=["POST"])
def addSong():
    sleep(1)
    if random.choice([True, False]):  # Simulate random failure
        abort(500, "Try again")
    song = json.loads(request.data)
    if song not in PLAYLIST:
        PLAYLIST.append(song)
    return json.dumps(PLAYLIST)

@app.route("/remove", methods=["POST"])
def removeSong():
    sleep(1)
    song = request.get_json()
    if song in PLAYLIST:
        PLAYLIST.remove(song)
        
    return json.dumps(PLAYLIST)

if __name__ == "__main__":
    app.run(debug=True)