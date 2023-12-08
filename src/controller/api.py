import json

from flask import Blueprint, request, session, jsonify

api = Blueprint("api", __name__, url_prefix="/api")
"""
Possibilité d'ajouter un prefix à l'url :

communs = Blueprint("communs", __name__, url_prefix="/communs")

De cette manière toutes les urls associées a ce controller commenceront par /communs/...
"""


@api.route("/truth-game/<question_id>", methods=["GET", "POST"])
def truth_game_question(question_id):
    if request.method == "POST":
        ...
    try:
        with open("./src/static/data/truth-game.json", "r", encoding="utf8") as f:
            truth_game_data = json.load(f)
    except:
        with open("./static/data/truth-game.json", "r", encoding="utf8") as f:
            truth_game_data = json.load(f)
    if question_id in truth_game_data:
        return truth_game_data[question_id]
    return f"Chien des bois {question_id}"


@api.route("/changer_theme/<nouveau_theme>", methods=["GET", "POST"])
def changer_theme(nouveau_theme):
    try:
        session["theme"] = nouveau_theme
        return {"valide": True}
    except:
        return {"valide": False}


@api.route("/get-earth-survival", methods=["GET", "POST"])
def get_earth_survival():
    with open('static/json/questions-earth-survival.json') as file:
        data = file.read()
    return data
