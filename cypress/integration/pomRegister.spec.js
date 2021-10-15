/// <reference types="Cypress" />

import { navigationPage } from './../page_objects/navigationPage';
import { registerPage } from './../page_objects/registerPage';

const faker = require ('faker');

describe('Intercept register',()=>{
         
    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')
    });

    it ('Negative - register with no matching password',()=>{
       
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/auth/register'
        ).as('errorMessage');

        let firstName= "Tamara";
        let lastName= "Jankov";
        let email = "tamara@jankov.com";
        let password = "tamara1";
        let passConfirm = "tamara";


        registerPage.register(
           firstName,
           lastName, 
           email, 
           password, 
           passConfirm
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.errors.password[1]).eq("The password confirmation does not match.");
            expect(interception.response.statusMessage).eq("Unprocessable Entity")
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
        }); 
          
        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
    });

    it ('Negative - register only with letters',()=>{
       
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/auth/register'
        ).as('errorMessage');

        let firstName= "Tamara";
        let lastName= "Jankov";
        let email = "tamara@jankov.com";
        let password = "tamaraja";


        registerPage.register(
           firstName,
           lastName, 
           email, 
           password, 
           password
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.message).eq("The given data was invalid.");
            expect(interception.response.statusMessage).eq("Unprocessable Entity")
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
        }); 
          
        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
    });


    it ('Negative - register with not enough characters in password',()=>{
       
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/auth/register'
        ).as('errorMessage');

        let firstName= "Tamara";
        let lastName= "Jankov";
        let email = "tamara@jankov.com";
        let password = "tamara1";


        registerPage.register(
           firstName,
           lastName, 
           email, 
           password, 
           password
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.errors.password[0]).eq("The password must be at least 8 characters.");
            expect(interception.response.statusMessage).eq("Unprocessable Entity")
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
            console.log(interception.response);
        }); 
          
        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
    });

    it ('Negative - register with too much characters in Last name',()=>{
       
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/auth/register'
        ).as('errorMessage');

        let firstName= "Tamara";
        let lastName= "ccWrIZ6q1QR75XWabCCDmVviaKLBWAvdpjnbThgz5TE3EkGFe5Rjxb9SkXDuYmDxzdzbWxyaWRO1Gf1ivnjs8FrKZN4Q4xwumeIjbrNejNmR9Ek3Q0B5CcqvUU1BNVFwUmWMwq1A8Ay3KTqkdOcPp7yqBGr8JuZEzx3QqewG3UtPV0eJKTVYwdSCvccyCRsi1xzTPLpPwUtUw47KVefGYkofdPKTo3xctEEYjMQAWLqtXnCW2EJvlYAmkGqMOyix";
        let email = "tamara@jankov.com";
        let password = "tamara1234";


        registerPage.register(
           firstName,
           lastName, 
           email, 
           password, 
           password
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(500);
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
           
        }); 
          
        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
    });

    it ('Negative - register with too much characters in First name',()=>{
       
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/auth/register'
        ).as('errorMessage');

        let firstName= "ccWrIZ6q1QR75XWabCCDmVviaKLBWAvdpjnbThgz5TE3EkGFe5Rjxb9SkXDuYmDxzdzbWxyaWRO1Gf1ivnjs8FrKZN4Q4xwumeIjbrNejNmR9Ek3Q0B5CcqvUU1BNVFwUmWMwq1A8Ay3KTqkdOcPp7yqBGr8JuZEzx3QqewG3UtPV0eJKTVYwdSCvccyCRsi1xzTPLpPwUtUw47KVefGYkofdPKTo3xctEEYjMQAWLqtXnCW2EJvlYAmkGqMOyix";
        let lastName= "Jankov";
        let email = "tamara@jankov.com";
        let password = "tamara1234";


        registerPage.register(
           firstName,
           lastName, 
           email, 
           password, 
           password
        );

        cy.wait('@errorMessage').then((interception)=>{
            expect(interception.response.statusCode).eq(500);
            expect(interception.response.statusMessage).eq("Internal Server Error");
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register"); 
           
        }); 
          
        navigationPage.logoutButton.should('not.exist');
        navigationPage.createButton.should('not.exist');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('not.exist');
        navigationPage.loginButton.should('be.visible');
        navigationPage.registerButton.should('be.visible');
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

        let userData = {
            randomFirstName: faker.name.firstName(),
            randomLastName: faker.name.lastName(),
            randomEmail: faker.internet.email(),
        }

        let password = "1234test"

        registerPage.register(
            userData.randomFirstName,
            userData.randomLastName, 
            userData.randomEmail, 
            password, 
            password);
        
            cy.url().should('include', '/register')
           
        cy.wait('@validRegistration').then((interception)=>{
            console.log(interception.response);
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
            expect(interception.response.url).eq("https://gallery-api.vivifyideas.com/api/auth/register");
            });
           
            cy.wait('@redirectAsRegisteredUser').then((interception)=>{
                expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=')
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.createButton.should('be.visible');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
        navigationPage.registerButton.should('not.exist');
    });    
});
