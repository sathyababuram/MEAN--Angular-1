app.controller("EmployeeDetailController", function ($scope,$http,$state,$rootScope) {

    var vm = this;

    vm.employee = {};
    vm.employee.name = '';
    vm.employee.email = '';
    vm.employee.number = '';
    vm.employee.mesage = '';

    vm.goto = function(){
       $state.go("Employees");
    }

    if(!!$rootScope && !!$rootScope.id){
        var EmployeeID = $rootScope.id;
        $http.get('/api/getDetail/'+EmployeeID).success(function(getDetail){
            console.log(JSON.stringify(getDetail));
               if(!!getDetail && !!getDetail.error){
                console.log(getDetail.error);
                return;
               }
                vm.employee = getDetail.getDetail;
                console.log(getDetail.getDetail);
           });
    }

        vm.addemployee = function(){
            var postURL = '/api/addEmployee';
            if(!!$rootScope && !!$rootScope.id){
                postURL = '/api/updateEmployee/';
            }
            var newEmployee =  vm.employee;
           $http.post(postURL,newEmployee),function(err,newEmployee){
               if(err){
                   console.log("Error in Adding Employee Detail");
               }
               else{
                   console.log(newEmployee);
                  
               }
              
           }
           $state.go("Employees");
        } 
        
        
        // if($rootScope.id){
        // var EmployeeID = $rootScope.id;
       

    //    $scope.updateEmployee = function(){
    //     var updatedDetail = $scope.employee;
    //        $http.post('/api/updateEmployee/' +EmployeeID,updatedDetail).success(function(updatedDetail,err){
    //         if(err){
    //             console.log(updatedDetail);
    //         }
    //         else{
    //             console.log(err);
    //         }
    //        });
    //        $state.go("Employees");
    //    }
    // }
    
});