// @ts-ignore
const utf8 = require('utf8');
function decodeOptionKey(option){
    for (let key in option) {
        const value = option[key]
        delete option[key]
        key = utf8.decode(key)
        option[key] = value
    }
    return option
}
module.exports = {decodeOptionKey}