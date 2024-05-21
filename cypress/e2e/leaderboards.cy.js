/**
 * - Leaderboards spec
 *   - should display leaderboards page correctly
 */

describe('Leaderboards spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/leaderboards');
  });

  it('should display leaderboards page correctly', () => {
    // verify the elements that should appear on the leaderboards page
    cy.get('h1').should('contain', 'Leaderboards');
  });
});
