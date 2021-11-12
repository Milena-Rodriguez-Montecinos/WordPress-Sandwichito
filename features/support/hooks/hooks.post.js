import { Before, After } from "@cucumber/cucumber";
import { expect } from 'chai';
import HttpRequestManager from '../../../src/common/api/http.request.manager';
import endpoints from '../../../src/resources/endpoints.json';
import payloads from '../../../src/resources/payloads/payloads.post.json'
import logger from "../../../src/logger/logger.posts";

let endpoint = endpoints.postById
let _response = ''

Before({tags: "@Posts-update or @Posts-delete or @Posts-read or @Posts-readById"}, async function() {
    let _response = ''
    await HttpRequestManager.makeRequest('POST', endpoints.posts, payloads.Valid.POST, "AdminCredentials")
    .then(function (response) {
        expect(response.status).to.be.equal(201)
        expect(response.statusText).to.be.equal('Created')
        _response = response
    })
    .catch(function(error) {
        logger.error(error)
        throw error
    })

    this.id = _response.data.id
})

After({tags: "@Posts-update or @Posts-read or @Posts-readById"}, async function() {
    let _postId = this.id
    let _endpoint = endpoint.replace('{id}', _postId)
    await HttpRequestManager.makeRequest('DELETE', _endpoint, '', "AdminCredentials")
    .then(function (response) {
        _response = response;
    })
    .catch(function (error) {
        logger.error(error)
        throw error
    })
})
