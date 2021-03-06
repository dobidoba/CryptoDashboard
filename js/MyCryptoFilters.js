app.filter('singleDecimal', function ($filter) {
	return function (input) {
		if (isNaN(input)) return input;
		return Math.round(input * 10) / 10;
	};
});

app.filter('setDecimal', function ($filter) {
	return function (input, places) {
		if (isNaN(input)) return input;
		
		// If we want 1 decimal place, we want to mult/div by 10
		// If we want 2 decimal places, we want to mult/div by 100, etc
		// So use the following to create that factor
		var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
		
		var res =Math.round(input * factor) / factor;
		if (isNaN(res)) return 0;
		
		return res;
	};
});

app.filter('decimalFormat', function () {
  return function (text) {
    return parseFloat(text).toFixed(20).replace(/0+$/,'');
  };
});

app.filter( 'shortNumber', function() {
return function( number ) {
if ( number ) {
abs = Math.abs( number );
if ( abs >= Math.pow( 10, 12 ) ) {
// trillion
number = ( number / Math.pow( 10, 12 ) ).toFixed( 1 ) + "T";
} else if ( abs < Math.pow( 10, 12 ) && abs >= Math.pow( 10, 9 ) ) {
// billion
number = ( number / Math.pow( 10, 9 ) ).toFixed( 1 ) + "B";
} else if ( abs < Math.pow( 10, 9 ) && abs >= Math.pow( 10, 6 ) ) {
// million
number = ( number / Math.pow( 10, 6 ) ).toFixed( 1 ) + "M";
} else if ( abs < Math.pow( 10, 6 ) && abs >= Math.pow( 10, 3 ) ) {
// thousand
number = ( number / Math.pow( 10, 3 ) ).toFixed( 1 ) + "K";
}
return number;
}
};
} );


app.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});



