var imeetingsite = window.imeetingsite || {};
imeetingsite.app = imeetingsite.app || {};

(function (app, $) {

    app.init = function () {
        imeetingsite.mainmodule.loadConfguration();        
    }

    // When DOM is ready then initialize the objects
    $(document).ready(function () {
        /*SP.SOD.executeOrDelayUntilScriptLoaded(function () {

            var heightNumber = $(window).height();
            $('.ms-WPBody').height(heightNumber);
            $('.ms-rtestate-field').height(heightNumber);


            app.init();
        }, 'sp.js');*/
        app.init();
    });
})(imeetingsite.app, $);