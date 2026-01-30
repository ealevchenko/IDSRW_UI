(function ($) {

    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mwsd_title_button_Ok': 'Ok',
            'mwsd_title_button_Cancel': 'Отмена',
        },
        'en':  //default language: English
        {
            'mwsd_title_button_Ok': 'Ok',
            'mwsd_title_button_Cancel': 'Отмена',
        }
    };

    // Определим глобальные переменные

    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang)
    //App.User_Name = $('input#username').val();

    // Операции
    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;

    var api_dir = new API_DIRECTORY({ url_api: App.Url_Api });
    var api_wsd = new IDS_WSD({ url_api: App.Url_Api });


    var MCF = App.modal_confirm_form;


    var TWS = App.table_ws;

    var OBARWC = App.view_rep_operating_balance_rw_cars;
    var obarwc = new OBARWC('main.container-fluid');

    var LILW = App.view_rep_instructional_letters_wagon;
    var lilw = new LILW('main.container-fluid');

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
            case 'obarwc': {
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
        load_db([], true, function (result) {
            var process = 1;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    switch (id) {
                        case 'obarwc': {
                            obarwc.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                fn_db_update: null,
                                fn_init: function () {
                                    obarwc.view(function (wagons) {
                                        LockScreenOff();
                                    }.bind(this));
                                }
                            });
                            break;
                        }
                        case 'lilw': {
                            lilw.init({
                                alert: null,
                                api_dir: null,
                                api_wsd: null,
                                fn_db_update: null,
                                fn_init: function (result) {
                                    if (result) {
                                        lilw.view(function (wagons) {
                                            LockScreenOff();
                                        }.bind(this));
                                    } else {
                                        LockScreenOff();
                                    }

                                }
                            });
                            break;
                        }
                        default: {
                            LockScreenOff(); break;
                        }
                    }
                }
            }.bind(this);

            api_wsd.getAdminInfo(function (info) {
                user_info = info;
                process--;
                //console.log('[main_wsd_report] [api_wsd] process ' + process);
                out_init(process);
            })

        }.bind(this));
    });

})(jQuery); // End of use strict