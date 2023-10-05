/// <reference types='cypress' />
const { createRandomUser } = require('../support/createRandomUser');
const { initialData } = require('../support/data');
const { getCellSelector } = require('../support/getCellSelector');
const { getRandomRowsQuantity } = require('../support/getRandomRowsQuantity');
let data = [];

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/webtables');
    data = [...initialData];
  });

  it('Should have Page section', () => {
    cy.get('.-pageInfo').should('contain.text', 'Page');
  });

  it('Should have Previous button', () => {
    cy.get('.-btn').should('contain.text', 'Previous');
  });

  it('Should have Next button', () => {
    cy.get('.-btn').should('contain.text', 'Next');
  });

  it('Should have selector for number of displayed rows', () => {
    cy.getElementByAttribute('aria-label', 'rows per page').should('exist');
  });

  it('Should display correct number of rows', () => {
    cy.get('.rt-tr-group').should('have.lengthOf', 10);
  });

  it('Should display correct number of rows after change', () => {
    const value = getRandomRowsQuantity();

    cy.selectRowsNumber(value).then(() => {
      cy.get('.rt-tr-group').should('have.lengthOf', value);
    });
  });

  it('Should add new user', () => {
    const user = createRandomUser();

    cy.addRandomUser(user);
    cy.get('.rt-tbody').should('contain.text', user.email);
  });

  it('Should delete user', () => {
    const user = createRandomUser();

    cy.addRandomUser(user);
    data.push(user);
    cy.getElementById(`delete-record-${data.length}`).click();
    cy.get('.rt-tbody').should('not.include.text', user.email);
  });

  it('Should delete all users', () => {
    const rows = data.length;

    for (let i = rows; i > 0; i--) {
      cy.getElementById(`delete-record-${i}`).click();
    }

    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });

  it('Should find the user', () => {
    cy.findOneUser(data[0].email);
    cy.get('.rt-tr').should('contain.text', data[0].email);
  });

  it('Should allow to edit user', () => {
    cy.findOneUser(data[0].email);
    cy.getElementById('edit-record-1').click();
    cy.getElementById('userForm').should('exist');

    const user = createRandomUser();

    cy.editUser(user);

    data[0] = { ...user };

    cy.getElementById('searchBox').clear();
    cy.contains('.rt-tr', initialData[0].email).should('not.exist');
  });

  it('Should properly save all fields of edited user', () => {
    cy.findOneUser(data[0].email);
    cy.getElementById('edit-record-1').click();
    cy.getElementById('userForm').should('exist');

    const user = createRandomUser();

    cy.editUser(user);

    data[0] = { ...user };

    cy.getElementById('searchBox').clear();
    cy.findOneUser(user.email);
    cy.get(getCellSelector(1, 1)).should('contain.text', user.firstName);
    cy.get(getCellSelector(1, 2)).should('contain.text', user.lastName);
    cy.get(getCellSelector(1, 3)).should('contain.text', user.age);
    cy.get(getCellSelector(1, 4)).should('contain.text', user.email);
    cy.get(getCellSelector(1, 5)).should('contain.text', user.salary);
    cy.get(getCellSelector(1, 6)).should('contain.text', user.department);
  });

  it('Should properly save all fields of edited user', () => {
    cy.findOneUser(data[0].email);
    cy.getElementById('edit-record-1').click();
    cy.getElementById('userForm').should('exist');

    const user = createRandomUser();

    cy.editUser(user);

    data[0] = { ...user };

    cy.getElementById('searchBox').clear();
    cy.findOneUser(user.email);
    cy.get(getCellSelector(1, 1)).should('contain.text', user.firstName);
    cy.get(getCellSelector(1, 2)).should('contain.text', user.lastName);
    cy.get(getCellSelector(1, 3)).should('contain.text', user.age);
    cy.get(getCellSelector(1, 4)).should('contain.text', user.email);
    cy.get(getCellSelector(1, 5)).should('contain.text', user.salary);
    cy.get(getCellSelector(1, 6)).should('contain.text', user.department);
  });

  it('Should search by any column value', () => {
    cy.findOneUser(data[0].firstName);
    cy.getElementById('searchBox').clear();
    cy.findOneUser(data[0].lastName);
    cy.getElementById('searchBox').clear();
    cy.findOneUser(data[0].age);
    cy.getElementById('searchBox').clear();
    cy.findOneUser(data[0].salary);
    cy.getElementById('searchBox').clear();
    cy.findOneUser(data[0].department);
  });
});
