import {fixCypressSpec} from '../../support'

beforeEach(fixCypressSpec(__filename))

describe('Dream', function () {


    it('successfully loads shop', function () {


        cy.visit('/shop')


        cy.scrollTo(0, 500);

        cy.visit('/fresh/charles-leather-bag')

        cy.wait(1500).get('#price_31price').contains('Add to cart').click()
        cy.wait(1500).get('#module-shop-cart-31').contains('Checkout Now').click()
        cy.wait(1500).get('#cart-checkout-shop-shipping').find('.shipping-country-select').select('Bolivia')
        cy.wait(1500).get('#cart-checkout-cart-checkout-shop-coupons').find('.js-coupon-code').type('151515')
        cy.wait(1500).get('#cart-checkout-cart-checkout-shop-coupons').find('.js-apply-coupon-code').click()
        cy.wait(1500).get('#checkout_form_cart_checkout').find('.btn-primary').click()
        cy.wait(1500).get('#complete_order_button').click()
        cy.scrollTo(500, 0).toMatchImageSnapshot({})
        cy.wait(1500).get('#cart_checkout').find('input[name=first_name]').type('Kroasan')
        cy.wait(1500).get('#cart_checkout').find('input[name=last_name]').type('Kroasan')
        cy.wait(1500).get('#cart_checkout').find('input[name=email]').type('team@microweber.com')
        cy.wait(1500).get('#cart_checkout').find('input[name=phone]').type('0888999777').toMatchImageSnapshot({})
        cy.wait(1500).get('#complete_order_button').click()
        cy.scrollTo(500, 0).toMatchImageSnapshot({})



        cy.wait(1500).get('#-checkout-shop-shippingcart--2').find('Country').select('Albania')

    })

})