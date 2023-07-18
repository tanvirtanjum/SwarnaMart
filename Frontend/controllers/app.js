var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngFileUpload']);

app.service('AppService', function() {
    this.API_BASE_URL = 'http://localhost:3000/api/';
    this.COOKIE_NAME = 'Credentials';
    this.GENDER = [
        {Value : "Male", Name : "Male"},
        {Value : "Female", Name : "Female"},
        {Value : "Other", Name : "Other"}
    ];
    this.ROLE = [
        {Value : "1", Name : "Admin"},
        {Value : "3", Name : "Salesman"},
        {Value : "4", Name : "Deliveryman"}
    ];
});


app.config(function ($routeProvider) {
    $routeProvider.when('/Products', {
        templateUrl: '/views/Products.html',
        controller: 'Products.Controller'
    });

    $routeProvider.when('/ManageEmployees', {
        templateUrl: '/views/ManageEmployees.html',
        controller: 'ManageEmployees.Controller'
    });

    $routeProvider.when('/ManageCustomers', {
        templateUrl: '/views/ManageCustomers.html',
        controller: 'ManageCustomers.Controller'
    });

    $routeProvider.when('/ManageProducts', {
        templateUrl: '/views/ManageProducts.html',
        controller: 'ManageProducts.Controller'
    });

    $routeProvider.when('/ManageOrders', {
        templateUrl: '/views/ManageOrders.html',
        controller: 'ManageOrders.Controller'
    });

    $routeProvider.when('/ManageDeliveries', {
        templateUrl: '/views/ManageDeliveries.html',
        controller: 'ManageDeliveries.Controller'
    });

    $routeProvider.when('/ManageSales', {
        templateUrl: '/views/ManageSales.html',
        controller: 'ManageSales.Controller'
    });

    $routeProvider.when('/ManageAccounts', {
        templateUrl: '/views/ManageAccounts.html',
        controller: 'ManageAccounts.Controller'
    });

    $routeProvider.otherwise({ 
        redirectTo: '/Products' 
    });
});