--- 
wordpress_id: 45
layout: post
title: Testing AjaxUpload con Capybara + Culerity
wordpress_url: http://www.ferdev.com/?p=45
---
Llevo unos d�as probando [Capybara][] despu�s de los comentarios tan buenos que hab�a escuchado de �l en [twitter][] �ltimamente, especialmente de su integraci�n con [Culerity][]. Los hados adem�s trataban de decirme algo porque la �ltima [charla][] de [madridrb][] que dio [@porras][] versaba sobre esto mismo (y [Steak][], que tambi�n estoy probando y me est� gustando mucho). Por cierto que deber�a haber ido a la charla (pero no pude :-() porque seguro que me hubiese ahorrado muchos de los problemas que me encontr�.

Los primeros vinieron con la instalaci�n. Culerity es un recubrimiento (que poco me gusta esta palabra) de [Celerity][], que a su vez es otro recubrimiento de [HtmlUnit][], un navegador web sin interfaz gr�fico programado en Java. Y debido a esto, necesitas Jruby para instalar la gema de Celerity. Pues bien, rvm y todo este tinglado no se llevan demasiado bien. Y aunque hay un [hack][] para salir al paso, a mi no me val�a del todo (a parte que no me gustaba mucho que digamos) porque yo no estaba usando Cucumber sino Steak (requisito para que funcione el Hack). Al final consegu� hacerlo funcionar instalando Jruby mediante Macports. No s� si me dar� problemas en el futuro, pero hasta que Culerity y rvm se lleven mejor, me gusta m�s esta soluci�n que andar cambiando variables de entorno en cada test.

La aplicaci�n con la que estaba haciendo las pruebas tiene una carga de javascript muy alta, y los primeros problemas que me dieron los tests lo achacaba a esto. "Demasiado javascript", pensaba para mis adentros cuando al testear una petici�n ajax me daba un error con la respuesta en formato JSON. D�ndole vueltas y m�s vueltas, a punto de desinstalarlo todo porque no consegu�a solucionarlo, di con la soluci�n no recuerdo muy bien d�nde: la �ltima versi�n de Celerity (0.7.9) usaba una versi�n de HtmlUnit con algunos bugs, y recomendaban instalar la versi�n **0.7.4**. Pues mano de santo oiga :-)

Y llegamos al quid de la cuesti�n: probar [AjaxUpload][] con Capybara + Culerity. Me ha costado un par de d�as hacerlo funcionar, y en realidad ha sido una tonter�a. No hac�a falta m�s que detenerse un poco a pensar como funciona AjaxUpload por dentro.

AjaxUpload es un hack para simular una subida as�ncrona de un archivo al servidor de nuestra p�gina web. Para ello, se vale de los siguientes pasos:

1.	Se asocia al elemento de la p�gina web que t� hayas definido (un enlace o un bot�n, por ejemplo).
2.	Cuando se dispara el evento "mouseover" sobre ese elemento, crea un div transparente de las mismas dimensiones que el elemento y lo sit�a por encima de �l. Cuando el usuario intente pulsar el elemento, ser� este div en realidad el que se vea pulsado.
3.	Cuando el usuario hace click en el div, se genera el elemento input file y se abre el di�logo de selecci�n de archivo.
4.	En cuanto el usuario selecciona el fichero, AjaxUpload crea un formulario, le agrega el input file del paso anterior, y crea un iframe. Este iframe, ser� el "target" del formulario recien creado.
5.	AjaxUpload env�a el formulario (que har� la subida del fichero a trav�s del iframe) y fin del proceso.
	
Mi problema ven�a con el di�logo de selecci�n. No ve�a c�mo conseguir seleccionar el archivo y pulsar el bot�n "Aceptar" del di�logo de selecci�n. Sab�a que la clase *Celerity::FileField* contaba con el m�todo *Set*, con el que pod�a pasarle la ruta de un archivo... Pero no s� por qu� me dio por pensar que si el di�logo estaba abierto, no funcionar�a. Hasta que lo prob�, y me di cuenta que Celerity establece la ruta del archivo y cierra la ventana de di�logo �l solito. As� que, problema resuelto.

Aqu� va un peque�o trozo de c�digo de como quedar�a montado. He sacado los selectores principales a variables para que se entienda mejor. Ah! Tambi�n decir que yo tengo configurado Capybara para que por defecto use selectores css :-)


	# selector del bot�n asociado a AjaxUpload
	button_selector = 'button#upload'
	# selector del div que contendr� al input file. Se posicionar� justo encima de button_selector
	div_selector = 'div.ajaxupload_container'
	# selector del input file
	input_selector = 'div.ajaxupload_container input.ajaxupload'
	# ruta al archivo a subir
	file_path = 'image.jpg'
	
	# Simulamos el evento 'mouseover' sobre el bot�n original asociado a AjaxUpload
	find(button_selector).trigger(:mouseover)
	
	# Comprobamos que se haya creado el div de AjaxUpload
	page.should have_css(div_selector)
	
	# Hacemos click en el div para disparar la creaci�n del input file
	find(div_selector).click
	
	# El input file deber�a haberse creado
	page.should have_css(input_selector)
	
	# Le pasamos la ruta de archivo al input file
	find(input_selector).set(file_path)

Y ya est�! Una aclaraci�n: he modificado AjaxUpload para que asigne una clase al div y al input file que crea y sea m�s sencillo seleccionarlos, ya que por defecto no les asigna identificador ni clases de ning�n tipo.	

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
