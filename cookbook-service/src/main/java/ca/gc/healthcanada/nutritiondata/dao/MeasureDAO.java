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

import ca.gc.healthcanada.nutritiondata.model.Measure;

@Repository
public class MeasureDAO {

	private NamedParameterJdbcTemplate jdbcTemplate;

	private static final String TABLE_MEASURE = "MEASURE";
	private static final String TABLE_CONVERSION_FACTORE = "CONV_FAC";

	private static final String COLUMN_ID = "MSR_ID";
	private static final String COLUMN_NAME_EN = "MSR_NME";
	private static final String COLUMN_NAME_FR = "MSR_NMF";
	private static final String COLUMN_FOOD_ID = "FD_ID";
	private static final String COLUMN_CONVERSION_FACTOR = "CONV_FAC";

	private static final String SQL_SELECT_NUTRIMENTS_BY_FOOD = "select " + TABLE_MEASURE + "." + COLUMN_ID + " , "
			+ TABLE_MEASURE + "." + COLUMN_NAME_EN + ", " + TABLE_MEASURE + "." + COLUMN_NAME_FR + ", "
			+ TABLE_CONVERSION_FACTORE + "." + COLUMN_FOOD_ID + ", " + TABLE_CONVERSION_FACTORE + "."
			+ COLUMN_CONVERSION_FACTOR + " from " + TABLE_MEASURE + ", " + TABLE_CONVERSION_FACTORE + " where "
			+ TABLE_CONVERSION_FACTORE + "." + COLUMN_FOOD_ID + " = :foodId  and (" + TABLE_CONVERSION_FACTORE + "."
			+ COLUMN_ID + " = " + TABLE_MEASURE + "." + COLUMN_ID + ")";

	public List<Measure> findByFood(String foodId, String lang) {
		boolean isFrench = "fr".equals(lang);
		SqlParameterSource namedParameters = new MapSqlParameterSource("foodId", foodId);
		List<Measure> measures = new ArrayList<Measure>();

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(SQL_SELECT_NUTRIMENTS_BY_FOOD, namedParameters);
		for (@SuppressWarnings("rawtypes")
		Map row : rows) {
			Measure measure = new Measure();
			measure.setId((Long) row.get(COLUMN_ID));
			measure.setFoodId((Long) row.get(COLUMN_FOOD_ID));
			measure.setConversionFactor(BigDecimal.valueOf((Double) row.get(COLUMN_CONVERSION_FACTOR)));
			if (isFrench) {
				measure.setName((String) row.get(COLUMN_NAME_FR));
			} else {
				measure.setName((String) row.get(COLUMN_NAME_EN));
			}
			measures.add(measure);
		}

		return measures;

	}

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

}
