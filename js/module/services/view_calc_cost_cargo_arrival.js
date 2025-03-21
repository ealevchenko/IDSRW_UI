﻿/* ===============================================
-= Модуль общая библиотека "ГРУПЫ ВАГОНОВ" =-
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

            'vs_cccsa_title_label_period': 'Выборка за:',
            'vs_cccsa_text_label_period': 'Выборка за указанный период',
            'vs_cccsa_title_time_period_start': 'С даты',
            'vs_cccsa_text_time_period_start': 'Выборка с указаной даты',
            'vs_cccsa_title_placeholder_time_period_start': 'Время начала',
            'vs_cccsa_title_button_new_period': 'Применить',

            'vs_cccsa_title_label_num_epd': 'Найти накладную:',
            'vs_cccsa_title_placeholder_num_epd': 'Найти накладную',
            'vs_cccsa_text_label_num_epd': 'Выберите накладную ...',

            'vs_cccsa_title_label_payer': 'Платильщик:',
            'vs_cccsa_title_placeholder_payer': 'Платильщик',
            'vs_cccsa_text_label_payer': 'Выберите платильщика ...',

            'vs_cccsa_title_button_num_epd': 'Найти накладную ...',
            'vs_cccsa_title_button_payer': 'Обновить платильщика ...',

            'vs_cccsa_title_period_1': 'ЖД сутки',
            'vs_cccsa_title_period_2': 'Календарные сутки',
            'vs_cccsa_title_period_3': 'От начала месяца',


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

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var TWS = App.table_ws;

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
            fn_init: null,                          // Окончание инициализации
            fn_db_update: null,                     // Выполнить обновление баз данных если были изменения
            fn_close: null,                         // ? пока неработает
        }, options);
        //
        // Создадим ссылку на модуль работы с базой данных
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });

        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;

        this.list_epd = [];
        this.type = 1;

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
                var process = 2;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        // На проверку окончания инициализации
                        //----------------------------------
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
                // сформируем периоды { value: , text: , disabled: false }
                this.list_period = [];
                this.list_period.push({ value: 1, text: langView('vs_cccsa_title_period_1', App.Langs), disabled: false });
                this.list_period.push({ value: 2, text: langView('vs_cccsa_title_period_2', App.Langs), disabled: false });
                this.list_period.push({ value: 3, text: langView('vs_cccsa_title_period_3', App.Langs), disabled: false });
                // Создадим форму (this.cost_calculation_setup)- по умолчанию
                this.form_select_period = new FD();
                // Создать макет панели
                var objs_period = [];
                var bt_new_period = {
                    obj: 'bs_button',
                    options: {
                        id: 'new-period',
                        name: 'new-period',
                        class: 'col-auto',
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_cccsa_title_button_new_period', App.Langs),
                        icon_fa_left: 'fa-solid fa-arrows-rotate',//<i class="fa-solid fa-arrows-rotate"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            //event.preventDefault();
                            this.form_select_period.submit(event);
                        }.bind(this),
                    }
                };
                var form_select_period = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'select_period',
                        id: 'id_period',
                        name: 'id_period',
                        label: langView('vs_cccsa_title_label_period', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: true,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: this.list_period,
                            default: this.type,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                var id = Number($(e.currentTarget).val());
                                if (id !== this.type) {
                                    this.type = id;

                                }
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        form_inline: true,
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        //col_prefix: null,
                        //col_size: 'auto',
                        col_class: null,
                        //form_text: langView('vs_cccsa_text_label_period', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datetime_time_period_start = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'select_period',
                        id: 'time_period_start',
                        name: 'time_period_start',
                        label: langView('vs_cccsa_title_time_period_start', App.Langs),
                        element_type: 'date',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_cccsa_title_placeholder_time_period_start', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: null,
                        element_max: null,
                        element_step: null,
                        element_options: {
                            default: moment(),
                            format: 'date',
                            out_format: 'moment',
                            fn_change: function (e, dt) {
                            }.bind(this),
                        },
                        form_inline: true,
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        //col_prefix: null,
                        //col_size: 'auto',
                        col_class: null,
                        //form_text: langView('vs_cccsa_text_time_period_start', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                objs_period.push(form_select_period);
                objs_period.push(form_input_datetime_time_period_start);
                objs_period.push(bt_new_period);
                this.form_select_period.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_period,
                    id: null,
                    form_class: 'row gy-2 gx-3 align-items-center',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {

                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        this.div_form_period.$html.append(this.form_select_period.$form);
                        //this.form_select_period.el.select_id_period.val(this.type); // выставим отчет по умолчанию
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
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
                        fn_click: null,
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
                        //this.form_select_period.el.select_id_period.val(this.type); // выставим отчет по умолчанию
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
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
    view_calc_cost_cargo_arrival.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        /*        this.view_com.open();*/
        LockScreen(langView('vs_cccsa_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.from_way_alert.clear_message();
        this.group_wagons_alert.clear_message();
        this.form_group_wagons_setup.clear_all();
        this.form_from_setup.clear_all();
        this.form_searsh_wagon.el.textarea_vagon_searsh.val('');
        this.wagons = [];
        this.wagons_group = [];
        // Сбросим вагоны переноса
        this.id_station_from = -1;
        var id_station = -1;
        this.id_way_from = -1;

        //if (id_way > 0) {
        //    var way = this.view_com.api_dir.getWays_Of_Id(id_way);
        //    if (way) {
        //        id_station = way.idStation;
        //        // Отобразим выбор на панеле
        //        this.form_from_setup.el.select_id_station_from.val(id_station);
        //    }
        //};
        // Дополнительная обработка в панели выбранной операции
        if (typeof this.settings.fn_view_open === 'function') {
            this.settings.fn_view_open.call(this, function () {
            }.bind(this));
        };
        this.update(id_station, id_way, function (wagons) {
            LockScreenOff();
        }.bind(this));
    }
    // Обновить все
    view_calc_cost_cargo_arrival.prototype.update = function (id_station, id_way_from, callback) {
        // Обновим состояние станции
        //this.update_station(id_station, id_way_from, function (wagons) {
        //    this.view_wagons();
        if (typeof callback === 'function') {
            callback(wagons);
        }
        /*        }.bind(this));*/
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