import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import pagePayloads from "../../../src/resources/payloads/payloads.page.json";
import JsonAccess from "./json.access";

let validCredentials = false;
let _response = "";
let data = "";
let _endpoint = "";
let _pageId;

Given(/^Given valid credentials$/, function () {
    validCredentials = "AdminCredentials";
});

Given(/^Given the required payload$/, function (table) {
    data = JsonAccess.getObjectJSON(pagePayloads, table.rowsHash().payload);
});

Given(/^Does not using valid credentials$/, function () {
    validCredentials = "InvalidCredentials";
});

When(
    /^Executing (.*) request to (.*) page endpoint$/,
    async function (verb, endpoint) {
        _pageId = this.pageId;
        if (endpoint.includes("{id}")) {
            _endpoint = endpoint.replace("{id}", this.pageId);
        } else {
            _endpoint = endpoint;
        }
        await HttpRequestManager.makeRequest(
            verb,
            _endpoint,
            data,
            validCredentials
        )
            .then(function (response) {
                _response = response;
            })
            .catch(function (error) {
                _response = error.response;
            });
        if (_response.data.id != null) {
            this.afterPageId = _response.data.id;
        } else {
            _pageId = this.pageId;
            this.afterPageId = _pageId;
        }
        data = "";
    }
);

Then(
    /^the status code should be (\d+) (.*)$/,
    function (statusCode, statusText) {
        console.log(statusCode);
        console.log(statusText);
        expect(_response.status).to.equal(statusCode);
        expect(_response.statusText).to.equal(statusText);
    }
);

Then(/^The page has been (.*)$/, function (action) {
    if (_response.data.id != null) {
        this.afterPageId = _response.data.id;
        expect(_response.data.id).not.to.be.undefined;
    } else {
        this.afterPageId = _pageId;
        expect(_response.data).not.to.be.undefined;
    }
});
