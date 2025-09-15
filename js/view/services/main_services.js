(function ($) {

    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            //'mwsd_title_operation_auto': '«Автоматическая расстановка вагонов»',
            //'mwsd_title_operation_reverce': '«Реверс вагонов»',
            //'mwsd_title_operation_manual_position': '«Ручная расстановка»',
            'mwsd_title_button_Ok': 'Ok',
            'mwsd_title_button_Cancel': 'Отмена',

            //'mwsd_mess_load_wagons': 'Загружаю перечень вагонов на выбранном пути...',
            //'mwsd_mess_load_operators': 'Загружаю перечень операторов на станции...',
            //'mwsd_mess_load_balance': 'Загружаю остаток...',

            //'mwsd_mess_war_not_way_provide': 'Операция предъявления недоступна, путь не имеет выхода на УЗ!',
            //'mwsd_mess_war_not_way_devision': 'Операция выгрузки-погрузки недоступна, путь не имеет выхода в цех!',
            //'mwsd_mess_war_not_select_way': 'Операция {0} недоступна, невыбран путь!',
            //'mwsd_mess_war_not_wagons_way': 'Операция {0} недоступна, на пути нет вагонов!',

            //'mwsd_title_form_apply': 'ВЫПОЛНИТЬ',
            //'mwsd_title_form_searsh': 'РЕЗУЛЬТАТ ПОИСКА',
            //'mwsd_title_form_apply_manual_position': 'ВЫПОЛНИТЬ РУЧНУЮ РАССТАНОВКУ',

            //'mwsd_title_mess_find_wagon': 'Поиск вагона на предприятии...',

            //'mwsd_confirm_mess_apply_operation_auto': 'Выполнить операцию «Автоматическая расстановка вагонов» в количестве: {0} (ваг.)?',
            //'mwsd_confirm_mess_apply_operation_manual': 'Выполнить операцию «Ручной расстановки вагонов» в количестве: {0} (ваг.)?',

            //'mwsd_title_form_apply_operation_auto': 'Выполняю автоматическую расстановку вагонов',
            //'mwsd_title_form_apply_operation_manual_position': 'Выполняю ручную расстановку вагонов',
            //'mwsd_title_form_apply_searsh_wagon': 'Выполняю поиск вагона...',

            //'mwsd_mess_cancel_operation_auto': 'Операция «Автоматическая расстановка вагонов» – отменена',
            //'mwsd_mess_cancel_operation_manual': 'Операция «Ручной расстановки вагонов» – отменена',

            //'mwsd_confirm_mess_apply_operation_reverce': 'Выполнить операцию «Реверс вагонов» в количестве: {0} (ваг.)?', //  в количестве: {0} (ваг.), станция: {1}, путь: {2}
            //'mwsd_title_form_apply_operation_reverce': 'Выполняю реверс вагонов',
            //'mwsd_mess_cancel_operation_reverce': 'Операция «Реверс вагонов» – отменена',

            //'mwsd_mess_error_api': 'Ошибка выполнения запроса!',

            //'mwsd_mess_ok_operation_auto': 'Операция «Автоматическая расстановка вагонов» выполнена, перенумерованно {0} (ваг.)',
            //'mwsd_mess_error_operation_auto': 'При выполнении операции «Автоматическая расстановка вагонов» произошла ошибка, код ошибки: {0}',
            //'mwsd_mess_0_operation_auto': 'При выполнении операции «Автоматическая расстановка вагонов» по вагонам нет изменений!',

            //'mwsd_mess_ok_operation_manual': 'Операция «Ручная расстановка вагонов» выполнена, перенумерованно {0} (ваг.)',
            //'mwsd_mess_error_operation_manual': 'При выполнении операции «Ручной расстановки вагонов» произошла ошибка, код ошибки: {0}',
            //'mwsd_mess_0_operation_manual': 'При выполнении операции «Ручной расстановки вагонов» по вагонам нет изменений!',

            //'mwsd_mess_ok_operation_reverce': 'Операция «Реверс вагонов» выполнена, перенумерованно {0} (ваг.)',
            //'mwsd_mess_error_operation_reverce': 'При выполнении операции «Реверс вагонов» произошла ошибка, код ошибки: {0}',
            //'mwsd_mess_0_operation_reverce': 'При выполнении операции «Реверс вагонов» по вагонам нет изменений!',

            //'mwsd_mess_error_searsh_wagon': 'Ошибка поиска вагона в системе ИДС, введен неправильный номер {0}',
            //'mwsd_mess_error_searsh_way': 'Ошибка определения пути в системе ИДС, id_way = {0}',
            //'mwsd_mess_error_not_searsh_wagon': 'Ошибка, вагон № {0} – не найден!',



        },
        'en':  //default language: English
        {
            //'title_select': 'Выберите...',
            'mwsd_title_button_Ok': 'Ok',
            'mwsd_title_button_Cancel': 'Отмена',
        }
    };

    // Определим глобальные переменные
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang)
    //App.User_Name = $('input#username').val();

    // Операции
    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    //var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    //var api_wsd = new IDS_WSD({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

    var api_dir = new API_DIRECTORY({ url_api: App.Url_Api });
    var api_wsd = new IDS_WSD({ url_api: App.Url_Api });


    var MCF = App.modal_confirm_form;


    var TWS = App.table_ws;
    //var ttb = new TWS('div#total-balance');


    var VSCCCA = App.view_calc_cost_cargo_arrival;
    var vsccca = new VSCCCA('main.container-fluid');

    var VSVIA = App.view_verification_invoices_arrival;
    var vsvia = new VSVIA('main.container-fluid');

    var VSCCCO = App.view_calc_cost_cargo_outgoing;
    var vsccco = new VSCCCO('main.container-fluid');

    var VSVIO = App.view_verification_invoices_outgoing;
    var vsvio = new VSVIO('main.container-fluid');

    var VSSHINV = App.view_search_invoices;
    var vsshinv = new VSSHINV('main.container-fluid');

    var VSILET = App.view_instructional_letters;
    var vsilet = new VSILET('main.container-fluid');

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    var alert = App.alert_form;
    var main_alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var validation_form = App.validation_form;
    var validation = new validation_form();

    // Считаем строку с дополнительными параметрами
    var id = getUrlVar('id');

    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('mess_load_reference', App.Langs));
        if (list) {
            api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }
    };

    var list_station = [];
    var list_way = [];
    var user_info = {};

    var userAgent = navigator.userAgent.toLowerCase();
    //var user = window.userID;
    //var userInfo = window.ShowpadLib.getUserInfo();


    $(function () {

        setInterval(function () {
            $('label#user_name').text(moment().format("YYYY-MM-DD hh:mm:ss"));
            $('label#curent_date').text(App.AdminInfo ? App.AdminInfo.name : '?');
            $('label#data_source').text(App.AdminInfo ? App.AdminInfo.dataSource : '?');
            //ids_gl.getCountClient(function (count) {
            //    $('label#client_count').text(count);
            //});

        }, 1000);

        //sessionStorage.setItem("username", "ediks");
        //var d = sessionStorage.getItem("username");
        var srv = null;
        // загрузить данные
        switch (id) {
            case 'ccca': {
                srv = new MCF(); // Создадим экземпляр окно сообщений
                srv.init({
                    static: true,
                    keyboard: false,
                    hidden: true,
                    centered: true,
                    fsize: 'lg',
                    bt_close_text: langView('mwsd_title_button_Cancel', App.Langs),
                    bt_ok_text: langView('mwsd_title_button_Ok', App.Langs),
                });
                break;
            }
        }
        // Загрузим справочники
        load_db(['station', 'ways'], true, function (result) {
            var process = 1;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    switch (id) {
                        case 'ccca': {
                            vsccca.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                fn_db_update: null,
                                fn_init: function () {
                                    LockScreenOff();
                                },
                                fn_close: function (upd) {

                                }
                            });
                            break;
                        }
                        case 'via': {
                            vsvia.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                fn_db_update: null,
                                fn_init: function () {
                                    LockScreenOff();
                                },
                                fn_close: function (upd) {

                                }
                            });
                            break;
                        }
                        case 'ccco': {
                            vsccco.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                ids_arrival: null, 
                                ids_outgoing: null,
                                fn_db_update: null,
                                fn_init: function () {
                                    LockScreenOff();
                                },
                                fn_close: function (upd) {

                                }
                            });
                            break;
                        }
                        case 'vio': {
                            vsvio.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                ids_arrival: null,
                                ids_outgoing: null,
                                fn_db_update: null,
                                fn_init: function () {
                                    LockScreenOff();
                                },
                                fn_close: function (upd) {

                                }
                            });
                            break;
                        }
                        case 'shinv': {
                            vsshinv.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                ids_arrival: null,
                                ids_outgoing: null,
                                fn_db_update: null,
                                fn_init: function () {
                                    LockScreenOff();
                                },
                                fn_close: function (upd) {

                                }
                            });
                            break;
                        }
                        case 'ilet': {
                            vsilet.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                ids_arrival: null,
                                ids_outgoing: null,
                                fn_db_update: null,
                                fn_init: function () {
                                    LockScreenOff();
                                },
                                fn_close: function (upd) {

                                }
                            });
                            break;
                        }
                        default: {
                            LockScreenOff();break;
                        }
                    }
                }
            }.bind(this);

            api_wsd.getAdminInfo(function (info) {
                user_info = info;
                process--;
                //console.log('[main_wsd] [api_wsd] process ' + process);
                out_init(process);
            })

        }.bind(this));
    });

})(jQuery); // End of use strict