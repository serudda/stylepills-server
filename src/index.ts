/* It was neccesary to created this file in order to fix error on debug with VS Code
It seems that we fixed the issue added: babel-register module 
reference: https://github.com/katopz/vscode-debug-nodejs-es6
*/
require('babel-register');
require('babel-polyfill');
require('./server.js');