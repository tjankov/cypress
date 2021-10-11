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

    it.only ('Login with valid credentials',()=>{
        cy.intercept (
            'POST', 
            'https://gallery-api.vivifyideas.com/api/auth/login'
        ).as("validLogin");
        
        loginPage.login(correctEmail,correctPassword);

            cy.wait('@validLogin').then((interception)=>{
                expect(interception.response.statusCode).eq(200);
            });

        loginPage.logoutButton.should('be.visible');
    });

    it ('Logout',()=>{
        cy.intercept (
            "POST",
            'https://gallery-api.vivifyideas.com/api/auth/logout'
        ).as('logout');

        loginPage.login(correctEmail,correctPassword);
        loginPage.logout();
        loginPage.logoutButton.should('not.exist');

        cy.wait ('@logout').then((interception)=>{
            expect(interception.response.body.message).eq('Successfuly logged out');
            expect(interception.response.statusCode).eq(200);
        });
    });

    it ('Login with invalid credentials',()=>{
        loginPage.login(userData.randomEmail,userData.randomPassword);
        loginPage.logoutButton.should('not.exist');
        loginPage.errorMessage.should('be.visible');
        loginPage.errorMessage.should('have css', 'background color', 'rgb(248, 215, 218)');
        loginPage.errorMessage.should('have.text', 'Bad Credentials');
    });
    
    
});