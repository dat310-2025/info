"""
AJAX License example
"""

from flask import Flask, request, redirect
import json

app = Flask(__name__)


@app.route("/user", methods=["GET"])
def check_license():
    DATA = {
        "name":"John Doe",
        "favorite": "Pizza"
    }
    return DATA


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(debug=True)
