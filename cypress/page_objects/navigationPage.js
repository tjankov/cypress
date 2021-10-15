export default class NavigationPage {

get registerButton(){
    return cy.get('a[href="/register"]');
}

get loginButton (){
    return cy.get ("a[href='/login']");
}

get logoutButton (){
    return cy.get ("a[role='button ']");
}

get createButton (){
    return cy.get ("a[href='/create']");
}

get galleryAppButton (){
    return cy.get ("a[href='/']").first();
}

get allGalleriesButton (){
    return cy.get ("a[href='/']").last();
}

get myGalleriesButton (){
    return cy.get ("a[href='/my-galleries']");
}
}

export const navigationPage = new NavigationPage();