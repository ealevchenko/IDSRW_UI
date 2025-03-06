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

            'vopunc_title_form_apply': 'Править примечание',
            'vopunc_title_form_apply_title': 'Выполнить операцию "ПРАВИТЬ ПРИМЕЧАНИЕ"',

            'vopunc_title_placeholder_vagon_searsh': 'Примечание...',
            'vopunc_text_vagon_searsh': 'Добавьте примечание на выбранные вагоны.',

            //'vopunc_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            //'vopunc_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать операцию, для этого укажите дату начала операции и по необходимости дату завершения, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            //'vopunc_mess_info_filing': 'Выбрана подача. Чтобы выполнить операции над вагонами выберите вагон(ы).',
            //'vopunc_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            //'vopunc_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции и по необходимости дату завершения и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны», если нужно выбрать вагоны с открытыми и закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            //'vopunc_mess_info_wagon_mode_1': 'Выбран(ы) вагоны, по которым открыта операция. Укажите дату завершения операции и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с открытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            //'vopunc_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция. Вы можете править только организацию и время выполнения операции, укажите другую организацию, время выполнения и нажмите “править операцию”.',
            //'vopunc_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача. Операции не доступны!',
            //'vopunc_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',

            //'vopunc_mess_error_time_aplly': 'Укажите дату завершения операции',
            //'vopunc_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты [{0}] выполнения последней операции [{1}]',
            //'vopunc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            //'vopunc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            //'vopunc_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            'vopunc_mess_error_not_wagons_edit_note': 'Выберите вагоны для завершения операции правки примечания (в окне «ВЫБРАННЫЕ ВАГОНЫ», введите перечень вагонов, нажмите поиск и в таблице вагоны на АМКР выберите нужные вагоны).',
            //'vopunc_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',

            //'vopunc_mess_error_filing_organization_service': 'Выберите организацию выполняющую работу',

            //'vopunc_mess_error_period_time': 'Операция должна длиться не менее {0} мин.',
            //'vopunc_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',

            'vopunc_mess_cancel_operation_edit_note': 'Отмена операции "ПРАВИТЬ ПРИМЕЧАНИЕ"!',
            //'vopunc_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ОЧИСТКИ ВАГОНОВ"!',
            //'vopunc_mess_cancel_operation_mode_2': 'Отмена операции начала "ОЧИСТКИ" над вагонами подачи!',
            //'vopunc_mess_cancel_operation_mode_3': 'Отмена завершения операции "ОЧИСТКИ" над вагонами подачи!',
            //'vopunc_mess_cancel_operation_mode_4': 'Отмена правки статуса вагона после "ОЧИСТКИ"!',

            //'vopunc_mess_load_operation': 'Загружаю операции...',

            'vopunc_mess_init_panel': 'Выполняю инициализацию модуля ...',

            //'vopunc_confirm_title': 'Внимание!',
            'vopunc_confirm_mess_apply_edit_note': 'Выполнить операцию  "ПРАВИТЬ ПРИМЕЧАНИЕ" по {0} ваг.',
            //'vopunc_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала очистки {2} ваг., закрыта очистка по {3} вагонам, очистку выполняет {4}.',
            //'vopunc_confirm_mess_apply_update_filing_edit_operation': 'Править подачу {0}. Определено для правки {1} ваг., очистку выполняет {2}.',
            //'vopunc_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}. Определено для правки {1} ваг., закрыта очистка по {2} вагонам, очистку выполняет {3}.',
            //'vopunc_confirm_mess_apply_update_filing_organization_operation': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2}.',
            //'vopunc_confirm_mess_apply_update_filing_organization_operation_stop': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2} и новая дата завершения {3}.',
            //'vopunc_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути {0}?.',
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
            //var col_alert = {
            //    obj: 'bs_col',
            //    options: {
            //        id: 'col-alert-info',
            //        pref: 'md',
            //        size: 12,
            //        class: 'text-left',
            //        style: null,
            //    },
            //    childs: []
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
                    icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_group_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            //var alert_info = {
            //    obj: 'bs_alert',
            //    options: {
            //        id: 'alert-info',
            //        class: null,
            //        style: null,
            //        color: 'primary',
            //        bt_close: true,
            //        fn_click_close: null,
            //    },
            //    childs: []
            //};
            var form_textarea_vagon = {
                obj: 'bs_form_textarea',
                options: {
                    validation_group: 'common_note',
                    id: 'note2',
                    name: 'note2',
                    //label: langView('voprc_title_vagon_searsh', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopunc_title_placeholder_vagon_searsh', App.Langs),
                    element_required: false,
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
                    form_text: langView('vopunc_text_vagon_searsh', App.Langs),
                    form_text_class: null
                },
                childs: []
            };
            col_bt_apply.childs.push(bt_bt_apply);
            //col_alert.childs.push(alert_info)
            objs_filing_wagons_setup.push(col_bt_apply);
            //objs_filing_wagons_setup.push(col_alert);
            objs_filing_wagons_setup.push(form_textarea_vagon);
            this.form_group_wagons_setup.init({
                alert: this.main_alert,
                objs: objs_filing_wagons_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка. Определим режим
                        var valid = this.validation(result);
                        if (valid) {
                            var rows = this["twdgw_" + this.type_group].tab_com.get_select_row();
                            this.view_com.mcf_lg.open(
                                langView('vopunc_title_form_apply', App.Langs),
                                langView('vopunc_confirm_mess_apply_edit_note', App.Langs).format(rows.length),
                                function () {
                                    var list_wagons = [];
                                    // Получим перечень вагонов и новую позицию
                                    $.each(rows, function (i, el) {
                                        list_wagons.push(
                                            {
                                                id_wir: el.wirId,
                                                num: el.num,
                                            }
                                        )
                                    }.bind(this));
                                    var operation = {
                                        note_2: result.new.textarea_note2,
                                        wagons: list_wagons,
                                    };
                                    this.apply_update_wagons(operation);
                                }.bind(this),
                                function () {
                                    this.form_group_wagons_setup.validation_common_note.out_warning_message(langView('vopunc_mess_cancel_operation_edit_note', App.Langs));
                                }.bind(this)
                            );
                        }
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
        var validation = function (result) {
            // 0- add; >0 id ; null -not edit
            if (this.id_filing === null) { return false; }
            var valid = true;
            var rows = this["twdgw_" + this.type_group].tab_com.get_select_row();
            if (!rows || rows.length === 0) {
                this.form_group_wagons_setup.validation_common_note.out_error_message(langView('vopunc_mess_error_not_wagons_edit_note', App.Langs));
                valid = false;
            }
            return valid;
        }
        // Править группу
        var apply_update_wagons = function (data, callback) {
            this.view_com.api_wsd.postUpdateNote2WagonsGroup(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
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