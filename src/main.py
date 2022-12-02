
from flask import Flask, render_template



app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")
@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/temoignage")
def temoignage():
    return render_template("info_folder/temoignages.html")

@app.route("/games")
def games():
    return render_template("games.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/prejuge")
def prejuge():
    return render_template("info_folder/prejuge.html")

@app.route("/info")
def info():
    return render_template("info_folder/info.html")

@app.route("/contraception")
def contraception():
    return render_template("info_folder/contraception.html")

@app.route("/ist")
def ist():
    return render_template("info_folder/ist.html")


app.run(host="0.0.0.0", debug=True)
