package ca.gc.healthcanada.nutritiondata.model;


public class FoodGroup {
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setId(Long id) {
		this.id = id;
	}
	private Long id;
	private Long code;
	private String name;
	
	public Long getId() {
		return id;
	}
	public Long getCode() {
		return code;
	}
	public void setCode(Long code) {
		this.code = code;
	}
	public String getAbbreviatedName() {
		return name;
	}
	public void setAbbreviatedName(String abbreviatedName) {
		this.name = abbreviatedName;
	}
	
	
}
