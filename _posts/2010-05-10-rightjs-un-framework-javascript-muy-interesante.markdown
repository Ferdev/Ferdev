--- 
layout: post
title: RightJS, un framework javascript muy interesante
category: Development
tags: [javascript, rightjs, frameworks]
---
Llevaba tiempo queriendo escribir acerca de este framework javascript, uno de los más interesantes del momento. Quizá no sea tan conocido como jQuery o MooTools, pero en mi opinión merece estar tan arriba como ellos. Además, ciertos elementos de su sintaxis resultarán familiares a los rubistas. Más adelante explicaré cuales.

La mejor manera de hablar de [RightJS][1] es comentar sus características principales:

*	Sintaxis sencilla y curva de aprendizaje baja. Si ya conoces otro framework como jQuery o Prototype, te costará muy poco aprender RightJS.

*	**Posiblemente**, el más rápido de todos los frameworks JavaScript. Difícil de demostrar, pero [diversos tests][2] parecen corroborarlo. No sé si el más rápido, pero desde luego es rapidísimo.

*	Llamadas a funciones por nombre. Muchas veces tenemos el típico callback para acceder a un método del propio objeto. Con RightJS no necesitaremos dicho callback, símplemente pasaremos el nombre de la función como string.

        // Modo habitual
        $('element').onClick(function() {
          this.hide();
        });

        // Usando llamadas por nombre
        $('element').onClick('hide');

*	Soporte en navegadores más antiguos de la última especificación JavaScript/ECMAScript. Por ejemplo:

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

*	Extensión del core de JavaScript con algunos métodos que sonarán a muchos rubistas:

    [**Array#compact**][6]:

    	[null, 0, undefined, 1, 2, 3, null].compact();

    	// -> [0, 1, 2, 3];

    [**String#endsWith**][7]:

    	'image.gif'.endsWith('.gif');       // -> true

    	'image.gif'.endsWith('.GIF');       // -> false
    	'image.gif'.endsWith('.GIF', true); // -> true
	
*	Manejo de números simplificado.

    	// Conversión de string a number
    	'123'.toInt();   // -> 123
    	'1.3'.toFloat(); // -> 1.3

    	// Manejo de números
    	1.4.floor(); // -> 1
    	1.4.ceil();  // -> 2
    	1.4.round(); // -> 1
	
*	Aunque JavaScript ya es un lenguaje orientado a objetos, la clase `Class` hace más sencilla la herencia, implementación de interfaces, etc.

    	var Klass = new Class(AnotherClass, {
    	  include: Module1,
    	  extend:  Module2,

    	  initialize: function() {
    	    //....
    	  }
    	});
	
*	Y también: [envío][8] simplificado de formularios, uso de spinners automáticos en peticiones AJAX, manejo unificado de [eventos][9] y [opciones][10] de métodos, arquitectura abierta, soporte para [plugins][11], y una [gema][12] para facilitar la integración con Rails (soporta Rails3).

Como véis, es un framework al que merece la pena echarle un vistazo. Sobre todo si eres un desarrollador de back que no te sientes muy cómodo con la parte front (está orientado principalmente a desarrolladores Rails, como se puede ver). Creo que bien merece uno de vuestros PetProjects ;-)

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
