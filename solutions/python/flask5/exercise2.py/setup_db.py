import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

def create_user_table(conn):
    """Create table."""
    cur = conn.cursor()
    try:
        sql = ("CREATE TABLE users ("
               "userid INTEGER, "
               "username TEXT NOT NULL, "
               "passwordhash TEXT NOT NULL, "
               "PRIMARY KEY(userid) "
               "UNIQUE(username))")
        cur.execute(sql)
        conn.commit
    except sqlite3.Error as err:
        print("Error: {}".format(err))
    else:
        print("Table created.")
    finally:
        cur.close()

def add_user(conn, username, hash):
    """Add user. Returns the new user id"""
    cur = conn.cursor()
    try:
        sql = ("INSERT INTO users (username, passwordhash) VALUES (?,?)")
        cur.execute(sql, (username, hash))
        conn.commit()
    except sqlite3.Error as err:
        print("Error: {}".format(err))
        return -1
    else:
        print("User {} created with id {}.".format(username, cur.lastrowid))
        return cur.lastrowid
    finally:
        cur.close()

def get_user_by_name(conn, username):
    """Get user details by name."""
    cur = conn.cursor()
    try:
        sql = ("SELECT userid, username FROM users WHERE username = ?")
        cur.execute(sql, (username,))
        for row in cur:
            (id,name,role) = row
            return {
                "username": name,
                "userid": id
            }
        else:
            #user does not exist
            return {
                "username": username,
                "userid": None
            }
    except sqlite3.Error as err:
        print("Error: {}".format(err))
    finally:
        cur.close()

def get_hash_for_login(conn, username):
    """Get user details from id."""
    cur = conn.cursor()
    try:
        sql = ("SELECT passwordhash FROM users WHERE username=?")
        cur.execute(sql, (username,))
        for row in cur:
            (passhash,) = row
            return passhash
        else:
            return None
    except sqlite3.Error as err:
        print("Error: {}".format(err))
    finally:
        cur.close()


if __name__ == "__main__":
    

    try:
        conn = sqlite3.connect("database.db")
    except sqlite3.Error as err:
        print(err)
    else:
        #drop_table(conn)
        create_user_table(conn)
        add_user(conn,"johndoe", generate_password_hash("Joe123"))
        add_user(conn,"maryjane", generate_password_hash("LoveDogs"))
        hash = get_hash_for_login(conn, "maryjane")
        print("Check password: {}".format(check_password_hash(hash,"LoveDogs")))
        
        conn.close()
