/// <reference types="cypress" />

describe('My Account', () => {
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

    const updateAccountInfo = (firstName, lastName, email, phoneNumber) => {
        cy.get('[data-test="sidenav-user-settings"]').click();
        cy.get('[data-test="user-settings-firstName-input"]').clear().type(firstName);
        cy.get('[data-test="user-settings-lastName-input"]').clear().type(lastName);
        cy.get('[data-test="user-settings-email-input"]').clear().type(email);
        cy.get('[data-test="user-settings-phoneNumber-input"]').clear().type(phoneNumber);
        cy.get('[data-test="user-settings-submit"]').should('be.enabled').click();
    };

    const verifyAccountInfo = (firstName, lastName, email, phoneNumber) => {
        cy.get('[data-test="sidenav-user-settings"]').click();
        cy.get('[data-test="user-settings-firstName-input"]').should('have.value', firstName);
        cy.get('[data-test="user-settings-lastName-input"]').should('have.value', lastName);
        cy.get('[data-test="user-settings-email-input"]').should('have.value', email);
        cy.get('[data-test="user-settings-phoneNumber-input"]').should('have.value', phoneNumber);
    };

    it('Update and Verify Account Information', () => {
        login();
        const newFirstName = 'Nikolaa';
        const newLastName = 'Sarajlicc';
        const newEmail = 'nikolasarajlic@aaa.com';
        const newPhoneNumber = '065123123123';

        updateAccountInfo(newFirstName, newLastName, newEmail, newPhoneNumber);
        
        cy.get('[data-test="sidenav-home"]').click();
        verifyAccountInfo(newFirstName, newLastName, newEmail, newPhoneNumber);
    });
});