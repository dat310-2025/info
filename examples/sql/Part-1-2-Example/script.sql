-- The following deletes the table if it exists. This is useful for testing.
-- It also deletes all data in the table.
DROP TABLE IF EXISTS employee;

DROP TABLE IF EXISTS department;

CREATE TABLE
    employee (ID, name, salary, departmentID, office);

CREATE TABLE
    department (ID, name);

INSERT INTO
    department (ID, name)
VALUES
    (0, "Engineering"),
    (1, "HR"),
    (2, "Engineering");

INSERT INTO
    employee (ID, name, salary, departmentID, office)
VALUES
    (1234, "Tom", 50000, 0, "A101"),
    (1235, "Bjørn", NULL, 1, "B102"),
    (1345, "Ida", 60000, 0, "A103"),
    (1236, "Alice", 55000, 0, "A104"),
    (1237, "Bob", 45000, 1, "B105"),
    (1238, "Charlie", 70000, 2, "C106"),
    (1239, "David", 65000, 0, "A107"),
    (1240, "Eve", 50000, 1, "B108"),
    (1241, "Frank", 60000, 2, "C109"),
    (1242, "Grace", 75000, 0, "A110"),
    (1243, "Heidi", 55000, 1, "B111"),
    (1244, "Ivan", 80000, 2, "C112"),
    (1245, "Judy", 65000, 0, "A113"),
    (1246, "Karl", 55000, 0, "A101"),
    (1247, "Liam", 45000, 1, "B102"),
    (1248, "Mia", 70000, 2, "C103"),
    (1249, "Noah", 65000, 0, "A104"),
    (1250, "Olivia", 50000, 1, "B105"),
    (1251, "Pam", 60000, 2, "C106"),
    (1252, "Quinn", 75000, 0, "A107"),
    (1253, "Rita", 55000, 1, "B108"),
    (1254, "Sam", 80000, 2, "C109"),
    (1255, "Tina", 65000, 0, "A110"),
    (1255, "Siri", 100000, NULL, NULL),
    (1256, "Jørn", 100000, NULL, NULL);

SELECT * FROM employee;