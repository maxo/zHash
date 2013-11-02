zHash
=====

Tiny Javascript library for handling browser _window.location.hash_ with backward compatibility for old browsers



How to use
==========

-include the zHash.js file in your HTML head. (or add it to your existing JS file)

-use the listen function to assign a JS function when the desired hash is selected: __zHash.listen('myhash', someFunction(){ });__

-after you finish assigning functions to hashes, execute this function to start monitoring hashes: __zHash.start( 'defaultHash' );__
  
  the 'defaultHash' is optional, it selects the defaultHash if _window.location.hash_ was empty


Browsers compatibility
======================
Yes, it works even on bloody __IE__ !


Dependency
==========
zHash is pure Javascript, so it doesn't require jQuery or any library. Works side by side perfectly tho.
