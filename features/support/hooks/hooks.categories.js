import { After, Before } from "@cucumber/cucumber";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from '../../../src/resources/endpoints.json'
import payloads from '../../../src/resources/payloads/payloads.user.json'
import { expect } from 'chai';

Before({tags: "@Category-Retrieve or @Category-Update or @Category-Delete or @Negative-Category-Retrieve or @Negative-Category-Create or @Negative-Category-Delete"}, async function () {
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

After({tags: "@Category-Create or @Category-Retrieve or @Category-Update or Negative-Category-POST or @Negative-Category-Retrieve"}, async function () {
    let _postId = this.id
    if(_postId != undefined) {
        console.log(endpoints.categoriesById.replace('{id}', _postId))
        await HttpRequestManager.makeRequest('DELETE', endpoints.categoriesById.replace('{id}', _postId), payloads.Valid.DELETE.DeleteCategory)
        .then(function (response) {
            expect(response.status).to.equal(200)
            expect(response.statusText).to.equal('OK')
            console.log(`Category ${_postId} deleted`)
        })
        .catch(function (error) {
            throw error
        })
    }   
})
