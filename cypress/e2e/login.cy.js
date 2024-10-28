// cypress/e2e/login.cy.js
describe('Authentication Happy Path', () => {
  
    it('logs in successfully with correct credentials', () => {
      cy.visit('/auth/login'); 
      cy.get('input[name="email"]').type('sebassalazar@cefepa.net');
      cy.get('input[name="password"]').type('A28BR01IL');
      cy.get('button[type="submit"]').click();
  
      // Verificar redirección al dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, Sebastian').should('be.visible');
    });
  });
  