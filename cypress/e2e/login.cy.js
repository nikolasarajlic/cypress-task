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

    const login = () => {
        cy.visit('http://localhost:3000/login');
    }
        
    it('Login with invalid username', () => {
        login();
        cy.get('#username').should('be.visible').type('Aaa')
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('[data-test="signin-remember-me"]').should('not.be.checked');
        cy.get('[data-test="signin-remember-me"]').should('be.visible').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
        cy.get('[data-test="signin-error"]').should('be.visible').contains('Username or password is invalid');
    });

    it('Login with invalid password', () => {
        login();
        cy.get('#username').should('be.visible').type(commonStrings.username)
        cy.get('#password').should('be.visible').type('Text');
        cy.get('[data-test="signin-remember-me"]').should('not.be.checked');
        cy.get('[data-test="signin-remember-me"]').should('be.visible').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
        cy.get('[data-test="signin-error"]').should('be.visible').contains('Username or password is invalid');
    });

    it('Login with empty username and empty password', () => {
        login();
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('[data-test="signin-remember-me"]').should('not.be.checked');
        cy.get('[data-test="signin-remember-me"]').should('be.visible').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.get('[data-test="signin-submit"]').should('not.be.enabled')
    });

    it('Login with valid username and password', () => {
        login();
        cy.get('#username').should('be.visible').type(commonStrings.username);
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('[data-test="signin-remember-me"]').should('not.be.checked');
        cy.get('[data-test="signin-remember-me"]').should('be.visible').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
    });
});
