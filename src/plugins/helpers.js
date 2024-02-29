export const  ifBool = function(params, dummy) {
    if (typeof params == 'boolean') {
        return params
    } else {
        return dummy
    }
}