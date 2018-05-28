package com.tr.offer;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractOfferService {
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ContractOffer createContractOffer(@RequestBody ContractRequest contractRequest) {
		return new ContractOffer(Long.toString(System.nanoTime()), contractRequest.getInsurant(), "Gothaer",
				contractRequest.getSumInsured() / 500, contractRequest.getSumInsured());
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ContractOffer createDemoOffer() {
		return new ContractOffer(Long.toString(System.nanoTime()), "Stefan Küttner", "Gothaer",
				10, 30000);
	}

}
