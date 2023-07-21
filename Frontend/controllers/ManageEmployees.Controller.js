app.controller('ManageEmployees.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService, Upload) {
    $scope.Controls = {
        EmployeeIndex: null,
        SaveBTN: {
            Hide: 0
        },
        UpdateBTN: {
            Hide: 1
        },
        UserName: {
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

    $scope.Employees = [];

    if($cookies.get(AppService.COOKIE_NAME) == null || $cookies.get(AppService.COOKIE_NAME) == undefined) {
        $location.url('/');
    } else {
        if($cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName != 'Admin') {
            $location.url('/');
        }
    }

    function GetEmployees() {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'profiles/get/group/exclude/5';

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

    GetEmployees();

    function Validate() {
        $scope.Controls.Validation.IsValidAdd = true;
        $scope.Controls.Alert.Message = '';

        if($scope.Name == null || $scope.Name.trim().length <= 0 || $scope.Name == '') {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Name is required!';
        }

        if($scope.GroupId == null || $scope.GroupId.Value <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Role is required!';
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

        if($scope.GroupId == null || $scope.GroupId <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Role is required!';
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
                GroupId: $scope.GroupId,
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
                $scope.Controls.Alert.Message = 'Employee Added Successfully!';
                
                setTimeout(function(){
                    $scope.Controls.Alert.Class = '';
                    $scope.Controls.Alert.Hide = 1;
                    $scope.Controls.Alert.Message = '';
                    GetEmployees();
                    $scope.ShowHideEmployee(null);
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
                    $scope.ShowHideEmployee(null);
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
                $scope.ShowHideEmployee(null);
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
                    UserId: $scope.Employees[$scope.Controls.EmployeeIndex].UserId,
                    Name: $scope.Name,
                    Gender: $scope.Gender,
                    Phone: $scope.Phone,
                    Address: $scope.Address,
                    UserName: $scope.RegUserName,
                    Password: $scope.RegPassword,
                    GroupId: $scope.GroupId,
                    LoginAccess: $scope.LoginAccess,
                }
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            console.log("body", body);
            var url = AppService.API_BASE_URL+'profiles/'+$scope.Employees[$scope.Controls.EmployeeIndex].ProfileId+'/put';
    
            $http.put(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    $scope.Controls.Alert.Class = 'alert-success';
                    $scope.Controls.Alert.Hide = 0;
                    $scope.Controls.Alert.Message = 'Employee Updated Successfully!';
                    
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        GetEmployees();
                        $scope.ShowHideEmployee(null);
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
                        $scope.ShowHideEmployee(null);
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

    $scope.ShowHideEmployee = function (index) {
        if(index == null) {
            $scope.Controls.EmployeeIndex = null;
            $scope.Controls.SaveBTN.Hide = 0;
            $scope.Controls.UpdateBTN.Hide = 1;
            $scope.Controls.UserName.Disable = 0;
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
        } else if($scope.Controls.EmployeeIndex == null) {
            $scope.Controls.EmployeeIndex = index;
            $scope.Controls.SaveBTN.Hide = 1;
            $scope.Controls.UpdateBTN.Hide = 0;
            $scope.Controls.UserName.Disable = 1;
            $scope.Controls.TableShowHideBTN.Text = 'Hide';
            $scope.Controls.TableShowHideBTN.Class = 'btn-dark';

            var GenderIndex = (!$scope.Employees[index].Gender || $scope.Employees[index].Gender.length <= 0) 
                            ? -1
                            : $scope.Genders.findIndex(x => x.Value ==  $scope.Employees[index].Gender);
            var GroupIndex = (!$scope.Employees[index].GroupId || $scope.Employees[index].GroupId.length <= 0)
                            ? -1
                            : $scope.Roles.findIndex(x => x.Value ==  $scope.Employees[index].GroupId);


            $scope.Name = $scope.Employees[index].Name;
            $scope.Gender = $scope.Genders[GenderIndex];
            $scope.Phone = $scope.Employees[index].Phone;
            $scope.Address = $scope.Employees[index].Addess;
            $scope.RegUserName = $scope.Employees[index].UserName;
            $scope.RegPassword = $scope.Employees[index].Password;
            $scope.GroupId = $scope.Roles[GroupIndex];
            $scope.LoginAccess = $scope.Employees[index].LoginAccess;
        } else {
            $scope.Controls.EmployeeIndex = null;
            $scope.Controls.SaveBTN.Hide = 0;
            $scope.Controls.UpdateBTN.Hide = 1;
            $scope.Controls.UserName.Disable = 0;
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
        }
    }

    $scope.DeleteEmployee = function (index, deleteFlag) {
        $scope.Controls.Delete.EmployeeName = '';
        if($scope.Controls.EmployeeIndex == null) {
            $scope.Controls.EmployeeIndex = index;
            $scope.Controls.Delete.EmployeeName = $scope.Employees[index].Name;
            $('#deleteEmployeeModal').modal('show');
        } else {
            if(deleteFlag){
                var body = {
                    data : {}
                }
        
                var config = [{
                    headers: {
                      'XXX': 0
                    },     
                }];
    
                var url = AppService.API_BASE_URL+'profiles/'+$scope.Employees[$scope.Controls.EmployeeIndex].ProfileId+'/delete';
    
                $http.delete(url, body, config).then(function successCallback(response) {
                    $('#deleteEmployeeModal').modal('hide');
                    $scope.Controls.EmployeeIndex = null;
                    if(response.status == 204){
                        $scope.Controls.Alert.Class = 'alert-success';
                        $scope.Controls.Alert.Hide = 0;
                        $scope.Controls.Alert.Message = 'Product Deleted Successfully!';
        
                        GetEmployees();
                        
                        setTimeout(function(){
                            $scope.Controls.Alert.Class = '';
                            $scope.Controls.Alert.Hide = 1;
                            $scope.Controls.Alert.Message = '';
                            $scope.ShowHideEmployee(null);
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
                            $scope.ShowHideEmployee(null);
                            $scope.$digest();
                        }, 1500);
                    }
                }, function errorCallback(response) {
                    $('#deleteEmployeeModal').modal('hide');
                    $scope.Controls.EmployeeIndex = null;
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
            } else{
                $scope.Controls.EmployeeIndex = index;
                $scope.Controls.Delete.EmployeeName = $scope.Employees[index].Name;
                $('#deleteEmployeeModal').modal('show');
            }
        }
    }

    $scope.SearchEmployeeChanged = function () {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = ($scope.SearchEmployee == undefined || $scope.SearchEmployee == null || !$scope.SearchEmployee || $scope.SearchEmployee.trim().length <= 0)                  
                    ? AppService.API_BASE_URL+'profiles/get/group/exclude/5'
                    : AppService.API_BASE_URL+'profiles/get/name/'+$scope.SearchEmployee+'/group/exclude/5';

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
});