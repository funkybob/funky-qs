
interface FormdataObject {
    [key: string]: string|Array<string>;
}

/**
 * @desc Encode an Object to a QueryString
 * @param {FormdataObject | Map | FormData} data
 * @returns {string}
 */
function encode (data : FormdataObject|Map<string, string>|FormData) : string {
    return Object.entries(data)
        .reduce((acc : Array<Array<string>>, [key, val]) => {
            if (Array.isArray(val)) {
                for (let v of val) {
                    acc.push([key, v])
                }
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
 * @param {FormdataObject | Map } data
 * @param {FormData} [form]
 * @returns {FormData}
 */
function encodef (data : FormdataObject | Map<string, string|Array<string>>, form : FormData) {
    if (form === undefined) form = new FormData();
    return Object.entries(data)
        .forEach(([key, val]) => {
            if (Array.isArray(val)) {
                for (let o of val) {
                    form.append(key, o);
                }
            } else {
                form.append(key, val)
            }
        });
}

/**
 * @desc Decode a QueryString to an Object
 * @param {string} querystring
 * @param {FormdataObject} [data] - Default data
 * @returns {Object}
 */
function parse (querystring : string, data : FormdataObject = {}) : Object {
    querystring
        .replace(/^[#\?]/, '')
        .split('&')
        .map(p => p.replace(/\+/g, '%20').split('=', 2))
        .forEach(([k, v]) => {
            k = decodeURIComponent(k)
            v = decodeURIComponent(v)
            if(k in data) {
                if (!Array.isArray(data[k])) {
                    data[k] = [(<string>data[k])];
                }
                (<Array<string>>data[k]).push(v);
            } else {
                data[k] = v;
            }
        })
    return data;
}

/**
 * @desc Decode a QueryString to a FormData instance.
 * @param {string} querystring
 * @returns {FormData}
 */
function parsef(querystring : string) : FormData {
    let data = new FormData()
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
