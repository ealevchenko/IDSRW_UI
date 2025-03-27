/* ===============================================
-= Модуль сервис расчет стоимости перевозки по прибытию =-
  + js/view/shared/common.js
==================================================*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;


    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vs_cccsa_card_header_group_wagons': 'Расчет стоимости перевозки груза по прибытию',
            'vs_cccsa_card_header_cost_calculation': 'РАСЧЕТ СТОИМОСТИ',
            'vs_cccsa_card_header_register_accepted_wagons': 'РАСЧЕТ ПРИНЯТЫХ ВАГОНОВ',
            'vs_cccsa_mess_init_module': 'Инициализация модуля view_calc_cost_cargo_arrival',
            'vs_cccsa_mess_load_operation': 'Загружаю форму операции',

            //'vs_cccsa_title_label_period': 'Выборка за:',
            //'vs_cccsa_text_label_period': 'Выборка за указанный период',
            //'vs_cccsa_title_time_period_start': 'С даты',
            //'vs_cccsa_text_time_period_start': 'Выборка с указаной даты',
            //'vs_cccsa_title_placeholder_time_period_start': 'Время начала',
            //'vs_cccsa_title_button_new_period': 'Применить',

            'vs_cccsa_title_label_num_epd': 'Найти накладную:',
            'vs_cccsa_title_placeholder_num_epd': 'Найти накладную',
            'vs_cccsa_text_label_num_epd': 'Выберите накладную ...',

            'vs_cccsa_title_label_payer': 'Платильщик:',
            'vs_cccsa_title_placeholder_payer': 'Платильщик',
            'vs_cccsa_text_label_payer': 'Выберите платильщика ...',

            'vs_cccsa_title_button_num_epd': 'Найти накладную ...',
            'vs_cccsa_title_button_payer': 'Обновить платильщика ...',

            //'vs_cccsa_title_period_1': 'ЖД сутки',
            //'vs_cccsa_title_period_2': 'Календарные сутки',
            //'vs_cccsa_title_period_3': 'От начала месяца',

            'vs_cccsa_load_main_docs': 'Загружаю документы за период...',
            'vs_cccsa_load_docs': 'Загружаю информацию по накладной {0}...',

            'vs_cccsa_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            'vs_cccsa_mess_info_add_main_docs': 'За период c {0} по {1}, загружено {2} наклодных',

            'vs_cccsa_mess_war_not_select_docs': 'Не выбран номер накладной для отображения информации!',

        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var MCF = App.modal_confirm_form;

    var ALERT = App.alert_form;
    var FD = App.form_dialog;

    var VFSP = App.view_form_select_period; // форма выбора периода

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var IDS_ARRIVAL = App.ids_arrival;
    ;
    var TSRV = App.table_services;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_calc_cost_cargo_arrival(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$main = $(selector);
        if (this.$main.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fe_ui = new FE();
    }
    //------------------------------- ИНИЦИАЛИЗАЦИЯ И ОТОБРАЖЕНИЕ ----------------------------------
    // Инициализация
    view_calc_cost_cargo_arrival.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_calc_cost_cargo_arrival');
        LockScreen(langView('vs_cccsa_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,                          // сылки на библиотеки api dir
            api_wsd: null,                          // сылки на библиотеки api wsd
            ids_arrival: null,                      // сылки на библиотеки api arrival
            fn_init: null,                          // Окончание инициализации
            fn_db_update: null,                     // Выполнить обновление баз данных если были изменения
            fn_close: null,                         // ? пока неработает
        }, options);
        //
        // Создадим ссылку на модуль работы с базой данных
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });
        this.ids_arrival = this.settings.ids_arrival ? this.settings.ids_arrival : new IDS_ARRIVAL({ url_api: App.Url_Api });

        this.list_epd = [];
        this.id_doc = null;
        //this.ArrivalUzDocument = null;
        this.ArrivalUzVagon = null;

        // Главный Alert
        this.alert = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        //this.view_com.$op.append(this.alert.$html);
        this.main_alert = new ALERT(this.alert.$html);
        // Создать макет панели (Область группа вагонов)
        this.card_services = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 mt-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_cccsa_card_header_group_wagons', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.fe_ui.bs_row({});
        this.div_form_period = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 12,
        }); // Окно настроек
        row.$html.append(this.div_form_period.$html)
        this.card_services.body.$html.append(row.$html);

        // Создать макет панели (Расчет стоимости)
        this.cost_calculation = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_cccsa_card_header_cost_calculation', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.fe_ui.bs_row({});
        this.cost_calculation_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.cost_calculation_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_cost_calculation = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.cost_calculation_table.$html.append(this.alert_cost_calculation.$html);
        this.cost_calculation_alert = new ALERT(this.alert_cost_calculation.$html);
        row.$html.append(this.cost_calculation_setup.$html).append(this.cost_calculation_table.$html);
        this.cost_calculation.body.$html.append(row.$html);

        //------------------------------------------------------
        // Создать макет панели (Реестр принятых вагонов)
        this.register_accepted_wagons = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_cccsa_card_header_register_accepted_wagons', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.fe_ui.bs_row({});
        this.register_accepted_wagons_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.register_accepted_wagons_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_register_accepted_wagons = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.register_accepted_wagons_table.$html.append(this.alert_register_accepted_wagons.$html);
        this.register_accepted_wagons_alert = new ALERT(this.alert_register_accepted_wagons.$html);
        row.$html.append(this.register_accepted_wagons_setup.$html).append(this.register_accepted_wagons_table.$html);
        this.register_accepted_wagons.body.$html.append(row.$html);
        //------------------------------------------------------

        this.$main.append(this.card_services.$html.append(this.cost_calculation.$html).append(this.register_accepted_wagons.$html));
        // Инициализация вначале 
        if (typeof this.settings.fn_start_init === 'function') {
            this.settings.fn_start_init.call(this);
        }
        // Определим количество загрузок
        var pr_load = 1;
        // Выход из загрузок
        var out_load = function (process) {
            if (pr_load === 0) {
                //==============================================================
                // Инициализация после загрузки библиотек
                var process = 4;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_calc_cost_cargo_arrival');
                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия 
                this.payer_arrival = this.api_dir.getAllPayerArrival();

                this.list_payer_arrival = this.api_dir.getListValueTextPayerArrival();

                this.form_select_period = new VFSP(this.div_form_period.$html);
                this.form_select_period.init({
                    alert: null,
                    fn_init: function (init) {
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),                                              // Окончание инициализации
                    apply_text: langView('vs_cccsa_load_main_docs', App.Langs), //
                    fn_apply_select: function (type, start, stop) {
                        if (type && start && stop) {
                            //
                            this.update(start, stop, this.id_doc, function () {

                            }.bind(this));
                        }

                    }.bind(this),                                      // Применить выборку
                })

                //Создадим таблицы( this.tab_cost_calculation)
                var row_cost_calculation = new this.fe_ui.bs_row({ id: 'services-table-cost-calculation', class: 'pt-2' });
                this.cost_calculation_table.$html.append(row_cost_calculation.$html);

                this.tab_cost_calculation = new TSRV('div#services-table-cost-calculation');
                this.tab_cost_calculation.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'cost_calculation',
                    setup_buttons: [
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                    }.bind(this),
                    fn_select_rows: function (rows, type) {

                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {

                    }.bind(this),
                    fn_enable_button: function (tb) {
                    }.bind(this),
                });

                this.form_register_accepted_wagons_setup = new FD();
                // Создать макет панели
                var objs_raw_setup = [];

                var bt_searsh_epd = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_cccsa_title_button_num_epd', App.Langs),
                        icon_fa_left: 'fa-solid fa-magnifying-glass',//<i class="fa-solid fa-magnifying-glass"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.register_accepted_wagons_alert.clear_message();
                            var id = this.form_register_accepted_wagons_setup.el.datalist_num_epd.val();
                            if (id) {
                                this.update_document(id, function (vagon) {
                                    LockScreenOff();
                                }.bind(this));
                            } else {
                                this.register_accepted_wagons_alert.out_warning_message(langView('vs_cccsa_mess_war_not_select_docs', App.Langs));
                            }

                        }.bind(this),
                    }
                };
                var form_input_datalist_num_epd = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'common_raw_setup',
                        id: 'num_epd',
                        name: 'num_epd',
                        label: langView('vs_cccsa_title_label_num_epd', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_cccsa_title_placeholder_num_epd', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_epd,
                            out_value: false,
                            out_group: true,
                            default: null,
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {

                            }.bind(this),
                            fn_select: function (event, set, options) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0',
                        group_append_class: null,
                        group_append_id: null,
                        group_append_html: null,
                        group_append_objs: [bt_searsh_epd],
                        form_text: langView('vs_cccsa_text_label_num_epd', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var bt_searsh_apply = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_cccsa_title_button_payer', App.Langs),
                        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: null,
                    }
                };
                var form_input_datalist_payer = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'common_raw_setup',
                        id: 'payer',
                        name: 'payer',
                        label: langView('vs_cccsa_title_label_payer', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_cccsa_title_placeholder_payer', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_payer_arrival,
                            out_value: true,
                            out_group: false,
                            default: null,
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {

                            }.bind(this),
                            fn_select: function (event, set, options) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0',
                        group_append_class: null,
                        group_append_id: null,
                        group_append_html: null,
                        group_append_objs: [bt_searsh_apply],
                        form_text: langView('vs_cccsa_text_label_payer', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var col_alert = {
                    obj: 'bs_col',
                    options: {
                        id: 'col-alert-info',
                        pref: 'md',
                        size: 12,
                        class: 'text-left',
                        style: null,
                    },
                    childs: []
                };
                var alert_info = {
                    obj: 'bs_alert',
                    options: {
                        id: 'alert-info',
                        class: null,
                        style: null,
                        color: 'primary',
                        bt_close: true,
                        fn_click_close: null,
                    },
                    childs: []
                };

                col_alert.childs.push(alert_info);
                objs_raw_setup.push(col_alert);
                objs_raw_setup.push(form_input_datalist_num_epd);
                objs_raw_setup.push(form_input_datalist_payer);
                this.form_register_accepted_wagons_setup.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_raw_setup,
                    id: null,
                    form_class: 'row g-3',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        this.register_accepted_wagons_setup.$html.append(this.form_register_accepted_wagons_setup.$form);
                        var alsert_info = $('div#alert-info');
                        this.register_accepted_wagons_alert_info = new ALERT(alsert_info);
                        this.register_accepted_wagons_alert_info.out_info_message(langView('vs_cccsa_mess_info_init', App.Langs));
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( this.tab_register_accepted_wagons)
                var row_register_accepted_wagons = new this.fe_ui.bs_row({ id: 'table-register-accepted-wagons', class: 'pt-2' });
                this.register_accepted_wagons_table.$html.append(row_register_accepted_wagons.$html);

                this.tab_register_accepted_wagons = new TSRV('div#table-register-accepted-wagons');
                this.tab_register_accepted_wagons.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'register_accepted_wagons',
                    setup_buttons: [
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                    }.bind(this),
                    fn_select_rows: function (rows, type) {

                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {

                    }.bind(this),
                    fn_enable_button: function (tb) {
                    }.bind(this),
                });

            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = ['payer_arrival'];
        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_calc_cost_cargo_arrival] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    //
    //view_calc_cost_cargo_arrival.prototype.view = function (id_way) {
    //    // Если указана станция выполним коррекцию по станции
    //    /*        this.view_com.open();*/
    //    LockScreen(langView('vs_cccsa_mess_load_operation', App.Langs));
    //    // Очистить сообщения и форму
    //    this.from_way_alert.clear_message();
    //    this.group_wagons_alert.clear_message();
    //    this.form_group_wagons_setup.clear_all();
    //    this.form_from_setup.clear_all();
    //    this.form_searsh_wagon.el.textarea_vagon_searsh.val('');
    //    this.wagons = [];
    //    this.wagons_group = [];
    //    // Сбросим вагоны переноса
    //    this.id_station_from = -1;
    //    var id_station = -1;
    //    this.id_way_from = -1;

    //    //if (id_way > 0) {
    //    //    var way = this.view_com.api_dir.getWays_Of_Id(id_way);
    //    //    if (way) {
    //    //        id_station = way.idStation;
    //    //        // Отобразим выбор на панеле
    //    //        this.form_from_setup.el.select_id_station_from.val(id_station);
    //    //    }
    //    //};
    //    // Дополнительная обработка в панели выбранной операции
    //    if (typeof this.settings.fn_view_open === 'function') {
    //        this.settings.fn_view_open.call(this, function () {
    //        }.bind(this));
    //    };
    //    this.update(id_station, id_way, function (wagons) {
    //        LockScreenOff();
    //    }.bind(this));
    //}
    // Обновить все
    view_calc_cost_cargo_arrival.prototype.update = function (start, stop, id_doc, callback) {
        // Обновим
        var sel_start = moment(start).format("YYYY-MM-DDTHH:mm");
        var sel_stop = moment(stop).format("YYYY-MM-DDTHH:mm");
        this.ids_arrival.getListMainDocArrivalUzDocument(sel_start, sel_stop, function (list) {
            this.list_epd = [];
            if (list !== null && list.length > 0) {

                $.each(list, function (i, el) {
                    if (el.nomMainDoc > 0) {
                        this.list_epd.push({ value: el.id, text: el.nomMainDoc, group: (el.calcPayer !== null ? moment(el.calcPayer).format("YYYY-MM-DDTHH:mm") : "без расчета") });
                    }
                }.bind(this));
                var exist_id = this.list_epd.find(function (o) {
                    return o.value === id_doc;
                }.bind(this));
                if (!exist_id) {
                    this.id_doc = null;
                } else {
                    this.id_doc = id_doc;
                }
                this.form_register_accepted_wagons_setup.el.datalist_num_epd.update(this.list_epd, this.id_doc);
                if (this.id_doc) {
                    this.update_document(this.id_doc, function (document) {
                        LockScreenOff();
                    }.bind(this));
                }
            }
            this.register_accepted_wagons_alert_info.clear_message();
            this.register_accepted_wagons_alert_info.out_info_message(langView('vs_cccsa_mess_info_add_main_docs', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.list_epd.length));
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Загрузить вагоны на выбраном пути прибытия в масив this.wagons (подготовить поля для вагонов приема)
    view_calc_cost_cargo_arrival.prototype.load_of_id_doc = function (id_doc, callback) {
        if (id_doc !== null && id_doc >= 0) {
            this.id_doc = id_doc;
            LockScreen(langView('vs_cccsa_load_docs', App.Langs).format(this.form_register_accepted_wagons_setup.el.datalist_num_epd.text()));

            var pr_1 = 2;
            var out_pr1 = function (pr_1) {
                if (pr_1 === 0) {
                    // Событие обновили данные
                    LockScreenOff();
                    if (typeof callback === 'function') {
                        callback(this.ArrivalUzDocument, this.ArrivalUzVagon);
                    }
                }
            }.bind(this);
            //
            this.ids_arrival.getArrivalUzDocument(id_doc, function (ArrivalUzDocument) {
                this.ArrivalUzDocument = ArrivalUzDocument;
                pr_1--;
                out_pr1(pr_1);
            }.bind(this));
            //
            this.ids_arrival.getArrivalUzVagonOfIdDocument(id_doc, function (ArrivalUzVagon) {
                this.ArrivalUzVagon = ArrivalUzVagon;
                pr_1--;
                out_pr1(pr_1);
            }.bind(this));
        } else {
            this.id_doc = null;
            this.ArrivalUzDocument = null;
            this.ArrivalUzVagon = null;
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.ArrivalUzDocument, this.ArrivalUzVagon);
            }
        }
    };

    view_calc_cost_cargo_arrival.prototype.update_document = function (id_doc, callback) {
        if (id_doc) {
            this.load_of_id_doc(id_doc, function (document, vagons) {
                if (document !== null && document) {
                    var vagons = document.arrivalUzVagons;
                    var vagons_data = [];
                    var document_data = [];
                    var summ_vesg = 0;
                    var summ_arrivalUzVagonPays = 0;
                    $.each(vagons, function (i, el) {
                        // Тариф ПРИБ
                        var arrivalUzVagonPays = 0;
                        if (el.arrivalUzVagonPays && el.arrivalUzVagonPays.length > 0) {
                            $.each(el.arrivalUzVagonPays, function (i, el) {
                                arrivalUzVagonPays += (el.summa ? Number(el.summa) : 0);
                            }.bind(this));
                        }
                        summ_arrivalUzVagonPays += arrivalUzVagonPays;
                        summ_vesg += el.vesg ? Number(el.vesg) : 0;
                        //
                        vagons_data.push({
                            id: el.id,
                            nomMainDoc: document.nomMainDoc,
                            num: el.num,
                            dateOtpr: document.dateOtpr,
                            dateAdoption: el.idArrivalNavigation.dateAdoption,
                            nameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                            nameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
                            arrivalCargoName: el.idCargoNavigation['cargoName' + ucFirst(App.Lang)],
                            arrivalOperatorAbbr: el.idWagonsRentArrivalNavigation.idOperatorNavigation['abbr' + ucFirst(App.Lang)],
                            toDivisionAbbr: el.idDivisionOnAmkrNavigation['divisionAbbr' + ucFirst(App.Lang)],
                            payerSenderCode: document.codePayerSenderNavigation ? document.codePayerSenderNavigation.code : null,
                            payerSenderName: document.codePayerSenderNavigation ? document.codePayerSenderNavigation['payerName' + ucFirst(App.Lang)] : null,
                            payerArrivalCode: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation.code : null,
                            payerArrivalName: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation['payerName' + ucFirst(App.Lang)] : null,
                            payerLocalCode: document.codePayerLocalNavigation ? document.codePayerLocalNavigation.code : null,
                            payerLocalName: document.codePayerLocalNavigation ? document.codePayerLocalNavigation['payerName' + ucFirst(App.Lang)] : null,
                            vesg: el.vesg,
                            arrivalUzVagonPays: arrivalUzVagonPays,
                        });
                    }.bind(this));
                    //
                    document_data.push({
                        id: document.id,
                        nomMainDoc: document.nomMainDoc,
                        countVagon: vagons.length,
                        nameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                        nameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
                        arrivalCargoName: vagons_data[0].arrivalCargoName,
                        vesg: summ_vesg,
                        tariffContract: document.tariffContract,
                        payerLocalCode: document.codePayerLocalNavigation ? document.codePayerLocalNavigation.code : null,
                        payerLocalName: document.codePayerLocalNavigation ? document.codePayerLocalNavigation['payerName' + ucFirst(App.Lang)] : null,
                        arrivalOperatorAbbr: vagons_data[0].arrivalOperatorAbbr,
                        toDivisionAbbr: vagons_data[0].toDivisionAbbr,
                        payerSenderCode: document.codePayerSenderNavigation ? document.codePayerSenderNavigation.code : null,
                        payerSenderName: document.codePayerSenderNavigation ? document.codePayerSenderNavigation['payerName' + ucFirst(App.Lang)] : null,
                        payerArrivalCode: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation.code : null,
                        payerArrivalName: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation['payerName' + ucFirst(App.Lang)] : null,
                        dateOtpr: document.dateOtpr,
                        arrivalUzVagonPays: summ_arrivalUzVagonPays,
                        deffTariff: document.tariffContract !== null && summ_arrivalUzVagonPays !== null ? document.tariffContract - summ_arrivalUzVagonPays : 0,
                        calcPayer: document.calcPayer,
                        calcPayerUser: document.calcPayerUser
                    });
                    this.tab_cost_calculation.view(document_data);
                    this.tab_register_accepted_wagons.view(vagons_data);
                } else {
                    this.tab_cost_calculation.view([]);
                    this.tab_register_accepted_wagons.view([]);
                }
                //if (vagons !== null && vagons.length > 0) {
                //    this.tab_register_accepted_wagons.view(vagons);
                //} else {
                //    this.tab_register_accepted_wagons.view([]);
                //}
                LockScreenOff();
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(document);
                }
            }.bind(this));
        }
    };

    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_calc_cost_cargo_arrival.prototype.validation = function (result, mode) {
        if (typeof this.settings.fn_validation === 'function') {
            return this.settings.fn_validation.call(this, result, mode);
        }
    }

    view_calc_cost_cargo_arrival.prototype.apply_update_wagons = function (data) {
        LockScreen(langView('vs_cccsa_mess_run_operation_update_wagon_group', App.Langs).format(langView('vs_cccsa_title_operation_type_group_' + this.type_group, App.Langs)));
        if (typeof this.settings.fn_apply_update_wagons === 'function') {
            this.settings.fn_apply_update_wagons.call(this, data, function (result) {
                // Проверим на ошибку выполнения запроса api
                if (result && result.status) {
                    var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                    console.log('[view_calc_cost_cargo_arrival] [apply_update_wagons] :' + mess);
                    this.main_alert.out_error_message(mess);
                    //this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                    if (result.errors) {
                        for (var err in result.errors) {
                            this.main_alert.out_error_message(err + ":" + result.errors[err]);
                            //this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                            console.log('[view_calc_cost_cargo_arrival] [apply_update_wagons] :' + err + ":" + result.errors[err]);
                        }
                    }
                    LockScreenOff();
                } else {
                    this.apply_update(result, langView('vs_cccsa_mess_ok_operation_update_wagon_group', App.Langs).format(langView('vs_cccsa_title_operation_type_group_' + this.type_group, App.Langs), result.count));
                }
            }.bind(this));
        }
    };

    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    view_calc_cost_cargo_arrival.prototype.apply_update = function (result, mess_ok, mess_err) {
        this.settings.view_com.update_wsd = 1;
        if (typeof this.settings.fn_apply_update === 'function') {
            this.settings.fn_apply_update.call(this, result, mess_ok, mess_err);
        } else {
            // По умолчанию
            if (result && result.result > 0) {
                var cars = this.form_searsh_wagon.el.textarea_vagon_searsh.val();
                this.load_of_nums(cars, function () {
                    this.update(this.id_station_from, this.id_way_from, function (wagons) {
                        this.main_alert.out_info_message(mess_ok);
                        if (typeof this.settings.fn_db_update === 'function') {
                            //TODO: можно добавить возвращать перечень для обновления
                            typeof this.settings.fn_db_update();
                        }
                        LockScreenOff();
                    }.bind(this));
                }.bind(this));
            } else {
                LockScreenOff();
                this.main_alert.out_error_message(langView('vs_cccsa_mess_error_operation_run_wagon_group', App.Langs).format(result ? result.result : -1));
                // Выведем ошибки по вагонно.
                if (result && result.listResult) {
                    $.each(result.listResult, function (i, el) {
                        if (el.result <= 0)
                            this.main_alert.out_error_message(langView('vs_cccsa_mess_error_operation_wagon_run', App.Langs).format(el.num, el.result));
                    }.bind(this));
                }
            }
        }
    }
    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_calc_cost_cargo_arrival.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_calc_cost_cargo_arrival.prototype.clear_all = function () {

    }

    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_calc_cost_cargo_arrival.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_calc_cost_cargo_arrival = view_calc_cost_cargo_arrival;

    window.App = App;
})(window);