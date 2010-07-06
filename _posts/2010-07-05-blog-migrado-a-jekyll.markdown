--- 
layout: post
title: Blog migrado a Jekyll
tags: [blog, jekyll]
---
La semana pasada me lié la manta a la cabeza y me puse a migrar todo el blog de Wordpress a [Jekyll][1]. Los motivos que me han llevado a moverlo a Jekyll son dos: velocidad y sencillez. Jekyll es un generador de sitios web estáticos programado en ruby. Jekyll genera a partir de plantillas y ficheros [markdown][2] o [textile][3], ficheros html y xml (entre otras cosas). Al ser contenido estático, pierdes algunas cosas como el sistema de comentarios. Pero con [Disqus][4] o [IntenseDebate][5] queda solucionado el problema.

De paso he aprovechado para hacer un pequeño rediseño, y ahora tengo todo el contenido de la web en el mismo html, y mediante un pequeño javascript se realiza el scroll entre las diferentes secciones. Simplemente obtiene el atributo 'href' del enlace, obtiene el elemento al que referencia y su offset vertical, y anima el desplazamiento del cursor principal hasta esa posición. Además degrada bien si el usuario no tiene el javascript activado.

{% highlight javascript %}
$('#menu li a').live('click', function(evt){
  evt.preventDefault();
  var 
    destination_id = $(this).attr('href'),
    scrollTo       = $(destination_id).offset().top;
  $('html,body').animate({scrollTop: scrollTo}, 2000, 'easeInOutExpo');
});
{% endhighlight %}

He publicado el código fuente del blog por si queréis echarle un vistazo (aunque no tiene gran cosa que ver). Todavía no está terminado, faltan algunas cosas como la paginación de posts y algunos retoques más, pero como ya es funcional me he decidido a publicarlo.

[1]: http://jekyllrb.com/ "transform your texto into a monster"
[2]: http://daringfireball.net/projects/markdown/ "Markdown"
[3]: http://textile.thresholdstate.com/ "Textile"
[4]: http://disqus.com/ "Disqus"
[5]: http://intensedebate.com/ "Intense Debate"