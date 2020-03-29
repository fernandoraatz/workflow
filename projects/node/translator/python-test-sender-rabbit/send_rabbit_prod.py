import pika
import json

def sender_rabbitmq(user,password):

    article = {"body": "<p>\r\n\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus maximus ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean id lectus lectus. Nullam volutpat lacus vitae vestibulum egestas. Donec in lobortis mauris, sit amet dictum dui. Donec congue nisl non consequat condimentum. Nam quis ullamcorper leo. Phasellus egestas consequat lorem, non lobortis leo cursus nec.</p>\r\n<div class=\"saibamais componente_materia\">\r\n\t<strong>saiba mais</strong>\r\n\t<ul>\r\n\t\t<li>\r\n\t\t\t<a href=\"http://globo.com\">NOVO FORD FOCUS: O QUE VOC&Ecirc; PRECISA SABER SOBRE A NOVA GERA&Ccedil;&Atilde;O DO MODELO</a></li>\r\n\t\t<li>\r\n\t\t\t<a href=\"http://globo.com\">FORD RANGER XL RETORNAR&Aacute; COM OP&Ccedil;&Atilde;O DE CABINE SIMPLES</a></li>\r\n\t</ul>\r\n</div>\r\n<p>\r\n\t&nbsp;</p>\r\n<p>\r\n\tUt nulla felis, ultrices id placerat in, bibendum vel eros. Proin sagittis risus a mi tristique imperdiet. Proin eget metus neque. Ut vestibulum diam eu justo laoreet, tristique bibendum turpis tincidunt. Aliquam sagittis, leo eu rutrum gravida, velit leo luctus tortor, ac convallis tortor mi in libero. Nulla in interdum augue. Etiam posuere mi lorem, vel ultricies nibh vulputate vel. Pellentesque ut dui sed eros lobortis gravida. Vestibulum porttitor lorem quis augue tempus, eget luctus erat imperdiet. Nam accumsan efficitur arcu at finibus.</p>\r\n<p>\r\n\tDuis consequat mi iaculis elit tincidunt, a placerat erat eleifend. Sed ligula odio, rhoncus eu justo a, viverra cursus tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse tempor risus risus. Mauris quis lacinia mauris. Nulla eget efficitur lectus. Quisque lobortis magna quam, ut ullamcorper nisl scelerisque bibendum. Aliquam varius turpis semper lorem hendrerit, vel euismod est semper. Duis tincidunt diam turpis, ut dapibus urna sollicitudin id. Phasellus purus ligula, fermentum sit amet feugiat eget, finibus sed elit. Ut ullamcorper nulla non urna tempor congue.</p>\r\n<div class=\"saibamais componente_materia expandido\">\r\n\t<strong>saiba mais</strong>\r\n\t<ul>\r\n\t\t<li>\r\n\t\t\t<a href=\"http://globo.com\">Materia 3 - Auto Esporte</a></li>\r\n\t\t<li>\r\n\t\t\t<a href=\"http://globo.com\">Materia 4 - Auto Esporte</a></li>\r\n\t</ul>\r\n</div>\r\n<p>\r\n\t&nbsp;</p>\r\n<p>\r\n\t&nbsp;</p>\r\n", "publications": [{"sections": [{"name": "auto-esporte"}, {"name": "Analises"}], "public_url": "https://revistaautoesporte.qa01.globoi.com/noticia/2018/04/leia-mais-auto-esporte.html", "destination": "site", "private_url": "http://edg2.admin.qa01.globoi.com/admin/materia/json_sended/1454958/", "name": "auto-esporte"}, {"destination": "printed", "name": "Espero ou compro j\u00e1?", "number": 624}, {"destination": "globo-mais", "sections": [{"name": "columnist-experiencias-digitais"}, {"name": "theme-saude"}], "name": "brand-auto-esporte"}], "authors": ["Cristiana Baptista"], "uid": "auto-esporte-article-1454958", "metadata": {"access": "public", "subtitle": "\"N\u00e3o h\u00e1 ningu\u00e9m que ame a dor por si s\u00f3, que a busque e queira t\u00ea-la, simplesmente por ser dor...\"", "title": "Leia mais - Auto esporte", "changed_in": "2018-04-27T10:42:16-03:06", "published_in": "2018-04-27T10:42:16-03:06", "keywords": ["article"]}}

    json_translated = json.dumps(article)

    connection = pika.BlockingConnection(pika.ConnectionParameters(host='10.129.32.36', virtual_host='contenthub',credentials=pika.PlainCredentials(username=user,password=password)))

    channel = connection.channel()

    channel.exchange_declare(exchange='leibniz_xc_translate',
                           exchange_type='direct',
                           durable='true')

    channel.basic_publish(exchange='leibniz_xc_translate',
                       routing_key='INDEX',
                       body=json_translated,
                       properties=pika.BasicProperties(delivery_mode = 2)
                       )

    connection.close()

print('sending edg2 usr')
sender_rabbitmq('usr_edg2_prd', 'w132UdeRfkbi21')
print('sending edg3 usr')
sender_rabbitmq('usr_edg3_prd', 'rRUgUdeRfkbi3n')
print('sending edg4 usr')
sender_rabbitmq('usr_edg4_prd', 'gXU7Jxn7z4N3Uy')