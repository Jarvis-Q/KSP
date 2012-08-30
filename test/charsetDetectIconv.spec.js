var Fs = require( 'fs' );
var Path = require( 'path' );
var assert = require( 'assert' );
var Iconv = require( 'iconv-lite' );
var Util = require( '../lib/util' );

var content = '我听过这张专辑《Seventh Tree (Deluxe CD/DVD)》 -Goldfrapp ★★★★★：在我的touch里存货了很久的专辑，非常迷幻的曲风';
var encodings = [ 'GB2312', 'gbk', 'utf-8' ];

pageBuilder( encodings, content );

describe( 'test', function(){
    describe( 'test', function(){

        encodings.forEach(function( charset ){

            it( charset, function(done){

                var filename = fileName( charset );
                var ret = Util.charsetDetect( filename );

                if( charset.match( /gb.*/i ) ){
                    assert.equal( ret, 'gbk' );
                }

                if( charset.match( /ut.*8/i ) ){
                    assert.equal( ret, 'utf-8' );
                }
                done();
            });
        });
    });
});

function pageBuilder( encodings, content ){
    encodings.forEach(function( charset ){
        var buff = Iconv.encode( 'charset: ' + charset + '\n' + content , charset );
        Fs.writeFileSync( fileName( charset ), buff );
    });
}

function fileName( charset ){
    return Path.join( Path.resolve( __dirname, 'iconv_test' ), charset + '.md' );
}

