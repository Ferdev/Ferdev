--- 
wordpress_id: 25
layout: post
title: SWFUpload, Rails y los 406
wordpress_url: http://www.ferdev.com/2009/10/06/swfupload-rails-y-los-406/
---
En una aplicaci�n que ten�a funcionando en Snow Leopard con SWFUpload para subir im�genes al servidor, y RoR en el lado del servidor, me estaba dando problemas al realizar los uploads desde Internet Explorer 8. En concreto, el servidor me devolv�a un error 406 tras haber guardado la imagen y justo antes de realizar la respuesta al navegador(en formato json). El error 406 se produce cuando desde el servidor se est� respondiendo a una solicitud con un tipo MIME que no est� soportado dentro de la cabecera ACCEPT que envi� el navegador. El servidor no sabe qu� hacer con la solicitud, y lanza ese error.

Bien, pues se produce en concreto con IE8 en Windows XP porque SWFUpload env�a como �nico tipo MIME en su cabecera ACCEPT el tipo "text/*". Imagino que es un problema con el plugin de Flash de Windows (Flash 10 estaba usando), y que si lo pruebo con otro navegador en Windows suceder� lo mismo, no lo he probado.

Para solucionarlo, en primer lugar deberemos a�adir un nuevo tipo MIME al environment.rb de nuestro proyecto:

	Mime::Type.register "text/*", :all_text

Luego, en la acci�n en la que estemos guardando la imagen, tenemos que a�adir un nuevo manejador de este tipo de peticiones:

	respond_to do |format|
		format.all_text{ render :text =&gt; text_to_render }
	end

Y eso es todo, con esto Internet Explorer 8 deber�a estar recibiendo el resultado de la subida de una imagen con SWFUpload.
