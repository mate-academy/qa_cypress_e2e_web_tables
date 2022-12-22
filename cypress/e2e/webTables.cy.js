describe('Web Tables page', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1280, 1280);
  });
  
  const worker = {
    firstName: "Sergii",
    lastName: "Jonhsonyuk",
    email: "testsergii@com.ua",
    age: "34",
    salary: "1000",
    department: "QA",
  };

  it('Web tables filling', () => {
    cy.get('[class="-pagination"]');
    cy.get('[aria-label="rows per page"]').select('10');
    cy.get('[id="addNewRecordButton"]').click();
    cy.get('[placeholder="First Name"]').type(worker.firstName);
    cy.get('[placeholder="Last Name"]').type(worker.lastName);
    cy.get('[placeholder="name@example.com"]').type(worker.email);
    cy.get('[placeholder="Age"]').type(worker.age);
    cy.get('[placeholder="Salary"]').type(worker.salary);
    cy.get('[placeholder="Department"]').type(worker.department);
    cy.get('[id="submit"]').click();
    cy.get(':nth-child(4) > .rt-tr > :nth-child(2)').should("contain", "Jonhsonyuk");
    cy.get('[id="delete-record-4"]').click();
    cy.get('[id="delete-record-3"]').click();
    cy.get('[id="delete-record-2"]').click();
    cy.get('[id="delete-record-1"]').click();
  });

  const worker_new = {
    firstName: "Boris",
    lastName: "Bayden",
    email: "testboris@com.ua",
    age: "99",
    salary: "50000",
    department: "Goverment",
  };
  
  it('Editing workers', () => {
    cy.visit('/');
    cy.viewport(1280, 1280);
    cy.get(':nth-child(3) > .rt-tr > :nth-child(2)')
    cy.get('[id="edit-record-3"]').click();
    cy.get('[placeholder="First Name"]').type('{selectAll}{backspace}');
    cy.get('[placeholder="First Name"]').type(worker_new.firstName);
    cy.get('[placeholder="Last Name"]').type('{selectAll}{backspace}');
    cy.get('[placeholder="Last Name"]').type(worker_new.lastName);
    cy.get('[placeholder="name@example.com"]').type('{selectAll}{backspace}');
    cy.get('[placeholder="name@example.com"]').type(worker_new.email);
    cy.get('[placeholder="Age"]').type('{selectAll}{backspace}');
    cy.get('[placeholder="Age"]').type(worker_new.age);
    cy.get('[placeholder="Salary"]').type('{selectAll}{backspace}');
    cy.get('[placeholder="Salary"]').type(worker_new.salary);
    cy.get('[placeholder="Department"]').type('{selectAll}{backspace}');
    cy.get('[placeholder="Department"]').type(worker_new.department);
    cy.get('[id="submit"]').click();
    cy.get(':nth-child(3) > .rt-tr > :nth-child(2)').should("contain", "Bayden");
    
    cy.get('[id="searchBox"]').type('Boris');
    cy.get('[id="searchBox"]').type('{selectAll}{backspace}');
    cy.get('[id="searchBox"]').type('Bayden')
    cy.get('[id="searchBox"]').type('{selectAll}{backspace}');
    cy.get('[id="searchBox"]').type('99')
    cy.get('[id="searchBox"]').type('{selectAll}{backspace}');
    cy.get('[id="searchBox"]').type('testboris@com.ua');
    cy.get('[id="searchBox"]').type('{selectAll}{backspace}');
    cy.get('[id="searchBox"]').type('50000');
    cy.get('[id="searchBox"]').type('{selectAll}{backspace}');
    cy.get('[id="searchBox"]').type('Goverment');
  });
});
