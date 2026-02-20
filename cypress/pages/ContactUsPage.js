// cypress/pages/ContactUsPage.js
class ContactUsPage {

  // Opens the Contact Us form link
  openContactUsForm() {
    // cy.get('.zw-ftr-lft > :nth-child(3) > a')
    cy.get('a[href="/contactus"]')

      .invoke('removeAttr', 'target') // remove "target" so it opens in same tab
      .click();
  }

  // Captures the error text from the error div
  captureError() {
    return cy.get('#error_div').invoke('text');
  }

  // New method: get the error message container element
  getErrorContainer() {
    return cy.get('.pull-left.bodyLeft.zw-con').first();
  }
}

export default ContactUsPage;



