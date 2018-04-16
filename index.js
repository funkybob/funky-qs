
function encode (data) {
    let params = []
    Object.keys(data).forEach(k => {
        let v = data[k];
        if (Array.isArray(v)) {
            v.forEach(o => params.push([k, o]))
        } else {
            params.push([k, v])
        }
    })
    return params
        .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
        .join('&')
        .replace(/%20/g, '+');
}

function parse (querystring) {
    let parts = {}
    querystring
        .replace(/^[#\?]/, '')
        .split('&')
        .map(p => p.replace(/\+/g, '%20').split('=', 2))
        .forEach(([k, v]) => {
            k = decodeURIComponent(k)
            v = decodeURIComponent(v)
            if(k in parts) {
                if (!Array.isArray(parts[k])) parts[k] = [parts[k]];
                parts[k].push(v);
            } else {
                parts[k] = v;
            }
        })
    return parts;
}

export default {
    encode,
    parse
}
