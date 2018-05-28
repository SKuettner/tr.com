package com.tr.offer;

public class ContractRequest {
	private String insurant;

	public String getInsurant() {
		return insurant;
	}

	public void setInsurant(String insurant) {
		this.insurant = insurant;
	}

	public int getSumInsured() {
		return sumInsured;
	}

	public void setSumInsured(int sumInsured) {
		this.sumInsured = sumInsured;
	}

	private int sumInsured;
}
