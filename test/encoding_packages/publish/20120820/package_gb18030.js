(function(S){

    // ����
    var PACKAGE_NAME = 'encoding_packages';
    // ��ǰ�ļ�ҳ�����õ�ַ�б������ļ�������
    var OUTPUT_PACKAGE_PATH = 'publish/20120820/package_gb18030.js';
    // ��Tag
    var PACKAGE_TAG = '';
    // ���ı���
    var PACKAGE_CHARSET = 'gbk';

    // ��ȡKISSY package ������Ҫ�õ��� `path` ֵ.
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[ scripts.length -1 ].src;
    var packagePath;

    // ��ΪIE�����ȡ��Ե�ַ...��˸��ݵ�ǰҳ�湹��
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

    // ��ǰ�ű���url��ȥ���ģ���·�����ǰ���path.
    packagePath = currentScriptPath.substring( 0, currentScriptPath.indexOf( OUTPUT_PACKAGE_PATH ) );

    // ������
    S.config({
        packages:[
            {
                name: PACKAGE_NAME,
                tag: PACKAGE_TAG,
                path: packagePath,
                charset: PACKAGE_CHARSET
            }
        ],
        // �����е�ǰ���µ��붼ӳ�䵽��ǰ�ļ�
        map: [
            [ new RegExp( '\/' + PACKAGE_NAME + '\/.*' ), currentScriptPath ]
        ]
    });
})( KISSY );

// �������е�ģ�鶨��
/*
combined files : 

encoding_packages/publish/20120820/mod
encoding_packages/publish/20120820/index

*/
KISSY.add('encoding_packages/publish/20120820/mod',function(){
    console.log( '����mod' );
});KISSY.add('encoding_packages/publish/20120820/index',function(){
    console.log( '�������ģ��' );
}, { requires: [ './mod' ] } );

(function(S){
    // �������ģ��
    S.use( 'encoding_packages/publish/20120820/packa' );
})(KISSY);
