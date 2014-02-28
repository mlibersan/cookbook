package ca.gc.healthcanada.nutritiondata.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import ca.gc.healthcanada.nutritiondata.model.Food;

@Repository
public class FoodDAO {

	private NamedParameterJdbcTemplate jdbcTemplate;

	private static final String COLUMN_ID = "FD_ID";
	private static final String COLUMN_CODE = "FD_CODE";
	private static final String COLUMN_FOOD_GROUP_ID = "FD_GRP_ID";
	private static final String COLUMN_FOOD_SOURE_ID = "FD_SRC_ID";
	private static final String COLUMN_ABBREVIATED_NAME_EN = "A_FD_NME";
	private static final String COLUMN_ABBREVIATED_NAME_FR = "A_FD_NMF";
	private static final String COLUMN_COMPLETE_NAME_EN = "L_FD_NME";
	private static final String COLUMN_COMPLETE_NAME_FR = "L_FD_NMF";
	private static final String COLUMN_SCIENTIFIC_NAME = "SCI_NM";

	private static final String SQL_SELECT_FOOD_BY_NAME_FR = "select * from food_nm where A_FD_NMF like :name";
	private static final String SQL_SELECT_FOOD_BY_NAME_EN = "select * from food_nm where A_FD_NME like :name";

	public List<Food> findByName(String name, String lang) {
		boolean isFrench = "fr".equals(lang);
		SqlParameterSource namedParameters = new MapSqlParameterSource("name", name + "%");
		List<Food> foods = new ArrayList<Food>();

		String sqlQuery = null;
		if (isFrench) {
			sqlQuery = SQL_SELECT_FOOD_BY_NAME_FR;
		} else {
			sqlQuery = SQL_SELECT_FOOD_BY_NAME_EN;
		}

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sqlQuery, namedParameters);
		for (@SuppressWarnings("rawtypes")
		Map row : rows) {
			Food food = new Food();
			food.setId((Long) row.get(COLUMN_ID));
			food.setCode((Long) row.get(COLUMN_CODE));
			food.setFoodGroupId((Long) row.get(COLUMN_FOOD_GROUP_ID));
			food.setFoodSourceId((Long) row.get(COLUMN_FOOD_SOURE_ID));
			if (isFrench) {
				food.setAbbreviatedName((String) row.get(COLUMN_ABBREVIATED_NAME_FR));
				food.setCompleteName((String) row.get(COLUMN_COMPLETE_NAME_FR));
			} else {
				food.setAbbreviatedName((String) row.get(COLUMN_ABBREVIATED_NAME_EN));
				food.setCompleteName((String) row.get(COLUMN_COMPLETE_NAME_EN));
			}
			food.setScientificName((String) row.get(COLUMN_SCIENTIFIC_NAME));
			foods.add(food);
		}

		return foods;

	}

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

}
