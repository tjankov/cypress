 /// <reference types="Cypress" />

 describe ("register tests",() => {
    it ("visit gallery page", () => {
        cy.visit("");
    });

    it ("register button", ()=>{
        cy.get ('a[href="/register"]').click();   
    });

//POSITIVE TEST CASES

    it ("register with valid credentials", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').type('Tamara');
        cy.get ('input[id="last-name"]').type('Jankov');
        cy.get ('input[id="email"]').type('tamarajankov@1tttestqa.com');
        cy.get ('input[id="password"]').type('test1234');
        cy.get ('input[id="password-confirmation"]').type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("logout", () => {
        cy.get ('a[role="button "]').click();
    })

    it ("register with valid credentials in cyrillic", () => {
        cy.wait (2000);
        cy.get ('a[href="/register"]').click();
        cy.get ('input[id="first-name"]').type('Тамара');
        cy.get ('input[id="last-name"]').type('Јанков');
        cy.get ('input[id="email"]').type('tamarajankov@2tttestqa.com');
        cy.get ('input[id="password"]').type('тест1234');
        cy.get ('input[id="password-confirmation"]').type('тест1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with valid credentials - double First Name", () => {
        cy.wait (2000);
        cy.get ('a[role="button "]').click();
        cy.get ('a[href="/register"]').click();
        cy.get ('input[id="first-name"]').type('Ella-Rose');
        cy.get ('input[id="last-name"]').type('Jankov);
        cy.get ('input[id="email"]').type('tamarajankov@3tttestqa.com');
        cy.get ('input[id="password"]').type('test1234');
        cy.get ('input[id="password-confirmation"]').type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

//NEGATIVE TEST CASES

    it ("register with all empty fields",() =>{
        cy.get ('a[role="button "]').click();
        cy.get ('a[href="/register"]').click();  
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with only checked terms",() =>{
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with all spaces",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type(' ');
        cy.get ('input[id="last-name"]').clear().type(' ');
        cy.get ('input[id="email"]').clear().type(' ');
        cy.get ('input[id="password"]').clear().type(' ');
        cy.get ('input[id="password-confirmation"]').clear().type(' ');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with empty First Name field",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear();
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa1.com');
        cy.get ('input[id="password"]').clear().type('test1234'); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

//more then 255 characters
    it ("register with long First Name",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('3FIcmfG54nfeaLNiIr8Mh8VECrcJcpLpbUfZ44vUx3xqJWMPl4bWV398OOxJBOvMlWTIchAXZy7TbdF50fdeiboAwHyKCxhMjVJm1X8XknbIa06NWmL7J30ttosX0SS6wORL2upPBapOmeFDtOK32aHUI6Jwu6z9hRrAiDgHkssy5WqLmQPFdiTzz2Yo8WPjziNcEilU3PMuUas0R0NsBMBZuwUzf93wJMfmH525n9mJj2rFqz3O0TlX3xm31k6F')
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa2.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with empty Last Name field",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear();
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa3.com');
        cy.get ('input[id="password"]').clear().type('test1234'); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

//more then 255 characters
    it ("register with long Last Name",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('3FIcmfG54nfeaLNiIr8Mh8VECrcJcpLpbUfZ44vUx3xqJWMPl4bWV398OOxJBOvMlWTIchAXZy7TbdF50fdeiboAwHyKCxhMjVJm1X8XknbIa06NWmL7J30ttosX0SS6wORL2upPBapOmeFDtOK32aHUI6Jwu6z9hRrAiDgHkssy5WqLmQPFdiTzz2Yo8WPjziNcEilU3PMuUas0R0NsBMBZuwUzf93wJMfmH525n9mJj2rFqz3O0TlX3xm31k6F') 
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa4.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with empty email field",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear();
        cy.get ('input[id="password"]').clear().type('test1234'); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with missing @ in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankovtestqa.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with with missing full stop in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@testqacom');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with with missing com in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@testqa.');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with with missing first part in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('@testqa.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with with double @ in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@@testqa.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with with more than one @ in email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamara@jankov@testqa.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("empty password",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa5.com');
        cy.get ('input[id="password"]').clear(); 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

//8 letters
    it ("register with invalid password format", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa6.com');
        cy.get ('input[id="password"]').clear().type('testtest');
        cy.get ('input[id="password-confirmation"]').clear().type('testtest');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

//7 characters
    it ("register with not enough characters in password", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa7.com');
        cy.get ('input[id="password"]').clear().type('test123');
        cy.get ('input[id="password-confirmation"]').clear().type('test123');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with empty password confirmation",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa8.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear();
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with no matching password and password confirmation",() =>{
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa9.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('1234test');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })

    it ("register with already registered email", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara');
        cy.get ('input[id="last-name"]').clear().type('Jankov');
        cy.get ('input[id="email"]').clear().type('tamarajankov@testqa.com');
        cy.get ('input[id="password"]').clear().type('test1234');
        cy.get ('input[id="password-confirmation"]').clear().type('test1234');
        cy.get ('input[type="checkbox"]').check();
        cy.get ('button[class="btn btn-custom"]').click();
    })  

    it ("register with unchecked terms", () => {
        cy.wait (2000);
        cy.get ('input[id="first-name"]').clear().type('Tamara')
        cy.get ('input[id="last-name"]').clear().type('Jankov')
        cy.get ('input[id="email"]').clear().type('tamarajankov@atestqa11.com')
        cy.get ('input[id="password"]').clear().type('test1234') 
        cy.get ('input[id="password-confirmation"]').clear().type('test1234')
        cy.get ('input[type="checkbox"]').uncheck();
        cy.get ('button[class="btn btn-custom"]').click();
    })
})