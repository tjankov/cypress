/// <reference types="Cypress" />

import { registerPage } from './../page_objects/registerPage';

const faker = require ('faker');

describe('POM register',()=>{
     
    let userData = {
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password()
    }
    
    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')
    });

    it ('Register',()=>{
        let userData = {
            randomFirstName: faker.name.firstName(),
            randomLastName: faker.name.lastName(),
            randomEmail: faker.internet.email(),
            randomPassword: faker.internet.password()
        }
        registerPage.register(userData.randomFirstName,userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        registerPage.logoutButton.should('be.visible');
    
    });

    it.only ('Unregister',()=>{
        let userData = {
            randomFirstName: faker.name.firstName(),
            randomLastName: faker.name.lastName(),
            randomPassword: faker.internet.password()
        }
        registerPage.register(userData.randomFirstName,userData.randomLastName, "tamara", "tamara", userData.randomPassword);
        registerPage.logoutButton.should('not.exist');
        registerPage.errorMessage.should('be.visible');
    
    });

    
    
    
});