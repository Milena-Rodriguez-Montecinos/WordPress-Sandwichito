import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'
import payloads from '../../../src/resources/payloads/payloads.post.json'

let validCredentials = false;
let _response = '';
let data = '';
let _endpoint = '';

/*Created*/

Given(/^User wants to create a post with the following attributes$/, function (dataTable) {
    data = payloads.Valid[dataTable.rowsHash().payload]
    validCredentials = true
});

When(/^User save the new post a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    await HttpRequestManager.makeRequest(verb, endpoint, data, "AdminCredentials", "http://192.168.33.80:8080")
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
});

Then(/^The save (.*) with code (\d+)$/, function (statusText, statusCode) {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
});

/* READ */

Given(/^User with valid credentials$/, function () {
    validCredentials = true
})

When(/^Executes a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    _endpoint = endpoint.replace('{id}', this.id)
    await HttpRequestManager.makeRequest(verb, _endpoint, data, "AdminCredentials", "http://192.168.33.80:8080")
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
})

Then(/^The post status code should be (\d+) (.*)$/, function (statusCode, statusText) {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
})

/*Update*/

Given(/^User wants to update a post with the required attributes$/, function (dataTable) {
    data = payloads.Valid[dataTable.rowsHash().payload]
    validCredentials = true
});

When(/^User update the post a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    _endpoint = endpoint.replace('{id}', this.id)
    await HttpRequestManager.makeRequest(verb, _endpoint, data, "AdminCredentials", "http://192.168.33.80:8080")
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
});
       
Then(/^The post will be update (.*) with code (\d+)$/, function (statusText, statusCode) {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
});

/*Delete*/

Given(/^User wants to delete a post with an identifier$/, function (dataTable) {
    validCredentials = true
});

When(/^User delete the post a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
    _endpoint = endpoint.replace('{id}', this.id)
    await HttpRequestManager.makeRequest(verb, _endpoint, '', "AdminCredentials", "http://192.168.33.80:8080")
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
});
       
Then(/^The post is delete (.*) with code (\d+)$/, function (statusText, statusCode) {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
});
