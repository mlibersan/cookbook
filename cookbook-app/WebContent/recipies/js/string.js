/**
 * Created by ASCT489 on 13-10-10.
 */

String.prototype.format = function() {
    var args = arguments;

    return this.replace(/\{(\d+)\}/g, function() {
        return args[arguments[1]];
    });
};
