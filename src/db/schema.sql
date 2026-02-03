CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    quantity INTEGER NOT NULL,
    date TEXT NOT NULL,
    region TEXT NOT NULL
);

INSERT INTO sales (product, category, amount, quantity, date, region) VALUES
('Laptop Pro', 'Electronics', 1299.99, 1, '2024-01-15', 'North'),
('Office Chair', 'Furniture', 299.50, 2, '2024-01-16', 'South'),
('Monitor 4K', 'Electronics', 499.99, 1, '2024-01-17', 'North'),
('Desk Lamp', 'Furniture', 45.00, 3, '2024-01-18', 'East'),
('Wireless Mouse', 'Electronics', 29.99, 5, '2024-01-19', 'West'),
('Standing Desk', 'Furniture', 599.00, 1, '2024-01-20', 'North'),
('USB Hub', 'Electronics', 79.99, 2, '2024-01-21', 'South'),
('Bookshelf', 'Furniture', 149.50, 1, '2024-01-22', 'East'),
('Webcam HD', 'Electronics', 89.99, 3, '2024-01-23', 'West'),
('Filing Cabinet', 'Furniture', 199.00, 1, '2024-01-24', 'North');
