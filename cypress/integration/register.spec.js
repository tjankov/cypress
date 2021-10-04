 /// <reference types="Cypress" />

 describe ("register tests",() => {
    it ("visit gallery page", () => {
        cy.visit("");
    });

    it ("register button", ()=>{
        cy.get ('a[href="/register"]').click();   
    });

    // it ("login with valid data", () => {
    //     cy.wait (5000);
    //     cy.get ('input[id="first-name"]').type('Tamara')
    //     cy.get ('input[id="last-name"]').type('Jankov')
    //     cy.get ('input[id="email"]').type('tamarajankov@test1.com')
    //     cy.get ('input[id="password"]').type('test1234') 
    //     cy.get ('input[id="password-confirmation"]').type('test1234')
    //     cy.get ('input[type="checkbox"]').check();
    //     cy.get ('button[class="btn btn-custom"]').click();
    // })

    it ("register with too many characters in first name",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamaraaaaaa')
        cy.get ('input[id="last-name"]').clear().type('Jankov')
        cy.get ('input[id="email"]').clear().type('tamarajankov@test2.com')
        cy.get ('input[id="password"]').clear().type('test1234') 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234')
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })



})