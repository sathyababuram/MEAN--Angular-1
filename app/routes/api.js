var Employee = require('../model/employee');


module.exports = function(router) {

    router.get('/getDetail/:id', function(req, res) {
        Employee.findById({ "_id": req.params.id }, function(err, getDetail) {
            if (!!err) {
                console.log(err);
                res.send({ error: err });
            } else {
                console.log(getDetail);
                res.send({ error: null, getDetail: getDetail });
            }
        });
    });

    router.post('/search', function(req, res) {
        if (req.body.limit == '' && req.body.limit == '') {
            req.body.limit = 2;
            req.body.page = 1;
        }
        var limit = parseInt(req.body.limit);
        var page = parseInt(req.body.page);

        var PageSkip = (page - 1);
        var query = Employee.find({ "status": "A" });

        query.limit(limit);
        query.skip(PageSkip * limit);
        // query.count();
        // console.log(query.count);
        //console.log(page - 1, limit);
        query.exec(function(err, employeedetail) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                // console.log(employeedetail);
                Employee.find({ "status": "A" }).count({}, function(err, count) {
                    console.log("Number of Employee:", count);
                    res.send({ count: count, data: employeedetail });
                });
            }
        });

    });

    router.post('/updateEmployee', function(req, res) {
        Employee.update({
                "_id": req.body._id
            }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    number: req.body.number,
                    message: req.body.message
                }

            },

            function(err, updatedDetail) {
                console.log(req.body);
                if (err) {
                    console.log(err);
                } else {
                    res.send(updatedDetail);
                    console.log(updatedDetail);
                }
            })
    });

    router.post('/deleteEmployee', function(req, res) {
        console.log(req.body.id);
        Employee.update({
                "_id": req.body._id
            }, {
                $set: {
                    "status": "D"
                }
            },

            function(err, deletedDetail) {
                console.log(req.body);
                if (err) {
                    console.log(err);
                } else {
                    // res.send(deletedDetail);
                    console.log(deletedDetail);

                }
            })
    });

    router.post('/addEmployee', function(req, res) {

        Employee.create({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            message: req.body.message,
            //status :"A"

        }, function(err) {
            if (err) {
                res.send(err);
            } else {
                console.log({ msg: "Employee Created Successfully" });
            }


        });
    });



    return router;
}






/* router.get('/employee',function(req,res){
        Employee.find(function(err,employee){
            if(err){
                res.send(err);
            }
            else{
                res.send(employee);
            }
        });
    });

    router.get('/editEmployee',function(req,res){
        console.log(req.params);
        console.log("Employee ID :"+req.params.id);
        Employee.findById(req.params.id,function(err,employee){
            if(err){
                res.send(err);
            }
            else{
                res.send(employee);
            }
        });
    });

    router.post('/updateEmployee',function(req,res){
        console.log("Updated Employee Id:" + req.body.id);
        Employee.update({"_id":req.body.id},function(err,employee){
            if(!err){
                res.send(err);
            }
            else{
                res.send(employee);
            }
        });
    });
*/


/*router.delete('/api/employee/:employee_id', function(req, res) {
    Employee.remove({
        _id : req.params.employee_id
    }, function(err, employee) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Employee.find(function(err, employee) {
            if (err)
                res.send(err)
            res.json(employee);
        });
    });
});*/