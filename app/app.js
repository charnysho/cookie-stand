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

Store.prototype.render = function() {
  this.generateCookiesPerHour();
  this.totalCalc();
  var row = document.createElement('tr');
  var locationCell = document.createElement('td');
  locationCell.textContent = this.location;
  row.appendChild(locationCell);
  for(var cell = 0; cell < this.cookiesPerHour.length; cell++) {
    var cookiesCell = document.createElement('td');
    cookiesCell.textContent = Math.floor(this.cookiesPerHour[cell] * scale[cell]);
    row.appendChild(cookiesCell);
  }
  var totalCell = document.createElement('td');
  totalCell.textContent = this.total;
  row.appendChild(totalCell);
  return row;
};

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

var scale = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

var locations = [seattleLocation, tokyoLocation, dubaiLocation, parisLocation, limaLocation];

writeSalesTable();
writeStaffTable();


function writeSalesTable() {
  var tableEl = document.getElementById('table');
  createCaptionRow(tableEl, 'Sales information');
  tableEl.appendChild(createFirstRow(true));
  render(locations, tableEl);
}

function createFirstRow(isCreateTotalCell) {
  var rowTime = document.createElement('tr');
  var emptyTimeCell = document.createElement('td');
  emptyTimeCell.textContent = '';
  rowTime.appendChild(emptyTimeCell);
  for(var t = 0; t < times.length; t++) {
    var timeCell = document.createElement('td');
    timeCell.textContent = times[t];
    rowTime.appendChild(timeCell);
  }
  if(isCreateTotalCell) {
    var totalTimeCell = document.createElement('td');
    totalTimeCell.textContent = 'Daily Location Total';
    rowTime.appendChild(totalTimeCell);
  }
  return rowTime;
}

function render(locationsList, tableEl) {
  for (var i = 0; i < locationsList.length; i++) {
    var currentLocation = locationsList[i];
    console.log(currentLocation);
    tableEl.appendChild(currentLocation.render());
  }
}

function createCaptionRow(tableEl, captionMessage) {
  var caption = document.createElement('caption');
  caption.textContent = captionMessage;
  tableEl.appendChild(caption);
}

function writeStaffTable() {
  var tableEl = document.getElementById('tableStaff');
  createCaptionRow(tableEl, 'Staff information');
  tableEl.appendChild(createFirstRow(false));
  for (var i = 0; i < locations.length; i++) {
    var currentLocation = locations[i];
    var row = document.createElement('tr');
    var locationCell = document.createElement('td');
    locationCell.textContent = currentLocation.location;
    row.appendChild(locationCell);
    for(var cell = 0; cell < currentLocation.cookiesPerHour.length; cell++) {
      var staff = calcValuesForSecondTable(currentLocation.cookiesPerHour[cell]);
      var cookiesCell = document.createElement('td');
      cookiesCell.textContent = staff;
      row.appendChild(cookiesCell);
    }
    tableEl.appendChild(row);
  }
}

function calcValuesForSecondTable(cookiesSalesPerHour) {
  var serveCustomersPerHour = 20;
  var minimumNumberOfTossers = Math.ceil(cookiesSalesPerHour / serveCustomersPerHour);

  return Math.max(minimumNumberOfTossers, 2);
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
