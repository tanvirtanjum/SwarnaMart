const db = require("../config/db.config");

exports.get = (data, callback) => {
    var sqlString = `
                    SELECT      *
                                ,(
                                    SELECT  SUM(cartitems.Quantity*products.UnitPrice)
                                    FROM    cartitems
                                    LEFT JOIN   products
                                                ON products.ProductId = cartitems.Product
                                    WHERE   cartitems.CartRef = orders.Cart
                                ) AS TotalPayable
                    FROM        orders
                    LEFT JOIN   users
                                ON users.UserId = orders.Customer
                    LEFT JOIN   profiles
                                ON profiles.user = orders.Customer
                    LEFT JOIN   carts
                                ON carts.CartId = orders.Cart
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

exports.getByCustomer = (data, callback) => {
    var sqlString = `
                    SELECT      *
                                ,(
                                    SELECT  SUM(cartitems.Quantity*products.UnitPrice)
                                    FROM    cartitems
                                    LEFT JOIN   products
                                                ON products.ProductId = cartitems.Product
                                    WHERE   cartitems.CartRef = orders.Cart
                                ) AS TotalPayable
                    FROM        orders
                    LEFT JOIN   users
                                ON users.UserId = orders.Customer
                    LEFT JOIN   profiles
                                ON profiles.user = orders.Customer
                    LEFT JOIN   carts
                                ON carts.CartId = orders.Cart
                    WHERE       orders.Customer = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Customer],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};