const db = require("../config/db.config");

exports.get = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        users
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    LEFT JOIN   profiles
                                ON users.UserId = profiles.User
                    `;
    var options = { sql: sqlString, nestTables: true };
    db.query(
        options,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getById = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        users
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    LEFT JOIN   profiles
                                ON users.UserId = profiles.User
                    LEFT JOIN   carts
                                ON users.UserId = carts.CreatedBy
                                AND carts.CartStatus = 0
                    WHERE       users.UserId = ?
                    `;
    var options = { sql: sqlString, nestTables: true };
    db.query(
        options,
        [data.UserId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByRole = (data, callback) => {
    var sqlString = `
                    SELECT      users.* 
                                ,usergroups.GroupName
                                ,profiles.Name
                    FROM        users
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    LEFT JOIN   profiles
                                ON users.UserId = profiles.User
                    LEFT JOIN   carts
                                ON users.UserId = carts.CreatedBy
                                AND carts.CartStatus = 0
                    WHERE       users.GroupId = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.GroupId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByLoginAccess = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        users
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    LEFT JOIN   profiles
                                ON users.UserId = profiles.User
                    WHERE       users.LoginAccess = ?
                    `;
    var options = { sql: sqlString, nestTables: true };
    db.query(
        options,
        [data.LoginAccess],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByUserName = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        users
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    LEFT JOIN   profiles
                                ON users.UserId = profiles.User
                    WHERE       users.UserName = ?
                    `;
    var options = { sql: sqlString, nestTables: true };
    db.query(
        options,
        [data.UserName],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.postLogin = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        users
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    LEFT JOIN   profiles
                                ON users.UserId = profiles.User
                    LEFT JOIN   carts
                                ON users.UserId = carts.CreatedBy
                                AND carts.CartStatus = 0
                    WHERE       users.UserName = BINARY ?
                                AND users.Password = BINARY ?
                    `;
    var options = { sql: sqlString, nestTables: true };
    db.query(
        options,
        [data.UserName, data.Password],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};