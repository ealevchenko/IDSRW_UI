/* ===============================================
-= Модуль документы по прибытию =-
  + js/view/shared/common.js
  + js/module/view_op_common.js
  + js/module/ws/table_ws.js
==================================================*/
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
            'vicr_mess_init_module': 'Инициализация модуля(view_incoming_report)...',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // js/module/view_op_common.js
    var VIEW_COMMON = App.view_op_common;
    // js/view/shared/common.js

    var ALERT = App.alert_form;
    var FD = App.form_dialog;
    // js/module/ws/table_ws.js
    var TWS = App.table_ws;

    function view_incoming_report() {

    }
    // инициализация модуля
    view_incoming_report.prototype.init = function (options) {
        LockScreen(langView('vicr_mess_init_module', App.Langs));
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            api_dir: null,
            api_wsd: null,
            fn_init: null,
        }, options);
        // Инициализация вначале 
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init.call(this, true);
        }
    };
    // Показать данные 
    view_incoming_report.prototype.view = function (id) {
        //LockScreen(langView('vopac_mess_load_operation', App.Langs));
    };
    // Выбрать все вагоны выбранного состава 
    view_incoming_report.prototype.destroy = function () {

    };

    App.view_incoming_report = view_incoming_report;

    window.App = App;

})(window);