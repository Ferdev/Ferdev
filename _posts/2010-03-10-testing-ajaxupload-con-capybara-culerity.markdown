--- 
layout: post
title: Testing AjaxUpload con Capybara + Culerity
category: Testing
tags: [rails, ruby on rails, ruby, capybara, culerity, testing, ajaxupload]
---
Llevo unos días probando [Capybara][] después de los comentarios tan buenos que había escuchado de él en [twitter][] últimamente, especialmente de su integración con [Culerity][]. Los hados además trataban de decirme algo porque la última [charla][] de [madridrb][] que dio [@porras][] versaba sobre esto mismo (y [Steak][], que también estoy probando y me está gustando mucho). Por cierto que debería haber ido a la charla (pero no pude :-() porque seguro que me hubiese ahorrado muchos de los problemas que me encontré.

Los primeros vinieron con la instalación. Culerity es un recubrimiento (que poco me gusta esta palabra) de [Celerity][], que a su vez es otro recubrimiento de [HtmlUnit][], un navegador web sin interfaz gráfico programado en Java. Y debido a esto, necesitas Jruby para instalar la gema de Celerity. Pues bien, rvm y todo este tinglado no se llevan demasiado bien. Y aunque hay un [hack][] para salir al paso, a mi no me valía del todo (a parte que no me gustaba mucho que digamos) porque yo no estaba usando Cucumber sino Steak (requisito para que funcione el Hack). Al final conseguí hacerlo funcionar instalando Jruby mediante Macports. No sé si me dará problemas en el futuro, pero hasta que Culerity y rvm se lleven mejor, me gusta más esta solución que andar cambiando variables de entorno en cada test.

La aplicación con la que estaba haciendo las pruebas tiene una carga de javascript muy alta, y los primeros problemas que me dieron los tests lo achacaba a esto. "Demasiado javascript", pensaba para mis adentros cuando al testear una petición ajax me daba un error con la respuesta en formato JSON. Dándole vueltas y más vueltas, a punto de desinstalarlo todo porque no conseguía solucionarlo, di con la solución no recuerdo muy bien dónde: la última versión de Celerity (0.7.9) usaba una versión de HtmlUnit con algunos bugs, y recomendaban instalar la versión **0.7.4**. Pues mano de santo oiga :-)

Y llegamos al quid de la cuestión: probar [AjaxUpload][] con Capybara + Culerity. Me ha costado un par de días hacerlo funcionar, y en realidad ha sido una tontería. No hacía falta más que detenerse un poco a pensar como funciona AjaxUpload por dentro.

AjaxUpload es un hack para simular una subida asíncrona de un archivo al servidor de nuestra página web. Para ello, se vale de los siguientes pasos:

1.	Se asocia al elemento de la página web que tú hayas definido (un enlace o un botón, por ejemplo).
2.	Cuando se dispara el evento "mouseover" sobre ese elemento, crea un div transparente de las mismas dimensiones que el elemento y lo sitúa por encima de él. Cuando el usuario intente pulsar el elemento, será este div en realidad el que se vea pulsado.
3.	Cuando el usuario hace click en el div, se genera el elemento input file y se abre el diálogo de selección de archivo.
4.	En cuanto el usuario selecciona el fichero, AjaxUpload crea un formulario, le agrega el input file del paso anterior, y crea un iframe. Este iframe, será el "target" del formulario recien creado.
5.	AjaxUpload envía el formulario (que hará la subida del fichero a través del iframe) y fin del proceso.
	
Mi problema venía con el diálogo de selección. No veía cómo conseguir seleccionar el archivo y pulsar el botón "Aceptar" del diálogo de selección. Sabía que la clase *Celerity::FileField* contaba con el método *Set*, con el que podía pasarle la ruta de un archivo... Pero no sé por qué me dio por pensar que si el diálogo estaba abierto, no funcionaría. Hasta que lo probé, y me di cuenta que Celerity establece la ruta del archivo y cierra la ventana de diálogo él solito. Así que, problema resuelto.

Aquí va un pequeño trozo de código de como quedaría montado. He sacado los selectores principales a variables para que se entienda mejor. Ah! También decir que yo tengo configurado Capybara para que por defecto use selectores css :-)


	# selector del botón asociado a AjaxUpload
	button_selector = 'button#upload'
	# selector del div que contendrá al input file. Se posicionará justo encima de button_selector
	div_selector = 'div.ajaxupload_container'
	# selector del input file
	input_selector = 'div.ajaxupload_container input.ajaxupload'
	# ruta al archivo a subir
	file_path = 'image.jpg'
	
	# Simulamos el evento 'mouseover' sobre el botón original asociado a AjaxUpload
	find(button_selector).trigger(:mouseover)
	
	# Comprobamos que se haya creado el div de AjaxUpload
	page.should have_css(div_selector)
	
	# Hacemos click en el div para disparar la creación del input file
	find(div_selector).click
	
	# El input file debería haberse creado
	page.should have_css(input_selector)
	
	# Le pasamos la ruta de archivo al input file
	find(input_selector).set(file_path)

Y ya está! Una aclaración: he modificado AjaxUpload para que asigne una clase al div y al input file que crea y sea más sencillo seleccionarlos, ya que por defecto no les asigna identificador ni clases de ningún tipo.	

[capybara]: http://github.com/jnicklas/capybara
[twitter]: http://twitter.com/albertoperdomo/status/9643469318
[culerity]: http://github.com/langalex/culerity
[charla]: http://github.com/porras/madrid-rb-feb-2010
[madridrb]: http://twitter.com/madridrb
[@porras]: http://twitter.com/porras
[steak]: http://github.com/cavalle/steak
[celerity]: http://github.com/jarib/celerity
[htmlunit]: http://htmlunit.sourceforge.net/
[hack]: http://rvm.beginrescueend.com/integration/culerty/
[ajaxupload]: http://valums.com/ajax-upload/
