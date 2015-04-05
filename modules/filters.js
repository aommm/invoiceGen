angular.module('filters', [])
    .filter('showCurrency', function() {
        return function(n) {
            if (n) return n+" kr";
            else return "";
        }
    })
    .filter('showDate', function() {
        return function(d) {
            return moment(d).format("YYYY-MM-DD");
            // return "hej! =)";
        }
    })
    .filter('showPercent', function() {
        return function(n) {
            if (n) return n*100 + "%";
            else return "";
        }
    });
