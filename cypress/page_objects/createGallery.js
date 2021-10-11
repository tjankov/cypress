export default class CreateGallery {

    get submitButton (){
        return cy.get ("button[type='submit']");
    }

    get submitButtonCreate (){
        return cy.get ("form > :nth-child(4)");
    }

    get addImageButton (){
        return cy.get ("form > :nth-child(3) > :nth-child(3)");
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

    get createButton (){
        return cy.get ("a[href='/create']");
    }

    get titleInput (){
        return cy.get ("#title");
    }

    get descriptionInput (){
        return cy.get ("#description");
    }

    get imageInput1 (){
        return cy.get ("input[type='url']");
    }

    get imageInput2 (){
        return cy.get (":nth-child(3) > .input-group > .form-control");
    }

    get logoutButton (){
        return cy.get ("a[role='button ']");
    }

    get myPhotoId (){
        return cy.get (a[href='/galleries/1934']);
    }


    login (email,password){
        this.loginButton.click();
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.submitButton.click();
    }

    createGal (title, description, images){
        this.createButton.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput1.type(images);
        this.submitButtonCreate.click();
    }

    createGalTwo (title, description, image1, image2){
        this.createButton.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.imageInput1.type(image1);
        this.addImageButton.click();
        this.imageInput2.type(image2);
        this.submitButtonCreate.click();
    }

    createGalEmpty (){
        this.createButton.click();
        this.submitButtonCreate.click();
    }

    createGalEmptyTitle (description, image){
        this.createButton.click();
        this.descriptionInput.type(description);
        this.imageInput1.type(image);
        this.submitButtonCreate.click();
    }

    createGalEmptyDescription (title, image){
        this.createButton.click();
        this.titleInput.type(title);
        this.imageInput1.type(image);
        this.submitButtonCreate.click();
    }

    createGalEmptyImage (title, description){
        this.createButton.click();
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.submitButtonCreate.click();
    }

}

export const createGallery = new CreateGallery();