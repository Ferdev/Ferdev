---
layout: post
title: 'Pentadactyl: the reason why I still use Firefox.'
branch-id: ijFhEEVYgT0
branch-url: http://branch.com/b/pentadactyl-the-reason-why-i-still-use-firefox
---
I'm a vim fanatic (vim neanderthal, say some of my colleages). I'm writting this post in vim, I code using vim, manage my tasks using vim and I wish I could do everything in front of my computer with vim.

I used to be a Chrome user, as the majority around here, I guess. One day, looking for an extension to Chrome, I ran into a extension called "[Vimium][1]". Probably it's not the first of its kind, but is the first one I found. The idea behind Vimium is to be able to use the vim commands and key mappings in your browser. You can scroll down using `j` or `d`, scroll up using `k` or `u`, etc. The Vimium homepage explains it way better than me. I started using it and I fell in love instantly.

But I wanted more. Although my browsing workflow improved a lot, I felt that I was missing something. I started reading in forums and google groups until someone mentioned "[Pentadactyl][2]" in one of those messages. He spoke so well of it that I had to try it right away. I opened Firefox and started downloading it.

<!--break-->

I must admit that the first time I was overwhelmed. It has so many options is easy to get lost at first. But if you are a regular vim user you'll get used to it really fast. For me, the "awesomest" features of pentadactyl are:

- It has a status bar, with its own gui.

- Tab completion for urls, search terms, bookmarks, etc.

- Ex commands (`:tabopen www.ferdev.com`).

- Marks, QuickMarks and Bookmarks support.

- And a help system, like vim (:help open).

I think the best way to explain how pentadactyl has made me to switch back to Firefox and improved my browsing experience is to share some of my workflow. So, here comes some tips:

- First of all, install [buftabs.js][3]. It allows you to move your firefox tabs to your pentadactyl status bar. In my setup I've removed all the superflous toolbars from Firefox: the tab bar, the navigation bar, the bookmarks bar... All of them. With pentadactyl are useless. By the way, you can remove your tab bar with the following command:

      {% highlight ruby %}:set showtabline=never{% endhighlight %}

- Lets say you have an url in you clipboard. To open it in the current tab just hit `p`. To open it in another tab, just hit `P`. If you want to copy the url in the current tab, type `y`(yank).

- Bookmarklets doesn't have much sense with pentadactyl. Instead, save the bookmarklet as regular bookmarks and map them to custom keystrokes. For instance, I have the timer of [letsfreckle.com][4] stored in a bookmark with the keyword "timer". Then, I mapped that keyword and saved it to my `.pentadactylrc` file. This way, to open the letsfreckle timer I just have to type "timer" and it'll be loaded in a new tab. Neat! This is the mapping command I used:

      {% highlight ruby %}:map timer :tabopen timer<CR>
:mkp!{% endhighlight %}

- You can open any link in a web in a new tab without touching your mouse at all. In order to do that, just visit a web and the press the letter `F`. This will mark all links in the web with a tooltip with a letter (or a combination of letters) inside. You just have to press the letter(s) in the tooltip of the desired link to open it in a new tab. If you want to open it in the current tab, press `f` instead.

- Another cool trick I use for custom search engines is the following. I have installed [this][5] Firefox extension. It allows you to add any search engine to your search engines list. Then, you just have to assign a keyword to your search engine to be able to use it with pentadactyl. For instance, I have mapped the [dribbble][6] search engine to the keyword 'dribbble', and this to a custom key map named `db`. So, any time I want to perform a search in dribbble, I just type `db wanted-search-terms<CR>` and this will create a new tab with the dribbble search in it. Really really handy. This is the keymapping I'm using:

      {% highlight ruby %}:map db :tabopen dribbble {% endhighlight %}

- Privacy is important in pentadactyl, and you can clean all your personal session data with the sanitize command. Cache, cookies, downloads, history... Everything. You better check the help entry for the sanitize command.

- Pentadactyl is also a strong weapon to increase your ammount of unreaded items in your readability stack. I have a custom mapping to add articles to readability using the same technique mapping bookmarks to keystrokes. Hitting `rl` in a web page will send it to readability, while hitting `rn` will transform ugly web pages with small typography into beatyful articles using readability formatter.

This is just some of the posibilities of pentadactyl. Of course, this power doesn't come without drawbacks: Firefox is way slower than other browsers like Chrome, and the debugger is not as good as Web Inspector in Webkit based browsers... But anyway, pentadactyl is so powerful that won't make you miss your old browser never again. I promise you!


[1]: http://vimium.github.com/
[2]: http://5digits.org/pentadactyl/
[3]: https://github.com/grassofhust/buftabs
[4]: http://letsfreckle.com/
[5]: https://firefox.maltekraus.de/extensions/add-to-search-bar
[6]: http://dribbble.com/
