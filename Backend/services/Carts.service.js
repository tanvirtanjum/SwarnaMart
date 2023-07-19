const db = require("../config/db.config");

exports.post = (data, callback) => {
    var sqlString = `
                    INSERT      
                    INTO        carts
                                (CartCode, CreatedBy, CartStatus)
                    VALUES      (?, ?, ?);

                    SELECT      LAST_INSERT_ID() AS LastInsertId;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.CartCode, data.CreatedBy, data.CartStatus],
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
                    UPDATE      carts
                    SET         CartCode = ?,
                                CreatedBy = ?,
                                CartStatus = ?
                    WHERE       CartId = ?;

                    INSERT
                    INTO        orders
                                (Customer, Cart, Deliveryman, OrderDate, DeliveryDate, ApprovedBy, Status)
                    SELECT      CreatedBy, 
                                CartId, 0, 
                                NOW(), 
                                '', 
                                0, 
                                0
                    FROM        carts
                    WHERE       CartId = ?
                                AND CartStatus = 1;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.CartCode, data.CreatedBy, data.CartStatus, data.CartId, data.CartId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};
