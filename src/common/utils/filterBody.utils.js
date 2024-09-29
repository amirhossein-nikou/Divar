function parseBody( option,array){
    array.forEach(item => {
        delete option[item]
    });
    return option
}
module.exports = {parseBody}