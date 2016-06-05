(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('fileLoadingService', fileLoadingService);

    fileLoadingService.$inject = ['$q', 'fileListDownloader', 'fileStorageService', 'xmlDownloader'];

    function fileLoadingService($q, fileListDownloader, fileStorageService, xmlDownloader) {
        var files = undefined;
        var filesLoaded = false;
        var promise = loadFileList();

        return {
            addStoredFileName: addStoredFileName,
            getFile: getFile,
            getFiles: getFiles
        }

        function addStoredFileName(fileName) {
            if (files.indexOf(fileName) === -1) {
                files.push(fileName)
            }
            saveFileList();
        }

        function getFile(fileName) {
            if (filesLoaded) {
                return getFileAsync(fileName);
            } else {
                return promise.then(getFileAsync(fileName));
            }
        }

        function getFiles(files) {
            var promises = [];

            for (var fileNameIndex = 0; fileNameIndex < files.length; fileNameIndex++) {
                promises.push(getFile(files[fileNameIndex]));
            }

            return $q.all(promises).then(function (data) {                
                return data;
            });
        }

        function getFileAsync(fileName) {
            if (files.indexOf(fileName) !== -1) {
                return tryLoadingFromFile(fileName);
            } else {
                return tryDownloadingFileFromUrl(fileName);
            }
        }

        function tryLoadingFromFile(fileName) {
            return fileStorageService.load(fileName).then(function (fileContent) {
                if (fileContent) {
                    return fileContent;
                } else {
                    files.splice(files.indexOf(fileName), 1);
                    saveFileList();
                    return tryDownloadingFileFromUrl(fileName);
                }
            });
        }

        function tryDownloadingFileFromUrl(fileName) {
            return xmlDownloader.download(fileName)
                .then(function (fileContent) {
                    fileStorageService.store(fileName, fileContent)
                    files.push(fileName.trim());
                    saveFileList();
                    return fileContent;
                });
        }

        function saveFileList() {
            fileStorageService.store('fileList', files);
        }

        function loadFileList() {
            return fileStorageService.load('fileList').then(function (result) {
                if (result) {
                    files = result;
                } else {
                    files = [];
                }
                filesLoaded = true;
            })

        }

    }

})();