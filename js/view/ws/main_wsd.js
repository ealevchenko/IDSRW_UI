(function ($) {

    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mwsd_mess_load_wagons': 'Загружаю перечень вагонов на выбранном пути...',
            'mwsd_mess_load_operators': 'Загружаю перечень операторов на станции...',
            'mwsd_mess_load_balance': 'Загружаю остаток...',
        },
        'en':  //default language: English
        {
            //'title_select': 'Выберите...',
        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang)
    //App.User_Name = $('input#username').val();

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    var api_wsd = new IDS_WSD({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

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
    //var userAgent = navigator.userAgent.toLowerCase();
    //var user = window.userID;
    ////var userInfo = window.ShowpadLib.getUserInfo();
    //var request = new XMLHttpRequest();
    //request.withCredentials = true;
    //request.open("GET", "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API/Admin/user_info");


    $(function () {
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

                        if (typeof callback === 'function') {
                            callback(wagons);
                        }
                    }
                };

                api_wsd.getViewWagonsOfIdWay(id_way, function (ws) {
                    wagons = ws;
                    pr_load--;
                    out_load1(pr_load);
                });

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
        var refresh_tree_way = function (callback) {
            var out_refresh = function (pr_refresh) {
                if (pr_refresh === 0) {
                    if (typeof callback === 'function') {
                        callback(balance);
                    }
                }
            }.bind(this);

            var pr_refresh = 2;

            tw.update(function () {
                pr_refresh--;
                out_refresh(pr_refresh);
            });

            load_total_balance(function (balance) {
                ttb.view(balance)
                pr_refresh--;
                out_refresh(pr_refresh);
            });
        }
        //var bs_operation_detali = new bootstrap.Offcanvas($('#operation-detali'))

        // Загрузим справочники
        load_db(['station'], true, function (result) {
            var process = 9;
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
                out_init(process);
            })


            // Кнопки основного меню
            $('#btn-external-operations').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'send-cars': {
                        //bs_operation_detali.show();
                        break;
                    };
                    case 'arrival-cars': {
                        voac.view(current_id_way);
                        break;
                    };
                    case 'return-cars': {
                        //bs_operation_detali.show();
                        break;
                    };
                };
            });

            list_station = api_dir.getAllStation();
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
                    out_init(process);
                },
                fn_select_way: function (id_station, id_park, id_way, option) {
                    // Обработка выбраного пути
                    current_id_station = id_station;
                    current_id_park = id_park;
                    current_id_way = id_way;
                    current_option_way = option;
                    load_wagons_of_way(current_id_way, current_num_wagon, function (wagons) {
                        tws.view(wagons)
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
                        refresh_tree_way(function () {
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
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
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
                    out_init(process);
                },
                fn_close: function () {
                    // На обновления дерева путей, баланса ....
                    refresh_tree_way(function () {
                        LockScreenOff();
                    }.bind(this));
                }
            });



        }.bind(this));
    });

})(jQuery); // End of use strict