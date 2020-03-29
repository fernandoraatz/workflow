#
#--------------------------------------------------------------------------
#   Migrate
#--------------------------------------------------------------------------
#

import MySQLdb

def createConnection():
    conn = MySQLdb.connect(user='root', passwd='root', host='localhost', port=3306)
    print("[v] Successfully connected with MySQL")
    return conn

def createTable(conn):
    cursor = conn.cursor()
    create_tables = '''SET NAMES utf8;
        CREATE DATABASE `ambiente` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
        USE `ambiente`;
        CREATE TABLE `post` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(50) COLLATE utf8_bin NOT NULL,
        `category` varchar(40) COLLATE utf8_bin NOT NULL,
        `description` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
        CREATE TABLE `user` (
        `id` varchar(8) COLLATE utf8_bin NOT NULL,
        `name` varchar(20) COLLATE utf8_bin NOT NULL,
        `password` varchar(8) COLLATE utf8_bin NOT NULL,
        PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;'''

    cursor.execute(create_tables)
    print("[v] Successfully created database")
    cursor.close()

def deleteDatabase(conn):
    cursor = conn.cursor()
    delete_database = '''DROP DATABASE `ambiente`;'''
    cursor.execute(delete_database)
    print("[v] Successfully deleted database")

def createPosts(conn):
    cursor = conn.cursor()
    query = 'INSERT INTO ambiente.post (title, category, description) VALUES (%s, %s, %s)'
    values = [
            ('lorem ipsum', 'Epoca', 'lorem ipsum...'),
            ('lorem ipsum', 'Epoca Negocios', 'lorem ipsum...'),
            ('lorem ipsum', 'Auto Esporte', 'lorem ipsum...')
        ]

    cursor.executemany(query,values)
    print("[v] Successfully created posts")
    cursor.close()

def createUsers(conn):
    cursor = conn.cursor()
    query = 'INSERT INTO ambiente.user (id, name, password) VALUES (%s, %s, %s)'
    values = [
            ('raatz', 'Fernando Raatz', 'admin'),
    ]

    cursor.executemany(query,values)
    print("[v] Successfully created users")
    cursor.close()

def selectPosts(conn):
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ambiente.post')
    print("[v] Successfully listed posts")
    print(' -------------  Posts:  -------------')
    for post in cursor.fetchall():
        print(post[2])

def execute():
    conn = createConnection()
    deleteDatabase(conn)
    createTable(conn)
    #createPosts(conn)
    #selectPosts(conn)
    #createUsers(conn)
    conn.commit()

execute()
