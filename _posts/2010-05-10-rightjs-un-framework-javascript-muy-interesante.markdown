--- 
wordpress_id: 99
layout: post
title: RightJS, un framework javascript muy interesante
wordpress_url: http://www.ferdev.com/?p=99
---
Llevaba tiempo queriendo escribir acerca de este framework javascript, uno de los m�s interesantes del momento. Quiz� no sea tan conocido como jQuery o MooTools, pero en mi opini�n merece estar tan arriba como ellos. Adem�s, ciertos elementos de su sintaxis resultar�n familiares a los rubistas. M�s adelante explicar� cuales.

La mejor manera de hablar de [RightJS][1] es comentar sus caracter�sticas principales:

*	Sintaxis sencilla y curva de aprendizaje baja. Si ya conoces otro framework como jQuery o Prototype, te costar� muy poco aprender RightJS.

*	**Posiblemente**, el m�s r�pido de todos los frameworks JavaScript. Dif�cil de demostrar, pero [diversos tests][2] parecen corroborarlo. No s� si el m�s r�pido, pero desde luego es rapid�simo.

*	Llamadas a funciones por nombre. Muchas veces tenemos el t�pico callback para acceder a un m�todo del propio objeto. Con RightJS no necesitaremos dicho callback, s�mplemente pasaremos el nombre de la funci�n como string.

        // Modo habitual
        $('element').onClick(function() {
          this.hide();
        });

        // Usando llamadas por nombre
        $('element').onClick('hide');

*	Soporte en navegadores m�s antiguos de la �ltima especificaci�n JavaScript/ECMAScript. Por ejemplo:

    [**Array#filter**][3]:

    	var strings = ['anny', 'manny', 'banny', 'bob'];

    	strings.filter(function(string, i) {
    	  return string.length > (i+1);
    	});
    	// -> ['anny', 'manny', 'banny'];

    	strings.filter('match', /[a-z]ann/);
    	// -> ['manny', 'banny']

    [**Array#map**][4]:

    	var strings = ['anny', 'banny', 'manny'];

    	strings.map(function(string, i) {
    	  return (i+1)+'. '+string;
    	});

    	// -> ['1. anny', '2. banny', '3. manny'];

    	strings.map('capitalize');

    	// -> ['Anny', 'Banny', 'Manny'];

    	strings.map('replace', 'nn', 'b');

    	// -> ['aby', 'baby', 'maby'];

    [**String#trim**][5]:

    	' asdf '.trim(); // -> 'asdf'

*	Extensi�n del core de JavaScript con algunos m�todos que sonar�n a muchos rubistas:

    [**Array#compact**][6]:

    	[null, 0, undefined, 1, 2, 3, null].compact();

    	// -> [0, 1, 2, 3];

    [**String#endsWith**][7]:

    	'image.gif'.endsWith('.gif');       // -> true

    	'image.gif'.endsWith('.GIF');       // -> false
    	'image.gif'.endsWith('.GIF', true); // -> true
	
*	Manejo de n�meros simplificado.

    	// Conversi�n de string a number
    	'123'.toInt();   // -> 123
    	'1.3'.toFloat(); // -> 1.3

    	// Manejo de n�meros
    	1.4.floor(); // -> 1
    	1.4.ceil();  // -> 2
    	1.4.round(); // -> 1
	
*	Aunque JavaScript ya es un lenguaje orientado a objetos, la clase `Class` hace m�s sencilla la herencia, implementaci�n de interfaces, etc.

    	var Klass = new Class(AnotherClass, {
    	  include: Module1,
    	  extend:  Module2,

    	  initialize: function() {
    	    //....
    	  }
    	});
	
*	Y tambi�n: [env�o][8] simplificado de formularios, uso de spinners autom�ticos en peticiones AJAX, manejo unificado de [eventos][9] y [opciones][10] de m�todos, arquitectura abierta, soporte para [plugins][11], y una [gema][12] para facilitar la integraci�n con Rails (soporta Rails3).

Como v�is, es un framework al que merece la pena echarle un vistazo. Sobre todo si eres un desarrollador de back que no te sientes muy c�modo con la parte front (est� orientado principalmente a desarrolladores Rails, como se puede ver). Creo que bien merece uno de vuestros PetProjects ;-)

[1]: http://rightjs.org "The Right JavaScript Framework"
[2]: http://rightjs.org/benchmarks
[3]: http://rightjs.org/docs/array#filter
[4]: http://rightjs.org/docs/array#map
[5]: http://rightjs.org/docs/string#trim
[6]: http://rightjs.org/docs/array#compact
[7]: http://rightjs.org/docs/string#endsWith
[8]: http://rightjs.org/docs/form#send "Form#send"
[9]: http://rightjs.org/tutorials/uniformed-events-handling
[10]: http://rightjs.org/tutorials/uniformed-options-handling
[11]: http://rightjs.org/plugins
[12]: http://github.com/MadRabbit/right-rails
