app.controller('ManageCustomers.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService) {
    $scope.Controls = {
        CustomerIndex: null,
        SaveBTN: {
            Hide: 0
        },
        UpdateBTN: {
            Hide: 1
        },
        UserName: {
            Disable: 0
        },
        Password: {
            Disable: 0
        },
        TableShowHideBTN: {
            Text: 'Show',
            Class: 'btn-light'
        },
        Alert: {
            Hide: 1,
            Class: '',
            Message: ''
        },
        Validation: {
            IsValidAdd: true
        },
        Delete: {
            EmployeeName: ''
        }
    }

    $scope.Genders = AppService.GENDER;
    $scope.Roles = AppService.ROLE;

    $scope.Customers = [];

    if($cookies.get(AppService.COOKIE_NAME) == null || $cookies.get(AppService.COOKIE_NAME) == undefined) {
        $location.url('/');
    } else {
        if($cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName != 'Admin') {
            $location.url('/');
        }
    }

    function GetCustomers() {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'profiles/get/group/5';

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Customers = response.data;
            } else{
                $scope.Customers = [];
            }
        }, function errorCallback(response) {
            $scope.Customers = [];
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

    GetCustomers();

    function Validate() {
        $scope.Controls.Validation.IsValidAdd = true;
        $scope.Controls.Alert.Message = '';

        if($scope.Name == null || $scope.Name.trim().length <= 0 || $scope.Name == '') {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Name is required!';
        }

        if($scope.Gender == null || $scope.Gender.Name.length <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Gender is required!';
        }

        if($scope.Address == null || $scope.Address.trim().length <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Address is required!';
        }

        if($scope.RegUserName == null || $scope.RegUserName.trim().length <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'UserName is required!';
        }

        if($scope.RegPassword == null || $scope.RegPassword.trim().length <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Password is required!';
        }

        return $scope.Controls.Validation.IsValidAdd;
    }

    function addProfile() {
        var body = {
            data : {
                Name: $scope.Name,
                Gender: $scope.Gender,
                Phone: $scope.Phone,
                Address: $scope.Address,
                UserName: $scope.RegUserName,
                Password: $scope.RegPassword,
                GroupId: { Value: 5 },
                LoginAccess: $scope.LoginAccess,
            }
        }

        var config = [{
            headers: {
                "XXX": ""
            }  
        }];

        var url = AppService.API_BASE_URL+'profiles/post';

        $http.post(url, body, config).then(function successCallback(response) {
            if(response.status == 201){
                $scope.Controls.Alert.Class = 'alert-success';
                $scope.Controls.Alert.Hide = 0;
                $scope.Controls.Alert.Message = 'Customer Added Successfully!';
                
                setTimeout(function(){
                    $scope.Controls.Alert.Class = '';
                    $scope.Controls.Alert.Hide = 1;
                    $scope.Controls.Alert.Message = '';
                    GetCustomers();
                    $scope.ShowHideCustomer(null);
                    $scope.$digest();
                }, 1500);
            } else{
                $scope.Controls.Alert.Class = 'alert-warning';
                $scope.Controls.Alert.Hide = 0;
                $scope.Controls.Alert.Message = 'Something Went Wrong!';

                setTimeout(function(){
                    $scope.Controls.Alert.Class = '';
                    $scope.Controls.Alert.Hide = 1;
                    $scope.Controls.Alert.Message = '';
                    $scope.ShowHideCustomer(null);
                    $scope.$digest();
                }, 1500);
            }
        }, function errorCallback(response) {
            $scope.Controls.Alert.Class = 'alert-danger';
            $scope.Controls.Alert.Hide = 0;
            $scope.Controls.Alert.Message = 'Unable to connect to server!';

            setTimeout(function(){
                $scope.Controls.Alert.Class = '';
                $scope.Controls.Alert.Hide = 1;
                $scope.Controls.Alert.Message = '';
                $scope.ShowHideCustomer(null);
                $scope.$digest();
            }, 1500);
        });
    }

    $scope.SaveBTNClicked = function () {
        if(Validate()) {
            var body = {
                data : {}
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            var url = AppService.API_BASE_URL+'users/get/username/'+$scope.RegUserName;
    
            $http.get(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    $scope.Controls.Alert.Class = 'alert-warning';
                    $scope.Controls.Alert.Hide = 0;
                    $scope.Controls.Alert.Message = 'User Name Exists!';
                    $scope.RegUserName = '';
        
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        $scope.$digest();
                    }, 1500);
                } else if(response.status == 204){
                    addProfile();
                } else{}
            }, function errorCallback(response) {
                $scope.Controls.Alert.Class = 'alert-danger';
                $scope.Controls.Alert.Hide = 0;
                $scope.Controls.Alert.Message = 'Unable to connect to server!';
    
                setTimeout(function(){
                    $scope.Controls.Alert.Class = '';
                    $scope.Controls.Alert.Hide = 1;
                    $scope.Controls.Alert.Message = '';
                    $scope.ShowHideEmployee(null);
                    $scope.$digest();
                }, 1500);
            });
        } else {
            $scope.Controls.Alert.Class = 'alert-warning';
            $scope.Controls.Alert.Hide = 0;
            
            setTimeout(function(){
                $scope.Controls.Alert.Class = '';
                $scope.Controls.Alert.Hide = 1;
                $scope.Controls.Alert.Message = '';
                $scope.$digest();
            }, 1500);
        }
    }

    $scope.UpdateBTNClicked = function () {
        if(Validate()) {
            var body = {
                data : {
                    UserId: $scope.Customers[$scope.Controls.CustomerIndex].UserId,
                    Name: $scope.Name,
                    Gender: $scope.Gender,
                    Phone: $scope.Phone,
                    Address: $scope.Address,
                    UserName: $scope.RegUserName,
                    Password: $scope.RegPassword,
                    GroupId: { Value: 5 },
                    LoginAccess: $scope.LoginAccess,
                }
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            console.log("body", body);
            var url = AppService.API_BASE_URL+'profiles/'+$scope.Customers[$scope.Controls.CustomerIndex].ProfileId+'/put';
    
            $http.put(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    $scope.Controls.Alert.Class = 'alert-success';
                    $scope.Controls.Alert.Hide = 0;
                    $scope.Controls.Alert.Message = 'Customer Updated Successfully!';
                    
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        GetCustomers();
                        $scope.ShowHideCustomer(null);
                        $scope.$digest();
                    }, 1500);
                } else{
                    $scope.Controls.Alert.Class = 'alert-warning';
                    $scope.Controls.Alert.Hide = 0;
                    $scope.Controls.Alert.Message = 'Something Went Wrong!';
    
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        $scope.ShowHideCustomer(null);
                        $scope.$digest();
                    }, 1500);
                }
            }, function errorCallback(response) {
                $scope.Controls.Alert.Class = 'alert-danger';
                $scope.Controls.Alert.Hide = 0;
                $scope.Controls.Alert.Message = 'Unable to connect to server!';
    
                setTimeout(function(){
                    $scope.Controls.Alert.Class = '';
                    $scope.Controls.Alert.Hide = 1;
                    $scope.Controls.Alert.Message = '';
                    $scope.ShowHideCustomer(null);
                    $scope.$digest();
                }, 1500);
            });
        } else {
            $scope.Controls.Alert.Class = 'alert-warning';
            $scope.Controls.Alert.Hide = 0;
            
            setTimeout(function(){
                $scope.Controls.Alert.Class = '';
                $scope.Controls.Alert.Hide = 1;
                $scope.Controls.Alert.Message = '';
                $scope.$digest();
            }, 1500);
        }
    }

    $scope.ShowHideCustomer = function (index) {
        if(index == null) {
            $scope.Controls.CustomerIndex = null;
            $scope.Controls.SaveBTN.Hide = 0;
            $scope.Controls.UpdateBTN.Hide = 1;
            $scope.Controls.UserName.Disable = 0;
            $scope.Controls.Password.Disable = 0;
            $scope.Controls.TableShowHideBTN.Text = 'Show';
            $scope.Controls.TableShowHideBTN.Class = 'btn-light';

            $scope.Name = '';
            $scope.Gender = $scope.Genders[-1];
            $scope.Phone = '';
            $scope.Address = '';
            $scope.RegUserName = '';
            $scope.RegPassword = '';
            $scope.GroupId = $scope.Roles[-1];
            $scope.LoginAccess = 0;
        } else if($scope.Controls.CustomerIndex == null) {
            $scope.Controls.CustomerIndex = index;
            $scope.Controls.SaveBTN.Hide = 1;
            $scope.Controls.UpdateBTN.Hide = 0;
            $scope.Controls.UserName.Disable = 1;
            $scope.Controls.Password.Disable = 1;
            $scope.Controls.TableShowHideBTN.Text = 'Hide';
            $scope.Controls.TableShowHideBTN.Class = 'btn-dark';

            var GenderIndex = (!$scope.Customers[index].Gender || $scope.Customers[index].Gender.length <= 0) 
                            ? -1
                            : $scope.Genders.findIndex(x => x.Value ==  $scope.Customers[index].Gender);
            
            $scope.Name = $scope.Customers[index].Name;
            $scope.Gender = $scope.Genders[GenderIndex];
            $scope.Phone = $scope.Customers[index].Phone;
            $scope.Address = $scope.Customers[index].Addess;
            $scope.RegUserName = $scope.Customers[index].UserName;
            $scope.RegPassword = $scope.Customers[index].Password;
            $scope.LoginAccess = $scope.Customers[index].LoginAccess;
        } else {
            $scope.Controls.CustomerIndex = null;
            $scope.Controls.SaveBTN.Hide = 0;
            $scope.Controls.UpdateBTN.Hide = 1;
            $scope.Controls.UserName.Disable = 0;
            $scope.Controls.Password.Disable = 0;
            $scope.Controls.TableShowHideBTN.Text = 'Show';
            $scope.Controls.TableShowHideBTN.Class = 'btn-light';

            $scope.Name = '';
            $scope.Phone = '';
            $scope.Address = '';
            $scope.RegUserName = '';
            $scope.RegPassword = '';
            $scope.LoginAccess = 0;
        }
    }

    $scope.SearchCustomerChanged = function () {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = ($scope.SearchCustomer == undefined || $scope.SearchCustomer == null || !$scope.SearchCustomer || $scope.SearchCustomer.trim().length <= 0)                  
                    ? AppService.API_BASE_URL+'profiles/get/group/5'
                    : AppService.API_BASE_URL+'profiles/get/name/'+$scope.SearchCustomer+'/group/5';

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Customers = response.data;
            } else{
                $scope.Customers = [];
            }
        }, function errorCallback(response) {
            $scope.Customers = [];
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