/// <reference types="cypress" />

import { getRandomStringWithoutNumbers, getRandomPassword } from '/cypress/support/e2e.js'

describe('My Account', () => {

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

    it('Navigate to My account and chnage account inforamtion ', () => {
        login();
        cy.get('#username').should('be.visible').type(commonStrings.username);
        cy.get('#password').should('be.visible').type(commonStrings.password);
        cy.get('[data-test="signin-submit"]').should('be.enabled').click();
        cy.get('[data-test="sidenav-user-settings"]').click();
        cy.get('[data-test="user-settings-firstName-input"]').clear().type('Nikolaa');
        cy.get('[data-test="user-settings-lastName-input"]').clear().type('Sarajlicc');
        cy.get('[data-test="user-settings-email-input"]').clear().type('nikolasarajlic@aaa.com')
        cy.get('[data-test="user-settings-phoneNumber-input"]').clear().type('065123123123');
        cy.get('[data-test="user-settings-submit"]').should('be.enabled').click();
        cy.get('[data-test="sidenav-home"]').click();
        cy.get('[data-test="sidenav-user-settings"]').click();
        cy.get('[data-test="user-settings-firstName-input"]').should('have.value', 'Nikolaa');
        cy.get('[data-test="user-settings-lastName-input"]').should('have.value', 'Sarajlicc');
        cy.get('[data-test="user-settings-email-input"]').should('have.value', 'nikolasarajlic@aaa.com');
        cy.get('[data-test="user-settings-phoneNumber-input"]').should('have.value', '065123123123');

    });
});