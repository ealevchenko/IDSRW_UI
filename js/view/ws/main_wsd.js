(function ($) {

    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mwsd_title_operation_auto': '«Автоматическая расстановка вагонов»',
            'mwsd_title_operation_reverce': '«Реверс вагонов»',
            'mwsd_title_operation_manual_position': '«Ручная расстановка»',
            'mwsd_title_button_Ok': 'Ok',
            'mwsd_title_button_Cancel': 'Отмена',

            'mwsd_mess_load_wagons': 'Загружаю перечень вагонов на выбранном пути...',
            'mwsd_mess_load_operators': 'Загружаю перечень операторов на станции...',
            'mwsd_mess_load_balance': 'Загружаю остаток...',

            'mwsd_mess_war_not_way_provide': 'Операция предъявления недоступна, путь не имеет выхода на УЗ!',
            'mwsd_mess_war_not_way_devision': 'Операция выгрузки-погрузки недоступна, путь не имеет выхода в цех!',
            'mwsd_mess_war_not_select_way': 'Операция {0} недоступна, невыбран путь!',
            'mwsd_mess_war_not_wagons_way': 'Операция {0} недоступна, на пути нет вагонов!',

            'mwsd_title_form_apply': 'ВЫПОЛНИТЬ',
            'mwsd_title_form_searsh': 'РЕЗУЛЬТАТ ПОИСКА',
            'mwsd_title_form_apply_manual_position': 'ВЫПОЛНИТЬ РУЧНУЮ РАССТАНОВКУ',

            'mwsd_title_mess_find_wagon': 'Поиск вагона на предприятии...',

            'mwsd_confirm_mess_apply_operation_auto': 'Выполнить операцию «Автоматическая расстановка вагонов» в количестве: {0} (ваг.)?',
            'mwsd_confirm_mess_apply_operation_manual': 'Выполнить операцию «Ручной расстановки вагонов» в количестве: {0} (ваг.)?',

            'mwsd_title_form_apply_operation_auto': 'Выполняю автоматическую расстановку вагонов',
            'mwsd_title_form_apply_operation_manual_position': 'Выполняю ручную расстановку вагонов',
            'mwsd_title_form_apply_searsh_wagon': 'Выполняю поиск вагона...',

            'mwsd_mess_cancel_operation_auto': 'Операция «Автоматическая расстановка вагонов» – отменена',
            'mwsd_mess_cancel_operation_manual': 'Операция «Ручной расстановки вагонов» – отменена',

            'mwsd_confirm_mess_apply_operation_reverce': 'Выполнить операцию «Реверс вагонов» в количестве: {0} (ваг.)?', //  в количестве: {0} (ваг.), станция: {1}, путь: {2}
            'mwsd_title_form_apply_operation_reverce': 'Выполняю реверс вагонов',
            'mwsd_mess_cancel_operation_reverce': 'Операция «Реверс вагонов» – отменена',

            'mwsd_mess_error_api': 'Ошибка выполнения запроса!',

            'mwsd_mess_ok_operation_auto': 'Операция «Автоматическая расстановка вагонов» выполнена, перенумерованно {0} (ваг.)',
            'mwsd_mess_error_operation_auto': 'При выполнении операции «Автоматическая расстановка вагонов» произошла ошибка, код ошибки: {0}',
            'mwsd_mess_0_operation_auto': 'При выполнении операции «Автоматическая расстановка вагонов» по вагонам нет изменений!',

            'mwsd_mess_ok_operation_manual': 'Операция «Ручная расстановка вагонов» выполнена, перенумерованно {0} (ваг.)',
            'mwsd_mess_error_operation_manual': 'При выполнении операции «Ручной расстановки вагонов» произошла ошибка, код ошибки: {0}',
            'mwsd_mess_0_operation_manual': 'При выполнении операции «Ручной расстановки вагонов» по вагонам нет изменений!',

            'mwsd_mess_ok_operation_reverce': 'Операция «Реверс вагонов» выполнена, перенумерованно {0} (ваг.)',
            'mwsd_mess_error_operation_reverce': 'При выполнении операции «Реверс вагонов» произошла ошибка, код ошибки: {0}',
            'mwsd_mess_0_operation_reverce': 'При выполнении операции «Реверс вагонов» по вагонам нет изменений!',

            'mwsd_mess_error_searsh_wagon': 'Ошибка поиска вагона в системе ИДС, введен неправильный номер {0}',
            'mwsd_mess_error_searsh_way': 'Ошибка определения пути в системе ИДС, id_way = {0}',
            'mwsd_mess_error_not_searsh_wagon': 'Ошибка, вагон № {0} – не найден!',



        },
        'en':  //default language: English
        {
            'mwsd_title_operation_auto': '«Автоматическая расстановка вагонов»',
            'mwsd_title_operation_reverce': '«Реверс вагонов»',
            'mwsd_title_operation_manual_position': '«Ручная расстановка»',
            'mwsd_title_button_Ok': 'Ok',
            'mwsd_title_button_Cancel': 'Отмена',

            'mwsd_mess_load_wagons': 'Загружаю перечень вагонов на выбранном пути...',
            'mwsd_mess_load_operators': 'Загружаю перечень операторов на станции...',
            'mwsd_mess_load_balance': 'Загружаю остаток...',

            'mwsd_mess_war_not_way_provide': 'Операция предъявления недоступна, путь не имеет выхода на УЗ!',
            'mwsd_mess_war_not_way_devision': 'Операция выгрузки-погрузки недоступна, путь не имеет выхода в цех!',
            'mwsd_mess_war_not_select_way': 'Операция {0} недоступна, невыбран путь!',
            'mwsd_mess_war_not_wagons_way': 'Операция {0} недоступна, на пути нет вагонов!',

            'mwsd_title_form_apply': 'ВЫПОЛНИТЬ',
            'mwsd_title_form_searsh': 'РЕЗУЛЬТАТ ПОИСКА',
            'mwsd_title_form_apply_manual_position': 'ВЫПОЛНИТЬ РУЧНУЮ РАССТАНОВКУ',

            'mwsd_title_mess_find_wagon': 'Поиск вагона на предприятии...',

            'mwsd_confirm_mess_apply_operation_auto': 'Выполнить операцию «Автоматическая расстановка вагонов» в количестве: {0} (ваг.)?',
            'mwsd_confirm_mess_apply_operation_manual': 'Выполнить операцию «Ручной расстановки вагонов» в количестве: {0} (ваг.)?',

            'mwsd_title_form_apply_operation_auto': 'Выполняю автоматическую расстановку вагонов',
            'mwsd_title_form_apply_operation_manual_position': 'Выполняю ручную расстановку вагонов',
            'mwsd_title_form_apply_searsh_wagon': 'Выполняю поиск вагона...',

            'mwsd_mess_cancel_operation_auto': 'Операция «Автоматическая расстановка вагонов» – отменена',
            'mwsd_mess_cancel_operation_manual': 'Операция «Ручной расстановки вагонов» – отменена',

            'mwsd_confirm_mess_apply_operation_reverce': 'Выполнить операцию «Реверс вагонов» в количестве: {0} (ваг.)?', //  в количестве: {0} (ваг.), станция: {1}, путь: {2}
            'mwsd_title_form_apply_operation_reverce': 'Выполняю реверс вагонов',
            'mwsd_mess_cancel_operation_reverce': 'Операция «Реверс вагонов» – отменена',

            'mwsd_mess_error_api': 'Ошибка выполнения запроса!',

            'mwsd_mess_ok_operation_auto': 'Операция «Автоматическая расстановка вагонов» выполнена, перенумерованно {0} (ваг.)',
            'mwsd_mess_error_operation_auto': 'При выполнении операции «Автоматическая расстановка вагонов» произошла ошибка, код ошибки: {0}',
            'mwsd_mess_0_operation_auto': 'При выполнении операции «Автоматическая расстановка вагонов» по вагонам нет изменений!',

            'mwsd_mess_ok_operation_manual': 'Операция «Ручная расстановка вагонов» выполнена, перенумерованно {0} (ваг.)',
            'mwsd_mess_error_operation_manual': 'При выполнении операции «Ручной расстановки вагонов» произошла ошибка, код ошибки: {0}',
            'mwsd_mess_0_operation_manual': 'При выполнении операции «Ручной расстановки вагонов» по вагонам нет изменений!',

            'mwsd_mess_ok_operation_reverce': 'Операция «Реверс вагонов» выполнена, перенумерованно {0} (ваг.)',
            'mwsd_mess_error_operation_reverce': 'При выполнении операции «Реверс вагонов» произошла ошибка, код ошибки: {0}',
            'mwsd_mess_0_operation_reverce': 'При выполнении операции «Реверс вагонов» по вагонам нет изменений!',

            'mwsd_mess_error_searsh_wagon': 'Ошибка поиска вагона в системе ИДС, введен неправильный номер {0}',
            'mwsd_mess_error_searsh_way': 'Ошибка определения пути в системе ИДС, id_way = {0}',
            'mwsd_mess_error_not_searsh_wagon': 'Ошибка, вагон № {0} – не найден!',
        }
    };

    // Определим глобальные переменные
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang)
    //App.User_Name = $('input#username').val();

    // Состояние загрузки
    var loading_status = {
        empty: 0,              //Порожний
        loaded_arr: 1,         //Груженый ПРИБ
        loaded_ip: 2,          //Груженый В/З
        dirty: 3,              //Грязный
        frozen: 4,             //Мерзлый
        tech_malfunction: 5,   //Тех.неисправность
        loaded_uz: 6,          //Груженый УЗ
        re_edging: 7,          //Перекантовка
        empty_clean: 8,        //Порожний чист
    }
    // Операции
    var operations = {
        unloading_uz: 13,
        unloading_if: 14,
        loading_uz: 15,
        loading_if: 16,
        cleaning: 17,
        /*        processing: 18,*/
    }

    App.wsd_setup = {
        control_way_devision: false, // TODO: загружать, контроль выхода пути на цех
        arrival_start_dt_min: -180,
        arrival_start_dt_max: 180,
        outgoing_start_dt_min: -180,
        outgoing_start_dt_max: 180,
        return_start_dt_min: -180,
        return_start_dt_max: 180,
        dislocation_start_dt_min: -180,
        dislocation_start_dt_max: 180,

        dissolution_start_dt_min: -180,
        dissolution_start_dt_max: 180,
        dissolution_period_min: 5,
        //dissolution_period_max: 1440,
        dissolution_stop_dt_min: -180,
        dissolution_stop_dt_max: 180,

        provide_start_dt_min: -180,
        provide_start_dt_max: 180,
        provide_dt_apply_min: -2880,
        provide_dt_apply_max: 180,

        sending_uz_start_dt_min: -180,
        sending_uz_start_dt_max: 180,

        load_start_dt_min: -1440,
        load_start_dt_max: 180,
        load_document_dt_min: -180,
        load_document_dt_max: 180,
        load_period_min: 5,
        //load_period_max: 1440,
        load_stop_dt_min: -180,
        load_stop_dt_max: 180,

        unload_start_dt_min: -1440,
        unload_start_dt_max: 180,
        unload_period_min: 5,
        //unload_period_max: 1440,
        unload_stop_dt_min: -180,
        unload_stop_dt_max: 180,

        cleaning_start_dt_min: -1440,
        cleaning_start_dt_max: 180,
        cleaning_period_min: 5,
        //cleaning_period_max: 1440,
        cleaning_stop_dt_min: -180,
        cleaning_stop_dt_max: 180,

        //processing_start_dt_min: -1440,
        //processing_start_dt_max: 180,
        //processing_period_min: 5,
        ////processing_period_max: 1440,
        //processing_stop_dt_min: -180,
        //processing_stop_dt_max: 180,

        operations: operations,
        loading_status: loading_status,
        list_empty_group: [11, 16, 20],
    }

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    //var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    //var api_wsd = new IDS_WSD({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

    var api_dir = new API_DIRECTORY({ url_api: App.Url_Api });
    var api_wsd = new IDS_WSD({ url_api: App.Url_Api });


    var MCF = App.modal_confirm_form;

    var TW = App.table_tree_way;
    var tw = new TW('DIV#tree-way');

    var TWS = App.table_ws;
    var ttb = new TWS('div#total-balance');
    var tws = new TWS('div#cars-way');
    var tos = new TWS('div#operators-station');
    var tows = new TWS('div#operators-way-station');
    var toss = new TWS('div#operators-send-station');
    var toas = new TWS('div#operators-arrival-station');

    var VOAC = App.view_op_arrival_cars;
    var voac = new VOAC('main.container-fluid');

    var VOOC = App.view_op_outgoing_cars;
    var vooc = new VOOC('main.container-fluid');

    var VORC = App.view_op_return_cars;
    var vorc = new VORC('main.container-fluid');

    var VODC = App.view_op_dissolution_cars;
    var vodc = new VODC('main.container-fluid');

    var VODLC = App.view_op_dislocation_cars;
    var vodlc = new VODLC('main.container-fluid');

    var VOPRC = App.view_op_provide_cars;
    var voprc = new VOPRC('main.container-fluid');

    var VOPSUZ = App.view_op_sending_uz;
    var vopsuz = new VOPSUZ('main.container-fluid');

    var VOPUNLC = App.view_op_unloading_cars;
    var vopunlc = new VOPUNLC('main.container-fluid');

    var VOPLC = App.view_op_loading_cars;
    var voplc = new VOPLC('main.container-fluid');

    var VOPCLC = App.view_op_cleaning_cars;
    var vopclc = new VOPCLC('main.container-fluid');

    var VOPUNC = App.view_op_update_note_cars;
    var vopunc = new VOPUNC('main.container-fluid');

    //var VOPPSC = App.view_op_processing_cars;
    //var voppsc = new VOPPSC('main.container-fluid');

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    var alert = App.alert_form;
    var main_alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var validation_form = App.validation_form;
    var validation = new validation_form();

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
    var current_id_station = null;
    var current_id_park = null;
    var current_id_way = null;
    var current_option_way = null;
    var current_num_wagon = null;
    var wagons = [];
    var calc_wagons = [];
    var balance = [];
    var operators = [];
    var operators_way = [];
    var operators_send = [];
    var operators_arrival = [];
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
        // загрузить данные 
        var load_wagons_of_way = function (id_way, num, callback) {
            if (id_way !== null && id_way >= 0) {
                wagons = [];
                calc_wagons = [];
                LockScreen(langView('mwsd_mess_load_wagons', App.Langs));
                var pr_load = 2;
                var out_load1 = function (pr_load) {
                    if (pr_load === 0) {
                        $.each(calc_wagons, function (i, el) {
                            if (el.error === 0) {
                                var wag = wagons.find(function (o) {
                                    return o.num === el.num;
                                }.bind(this));
                                if (wag) {
                                    wag.arrivalUsageFee = el.calcFeeAmount;
                                }
                            }
                        }.bind(this));
                        main_alert.clear_message();
                        if (typeof callback === 'function') {
                            callback(wagons);
                        }
                    }
                };
                // Загрузить вагоны на пути
                api_wsd.getViewWagonsOfIdWay(id_way, function (ws) {
                    wagons = ws;
                    pr_load--;
                    out_load1(pr_load);
                });
                // Расчитать плату за пользование
                api_wsd.getCalcUsageFeeCarsOfWay(id_way, function (calc_ws) {
                    calc_wagons = calc_ws;
                    pr_load--;
                    out_load1(pr_load);
                });

            } else {
                if (typeof callback === 'function') {
                    callback([]);
                }
            };
        };
        var load_total_balance = function (callback) {
            balance = [];
            LockScreen(langView('mwsd_mess_load_balance', App.Langs));
            api_wsd.getViewTotalBalance(function (balance) {
                balance = balance;
                if (typeof callback === 'function') {
                    callback(balance);
                }
            }.bind(this));
        };
        var load_operators_of_station = function (id_station, callback) {
            operators = []; operators_way = []; operators_send = []; operators_arrival = [];
            if (id_station !== null && id_station >= 0) {
                var pr_lo = 3;
                var out_pr_lo = function (pr_lo) {
                    if (pr_lo === 0) {
                        if (typeof callback === 'function') {
                            $.each(operators_way, function (i, el) {
                                var op = operators.find(function (o) { return o.idOperator === el.idOperator; }.bind(this));
                                if (!op) {
                                    operators.push({
                                        idOperator: el.idOperator,
                                        operatorAbbrRu: el.operatorAbbrRu,
                                        operatorAbbrEn: el.operatorAbbrEn,
                                        operatorColor: el.operatorColor,
                                        countOperators: el.countOperators
                                    });
                                } else {
                                    op.countOperators += el.countOperators;
                                }
                            }.bind(this));
                            callback(operators, operators_way, operators_send, operators_arrival);
                        }
                    }
                }.bind(this);
                LockScreen(langView('mwsd_mess_load_operators', App.Langs));
                api_wsd.getViewOperatorsOfStation(id_station, function (result) {
                    operators_way = result;
                    pr_lo--;
                    out_pr_lo(pr_lo);
                }.bind(this));
                api_wsd.getViewOperatorsSendOfIdStation(id_station, function (result) {
                    operators_send = result;
                    pr_lo--;
                    out_pr_lo(pr_lo);
                }.bind(this));
                api_wsd.getViewOperatorsArrivalOfIdStation(id_station, function (result) {
                    operators_arrival = result;
                    pr_lo--;
                    out_pr_lo(pr_lo);
                }.bind(this));
            } else {
                if (typeof callback === 'function') {
                    callback([], [], [], []);
                }
            };
        };
        // Обновить данные
        var refresh_tree_way = function (upd, callback) {

            if (upd > 0) {
                var out_refresh = function (pr_refresh) {
                    if (pr_refresh === 0) {
                        if (typeof callback === 'function') {
                            callback(balance);
                        }
                    }
                }.bind(this);

                var pr_refresh = upd === 1 ? 2 : 3;
                // Обновить дерево путей
                tw.update(function () {
                    pr_refresh--;
                    out_refresh(pr_refresh);
                });
                // Загрузить вагоны на пути
                load_wagons_of_way(current_id_way, current_num_wagon, function (wagons) {
                    tws.view(wagons)
                    pr_refresh--;
                    out_refresh(pr_refresh);
                });
                if (upd === 2) {
                    // Показать баланс
                    load_total_balance(function (balance) {
                        ttb.view(balance)
                        pr_refresh--;
                        out_refresh(pr_refresh);
                    });
                }
            }
        }
        //var bs_operation_detali = new bootstrap.Offcanvas($('#operation-detali'))

        // Окно для ввода номера вагона - поиск
        var $find_num_wagon = $('input#find-num-wagon').val('').on('keydown',
            function (event) {
                if (event.code == 'Enter') {
                    var num = $find_num_wagon.val();
                    searsh_wagon(num);
                }
            });
        // Найти вагон
        var $bt_find_wagon = $('button#find-wagon').on('click', function (e) {
            $bt_find_wagon.prop("disabled", true);
            var num = $find_num_wagon.val();
            searsh_wagon(num);
        });
        // Функция поиска вагона
        var searsh_wagon = function (num) {
            main_alert.clear_message();
            var view = false;
            if (!isNumeric(num)) {
                // Ошибка ввода
                main_alert.out_error_message(langView('mwsd_mess_error_searsh_wagon', App.Langs).format(num));
                $bt_find_wagon.prop("disabled", false);
                //LockScreenOff();
            } else {
                LockScreen(langView('mwsd_title_mess_find_wagon', App.Langs));
                api_wsd.getViewDislocationAMKRWagonOfNum(num, function (result) {
                    LockScreenOff();
                    if (result) {
                        if (result.status > 0 && result.status < 4) {
                            view = true;
                        }
                        mcf.open(
                            langView('mwsd_title_form_searsh', App.Langs),
                            result.info + (view ? " \nПоказать вагон?" : ""),
                            function () {
                                if (view) {
                                    var way = list_way.find(function (o) {
                                        return o.id === result.view_wagon_dislocation.idWay;
                                    });
                                    if (way) {
                                        LockScreen(langView('mwsd_title_form_apply_searsh_wagon', App.Langs));
                                        current_num_wagon = num;
                                        var id_station = way.idStation;
                                        var id_park = way.idPark;
                                        var id_way = way.id;
                                        tw.open_way(id_station, id_park, id_way);
                                        //tw.open_way(id_station, id_park, id_way, function () {

                                        //}.bind(this));
                                    } else {
                                        //main_alert.clear_message();
                                        main_alert.out_error_message(langView('mwsd_mess_error_searsh_way', App.Langs).format(result.view_wagon_dislocation.idWay));
                                        //LockScreenOff();
                                    }
                                    //result.status
                                    //main_alert.clear_message();
                                    $bt_find_wagon.prop("disabled", false);
                                    //LockScreenOff();
                                } else {
                                    $bt_find_wagon.prop("disabled", false);
                                    LockScreenOff();
                                }

                            }.bind(this),
                            function () {
                                //main_alert.clear_message();
                                $bt_find_wagon.prop("disabled", false);
                                LockScreenOff();
                            }.bind(this));
                    } else {
                        main_alert.out_error_message(langView('mwsd_mess_error_not_searsh_wagon', App.Langs).format(num));
                        $bt_find_wagon.prop("disabled", false);
                    }
                }.bind(this));
            };
        };

        var mcf = new MCF(); // Создадим экземпляр окно сообщений
        mcf.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'lg',
            bt_close_text: langView('mwsd_title_button_Cancel', App.Langs),
            bt_ok_text: langView('mwsd_title_button_Ok', App.Langs),
        });

        var mcf_mp = new MCF(); // Создадим экземпляр окно ручной расстановки
        mcf_mp.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'sm',
            modal_class: 'modal-dialog-scrollable',
            bt_close_text: langView('mwsd_title_button_Cancel', App.Langs),
            bt_ok_text: langView('mwsd_title_button_Ok', App.Langs),
            fn_click_ok: function (e) {
                e.preventDefault();
                var inp = $('form#manual-position').find('input');
                var psts = [];
                var valid = true;
                $.each(inp, function (i, el) {
                    var value = $(el).val();
                    var num = $(el).attr('data-num');
                    var id = $(el).attr('id');
                    $(el).removeClass('is-invalid');
                    if (!value || value == "0") {
                        $(el).addClass('is-invalid');
                        valid = false;
                    } else {
                        var pos = psts.find(function (o) { return o.position == value }.bind(this));
                        if (!pos) {
                            psts.push({ position: Number(value), num: Number(num), id_wim: Number(id), el: el });
                        } else {
                            $(el).addClass('is-invalid');
                            valid = false;
                        }
                    }
                }.bind(this));
                if (valid) {
                    psts = psts.sort(function (a, b) {
                        return Number(a.position) - Number(b.position)
                    });
                    $.each(psts, function (i, el) {
                        if (el.position !== (i + 1)) {
                            $(el.el).addClass('is-invalid');
                            valid = false;
                        }
                    }.bind(this))
                    if (valid) {
                        LockScreen(langView('mwsd_title_form_apply_operation_manual_position', App.Langs));
                        var operation = {
                            id_way: current_id_way,
                            positions: psts
                        };
                        api_wsd.postManualPosition(operation, function (result) {
                            // Проверим на ошибку выполнения запроса api
                            if (result === undefined || result === null) {
                                var mess = langView('mwsd_mess_error_api', App.Langs);
                                console.log('[main_wsd] [postManualPosition] :' + mess);
                                main_alert.clear_message();
                                main_alert.out_error_message(mess);
                                LockScreenOff();
                            } else {
                                if (result > 0) {
                                    refresh_tree_way(1, function () {
                                        main_alert.clear_message();
                                        main_alert.out_info_message(langView('mwsd_mess_ok_operation_manual', App.Langs).format(result));
                                        this.result = true;
                                        this.$modal_obj.modal('hide');
                                        LockScreenOff();
                                    }.bind(this));

                                } else {
                                    if (result < 0) {
                                        main_alert.clear_message();
                                        main_alert.out_error_message(langView('mwsd_mess_error_operation_manual', App.Langs).format(result));
                                    } else {
                                        main_alert.clear_message();
                                        main_alert.out_warning_message(langView('mwsd_mess_0_operation_manual', App.Langs));
                                    }
                                    LockScreenOff();
                                }
                            }
                        }.bind(this));
                        //mcf.open(
                        //    langView('mwsd_title_form_apply', App.Langs),
                        //    langView('mwsd_confirm_mess_apply_operation_manual', App.Langs).format(wagons.length),
                        //    function () {
                        //        LockScreen(langView('mwsd_title_form_apply_operation_manual_position', App.Langs));
                        //        var operation = {
                        //            id_way: current_id_way,
                        //            positions: psts
                        //        };
                        //        api_wsd.postManualPosition(operation, function (result) {
                        //            // Проверим на ошибку выполнения запроса api
                        //            if (result === undefined || result === null) {
                        //                var mess = langView('mwsd_mess_error_api', App.Langs);
                        //                console.log('[main_wsd] [postManualPosition] :' + mess);
                        //                main_alert.clear_message();
                        //                main_alert.out_error_message(mess);
                        //                LockScreenOff();
                        //            } else {
                        //                if (result > 0) {
                        //                    refresh_tree_way(1, function () {
                        //                        main_alert.clear_message();
                        //                        main_alert.out_info_message(langView('mwsd_mess_ok_operation_manual', App.Langs).format(result));
                        //                        this.result = true;
                        //                        this.$modal_obj.modal('hide');
                        //                        LockScreenOff();
                        //                    }.bind(this));

                        //                } else {
                        //                    if (result < 0) {
                        //                        main_alert.clear_message();
                        //                        main_alert.out_error_message(langView('mwsd_mess_error_operation_manual', App.Langs).format(result));
                        //                    } else {
                        //                        main_alert.clear_message();
                        //                        main_alert.out_warning_message(langView('mwsd_mess_0_operation_manual', App.Langs));
                        //                    }
                        //                    LockScreenOff();
                        //                }
                        //            }
                        //        }.bind(this));
                        //    }.bind(this),
                        //    function () {
                        //        main_alert.clear_message();
                        //        main_alert.out_warning_message(langView('mwsd_mess_cancel_operation_manual', App.Langs));
                        //    }.bind(this));
                    }
                }
            }
        });

        // Загрузим справочники
        load_db(['station', 'ways'], true, function (result) {
            var process = 19;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    // События окна операторы
                    $('#offcanvas-operator-detali').on('shown.bs.offcanvas', function (event) {
                        //$.fn.dataTable.tables({ visible: false, api: true }).columns.adjust();

                    }.bind(this));
                    // События акардиона окна операторы
                    $('#accordion-operators-of-station').on('shown.bs.collapse', function (event) {
                        $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust();
                        //switch (event.target.id) {
                        //    case 'view-operators-of-station': {
                        //        break;
                        //    };
                        //};
                    }.bind(this));

                    var pr_1 = 2;
                    var out_pr1 = function (pr_1) {
                        if (pr_1 === 0) {
                            LockScreenOff();
                        }
                    }.bind(this);

                    tw.view(list_station_visible, null, null, null, function () {
                        pr_1--;
                        out_pr1(pr_1);
                    });

                    load_total_balance(function (balance) {
                        ttb.view(balance)
                        pr_1--;
                        out_pr1(pr_1);
                    });
                }
            }.bind(this);

            api_wsd.getAdminInfo(function (info) {
                user_info = info;
                process--;
                //console.log('[main_wsd] [api_wsd] process ' + process);
                out_init(process);
            })

            // Кнопки основного меню (Внешние операции)
            $('#btn-external-operations').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'send-cars': {
                        vooc.view(current_id_way);
                        break;
                    };
                    case 'arrival-cars': {
                        voac.view(current_id_way);
                        break;
                    };
                    case 'return-cars': {
                        vorc.view(current_id_way);
                        break;
                    };
                };
            });
            // Кнопки основного меню (Внутрение операции)
            $('#btn-internal-operations').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'dissolution': {
                        vodc.view(current_id_way);
                        break;
                    };
                    case 'dislocation': {
                        vodlc.view(current_id_way);
                        break;
                    };
                    case 'unloading': {
                        if (App.wsd_setup.control_way_devision) {
                            if (current_option_way !== null && current_option_way["id-devision"] > 0) {
                                vopunlc.view(current_id_way);
                            } else {
                                main_alert.clear_message();
                                main_alert.out_warning_message(langView('mwsd_mess_war_not_way_devision', App.Langs));
                            }
                        } else {
                            vopunlc.view(current_id_way);
                        }
                        break;
                    };
                    case 'loading': {
                        if (App.wsd_setup.control_way_devision) {
                            if (current_option_way !== null && current_option_way["id-devision"] > 0) {
                                voplc.view(current_id_way);
                            } else {
                                main_alert.clear_message();
                                main_alert.out_warning_message(langView('mwsd_mess_war_not_way_devision', App.Langs));
                            }
                        } else {
                            voplc.view(current_id_way);
                        }
                        break;
                    };
                    case 'cleaning': {
                        vopclc.view(current_id_way);
                        break;
                    };
                    case 'processing': {
                        //voppsc.view(current_id_way);
                        break;
                    };
                };
            });
            // Кнопки основного меню (Отправка на УЗ)
            $('#btn-uz-operations').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'provide': {
                        if (current_option_way !== null && current_option_way["crossing-uz"] === 1) {
                            voprc.view(current_id_way);
                        } else {
                            main_alert.clear_message();
                            main_alert.out_warning_message(langView('mwsd_mess_war_not_way_provide', App.Langs));
                        }
                        break;
                    };
                    case 'sending_uz': {
                        if (current_option_way !== null && current_option_way["crossing-uz"] === 1) {
                            vopsuz.view(current_id_way);
                        } else {
                            main_alert.clear_message();
                            main_alert.out_warning_message(langView('mwsd_mess_war_not_way_provide', App.Langs));
                        }
                        break;
                    };
                };
            });
            // Кнопки основного меню (Маневры на пути)
            $('#btn-way-operation').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'auto-position': {
                        if (current_id_way) {
                            if (wagons && wagons.length > 0) {
                                mcf.open(
                                    langView('mwsd_title_form_apply', App.Langs),
                                    langView('mwsd_confirm_mess_apply_operation_auto', App.Langs).format(wagons.length),
                                    function () {
                                        LockScreen(langView('mwsd_title_form_apply_operation_auto', App.Langs));
                                        var operation = {
                                            id_way: current_id_way,
                                            position: 1,
                                            reverse: false
                                        };
                                        api_wsd.postAutoPosition(operation, function (result) {
                                            // Проверим на ошибку выполнения запроса api
                                            if (result === undefined || result === null) {
                                                var mess = langView('mwsd_mess_error_api', App.Langs);
                                                console.log('[main_wsd] [postAutoPosition] :' + mess);
                                                main_alert.clear_message();
                                                main_alert.out_error_message(mess);
                                                LockScreenOff();
                                            } else {
                                                if (result > 0) {
                                                    refresh_tree_way(1, function () {
                                                        main_alert.clear_message();
                                                        main_alert.out_info_message(langView('mwsd_mess_ok_operation_auto', App.Langs).format(result));
                                                        LockScreenOff();
                                                    }.bind(this));

                                                } else {
                                                    if (result < 0) {
                                                        main_alert.clear_message();
                                                        main_alert.out_error_message(langView('mwsd_mess_error_operation_auto', App.Langs).format(result));
                                                    } else {
                                                        main_alert.clear_message();
                                                        main_alert.out_warning_message(langView('mwsd_mess_0_operation_auto', App.Langs));
                                                    }
                                                    LockScreenOff();
                                                }
                                            }
                                        }.bind(this));
                                    }.bind(this),
                                    function () {
                                        main_alert.clear_message();
                                        main_alert.out_warning_message(langView('mwsd_mess_cancel_operation_auto', App.Langs));
                                    }.bind(this));
                            } else {
                                main_alert.clear_message();
                                main_alert.out_warning_message(langView('mwsd_mess_war_not_wagons_way', App.Langs).format(langView('mwsd_title_operation_auto', App.Langs)));
                            }
                        } else {
                            main_alert.clear_message();
                            main_alert.out_warning_message(langView('mwsd_mess_war_not_select_way', App.Langs).format(langView('mwsd_title_operation_auto', App.Langs)));
                        }
                        break;
                    };
                    case 'reverce-position': {
                        if (current_id_way) {
                            if (wagons && wagons.length > 0) {
                                mcf.open(
                                    langView('mwsd_title_form_apply', App.Langs),
                                    langView('mwsd_confirm_mess_apply_operation_reverce', App.Langs).format(wagons.length),
                                    function () {
                                        LockScreen(langView('mwsd_title_form_apply_operation_reverce', App.Langs));
                                        var operation = {
                                            id_way: current_id_way,
                                            position: 1,
                                            reverse: true
                                        };
                                        api_wsd.postAutoPosition(operation, function (result) {
                                            // Проверим на ошибку выполнения запроса api
                                            if (result === undefined || result === null) {
                                                var mess = langView('mwsd_mess_error_api', App.Langs);
                                                console.log('[main_wsd] [postAutoPosition] :' + mess);
                                                main_alert.clear_message();
                                                main_alert.out_error_message(mess);
                                                LockScreenOff();
                                            } else {
                                                if (result > 0) {
                                                    refresh_tree_way(1, function () {
                                                        main_alert.clear_message();
                                                        main_alert.out_info_message(langView('mwsd_mess_ok_operation_reverce', App.Langs).format(result));
                                                        LockScreenOff();
                                                    }.bind(this));

                                                } else {
                                                    if (result < 0) {
                                                        main_alert.clear_message();
                                                        main_alert.out_error_message(langView('mwsd_mess_error_operation_reverce', App.Langs).format(result));
                                                    } else {
                                                        main_alert.clear_message();
                                                        main_alert.out_warning_message(langView('mwsd_mess_0_operation_reverce', App.Langs));
                                                    }
                                                    LockScreenOff();
                                                }
                                            }
                                        }.bind(this));
                                    }.bind(this),
                                    function () {
                                        main_alert.clear_message();
                                        main_alert.out_warning_message(langView('mwsd_mess_cancel_operation_reverce', App.Langs));
                                    }.bind(this));
                            } else {
                                main_alert.clear_message();
                                main_alert.out_warning_message(langView('mwsd_mess_war_not_wagons_way', App.Langs).format(langView('mwsd_title_operation_reverce', App.Langs)));
                            }
                        } else {
                            main_alert.clear_message();
                            main_alert.out_warning_message(langView('mwsd_mess_war_not_select_way', App.Langs).format(langView('mwsd_title_operation_reverce', App.Langs)));
                        }
                        break;
                    };
                    case 'manual-position': {
                        main_alert.clear_message();
                        if (current_id_way) {
                            if (wagons && wagons.length > 0) {

                                wagons = wagons.sort(function (a, b) {
                                    return Number(a.position) - Number(b.position)
                                });
                                var $form = $('<form id="manual-position" class="row g-3 needs-validation" novalidate></form>')
                                var $table = $('<table class="table table-sm table-striped table-hover" style="width:auto;font-size:14px"></table>');
                                var $thead = $('<thead></thead>');
                                var $tr = $('<tr></tr>');
                                $tr.append('<th scope="col">№ предл.</th>');
                                $tr.append('<th scope="col">№ тек.</th>');
                                $tr.append('<th scope="col">№ вагона</th>');
                                $table.append($thead.append($tr));
                                var $tbody = $('<tbody class="table-group-divider"></tbody>');
                                for (var iw = 0; iw < wagons.length; iw++) {
                                    var $tr = $('<tr></tr>');
                                    $tr.append('<td><input type="number" id="' + wagons[iw].wimId + '" name="' + wagons[iw].wimId + '" data-num="' + wagons[iw].num + '" class="form-control form-control-sm" min="0" max="100" step="1" value="" required></td>'); //w-50 h-50
                                    $tr.append('<td>' + wagons[iw].position + '</td>');
                                    $tr.append('<td>' + wagons[iw].num + '</td>');
                                    $tbody.append($tr);
                                }
                                $table.append($tbody);
                                $form.append($table);
                                //
                                //$form.on("submit", function (event) {
                                //    var valid = false;
                                //    var inp = $('form#manual-position').find('input');
                                //    $(inp[0]).addClass('ban');
                                //    if (!valid) {
                                //        event.stopPropagation();
                                //    }
                                //});
                                mcf_mp.open(
                                    langView('mwsd_title_form_apply_manual_position', App.Langs),
                                    $form,
                                    //langView('mwsd_confirm_mess_apply_operation_reverce', App.Langs).format(wagons.length),
                                    function () {
                                        //$form.submit();

                                        //var inp = $('form#manual-position').find('input');
                                        //$(inp[0]).addClass('ban');
                                        //if (!valid) {
                                        //    event.stopPropagation();
                                        //}

                                        //LockScreen(langView('mwsd_title_form_apply_operation_manual_position', App.Langs));
                                    }.bind(this),
                                    function () {
                                        //main_alert.clear_message();
                                        main_alert.out_warning_message(langView('mwsd_mess_cancel_operation_manual', App.Langs));
                                    }.bind(this));
                            } else {
                                //main_alert.clear_message();
                                main_alert.out_warning_message(langView('mwsd_mess_war_not_wagons_way', App.Langs).format(langView('mwsd_title_operation_manual_position', App.Langs)));
                            }
                        } else {
                            //main_alert.clear_message();
                            main_alert.out_warning_message(langView('mwsd_mess_war_not_select_way', App.Langs).format(langView('mwsd_title_operation_manual_position', App.Langs)));
                        }
                        break;
                    };
                };
            });
            // Кнопки основного меню (Маневры на пути)
            $('#link-services').on('click', 'a', function (event) {
                switch (event.currentTarget.id) {
                    case 'update-note': {
                        vopunc.view(current_id_way);
                        break;
                    };
                };
            });
            list_station = api_dir.getAllStation();
            list_way = api_dir.getAllWays();
            // Настроим выбор станций
            var $el_dlg_select_station = $('#station-select')
            var $list_select_station = $el_dlg_select_station.find('.list-group');
            // получим из сокета какие станции отображать
            var list_station_visible = null;
            var select_station_tree = $.cookie("select_station_tree");
            if (select_station_tree) list_station_visible = $.parseJSON(select_station_tree);
            //-------------------------------------------------
            // Инициализация компонент выбора станций для отображения
            // Загрузим список станций
            $list_select_station.empty();
            //<label class="list-group-item">
            //    <input class="form-check-input me-1" type="checkbox" value="" checked="checked">
            //        First checkbox
            //</label>
            $.each(list_station.filter(function (i) {
                return !i.stationUz;
            }.bind(this)), function (key, el) {
                if (!el.delete) {
                    var checked = 'checked';
                    if (list_station_visible) {
                        var st_enable = list_station_visible.find(function (o) {
                            return o.id == el.id;
                        });
                        if (st_enable && !st_enable.checked) {
                            checked = null;
                        }
                    }
                    var label = new fe_ui.label({
                        class: 'list-group-item list-group-item-secondary p-0 px-2',
                        label: el.stationNameRu
                    });
                    var input = new fe_ui.input({
                        //id: el.id,
                        value: el.id,
                        checked: checked,
                        type: 'checkbox',
                        class: 'form-check-input me-1',
                        title: null,
                        placeholder: null,
                        required: null,
                        maxlength: null,
                        pattern: null,
                        readonly: false,
                        min: null,
                        max: null,
                        step: null,
                    });
                }
                $list_select_station.append(label.$html.prepend(input.$html));
            }.bind(this));
            // Выбрать или отменить выбор
            var CheckedStations = function (checked) {
                var cb_list = $('.list-group input[type="checkbox"]');
                $.each(cb_list, function (i, el) {
                    $(el).prop("checked", checked);
                });
            }
            // Обработка кнопок выбора списка станций
            $('#btn-station-select').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'select-all': {
                        CheckedStations(true);
                        break;
                    };
                    case 'deselect-all': {
                        var cb_list = $('.list-group input[type="checkbox"]');
                        CheckedStations(false);
                        break;
                    };
                    case 'save': {
                        var cb_list = $('.list-group input[type="checkbox"]');
                        var list = [];
                        $.each(cb_list, function (i, el) {
                            list.push({ id: el.value, checked: $(el).prop("checked") })
                        });
                        $.cookie("select_station_tree", JSON.stringify(list), { expires: 365 });
                        $('#dropdownListgroup').collapse('hide');
                        var select_station_tree = $.cookie("select_station_tree");
                        if (select_station_tree) list_station_visible = $.parseJSON(select_station_tree);
                        tw.view(list_station_visible, current_id_station, current_id_park, current_id_way);
                        break;
                    };
                    case 'close': {
                        $('#dropdownListgroup').collapse('hide');
                        break;
                    };
                };
            });
            // ---------------------------------------------------
            // Инициализация дерева путей
            tw.init({
                api_dir: api_dir,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [tw] process ' + process);
                    out_init(process);
                },
                fn_select_way: function (id_station, id_park, id_way, option) {
                    // Обработка выбранного пути
                    current_id_station = id_station;
                    current_id_park = id_park;
                    current_id_way = id_way;
                    current_option_way = option;
                    load_wagons_of_way(current_id_way, current_num_wagon, function (wagons) {
                        tws.view_of_tag(wagons, 'data-num', current_num_wagon);
                        LockScreenOff();
                    });
                }.bind(this),
                fn_select_station: function (id_station) {

                    $('#operator-detali-label').empty().append("Операторы по " + list_station.find(function (o) { return o.id == id_station }.bind(this))['stationName' + ucFirst(App.Lang)]);
                    load_operators_of_station(id_station, function (operators, operators_way, operators_send, operators_arrival) {
                        tos.view(operators);
                        tows.view(operators_way);
                        toss.view(operators_send);
                        toas.view(operators_arrival);
                        //$.fn.dataTable.tables({ visible: false, api: true }).columns.adjust();
                        LockScreenOff();
                    });
                }.bind(this),
            });
            // Обработка кнопок дерева путей
            $('#btn-tree-way').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'open-park': {
                        tw.open_tree(false);
                        break;
                    };
                    case 'open-way': {
                        tw.open_tree(true);
                        break;
                    };
                    case 'close-tree': {
                        tw.close_tree();
                        break;
                    };
                    case 'refresh-tree': {
                        refresh_tree_way(2, function () {
                            LockScreenOff();
                        }.bind(this));

                        break;
                    };
                };
            });
            //$('.btn-all').on('click', function (event) {
            //    switch (event.currentTarget.id) {

            //    };
            //});
            //-----------------------------------------------------
            // Инициализация модуля "Таблица вагоны на пути"
            /*var tws = new TWS('div#cars-way');*/
            tws.init({
                alert: null,
                class_table: 'table table-sm table-cars-way table-striped table-success',
                detali_table: false,
                type_report: 'cars_way',     //
                link_num: true,
                ids_wsd: null,
                setup_buttons: [
                    {
                        name: 'statement1',
                        action: function (e, dt, node, config) {
                            tws.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        name: 'statement2',
                        action: function (e, dt, node, config) {
                            tws.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [tws] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    //this.on_alert.clear_message();
                    //if (rowData && rowData.length > 0 && rowData[0].id_wim_arrival === null) {
                    //    e.preventDefault();
                    //    this.on_alert.out_warning_message(langView('vortc_mess_warning_wagon_existing_way', App.Langs).format(rowData[0].num));
                    //}
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'statement1') {
                        if (current_id_way !== null) {
                            window.open("../../../idsrw_ui/areas/print/print.html?report=ws_statement1&format=A4L&id=" + current_id_way, "Print");
                        }
                    }
                    if (name === 'statement2') {
                        if (current_id_way !== null) {
                            window.open("../../../idsrw_ui/areas/print/print.html?report=ws_statement2&format=A4L&id=" + current_id_way, "Print");
                        }
                    }
                }.bind(this),
                fn_enable_button: function (tb) {

                }.bind(this),
                //fn_action_view_detali: function (rows) {

                //},
                //fn_select_rows: function (rows) {

                //}.bind(this),
                //fn_select_link: function (link) {

                //}.bind(this),
            });
            //-----------------------------------------------------
            // Инициализация модуля "Таблица остаток"
            /*var ttb = new TWS('div#total-balance');*/
            ttb.init({
                alert: null,
                class_table: 'table table-sm table-hover table-total-balance',
                detali_table: false,
                type_report: 'total_balance',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [ttb] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
            });
            //-----------------------------------------------------
            // Инициализация модуля "Таблица операторы на станции"
            /*var tos = new TWS('div#operators-station');*/
            tos.init({
                alert: null,
                class_table: 'table table-sm table-hover table-total-balance',
                detali_table: false,
                type_report: 'operators_station',
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [tos] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
            });
            // Инициализация модуля "Таблица операторы по путям на станции"
            /*var tows = new TWS('div#operators-way-station');*/
            tows.init({
                alert: null,
                class_table: 'table table-sm table-hover table-total-balance',
                detali_table: false,
                type_report: 'operators_way_station',
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [tows] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (id) {
                    api_dir.getWaysOfId(id, function (way) {
                        if (way) {
                            tw.open_way(way.idStation, way.idPark, way.id);
                        }
                    }.bind(this))
                }.bind(this),
            });
            // Инициализация модуля "Таблица операторы отправленные со станции"
            /*var toss = new TWS('div#operators-send-station');*/
            toss.init({
                alert: null,
                class_table: 'table table-sm table-hover table-total-balance',
                detali_table: false,
                type_report: 'operators_send_station',
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [toss] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {

                }.bind(this),
            });
            // Инициализация модуля "Таблица операторы прибывающие на станцию"
            /*var toas = new TWS('div#operators-arrival-station');*/
            toas.init({
                alert: null,
                class_table: 'table table-sm table-hover table-total-balance',
                detali_table: false,
                type_report: 'operators_arrival_station',
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [toas] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows) {

                }.bind(this),
            });
            // Операции прием вагонов
            voac.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [voac] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(2, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции отправка вагонов
            vooc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vooc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(2, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции возврат вагонов
            vorc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vorc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(2, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции роспуска
            vodc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vodc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(2, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции дислокации
            vodlc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vodlc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(2, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции предъявления
            voprc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vodlc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(2, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции отправить
            vopsuz.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vopsuz] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(2, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции выгрузка
            vopunlc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vopunlc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(upd, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции погрузка
            voplc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [voplc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(upd, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции очистки
            vopclc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vopclc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(upd, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // сервис примечаний
            vopunc.init({
                alert: null,
                api_dir: null,
                api_wsd: null,
                fn_db_update: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[main_wsd] [vopunc] process ' + process);
                    out_init(process);
                },
                fn_close: function (upd) {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(upd, function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });
            // Операции обработки
            //voppsc.init({
            //    alert: null,
            //    api_dir: null,
            //    api_wsd: null,
            //    fn_db_update: null,
            //    fn_init: function () {
            //        // На проверку окончания инициализации
            //        process--;
            //        //console.log('[main_wsd] [vopclc] process ' + process);
            //        out_init(process);
            //    },
            //    fn_close: function (upd) {
            //        // На обновления дерева путей, баланса ....
            //        refresh_tree_way(upd, function () {
            //            LockScreenOff();
            //        }.bind(this));
            //    }
            //});
        }.bind(this));
    });

})(jQuery); // End of use strict