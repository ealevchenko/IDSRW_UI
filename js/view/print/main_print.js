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
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //
    App.User_Name = $('input#username').val();

    var VICR = App.view_incoming_report;
    var view_incoming_report = new VICR();

    var PRN_WS = App.print_ws;
    var prnws = new PRN_WS();

    // Считаем строку с дополнительными параметрами
    var report = getUrlVar('report');
    var id = getUrlVar('id');

    $(document).ready(function ($) {
        var process = 2;
        // Выход из инициализации
        var out_init = function (process) {
            if (process === 0) {
                LockScreenOff();
                if (report === 'report_fst') {
                    view_incoming_report.view(id);
                }
                if (report === 'ws_statement1') {
                    prnws.view_ws_statement(1, id);
                }
                if (report === 'ws_statement2') {
                    prnws.view_ws_statement(2, id);
                }
            }
        }.bind(this);

        // Инициализация модуля "Отчет принятых составов"
        view_incoming_report.init({
            api_dir: null,
            api_wsd: null,
            fn_init: function (init) {
                // На проверку окончания инициализации
                process--;
                //console.log('[main_print] [view_incoming_report] process ' + process);
                out_init(process);
            }.bind(this),
        });
        // Инициализация модуля ""
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