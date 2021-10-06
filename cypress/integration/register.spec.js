 /// <reference types="Cypress" />

 describe ("register tests",() => {
    it ("visit gallery page", () => {
        cy.visit("");
    });

    it ("register button", ()=>{
        cy.get ('a[href="/register"]').click();   
    });

    it ("login with valid data", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').type('Tamara');
        cy.get ('input[id="last-name"]').type('Jankov');
        cy.get ('input[id="email"]').type('tamarajankov@1qa1.com');
        cy.get ('input[id="password"]').type('test1234');
        cy.get ('input[id="password-confirmation"]').type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("all empty fields",() =>{
        cy.get ('a[role="button "]').click();
        cy.get ('a[href="/register"]').click();  
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("check only terms",() =>{
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("all spaces",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type(' ');
        cy.get ('input[id="last-name"]').clear().type(' ');
        cy.get ('input[id="email"]').clear().type(' ');
        cy.get ('input[id="password"]').clear().type(' ');
        cy.get ('input[id="password-confirmation"]').clear().type(' ');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("too much characters in First Name",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('3FIcmfG54nfeaLNiIr8Mh8VECrcJcpLpbUfZ44vUx3xqJWMPl4bWV398OOxJBOvMlWTIchAXZy7TbdF50fdeiboAwHyKCxhMjVJm1X8XknbIa06NWmL7J30ttosX0SS6wORL2upPBapOmeFDtOK32aHUI6Jwu6z9hRrAiDgHkssy5WqLmQPFdiTzz2Yo8WPjziNcEilU3PMuUas0R0NsBMBZuwUzf93wJMfmH525n9mJj2rFqz3O0TlX3xm31k6F')
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa2.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("empty First Name",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear();
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa3.com');
        cy.get ('input[id="password"]').clear().type('test1234'); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })



    it ("too much characters in Last Name",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('3FIcmfG54nfeaLNiIr8Mh8VECrcJcpLpbUfZ44vUx3xqJWMPl4bWV398OOxJBOvMlWTIchAXZy7TbdF50fdeiboAwHyKCxhMjVJm1X8XknbIa06NWmL7J30ttosX0SS6wORL2upPBapOmeFDtOK32aHUI6Jwu6z9hRrAiDgHkssy5WqLmQPFdiTzz2Yo8WPjziNcEilU3PMuUas0R0NsBMBZuwUzf93wJMfmH525n9mJj2rFqz3O0TlX3xm31k6F') 
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa4.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })


    it ("empty Last Name",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear();
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa5.com');
        cy.get ('input[id="password"]').clear().type('test1234'); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })


    it ("@ not included in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov1qa1.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("full stop not included in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa1com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("com not included in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa1.');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("empty email",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear();
        cy.get ('input[id="password"]').clear().type('test1234'); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("invalid password format", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa6.com');
        cy.get ('input[id="password"]').clear().type('testtest');
        cy.get ('input[id="password-confirmation"]').clear().type('testtest');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("not enough characters in password", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa7.com');
        cy.get ('input[id="password"]').clear().type('test123');
        cy.get ('input[id="password-confirmation"]').clear().type('test123');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("empty password",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa8.com');
        cy.get ('input[id="password"]').clear(); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("empty password confirmation",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa9.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear();
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("no mach password confirmation",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa10.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('1234test');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })


    it ("email allready exist", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa1.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })  

    it ("uncheck terms", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara')
        cy.get ('input[id="last-name"]').clear().type('Jankov')
        cy.get ('input[id="email"]').clear().type('tamarajankov@1qa11.com')
        cy.get ('input[id="password"]').clear().type('test1234') 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234')
        cy.get ('input[type="checkbox"]').uncheck();
        cy.get ('button[class="btn btn-custom"]').click();
    })
})