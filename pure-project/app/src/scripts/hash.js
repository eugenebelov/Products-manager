var Hash = {
    remove: function(k)
    {
        var p = new RegExp('([#|&]+' + k + '=)([^&]+)');
        location.hash = location.hash.replace(p, '');
    },
    set: function(k, v)
    {
        var h = location.hash;
        if ((new RegExp('[#|&]+' + k + '=')).test(h)) {
            var p = new RegExp('([#|&]+' + k + '=)([^&]+)');
            h = h.replace(p, '$1' + v);
        } else {
            h += (!h.length ? '#' : '&') + k + '=' + v;
        }
        location.hash = h;
    },
    setParam: function(url, k, v)
    {
        if ((new RegExp('[?|#|&]+' + k + '=')).test(url)) {
            var p = new RegExp('([?|#|&]+' + k + '=)([^&]+)');
            url = url.replace(p, '$1' + v);
        } else {
            url += (!url.length ? '#' : '&') + k + '=' + v;
        }
        return url;
    },
    get: function(k)
    {
        var res = (new RegExp('[#|&]+' + k + '=([^&]+)')).exec(location.hash);
        return k ? (res && res.length > 1 ? res[1] : res) : location.hash;
    },
    getAll: function(asString)
    {
        if (location.hash) 
        {
            var tmpArr = [],
                hash = location.hash.replace(/^#/, ''),
                prms = [],
                hArr = [];            
                
            if(asString) return hash;
            
            hArr = hash.split('&');
            
            for (var i = 0, l = hArr.length; i < l; i++) 
            {
                prms = hArr[i].split('=');
                if (prms.length < 1) continue;                
                tmpArr[tmpArr.length] = {'name': prms[0], 'value': prms[1] ? prms[1] : ''};
            }
            return tmpArr;
        }
        return [];
    }
}
