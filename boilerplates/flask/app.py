#
#--------------------------------------------------------------------------
#   Index - Server
#--------------------------------------------------------------------------
#

from flask import Flask
from flask_mysqldb import MySQL

# starting app

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = MySQL(app)

# Import Views and Running Server

from views import *

if __name__ == '__main__':
    app.run(debug=True)
