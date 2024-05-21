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
Cypress.Commands.add('login', (email, password) => {
  // opens the login page
  cy.visit('http://localhost:3000/login');

  // fill in the email
  cy.get('input[placeholder=Email]').type(email);
  // fill in the password
  cy.get('input[placeholder=Password]').type(password);

  // pressing the Login button
  cy.get('button')
    .contains(/^Login$/)
    .click();

  // verify that elements on the homepage are displayed when the user logs in
  cy.get('label[for="create-thread-modal"]').should('be.visible');
});
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
