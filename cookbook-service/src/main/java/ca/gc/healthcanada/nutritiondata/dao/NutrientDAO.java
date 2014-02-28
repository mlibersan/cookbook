package ca.gc.healthcanada.nutritiondata.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import ca.gc.healthcanada.nutritiondata.model.Nutrient;

@Repository
public class NutrientDAO {

	private NamedParameterJdbcTemplate jdbcTemplate;

	private static final String TABLE_NUTRIENT = "NT_NM";
	private static final String TABLE_NUTRIENT_AMOUNT = "NT_AMT";

	private static final String COLUMN_FOOD_ID = "FD_ID";
	private static final String COLUMN_ID = "NT_ID";
	private static final String COLUMN_CODE = "NT_COD";
	private static final String COLUMN_SYMBOL = "NT_SYM";
	private static final String COLUMN_VALUE = "NT_VALUE";
	private static final String COLUMN_UNIT = "UNIT";
	private static final String COLUMN_NAME_EN = "NT_NME";
	private static final String COLUMN_NAME_FR = "NT_NMF";
	private static final String COLUMN_TAGNAME = "TAGNAME";

	private static final String SQL_SELECT_NUTRIMENTS_BY_FOOD = "select " + TABLE_NUTRIENT_AMOUNT + "."
			+ COLUMN_FOOD_ID + ", " + TABLE_NUTRIENT_AMOUNT + "." + COLUMN_ID + ", " + TABLE_NUTRIENT + "."
			+ COLUMN_CODE + ", " + TABLE_NUTRIENT + "." + COLUMN_NAME_FR + ", " + TABLE_NUTRIENT + "." + COLUMN_NAME_EN
			+ ", " + TABLE_NUTRIENT + "." + COLUMN_UNIT + ", " + TABLE_NUTRIENT_AMOUNT + "." + COLUMN_VALUE + " from "
			+ TABLE_NUTRIENT_AMOUNT + "," + TABLE_NUTRIENT + " where (" + TABLE_NUTRIENT_AMOUNT
			+ ".FD_ID = :foodId) AND (" + TABLE_NUTRIENT_AMOUNT + ".NT_ID = " + TABLE_NUTRIENT + ".NT_ID)";

	public List<Nutrient> findByFood(String foodId, String lang) {
		boolean isFrench = "fr".equals(lang);
		SqlParameterSource namedParameters = new MapSqlParameterSource("foodId", foodId);
		List<Nutrient> nutrients = new ArrayList<Nutrient>();

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(SQL_SELECT_NUTRIMENTS_BY_FOOD, namedParameters);
		for (@SuppressWarnings("rawtypes")
		Map row : rows) {
			Nutrient nutrient = new Nutrient();
			nutrient.setId((Long) row.get(COLUMN_ID));
			nutrient.setCode((Long) row.get(COLUMN_CODE));
			nutrient.setFoodId((Long) row.get(COLUMN_FOOD_ID));
			nutrient.setSymbol((String) row.get(COLUMN_SYMBOL));
			nutrient.setValue(BigDecimal.valueOf((Double) row.get(COLUMN_VALUE)));
			nutrient.setUnit((String) row.get(COLUMN_UNIT));
			if (isFrench) {
				nutrient.setName((String) row.get(COLUMN_NAME_FR));
			}else {
				nutrient.setName((String) row.get(COLUMN_NAME_EN));
			}
			nutrient.setTagName((String) row.get(COLUMN_TAGNAME));
			nutrients.add(nutrient);
		}

		return nutrients;

	}

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

}
