const db = require("../config/db.config");

exports.get = (data, callback) => {
    var sqlString = `
                    SELECT      profiles.*
                                ,users.*
                                ,usergroups.GroupName
                    FROM        profiles
                    LEFT JOIN   users
                                ON profiles.user = users.UserId
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    `;
    var options = { sql: sqlString, nestTables: false };
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

exports.getByGroup = (data, callback) => {
    var sqlString = `
                    SELECT      profiles.*
                                ,users.*
                                ,usergroups.GroupName
                    FROM        profiles
                    LEFT JOIN   users
                                ON profiles.user = users.UserId
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
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

exports.getByGroupExclude = (data, callback) => {
    var sqlString = `
                    SELECT      profiles.*
                                ,users.*
                                ,usergroups.GroupName
                    FROM        profiles
                    LEFT JOIN   users
                                ON profiles.user = users.UserId
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    WHERE       users.GroupId NOT IN (?)
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

exports.post = (data, callback) => {
    var sqlString = `
                    INSERT      
                    INTO        users
                                (UserName, Password, GroupId, LoginAccess)
                    VALUES      (?, ?, ?, ?);

                    SELECT @id:=LAST_INSERT_ID();

                    INSERT
                    INTO        profiles
                                (Name, Gender, Phone, Addess, user)
                    VALUES      (?, ?, ?, ?, @id);

                    SELECT LAST_INSERT_ID() AS LastInsertId
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.UserName, data.Password, data.GroupId, data.LoginAccess, data.Name, data.Gender, data.Phone, data.Address],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.put = (data, callback) => {
    var sqlString = `
                    UPDATE  users
                    SET     Password  = ?
                            ,GroupId = ?
                            ,LoginAccess = ?
                    WHERE   UserId = ?;

                    UPDATE  profiles
                    SET     Name    = ?
                            ,Gender  = ?
                            ,Phone  = ?
                            ,Addess= ?
                    WHERE   ProfileId    = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Password, data.GroupId, data.LoginAccess, data.UserId, data.Name, data.Gender, data.Phone, data.Address, data.ProfileId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.delete = (data, callback) => {
    var sqlString = `
                    DELETE
                    FROM    users
                    WHERE   UserId = (
                                        SELECT  user 
                                        FROM    profiles 
                                        WHERE   ProfileId = ?
                                    );

                    DELETE      
                    FROM    profiles
                    WHERE   ProfileId = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.ProfileId, data.ProfileId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByName = (data, callback) => {
    var sqlString = `
                    SELECT      profiles.*
                                ,users.*
                                ,usergroups.GroupName
                    FROM        profiles
                    LEFT JOIN   users
                                ON profiles.user = users.UserId
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    WHERE       Name LIKE ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Name],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByNameGroup = (data, callback) => {
    var sqlString = `
                    SELECT      profiles.*
                                ,users.*
                                ,usergroups.GroupName
                    FROM        profiles
                    LEFT JOIN   users
                                ON profiles.user = users.UserId
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    WHERE       Name LIKE ?
                                AND users.GroupId = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Name, data.GroupId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByNameGroupExclude = (data, callback) => {
    var sqlString = `
                    SELECT      profiles.*
                                ,users.*
                                ,usergroups.GroupName
                    FROM        profiles
                    LEFT JOIN   users
                                ON profiles.user = users.UserId
                    LEFT JOIN   usergroups
                                ON users.GroupId = usergroups.GroupId
                    WHERE       Name LIKE ?
                                AND users.GroupId NOT IN (?)
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Name, data.GroupId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};