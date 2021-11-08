import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'

let validCredentials = false;
let _response = '';
let data = '';

Given(/^A valid credentials$/, function () {
    validCredentials = true
})

When(/^Executes a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    await HttpRequestManager.makeRequest(verb, endpoint, data, "AdminCredentials", "http://192.168.33.80:8080")
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
})

Then(/^The status code should be (\d+) (.*)$/, function (statusCode, statusText) {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
})

