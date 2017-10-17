var imeetingsite = window.imeetingsite || {};
imeetingsite.pagination = imeetingsite.pagination || {};

(function (pagination, $) {

    var currentPage = 1;
    var recordsPerPage = 15;
    var collection = "";

    pagination.renderPagination = function (dataCollection) {
        var datesCollection = [];
        for (var i = (currentPage - 1) * recordsPerPage; i < (currentPage * recordsPerPage) && i < dataCollection.length; i++) {
            datesCollection.push(dataCollection[i]);
        }

        return datesCollection;
    }

    pagination.nextPage = function (dataCollection) {
        if (currentPage < numberOfPages(dataCollection)) {
            currentPage++;
        }
        return pagination.renderPagination(dataCollection);
    }

    pagination.previousPage = function (dataCollection) {
        if (currentPage > 1) {
            currentPage--;
        }
        return pagination.renderPagination(dataCollection);
    }

    function numberOfPages(dataCollection) {
        return Math.ceil(dataCollection.length / recordsPerPage);
    }

})(imeetingsite.pagination, $)