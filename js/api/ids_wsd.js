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

    //================= ОТПРАВЛЕННЫЕ СОСТАВЫ(АРМ) =============================================
    // Получить открытые отправленные составы (ids.get_outgoing_sostav ... where ...)
    ids_wsd.prototype.getViewOpenOutgoingSostavOfIdWay = function (id, callback) {
        this.api_com.get('/WSD/view/open/outgoing/sostav/way/' + id, callback);
    };
    // Получить вагоны по отправленному составу по id составу (ids.get_view_wagons_outgoing_sostav_of_id_sostav)
    ids_wsd.prototype.getViewWagonsOutgoingSostavOfIdSostav = function (id, callback) {
        this.api_com.get('/WSD/view/wagon/outgoing/sostav/id/' + id, callback);
    };
    //================= ОСНОВНОЕ ОКНО (АРМ) =============================================
    // Вагоны на пути
    ids_wsd.prototype.getAdminInfo = function (callback) {
        this.api_com.get('/Admin/user_info', callback);
    };
    // Вагоны на пути
    ids_wsd.prototype.getViewWagonsOfIdWay = function (id, callback) {
        this.api_com.get('/WSD/view/wagon/way/' + id, callback);
    };
    ids_wsd.prototype.getViewDislocationAMKRWagonOfNum = function (num, callback) {
        this.api_com.get('/WSD/view/dislocation/amkr/wagon/num/' + num, callback);
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
    // Вагоны в подаче
    ids_wsd.prototype.getViewWagonsFilingOfPeriodIdStation = function (start, stop, id, callback) {
        this.api_com.get('/WSD/view/wagons/filing/period/start/' + start + '/stop/' + stop + '/station/id/' + id, callback);
    };

    //================= ВНУТРЕНЕЕ ПЕРЕМЕЩЕНИЕ (Плата за пользование) =============================================
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
        this.api_com.post('/WSD/operation/return/', operation, callback, callback);
    };
    //АРМ, Операция роспуск вагонов на внутреней станции АМКР
    ids_wsd.prototype.postDissolutionWagonsOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/dissolution/', operation, callback, callback);
    };
    //АРМ, Операция дислокации вагонов на внутреней станции АМКР
    ids_wsd.prototype.postDislocationWagonsOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/dislocation/', operation, callback, callback);
    };
    //АРМ, Операция предъявления вагонов на УЗ на внутреней станции АМКР
    ids_wsd.prototype.postProvideWagonsOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/provide/', operation, callback, callback);
    };
    //АРМ, Операция правки даты и времени предъявления состава УЗ на внутреней станции АМКР
    ids_wsd.prototype.postDateTimeProvideWagonsOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/provide/datetime/', operation, callback, callback);
    };
    //АРМ, Операция переноса вагонов на путь предъявления
    ids_wsd.prototype.postMoveWagonsProvideWayOfStationAMKR = function (operation, callback) {
        this.api_com.post('/WSD/operation/provide/move/wagons/', operation, callback, callback);
    };
    //АРМ, Операция отправить состав на УЗ
    ids_wsd.prototype.postOperationSendingSostavOnUZ = function (operation, callback) {
        this.api_com.post('/WSD/operation/sending_uz/sostav/', operation, callback, callback);
    };
    //АРМ, Операция авто-расстановка вагонов с позиции
    ids_wsd.prototype.postAutoPosition = function (operation, callback) {
        this.api_com.post('/WSD/operation/way/auto_position/', operation, callback, callback);
    };
    //АРМ, Операция создать подачу (выгрузка)
    ids_wsd.prototype.postAddFilingUnloading = function (operation, callback) {
        this.api_com.post('/WSD/add/filing/operation/unloading/', operation, callback, callback);
    };
    //АРМ, Операция создать подачу (погрузка)
    ids_wsd.prototype.postAddFilingLoading = function (operation, callback) {
        this.api_com.post('/WSD/add/filing/operation/loading/', operation, callback, callback);
    };
    //АРМ, Операция добавить вагоны в подачу (выгрузка, погрузка, ...)
    ids_wsd.prototype.postAddWagonFiling = function (operation, callback) {
        this.api_com.post('/WSD/add/wagon/filing/', operation, callback, callback);
    };
    //АРМ, Операция убрать вагоны из подачи (выгрузка, погрузка, ...)
    ids_wsd.prototype.postDeleteWagonFiling = function (operation, callback) {
        this.api_com.post('/WSD/delete/wagon/filing/', operation, callback, callback);
    };
    //АРМ, Операция править подачу начать операцию, закончить операцию, админка (выгрузка)
    ids_wsd.prototype.postUpdateFilingOperationUnloading = function (operation, callback) {
        this.api_com.post('/WSD/update/filing/operation/unloading/', operation, callback, callback);
    };
    //АРМ, Операция править подачу начать операцию, закончить операцию, админка (погрузка)
    ids_wsd.prototype.postUpdateFilingOperationLoading = function (operation, callback) {
        this.api_com.post('/WSD/update/filing/operation/loading/', operation, callback, callback);
    };
    //АРМ, Операция править подачу цех получатель
    ids_wsd.prototype.postUpdateFilingUnloading = function (operation, callback) {
        this.api_com.post('/WSD/update/filing/', operation, callback, callback);
    };


    App.ids_wsd = ids_wsd;

    window.App = App;

})(window);