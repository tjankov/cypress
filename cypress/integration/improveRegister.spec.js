/// <reference types="Cypress" />

const Locators = require ('../../cypress/fixtures/Locators.json')
const faker = require ('faker');

describe('Improve register',()=>{
    let userData = {
        randomName: faker.name.firstName(),
        randomLastName: faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password()

    }
    // let correctFirstName = "Pera";
    // let correctLastName = "Peric";
    // let correctEmail = "pera100@gmail.com";
    // let correctPassword = "pera1234";

    
    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')
    });
    // it ('Register with valid credentials',()=>{
    //     cy.get(Locators.Header.registerButton).click();
    //     cy.get(Locators.registerPage.firstNameInput).type(correctFirstName);
    //     cy.get(Locators.registerPage.lastNameInput).type(correctLastName);
    //     cy.get(Locators.commonElements.emailInput).type(correctEmail);
    //     cy.get(Locators.commonElements.passwordInput).type(correctPassword);  
    //     cy.get(Locators.registerPage.passwordConfirmationInput).type(correctPassword);
    //     cy.get(Locators.registerPage.checkBox).check();
    //     cy.get(Locators.commonElements.submitButton).click();
    //     cy.get(Locators.header.logoutButton).should('be.visible');
    // });

    it ('Register with invalid credentials',()=>{
        cy.get(Locators.Header.registerButton).click();
        cy.get(Locators.registerPage.firstNameInput).type(userData.randomName);
        cy.get(Locators.registerPage.lastNameInput).type(userData.randomLastName);
        cy.get(Locators.commonElements.emailInput).type(userData.randomEmail);
        cy.get(Locators.commonElements.passwordInput).type(userData.randomPassword);  
        cy.get(Locators.registerPage.passwordConfirmationInput).type(userData.randomPassword);
        cy.get(Locators.registerPage.checkBox).check();
        cy.get(Locators.commonElements.submitButton).click();
        cy.get(Locators.Header.logoutButton).should('be.visible');
    });


    
    
});