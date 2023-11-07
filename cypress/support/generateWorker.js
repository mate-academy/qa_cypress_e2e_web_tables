function addWorker() {
    const firstName = 'Anna';
    const lastName = 'Ivanova';
    const email = `${lastName}@gmail.com`;
    const age = Math.random().toString().slice(2, 4); 
    const salary = Math.random().toString().slice(2, 6);

    return { firstName, lastName, email, age, salary };
}
 
module.exports = { addWorker };