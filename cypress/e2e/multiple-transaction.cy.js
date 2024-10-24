/// <reference types="cypress" />

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

    const createTransaction = (amount, description) => {
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="user-list-search-input"]').type('Ted');
        cy.get('[data-test="user-list-item-uBmeaz5pX"]').click();
        cy.get('#amount').type(amount);
        cy.get('#transaction-create-description-input').type(description);
        cy.intercept('POST', '/transactions').as('createTransaction');
        cy.get('[data-test="transaction-create-submit-payment"]').should('be.enabled').click();
        cy.get('[data-test="alert-bar-success"]').should('be.visible');
        cy.wait('@createTransaction').its('response.statusCode').should('eq', 200);
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
    };

    const applyTransactionFilters = (minClick, maxClick) => {
        cy.get('[data-test="transaction-list-filter-amount-range-button"]').click({ force: true });
        cy.get('[data-test="transaction-list-filter-amount-range-slider"]').click({ force: true });
        cy.get('[data-test="transaction-list-filter-amount-range-slider"]').click(minClick, 0);
        cy.get('[data-test="transaction-list-filter-amount-range-slider"]').click(maxClick, 0);
        cy.get('body').type('{esc}'); 
    };

    it('Create and Filter Multiple Transactions', () => {
        login();
        createTransaction('121', 'Test');
        createTransaction('221', 'Test');
        
        cy.get('[data-test="nav-personal-tab"]').click();
        applyTransactionFilters(50, 24);

       
        cy.get('[data-test="transaction-list"]').contains('221');
        cy.get('[data-test="transaction-list"]').contains('121');
    });
});