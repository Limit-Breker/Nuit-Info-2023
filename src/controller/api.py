import json

from flask import Blueprint, request

api = Blueprint("api", __name__, url_prefix = "/api")
"""
Possibilité d'ajouter un prefix à l'url :

communs = Blueprint("communs", __name__, url_prefix="/communs")

De cette manière toutes les urls associées a ce controller commenceront par /communs/...
"""

with open("./src/static/data/truth-game.json", "r", encoding = "utf8") as f:
    truth_game_data = json.load(f)


@api.route("/truth-game/<question_id>", methods = ["GET", "POST"])
def truth_game_question(question_id):
    if request.method == "POST":
        ...
    if question_id in truth_game_data:
        return truth_game_data[question_id]
    return f"Chien des bois {question_id}"
