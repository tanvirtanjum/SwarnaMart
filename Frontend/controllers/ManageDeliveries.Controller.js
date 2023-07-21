app.controller('ManageDeliveries.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService) {
    $scope.Controls = {
        Div: {
            Hide: $cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName == 'Customer' ? 1 : 0,
        },
        Alert: {
            Hide: 1,
            Class: '',
            Message: ''
        },
        Validation: {
            IsValidAdd: true
        },
    }

    $scope.Orders = [];
    $scope.DeliveryByList = [];
    $scope.OrderCartItems = [];

    if($cookies.get(AppService.COOKIE_NAME) == null || $cookies.get(AppService.COOKIE_NAME) == undefined) {
        $location.url('/');
    } else {}

    function GetDeliveryByList() {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = '';
        url = AppService.API_BASE_URL+'users/get/role/4'

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.DeliveryByList = [];
                angular.forEach(response.data, function(item) {
                    var obj = {Value : item.UserId, Name : item.Name};
                    $scope.DeliveryByList.push(obj);
                });
            } else{
                $scope.DeliveryByList = [];
            }
        }, function errorCallback(response) {
            
        });
    }

    function GetOrders() {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = '';
        if($cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName == 'Customer') {
            url = AppService.API_BASE_URL+'orders/get/customer/'+$cookies.getObject(AppService.COOKIE_NAME).users.UserId;
        } else if($cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName == 'Admin' || $cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName == 'Salesman') {
            url = AppService.API_BASE_URL+'orders/get'
        } else {
            url = AppService.API_BASE_URL+'orders/get/deliveryman/'+$cookies.getObject(AppService.COOKIE_NAME).users.UserId;
        }

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Orders = response.data;
            } else{
                $scope.Orders = [];
            }
        }, function errorCallback(response) {
            $scope.Orders = [];
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

    GetOrders();
    GetDeliveryByList();

    $scope.CancelOrderRequest = function(index) {
        $scope.CancelOrderId = $scope.Orders[index].OrderId;
        $('#cancelOrderModal').modal('show');
    }

    $scope.CancelOrder = function() {
        var body = {
            data : {
                Deliveryman : 0,
                DeliveryDate: 0,
                ApprovedBy: 0,
                Status: -1,
            }
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        console.log("body", body);
        var url = AppService.API_BASE_URL+'orders/put/'+$scope.CancelOrderId;

        $http.put(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.CancelOrderId = 0;
                GetOrders(); 
                $('#cancelOrderModal').modal('hide');                
                $scope.$digest();
            } else{
                
            }
        }, function errorCallback(response) {
            
        });
    }

    function getCartItems(CartId){
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'cartitems/get/cartref/'+CartId;

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $('#orderDetailsModal').modal('show');
                $scope.OrderCartItems = response.data;;
            } else{
                $scope.OrderCartItems = [];
            }
        }, function errorCallback(response) {
            $scope.OrderCartItems = [];
        });
    }

    $scope.ShowOrder = function(index) {
        $scope.OrderOrderId = $scope.Orders[index].OrderId;
        $scope.OrderCode = $scope.Orders[index].CartCode;
        $scope.OrderName = $scope.Orders[index].Name;
        $scope.OrderDate = $scope.Orders[index].OrderDate;
        $scope.OrderPhone = $scope.Orders[index].Phone;
        $scope.OrderAddress = $scope.Orders[index].Addess;
        $scope.OrderStatus = $scope.Orders[index].Status;
        $scope.OrderApprovedBy = $scope.Orders[index].ApprovedBy;
        $scope.OrderTotalPayable = $scope.Orders[index].TotalPayable;
        $scope.OrderDeliveryDate = $scope.Orders[index].DeliveryDate;
        var DeliveryManIndex = (!$scope.Orders[index].Deliveryman || $scope.Orders[index].Deliveryman.length <= 0) 
                            ? -1
                            : $scope.DeliveryByList.findIndex(x => x.Value ==  $scope.Orders[index].Deliveryman);
        $scope.DeliveryBy = $scope.DeliveryByList[DeliveryManIndex];
        
        getCartItems($scope.Orders[index].Cart);
    }

    $scope.DeliverOrder = function(Status) {
        var body = {
            data : {
                Deliveryman : $scope.DeliveryBy.Value,
                DeliveryDate: 0,
                ApprovedBy: $scope.OrderApprovedBy,
                Status: Status,
            }
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'orders/put/'+$scope.OrderOrderId;

        $http.put(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.OrderOrderId = 0;
                GetOrders(); 
                $('#orderDetailsModal').modal('hide');                
                // $scope.$digest();
            } else{
                
            }
        }, function errorCallback(response) {
            
        });
    }
}); 