var Path = require( 'path' );
var Log = require( '../lib/log' );
var kspConfigBuilder = require( '../lib/kspConfigBuilder' );

module.exports.command = function( program ){

    // === Log ===
    Log.info( 'Answer questions below, and `KSP` will setup your `ksp.json` automatically.' )
    Log.info( 'Just press `Enter` to leave fields to default or empty.' )
    Log.info( 'Here we go!' );

    var CURRENT_WORK_DIR = process.cwd();
    var Config = {
        name: Path.basename( CURRENT_WORK_DIR ),
        output: './publish/{{pub}}/{{filename}}.js'
    };

    program.prompt('Package name: ', function(name){

        if( name ){
            Config.name = name;
            Log.info('Your package name is', name);
        }

        program.prompt('Charset( you can leave it since `KSP` can detect charset automatically.): ', function( charset ){

            if( charset ){
                Config.charset = charset;
                Log.info('Your charset is', charset);
            }

            program.prompt('Publish version: ', function( pub ){

                if( pub ){
                    Config.pub = pub;
                    Log.info('The version you wanna publish is', pub );
                }

                program.prompt('Main files( use `a.js b.js ... c.js`, separate with blank: ', function( main ){

                    if( main ){
                        main = main.split( /\s+/g );
                        Config.main  = main;
                        Log.info('You main files is', JSON.stringify( main ));
                    }

                    program.prompt('Output path: ', function( output ){

                        if( output ){
                            Config.output = output;
                            Log.info('Your output path is', output );
                        }

                        program.confirm('Want to compress?: (yes/no) ', function( ok ){

                            if( typeof ok !== undefined && ok ){
                                Config.compress = true;
                                Log.info('Your scripts will be compressed' );
                            }

                            if( Config.compress ){
                                program.prompt('Compress suffix( ex: -min ): ', function( suffix ){

                                    if( suffix ){
                                        Log.info('Your compress suffix will be', suffix );
                                        Config.compressSuffix = suffix;
                                    }
                                    else {
                                        Log.info('Your compress suffix will be default to `-min`' );
                                    }

                                    process.stdin.destroy();
                                    kspConfigBuilder.build( Config, Path.resolve( CURRENT_WORK_DIR, 'ksp.json' ) );
                                });
                            }
                            else {
                                process.stdin.destroy();
                                kspConfigBuilder.build( Config, Path.resolve( CURRENT_WORK_DIR, 'ksp.json' ) );
                            }
                        });
                    });
                });
            });
        });
    });
};
