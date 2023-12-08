from flask import Blueprint, render_template

from custom_paquets.decorateur import theme_required

jeux = Blueprint("jeux", __name__, url_prefix="/jeux")
'''
Possibilité d'ajouter un prefix à l'url :

communs = Blueprint("communs", __name__, url_prefix="/communs")

De cette manière toutes les urls associées a ce controller commenceront par /communs/...
'''


@jeux.route("/", methods=['GET', 'POST'])
@theme_required
def index():
    return render_template("jeux/index.html")


@jeux.route("/earth-survival", methods=['GET', 'POST'])
@theme_required
def earth_survival():
    return render_template("jeux/earth-survival.html")


@jeux.route("/quizz", methods=['GET', 'POST'])
@theme_required
def quizz():
    return render_template("jeux/quizz.html")


@jeux.route("/memory", methods=['GET', 'POST'])
@theme_required
def memory():
    return render_template("jeux/memory.html")




