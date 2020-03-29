#
#--------------------------------------------------------------------------
#   Configs
#--------------------------------------------------------------------------
#

import os

## Configs

SECRET_KEY = 'edglobo1'
MYSQL_HOST = "localhost"
MYSQL_USER = "root"
MYSQL_PASSWORD = "root"
MYSQL_DB = "ambiente"
MYSQL_PORT = 3306
UPLOAD_PATH = os.path.dirname(os.path.abspath(__file__)) + '/uploads'