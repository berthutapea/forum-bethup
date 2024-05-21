/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    // verify the elements that must appear on the login page
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // click the login button without filling in your email
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display messages from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // fill in the email
    cy.get('input[placeholder="Email"]').type('gilberthutapea@gmail.com');

    // Click the login button without entering a password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display messages from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // fill in the email
    cy.get('input[placeholder="Email"]').type('gilberthutapea@gmail.com');

    // Enter the wrong password
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // pressing the Login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify window.alert to display messages from the API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // fill in the email
    cy.get('input[placeholder="Email"]').type('gilberthutapea@gmail.com');

    // fill in the password
    cy.get('input[placeholder="Password"]').type('gilbert123');

    // pressing the Login button
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify that elements located on the homepage are displayed
    cy.get('label[for="create-thread-modal"]').should('be.visible');
  });
});
