app.controller("initController", function ($scope, $state) {
    $scope.gotoEmployeePage = function () {
        $state.go("Employees");
    }
});