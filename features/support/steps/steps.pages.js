/*import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import pagePayloads from "../../../src/resources/payloads/payloads.page.json";
import JsonAccess from "./json.access";

let validCredentials = false;
let _response = "";
let data = "";

Given(/^I have valid credentials$/, function () {
    validCredentials = true;
});

Given(/^I have the required payload$/, function (table) {
    data = JsonAccess.getObjectJSON(pagePayloads, table.rowsHash().payload);
});

When(
    /^I execute a (.*) request to (.*) endpoint$/,
    async function (verb, endpoint) {
        let _endpoint = "";
        switch (verb) {
            case "POST":
                _endpoint = endpoint.replace("{id}", this.pageId);
                data = pagePayloads.Valid.PUT;
                break;
            case "DELETE":
                _endpoint = endpoint.replace("{id}", this.pageId);
                break;
            default:
                _endpoint = endpoint;
                break;
        }
        await HttpRequestManager.makeRequest(verb, _endpoint, data)
            .then(function (response) {
                _response = response;
            })
        this.afterPageId = _response.data.id;
        data = "";
    }
);

Then(
    /^the status code should be (\d+) (.*)$/,
    function (statusCode, statusText) {
        expect(_response.status).to.equal(statusCode);
        expect(_response.statusText).to.equal(statusText);
    }
);

Then(/^The page is created|updated|deleted$/, function () {
    expect(_response.data.id).not.to.be.undefined;
    this.pageId = _response.data.id;
});
*/