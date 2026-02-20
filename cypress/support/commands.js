// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Define a reusable Cypress command called "form"
// This command fills out the Contact Us form with given data
Cypress.Commands.add('form', (message, firstName, lastName, email, mobile) => {
  
  // Type the message into the textarea/input with name="message"
  cy.get('[name="message"]').type(message);

  // Type the first name into the input with name="name"
  cy.get('[name="name"]').type(firstName);

  // Type the last name into the input with name="lname"
  cy.get('[name="lname"]').type(lastName);

  // Type the email into the input with name="email"
  cy.get('[name="email"]').type(email);

  // Type the mobile number into the input with name="mobile"
  cy.get('[name="mobile"]').type(mobile);

  // Click the submit button with id="formSubmit"
  cy.get('#formSubmit').click();
});
