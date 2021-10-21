/// <reference types="Cypress" />

import { loginPage } from '../page_objects/loginPage'

beforeEach('log into the app',()=>{
    cy.loginViaBackend(Cypress.env("validEmailAdress"), Cypress.env ("validPassword"));  
    cy.visit('/create');
    loginPage.logoutButton.should('be.visible');
});

describe('BE gallery',()=>{
    //CREATE GALLERY
    it('test create gallery via BE', () => {
        cy.createGalleryViaBackend(Cypress.env("title"), Cypress.env ("description"), Cypress.env ("image1")).then ((responseObject)  => {
            let id = responseObject.body.id;
            cy.writeFile('galleryId.json', id.toString());
        });
        cy.visit('/');
    });       

    //DELETE GALLERY
    it('test delete gallery via BE', () => {
        cy.readFile('./galleryId.json').then((file) => {
            let galleryId = file;
            cy.deleteGalleryViaBackend(galleryId);
        });
    });
});

