zHash
=====

small Javascript library for handling browser _window.location.hash_



How to use
==========

-include the zHash.js file in your HTML head.

-use the listen function to assign a JS function when the desired hash is selected: __zHash.listen('myhash', someFunction(){ });__

-after you finish assigning functions to hashes, execute this function to start monitoring hashes: __zHash.start( 'defaultHash' );__
  
  the 'defaultHash' is optional, it selects the defaultHash if _window.location.hash_ was empty
