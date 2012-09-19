KISSY.add(function(){

    var filename = 'main_c.js';
    var desc = 'main file for package one!';
    console.log( filename, desc );
},{requires: [
    './mod',
    './mod.css'
]});