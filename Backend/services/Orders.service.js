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

exports.getByDeliveryman = (data, callback) => {
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
                    WHERE       orders.Deliveryman = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Deliveryman],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByStatus = (data, callback) => {
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
                    WHERE       orders.Status = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Status],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByStatusCustomer = (data, callback) => {
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
                    WHERE       orders.Status = ?
                                AND orders.Customer = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Status, data.Customer],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByStatusDeliveryman = (data, callback) => {
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
                    WHERE       orders.Status = ?
                                AND orders.Deliveryman = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Status, data.Deliveryman],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByStatusOrderMonthYear = (data, callback) => {
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
                    WHERE       orders.Status = ?
                                AND MONTH(orders.OrderDate) = ?
                                AND YEAR(orders.OrderDate) = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Status, data.Month, data.Year],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};

exports.getByStatusDeliveryMonthYear = (data, callback) => {
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
                    WHERE       orders.Status = ?
                                AND MONTH(orders.DeliveryDate) = ?
                                AND YEAR(orders.DeliveryDate) = ?
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Status, data.Month, data.Year],
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
                    UPDATE      orders
                    SET         Deliveryman = ?
                                ,DeliveryDate = ?
                                ,ApprovedBy = ?
                                ,Status = ?
                    WHERE       OrderId = ?;
                    `;
    var options = { sql: sqlString, nestTables: false };
    db.query(
        options,
        [data.Deliveryman, data.DeliveryDate, data.ApprovedBy, data.Status, data.OrderId],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            // var nestedResults = func.convertToNested(results, nestingOptions);
            return callback(null, results);
        }
    );
};