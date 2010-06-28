--- 
wordpress_id: 35
layout: post
title: Plugin jQuery para obtener dimensiones de un objeto
wordpress_url: http://www.ferdev.com/?p=35
---
Hola!

Hace mucho que no escribo por aqu�, no dispongo de demasiado tiempo... Como pod�is ver, cuando saco unos minutos voy haciendo pruebas de dise�o con el blog. Tengo intenci�n de pasarlo a HTML5, usar CSS3 al m�ximo e intentar usar el menor n�mero de im�genes posibles, a ver si lo consigo :D Bueno, al grano.

Trabajando en un proyecto me surgi� la necesidad una vez de conocer las dimensiones (alto y ancho) de unos objetos ocultos que luego estaba agregando a otros elementos del DOM de mi p�gina. El problema es que por diversas razones, necesitaba conocer su tama�o antes de agregarlos al objeto DOM, y jQuery, aunque cuenta con unos maravillosos m�todos para obtener el tama�o de cualquier objeto (tanto tama�o exterior, contando el ancho de los bordes y dem�s, como el tama�o interior del objeto, sin bordes ni nada). El problema, es que si el objeto est� oculto (display: none), jQuery no puede calcular el tama�o y te devolver� cero. 

Hay una soluci�n muy sencilla para esto. Agregas el objeto con el tama�o a calcular a una capa que tendremos posicionada en modo "absolute" y fuera de la vista del usuario (fuera del viewport del navegador), d�ndole una posici�n "left: -1000px" (por ejemplo). As�, el objeto no es necesario que est� oculto, jQuery podr� calcular sus dimensiones y no lo tendr�s dentro del flujo de la p�gina, por lo que no te descolocar� nada.

Aqu� os dejo el c�digo del plugin, tal y como lo vengo usando en mi proyecto. Espero que os sea �til!

    ;(function($){
    $.fn.objectSize = function(){
    
        function calculateSize(domNode){
            var divSizer = $(document.createElement("div"))
            .attr("id", "sizer")
            .css({           
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: '-10000px' 
            }).appendTo('body'),
            size = {width: 0, height: 0};
        
            divSizer.append(domNode);
            size.width = parseInt(domNode.outerWidth());
            size.height = parseInt(domNode.outerHeight());
            divSizer.remove();
            delete divSizer;
            return size;
        }
    
        return calculateSize($(this[0]));
    };
    })(jQuery);
