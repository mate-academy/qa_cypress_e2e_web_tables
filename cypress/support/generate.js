const { faker } = require("@faker-js/faker");

function generateUser() {
	const randomNumber = Math.floor(Math.random() * 100);
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	const email = `${firstName}.${lastName}@email.com`;
	const age = 18 + randomNumber;
	const salary = randomNumber * 100;
	const department = "sales";

	return { firstName, lastName, email, age, salary, department };
}
module.exports = { generateUser };
