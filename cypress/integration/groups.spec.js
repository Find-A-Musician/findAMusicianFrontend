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
});
