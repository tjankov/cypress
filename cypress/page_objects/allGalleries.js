export default class AllGalleries {    
    
    get submitButton (){
        return cy.get ("button[type='submit']");
    } 

    get loginButton (){
        return cy.get ("a[href='/login']");
    }

    get emailInput (){
        return cy.get ("#email");
    }

    get passwordInput (){
        return cy.get ("#password");
    }

    get myIdImage (){
        return cy.get ("a[href='/galleries/1934']");
    }

    login (email,password){
        this.loginButton.click();
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.submitButton.click();
    }

    checkImage (){
        this.myIdImage.click();
    }
}
    
export const allGalleries = new AllGalleries();
