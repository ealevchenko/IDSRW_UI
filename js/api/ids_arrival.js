(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            /*            'mess_load_reference': 'Загружаю справочники...',*/
        },
        'en':  //default language: English
        {
            /*            'mess_load_reference': 'Loading references ...',*/
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // Модуль инициализаии компонентов формы
    var API_COMMON = App.api_common;

    //****************************************************************************************
    //-------------------------------- Конструктор и инициализация ---------------
    // создать класс справочники ИДС
    function ids_arrival(options) {

        //this.list_cargo = null;
        //this.list_cargo_group = null;
        //this.list_cargo_etsng = null;

        this.settings = $.extend({
            url_api: null,
        }, options);
        this.api_com = new API_COMMON({
            list_load: [

            ],
            url_api: this.settings.url_api
        });
    }
    ids_arrival.prototype.load = function (list, lock, update, callback) {
        this.api_com.load(list, lock, update, callback);
    };

    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------

    //================= ПРИБЫТИЕ =============================================
    // Получить документы по прибытию храящиеся в БД
    ids_arrival.prototype.getArrivalUzDocument = function (id, callback) {
        this.api_com.get('/ArrivalUzDocument/' + id, callback);
    };
    // Получить список документов (id, №Накл. дата расчета) по прибытию храящиеся в БД за период
    ids_arrival.prototype.getListMainDocArrivalUzDocument = function (start, stop, callback) {
        this.api_com.get('/ArrivalUzDocument/list/main_doc/start/' + start + '/stop/' + stop, callback);
    };
    // Получить документы по прибытию храящиеся в БД
    ids_arrival.prototype.getArrivalUzVagonOfIdDocument = function (id, callback) {
        this.api_com.get('/ArrivalUzVagon/document/' + id, callback);
    };

    // Сервис. Обновить ArrivalUzDocumentPay
    ids_arrival.prototype.postUpdateArrivalUzDocumentPay = function (value, callback) {
        this.api_com.post('/ArrivalUzDocument/update/pay/', value, callback);
    };
    // Сервис. Обновить ArrivalUzDocument -> PayerLocal
    ids_arrival.prototype.postArrivalUzDocumentPayerLocal = function (value, callback) {
        this.api_com.post('/ArrivalUzDocument/update/payer_local/', value, callback);
    };

    // Сервис. Получить список документов для сверки по прибытию храящиеся в БД за период
    ids_arrival.prototype.getVerificationArrivalUzDocumentOfId = function (id, callback) {
        this.api_com.get('/ArrivalUzDocument/verification/id/' + id, callback);
    };
    // Сервис. Получить список документов для сверки по прибытию храящиеся в БД за период
    ids_arrival.prototype.getVerificationArrivalUzDocumentOfPeriod = function (start, stop, callback) {
        this.api_com.get('/ArrivalUzDocument/verification/start/' + start + '/stop/' + stop, callback);
    };
    // Сервис. Обновить сверку документов
    ids_arrival.prototype.postVerificationArrivalUzDocument = function (value, callback) {
        this.api_com.post('/ArrivalUzDocument/update/verification/', value, callback);
    };
    // Сервис. Получить список документов по отправке за период
    ids_arrival.prototype.getRegisterOutgoingUzDocument = function (start, stop, callback) {
        this.api_com.get('/OutgoingUzDocument/register/start/' + start + '/stop/' + stop, callback);
    };
    // Сервис. Получить документ по id
    ids_arrival.prototype.getRegisterOutgoingUzDocumentOfId = function (id, callback) {
        this.api_com.get('/OutgoingUzDocument/register/id/' + id, callback);
    };
    // Сервис. Обновить тарифы по отправленным документам
    ids_arrival.prototype.postUpdatePayOutgoingUzDocument = function (value, callback) {
        this.api_com.post('/OutgoingUzDocument/update/pay/', value, callback);
    };
    // Сервис. Получить документ "СВЕРКИ НАКЛАДНЫХ ПО ОТПРАВКЕ" храящиеся в БД по id
    ids_arrival.prototype.getVerificationOutgoingUzDocumentOfId = function (id, callback) {
        this.api_com.get('/OutgoingUzDocument/verification/id/' + id, callback);
    };
    // Сервис. Получить список документов "СВЕРКИ НАКЛАДНЫХ ПО ОТПРАВКЕ" храящиеся в БД за период
    ids_arrival.prototype.getVerificationOutgoingUzDocumentOfPeriod = function (start, stop, callback) {
        this.api_com.get('/OutgoingUzDocument/verification/start/' + start + '/stop/' + stop, callback);
    };
    // Сервис. Обновить "СВЕРКА НАКЛАДНЫХ ПО ОТПРАВКЕ"
    ids_arrival.prototype.postVerificationOutgoingUzDocument = function (value, callback) {
        this.api_com.post('/OutgoingUzDocument/update/verification/', value, callback);
    };

    App.ids_arrival = ids_arrival;

    window.App = App;

})(window);