var imeetingsite = window.imeetingsite || {};
imeetingsite.mainmodule = imeetingsite.mainmodule || {};

(function (mainmodule, $) {
    var self = this;

    mainmodule.onNext = function () {
        imeetingsite.bl.loadDates()
            .done(function (datesCollection) {
                // Load data from SP by first Date
                var dateRecords = imeetingsite.pagination.nextPage(datesCollection);
                mainmodule.renderDates(dateRecords);
            })
            .fail(function (error) {
                console.log('Failed: Unable to get the date range from list.');
            });
    }

    mainmodule.onPrevious = function () {
        imeetingsite.bl.loadDates()
            .done(function (datesCollection) {
                // Load data from SP by first Date
                var dateRecords = imeetingsite.pagination.previousPage(datesCollection);
                mainmodule.renderDates(dateRecords);
            })
            .fail(function (error) {
                console.log('Failed: Unable to get the date range from list.');
            });
    }

    // Bind the Events to the buttons and other controls
    mainmodule.bindEvents = function () {

        $("#btnPrevious").click(function () {
            mainmodule.onPrevious();
        });

        $("#btnNext").click(function () {
            mainmodule.onNext();
        });
    }

    // Set the selecteddate to the Header.
    mainmodule.setSelectedDateInHeader = function (selectedDate) {
        $('#txtDatum').text(selectedDate);
    }

    // When a different date is selected.
    mainmodule.onChangeDateSelected = function (element) {
        var selectedDate = element.text();
        $('.dateSelected').removeClass('dateSelected'); // find and remove the dateSelected class
        $(element).addClass('dateSelected'); // Add the class to the li which is the parent of anchor  
         mainmodule.setSelectedDateInHeader(selectedDate);     
    }

    // Render all the dates on the left side of the page
    mainmodule.renderDates = function (datesCollection) {
        var datesHtml = "";

        $('#menu').empty();
        $.each(datesCollection, function (index, value) {
            datesHtml = datesHtml + "<li><a href='#' class='anchorControls'>" + value + "</a></li>";
        });

        $("#menu").append(datesHtml);

        $('.anchorControls').click(function () {
            mainmodule.onChangeDateSelected($(this).parent());            
        });

        // Call function and pass First Date as parameter
        mainmodule.onChangeDateSelected($("#menu li:first-child"));
    }

    // Load and set the Header controls on the page.
    mainmodule.loadHeaderValues = function () {
        $('#txtBetreff').text("I am using example date range. Please use real data from SharePoint Calendar list for development.");
        $('#txtWebTitle').text("SharePoint Event dates generator example");       
    }

    mainmodule.loadConfguration = function () {
        // Load the header values
        mainmodule.loadHeaderValues();

        // Load all the dates and return the dates in a array.
        imeetingsite.bl.loadDates()
            .done(function (datesCollection) {
                // render the pagination (Next) + (Previous)
                var dateRecords = imeetingsite.pagination.renderPagination(datesCollection);
                // Render the dates
                mainmodule.renderDates(dateRecords);
            })
            .fail(function (error) {
                console.log('Failed: Unable to get the date range from list.');
            });

        mainmodule.bindEvents();
    }
})(imeetingsite.mainmodule, $)