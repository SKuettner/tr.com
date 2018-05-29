package com.tr.offer;

public class ContractOffer {
	private String id;
	private String insurant;
	private String insurer;
	private String premium;
	private int sumInsured;

	public String getId() {
		return id;
	}

	public ContractOffer(String id, String insurant, String insurer, String premium, int sumInsured) {
		super();
		this.id = id;
		this.insurant = insurant;
		this.insurer = insurer;
		this.premium = premium;
		this.sumInsured = sumInsured;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getInsurant() {
		return insurant;
	}

	public void setInsurant(String insurant) {
		this.insurant = insurant;
	}

	public String getInsurer() {
		return insurer;
	}

	public void setInsurer(String insurer) {
		this.insurer = insurer;
	}

	public String getPremium() {
		return premium;
	}

	public void setPremium(String premium) {
		this.premium = premium;
	}

	public int getSumInsured() {
		return sumInsured;
	}

	public void setSumInsured(int sumInsured) {
		this.sumInsured = sumInsured;
	}
}
