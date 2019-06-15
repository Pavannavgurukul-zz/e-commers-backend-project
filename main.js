module.exports = function(departments, knex) {
  departments.get('/', (request, response, next) => {
    var query = knex.select('*').from('department').then((departmentList) => {
      console.log("\nDepartment List:\n", departmentList);
      response.json(departmentList);
    });
  });

  departments.get('/:department_id', (request, response, next) => {
    var department_id = request.params.department_id;
    var query = knex.select('*').from('department').where('department_id', department_id).then((department) => {
      if (department.length == 0) {
        var errMsg = {
          "error": {
            "status": 400,
            "code": "DEP_02",
            "message": "Don'exist department with this ID.",
            "field": "department_id"
          }
        }
        console.log("\nDepartment:\n", "Don'exist department with this ID.");
        return response.json(errMsg);
      }
      console.log("\nDepartment:\n", department[0]);
      response.json(department);

    });
  });

};
