app.controller('ManageDeliveries.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService) {
    $scope.Controls = {
        Div: {
            For: $cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName,
        },
        Alert: {
            Hide: 1,
            Class: '',
            Message: ''
        },
        Validation: {
            IsValidAdd: true
        }
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

        var url = AppService.API_BASE_URL+'orders/get/group/exclude/5';

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Employees = response.data;
            } else{
                $scope.Employees = [];
            }
        }, function errorCallback(response) {
            $scope.Employees = [];
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