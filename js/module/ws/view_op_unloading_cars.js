/* ===============================================
-= Модуль панель операции "ВЫГРУЗКА ВАГОНОВ" =-
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
            'vounl_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ВЫГРУЗКА ВАГОНОВ"',
            'vounl_card_header_filing': 'ПОДАЧИ ПО СТАНЦИИ',

            'vounl_card_header_filing_wagons': 'ВАГОНЫ В ПОДАЧИ',
            'vounl_card_header_from_way': 'ВАГОНЫ НА ПУТИ',


            'vounl_title_label_period': 'Выборка за:',
            'vounl_title_time_period_start': 'С даты',
            'vounl_text_time_period_start': 'Выборка с указаной даты',
            'vounl_title_placeholder_time_period_start': 'Время начала',
            'vounl_title_label_station': 'Станция выгрузки:',
            'vounl_text_label_station': 'Выберите станцию выгрузки...',
            'vounl_title_label_devision_on': 'Цех получатель:',
            'vounl_text_label_devision_on': 'Выберите цех получатель...',
            'vounl_title_label_status_load': 'Статус:',
            'vounl_text_label_status_load': 'Выберите статус (груж./порож.)...',
            'vounl_title_label_station_amkr_on': 'Станция приб. АМКР:',
            'vounl_text_label_station_amkr_on': 'Выберите станцию приб. АМКР...',

            'vounl_title_label_way_from': 'Путь отправления:',
            'vounl_text_label_way_from': 'Выберите путь начала дислокации...',



            //'vounl_title_label_locomotive1': 'Локомотив №1:',
            //'vounl_title_label_locomotive2': 'Локомотив №2:',
            //'vounl_title_placeholder_locomotive': ' № локомотива',

            'vounl_title_time_start': 'Время начала',
            'vounl_text_time_start': 'Время начала операции ограниченно +(-)1день',
            'vounl_title_placeholder_time_start': 'Время начала',

            'vounl_title_time_stop': 'Время окончания',
            'vounl_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            'vounl_title_placeholder_time_stop': 'Время окончания',

            'vounl_title_form_add': 'Создать',
            'vounl_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            'vounl_title_form_apply': 'Выполнить',
            'vounl_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',

            'vounl_title_period_1': 'ЖД сутки',
            'vounl_title_period_2': 'Календарные сутки',
            'vounl_title_period_3': 'От начала месяца',

            //'vounl_title_button_export': 'Экспорт',
            //'vounl_title_button_buffer': 'Буфер',
            //'vounl_title_button_excel': 'Excel',
            //'vounl_title_button_cancel': 'Отменить',
            //'vounl_title_button_return': 'Вернуть',
            //'vounl_title_button_head': 'Голова',
            //'vounl_title_button_tail': 'Хвост',

            //'vounl_title_add_ok': 'ВЫПОЛНИТЬ',

            ////'vounl_mess_warning_not_num_sostav': 'Нет названия состава!',
            //'vounl_mess_warning_wagon_ban_disl_on_way': 'Вагон № {0} для операций заблокирован (вагон стоит на пути приема)',
            'vounl_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу который имеет статус :[{1}])',
            'voprc_mess_warning_wagon_ban_filing_way': 'Вагон № {0} для операций заблокирован (вагон уже выбран для подачи)',

            //'vounl_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            //'vounl_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив № {0}',
            //'vounl_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) = {0}',
            //'vounl_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) = {0}',
            //'vounl_mess_error_not_wagons': 'Не выбраны вагоны для дислокации (в окне «ВАГОНЫ НА ПУТИ», выберите станцию, путь и вагоны для дислокации).',
            //'vounl_mess_error_operation_run': 'При выполнении операции «ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ» произошла ошибка, код ошибки: {0}',
            //'vounl_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            //'vounl_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',

            //'vounl_mess_cancel_operation': 'Операция "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ" – отменена',
            //'vounl_mess_run_operation_dislocation': 'Выполняю операцию "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ"',
            'vounl_mess_not_select_wagon_from': 'Выберите вагоны для формирования подачи!',
            'vounl_mess_not_select_way_from': 'Выберите путь с которого будет сформирована подача!',
            //'vounl_mess_not_select_way_on': 'Выберите путь дислокации вагонов!',
            //'vounl_mess_ok_operation': 'Дислокация выполнена, перенесено {0} (ваг.)',

            'vounl_mess_load_operation': 'Загружаю операции...',
            'vounl_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vounl_mess_load_filing_wagon': 'Загружаю вагоны подач...',
            ////'vounl_mess_load_sostav_outer_ways': 'Загружаю составы на подходах...',
            ////'vounl_mess_update_operation': 'Обновляю операции...',
            'vounl_mess_init_panel': 'Выполняю инициализацию модуля ...',
            ////'vounl_mess_destroy_operation': 'Закрываю форму...',
            'vounl_mess_create_filing': 'Формирую список подачи, переношу вагоны...',
            //'vounl_mess_clear_sostav': 'Формирую маршрут дислокации, убираю выбранные вагоны...',
            //'vounl_mess_head_sostav': 'Формирую порядок дислокации голова-хвост',
            //'vounl_mess_reverse_sostav': 'Формирую порядок дислокации, реверс вагонов...',

            'vounl_confirm_title': 'Внимание!',
            ////'vounl_confirm_mess_new_sostav': 'Вы уверены что хотите изменить станцию отправления? Все выбранные и перенесённые вагоны в количестве {0} будут сброшены! ',
            ////'vounl_confirm_mess_new_way': 'Вы уверены что хотите изменить путь отправления? Все выбранные и перенесённые вагоны в количестве {0} будут сброшены! ',
            //'vounl_confirm_mess_apply_outgoing_wagons': 'Выполнить операцию "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ" {0} в количестве: {1} (ваг.), переместить вагоны с пути {2} на путь {3}?',

            'vounl_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию {0}? Все вагоны для подачи в количестве {1} будут сброшены! ',
            'vounl_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь для подачи {0}? Все выбранные для подачи в количестве {1} будут сброшены! ',

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
    function view_op_unloading_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_unloading_cars.prototype.init = function (options) {
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
        }, function () { }.bind(this));

        this.start = moment().subtract(1, 'days').format("YYYY-MM-DDThh:mm");
        this.stop = moment().add(1, 'days').format("YYYY-MM-DDThh:mm");
        this.id_station_unload = -1;      // Значения по умолчанию
        this.id_way_unload = -1;          // Значения по умолчанию

        this.stations = [];             // Список станций (полный)
        this.list_station = [];         // Список станций всех (value\text\desabled)
        this.list_way = [];             // Список путей (value\text\desabled)

        this.ways = [];                 // Список путей (полный)
        this.wagons = [];               // Список вагонов на пути отправки (рабочий)
        this.wagons_filing = [];        // Список вагонов подач (рабочий)
        this.sostav_filing = [];        // Список вагонов подач (рабочий)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vounl_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();
        // Сообщение
        LockScreen(langView('vounl_mess_init_panel', App.Langs));
        //----------------------------------
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
        // Создать макет панели (Область подачи)
        this.card_filing = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vounl_card_header_filing', App.Langs),
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
        this.filing_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.filing_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_from
        this.alert_filing = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.filing_table.$html.append(this.alert_filing.$html);
        this.filing_alert = new ALERT(this.alert_filing.$html);
        row.$html.append(this.filing_setup.$html).append(this.filing_table.$html);
        this.card_filing.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_filing.$html);
        // Создать макет панели (Область вагоны подачи - детально)
        this.card_filing_wagons = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vounl_card_header_filing_wagons', App.Langs),
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
        this.filing_wagons_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.filing_wagons_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_from
        this.alert_filing_wagons = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.filing_wagons_table.$html.append(this.alert_filing_wagons.$html);
        this.filing_wagons_alert = new ALERT(this.alert_filing_wagons.$html);
        row.$html.append(this.filing_wagons_setup.$html).append(this.filing_wagons_table.$html);
        this.card_filing_wagons.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_filing_wagons.$html);
        //-- Создать макет панели (Область вагонов на пути)
        this.card_from_way = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vounl_card_header_from_way', App.Langs),
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
        // Alert_from
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
        this.view_com.load_db(['station', 'ways'], false, function (result) {
            var process = 4;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    //----------------------------------
                    if (typeof this.settings.fn_init === 'function') {
                        console.log('Close view_op_unloading_cars');
                        this.settings.fn_init(this.result_init);
                    }
                    //----------------------------------
                }
            }.bind(this);
            // инициализациия 
            this.stations = this.view_com.api_dir.getAllStation();
            //this.list_station = this.view_com.api_dir.getListValueTextStation(function (i) {
            //    return !i.stationUz && i.stationDelete === null;
            //}.bind(this))
            this.ways = this.view_com.api_dir.getAllWays();

            // сформируем периоды { value: , text: , disabled: false }
            this.list_period = [];
            this.list_period.push({ value: 1, text: langView('vounl_title_period_1', App.Langs), disabled: false });
            this.list_period.push({ value: 2, text: langView('vounl_title_period_2', App.Langs), disabled: false });
            this.list_period.push({ value: 3, text: langView('vounl_title_period_3', App.Langs), disabled: false });

            // Создадим список станций по которым есть выход в цеха
            this.list_station = [];
            $.each(this.ways, function (i, el) {
                if (el.idDevision !== null && el.wayDelete === null && el.wayClose === null) {
                    var st = this.list_station.find(function (o) {
                        return o.value === el.idStation
                    }.bind(this));
                    if (!st) {
                        var dst = this.stations.find(function (o) {
                            return o.id === el.idStation && !o.stationUz && o.stationDelete === null;
                        }.bind(this));
                        if (dst)
                            this.list_station.push({ value: dst.id, text: dst['stationName' + ucFirst(App.Lang)], disabled: false });
                    }
                }
            }.bind(this));

            this.list_devision_on = [];
            this.list_status_load = [];
            this.list_station_amkr_on = [];

            //-------------------------------------------------------------------
            // Создадим форму (this.filing_setup)
            this.form_filing_setup = new FD();
            // Создать макет панели
            var objs_filing_setup = [];
            var form_select_period = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing',
                    id: 'id_period',
                    name: 'id_period',
                    label: langView('vounl_title_label_period', App.Langs),
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
                        default: 1,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            //this.update(id, -1, function () {
                            //    LockScreenOff();
                            //}.bind(this));
                        }.bind(this),
                        fn_check: function (text) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vounl_text_label_station', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datetime_time_period_start = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing',
                    id: 'time_period_start',
                    name: 'time_period_start',
                    label: langView('vounl_title_time_period_start', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vounl_title_placeholder_time_period_start', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: null,
                    element_max: null,
                    element_step: null,
                    element_options: {
                        default: moment(),
                        format: 'datetime',
                        out_format: 'moment',
                        fn_change: function (e, dt) {
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vounl_text_time_period_start', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_station = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing',
                    id: 'id_station_unload',
                    name: 'id_station_unload',
                    label: langView('vounl_title_label_station', App.Langs),
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
                        default: this.id_station_unload,
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
                    form_text: langView('vounl_text_label_station', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            objs_filing_setup.push(form_select_period);
            objs_filing_setup.push(form_input_datetime_time_period_start);
            objs_filing_setup.push(form_select_station);
            this.form_filing_setup.init({
                alert: this.main_alert,
                objs: objs_filing_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка
                        //var valid = this.validation(result);
                        //if (valid) {

                        //}
                    }
                }.bind(this),
                fn_html_init: function (res) { }.bind(this),
                fn_element_init: null,
                fn_init: function (init) {
                    this.filing_setup.$html.append(this.form_filing_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_unloading_cars] [form_filing_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });
            //-------------------------------------------------------------------
            // Создадим форму (this.filing_wagons_setup)
            this.form_filing_wagons_setup = new FD();
            // Создать макет панели
            var objs_filing_wagons_setup = [];
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
            var bt_bt_add = {
                obj: 'bs_button',
                options: {
                    id: null,
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vounl_title_form_add', App.Langs),
                    title: langView('vounl_title_form_add_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-square-plus',  //<i class="fa-regular fa-square-plus"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        //this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_bt_apply = {
                obj: 'bs_button',
                options: {
                    id: null,
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vounl_title_form_apply', App.Langs),
                    title: langView('vounl_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var form_input_datetime_time_start = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'time_start',
                    name: 'time_start',
                    label: langView('vounl_title_time_start', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vounl_title_placeholder_time_start', App.Langs),
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
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vounl_text_time_start', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datetime_time_stop = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'time_stop',
                    name: 'time_stop',
                    label: langView('vounl_title_time_stop', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vounl_title_placeholder_time_stop', App.Langs),
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
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vounl_text_time_stop', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_devision_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_devision_on',
                    name: 'id_devision_on',
                    label: langView('vounl_title_label_devision_on', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: true,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.list_devision_on,
                        default: 1,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            //this.update(id, -1, function () {
                            //    LockScreenOff();
                            //}.bind(this));
                        }.bind(this),
                        fn_check: function (text) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vounl_text_label_devision_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_status_load = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_status_load',
                    name: 'id_status_load',
                    label: langView('vounl_title_label_status_load', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: true,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.list_status_load,
                        default: 1,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            //this.update(id, -1, function () {
                            //    LockScreenOff();
                            //}.bind(this));
                        }.bind(this),
                        fn_check: function (text) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vounl_text_label_status_load', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_station_amkr_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_station_amkr_on',
                    name: 'id_station_amkr_on',
                    label: langView('vounl_title_label_station_amkr_on', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: true,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.list_station_amkr_on,
                        default: 1,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            //this.update(id, -1, function () {
                            //    LockScreenOff();
                            //}.bind(this));
                        }.bind(this),
                        fn_check: function (text) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vounl_text_label_station_amkr_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            col_bt_apply.childs.push(bt_bt_add);
            col_bt_apply.childs.push(bt_bt_apply);
            objs_filing_wagons_setup.push(col_bt_apply);
            objs_filing_wagons_setup.push(form_input_datetime_time_start);
            objs_filing_wagons_setup.push(form_input_datetime_time_stop);
            objs_filing_wagons_setup.push(form_select_devision_on);
            objs_filing_wagons_setup.push(form_select_status_load);
            objs_filing_wagons_setup.push(form_select_station_amkr_on);

            this.form_filing_wagons_setup.init({
                alert: this.main_alert,
                objs: objs_filing_wagons_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        if (valid) {
                            var wagons = this.wagons.filter(function (i) { return i.id_wir_from !== null; });// получить вагоны
                            this.view_com.mcf.open(
                                langView('vounl_title_form_apply', App.Langs),
                                langView('vounl_confirm_mess_apply_outgoing_wagons', App.Langs).format(this.form_from_setup.el.select_id_station_unload.text(), (wagons ? wagons.length : 0), this.form_from_setup.el.select_id_way_unload.text(), this.form_filing_wagons_setup.el.select_id_way_on.text()),
                                function () {
                                    // Принять
                                    // Проверим наличие вагонов 
                                    var list_wagons = [];
                                    if (wagons && wagons.length > 0) {
                                        // Получим перечень вагонов и новую позицию
                                        $.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
                                            list_wagons.push({ wir_id: el.wirId, position: el.position_new })
                                        }.bind(this));
                                        // Сформируем операцию
                                        var operation = {
                                            id_way_unload: this.id_way_unload,
                                            wagons: list_wagons,
                                            id_way_on: this.id_way_on,
                                            head: this.head,
                                            lead_time: result.new.input_datetime_time_aplly._i,
                                            locomotive1: result.new.datalist_locomotive1,
                                            locomotive2: result.new.datalist_locomotive2,
                                        };
                                        this.apply(operation);
                                    }
                                }.bind(this),
                                function () {
                                    this.form_filing_wagons_setup.validation_common.out_warning_message(langView('vounl_mess_cancel_operation', App.Langs));
                                }.bind(this));
                        }
                    }
                }.bind(this),
                fn_html_init: function (res) { }.bind(this),
                fn_element_init: null,
                fn_init: function (init) {
                    this.filing_wagons_setup.$html.append(this.form_filing_wagons_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_unloading_cars] [form_on_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            //var row_wagons_on = new this.view_com.fe_ui.bs_row({ id: 'op-odl-wagons-on', class: 'pt-2' });
            //this.filing_wagons_table.$html.append(row_wagons_on.$html);

            //-------------------------------------------------------------------
            // Создадим форму (this.from_way_setup)
            this.form_from_setup = new FD();
            // Создать макет панели
            var objs_from_setup = [];

            var form_select_way_unload = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_from',
                    id: 'id_way_unload',
                    name: 'id_way_unload',
                    label: langView('vounl_title_label_way_from', App.Langs),
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
                        default: this.id_way_unload,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            this.update(this.id_station_unload, id, function () {
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
                    form_text: langView('vounl_text_label_way_from', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            objs_from_setup.push(form_select_way_unload);
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
                    //console.log('[view_op_unloading_cars] [form_from_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_out_cars_way = new this.view_com.fe_ui.bs_row({ id: 'op-unlc-wagons-from', class: 'pt-2' });
            this.from_way_table.$html.append(row_out_cars_way.$html);

            this.twfrom_unlc = new TWS('div#op-unlc-wagons-from');
            this.twfrom_unlc.init({
                alert: this.from_way_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'unload_cars_from',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.twfrom_unlc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.position_new === null && !data.outgoingSostavStatus;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'add_sostav',
                        action: function (e, dt, node, config) {
                            this.twfrom_unlc.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_unloading_cars] [tocw_opoc] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.from_way_alert.clear_message();
                    if (rowData && rowData.length > 0) {
                        if (rowData[0].outgoingSostavStatus > 0) {
                            e.preventDefault();
                            this.from_way_alert.out_warning_message(langView('vounl_mess_warning_wagon_ban_status', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus));
                        }
                        if (rowData[0].id_wir_unload !== null) {
                            e.preventDefault();
                            this.from_way_alert.out_warning_message(langView('voprc_mess_warning_wagon_ban_filing_way', App.Langs).format(rowData[0].num));
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
                    if (name === 'add_sostav') {
                        this.from_way_alert.clear_message();
                        if (this.id_way_unload >= 0) {
                            var rows = this.twfrom_unlc.tab_com.get_select_row();
                            if (rows !== null && rows.length > 0) {
                                LockScreen(langView('vounl_mess_create_filing', App.Langs));
                                // Выполнить операцию добавить вагоны
                                $.each(rows, function (i, el) {
                                    el['id_wir_unload'] = el.wirId;
                                }.bind(this));
                                this.view_wagons(); // Обновить вагоны на пути приема
                                LockScreenOff();
                            } else {
                                this.from_way_alert.out_warning_message(langView('vounl_mess_not_select_wagon_from', App.Langs));

                            }
                        } else {
                            this.from_way_alert.out_warning_message(langView('vounl_mess_not_select_way_from', App.Langs));
                        }


                    }
                }.bind(this),
                fn_enable_button: function (tb) {

                }.bind(this),
            });

        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    view_op_unloading_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vounl_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_filing_wagons_setup.clear_all();
        // Сбросим установки (время)
        this.form_filing_wagons_setup.el.input_datetime_time_start.val(moment());
        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
        this.form_filing_setup.clear_all();
        this.form_filing_setup.clear_all();
        this.wagons = [];
        // Сбросим вагоны переноса
        this.id_station_unload = -1;
        var id_station = -1;
        this.id_way_unload = -1;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_filing_setup.el.select_id_station_unload.val(id_station);
            }
        };
        this.update(id_station, id_way, function () {
            LockScreenOff();
        }.bind(this));
    };

    // Проверка вагоны выбраны?
    view_op_unloading_cars.prototype.isAddWagon = function (callback_ok, callback_not) {
        var wagons_add = this.wagons.filter(function (i) {
            return i.id_wir_unload !== null;
        }.bind(this));
        if (wagons_add && wagons_add.length > 0) {
            if (typeof callback_ok === 'function') {
                callback_ok(wagons_add.length);
            }
        } else {
            if (typeof callback_not === 'function') {
                callback_not(0);
            }
        }
    }
    // Обновить все
    view_op_unloading_cars.prototype.update = function (id_station, id_way_unload, callback) {
        // Обновим состояние станции
        this.update_station(id_station, id_way_unload, function () {
            this.view_wagons();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновим состояние станции
    view_op_unloading_cars.prototype.update_station = function (id_station, id_way, callback) {
        this.confirm_update_station(id_station,
            function () { // Ok
                // обновим компонент пути отправки
                this.list_way = this.view_com.api_dir.getListValueTextLoadUnloadWaysOfStation(id_station);
                this.form_from_setup.el.select_id_way_unload.update(this.list_way, id_way);
                // Обновим станцию
                this.id_station_unload = id_station;
                // Загрузим подачи по станции
                this.load_of_filing_wagon(id_station, function () {
                    // Не сбрасывать в начале
                    if (this.id_way_unload > 0) {
                        id_way = -1;
                    }
                    // Обновим пути
                    this.update_from_way(id_way,
                        function () {
                            if (typeof callback === 'function') {
                                callback(true);
                            }
                        }.bind(this)
                    );
                }.bind(this));

            }.bind(this),
            function () { // Cancel
                // Обновим данные на пути
                this.update_from_way(id_way,
                    function () {
                        if (typeof callback === 'function') {
                            callback(false);
                        }
                    }.bind(this)
                );
            }.bind(this));
    }
    // Проверка и подтверждение изменений по станции
    view_op_unloading_cars.prototype.confirm_update_station = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station_unload !== id_station) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vounl_confirm_title', App.Langs),
                        langView('vounl_confirm_mess_change_station', App.Langs).format(this.form_on_setup.el.select_id_station_unload.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_from_setup.el.select_id_station_unload.val(this.id_station_unload);
                            if (typeof callback_cancel === 'function') {
                                callback_cancel();
                            }
                        }.bind(this)
                    );
                }.bind(this),
                function () {
                    // нет выбранных вагонов
                    if (typeof callback_ok === 'function') {
                        callback_ok();
                    }
                }.bind(this)
            );
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Обновим вагоны на пути отправки
    view_op_unloading_cars.prototype.update_from_way = function (id_way, callback) {
        this.confirm_update_way_from(id_way,
            function () { // Ok
                // выберим путь на компоненте пути отправки
                this.form_from_setup.el.select_id_way_unload.val(id_way);
                this.load_of_way(id_way, function () {
                    if (typeof callback === 'function') {
                        callback(true);
                    }
                }.bind(this));

            }.bind(this),
            function () { // Cancel
                if (typeof callback === 'function') {
                    callback(false);
                }
            }.bind(this));
    }
    // Проверка и подтверждение изменений по пути отправки
    view_op_unloading_cars.prototype.confirm_update_way_from = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way_unload !== id_way) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vounl_confirm_title', App.Langs),
                        langView('vounl_confirm_mess_change_way', App.Langs).format(this.form_from_setup.el.select_id_way_unload.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_from_setup.el.select_id_way_unload.val(this.id_way);
                            if (typeof callback_cancel === 'function') {
                                callback_cancel();
                            }
                        }.bind(this)
                    );
                }.bind(this),
                function () {
                    // нет выбранных вагонов
                    if (typeof callback_ok === 'function') {
                        callback_ok();
                    }
                }.bind(this)
            );
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Загрузить вагоны на выбраном пути начала дислокации в масив this.wagons (подготовить поля для вагонов приема)
    view_op_unloading_cars.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way_unload = id_way;
            LockScreen(langView('vounl_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = null;
                        el['id_wir_unload'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.id_way_unload = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    view_op_unloading_cars.prototype.load_of_filing_wagon = function (id_station, callback) {
        if (id_station !== null && id_station >= 0) {
            LockScreen(langView('vounl_mess_load_filing_wagon', App.Langs));
            this.view_com.api_wsd.getViewWagonsFilingOfPeriodIdStation(this.start, this.stop, id_station, function (wagons) {
                this.sostav_filing = [];
                $.each(wagons, function (key, el) {
                    var st = this.sostav_filing.find(function (o) {
                        return $.trim(o.idWf) === $.trim(el.idWf);
                    }.bind(this));
                    if (!st) {
                        this.sostav_filing.push({
                            idWf: el.idWf,
                            statusFiling: (el.filingCreate !== null ? (el.filingClose !== null ? 2 : 1) : 0),
                            numFiling: el.numFiling,
                            filingIdStation: el.filingIdStation,
                            filingStationNameRu: el.filingStationNameRu,
                            filingStationNameEn: el.filingStationNameEn,
                            filingStationAbbrRu: el.filingStationAbbrRu,
                            filingStationAbbrEn: el.filingStationAbbrEn,
                            filingIdPark: el.filingIdPark,
                            filingParkNameRu: el.filingParkNameRu,
                            filingParkNameEn: el.filingParkNameEn,
                            filingParkAbbrRu: el.filingParkAbbrRu,
                            filingParkAbbrEn: el.filingParkAbbrEn,
                            filingIdWay: el.filingIdWay,
                            filingWayNumRu: el.filingWayNumRu,
                            filingWayNumEn: el.filingWayNumEn,
                            filingWayNameRu: el.filingWayNameRu,
                            filingWayNameEn: el.filingWayNameEn,
                            filingWayAbbrRu: el.filingWayAbbrRu,
                            filingWayAbbrEn: el.filingWayAbbrEn,
                            countFilingWagons: 1,
                            countUnloadingWagons: el.filingWayEnd !== null ? 1 : 0,
                            arrivalDivisionAmkrCode: el.arrivalDivisionAmkrCode,
                            arrivalDivisionAmkrNameRu: el.arrivalDivisionAmkrNameRu,
                            arrivalDivisionAmkrNameEn: el.arrivalDivisionAmkrNameEn,
                            arrivalDivisionAmkrAbbrRu: el.arrivalDivisionAmkrAbbrRu,
                            arrivalDivisionAmkrAbbrEn: el.arrivalDivisionAmkrAbbrEn,
                            filingCreate: el.filingCreate,
                            filingCreateUser: el.filingCreateUser,
                            filingChange: el.filingChange,
                            filingChangeUser: el.filingChangeUser,
                            filingClose: el.filingClose,
                            filingCloseUser: el.filingCloseUser,

                        });
                    } else {
                        st.countFilingWagons++;
                        st.countUnloadingWagons += (el.filingWayEnd !== null ? 1 : 0);
                    }
                }.bind(this));
                this.wagons_filing = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons_filing);
                }
            }.bind(this));
        } else {
            this.wagons_filing = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons_filing);
            }
        }
    };
    // Загрузить вагоны на выбраном пути приема дислокции в масив this.wagons_on 
    //view_op_unloading_cars.prototype.load_of_way_on = function (id_way_on, callback) {
    //    if (id_way_on !== null && id_way_on >= 0) {
    //        this.id_way_on = id_way_on;
    //        LockScreen(langView('vounl_mess_load_wagons', App.Langs));
    //        this.view_com.api_wsd.getViewWagonsOfIdWay(id_way_on, function (wagons) {
    //            // модифицировать данные взависимости от отчета
    //            if (wagons) {
    //                $.each(wagons, function (i, el) {
    //                    el['position_new'] = el.position;
    //                    el['id_wir_from'] = null;
    //                });
    //            }
    //            this.wagons_on = wagons;
    //            // Событие обновили данные
    //            if (typeof callback === 'function') {
    //                callback(this.wagons_on);
    //            }
    //        }.bind(this));
    //    } else {
    //        this.id_way_on = -1;
    //        this.wagons_on = [];
    //        // Событие обновили данные
    //        if (typeof callback === 'function') {
    //            callback(this.wagons_on);
    //        }
    //    }
    //};
    // Показать все (сотавы, вагоны)
    view_op_unloading_cars.prototype.view_wagons = function () {
        // Очистить сообщения и форму
        this.form_filing_wagons_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать вагоны на пути начала дислокации
        this.view_wagons_from();
        //// Показать вагоны на пути дислокации
        //this.view_wagons_on();
    };
    // Показать вагоны на пути начала дислокации
    view_op_unloading_cars.prototype.view_wagons_from = function () {
        var wagons = this.wagons;
        if (this.twfrom_unlc.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wir_from === null;
            });
        }
        this.twfrom_unlc.view(wagons, null);
    };
    // Показать список подач
    view_op_unloading_cars.prototype.view_filing = function () {
        var wagons_filing = this.wagons_filing;
        var wagons = this.wagons;
        var wagons_filing_add = wagons_filing.filter(function (i) {
            return i.id_wir_unload !== null;
        });
        if (wagons_filing_add !== null && wagons_filing_add.length > 0) {
            wagons_filing.push({
                idWf: 0,
                statusFiling: 0,
                numFiling: null,
                filingIdStation: this.id_station_unload,
                filingStationNameRu: el.filingStationNameRu,
                filingStationNameEn: el.filingStationNameEn,
                filingStationAbbrRu: el.filingStationAbbrRu,
                filingStationAbbrEn: el.filingStationAbbrEn,
                filingIdPark: el.filingIdPark,
                filingParkNameRu: el.filingParkNameRu,
                filingParkNameEn: el.filingParkNameEn,
                filingParkAbbrRu: el.filingParkAbbrRu,
                filingParkAbbrEn: el.filingParkAbbrEn,
                filingIdWay: this.id_way_unload,
                filingWayNumRu: el.filingWayNumRu,
                filingWayNumEn: el.filingWayNumEn,
                filingWayNameRu: el.filingWayNameRu,
                filingWayNameEn: el.filingWayNameEn,
                filingWayAbbrRu: el.filingWayAbbrRu,
                filingWayAbbrEn: el.filingWayAbbrEn,
                countFilingWagons: 1,
                countUnloadingWagons: el.filingWayEnd != null ? 1 : 0,
                arrivalDivisionAmkrCode: el.arrivalDivisionAmkrCode,
                arrivalDivisionAmkrNameRu: el.arrivalDivisionAmkrNameRu,
                arrivalDivisionAmkrNameEn: el.arrivalDivisionAmkrNameEn,
                arrivalDivisionAmkrAbbrRu: el.arrivalDivisionAmkrAbbrRu,
                arrivalDivisionAmkrAbbrEn: el.arrivalDivisionAmkrAbbrEn,
                filingCreate: el.filingCreate,
                filingCreateUser: el.filingCreateUser,
                filingChange: el.filingChange,
                filingChangeUser: el.filingChangeUser,
                filingClose: el.filingClose,
                filingCloseUser: el.filingCloseUser,

            });
        }


        if (this.twfrom_unlc.tab_com.eye) {
            wagons_filing_add = wagons_filing.filter(function (i) {
                return i.id_wir_unload !== null;
            });
        }

        //this.twfrom_unlc.view(wagons, null);
    };

    //// Показать вагоны на пути начала дислокации
    //view_op_unloading_cars.prototype.view_wagons_on = function () {
    //    var wagons = [];
    //    if (this.id_way_on !== null && this.id_way_on >= 0) {
    //        // Выполнить операцию добавить вагоны
    //        var wagons_add = this.wagons.filter(function (i) {
    //            return i.id_wir_from !== null;
    //        }.bind(this));
    //        //var wagon_max_position = null;
    //        if (wagons_add !== null && wagons_add.length > 0) {
    //            if (this.reverse) {
    //                wagons_add.sort(function (a, b) { return b.position - a.position });
    //            } else {
    //                wagons_add.sort(function (a, b) { return a.position - b.position });
    //            }
    //            var position = 1;
    //            if (this.head) {
    //                $.each(wagons_add, function (i, el) {
    //                    el['position_new'] = position;
    //                    position++;
    //                }.bind(this));
    //                $.each(this.wagons_on, function (i, el) {
    //                    el['position_new'] = position;
    //                    position++;
    //                }.bind(this));
    //                wagons = wagons_add.concat(this.wagons_on);
    //            } else {
    //                $.each(this.wagons_on, function (i, el) {
    //                    el['position_new'] = position;
    //                    position++;
    //                }.bind(this));
    //                $.each(wagons_add, function (i, el) {
    //                    el['position_new'] = position;
    //                    position++;
    //                }.bind(this));
    //                wagons = this.wagons_on.concat(wagons_add);
    //            }
    //        } else {
    //            wagons = this.wagons_on;
    //        };
    //        // Добавить выбранные вагоны
    //        if (this.twon_opodl.tab_com.eye) {
    //            wagons = wagons.filter(function (i) {
    //                return i.id_wir_from !== null;
    //            });
    //        }
    //    };
    //    this.twon_opodl.view(wagons, null);
    //};
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_unloading_cars.prototype.validation = function (result) {
        var valid = true;
        // Проверим локомотивы
        var loc1 = this.form_filing_wagons_setup.el.datalist_locomotive1.text();
        var loc2 = this.form_filing_wagons_setup.el.datalist_locomotive2.text();
        var el_loc1 = this.form_filing_wagons_setup.el.datalist_locomotive1.$element;
        var el_loc2 = this.form_filing_wagons_setup.el.datalist_locomotive2.$element;
        var el_dta = this.form_filing_wagons_setup.el.input_datetime_time_aplly.$element;
        if (loc1 === loc2) {
            this.form_filing_wagons_setup.validation_common.set_object_error($(el_loc1), langView('vounl_mess_error_equal_locomotive', App.Langs));
            this.form_filing_wagons_setup.validation_common.set_object_error($(el_loc2), langView('vounl_mess_error_equal_locomotive', App.Langs));
            valid = false;
        } else {
            if (result.new && !result.new.datalist_locomotive1 && (loc1 !== null || loc1 !== '')) {
                this.form_filing_wagons_setup.validation_common.set_object_error($(el_loc1), langView('vounl_mess_error_not_locomotive', App.Langs).format(loc1));
                valid = false;
            }
            if ((loc2 !== null && loc2 !== '') && result.new && result.new.locomotive2 === null) {
                this.form_filing_wagons_setup.validation_common.set_object_error($(el_loc2), langView('vounl_mess_error_not_locomotive', App.Langs).format(loc2));
                valid = false;
            }
        }
        // Проверим время
        if (result.new && result.new.input_datetime_time_aplly) {
            var curr = moment();
            var aplly = moment(result.new.input_datetime_time_aplly);
            var minutes = aplly.diff(curr, 'minutes');
            if (minutes < min_dt_apply) {
                this.form_filing_wagons_setup.validation_common.set_object_error($(el_dta), langView('vounl_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                valid = false;
            }
            if (minutes > max_dt_apply) {
                this.form_filing_wagons_setup.validation_common.set_object_error($(el_dta), langView('vounl_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                valid = false;
            }
        }
        // Проверим состав
        var wagons = this.wagons.filter(function (i) {
            return i.id_wir_from !== null;
        });
        if (wagons === null || wagons.length === 0) {
            this.form_filing_wagons_setup.validation_common.out_error_message(langView('vounl_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_op_unloading_cars.prototype.apply = function (data) {
        LockScreen(langView('vounl_mess_run_operation_dislocation', App.Langs));
        this.view_com.api_wsd.postDislocationWagonsOfStationAMKR(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[view_op_unloading_cars] [postDislocationWagonsOfStationAMKR] :' + mess);
                this.form_filing_wagons_setup.validation_common.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_filing_wagons_setup.validation_common.out_error_message(err + ":" + result.errors[err]);
                        console.log('[view_op_unloading_cars] [postDislocationWagonsOfStationAMKR] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                if (result && result.result > 0) {
                    this.form_filing_wagons_setup.validation_common.clear_all();
                    // Сбросим установки (время и локомотивы)
                    this.form_filing_wagons_setup.el.datalist_locomotive1.val('');
                    this.form_filing_wagons_setup.el.datalist_locomotive2.val('');
                    this.form_filing_wagons_setup.el.input_datetime_time_aplly.val(moment());
                    this.head = false;              // Признак голова(true)\хвост(false), по умолчанию хвост
                    this.reverse = false;
                    var pr_2 = 2;
                    var out_pr2 = function (pr_2) {
                        if (pr_2 === 0) {
                            this.view_wagons();
                            this.form_filing_wagons_setup.validation_common.out_info_message(langView('vounl_mess_ok_operation', App.Langs).format(result.moved));
                            if (typeof this.settings.fn_db_update === 'function') {
                                //TODO: можно добавить возвращать перечень для обновления
                                typeof this.settings.fn_db_update();
                            }
                            LockScreenOff();
                        }
                    }.bind(this);
                    // Обновим пути отправки 1 поток
                    this.load_of_way(this.id_way_unload, function () {
                        pr_2--;
                        out_pr2(pr_2);
                    }.bind(this));
                    // Обновим пути приема 2 поток
                    this.load_of_way_on(this.id_way_on, function () {
                        pr_2--;
                        out_pr2(pr_2);
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.form_filing_wagons_setup.validation_common.out_error_message(langView('vounl_mess_error_operation_run', App.Langs).format(result ? result.result : -1));
                    // Выведем ошибки по вагонно.
                    if (result && result.list_rs) {
                        $.each(result.listResult, function (i, el) {
                            if (el.result <= 0) this.form_filing_wagons_setup.validation_common.out_error_message(langView('vounl_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                        }.bind(this));
                    }

                }
            }
        }.bind(this));
    };
    // Очистить сообщения
    view_op_unloading_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    view_op_unloading_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_unloading_cars = view_op_unloading_cars;

    window.App = App;

})(window);
