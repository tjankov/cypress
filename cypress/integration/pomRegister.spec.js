/// <reference types="Cypress" />

import { navigationPage } from './../page_objects/navigationPage';
import { registerPage } from './../page_objects/registerPage';
import { correctPassword, firstName, lastName, testEmail, testPassword, passConfirm, letterPass, longName} from '../fixtures/userData.json';

const faker = require ('faker');

let userData = {
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomEmail: faker.internet.email(),
}

describe('Intercept register',()=>{
         
    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')

        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/auth/register'
        ).as('errorMessage');
    });

//NEGATIVE TEST CASES
    it ('Negative - register with no matching password',()=>{

        registerPage.register(
           firstName,
           lastName, 
           testEmail, 
           correctPassword, 
           passConfirm
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.errors.password[0]).eq("The password confirmation does not match.");
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
            navigationPage.logoutButton.should('not.exist');
            navigationPage.loginButton.should('be.visible');
        }); 
    });

    it ('Negative - register only with letters',()=>{

        registerPage.register(
           firstName,
           lastName, 
           testEmail, 
           letterPass, 
           letterPass
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.message).eq("The given data was invalid.");
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
            navigationPage.logoutButton.should('not.exist');
             navigationPage.loginButton.should('be.visible');
        }); 
    });

    it ('Negative - register with not enough characters in password',()=>{

        registerPage.register(
           firstName,
           lastName, 
           testEmail, 
           testPassword, 
           testPassword
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.errors.password[0]).eq("The password must be at least 8 characters.");
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
            navigationPage.logoutButton.should('not.exist');
            navigationPage.loginButton.should('be.visible');
        });    
    });

    it ('Negative - register with too much characters in Last name',()=>{

        registerPage.register(
           firstName,
           longName, 
           testEmail, 
           correctPassword, 
           correctPassword
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(500);
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register");
            navigationPage.logoutButton.should('not.exist');
            navigationPage.loginButton.should('be.visible'); 
        });  
    });

    it ('Negative - register with too much characters in First name',()=>{

        registerPage.register(
           longName,
           lastName, 
           testEmail, 
           correctPassword, 
           correctPassword
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(500);
            expect(interception.response.statusMessage).eq("Internal Server Error");
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
            navigationPage.logoutButton.should('not.exist');
            navigationPage.loginButton.should('be.visible');
        }); 
    });

    it ('Register with valid credentials',()=>{
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/auth/register'
        ).as('validRegistration');
      
        cy.intercept(
            'GET',
            'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
        ).as('redirectAsRegisteredUser');

        registerPage.register(
            userData.randomFirstName,
            userData.randomLastName, 
            userData.randomEmail, 
            correctPassword, 
            correctPassword);
        
        cy.wait('@validRegistration').then((interception)=>{
            console.log(interception.response);
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
            cy.url().should('include', '/register');
            });
           
        cy.wait('@redirectAsRegisteredUser').then((interception)=>{
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=')
            navigationPage.logoutButton.should('be.visible');
            navigationPage.loginButton.should('not.exist');
        });
    });    
});
