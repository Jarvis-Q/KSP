var Path = require( 'path' );
var Fs = require( 'fs' );
var assert = require( 'assert' );
var Builder = require( '../lib/kspConfigBuilder' );
var Config = {
    name: 'packageName',
    charset: 'gbk',
    pub: 20120904,
    main: [ 'a.js', 'b.js' ],
    output: 'publish/{{pub}}/{{filename}}.js',
    compress: true,
    compressSuffix: '-m'
};
var outputPath = Path.resolve( __dirname, 'ksp.json' );

describe( 'test', function(){
    describe( '#kspConfigBuilder', function(){
        it( 'normal', function( done ){

            Builder.build( Config, outputPath );
            if( Config.compress ){
                Config.compress = Config.compressSuffix || '-min';
                delete Config.compressSuffix;
            }
            var kspConfig = require( outputPath );
            assert.deepEqual( kspConfig, Config );
            Fs.unlink( outputPath );
            done();
        });
    });
});