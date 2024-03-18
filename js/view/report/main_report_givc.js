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

    var sel_rows = 30;
    var cur_type = '-1';
    var cur_Id = -1;
    var curr_data = [];

    // Выборка результата запроса
    var getRequests = function (data) {
        var result = [];
        if (data !== null && data.resultRequests !== null) {
            if (data.resultRequests !== 'error_toking') {
                var res = JSON.parse(data.resultRequests);
                if (res.disl_vag != null) {
                    result = res.disl_vag;
                }
            } else {
                validation.out_warning_message('При выполнении запроса, произошла ошибка - ' + data.resultRequests)
            }

        }
        return result;
    };


    $(document).ready(function ($) {

        // Загрузим справочники
        load_db(['cargo', 'cargo_group', 'cargo_etsng'], true, function (result) {
            //
            list_cargo = api_dir.getAllCargo();
            list_cargo_group = api_dir.getAllCargoGroup();
            list_cargo_etsng = api_dir.getAllCargoETSNG();

            // Отобразить экран с информацией
            var view_report = function (type, id) {
                curr_data = [];
                var list_approaches = [];
                switch (type) {
                    case 'req1892': {
                        if (id > 0) {
                            LockScreen(langView('mess_load_data', App.Langs));
                            api_givc.getRequestOfId(id, function (data) {
                                curr_data = getRequests(data);
                                table_table_req1892.view(curr_data);

                                $.each(curr_data, function (key, el) {
                                    if (el.esr_nazn === "467004" || el.esr_nazn === "467201") {
                                        var ap = list_approaches.find(function (o) {
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
                                            list_approaches.push({
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
                                                loading_stations : null
                                            });
                                        } else {
                                            ap.kol_vag += el.kol_vag ? Number(el.kol_vag) : 0;
                                            ap.date_pogr_min = el.date_pogr ? (moment(el.date_pogr, format_datetime_ru).isBefore(ap.date_pogr_min, format_datetime) ? moment(el.date_pogr, "DD.MM.YYYY HH:mm:ss").format(format_datetime) : ap.date_pogr_min) : ap.date_pogr_min;
                                            ap.date_pogr_max = el.date_pogr ? (moment(el.date_pogr, format_datetime_ru).isAfter(ap.date_pogr_max, format_datetime) ? moment(el.date_pogr, "DD.MM.YYYY HH:mm:ss").format(format_datetime) : ap.date_pogr_max) : ap.date_pogr_max;
                                        }
                                    }
                                }.bind(this));
                                table_table_req1892_formed_routes.view(list_approaches);
                                LockScreenOff();
                            }.bind(this));
                        } else {
                            table_table_req1892.view(curr_data);
                            table_table_req1892_formed_routes.view(list_approaches);
                            LockScreenOff();
                        }
                        break;
                    }
                }
            }

            var el_select_type_requests = new fe_ui.init_select($("#type-requests"), {
                data: list_type_requests,
                default_value: -1,
                fn_change: async function (e) {
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
            var el_select_last_requests = new fe_ui.init_select($("#last-requests"), {
                data: last_requests,
                default_value: -1,
                fn_change: function (e) {
                    cur_Id = Number($(e.currentTarget).val());
                    view_report(cur_type, cur_Id);
                }.bind(this),
                check: function (value) {

                }.bind(this)
            });

            var process = 2;

            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    this.report_panel = 0;
                    $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (event) {
                        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
                        switch (event.target.id) {
                            case 'nav-generated-routes-tab': {
                                this.report_panel = 0;
                                break;
                            };
                            case 'nav-total-cargo-tab': {
                                this.report_panel = 1;
                                break;
                            };
                            case 'nav-givc-tab': {
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