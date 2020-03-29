#
#--------------------------------------------------------------------------
#   Models
#--------------------------------------------------------------------------
#

import os
from app import app

def get_image(id):
    for image_name in os.listdir(app.config['UPLOAD_PATH']):
        if 'imagem{}'.format(id) in image_name:
            return image_name 

def delete_image(id):
    image = get_image(id)
    os.remove(os.path.join(app.config['UPLOAD_PATH'], image))