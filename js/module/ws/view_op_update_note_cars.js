/* ===============================================
-= Модуль панель сервиса "ОБНОВИТЬ ПРИМЕЧАНИЕ ПО ГРУППЕ ВАГОНОВ" =-
  + js/view/shared/common.js
  + js/module/view_op_common.js
  + js/module/ws/table_ws.js
  + js/module/ws/view_op_common_group.js  
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
            'vopunc_card_header_panel': 'СЕРВИС "ПРАВИТЬ ПРИМЕЧАНИЕ ПО ГРУППЕ ВАГОНОВ"',

            'vopunc_title_form_add': 'Создать подачу',
            'vopunc_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            'vopunc_title_form_apply': 'Править подачу',
            'vopunc_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            'vopunc_title_form_operation_open': 'Открыть операцию',
            'vopunc_title_form_operation_open_title': 'Открыть операцию по вагону(ам) в подаче.',
            'vopunc_title_form_operation_close': 'Закрыть операцию',
            'vopunc_title_form_operation_close_title': 'Закрыть операцию по вагону(ам) в подаче.',
            'vopunc_title_form_operation_apply': 'Править операцию',
            'vopunc_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            'vopunc_title_time_start': 'Время начала',
            'vopunc_text_time_start': 'Время начала операции ограниченно +(-)1день',
            'vopunc_title_placeholder_time_start': 'Время начала',

            'vopunc_title_time_stop': 'Время окончания',
            'vopunc_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            'vopunc_title_placeholder_time_stop': 'Время окончания',

            'vopunc_title_label_status_load': 'Статус:',
            'vopunc_text_label_status_load': 'Выберите статус (груж./порож.)...',

            'vopunc_title_label_organization_service': 'Организация:',
            'vopunc_text_label_organization_service': 'Выберите организацию обслуживания...',

            'vopunc_title_button_new_filing': 'Создать черновик',
            'vopunc_title_button_add_filing': 'Добавить в подачу',

            'vopunc_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            'vopunc_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать операцию, для этого укажите дату начала операции и по необходимости дату завершения, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            'vopunc_mess_info_filing': 'Выбрана подача. Чтобы выполнить операции над вагонами выберите вагон(ы).',
            'vopunc_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            'vopunc_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции и по необходимости дату завершения и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны», если нужно выбрать вагоны с открытыми и закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopunc_mess_info_wagon_mode_1': 'Выбран(ы) вагоны, по которым открыта операция. Укажите дату завершения операции и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с открытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopunc_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция. Вы можете править только организацию и время выполнения операции, укажите другую организацию, время выполнения и нажмите “править операцию”.',
            'vopunc_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача. Операции не доступны!',
            'vopunc_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',

            'vopunc_mess_error_time_aplly': 'Укажите дату завершения операции',
            'vopunc_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты [{0}] выполнения последней операции [{1}]',
            'vopunc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            'vopunc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'vopunc_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            'vopunc_mess_error_not_wagons_close_filing': 'Выберите вагоны для завершения операции вподаче (в окне «ВАГОНЫ В ПОДАЧЕ», выберите вагоны).',
            'vopunc_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',

            'vopunc_mess_error_filing_organization_service': 'Выберите организацию выполняющую работу',

            'vopunc_mess_error_period_time': 'Операция должна длиться не менее {0} мин.',
            'vopunc_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',

            'vopunc_mess_cancel_operation_mode_0': 'Отмена операции создать подачу для "ОЧИСТКИ ВАГОНОВ"!',
            'vopunc_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ОЧИСТКИ ВАГОНОВ"!',
            'vopunc_mess_cancel_operation_mode_2': 'Отмена операции начала "ОЧИСТКИ" над вагонами подачи!',
            'vopunc_mess_cancel_operation_mode_3': 'Отмена завершения операции "ОЧИСТКИ" над вагонами подачи!',
            'vopunc_mess_cancel_operation_mode_4': 'Отмена правки статуса вагона после "ОЧИСТКИ"!',

            //'vopunc_mess_load_operation': 'Загружаю операции...',

            'vopunc_mess_init_panel': 'Выполняю инициализацию модуля ...',

            //'vopunc_confirm_title': 'Внимание!',
            'vopunc_confirm_mess_apply_create_filing': 'Создать подачу для операции "ОЧИСТКА ВАГОНОВ" на станции {0}, на пути {1}. Определено для подачи {2} ваг., определено для очистки {3} ваг., закрыта очистка по {4} вагонам, очистку выполняет {5}.',
            'vopunc_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала очистки {2} ваг., закрыта очистка по {3} вагонам, очистку выполняет {4}.',
            'vopunc_confirm_mess_apply_update_filing_edit_operation': 'Править подачу {0}. Определено для правки {1} ваг., очистку выполняет {2}.',
            'vopunc_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}. Определено для правки {1} ваг., закрыта очистка по {2} вагонам, очистку выполняет {3}.',
            'vopunc_confirm_mess_apply_update_filing_organization_operation': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2}.',
            'vopunc_confirm_mess_apply_update_filing_organization_operation_stop': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2} и новая дата завершения {3}.',
            'vopunc_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути {0}?.',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // js/module/view_op_common.js
    var VIEW_COMMON = App.view_op_common;
    var VIEW_CGROUP = App.view_op_common_group;

    var ALERT = App.alert_form;
    var FD = App.form_dialog;
    // js/module/ws/table_ws.js
    var TWS = App.table_ws;
    function view_op_update_note_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
        this.cgroup = new VIEW_CGROUP();
    }

    // инициализация модуля
    view_op_update_note_cars.prototype.init = function (options) {
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

        }
        // Загрузка дополнительных библиотек ()
        var load_db_operation = function (callback) {
            if (typeof callback === 'function') {
                callback();
            }
        }
        // Продолжение инициализации после загрузки всех библиотек (привязка к новым переменным)
        var after_loading_init = function (callback) {

        }
        // Инициализация формы правки вагонов в группе
        var init_form_group_wagons_setup = function (callback) {
            this.form_group_wagons_setup = new FD();
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
            //var bt_bt_add = {
            //    obj: 'bs_button',
            //    options: {
            //        id: 'filing_add',
            //        name: null,
            //        class: null,
            //        fsize: 'sm',
            //        color: 'primary',
            //        text: langView('vopunc_title_form_add', App.Langs),
            //        title: langView('vopunc_title_form_add_title', App.Langs),
            //        icon_fa_left: 'fa-regular fa-square-plus',  //<i class="fa-regular fa-square-plus"></i>
            //        icon_fa_right: null,
            //        fn_click: function (event) {
            //            event.preventDefault();
            //            this.form_group_wagons_setup.$form.submit();
            //        }.bind(this),
            //    }
            //};
            var bt_bt_apply = {
                obj: 'bs_button',
                options: {
                    id: 'filing_apply',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vopunc_title_form_apply', App.Langs),
                    title: langView('vopunc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_group_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_operation_open = {
                obj: 'bs_button',
                options: {
                    id: 'operation_open',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'warning',
                    text: langView('vopunc_title_form_operation_open', App.Langs),
                    title: langView('vopunc_title_form_operation_open_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-folder-open',  //<i class="fa-regular fa-folder-open"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_group_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_operation_close = {
                obj: 'bs_button',
                options: {
                    id: 'operation_close',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'danger',
                    text: langView('vopunc_title_form_operation_close', App.Langs),
                    title: langView('vopunc_title_form_operation_close_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-folder-closed',  //<i class="fa-regular fa-folder-closed"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_group_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_operation_apply = {
                obj: 'bs_button',
                options: {
                    id: 'operation_apply',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: langView('vopunc_title_form_operation_apply', App.Langs),
                    title: langView('vopunc_title_form_operation_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_group_wagons_setup.$form.submit();
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

            //var form_input_datetime_time_start = {
            //    obj: 'bs_form_input_datetime',
            //    options: {
            //        validation_group: 'common_filing_wagons',
            //        id: 'time_start',
            //        name: 'time_start',
            //        label: langView('vopunc_title_time_start', App.Langs),
            //        element_type: 'datetime-local',
            //        element_fsize: 'sm',
            //        element_class: null,
            //        element_value: null,
            //        element_title: null,
            //        element_placeholder: langView('vopunc_title_placeholder_time_start', App.Langs),
            //        element_required: true,
            //        element_maxlength: null,
            //        element_pattern: null,
            //        element_readonly: false,
            //        element_min: moment().subtract(1, 'days').format("YYYY-MM-DDThh:mm"), //"2024-05-05T00:00"
            //        element_max: moment().add(1, 'days').format("YYYY-MM-DDThh:mm"),
            //        element_step: null,
            //        element_options: {
            //            default: moment(),
            //            format: 'datetime',
            //            out_format: 'moment',
            //            fn_change: function (e, dt) {
            //            }.bind(this),
            //        },
            //        validation: true,
            //        feedback_invalid: null,
            //        feedback_valid: null,
            //        feedback_class: null,
            //        col_prefix: 'md',
            //        col_size: 6,
            //        col_class: 'mt-0',
            //        form_text: langView('vopunc_text_time_start', App.Langs),
            //        form_text_class: null,
            //    },
            //    childs: []
            //};
            //var form_input_datetime_time_stop = {
            //    obj: 'bs_form_input_datetime',
            //    options: {
            //        validation_group: 'common_filing_wagons',
            //        id: 'time_stop',
            //        name: 'time_stop',
            //        label: langView('vopunc_title_time_stop', App.Langs),
            //        element_type: 'datetime-local',
            //        element_fsize: 'sm',
            //        element_class: null,
            //        element_value: null,
            //        element_title: null,
            //        element_placeholder: langView('vopunc_title_placeholder_time_stop', App.Langs),
            //        element_required: false,
            //        element_maxlength: null,
            //        element_pattern: null,
            //        element_readonly: false,
            //        element_min: moment().subtract(1, 'days').format("YYYY-MM-DDThh:mm"), //"2024-05-05T00:00"
            //        element_max: moment().add(1, 'days').format("YYYY-MM-DDThh:mm"),
            //        element_step: null,
            //        element_options: {
            //            default: moment(),
            //            format: 'datetime',
            //            out_format: 'moment',
            //            fn_change: function (e, dt) {
            //                // Если открыты операции возможны 2 под-режима правка и закрытие
            //                if (this.fw_status === 0 || this.fw_status === 1) {
            //                    //this.view_setup_filing({ time_stop: dt._isValid });
            //                }
            //            }.bind(this),
            //        },
            //        validation: true,
            //        feedback_invalid: null,
            //        feedback_valid: null,
            //        feedback_class: null,
            //        col_prefix: 'md',
            //        col_size: 6,
            //        col_class: 'mt-0',
            //        form_text: langView('vopunc_text_time_stop', App.Langs),
            //        form_text_class: null,
            //    },
            //    childs: []
            //};
            //var form_select_organization_service = {
            //    obj: 'bs_form_select',
            //    options: {
            //        validation_group: 'common_filing_wagons',
            //        id: 'id_organization_service',
            //        name: 'id_organization_service',
            //        label: langView('vopunc_title_label_organization_service', App.Langs),
            //        element_fsize: 'sm',
            //        element_class: null,
            //        element_value: null,
            //        element_multiple: false,
            //        element_title: null,
            //        element_required: true,
            //        element_readonly: false,
            //        element_size: null,
            //        element_options: {
            //            data: this.list_organization_service,
            //            default: 1,
            //            fn_change: function (e) {
            //                e.preventDefault();
            //                // Обработать выбор
            //            }.bind(this),
            //            fn_check: function (text) {

            //            }.bind(this),
            //        },
            //        validation: true,
            //        feedback_invalid: null,
            //        feedback_valid: null,
            //        feedback_class: null,
            //        col_prefix: 'md',
            //        col_size: 6,
            //        col_class: 'mt-0',
            //        form_text: langView('vopunc_text_label_organization_service', App.Langs),
            //        form_text_class: null,
            //    },
            //    childs: []
            //};
            //var form_select_status_load = {
            //    obj: 'bs_form_select',
            //    options: {
            //        validation_group: 'common_filing_wagons',
            //        id: 'id_status_load',
            //        name: 'id_status_load',
            //        label: langView('vopunc_title_label_status_load', App.Langs),
            //        element_fsize: 'sm',
            //        element_class: null,
            //        element_value: null,
            //        element_multiple: false,
            //        element_title: null,
            //        element_required: false,
            //        element_readonly: false,
            //        element_size: null,
            //        element_options: {
            //            data: this.list_status_cleaning,
            //            default: 0,
            //            fn_change: function (e) {
            //                e.preventDefault();
            //                // Обработать выбор
            //                var id = Number($(e.currentTarget).val());
            //            }.bind(this),
            //            fn_check: function (text) {

            //            }.bind(this),
            //        },
            //        validation: true,
            //        feedback_invalid: null,
            //        feedback_valid: null,
            //        feedback_class: null,
            //        col_prefix: 'md',
            //        col_size: 6,
            //        col_class: 'mt-0',
            //        form_text: langView('vopunc_text_label_status_load', App.Langs),
            //        form_text_class: null,
            //    },
            //    childs: []
            //};
/*            col_bt_apply.childs.push(bt_bt_add);*/
            col_bt_apply.childs.push(bt_bt_apply);
            //col_bt_apply.childs.push(bt_operation_open);
            //col_bt_apply.childs.push(bt_operation_close);
            //col_bt_apply.childs.push(bt_operation_apply);
            col_alert.childs.push(alert_info)
            objs_filing_wagons_setup.push(col_bt_apply);
            objs_filing_wagons_setup.push(col_alert);
            //objs_filing_wagons_setup.push(form_input_datetime_time_start);
            //objs_filing_wagons_setup.push(form_input_datetime_time_stop);
            //objs_filing_wagons_setup.push(form_select_organization_service);
            //objs_filing_wagons_setup.push(form_select_status_load);
            this.form_group_wagons_setup.init({
                alert: this.main_alert,
                objs: objs_filing_wagons_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        //// Дополнительная проверка. Определим режим
                        //var mode = null;
                        //var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                        //if (this.id_filing !== null) {
                        //    if (this.id_filing === 0) {
                        //        mode = 0;
                        //    } else {
                        //        if (!rows || rows.length === 0) {
                        //            mode = 1; // Пока не используется (нечево править)
                        //        } else {
                        //            if (this.fw_status !== null) {
                        //                mode = 2 + this.fw_status;
                        //            }
                        //        }
                        //    }
                        //}
                        //if (mode !== null) {
                        //    var valid = this.validation(result, mode);
                        //    var dt_start = this.form_group_wagons_setup.el.input_datetime_time_start.val();
                        //    var dt_stop = this.form_group_wagons_setup.el.input_datetime_time_stop.val();
                        //    if (valid) {
                        //        var message = "";
                        //        switch (mode) {
                        //            case 0: {
                        //                message = langView('vopunc_confirm_mess_apply_create_filing', App.Langs).format(this.form_filing_setup.el.select_id_station_unload.text(),
                        //                    this.form_from_setup.el.select_id_way_unload.text(),
                        //                    (this.filing_wagons ? this.filing_wagons.length : 0),
                        //                    (rows ? rows.length : 0),
                        //                    (dt_stop !== null ? (rows ? rows.length : 0) : 0),
                        //                    (rows ? this.form_group_wagons_setup.el.select_id_organization_service.text() : ''),
                        //                );
                        //                break;
                        //            }
                        //            // Пока не используется (нечево править)
                        //            //case 1: {
                        //            //    message = langView('vopunc_confirm_mess_apply_update_filing', App.Langs).format(this.id_filing, this.form_filing_setup.el.select_id_station_unload.text(), this.form_group_wagons_setup.el.datalist_id_devision_from.text());
                        //            //    break;
                        //            //}
                        //            case 2: {
                        //                message = langView('vopunc_confirm_mess_apply_update_filing_start_operation', App.Langs).format(this.id_filing,
                        //                    (rows ? rows.length : 0),
                        //                    (rows ? rows.length : 0),
                        //                    (dt_stop !== null ? (rows ? rows.length : 0) : 0),
                        //                    (rows ? this.form_group_wagons_setup.el.select_id_organization_service.text() : '')
                        //                );
                        //                break;
                        //            }
                        //            case 3: {
                        //                if (dt_stop !== null) {
                        //                    message = langView('vopunc_confirm_mess_apply_update_filing_stop_operation', App.Langs).format(this.id_filing,
                        //                        (rows ? rows.length : 0),
                        //                        (dt_stop !== null ? (rows ? rows.length : 0) : 0),
                        //                        (rows ? this.form_group_wagons_setup.el.select_id_organization_service.text() : '')
                        //                    );
                        //                } else {
                        //                    message = langView('vopunc_confirm_mess_apply_update_filing_edit_operation', App.Langs).format(this.id_filing,
                        //                        (rows ? rows.length : 0),
                        //                        (rows ? this.form_group_wagons_setup.el.select_id_organization_service.text() : '')
                        //                    );
                        //                }
                        //                break;
                        //            }
                        //            case 4: {
                        //                if (dt_stop !== null) {
                        //                    message = langView('vopunc_confirm_mess_apply_update_filing_organization_operation_stop', App.Langs).format(this.id_filing,
                        //                        (rows ? rows.length : 0),
                        //                        (rows ? this.form_group_wagons_setup.el.select_id_organization_service.text() : ''),
                        //                        this.form_group_wagons_setup.el.input_datetime_time_stop.val().format(format_datetime)
                        //                    );
                        //                } else {
                        //                    message = langView('vopunc_confirm_mess_apply_update_filing_organization_operation', App.Langs).format(this.id_filing,
                        //                        (rows ? rows.length : 0),
                        //                        (rows ? this.form_group_wagons_setup.el.select_id_organization_service.text() : '')
                        //                    );
                        //                }
                        //                break;
                        //            }
                        //        }
                        //        this.view_com.mcf_lg.open(
                        //            langView('vopunc_title_form_apply', App.Langs),
                        //            message,
                        //            function () {
                        //                // Создать подачу
                        //                if (mode === 0) {
                        //                    // Проверим наличие вагонов
                        //                    var list_wagons = [];
                        //                    if (this.filing_wagons && this.filing_wagons.length > 0) {
                        //                        // Получим перечень вагонов и новую позицию
                        //                        $.each(this.filing_wagons.sort(function (a, b) {
                        //                            return a.position - b.position;
                        //                        }), function (i, el) {
                        //                            var row = rows.find(function (o) { return o.num === el.num }.bind(this));
                        //                            list_wagons.push(
                        //                                {
                        //                                    id_wim: el.idWim,
                        //                                    start: row && dt_start ? result.new.input_datetime_time_start._i : null,        // можно править пока подача не закрыта
                        //                                    stop: row && dt_stop ? result.new.input_datetime_time_stop._i : null,           // можно править пока подача не закрыта
                        //                                    id_wagon_operations: row ? App.wsd_setup.operations.cleaning : null,            // (17) можно править пока подача не закрыта
                        //                                    id_status_load: row ? Number(result.new.select_id_status_load) : null,         // можно править пока подача не закрыта
                        //                                    id_organization_service: rows ? Number(result.new.select_id_organization_service) : null,         // можно править пока подача не закрыта
                        //                                }
                        //                            )
                        //                        }.bind(this));
                        //                        // Сформируем операцию

                        //                        var operation = {
                        //                            id_filing: this.id_filing,              // 0 новая, >0 Правим существующую
                        //                            type_filing: this.type_filing,          // 3 = очистка
                        //                            id_way: this.id_way_unload,             // !только новая подача
                        //                            wagons: list_wagons,
                        //                        };
                        //                        this.apply_add_filing(operation);
                        //                    }
                        //                };
                        //                // Править подачи // Пока не используется (нечево править)
                        //                //if (mode === 1 && result.new.datalist_id_devision_from) {
                        //                //    if (this.id_filing !== null) { }
                        //                //    var operation = {
                        //                //        id_filing: this.id_filing,
                        //                //        mode: mode,
                        //                //        id_division: Number(result.new.datalist_id_devision_from),
                        //                //    };
                        //                //    this.apply_update_filing(operation);
                        //                //};
                        //                // Править открыть (закрыть) операцию
                        //                if (mode === 2) {
                        //                    // Проверим наличие вагонов
                        //                    var list_wagons = [];
                        //                    if (rows && rows.length > 0 && this.id_filing !== null) {
                        //                        $.each(rows, function (i, el) {
                        //                            list_wagons.push(
                        //                                {
                        //                                    id_wim: el.idWim,
                        //                                    start: dt_start ? result.new.input_datetime_time_start._i : null,   // можно править пока подача не закрыта
                        //                                    stop: dt_stop ? result.new.input_datetime_time_stop._i : null,      // можно править пока подача не закрыта
                        //                                    id_wagon_operations: App.wsd_setup.operations.cleaning,             // (17) можно править пока подача не закрыта
                        //                                    id_status_load: Number(result.new.select_id_status_load),           // можно править пока подача не закрыта
                        //                                    id_organization_service: Number(result.new.select_id_organization_service),         // можно править пока подача не закрыта
                        //                                }
                        //                            )
                        //                        }.bind(this));
                        //                        // Сформируем операцию

                        //                        var operation = {
                        //                            id_filing: this.id_filing,
                        //                            mode: mode,
                        //                            wagons: list_wagons
                        //                        };
                        //                        this.apply_update_operation_filing(operation);
                        //                    }
                        //                };
                        //                // Править закрыть операцию
                        //                if (mode === 3) {
                        //                    // Проверим наличие вагонов
                        //                    var list_wagons = [];
                        //                    if (rows && rows.length > 0 && this.id_filing !== null) {
                        //                        $.each(rows, function (i, el) {
                        //                            list_wagons.push(
                        //                                {
                        //                                    id_wim: el.idWim,
                        //                                    start: null,
                        //                                    stop: result.new.input_datetime_time_stop !== null ? result.new.input_datetime_time_stop._i : null,
                        //                                    id_wagon_operations: el.currentIdOperation,
                        //                                    id_status_load: Number(result.new.select_id_status_load),            // можно править пока подача не закрыта
                        //                                    id_organization_service: Number(result.new.select_id_organization_service),
                        //                                }
                        //                            )
                        //                        }.bind(this));
                        //                        // Сформируем операцию

                        //                        var operation = {
                        //                            id_filing: this.id_filing,
                        //                            mode: mode,
                        //                            wagons: list_wagons
                        //                        };
                        //                        this.apply_update_operation_filing(operation);
                        //                    }
                        //                };
                        //                // Править закрытую операцию (статус)
                        //                if (mode === 4) {
                        //                    // Проверим наличие вагонов
                        //                    var list_wagons = [];
                        //                    if (rows && rows.length > 0 && this.id_filing !== null) {
                        //                        $.each(rows, function (i, el) {
                        //                            list_wagons.push(
                        //                                {
                        //                                    id_wim: el.idWim,
                        //                                    start: null,
                        //                                    stop: result.new.input_datetime_time_stop !== null ? result.new.input_datetime_time_stop._i : null,                                                              // можно править пока подача не закрыта
                        //                                    id_wagon_operations: el.currentIdOperation,
                        //                                    id_status_load: null,
                        //                                    id_organization_service: Number(result.new.select_id_organization_service), // можно править пока подача не закрыта
                        //                                }
                        //                            )
                        //                        }.bind(this));
                        //                        // Сформируем операцию
                        //                        var operation = {
                        //                            id_filing: this.id_filing,
                        //                            mode: mode,
                        //                            wagons: list_wagons
                        //                        };
                        //                        this.apply_update_operation_filing(operation);
                        //                    }
                        //                };
                        //            }.bind(this),
                        //            function () {
                        //                this.form_group_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vopunc_mess_cancel_operation_mode_' + mode, App.Langs));
                        //            }.bind(this)
                        //        );
                        //    }
                        //}
                    }
                }.bind(this),
                fn_html_init: function (res) { }.bind(this),
                fn_element_init: null,
                fn_init: function (init) {
                    this.group_wagons_setup.$html.append(this.form_group_wagons_setup.$form);
                    var alsert_info = $('div#alert-info');
                    //this.filing_wagons_alert_info = new ALERT(alsert_info);
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
        // Завершенеие инициализации [this.cgroup]
        var out_init_cgroup = function () {
            // Выход с общей инициализации
            if (typeof this.settings.fn_init === 'function') {
                console.log('Close view_op_update_note_cars');

                this.settings.fn_init(this.result_init);
            }
        }
        // Валидация правки подачи и операций над вагонами
        var validation = function (result, mode) {
            // 0- add; >0 id ; null -not edit
            if (this.id_filing === null) { return false; }
            var valid = true;
            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
            // Получим последнюю дату операции
            var is_cleaning = get_belongs_element(rows, 'currentIdOperation', App.wsd_setup.operations.cleaning);
            var is_processing = get_belongs_element(rows, 'currentIdOperation', App.wsd_setup.operations.processing);
            var operation_start = get_max_element(rows, 'currentOperationStart');
            var operation_end = get_max_element(rows, 'currentOperationEnd');
            var start_date = get_max_element(rows, 'filingStart');
            // Время начала
            if (mode === 0 || mode === 2) {
                // Создать подачу и операции над вагонами
                // Проверим время начала
                if (result.new && result.new.input_datetime_time_start) {
                    var aplly = moment(result.new.input_datetime_time_start);
                    // проверим на последнюю операцию
                    //var old = moment(operation_end);
                    var old = moment(is_processing ? operation_start : operation_end); // если выбранные операции очистка тогда обработка может быть равна начлу очистки
                    var minutes = old.diff(aplly, 'minutes');
                    if (minutes > 0) {
                        //this.form_group_wagons_setup.set_element_validation_error('time_start', langView('vopunc_mess_error_start_time_aplly', App.Langs).format(operation_end), false);
                        this.form_group_wagons_setup.set_element_validation_error('time_start', langView('vopunc_mess_error_start_time_aplly', App.Langs).format((is_processing ? operation_start : operation_end), (is_processing ? "Обработка" : "Не обработка")), false);
                        valid = false;
                    }
                    // проверим на тек дату
                    var curr = moment();
                    var minutes = aplly.diff(curr, 'minutes');
                    if (minutes < App.wsd_setup.cleaning_start_dt_min) {
                        this.form_group_wagons_setup.set_element_validation_error('time_start', langView('vopunc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.cleaning_start_dt_min * -1), false);
                        valid = false;
                    }
                    if (minutes > App.wsd_setup.cleaning_start_dt_max) {
                        this.form_group_wagons_setup.set_element_validation_error('time_start', langView('vopunc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.cleaning_start_dt_max), false);
                        valid = false;
                    }
                }
            }
            // Время конца
            if (mode === 3 && rows && rows.length > 0 && result.new && result.new.input_datetime_time_stop !== null) {
                if (start_date) {
                    // Проверим на минимальный период
                    var dtstart = moment(start_date);
                    var dtstop = moment(result.new.input_datetime_time_stop);
                    var minutes = dtstop.diff(dtstart, 'minutes');
                    if (minutes <= 0) {
                        this.form_group_wagons_setup.set_element_validation_error('time_stop', langView('vopunc_mess_error_stop_time_aplly', App.Langs), false);
                        valid = false;
                    } else {
                        if (minutes < App.wsd_setup.cleaning_period_min) {
                            this.form_group_wagons_setup.set_element_validation_error('time_stop', langView('vopunc_mess_error_period_time', App.Langs).format(App.wsd_setup.cleaning_period_min), false);
                            valid = false;
                        } else {
                            // проверим на тек дату
                            var curr = moment();
                            var minutes = dtstop.diff(curr, 'minutes');
                            if (minutes < App.wsd_setup.cleaning_stop_dt_min) {

                                this.form_group_wagons_setup.set_element_validation_error('time_stop', langView('vopunc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.cleaning_stop_dt_min * -1), false);
                                valid = false;
                            }
                            if (minutes > App.wsd_setup.cleaning_stop_dt_max) {
                                this.form_group_wagons_setup.set_element_validation_error('time_stop', langView('vopunc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.cleaning_stop_dt_max), false);
                                valid = false;
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
                    if (minutes < App.wsd_setup.cleaning_period_min || minutes > App.wsd_setup.cleaning_period_max) {
                        this.form_group_wagons_setup.set_element_validation_error('time_stop', langView('vopunc_mess_error_period_time', App.Langs).format(App.wsd_setup.cleaning_period_min, App.wsd_setup.cleaning_period_max), false);
                        valid = false;
                    }
                }
            }
            // Проверим вагоны в подаче
            if (mode === 0) {
                // Проверим вагоны в подаче
                if (this.filing_wagons === null || this.filing_wagons.length === 0) {
                    this.form_group_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopunc_mess_error_not_wagons_filing', App.Langs));
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
                        this.form_group_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopunc_mess_error_not_wagons_close_filing', App.Langs));
                        valid = false;
                    }
                } else {
                    if (result.new && result.new.select_id_status_load >= 0) {
                        this.form_group_wagons_setup.set_element_validation_error('time_stop', langView('vopunc_mess_error_time_aplly', App.Langs), false);
                        valid = false;
                    }
                }
            }
            // проверка статуса
            if (mode === 0 || mode === 2 || mode === 3) {
                // должно быть выставлено время конца
                if (result.new && result.new.input_datetime_time_stop && result.new.select_id_status_load < 0) {
                    this.form_group_wagons_setup.set_element_validation_error('id_status_load', langView('vopunc_mess_error_not_wagons_status_close_filing', App.Langs), false);
                    valid = false;
                }
            }
            // проверка исполнителя
            if (mode === 0 || mode === 1) {
                if (result.new && result.new.select_id_organization_service < 0) {
                    this.form_group_wagons_setup.set_element_validation_error('id_organization_service', langView('vopunc_mess_error_filing_organization_service', App.Langs), false);
                    valid = false;
                }
            }
            return valid;
        }
        // Править группу
        var apply_update_wagons = function (data, callback) {
            //this.view_com.api_wsd.postUpdateFiling(data, function (result) {
            //    if (typeof callback === 'function') {
            //        callback(result);
            //    }
            //}.bind(this));
        }
        // Завершенеие инициализации [this.view_com]
        var out_init_view_com = function () {

            this.cgroup.init({
                alert: this.settings.alert,
                type_group: 1, // Правка примечания
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
                fn_init_form_group_wagons_setup: function (callback) {
                    init_form_group_wagons_setup.call(this, callback);
                },
                fn_init_form_from_setup: null,
                fn_init: function () {
                    out_init_cgroup.call(this);
                }.bind(this),
                fn_validation: function (result, mode) {
                    return validation.call(this, result, mode);
                },
                fn_apply_update_wagons: function (data, callback) {
                    apply_update_wagons.call(this, data, callback);
                },
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
                this.view_com.$title.append(langView('vopunc_card_header_panel', App.Langs));
                this.view_com.$op.empty();
                this.view_com.close();
                // Сообщение
                LockScreen(langView('vopunc_mess_init_panel', App.Langs));
                out_init_view_com();
            }.bind(this),
            fn_close: this.settings.fn_close,
        }, function () { }.bind(this));
    };

    view_op_update_note_cars.prototype.view = function (id_way) {
        this.cgroup.view(id_way);
    }

    App.view_op_update_note_cars = view_op_update_note_cars;

    window.App = App;

})(window);