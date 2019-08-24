import { fixCypressSpec } from '../../support'

beforeEach(fixCypressSpec(__filename))


const test1 = require('./describe1');
test1.initPlugin();



const test2 = require('./describe2');
test2.initPlugin();



