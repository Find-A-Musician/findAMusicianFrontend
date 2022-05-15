describe('login page', () => {
  beforeEach(() => {
    cy.visit('/login');
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

  describe('signup form', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/genres', { fixture: 'genres.json' }).as(
        'getGenres',
      );
      cy.intercept('GET', '**/instruments', { fixture: 'instruments.json' }).as(
        'getInstruments',
      );
      cy.intercept('POST', '**/register', { fixture: 'register.json' }).as(
        'postRegister',
      );

      cy.get('button').contains("s'inscrire").click();
    });

    it('should display a form', () => {
      cy.get('form').should('be.visible');
    });

    it('should display error message if passwords are not the same', () => {
      cy.get('#nameinput').clear();
      cy.get('#nameinput').type('Thomas');
      cy.get('#lastnameinput').clear();
      cy.get('#lastnameinput').type('Bernard');
      cy.get('.px-4').click();
      cy.get('#emailinput').clear();
      cy.get('#emailinput').type('thomas.bernard@bernard.com');
      cy.get('#phone').click();
      cy.get('.bg-red-500').click();
      cy.get('#password').clear();
      cy.get('#password').type('thomas123');
      cy.get('#passwordconfirm').clear();
      cy.get('#passwordconfirm').type('thomas');
      cy.get('button').contains('Suivant').click();
      cy.contains('Les mots de passes ne correspondent pas');
    });

    it('should register', () => {
      cy.get('#nameinput').clear();
      cy.get('#nameinput').type('Thomas');
      cy.get('#lastnameinput').clear();
      cy.get('#lastnameinput').type('Bernard');
      cy.get('.px-4').click();
      cy.get('#emailinput').clear();
      cy.get('#emailinput').type('thomas.bernard@bernard.com');
      cy.get('#phone').click();
      cy.get('.bg-red-500').click();
      cy.get('#password').clear();
      cy.get('#password').type('thomas123');
      cy.get('#passwordconfirm').clear();
      cy.get('#passwordconfirm').type('thomas123');
      cy.get('.bg-red-500').click();
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.gap-4 > :nth-child(1)').click();
      cy.get('.gap-4 > :nth-child(3)').click();
      cy.get('.gap-4 > :nth-child(1) > .justify-between').click();
      cy.get('.z-40 > :nth-child(1)').click();
      cy.get('.text-lg').click();
      cy.get(':nth-child(2) > .justify-between').click();
      cy.get('.z-40 > :nth-child(3)').click();
      cy.get('.z-40 > :nth-child(1)').click();
      cy.get('.text-lg').click();
      cy.get('.bg-red-500').click();
      cy.get('.bg-red-500').click();
      /* ==== End Cypress Studio ==== */

      cy.url().should('include', '/musicians');
    });
  });
});
