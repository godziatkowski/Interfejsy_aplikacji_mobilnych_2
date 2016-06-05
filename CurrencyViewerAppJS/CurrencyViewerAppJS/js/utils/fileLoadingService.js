(function () {
    'use strict';

    angular.module('currencyViewerApp')
    .service('fileLoadingService', fileLoadingService);

    fileLoadingService.$inject = ['fileListDownloader', 'fileStorageService', 'xmlDownloader'];

    function fileLoadingService(fileListDownloader, fileStorageService, xmlDownloader) {
        var files = undefined;
        var filesLoaded = false;
        var promise = loadFileList();

        return {
            addStoredFileName: addStoredFileName,
            getFile: getFile
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
            console.log('saving file list');
            fileStorageService.store('fileList', files);
        }

        function loadFileList() {
            console.log('loadingFiles');
            return fileStorageService.load('fileList').then(function (result) {
                console.log(result);
                if (result) {
                    files = result;
                }
                filesLoaded = true;
            })

        }

    }

})();