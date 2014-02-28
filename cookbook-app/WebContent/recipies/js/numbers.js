Number.prototype.isBetween = function(from, to)
{
    return this >= from && to >= this;
}

Number.prototype.numberOfDecimalsDigits = function()
{
    var f = this;
    var strNumber = f.toString();
    var remainder = strNumber.substr(strNumber.indexOf('.') + 1, 4);
    return remainder.length;
}

/*
 decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
 thousands_sep: char used as thousands separator, it defaults to ',' when omitted
 */
Number.prototype.format = function(decimals, decimal_sep, thousands_sep)
{
    var n = this,
        c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
        d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

    /*
     according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
     the fastest way to check for not defined parameter is to use typeof value === 'undefined'
     rather than doing value === undefined.
     */
        t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

        sign = (n < 0) ? '-' : '',

    //extracting the absolute value of the integer part of the number and converting to string
        i = parseInt(n = Math.abs(n).toFixed(c)) + '',

        j = ((j = i.length) > 3) ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

/*
 decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
 thousands_sep: char used as thousands separator, it defaults to ',' when omitted
 */
Number.prototype.formatCurrency = function(locale)
{
    var currencySign = '$';
    if (locale){
        if (locale == Locale.EN){
            var formattedNumber = this.format(0,'.',' ');
            return  currencySign + '' + formattedNumber;
        }
    }
    var formattedNumber = this.format(0,'.,',' ');
    return formattedNumber + ' ' + currencySign;
}

/*
 decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
 thousands_sep: char used as thousands separator, it defaults to ',' when omitted
 */
Number.prototype.formatPercent = function(locale)
{
    var percentSign = '%';
    var number = this*100;
    var numberOfDecimalsDigits = number.numberOfDecimalsDigits();
    if (locale){
        if (locale == Locale.EN){
            var formattedNumber = number.format(numberOfDecimalsDigits,'.',' ');
            return  formattedNumber + percentSign;
         }
    }
    var formattedNumber = number.format(numberOfDecimalsDigits,',',' ');
    return formattedNumber + percentSign;
}

