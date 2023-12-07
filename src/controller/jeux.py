from flask import Blueprint, render_template

jeux = Blueprint("jeux", __name__, url_prefix="/jeux")
'''
Possibilité d'ajouter un prefix à l'url :

communs = Blueprint("communs", __name__, url_prefix="/communs")

De cette manière toutes les urls associées a ce controller commenceront par /communs/...
'''


@jeux.route("/earth-survival", methods=['GET', 'POST'])
def earth_survival():
    return render_template("jeux/earth-survival.html")



