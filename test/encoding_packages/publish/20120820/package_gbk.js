(function(S){

    // 包名
    var PACKAGE_NAME = 'encoding_packages';
    // 当前文件页面引用地址中报名到文件名部分
    var OUTPUT_PACKAGE_PATH = 'publish/20120820/package_gbk.js';
    // 包Tag
    var PACKAGE_TAG = '';
    // 包的编码
    var PACKAGE_CHARSET = 'gbk';

    // 获取KISSY package 配置需要用到的 `path` 值.
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[ scripts.length -1 ].src;
    var packagePath;

    // 若为IE，则会取相对地址...因此根据当前页面构造
    if( S.UA.ie <= 7 && currentScriptPath.indexOf( 'http://' ) < 0 ){
        var pageUrl = location.href;
        var pageUrlArr = pageUrl.split( '/');
        var packagePathArr = currentScriptPath.split( '/' );
        pageUrlArr.pop();

        S.each( packagePathArr, function( pkgSeg ){
            if( pkgSeg == '..' ){
                pageUrlArr.pop();
            }
            else if( pkgSeg != '.' ){
                pageUrlArr.push( pkgSeg );
            }
        });

        currentScriptPath = pageUrlArr.join( '/' );
    }

    // 当前脚本的url除去入口模块的路劲就是包的path.
    packagePath = currentScriptPath.substring( 0, currentScriptPath.indexOf( OUTPUT_PACKAGE_PATH ) );

    // 包配置
    S.config({
        packages:[
            {
                name: PACKAGE_NAME,
                tag: PACKAGE_TAG,
                path: packagePath,
                charset: PACKAGE_CHARSET
            }
        ],
        // 将所有当前包下的请都映射到当前文件
        map: [
            [ new RegExp( '\/' + PACKAGE_NAME + '\/.*' ), currentScriptPath ]
        ]
    });
})( KISSY );

// 引入所有的模块定义
/*
combined files : 

encoding_packages/publish/20120820/mod
encoding_packages/publish/20120820/index

*/
KISSY.add('encoding_packages/publish/20120820/mod',function(){
    console.log( '这是mod' );
});KISSY.add('encoding_packages/publish/20120820/index',function(){
    console.log( '这是入口模块' );
}, { requires: [ './mod' ] } );

(function(S){
    // 启动入口模块
    S.use( 'encoding_packages/publish/20120820/packa' );
})(KISSY);
