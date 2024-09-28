class Pagination {
  get previousBtn() {
    return cy.contains('button', 'Previous');
  }

  get nextBtn() {
    return cy.contains('button', 'Next');
  }

  get pageNumberInput() {
    return cy.get('input[type=number]');
  }

  get totalPages() {
    return cy.get('.-totalPages');
  }

  get rowSelection() {
    return cy.get('select');
  }

  clickOnNextBtn() {
    this.nextBtn
      .click();

    return this;
  }

  clickOnPreviousBtn() {
    this.previousBtn
      .click();

    return this;
  }

  selectRowsCount(rowCount = '5') {
    this.rowSelection
      .select(rowCount);

    return this;
  }

  typePageNumber(pageNumber) {
    this.pageNumberInput
      .clear()
      .type(`${pageNumber}{enter}`);

    return this;
  }

  assertNextBtnAccessibility(isDisabled = true) {
    const assertion = isDisabled ? 'have.attr' : 'not.have.attr';

    this.nextBtn
      .should(assertion, 'disabled');

    return this;
  }

  assertPreviousBtnAccessibility(isDisabled = true) {
    const assertion = isDisabled ? 'have.attr' : 'not.have.attr';

    this.previousBtn
      .should(assertion, 'disabled');

    return this;
  }

  navigateToLastPage() {
    this.totalPages
      .invoke('text')
      .then((pages) => {
        this.typePageNumber(pages);
      });

    return this;
  }

  navigateUntilLastPageByPageNumber() {
    this.totalPages
      .invoke('text')
      .then((pages) => {
        const totalPages = +pages;

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
          this.typePageNumber(pageNumber)
            .assertPreviousBtnAccessibility(pageNumber === 1)
            .assertNextBtnAccessibility(pageNumber === totalPages);
        }
      });

    return this;
  }

  navigateUntilFirstPageByPageNumber() {
    this.totalPages
      .invoke('text')
      .then((pages) => {
        const totalPages = +pages;

        for (let pageNumber = totalPages; pageNumber >= 1; pageNumber--) {
          this.typePageNumber(pageNumber)
            .assertPreviousBtnAccessibility(pageNumber === 1)
            .assertNextBtnAccessibility(pageNumber === totalPages);
        }
      });

    return this;
  }

  assertCurrentPageNumber(currentPageNumber) {
    this.pageNumberInput
      .invoke('val')
      .then((pageNumber) => {
        const page = +pageNumber;

        expect(page).to.eql(currentPageNumber);
      });

    return this;
  }

  navigateUntilLastPageByClickingOnNextBtn() {
    this.totalPages
      .invoke('text')
      .then((pages) => {
        const totalPages = +pages;

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
          const currentPageNumber = pageNumber + 1;

          if (currentPageNumber <= totalPages) {
            this.nextBtn
              .invoke('attr', 'disabled')
              .then((attr) => {
                if (attr !== 'disabled') {
                  this.clickOnNextBtn()
                    .assertCurrentPageNumber(currentPageNumber);
                }
              });
          } else {
            cy.log('The last table page is reached');

            this.nextBtn
              .should('have.attr', 'disabled');
          }
        }
      });

    return this;
  }

  navigateUntilFirstPageByClickingOnPreviousBtn() {
    this.totalPages
      .invoke('text')
      .then((pages) => {
        const totalPages = +pages;

        for (let pageNumber = totalPages; pageNumber >= 1; pageNumber--) {
          const currentPageNumber = pageNumber - 1;

          if (currentPageNumber !== 0) {
            this.previousBtn
              .invoke('attr', 'disabled')
              .then((attr) => {
                if (attr !== 'disabled') {
                  this.clickOnPreviousBtn()
                    .assertCurrentPageNumber(currentPageNumber);
                }
              });
          } else {
            cy.log('The first table page is reached');

            this.previousBtn
              .should('have.attr', 'disabled');
          }
        }
      });

    return this;
  }
}

export default Pagination;
