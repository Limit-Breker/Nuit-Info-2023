import json
import os
from flask import Flask, url_for, render_template
from werkzeug.exceptions import HTTPException

from controller.jeux import jeux
from controller.communs import communs
from custom_paquets.gestions_erreur import logging_erreur

app = Flask(__name__, template_folder="view")
app.config.from_object("config.DevConfig")
app.register_blueprint(communs)
app.register_blueprint(jeux)

try:
    open('app.log', 'w').close()
except:
    pass

"""
ERROR HANDLER
"""


# Gestion personnalisée des erreurs
# 500 est l'erreur par défaut s'il n'y a pas de code disponible
@app.errorhandler(Exception)
def handle_error(e):
    description_plus = logging_erreur(e)
    code = 500
    description = "Quelque chose s'est mal passé"
    if isinstance(e, HTTPException):
        code = e.code
        try:
            with open('static/error.json') as json_file:
                errors = json.load(json_file)
                description = errors[f"{code}"]["description"]
        except:
            pass
    if code == 404:
        return render_template("jeux/tetris.html", titre='erreur', erreur=f"Erreur {code}",
                               description=description, description_plus=description_plus), code
    else:
        return render_template("common/erreur.html", titre='erreur', erreur=f"Erreur {code}",
                               description=description, description_plus=description_plus), code


@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)


def dated_url_for(endpoint, **values):
    if endpoint == "static":
        filename = values.get("filename", None)
        if filename:
            file_path = os.path.join(app.root_path, endpoint, filename)
            values["q"] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)


if __name__ == "__main__":
    app.run()
