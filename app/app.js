'use strict';

function Store(location, maxCustomers, minCustomers, avgCookie) {
  this.location = location;
  this.maxCustomers = maxCustomers;
  this.minCustomers = minCustomers;
  this.avgCookie = avgCookie;
  this.cookiesPerHour = [];
  this.total = 0;
  this.generateCookiesPerHour = function () {
    this.cookiesPerHour = generateCookies(this.minCustomers, this.maxCustomers, this.avgCookie);
  };
  this.totalCalc = function () {
    this.total = calculateTotal(this.cookiesPerHour);
  };
}

var seattleLocation = new Store('Seattle', 65, 23, 6.3);
var tokyoLocation = new Store('Tokyo', 24, 3, 1.2);
var dubaiLocation = new Store('Dubai', 38, 11, 3.7);
var parisLocation = new Store('Seattle', 38, 20, 2.3);
var limaLocation = new Store('Lima', 16, 2, 4.6);

var times = [
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
];

var locations = [seattleLocation, tokyoLocation, dubaiLocation, parisLocation, limaLocation];

function writeTable() {
  var tableEl = document.getElementById('table');
  var rowTime = document.createElement('tr');
  var emptyTimeCell = document.createElement('td');
  emptyTimeCell.textContent = '';
  rowTime.appendChild(emptyTimeCell);
  for(var t = 0; t < times.length; t++) {
    var timeCell = document.createElement('td');
    timeCell.textContent = times[t];
    rowTime.appendChild(timeCell);
  }
  var totalTimeCell = document.createElement('td');
  totalTimeCell.textContent = 'Daily Location Total';
  rowTime.appendChild(totalTimeCell);
  tableEl.appendChild(rowTime);
  for (var i = 0; i < locations.length; i++) {
    var currentLocation = locations[i];
    currentLocation.generateCookiesPerHour();
    currentLocation.totalCalc();
    var row = document.createElement('tr');
    var locationCell = document.createElement('td');
    locationCell.textContent = currentLocation.location;
    row.appendChild(locationCell);
    for(var cell = 0; cell < currentLocation.cookiesPerHour.length; cell++) {
      var cookiesCell = document.createElement('td');
      cookiesCell.textContent = currentLocation.cookiesPerHour[cell];
      row.appendChild(cookiesCell);
    }
    var totalCell = document.createElement('td');
    totalCell.textContent = currentLocation.total;
    row.appendChild(totalCell);
    tableEl.appendChild(row);
  }
}

function generateCookies(min, max, avg) {
  var saledCookesPerHour = [];
  for(var i = 0; i < times.length; i++) {
    var random = getRandom(min, max);
    var calc = Math.floor(random * avg);
    saledCookesPerHour.push(calc);
  }
  return saledCookesPerHour;
}

writeTable();

function calculateTotal(cookiesList) {
  var sum = 0;
  for(var i = 0; i < cookiesList.length; i++) {
    sum = sum + cookiesList[i];
  }
  return sum;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
