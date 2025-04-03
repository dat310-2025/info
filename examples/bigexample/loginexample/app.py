"""
Flask: Login
"""

from setup_db import *
from flask import Flask, request, redirect, url_for, session, g, abort, render_template
from werkzeug.security import generate_password_hash, check_password_hash
import json

app = Flask(__name__)
app.debug = True
app.secret_key = 'some_secret'
app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Strict',
)


def get_db():
    if not hasattr(g, "_database"):
        print("create connection")
        g._database = sqlite3.connect("database.db")
    return g._database


@app.teardown_appcontext
def teardown_db(error):
    """Closes the database at the end of the request."""
    db = getattr(g, '_database', None)
    if db is not None:
        print("close connection")
        db.close()

def valid_login(username, password):
    """Checks if username-password combination is valid."""
    # user password data typically would be stored in a database
    conn = get_db()

    hash = get_hash_for_login(conn, username)
    # the generate a password hash use the line below:
    # generate_password_hash("rawPassword")
    if hash != None:
        return check_password_hash(hash, password)
    return False


# The first three routes do not fit into a rest API. 

@app.route("/")
def index():
    userid = session.get("userid")
    if userid:
        conn = get_db()
        user = get_user_by_id(conn,userid)
        return render_template("index.html",username = user["username"])
    return render_template("index.html")


@app.route("/login", methods=["POST"])
def login():
    
    username = request.form.get("username", "")
    pw = request.form.get("password", "")
    print(username, pw)
    if not valid_login(username, pw):
        abort(404)
    conn = get_db()
    user = get_user_by_name(conn,username)
    session["userid"] = user["userid"]
    return redirect(url_for("index"))

@app.route("/logout")
def logout():
    session.pop("userid")
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run()