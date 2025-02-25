-- 1. Select employees from department with ID 0
SELECT
    ID,
    name
FROM
    employee
WHERE
    departmentID = 0;

-- 2. Select departments with names alphabetically ordered
SELECT
    name
FROM
    department
ORDER BY
    name;

-- 3. Select employees ordered by department and name
SELECT
    ID,
    name,
    departmentID
FROM
    employee
ORDER BY
    departmentID,
    name;

-- 4. Select employees from department with ID 0, ordered by name.
SELECT
    ID,
    name
FROM
    employee
WHERE
    departmentID = 0
ORDER BY
    name;

-- 5. Try the following and see that it gives an error, since WHERE and ORDER BY have wrong order.
-- SELECT
--     ID,
--     name
-- FROM
--     employee
-- ORDER BY
--     name
-- WHERE
--     departmentID = 0;
-- 6. Look for employee with name tom. 
-- Note that LIKE comparison is not case sensistive.
SELECT
    *
FROM
    employee
WHERE
    name LIKE "tom";

-- 7. Look for employees with name starting with e.
SELECT
    *
FROM
    employee
WHERE
    name LIKE "e%";

-- 8. Look for employee with name containing e.
SELECT
    *
FROM
    employee
WHERE
    name LIKE "%e%";

-- GROUP BY
-- 9. Count employees in each department
SELECT
    departmentID,
    COUNT(*) AS count
FROM
    employee
GROUP BY
    departmentID;

-- 10. For comparison, this query gives duplicate departmentIDs
SELECT
    departmentID,
FROM
    employee;

-- 11. This query just gives any one name from the group
SELECT
    departmentID,
    name
FROM
    employee
GROUP BY
    departmentID;

-- 12. Select avg and maximum salary for each department
SELECT
    departmentID,
    AVG(salary),
    MAX(salary)
FROM
    employee
GROUP BY
    departmentID;


-- JOIN
-- 13. Join allows us to combine values from two tables.
SELECT
    employee.name,
    department.name,
    employee.office
FROM
    employee
JOIN
    department
ON
    employee.departmentID = department.ID
ORDER BY department.ID, employee.name;

-- 14. LEFT JOIN includes all rows from the left table
-- this includes rows with NULL value and rows that have no match
SELECT
    employee.name,
    department.name,
    employee.office
FROM
    employee
LEFT JOIN
    department
ON
    employee.departmentID = department.ID
ORDER BY department.ID, employee.name;

-- 15. JOIN with the same table, gives many rows
SELECT
    e1.name,
    e2.name
FROM
    employee AS e1 JOIN employee AS e2
    ON e1.office = e2.office;

-- 16. employees that share an office
SELECT
    e1.name
FROM
    employee AS e1 JOIN employee AS e2
    ON (e1.office = e2.office
        AND e1.ID != e2.ID);

-- 17. queries can be nested within each other
SELECT name from employee 
WHERE office IN (
    SELECT office, count(ID) AS count 
    FROM employee 
    GROUP BY office
    HAVING count > 1 AND office IS NOT NULL
);

