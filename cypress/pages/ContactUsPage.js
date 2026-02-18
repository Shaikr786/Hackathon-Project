// cypress/pages/LoginPage.js
class ContactUsPage {

  openContactUsForm() {
    cy.get('.zw-ftr-lft > :nth-child(3) > a')
      .invoke('removeAttr', 'target')
      .click();
  }

  captureError() {
    return cy.get('#error_div').invoke('text');
    
  }
}

export default ContactUsPage;
