import {fixCypressSpec} from '../../support'

beforeEach(fixCypressSpec(__filename))


describe('Dream', function () {

    it('successfully loads home', function () {


        cy.login('admin')

        cy.visit('/')



    })


})