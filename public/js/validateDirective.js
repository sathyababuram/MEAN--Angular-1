// app.directive('formValidate', function() {
//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         template: '<div ng-messages="Employeeform.name.$error"> < div ng - message = "NameValidator" > Name is required < /div>',
//         link: function(scope, element, attr, ctrl) {
//             function formValidate(ngModelValue) {
//                 if ([A - z].test(ngModelValue)) {
//                     ctrl.$setValidity('formValidate', false)
//                 } else {
//                     ctrl.$setValidity('formValidate', true)
//                 }
//                 // if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(ngModelValue)) {
//                 //     ctrl.$setValidity('emailValidator', false)
//                 // } else {
//                 //     ctrl.$setValidity('emailValidator', true)
//                 // }
//                 // if ([0 - 9].test(ngModelValue)) {
//                 //     ctrl.$setValidity('phoneValidator', false)
//                 // } else {
//                 //     ctrl.$setValidity('phoneValidator', true)
//                 // }
//                 // if ([A - z].test(ngModelValue)) {
//                 //     ctrl.$setValidity('messageValidator', false);
//                 // } else {
//                 //     ctrl.$setValidity('messageValidator', true);
//                 // }
//                 return ngModelValue;
//             }
//             ctrl.$parsers.push(formValidate);
//         }
//     };
// });

app.directive("formValidate", function() {
    return {
        require: 'ngModel',
        template: '<p>Please Fill this Field</p>',
        //scope: true,
        link: function(scope, elem, attr) {

            scope.$watch(attr['ngModel'], function(value) {

                    var errorElement = angular.element("<p class='NameError'>This field is required!</p>");

                    if (attr['name'] == "name") {
                        if (((value || '').toString()).length == 0) {
                            elem.bind('focus', function() {
                                errorElement.insertAfter(elem);
                                return;

                            })

                        } else {
                            $('.NameError').remove();

                        }
                    }
                })
                // var select = angular.element("<p>Name is Required</p>");
                // elem.append(select);
                // if (attr.name === "name") {  
                //     elem.bind('blur', function() {
                //         scope.$apply(function() {
                //             elem.replaceWith(select);
                //         })
                //     })
                // }
        }
    }
});