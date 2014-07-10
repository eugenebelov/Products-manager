function Router()
{
    var path   = '',
    path_array = [],
    clName     = '',
    fnName     = '',
    _fn        = null,
    sendParams = [];

    console.log("router");
    
    path = document.location.pathname;
    if("web/Products-manager/pure-project/")path = path.replace("web/Products-manager/pure-project/",'/');    
    path = path.substr(1,path.length - (path.charAt(path.length-1) == '/'?2:1));    
    
    if(!path.length || path == 'index') 
        path = 'main';
    
    path       = path.replace(/\//g, ' ');                
    path_array = path.split(' ');
    
    clName = path_array[0];
    clName = clName.charAt(0).toUpperCase() + clName.slice(1);

    if(!path_array[1])path_array[1] = 'main';
    fnName = path_array[1];        
    
    sendParams = path_array.slice(2);
    
    console.log(clName, fnName, sendParams);

    try{
        if(/\.html$/i.test(clName)) clName = 'Html';
        eval(clName)()[fnName](sendParams);                        
    } catch(e){}        
    // Global()['any'](fnName, fnName, sendParams);        
}
