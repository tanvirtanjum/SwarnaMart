app.controller('ManageAccounts.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService) {
    $scope.Controls = {
        Div: {
            Hide: 1,
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

    $scope.filter = 4;
    $scope.Orders = [];
    $scope.DeliveryByList = [];
    $scope.OrderCartItems = [];

    if($cookies.get(AppService.COOKIE_NAME) == null || $cookies.get(AppService.COOKIE_NAME) == undefined) {
        $location.url('/');
    } else {
        if($cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName == 'Admin') {
            
        } else {
            $location.url('/');
        }
    }

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
        url = AppService.API_BASE_URL+'orders/get/status/2';

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Orders = response.data;
                $scope.Total = $scope.Orders.reduce(function (acc, obj) { return acc + obj.TotalPayable; }, 0);
            } else{
                $scope.Orders = [];
                $scope.Total = 0;
            }
        }, function errorCallback(response) {
            $scope.Orders = [];
            $scope.Total = 0;
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
        $scope.OrderTotalPayable = $scope.Orders[index].TotalPayable;
        $scope.OrderDeliveryDate = $scope.Orders[index].DeliveryDate;
        var DeliveryManIndex = (!$scope.Orders[index].Deliveryman || $scope.Orders[index].Deliveryman.length <= 0) 
                            ? -1
                            : $scope.DeliveryByList.findIndex(x => x.Value ==  $scope.Orders[index].Deliveryman);
        $scope.DeliveryBy = $scope.DeliveryByList[DeliveryManIndex];
        
        getCartItems($scope.Orders[index].Cart);
    }

    $scope.filterOption = function() {
        $scope.Controls.Div.Hide = $scope.filterChoose == null || !$scope.filterChoose || $scope.filterChoose < 1 ? 1 : 0;
        $scope.MonthYear = null;
    }

    function filterOrders(api) {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = '';
        url = api;

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Orders = response.data;
                $scope.Total = $scope.Orders.reduce(function (acc, obj) { return acc + obj.TotalPayable; }, 0);
            } else{
                $scope.Orders = [];
                $scope.Total = 0;
            }
        }, function errorCallback(response) {
            $scope.Orders = [];
            $scope.Total = 0;
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

    $scope.filterList = function() {
        // console.log("filterList", $scope.MonthYear.toString().split(' ')[1], $scope.MonthYear.toString().split(' ')[3]);
        console.log("filterList", $scope.MonthYear.toLocaleDateString().split('/')[0], $scope.MonthYear.toLocaleDateString().split('/')[2]);
        if(!$scope.filterChoose || $scope.filterChoose == null || $scope.filterChoose < 1) {
            GetOrders();
        } else if($scope.filterChoose == 1) {
            var api = AppService.API_BASE_URL+'orders/get/status/2/orderdate/month/'+$scope.MonthYear.toLocaleDateString().split('/')[0]+'/year/'+$scope.MonthYear.toLocaleDateString().split('/')[2];
            filterOrders(api);
        } else {
            var api = AppService.API_BASE_URL+'orders/get/status/2/deliverydate/month/'+$scope.MonthYear.toLocaleDateString().split('/')[0]+'/year/'+$scope.MonthYear.toLocaleDateString().split('/')[2];
            filterOrders(api);
        }
        
    }
}); 