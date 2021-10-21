export default class RegisterPage {

    get checkboxInput(){
        return cy.get('input[type="checkbox"]');
    };
    
    get submitButton(){
        return cy.get('button[type="submit"]');
    };
    
    get registerButton(){
        return cy.get('a[href="/register"]');
    };
    
    getInputField (name){
        return cy.get (`#${name}`)
    };
    
    get errorMessage1 (){
        return cy.get (".alert").first();
    };
    
    get errorMessage2 (){
        return cy.get (".alert").last();
    };

    register (firstName, lastName, email, password, passwordConfirmation){
        this.registerButton.click();
        this.getInputField(`first-name`).type(firstName);
        this.getInputField(`last-name`).type(lastName);
        this.getInputField(`email`).type(email);
        this.getInputField(`password`).type(password);
        this.getInputField(`password-confirmation`).type(passwordConfirmation);
        this.checkboxInput.check();
        this.submitButton.click();
    };
};

export const registerPage = new RegisterPage();