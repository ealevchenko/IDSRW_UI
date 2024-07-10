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
    function ids_wsd(options) {

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
    ids_wsd.prototype.load = function (list, lock, update, callback) {
        this.api_com.load(list, lock, update, callback);
    };

    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------
    // Вагоны на пути
    ids_wsd.prototype.getAdminInfo = function (callback) {
        this.api_com.get('/Admin/user_info', callback);
    };
    // Вагоны на пути
    ids_wsd.prototype.getViewWagonsOfIdWay = function (id, callback) {
        this.api_com.get('/WSD/view/wagon/way/' + id, callback);
    };
    // Баланс
    ids_wsd.prototype.getViewTotalBalance = function (callback) {
        this.api_com.get('/WSD/view/total_balance', callback);
    };
    // Операторы по станции
    ids_wsd.prototype.getViewOperatorsOfStation = function (id, callback) {
        this.api_com.get('/WSD/view/operators/station/' + id, callback);
    };
    // Операторы отправленые вагоны со станции 
    ids_wsd.prototype.getViewOperatorsSendOfIdStation = function (id, callback) {
        this.api_com.get('/WSD/view/operators/send/station/' + id, callback);
    };
    // Операторы прибывающие вагоны на станцию 
    ids_wsd.prototype.getViewOperatorsArrivalOfIdStation = function (id, callback) {
        this.api_com.get('/WSD/view/operators/arrival/station/' + id, callback);
    };
    // Вагоны на пути прибытия на станцию 
    ids_wsd.prototype.getViewOpenWagonsOfOuterWaysStationOn = function (id, callback) {
        this.api_com.get('/WSD/view/wagons/outer_way/station_on/' + id, callback);
    };
    // Вагоны на пути отправления со станции
    ids_wsd.prototype.getViewOpenWagonsOfOuterWaysStationFrom = function (id, callback) {
        this.api_com.get('/WSD/view/wagons/outer_way/station_from/' + id, callback);
    };
    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ (Плата за пользование) =========================================================
    // Расчет платы за пользование вагонов на пути
    ids_wsd.prototype.getCalcUsageFeeCarsOfWay = function (id, callback) {
        this.api_com.get('/WSD/view/calc_wagon/way/' + id, callback);
    };
    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ (Операции) =========================================================
    //АРМ, Операция принять вагоны на внутреную станцию АМКР 
    ids_wsd.prototype.postArrivalWagonsOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/arrival/', operation, callback);
    };
    //АРМ, Операция отправить вагоны на внутреную станцию АМКР 
    ids_wsd.prototype.postOutgoingWagonsOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/outgoing/', operation, callback);
    };
    //АРМ, Операция вернуть-оменить вагоны на внутреную станцию АМКР
    ids_wsd.prototype.postReturnWagonsOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/return/', operation, callback);
    };

    App.ids_wsd = ids_wsd;

    window.App = App;

})(window);