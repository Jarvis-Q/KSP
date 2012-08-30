var assert = require( 'assert' );
var Path = require( 'path' );
var util = require( '../lib/util' );
var encodings = [ 'gbk', 'utf-8', 'gb2312', 'gb18030' ];

describe( 'method test', function(){
    describe( '#charsetDetect()', function(){

        it( 'normal', function( done ){

            encodings.forEach(function( charset ){
                var filename = Path.join( __dirname, 'encoding_files', charset + '.md' );
                var ret = util.charsetDetect( filename );

                if( charset.match( /gb.*/i ) ){
                    assert.equal( ret, 'gbk' );
                }

                if( charset.match( /ut.*8/i ) ){
                    assert.equal( ret, 'utf-8' );
                }
            });

            done();
        });
    });
});