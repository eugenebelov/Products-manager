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
    get: function(k)
    {
        var res = (new RegExp('[#|&]+' + k + '=([^&]+)')).exec(location.hash);
        return k ? (res && res.length > 1 ? res[1] : res) : location.hash;
    },
    setParam: function(url, k, v)
    {
        if ((new RegExp('[?|#|&]+' + k + '=')).test(url)) {
            var p = new RegExp('([?|#|&]+' + k + '=)([^&]+)');
            url = url.replace(p, '$1' + v);
        } else {
            url += (!url.length ? '#' : '&') + k + '=' + v;
        }
        location.hash = url;
    }
}
