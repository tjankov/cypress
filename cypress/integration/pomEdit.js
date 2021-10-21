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
            cy.writeFile('cypress/fixtures/testId.json', id.toString());
        });
        cy.visit('/');
    });       

    //EDIT GALLERY
    it('test edit gallery via BE', () => {
        cy.readFile('cypress/fixtures/testId.json').then((file) => {
            let galleryId = file;
        cy.editGalleryViaBackend(galleryId, Cypress.env("editedTitle"), Cypress.env ("editedDescription"), Cypress.env ("image2")).then ((response)  => {
        expect(response.status).eq(200);
        });
        });
    });
});
