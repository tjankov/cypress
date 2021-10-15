/// <reference types="Cypress" />

import { createGallery } from './../page_objects/createGallery';
import { loginPage } from '../page_objects/loginPage';
import { navigationPage } from '../page_objects/navigationPage';

describe('create gallery',()=>{

    beforeEach('log into the app',()=>{
        cy.loginViaBackend(Cypress.env("validEmailAdress"), Cypress.env ("validPassword"));  
        cy.visit('/create');
        cy.url().should('contains', 'https://gallery-app')
        navigationPage.logoutButton.should('be.visible');
    });

    let title =  'Jesen';
    let description = 'Hladan kisni dan';
    let image1 = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/rainy-autumn-day-mike-murdock.jpg';
    let image2 = 'https://c.stocksy.com/a/Zsy400/z9/1187335.jpg';
    let wrongFormat = "http://wrongFormat";
    let wrongDescription = "y1PZvMhK2h0PtsaaGGP3VgzFOvvK8GyQTSyy3eeHXlmSKKgMl553rFdngCGNAVzlS26J0uDR5FhjrprSTWqTQjS3hPIlMwg2fiBfoK7XQ1VYpedvzL62WwzuJiwFVllogEXVZgEkZnRlwma5AWyz0FNH754y5t6JRowJLYARjVvhSfntwGvONHSv7o5HaBtWUiwJ127ZB0BA42elOwkr0QEG6PuahGrWGivv1hvdyV5SbnSnklhrlGYPGervmD0pVBhi5imWNLJWZJBcD9e6okim8PUeuCvqy9EtiCo56qftTWOvZYPr6QwrSfB2pva9SS45gyY9w5LOeqXuCeexNe17JFSl9XhfV9OWlYmanDvqZlI2rUvXZqKp9kobpJ9LRQx2aqk0nmIQmYJMAcvJHGVkZqyAwueGi7w1EwoDEPjfvGixZxYrs15sBZMzewLSutXSywe5h5d47YzyYkWuN9tAze8DFFfnp1jwOs9tRHwQPuaxdwuBbqppiIaDirciEgw3KGplAcHmOcqnZIsrGTaJE9Qvd7qXLEsXgWXSV2Qy7RqBbjKi995zeVqlmXKewN5Vhpq5Q5BWavZJQ8wlaZjuORSw0utFR7cvfWrBgfVpWn4nccDVTUopo4YQApBLHhjAwQ0hHh6DghATDuma7GvmScOD4wkeRk0E6NKbOJR0TPgnTedDv35K6fUSic9fV4APZFjP6w29KKgMUmjfE9IJ55C5dQ4PwB8UnSgjxv8qmDtzS0qjWnbS6QFp4UylK0O5x9ReRNDWQlsU7HhLn5Fg2XGZM1aazSUHq8FijJzyEkfYW0Pt9lGACA830cftIYShvt5Xt53PnzuVX0ZtYK5TEInvrBdiKvaDxeew2XMxN9Qi0v8oC4UCCzM0vux9175Hr8PLeN2tAxlIOjhm8aUzrYCk8MVPpnlxHycaM4MP24MFvIKGrDXtCtOt1Au6POgMz8plcXUE6quKs5nvX6D6mWMeJ6VDeGNrmF71w";
    let wrongTitle = "6FWxWtqVlJaBXKPJ52yyuz3DnmipCMhSkXLyGEvFPL8ZGkTnA0iEHG1pXJASp5azdOqmqOPQEplkWXRVlqspwOoggFvYpVjyLeLgcGhBQvZXB3wtRWGkLKVRNLiBUcVvhCLaNRV7Yj4DgMldPcZTpvyfwHhoHLkY1jE8OqCf586mrwIHZrfq65aGYn7MsEJSH0x1FIH7jXCMiWSvqjogW4F2QLdyLVVq0jlcauDvO9CNgbN68S4Ii74ZXcw716J7"


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
        navigationPage.createButton.should('be.visible');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
        navigationPage.registerButton.should('not.exist');
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
            expect(interception.response.statusMessage).eq("Unprocessable Entity");
            expect(interception.response.body.message).eq("The given data was invalid.");
            expect(interception.response.body.errors.title[0]).eq("The title may not be greater than 255 characters.");
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.createButton.should('be.visible');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
        navigationPage.registerButton.should('not.exist');
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
            console.log(interception.response)
            expect(interception.response.statusCode).eq(422);
            expect(interception.response.statusMessage).eq("Unprocessable Entity");
            expect(interception.response.body.message).eq("The given data was invalid.");
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.createButton.should('be.visible');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
        navigationPage.registerButton.should('not.exist');
    });   

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
            console.log(interception.response);
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.statusMessage).eq('Created');
            expect(interception.response.body.title).eq('Jesen');
            expect(interception.response.body.description).eq('Hladan kisni dan');
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/')

        navigationPage.logoutButton.should('be.visible');
        navigationPage.createButton.should('be.visible');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
        navigationPage.registerButton.should('not.exist');
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
            console.log(interception.response);
            expect(interception.response.statusCode).eq(201);
            expect(interception.response.body.title).eq('Jesen');
            expect(interception.response.body.description).eq('Hladan kisni dan');
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries');
            });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.createButton.should('be.visible');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
        navigationPage.registerButton.should('not.exist');
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
            expect(interception.response.statusMessage).eq('OK');
            expect(interception.response.body.images[0].id).eq(4127);
            expect(interception.response.body.images[1].id).eq(4128);
            expect(interception.response.body.title).eq('Jesen');
            expect(interception.response.body.images[0].gallery_id).eq(interception.response.body.images[1].gallery_id).eq(2186);
            expect(interception.response.url).eq('https://gallery-api.vivifyideas.com/api/galleries/2186');
            expect(interception.response.body.user_id).eq(+window.localStorage.userId);
    
        });

        navigationPage.logoutButton.should('be.visible');
        navigationPage.createButton.should('be.visible');
        navigationPage.galleryAppButton.should('be.visible');
        navigationPage.allGalleriesButton.should('be.visible');
        navigationPage.myGalleriesButton.should('be.visible');
        navigationPage.loginButton.should('not.exist');
        navigationPage.registerButton.should('not.exist');
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
            console.log(interception.response);
            expect(interception.response.statusCode).eq(200);
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

