(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
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
    function ids_outgoing(options) {

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
    ids_outgoing.prototype.load = function (list, lock, update, callback) {
        this.api_com.load(list, lock, update, callback);
    };

    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------

    //================= ОТПРАВКА =============================================

    // Сервис. Получить документ "Реєстр передач документів" хранящиеся в БД по id
    ids_outgoing.prototype.getRegisterDocumentTransferOutgoingSostavOfId = function (id, callback) {
        this.api_com.get('/OutgoingSostav/register/document/transfer/id/' + id, callback);
    };
    // Сервис. Получить список документов по отправке за период
    ids_outgoing.prototype.getRegisterOutgoingUzDocument = function (start, stop, callback) {
        this.api_com.get('/OutgoingUzDocument/register/start/' + start + '/stop/' + stop, callback);
    };
    // Сервис. Получить документ по id
    ids_outgoing.prototype.getRegisterOutgoingUzDocumentOfId = function (id, callback) {
        this.api_com.get('/OutgoingUzDocument/register/id/' + id, callback);
    };
    // Сервис. Обновить тарифы по отправленным документам
    ids_outgoing.prototype.postUpdatePayOutgoingUzDocument = function (value, callback) {
        this.api_com.post('/OutgoingUzDocument/update/pay/', value, callback);
    };
    // Сервис. Получить документ "СВЕРКИ НАКЛАДНЫХ ПО ОТПРАВКЕ" храящиеся в БД по id
    ids_outgoing.prototype.getVerificationOutgoingUzDocumentOfId = function (id, callback) {
        this.api_com.get('/OutgoingUzDocument/verification/id/' + id, callback);
    };
    // Сервис. Получить документ "СВЕРКИ НАКЛАДНЫХ ПО ОТПРАВКЕ" храящиеся в БД по номеру документа
    ids_outgoing.prototype.getVerificationOutgoingUzDocumentOfINum = function (num, callback) {
        this.api_com.get('/OutgoingUzDocument/verification/num/' + num, callback);
    };
    // Сервис. Получить список документов "СВЕРКИ НАКЛАДНЫХ ПО ОТПРАВКЕ" храящиеся в БД за период
    ids_outgoing.prototype.getVerificationOutgoingUzDocumentOfPeriod = function (start, stop, callback) {
        this.api_com.get('/OutgoingUzDocument/verification/start/' + start + '/stop/' + stop, callback);
    };
    // Сервис. Обновить "СВЕРКА НАКЛАДНЫХ ПО ОТПРАВКЕ"
    ids_outgoing.prototype.postVerificationOutgoingUzDocument = function (value, callback) {
        this.api_com.post('/OutgoingUzDocument/update/verification/', value, callback);
    };
    App.ids_outgoing = ids_outgoing;

    window.App = App;

})(window);