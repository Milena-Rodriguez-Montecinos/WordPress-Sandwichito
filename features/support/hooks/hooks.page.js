import { After, Before } from "@cucumber/cucumber";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import pagePayloads from "../../../src/resources/payloads/payloads.page.json";
import { expect } from "chai";

Before({ tags: "@PAGE-PUT or @PAGE-DELETE" }, async function () {
    let _response = "";

    await HttpRequestManager.makeRequest(
        "POST",
        endpoints.pages,
        pagePayloads.Valid.POST
    ).then(function (response) {
        expect(response.status).to.be.equal(201);
        expect(response.statusText).to.be.equal("Created");
        _response = response;
    });

    this.pageId = _response.data.id;
    console.log(`project ${this.pageId} created`);
});
After({ tags: "@PAGE-PUT or @PAGE-POST" }, async function () {
    await HttpRequestManager.makeRequest(
        "DELETE",
        endpoints.pagesById.replace("{id}", this.afterPageId)
    )
        .then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal("OK");
            //console.log(`project ${this.afterPageId} deleted`);
        })
        .catch(function (error) {
            console.log(error);
            throw error;
        });
});
