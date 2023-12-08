from custom_paquets.decorateur import theme_required
from flask import Blueprint, render_template, redirect, url_for, session

communs = Blueprint("communs", __name__)
"""
Possibilité d'ajouter un prefix à l'url :

communs = Blueprint("communs", __name__, url_prefix="/communs")

De cette manière toutes les urls associées a ce controller commenceront par /communs/...
"""


@communs.route("/", methods = ["GET"])
@theme_required
def index():
    return render_template("communs/index.html")


@communs.route("/stats", methods = ["GET"])
@theme_required
def stats():
    return render_template("communs/stats.html")


@communs.route("/sources", methods = ["GET"])
@theme_required
def sources():
    return render_template("communs/sources.html")


@communs.route("/default-session", methods = ["GET"])
def default_session():
    session["theme"] = "normal"
    return redirect(url_for("communs.index"))


@communs.route("/solution", methods = ["GET"])
@theme_required
def solution():
    return render_template("communs/solution.html", pp = "oui")
