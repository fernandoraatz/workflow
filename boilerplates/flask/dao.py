#
#--------------------------------------------------------------------------
#   DAO - Data Acesss Object
#--------------------------------------------------------------------------
#

from models import Post, User

#
#--------------------------------------------------------------------------
#   Post DAO
#--------------------------------------------------------------------------
#

### Queries

SQL_GET_POSTS = 'SELECT id, title, category, description FROM post'
SQL_SAVE_POST = 'INSERT INTO post (title, category, description) values (%s, %s, %s)'
SQL_GET_POST_ID = 'SELECT id, title, category, description FROM post WHERE id = %s'
SQL_UPDATE_POST = 'UPDATE post SET title=%s, category=%s, description=%s WHERE id = %s'
SQL_DELETE_POST = 'DELETE FROM post where id = %s'

class PostDao:
    def __init__(self,db):
        self.__db = db

    def list(self):
        cursor = self.__db.connection.cursor()
        cursor.execute(SQL_GET_POSTS)
        posts = translate_posts(cursor.fetchall())
        return posts
    
    def save(self,post):
        cursor = self.__db.connection.cursor()
        if (post.id):
            cursor.execute(SQL_UPDATE_POST, (post.title, post.category, post.description, post.id))
        else:
            cursor.execute(SQL_SAVE_POST, (post.title, post.category, post.description))
            post.id = cursor.lastrowid
        self.__db.connection.commit()
        return post
    
    def getPostById(self, id):
        cursor = self.__db.connection.cursor()
        cursor.execute(SQL_GET_POST_ID, (id,))
        item = cursor.fetchone()
        return Post(item[1], item[2], item[3], id=item[0])
    
    def delete(self, id):
        self.__db.connection.cursor().execute(SQL_DELETE_POST, (id, ))
        self.__db.connection.commit()


### Helpers

def translate_posts(posts):
    def create_post_tuple(tuple):
        return Post(tuple[1], tuple[2], tuple[3], id=tuple[0])
    return list(map(create_post_tuple, posts))

#
#--------------------------------------------------------------------------
#   Post DAO
#--------------------------------------------------------------------------
#

### Queries  

SQL_GET_USER_ID = 'SELECT id, name, password FROM user where id = %s'

### UserDao

class UserDao:
    def __init__(self, db):
        self.__db = db

    def getUserById(self, id):
        cursor = self.__db.connection.cursor()
        cursor.execute(SQL_GET_USER_ID, (id,))
        user_data = cursor.fetchone()
        user = translate_user(user_data) if user_data else None
        return user

def translate_user(tuple):
    return User(tuple[0], tuple[1], tuple[2])