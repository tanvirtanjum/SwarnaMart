const db = require("../config/db.config");

exports.post = (data, callback) => {
    var sqlString = `
                    INSERT      
                    INTO        cartitems
                                (Product, Quantity, CartRef)
                    VALUES      (?, ?, ?);

                    SELECT      LAST_INSERT_ID() AS LastInsertId;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Product, data.Quantity, data.CartRef],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.checkProductInCart = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        cartitems
                    WHERE       Product = ? 
                                AND CartRef = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Product, data.CartRef],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getCartItems = (data, callback) => {
    var sqlString = `
                    SELECT      * 
                    FROM        cartitems
                                LEFT JOIN products 
                                ON cartitems.Product = products.ProductId
                    WHERE       CartRef = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.CartRef],
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
                    UPDATE  cartitems
                    SET     Product = ?,
                            Quantity = Quantity + ?,
                            CartRef = ?
                    WHERE   CartItemId = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Product, data.Quantity, data.CartRef, data.CartItemId],
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
                    FROM    cartitems
                    WHERE   CartItemId = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.CartItemId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};
