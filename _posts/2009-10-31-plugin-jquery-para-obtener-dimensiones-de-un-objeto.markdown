--- 
layout: post
title: Plugin jQuery para obtener dimensiones de un objeto
category: Development
tags: [javascript, jquery, plugins]
---
Hola!

Hace mucho que no escribo por aquí, no dispongo de demasiado tiempo... Como podéis ver, cuando saco unos minutos voy haciendo pruebas de diseño con el blog. Tengo intención de pasarlo a HTML5, usar CSS3 al máximo e intentar usar el menor número de imágenes posibles, a ver si lo consigo :D Bueno, al grano.

Trabajando en un proyecto me surgió la necesidad una vez de conocer las dimensiones (alto y ancho) de unos objetos ocultos que luego estaba agregando a otros elementos del DOM de mi página. El problema es que por diversas razones, necesitaba conocer su tamaño antes de agregarlos al objeto DOM, y jQuery, aunque cuenta con unos maravillosos métodos para obtener el tamaño de cualquier objeto (tanto tamaño exterior, contando el ancho de los bordes y demás, como el tamaño interior del objeto, sin bordes ni nada). El problema, es que si el objeto está oculto (display: none), jQuery no puede calcular el tamaño y te devolverá cero. 

Hay una solución muy sencilla para esto. Agregas el objeto con el tamaño a calcular a una capa que tendremos posicionada en modo "absolute" y fuera de la vista del usuario (fuera del viewport del navegador), dándole una posición "left: -1000px" (por ejemplo). Así, el objeto no es necesario que esté oculto, jQuery podrá calcular sus dimensiones y no lo tendrás dentro del flujo de la página, por lo que no te descolocará nada.

Aquí os dejo el código del plugin, tal y como lo vengo usando en mi proyecto. Espero que os sea útil!

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
