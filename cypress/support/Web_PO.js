
class worker {
  firstNameS = '#firstName';
  lastNameS = '#lastName';
  emailS = '#userEmail';
  ageS = '#age';
  salaryS = '#salary';
  departmentS ='#department';
  submitButtonS = '#submit';
  classW = '.rt-td'

  fillRegistrationForm() {
    cy.fixture('example').then((data) => { 
      cy.get(this.firstNameS).type(data.firstName);
      cy.get(this.lastNameS).type(data.lastName);
      cy.get(this.emailS).type(data.email);
      cy.get(this.ageS).type(data.age);
      cy.get(this.salaryS).type(data.salary);
      cy.get(this.departmentS).type(data.department);
    })
  };

  editRegistrationForm(){
    cy.fixture('example').then((data) => { 
      cy.get(this.firstNameS).clear().type(data.firstName1);
      cy.get(this.lastNameS).clear().type(data.lastName1);
      cy.get(this.emailS).clear().type(data.email1);
     
    })
  }


  checkWorker(num, num1,text) {    
      cy.get(`:nth-child(${num})>.rt-tr>:nth-child(${num1})`).should('include.text', text)    
  };

};

class rowsCountSelection {
  selectRowPerPage = "select[aria-label='rows per page']";
  getNumberOfRows = '.rt-table>.rt-tbody>.rt-tr-group';
  listOfNumbersOfRows = ["5", "10", "20", "25", "50", "100"];
  numberOfRow  = this.listOfNumbersOfRows[Math.random()*this.listOfNumbersOfRows.length | 0];

  rowsCount() {
    cy.get(this.selectRowPerPage).select(this.numberOfRow);
    cy.get(this.getNumberOfRows).should('have.length',this.numberOfRow)
  };
}

class pagination {
  previousButton = '.-previous>button';
  nextButton = '.-next>button';

  clickPreviousButton() {
    cy.get(this.previousButton).click()
  };
  clickNextButton() {
    cy.get(this.nextButton).click();
  };

  checkPreviousButton(status){
    cy.get(this.previousButton).should(`be.${status}`);
  };
  checkNextButton(status){
    cy.get(this.nextButton).should(`be.${status}`);
  };
}



module.exports = {worker, rowsCountSelection, pagination
}
