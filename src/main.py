from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def index():
    return "hello"

@app.route("/info_folder")
def prejuge():
    return render_template("info_folder/prejuge.html")

app.run(host="0.0.0.0", debug=True)
