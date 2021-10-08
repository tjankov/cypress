 /// <reference types="Cypress" />

describe ("login tests",() => {
    it ("visit gallery page", () => {
        cy.visit("");
    });

    it ("click login button", () =>{
        cy.get ('a[href="/login"]').click();
    })
    
//POSITIVE TEST CASES

    it ("login with valid data", () => {
        cy.get ('input[id="email"]').type('pera30@gmail.com')
        cy.get ('input[id="password"]').type('pera1234')
        cy.get ('button[type="submit"]').click();
    })

    //it ("logout", ()=>{
       // cy.get ('a[role="button "]').click();
    //})

    it ("logout", ()=>{
        cy.wait (3000);
        cy.get('a[class="nav-link nav-buttons"]').eq(2).click();
    })


//NEGATIVE TEST CASES

    it ("login with invalid password",() =>{
        cy.wait (3000);
        cy.get ('input[id="email"]').type('pera30@gmail.com')
        cy.get ('input[id="password"]').clear().type(' ')
        cy.get ('button[type="submit"]').click();
    })

    it ("login with invalid email",() =>{
        cy.wait (3000);
        cy.get ('input[id="email"]').clear().type(' ')
        cy.get ('input[id="password"]').clear().type('pera1234');
        cy.get ('button[type="submit"]').click();
    })

    it ("login without password",() =>{
        cy.wait (3000);
        cy.get ('input[id="email"]').clear().type('pera30@gmail.com');
        cy.get ('input[id="password"]').clear();
        cy.get ('button[type="submit"]').click();
    })

    it ("login without email",() =>{
        cy.wait (3000);
        cy.get ('input[id="email"]').clear();
        cy.get ('input[id="password"]').clear().type('pera1234');
        cy.get ('button[type="submit"]').click();
    })

    it ("login with all empty fields",() =>{
        cy.wait (3000);
        cy.get ('input[id="email"]').clear();
        cy.get ('input[id="password"]').clear();
        cy.get ('button[type="submit"]').click();
    })

});

