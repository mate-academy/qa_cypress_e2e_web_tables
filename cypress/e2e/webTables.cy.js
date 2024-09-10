/// <reference types='cypress' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open modal dialog if the button is pressed', () => {
    userPage.openModal();

    userPage.existModal();
  });

  it('should add a new user if data is correct', () => {
    userPage.openModal();

    userPage.fillModal();
    userPage.addPerson();

    userPage.checkUser();
  });

  it('should delete the user if btn is pressed', () => {
    userPage.openModal();

    userPage.fillModal();
    userPage.addPerson();

    userPage.removeUser();
  });

  it('should show the 100 rows if 100 selected', () => {
    userPage.selectCount('100 rows');

    userPage.checkCount(101);
  });

  it('should switch page if pagination is triggered by 2 page', () => {
    userPage.selectCount('5 rows');

    for (let i = 0; i < 10; i++) {
      userPage.openModal();

      userPage.fillModal();
      userPage.addPerson();
    }

    userPage.haveLength(0);
    userPage.changePage(2);
    userPage.haveLength(0);
    userPage.changePage(3);
    userPage.haveLength(2);
  });

  it('should remove all user from a table', () => {
    userPage.removeAllUsers();
  });

  it('should edit an item', () => {
    userPage.findAndEdit();
  });

  it.only('should find an appropriate item for any field', () => {
    userPage.openModal();

    userPage.fillModal();
    userPage.addPerson();

    userPage.searchByField(userPage.addedUser.firstName);
    userPage.checkUser();

    userPage.searchByField(userPage.addedUser.lastName);
    userPage.checkUser();

    userPage.searchByField(userPage.addedUser.email);
    userPage.checkUser();

    userPage.searchByField(userPage.addedUser.age);
    userPage.checkUser();

    userPage.searchByField(userPage.addedUser.salary);
    userPage.checkUser();

    userPage.searchByField(userPage.addedUser.department);
    userPage.checkUser();
  });
});
