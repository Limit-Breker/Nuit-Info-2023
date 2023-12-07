import os

import logging

logging.basicConfig(level=logging.ERROR,
                    filename='app.log',
                    filemode='a',
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')


class DevConfig:
    SECRET_KEY = os.urandom(32)
    ENVIRONMENT = "development"
    FLASK_APP = "Base"
    DEBUG = True
    SESSION_PERMANENT = False
    SESSION_TYPE = "filesystem"
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    SECURITY_PASSWORD_SALT = os.urandom(32)
    SQLALCHEMY_TRACK_MODIFICATIONS = True
