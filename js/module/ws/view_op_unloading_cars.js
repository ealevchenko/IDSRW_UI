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

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vopulc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ВЫГРУЗКА ВАГОНОВ"',

            'vopulc_title_form_add': 'Создать подачу',
            'vopulc_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            'vopulc_title_form_apply': 'Править подачу',
            'vopulc_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            'vopulc_title_form_operation_apply': 'Править операцию',
            'vopulc_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            'vopulc_title_time_start': 'Время начала',
            'vopulc_text_time_start': 'Время начала операции ограниченно +(-)1день',
            'vopulc_title_placeholder_time_start': 'Время начала',

            'vopulc_title_time_stop': 'Время окончания',
            'vopulc_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            'vopulc_title_placeholder_time_stop': 'Время окончания',
 
            'vopulc_title_label_devision_from': 'Цех получатель. ТЕКУЩ:',
            'vopulc_title_placeholder_devision_from': 'Цех пол. ТЕКУЩ',
            'vopulc_text_label_devision_from': 'Выберите цех пол. ТЕКУЩИЙ ...',

            'vopulc_title_label_status_load': 'Статус:',
            'vopulc_text_label_status_load': 'Выберите статус (груж./порож.)...',
            'vopulc_title_label_station_amkr_on': 'Станция приб. АМКР:',
            'vopulc_text_label_station_amkr_on': 'Выберите станцию приб. АМКР...',

            'vopulc_title_button_new_filing': 'Создать черновик',
            'vopulc_title_button_add_filing': 'Добавить в подачу',

            'vopulc_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            'vopulc_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать операцию, для этого укажите дату начала операции и по необходимости дату завершения, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            'vopulc_mess_info_filing': 'Выбрана подача. Чтобы исправить цех выгрузки укажите новый цех и нажмите «Править подачу». Чтобы выполнить операции над вагонами выберите вагон(ы).',
            'vopulc_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            'vopulc_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции и по необходимости дату завершения и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны», если нужно выбрать вагоны с открытыми и закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopulc_mess_info_wagon_mode_1': 'Выбран(ы) вагоны, по которым открыта операция. Укажите дату завершения операции и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с открытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopulc_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция. Вы можете править только статус, укажите другой статус и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с закрытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopulc_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача. Операции не доступны!',
            'vopulc_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',

            'vopulc_mess_valid_devision': 'Указанного цеха нет в справочнике ИДС',
            'vopulc_mess_valid_not_devision': 'Укажите цех',

            'vopulc_mess_error_time_aplly': 'Укажите дату завершения операции',
            'vopulc_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты выполнения последней операции [{0}]',
            'vopulc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            'vopulc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'vopulc_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            'vopulc_mess_error_not_wagons_close_filing': 'Выберите вагоны для завершения операции вподаче (в окне «ВАГОНЫ В ПОДАЧЕ», выберите вагоны).',
            'vopulc_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',
            'vopulc_mess_error_filing_division': 'Выберите цех получатель',
            'vopulc_mess_error_filing_station_amkr': 'Выберите станцию выгрузки',
            'vopulc_mess_error_period_time': 'Операция должна длиться не менее {0} мин.',
            'vopulc_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',

            'vopulc_mess_cancel_operation_mode_0': 'Отмена операции создать подачу для "ВЫГРУЗКИ ВАГОНОВ"!',
            'vopulc_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ВЫГРУЗКИ ВАГОНОВ"!',
            'vopulc_mess_cancel_operation_mode_2': 'Отмена операции начала "ВЫГРУЗКИ" над вагонами подачи!',
            'vopulc_mess_cancel_operation_mode_3': 'Отмена завершения операции "ВЫГРУЗКИ" над вагонами подачи!',
            'vopulc_mess_cancel_operation_mode_4': 'Отмена правки статуса вагона после "ВЫГРУЗКИ"!',

            'vopulc_mess_load_operation': 'Загружаю операции...',

            'vopulc_mess_init_panel': 'Выполняю инициализацию модуля ...',

            'vopulc_confirm_title': 'Внимание!',
            'vopulc_confirm_mess_apply_create_filing': 'Создать подачу для операции "ВЫГРУЗКА ВАГОНОВ" на станции {0}, на пути {1}, в подразделении {2}? Определено для подачи {3} ваг., определено для выгрузки {4} ваг., закрыта выгрузка по {5} вагонам.',
            'vopulc_confirm_mess_apply_update_filing': 'Править подачу {0}, выбрана станция АМКР: {1}, выбранно подразделение: {2}? Станция и подразделение будет обновлено по всем вагонам подачи!',
            'vopulc_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала выгрузки {2} ваг., закрыта выгрузка по {3} вагонам.',
            'vopulc_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}. Определено для правки {1} ваг., закрыта выгрузка по {2} вагонам.',
            'vopulc_confirm_mess_apply_update_filing_status_operation': 'Править подачу {0}. Определено для правки {1} ваг., указан новый статус {2}.',
            'vopulc_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути {0}?.',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // js/module/view_op_common.js
    var VIEW_COMMON = App.view_op_common;
    var VIEW_CFILING = App.view_op_common_filing;

    var ALERT = App.alert_form;
    var FD = App.form_dialog;
    // js/module/ws/table_ws.js
    var TWS = App.table_ws;
    function view_op_unloading_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
        this.cfiling = new VIEW_CFILING();
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
        // Инициализация при старте (обявдение доп переменных)
        var start_init = function () {
            this.select_devision_from = null;       // Выбранный элемент

            this.default_status_unload = App.wsd_setup.loading_status.empty;;

            this.validation_exist_divisions = function (code, id, not_null, not_alert) {
                // Нет данных
                var fn_out_null = function (not_null) {
                    // нет входных данных данных
                    if (not_null) {
                        this.form_filing_wagons_setup.set_element_validation_error(id, langView('vopulc_mess_valid_not_devision', App.Langs), not_alert);
                        return false;
                    } else {
                        this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                        return true;
                    }
                }
                // Нет данных в базе данных
                var fn_out_undefined = function () {
                    this.form_filing_wagons_setup.set_element_validation_error(id, langView('vopulc_mess_valid_devision', App.Langs), not_alert);
                    return false;
                }
                // Ок
                var fn_out_ok = function () {
                    // Ок
                    this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                    return true;
                }
                // Проверка
                if (code === null) {
                    return fn_out_null.call(this, not_null);
                }
                if (code === undefined) {
                    // Нет в базе
                    return fn_out_undefined.call(this);
                }
                this.select_devision_from = this.view_com.api_dir.getExistDivisions(code, null);
                if (this.select_devision_from) {
                    return fn_out_ok.call(this);
                } else {
                    if (this.select_devision_from === null) {
                        return fn_out_undefined.call(this);
                    } else {
                        return fn_out_null.call(this, not_null);
                    }
                }
            }
            // Получить операцию в зависимости от статуса загрузки (Переделать через базу)
            this.get_operation_of_status_load = function (id_status) {
                if (id_status === App.wsd_setup.loading_status.loaded_arr || id_status === App.wsd_setup.loading_status.loaded_uz) {
                    this.default_status_unload = App.wsd_setup.loading_status.empty;
                    return App.wsd_setup.operations.unloading_uz;

                }
                if (id_status === App.wsd_setup.loading_status.loaded_ip) {
                    this.default_status_unload = App.wsd_setup.loading_status.empty;
                    return App.wsd_setup.operations.unloading_if;
                }
                if (id_status === App.wsd_setup.loading_status.tech_malfunction || id_status === App.wsd_setup.loading_status.frozen || id_status === App.wsd_setup.loading_status.re_edging) {
                    this.default_status_unload = App.wsd_setup.loading_status.empty;
                    return App.wsd_setup.operations.unloading_uz;
                }
                return null;
            }
        }
        // Загрузка дополнительных библиотек ()
        var load_db_operation = function (callback) {
            if (typeof callback === 'function') {
                callback();
            }
        }
        // Продолжение инициализации после загрузки всех библиотек (привязка к новым переменным)
        var after_loading_init = function (callback) {

            this.id_operation_default = null;
            this.list_status_unload = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(this.settings.wagon_operation);
            if (typeof callback === 'function') {
                callback();
            }
        }
        // Инициализация формы выбора периода и станции подач
        var init_form_filing_setup = function (callback) {
            //-------------------------------------------------------------------
            // Создадим форму (this.filing_setup)
        }
        // Инициализация формы правки вагонов в подаче
        var init_form_filing_wagons_setup = function (callback) {
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
            var bt_bt_add = {
                obj: 'bs_button',
                options: {
                    id: 'filing_add',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vopulc_title_form_add', App.Langs),
                    title: langView('vopulc_title_form_add_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-square-plus',  //<i class="fa-regular fa-square-plus"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_bt_apply = {
                obj: 'bs_button',
                options: {
                    id: 'filing_apply',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vopulc_title_form_apply', App.Langs),
                    title: langView('vopulc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_bt_operation = {
                obj: 'bs_button',
                options: {
                    id: 'operation_apply',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vopulc_title_form_operation_apply', App.Langs),
                    title: langView('vopulc_title_form_operation_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
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

            var form_input_datetime_time_start = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'time_start',
                    name: 'time_start',
                    label: langView('vopulc_title_time_start', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopulc_title_placeholder_time_start', App.Langs),
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
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vopulc_text_time_start', App.Langs),
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
                    label: langView('vopulc_title_time_stop', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopulc_title_placeholder_time_stop', App.Langs),
                    element_required: false,
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
                            // Если открыты операции возможны 2 под-режима правка и закрытие
                            if (this.fw_status === 0 || this.fw_status === 1) {
                                this.view_setup_filing({ time_stop: dt._isValid });
                            }
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vopulc_text_time_stop', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datalist_devision_from = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_devision_from',
                    name: 'id_devision_from',
                    label: langView('vopulc_title_label_devision_from', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopulc_title_placeholder_devision_from', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_devision,
                        out_value: false,
                        out_group: true,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            this.validation_exist_divisions(set.value, 'id_devision_from', false, true);
                        }.bind(this),
                        fn_select: function (event, set, options) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('vopulc_text_label_devision_from', App.Langs),
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
                    label: langView('vopulc_title_label_status_load', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: false,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.list_status_unload,
                        default: 0,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
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
                    form_text: langView('vopulc_text_label_status_load', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_station_amkr_from = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_station_amkr_from',
                    name: 'id_station_amkr_from',
                    label: langView('vopulc_title_label_station_amkr_on', App.Langs),
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
                    form_text: langView('vopulc_text_label_station_amkr_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            col_bt_apply.childs.push(bt_bt_add);
            col_bt_apply.childs.push(bt_bt_apply);
            col_bt_apply.childs.push(bt_bt_operation);
            col_alert.childs.push(alert_info)
            objs_filing_wagons_setup.push(col_bt_apply);
            objs_filing_wagons_setup.push(col_alert);
            objs_filing_wagons_setup.push(form_input_datetime_time_start);
            objs_filing_wagons_setup.push(form_input_datetime_time_stop);
            objs_filing_wagons_setup.push(form_input_datalist_devision_from);
            objs_filing_wagons_setup.push(form_select_status_load);
            objs_filing_wagons_setup.push(form_select_station_amkr_from);

            this.form_filing_wagons_setup.init({
                alert: this.main_alert,
                objs: objs_filing_wagons_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка. Определим режим
                        var mode = null;
                        var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                        if (this.id_filing !== null) {
                            if (this.id_filing === 0) {
                                mode = 0;
                            } else {
                                if (!rows || rows.length === 0) {
                                    mode = 1;
                                } else {
                                    if (this.fw_status !== null) {
                                        mode = 2 + this.fw_status;
                                    }
                                }
                            }
                        }
                        if (mode !== null) {
                            var valid = this.validation(result, mode);
                            var dt_start = this.form_filing_wagons_setup.el.input_datetime_time_start.val();
                            var dt_stop = this.form_filing_wagons_setup.el.input_datetime_time_stop.val();
                            if (valid) {
                                var message = "";
                                switch (mode) {
                                    case 0: {
                                        message = langView('vopulc_confirm_mess_apply_create_filing', App.Langs).format(this.form_filing_setup.el.select_id_station_unload.text(),
                                            this.form_from_setup.el.select_id_way_unload.text(),
                                            this.form_filing_wagons_setup.el.datalist_id_devision_from.text(),
                                            (this.filing_wagons ? this.filing_wagons.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                        break;
                                    }
                                    case 1: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing', App.Langs).format(this.id_filing, this.form_filing_setup.el.select_id_station_unload.text(), this.form_filing_wagons_setup.el.datalist_id_devision_from.text());
                                        break;
                                    }
                                    case 2: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing_start_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                        break;
                                    }
                                    case 3: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing_stop_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                        break;
                                    }
                                    case 4: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing_status_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            this.form_filing_wagons_setup.el.select_id_status_load.text());
                                        break;
                                    }
                                }
                                this.view_com.mcf_lg.open(
                                    langView('vopulc_title_form_apply', App.Langs),
                                    message,
                                    function () {
                                        // Создать подачу
                                        if (mode === 0) {
                                            // Проверим наличие вагонов
                                            var list_wagons = [];
                                            if (this.filing_wagons && this.filing_wagons.length > 0) {
                                                // Получим перечень вагонов и новую позицию
                                                $.each(this.filing_wagons.sort(function (a, b) {
                                                    return a.position - b.position;
                                                }), function (i, el) {
                                                    var row = rows.find(function (o) { return o.num === el.num }.bind(this));
                                                    list_wagons.push(
                                                        {
                                                            id_wim: el.idWim,
                                                            start: row && dt_start ? result.new.input_datetime_time_start._i : null,        // можно править пока подача не закрыта
                                                            stop: row && dt_stop ? result.new.input_datetime_time_stop._i : null,           // можно править пока подача не закрыта
                                                            id_wagon_operations: row ? this.id_operation_default : null,
                                                            //id_wagon_operations: row ? el.currentCargoIdCargo === null ? App.wsd_setup.operations.unloading_uz : App.wsd_setup.operations.unloading_if : null,    // (13,14) можно править пока подача не закрыта
                                                            id_status_load: row ? Number(result.new.select_id_status_load) : null,         // можно править пока подача не закрыта

                                                            //row.moveCargoCreate !== null && row.moveCargoClose === null
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию

                                                var operation = {
                                                    id_filing: this.id_filing,              // 0 новая, >0 Правим существующую
                                                    num_filing: null,                       // для погрузки
                                                    type_filing: this.type_filing,          // 1 = выгрузка
                                                    vesg: null,                             // для погрузки
                                                    id_way: this.id_way_unload,             // !только новая подача
                                                    //id_division: this.division_from,          // можно править
                                                    id_division: Number(result.new.datalist_id_devision_from),
                                                    wagons: list_wagons
                                                };
                                                this.apply_add_filing(operation);
                                            }
                                        };
                                        // Править подачи
                                        if (mode === 1 && result.new.datalist_id_devision_from) {
                                            if (this.id_filing !== null) { }
                                            var operation = {
                                                id_filing: this.id_filing,
                                                mode: mode,
                                                id_division: Number(result.new.datalist_id_devision_from),
                                            };
                                            this.apply_update_filing(operation);
                                        };
                                        // Править открыть (закрыть) операцию
                                        if (mode === 2) {
                                            // Проверим наличие вагонов
                                            var list_wagons = [];
                                            if (rows && rows.length > 0 && this.id_filing !== null) {
                                                $.each(rows, function (i, el) {
                                                    list_wagons.push(
                                                        {
                                                            id_wim: el.idWim,
                                                            start: dt_start ? result.new.input_datetime_time_start._i : null,   // можно править пока подача не закрыта
                                                            stop: dt_stop ? result.new.input_datetime_time_stop._i : null,      // можно править пока подача не закрыта
                                                            id_wagon_operations: this.id_operation_default,
                                                            //id_wagon_operations: el.currentCargoIdCargo === null ? App.wsd_setup.operations.unloading_uz : App.wsd_setup.operations.unloading_if,     // (13,14) можно править пока подача не закрыта
                                                                 id_status_load: Number(result.new.select_id_status_load),           // можно править пока подача не закрыта
                                                            //clear_cargo: this.get_clear_cargo_of_status_load(Number(result.new.select_id_status_load))
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию

                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    mode: mode,
                                                    wagons: list_wagons
                                                };
                                                this.apply_update_operation_filing(operation);
                                            }
                                        };
                                        // Править закрыть операцию
                                        if (mode === 3) {
                                            // Проверим наличие вагонов
                                            var list_wagons = [];
                                            if (rows && rows.length > 0 && this.id_filing !== null) {
                                                $.each(rows, function (i, el) {
                                                    list_wagons.push(
                                                        {
                                                            id_wim: el.idWim,
                                                            start: null,
                                                            stop: dt_stop ? result.new.input_datetime_time_stop._i : null,           // можно править пока подача не закрыта
                                                            id_wagon_operations: el.currentIdOperation,
                                                            id_status_load: Number(result.new.select_id_status_load),            // можно править пока подача не закрыта
                                                            //clear_cargo: this.get_clear_cargo_of_status_load(Number(result.new.select_id_status_load))
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию

                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    mode: mode,
                                                    wagons: list_wagons
                                                };
                                                this.apply_update_operation_filing(operation);
                                            }
                                        };
                                        // Править закрытую операцию (статус)
                                        if (mode === 4) {
                                            // Проверим наличие вагонов
                                            var list_wagons = [];
                                            if (rows && rows.length > 0 && this.id_filing !== null) {
                                                $.each(rows, function (i, el) {
                                                    list_wagons.push(
                                                        {
                                                            id_wim: el.idWim,
                                                            start: null,
                                                            stop: null,                                                     // можно править пока подача не закрыта
                                                            id_wagon_operations: el.currentIdOperation,
                                                            id_status_load: Number(result.new.select_id_status_load),     // можно править пока подача не закрыта
                                                            //clear_cargo: null
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию
                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    mode: mode,
                                                    wagons: list_wagons
                                                };
                                                this.apply_update_operation_filing(operation);
                                            }
                                        };
                                    }.bind(this),
                                    function () {
                                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vopulc_mess_cancel_operation_mode_' + mode, App.Langs));
                                    }.bind(this)
                                );
                            }
                        }
                    }
                }.bind(this),
                fn_html_init: function (res) { }.bind(this),
                fn_element_init: null,
                fn_init: function (init) {
                    this.filing_wagons_setup.$html.append(this.form_filing_wagons_setup.$form);
                    var alsert_info = $('div#alert-info');
                    this.filing_wagons_alert_info = new ALERT(alsert_info);
                    if (typeof callback === 'function') {
                        callback();
                    }
                }.bind(this),
            });
        }
        // Инициализация формы вагонов на пути
        var init_form_from_setup = function (callback) {
            //-------------------------------------------------------------------
            // Создадим форму (this.from_way_setup)
        }
        // Завершенеие инициализации [this.cfiling]
        var out_init_cfiling = function () {
            // Выход с общей инициализации
            if (typeof this.settings.fn_init === 'function') {
                console.log('Close view_op_unloading_cars');

                this.settings.fn_init(this.result_init);
            }
        }
        // Получение строки подача из списка вагонов (для операции)
        var get_sostav_filing = function (row, station, way, park, division, wagons) {
            return {
                idFiling: row ? row.idFiling : 0,
                statusFiling: row ? (row.createFiling !== null ? (row.closeFiling !== null ? 2 : 1) : 0) : 0,
                numFiling: row ? row.numFiling : null,
                typeFiling: row ? row.typeFiling : this.type_filing,
                vesgFiling: row ? row.vesgFiling : null,
                docReceivedFiling: row ? row.docReceivedFiling : null,
                filingIdStation: row ? row.filingIdStation : this.id_station_unload,
                filingStationNameRu: row ? row.filingStationNameRu : station.stationNameRu,
                filingStationNameEn: row ? row.filingStationNameEn : station.stationNameEn,
                filingStationAbbrRu: row ? row.filingStationAbbrRu : station.stationAbbrRu,
                filingStationAbbrEn: row ? row.filingStationAbbrEn : station.stationAbbrEn,
                filingIdPark: row ? row.filingIdPark : park.id,
                filingParkNameRu: row ? row.filingParkNameRu : park.parkNameRu,
                filingParkNameEn: row ? row.filingParkNameEn : park.parkNameEn,
                filingParkAbbrRu: row ? row.filingParkAbbrRu : park.parkAbbrRu,
                filingParkAbbrEn: row ? row.filingParkAbbrEn : park.parkAbbrEn,
                filingIdWay: row ? row.filingIdWay : this.id_way_unload,
                filingWayNumRu: row ? row.filingWayNumRu : way.wayNumRu,
                filingWayNumEn: row ? row.filingWayNumEn : way.wayNumEn,
                filingWayNameRu: row ? row.filingWayNameRu : way.wayNameRu,
                filingWayNameEn: row ? row.filingWayNameEn : way.wayNameEn,
                filingWayAbbrRu: row ? row.filingWayAbbrRu : way.wayAbbrRu,
                filingWayAbbrEn: row ? row.filingWayAbbrEn : way.wayAbbrEn,
                filingWayIdDevision: row ? row.filingWayIdDevision : way.idDevision,
                countFilingWagons: row ? 1 : wagons.length,
                countUnloadingWagons: row ? (row.filingWayEnd !== null ? 1 : 0) : 0,
                filingDivisionIdDivision: row ? row.filingDivisionIdDivision : division ? division.id : null,
                filingDivisionCode: row ? row.filingDivisionCode : division ? division.code : null,
                filingDivisionNameRu: row ? row.filingDivisionNameRu : division ? division.nameDivisionRu : null,
                filingDivisionNameEn: row ? row.filingDivisionNameEn : division ? division.nameDivisionEn : null,
                filingDivisionAbbrRu: row ? row.filingDivisionAbbrRu : division ? division.divisionAbbrRu : null,
                filingDivisionAbbrEn: row ? row.filingDivisionAbbrEn : division ? division.divisionAbbrEn : null,
                startFiling: row ? row.startFiling : null,
                endFiling: row ? row.endFiling : null,
                createFiling: row ? row.createFiling : null,
                createUserFiling: row ? row.createUserFiling : null,
                changeFiling: row ? row.changeFiling : null,
                changeUserFiling: row ? row.changeUserFiling : null,
                closeFiling: row ? row.closeFiling : null,
                closeUserFiling: row ? row.closeUserFiling : null,
            }
        }
        // Получение строки вагона в подаче (для операции)
        var get_filing_wagons = function (row) {
            return {
                idWim: row.wimId,
                idWir: row.wirId,
                isMoving: 0,
                idFiling: 0,
                numFiling: null,
                note: null,
                startFiling: null,
                endFiling: null,
                createFiling: null,
                createUserFiling: null,
                changeFiling: null,
                changeUserFiling: null,
                closeFiling: null,
                closeUserFiling: null,
                num: row.num,
                position: row.position,
                filingWayStart: null,
                filingWayEnd: null,
                filingStart: null,
                filingEnd: null,
                filingWimCreate: null,
                filingWimCreateUser: null,
                filingWimClose: null,
                filingWimCloseUser: null,
                filingIdStation: null,
                filingStationNameRu: null,
                filingStationNameEn: null,
                filingStationAbbrRu: null,
                filingStationAbbrEn: null,
                filingIdPark: null,
                filingParkNameRu: null,
                filingParkNameEn: null,
                filingParkAbbrRu: null,
                filingParkAbbrEn: null,
                filingIdWay: null,
                filingWayNumRu: null,
                filingWayNumEn: null,
                filingWayNameRu: null,
                filingWayNameEn: null,
                filingWayAbbrRu: null,
                filingWayAbbrEn: null,
                filingWayCapacity: null,
                filingWayIdDevision: null,
                filingWayClose: null,
                filingWayDelete: null,
                filingWayNote: null,
                filingDivisionIdDivision: null,
                filingDivisionCode: null,
                filingDivisionNameRu: null,
                filingDivisionNameEn: null,
                filingDivisionAbbrRu: null,
                filingDivisionAbbrEn: null,
                wagonAdm: row.wagonAdm,
                wagonAdmNameRu: row.wagonAdmNameRu,
                wagonAdmNameEn: row.wagonAdmNameEn,
                wagonAdmAbbrRu: row.wagonAdmAbbrRu,
                wagonAdmAbbrEn: row.wagonAdmAbbrEn,
                wagonRod: row.wagonRod,
                wagonRodNameRu: row.wagonRodNameRu,
                wagonRodNameEn: row.wagonRodNameEn,
                wagonRodAbbrRu: row.wagonRodAbbrRu,
                wagonRodAbbrEn: row.wagonRodAbbrEn,
                wagonTypeRu: row.wagonTypeRu,
                wagonTypeEn: row.wagonTypeEn,
                idOperator: row.idOperator,
                operatorsRu: row.operatorsRu,
                operatorsEn: row.operatorsEn,
                operatorAbbrRu: row.operatorAbbrRu,
                operatorAbbrEn: row.operatorAbbrEn,
                operatorRentStart: row.operatorRentStart,
                operatorRentEnd: row.operatorRentEnd,
                operatorPaid: row.operatorPaid,
                operatorColor: row.operatorColor,
                operatorMonitoringIdleTime: row.operatorMonitoringIdleTime,
                idLimitingLoading: row.idLimitingLoading,
                limitingNameRu: row.limitingNameRu,
                limitingNameEn: row.limitingNameEn,
                limitingAbbrRu: row.limitingAbbrRu,
                limitingAbbrEn: row.limitingAbbrEn,
                arrivalConditionNameRu: row.arrivalConditionNameRu,
                arrivalConditionNameEn: row.arrivalConditionNameEn,
                arrivalConditionAbbrRu: row.arrivalConditionAbbrRu,
                arrivalConditionAbbrEn: row.arrivalConditionAbbrEn,
                arrivalConditionRed: row.arrivalConditionRed,
                currentConditionNameRu: row.currentConditionNameRu,
                currentConditionNameEn: row.currentConditionNameEn,
                currentConditionAbbrRu: row.currentConditionAbbrRu,
                currentConditionAbbrEn: row.currentConditionAbbrEn,
                currentConditionRed: row.currentConditionRed,
                arrivalCargoGroupNameRu: row.arrivalCargoGroupNameRu,
                arrivalCargoGroupNameEn: row.arrivalCargoGroupNameEn,
                arrivalCargoNameRu: row.arrivalCargoNameRu,
                arrivalCargoNameEn: row.arrivalCargoNameEn,
                arrivalIdSertificationData: row.arrivalIdSertificationData,
                arrivalSertificationDataRu: row.arrivalSertificationDataRu,
                arrivalSertificationDataEn: row.arrivalSertificationDataEn,
                arrivalStationFromCode: row.arrivalStationFromCode,
                arrivalStationFromNameRu: row.arrivalStationFromNameRu,
                arrivalStationFromNameEn: row.arrivalStationFromNameEn,
                arrivalStationAmkrIdStation: row.arrivalStationAmkrIdStation,
                arrivalStationAmkrNameRu: row.arrivalStationAmkrNameRu,
                arrivalStationAmkrNameEn: row.arrivalStationAmkrNameEn,
                arrivalStationAmkrAbbrRu: row.arrivalStationAmkrAbbrRu,
                arrivalStationAmkrAbbrEn: row.arrivalStationAmkrAbbrEn,
                arrivalDivisionAmkrIdDivision: row.arrivalDivisionAmkrIdDivision,
                arrivalDivisionAmkrCode: row.arrivalDivisionAmkrCode,
                arrivalDivisionAmkrNameRu: row.arrivalDivisionAmkrNameRu,
                arrivalDivisionAmkrNameEn: row.arrivalDivisionAmkrNameEn,
                arrivalDivisionAmkrAbbrRu: row.arrivalDivisionAmkrAbbrRu,
                arrivalDivisionAmkrAbbrEn: row.arrivalDivisionAmkrAbbrEn,
                currentIdLoadingStatus: row.currentIdLoadingStatus,
                currentLoadingStatusRu: row.currentLoadingStatusRu,
                currentLoadingStatusEn: row.currentLoadingStatusEn,
                currentIdOperation: row.currentIdOperation,
                currentOperationNameRu: row.currentOperationNameRu,
                currentOperationNameEn: row.currentOperationNameEn,
                currentOperationStart: row.currentOperationStart,
                currentOperationEnd: row.currentOperationEnd,
                //TODO: После исправления функции вагоны на пути
                // (будут добавлены новые поля текущий груз, тек цех пол, тек цех погр..)
                // а пока предварительно эти с null
                //-------------------------------------------------
                internalDocNum: row.internalDocNum,
                idWeighingNum: row.idWeighingNum,
                moveCargoDocReceived: row.moveCargoDocReceived,
                currentCargoIdGroup: row.currentCargoIdGroup,
                currentCargoGroupNameRu: row.currentCargoGroupNameRu,
                currentCargoGroupNameEn: row.currentCargoGroupNameEn,
                currentCargoIdCargo: row.currentCargoIdCargo,
                currentCargoNameRu: row.currentCargoNameRu,
                currentCargoNameEn: row.currentCargoNameEn,
                currentInternalCargoIdGroup: row.currentInternalCargoIdGroup,
                currentInternalCargoGroupNameRu: row.currentInternalCargoGroupNameRu,
                currentInternalCargoGroupNameEn: row.currentInternalCargoGroupNameEn,
                currentInternalCargoIdInternalCargo: row.currentInternalCargoIdInternalCargo,
                currentInternalCargoNameRu: row.currentInternalCargoNameRu,
                currentInternalCargoNameEn: row.currentInternalCargoNameEn,
                currentVesg: row.currentVesg,
                idStationFromAmkr: row.idStationFromAmkr,
                currentStationFromAmkrNameRu: row.currentStationFromAmkrNameRu,
                currentStationFromAmkrNameEn: row.currentStationFromAmkrNameEn,
                currentStationFromAmkrAbbrRu: row.currentStationFromAmkrAbbrRu,
                currentStationFromAmkrAbbrEn: row.currentStationFromAmkrAbbrEn,
                idDivisionFrom: row.idDivisionFrom,
                currentDivisionFromCode: row.currentDivisionFromCode,
                currentDivisionFromNameRu: row.currentDivisionFromNameRu,
                currentDivisionFromNameEn: row.currentDivisionFromNameEn,
                currentDivisionFromAbbrRu: row.currentDivisionFromAbbrRu,
                currentDivisionFromAbbrEn: row.currentDivisionFromAbbrEn,
                idWimLoad: row.idWimLoad,
                idWimRedirection: row.idWimRedirection,
                codeExternalStation: row.codeExternalStation,
                currentExternalStationOnNameRu: row.currentExternalStationOnNameRu,
                currentExternalStationOnNameEn: row.currentExternalStationOnNameEn,
                idStationOnAmkr: row.idStationOnAmkr,
                currentStationOnAmkrNameRu: row.currentStationOnAmkrNameRu,
                currentStationOnAmkrNameEn: row.currentStationOnAmkrNameEn,
                currentStationOnAmkrAbbrRu: row.currentStationOnAmkrAbbrRu,
                currentStationOnAmkrAbbrEn: row.currentStationOnAmkrAbbrEn,
                idDivisionOn: row.idDivisionOn,
                currentDivisionOnCode: row.currentDivisionOnCode,
                currentDivisionOnNameRu: row.currentDivisionOnNameRu,
                currentDivisionOnNameEn: row.currentDivisionOnNameEn,
                currentDivisionOnAbbrRu: row.currentDivisionOnAbbrRu,
                currentDivisionOnAbbrEn: row.currentDivisionOnAbbrEn,
                idWimUnload: row.idWimUnload,
                moveCargoCreate: row.moveCargoCreate,
                moveCargoCreateUser: row.moveCargoCreateUser,
                moveCargoChange: row.moveCargoChange,
                moveCargoChangeUser: row.moveCargoChangeUser,
                moveCargoClose: row.moveCargoClose,
                moveCargoCloseUser: row.moveCargoCloseUser,
                currentIdOrganizationService: row.currentIdOrganizationService,
                currentOrganizationServiceRu: row.currentOrganizationServiceRu,
                currentOrganizationServiceEn: row.currentOrganizationServiceEn,
                //--filing
                filingConditionAbbrRu: row && row.filingConditionAbbrRu ? row.filingConditionAbbrRu : null,
                filingConditionAbbrEn: row && row.filingConditionAbbrRu ? row.filingConditionAbbrEn : null,
                filingIdLoadingStatus: row && row.filingIdLoadingStatus ? row.filingIdLoadingStatus : null,
                filingLoadingStatusRu: row && row.filingtLoadingStatusRu ? row.filingtLoadingStatusRu : null,
                filingLoadingStatusEn: row && row.filingLoadingStatusEn ? row.filingLoadingStatusEn : null,
                filingIdOperation: row && row.filingIdOperation ? row.filingIdOperation : null,
                filingOperationNameRu: row && row.filingOperationNameRu ? row.filingOperationNameRu : null,
                filingOperationNameEn: row && row.filingOperationNameEn ? row.filingOperationNameEn : null,
                filingOperationStart: row && row.filingOperationStart ? row.filingOperationStart : null,
                filingOperationEnd: row && row.filingOperationEnd ? row.filingOperationEnd : null,
                filingInternalDocNum: row && row.filingInternalDocNum ? row.filingInternalDocNum : null,
                filingMoveCargoDocReceived: row && row.filingMoveCargoDocReceived ? row.filingMoveCargoDocReceived : null,
                filingCargoIdGroup: row && row.filingCargoIdGroup ? row.filingCargoIdGroup : null,
                filingCargoGroupNameRu: row && row.filingCargoGroupNameRu ? row.filingCargoGroupNameRu : null,
                filingCargoGroupNameEn: row && row.filingCargoGroupNameEn ? row.filingCargoGroupNameEn : null,
                filingCargoIdCargo: row && row.filingCargoIdCargo ? row.filingCargoIdCargo : null,
                filingCargoNameRu: row && row.filingCargoNameRu ? row.filingCargoNameRu : null,
                filingCargoNameEn: row && row.filingCargoNameEn ? row.filingCargoNameEn : null,
                filingInternalCargoIdGroup: row && row.filingInternalCargoIdGroup ? row.filingInternalCargoIdGroup : null,
                filingInternalCargoGroupNameRu: row && row.filingInternalCargoGroupNameRu ? row.filingInternalCargoGroupNameRu : null,
                filingInternalCargoGroupNameEn: row && row.filingInternalCargoGroupNameEn ? row.filingInternalCargoGroupNameEn : null,
                filingInternalCargoIdInternalCargo: row && row.filingInternalCargoIdInternalCargo ? row.filingInternalCargoIdInternalCargo : null,
                filingInternalCargoNameRu: row && row.filingInternalCargoNameRu ? row.filingInternalCargoNameRu : null,
                filingInternalCargoNameEn: row && row.filingInternalCargoNameEn ? row.filingInternalCargoNameEn : null,
                filingVesg: row && row.filingVesg ? row.filingVesg : null,
                filingIdStationFromAmkr: row && row.filingIdStationFromAmkr ? row.filingIdStationFromAmkr : null,
                filingStationFromAmkrNameRu: row && row.filingStationFromAmkrNameRu ? row.filingStationFromAmkrNameRu : null,
                filingStationFromAmkrNameEn: row && row.filingStationFromAmkrNameEn ? row.filingStationFromAmkrNameEn : null,
                filingStationFromAmkrAbbrRu: row && row.filingStationFromAmkrAbbrRu ? row.filingStationFromAmkrAbbrRu : null,
                filingStationFromAmkrAbbrEn: row && row.filingStationFromAmkrAbbrEn ? row.filingStationFromAmkrAbbrEn : null,
                filingIdDivisionFrom: row && row.filingIdDivisionFrom ? row.filingIdDivisionFrom : null,
                filingDivisionFromCode: row && row.filingDivisionFromCode ? row.filingDivisionFromCode : null,
                filingDivisionFromNameRu: row && row.filingDivisionFromNameRu ? row.filingDivisionFromNameRu : null,
                filingDivisionFromNameEn: row && row.filingDivisionFromNameEn ? row.filingDivisionFromNameEn : null,
                filingDivisionFromAbbrRu: row && row.filingDivisionFromAbbrRu ? row.filingDivisionFromAbbrRu : null,
                filingDivisionFromAbbrEn: row && row.filingDivisionFromAbbrEn ? row.filingDivisionFromAbbrEn : null,
                filingCodeExternalStation: row && row.filingCodeExternalStation ? row.filingCodeExternalStation : null,
                filingExternalStationOnNameRu: row && row.filingExternalStationOnNameRu ? row.filingExternalStationOnNameRu : null,
                filingExternalStationOnNameEn: row && row.filingExternalStationOnNameEn ? row.filingExternalStationOnNameEn : null,
                filingIdStationOnAmkr: row && row.filingIdStationOnAmkr ? row.filingIdStationOnAmkr : null,
                filingStationOnAmkrNameRu: row && row.filingStationOnAmkrNameRu ? row.filingStationOnAmkrNameRu : null,
                filingStationOnAmkrNameEn: row && row.filingStationOnAmkrNameEn ? row.filingStationOnAmkrNameEn : null,
                filingStationOnAmkrAbbrRu: row && row.filingStationOnAmkrAbbrRu ? row.filingStationOnAmkrAbbrRu : null,
                filingStationOnAmkrAbbrEn: row && row.filingStationOnAmkrAbbrEn ? row.filingStationOnAmkrAbbrEn : null,
                filingIdDivisionOn: row && row.filingIdDivisionOn ? row.filingIdDivisionOn : null,
                filingDivisionOnCode: row && row.filingDivisionOnCode ? row.filingDivisionOnCode : null,
                filingDivisionOnNameRu: row && row.filingDivisionOnNameRu ? row.filingDivisionOnNameRu : null,
                filingDivisionOnNameEn: row && row.filingDivisionOnNameEn ? row.filingDivisionOnNameEn : null,
                filingDivisionOnAbbrRu: row && row.filingDivisionOnAbbrRu ? row.filingDivisionOnAbbrRu : null,
                filingDivisionOnAbbrEn: row && row.filingDivisionOnAbbrEn ? row.filingDivisionOnAbbrEn : null,
                //-------------------------------------------------
            };
        }
        // Отображение элементов окна правки и создания подачи и операции (в зависимости от операции)
        var view_setup_filing = function (command) {

            var view_setup_operation_open = function () {
                if (this.id_filing === 0) {
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.enable();
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.$element_fl.addClass('required-field');
                } else {
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.$element_fl.removeClass('required-field');
                }
                // есть выбранные вагоны
                if (rows !== null && rows.length > 0) {
                    this.id_operation_default = this.get_operation_of_status_load(rows[0].currentIdLoadingStatus);
                    this.list_status_unload = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(this.id_operation_default);
                    this.form_filing_wagons_setup.el.input_datetime_time_start.enable();
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.$element.addClass('required-field');
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.addClass('not-required-field');
                    this.form_filing_wagons_setup.el.input_datetime_time_start.val(moment());
                }
                /*                this.form_filing_wagons_setup.el.datalist_id_devision_from.enable();*/
                this.form_filing_wagons_setup.el.datalist_id_devision_from.val(this.division_from);
                this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(this.station_from);
                view_set_date_stop.call(this, false);
            }

            // Проверка на ввод даты окончания операции (режимы править или закрыть)
            var view_set_date_stop = function (isValid) {
                if (this.fw_status === 0 || this.fw_status === 1) {
                    // Проверим введена дата окончания или дата документа
                    if (isValid) {
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('not-required-field check-field is-valid is-invalid').addClass('required-field');
                        this.form_filing_wagons_setup.el.select_id_status_load.$element.addClass('required-field');
                        this.form_filing_wagons_setup.el.select_id_status_load.enable();
                        this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_unload, this.default_status_unload)
                    } else {
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('check-field is-valid required-field is-invalid').addClass('not-required-field');
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.val(-1);
                        this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass('required-field not-required-field check-field is-valid is-invalid');
                    }
                }
            }

            this.clear_all();
            // Проверка на команды вызова функций
            if (command) {
                if (typeof command.time_stop === "boolean") {
                    view_set_date_stop.call(this, command.time_stop); return;
                }
            }

            this.filing_wagons_alert_info.clear_message();
            this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_start', App.Langs));

            // Обновим кнопку добавить в подачу\создать черновик
            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row(); // Получим выбранные вагоны в подаче
            var bts = this["twwf_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            bts.enable();
            bts.text(langView('vopulc_title_button_new_filing', App.Langs));
            //bts.titleAttr(langView('vopulc_title_attr_button_new_filing', App.Langs));
            var fws_bts = this["tfw_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            fws_bts.disable();

            // Сбросим все настройки
            this.form_filing_wagons_setup.el.button_filing_add.hide();
            this.form_filing_wagons_setup.el.button_filing_apply.hide();
            this.form_filing_wagons_setup.el.button_operation_apply.hide();

            this.form_filing_wagons_setup.el.input_datetime_time_start.$element.removeClass('required-field not-required-field check-field is-valid is-invalid');
            this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('required-field not-required-field check-field is-valid is-invalid');

            this.form_filing_wagons_setup.el.datalist_id_devision_from.$element_fl.removeClass('required-field not-required-field check-field is-valid is-invalid');
            this.form_filing_wagons_setup.el.select_id_station_amkr_from.$element.removeClass('required-field not-required-field check-field is-valid is-invalid');
            this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass('required-field not-required-field check-field is-valid is-invalid');

            this.form_filing_wagons_setup.el.input_datetime_time_start.val(null);
            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
            this.form_filing_wagons_setup.el.datalist_id_devision_from.val(-1);
            this.form_filing_wagons_setup.el.select_id_status_load.val(-1);
            this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(-1);

            this.form_filing_wagons_setup.el.input_datetime_time_start.disable();
            this.form_filing_wagons_setup.el.input_datetime_time_stop.disable();
            this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
            this.form_filing_wagons_setup.el.select_id_status_load.disable();
            this.form_filing_wagons_setup.el.select_id_station_amkr_from.disable();

            if (this.id_filing === 0) {
                // черновик
                fws_bts.enable();
                this.filing_wagons_alert_info.clear_message();
                this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_draft', App.Langs));
                this.form_filing_wagons_setup.el.button_filing_add.show();
                this.form_filing_wagons_setup.el.button_filing_apply.hide();
                this.form_filing_wagons_setup.el.button_operation_apply.hide();
                view_setup_operation_open.call(this);
            };
            if (this.id_filing > 0) {
                bts.text(langView('vopulc_title_button_add_filing', App.Langs));
                this.filing_wagons_alert_info.clear_message();
                if (this.close_filing !== null) bts.disable();
                // Выбрана подача (покажем данные по подаче)
                if (this.create_filing) {
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    if (this.close_filing === null) this.form_filing_wagons_setup.el.button_filing_apply.show();
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                } else {
                    this.form_filing_wagons_setup.el.button_filing_add.show();
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                }
                this.form_filing_wagons_setup.el.input_datetime_time_start.val(this.create_filing ? moment(this.create_filing) : moment());
                this.form_filing_wagons_setup.el.input_datetime_time_stop.val(this.create_filing ? moment(this.close_filing) : null);
                if (this.close_filing === null) {
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.enable();
                    this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_filing', App.Langs));
                } else {
                    this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_filing_close', App.Langs));
                }
                //this.form_filing_wagons_setup.el.select_id_station_amkr_from.enable();
                this.form_filing_wagons_setup.el.datalist_id_devision_from.val(this.division_from);
                this.form_filing_wagons_setup.el.select_id_status_load.val(this.status_load);
                this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(this.station_from);

                switch (this.fw_status) {
                    case 0: {
                        fws_bts.enable();
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_0', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.show();
                        view_setup_operation_open.call(this);
                        break;
                    }
                    case 1: {
                        var id_operation = this.get_operation_of_status_load(rows[0].currentIdLoadingStatus);
                        this.list_status_unload = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(id_operation);

                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_1', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.show();
                        this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.select_id_status_load.enable();

                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(moment());
                        this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_unload, this.default_status_unload)

                        view_set_date_stop.call(this, true); // отобразить закрыть
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length === 1 ? moment(rows[0].currentOperationStart) : null);
                        break;
                    }
                    case 2: {
                        var id_operation = this.get_operation_of_status_load(rows[0].currentIdLoadingStatus);
                        this.list_status_unload = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(id_operation);
                        this.filing_wagons_alert_info.clear_message();
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();

                        if (this.close_filing === null) {
                            this.form_filing_wagons_setup.el.select_id_status_load.enable();
                            this.form_filing_wagons_setup.el.button_operation_apply.show();
                            this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_2', App.Langs));

                        } else {
                            this.form_filing_wagons_setup.el.select_id_status_load.disable();
                            this.form_filing_wagons_setup.el.button_operation_apply.hide();
                            this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_2_close', App.Langs));
                        }
                        this.form_filing_wagons_setup.el.select_id_station_amkr_from.disable();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length === 1 ? moment(rows[0].currentOperationStart) : null);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length === 1 ? moment(rows[0].currentOperationEnd) : null);
                        this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length === 1 ? rows[0].currentIdLoadingStatus : this.default_status_unload);
                        break;
                    }
                    case 3: {
                        var id_operation = this.get_operation_of_status_load(rows[0].currentIdLoadingStatus);
                        this.list_status_unload = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(id_operation);
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_3', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length === 1 ? moment(rows[0].currentOperationStart) : null);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length === 1 ? moment(rows[0].currentOperationEnd) : null);
                        this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length === 1 ? rows[0].currentIdLoadingStatus : this.default_status_unload);
                        break;
                    }
                }
            }
        }
        // Валидация правки подачи и операций над вагонами
        var validation = function (result, mode) {
            // 0- add; >0 id ; null -not edit
            if (this.id_filing === null) { return false; }
            var valid = true;
            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
            // Получим последнюю дату операции
            var operation_end = get_max_element(rows, 'currentOperationEnd');
            var start_date = get_max_element(rows, 'filingStart');
            // Время начала
            if (mode === 0 || mode === 2) {
                // Создать подачу и операции над вагонами
                // Проверим время начала
                if (result.new && result.new.input_datetime_time_start) {
                    var aplly = moment(result.new.input_datetime_time_start);
                    // проверим на последнюю операцию
                    var old = moment(operation_end);
                    var minutes = old.diff(aplly, 'minutes');
                    if (minutes > 0) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('vopulc_mess_error_start_time_aplly', App.Langs).format(operation_end), false);
                        valid = false;
                    }
                    // проверим на тек дату
                    var curr = moment();
                    var minutes = aplly.diff(curr, 'minutes');
                    if (minutes < App.wsd_setup.unload_start_dt_min) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('vopulc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.unload_start_dt_min * -1), false);
                        valid = false;
                    }
                    if (minutes > App.wsd_setup.unload_start_dt_max) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('vopulc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.unload_start_dt_max), false);
                        valid = false;
                    }
                }
            }
            // Время конца 
            if (mode === 3 && rows && rows.length > 0) {
                if (result.new && result.new.input_datetime_time_stop === null) {
                    this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopulc_mess_error_time_aplly', App.Langs), false);
                    valid = false;
                } else {
                    //var dtstop = moment(result.new.input_datetime_time_stop);
                    if (start_date) {
                        // Проверим на минимальный период
                        var dtstart = moment(start_date);
                        var dtstop = moment(result.new.input_datetime_time_stop);
                        var minutes = dtstop.diff(dtstart, 'minutes');
                        if (minutes <= 0) {
                            this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopulc_mess_error_stop_time_aplly', App.Langs), false);
                            valid = false;
                        } else {
                            if (minutes < App.wsd_setup.unload_period_min) {
                                this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopulc_mess_error_period_time', App.Langs).format(App.wsd_setup.unload_period_min), false);
                                valid = false;
                            } else {
                                // проверим на тек дату
                                var curr = moment();
                                var minutes = dtstop.diff(curr, 'minutes');
                                if (minutes < App.wsd_setup.unload_stop_dt_min) {

                                    this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopulc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.unload_stop_dt_min * -1), false);
                                    valid = false;
                                }
                                if (minutes > App.wsd_setup.unload_stop_dt_max) {
                                    this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopulc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.unload_stop_dt_max), false);
                                    valid = false;
                                }
                            }
                        }
                    }
                }
            }
            // Проверим соотношение начало и конца
            if ((mode === 0 || mode === 2) && rows && rows.length > 0) {
                // Проверим время начала и окончания
                if (result.new && result.new.input_datetime_time_start && result.new.input_datetime_time_stop) {
                    var dtstart = moment(result.new.input_datetime_time_start);
                    var dtstop = moment(result.new.input_datetime_time_stop);
                    var minutes = dtstop.diff(dtstart, 'minutes');
                    if (minutes < App.wsd_setup.unload_period_min || minutes > App.wsd_setup.unload_period_max) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopulc_mess_error_period_time', App.Langs).format(App.wsd_setup.unload_period_min, App.wsd_setup.unload_period_max), false);
                        valid = false;
                    }
                }
            }
            // Проверим вагоны в подаче
            if (mode === 0) {
                // Проверим вагоны в подаче
                if (this.filing_wagons === null || this.filing_wagons.length === 0) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopulc_mess_error_not_wagons_filing', App.Langs));
                    valid = false;
                }
            }
            // проверка выбранных вагонов
            if (mode === 0 || mode === 2 || mode === 3) {
                // Проверим выбранные вагоны для открытия и закрытия операции
                var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
            }
            // проверка выбранных для операций вагонов
            if (mode === 0 || mode === 2 || mode === 3) {
                // должно быть выставлено время конца
                if (result.new && result.new.input_datetime_time_stop) {
                    if (!rows || rows.length === 0) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopulc_mess_error_not_wagons_close_filing', App.Langs));
                        valid = false;
                    }
                } else {
                    if (result.new && result.new.select_id_status_load >= 0) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopulc_mess_error_time_aplly', App.Langs), false);
                        valid = false;
                    }
                }
            }
            // проверка статуса
            if (mode === 0 || mode === 2 || mode === 3) {
                // должно быть выставлено время конца
                if (result.new && result.new.input_datetime_time_stop && result.new.select_id_status_load < 0) {
                    this.form_filing_wagons_setup.set_element_validation_error('id_status_load', langView('vopulc_mess_error_not_wagons_status_close_filing', App.Langs), false);
                    valid = false;
                }
            }
            // проверка подразделения
            if (mode === 0 || mode === 1) {
                valid = valid & this.validation_exist_divisions(result.new.datalist_id_devision_from, 'id_devision_from', true, false);
            }
            // проверка подразделения
            if (mode === 1) {
                if (result.new && result.new.select_id_station_amkr_from < 1) {
                    this.form_filing_wagons_setup.set_element_validation_error('id_station_amkr_from', langView('vopulc_mess_error_filing_station_amkr', App.Langs), false);
                    valid = false;
                }
            }
            return valid;
        }
        // Создать подачу для выгрузки
        var apply_add_filing = function (data, callback) {
            this.view_com.api_wsd.postAddFilingUnloading(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        // Править подачу
        var apply_update_filing = function (data, callback) {
            this.view_com.api_wsd.postUpdateFiling(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        // Открыть(закрыть) операцию выгрузки над вагонами подачи 
        var apply_update_operation_filing = function (data, callback) {
            this.view_com.api_wsd.postUpdateFilingOperationUnloading(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }

        // Завершенеие инициализации [this.view_com]
        var out_init_view_com = function () {

            this.cfiling.init({
                alert: this.settings.alert,

                type_filing: 1, // Выгрузка
                wagon_operation: App.wsd_setup.operations.unloading_uz, // операция над вагоном
                view_com: this.view_com,
                api_dir: this.settings.api_dir,
                api_wsd: this.settings.api_wsd,
                fn_start_init: function () {
                    start_init.call(this);
                },
                fn_load_db_operation: function (callback) {
                    load_db_operation.call(this, callback);
                },
                fn_after_loading_init: function (callback) {
                    after_loading_init.call(this, callback);
                },
                fn_init_form_filing_setup: null,
                fn_init_form_filing_wagons_setup: function (callback) {
                    init_form_filing_wagons_setup.call(this, callback);
                },
                fn_init_form_from_setup: null,
                fn_init: function () {
                    out_init_cfiling.call(this);
                }.bind(this),

                fn_get_sostav_filing: function (row, station, way, park, division, wagons) {
                    return get_sostav_filing.call(this, row, station, way, park, division, wagons);
                },
                fn_get_filing_wagons: function (row) {
                    return get_filing_wagons.call(this, row);
                },
                fn_view_setup_filing: function (command) {
                    view_setup_filing.call(this, command);
                },
                fn_validation: function (result, mode) {
                    return validation.call(this, result, mode);
                },
                fn_apply_add_filing: function (data, callback) {
                    apply_add_filing.call(this, data, callback);
                },
                fn_apply_update_filing: function (data, callback) {
                    apply_update_filing.call(this, data, callback);
                },
                fn_apply_update_operation_filing: function (data, callback) {
                    apply_update_operation_filing.call(this, data, callback);
                },
                fn_apply_add_wagon_filing: null,
                fn_apply_del_wagon_filing: null,
                fn_apply_update: null,
                fn_db_update: this.settings.fn_db_update,
                fn_close: this.settings.fn_close,
            });
        }.bind(this);

        this.view_com.init({
            alert: this.settings.alert,
            api_dir: this.settings.api_dir,
            api_wsd: this.settings.api_wsd,
            fn_db_update: this.settings.fn_db_update,
            fn_init: function () {
                this.view_com.$title.empty();
                this.view_com.$title.append(langView('vopulc_card_header_panel', App.Langs));
                this.view_com.$op.empty();
                this.view_com.close();
                // Сообщение
                LockScreen(langView('vopulc_mess_init_panel', App.Langs));
                out_init_view_com();
            }.bind(this),
            fn_close: this.settings.fn_close,
        }, function () { }.bind(this));
    };

    view_op_unloading_cars.prototype.view = function (id_way) {
        this.cfiling.view(id_way);
    }

    App.view_op_unloading_cars = view_op_unloading_cars;

    window.App = App;

})(window);