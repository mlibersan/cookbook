package ca.gc.healthcanada.nutritiondata.model;


public class Food {
	
	private Long id;
	private Long code;
	private Long foodGroupId;
	private Long foodSourceId;
	private String abbreviatedName;
	private String completeName;
	private String scientificName;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCode() {
		return code;
	}
	public void setCode(Long code) {
		this.code = code;
	}
	public Long getFoodGroupId() {
		return foodGroupId;
	}
	public void setFoodGroupId(Long foodGroupId) {
		this.foodGroupId = foodGroupId;
	}
	public Long getFoodSourceId() {
		return foodSourceId;
	}
	public void setFoodSourceId(Long foodSourceId) {
		this.foodSourceId = foodSourceId;
	}
	public String getAbbreviatedName() {
		return abbreviatedName;
	}
	public void setAbbreviatedName(String abbreviatedName) {
		this.abbreviatedName = abbreviatedName;
	}
	public String getCompleteName() {
		return completeName;
	}
	public void setCompleteName(String completeName) {
		this.completeName = completeName;
	}
	public String getScientificName() {
		return scientificName;
	}
	public void setScientificName(String scientificName) {
		this.scientificName = scientificName;
	}
	
	
}
