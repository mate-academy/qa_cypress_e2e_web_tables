function generateUser() {
  function generateUsername(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomlyGenUsername = '';

    randomlyGenUsername +=
    upperCharacters.charAt(Math.floor(Math.random() * upperCharacters.length));

    for (let i = 0; i < length; i++) {
      randomlyGenUsername +=
      characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomlyGenUsername;
  }

  function generateMobileNumber(length) {
    let mobNumber = '';

    for (let i = 0; i < length; i++) {
      mobNumber += `${Math.floor(Math.random() * 10)}`;
    }

    return mobNumber;
  }

  function generateName(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomlyGenName = '';

    randomlyGenName +=
    upperCharacters.charAt(Math.floor(Math.random() * upperCharacters.length));

    for (let i = 0; i < length; i++) {
      randomlyGenName +=
      characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomlyGenName;
  }

  function generatePassword(length) {
    const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-_';
    let randomlyGenPassword = '';

    for (let i = 0; i < length; i++) {
      randomlyGenPassword +=
      characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomlyGenPassword;
  }

  function generateBirthday() {
    const daysInMonth = {
      January: 31,
      February: 28,
      March: 31,
      April: 30,
      May: 31,
      June: 30,
      July: 31,
      August: 31,
      September: 30,
      October: 31,
      November: 30,
      December: 31
    };

    const months = Object.keys(daysInMonth);
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const days = daysInMonth[randomMonth];
    const randomDay = Math.floor(Math.random() * days) + 1;
    const randomYear =
    Math.floor(Math.random() * (new Date().getFullYear() - 1900)) + 1900;

    return {
      day: randomDay,
      month: randomMonth,
      year: randomYear
    };
  }

  function getRandomSubjectLetters() {
    const subjects = [
      'English',
      'Computer Science',
      'Chemistry',
      'History',
      'Maths',
      'Accounting',
      'Arts',
      'Social Studies',
      'Physics',
      'Hindi',
      'Economics',
      'Biology',
      'Civics'
    ];

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const getRandomLetters = (subject) => {
      let randomLength = Math.floor(Math.random() * subject.length) + 1;
      randomLength = Math.max(randomLength, 3);
      const firstLetters = subject.slice(0, randomLength).toUpperCase();
      return firstLetters;
    };

    const shuffledSubjects = shuffleArray(subjects);
    const maxNumSubjects = shuffledSubjects.length;
    const numObjects =
    Math.max(Math.floor(Math.random() * (maxNumSubjects + 1)), 1);

    const selectedSubjects = shuffledSubjects.slice(0, numObjects);

    let abbreviatedResult = '';
    let fullNamesResult = '';

    selectedSubjects.forEach((subject, index) => {
      abbreviatedResult += getRandomLetters(subject);
      fullNamesResult += subject;
      if (index !== selectedSubjects.length - 1) {
        abbreviatedResult += '{enter}';
        fullNamesResult += ', ';
      }
    });

    abbreviatedResult += '{enter}';

    return {
      abbreviatedNames: abbreviatedResult,
      fullNames: fullNamesResult
    };
  }

  function generateRandomAddress() {
    const streets = [
      'Main Street',
      'Park Avenue',
      'Elm Street',
      'Maple Avenue',
      'Oak Street',
      'Cedar Avenue',
      'Pine Street',
      'River Road',
      'Sunset Boulevard',
      'First Street'
    ];

    const cities = [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose'
    ];

    const states = [
      'NY',
      'CA',
      'IL',
      'TX',
      'AZ',
      'PA',
      'TX',
      'CA',
      'TX',
      'CA'
    ];

    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomNumber = Math.floor(Math.random() * 1000) + 1; // Generate a random number between 1 and 1000

    return `${randomNumber} ${randomStreet}, ${randomCity}, ${randomState}`;
  }

  function generateStates() {
    let realState;
    const array = [];
    let keystrokes = '';
    const repeatCount = Math.floor(Math.random() * 4);

    for (let i = 0; i < repeatCount; i++) {
      keystrokes += '{downarrow}';
    }

    keystrokes += '{enter}';

    if (keystrokes === '{enter}') {
      realState = 'NCR';
    } else if (keystrokes === '{downarrow}{enter}') {
      realState = 'Uttar Pradesh';
    } else if (keystrokes === '{downarrow}{downarrow}{enter}') {
      realState = 'Haryana';
    } else if (keystrokes === '{downarrow}{downarrow}{downarrow}{enter}') {
      realState = 'Rajasthan';
    }

    array[0] = keystrokes;
    array[1] = realState;

    return array;
  }

  function generateCityKeystrokes(state) {
    const array = [];
    let realCity;
    let keystrokes = '';
    const maxDownarrows =
    (state === 'NCR' || state === 'Uttar Pradesh') ? 2 : 1;

    const numDownarrows = Math.floor(Math.random() * (maxDownarrows + 1));

    for (let i = 0; i < numDownarrows; i++) {
      keystrokes += '{downarrow}';
    }

    keystrokes += '{enter}';

    if (state === 'NCR') {
      if (keystrokes === '{enter}') {
        realCity = 'Delhi';
      } else if (keystrokes === '{downarrow}{enter}') {
        realCity = 'Gurgaon';
      } else if (keystrokes === '{downarrow}{downarrow}{enter}') {
        realCity = 'Noida';
      }
    } else if (state === 'Uttar Pradesh') {
      if (keystrokes === '{enter}') {
        realCity = 'Agra';
      } else if (keystrokes === '{downarrow}{enter}') {
        realCity = 'Lucknow';
      } else if (keystrokes === '{downarrow}{downarrow}{enter}') {
        realCity = 'Merrut';
      }
    } else if (state === 'Haryana') {
      if (keystrokes === '{enter}') {
        realCity = 'Karnal';
      } else if (keystrokes === '{downarrow}{enter}') {
        realCity = 'Panipat';
      }
    } else if (state === 'Rajasthan') {
      if (keystrokes === '{enter}') {
        realCity = 'Jaipur';
      } else if (keystrokes === '{downarrow}{enter}') {
        realCity = 'Jaiselmer';
      }
    }

    array[0] = keystrokes;
    array[1] = realCity;

    return array;
  }

  function gendaaa() {
    const gendaArray = [];
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    let genda;

    if (randomNumber === 1) {
      genda = 'Male';
    } else if (randomNumber === 2) {
      genda = 'Female';
    } else {
      genda = 'Other';
    }

    gendaArray[0] = randomNumber;
    gendaArray[1] = genda;

    return gendaArray;
  }

  function getRandomDepartment() {
    const departments = [
      'HR',
      'Finance',
      'IT',
      'Marketing',
      'Sales',
      'Customer Service',
      'Operations',
      'R&D',
      'Legal',
      'Administration'
    ];

    const randomIndex = Math.floor(Math.random() * departments.length);

    return departments[randomIndex];
  }

  const username = generateUsername(8);
  const password = generatePassword(10);
  const email = `${username}@gmail.pop`;
  const firstName = generateName(8);
  const lastName = generateName(8);
  const mobile = generateMobileNumber(10);
  const date = generateBirthday();
  const subjects = getRandomSubjectLetters();
  const adres = generateRandomAddress();
  const state = generateStates();
  const city = generateCityKeystrokes(state[1]);
  const genda = gendaaa();
  const age = Math.floor(Math.random() * 90) + 1;
  const salary = Math.floor(Math.random() * 100000) + 1;
  const department = getRandomDepartment();
  const rows = [
    '5 rows',
    '10 rows',
    '20 rows',
    '25 rows',
    '50 rows',
    '100 rows'];
  const userNumber = Math.floor(Math.random() * 3) + 1;
  const checkRow = [
    firstName,
    lastName,
    age,
    email,
    salary,
    department
  ];

  return {
    email,
    password,
    username,
    firstName,
    lastName,
    mobile,
    date,
    subjects,
    adres,
    state,
    city,
    genda,
    age,
    salary,
    department,
    rows,
    userNumber,
    checkRow
  };
}

module.exports = { generateUser };
