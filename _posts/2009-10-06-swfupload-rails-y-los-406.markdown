--- 
layout: post
title: SWFUpload, Rails y los 406
tags: [rails, ruby, flash, swfupload]
---
En una aplicación que tenía funcionando en Snow Leopard con SWFUpload para subir imágenes al servidor, y RoR en el lado del servidor, me estaba dando problemas al realizar los uploads desde Internet Explorer 8. En concreto, el servidor me devolvía un error 406 tras haber guardado la imagen y justo antes de realizar la respuesta al navegador(en formato json). El error 406 se produce cuando desde el servidor se está respondiendo a una solicitud con un tipo MIME que no está soportado dentro de la cabecera ACCEPT que envió el navegador. El servidor no sabe qué hacer con la solicitud, y lanza ese error.

Bien, pues se produce en concreto con IE8 en Windows XP porque SWFUpload envía como único tipo MIME en su cabecera ACCEPT el tipo "text/*". Imagino que es un problema con el plugin de Flash de Windows (Flash 10 estaba usando), y que si lo pruebo con otro navegador en Windows sucederá lo mismo, no lo he probado.

Para solucionarlo, en primer lugar deberemos añadir un nuevo tipo MIME al environment.rb de nuestro proyecto:

{% highlight ruby %}
Mime::Type.register "text/*", :all_text
{% endhighlight %}

Luego, en la acción en la que estemos guardando la imagen, tenemos que añadir un nuevo manejador de este tipo de peticiones:

{% highlight ruby %}
respond_to do |format|
	format.all_text{ render :text => text_to_render }
end
{% endhighlight %}

Y eso es todo, con esto Internet Explorer 8 debería estar recibiendo el resultado de la subida de una imagen con SWFUpload.
