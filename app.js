var app = angular.module('demo', ['siyfion.sfTypeahead']);
_.mixin(s.exports());

app.controller('MainCtrl', function($scope, $http) {
  
  $scope.selectedNumber = null;

  
  // instantiate the bloodhound suggestion engine
  var numbers = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
    queryTokenizer: function(d) { return Bloodhound.tokenizers.whitespace },
    // local: [
    //   { num: 'one' },
    //   { num: 'two' },
    //   { num: 'three' },
    //   { num: 'four' },
    //   { num: 'five' },
    //   { num: 'six' },
    //   { num: 'seven' },
    //   { num: 'eight' },
    //   { num: 'nine' },
    //   { num: 'ten' }
    // ],
    // source: getElesticDataSet()
    remote: {
      url: 'http://elasticsearch.wm-cloud.com:9200/wmcust/_suggest',
      'cache': false,
      ajax: {
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        type: "POST",
        cache: false,
        data: { "kevin": "sup"},
        beforeSend: function(xhr, settings){
          settings.data = JSON.stringify({
               "custdetails": {     "text": $scope.getCurrentValue(),     "completion": {       "field": "Cust_Suggest"     }   }
          });
          // console.log(this);
        }
      }
    },
    replace: function(url, query){
      console.log(url,query);
      return url;
    }

  });
   
  // initialize the bloodhound suggestion engine
  numbers.initialize();

  $scope.getCurrentValue = function(){
    console.log($scope.selectedNumber);
      return $scope.selectedNumber;
  }

  $scope.filter = function(suggestions){
    console.log(suggestions);
    // var str = new S();
    var resultsArr = [];
    try{
      _.each(suggestions[1][0].options, function(val){
        resultsArr.push({num: _.titleize(val.text)})
      });
    // var suggestion = suggestions[1][0].options[0].text;
    // resultsArr.push({num: _.titleize(suggestion)});
  }catch(e){console.log(e);}
    return resultsArr;
  };
  
  $scope.numbersDataset = {
    displayKey: 'num',
    //numbers.ttAdapter()
    source: function(query, cb) {
      numbers.get(query, function(suggestions){
        cb( $scope.filter(suggestions) );
      });
    }
  };
  
  // $scope.addValue = function () {
  //   numbers.add({
  //     num: 'twenty'
  //   });
  // };
  
  // $scope.setValue = function () {
  //   $scope.selectedNumber = { num: 'seven' };
  // };
  
  // $scope.clearValue = function () {
  //   $scope.selectedNumber = null;
  // };

  
  // Typeahead options object
  $scope.exampleOptions = {
    highlight: true
  };
  
  // $scope.exampleOptionsNonEditable = {
  //   highlight: true,
  //   editable: false // the new feature
  // };
  
});
