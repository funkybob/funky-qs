
function encode (data) {
    let params = []
    Object.entries(data).forEach([key, val] => {
        if (Array.isArray(val)) {
            val.forEach(o => params.push([key, o]))
        } else {
            params.push([key, val])
        }
    })
    return params
        .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
        .join('&')
        .replace(/%20/g, '+');
}

function parse (querystring, data = {}) {
    querystring
        .replace(/^[#\?]/, '')
        .split('&')
        .map(p => p.replace(/\+/g, '%20').split('=', 2))
        .reduce((acc, [k, v]) => {
            k = decodeURIComponent(k)
            v = decodeURIComponent(v)
            if(k in acc) {
                if (!Array.isArray(acc[k])) acc[k] = [acc[k]];
                acc[k].push(v);
            } else {
                acc[k] = v;
            }
            return acc;
        }, data)
    return data;
}

export default {
    encode,
    parse
}
