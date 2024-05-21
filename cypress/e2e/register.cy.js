/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email is already taken
 *   - should display login page when email is not already taken
 */

const dateNow = Date.now();

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    // verify the elements that should appear on the register page
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });

  it('should display alert when name is empty', () => {
    // Click the register button without filling in the name
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // verify window.alert to display messages from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    // fill in name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);

    // Click the register button without filling in your email
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // verify window.alert to display messages from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // fill in name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);
    // fill in the email
    cy.get('input[placeholder="Email"]').type(`${dateNow}@gmail.com`);

    // Click the register button without entering a password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // verify window.alert to display messages from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email is already taken', () => {
    // fill in name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);
    // fill in the registered email
    cy.get('input[placeholder="Email"]').type('gilberthutapea@gmail.com');
    // fill in the password
    cy.get('input[placeholder="Password"]').type(`${dateNow}password`);

    // pressing the register button
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // verify window.alert to display messages from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });

  it('should display login page when email is not already taken', () => {
    // fill in name
    cy.get('input[placeholder="Name"]').type(`${dateNow}name`);
    // fill in the email
    cy.get('input[placeholder="Email"]').type(`${dateNow}@gmail.com`);
    // fill in the password
    cy.get('input[placeholder="Password"]').type(`${dateNow}password`);

    // pressing the register button
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // verify that elements located on the homepage are displayed
    cy.get('button').contains('Login').should('be.visible');
  });
});
