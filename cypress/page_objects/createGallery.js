export default class CreateGallery {

    
    get createButton (){
        return cy.get ("a[href='/create']");
    };
    
    get imageInput1 (){
        return cy.get ("input[type='url']").first();
    };

    get imageInput2 (){
        return cy.get ("input[type='url']").last();
    };

    getinputField (id){
        return cy.get (`#${id}`)
    };

    getButton (string){
        return cy.get('button').contains(string)
    };

    createGal (title, description, images){
        this.createButton.click();
        this.getinputField(`title`).type(title);
        this.getinputField(`description`).type(description);
        this.imageInput1.type(images);
        this.getButton('Submit').click();
    };

    createGalTwo (title, description, image1, image2){
        this.createButton.click();
        this.getinputField(`title`).type(title);
        this.getinputField(`description`).type(description);
        this.imageInput1.type(image1);
        this.getButton('Add image').click();
        this.imageInput2.type(image2);
        this.getButton('Submit').click();
    };

    deleteGallery (){
        this.getButton('Delete Gallery').click();
    };
};

export const createGallery = new CreateGallery();
