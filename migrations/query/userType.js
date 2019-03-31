"use strict";

var userTypeSql = {
	getSubmitterId: "SELECT id FROM user_type WHERE type = ?"
};

module.exports = userTypeSql;