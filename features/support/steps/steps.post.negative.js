import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import payloads from "../../../src/resources/payloads/payloads.post.json";
import JsonAccess from "./json.access";
import logger from "../../../src/logger/logger.posts";


let validCredentials = false;
let _response = "";
let data = "";

Given(/^A invalid credentials$/, function (dataTable) {
    data = JsonAccess.getObjectJSON(payloads, dataTable.rowsHash().payload);
    validCredentials = false;
});

When(
    /^Executes a (.*) request to (.*) endpoint.$/,
    async function (verb, endpoint) {
        let Credentials =
            validCredentials == true
                ? "AdminCredentials"
                : "InvalidCredentials";
        await HttpRequestManager.makeRequest(
            verb,
            endpoint,
            data,
            Credentials
        )
            .then(function (response) {
                _response = response;
            })
            .catch(function (error) {
                _response = error.response;
            });
    }
);

Then(
    /^The status response code should be (\d+) with status text (.*)$/,
    function (statusCode, statusText) {
        expect(_response.status).to.equal(statusCode);
        expect(_response.statusText).to.equal(statusText);
    }
);

Given(/^A Valid credential to retrieve$/, function () {
    validCredentials = true;
});

Given(/^A Valid credentials.$/, function (dataTable) {
    console.log(dataTable.rowsHash());
    data = JsonAccess.getObjectJSON(payloads, dataTable.rowsHash().payload);
    validCredentials = true;
});
