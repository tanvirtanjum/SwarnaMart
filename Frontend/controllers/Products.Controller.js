app.controller('Products.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService) {
    $scope.Controls = {
        Alert: {
            Hide: 1,
            Class: '',
            Message: ''
        }
    }

    $scope.Products = [];

    GetProducts();

    function GetProducts() {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'products/get/stock/1';

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Products = response.data;
                console.log($scope.Products);
            } else{
                $scope.Products = [];
            }
        }, function errorCallback(response) {
            $scope.Products = [];
            $scope.Controls.Alert.Class = 'alert-danger';
            $scope.Controls.Alert.Hide = 0;
            $scope.Controls.Alert.Message = 'Unable to connect to server!';

            setTimeout(function(){
                $scope.Controls.Alert.Class = '';
                $scope.Controls.Alert.Hide = 1;
                $scope.Controls.Alert.Message = '';
                $scope.$digest();
            }, 1500);
        });
    }

    $scope.AddToCartBTNClicked = function(index) {
        console.log(index);
        if($cookies.get(AppService.COOKIE_NAME) == null || $cookies.get(AppService.COOKIE_NAME) == undefined) {          
            $scope.Controls.Alert.Hide = 0;
            $scope.Controls.Alert.Class = 'alert-warning';
            $scope.Controls.Alert.Message = 'Please login for purchasing.';

            setTimeout(function(){
                $scope.Controls.Alert.Hide = 1;
                $scope.Controls.Alert.Class = '';
                $scope.Controls.Alert.Message = '';
                $scope.$digest();

                $('#loginModal').modal('show');
            }, 1500);
        } else {
            $('#addCartModal').modal('show');
        }
    }

    $scope.SearchProductChanged = function () {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = ($scope.SearchProduct == undefined || $scope.SearchProduct == null || !$scope.SearchProduct || $scope.SearchProduct.trim().length <= 0)                  
                    ? AppService.API_BASE_URL+'products/get/stock/1'
                    : AppService.API_BASE_URL+'products/get/title/'+$scope.SearchProduct+'/stock/1';

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Products = response.data;
            } else{
                $scope.Controls.Alert.Class = 'alert-warning';
                $scope.Controls.Alert.Hide = 0;
                $scope.Controls.Alert.Message = 'No products found!';

                setTimeout(function(){
                    $scope.Controls.Alert.Class = '';
                    $scope.Controls.Alert.Hide = 1;
                    $scope.Controls.Alert.Message = '';
                    $scope.$digest();
                }, 1500);
                $scope.Products = [];
            }
        }, function errorCallback(response) {
            $scope.Products = [];
            $scope.Controls.Alert.Class = 'alert-danger';
            $scope.Controls.Alert.Hide = 0;
            $scope.Controls.Alert.Message = 'Unable to connect to server!';

            setTimeout(function(){
                $scope.Controls.Alert.Class = '';
                $scope.Controls.Alert.Hide = 1;
                $scope.Controls.Alert.Message = '';
                $scope.$digest();
            }, 1500);
        });
    }
});