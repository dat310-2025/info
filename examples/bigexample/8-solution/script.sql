CREATE TABLE users (
    userid INTEGER, 
    username TEXT NOT NULL, 
    passwordhash TEXT NOT NULL, 
    PRIMARY KEY(userid) 
    UNIQUE(username)
)

CREATE TABLE addresses (
    addressid INTEGER, 
    user INTEGER, 
    name TEXT NOT NULL, 
    tel TEXT, 
    email TEXT, 
    PRIMARY KEY(addressid) 
    FOREIGN KEY (user) REFERENCES users (userid)
)