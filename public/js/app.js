var app = angular.module('EmployeeApp', ['ui.router', 'ngMaterial', 'md.data.table', 'infinite-scroll']);

app.config(function($stateProvider) {

    $stateProvider
        .state('Employees', {
            url: '/Employees',
            templateUrl: 'templates/Employee.html',
            controller: 'EmployeeController as vm'
        })
        .state('EmployeeDetail', {
            url: '/EmployeeDetail',
            templateUrl: 'templates/EmployeeDetail.html',
            controller: 'EmployeeDetailController as vm'
        })
        //.otherwise({redirectTo:'/AddEmployeeDetail.html'});


});