USE currencyApp_db;

users.create({ email: "j@doe.com", password: "password", firstname: "Jane", lastname: "Doe" });
trips.create({ tripname: "London" });
receipts.create({ receiptname: "Hilton", receiptdate: "10/10/20", currency: "GBP", foreignAmount: 200.10 });

SELECT * FROM users.tb;
SELECT * FROM trips_tb;
SELECT * FROM receipts_tb;
