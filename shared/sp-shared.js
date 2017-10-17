var imeetingsite = window.imeetingsite || {};
imeetingsite.spshared = imeetingsite.spshared || {};

(function (spshared, $) {

     spshared.DatatableElements = {
        'tblTagesordung': '#tblTagesordung',
        'tblAnwesende': '#tblAnwesende',
        'tblProtokoll': '#tblProtokoll',
        'tblDokumente': '#tblDokumente',
        'tblAufgaben': '#tblAufgaben',
        'tblAbonnements': '#tblAbonnements'
    }

    spshared.SPList = {
        Konfiguration: 'Konfigurationen',
        TagesOrdnung: 'Tagesordnung',
        Protocol: 'Protokoll',
        Anwesende: 'Anwesende',
        Dokumente: 'Protokoll Dokumente',
        Aufgaben: 'Aufgaben',
        Abonnements: 'Abonnements',
        NewsLetterJobs: 'NewsLetterJobs'
    }

    spshared.ListMappings = {
        Anwesende: {
            SelectQuery: "?$select=ID,Person/Title&$expand=Person/Id",
            DataArray: {
                ID: 'ID',
                Title: {
                    'Person': 'Title'
                }
            },
            DTHeaders: {
                ID: 'Title',
                Path: 'Path',
                Title: 'Title'
            }
        },
        Tagesordnung: {
            SelectQuery: "?$select=*",
            DataArray: {
                ID: 'ID',
                Title: 'Title'
            },
            DTHeaders: {
                ID: 'Title',
                Path: 'Path',
                Betreff: 'Betreff'
            }
        },
        Protokoll: {
            SelectQuery: "?$select=ID,Title,Agenda/Id,Agenda/Title&$expand=Agenda/Id",
            DataArray: {
                ID: 'ID',
                Title: 'Title'
            },
            DTHeaders: {
                ID: 'Title',
                Path: 'Path',
                Betreff: 'Betreff'
            }
        },
        Abonnements: {
            SelectQuery: "?$select=*",
            DataArray: {
                ID: 'ID',
                Title: 'Title'
            },
            DTHeaders: {
                ID: 'Title',
                Path: 'Path',
                Betreff: 'Betreff'
            }
        }
    }

    spshared.SPGroups = {
        SPNewsLetterGroup: 'SPNewsLetter Verwaltung'
    }

    spshared.displayLayover = function (url, callBackOnClose, elementHtml, title) {

        var options = SP.UI.$create_DialogOptions();
        if (elementHtml) {
            options.html = elementHtml;
            options.title = title;
        } else
            options.url = url;

        options.showClose = true;
        options.dialogReturnValueCallback = Function.createDelegate(
            null, CloseCallback);
        SP.UI.ModalDialog.showModalDialog(options);

        function CloseCallback(result, target) {
            if (result == SP.UI.DialogResult.OK) {
                // Note that I use this.dataArray to allow the object to be accessed throughout the code
            }
            if (result == SP.UI.DialogResult.cancel) {
                // Run Cancel Code
            }
            callBackOnClose();

        }
    }

    spshared.getListID = function (listName, selectedDate) {
        var oDeferred = $.Deferred();
        imeetingsite.dataaccess.getAllFromList(listName)
            .done(function (results) {
                var data = [];
                if (results.length > 0) {

                    $.each(results, function (index, value) {
                        data.push([
                            value["ID"],
                            _spPageContextInfo.webAbsoluteUrl + "/Lists/" + listName + "/DispForm.aspx?ID=" + value["ID"],
                            value["Title"]
                        ]);
                    });
                }

                oDeferred.resolve(dataset);
            })
            .fail(function (error) {
                oDeferred.reject();
            });

        return oDeferred.promise();
    }





})(imeetingsite.spshared, $)