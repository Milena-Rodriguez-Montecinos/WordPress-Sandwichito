import { After, Before } from "@cucumber/cucumber";
import HttpRequestManager from "../../../src/common/api/http.request.manager";
import endpoints from "../../../src/resources/endpoints.json";
import pagePayloads from "../../../src/resources/payloads/payloads.page.json";
import { expect } from "chai";
import logger from "../../../src/logger/logger.pages";

Before(
    {
        tags: "@PAGE-SPECIFICGET or @PAGE-PUT or @PAGE-DELETE or @UNAUTHORIZED-PUT or @UNAUTHORIZED-DELETE or @UNAUTHORIZED-SPECIFICGET or @INVALID-TITLEVALUE  or @INVALID-BODYVALUE",
    },
    async function () {
        let _response = "";

        await HttpRequestManager.makeRequest(
            "POST",
            endpoints.pages,
            pagePayloads.Invalid.POST
        ).then(function (response) {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal("Created");
            _response = response;
        }).catch(function(error){
            logger.error(error)
        });

        this.pageId = _response.data.id;
        console.log(`project ${this.pageId} created`);
    }
);
Before(
    {
        tags: "@INVALID-SPECIFICGET"
    },
    async function () {
        let _response = "";
        await HttpRequestManager.makeRequest(
            "POST",
            endpoints.pages,
            pagePayloads.Invalid.PASSWORD
        ).then(function (response) {
            expect(response.status).to.be.equal(201);
            expect(response.statusText).to.be.equal("Created");
            _response = response;
        }).catch(function(error){
            logger.error(error)
        });;

        this.pageId = _response.data.id;
        console.log(`project ${this.pageId} created`);
    }
);
After(
    {
        tags: "@PAGE-SPECIFICGET or @PAGE-PUT or @PAGE-POST or @UNAUTHORIZED-PUT or @INVALID-SPECIFICGET or @INVALID-TITLEVALUE or @INVALID-BODYVALUE or @UNAUTHORIZED-SPECIFICGET or @UNAUTHORIZED-DELETE",
    },
    async function () {
        await HttpRequestManager.makeRequest(
            "DELETE",
            endpoints.pagesById.replace("{id}", this.afterPageId)
        ).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal("OK");
        }).catch(function(error){
            logger.error(error)
        });;
    }
);
