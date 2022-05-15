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

Cypress.Commands.add('typeLogin', () => {
  cy.intercept('POST', '**/login', { fixture: 'login.json' }).as('postLogin');

  cy.visit('/login');

  cy.get('button').contains('Commencer').click();
  cy.get('input[type=email]').type('romain.guar91@gmail.com');
  cy.get('input[type=password]').type('romain123');
  cy.get('button').contains('Connexion').click();
});
