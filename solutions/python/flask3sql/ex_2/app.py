"""
Exercise #2: Movie details
"""

from flask import Flask, render_template, g, request, abort
import sqlite3

app = Flask(__name__)

# Application config
DATABASE = "database.db" # create database.db using ex_0/init_db.py
app.debug = True  # only for development!


def get_db():
    if not hasattr(g, "_database"):
        g._database = sqlite3.connect(DATABASE)
    return g._database


@app.teardown_appcontext
def teardown_db(error):
    """Closes the database at the end of the request."""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route("/")
def index():
    db = get_db()
    cur = db.cursor()
    try:
        movies = []  # holds the data that we will return
        sql = "SELECT imdb_id, title, year, rating, synopsis FROM movies"
        cur.execute(sql)
        for (imdb_id, title, year, rating, synopsis) in cur:
            movies.append({
                "imdb_id" : imdb_id,
                "title": title,
                "year": year,
                "rating": rating,
                "synopsis": synopsis
            })
        return render_template("movies.html", movies=movies)
    except sqlite3.Error as err:
        return render_template("error.html", msg="Error querying data"), 500
    finally:
        cur.close()


@app.route("/movie/<imdb_id>")
def movie(imdb_id):
    db = get_db()
    cur = db.cursor()
    try:
        sql = "SELECT title, year, rating, synopsis FROM movies WHERE imdb_id=?"
        cur.execute(sql, (imdb_id,))
        for (title, year, rating, synopsis) in cur:
            return render_template("movie.html", imdb_id=imdb_id, title=title, year=year, rating=rating, synopsis=synopsis)
        return abort(404)
    except sqlite3.Error as err:
        return render_template("error.html", msg="Error querying data"), 500
    finally:
        cur.close()


if __name__ == "__main__":
    app.run()