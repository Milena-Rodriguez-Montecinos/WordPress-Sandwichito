import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'
import payloads from '../../../src/resources/payloads/payloads.post.json'

let validCredentials = false;
let _response = '';
let data = '';

Given(/^user wants to create a post with the following attributes$/, function (dataTable) {
    data = payloads.Valid[dataTable.rowsHash().payload]
    validCredentials = true
});

When(/^user save the new post a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    await HttpRequestManager.makeRequest(verb, endpoint, data, "AdminCredentials", "http://192.168.33.80:8080")
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
});

Then(/^the save (.*) with code (\d+)$/, function (statusText, statusCode) {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
});
