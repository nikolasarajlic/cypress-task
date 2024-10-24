/// <reference types="cypress" />

import { getRandomStringWithoutNumbers, getRandomPassword } from '/cypress/support/e2e.js'

describe('Personal Page', () => {

    let commonStrings;

    beforeEach(() => {
        cy.fixture('language/en').then((data) => {
            commonStrings = data;
        });
    });

    const login = () => {
        cy.visit('http://localhost:3000/login');
        cy.get('#username').should('be.visible').type(commonStrings.username);
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
    };

    const verifyTransactionDetails = (transactionIndex) => {
        cy.get('[data-test^="transaction-sender-"]').should('be.visible').eq(transactionIndex).contains('Nikolaa Sarajlicc');
        cy.get('[data-test^="transaction-action-"]').should('be.visible').eq(transactionIndex).contains('paid');
        cy.get('[data-test^="transaction-receiver-"]').should('be.visible').eq(transactionIndex).contains('Ted Parisian');
        cy.get('[data-test="transaction-list"]').find("div").eq(transactionIndex).contains('221');
    };

    it('Navigate to My Account and Change Account Information', () => {
        login();
        cy.get('[data-test="nav-personal-tab"]').click();
        verifyTransactionDetails(0); // Verify details for the first transaction
    });
});