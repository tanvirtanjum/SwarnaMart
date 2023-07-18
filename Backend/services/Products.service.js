const db = require("../config/db.config");

exports.get = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        products
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

exports.post = (data, callback) => {
    var sqlString = `
                    INSERT      
                    INTO        products
                                (Title, UnitPrice, Description, ImagePath, IsStock)
                    VALUES      (?, ?, ?, ?, ?);

                    SELECT      LAST_INSERT_ID() AS LastInsertId;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Title, data.UnitPrice, data.Description, data.ImagePath, data.IsStock],
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
                    UPDATE  products
                    SET     Title = ?,
                            UnitPrice = ?,
                            Description = ?,
                            IsStock = ?
                    WHERE   ProductId = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Title, data.UnitPrice, data.Description, data.IsStock, data.ProductId],
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
                    FROM    products
                    WHERE   ProductId = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.ProductId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByTitle = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        products
                    WHERE       Title LIKE ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Title],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByStock = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        products
                    WHERE       IsStock = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.IsStock],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.upload = (data, callback) => {
    var sqlString = `
                    UPDATE  products
                    SET     ImagePath = ?
                    WHERE   ProductId = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.ImagePath, data.ProductId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByTitleAndStock = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        products
                    WHERE       Title LIKE ?
                                AND IsStock = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Title, data.IsStock],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};