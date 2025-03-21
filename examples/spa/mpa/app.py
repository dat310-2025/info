"""
AJAX License example
"""

from flask import Flask, request, render_template
import json
from time import sleep

app = Flask(__name__)


@app.route("/about")
def about():
    sleep(2)
    return render_template("about.html")


@app.route("/")
def index():
    user = {
        "name":"John Doe",
        "favorite": "Pizza"
    }
    return render_template("index.html", user = user)

@app.route('/<path:path>')
def catch_all(path):
    return render_template('error.html'), 404

if __name__ == "__main__":
    app.run(debug=True)
