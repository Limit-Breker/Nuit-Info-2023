from flask import Blueprint, render_template,url_for,redirect

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

@jeux.route("/truth-game/<id>", methods=['GET', 'POST'])
def truth_game_id(id):
    
    return render_template("jeux/truth-game.html",id=id)

@jeux.route("/truth-game")
def truth_game():
    return redirect(url_for("jeux.truth_game_id",id=1))

@jeux.route("/quizz", methods=['GET', 'POST'])
@theme_required
def quizz():
    return render_template("jeux/quizz.html")


@jeux.route("/memory", methods=['GET', 'POST'])
@theme_required
def memory():
    return render_template("jeux/memory.html")

@jeux.route("/solution", methods=['GET', 'POST'])
@theme_required
def solution():
    return render_template("jeux/solution.html")




