/// <reference types="cypress" />

import { getRandomStringWithoutNumbers, getRandomPassword } from '/cypress/support/e2e.js';

describe('Multiple Transactions', () => {

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

    it('Navigate to My account and chnage account inforamtion ', () => {
        login();
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="user-list-search-input"]').type('Ted');
        cy.get('[data-test="user-list-item-uBmeaz5pX"]').click();
        cy.get('#amount').type('121')
        cy.get('#transaction-create-description-input').type('Test');
        cy.intercept('POST', '/transactions').as('createTransaction');
        cy.get('[data-test="transaction-create-submit-payment"]').should('be.enabled').click();
        cy.get('[data-test="alert-bar-success"]').should('be.visible');
        cy.wait('@createTransaction').its('response.statusCode').should('eq', 200);
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="user-list-search-input"]').type('Ted');
        cy.get('[data-test="user-list-item-uBmeaz5pX"]').click();
        cy.get('#amount').type('221')
        cy.get('#transaction-create-description-input').type('Test');
        cy.intercept('POST', '/transactions').as('createTransaction');
        cy.get('[data-test="transaction-create-submit-payment"]').should('be.enabled').click();
        cy.get('[data-test="alert-bar-success"]').should('be.visible');
        cy.wait('@createTransaction').its('response.statusCode').should('eq', 200);
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
        cy.get('[data-test="nav-personal-tab"]').click();
        cy.get('[data-test="transaction-list-filter-amount-range-button"]').click({ force: true });
        cy.get('[data-test="transaction-list-filter-amount-range-slider"]').click({ force: true });
        cy.get('[data-test="transaction-list-filter-amount-range-slider"]').click(50, 0); 
        cy.get('[data-test="transaction-list-filter-amount-range-slider"]').click(24, 0);
        cy.get('body').type('{esc}');
        cy.get('[data-test="transaction-list"]').contains('221');
        cy.get('[data-test="transaction-list"]').contains('121');
        });
    });
   
