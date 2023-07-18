app.controller('ManageProducts.Controller', function ($scope, $http, $location, $routeParams, $rootScope, $window, $cookies, AppService, Upload) {
    $scope.Controls = {
        ProductIndex: null,
        UpdateImage: 0,
        SaveBTN: {
            Hide: 0
        },
        UpdateBTN: {
            Hide: 1
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
            ProductName: ''
        }
    }

    $scope.Products = [];

    if($cookies.get(AppService.COOKIE_NAME) == null || $cookies.get(AppService.COOKIE_NAME) == undefined) {
        $location.url('/');
    } else {
        if($cookies.getObject(AppService.COOKIE_NAME).usergroups.GroupName  != 'Admin') {
            $location.url('/');
        }
    }

    function GetProducts() {
        var body = {
            data : {}
        }

        var config = [{
            headers: {
              'XXX': 0
            },     
        }];

        var url = AppService.API_BASE_URL+'products/get';

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Products = response.data;
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

    GetProducts();

    $scope.SelectFile = function (e) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $scope.PreviewImage = e.target.result;
            $scope.Controls.UpdateImage = 1;
            $scope.$digest();
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    function Validate() {
        $scope.Controls.Validation.IsValidAdd = true;
        $scope.Controls.Alert.Message = '';

        if($scope.Title == null || $scope.Title.trim().length <= 0 || $scope.Title == '') {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Title is required!';
        }

        if($scope.UnitPrice == null|| $scope.UnitPrice <= 0) {
            $scope.Controls.Validation.IsValidAdd = false;
            $scope.Controls.Alert.Message += 'Unit Price must be greater than 0!';
        }

        return $scope.Controls.Validation.IsValidAdd;
    }

    $scope.uploadFile = function(ProductId, PrivFilePath) {
        var file = $scope.Avatar;
  
        var formData = new FormData();
        formData.append('Avatar', file);
  
        if(PrivFilePath != null && PrivFilePath != undefined && PrivFilePath != '') {
            var url = AppService.API_BASE_URL+'products/'+ProductId+'/post/upload?PrivFilePath='+PrivFilePath+'';
        } else{
            var url = AppService.API_BASE_URL+'products/'+ProductId+'/post/upload';
        }

        Upload.upload({
            url: url,
            data: { file: file }
        }).then(function(response) {
            // Handle the server's response
            console.log('Here', response.data);
        }).catch(function(error) {
            // Handle any errors
            console.error(error);
        });
    }

    $scope.SaveBTNClicked = function () {
        if(Validate()) {
            var body = {
                data : {
                    Title : $scope.Title,
                    Description : $scope.Description,
                    UnitPrice : $scope.UnitPrice,
                    IsStock : $scope.IsStock,
                    ImagePath : '',
                }
            }
 
            var config = [{
                headers: {
                    "XXX": ""
                }  
            }];
    
            var url = AppService.API_BASE_URL+'products/post';

            $http.post(url, body, config).then(function successCallback(response) {
                if(response.status == 201){
                    $scope.Controls.Alert.Class = 'alert-success';
                    $scope.Controls.Alert.Hide = 0;
                    $scope.Controls.Alert.Message = 'Product Added Successfully!';
    
                    if($scope.Controls.UpdateImage == 1){
                        $scope.uploadFile(response.data[1][0].LastInsertId, null);
                    }
                    
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        GetProducts();
                        $scope.ShowHideProduct(null);
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
                        $scope.ShowHideProduct(null);
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
                    $scope.ShowHideProduct(null);
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
                    Title : $scope.Title,
                    Description : $scope.Description,
                    UnitPrice : $scope.UnitPrice,
                    IsStock : $scope.IsStock,
                    ImagePath : ''
                }
            }
    
            var config = [{
                headers: {
                  'XXX': 0
                },     
            }];
    
            console.log("body", body);
            var url = AppService.API_BASE_URL+'products/'+$scope.Products[$scope.Controls.ProductIndex].ProductId+'/put';
    
            $http.put(url, body, config).then(function successCallback(response) {
                if(response.status == 200){
                    $scope.Controls.Alert.Class = 'alert-success';
                    $scope.Controls.Alert.Hide = 0;
                    $scope.Controls.Alert.Message = 'Product Updated Successfully!';
                    
                    if($scope.Controls.UpdateImage == 1){
                        $scope.uploadFile($scope.Products[$scope.Controls.ProductIndex].ProductId, $scope.Products[$scope.Controls.ProductIndex].ImagePath);
                    }
                    
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        GetProducts();
                        $scope.ShowHideProduct(null);
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
                        $scope.ShowHideProduct(null);
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
                    $scope.ShowHideProduct(null);
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

    $scope.ShowHideProduct = function (index) {
        if(index == null) {
            $scope.Controls.ProductIndex = null;
            $scope.Controls.SaveBTN.Hide = 0;
            $scope.Controls.UpdateBTN.Hide = 1;
            $scope.Controls.UpdateImage = 0;
            $scope.Controls.TableShowHideBTN.Text = 'Show';
            $scope.Controls.TableShowHideBTN.Class = 'btn-light';

            $scope.Title = '';
            $scope.Description = '';
            $scope.UnitPrice = '';
            $scope.IsStock = 0;
            $scope.Avatar = null;
            $scope.PreviewImage = null;
        } else if($scope.Controls.ProductIndex == null) {
            $scope.Controls.ProductIndex = index;
            $scope.Controls.SaveBTN.Hide = 1;
            $scope.Controls.UpdateImage = 0;
            $scope.Controls.UpdateBTN.Hide = 0;
            $scope.Controls.TableShowHideBTN.Text = 'Hide';
            $scope.Controls.TableShowHideBTN.Class = 'btn-dark';

            $scope.Title = $scope.Products[index].Title;
            $scope.Description = $scope.Products[index].Description;
            $scope.UnitPrice = $scope.Products[index].UnitPrice;
            $scope.IsStock = $scope.Products[index].IsStock;
            $scope.PreviewImage = AppService.API_BASE_URL+'downloads?path='+$scope.Products[index].ImagePath;

        } else {
            $scope.Controls.ProductIndex = null;
            $scope.Controls.SaveBTN.Hide = 0;
            $scope.Controls.UpdateImage = 0;
            $scope.Controls.UpdateBTN.Hide = 1;
            $scope.Controls.TableShowHideBTN.Text = 'Show';
            $scope.Controls.TableShowHideBTN.Class = 'btn-light';

            $scope.Title = '';
            $scope.Description = '';
            $scope.UnitPrice = '';
            $scope.IsStock = 0;
            $scope.Avatar = null;
            $scope.PreviewImage = null;
        }
    }

    $scope.DeleteProduct = function (index, deleteFlag) {
        $scope.Controls.Delete.ProductName = '';
        if($scope.Controls.ProductIndex == null) {
            $scope.Controls.ProductIndex = index;
            $scope.Controls.Delete.ProductName = $scope.Products[index].Title;
            $('#deleteProductModal').modal('show');
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
    
                var url = AppService.API_BASE_URL+'products/'+$scope.Products[$scope.Controls.ProductIndex].ProductId+'/delete?PrivFilePath='+$scope.Products[$scope.Controls.ProductIndex].ImagePath+'';
    
                $http.delete(url, body, config).then(function successCallback(response) {
                    $('#deleteProductModal').modal('hide');
                    $scope.Controls.ProductIndex = null;
                    if(response.status == 204){
                        $scope.Controls.Alert.Class = 'alert-success';
                        $scope.Controls.Alert.Hide = 0;
                        $scope.Controls.Alert.Message = 'Product Deleted Successfully!';
        
                        GetProducts();
                        
                        setTimeout(function(){
                            $scope.Controls.Alert.Class = '';
                            $scope.Controls.Alert.Hide = 1;
                            $scope.Controls.Alert.Message = '';
                            $scope.ShowHideProduct(null);
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
                            $scope.ShowHideProduct(null);
                            $scope.$digest();
                        }, 1500);
                    }
                }, function errorCallback(response) {
                    $('#deleteProductModal').modal('hide');
                    $scope.Controls.ProductIndex = null;
                    $scope.Controls.Alert.Class = 'alert-danger';
                    $scope.Controls.Alert.Hide = 0;
                    $scope.Controls.Alert.Message = 'Unable to connect to server!';
        
                    setTimeout(function(){
                        $scope.Controls.Alert.Class = '';
                        $scope.Controls.Alert.Hide = 1;
                        $scope.Controls.Alert.Message = '';
                        $scope.ShowHideProduct(null);
                        $scope.$digest();
                    }, 1500);
                });
            } else{
                $scope.Controls.ProductIndex = index;
                $scope.Controls.Delete.ProductName = $scope.Products[index].Title;
                $('#deleteProductModal').modal('show');
            }
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
                    ? AppService.API_BASE_URL+'products/get'
                    : AppService.API_BASE_URL+'products/get/title/'+$scope.SearchProduct;

        $http.get(url, body, config).then(function successCallback(response) {
            if(response.status == 200){
                $scope.Products = response.data;
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
});