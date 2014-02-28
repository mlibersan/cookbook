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

import ca.gc.healthcanada.nutritiondata.model.FoodGroup;

@Repository
public class FoodGroupDAO {

	private NamedParameterJdbcTemplate jdbcTemplate;

	private static final String COLUMN_ID = "FD_GRP_ID";
	private static final String COLUMN_CODE = "FD_GRP_CODE";
	private static final String COLUMN_NAME_EN = "FD_GRP_NME";
	private static final String COLUMN_NAME_FR = "FD_GRP_NMF";

	private static final String SQL_SELECT_ALL_FOOD_GROUP_FR = "select * from food_grp order by " + COLUMN_NAME_FR;
	private static final String SQL_SELECT_ALL_FOOD_GROUP_EN = "select * from food_grp order by " + COLUMN_NAME_EN;

	public List<FoodGroup> findAll(String lang) {
		boolean isFrench = "fr".equals(lang);
		SqlParameterSource namedParameters = new MapSqlParameterSource();
		List<FoodGroup> foodGroups = new ArrayList<FoodGroup>();

		String sqlQuery = null;
		if (isFrench) {
			sqlQuery = SQL_SELECT_ALL_FOOD_GROUP_FR;
		} else {
			sqlQuery = SQL_SELECT_ALL_FOOD_GROUP_EN;
		}

		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sqlQuery, namedParameters);
		for (@SuppressWarnings("rawtypes")
		Map row : rows) {
			FoodGroup foodGroup = new FoodGroup();
			foodGroup.setId((Long) row.get(COLUMN_ID));
			foodGroup.setCode((Long) row.get(COLUMN_CODE));
			if (isFrench) {
				foodGroup.setName((String) row.get(COLUMN_NAME_FR));
			} else {
				foodGroup.setName((String) row.get(COLUMN_NAME_EN));
			}
			foodGroups.add(foodGroup);
		}

		return foodGroups;

	}

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

}
