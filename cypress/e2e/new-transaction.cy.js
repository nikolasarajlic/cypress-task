/// <reference types="cypress" />

describe('New Transaction', () => {
    let commonStrings;

    beforeEach(() => {
        cy.fixture('language/en').then((data) => {
            commonStrings = data;
        });
    });

    const login = (username, password) => {
        cy.visit('http://localhost:3000/login');
        cy.get('#username').should('be.visible').type(username);
        cy.get('#password').should('be.visible').type(password);
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
    };

    const createTransaction = (user, amount, description) => {
        cy.get('[data-test="nav-top-new-transaction"]').click();
        cy.get('[data-test="user-list-search-input"]').type(user);
        cy.get('[data-test="user-list-item-uBmeaz5pX"]').click();
        cy.get('#amount').type(amount);
        cy.get('#transaction-create-description-input').type(description);

        cy.intercept('POST', '/transactions').as('createTransaction');
        cy.get('[data-test="transaction-create-submit-payment"]').should('be.enabled').click();
        
        cy.get('[data-test="alert-bar-success"]').should('be.visible');
        cy.wait('@createTransaction').its('response.statusCode').should('eq', 200);
        cy.get('[data-test="new-transaction-return-to-transactions"]').click();
    };

    it('Navigate to My Account and Change Account Information', () => {
        login(commonStrings.username, commonStrings.password);
        createTransaction('Ted', '221', 'Test');
    });
});