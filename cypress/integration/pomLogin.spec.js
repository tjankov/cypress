/// <reference types="Cypress" />

import { loginPage } from './../page_objects/loginPage';

const faker = require ('faker');

describe('POM login',()=>{
    let correctEmail = 'pera30@gmail.com';
    let correctPassword = 'pera1234';
    
    let userData = {
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password()
    }
    
    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')
    });

    it ('Login with valid credentials',()=>{
        loginPage.login(correctEmail,correctPassword);
        loginPage.logoutButton.should('be.visible');
    });

    it ('Logout',()=>{
        loginPage.login(correctEmail,correctPassword);
        loginPage.logout();
        loginPage.logoutButton.should('not.exist');
    });

    it ('Login with invalid credentials',()=>{
        loginPage.login(userData.randomEmail,userData.randomPassword);
        loginPage.logoutButton.should('not.exist');
    });
    
    
});