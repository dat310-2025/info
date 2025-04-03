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

def create_address_table(conn):
    """Create table."""
    cur = conn.cursor()
    try:
        sql = ("CREATE TABLE addresses ("
               "addressid INTEGER, "
               "user INTEGER, "
               "name TEXT NOT NULL, "
               "tel TEXT, "
               "email TEXT, "
               "PRIMARY KEY(addressid) "
               "FOREIGN KEY (user) REFERENCES users (userid))")
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

def insert_address(conn, name, email,tel, userid):
    """Add user. Returns the new user id"""
    cur = conn.cursor()
    try:
        sql = ("INSERT INTO addresses (user,name, email, tel) VALUES (?,?,?,?)")
        cur.execute(sql, (userid, name, email, tel))
        conn.commit()
    except sqlite3.Error as err:
        print("Error: {}".format(err))
        return -1
    else:
        print("Address {} added with id {}.".format(name, cur.lastrowid))
        return cur.lastrowid
    finally:
        cur.close()

def update_address(conn, address, userid):
    """Add user. Returns the new user id"""
    cur = conn.cursor()
    try:
        sql = ("UPDATE addresses SET "
                "name=?, email=?, tel=? "
                "WHERE addressid = ? AND user = ?")
        cur.execute(sql, (address["name"], 
                        address.get("email",None),
                        address.get("tel",None), 
                        address.get("id",None), 
                        userid))
        conn.commit()
    except sqlite3.Error as err:
        print("Error: {}".format(err))
        return 0
    else:
        print("Updates {} addresses.".format(cur.rowcount))
        return cur.rowcount
    finally:
        cur.close()

def delete_address(conn, addressid, userid):
    """Add user. Returns the new user id"""
    cur = conn.cursor()
    try:
        sql = ("DELETE FROM addresses "
                "WHERE addressid = ? AND user = ?")
        cur.execute(sql, (addressid, 
                        userid))
        conn.commit()
    except sqlite3.Error as err:
        print("Error: {}".format(err))
        return 0
    else:
        print("Removed {} addresses.".format(cur.rowcount))
        return cur.rowcount
    finally:
        cur.close()

def get_user_addresses(conn, userid):
    """Get user details by name."""
    cur = conn.cursor()
    try:
        sql = ("SELECT addressid, name, tel, email FROM addresses WHERE user = ?")
        cur.execute(sql, (userid,))
        addresses = []
        for row in cur:
            (id,name,tel,email) = row
            addresses.append({
                "id": id,
                "name": name,
                "tel": tel,
                "email": email
            })
        return addresses
    except sqlite3.Error as err:
        print("Error: {}".format(err))
    finally:
        cur.close()

def get_user_by_name(conn, username):
    """Get user details by name."""
    cur = conn.cursor()
    try:
        sql = ("SELECT userid, username FROM users WHERE username = ?")
        cur.execute(sql, (username,))
        for row in cur:
            (id,name) = row
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

def get_user_by_id(conn, userid):
    """Get user details by id."""
    cur = conn.cursor()
    try:
        sql = ("SELECT userid, username FROM users WHERE userid = ?")
        cur.execute(sql, (userid,))
        for row in cur:
            (id,name) = row
            return {
                "username": name,
                "userid": id
            }
        else:
            #user does not exist
            return {
                "username": None,
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
        create_address_table(conn)
        add_user(conn,"johndoe", generate_password_hash("Joe123"))
        add_user(conn,"maryjane", generate_password_hash("LoveDogs"))
        
        insert_address(conn, "Don John", "don.john@ymail.com", "12-322-622", 1)
        insert_address(conn, "Don John", "don.john@ymail.com", "12-322-622", 2)
        insert_address(conn, "Elizabeth Westland", "e47wl@outlook.com", "66-112-312", 1)
        insert_address(conn, "John Smith", "john.smith@gmail.com", "12-345-678", 1)
        insert_address(conn, "Kevin Magnussen", "+31 997-11-21", "kevinrulez@noemail.com", 1)
        hash = get_hash_for_login(conn, "maryjane")
        print("Check password: {}".format(check_password_hash(hash,"LoveDogs")))
        
        conn.close()
