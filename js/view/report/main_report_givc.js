(function ($) {
    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;

    var format_date = "YYYY-MM-DD";
    var format_time = "HH:mm:ss";
    var format_datetime = "YYYY-MM-DD HH:mm:ss";
    var format_datetime_ru = "DD.MM.YYYY HH:mm:ss";

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
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang)
    App.User_Name = $('input#username').val();

    var API_GIVC = App.api_givc;
    var API_DIRECTORY = App.ids_directory;
    var TTDR = App.table_report;
    var api_givc = new API_GIVC({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

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
    var list_type_requests = [
        {
            'value': 'req1892',
            'text': 'Дислокація вагонів (справка 1892)',
        },
        {
            'value': 'req0002',
            'text': 'Натурный лист поезда (справка 0002)',
        },
        {
            'value': 'req8858',
            'text': 'Дислокация вагона (справка 8858)',
        },
        {
            'value': 'req8692',
            'text': 'Оперативное сальдо (справка 8692)',
        },
        {
            'value': 'regDisvag',
            'text': 'Дислокация вагонов c грузом (справка Disvag)',
        }
    ];
    var last_requests = [];
    var list_cargo = [];
    var list_cargo_group = [];
    var list_cargo_etsng = [];
    var list_genus_wagon = [];
    var list_operators_wagons = [];
    var list_owners_wagons = [];
    //var list_wagons = [];

    var sel_rows = 30;
    var cur_type = '-1';
    var cur_Id = -1;
    var curr_data = [];

    // Выборка результата запроса
    var getRequests = function (data, type) {
        var result = [];

        switch (type) {
            case 'req1892': {
                if (data !== null && data.resultRequests !== null) {
                    if (data.resultRequests !== 'error_toking') {
                        var res = JSON.parse(data.resultRequests);
                        if (res.disl_vag != null) {
                            result = res.disl_vag;
                        }
                    } else {
                        validation.out_warning_message('При выполнении запроса, произошла ошибка - ' + data.resultRequests)
                    }

                };
                break;
            }
            case 'req0002': {
                if (data !== null && data.resultRequests !== null) {
                    if (data.resultRequests !== 'error_toking') {
                        var res = JSON.parse(data.resultRequests);
                        if (res.info_fraza != null) {
                            result = res.info_fraza;
                        }
                    } else {
                        validation.out_warning_message('При выполнении запроса, произошла ошибка - ' + data.resultRequests)
                    }

                }
                break;
            };
        }
        return result;
    };


    $(document).ready(function ($) {

        // Загрузим справочники
        load_db(['cargo', 'cargo_group', 'cargo_etsng', 'genus_wagon', 'operators_wagons', 'owners_wagons'], true, function (result) {
            //
            list_cargo = api_dir.getAllCargo();
            list_cargo_group = api_dir.getAllCargoGroup();
            list_cargo_etsng = api_dir.getAllCargoETSNG();
            list_genus_wagon = api_dir.getAllGenusWagons();
            list_operators_wagons = api_dir.getAllOperatorsWagons();
            list_owners_wagons = api_dir.getAllOwnersWagons();
            //list_wagons = api_dir.getAllWagons();

            // Вернуть сформированый отчет "Сформированные маршруты"
            var get_req1892_formed_route = function (data, callback) {
                var result_list = [];
                $.each(data, function (key, el) {
                    if (el.esr_nazn === "467004" || el.esr_nazn === "467201") {
                        var ap = result_list.find(function (o) {
                            return o.esr_nazn === el.esr_nazn
                                && o.nom_sost === el.nom_sost
                                && o.esr_form === el.esr_form
                                && o.gruz_etsng === el.gruz.etsng
                        }.bind(this));
                        if (!ap) {
                            var cargo_group_name = null;
                            var cargo_etsng = list_cargo_etsng.find(function (o) {
                                return o.code === Number(el.gruz.etsng);
                            }.bind(this));
                            if (cargo_etsng) {
                                var cargo = list_cargo.find(function (o) {
                                    return o.idCargoEtsng === cargo_etsng.id;
                                }.bind(this));
                                if (cargo) {
                                    var cargo_group = list_cargo_group.find(function (o) {
                                        return o.id === cargo.idGroup;
                                    }.bind(this));
                                    cargo_group_name = cargo_group ? cargo_group['cargoGroupName' + ucFirst(App.Lang)] : null;
                                }
                            };
                            result_list.push({
                                esr_nazn: el.esr_nazn,
                                nom_sost: el.nom_sost,
                                esr_form: el.esr_form,
                                gruz_etsng: el.gruz.etsng,
                                cargo_group_name: cargo_group_name,
                                kol_vag: el.kol_vag,
                                mnkua_opv: el.mnkua_opv,
                                stan_railway_detali: el.stan.n_rpus + ' ' + el.n_dorus,
                                date_op: el.date_op ? moment(el.date_op, format_datetime_ru).format(format_datetime) : null,
                                st_otpr_n_rpus: el.st_otpr.n_rpus,
                                date_pogr_min: el.date_pogr ? moment(el.date_pogr, format_datetime_ru).format(format_datetime) : null,
                                date_pogr_max: el.date_pogr ? moment(el.date_pogr, format_datetime_ru).format(format_datetime) : null,
                                loading_stations: null
                            });
                        } else {
                            ap.kol_vag += el.kol_vag ? Number(el.kol_vag) : 0;
                            ap.date_pogr_min = el.date_pogr ? (moment(el.date_pogr, format_datetime_ru).isBefore(ap.date_pogr_min, format_datetime) ? moment(el.date_pogr, "DD.MM.YYYY HH:mm:ss").format(format_datetime) : ap.date_pogr_min) : ap.date_pogr_min;
                            ap.date_pogr_max = el.date_pogr ? (moment(el.date_pogr, format_datetime_ru).isAfter(ap.date_pogr_max, format_datetime) ? moment(el.date_pogr, "DD.MM.YYYY HH:mm:ss").format(format_datetime) : ap.date_pogr_max) : ap.date_pogr_max;
                        }
                    }
                }.bind(this));
                if (typeof callback === 'function') {
                    callback(result_list);
                }
            };
            // Вернуть сформированый отчет "Общий грузопоток"
            var get_req1892_total_cargo = function (data, callback) {
                var result_list = [];
                $.each(data, function (key, el) {
                    var ap = result_list.find(function (o) {
                        return o.gruz_etsng === el.gruz.etsng &&
                            o.st_otpr_n_rpus === el.st_otpr.n_rpus &&
                            o.st_disl_n_rpus === el.stan.n_rpus
                    }.bind(this));
                    if (!ap) {
                        result_list.push({
                            gruz_etsng: el.gruz.etsng,
                            gruz_nvs: el.gruz.nvs,
                            st_otpr_n_rpus: el.st_otpr.n_rpus,
                            kol_vag: el.kol_vag,
                            kol_vag_dor: el.kol_vag,
                            n_dorus: el.n_dorus,
                            st_disl_n_rpus: el.stan.n_rpus // - станция дислокации берем из станции соверш операции
                        });
                    } else {
                        ap.kol_vag += el.kol_vag ? Number(el.kol_vag) : 0;
                    }
                }.bind(this));
                if (typeof callback === 'function') {
                    callback(result_list);
                }
            };
            // Вернуть сформированый отчет "Общий грузопоток"
            var get_req0002_train = function (data, callback) {
                var result_list = [];
                var result_total = [];
                var count_row = 0;
                // Выход из циклов
                var out_row = function (count_row) {
                    if (count_row === 0) {
                        //- total
                        $.each(result_list, function (key, el) {
                            var tw = result_total.find(function (o) {
                                return o.etsng === el.etsng && o.id_operator_amkr === el.OperatorsWagonsAMKR.id;
                            }.bind(this));
                            if (!tw) {
                                result_total.push({
                                    etsng: el.etsng,
                                    Cargo: el.Cargo,
                                    id_operator_amkr: el.OperatorsWagonsAMKR.id,
                                    OperatorsWagonsAMKR: el.OperatorsWagonsAMKR,
                                    kol_vag: 1,
                                });
                            } else {
                                tw.kol_vag++;
                            }
                        }.bind(this));
                        if (typeof callback === 'function') {
                            callback(result_list, result_total);
                        }
                    }
                }.bind(this);
                // Собрать информацию по вагону
                var get_wagon_info = function (el, callback) {
                    //var res = {};
                    api_dir.getWagonsOfNum(el.nom_vag, function (wag) {
                        el.Wagon = wag;
                        var count_req = 1;
                        var out_req = function (count_req) {
                            if (count_req === 0) {
                                if (typeof callback === 'function') {
                                    callback();
                                }
                            }
                        }.bind(this);
                        // Получим род вагона
                        el.GenusWagon = api_dir.getGenusWagons_Of_ID(wag.idGenus);
                        // Получим владельца вагона
                        el.OwnersWagon = api_dir.getOwnersWagons_Of_ID(wag.idOwner);
                        // Получим оператора вагона по уз
                        el.OperatorsWagonsUZ = api_dir.getOperatorsWagons_Of_ID(wag.idOperator);
                        // Получим аренды вагонов
                        api_dir.getWagonsRentOfNum(el.nom_vag, function (rent) {
                            var last_rent = rent.find(function (o) { return o.rentEnd === null }.bind(this));
                            if (last_rent) {
                                // Получим оператора вагона по амкр
                                el.OperatorsWagonsAMKR = api_dir.getOperatorsWagons_Of_ID(last_rent.idOperator);
                                count_req--;
                                out_req(count_req);
                            } else {
                                el.OperatorsWagonsAMKR = null;
                                count_req--;
                                out_req(count_req);
                            }
                        }.bind(this));
                    }.bind(this));
                }.bind(this);
                // Перебрать вагоны
                $.each(data, function (key, el) {
                    count_row++;
                    get_wagon_info(el, function (res) {
                        count_row--;
                        out_row(count_row);
                    }.bind(this));
                    el.CargoETSNG = api_dir.getCargoETSNG_Of_Name('code', el.etsng);
                    if (el.CargoETSNG) {
                        el.Cargo = api_dir.getCargo_Of_IDETSNG(el.CargoETSNG.id);
                    } else {
                        el.Cargo = null;
                    }
                    result_list.push(el);
                }.bind(this));
            };
            // Отобразить экран с информацией
            var view_report = function (type, id) {
                curr_data = [];
                var list_approaches = [];
                var list_total_cargo = [];
                var list_wagon = [];
                var list_wagon_total = [];
                switch (type) {
                    case 'req1892': {
                        $el_card_1892.show();
                        $el_card_0002.hide();
                        if (id > 0) {
                            LockScreen(langView('mess_load_data', App.Langs));
                            api_givc.getRequestOfId(id, function (data) {
                                curr_data = getRequests(data, type);
                                table_table_req1892.view(curr_data);
                                //
                                get_req1892_formed_route(curr_data, function (result_list) {
                                    list_approaches = result_list;
                                    table_table_req1892_formed_routes.view(list_approaches);
                                    LockScreenOff();
                                }.bind(this));
                                //
                                get_req1892_total_cargo(curr_data, function (result_list) {
                                    list_total_cargo = result_list;
                                    table_table_req1892_total_cargo.view(list_total_cargo);
                                    LockScreenOff();
                                }.bind(this));

                            }.bind(this));
                        } else {
                            table_table_req1892.view(curr_data);
                            table_table_req1892_formed_routes.view(list_approaches);
                            table_table_req1892_total_cargo.view(list_total_cargo);
                            LockScreenOff();
                        }
                        break;
                    }
                    case 'req0002': {
                        $el_card_1892.hide();
                        $el_card_0002.show();
                        if (id > 0) {
                            LockScreen(langView('mess_load_data', App.Langs));
                            api_givc.getRequestOfId(id, function (data) {
                                curr_data = getRequests(data, type);
                                table_table_req0002.view(curr_data);
                                //
                                get_req0002_train(curr_data, function (result_list, result_total) {
                                    list_wagon = result_list;
                                    list_wagon_total = result_total;
                                    table_table_req0002_train.view(list_wagon);
                                    table_table_req0002_result.view(list_wagon_total);
                                    LockScreenOff();
                                }.bind(this));
                                //
                            }.bind(this));
                        } else {
                            table_table_req0002.view(curr_data);
                            table_table_req0002_train.view(list_wagon);
                            table_table_req0002_result.view(list_wagon_total);
                            LockScreenOff();
                        }
                        break;
                    }
                    default: {
                        $el_card_1892.hide();
                        $el_card_0002.hide();
                        break;
                    }
                }
            }

            var el_select_type_requests = new fe_ui.init_select($('#type-requests'), {
                data: list_type_requests,
                default_value: -1,
                fn_change: async function (e) {
                    bsCollapse_reguest.hide();
                    cur_type = $(e.currentTarget).val();
                    last_requests = [];
                    cur_Id = -1;
                    if (cur_type !== '-1') {
                        LockScreen(langView('mess_delay', App.Langs));
                        api_givc.getRequestOfTypeRequests(cur_type, sel_rows, function (data) {
                            $.each(data, function (i, el) {
                                if (cur_Id === -1) {
                                    cur_Id = Number(el.id);
                                }
                                last_requests.push({
                                    'value': el.id,
                                    'text': moment(el.dtRequests).format(format_datetime),
                                    'disabled': false,
                                });

                            }.bind(this));
                            el_select_last_requests.update(last_requests, cur_Id);
                            view_report(cur_type, cur_Id);
                            LockScreenOff();
                        }.bind(this));
                    } else {
                        el_select_last_requests.update(last_requests, cur_Id);
                        view_report(cur_type, cur_Id);
                    }
                }.bind(this),
                check: function (value) {

                }.bind(this)
            });
            var el_select_last_requests = new fe_ui.init_select($('#last-requests'), {
                data: last_requests,
                default_value: -1,
                fn_change: function (e) {
                    bsCollapse_reguest.hide();
                    cur_Id = Number($(e.currentTarget).val());
                    view_report(cur_type, cur_Id);
                }.bind(this),
                check: function (value) {

                }.bind(this)
            });
            // Закладка "Выполнить запрос"
            var bsCollapse_reguest = new bootstrap.Collapse($('#collapse-reguest'), {
                toggle: false
            })
            var $el_card_1892 = $('#card-1892');
            var $el_card_0002 = $('#card-0002');

            var process = 6;

            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    this.report_panel = 0;
                    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (event) {
                        $.fn.dataTable.tables({ visible: false, api: true }).columns.adjust();
                        switch (event.target.id) {
                            case 'nav-req1892-generated-routes-tab': {
                                this.report_panel = 0;
                                break;
                            };
                            case 'nav-req1892-total-cargo-tab': {
                                this.report_panel = 1;
                                break;
                            };
                            case 'nav-req1892-givc-tab': {
                                this.report_panel = 2;
                                break;
                            };
                        };
                    }.bind(this));
                    LockScreenOff();
                }
            }.bind(this);

            // Инициализация модуля "Таблица req1892-ГИВЦ"
            var table_table_req1892 = new TTDR('div#req1892');               // Создадим экземпляр
            table_table_req1892.init({
                alert: null,
                detali_table: false,
                type_report: 'req1892',     //
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
            // Инициализация модуля "Таблица req1892-Сформированные маршруты"
            var table_table_req1892_formed_routes = new TTDR('div#req1892-formed-routes');               // Создадим экземпляр
            table_table_req1892_formed_routes.init({
                alert: null,
                detali_table: false,
                type_report: 'req1892_formed_routes',     //
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
            // Инициализация модуля "Таблица req1892-Общий грузопоток"
            var table_table_req1892_total_cargo = new TTDR('div#req1892-total-cargo');               // Создадим экземпляр
            table_table_req1892_total_cargo.init({
                alert: null,
                detali_table: false,
                type_report: 'req1892_total_cargo',     //
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
            // Инициализация модуля "Таблица req0002-ГИВЦ"
            var table_table_req0002 = new TTDR('div#req0002');               // Создадим экземпляр
            table_table_req0002.init({
                alert: null,
                detali_table: false,
                type_report: 'req0002',     //
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
            // Инициализация модуля "Таблица req0002-Поезд"
            var table_table_req0002_train = new TTDR('div#req0002-train');               // Создадим экземпляр
            table_table_req0002_train.init({
                alert: null,
                detali_table: false,
                type_report: 'req0002_train',     //
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
            // Инициализация модуля "Таблица req0002-ИТОГ"
            var table_table_req0002_result = new TTDR('div#req0002-result');               // Создадим экземпляр
            table_table_req0002_result.init({
                alert: null,
                detali_table: false,
                type_report: 'req0002_result',     //
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
            // Инициализация формы 
            var $form = $('#fm-reguest-givc');
            var $el_kod_stan_beg = $('#kod_stan_beg');
            var $el_kod_stan_end = $('#kod_stan_end');
            var $el_kod_grp_beg = $('#kod_grp_beg');
            var $el_kod_grp_end = $('#kod_grp_end');
            //var $el_date_beg = $('#date_beg');
            //var $el_date_end = $('#date_end');
            var allFields = $([])
                .add($el_kod_stan_beg)
                .add($el_kod_stan_end)
                .add($el_kod_grp_beg)
                .add($el_kod_grp_end);
            //.add($el_date_beg)
            //.add($el_date_end);

            validation.init({
                alert: main_alert,
                elements: allFields,
            });
            validation.clear_all();
            //$el_date_beg.val(moment().subtract(60, 'days').format('DD.MM.YYYY'));
            //$el_date_end.val(moment().add(1, 'days').format('DD.MM.YYYY'));
            //$el_date_beg.val('21.01.2024');
            //$el_date_end.val('22.01.2024');

            $form.submit(function (event) {
                event.preventDefault();
                event.stopPropagation();
                //validation.check_control_datetime_input($el_date_beg, "Ошибка", "Ок", false);
                // Выполним запрос
                LockScreen(langView('mess_load_data', App.Langs));
                curr_data = [];
                var parameters = {
                    type_requests: 'req1892',
                    kod_stan_beg: Number($el_kod_stan_beg.val()),
                    kod_stan_end: Number($el_kod_stan_end.val()),
                    kod_grp_beg: Number($el_kod_grp_beg.val()),
                    kod_grp_end: Number($el_kod_grp_end.val()),
                    nom_vag: null,
                    date_beg: null,
                    date_end: null,
                    esr_form: 0,
                    nom_sost: 0,
                    esr_nazn: 0,
                    kod_stan_form: 0,
                    kod_gro: 0,
                    kod_stan_nazn: 0,
                    kod_grp: 0,
                    kod_gruz: 0
                };
                api_givc.postGIVC(parameters, function (data) {
                    if (data && data.resultRequests) {
                        validation.out_info_message('Запрос выполнен, получено ' + data.countLine + ' строк');
                        var res = JSON.parse(data.resultRequests);
                        if (res.disl_vag != null) {
                            curr_data = res.disl_vag;
                        }
                        table_table_req1892.view(curr_data);
                        LockScreenOff();
                    } else {
                        var message = 'Ошибка!'
                        if (data.message) {
                            message = data.message;
                        }
                        table_table_req1892.view(curr_data);
                        validation.out_error_message(message);
                    }
                    LockScreenOff();
                }.bind(this));
            });

            //var list = api_dir.getCargo(function (f) {

            //}.bind(this));
            //var list = api_dir.getAllCargo();
            //var list1 = api_dir.getListCargo('id', 'cargoNameRu');
            //var list2 = api_dir.getListCargo('id', 'cargoName', 'Ru');
            //var list2_1 = api_dir.getListValueTextCargo();
            //var list3 = api_dir.getCargo_Of_Name('cargoNameRu', 'Порошок магнезитовый');
            //var res = api_dir.getCargo_Of_ID(1);
            //var res1 = api_dir.getCargo_Of_IDETSNG(1);

            //var list = api_dir.getAllCargoGroup();
            //var list1 = api_dir.getListCargoGroup('id', 'cargoGroupNameRu');
            //var list2 = api_dir.getListCargoGroup('id', 'cargoGroupName', 'Ru');
            //var list2_1 = api_dir.getListValueTextCargoGroup();
            //var list3 = api_dir.getCargoGroup_Of_Name('cargoGroupNameRu', 'УГОЛЬ');
            //var res = api_dir.getCargoGroup_Of_ID(1);

            //var list = api_dir.getAllCargoETSNG();
            //var list1 = api_dir.getListCargoETSNG('id', 'cargoEtsngNameRu');
            //var list2 = api_dir.getListCargoETSNG('id', 'cargoEtsngName', 'Ru');
            //var list2_1 = api_dir.getListValueTextCargoETSNG();
            //var list3 = api_dir.getCargoETSNG_Of_Name('cargoEtsngNameRu', 'Антрацит');
            //var res = api_dir.getCargoETSNG_Of_ID(1);

            LockScreenOff();
        }.bind(this));
    });
})(jQuery); // End of use strict