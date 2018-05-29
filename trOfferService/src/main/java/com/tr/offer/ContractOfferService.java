package com.tr.offer;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContractOfferService {
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ContractOffer createContractOffer(@RequestBody final ContractRequest contractRequest) {
		return extracted(contractRequest);
	}

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ContractOffer createDemoOffer() {
		return new ContractOffer(Long.toString(System.nanoTime()), "Stefan Küttner", "Gothaer",
				"10.50", 30000);
	}
	
	private String calculatePremium(final String insurant)
	{
		final float discount = "Stefan Kuettner".equals(insurant) ? 0.6f : 1.0f;
		double premium = 20.0*discount;
		System.out.println(insurant+": "+premium);
		return String.format("%.2f", premium);
	}

	private ContractOffer extracted(final ContractRequest contractRequest) {
		
		final String insurant = contractRequest.getInsurant();
		final String premium = calculatePremium(insurant);
		final ContractOffer contractOffer = new ContractOffer(Long.toString(System.nanoTime()), insurant, "Gothaer",
		premium, contractRequest.getSumInsured());
		return contractOffer;
	}
	
}
