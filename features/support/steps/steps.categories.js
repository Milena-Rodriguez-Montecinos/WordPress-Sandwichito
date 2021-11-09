import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'

let validCredentials = false;
let _response = '';
let data = '';

Given(/^A valid credentials$/, function () {
    validCredentials = true
})

Given(/^I have a payload$/, function (table){
    data = payloads.PostsById.Invalid[table.rowsHash().payload]
})

When(/^Executes a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    let _endpoint = '';

    switch(verb){
        case 'POST':
            _endpoint = endpoint.replace('{id}', this.id);
            break;
        default:
            _endpoint = endpoint;
            break;
    }

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

Then(/^The category created updated$/, function () {
    expect(_response.data.id).not.to.be.undefined;
    this.id = _response.data.id;
})

Then(/^The status code should be (\d+) (.*)$/, function (statusCode, statusText) {
    if(_response !== undefined){
        expect(_error.response.status).to.equal(statusCode);
        expect(_error.response.statusText).to.equal(statusText);
        expect(_error.response.data).to.deep.include(errors.Invalid);
    }
    else{
        expect(_response.status).to.equal(statusCode);
        expect(_response.statusText).to.equal(statusText);
        expect(_response.data).to.equal(errors.Invalid);
    }

})
