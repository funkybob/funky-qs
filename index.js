
/**
 * @desc Encode an Object to a QueryString
 * @param {Object|Map|FormData} data
 * @returns {String}
 */
function encode (data) {
    return Object.entries(data)
        .reduce((acc, [key, val]) => {
            if (Array.isArray(val)) {
                val.forEach(o => acc.push([key, o]));
            } else {
                acc.push([key, val])
            }
            return acc;
        }, [])
        .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
        .join('&')
        .replace(/%20/g, '+');
}

/**
 * @desc Encode an Object to a FormData
 * @param {Object|Map} data
 * @returns {FormData}
 */
function encodef (data, form) {
    if (form === undefined) form = new FormData();
    return Object.entries(data)
        .forEach(([key, val]) => {
            if (Array.isArray(val)) {
                val.forEach(o => form.append([key, o]));
            } else {
                form.append([key, val])
            }
        });
}

/**
 * @desc Decode a QueryString to an Object
 * @param {String} querystring
 * @param {Object} [data] - Default data
 * @returns {Object}
 */
function parse (querystring, data = {}) {
    querystring
        .replace(/^[#\?]/, '')
        .split('&')
        .map(p => p.replace(/\+/g, '%20').split('=', 2))
        .forEach(([k, v]) => {
            k = decodeURIComponent(k)
            v = decodeURIComponent(v)
            if(k in data) {
                if (!Array.isArray(data[k])) data[k] = [data[k]];
                data[k].push(v);
            } else {
                data[k] = v;
            }
        })
    return data;
}

/**
 * @desc Decode a QueryString to an FormData
 * @param {String} querystring
 * @param {FormData} [data] - Default data
 * @returns {Object}
 */
function parsef (querystring, data) {
    if (data === undefined) data = new FormData();
    querystring
        .replace(/^[#\?]/, '')
        .split('&')
        .map(p => p.replace(/\+/g, '%20').split('=', 2))
        .forEach(([k, v]) => data.append(
            decodeURIComponent(k),
            decodeURIComponent(v)
        ))
    return data;
}

export default {
    encode,
    encodef,
    parse,
    parsef
}
