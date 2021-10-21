/// <reference types="Cypress" />

import { navigationPage } from '../page_objects/navigationPage';
import { loginPage } from './../page_objects/loginPage';
import { correctEmail, correctPassword } from './../fixtures/userData.json'

const faker = require ('faker');
let  randomEmail = faker.internet.email();
let randomPassword = faker.internet.password();

describe('POM login',()=>{    
    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')

        cy.intercept (
            'POST', 
            'https://gallery-api.vivifyideas.com/api/auth/login'
        ).as("invalidLogin");   
    });

//NEGATIVE TEST CASES
    it ('Negative: login with invalid password',()=>{
        
        loginPage.login(correctEmail,randomPassword);

        cy.wait('@invalidLogin').then((interception)=>{
            expect(interception.response.statusCode).eq(401);
            loginPage.errorMessage.should('be.visible').and('have.text', 'Bad Credentials');
            navigationPage.logoutButton.should('not.exist');
            navigationPage.loginButton.should('be.visible');   
        });
    });

    it ('Negative: login with invalid email',()=>{
       
        loginPage.login(randomEmail,correctPassword);

        cy.wait('@invalidLogin').then((interception)=>{
            expect(interception.response.statusCode).eq(401);
            loginPage.errorMessage.should('be.visible').and('have.text', 'Bad Credentials');
            navigationPage.logoutButton.should('not.exist');
            navigationPage.loginButton.should('be.visible');
        });
    });

    it ('Login with valid credentials',()=>{
        cy.intercept (
            'POST', 
            'https://gallery-api.vivifyideas.com/api/auth/login'
        ).as("validLogin");
        
        loginPage.login(correctEmail,correctPassword);

        cy.wait('@validLogin').then((interception)=>{
            expect(interception.response.statusCode).eq(200);
            navigationPage.logoutButton.should('be.visible');
            navigationPage.loginButton.should('not.exist');
        });
    });

    it ('Logout',()=>{
        cy.intercept (
            "POST",
            'https://gallery-api.vivifyideas.com/api/auth/logout'
        ).as('logout');

        loginPage.login(correctEmail,correctPassword);
        loginPage.logout();

        cy.wait ('@logout').then((interception)=>{
            expect(interception.response.body.message).eq('Successfully logged out');
            expect(interception.response.statusCode).eq(200);
            navigationPage.logoutButton.should('not.exist');
            navigationPage.loginButton.should('be.visible');
        });
    });
});
