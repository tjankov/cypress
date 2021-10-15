/// <reference types="Cypress" />

import { navigationPage } from '../page_objects/navigationPage';
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

    it ('Negative: login with invalid password',()=>{
        cy.intercept (
            'POST', 
            'https://gallery-api.vivifyideas.com/api/auth/login'
        ).as("invalidLogin");
        
        loginPage.login(correctEmail,userData.randomPassword);

        cy.wait('@invalidLogin').then((interception)=>{
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.body.error).eq("Unauthorized");
            expect(interception.response.statusMessage).eq("Unauthorized")
            console.log(interception.response)
        });

        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
    });

    it ('Negative: login with invalid email',()=>{
        cy.intercept (
            'POST', 
            'https://gallery-api.vivifyideas.com/api/auth/login'
        ).as("invalidLogin");
        
        loginPage.login(userData.randomEmail,correctPassword);

        cy.wait('@invalidLogin').then((interception)=>{
            expect(interception.response.statusCode).eq(401);
            expect(interception.response.body.error).eq("Unauthorized");
            expect(interception.response.statusMessage).eq("Unauthorized")
            console.log(interception.response)
        });

        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
    });

    it ('Login with valid credentials',()=>{
        cy.intercept (
            'POST', 
            'https://gallery-api.vivifyideas.com/api/auth/login'
        ).as("validLogin");
        
        loginPage.login(correctEmail,correctPassword);

            cy.wait('@validLogin').then((interception)=>{
                expect(interception.response.statusCode).eq(200);
                console.log(interception.response)
            });

            navigationPage.logoutButton.should('be.visible');
            navigationPage.createButton.should('be.visible');
            navigationPage.galleryAppButton.should('be.visible');
            navigationPage.allGalleriesButton.should('be.visible');
            navigationPage.myGalleriesButton.should('be.visible');
            navigationPage.loginButton.should('not.exist');
            navigationPage.registerButton.should('not.exist');
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
            expect(interception.response.body.message).eq('Successfully logged out');
            expect(interception.response.statusCode).eq(200);
        });

        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
    });
});






