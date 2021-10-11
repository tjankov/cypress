/// <reference types="Cypress" />

import { createGallery } from './../page_objects/createGallery';
import { loginPage } from '../page_objects/loginPage';

describe('create gallery',()=>{
    let title =  'Jesen';
    let description = 'Hladan kisni dan';
    let image1 = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/rainy-autumn-day-mike-murdock.jpg';
    let image2 = 'https://c.stocksy.com/a/Zsy400/z9/1187335.jpg';
    

    beforeEach('log into the app',()=>{
        cy.loginViaBackend(Cypress.env("validEmailAdress"), Cypress.env ("validPassword"));  
        cy.visit('/create');
        loginPage.logoutButton.should('be.visible');
    });


    it ('Create gallery with one image',()=>{
        createGallery.createGal(title,description,image1);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    });

    it ('Create gallery with two images',()=>{
        createGallery.createButton.should('be.visible');
        createGallery.createGalTwo(title,description,image1,image2);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    });

    it ('Create gallery with all empty fields',()=>{
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmpty();
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });

    it ('Create gallery with empty title',()=>{
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmptyTitle(description,image2);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });

    it ('Create gallery with empty description',()=>{
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmptyDescription(title,image2);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });

    it ('Create gallery with empty image',()=>{
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmptyImage(title,description);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });
    
 });