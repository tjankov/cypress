export default class RegisterPage {

    get firstNameInput(){
        return cy.get('input[id="first-name"]');
    }
    get lastNameInput(){
        return cy.get('input[id="last-name"]');
    }
    get emailInput(){
        return cy.get('input[id="email"]');
    }
    get passwordInput(){
        return cy.get('input[id="password"]');
    }
    get passwordConfirmationInput(){
        return cy.get('input[id="password-confirmation"]');
    }
    get checkboxInput(){
        return cy.get('input[type="checkbox"]');
    }
    get submitButton(){
        return cy.get('button[type="submit"]');
    }

    get registerButton(){
    return cy.get('a[href="/register"]');
}

    register (firstName, lastName, email, password, passwordConfirmation){
        this.registerButton.click();
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmationInput.type(passwordConfirmation);
        this.checkboxInput.check();
        this.submitButton.click();
    }

    get errorMessage1 (){
        return cy.get (".alert").first();
    }

    get errorMessage2 (){
        return cy.get (".alert").last();
    }

} 

export const registerPage = new RegisterPage();