var app = angular.module('chainStorageApp',[]);

app.controller('ChainStorageCtrl', function($scope, $http) {

  $scope.dataItem = "";

  $scope.transactions = [];

  $scope.sendToBlockChain = function(string) {
    var data = { data: string };
    $http.post(
      '/chain',
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        function(success) {
          $scope.transactions.push(success.data.transaction);
        },
        function(fail) {
          alert(JSON.stringify(fail));
        }
      );
  }

  $scope.getDataFromChain = function(transaction) {
    $http.get('/chain/' + transaction).then(
      function(success) {
        var blockMessage = "";
        if(success.data.block == null) {
          blockMessage = "Transaction [" + transaction + "] is not in block yet.";
        } else {
          blockMessage = "Block " + success.data.block;
        }
        alert("Data [" + success.data.data + "]\n" + blockMessage);
      },
      function(fail) {
        alert(JSON.stringify(fail));
      }
    )
  }

});
