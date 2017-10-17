  var imeetingsite = window.imeetingsite || {};
  imeetingsite.datepanelbl = imeetingsite.datepanelbl || {};

  (function (datepanelbl, $) {

      var BaseRecurrenceClass = function () {

          var formatDate = function (dateToFormat) {
              // Format and get seperate values for DD MM and YYYY to show dates as DD.MM.YYYY
              var dd = dateToFormat.getDate();
              var mm = dateToFormat.getMonth() + 1;
              var yyyy = dateToFormat.getFullYear();
              if (dd < 10) {
                  dd = '0' + dd;
              }

              if (mm < 10) {
                  mm = '0' + mm;
              }
              return dd + "." + mm + "." + yyyy
          };

          var getNoEndDate = function (currentDate) {
              currentDate.setFullYear(currentDate.getFullYear() + 20);
              return currentDate;
          };

          var isWeekDay = function (currentDate) {
              var day = currentDate.getDay();
              if (day != 6 && day != 0) {
                  return true;
              }
              return false;
          };

          var countNumberOfWeeksDays = function (patternType) {
              var weekDaysCounter = 0;
              var weekDays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
              var i = 0;
              while (i <= weekDays.length) {
                  if (patternType.hasOwnProperty(weekDays[i])) {
                      weekDaysCounter++;
                  }
                  i++;
              }

              return weekDaysCounter;
          };

          var compareDates = function (weekStartDate, weekEndDate, eventStartDate) {
              if (weekEndDate < eventStartDate) {
                  weekEndDate.setMonth(weekEndDate.getMonth());
                  weekStartDate.setMonth(weekStartDate.getMonth());
              }
          };

          var getFirstLastDateOfWeek = function (pattern, eventStartDate) {
              var week = {},
                  weekStartDate = new Date(eventStartDate),
                  weekEndDate = new Date(eventStartDate);
              var weekName = pattern.weekdayOfMonth;

              if ((weekName == "first" && pattern.hasOwnProperty("day")) ||
                  (weekName == "first" && pattern.hasOwnProperty("weekday")) ||
                  (weekName == "first" && pattern.hasOwnProperty("weekend_day")) ||
                  (weekName == "first" && pattern.hasOwnProperty("su")) ||
                  (weekName == "first" && pattern.hasOwnProperty("mo")) ||
                  (weekName == "first" && pattern.hasOwnProperty("tu")) ||
                  (weekName == "first" && pattern.hasOwnProperty("we")) ||
                  (weekName == "first" && pattern.hasOwnProperty("th")) ||
                  (weekName == "first" && pattern.hasOwnProperty("fr")) ||
                  (weekName == "first" && pattern.hasOwnProperty("sa")) ||

                  (weekName == "second" && pattern.hasOwnProperty("day")) ||
                  (weekName == "second" && pattern.hasOwnProperty("weekday")) ||

                  (weekName == "third" && pattern.hasOwnProperty("day")) ||
                  (weekName == "third" && pattern.hasOwnProperty("weekday")) ||

                  (weekName == "fourth" && pattern.hasOwnProperty("day")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("weekday"))
              ) {
                  weekStartDate.setDate(1);
                  weekEndDate.setDate(7);
              } else if ((weekName == "second" && pattern.hasOwnProperty("weekend_day")) ||
                  (weekName == "second" && pattern.hasOwnProperty("su")) ||
                  (weekName == "second" && pattern.hasOwnProperty("mo")) ||
                  (weekName == "second" && pattern.hasOwnProperty("tu")) ||
                  (weekName == "second" && pattern.hasOwnProperty("we")) ||
                  (weekName == "second" && pattern.hasOwnProperty("th")) ||
                  (weekName == "second" && pattern.hasOwnProperty("fr")) ||
                  (weekName == "second" && pattern.hasOwnProperty("sa"))
              ) {

                  weekStartDate.setDate(8);
                  weekEndDate.setDate(14);

              } else if ((weekName == "third" && pattern.hasOwnProperty("weekend_day")) ||
                  (weekName == "third" && pattern.hasOwnProperty("su")) ||
                  (weekName == "third" && pattern.hasOwnProperty("mo")) ||
                  (weekName == "third" && pattern.hasOwnProperty("tu")) ||
                  (weekName == "third" && pattern.hasOwnProperty("we")) ||
                  (weekName == "third" && pattern.hasOwnProperty("th")) ||
                  (weekName == "third" && pattern.hasOwnProperty("fr")) ||
                  (weekName == "third" && pattern.hasOwnProperty("sa"))
              ) {
                  weekStartDate.setDate(15);
                  weekEndDate.setDate(21);

              } else if ((weekName == "fourth" && pattern.hasOwnProperty("weekend_day")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("su")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("mo")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("tu")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("we")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("th")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("fr")) ||
                  (weekName == "fourth" && pattern.hasOwnProperty("sa"))
              ) {
                  weekStartDate.setDate(22);
                  weekEndDate.setDate(28);

              }

              week.FirstDate = weekStartDate;
              week.LastDate = weekEndDate;

              return week;
          };

          var daysInMonth = function (month, year) {
              month = month + 1;
              return new Date(year, month, 0).getDate();
          };

          var getLastWeekDayFromMonth = function (date) {
              var totalDays = daysInMonth(date.getMonth(), date.getFullYear()); //Get total days in a month
              date.setDate(totalDays);
              while (date.getDay() == 0 || date.getDay() == 6) { // Loop until week day is found.
                  date.setDate(totalDays--);
              }
              return date;
          };

          var getSpecificLastDayFromMonth = function (date, day) {
              var totalDays = daysInMonth(date.getMonth(), date.getFullYear()); //Get total days in a month
              date.setDate(totalDays);
              while (date.getDay() != day) { // Loop until week day is found.
                  date.setDate(totalDays--);
              }
              return date;
          };

          var getFirstWeekDay = function (dateFromWeek) {
              var day = dateFromWeek.getDay();
              if (day == 6) {
                  dateFromWeek.setDate(currentDate.getDate() + 2);
                  return dateFromWeek;
              } else if (day == 0) {
                  dateFromWeek.setDate(currentDate.getDate() + 1);
                  return dateFromWeek;
              } else {
                  return dateFromWeek;
              }

          };

          var getWeekEndDate = function (pattern, date) {
              var oWeekEnd = {
                  first: 0,
                  second: 0,
                  third: 0,
                  fourth: 0,
                  last: 0
              };
              var totalDays = daysInMonth(date.getMonth(), date.getFullYear()); //Get total days in a month
              var weekEndsArray = new Array();

              for (var i = 1; i <= totalDays; i++) { //looping through days in month
                  var newDate = new Date(date.getFullYear(), date.getMonth(), i)
                  if (newDate.getDay() == 0 || newDate.getDay() == 6) { //if Sunday
                      weekEndsArray.push(i);
                  }
              }
              oWeekEnd.first = weekEndsArray[0];
              oWeekEnd.second = weekEndsArray[1];
              oWeekEnd.third = weekEndsArray[2];
              oWeekEnd.fourth = weekEndsArray[3];
              oWeekEnd.last = weekEndsArray[weekEndsArray.length - 1];

              date.setDate(oWeekEnd[pattern.weekdayOfMonth]);
              return date;
          };

          var getWeekDay = function (pattern, weekDate) {

              var arrays = {
                  first: [1, 0, 0, 0, 0, 0, 2],
                  second: [2, 1, 1, 1, 1, 3, 3],
                  third: [3, 2, 2, 2, 4, 4, 4],
                  fourth: [4, 3, 3, 5, 5, 5, 5],
                  //      Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday                  
              };

              // Get last week day of a month.
              if (pattern.weekdayOfMonth == "last") {
                  return getLastWeekDayFromMonth(weekDate);
              } else {
                  weekDate.setDate(weekDate.getDate() + arrays[pattern.weekdayOfMonth][weekDate.getDay()]);
                  return weekDate;
              }
          };

          var getDateByDayNumber = function (pattern, date) {
              var weekDays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

              var day = null;
              var i = 0;
              while (i <= weekDays.length) {
                  if (pattern.hasOwnProperty(weekDays[i])) {
                      day = i; // Assign the day number to the variable                      
                  }
                  i++;
              };

              // Get last week day of a month.
              if (pattern.weekdayOfMonth == "last") {
                  return getSpecificLastDayFromMonth(date, day);
              } else {
                  var dateToFind = new Date(date);
                  while (dateToFind.getDay() != day) {
                      dateToFind.setDate(dateToFind.getDate() + 1);
                  }
                  return dateToFind;
              }

          };


          var getDateFromWeekByDay = function (pattern, eventStartDate, oWeek) {
              var date = new Date(oWeek.FirstDate);

              if (pattern.hasOwnProperty("day")) {
                  if (pattern.weekdayOfMonth == "second") {
                      date.setDate(date.getDate() + 1);
                  } else if (pattern.weekdayOfMonth == "third") {
                      date.setDate(date.getDate() + 2);
                  } else if (pattern.weekdayOfMonth == "fourth") {
                      date.setDate(date.getDate() + 3);
                  } else if (pattern.weekdayOfMonth == "last") {
                      date.setDate(daysInMonth(oWeek.FirstDate.getMonth(), oWeek.FirstDate.getFullYear()));
                  }
              } else if (pattern.hasOwnProperty("weekday")) {
                  date = getWeekDay(pattern, date);
              } else if (pattern.hasOwnProperty("weekend_day")) {
                  date = getWeekEndDate(pattern, date);
              } else {
                  date = getDateByDayNumber(pattern, date);
              }

              return date;
          };

          return {
              formatDate: formatDate,
              getFirstWeekDay: getFirstWeekDay,
              getNoEndDate: getNoEndDate,
              isWeekDay: isWeekDay,
              countNumberOfWeeksDays: countNumberOfWeeksDays,
              getFirstLastDateOfWeek: getFirstLastDateOfWeek,
              getDateFromWeekByDay: getDateFromWeekByDay
          }
      };


      var DailyRecurrenceClass = function (oBaseRecurrenceClass) {

          var calcEndDateByBusinessDays = function (startDate, repeatFrequency) {
              var endDate = new Date(startDate);
              var currentRepeatFrequency = 0;

              while (currentRepeatFrequency < repeatFrequency) {
                  endDate.setDate(endDate.getDate() + 1);
                  // Call the method of base class and check if the end date is a Week Day
                  if (oBaseRecurrenceClass.isWeekDay(endDate)) {
                      currentRepeatFrequency++;
                  }
              }

              return endDate;
          };

          var calcEndDateByDaily = function (oRule, oPatternType, startDate) {
              var oWindowEnd = oRule.windowEnd;
              var oRepeatInstances = oRule.repeatInstances;
              var recurrenceDataResults = {};

              if (oWindowEnd) {
                  // Calculate the endDate when Day Frequency and End Date is selected
                  recurrenceDataResults.EndDate = new Date(oWindowEnd);
              } else if (oRepeatInstances) {
                  // If weekday is selected
                  if (oPatternType.hasOwnProperty("weekday")) {

                      // Calculate the endDate when Day Frequency and Repeat Frequency (Recurrence)
                      var repeatFrequency = parseInt(oRepeatInstances) - 1;
                      recurrenceDataResults.EndDate = calcEndDateByBusinessDays(startDate, repeatFrequency);
                  } else {
                      // Calculate the endDate when Day Frequency and Repeat Frequency (Recurrence)
                      var repeatFrequency = parseInt(oRepeatInstances);
                      var dayFrequency = parseInt(oPatternType.dayFrequency) || 1
                      repeatFrequency = (dayFrequency * repeatFrequency) - 1;
                      startDate.setDate(startDate.getDate() + repeatFrequency);
                      recurrenceDataResults.EndDate = startDate;

                  }
              } else {
                  recurrenceDataResults.EndDate = oBaseRecurrenceClass.getNoEndDate(startDate);
              }

              recurrenceDataResults.DayFrequency = parseInt(oPatternType.dayFrequency) || 1;

              return recurrenceDataResults;
          };

          var getDailyRecurrenceDates = function (startDate, oRule, oRepeat) {

              var patternType = oRepeat.daily.$
              var nextDateTime = new Date(startDate);
              var datesCollection = [];
              var dayFrequency = 0;
              var recurrenceDataResults = calcEndDateByDaily(oRule, patternType, new Date(startDate));
              var nextDateAfterEndDate = new Date(recurrenceDataResults.EndDate);

              dayFrequency = recurrenceDataResults.DayFrequency;
              // Get the next date after the ending dat;e
              nextDateAfterEndDate.setDate(nextDateAfterEndDate.getDate() + 1);

              // Loop and push dates into array till it is less than date after ending date.
              while (nextDateTime < nextDateAfterEndDate) {

                  // Format the date to German format DD.MM.YYYY
                  //var selectedDate = getDateByGermanFormat(nextDateTime);
                  var selectedDate = oBaseRecurrenceClass.formatDate(nextDateTime);
                  if (patternType.hasOwnProperty("weekday")) {
                      if (oBaseRecurrenceClass.isWeekDay(nextDateTime)) {
                          datesCollection.push(selectedDate);
                      }
                  } else {
                      datesCollection.push(selectedDate);
                  }
                  // Increment the variable by frequency
                  nextDateTime.setDate(nextDateTime.getDate() + dayFrequency);
              }

              return datesCollection;
          }

          return {
              getDailyRecurrenceDates: getDailyRecurrenceDates
          }

      };


      var WeeklyRecurrenceClass = function (oBaseRecurrenceClass) {
          

          var getDateByWeeklyRecurrenceDays = function (datesCollection, eventStartDate, dateIncrementer, dayNumber) {
              var dateToEvaluate = new Date(dateIncrementer);
              dateToEvaluate.setDate(dateToEvaluate.getDate() + dayNumber);
              var selectedDate = oBaseRecurrenceClass.formatDate(dateToEvaluate);
              if (dateToEvaluate >= eventStartDate) {
                  datesCollection.push(selectedDate);
              }
              return datesCollection;
          };

          var calcDatesByWeek = function (patternType, firstDateOfWeek, nextDateAfterEndDate, eventStartDate) {
              var weekFrequency = parseInt(patternType.weekFrequency);
              var datesCollection = [];
              // Loop and push dates into array till it is less than date after ending date.
              while (firstDateOfWeek < nextDateAfterEndDate) {

                  if (patternType.hasOwnProperty("su")) {
                      getDateByWeeklyRecurrenceDays(datesCollection, eventStartDate, firstDateOfWeek, 0);
                  }
                  if (patternType.hasOwnProperty("mo")) {
                      getDateByWeeklyRecurrenceDays(datesCollection, eventStartDate, firstDateOfWeek, 1);
                  }
                  if (patternType.hasOwnProperty("tu")) {
                      getDateByWeeklyRecurrenceDays(datesCollection, eventStartDate, firstDateOfWeek, 2);
                  }
                  if (patternType.hasOwnProperty("we")) {
                      getDateByWeeklyRecurrenceDays(datesCollection, eventStartDate, firstDateOfWeek, 3);
                  }
                  if (patternType.hasOwnProperty("th")) {
                      getDateByWeeklyRecurrenceDays(datesCollection, eventStartDate, firstDateOfWeek, 4);
                  }
                  if (patternType.hasOwnProperty("fr")) {
                      getDateByWeeklyRecurrenceDays(datesCollection, eventStartDate, firstDateOfWeek, 5);
                  }
                  if (patternType.hasOwnProperty("sa")) {
                      getDateByWeeklyRecurrenceDays(datesCollection, eventStartDate, firstDateOfWeek, 6);
                  }
                  firstDateOfWeek.setDate(firstDateOfWeek.getDate() + (weekFrequency * 7));
              }
              return datesCollection;
          };


          var getWeeklyRecurrenceDates = function (startDate, oRule, oRepeat) {
              var patternType = oRepeat.weekly.$;
              var currentWeek = 1;
              var eventStartDate = new Date(startDate);
              // Get the first date of the week.
              var firstDateOfWeek = new Date(startDate);
              var oWindowEnd = oRule.windowEnd;
              var oRepeatInstances = oRule.repeatInstances;

              // Move date to first day of the week i.e. Sunday
              firstDateOfWeek.setDate(firstDateOfWeek.getDate() - firstDateOfWeek.getDay());

              if (oWindowEnd) {

                  var nextDateAfterEndDate = new Date(oWindowEnd);
                  nextDateAfterEndDate.setDate(nextDateAfterEndDate.getDate() + 1);
                  return calcDatesByWeek(patternType, firstDateOfWeek, nextDateAfterEndDate, eventStartDate);

              } else if (oRepeatInstances) {

                  // Calculate the endDate when Day Frequency and Repeat Frequency (Recurrence)
                  var totalOccurrences = parseInt(oRepeatInstances);
                  var numberOfWeekDays = oBaseRecurrenceClass.countNumberOfWeeksDays(patternType);

                  var quotient = Math.floor(totalOccurrences / numberOfWeekDays);
                  var remainder = totalOccurrences % numberOfWeekDays;
                  var occurrenceWeeks = quotient + remainder;
                  var weekFrequency = parseInt(patternType.weekFrequency);
                  var totalWeeks = weekFrequency * occurrenceWeeks;
                  var totalDaysEventLast = totalWeeks * 7;
                  var nextDateAfterEndDate = new Date(startDate);
                  nextDateAfterEndDate.setDate(nextDateAfterEndDate.getDate() + totalDaysEventLast);

                  var datesCollection = calcDatesByWeek(patternType, firstDateOfWeek, nextDateAfterEndDate, eventStartDate);
                  // Remove the extra dates that are more than Occurence count from the array
                  if (datesCollection.length >= totalOccurrences) {
                      var extraDates = datesCollection.length - totalOccurrences;
                      datesCollection.splice(totalOccurrences, extraDates);
                  }
                  return datesCollection;

              } else {

                  var nextDateAfterEndDate = new Date(startDate);
                  nextDateAfterEndDate = oBaseRecurrenceClass.getNoEndDate(nextDateAfterEndDate);
                  nextDateAfterEndDate.setDate(nextDateAfterEndDate.getDate() + 1);

                  return calcDatesByWeek(patternType, firstDateOfWeek, nextDateAfterEndDate, eventStartDate);
              }
          };

          return {
              getWeeklyRecurrenceDates: getWeeklyRecurrenceDates
          }
      };


      var MonthlyRecurrenceClass = function (oBaseRecurrenceClass) {

          var calcDatesByMonthDayPattern = function (startDate, finishDate, day, monthlyFrequency) {
              var datesCollection = [];
              var dayOfMonth = new Date(startDate);
              var eventStartDate = new Date(startDate);
              if (day != 0)
                  dayOfMonth.setDate(day);

              while (dayOfMonth < finishDate) {
                  if (dayOfMonth >= eventStartDate) {
                      var selectedDate = oBaseRecurrenceClass.formatDate(dayOfMonth);
                      datesCollection.push(selectedDate);
                  }
                  dayOfMonth.setMonth(dayOfMonth.getMonth() + monthlyFrequency);
              }
              return datesCollection;
          }

          var getMonthlyByDayRecurrenceDates = function (startDate, oRule, oRepeat) {
              var patternType = oRepeat.monthlyByDay.$;
              var monthlyFrequency = parseInt(patternType.monthFrequency);
              var oWindowEnd = oRule.windowEnd;
              var oRepeatInstances = oRule.repeatInstances;
              var eventStartDate = new Date(startDate);
              var finishDate = new Date(startDate);
              var datesCollection = [];
              var calendarDate = new Date(startDate);
              var eventStartDate = new Date(startDate);

              // Calculate the finish Date
              if (oWindowEnd) {
                  finishDate = new Date(oWindowEnd);

              } else if (oRepeatInstances) {
                  var numOfMonths = monthlyFrequency * oRepeatInstances;
                  finishDate = new Date(startDate);
                  finishDate.setMonth(finishDate.getMonth() + numOfMonths);

              } else {
                  finishDate = new Date(startDate);
                  finishDate.setFullYear(finishDate.getFullYear() + 100);
              }
              var weekStartDate = new Date(),
                  weekEndDate = new Date();
              var weekEndDate = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth() + 1, 0);


              while (calendarDate < finishDate) {
                  if (calendarDate >= eventStartDate) {

                      var oWeek = oBaseRecurrenceClass.getFirstLastDateOfWeek(patternType, calendarDate);
                      var calendarDate = oBaseRecurrenceClass.getDateFromWeekByDay(patternType, calendarDate, oWeek);
                      if (calendarDate >= eventStartDate) {
                          var calendarDateFormatted = oBaseRecurrenceClass.formatDate(calendarDate);
                          datesCollection.push(calendarDateFormatted);
                      }
                  }
                  calendarDate.setDate(1);
                  calendarDate.setMonth(calendarDate.getMonth() + monthlyFrequency);
              }
              return datesCollection;

          }

          var getMonthlyRecurrenceDates = function (startDate, oRule, oRepeat) {
              var patternType = oRepeat.monthly.$;
              var day = patternType.day;
              var oWindowEnd = oRule.windowEnd;
              var oRepeatInstances = oRule.repeatInstances;
              var monthlyFrequency = parseInt(patternType.monthFrequency);
              var finishDate;


              if (oWindowEnd) {
                  finishDate = new Date(oWindowEnd);                  
              } else if (oRepeatInstances) {
                  var numOfMonths = monthlyFrequency * oRepeatInstances;
                  finishDate = new Date(startDate);
                  finishDate.setMonth(finishDate.getMonth() + numOfMonths);                  
              } else {
                  finishDate = new Date(startDate);
                  finishDate.setFullYear(finishDate.getFullYear() + 100);                  
              }
              return calcDatesByMonthDayPattern(startDate, finishDate, day, monthlyFrequency);
          }

          return {
              getMonthlyRecurrenceDates: getMonthlyRecurrenceDates,
              getMonthlyByDayRecurrenceDates: getMonthlyByDayRecurrenceDates
          }
      };



      datepanelbl.getDatesRangeFromRecurrenceData = function (startDate, jsonRecurrenceData) {

          if (jsonRecurrenceData) {

              var oRule = jsonRecurrenceData.recurrence.rule;
              var oRepeat = oRule.repeat;
              var oBaseRecurrenceClass = new BaseRecurrenceClass();

              if (oRepeat.daily) {
                  return DailyRecurrenceClass(oBaseRecurrenceClass).getDailyRecurrenceDates(startDate, oRule, oRepeat);
              } else if (oRepeat.weekly) {
                  return WeeklyRecurrenceClass(oBaseRecurrenceClass).getWeeklyRecurrenceDates(startDate, oRule, oRepeat);

              } else if (oRepeat.monthly) {
                  return MonthlyRecurrenceClass(oBaseRecurrenceClass).getMonthlyRecurrenceDates(startDate, oRule, oRepeat);

              } else if (oRepeat.monthlyByDay) {
                  return MonthlyRecurrenceClass(oBaseRecurrenceClass).getMonthlyByDayRecurrenceDates(startDate, oRule, oRepeat);

              } else if (oRepeat.yearly) {

              }
          }
      }

      datepanelbl.getDatesRange = function (startDate, EndDate) {
          var startDT = new Date(startDate);
          var endDT = new Date(EndDate);

          var datesCollection = [];
          var incrementDT = new Date(startDate);
          while (incrementDT <= endDT) {
              var dd = incrementDT.getDate();
              var mm = incrementDT.getMonth() + 1;
              if (dd < 10) {
                  dd = '0' + dd;
              }

              if (mm < 10) {
                  mm = '0' + mm;
              }
              datesCollection.push(dd + "." + mm + "." + incrementDT.getFullYear());
              incrementDT.setDate(incrementDT.getDate() + 1);
          }

          return datesCollection;
      }

  })(imeetingsite.datepanelbl, $)