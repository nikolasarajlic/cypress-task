/// <reference types="cypress" />

import { getRandomStringWithoutNumbers, getRandomPassword } from '/cypress/support/e2e.js'

describe('Sign Up', () => {

    let commonStrings;

    beforeEach(() => {
        cy.fixture('language/en').then((data) => {
            commonStrings = data;
        });
        cy.viewport(1920, 1080) // Set viewport 
    });

    const signUp = () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-test="signup"]').click();
        cy.url().should('include', 'signup');
        cy.url().should('eq', Cypress.config().baseUrl + '/signup')

    };

    it('First Name is required', () => {
        signUp();
        cy.get('#firstName').should('be.visible');
        cy.get('#firstName-label').should('be.visible').contains('First Name');
        cy.get('#lastName').should('be.visible').type('Sarajlic');
        cy.get('#lastName-label').should('be.visible').contains('Last Name');
        cy.get('#username').should('be.visible').type('nikolasarajlic');
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('#confirmPassword').should('be.visible').type(commonStrings.password);
        cy.get('#firstName-helper-text').should('be.visible').contains('First Name is required');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Last Name is required', () => {
        signUp();
        cy.get('#firstName').should('be.visible').type('Nikola');
        cy.get('#firstName-label').should('be.visible').contains('First Name');
        cy.get('#lastName').should('be.visible').click();
        cy.get('#lastName-label').should('be.visible').contains('Last Name');
        cy.get('#username').should('be.visible').type('nikolasarajlic');
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('#confirmPassword').should('be.visible').type(commonStrings.password);
        cy.get('#lastName-helper-text').should('be.visible').contains('Last Name is required');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Password does not match ', () => {
        signUp();
        cy.get('#firstName').should('be.visible').type('Nikola');
        cy.get('#firstName-label').should('be.visible').contains('First Name');
        cy.get('#lastName').should('be.visible').type('Sarajlic');
        cy.get('#lastName-label').should('be.visible').contains('Last Name');
        cy.get('#username').should('be.visible').type('nikolasarajlic');
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('#confirmPassword').should('be.visible').type('Aaaaa');
        cy.get('#confirmPassword-helper-text').should('be.visible').contains('Password does not match');
        cy.get('[data-test="signup-submit"]').should('be.disabled');

    });

    it('SignUp ', () => {
        signUp();
        cy.get('#firstName').should('be.visible').type(commonStrings.name);
        cy.get('#firstName-label').should('be.visible').contains('First Name');
        cy.get('#lastName').should('be.visible').type(commonStrings.lastName);
        cy.get('#lastName-label').should('be.visible').contains('Last Name');
        cy.get('#username').should('be.visible').type(commonStrings.username);
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('#confirmPassword').should('be.visible').type(commonStrings.password);
        cy.get('[data-test="signup-submit"]').should('be.enabled').click();

    });
});