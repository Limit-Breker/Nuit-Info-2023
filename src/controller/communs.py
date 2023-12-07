from flask import Blueprint, render_template

communs = Blueprint("communs", __name__)
'''
Possibilité d'ajouter un prefix à l'url :

communs = Blueprint("communs", __name__, url_prefix="/communs")

De cette manière toutes les urls associées a ce controller commenceront par /communs/...
'''


@communs.route("/", methods=['GET', 'POST'])
def index():
    return render_template("communs/index.html")


@communs.route("/stats", methods=['GET', 'POST'])
def stats():
    return render_template("communs/stats.html")


@communs.route("/prejuges", methods=['GET', 'POST'])
def prejuges():
    return render_template("communs/prejuges.html")
