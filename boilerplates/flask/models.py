#
#--------------------------------------------------------------------------
#   Models
#--------------------------------------------------------------------------
#

## Class Post

class Post:
    def __init__(self, title, category, description, id=None):
        self.id = id
        self.title = title
        self.category = category
        self.description = description

## Class User

class User:
    def __init__(self, id, name, password):
        self.id = id
        self.name = name
        self.password = password