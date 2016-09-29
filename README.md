# 10kb
The 10kb challenge: [read the challenge page](https://a-k-apart.com/)

## The 10kb Weather App
The Weather in 10kb will let you get the weather on your current location or any other location of your choice as fast as possible!
Hope you guys and girls like the sleek IOS like look.

## Used techniques
The initial load of the 10kb Weather App must be under 10kb.
The following techniques are used:
* LocalStorage (saving the last requested weather data for a day to decrease the initial load when visited again, if the browser supports LocalStorage)
* HTML5 Appcache (the index.html, css.min.css and main.min.js are all cached using HTML5 Appcache, if the browser allows it)
* Minified (css and javascript is minified)
* LazyLoad dependencies (To switch your location, Google Maps with the Places API is required. The API will only be loaded when the focus is set on the place search box)
* Apache GZIP is enabled in .htaccess (Gzip is a method of compressing files for faster network transfers)
* No javascript frameworks are used
* HTML5 Geolocation (The HTML Geolocation API is used to locate a user's position and show the weather at location. If Geolocation is not allowed by the user or browser the default location will load, The Netherlands)

## Demo
A working demo can ben found here: [http://3eighty.nl/10k/](http://3eighty.nl/10k/)

## Additional notes
Geolocation is not allowed on unsecure sites (no https) in Chrome 50+