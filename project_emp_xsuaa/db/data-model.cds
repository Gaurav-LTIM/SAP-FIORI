namespace schema;

using { cuid, managed } from '@sap/cds/common';

entity EMPLOYEE_DETAILS : cuid , managed
{
    name: String(255);
    email_id: String(255);
    manager: String(255);
    department: Association to one DEPARTMENT;
}

entity DEPARTMENT : cuid 
{
    dep_name: String(255);
    employee: Association to many EMPLOYEE_DETAILS on employee.department = $self;
}