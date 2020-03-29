#
#--------------------------------------------------------------------------
#   Views/Routes
#--------------------------------------------------------------------------
#

import time
from flask import render_template, request, redirect, url_for, flash, send_from_directory, session
from app import app, db
from dao import PostDao, UserDao
from models import Post
from helpers import get_image, delete_image

#
#--------------------------------------------------------------------------
#   Views/Routes Post
#--------------------------------------------------------------------------
#

post_dao = PostDao(db)

### Render Index

@app.route('/')
def renderIndex():
    list_post = post_dao.list()
    return render_template('index.html', title="Index", posts=list_post)

### Render Register Post Page

@app.route('/admin/add')
def renderAdmin():
    if 'logged_user' not in session or session['logged_user'] == None:
        return redirect(url_for('renderLogin', next=url_for('renderAdmin')))
    return render_template('register.html', title="Add")

### Render Update Post Page

@app.route('/admin/update/<int:id>')
def renderUpdate(id):
    if 'logged_user' not in session or session['logged_user'] == None:
        return redirect(url_for('renderLogin', next=url_for('renderAdmin')))
    post = post_dao.getPostById(id)
    image_name = get_image(id)
    return render_template('update.html', title="Edit" , post=post, image=image_name or 'imagem_padrao.jpg')

### Render Single Post Page

@app.route('/post/<int:id>')
def renderPost(id):
    post = post_dao.getPostById(id)
    image_name = get_image(id)
    return render_template('single.html', title="Single" , post=post, image=image_name or 'imagem_padrao.jpg')

### Get Image Post

@app.route('/uploads/<file_name>')
def getImage(file_name): 
    return send_from_directory('uploads', file_name)

### Save Post

@app.route('/posts', methods=['POST',])
def save():
    title = request.form['title']
    category = request.form['category']
    description = request.form['description']

    post = Post(title, category, description)
    post = post_dao.save(post)

    image = request.files['image']
    upload_path = app.config['UPLOAD_PATH']
    timestamp = time.time()
    image.save('{}/imagem{}-{}.jpg'.format(upload_path, post.id, timestamp))

    return redirect(url_for('renderIndex'))

### Update Post

@app.route('/update', methods=['POST',])
def updatePost():
    title = request.form['title']
    category = request.form['category']
    description = request.form['description']
    post = Post(title, category, description, id=request.form['id'])

    image = request.files['image']
    upload_path = app.config['UPLOAD_PATH']
    timestamp = time.time()
    delete_image(post.id)
    image.save('{}/imagem{}-{}.jpg'.format(upload_path, post.id, timestamp))
    post_dao.save(post) 
    return redirect(url_for('renderPost', id=post.id))

### Delete Post

@app.route('/delete/<int:id>')
def delete(id):
    post_dao.delete(id)
    flash('O post foi removido com sucesso!')
    return redirect(url_for('renderIndex'))

#
#--------------------------------------------------------------------------
#   Views/Routes Login
#--------------------------------------------------------------------------
#

user_dao = UserDao(db)

### Render Login Page

@app.route('/login')
def renderLogin():
    next_page = request.args.get('next')
    return render_template('login.html', title="Login", next=next_page)

@app.route('/autenticate', methods=['POST', ])
def autenticate():
    username = request.form['username']
    password = request.form['password']
    user = user_dao.getUserById(username)
    if user:
        if user.password == password:
            session['logged_user'] = user.id
            flash(user.name + ' logou com sucesso!')
            next_page = request.form['next']
            return redirect(next_page) 
    else:
        flash('Nao logado, tente denovo!')
        return redirect(url_for('renderLogin'))

@app.route('/logout')
def logout():
    session['logged_user'] = None
    flash('Nenhum usuario logado!')
    return redirect(url_for('renderIndex'))