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

    // Считаем строку с дополнительными параметрами
    var report = getUrlVar('report');
    var id = getUrlVar('id');

    $(document).ready(function ($) {
        // Инициализация модуля "Отчет принятых составов"
        view_incoming_report.init({
            api_dir: null,
            api_wsd: null,
            fn_init: function (init) {
                view_incoming_report.view(id)
                LockScreenOff();
            }.bind(this),
        });
    });
})(jQuery); // End of use strict