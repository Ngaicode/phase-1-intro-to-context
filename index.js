// Your code here
"use strict";
let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};
let createEmployeeRecords = function (employeeData) {
  return employeeData.map(function (row) {
    return createEmployeeRecord(row);
  });
};

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  // adds these values to the object and sets the type ,date and time
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  // adds these values to the object and sets the type ,date and time
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employee;
}

// calculating that the employee has worked for two hours
function hoursWorkedOnDate(employee, dateSoughtAfter) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === dateSoughtAfter;
  });

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === dateSoughtAfter;
  });

  return (outEvent.hour - inEvent.hour) / 100;
}

// calculates the earnings of the  employee
function wagesEarnedOnDate(employee, dateSoughtAfter) {
  let wage = hoursWorkedOnDate(employee, dateSoughtAfter) * employee.payPerHour;
  return parseFloat(wage.toString());
}

function allWagesFor(employee) {
  let datesOfpay = employee.timeInEvents.map(function (e) {
    return e.date;
  });

  let pay = datesOfpay.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return pay;
}

function findEmployeeByFirstName(arr, name) {
  return arr.find(function (x) {
    return x.name === name;
  });
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(function (y, z) {
    return y + allWagesFor(z);
  }, 0);
}
