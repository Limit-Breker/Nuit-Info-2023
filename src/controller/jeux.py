from custom_paquets.decorateur import theme_required
from flask import Blueprint, render_template

jeux = Blueprint("jeux", __name__, url_prefix = "/jeux")
"""
Possibilité d'ajouter un prefix à l'url :

communs = Blueprint("communs", __name__, url_prefix="/communs")

De cette manière toutes les urls associées a ce controller commenceront par /communs/...
"""


@jeux.route("/", methods = ["GET"])
@theme_required
def index():
    return render_template("jeux/index.html")


@jeux.route("/earth-survival", methods = ["GET"])
@theme_required
def earth_survival():
    return render_template("jeux/earth-survival.html", pp = "oui")


@jeux.route("/truth-game/", methods = ["GET"])
@theme_required
def truth_game_id():
    return render_template("jeux/truth-game.html")


@jeux.route("/quizz", methods = ["GET"])
@theme_required
def quizz():
    return render_template("jeux/quizz.html")


@jeux.route("/memory", methods = ["GET"])
@theme_required
def memory():
    return render_template("jeux/memory.html")
