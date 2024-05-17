/* ===============================================
-= Модуль панель операции "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР" =-
  + js/view/shared/common.js
  + js/module/view_op_common.js
  + js/module/ws/table_ws.js
==================================================*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_dt_apply = -1 * (60 * 3); // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var max_dt_apply = 60 * 3; // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vopac_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР"',
            'vopac_card_header_on': 'ПРИНЯТЬ НА СТАНЦИЮ',
            'vopac_card_header_from': 'СОСТАВЫ НА ПОДХОДАХ',
            'vopac_fieldset_on_table_title': 'Сформированный состав',

            'vopac_title_label_station_on': 'Станция прибытия:',
            'vopac_text_label_station_on': 'Выберите станцию прибытия состава...',
            'vopac_title_placeholder_station_on': 'Станция прибытия:',

            'vopac_title_label_way_on': 'Путь прибытия:',
            'vopac_title_text_way_on': 'Выберите путь прибытия состава...',

            'vopac_title_placeholder_way_on': 'Выберите путь',


            'vopac_title_label_outer_way': 'Внешний путь:',
            'vopac_title_placeholder_outer_way': 'Внешний путь',
            'vopac_title_label_locomotive1': 'Локомотив №1:',
            'vopac_title_label_locomotive2': 'Локомотив №2:',
            'vopac_title_placeholder_locomotive': ' № локомотива',
            'vopac_title_time_aplly': 'Время выполнения',
            'vopac_text_time_aplly': 'Время выполнения операции ограниченно +(-)1день',
            'vopac_title_placeholder_time_aplly': 'Время выполнения',

            'vopac_title_form_apply': 'Выполнить',
            'vopac_title_form_apply_title': 'Выполнить операцию "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР"',

            'vopac_title_button_export': 'Экспорт',
            'vopac_title_button_buffer': 'Буфер',
            'vopac_title_button_excel': 'Excel',
            'vopac_title_button_cancel': 'Отменить',
            'vopac_title_button_return': 'Вернуть',
            'vopac_title_button_head': 'Голова',
            'vopac_title_button_tail': 'Хвост',

            'vopac_title_add_ok': 'ВЫПОЛНИТЬ',

            'vopac_mess_warning_not_num_sostav': 'Нет названия состава!',
            'vopac_mess_warning_wagon_ban_operation': 'Вагон № {0} для операций заблокирован (вагон уже принят на станцию: [{1}])',

            'vopac_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'vopac_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив №',
            'vopac_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) =',
            'vopac_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) =',
            'vopac_mess_error_not_wagons': 'Не выбраны вагоны для приема (в окне «СОСТАВЫ НА ПОДХОДАХ», выберите станцию, прибывающий состав и сформируйте прибытие).',
            'vopac_mess_error_operation_run': 'При выполнении операции «ПРИНЯТЬ СОСТАВ НА СТАНЦИЮ» произошла ошибка, код ошибки:',

            'vopac_mess_cancel_operation': 'Операция "ПРИНЯТЬ НА СТАНЦИЮ АМКР" – отменена',
            'vopac_mess_run_operation_arrival': 'Выполняю операцию приема вагонов прибывающего состава на станцию АМКР',
            'vopac_mess_not_select_way_on': 'Выберите путь для приема вагонов!',

            'vopac_mess_load_operation': 'Загружаю операции...',
            'vopac_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vopac_mess_load_sostav_outer_ways': 'Загружаю составы на подходах...',
            'vopac_mess_update_operation': 'Обновляю операции...',
            'vopac_mess_init_panel': 'Выполняю инициализацию модуля ...',
            'vopac_mess_destroy_operation': 'Закрываю форму...',
            'vopac_mess_create_sostav': 'Формирую состав, переношу вагоны...',
            'vopac_mess_clear_sostav': 'Формирую состав, убираю выбранные вагоны...',
            'vopac_mess_reverse_head_sostav': 'Формирую состав, реверс голова-хвост',
            'vopac_mess_reverse_sostav': 'Формирую состав, реверс вагонов...',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // js/module/view_op_common.js
    var VIEW_COMMON = App.view_op_common;
    // js/view/shared/common.js
    var ALERT = App.alert_form;
    var FD = App.form_dialog;
    // js/module/ws/table_ws.js
    var TWS = App.table_ws;

    function view_op_arrival_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_arrival_cars.prototype.init = function (options) {
        this.result_init = true;
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,
            api_wsd: null,
            fn_db_update: null,
            fn_init: null,
            fn_close: null,
        }, options);

        this.view_com.init({
            alert: this.settings.alert,
            api_dir: this.settings.api_dir,
            api_wsd: this.settings.api_wsd,
            fn_db_update: this.settings.fn_db_update,
            fn_init: this.settings.fn_init,
            fn_close: this.settings.fn_close,
        });
        this.id_station = -1;       // По умолчанию не выбрана
        this.id_way = -1;           // По умолчанию не выбрана
        this.stations = [];         // Список станций (полный)
        this.list_station = [];     // Список станций (value\text\desabled)
        this.was = [];              // Список путей (полный)
        this.list_way = [];         // Список путей (value\text\desabled)
        this.locomotives = [];      // Список локомотивов (полный)
        this.list_locomotive = [];  // Список локомотивов (value\text\desabled)
        this.outer_ways = [];       // Список внешних путей (полный)
        this.list_outer_ways = [];  // Список внешних путей  (value\text\desabled)

        this.id_outer_way = -1;   // id перегона
        this.station_from = null; // Станция отправления

        this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
        this.wagons = [];       // Список вагонов на пути (рабочий)
        this.num_sostav = null; // Номер выбранного состава
        this.wagons_sostav = [];    // Список вагонов выбранного состава (рабочий)
        this.wagons_all = [];       // Список всех вагонов всех составов (используем для выборки вагонов по составу)
        this.sostav_all = [];       // Список всех составов (получаем из Списока всех вагонов всех составов this.wagons_all)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vopac_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();

        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------

        // Сообщение
        LockScreen(langView('vopac_mess_init_panel', App.Langs));
        //----------------------------------
        // Alert
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
        // Создать макет панели
        this.card_on = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopac_card_header_on', App.Langs),
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
        this.on_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.on_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        row.$html.append(this.on_setup.$html).append(this.on_table.$html);
        this.card_on.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_on.$html);
        //--
        this.card_from = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopac_card_header_from', App.Langs),
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
        this.from_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 2,
        });
        this.from_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 10,
            class: 'rounded border border-secondary'
        });
        // Alert_from
        this.alert_from = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.from_table.$html.append(this.alert_from.$html);
        this.from_alert = new ALERT(this.alert_from.$html);
        row.$html.append(this.from_setup.$html).append(this.from_table.$html);
        this.card_from.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_from.$html);
        this.view_com.load_db(['station', 'ways', 'outer_ways', 'locomotive'], false, function (result) {
            var process = 5;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    //----------------------------------
                    if (typeof this.settings.fn_init === 'function') {
                        this.settings.fn_init(this.result_init);
                    }
                    //----------------------------------
                }
            }.bind(this);
            // инициализациия 
            this.stations = this.view_com.api_dir.getAllStation();
            this.list_station = this.view_com.api_dir.getListValueTextStation(function (i) {
                return !i.stationUz && i.stationDelete === null;
            }.bind(this))
            this.ways = this.view_com.api_dir.getAllWays();
            this.locomotives = this.view_com.api_dir.getAllLocomotive();
            this.list_locomotive = this.view_com.api_dir.getListValueTextLocomotiveOfActive();
            this.outer_ways = this.view_com.api_dir.getAllOuterWays();
            //-------------------------------------------------------------------
            // Создадим форму (this.on_setup)
            this.form_on_setup = new FD();
            // Создать макет панели
            var objs_on_setup = [];
            var col_bt_apply = {
                obj: 'bs_col',
                options: {
                    id: null,
                    pref: 'md',
                    size: 12,
                    class: 'text-left',
                    style: null,
                },
                childs: []
            };
            var bt_bt_apply = {
                obj: 'bs_button',
                options: {
                    id: null,
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vopac_title_form_apply', App.Langs),
                    title: langView('vopac_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        //this.form_test_dialog.$form.submit();
                    }.bind(this),
                }
            };
            var form_select_way_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common',
                    id: 'id_way_on',
                    name: 'id_way_on',
                    label: langView('vopac_title_label_way_on', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: true,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.view_com.api_dir.getListValueTextWaysOfStation(this.id_station),
                        default: this.id_way,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            this.update_wagons_of_way(id, function () {
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
                    form_text: langView('vopac_title_text_way_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datalist_locomotive1 = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common',
                    id: 'locomotive1',
                    name: 'locomotive1',
                    label: langView('vopac_title_label_locomotive1', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopac_title_placeholder_locomotive', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_locomotive,
                        out_value: false,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            //main_alert.clear_message();
                            //main_alert.out_info_message('element_datalist_change value=: ' + set.value + ' text=' + set.text);
                        }.bind(this),
                        fn_select: function (event, set, options) {
                            /*                        main_alert.out_info_message('element_datalist_select value=' + set.value + ' label=' + set.label);*/
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: null,
                    form_text_class: null
                },
                childs: []
            };
            var form_input_datalist_locomotive2 = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common',
                    id: 'locomotive2',
                    name: 'locomotive2',
                    label: langView('vopac_title_label_locomotive2', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopac_title_placeholder_locomotive', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_locomotive,
                        out_value: false,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            //main_alert.clear_message();
                            //main_alert.out_info_message('element_datalist_change value=: ' + set.value + ' text=' + set.text);
                        }.bind(this),
                        fn_select: function (event, set, options) {
                            /*                        main_alert.out_info_message('element_datalist_select value=' + set.value + ' label=' + set.label);*/
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: null,
                    form_text_class: null
                },
                childs: []
            };
            var form_input_datetime_time_aplly = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common',
                    id: 'time_aplly',
                    name: 'time_aplly',
                    label: langView('vopac_title_time_aplly', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopac_title_placeholder_time_aplly', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: moment().subtract(1, 'days').format("YYYY-MM-DDThh:mm"), //"2024-05-05T00:00"
                    element_max: moment().add(1, 'days').format("YYYY-MM-DDThh:mm"),
                    element_step: null,
                    element_options: {
                        default: moment(),
                        format: 'datetime',
                        out_format: 'moment',
                        fn_change: function (e, dt) {
                            //var text = $(e.currentTarget).val();
                            //main_alert.clear_message();
                            //main_alert.out_info_message('validationDatetime text=: ' + text + ' dt=' + dt);
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: 'mt-0',
                    form_text: langView('vopac_text_time_aplly', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            col_bt_apply.childs.push(bt_bt_apply);
            objs_on_setup.push(col_bt_apply);
            objs_on_setup.push(form_select_way_on);
            objs_on_setup.push(form_input_datalist_locomotive1);
            objs_on_setup.push(form_input_datalist_locomotive2);
            objs_on_setup.push(form_input_datetime_time_aplly);
            this.form_on_setup.init({
                alert: this.main_alert,
                objs: objs_on_setup,
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
                    this.on_setup.$html.append(this.form_on_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(this),
            });

            var row_arr_cars_way = new this.view_com.fe_ui.bs_row({ id: 'arrival-cars-way', class: 'pt-2' });
            this.on_table.$html.append(row_arr_cars_way.$html);
            this.tacw = new TWS('div#arrival-cars-way');
            this.tacw.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-wagons-outer-way table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'arrival_cars_way',     //
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
                    //this.from_alert.clear_message();
                    //if (rowData && rowData.length > 0 && rowData[0].outerWayEnd !== null) {
                    //    e.preventDefault();
                    //    this.from_alert.out_warning_message(langView('vopac_mess_warning_wagon_ban_operation', App.Langs).format(rowData[0].num, rowData[0]['arrivalStationName' + ucFirst(App.Lang)]));

                    //}
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {

                }.bind(this),
                fn_enable_button: function (tb) {
                    var bts = tb.obj_t_report.buttons([7]);
                    if (this.head) {
                        bts.text(langView('vopac_title_button_head', App.Langs));
                    } else {
                        bts.text(langView('vopac_title_button_tail', App.Langs));
                    }
                }.bind(this),
            });


            //-------------------------------------------------------------------
            // Создадим форму (this.from_setup)
            this.form_from_setup = new FD();
            // Создать макет панели
            var objs_from_setup = [];
            var form_select_station_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_from',
                    id: 'id_station',
                    name: 'id_station',
                    label: langView('vopac_title_label_station_on', App.Langs),
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
                        default: this.id_station,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            this.update_sostav_outer_ways_and_way_of_station(id, -1, null, function (sostav) {
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
                    form_text: langView('vopac_text_label_station_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            objs_from_setup.push(form_select_station_on);
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
                    this.from_setup.$html.append(this.form_from_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                }.bind(this),
            });

            var row_sostav_from = new this.view_com.fe_ui.bs_row({ id: 'sostav-outer-ways', class: 'pt-2' });
            var row_wagons_from = new this.view_com.fe_ui.bs_row({ id: 'wagons-outer-way', class: 'pt-2' });
            this.from_table.$html.append(row_sostav_from.$html).append(row_wagons_from.$html);
            this.tsf = new TWS('div#sostav-outer-ways');
            this.tsf.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-striped table-sostav-outer-ways table-bordered border-secondary',
                detali_table: false,
                type_report: 'sostav_outer_ways',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_select_rows: function (rows, type) {
                    if (type === "select") {
                        if (rows != null && rows.length > 0) {
                            this.view_open_wagon_outer_ways_of_sostav(rows[0].outerWayNumSostav, function (wagons) {
                                this.twf.view(wagons);
                                LockScreenOff();
                            }.bind(this));
                        } else {
                            this.twf.view([]);
                            this.from_alert.clear_message();
                            this.from_alert.out_warning_message(langView('vopac_mess_warning_not_num_sostav', App.Langs));
                        }
                    }



                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
            });

            this.twf = new TWS('div#wagons-outer-way');
            this.twf.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-wagons-outer-way table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'wagons_outer_way',     //
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
                    this.from_alert.clear_message();
                    if (rowData && rowData.length > 0 && rowData[0].outerWayEnd !== null) {
                        e.preventDefault();
                        this.from_alert.out_warning_message(langView('vopac_mess_warning_wagon_ban_operation', App.Langs).format(rowData[0].num, rowData[0]['arrivalStationName' + ucFirst(App.Lang)]));

                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {

                }.bind(this),
                fn_enable_button: function (tb) {
                    var index = tb.obj_t_report.rows({ selected: true });
                    var bts = tb.obj_t_report.buttons([6]);
                    //bt.disable();
                    bts.enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
                }.bind(this),
            });

        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    view_op_arrival_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vopac_mess_load_operation', App.Langs));
        this.id_station = -1;
        this.id_way = -1;
        if (id_way) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                this.id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_from_setup.el.select_id_station.val(this.id_station);
                this.id_way = id_way;
            }
        };
        this.update_sostav_outer_ways_and_way_of_station(this.id_station, this.id_way, this.num_sostav, function (sostav) {
            LockScreenOff();
        }.bind(this));
    };
    // Обновить составы на перегонах станции прибытия и пути станции прибытия
    view_op_arrival_cars.prototype.update_sostav_outer_ways_and_way_of_station = function (id_station, id_way, num_sostav, callback) {
        this.id_station = id_station;
        //this.id_way = id_way;
        this.num_sostav = num_sostav;
        // сбросим выбранные вагоны на пути и состав
        this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
        this.wagons = [];       // Список вагонов на пути (рабочий)
        this.wagons_sostav = [];// Список вагонов выбранного состава (рабочий)
        this.id_outer_way = -1;   // id перегона
        this.station_from = null; // Станция отправления
        // Обновить пути станции прибытия
        this.form_on_setup.el.select_id_way_on.update(this.view_com.api_dir.getListValueTextWaysOfStation(this.id_station), id_way);
        // Загрузим вагоны на пути приема
        this.update_wagons_of_way(id_way, function () {
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновить составы на перегонах станции прибытия и пути станции прибытия
    view_op_arrival_cars.prototype.update_wagons_of_way = function (id_way, callback) {
        this.id_way = id_way;
        // Загрузим вагоны на пути приема
        this.load_wagons_of_way(id_way, function () {
            // Обновить составы на перегонах станции прибытия
            this.load_open_wagon_outer_ways_station_on(this.id_station, function (sostav) {
                this.twf.view([]); // очистим детали
                this.tsf.view(sostav, this.num_sostav);
                // Отложеный вызов - обновили данные
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        }.bind(this));
    };

    // Показать текущую ситуацию по вагонам на пути приема и состава ()
    view_op_arrival_cars.prototype.view_wagons = function () {
        this.form_on_setup.clear_all();
        // Показать вагоны на пути приема
        this.tacw.view(this.wagons, null)
        //if (this.head) {
        //    this.tab_cars_on.obj_t_cars.button(5).text(langView('vac_title_button_head', App.Langs));
        //} else {
        //    this.tab_cars_on.obj_t_cars.button(5).text(langView('vac_title_button_tail', App.Langs));
        //}
        //// Показать вагоны выбранного состава без учета уже перенесенных в состав  
        //this.tab_wagon_from.view(this.wagons_sostav.filter(function (i) { return i.id_way_arrival === null; }), null);
    };
    // Загрузить вагоны на пути в внутрений массив
    view_op_arrival_cars.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            LockScreen(langView('vopac_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = el.position;
                        el['id_wim_arrival'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }

    };
    // Загрузим вагоны на пути приема и отобразим
    view_op_arrival_cars.prototype.load_wagons_of_way = function (id_way, callback) {
        this.id_way = id_way;
        // сбросить выбранный состав!
        //this.clear_wagons_of_sostav();
        // Загрузим вагоны на пути приема
        this.load_of_way(id_way, function (wagons) {
            this.view_wagons();
            // Отложеный вызов - загрузка данных
            if (typeof callback === 'function') {
                callback(wagons);
            }
        }.bind(this))

    };
    // Загрузить все вагоны, всех доконца непринятых составов, составы прибывающих на станцию id_station
    view_op_arrival_cars.prototype.load_open_wagon_outer_ways_station_on = function (id_station, callback) {
        this.sostav_all = [];
        if (id_station !== null && id_station >= 0) {
            LockScreen(langView('vopac_mess_load_sostav_outer_ways', App.Langs));
            this.view_com.api_wsd.getViewOpenWagonsOfOuterWaysStationOn(id_station, function (wagons) {
                this.wagons_all = wagons;
                $.each(wagons, function (key, el) {
                    var st = this.sostav_all.find(function (o) {
                        return $.trim(o.outerWayNumSostav) === $.trim(el.outerWayNumSostav);
                    }.bind(this));
                    if (!st) {
                        this.sostav_all.push({
                            outerWayNumSostav: $.trim(el.outerWayNumSostav),
                            idOuterWay: el.idOuterWay,
                            nameOuterWayRu: el.nameOuterWayRu,
                            nameOuterWayEn: el.nameOuterWayEn,
                            fromStationNameRu: el.fromStationNameRu,
                            fromStationNameEn: el.fromStationNameEn,
                            fromStationAbbrRu: el.fromStationAbbrRu,
                            fromStationAbbrEn: el.fromStationAbbrEn,
                            fromIdWay: el.fromIdWay,
                            fromIdPark: el.fromIdPark,
                            fromWayNumRu: el.fromWayNumRu,
                            fromWayNumEn: el.fromWayNumEn,
                            fromWayNameRu: el.fromWayNameRu,
                            fromWayNameEn: el.fromWayNameEn,
                            fromWayAbbrRu: el.fromWayAbbrRu,
                            fromWayAbbrEn: el.fromWayAbbrEn,
                            fromOperationStart: el.fromOperationStart,
                            fromOperationEnd: el.fromOperationEnd,
                            fromOperationCreateUser: el.fromOperationCreateUser,
                            fromOperationLocomotive1: el.fromOperationLocomotive1,
                            fromOperationLocomotive2: el.fromOperationLocomotive2,
                            countWagonsSend: 1,
                            countWagonsArrival: el.onIdOperation === 6 ? 1 : 0,
                            countWagonsReturn: el.onIdOperation === 11 || el.onIdOperation === 12 ? 1 : 0,
                            countWagonsAccepted: el.outerWayEnd !== null ? 1 : 0,
                        });
                    } else {
                        st.countWagonsSend++;
                        st.countWagonsArrival += (el.onIdOperation === 6 ? 1 : 0);
                        st.countWagonsReturn += (el.onIdOperation === 11 || el.onIdOperation === 12 ? 1 : 0)
                        st.countWagonsAccepted += (el.outerWayEnd !== null ? 1 : 0)
                    }
                }.bind(this));
                //this.id_station_on = id_station;
                //this.view(this.sostav);
                //LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.sostav_all);
                }
            }.bind(this));
        } else {
            //this.id_station_on = null;
            //this.view(this.sostav);
            if (typeof callback === 'function') {
                callback(this.sostav_all);
            }
            //
        }

    };
    // Выбрать все вагоны выбранного состава 
    view_op_arrival_cars.prototype.view_open_wagon_outer_ways_of_sostav = function (num_sostav, callback) {
        this.wagons_sostav = [];
        if (num_sostav !== null && this.wagons_all != null && this.wagons_all.length > 0) {
            LockScreen(langView('vopac_mess_load_wagons', App.Langs));
            this.wagons_sostav = this.wagons_all.filter(function (i) {
                return $.trim(i.outerWayNumSostav) === $.trim(num_sostav);
            }.bind(this))
            if (typeof callback === 'function') {
                callback(this.wagons_sostav);
            }
        } else {
            if (typeof callback === 'function') {
                callback(this.wagons_sostav);
            }
        }
    }

    view_op_arrival_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_arrival_cars = view_op_arrival_cars;

    window.App = App;

})(window);