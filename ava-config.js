require('@babel/register');

// Disable imports of css & images
let noop = function() {};
require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;

let Enzyme = require('enzyme');
let Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({adapter: new Adapter()});
