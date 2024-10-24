/// <reference types="cypress" />

import { getRandomStringWithoutNumbers, getRandomPassword } from '/cypress/support/e2e.js'

describe('Login', () => {

    let commonStrings;

    beforeEach(() => {
        cy.fixture('language/en').then((data) => {
            commonStrings = data;
        });
    });

    const login = (username, password) => {
        cy.visit('http://localhost:3000/login');
        cy.url().should('include', '/login');
        cy.get('#username').should('be.visible').type(username);
        cy.get('#password').should('be.visible').type(password);
        cy.get('[data-test="signin-remember-me"]').should('be.visible').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
    };

    const verifyLoginError = () => {
        cy.get('[data-test="signin-error"]').should('be.visible').and('contain', 'Username or password is invalid');
    };

    it('Login with invalid username', () => {
        login('Aaa', commonStrings.password);
        verifyLoginError();
    });

    it('Login with invalid password', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#username').type(commonStrings.username);
        cy.get('#password').type('Text');
        cy.get('[data-test="signin-remember-me"]').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.intercept('POST', '/login').as('loginRequest');
        cy.get('[data-test="signin-submit"]').click();
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
        verifyLoginError();
    });

    it('Login with empty username and empty password', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#username').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('[data-test="signin-remember-me"]').should('not.be.checked').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.get('[data-test="signin-submit"]').should('not.be.enabled');
    });

    it('Login with valid username and password and create bank account first time', () => {
        login(commonStrings.username, commonStrings.password);
        cy.get('[data-test="user-onboarding-dialog-title"]').should('contain', 'Get Started with Real World App');
        cy.get('[data-test="user-onboarding-next"]').should('be.visible').click();
        
        // Bank account creation steps
        cy.get('#bankaccount-bankName-input').should('be.visible').type('Banka');
        cy.get('#bankaccount-routingNumber-input').should('be.visible').type('987654321');
        cy.get('#bankaccount-accountNumber-input').should('be.visible').type('123456789');
        cy.get('[data-test="bankaccount-submit"]').should('be.visible').click();
        
        // Verify successful completion
        cy.get('[data-test="user-onboarding-next"]').should('contain', 'Done').click(); 
        cy.get('[data-test="sidenav-user-full-name"]').should('be.visible').and('contain', 'Nikola');
    });
    it('Login', () => {
        login(commonStrings.username, commonStrings.password);
        cy.get('[data-test="sidenav-user-full-name"]').should('be.visible').contains('Nikola');
    });
});