/// <reference types="Cypress" />

const Locators = require ('../../cypress/fixtures/Locators.json')
const faker = require ('faker');

describe('Improve login',()=>{
    let correctEmail = 'pera30@gmail.com';
    let correctPassword = 'pera1234';
    
    let userData = {
        randomName: faker.name.findName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password()

    }
    
    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')
    });
    it ('Login with valid credentials',()=>{
        cy.get(Locators.Header.loginButton).click();
        cy.get(Locators.commonElements.emailInput).type(correctEmail);
        cy.get(Locators.commonElements.passwordInput).type(correctPassword);
        cy.get(Locators.commonElements.submitButton).click();
        cy.get(Locators.Header.logoutButton).should('be.visible');
    });

    // it ('Logout',()=>{
    //     cy.wait(2000);
    //     cy.get(Locators.Header.logoutButton).click();
    //     cy.get(Locators.Header.logoutButton).should('not.exist');
    // });

    it ('Login with invalid credentials',()=>{
        cy.get(Locators.Header.loginButton).click();
        cy.get(Locators.commonElements.emailInput).type(userData.randomEmail);
        cy.get(Locators.commonElements.passwordInput).type(userData.randomPassword);
        cy.get(Locators.commonElements.submitButton).click();
        cy.get(Locators.Header.logoutButton).should('not.exist');
    });
    
    
});