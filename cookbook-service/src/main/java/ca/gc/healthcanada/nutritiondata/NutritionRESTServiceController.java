package ca.gc.healthcanada.nutritiondata;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ca.gc.healthcanada.nutritiondata.dao.FoodDAO;
import ca.gc.healthcanada.nutritiondata.dao.FoodGroupDAO;
import ca.gc.healthcanada.nutritiondata.dao.MeasureDAO;
import ca.gc.healthcanada.nutritiondata.dao.NutrientDAO;
import ca.gc.healthcanada.nutritiondata.model.Food;
import ca.gc.healthcanada.nutritiondata.model.FoodGroup;
import ca.gc.healthcanada.nutritiondata.model.Measure;
import ca.gc.healthcanada.nutritiondata.model.Nutrient;

/**
 * Handles requests for the application home page.
 */
@Controller
public class NutritionRESTServiceController {

	private static final Logger logger = LoggerFactory.getLogger(NutritionRESTServiceController.class);

	private FoodDAO foodDao;
	private FoodGroupDAO foodGroupDao;
	private NutrientDAO nutrientDao;
	private MeasureDAO measureDao;

	@RequestMapping("/foods/byname/{name}")
	public @ResponseBody
	List<Food> getFoodsByName(@PathVariable String name) {
		System.out.println("getFoodsByName " + name);
		List<Food> foods = this.foodDao.findByName(name, "fr");
		return foods;
	}

	@RequestMapping("/food/groups")
	public @ResponseBody
	List<FoodGroup> getFoodGroups() {
		System.out.println("getFoodGroups ");
		List<FoodGroup> foodGroups = this.foodGroupDao.findAll("fr");
		return foodGroups;
	}

	@RequestMapping("/nutrients/byfood/{foodId}")
	public @ResponseBody
	List<Nutrient> getNutrientsByFood(@PathVariable String foodId) {
		System.out.println("getNutrientsByFood ");
		List<Nutrient> nutrients = this.nutrientDao.findByFood(foodId, "fr");
		return nutrients;
	}

	@RequestMapping("/measures/byfood/{foodId}")
	public @ResponseBody
	List<Measure> getMeasuresByFood(@PathVariable String foodId) {
		System.out.println("getMeasuresByFood ");
		List<Measure> measures = this.measureDao.findByFood(foodId, "fr");
		return measures;
	}

	@Autowired
	public void setFoodDao(FoodDAO foodDao) {
		this.foodDao = foodDao;
	}

	@Autowired
	public void setFoodGroupDao(FoodGroupDAO foodGroupDao) {
		this.foodGroupDao = foodGroupDao;
	}

	@Autowired
	public void setNutrientDao(NutrientDAO nutrientDao) {
		this.nutrientDao = nutrientDao;
	}

	@Autowired
	public void setMeasureDao(MeasureDAO measureDao) {
		this.measureDao = measureDao;
	}

}
