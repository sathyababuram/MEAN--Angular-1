app.controller("EmployeeController", function($scope, $http, $state, $stateParams, $rootScope, $timeout) {
    var vm = this;
    var successdata = $rootScope.success;
    vm.newEmployee = [];
    vm.loading = false;

    vm.options = {
        rowSelection: true,
        multiSelect: true,
        autoSelect: true,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: false,
        limitSelect: true,
        pageSelect: true
    };

    vm.query = {
        limit: '15',
        page: '1'
    }
    vm.selected = [];
    vm.limitOptions = [3, 6, 9, {
        label: 'All',
        value: function() {
            return vm.employee ? vm.employee.count : 0;
        }
    }];
    // vm.employee = [vm.employee];
    vm.loadMore = function() {
        //console.log("inside fn");
        if (!!vm.loading)
            return;
        vm.query.page = parseInt(vm.query.page) + 1;
        console.log(JSON.stringify(vm.query.page));
        vm.getEmployee(true);
        vm.loading = false;
    }


    vm.getEmployee = function(onloading) {
        vm.loading = true;
        if (!onloading) {
            vm.query.page = 1;
            vm.employee = [];
        }
        $http.post('/api/search', vm.query)
            .success(function(data) {
                vm.loading = false;
                vm.employee = vm.employee.concat(data.data);
                if (!!data.data && data.data.length == 0) {
                    vm.loading = true;
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    vm.getEmployee();

    vm.onPaginate = function(page, limit) {
        console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.limit);
        console.log('Page: ' + page + ' Limit: ' + limit);

        vm.promise = $timeout(function() {
            vm.getEmployee();
        }, 2000);
    };
    // vm.editEmployee = function(EmployeeId) {
    //     $state.go("EmployeeDetail", { employeeid: EmployeeId });
    //     $rootScope.id = EmployeeId;
    //     //var EmployeeeId = $stateParams.EmployeeeId;

    // }

    vm.deleteEmployee = function(index) {
        if (confirm("Delete Employee Detail") == true) {
            console.log(vm.employee[index]);
            $http.post('/api/deleteEmployee', vm.employee[index]),
                function(deleteErr, deletedDetail) {
                    console.log("inside post");
                    if (deleteErr) {
                        console.log(deleteErr);
                    } else {
                        console.log(deletedDetail);
                    }
                }

        } else {
            console.log("Delete Cancelled");
        }
        vm.getEmployee();
    }


    vm.addEmployee = function(index) {

        $http.post('/api/addEmployee', vm.newEmployee[index]),
            function(err, newEmployees) {

                //  console.log("inside post");
                if (err) {
                    console.log("Error in Adding Employee Detail");
                } else {
                    console.log(newEmployees);
                    //  $state.go("Employees");
                }
            }
            //  vm.newEmployee[index] = vm.newEmployee;
        vm.getEmployee();
        vm.remove();
    }

    vm.remove = function(element) {
        vm.newEmployee.splice(element, 1);
    }

    vm.AddFields = function() {
        vm.newEmployee.push({
            name: '',
            email: '',
            number: '',
            message: ''
        });
    }
    vm.sorting = {
        order: "-name"
    }
    vm.columns = {
        name: 'Name',
        email: 'Email',
        number: 'Number',
        message: 'Message',
        action: "Action"
    };



    vm.updateEmployee = function(index) {

        $http.post('/api/updateEmployee/', vm.employee[index]),
            function(err, newEmployee) {
                if (err) {
                    console.log("Error in Adding Employee Detail");
                } else {
                    console.log(newEmployee);

                }

            }


    }
});