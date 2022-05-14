describe('login page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  describe('all elements are on the page', () => {
    it('should have a title', () => {
      cy.contains('Find a musician');
    });

    it('should have a slogan', () => {
      cy.contains('Rejoint la communauté de musiciens de l’IMT');
    });

    it('should have a button with "commencer"', () => {
      cy.get('button').contains('Commencer');
    });

    it('should have a button "se connecter"', () => {
      cy.get('button').contains('se connecter');
    });

    it('should have a button "s\'inscrire"', () => {
      cy.get('button').contains("s'inscrire");
    });
  });

  describe('login form', () => {
    beforeEach(() => {
      cy.get('button').contains('Commencer').click();
    });

    it('should display a form', () => {
      cy.get('form').should('be.visible');
    });

    it('should have a field for email', () => {
      cy.get('input[type=email]').should('be.visible');
    });

    it('should have a field for password', () => {
      cy.get('input[type=password]').should('be.visible');
    });

    it('should have a button "Connexion"', () => {
      cy.get('button').contains('Connexion');
    });

    it('should login with invalid credentials', () => {
      cy.get('input[type=email]').type('romain.guar91@gmail.com');
      cy.get('input[type=password]').type('azerty');
      cy.get('button').contains('Connexion').click();
      cy.contains('Email ou mot de passe incorrect');
    });

    it('should login with valid credentials', () => {
      cy.intercept('POST', '**/login', { fixture: 'login.json' }).as(
        'postLogin',
      );

      cy.get('input[type=email]').type('romain.guar91@gmail.com');
      cy.get('input[type=password]').type('azerty');
      cy.get('button').contains('Connexion').click();

      cy.url().should('include', '/musicians');
    });
  });
});
