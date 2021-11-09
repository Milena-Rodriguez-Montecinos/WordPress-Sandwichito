import { After, Before } from "@cucumber/cucumber";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from '../../../src/resources/endpoints.json'
import payloads from '../../../src/resources/payloads/payloads.user.json'
import { expect } from 'chai';

Before({tags: "@ReadById or @Update or @Delete"}, async function () {
    let _response = ''
    await HttpRequestManager.makeRequest('POST', endpoints.users, payloads.Valid.POST.CreateUser)
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

After({tags: "@Create or @ReadById or @Update"}, async function () {
    let _postId = this.id
    await HttpRequestManager.makeRequest('DELETE', endpoints.usersById.replace('{id}', _postId), payloads.Valid.DELETE.DeleteUser)
    .then(function (response) {
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        console.log(`User ${_postId} deleted`)
    })
    .catch(function (error) {
        console.log(error)
        throw error
    })
})