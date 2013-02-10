---
layout: post
title: Cambiar el idioma a selenium
---
Ayer me encontré con un problema haciendo tests para un pet-project que estoy haciendo con Rails3 3.0.0.rc. Parece ser que a partir de la versión 1.0.0.beta.9 de [bundler][1], culerity lanza un error a la hora de crear el browser con celerity. Mientras investigo el problema, no quería dejar el desarrollo parado, así que decidí cambiar el driver de [capybara][2] a selenium. Pero el firefox que trae el driver de selenium integrado se me ejecutaba en castellano, y yo tengo los tests escritos en inglés, por lo que fallaban. Tras twittear buscando ayuda, [@pacoguzman me pasó un link][3](gracias!) de la gente de [Teambox][4] que tenía la clave para solucionarlo.

Lo solución consiste en extraer el profile del driver de selenium, pasarle la nueva clave del idioma, y volver a asignar el profile al driver de selenium. La clave que había que pasar era 'intl.accept_languages' (sacado de hacer un about:config en mi Firefox y buscar un poco) junto con el lenguaje que quieras usarlo, en mi caso 'en'. Como yo estoy usando [Steak][5] para mis test de aceptación, incorporé el código en el archivo de configuración 'spec/acceptance/acceptance_helper.rb':

{% highlight ruby %}
Capybara::Driver::Selenium.class_eval do

  class << self

    def driver

      @driver ||= begin
        profile = Selenium::WebDriver::Firefox::Profile.new

        profile['intl.accept_languages'] = 'en'

        driver = Selenium::WebDriver.for :firefox, :profile => profile

        at_exit { driver.quit }

        driver
      end

    end

  end

end
{% endhighlight %}

Y listo, selenium en inglés y todos los tests pasando!

[1]: http://github.com/carlhuda/bundler "Bundler"
[2]: http://github.com/jnicklas/capybara "Capybara"
[3]: http://twitter.com/pacoguzman/status/21053477686 "@pacoguzman tweet"
[4]: http://teambox.com/ "Teambox"
[5]: http://github.com/cavalle/steak "Steak"
