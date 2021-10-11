/// <reference types="Cypress" />

import { allGalleries } from './../page_objects/allGalleries';

describe('POM login',()=>{
    let correctEmail = 'pera30@gmail.com';
    let correctPassword = 'pera1234';
    

    beforeEach ('visit link',()=>{
        cy.visit('/');
        cy.url().should('contains', 'https://gallery-app')
    });

    it ('Check created gallery with id=1937',()=>{
        allGalleries.login(correctEmail,correctPassword);
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')
        allGalleries.checkImage();
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/galleries/1934')
    });

    
 });