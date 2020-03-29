#-*- coding:utf-8 -*-
import os
import requests
from bs4 import BeautifulSoup
import wget

root_path = os.path.dirname(os.path.abspath('__file__'))


url_json = {
    "edg2" : [
            "https://epocanegocios.globo.com/noticia/plantao.html",
            "https://revistaautoesporte.globo.com/noticia/plantao.html",
            "https://revistapegn.globo.com/noticia/plantao.html",
            "https://epoca.globo.com/noticia/plantao.html",
            "https://revistagalileu.globo.com/noticia/plantao.html",
            "https://revistagloborural.globo.com/noticia/plantao.html"
            ],
    "edg3" : [
            "https://casavogue.globo.com/noticia/plantao.html",
            "https://revistaglamour.globo.com/noticia/plantao.html",
            "https://gq.globo.com/noticia/plantao.html",
            "https://vogue.globo.com/noticia/plantao.html",
            "https://revistamonet.globo.com/noticia/plantao.html"
            ],
    "edg4" : [
            "https://revistaquem.globo.com/noticia/plantao.html",
            "https://revistamarieclaire.globo.com/noticia/plantao.html",
            "https://revistacrescer.globo.com/noticia/plantao.html",
            "https://revistacasaejardim.globo.com/noticia/plantao.html"
            ]
}

def create_folder(path):
    dir = os.path.dirname(path)
    if not os.path.exists(dir):
        os.makedirs(dir)

def get_favicon_by_farm():
    for farm in url_json.keys():
        create_folder(root_path+'/'+farm +'/')
        os.chdir(root_path+'/'+farm)
        for url in url_json[farm]:
            try:
                ico = BeautifulSoup(requests.get(url).content, "lxml").find('meta', property="og:image").get('content')
                wget.download(ico)
            except:
                print(url)

get_favicon_by_farm()
