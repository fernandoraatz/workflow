#
#--------------------------------------------------------------------------
#   BeautifulSoup e Request
#--------------------------------------------------------------------------
#

# Importando as libraries

import requests
from bs4 import BeautifulSoup

# Page request and setting into BeautifulSoup:

page = requests.get('http://revistagalileu.globo.com/Ciencia/noticia/2017/12/8-documentarios-para-quem-curte-dinossauros.html')
soup = BeautifulSoup(page.content, 'html.parser')

# Get the title tag and your text

titulo = soup.find(class_='titulo-materia')
titulo = titulo.get_text()

# Getting categories tags and your text

tags = soup.select(".box-tags .tags")
categoria = [ item.get_text() for item in tags]

# Show the title:

print "O titulo da materia e: %s" %(titulo)

# Show Categories:

print "As tags da materia sao:"
for item in categoria:
    print (item)
