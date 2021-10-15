/// <reference types="Cypress" />


//token mi je ogranicen, tako da vazi samo 3600s
let accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2FsbGVyeS1hcGkudml2aWZ5aWRlYXMuY29tXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjM0MjYxNzY4LCJleHAiOjE2MzQyNjUzNjgsIm5iZiI6MTYzNDI2MTc2OCwianRpIjoiOHRpY2lna092MmtxcGFWdyIsInN1YiI6NjExLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.mPXtI_DMHDyI_cGGHlXHmSGtqwBODs4iVSb9wNuaX2E";


beforeEach('log into the app',()=>{
    cy.loginViaBackend(Cypress.env("validEmailAdress"), Cypress.env ("validPassword"));  
    cy.visit('/create');
});

describe('create gallery',()=>{
    //CREATE GALLERY
    it ('Create and delete gallery via Backend', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries',
            headers: {
            'Authorization': 'Bearer' + accessToken
            },
            body: {
                "title": "Konacno",
                "description": "Upela sam preko backenda da izbrisem galeriju!!!",
                "images": ["http://uspela.jpg"]
            }

        }).then((response) => {
            console.log(response);
            expect(response.status).eq(201);
            expect(response.body.title).eq("Konacno");
            expect(response.body.description).eq("Upela sam preko backenda da izbrisem galeriju!!!");
        }).then((response) => {
            let galleryId = response.body.id
            console.log ("gallery id  :", galleryId)
            
            cy.request({
            //DELETE GALLERY
                method: 'DELETE',
                url: 'https://gallery-api.vivifyideas.com/api/galleries/'+galleryId,
                headers: {
                'Authorization': 'Bearer' + accessToken
                }
            }).then((response) => {
                expect(response.status).eq(200);
            });
        });
    });
});

