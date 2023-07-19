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
            $scope.ProductId = $scope.Products[index].ProductId;
            $scope.PreviewImage = $scope.Products[index].ImagePath;
            $scope.Title = $scope.Products[index].Title;
            $scope.UnitPrice = $scope.Products[index].UnitPrice;
            $scope.Description = $scope.Products[index].Description;
            $scope.Quantity = 1;
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

    function addItemsToCart() {
        var body = {
            data : {
                Product: $scope.ProductId,
                Quantity: $scope.Quantity,
                CartRef: $cookies.getObject(AppService.COOKIE_NAME).carts.CartId,
            }
        }
        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'cartitems/post';

        $http.post(url, body, config).then(function successCallback(response) {
            if(response.status == 201){
                $('#addCartModal').modal('hide');
                alert('Added to cart successfully.');
            } else{
                alert('Error occurred while adding to cart.');
            }
        }, function errorCallback(response) {
            
        });
    }

    function updateItemsToCart(id) {
        var body = {
            data : {
                Product: $scope.ProductId,
                Quantity: $scope.Quantity,
                CartRef: $cookies.getObject(AppService.COOKIE_NAME).carts.CartId,
            }
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'cartitems/put/'+id;

        $http.put(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                alert('Updated cart successfully.');
                $('#addCartModal').modal('hide');
            } else{
                alert('Error occurred while updating cart.');
            }
        }, function errorCallback(response) {
            
        });
    }

    $scope.AddCartBTNClicked = function() {
        if($scope.Quantity == null || $scope.Quantity == '' || $scope.Quantity <= 0) {
            alert('Please enter valid quantity.');
        } else {
            var body = {
                data : {}
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            var url = AppService.API_BASE_URL+'cartitems/get/product/'+$scope.ProductId+'/cartref/'+$cookies.getObject(AppService.COOKIE_NAME).carts.CartId;
    
            $http.get(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    updateItemsToCart(response.data[0].CartItemId);
                } else{
                    addItemsToCart();
                }
            }, function errorCallback(response) {
                
            });
        }
    }
});