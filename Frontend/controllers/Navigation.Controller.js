app.controller('Navigation.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService) {
    $scope.LinkControlls = {
        Products: {
            Hide: 0,
            Class: 'active'
        },
        Manage: {
            Hide: 1,
            Class: ''
        },
        ManageEmployees: {
            Hide: 0,
            Class: ''
        },
        ManageCustomers: {
            Hide: 0,
            Class: ''
        },
        ManageProducts: {
            Hide: 0,
            Class: ''
        },
        ManageOrders: {
            Hide: 0,
            Class: ''
        },
        ManageDeliveries: {
            Hide: 0,
            Class: ''
        },
        ManageSales: {
            Hide: 0,
            Class: ''
        },
        ManageAccounts: {
            Hide: 0,
            Class: ''
        },
        Cart: {
            Hide: 1,
            Class: ''
        },
        SignIn: {
            Hide: 0,
            Class: '',
            LoginMessage: {
                Hide: 1,
                Class: '',
                Message: ''
            }
        },
        Setting: {
            Hide: 0,
            Class: '',
            Message: {
                Hide: 1,
                Class: '',
                Message: ''
            }
        },
        UserMenu: {
            Hide: 1,
            Class: ''
        }
    }

    $scope.Controls = {
        Alert: {
            Hide: 1,
            Class: '',
            Message: ''
        },
        Validation: {
            IsValidAdd: true
        },
        Cart: {
            Message : '',
        }
    }

    $scope.Profile = {
        UserName: '',
        Name: '',
        Gender: '',
        Phone: '',
        Address: ''
    };

    $scope.CartItems = [];

    $scope.Genders = AppService.GENDER

    function LinkControllSettings(Data){
        console.log('LinkControllSettings', Data);
        if(Data && Data.usergroups.GroupName == 'Admin'){
            $scope.LinkControlls.Products.Hide = 0;
            $scope.LinkControlls.Manage.Hide = 0;
            $scope.LinkControlls.ManageEmployees.Hide = 0;
            $scope.LinkControlls.ManageCustomers.Hide = 0;
            $scope.LinkControlls.ManageProducts.Hide = 0;
            $scope.LinkControlls.ManageOrders.Hide = 0;
            $scope.LinkControlls.ManageDeliveries.Hide = 0;
            $scope.LinkControlls.ManageSales.Hide = 0;
            $scope.LinkControlls.ManageAccounts.Hide = 0;
            $scope.LinkControlls.Cart.Hide = 1;
            $scope.LinkControlls.SignIn.Hide = 1;
            $scope.LinkControlls.UserMenu.Hide = 0;
        } else if(Data && Data.usergroups.GroupName  == 'Salesman'){
            $scope.LinkControlls.Products.Hide = 0;
            $scope.LinkControlls.Manage.Hide = 0;
            $scope.LinkControlls.ManageEmployees.Hide = 1;
            $scope.LinkControlls.ManageCustomers.Hide = 1;
            $scope.LinkControlls.ManageProducts.Hide = 1;
            $scope.LinkControlls.ManageOrders.Hide = 0;
            $scope.LinkControlls.ManageDeliveries.Hide = 1;
            $scope.LinkControlls.ManageSales.Hide = 0;
            $scope.LinkControlls.ManageAccounts.Hide = 1;
            $scope.LinkControlls.Cart.Hide = 1;
            $scope.LinkControlls.SignIn.Hide = 1;
            $scope.LinkControlls.UserMenu.Hide = 0;
        } else if(Data && Data.usergroups.GroupName  == 'Deliveryman'){
            $scope.LinkControlls.Products.Hide = 0;
            $scope.LinkControlls.Manage.Hide = 0;
            $scope.LinkControlls.ManageEmployees.Hide = 1;
            $scope.LinkControlls.ManageCustomers.Hide = 1;
            $scope.LinkControlls.ManageProducts.Hide = 1;
            $scope.LinkControlls.ManageOrders.Hide = 1;
            $scope.LinkControlls.ManageDeliveries.Hide = 0;
            $scope.LinkControlls.ManageSales.Hide = 1;
            $scope.LinkControlls.ManageAccounts.Hide = 1;
            $scope.LinkControlls.Cart.Hide = 1;
            $scope.LinkControlls.SignIn.Hide = 1;
            $scope.LinkControlls.UserMenu.Hide = 0;
        } else if(Data && Data.usergroups.GroupName  == 'Customer'){
            $scope.LinkControlls.Products.Hide = 0;
            $scope.LinkControlls.Manage.Hide = 0;
            $scope.LinkControlls.ManageEmployees.Hide = 1;
            $scope.LinkControlls.ManageCustomers.Hide = 1;
            $scope.LinkControlls.ManageProducts.Hide = 1;
            $scope.LinkControlls.ManageOrders.Hide = 1;
            $scope.LinkControlls.ManageDeliveries.Hide = 0;
            $scope.LinkControlls.ManageSales.Hide = 1;
            $scope.LinkControlls.ManageAccounts.Hide = 1;
            $scope.LinkControlls.Cart.Hide = 0;
            $scope.LinkControlls.SignIn.Hide = 1;
            $scope.LinkControlls.UserMenu.Hide = 0;
        } else{
            $scope.LinkControlls.Products.Hide = 0;
            $scope.LinkControlls.Manage.Hide = 1;
            $scope.LinkControlls.ManageEmployees.Hide = 0;
            $scope.LinkControlls.ManageCustomers.Hide = 0;
            $scope.LinkControlls.ManageProducts.Hide = 0;
            $scope.LinkControlls.ManageOrders.Hide = 0;
            $scope.LinkControlls.ManageDeliveries.Hide = 0;
            $scope.LinkControlls.ManageSales.Hide = 0;
            $scope.LinkControlls.ManageAccounts.Hide = 0;
            $scope.LinkControlls.Cart.Hide = 1;
            $scope.LinkControlls.SignIn.Hide = 0;
            $scope.LinkControlls.UserMenu.Hide = 1;
        }
    }

    function ProfileSettings(Data){
        if(Data && Data.usergroups && Data.users && Data.profiles){
            $scope.Profile.UserName = Data.users.UserName;
            $scope.Profile.Name = Data.profiles.Name;
            $scope.Profile.Gender = Data.profiles.Gender;
            $scope.Profile.Phone = Data.profiles.Phone;
            $scope.Profile.Address = Data.profiles.Addess;

            $scope.Controls.Cart.Message = Data.carts.CartCode;
        } else{
            $scope.Profile.UserName = "";
            $scope.Profile.Name = "";
            $scope.Profile.Gender = "";
            $scope.Profile.Phone = "";
            $scope.Profile.Address = "";

            $scope.Controls.Cart.Message = "";
        }

        var GenderIndex = ($scope.Profile.Gender == "" || $scope.Profile.Gender.length <= 0) 
                            ? -1
                            : $scope.Genders.findIndex(x => x.Value == $scope.Profile.Gender);

        $scope.ProfileName = $scope.Profile.Name;
        $scope.ProfileGender = $scope.Genders[GenderIndex];
        $scope.ProfilePhone = $scope.Profile.Phone;
        $scope.ProfileAddress = $scope.Profile.Address;
        $scope.ProfileUserName = $scope.Profile.UserName;

        $scope.CartMessage = $scope.Controls.Cart.Message;
    }

    LinkControllSettings($cookies.getObject(AppService.COOKIE_NAME));

    ProfileSettings($cookies.getObject(AppService.COOKIE_NAME));
    
    $scope.urlActivator = function(){
        setTimeout(function(){
            if($location.$$path == '/Products'){
                $scope.LinkControlls.Products.Class = 'active';
                $scope.LinkControlls.ManageEmployees.Class = '';
            } else{
                $scope.LinkControlls.Products.Class = '';
                $scope.LinkControlls.ManageEmployees.Class = 'active';
            }
            $scope.$digest();
        }, 250);
    }

    function CreateCart(){
        var body = {
            data : {
                CreatedBy: $cookies.getObject(AppService.COOKIE_NAME).users.UserId,
                CartStatus: 0
            }
        }
        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'carts/post';

        $http.post(url, body, config).then(function successCallback(response) {
            if(response.status == 201){
                ResetCookie($cookies.getObject(AppService.COOKIE_NAME).users);
            } else{
                alert('Error occured while creating cart');
            }
        }, function errorCallback(response) {
            
        });
    }

    $scope.LoginBTNClicked = function(){
        $scope.LinkControlls.SignIn.LoginMessage.Class = 'alert-info';
        $scope.LinkControlls.SignIn.LoginMessage.Hide = 0;
        $scope.LinkControlls.SignIn.LoginMessage.Message = 'Please wait...';

        var body = {
            data : {
                UserName: $scope.UserName,
                Password: $scope.Password
            }
        }
        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'users/login';

        $http.post(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                console.log(response);
                if(response.data.users.LoginAccess == 1){
                    $cookies.putObject(AppService.COOKIE_NAME, response.data);
                    LinkControllSettings($cookies.getObject(AppService.COOKIE_NAME));
                    ProfileSettings($cookies.getObject(AppService.COOKIE_NAME));
                    $("#loginModal").modal("hide");
                    if($cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName == 'Customer'){
                        if($cookies.getObject(AppService.COOKIE_NAME).carts.CartId == null){
                            CreateCart();
                        }
                    }
                    $scope.LinkControlls.SignIn.LoginMessage.Class = '';
                    $scope.LinkControlls.SignIn.LoginMessage.Hide = 1;
                    $scope.LinkControlls.SignIn.LoginMessage.Message = '';
                } else{
                    $scope.LinkControlls.SignIn.LoginMessage.Class = 'alert-warning';
                    $scope.LinkControlls.SignIn.LoginMessage.Hide = 0;
                    $scope.LinkControlls.SignIn.LoginMessage.Message = 'Access Denied!';

                    setTimeout(function(){
                        $scope.LinkControlls.SignIn.LoginMessage.Class = '';
                        $scope.LinkControlls.SignIn.LoginMessage.Hide = 1;
                        $scope.LinkControlls.SignIn.LoginMessage.Message = '';
                        $scope.$digest();
                    }, 1500);
                }
            } else{
                $scope.LinkControlls.SignIn.LoginMessage.Class = 'alert-warning';
                $scope.LinkControlls.SignIn.LoginMessage.Hide = 0;
                $scope.LinkControlls.SignIn.LoginMessage.Message = 'Invalid Login Credentials!';

                setTimeout(function(){
                    $scope.LinkControlls.SignIn.LoginMessage.Class = '';
                    $scope.LinkControlls.SignIn.LoginMessage.Hide = 1;
                    $scope.LinkControlls.SignIn.LoginMessage.Message = '';
                    $scope.$digest();
                }, 1500);
            }
        }, function errorCallback(response) {
            $scope.LinkControlls.SignIn.LoginMessage.Class = 'alert-danger';
            $scope.LinkControlls.SignIn.LoginMessage.Hide = 0;
            $scope.LinkControlls.SignIn.LoginMessage.Message = 'Unable to connect to server!';

            setTimeout(function(){
                $scope.LinkControlls.SignIn.LoginMessage.Class = '';
                $scope.LinkControlls.SignIn.LoginMessage.Hide = 1;
                $scope.LinkControlls.SignIn.LoginMessage.Message = '';
                $scope.$digest();
            }, 1500);
        });
    }

    $scope.LogoutBTNClicked = function(){
        $cookies.remove(AppService.COOKIE_NAME);
        LinkControllSettings(null);
        ProfileSettings(null);
        $location.url('/');
    }

    function ResetCookie(data){
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'users/'+data.UserId+'/get';

        $http.get(url, body, config).then(function successCallback(response) {
            console.log(response);
            if(response.status == 200){
                $cookies.putObject(AppService.COOKIE_NAME, response.data);
                LinkControllSettings($cookies.getObject(AppService.COOKIE_NAME));
                ProfileSettings($cookies.getObject(AppService.COOKIE_NAME));
            } else{
                alert('Error occurred while resetting cookie.');
            }
        }, function errorCallback(response) {
            
        });
    }

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

        if($scope.RegPassword != null && $scope.RegPassword.trim().length <= 3) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Password length should be greater than 3!';
        } else {
            if($scope.RegPassword != $scope.ConfirmRegPassword) {
                $scope.Controls.Validation.IsValidAdd = false;
                $scope.Controls.Alert.Message += 'Incorrect Confirm Password!';
            }
        }

        return $scope.Controls.Validation.IsValidAdd;
    }

    $scope.SignupBTNClicked = function(){
        if(Validate()) {
            var body = {
                data : {
                    Name: $scope.Name,
                    Gender: $scope.Gender,
                    Phone: $scope.Phone,
                    Address: $scope.Address,
                    UserName: $scope.RegUserName,
                    Password: $scope.RegPassword,
                    GroupId: { Value: 5 },
                    LoginAccess: 1,
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
                    $scope.Controls.Alert.Message = 'Congratulations, Registered Successfully! [User Name: '+$scope.RegUserName+', Password: '+$scope.RegPassword+']';
                    
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        $("#signupModal").modal("hide");
                        $("#loginModal").modal("show");
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

    function ValidateProfileUpdate() {
        $scope.Controls.Validation.IsValidAdd = true;
        $scope.Controls.Alert.Message.Message = '';


        if($scope.ProfileGender == null || $scope.ProfileGender.Name.length <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.LinkControlls.Setting.Message.Message += 'Gender is required!';
        }

        if($scope.ProfilePhone == null || $scope.ProfilePhone.trim().length <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.LinkControlls.Setting.Message.Message += 'Phone No is required!';
        }

        if($scope.ProfileAddress == null || $scope.ProfileAddress.trim().length <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.LinkControlls.Setting.Message.Message += 'Address is required!';
        }

        return $scope.Controls.Validation.IsValidAdd;
    }

    $scope.UpdateProfileBTNClicked = function () {
        if(ValidateProfileUpdate()) {
            var body = {
                data : {
                    UserId: $cookies.getObject(AppService.COOKIE_NAME).users.UserId,
                    Name: $scope.ProfileName,
                    Gender: $scope.ProfileGender,
                    Phone: $scope.ProfilePhone,
                    Address: $scope.ProfileAddress,
                    UserName: $cookies.getObject(AppService.COOKIE_NAME).users.UserName,
                    Password: $cookies.getObject(AppService.COOKIE_NAME).users.Password,
                    GroupId: { Value: $cookies.getObject(AppService.COOKIE_NAME).users.GroupId },
                    LoginAccess: 1,
                }
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            console.log("body", body);
            var url = AppService.API_BASE_URL+'profiles/'+$cookies.getObject(AppService.COOKIE_NAME).profiles.ProfileId+'/put';
    
            $http.put(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    ResetCookie(body.data);
                    $scope.LinkControlls.Setting.Message.Class = 'alert-success';
                    $scope.LinkControlls.Setting.Message.Hide = 0;
                    $scope.LinkControlls.Setting.Message.Message = 'Profile Updated Successfully!';
                    
                    setTimeout(function(){
                        $scope.LinkControlls.Setting.Message.Class = '';
                        $scope.LinkControlls.Setting.Message.Hide = 1;
                        $scope.LinkControlls.Setting.Message.Message = '';
                        $scope.$digest();
                    }, 1500);
                } else{
                    $scope.LinkControlls.Setting.Message.Class = 'alert-warning';
                    $scope.LinkControlls.Setting.Message.Hide = 0;
                    $scope.LinkControlls.Setting.Message.Message = 'Something Went Wrong!';
    
                    setTimeout(function(){
                        $scope.LinkControlls.Setting.Message.Class = '';
                        $scope.LinkControlls.Setting.Message.Hide = 1;
                        $scope.LinkControlls.Setting.Message.Message = '';
                        $scope.$digest();
                    }, 1500);
                }
            }, function errorCallback(response) {
                $scope.LinkControlls.Setting.Message.Class = 'alert-warning';
                $scope.LinkControlls.Setting.Message.Hide = 0;
                $scope.LinkControlls.Setting.Message.Message = 'Something Went Wrong!';
    
                setTimeout(function(){
                    $scope.LinkControlls.Setting.Message.Class = '';
                    $scope.LinkControlls.Setting.Message.Hide = 1;
                    $scope.LinkControlls.Setting.Message.Message = '';
                    $scope.$digest();
                }, 1500);
            });
        } else {
            $scope.LinkControlls.Setting.Message.Class = 'alert-warning';
            $scope.LinkControlls.Setting.Message.Hide = 0;
            
            setTimeout(function(){
                $scope.LinkControlls.Setting.Message.Class = '';
                $scope.LinkControlls.Setting.Message.Hide = 1;
                $scope.LinkControlls.Setting.Message.Message = '';
                $scope.$digest();
            }, 1500);
        }
    }

    function ValidateProfileChangePassword() {
        $scope.Controls.Validation.IsValidAdd = true;
        $scope.Controls.Alert.Message.Message = '';


        if($scope.OldPassword != $cookies.getObject(AppService.COOKIE_NAME).users.Password) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.LinkControlls.Setting.Message.Message += 'Old password does\'t match!';
        }

        if($scope.NewPassword == null || $scope.NewPassword.trim().length <= 4) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.LinkControlls.Setting.Message.Message += 'New password should have at least 5 characters!';
        }

        if($scope.ConfirmNewPassword != $scope.NewPassword) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.LinkControlls.Setting.Message.Message += 'New password and confirm password does\'t match';
        }

        return $scope.Controls.Validation.IsValidAdd;
    }

    $scope.UpdatePasswordBTNClicked = function () {
        if(ValidateProfileChangePassword()) {
            var body = {
                data : {
                    UserId: $cookies.getObject(AppService.COOKIE_NAME).users.UserId,
                    Name: $cookies.getObject(AppService.COOKIE_NAME).profiles.Name,
                    Gender: { Value: $cookies.getObject(AppService.COOKIE_NAME).profiles.Gender },
                    Phone: $cookies.getObject(AppService.COOKIE_NAME).profiles.Phone,
                    Address: $cookies.getObject(AppService.COOKIE_NAME).profiles.Addess,
                    UserName: $cookies.getObject(AppService.COOKIE_NAME).users.UserName,
                    Password: $scope.NewPassword,
                    GroupId: { Value: $cookies.getObject(AppService.COOKIE_NAME).users.GroupId },
                    LoginAccess: 1,
                }
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            console.log("body", body);
            var url = AppService.API_BASE_URL+'profiles/'+$cookies.getObject(AppService.COOKIE_NAME).profiles.ProfileId+'/put';
    
            $http.put(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    ResetCookie(body.data);
                    $scope.LinkControlls.Setting.Message.Class = 'alert-success';
                    $scope.LinkControlls.Setting.Message.Hide = 0;
                    $scope.LinkControlls.Setting.Message.Message = 'Password Updated Successfully! Login Again!';
                    
                    setTimeout(function(){
                        $scope.LinkControlls.Setting.Message.Class = '';
                        $scope.LinkControlls.Setting.Message.Hide = 1;
                        $scope.LinkControlls.Setting.Message.Message = '';
                        $scope.LogoutBTNClicked();
                        $("#changePasswordModal").modal("hide");
                        $scope.$digest();
                    }, 1500);
                } else{
                    $scope.LinkControlls.Setting.Message.Class = 'alert-warning';
                    $scope.LinkControlls.Setting.Message.Hide = 0;
                    $scope.LinkControlls.Setting.Message.Message = 'Something Went Wrong!';
    
                    setTimeout(function(){
                        $scope.LinkControlls.Setting.Message.Class = '';
                        $scope.LinkControlls.Setting.Message.Hide = 1;
                        $scope.LinkControlls.Setting.Message.Message = '';
                        $scope.$digest();
                    }, 1500);
                }
            }, function errorCallback(response) {
                $scope.LinkControlls.Setting.Message.Class = 'alert-warning';
                $scope.LinkControlls.Setting.Message.Hide = 0;
                $scope.LinkControlls.Setting.Message.Message = 'Something Went Wrong!';
    
                setTimeout(function(){
                    $scope.LinkControlls.Setting.Message.Class = '';
                    $scope.LinkControlls.Setting.Message.Hide = 1;
                    $scope.LinkControlls.Setting.Message.Message = '';
                    $scope.$digest();
                }, 1500);
            });
        } else {
            $scope.LinkControlls.Setting.Message.Class = 'alert-warning';
            $scope.LinkControlls.Setting.Message.Hide = 0;
            
            setTimeout(function(){
                $scope.LinkControlls.Setting.Message.Class = '';
                $scope.LinkControlls.Setting.Message.Hide = 1;
                $scope.LinkControlls.Setting.Message.Message = '';
                $scope.$digest();
            }, 1500);
        }
    }

    $scope.GetCartItems = function (){
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'cartitems/get/cartref/'+$cookies.getObject(AppService.COOKIE_NAME).carts.CartId;

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.CartItems = response.data;
            } else{
                $scope.CartItems = [];
            }
        }, function errorCallback(response) {
            $scope.CartItems = [];
        });
    }

    $scope.UpdateQty = function (index, qty) {
        if($scope.CartItems[index].Quantity + qty >= 1) {
            var body = {
                data : {
                    Product: $scope.CartItems[index].Product,
                    Quantity: qty,
                    CartRef: $scope.CartItems[index].CartRef,
                }
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            var url = AppService.API_BASE_URL+'cartitems/put/'+$scope.CartItems[index].CartItemId;
    
            $http.put(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    $scope.GetCartItems();
                } else{
                    alert('Error occurred while updating cart.');
                }
            }, function errorCallback(response) {
                
            });
        } else {
            alert("Please, remove item from cart if you don't want to buy it! 0 quantity is not allowed!");
        }
    }

    $scope.RemoveCartItem = function (index) {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'cartitems/'+$scope.CartItems[index].CartItemId+'/delete';

        $http.delete(url, body, config).then(function successCallback(response) {
            if(response.status == 204){
                $scope.GetCartItems();
            } else{
                alert('Error occurred while deleting cart.');
            }
        }, function errorCallback(response) {
            alert('Error occurred while deleting cart.');
        });
    }

    $scope.PlaceOrder = function () {
        var body = {
            data : {
                CartCode: $cookies.getObject(AppService.COOKIE_NAME).carts.CartCode,
                CreatedBy: $cookies.getObject(AppService.COOKIE_NAME).carts.CreatedBy,
                CartStatus: 1,
            }
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'carts/put/'+$cookies.getObject(AppService.COOKIE_NAME).carts.CartId;

        $http.put(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                alert("Order Placed Successfully!")
                CreateCart();
                $scope.GetCartItems();
                $("#cartModal").modal("hide");
            } else{
                alert('Error occurred while updating cart.');
            }
        }, function errorCallback(response) {
            
        });
    }
});