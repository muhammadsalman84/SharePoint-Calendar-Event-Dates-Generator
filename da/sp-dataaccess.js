var imeetingsite = window.imeetingsite || {};
imeetingsite.dataaccess = imeetingsite.dataaccess || {};

(function (dataaccess, $) {

    var getListItemType = function GetItemTypeForListName(listName) {
        return "SP.Data." + listName.charAt(0).toUpperCase() + listName.slice(1) + "ListItem";
    }

    dataaccess.getAllFromList = function (listName, paramters) {
        var oDeferred = $.Deferred();
        var appWebUrl = _spPageContextInfo.webAbsoluteUrl;
        var restUrl = appWebUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items" + paramters;

        $.ajax({
            method: "GET",
            url: restUrl,
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                var results = data.d.results;
                oDeferred.resolve(results);
            },
            error: function (data, errorCode, errorMessage) {              
                oDeferred.reject(data);
            }
        });

        return oDeferred.promise();
    }

    dataaccess.createListItem = function (listName, metadata) {
        var oDeferred = $.Deferred();
        var appWebUrl = _spPageContextInfo.webAbsoluteUrl;

        var httpRequestUrl = appWebUrl + "/_api/web/lists/GetByTitle('" + listName + "')/items";

        // Extend the metadata object
        $.extend(metadata, {
            "__metadata": {
                "type": getListItemType(listName)
            }
        });

        $.ajax({
            url: httpRequestUrl,
            method: "POST",
            data: JSON.stringify(metadata),
            headers: {
                "Accept": "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()/*,
                "X-HTTP-Method": "POST"*/
            },
            success: function (data) {
                oDeferred.resolve(data);
            },
            error: function (data, errorCode, errorMessage) {
                oDeferred.reject(data);
            }
        });

        return oDeferred.promise();
    }

  dataaccess.checkUserInGroup = function (groupName) {
        var oDeferred = $.Deferred();
        var appWebUrl = _spPageContextInfo.webAbsoluteUrl;
        var restUrl = appWebUrl + "/_api/web/sitegroups/getByName('" + groupName + "')/Users?$filter=Id eq " + _spPageContextInfo.userId;

        $.ajax({
            method: "GET",
            url: restUrl,
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                oDeferred.resolve(data.d);
            },
            error: function (data, errorCode, errorMessage) {
                console.log("data: " + errorMessage);
                console.log("Error Message: " + errorMessage);
                oDeferred.reject();
            }
        });

        return oDeferred.promise();
    }

    dataaccess.getList = function (listName) {
        var oDeferred = $.Deferred();
        var appWebUrl = _spPageContextInfo.webAbsoluteUrl;
        var restUrl = appWebUrl + "/_api/web/lists/GetByTitle('" + listName + "')";

        $.ajax({
            method: "GET",
            url: restUrl,
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                oDeferred.resolve(data.d);
            },
            error: function (data, errorCode, errorMessage) {
                console.log("data: " + errorMessage);
                console.log("Error Message: " + errorMessage);
                oDeferred.reject();
            }
        });

        return oDeferred.promise();
    }

    dataaccess.getList = function (listName) {
        var oDeferred = $.Deferred();
        var appWebUrl = _spPageContextInfo.webAbsoluteUrl;
        var restUrl = appWebUrl + "/_api/web/lists/GetFolderByServerRelativeUrl('" + listName + "')";

        $.ajax({
            method: "GET",
            url: restUrl,
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                oDeferred.resolve(data.d);
            },
            error: function (data, errorCode, errorMessage) {
                console.log("data: " + errorMessage);
                console.log("Error Message: " + errorMessage);
                oDeferred.reject();
            }
        });

        return oDeferred.promise();
    }

    dataaccess.getRootWeb = function () {
        var oDeferred = $.Deferred();
        var appWebUrl = _spPageContextInfo.webAbsoluteUrl;
        var restUrl = appWebUrl + "/_api/site/Rootweb";

        $.ajax({
            method: "GET",
            url: restUrl,
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                oDeferred.resolve(data.d);
            },
            error: function (data, errorCode, errorMessage) {
                console.log("data: " + errorMessage);
                console.log("Error Message: " + errorMessage);
                oDeferred.reject();
            }
        });

        return oDeferred.promise();
    }

    // Get the local file as an array buffer.
    dataaccess.getFileBuffer = function (file) {
        var deferred = $.Deferred();
        var reader = new FileReader();
        reader.onloadend = function (e) {
            deferred.resolve(e.target.result);
        }
        reader.onerror = function (e) {
            deferred.reject(e.target.error);
        }
        reader.readAsArrayBuffer(file);
        return deferred.promise();
    }

    dataaccess.uploadFile = function (serverRelativeUrlToFolder, arrayBuffer, fileName) {

        var self = this,
            deferred = $.Deferred();
        var appWebUrl = _spPageContextInfo.webAbsoluteUrl;
        //var executor = new SP.RequestExecutor(self.appWebUrl);

        // Construct the endpoint.
        var fileCollectionEndpoint = String.format(
            "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/files" +
            "/add(overwrite=true, url='{2}')",
            appWebUrl, serverRelativeUrlToFolder, fileName);

        // Send the request and return the response.
        // This call returns the SharePoint file.
        $.ajax({
            url: fileCollectionEndpoint,
            type: "POST",
            data: arrayBuffer,
            processData: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-length": arrayBuffer.byteLength
            },
            success: function (data) {
                if (data) {
                    deferred.resolve(data.d);
                } else {
                    deferred.reject(data);
                }
            },
            error: function (data, errorCode, errorMessage) {
                console.log("data: " + errorMessage);
                console.log("Error Message: " + errorMessage);
                deferred.reject(data);
            }
        });

        return deferred.promise();
    }

    // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    dataaccess.getListItem = function (fileListItemUri) {

        // Send the request and return the response.
        return $.ajax({
            url: fileListItemUri,
            type: "GET",
            headers: {
                "accept": "application/json;odata=verbose"
            }
        });
    }

    // Change the display name and title of the list item.
    dataaccess.updateListItem = function (itemMetadata, selectedDate) {

        // Define the list item changes. Use the FileLeafRef property to change the display name. 
        // For simplicity, also use the name as the title. 
        // The example gets the list item type from the item's metadata, but you can also get it from the
        // ListItemEntityTypeFullName property of the list.
        var body = String.format("{{'__metadata':{{'type':'{0}'}},'SelectedDate':'{1}'}}",
            itemMetadata.type, selectedDate);

        // Send the request and return the promise.
        // This call does not return response content from the server.
        return jQuery.ajax({
            url: itemMetadata.uri,
            type: "POST",
            data: body,
            headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                "content-length": body.length,
                "IF-MATCH": itemMetadata.etag,
                "X-HTTP-Method": "MERGE"
            }
        });
    }



})(imeetingsite.dataaccess, $)