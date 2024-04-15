jQuery(document).ready(function ($) {

    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mwsd_mess_load_wagons': 'Загружаю перечень вагонов на выбранном пути...',
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
    App.User_Name = $('input#username').val();

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    var api_wsd = new IDS_WSD({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

    var TW = App.table_tree_way;
    var tw = new TW('DIV#tree-way');

    var TCW = App.table_cars_way;

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
    var balance = [];
    $(document).ready(function ($) {

        // загрузить данные 
        var load_wagons_of_way = function (id_way, num, callback) {
            if (id_way !== null && id_way >= 0) {
                wagons = [];
                LockScreen(langView('mwsd_mess_load_wagons', App.Langs));
                api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                    wagons = wagons;
                    if (typeof callback === 'function') {
                        callback(wagons);
                    }
                }.bind(this));
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

        // Загрузим справочники
        load_db(['station'], true, function (result) {
            var process = 3;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {

                    var out_pr1 = function (pr_1) {
                        if (pr_1 === 0) {
                            LockScreenOff();
                        }
                    }.bind(this);

                    var pr_1 = 2;

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
            //
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
                $list_select_station.append(label.$label.prepend(input.$input));
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
                        tcw.view(wagons)
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

                        var out_refresh = function (pr_refresh) {
                            if (pr_refresh === 0) {
                                LockScreenOff();
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
                        break;
                    };
                };
            });
            //-----------------------------------------------------
            // Инициализация модуля "Таблица вагоны на пути
            var tcw = new TCW('div#cars-way');
            tcw.init({
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
            });
            //-----------------------------------------------------
            // Инициализация модуля "Таблица вагоны на пути
            var ttb = new TCW('div#total-balance');
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
            });
        }.bind(this))
            ;
    });

}); // End of use strict