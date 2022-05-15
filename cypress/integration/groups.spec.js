describe('groups page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/genres', { fixture: 'genres.json' }).as(
      'getGenres',
    );
    cy.intercept('GET', '**/instruments', { fixture: 'instruments.json' }).as(
      'getInstruments',
    );
    cy.intercept('GET', '**/groups?start=0*', { fixture: 'groups.json' }).as(
      'getGroups',
    );
    cy.intercept('GET', '**/profil', { fixture: 'profil.json' }).as(
      'getProfil',
    );
    cy.intercept('POST', '**/login', { fixture: 'login.json' }).as('postLogin');

    cy.typeLogin();

    cy.contains('a', 'Groupes').click();
  });

  it('check if everything is on the page', () => {
    cy.contains("Plus besoin de galérer pour trouver l'équipe parfaite");
    cy.contains('Groupe');
    cy.contains('Musiciens');
    cy.contains('Evènements');
    cy.contains('Se déconnecter');
    cy.contains('Romain Guarinoni');
    cy.contains('Créer un groupe');
    cy.get('[data-cy=group-list]').children().should('have.length', 5);
  });

  it('create a group', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.gap-3 > .px-4').click();
    cy.get('#name').clear();
    cy.get('#name').type('test');
    cy.get(':nth-child(2) > .css-b62m3t-container > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').click();
    cy.get('#react-select-3-option-0').click();
    cy.get('.bg-gray-50').click();
    cy.get(':nth-child(4) > .css-b62m3t-container > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').click();
    cy.get('#react-select-5-option-1').click();
    cy.get('.css-g1d714-ValueContainer > .css-6j8wv5-Input').click();
    cy.get('#react-select-5-option-0').click();
    cy.get(':nth-child(5) > .css-b62m3t-container > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input').click();
    cy.get('#react-select-7-option-0').click();
    cy.get('.py-2\\.5').click();
    /* ==== End Cypress Studio ==== */
  });
});
