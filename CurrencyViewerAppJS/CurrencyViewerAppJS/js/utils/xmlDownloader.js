(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('xmlDownloader', xmlDownloader);

    xmlDownloader.$inject = ['$http'];

    function xmlDownloader($http) {
        var url = 'http://www.nbp.pl/kursy/xml/';

        return {
            download: load
        }

        function load(file) {
            return $http({
                method: 'GET',
                url: url + file + ".xml",
                headers: {
                    'Content-Type': 'application/xml'
                },
                
            }).then(function (result) {
                var x2js = new X2JS();
                var data = x2js.xml_str2json(result.data.substring(44));
                for (var index = 0 ; index < data.tabela_kursow.pozycja.length; index++) {
                    var average = Number(data.tabela_kursow.pozycja[index].kurs_sredni.replace(',','.'));
                    data.tabela_kursow.pozycja[index].kurs_sredni = average.toFixed(2);
                }
                data.tabela_kursow.data_publikacji = moment(data.tabela_kursow.data_publikacji).format('dddd, MMMM Do YYYY')

                return data.tabela_kursow;
                
            });

        }

    }

})();