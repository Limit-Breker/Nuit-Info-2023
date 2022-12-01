from flask import Flask, render_template, request, g, url_for, session, redirect
import sqlite3
import re

app = Flask(__name__)

database = sqlite3.connect("data/database.db")
DATABASE = "data/database.db"


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


@app.route("/")
def index():
    return "hello"


@app.route("/register/", methods=["GET", "POST"])
def register():
    # Output message if something goes wrong...
    msg = ""
    # Check if "username", "password" and "email" POST requests exist (user submitted form)
    if (
        request.method == "POST"
        and "username" in request.form
        and "password" in request.form
    ):
        # Create variables for easy access
        username = request.form["username"]
        password = request.form["password"]
        user_age = request.form["age"]
        try:
            if user_age != "":
                user_age = int(user_age)
                if user_age < 13:
                    user_age = "Sorry, you are too young :("
        except ValueError:
            user_age = "Age must be an Integer"

        # Check if account exists
        database = get_db()
        cursor = database.cursor()

        account = cursor.execute(
            "SELECT username FROM users WHERE username = ?", (username,)
        ).fetchone()

        # If account exists show error and validation checks
        if account:
            msg = "Account already exists!"
        elif not re.match(r"[A-Za-z0-9]+", username):
            msg = "Username must contain only characters and numbers!"
        elif not username or not password or not user_age:
            msg = "Please fill out the form!"
        elif isinstance(user_age, str):
            msg = user_age
        else:
            # Account doesnt exists and the form data is valid, now insert new account into accounts table
            cursor.execute(
                "INSERT INTO users VALUES (?, ?, ?, ?, ?)",
                (username, password, "", 0, user_age),
            )
            database.commit()
            msg = "You have successfully registered!"
            return redirect(url_for("index"))

    return render_template("registration/register.html", msg=msg)

app.run(host="0.0.0.0", debug=True)
