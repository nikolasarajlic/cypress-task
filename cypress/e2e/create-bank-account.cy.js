/// <reference types="cypress" />

import { getRandomStringWithoutNumbers, getRandomPassword } from '/cypress/support/e2e.js'

describe('Bank Account', () => {

    let commonStrings;

    beforeEach(() => {
        cy.fixture('language/en').then((data) => {
            commonStrings = data;
        });
    });

    const login = () => {
        cy.visit('http://localhost:3000/login');
        cy.url().should('include', '/login');
        cy.get('#username').should('be.visible').type(commonStrings.username);
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('[data-test="signin-remember-me"]').should('not.be.checked').click();
        cy.get('[data-testid="CheckBoxIcon"]').should('be.visible');
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
    }

    const createBankAccount = () => {
        cy.get('[data-test="sidenav-bankaccounts"]').click();
        cy.url().should('include', '/bankaccounts'); // Verify if the URL is correct after clicking
        cy.get('[data-test="bankaccount-new"]').click();
        cy.url().should('include', '/bankaccounts/new');
        cy.get('#bankaccount-bankName-input').should('be.visible').type('Banka');
        cy.get('#bankaccount-routingNumber-input').should('be.visible').type('987654321');
        cy.get('#bankaccount-accountNumber-input').should('be.visible').type('123456789');
        cy.intercept('POST', '/graphql').as('createBankAccount');
        cy.get('[data-test="bankaccount-submit"]').should('be.visible').click();
        cy.wait('@createBankAccount').its('response.statusCode').should('eq', 200);
    }

    it('Create New bank account', () => {
        login();
        createBankAccount();
    });
});