'use strict';


var seattleLocation = {
  location: 'Seattle',
  maxCustomers: 65,
  minCustomers: 23,
  avgCookie: 6.3,
  cookiesPerHour: [],
  generateCookiesPerHour: function() {
    this.cookiesPerHour = generateCookies(this.minCustomers, this.maxCustomers, this.avgCookie);
  },
};

var tokyoLocation = {
  location: 'Tokyo',
  maxCustomers: 24,
  minCustomers: 3,
  avgCookie: 1.2,
  cookiesPerHour: [],
  generateCookiesPerHour: function() {
    this.cookiesPerHour = generateCookies(this.minCustomers, this.maxCustomers, this.avgCookie);
  },
};

var dubaiLocation = {
  location: 'Dubai',
  maxCustomers: 38,
  minCustomers: 11,
  avgCookie: 3.7,
  cookiesPerHour: [],
  generateCookiesPerHour: function() {
    this.cookiesPerHour = generateCookies(this.minCustomers, this.maxCustomers, this.avgCookie);
  },
};

var parisLocation = {
  location: 'Paris',
  maxCustomers: 38,
  minCustomers: 20,
  avgCookie: 2.3,
  cookiesPerHour: [],
  generateCookiesPerHour: function() {
    this.cookiesPerHour = generateCookies(this.minCustomers, this.maxCustomers, this.avgCookie);
  },
};

var limaLocation = {
  location: 'Lima',
  maxCustomers: 16,
  minCustomers: 2,
  avgCookie: 4.6,
  cookiesPerHour: [],
  generateCookiesPerHour: function() {
    this.cookiesPerHour = generateCookies(this.minCustomers, this.maxCustomers, this.avgCookie);
  },
};

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

for (var i = 0; i < locations.length; i++) {
  var currentLocation = locations[i];
  var title = document.createElement('h3');
  var divEl = document.createElement('div');
  var cookiesList = document.createElement('ul');
  var total = 0;
  title.textContent = currentLocation.location;
  divEl.appendChild(title);
  currentLocation.generateCookiesPerHour();
  for(var j = 0; j < currentLocation.cookiesPerHour.length; j++) {
    var li = document.createElement('li');
    var p = document.createElement('p');
    p.textContent = times[j] + ': ' + currentLocation.cookiesPerHour[j] + ' cookies';
    li.appendChild(p);
    cookiesList.appendChild(li);
    total = total + currentLocation.cookiesPerHour[j];
  }
  var liTotal = document.createElement('li');
  var pTotal = document.createElement('p');
  pTotal.textContent = 'Total: ' + total + ' cookies';
  liTotal.appendChild(pTotal);
  cookiesList.appendChild(liTotal);
  divEl.appendChild(cookiesList);
  document.getElementById('main').append(divEl);
}

function generateCookies(min, max, avg) {
  var array = [];
  for(var i = 0; i < 14; i++) {
    var random = getRandom(min, max);
    var calc = random * avg;
    array.push(Math.round(calc));
  }
  return array;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
