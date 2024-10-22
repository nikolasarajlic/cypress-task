/// <reference types="cypress" />

import { getRandomStringWithoutNumbers, getRandomPassword } from '/cypress/support/e2e.js'

describe('Sign Up', () => {

    let commonStrings;

    beforeEach(() => {
        cy.fixture('language/en').then((data) => {
            commonStrings = data;
        });
        cy.viewport(1920, 1080); // Set viewport 
    });

    const openSignUpPage = () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-test="signup"]').click();
        cy.url().should('include', '/signup');
    };

    const fillMandatoryFields = (firstName, lastName, username, password, confirmPassword) => {
        if (firstName) cy.get('#firstName').should('be.visible').type(firstName);
        if (lastName) cy.get('#lastName').should('be.visible').type(lastName);
        if (username) cy.get('#username').should('be.visible').type(username);
        if (password) cy.get('#password').should('be.visible').type(password);
        if (confirmPassword) cy.get('#confirmPassword').should('be.visible').type(confirmPassword);
    };

    it('First Name is required', () => {
        openSignUpPage();
        cy.get('#firstName').click();
        fillMandatoryFields(null, 'Sarajlic', 'nikolasarajlic', commonStrings.password, commonStrings.password);
        cy.get('#firstName-helper-text').should('be.visible').contains('First Name is required');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Last Name is required', () => {
        openSignUpPage();
        cy.get('#lastName').click();
        fillMandatoryFields('Nikola', null, 'nikolasarajlic', commonStrings.password, commonStrings.password);
        cy.get('#lastName-helper-text').should('be.visible').contains('Last Name is required');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Username is required', () => {
        openSignUpPage();
        cy.get('#username').click();
        fillMandatoryFields('Nikola', 'Sarajlic', null, commonStrings.password, commonStrings.password);
        cy.get('#username-helper-text').should('be.visible').contains('Username is required');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Password is required', () => {
        openSignUpPage();
        cy.get('#password').click();
        fillMandatoryFields('Nikola', 'Sarajlic', 'nikolasarajlic', '', 'Aaaaa');
        cy.get('#password-helper-text').should('be.visible').contains('Enter your password');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Password does not match', () => {
        openSignUpPage();
        cy.get('#confirmPassword').click();
        fillMandatoryFields('Nikola', 'Sarajlic', 'nikolasarajlic', commonStrings.password, 'Aaaaa');
        cy.get('#confirmPassword-helper-text').should('be.visible').contains('Password does not match');
        cy.get('[data-test="signup-submit"]').should('be.disabled');
    });

    it('Successful SignUp', () => {
        openSignUpPage();
        fillMandatoryFields(commonStrings.name, commonStrings.lastName, commonStrings.username, commonStrings.password, commonStrings.password);
        cy.get('[data-test="signup-submit"]').should('be.enabled').click();
        cy.url().should('not.include', '/signup');
    });
});