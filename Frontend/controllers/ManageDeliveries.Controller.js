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

    if($cookies.get(AppService.COOKIE_NAME) == null || $cookies.get(AppService.COOKIE_NAME) == undefined) {
        $location.url('/');
    } else {}

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
        } else{
            url = AppService.API_BASE_URL+'orders/get'
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
}); 