"""
Exercise #2: Primes
"""

from flask import Flask, render_template
import math

app = Flask(__name__)

def is_prime(n):
    if n == 1:
        return False
    for i in range(2, math.floor(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

@app.route("/")
def index():
    # use the is_prime function to compute an array that you pass in to the template.
    return render_template("primes.html")


if __name__ == "__main__":
    app.run()
