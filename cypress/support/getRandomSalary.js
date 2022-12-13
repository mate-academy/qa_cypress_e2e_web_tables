const getRandomSalary = () => {
  const salaries = [];

  for (let i = 2000; i <= 15000; i += 500) {
    salaries.push(i);
  }

  return salaries[Math.floor(Math.random() * salaries.length)];
};

module.exports = { getRandomSalary };
