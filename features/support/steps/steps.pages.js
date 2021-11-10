import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import pagePayloads from "../../../src/resources/payloads/payloads.page.json";
import JsonAccess from "./json.access";

let validCredentials = false;
let _response = "";
let data = "";

Given(/^I have valid credentials$/, function () {
    validCredentials = "AdminCredentials";
});

Given(/^I have the required payload$/, function (table) {
    data = JsonAccess.getObjectJSON(pagePayloads, table.rowsHash().payload);
});

Given(/^I don't have valid credentials$/, function () {
    validCredentials = "InvalidCredentials";
});

When(
    /^I execute a (.*) request to (.*) page endpoint$/,
    async function (verb, endpoint) {
        let _endpoint = "";
        if (endpoint.includes("{id}")) {
            _endpoint = endpoint.replace("{id}", this.pageId);
            data = pagePayloads.Valid.PUT;
        } else {
            _endpoint = endpoint;
        }
        await HttpRequestManager.makeRequest(
            verb,
            _endpoint,
            data,
            validCredentials
        ).then(function (response) {
            _response = response;
        });
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

Then(/^the page is created|updated|deleted$/, function () {
    expect(_response.data.id).not.to.be.undefined;
    this.pageId = _response.data.id;
});
