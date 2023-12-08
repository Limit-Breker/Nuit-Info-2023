from functools import wraps

from flask import session, redirect, url_for


def theme_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if not session.get("theme"):
            return redirect(url_for("communs.default_session"))
        return func(*args, **kwargs)
    return decorated_function

