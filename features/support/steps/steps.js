import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'
import payloads from '../../../src/resources/payloads/payloads.user.json'
import JsonAccess from './json.access'

let validCredentials = false;
let _response = '';
let data = '';

Given(/^I have valid credentials$/, function () {
    validCredentials = true
})

Given(/^I don't have valid credentials$/, function () {
    validCredentials = false
})

Given(/^I have the required payload$/ , function (table) {
    data = JsonAccess.getObjectJSON(payloads, table.rowsHash().payload)
    console.log(JSON.stringify(JsonAccess.getObjectJSON(payloads, "Valid.POST.CreateUser")))
}) 

When(/^I execute a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    let _endpoint = '';
    if(endpoint.includes('{id}')) 
        _endpoint = endpoint.replace('{id}', this.id)
    else 
        _endpoint = endpoint
    await HttpRequestManager.makeRequest(verb, _endpoint, data)
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
})

Then(/^The response status code should be (\d+) (.*)$/, function (statusCode, statusText) {
    if(statusCode == 401) {
        console.log("**********************************************************")
        console.log(_response)
    }    
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
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
