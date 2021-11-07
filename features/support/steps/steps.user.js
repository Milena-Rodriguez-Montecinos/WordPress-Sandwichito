import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'

let validCredentials = false;
let _response = '';
let data = '';

Given(/^I have valid credentials$/, function () {
    validCredentials = true
})

When(/^I execute a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    await HttpRequestManager.makeRequest(verb, endpoint, data)
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
})

Then(/^the status code should be (\d+) (.*)$/, function () {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
})

