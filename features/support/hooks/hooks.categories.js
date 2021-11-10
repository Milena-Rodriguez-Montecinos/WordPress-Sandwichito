import { After, Before } from "@cucumber/cucumber";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from '../../../src/resources/endpoints.json'
import payloads from '../../../src/resources/payloads/payloads.categories.js'
import { expect } from 'chai';

Before({tags: "@Category-Retrieve or @Category-Update or @Category-Delete"}, async function () {
    let _response = ''
    await HttpRequestManager.makeRequest('POST', endpoints.categories, payloads.Valid.POST.CreateCategory)
    .then(function (response) {
        expect(response.status).to.equal(201)
        expect(response.statusText).to.equal('Created')
        _response = response
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
    this.id = _response.data.id
})

After({tags: "@Category-Create or @Category-Retrieve or @Category-Update"}, async function () {
    let _postId = this.id
    await HttpRequestManager.makeRequest('DELETE', endpoints.categoriesById.replace('{id}', _postId), payloads.Valid.DELETE.DeleteCategory)
    .then(function (response) {
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        console.log(`Category ${_postId} deleted`)
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
})
