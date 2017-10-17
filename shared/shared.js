var imeetingsite = window.imeetingsite || {};
imeetingsite.shared = imeetingsite.shared || {};

(function (shared, $) {

    shared.getDatesRange = function (startDate, EndDate) {
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

    shared.getDateParts = function (date) {
        var parts = date.split('.');
        var mm = parseInt(parts[1]) - 1;
        if (mm < 10) {
            mm = '0' + mm;
        }

        return {
            'DD': parts[0],
            'MM': mm,
            'YYYY': parts[2]
        }
    }

    shared.getDate = function (date, splitter) {
        if (date) {
            var parseDate = new Date(date);
            var DD = parseDate.getDate();
            var MM = parseDate.getMonth() + 1;
            var YY = parseDate.getFullYear();
            if (DD < 10) {
                DD = '0' + DD;
            }
            if (MM < 10) {
                MM = '0' + MM;
            }
            return DD + splitter + MM + splitter + YY;
        }
    }


    shared.getDateTimeParts = function (date) {
        if (date) {
            var parseDate = new Date(date);
            var DD = parseDate.getDate();
            var MM = parseDate.getMonth() + 1;
            var YY, HH, _mm;
            if (DD < 10) {
                DD = '0' + DD;
            }

            if (MM < 10) {
                MM = '0' + MM;
            }

            YY = parseDate.getFullYear();
            HH = parseDate.getUTCHours();
            _mm = parseDate.getUTCMinutes();

            return DD + "." + MM + "." + YY + " " + HH + ":" + _mm
        }
        return "";
    }

    shared.getISODateParts = function (date) {
        var parts = date.split('.');
        var mm = parseInt(parts[1]);
        if (mm < 10) {
            mm = '0' + mm;
        }

        return {
            'DD': parts[0],
            'MM': mm,
            'YYYY': parts[2]
        }
    }

    shared.getDatesByIsoFormat = function (selectedDate) {
        // Get the date and parse to ISO8601 format
        var dateParts = shared.getISODateParts(selectedDate);
        var oSelectedDate = new Date(dateParts.YYYY, dateParts.MM, dateParts.DD);
        var isoSelectedDT = oSelectedDate.toISOString();

        return [dateParts.MM, dateParts.DD, dateParts.YYYY].join("/");
    }

    shared.logError = function (customMessage, error) {
        console.log("Custom Error: " + customMessage);

        if (error.hasOwnProperty("responseText")) {
            console.log("Status Text: " + error.statusText);
            console.log("Response Text: " + error.responseText);            
        }
    }

})(imeetingsite.shared, $)