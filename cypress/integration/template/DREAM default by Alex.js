import {fixCypressSpec} from '../../support'

beforeEach(fixCypressSpec(__filename))


describe('Dream', function () {

    it('successfully loads home', function () {


        cy.visit('/')


        //  cy.scrollTo(0, 500);
        cy.wait(1500);
        cy.wait(1500).get('#layouts-201712181153485a37ac4cc1fc3', {timeout: 5000}).toMatchImageSnapshot();


        //  cy.scrollTo(500, 1500);
        // cy.wait(1500).get('#module-layouts-1--1', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#module-layouts-1--1', {timeout: 5000}).toMatchImageSnapshot();
        ////  cy.scrollTo(2000, 2500);
        // cy.wait(1500).get('#layouts-20190523111416-posts', {timeout: 5000}).toMatchImageSnapshot();
        //
        // cy.wait(1500).get('#module-layouts-1--4', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#module-layouts-1--5', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#module-layouts-1--6', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#module-layouts-1--7', {timeout: 5000}).toMatchImageSnapshot();
        ////  cy.scrollTo(2000, 2500);
        // cy.wait(1500).get('#layouts-20190523111509-shop-products', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#layouts-20190523111906', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#module-layouts-1--11', {timeout: 5000}).toMatchImageSnapshot();
        //  cy.wait(1500).get('#module-shop-cart-15', {timeout: 5000}).toMatchImageSnapshot();
    })

    it('successfully loads blog', function () {
        cy.visit('/blog')


        //  cy.scrollTo(0, 500);
        cy.wait(1500);
        // cy.wait(5000).get('#module-layouts-5', {timeout: 5000}).toMatchImageSnapshot();
        cy.wait(1500).get('#blog-posts-5', {timeout: 5000}).toMatchImageSnapshot({
            clip: {
                x: 0,
                y: 0,
                width: 600,
                height: 600
            }
        });
        //cy.wait(1500).get('#module-search-5', {timeout: 5000}).toMatchImageSnapshot();
        //cy.wait(1500).get('#module-categories-5', {timeout: 5000}).toMatchImageSnapshot();
        //cy.wait(1500).get('#module-tags-5', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#module-shop-cart-15', {timeout: 5000}).toMatchImageSnapshot();

        //  cy.scrollTo(500, 1500);
        cy.wait(1500);
        //  cy.wait(1500).get('#blog-posts-5', {timeout: 5000}).toMatchImageSnapshot();

        //  cy.scrollTo(2000, 2500);

    })


    it('successfully loads shop', function () {


        cy.visit('/shop')


        //  cy.scrollTo(0, 500);
        cy.wait(1500);
        cy.wait(5000).get('#module-shop-products-8', {timeout: 5000}).toMatchImageSnapshot({
            clip: {
                x: 0,
                y: 0,
                width: 600,
                height: 600
            }
        });
        // cy.wait(1500).get('#module-shop-cart-15', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).contains('Charles Leather Bag').click()
        //
        // cy.wait(1500).get('#price_31price').contains('Add to cart').click()
        //
        // cy.wait(1500).get('Checkout Now').contains('Checkout Now').click()
        //
        // cy.visit('/services')
        //
        ////  cy.scrollTo(0, 500);
        // cy.wait(1500);
        // cy.wait(1500).get('#module-layouts-12--1', {timeout: 5000}).toMatchImageSnapshot();
        // cy.wait(1500).get('#module-layouts-12--2-btn', {timeout: 5000}).toMatchImageSnapshot();
        //cy.wait(1500).get('#module-shop-cart-15', {timeout: 5000}).toMatchImageSnapshot();

    })

    // it('successfully loads about', function () {

    //     cy.visit('/about')

    //     //  cy.scrollTo(0, 500);
    //     cy.wait(1500);
    //     // cy.wait(5000).get('#module-layouts-14', {timeout: 5000}).toMatchImageSnapshot();
    //     cy.wait(1500).get('#module-layouts-14--1', {timeout: 5000}).toMatchImageSnapshot({
    //         clip: {
    //             x: 0,
    //             y: 0,
    //             width: 600,
    //             height: 600
    //         }
    //     });
    //     //cy.wait(1500).get('#module-layouts-14--2', {timeout: 5000}).toMatchImageSnapshot();
    //     //cy.wait(1500).get('#module-layouts-14--3', {timeout: 5000}).toMatchImageSnapshot();
    //     //cy.wait(1500).get('#module-layouts-14--4', {timeout: 5000}).toMatchImageSnapshot();
    //     // cy.wait(1500).get('#module-shop-cart-15', {timeout: 5000}).toMatchImageSnapshot();
    //     //  cy.scrollTo(2000, 2500);
    // })
    it('successfully loads portfolio', function () {

        cy.visit('/portfolio')

        //  cy.scrollTo(0, 500);
        cy.wait(1500);
        //   cy.wait(5000).get('#module-layouts-15', {timeout: 5000}).toMatchImageSnapshot();


        //  cy.scrollTo(500, 1500);
        // cy.wait(1500);
        //   cy.wait(1500).get('#module-shop-cart-15', {timeout: 5000}).toMatchImageSnapshot();
        cy.wait(1500).get('#btn-module-layouts-15--1-btn', {timeout: 5000}).toMatchImageSnapshot({
            clip: {
                x: 0,
                y: 0,
                width: 600,
                height: 600
            }
        });
    })
    it('successfully loads contacts', function () {

        cy.visit('/contacts')

        //  cy.scrollTo(0, 500);
        cy.wait(1500);
        //cy.wait(5000).get('#module-layouts-17', {timeout: 5000}).toMatchImageSnapshot();
        //cy.wait(1500).get('#module-layouts-17--1', {timeout: 5000}).toMatchImageSnapshot();
        //cy.wait(1500).get('#module-layouts-17--2', {timeout: 5000}).toMatchImageSnapshot();
        cy.wait(1500).get('#module-layouts-17--1', {timeout: 5000}).toMatchImageSnapshot({
            clip: {
                x: 0,
                y: 0,
                width: 600,
                height: 600
            }
        });
    })

})