/// <reference types="Cypress" />

import { createGallery } from './../page_objects/createGallery';
import { navigationPage } from '../page_objects/navigationPage';
import { title, description, image1, image2, wrongFormat, wrongDescription, wrongTitle} from '../fixtures/userData.json'

describe('create gallery',()=>{

    beforeEach('log into the app',()=>{
        cy.loginViaBackend(Cypress.env("validEmailAdress"), Cypress.env ("validPassword"));  
        cy.visit('/create');
        cy.url().should('contains', 'https://gallery-app')
        navigationPage.logoutButton.should('be.visible');
    });


//NEGATIVE TEST CASES
    it ('Negative - Create gallery with wrong format of image',()=>{
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/galleries'
        ).as('unsuccessfullyCreatedGallery');

        createGallery.createGal (
            title,
            description,
            wrongFormat
        )

        cy.wait('@unsuccessfullyCreatedGallery').then((interception)=>{
            console.log(interception.response)
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.statusMessage).eq("Unprocessable Entity");
            expect(interception.response.body.message).eq("The given data was invalid.");
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
    });

    it ('Negative - Create gallery with 256 title characters',()=>{
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/galleries'
        ).as('unsuccessfullyCreatedGallery');

        createGallery.createGal (
            wrongTitle,
            description,
            image1
        )

        cy.wait('@unsuccessfullyCreatedGallery').then((interception)=>{
            console.log(interception.response)
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.errors.title[0]).eq("The title may not be greater than 255 characters.");
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
    });

    it ('Negative - Create gallery with 1001 description characters',()=>{
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/galleries'
        ).as('unsuccessfullyCreatedGallery');

        createGallery.createGal (
            title,
            wrongDescription,
            image1
        )

        cy.wait('@unsuccessfullyCreatedGallery').then((interception)=>{
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.body.message).eq("The given data was invalid.");
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
    });   

    //POSITIVE TEST CASES
    it ('Create gallery with one image',()=>{
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/galleries'
        ).as('successfullyCreatedGallery');

        createGallery.createGal (
            title,
            description,
            image1
        )

        cy.wait('@successfullyCreatedGallery').then((interception)=>{
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')

        navigationPage.logoutButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
    });

    it ('Create gallery with two images',()=>{
        cy.intercept(
            'POST',
            'https://gallery-api.vivifyideas.com/api/galleries'
        ).as('successfullyCreatedGallery');

        createGallery.createGalTwo (
            title,
            description,
            image1,
            image2
        )

        cy.wait('@successfullyCreatedGallery').then((interception)=>{
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
    }); 

   it ('Check created gallery 2186',()=>{
        cy.intercept(
            'GET',
            'https://gallery-api.vivifyideas.com/api/galleries/2186'
        ).as('galleryId');

        cy.visit('/galleries/2186');

        cy.wait('@galleryId').then((interception)=>{
            console.log(interception.response);
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body.images[0].id).eq(4127);
            expect(interception.response.body.images[1].id).eq(4128);
            expect(interception.response.body.user_id).eq(+window.localStorage.userId);
        });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
    });

    //test pada, cypress ne prepoznaje Delete dugme
    it ('Delete own gallery 2186',()=>{
        cy.visit ("/galleries/2186");
        cy.get("button").contains("Delete Gallery").click({force:true})
        
        cy.intercept(
            'DELETE',
            'https://https://gallery-api.vivifyideas.com/api/galleries/2203'
        ).as('deleteGallery');

        cy.wait('@deleteGallery').then((interception)=>{
            expect(interception.response.statusCode).eq(200);
        });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
    });
});



