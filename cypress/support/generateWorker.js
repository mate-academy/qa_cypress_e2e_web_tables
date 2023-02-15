import { faker } from '@faker-js/faker';


function generateWorker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName}.${lastName}@mail.com`;
  const age = faker.datatype.number({min: 18, max: 65});
  const salary = faker.datatype.number({min:5000, max: 10000});
  const departments = ['Insurance', 'Compliance', 'Legal', 'IT', 'Finance'];
  const randomDepartmentIndex = Math.floor(Math.random() * 5);  
  const department = departments[randomDepartmentIndex];

 return {
   firstName,
   lastName,
   email,
   age,
   salary,
   department
  };
}

module.exports = { generateWorker };