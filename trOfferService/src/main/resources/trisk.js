// ==UserScript==
// @name         tinyRisk@AirBnB
// @namespace    http://tsServices.com/
// @version      0.1
// @description  try to take over the world!
// @author       Stefan Küttner
// @match        https://www.airbnb.de/payments/book/*
// @run-at       context-menu
// @grant        GM_xmlhttpRequest
// @connect      *
// ==/UserScript==

(function() {
    'use strict';
    var line = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[1]/div[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var minihp = document.createElement("div");
    minihp.innerHTML = '<div style="margin-bottom:16px"><div class="_2930ex"><div class="_10ejfg4u"><div><span><span class="_1l18zhtm">Mini-Haftpflicht</span></span><div class="_1yb89o9"><div class="_1c2cbn7k"><div class="_jx9fdbv" role="presentation"><div role="button" tabindex="-1" aria-expanded="false"><input type="checkbox" style="padding:0;margin:0"/></div></div></div></div></div></div><div class="_ni9axhe"><div class="_x7fkhu"><span class="_1l18zhtm"><span>wird berechnet ...</span></span></div></div></div></div>';
    line.parentNode.insertBefore(minihp, line);
    var checkBoxNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[1]/div[4]/div/div/div[1]/div/div/div/div/div/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    checkBoxNode.addEventListener ('click',checkBoxClick);

    var sumNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[2]/div/div[2]/div/span/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var price = parseFloat(sumNode.textContent.substring(0, sumNode.textContent.length - 1).replace(',','.'));
    sumNode.setAttribute("oldPrice", price);

    var sendButton = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[1]/div[2]/div/section/div[7]/div/div/div/button', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    console.log('sendButton: ',sendButton);
    var newButton = sendButton.cloneNode(true);
    console.log('newButton: ',newButton);
    sendButton.parentNode.replaceChild(newButton, sendButton);
    newButton.addEventListener('click', createContract);

    getOffer();

    var firstNameNode = document.evaluate('//*[@id="first_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var lastNameNode = document.evaluate('//*[@id="last_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    firstNameNode.addEventListener('change', getOffer, true);
    lastNameNode.addEventListener('change', getOffer, true);

})();

function getOffer() {
    var firstNameNode = document.evaluate('//*[@id="first_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var lastNameNode = document.evaluate('//*[@id="last_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    GM_xmlhttpRequest ( {
        method:     "POST",
        url:        "http://172.24.180.213:8080/",
        data:       '{"insurant":"'+firstNameNode.value+' '+lastNameNode.value+'","sumInsured":60000}',
        headers:    {
            "Content-Type": "application/json"
        },
        onload:     function (response) {
            console.log ("got response:", response);
            var offer = JSON.parse(response.responseText);
            var miniHpPriceNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[1]/div[4]/div/div/div[2]/div/span/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            miniHpPriceNode.textContent = offer.premium + '€';
            checkBoxClick();
        }
    } );
}

function createContract()
{
    var taker = document.evaluate('//*[@id="first_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value + ' ' + document.evaluate('//*[@id="last_name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;
    console.log("taker: ", taker);
    var backing = 15000;
    var miniHpPriceNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[1]/div[4]/div/div/div[2]/div/span/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var premium = parseFloat(miniHpPriceNode.textContent.substring(0, miniHpPriceNode.textContent.length - 1).replace(',','.'));
    console.log("premium: ", premium);
    var body = '{ "$class": "org.blockchain.hackathon.tinyrisk.CreatePolicy",  "insuranceProviderID": "Gothaer", "paymentProviderID": "Die Bank", "insuranceTakerID": "'+taker+'",  "backing": '+backing+',  "premium": '+premium+',  "startDate": "2018-06-17T00:00:00.000Z",  "endDate": "2018-06-18T23:59:59.999Z",  "timestamp": "2018-05-29T10:34:09.996Z"}';

    console.log("sending message to blockchain: ", body);
    GM_xmlhttpRequest ( {
        method:     "POST",
        url:        "http://172.24.33.56:3000/api/CreatePolicy",
        data:       body,
        headers:    {
            "Content-Type": "application/json"
        },
        onload:     function (response) {
            console.log ("got response:", response);
        }
    } );
}

function checkBoxClick()
{
    var checkBoxNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[1]/div[4]/div/div/div[1]/div/div/div/div/div/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (checkBoxNode.checked)
    {
        miniHPChecked();
    }
    else
    {
        miniHPUnchecked();
    }
}

function miniHPUnchecked()
{
    var sumNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[2]/div/div[2]/div/span/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    console.log('sumNode',sumNode);
    console.log('oldPrice',sumNode.getAttribute("oldPrice"));
    var price = parseFloat(sumNode.getAttribute("oldPrice"));
    console.log('price',price);
    sumNode.textContent = (price + '€').replace('.',',');
}

function miniHPChecked()
{
    var miniHpPriceNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[1]/div[4]/div/div/div[2]/div/span/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    console.log('miniHpPriceNode',miniHpPriceNode);
    var minihpPrice = parseFloat(miniHpPriceNode.textContent.substring(0, miniHpPriceNode.textContent.length - 1).replace(',','.'));
    console.log('minihpPrice',minihpPrice);
    var sumNode = document.evaluate('//*[@id="site-content"]/div/div/div/div/div[1]/div[2]/div/div/div/div/div/div[3]/div[3]/div/div[2]/div/div[2]/div/span/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    console.log('sumNode',sumNode);
    console.log('oldPrice',sumNode.getAttribute("oldPrice"));
    var price = parseFloat(sumNode.getAttribute("oldPrice"));
    console.log('price',price);
    var newPrice = price + minihpPrice;
    console.log('newPrice',newPrice);
    sumNode.textContent = (newPrice + '€').replace('.',',');
}