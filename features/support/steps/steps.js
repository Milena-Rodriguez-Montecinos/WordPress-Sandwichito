import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'
import payloads from '../../../src/resources/payloads/payloads.user.json'
import JsonAccess from './json.access'
import errors from '../../../src/resources/errors.json'

let credentials = false;
let _response = '';
let _error = '';
let data = '';

Given(/^I (don't )?have valid credentials$/, function (dont_have) {
    if(dont_have) {
        credentials = 'InvalidCredentials';
    }
    else {
        credentials = 'AdminCredentials';
    }    
})

Given(/^I have the required payload$/ , function (table) {
    data = JsonAccess.getObjectJSON(payloads, table.rowsHash().payload)
}) 

Given(/^I have a invalid payload: (.*)$/ , function (payload) {
    data = JsonAccess.getObjectJSON(payloads, payload)    
}) 

When(/^I execute a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    let _endpoint = '';
    _error = null;
    _response = '';
    let _id = null;
    if(endpoint.includes('{id}')) 
        _endpoint = endpoint.replace('{id}', this.id)
    else 
        _endpoint = endpoint
    await HttpRequestManager.makeRequest(verb, _endpoint, data, credentials)
    .then(function (response) {
        _response = response;
        _id = response.data.id;
    })
    .catch(function (error) {    
        _error = error
    }) 
    if(_id != null) {
        this.id = _id
    }    
})

Then(/^The (error )?status code should be (\d+) (.*)$/, function (errorStatus, statusCode, statusText) {     
    if(_error != null) {
        expect(_error.response.status).to.equal(statusCode)
        expect(_error.response.statusText).to.equal(statusText)
    }    
    else {
        expect(_response.status).to.equal(statusCode)
        expect(_response.statusText).to.equal(statusText)
    }
})

Then(/^The payload should be (.*)$/, function(errorPayload) {
    expect(_error.response.data).to.deep.includes(errors[errorPayload]);
}) 

Then(/^The (.*) is (.*)$/, function (feature, action) {
    switch(action) {
        case 'created':
            expect(_response.data.id).not.to.be.undefined
            this.id = _response.data.id
            break
        case 'updated':
            expect(_response.data.id).not.to.be.undefined
            this.id = _response.data.id
            break
        case 'deleted':
            expect(_response.data.deleted).to.equal(true)
            break
    }    
})
