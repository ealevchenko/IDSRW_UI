/* ===============================================
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
            'vopcgr_card_header_group_wagons': 'ВЫБРАННЫЕ ВАГОНЫ',
            'vopcgr_card_header_from_way': 'ВАГОНЫ НА ПУТИ',
            'vopcgr_mess_init_module': 'Инициализация модуля view_op_common_group',
            'vopcgr_mess_load_operation': 'Загружаю форму операции',

            'vopcgr_title_label_station_from': 'Станция',
            'vopcgr_text_label_station_from': 'Выберите станцию',
            'vopcgr_title_label_way_from': 'Путь',
            'vopcgr_text_label_way_from': 'Выберите путь',

            'vopcgr_title_button_vagon_clear': 'Очистить',
            'vopcgr_title_button_vagon_searsh': 'Поиск',

            'vopcgr_title_label_system_number': 'Системная нумерация',
            'vopcgr_title_placeholder_vagon_searsh': 'Список вагонов',
            'vopcgr_text_append_vagon_searsh': 'Добавить список вагонов',
            'vopcgr_text_vagon_searsh': 'Введите номер вагона или несколько вагонов, разделитель номеров ";"',

            'vopcgr_mess_load_wagons': 'Загружю вагоны на пути...',

            'vopcgr_mess_warning_wagon_ban_group_way': 'Вагон {0} уже выбран.',
            'vopcgr_mess_warning_wagon_ban_wagon_out': 'Вагон {0} не находится на АМКР.',

            'vopcgr_mess_not_select_wagons_from': 'Вагоны не выбраны!',
            'vopcgr_mess_all_select_wagons_exist': 'Все выбранные вагоны уже перенесены',

            'vopcgr_mess_add_group': 'Переношу вагоны...',
            'vopcgr_mess_clear_group': 'Убираю выбранные вагоны...',

            'vopcgr_title_form_apply': 'ВЫПОЛНИТЬ?',
            'vopcgr_confirm_mess_apply_add_wagon_group': 'Добавить вагоны? Выбрано {0} ваг., будет добавленно {1} ваг., исключено из переноса повторяющихся вагонов {2}',
            'vopcgr_confirm_mess_apply_clear_wagon_group': 'Очистить все вагоны в количестве {0} шт. выбранных для правки?',

            'vopcgr_mess_cancel_operation_mode_add_wagon': 'Отмена операции добавить вагоны.',
            'vopcgr_mess_cancel_operation_mode_clear_wagon': 'Отмена операции очистить вагоны.',

            'vopcgr_mess_ok_operation_update_wagon_group': 'Выполнена операция {0} по группе вагонов {1} шт.',

            'vopcgr_mess_run_operation_update_wagon_group': 'Выполняю операцию {0} по группе вагонов.',

            'vopcgr_mess_error_operation_run_wagon_group': 'При выполнении операции с группой вагонов, произошла ошибка, код ошибки: {0}',
            'vopcgr_mess_error_operation_wagon_run': 'Вагон № {0}, код ошибки: {1}',

            'vopcgr_title_operation_type_group_0': '',
            'vopcgr_title_operation_type_group_1': '"ПРАВИТЬ ПРИМЕЧАНИЕ"',

        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    //var FE = App.form_element;
    //var MCF = App.modal_confirm_form;

    var ALERT = App.alert_form;
    var FD = App.form_dialog;

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var TWS = App.table_ws;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_op_common_group() {
        //this.fe_ui = new FE();
    }
    //------------------------------- ИНИЦИАЛИЗАЦИЯ И ОТОБРАЖЕНИЕ ----------------------------------
    // Инициализация
    view_op_common_group.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_op_common_group');
        LockScreen(langView('vopcgr_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_group: null,
            view_com: null,                         // Ссылка на общюю библиотеку операций (view_op_common)
            api_dir: null,                          // сылки на библиотеки api dir
            api_wsd: null,                          // сылки на библиотеки api wsd
            fn_start_init: null,                    // Объявление переменых
            fn_load_db_operation: null,             // Загрузка дополнительных библиотек
            fn_after_loading_init: null,            // Инициализация переменых после загрузки всех библиотек
            fn_init_form_group_wagons_setup: null,  // Инициализация окна правки информации по группе вагонов
            fn_init_form_from_setup: null,          // Инициализация окна вагонов на пути from
            fn_init: null,                          // Окончание инициализации
            fn_view_open: null,                     // Открытие панели (дополнительная обработка перед открытием выбранной панели)
            fn_validation: null,                    // Валидация правки подачи и операций над вагонами (в зависимости от операции)
            fn_apply_update_wagons: null,           // Выполнить операцию править группу вагонов 
            fn_apply_update: null,                  // Выполнить update таблиц после выполнения операций над вагонами или подачи
            fn_db_update: null,                     // Выполнить обновление баз данных если были изменения
            fn_close: null,                         // ? пока неработает
        }, options);
        //
        // Создадим ссылку на модуль работы с базой данных
        this.view_com = this.settings.view_com ? this.settings.view_com : null;  // Определим ссылку на базовую библиотеку api
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });

        this.type_group = this.settings.type_group;   // Тип формы группировки
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        this.id_station_from = -1;      // Значения по умолчанию
        this.id_way_from = -1;
        this.list_wagons = [];

        this.stations = [];             // Список станций (полный)
        this.ways = [];                 // Список путей (полный)
        this.park_ways = [];            // Список парков (полный)
        this.divisions = [];            // Список подразделений (полный)

        this.list_station = [];         // Список станций всех (value\text\desabled)
        this.list_way = [];             // Список путей (value\text\desabled)
        this.list_devision = [];        // Список подразделений АМКР (value\text\desabled)

        this.nums = null;               // Список вагонов
        this.wagons = [];               // Список вагонов на пути отправки (рабочий)
        this.wagons_group = [];         // Список вагонов группа (рабочий)

        // Главный Alert
        this.alert = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.view_com.$op.append(this.alert.$html);
        this.main_alert = new ALERT(this.alert.$html);
        // Создать макет панели (Область группа вагонов)
        this.card_group_wagons = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopcgr_card_header_group_wagons', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.view_com.fe_ui.bs_row({});
        this.group_wagons_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.group_wagons_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_group_wagons
        this.alert_group_wagons = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.group_wagons_table.$html.append(this.alert_group_wagons.$html);
        this.group_wagons_alert = new ALERT(this.alert_group_wagons.$html);
        //
        row.$html.append(this.group_wagons_setup.$html).append(this.group_wagons_table.$html);
        this.card_group_wagons.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_group_wagons.$html);
        //-- Создать макет панели (Область вагонов на пути)
        this.card_from_way = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopcgr_card_header_from_way', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.view_com.fe_ui.bs_row({});
        this.from_way_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 2,
        });
        this.from_way_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 10,
            class: 'rounded border border-secondary'
        });
        // Alert_from_way
        this.alert_from_way = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.from_way_table.$html.append(this.alert_from_way.$html);
        this.from_way_alert = new ALERT(this.alert_from_way.$html);
        row.$html.append(this.from_way_setup.$html).append(this.from_way_table.$html);
        this.card_from_way.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_from_way.$html);
        // Инициализация вначале 
        if (typeof this.settings.fn_start_init === 'function') {
            this.settings.fn_start_init.call(this);
        }
        // Определим количество загрузок
        var pr_load = 2;
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
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_op_common_group');

                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия 
                this.stations = this.view_com.api_dir.getAllStation();
                this.ways = this.view_com.api_dir.getAllWays();
                this.park_ways = this.view_com.api_dir.getAllParkWays();
                this.divisions = this.view_com.api_dir.getAllDivisions();
                // Создадим список станций по которым есть выход в цеха
                this.list_station = this.view_com.api_dir.getListValueTextStation(function (i) {
                    return !i.stationUz && i.stationDelete === null;
                }.bind(this));
                this.list_devision = this.view_com.api_dir.getListValueTextCodeAbbrDivisions();
                // Обработка дополнительной инициализации после загрузки 
                if (typeof this.settings.fn_after_loading_init === 'function') {
                    this.settings.fn_after_loading_init.call(this, function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_group] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this));
                } else {
                    process--;
                    out_init(process);
                }
                //-------------------------------------------------------------------
                // Создадим форму (this.group_wagons_setup)
                if (typeof this.settings.fn_init_form_group_wagons_setup === 'function') {
                    this.settings.fn_init_form_group_wagons_setup.call(this, function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_group] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this));
                } else {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_common_group] [form_filing_setup]process: ' + process);
                    out_init(process);
                }
                // Создадим таблицы (this.group_wagons_table)
                var row_group_area_wagons = new this.view_com.fe_ui.bs_row({ id: 'op-com-group-area-wagons_' + this.type_group, class: 'pt-2' });
                this.group_wagons_table.$html.append(row_group_area_wagons.$html);

                this.form_searsh_wagon = new FD();
                var objs_searsh_wagon = [];

                var bt_append_vagon_clear = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vopcgr_title_button_vagon_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom', //<i class="fa-solid fa-broom"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.clear_vagon_searsh();
                        }.bind(this),
                    }
                };
                var bt_append_vagon_searsh = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vopcgr_title_button_vagon_searsh', App.Langs),
                        icon_fa_left: 'fas fa-search',
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_searsh_wagon.$form.submit();
                        }.bind(this),
                    }
                };
                var form_checkbox_system_number = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'system_number',
                        name: 'system_number',
                        label: langView('vopcgr_title_label_system_number', App.Langs),
                        element_type: 'checkbox',
                        element_switch: false,
                        element_inline: false,
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_checked: true,
                        element_required: false,
                        element_readonly: false,
                        element_options: {
                            default: true,
                            fn_change: function (e) {
                                var value = $(e.currentTarget).prop('checked');
                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: null,
                        //form_text: langView('vopcgr_title_text_system_number', App.Langs),
                        //form_text_class: null
                    },
                    childs: []
                };
                var form_textarea_vagon = {
                    obj: 'bs_form_textarea',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'vagon_searsh',
                        name: 'vagon_searsh',
                        //label: langView('voprc_title_vagon_searsh', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vopcgr_title_placeholder_vagon_searsh', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_readonly: false,
                        element_cols: null,
                        element_rows: 3,
                        element_wrap: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var text = $(e.currentTarget).val();
                                /*main_alert.clear_message(); main_alert.out_info_message('element_textarea : ' + text);*/
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'row',
                        group_append_class: null,
                        group_append_id: null,
                        /*                        group_append_html: langView('vopcgr_text_append_vagon_searsh', App.Langs),*/
                        group_append_objs: [bt_append_vagon_clear, bt_append_vagon_searsh],
                        form_text: langView('vopcgr_text_vagon_searsh', App.Langs),
                        form_text_class: null
                    },
                    childs: []
                };
                var col_group_wagons = {
                    obj: 'bs_col',
                    options: {
                        id: 'op-com-group-tab-wagons_' + this.type_group,
                        pref: 'md',
                        size: 12,
                        class: '',
                        style: null,
                    },
                    childs: []
                };
                objs_searsh_wagon.push(form_checkbox_system_number);
                objs_searsh_wagon.push(form_textarea_vagon);
                objs_searsh_wagon.push(col_group_wagons);
                this.form_searsh_wagon.init({
                    alert: this.from_alert,
                    objs: objs_searsh_wagon,
                    id: null,
                    form_class: 'mb-3',
                    validation: true,
                    fn_validation: function (result) {
                        this.from_way_alert.clear_message();
                        this.group_wagons_alert.clear_message();
                        this.form_group_wagons_setup.clear_all();
                        this.form_from_setup.clear_all();
                        // Валидация успешна
                        if (result && result.valid) {
                            // Дополнительная проверка
                            var valid = this.validation_vagon_searsh(result);
                            if (valid && this.nums !== null && this.nums.length > 0) {
                                this.wagons_group = [];
                                $.each(this.nums, function (i, el) {
                                    this.wagons_group.push({ position: i + 1, num: el, exist: false });
                                }.bind(this));
                                //
                                var cars = this.form_searsh_wagon.el.textarea_vagon_searsh.val();
                                //
                                this.load_of_way(this.id_way_from, function (wagons) {
                                    this.load_of_nums(cars, function () {
                                        this.view_wagons();
                                        LockScreenOff();
                                    }.bind(this));
                                }.bind(this));


                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        row_group_area_wagons.$html.append(this.form_searsh_wagon.$form);
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_provide_cars] [form_on_setup] process ' + process);
                        out_init(process);
                    }.bind(this),
                });

                // Создадим таблицы (this.group_wagons_table)
                var row_group_tab_wagons = new this.view_com.fe_ui.bs_row({ id: 'op-com-group-tab-wagons_' + this.type_group, class: 'pt-2' });
                this.group_wagons_table.$html.append(row_group_tab_wagons.$html);
                // таблица выбранных вагонов
                this["twdgw_" + this.type_group] = new TWS('div#op-com-group-tab-wagons_' + this.type_group);
                this["twdgw_" + this.type_group].init({
                    alert: this.group_wagons_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'dislocation_group_wagons_' + this.type_group,
                    setup_buttons: [
                        {
                            name: 'select_all',
                            action: function () {
                                // Выбрать только не принятые вагоны
                                this["twdgw_" + this.type_group].tab_com.obj_t_report.rows(function (idx, data, node) {
                                    return data.close === null;
                                }.bind(this)).select();
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_unloading_cars] [tocw_opoc]process: ' + process);
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.group_wagons_alert.clear_message();
                        this.from_way_alert.clear_message();
                        if (rowData && rowData.length > 0) {
                            if (rowData[0].close !== null) {
                                e.preventDefault();
                                this.group_wagons_alert.out_warning_message(langView('vopcgr_mess_warning_wagon_ban_wagon_out', App.Langs).format(rowData[0].num));
                            }
                        }
                    }.bind(this),
                    fn_select_rows: function (rows) {

                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            this.view_wagons_from();
                            LockScreenOff();
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {

                    }.bind(this),
                });

                //-------------------------------------------------------------------
                // Создадим форму (this.from_way_setup)
                if (typeof this.settings.fn_init_form_from_setup === 'function') {
                    this.settings.fn_init_form_from_setup.call(this, function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_group] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this));
                } else {
                    this.form_from_setup = new FD();
                    // Создать макет панели
                    var objs_from_setup = [];

                    var form_select_station_from = {
                        obj: 'bs_form_select',
                        options: {
                            validation_group: 'common_from',
                            id: 'id_station_from',
                            name: 'id_station_from',
                            label: langView('vopcgr_title_label_station_from', App.Langs),
                            element_fsize: 'sm',
                            element_class: null,
                            element_value: null,
                            element_multiple: false,
                            element_title: null,
                            element_required: true,
                            element_readonly: false,
                            element_size: null,
                            element_options: {
                                data: this.list_station,
                                default: this.id_station_from,
                                fn_change: function (e) {
                                    e.preventDefault();
                                    // Обработать выбор
                                    var id = Number($(e.currentTarget).val());
                                    this.update(id, -1, function () {
                                        LockScreenOff();
                                    }.bind(this));
                                }.bind(this),
                                fn_check: function (text) {

                                }.bind(this),
                            },
                            validation: true,
                            feedback_invalid: null,
                            feedback_valid: null,
                            feedback_class: null,
                            col_prefix: 'md',
                            col_size: 12,
                            col_class: 'mt-0',
                            form_text: langView('vopcgr_text_label_station_from', App.Langs),
                            form_text_class: null,
                        },
                        childs: []
                    };
                    var form_select_way_from = {
                        obj: 'bs_form_select',
                        options: {
                            validation_group: 'common_from',
                            id: 'id_way_from',
                            name: 'id_way_from',
                            label: langView('vopcgr_title_label_way_from', App.Langs),
                            element_fsize: 'sm',
                            element_class: null,
                            element_value: null,
                            element_multiple: false,
                            element_title: null,
                            element_required: true,
                            element_readonly: false,
                            element_size: null,
                            element_options: {
                                data: [],
                                default: this.id_way_from,
                                fn_change: function (e) {
                                    e.preventDefault();
                                    // Обработать выбор
                                    var id = Number($(e.currentTarget).val());
                                    this.update(this.id_station_from, id, function () {
                                        LockScreenOff();
                                    }.bind(this));
                                }.bind(this),
                                fn_check: function (text) {

                                }.bind(this),
                            },
                            validation: true,
                            feedback_invalid: null,
                            feedback_valid: null,
                            feedback_class: null,
                            col_prefix: 'md',
                            col_size: 12,
                            col_class: 'mt-0',
                            form_text: langView('vopcgr_text_label_way_from', App.Langs),
                            form_text_class: null,
                        },
                        childs: []
                    };

                    objs_from_setup.push(form_select_station_from);
                    objs_from_setup.push(form_select_way_from);
                    this.form_from_setup.init({
                        alert: this.main_alert,
                        objs: objs_from_setup,
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
                            this.from_way_setup.$html.append(this.form_from_setup.$form);
                            // На проверку окончания инициализации
                            process--;
                            //console.log('[view_op_unloading_cars] [form_from_setup]process: ' + process);
                            out_init(process);
                        }.bind(this),
                    });
                }

                // Создадим таблицы (this.from_way_table)
                var row_wagons_from_way = new this.view_com.fe_ui.bs_row({ id: 'op-com-wagons-from-' + this.type_group, class: 'pt-2' });
                this.from_way_table.$html.append(row_wagons_from_way.$html);

                this["twwf_" + this.type_group] = new TWS('div#op-com-wagons-from-' + this.type_group);
                this["twwf_" + this.type_group].init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'group_cars_from_' + this.type_group,
                    setup_buttons: [
                        {
                            name: 'select_all',
                            action: function () {
                                // Выбрать только не принятые вагоны
                                this["twwf_" + this.type_group].tab_com.obj_t_report.rows(function (idx, data, node) {
                                    return data.id_wir_from === null;
                                }.bind(this)).select();
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                        {
                            name: 'add_group',
                            action: function (e, dt, node, config) {
                                this["twwf_" + this.type_group].tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        }
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_unloading_cars] [tocw_opoc]process: ' + process);
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.from_way_alert.clear_message();
                        this.group_wagons_alert.clear_message();
                        this.form_group_wagons_setup.clear_all();
                        this.form_from_setup.clear_all();
                        if (rowData && rowData.length > 0) {
                            if (rowData[0].id_wir_from !== null) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vopcgr_mess_warning_wagon_ban_group_way', App.Langs).format(rowData[0].num));
                            }
                        }
                    }.bind(this),
                    fn_select_rows: function (rows) {

                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            this.view_wagons_from();
                            LockScreenOff();
                        }
                        if (name === 'add_group') {
                            this.from_way_alert.clear_message();
                            this.group_wagons_alert.clear_message();
                            this.form_group_wagons_setup.clear_all();
                            this.form_from_setup.clear_all();
                            var rows = this["twwf_" + this.type_group].tab_com.get_select_row();
                            var rows_move = []
                            if (rows !== null && rows.length > 0) {
                                var exist_nums = [];
                                var cars = this.form_searsh_wagon.el.textarea_vagon_searsh.val();
                                var exist_cars = cars !== null ? cars.split(';') : [];
                                $.each(rows, function (i, el) {
                                    if (exist_cars !== null && exist_cars.length > 0) {
                                        var ex_num = exist_cars.find(function (o) { return o == el.num }.bind(this))
                                        if (ex_num) {
                                            exist_nums.push(el.num);
                                        } else {
                                            rows_move.push(el);
                                        }
                                    } else {
                                        rows_move = rows;
                                    }
                                }.bind(this));
                                if (exist_nums.length < rows.length) {
                                    this.view_com.mcf_lg.open(
                                        langView('vopcgr_title_form_apply', App.Langs),
                                        langView('vopcgr_confirm_mess_apply_add_wagon_group', App.Langs).format(rows.length, rows_move.length, exist_nums.length),
                                        function () {
                                            // Добавить вагоны в группу
                                            LockScreen(langView('vopcgr_mess_add_group', App.Langs));
                                            var nums_exist = this.form_searsh_wagon.el.textarea_vagon_searsh.val();
                                            var nums = '';
                                            $.each(rows_move, function (i, el) {
                                                el['id_wir_from'] = el.wirId;
                                                nums += ';' + String(el.num);
                                            }.bind(this));
                                            if (nums_exist === '') {
                                                nums = nums.substring(1);
                                            }
                                            this.form_searsh_wagon.el.textarea_vagon_searsh.val(nums_exist + nums);
                                            this.wagons_group = [];
                                            this.view_wagons();
                                            LockScreenOff();
                                        }.bind(this),
                                        function () {
                                            this.main_alert.out_warning_message(langView('vopcgr_mess_cancel_operation_mode_add_wagon', App.Langs));
                                        }.bind(this));
                                } else {
                                    this.from_way_alert.out_warning_message(langView('vopcgr_mess_all_select_wagons_exist', App.Langs));
                                }
                            } else {
                                this.from_way_alert.out_warning_message(langView('vopcgr_mess_not_select_wagons_from', App.Langs));
                            }
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {

                    }.bind(this),
                });
                //====================================================================
            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = ['station', 'park_ways', 'ways', 'divisions'];
        // Загружаем стандартные библиотеки
        this.view_com.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_op_common_group] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.view_com.load_db}
        // Загружаем дополнительные библиотеки
        if (typeof this.settings.fn_load_db_operation === 'function') {
            this.settings.fn_load_db_operation.call(this, function () {
                // На проверку окончания инициализации
                pr_load--;
                //console.log('[view_op_common_group] [fn_load_db_operation] pr_load: ' + pr_load);
                out_load(pr_load);
            }.bind(this));
        } else {
            pr_load--;
            out_load(pr_load);
        }
    };
    //
    view_op_common_group.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vopcgr_mess_load_operation', App.Langs));
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

        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_from_setup.el.select_id_station_from.val(id_station);
            }
        };
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
    view_op_common_group.prototype.update = function (id_station, id_way_from, callback) {
        // Обновим состояние станции
        this.update_station(id_station, id_way_from, function (wagons) {
            this.view_wagons();
            if (typeof callback === 'function') {
                callback(wagons);
            }
        }.bind(this));
    };
    //
    view_op_common_group.prototype.update_station = function (id_station, id_way, callback) {
        // Обновим пути на станции станции
        // обновим компонент пути отправки
        this.id_station_from = id_station;
        this.list_way = this.view_com.api_dir.getListValueTextWaysOfStation(id_station);
        this.form_from_setup.el.select_id_way_from.update(this.list_way, id_way);
        this.update_from_way(id_way, function (wagons) {
            if (typeof callback === 'function') {
                callback(wagons);
            }
        }.bind(this));
    };
    //
    view_op_common_group.prototype.update_from_way = function (id_way, callback) {
        this.load_of_way(id_way, function (wagons) {
            if (typeof callback === 'function') {
                callback(wagons);
            }
        }.bind(this));
    }
    //
    view_op_common_group.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way_from = id_way;
            LockScreen(langView('vopcgr_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    var cars = this.form_searsh_wagon.el.textarea_vagon_searsh.val();
                    var exist_cars = cars !== null ? cars.split(';') : [];
                    $.each(wagons, function (i, el) {
                        var ex_num = exist_cars.find(function (o) { return o == el.num }.bind(this))
                        if (ex_num) {
                            el['id_wir_from'] = el.wirId;
                        } else {
                            el['id_wir_from'] = null;
                        }
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.id_way_from = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    //
    view_op_common_group.prototype.load_of_nums = function (nums, callback) {
        if (nums !== null && nums.length >= 0) {
            LockScreen(langView('vopcgr_mess_load_wagons', App.Langs));
            var list = [];
            $.each(nums.split(';'), function (i, el) {
                list.push(el);
            }.bind(this));
            this.view_com.api_wsd.postViewWagonsOfListNums(list, function (wagons) {
                // модифицировать данные взависимости от отчета
                this.wagons_group = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.wagons_group = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    //
    view_op_common_group.prototype.view_wagons = function () {
        // Очистить сообщения и форму
        this.form_group_wagons_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать вагоны на пути начала дислокации
        this.view_wagons_from();
        // Показать вагоны на пути дислокации
        this.view_wagons_group();
    };
    // Показать вагоны на пути выбора для переноса
    view_op_common_group.prototype.view_wagons_from = function () {
        var wagons = this.wagons;
        if (this["twwf_" + this.type_group].tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wir_from === null;
            });
        }
        this["twwf_" + this.type_group].view(wagons, null);
    };
    // Показать вагоны поиск на пути
    view_op_common_group.prototype.view_wagons_group = function () {
        var wagons = this.wagons_group;
        //if (this["twdgw_" + this.type_group].tab_com.eye) {
        //    wagons = wagons.filter(function (i) {
        //        return i.id_wir_from === null;
        //    });
        //}
        this["twdgw_" + this.type_group].view(wagons, null);
    };
    //
    view_op_common_group.prototype.validation_vagon_searsh = function (result) {
        var valid = true;
        var el_vs = this.form_searsh_wagon.el.textarea_vagon_searsh;//.$element;
        this.nums = this.form_searsh_wagon.validation_common_searsh.check_control_is_valid_nums(el_vs, result.new.input_checkbox_system_number, false, true);
        valid = (this.nums !== null);
        return valid;
    }
    //
    view_op_common_group.prototype.clear_vagon_searsh = function () {
        this.from_way_alert.clear_message();
        this.group_wagons_alert.clear_message();
        this.form_group_wagons_setup.clear_all();
        this.form_from_setup.clear_all();
        var nums_exist = this.form_searsh_wagon.el.textarea_vagon_searsh.val();
        if (nums_exist !== null && nums_exist !== '') {
            var cars = nums_exist.split(';');
            this.view_com.mcf_lg.open(
                langView('vopcgr_title_form_apply', App.Langs),
                langView('vopcgr_confirm_mess_apply_clear_wagon_group', App.Langs).format(cars.length),
                function () {
                    // Добавить вагоны в группу
                    LockScreen(langView('vopcgr_mess_clear_group', App.Langs));
                    this.nums = null;
                    this.wagons_group = [];
                    this.form_searsh_wagon.el.textarea_vagon_searsh.val('');
                    if (this.wagons !== null && this.wagons.length > 0) {
                        $.each(this.wagons, function (i, el) {
                            el['id_wir_from'] = null;
                        }.bind(this));
                    }
                    this.view_wagons();
                    LockScreenOff();
                }.bind(this),
                function () {
                    this.main_alert.out_warning_message(langView('vopcgr_mess_cancel_operation_mode_clear_wagon', App.Langs));
                }.bind(this));
        }
    }
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_common_group.prototype.validation = function (result, mode) {
        if (typeof this.settings.fn_validation === 'function') {
            return this.settings.fn_validation.call(this, result, mode);
        }
    }

    view_op_common_group.prototype.apply_update_wagons = function (data) {
        LockScreen(langView('vopcgr_mess_run_operation_update_wagon_group', App.Langs).format(langView('vopcgr_title_operation_type_group_' + this.type_group, App.Langs)));
        if (typeof this.settings.fn_apply_update_wagons === 'function') {
            this.settings.fn_apply_update_wagons.call(this, data, function (result) {
                // Проверим на ошибку выполнения запроса api
                if (result && result.status) {
                    var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                    console.log('[view_op_common_group] [apply_update_wagons] :' + mess);
                    this.main_alert.out_error_message(mess);
                    //this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                    if (result.errors) {
                        for (var err in result.errors) {
                            this.main_alert.out_error_message(err + ":" + result.errors[err]);
                            //this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                            console.log('[view_op_common_group] [apply_update_wagons] :' + err + ":" + result.errors[err]);
                        }
                    }
                    LockScreenOff();
                } else {
                    this.apply_update(result, langView('vopcgr_mess_ok_operation_update_wagon_group', App.Langs).format(langView('vopcgr_title_operation_type_group_' + this.type_group, App.Langs), result.count));
                }
            }.bind(this));
        }
    };

    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    view_op_common_group.prototype.apply_update = function (result, mess_ok, mess_err) {
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
                this.main_alert.out_error_message(langView('vopcgr_mess_error_operation_run_wagon_group', App.Langs).format(result ? result.result : -1));
                // Выведем ошибки по вагонно.
                if (result && result.listResult) {
                    $.each(result.listResult, function (i, el) {
                        if (el.result <= 0)
                            this.main_alert.out_error_message(langView('vopcgr_mess_error_operation_wagon_run', App.Langs).format(el.num, el.result));
                    }.bind(this));
                }
            }
        }
    }
    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_op_common_group.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_op_common_group.prototype.clear_all = function () {

    }

    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_op_common_group.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_op_common_group = view_op_common_group;

    window.App = App;
})(window);