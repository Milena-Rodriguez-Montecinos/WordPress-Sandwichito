import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager'
import payloads from '../../../src/resources/payloads/payloads.post.json'

let validCredentials = false;
let _response = '';
let data = '';
let _endpoint = '';

Given(/^user wants to delete a post with an identifier$/, function (dataTable) {
    validCredentials = true
});

When(/^user delete the post a (.*) request to (.*) endpoint$/, async function (verb, endpoint) {
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
       
Then(/^the post is delete (.*) with code (\d+)$/, function (statusText, statusCode) {
    expect(_response.status).to.equal(statusCode)
    expect(_response.statusText).to.equal(statusText)
});
