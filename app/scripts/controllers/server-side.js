'use strict';

angular.module('apMesa.ghPage')

  .controller('ServerSideCtrl', function ($scope, $templateCache, $q, phoneData, $timeout) {

    // Mock serverside call
    function getData(offset, limit, activeFilters, activeSorts) {
      var dfd = $q.defer();

      $timeout(function() {

        var results = phoneData;

        // Perform filters first:
        if (activeFilters.length) {
          results = results.filter(function(row) {
            for (var i = 0; i < activeFilters.length; i++) {
              var filterMeta = activeFilters[i];
              var columnDef = filterMeta.column;
              var filterString = filterMeta.value;

              if (columnDef.filter === 'string') {
                if (!row[columnDef.key].indexOf(filterString)) {
                  return false;
                }
              }
            }
          });
        }

        // Perform sorts
        if (activeSorts.length) {
          results = results.sort(function(rowA, rowB) {
            for (var i = 0; i < activeSorts.length; i++) {
              var sortMeta = activeSorts[i];
              var columnDef = sortMeta.column;
              var sortDirection = sortMeta.direction;

              if (columnDef.sort === 'string' && angular.isString(rowA[columnDef.key]) && angular.isString(rowB[columnDef.key])) {
                var comparisonResult = sortDirection === 'ASC' ? rowA[columnDef.key].localeCompare(rowB[columnDef.key]) : rowB[columnDef.key].localeCompare(rowA[columnDef.key]);
                if (comparisonResult !== 0) {
                  return comparisonResult;
                }
              }
            }
            return 0;
          });
        }


      }, 400);

      return dfd.promise;
    }

    $scope.my_table_options = {
      getData: getData
    };

    $scope.my_table_columns = [
      {
        id: 'DeviceName',
        label: 'Device Name',
        key: 'DeviceName',
        // The filter and sort values are only checked for truthiness by angular-mesa when getData is used
        filter: 'string',
        sort: 'string'
      },
      {
        id: 'Brand',
        label: 'Brand',
        key: 'Brand',
        filter: 'string',
        sort: 'string'
      },
      {
        id: 'weight',
        label: 'weight',
        key: 'weight',
        sort: 'string'
      },
      {
        id: 'size',
        label: 'size',
        key: 'size'
      }
    ];

  });