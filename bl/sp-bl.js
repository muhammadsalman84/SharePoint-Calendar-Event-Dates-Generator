var imeetingsite = window.imeetingsite || {};
imeetingsite.bl = imeetingsite.bl || {};

(function (bl, $) {

    bl.getDatesByIsoFormat = function (selectedDate) {
        // Get the date and parse to ISO8601 format
        var dateParts = imeetingsite.shared.getDateParts(selectedDate);
        var oSelectedDate = new Date(dateParts.YYYY, dateParts.MM, dateParts.DD);
        var isoSelectedDT = oSelectedDate.toISOString();
        var oNextDate = new Date(dateParts.YYYY, dateParts.MM, dateParts.DD);
        oNextDate.setDate(oNextDate.getDate() + 1);
        var isoNextDT = oNextDate.toISOString();

        return [isoSelectedDT, isoNextDT];
    }

    bl.loadDates = function () {
        var oDeferred = $.Deferred();
        //var listName = imeetingsite.spshared.SPList.Konfiguration;
        var paramters = "?$select=Title";

        /*imeetingsite.dataaccess.getAllFromList(listName, "")
            .done(function (results) {*/

        // Example 1 json object
        var results = [{
            fRecurrence: 0,
            Start_x0020_Date: '8/18/2017 5:00 PM',
            End_x0020_Date: '10/18/2017 5:00 PM'
        }];

        // Example 2 json object with Recurrence Data
        var results = [{
            fRecurrence: -1,
            Start_x0020_Date: '8/18/2017 5:00 PM',
            End_x0020_Date: '10/18/2017 5:00 PM',
            RecurrenceData: '<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><monthly monthFrequency="1" day="16" /></repeat><repeatForever>FALSE</repeatForever></rule></recurrence>'
        }];

        if (results.length > 0) {
            var datesCollection;
            if (results[0]["fRecurrence"] == "-1") {
                var xmlRecurrenceData = results[0]["RecurrenceData"];
                var jsonRecurrenceDate = $.xml2json(xmlRecurrenceData);
                datesCollection = imeetingsite.datepanelbl.getDatesRangeFromRecurrenceData(results[0]["Start_x0020_Date"], jsonRecurrenceDate);

            } else {
                datesCollection = imeetingsite.datepanelbl.getBasicDatesRange(results[0]["Start_x0020_Date"], results[0]["End_x0020_Date"]);
            }


            oDeferred.resolve(datesCollection);
        }
        /* })
            .fail(function (error) {
                oDeferred.reject();
            });
*/
        return oDeferred.promise();
    }

})(imeetingsite.bl, $)