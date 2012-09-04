var Fs = require( 'fs' );
var Log = require( './log' );
var Mustache = require( 'mustache' );
var _ = require( 'underscore' );
var Path = require( 'path' );
var Iconv = require( 'iconv-lite' );
var TemplatePath = Path.resolve( __dirname, 'template/ksp.json.mustache' );

/**
 * Build `ksp.json` with specified config.
 * @param config
 * @param output
 * @param charset
 */
module.exports.build = function( config, output, charset ){

    config = _.clone( config );
    config.main = JSON.stringify( config.main );

    var template = Fs.readFileSync( TemplatePath).toString();
    var outputData = Mustache.render( template, config );

    charset = charset || 'utf-8';

    Fs.writeFileSync( output, Iconv.encode( outputData, charset ) );

    Log.info( 'Your configuration is generated:', Path.resolve( output ) );
    Log.info( 'Enjoy!' );
    Log.info( 'OK' );

};