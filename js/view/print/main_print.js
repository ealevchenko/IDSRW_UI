(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {

            //'title_select': 'Выберите...',

        },
        'en':  //default language: English
        {
            //'title_select': 'Выберите...',
        }
    };

    // Определим глобальные переменные
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //
    App.User_Name = $('input#username').val();

    var PRN_ARR = App.print_arr;
    var prnarr = new PRN_ARR();

    var PRN_OUT = App.print_out;
    var prnout = new PRN_OUT();

    var PRN_WS = App.print_ws;
    var prnws = new PRN_WS();

    // Считаем строку с дополнительными параметрами
    var report = getUrlVar('report');
    var format = getUrlVar('format');
    var id = getUrlVar('id');

    $(document).ready(function ($) {
        var process = 3;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                LockScreenOff();
                if (report === 'arr_natural_statement_draft') {

                    prnarr.view_natural_statement_draft(format, id);
                }
                if (report === 'out_register_doc_transfer') {
                    prnout.view_register_doc_transfer(format, id, 0);
                }
                if (report === 'out_register_doc_transfer_amkr') {
                    prnout.view_register_doc_transfer(format, id, 1);
                }
                if (report === 'ws_statement1') {
                    prnws.view_ws_statement(1, format, id);
                }
                if (report === 'ws_statement2') {
                    prnws.view_ws_statement(2, format, id);
                }
            }
        }.bind(this);
        // Инициализация модуля "print_arr"
        prnarr.init({
            api_dir: null,
            api_wsd: null,
            ids_arrival: null,
            fn_init: function (init) {
                // На проверку окончания инициализации
                process--;
                //console.log('[main_print] [prnws] process ' + process);
                out_init(process);
            }.bind(this),
        });
        // Инициализация модуля "print_out"
        prnout.init({
            api_dir: null,
            api_wsd: null,
            ids_outgoing: null,
            fn_init: function (init) {
                // На проверку окончания инициализации
                process--;
                //console.log('[main_print] [prnws] process ' + process);
                out_init(process);
            }.bind(this),
        });
        // Инициализация модуля "print_ws"
        prnws.init({
            api_dir: null,
            api_wsd: null,
            fn_init: function (init) {
                // На проверку окончания инициализации
                process--;
                //console.log('[main_print] [prnws] process ' + process);
                out_init(process);
            }.bind(this),
        });
    });
})(jQuery); // End of use strict