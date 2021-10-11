/// <reference types="Cypress" />

import { createGallery } from './../page_objects/createGallery';

describe('POM login',()=>{
    let correctEmail = 'pera30@gmail.com';
    let correctPassword = 'pera1234';
    let title =  'Jesen';
    let description = 'Hladan kisni dan';
    let image1 = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/rainy-autumn-day-mike-murdock.jpg';
    let image2 = 'https://c.stocksy.com/a/Zsy400/z9/1187335.jpg';
    

    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')
    });

    it ('Create gallery with one image',()=>{
        createGallery.login(correctEmail,correctPassword);
        createGallery.createButton.should('be.visible');
        createGallery.createGal(title,description,image1);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    });

    it ('Create gallery with two images',()=>{
        createGallery.login(correctEmail,correctPassword);
        createGallery.createButton.should('be.visible');
        createGallery.createGalTwo(title,description,image1,image2);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
    });

    it ('Create gallery with all empty fields',()=>{
        createGallery.login(correctEmail,correctPassword);
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmpty();
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });

    it ('Create gallery with empty title',()=>{
        createGallery.login(correctEmail,correctPassword);
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmptyTitle(description,image2);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });

    it ('Create gallery with empty description',()=>{
        createGallery.login(correctEmail,correctPassword);
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmptyDescription(title,image2);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });

    it ('Create gallery with empty image',()=>{
        createGallery.login(correctEmail,correctPassword);
        createGallery.createButton.should('be.visible');
        createGallery.createGalEmptyImage(title,description);
        createGallery.logoutButton.should('be.visible');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/create');
    });
    
 });