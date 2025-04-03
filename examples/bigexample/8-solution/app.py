"""
Flask: Login
"""

from setup_db import *
from flask import Flask, request, redirect, url_for, flash, session, g, abort
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
    return app.send_static_file("index.html")


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print(data)
    if not valid_login(data.get("username", ""), data.get("password", "")):
        abort(404)
    conn = get_db()
    user = get_user_by_name(conn,data["username"])
    #user["addresses"] = get_user_addresses(conn, user["userid"])
    #print(user)
    session["userid"] = user["userid"]
    return user

@app.route("/logout")
def logout():
    session.pop("userid")
    return "OK"

# Here comes the rest API for addresses.
@app.route("/user", methods=["GET"])
def get_user():
    userid = session.get("userid", None)
    if userid == None:
        abort(404)
    conn = get_db()
    user = get_user_by_id(conn,userid)
    return json.dumps(user)


@app.route("/addresses", methods=["GET"])
def get_addresses():
    userid = session.get("userid", None)
    if userid == None:
        abort(404)
    conn = get_db()
    
    addresses = get_user_addresses(conn, userid)
    return json.dumps(addresses)

@app.route("/addresses", methods=["POST"])
def add_address():
    userid = session.get("userid", None)
    if userid == None:
        abort(404)
    
    newaddress = request.get_json()
    if len(newaddress.get("name", "")) == 0:
        abort(400)

    conn = get_db()
    newid = insert_address(conn, newaddress["name"], 
                            newaddress.get("email", None),
                            newaddress.get("tel", None), 
                            userid)

    return str(newid)

@app.route("/addresses/<addressid>", methods=["PUT"])
def set_address(addressid):
    userid = session.get("userid", None)
    if userid == None:
        abort(404)
    
    address = request.get_json()
    if len(address.get("name", "")) == 0 or address.get("id", "-1") != addressid:
        abort(400)

    conn = get_db()
    affected = update_address(conn, address,
                            userid)

    if affected == 0:
        abort(400)

    return "OK"

@app.route("/addresses/<addressid>", methods=["DELETE"])
def del_address(addressid):
    userid = session.get("userid", None)
    if userid == None:
        abort(404)
    
    conn = get_db()
    affected = delete_address(conn, addressid,
                            userid)

    if affected == 0:
        abort(400)

    return "OK"
    



if __name__ == "__main__":
    app.run(port=5001)