
describe('constructor is open', function() {
    before(function() {
        cy.visit('http://localhost:3000');
        cy.get('[class^=ingredient-card_ingedientCard__]').first().as('ingredients');    
    });

    it("Modal open/close", function () {
        cy.get('@ingredients').click();
        cy.get('[class^=modal_modalWrapper__]').should('be.visible');
        cy.get('[class^=icon_close]').click();
        cy.get('[class^=modal_modalWrapper__]').should('not.exist');
    });

    it("Drag and Drop buns is working", function () {
        cy.get('[data-cypress=ingredient').eq(1).as('bun');

        cy.get('@bun').trigger('dragstart');
        cy.get('[data-cypress=constructor-section]').eq(0).trigger('drop');
        cy.get('[data-cypress=constructor-section]').eq(0).children('div.constructor-element').should('have.length',1);
        cy.get('[data-cypress=constructor-section]').eq(2).children('div.constructor-element').should('have.length',1);
        
        cy.get('[data-cypress=total-cost]').contains('1976');
    });

    it("Drag and Drop main ingredients is working", function () {
        cy.get('[data-cypress=constructor-ul]').as('constructor-ul')
        cy.get('[data-cypress=ingredient]').eq(5).as('main1');
        cy.get('[data-cypress=ingredient]').eq(7).as('main2');
        cy.get('[data-cypress=ingredient]').eq(8).as('main3');
        
        cy.get('@main1').trigger('dragstart');
        cy.get('@constructor-ul').trigger('drop')
        cy.get('@constructor-ul').children('li').should('have.length',3);

        cy.get('@main2').trigger('dragstart');
        cy.get('@constructor-ul').trigger('drop')
        cy.get('@constructor-ul').children('li').should('have.length',4);

        cy.get('@main3').trigger('dragstart');
        cy.get('@constructor-ul').trigger('drop')
        cy.get('@constructor-ul').children('li').should('have.length',5);

        cy.get('[data-cypress=total-cost]').contains('4036');
    });

    it("Delete ingredient from constructor", function () {
        cy.get('[class^=constructor-element]').contains('Биокотлета').siblings('[class^=constructor-element__action]').click();
        cy.get('[class^=constructor-element]').contains('Биокотлета').should('not.exist')
    });

    it("Get order, modal open/close", function () {
        cy.get('[class^=button_button__]').contains('Оформить заказ').click();
        cy.contains("Вход").then( () => {
            cy.contains("E-mail").click();
            cy.contains("E-mail").type("j@ya.ru");
            cy.contains("Пароль").click();
            cy.contains("Пароль").type("0000Jj");
            cy.contains("Войти").click();
            cy.contains('Оформить заказ').click();
        })
        cy.contains("Загрузка").should("be.visible");
        cy.wait(15000);
        cy.contains("идентификатор заказа").should("be.visible");
        cy.get('[class^=icon_close]').click();        
    });
    
  }); 