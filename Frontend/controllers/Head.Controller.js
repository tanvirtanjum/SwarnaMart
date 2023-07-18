app.controller('Head.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService) {
    $scope.setTitle = function(title) {
        document.title = title;
    }

    $scope.GenerateTitle = function() {
        setTimeout(function(){
            if($location.$$path == '/Products'){
                $scope.setTitle("Products | Swarna Mart");
            }
        
            if($location.$$path == '/ManageEmployees'){
                $scope.setTitle("Employees | Swarna Mart");
            }
        
            if($location.$$path == '/ManageCustomers'){
                $scope.setTitle("Customers | Swarna Mart");
            }

            if($location.$$path == '/ManageProducts'){
                $scope.setTitle("Inventories | Swarna Mart");
            }

            if($location.$$path == '/ManageOrders'){
                $scope.setTitle("Orders | Swarna Mart");
            } 

            if($location.$$path == '/ManageDeliveries'){
                $scope.setTitle("Deliveries | Swarna Mart");
            }

            if($location.$$path == '/ManageSales'){
                $scope.setTitle("Sales | Swarna Mart");
            }

            if($location.$$path == '/ManageAccounts'){
                $scope.setTitle("Accounts | Swarna Mart");
            }
        }, 100);
    };
});