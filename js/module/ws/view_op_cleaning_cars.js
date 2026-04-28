/* ===============================================
-= Модуль панель операции "ОЧИСТКА ВАГОНОВ" =-
  + js/view/shared/common.js
  + js/module/view_op_common.js
  + js/module/ws/table_ws.js
  + js/module/ws/view_op_common_filing.js  
==================================================*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vopclc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ОЧИСТКА ВАГОНОВ"',

            'vopclc_title_form_add': 'Создать подачу',
            'vopclc_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            'vopclc_title_form_apply': 'Править подачу',
            'vopclc_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            'vopclc_title_form_operation_open': 'Открыть операцию',
            'vopclc_title_form_operation_open_title': 'Открыть операцию по вагону(ам) в подаче.',
            'vopclc_title_form_operation_close': 'Закрыть операцию',
            'vopclc_title_form_operation_close_title': 'Закрыть операцию по вагону(ам) в подаче.',
            'vopclc_title_form_operation_apply': 'Править операцию',
            'vopclc_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            'vopclc_title_time_start': 'Время начала',
            'vopclc_text_time_start': 'Время начала операции ограниченно +(-)1день',
            'vopclc_title_placeholder_time_start': 'Время начала',

            'vopclc_title_time_stop': 'Время окончания',
            'vopclc_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            'vopclc_title_placeholder_time_stop': 'Время окончания',

            'vopclc_title_label_status_load': 'Статус:',
            'vopclc_text_label_status_load': 'Выберите статус (груж./порож.)...',

            'vopclc_title_label_organization_service': 'Организация:',
            'vopclc_text_label_organization_service': 'Выберите организацию обслуживания...',

            'vopclc_title_bt_edit_date_start': 'Править начало операции (только администратор).',
            'vopclc_title_bt_save_date_start': 'Обновить новое начало операции (только администратор).',
            'vopclc_title_bt_edit_date_stop': 'Править окончание операции (только администратор).',
            'vopclc_title_bt_save_date_stop': 'Обновить новое окончание операции (только администратор).',
            'vopclc_title_bt_edit_organization_service': 'Править организацию (только администратор).',
            'vopclc_title_bt_save_organization_service': 'Обновить организацию (только администратор).',
            'vopclc_title_bt_edit_status_load': 'Править статус (только администратор).',
            'vopclc_title_bt_save_status_load': 'Обновить статус (только администратор).',

            'vopclc_title_button_new_filing': 'Создать черновик',
            'vopclc_title_button_add_filing': 'Добавить в подачу',

            'vopclc_mess_warning_ban_edit_status': 'По выбранному вагону [{0}] запрет смены статуса, по вагону открыта следующая подача [{1}].',
            'vopclc_mess_warning_ban_edit_status1': 'По выбранном вагонам в кол [{0}] шт., запрет смены статуса, по вагонам разный предыдущий статус (порожний и грязный). Чистый-[{1}] шт., Порожний-[{2}] шт., Грязный-[{3}] шт., выберите вагоны с одинаковыми предыдущими статусами и смените статус!',
            'vopclc_mess_warning_ban_edit_status_close_wir': 'Внимание! По выбранному вагону [{0}] закрыта строка внутреннего перемещения, вагон сдан на УЗ!',
            'vopclc_mess_warning_ban_edit_status_outgoing_car': 'Внимание! По выбранному вагону [{0}] открыта операция предъявления, вагон сдается на УЗ!',

            'vopclc_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            'vopclc_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать операцию, для этого укажите дату начала операции и по необходимости дату завершения, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            'vopclc_mess_info_filing': 'Выбрана подача. Чтобы выполнить операции над вагонами выберите вагон(ы).',
            'vopclc_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            'vopclc_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции и по необходимости дату завершения и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны», если нужно выбрать вагоны с открытыми и закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopclc_mess_info_wagon_mode_1': 'Выбран(ы) вагоны, по которым открыта операция. Укажите дату завершения операции и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с открытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopclc_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция. Вы можете править только организацию и время выполнения операции, укажите другую организацию, время выполнения и нажмите “править операцию”.',
            'vopclc_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача. Операции не доступны!',
            'vopclc_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',

            'vopclc_mess_error_time_aplly': 'Укажите дату завершения операции',
            'vopclc_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты [{0}] выполнения последней операции [{1}]',
            'vopclc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            'vopclc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'vopclc_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            'vopclc_mess_error_not_wagons_close_filing': 'Выберите вагоны для завершения операции вподаче (в окне «ВАГОНЫ В ПОДАЧЕ», выберите вагоны).',
            'vopclc_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',

            'vopclc_mess_error_filing_organization_service': 'Выберите организацию выполняющую работу',

            'vopclc_mess_error_period_time': 'Операция должна длиться не менее {0} мин.',
            'vopclc_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',

            'vopclc_mess_cancel_operation_mode_0': 'Отмена операции создать подачу для "ОЧИСТКИ ВАГОНОВ"!',
            'vopclc_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ОЧИСТКИ ВАГОНОВ"!',
            'vopclc_mess_cancel_operation_mode_2': 'Отмена операции начала "ОЧИСТКИ" над вагонами подачи!',
            'vopclc_mess_cancel_operation_mode_3': 'Отмена завершения операции "ОЧИСТКИ" над вагонами подачи!',
            'vopclc_mess_cancel_operation_mode_4': 'Отмена правки статуса вагона после "ОЧИСТКИ"!',
            'vopclc_mess_cancel_correct_filing': 'Отмена правки подачи "ОЧИСТКИ"!',

            //'vopclc_mess_load_operation': 'Загружаю операции...',

            'vopclc_mess_init_panel': 'Выполняю инициализацию модуля ...',

            //'vopclc_confirm_title': 'Внимание!',
            'vopclc_confirm_mess_apply_create_filing': 'Создать подачу для операции "ОЧИСТКА ВАГОНОВ" на станции {0}, на пути {1}. Определено для подачи {2} ваг., определено для очистки {3} ваг., закрыта очистка по {4} вагонам, очистку выполняет {5}.',
            'vopclc_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала очистки {2} ваг., закрыта очистка по {3} вагонам, очистку выполняет {4}.',
            'vopclc_confirm_mess_apply_update_filing_edit_operation': 'Править подачу {0}. Определено для правки {1} ваг., очистку выполняет {2}.',
            'vopclc_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}. Определено для правки {1} ваг., закрыта очистка по {2} вагонам, очистку выполняет {3}.',
            'vopclc_confirm_mess_apply_update_filing_organization_operation': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2}.',
            'vopclc_confirm_mess_apply_update_filing_organization_operation_stop': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2} и новая дата завершения {3}.',
            'vopclc_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути {0}?.',
            'vopclc_mess_run_operation_correct_filing': 'Выполняю админ-операцию корректировки подачи {0}',
            'vopclc_confirm_mess_apply_correct_mode_30': 'Выполняю админ-операцию правки статуса подачи {0}. Определено для правки {1} ваг. В подаче по выбранным вагонам будет изменен статус очистки [{2}]!',

        },
        'en':  //default language: English
        {
            'vopclc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ОЧИСТКА ВАГОНОВ"',

            'vopclc_title_form_add': 'Создать подачу',
            'vopclc_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            'vopclc_title_form_apply': 'Править подачу',
            'vopclc_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            'vopclc_title_form_operation_open': 'Открыть операцию',
            'vopclc_title_form_operation_open_title': 'Открыть операцию по вагону(ам) в подаче.',
            'vopclc_title_form_operation_close': 'Закрыть операцию',
            'vopclc_title_form_operation_close_title': 'Закрыть операцию по вагону(ам) в подаче.',
            'vopclc_title_form_operation_apply': 'Править операцию',
            'vopclc_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            'vopclc_title_time_start': 'Время начала',
            'vopclc_text_time_start': 'Время начала операции ограниченно +(-)1день',
            'vopclc_title_placeholder_time_start': 'Время начала',

            'vopclc_title_time_stop': 'Время окончания',
            'vopclc_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            'vopclc_title_placeholder_time_stop': 'Время окончания',

            'vopclc_title_label_status_load': 'Статус:',
            'vopclc_text_label_status_load': 'Выберите статус (груж./порож.)...',

            'vopclc_title_label_organization_service': 'Организация:',
            'vopclc_text_label_organization_service': 'Выберите организацию обслуживания...',

            'vopclc_title_button_new_filing': 'Создать черновик',
            'vopclc_title_button_add_filing': 'Добавить в подачу',

            'vopclc_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            'vopclc_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать операцию, для этого укажите дату начала операции и по необходимости дату завершения, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            'vopclc_mess_info_filing': 'Выбрана подача. Чтобы выполнить операции над вагонами выберите вагон(ы).',
            'vopclc_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            'vopclc_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции и по необходимости дату завершения и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны», если нужно выбрать вагоны с открытыми и закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopclc_mess_info_wagon_mode_1': 'Выбран(ы) вагоны, по которым открыта операция. Укажите дату завершения операции и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с открытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopclc_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция. Вы можете править только организацию и время выполнения операции, укажите другую организацию, время выполнения и нажмите “править операцию”.',
            'vopclc_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача. Операции не доступны!',
            'vopclc_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',

            'vopclc_mess_error_time_aplly': 'Укажите дату завершения операции',
            'vopclc_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты [{0}] выполнения последней операции [{1}]',
            'vopclc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            'vopclc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'vopclc_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            'vopclc_mess_error_not_wagons_close_filing': 'Выберите вагоны для завершения операции вподаче (в окне «ВАГОНЫ В ПОДАЧЕ», выберите вагоны).',
            'vopclc_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',

            'vopclc_mess_error_filing_organization_service': 'Выберите организацию выполняющую работу',

            'vopclc_mess_error_period_time': 'Операция должна длиться не менее {0} мин.',
            'vopclc_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',

            'vopclc_mess_cancel_operation_mode_0': 'Отмена операции создать подачу для "ОЧИСТКИ ВАГОНОВ"!',
            'vopclc_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ОЧИСТКИ ВАГОНОВ"!',
            'vopclc_mess_cancel_operation_mode_2': 'Отмена операции начала "ОЧИСТКИ" над вагонами подачи!',
            'vopclc_mess_cancel_operation_mode_3': 'Отмена завершения операции "ОЧИСТКИ" над вагонами подачи!',
            'vopclc_mess_cancel_operation_mode_4': 'Отмена правки статуса вагона после "ОЧИСТКИ"!',

            //'vopclc_mess_load_operation': 'Загружаю операции...',

            'vopclc_mess_init_panel': 'Выполняю инициализацию модуля ...',

            //'vopclc_confirm_title': 'Внимание!',
            'vopclc_confirm_mess_apply_create_filing': 'Создать подачу для операции "ОЧИСТКА ВАГОНОВ" на станции {0}, на пути {1}. Определено для подачи {2} ваг., определено для очистки {3} ваг., закрыта очистка по {4} вагонам, очистку выполняет {5}.',
            'vopclc_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала очистки {2} ваг., закрыта очистка по {3} вагонам, очистку выполняет {4}.',
            'vopclc_confirm_mess_apply_update_filing_edit_operation': 'Править подачу {0}. Определено для правки {1} ваг., очистку выполняет {2}.',
            'vopclc_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}. Определено для правки {1} ваг., закрыта очистка по {2} вагонам, очистку выполняет {3}.',
            'vopclc_confirm_mess_apply_update_filing_organization_operation': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2}.',
            'vopclc_confirm_mess_apply_update_filing_organization_operation_stop': 'Править подачу {0}. Определено для правки {1} ваг., указана новая организация {2} и новая дата завершения {3}.',
            'vopclc_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути {0}?.',
            'vopclc_mess_run_operation_correct_filing': 'Выполняю админ-операцию корректировки подачи {0}',
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
    function view_op_cleaning_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
        this.cfiling = new VIEW_CFILING();
        this.access = {};
    }

    // инициализация модуля
    view_op_cleaning_cars.prototype.init = function (options) {
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
            this.list_status_cleaning = [];
            this.default_organization_service = 1;
            this.default_status_cleaning = App.wsd_setup.loading_status.empty_clean;
        }
        // Загрузка дополнительных библиотек ()
        var load_db_operation = function (callback) {
            if (typeof callback === 'function') {
                callback();
            }
        }
        // Продолжение инициализации после загрузки всех библиотек (привязка к новым переменным)
        var after_loading_init = function (callback) {
            //this.list_organization_service = [{ value: 0, text: 'АМКР' }, { value: 1, text: 'Макстайп' }];
            this.list_status_cleaning = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(this.settings.wagon_operation);
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
                    text: langView('vopclc_title_form_add', App.Langs),
                    title: langView('vopclc_title_form_add_title', App.Langs),
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
                    text: langView('vopclc_title_form_apply', App.Langs),
                    title: langView('vopclc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
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
                    text: langView('vopclc_title_form_operation_open', App.Langs),
                    title: langView('vopclc_title_form_operation_open_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-folder-open',  //<i class="fa-regular fa-folder-open"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
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
                    text: langView('vopclc_title_form_operation_close', App.Langs),
                    title: langView('vopclc_title_form_operation_close_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-folder-closed',  //<i class="fa-regular fa-folder-closed"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
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
                    text: langView('vopclc_title_form_operation_apply', App.Langs),
                    title: langView('vopclc_title_form_operation_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
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

            var bt_edit_date_start = {
                obj: 'bs_button',
                options: {
                    id: 'edit_date_start',
                    name: 'edit_date_start',
                    class: null,
                    fsize: 'sm',
                    color: 'danger',
                    text: null,
                    title: langView('vopclc_title_bt_edit_date_start', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',//<i class="fa-solid fa-pen-to-square"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rRW || this.rCorrect || this.rAdm) {
                            this.view_set_date_start_edit.call(this);
                        }
                    }.bind(this),
                }
            };
            var bt_save_date_start = {
                obj: 'bs_button',
                options: {
                    id: 'save_date_start',
                    name: 'save_date_start',
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: null,
                    title: langView('vopclc_title_bt_save_date_start', App.Langs),
                    icon_fa_left: 'fa-solid fa-floppy-disk',//<i class="fa-solid fa-floppy-disk"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rRW || this.rCorrect || this.rAdm) {
                            this.view_set_date_start_save.call(this);
                        }
                    }.bind(this),
                }
            };
            var form_input_datetime_time_start = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'time_start',
                    name: 'time_start',
                    label: langView('vopclc_title_time_start', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopclc_title_placeholder_time_start', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: moment().subtract(1, 'days').format("YYYY-MM-DDTHH:mm"), //"2024-05-05T00:00"
                    element_max: moment().add(1, 'days').format("YYYY-MM-DDTHH:mm"),
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
                    group_append_class: null,
                    group_append_id: null,
                    group_append_html: null,
                    group_append_objs: [bt_edit_date_start, bt_save_date_start],
                    form_text: langView('vopclc_text_time_start', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var bt_edit_date_stop = {
                obj: 'bs_button',
                options: {
                    id: 'edit_date_stop',
                    name: 'edit_date_stop',
                    class: null,
                    fsize: 'sm',
                    color: 'danger',
                    text: null,
                    title: langView('vopclc_title_bt_edit_date_stop', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',//<i class="fa-solid fa-pen-to-square"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rCorrect || this.rAdm) {
                            this.view_set_date_stop_edit.call(this);
                        }
                    }.bind(this),
                }
            };
            var bt_save_date_stop = {
                obj: 'bs_button',
                options: {
                    id: 'save_date_stop',
                    name: 'save_date_stop',
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: null,
                    title: langView('vopclc_title_bt_save_date_stop', App.Langs),
                    icon_fa_left: 'fa-solid fa-floppy-disk',//<i class="fa-solid fa-floppy-disk"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rCorrect || this.rAdm) {
                            this.view_set_date_stop_save.call(this);
                        }
                    }.bind(this),
                }
            };
            var form_input_datetime_time_stop = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'time_stop',
                    name: 'time_stop',
                    label: langView('vopclc_title_time_stop', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopclc_title_placeholder_time_stop', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: moment().subtract(1, 'days').format("YYYY-MM-DDTHH:mm"), //"2024-05-05T00:00"
                    element_max: moment().add(1, 'days').format("YYYY-MM-DDTHH:mm"),
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
                    group_append_class: null,
                    group_append_id: null,
                    group_append_html: null,
                    group_append_objs: [bt_edit_date_stop, bt_save_date_stop],
                    form_text: langView('vopclc_text_time_stop', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var bt_edit_organization_service = {
                obj: 'bs_button',
                options: {
                    id: 'edit_organization_service',
                    name: 'edit_organization_service',
                    class: null,
                    fsize: 'sm',
                    color: 'danger',
                    text: null,
                    title: langView('vopclc_title_bt_edit_organization_service', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',//<i class="fa-solid fa-pen-to-square"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rCorrect || this.rAdm) {
                            this.view_set_organization_service_edit.call(this);
                        }
                    }.bind(this),
                }
            };
            var bt_save_organization_service = {
                obj: 'bs_button',
                options: {
                    id: 'save_organization_service',
                    name: 'save_organization_service',
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: null,
                    title: langView('vopclc_title_bt_save_organization_service', App.Langs),
                    icon_fa_left: 'fa-solid fa-floppy-disk',//<i class="fa-solid fa-floppy-disk"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rCorrect || this.rAdm) {
                            this.view_set_organization_service_save.call(this);
                        }
                    }.bind(this),
                }
            };
            var form_select_organization_service = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_organization_service',
                    name: 'id_organization_service',
                    label: langView('vopclc_title_label_organization_service', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: true,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.list_organization_service,
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
                    group_append_class: null,
                    group_append_id: null,
                    group_append_html: null,
                    group_append_objs: [bt_edit_organization_service, bt_save_organization_service],
                    form_text: langView('vopclc_text_label_organization_service', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var bt_edit_status_load = {
                obj: 'bs_button',
                options: {
                    id: 'edit_status_load',
                    name: 'edit_status_load',
                    class: null,
                    fsize: 'sm',
                    color: 'danger',
                    text: null,
                    title: langView('vopclc_title_bt_edit_status_load', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',//<i class="fa-solid fa-pen-to-square"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rCorrect || this.rAdm) {
                            this.view_setup_filing({ status_load_edit: true });
                        }
                    }.bind(this),
                }
            };
            var bt_save_status_load = {
                obj: 'bs_button',
                options: {
                    id: 'save_status_load',
                    name: 'save_status_load',
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: null,
                    title: langView('vopclc_title_bt_save_status_load', App.Langs),
                    icon_fa_left: 'fa-solid fa-floppy-disk',//<i class="fa-solid fa-floppy-disk"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        if (this.rCorrect || this.rAdm) {
                            this.view_setup_filing({ status_load_save: true });
                        }
                    }.bind(this),
                }
            };
            var form_select_status_load = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_status_load',
                    name: 'id_status_load',
                    label: langView('vopclc_title_label_status_load', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: false,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.list_status_cleaning,
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
                    group_append_class: null,
                    group_append_id: null,
                    group_append_html: null,
                    group_append_objs: [bt_edit_status_load, bt_save_status_load],
                    form_text: langView('vopclc_text_label_status_load', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            col_bt_apply.childs.push(bt_bt_add);
            col_bt_apply.childs.push(bt_bt_apply);
            col_bt_apply.childs.push(bt_operation_open);
            col_bt_apply.childs.push(bt_operation_close);
            col_bt_apply.childs.push(bt_operation_apply);
            col_alert.childs.push(alert_info)
            objs_filing_wagons_setup.push(col_bt_apply);
            objs_filing_wagons_setup.push(col_alert);
            objs_filing_wagons_setup.push(form_input_datetime_time_start);
            objs_filing_wagons_setup.push(form_input_datetime_time_stop);
            objs_filing_wagons_setup.push(form_select_organization_service);
            objs_filing_wagons_setup.push(form_select_status_load);
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
                                    mode = 1; // Пока не используется (нечево править)
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
                                        message = langView('vopclc_confirm_mess_apply_create_filing', App.Langs).format(this.form_filing_setup.el.select_id_station_unload.text(),
                                            this.form_from_setup.el.select_id_way_unload.text(),
                                            (this.filing_wagons ? this.filing_wagons.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0),
                                            (rows ? this.form_filing_wagons_setup.el.select_id_organization_service.text() : ''),
                                        );
                                        break;
                                    }
                                    // Пока не используется (нечево править)
                                    //case 1: {
                                    //    message = langView('vopclc_confirm_mess_apply_update_filing', App.Langs).format(this.id_filing, this.form_filing_setup.el.select_id_station_unload.text(), this.form_filing_wagons_setup.el.datalist_id_devision_from.text());
                                    //    break;
                                    //}
                                    case 2: {
                                        message = langView('vopclc_confirm_mess_apply_update_filing_start_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0),
                                            (rows ? this.form_filing_wagons_setup.el.select_id_organization_service.text() : '')
                                        );
                                        break;
                                    }
                                    case 3: {
                                        if (dt_stop !== null) {
                                            message = langView('vopclc_confirm_mess_apply_update_filing_stop_operation', App.Langs).format(this.id_filing,
                                                (rows ? rows.length : 0),
                                                (dt_stop !== null ? (rows ? rows.length : 0) : 0),
                                                (rows ? this.form_filing_wagons_setup.el.select_id_organization_service.text() : '')
                                            );
                                        } else {
                                            message = langView('vopclc_confirm_mess_apply_update_filing_edit_operation', App.Langs).format(this.id_filing,
                                                (rows ? rows.length : 0),
                                                (rows ? this.form_filing_wagons_setup.el.select_id_organization_service.text() : '')
                                            );
                                        }
                                        break;
                                    }
                                    case 4: {
                                        if (dt_stop !== null) {
                                            message = langView('vopclc_confirm_mess_apply_update_filing_organization_operation_stop', App.Langs).format(this.id_filing,
                                                (rows ? rows.length : 0),
                                                (rows ? this.form_filing_wagons_setup.el.select_id_organization_service.text() : ''),
                                                this.form_filing_wagons_setup.el.input_datetime_time_stop.val().format(format_datetime)
                                            );
                                        } else {
                                            message = langView('vopclc_confirm_mess_apply_update_filing_organization_operation', App.Langs).format(this.id_filing,
                                                (rows ? rows.length : 0),
                                                (rows ? this.form_filing_wagons_setup.el.select_id_organization_service.text() : '')
                                            );
                                        }
                                        break;
                                    }
                                }
                                this.view_com.mcf_lg.open(
                                    langView('vopclc_title_form_apply', App.Langs),
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
                                                            id_wagon_operations: row ? App.wsd_setup.operations.cleaning : null,            // (17) можно править пока подача не закрыта
                                                            id_status_load: row ? Number(result.new.select_id_status_load) : null,         // можно править пока подача не закрыта
                                                            id_organization_service: rows ? Number(result.new.select_id_organization_service) : null,         // можно править пока подача не закрыта
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию

                                                var operation = {
                                                    id_filing: this.id_filing,              // 0 новая, >0 Правим существующую
                                                    type_filing: this.type_filing,          // 3 = очистка
                                                    id_way: this.id_way_unload,             // !только новая подача
                                                    wagons: list_wagons,
                                                };
                                                this.apply_add_filing(operation);
                                            }
                                        };
                                        // Править подачи // Пока не используется (нечево править)
                                        //if (mode === 1 && result.new.datalist_id_devision_from) {
                                        //    if (this.id_filing !== null) { }
                                        //    var operation = {
                                        //        id_filing: this.id_filing,
                                        //        mode: mode,
                                        //        id_division: Number(result.new.datalist_id_devision_from),
                                        //    };
                                        //    this.apply_update_filing(operation);
                                        //};
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
                                                            id_wagon_operations: App.wsd_setup.operations.cleaning,             // (17) можно править пока подача не закрыта
                                                            id_status_load: Number(result.new.select_id_status_load),           // можно править пока подача не закрыта
                                                            id_organization_service: Number(result.new.select_id_organization_service),         // можно править пока подача не закрыта
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
                                                            stop: result.new.input_datetime_time_stop !== null ? result.new.input_datetime_time_stop._i : null,
                                                            id_wagon_operations: el.currentIdOperation,
                                                            id_status_load: Number(result.new.select_id_status_load),            // можно править пока подача не закрыта
                                                            id_organization_service: Number(result.new.select_id_organization_service),
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
                                                            stop: result.new.input_datetime_time_stop !== null ? result.new.input_datetime_time_stop._i : null,                                                              // можно править пока подача не закрыта
                                                            id_wagon_operations: el.currentIdOperation,
                                                            id_status_load: null,
                                                            id_organization_service: Number(result.new.select_id_organization_service), // можно править пока подача не закрыта
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
                                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vopclc_mess_cancel_operation_mode_' + mode, App.Langs));
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
                console.log('Close view_op_cleaning_cars');

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
                //countCleaningWagons: row ? (row.filingWayEnd !== null && (row.currentIdLoadingStatus === App.wsd_setup.loading_status.empty_clean || row.currentIdLoadingStatus !== App.wsd_setup.loading_status.empty) ? 1 : 0) : 0,
                countCleaningWagons: row ? (row.filingWayEnd !== null && (row.filingIdLoadingStatus === App.wsd_setup.loading_status.empty_clean || row.filingIdLoadingStatus !== App.wsd_setup.loading_status.empty) ? 1 : 0) : 0,
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
                currentWimcId: row.currentWimcId, // ID текущей строки груза 
                internalDocNum: row.internalDocNum,
                idWeighingNum: row.idWeighingNum,
                moveCargoDocReceived: row.moveCargoDocReceived,
                // Текущий груз (составной )
                currentCargoIdGroup: row.currentCargoIdGroup,
                currentCargoIdCargo: row.currentCargoIdCargo,
                currentInternalCargoIdGroup: row.currentInternalCargoIdGroup,
                currentInternalCargoIdInternalCargo: row.currentInternalCargoIdInternalCargo,
                viewCurrentCargoNameRu: row.viewCurrentCargoNameRu,
                viewCurrentCargoNameEn: row.viewCurrentCargoNameEn,
                viewCurrentCargoGroupNameRu: row.viewCurrentCargoGroupNameRu,
                viewCurrentCargoGroupNameEn: row.viewCurrentCargoGroupNameEn,
                //currentCargoGroupNameRu: row.currentCargoGroupNameRu,
                //currentCargoGroupNameEn: row.currentCargoGroupNameEn,
                //currentCargoNameRu: row.currentCargoNameRu,
                //currentCargoNameEn: row.currentCargoNameEn,
                //currentInternalCargoGroupNameRu: row.currentInternalCargoGroupNameRu,
                //currentInternalCargoGroupNameEn: row.currentInternalCargoGroupNameEn,
                //currentInternalCargoNameRu: row.currentInternalCargoNameRu,
                //currentInternalCargoNameEn: row.currentInternalCargoNameEn,
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
                //filingIdOrganizationService: row.filingIdOrganizationService,
                //filingOrganizationServiceRu: row.filingOrganizationServiceRu,
                //filingOrganizationServiceEn: row.filingOrganizationServiceEn,
                // Предыдущий груз
                oldIdOperation: row && row.oldIdOperation ? row.oldIdOperation : null,
                oldOperationNameRu: row && row.oldOperationNameRu ? row.oldOperationNameRu : null,
                oldOperationNameEn: row && row.oldOperationNameEn ? row.oldOperationNameEn : null,
                oldWimcId: row && row.oldWimcId ? row.oldWimcId : null,
                oldCargoIdCargo: row && row.oldCargoIdCargo ? row.oldCargoIdCargo : null,
                oldInternalCargoIdInternalCargo: row && row.oldInternalCargoIdInternalCargo ? row.oldInternalCargoIdInternalCargo : null,
                viewOldCargoNameRu: row && row.viewOldCargoNameRu ? row.viewOldCargoNameRu : null,
                viewOldCargoNameEn: row && row.viewOldCargoNameEn ? row.viewOldCargoNameEn : null,
                //-------------------------------------------------
            };
        }
        // Отображение элементов окна правки и создания подачи и операции (в зависимости от операции)
        var view_setup_filing = function (command) {
            var s_reg = s_reg;
            var s_not_reg = s_not_reg;
            var s_check = 'check-field';
            var s_valid = 'is-valid';
            var s_invalid = 'is-invalid';
            var s_all = s_reg + ' ' + s_not_reg + ' ' + s_check + ' ' + s_not_reg + ' ' + s_valid + ' ' + s_invalid;

            // Включить правку статуса
            var view_set_status_load_edit = function () {
                if (this.rCorrect || this.rAdm) {
                    //var id_status_load = this.form_filing_wagons_setup.el.select_id_status_load.val();
                    var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                    var e_status = true;
                    var old_wio = []; // список придыдущих операци
                    LockScreen(langView('vopulc_mess_load_filing_wagon', App.Langs));
                    this.view_com.api_wsd.GetViewNextFilingOfIdFiling(this.id_filing, function (result) {
                        if (result && result.length > 0 && rows && rows.length > 0) {
                            $.each(result, function (i, el) {
                                var sel_wag = rows.find(function (o) {
                                    return o.num === el.num;
                                }.bind(this));
                                if (sel_wag) {
                                    if (el.idFilingNext !== null) {
                                        e_status = false;
                                        this.filing_wagons_alert.out_warning_message(langView('vopclc_mess_warning_ban_edit_status', App.Langs).format(el.num, el.idFilingNext));
                                    } else {
                                        if (el.wirClose !== null) {
                                            this.filing_wagons_alert.out_warning_message(langView('vopclc_mess_warning_ban_edit_status_close_wir', App.Langs).format(el.num));
                                        } else if (el.idOutgoingCar !== null) {
                                            this.filing_wagons_alert.out_warning_message(langView('vopclc_mess_warning_ban_edit_status_outgoing_car', App.Langs).format(el.num));
                                        }
                                        old_wio.push({ num: el.num, id_operation: el.wioOldIdOperation, id_status_load: el.wioOldLoadingStatus });
                                    }
                                }
                            }.bind(this));
                            // Разрешение правки статуса
                            if (e_status) {
                                // Проверим статус погрзки должен быть одинаковый по всем вагонам
                                var empty_clean = old_wio.filter(function (i) {
                                    return i.id_status_load === App.wsd_setup.loading_status.empty_clean;
                                }.bind(this));
                                var empty = old_wio.filter(function (i) {
                                    return i.id_status_load === App.wsd_setup.loading_status.empty;
                                }.bind(this));
                                var dirty = old_wio.filter(function (i) {
                                    return i.id_status_load === App.wsd_setup.loading_status.dirty;
                                }.bind(this));
                                if ((empty.length > 0 && dirty.length === 0) ||
                                    (empty.length === 0 && dirty.length > 0)) {
                                    this.list_status_cleaning = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(rows[0].filingIdOperation);
                                    // Если нет вагонов со статусом грязный, тогда уберем статус грязный из списка.
                                    if (dirty.length === 0) {
                                        this.list_status_cleaning = this.list_status_cleaning.filter(function (i) {
                                            return i.value !== App.wsd_setup.loading_status.dirty;
                                        }.bind(this));
                                    }
                                    // Если нет вагонов со статусом порожний, тогда уберем статус порожний из списка.
                                    if (empty.length === 0) {
                                        this.list_status_cleaning = this.list_status_cleaning.filter(function (i) {
                                            return i.value !== App.wsd_setup.loading_status.empty;
                                        }.bind(this));
                                    }
                                    this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_cleaning, rows[0].filingIdLoadingStatus)
                                    this.form_filing_wagons_setup.el.select_id_status_load.enable();
                                    this.form_filing_wagons_setup.el.button_edit_status_load.hide();
                                    this.form_filing_wagons_setup.el.button_save_status_load.show();
                                } else {
                                    this.form_filing_setup.validation_common_filing.out_warning_message(langView('vopclc_mess_warning_ban_edit_status1', App.Langs).format(old_wio.length, (empty_clean ? empty_clean.length : 0), (empty ? empty.length : 0), (dirty ? dirty.length : 0)));
                                }
                            }
                            LockScreenOff();
                        } else {
                            LockScreenOff();
                        }
                    }.bind(this));
                }
            }
            // Обновить правку статуса (mode:30)
            var view_set_status_load_save = function () {
                var valid = true;
                var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                var id_status_load = this.form_filing_wagons_setup.el.select_id_status_load.val();
                if (id_status_load < 0) {
                    this.form_filing_wagons_setup.set_element_validation_error('id_status_load', langView('vopclc_mess_error_not_wagons_status_close_filing', App.Langs), false);
                    valid = false;
                }
                // выполнить операцию
                if (valid) {
                    var list_wagons = [];
                    if (rows && rows.length > 0 && this.id_filing !== null) {
                        $.each(rows, function (i, el) {
                            list_wagons.push(
                                {
                                    id_wim: el.idWim,
                                    start: null,
                                    stop: null,
                                    id_wagon_operations: null,
                                    id_status_load: id_status_load,
                                    id_organization_service: null
                                });
                        }.bind(this));
                        // Сформируем операцию
                        var operation = {
                            id_filing: this.id_filing,
                            num_filing: null,
                            vesg: null,
                            doc_received: null,
                            mode: 30,
                            wagons: list_wagons
                        };
                        view_correct_filing.call(this, operation);
                    }
                }
            }
            // Показать выбор админ операции
            var view_correct_filing = function (data, callback) {
                var mess = "";
                if (data && data.wagons) {
                    switch (data.mode) {
                        // Обновить статус (mode:30)
                        case 30: {
                            var status_load = this.view_com.api_dir.getWagonLoadingStatus_Of_Id(data.wagons[0].id_status_load);
                            mess = langView('vopclc_confirm_mess_apply_correct_mode_' + data.mode, App.Langs).format(
                                this.id_filing,
                                (data.wagons ? data.wagons.length : 0),
                                (status_load ? status_load['loadingStatus' + ucFirst(App.Lang)] : '-')
                            );
                            break;
                        }
                    }
                    //
                    this.view_com.mcf_lg.open(
                        langView('vopclc_title_form_apply', App.Langs),
                        mess,
                        function () {
                            this.apply_correct_filing(data, callback);
                        }.bind(this),
                        function () {
                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vopclc_mess_cancel_correct_filing', App.Langs));
                        }.bind(this)
                    );
                } else {

                }

            }
            // 
            var view_setup_operation_open = function () {
                var roles = [this.rRW, this.rAdm];
                // есть выбранные вагоны
                if (rows !== null && rows.length > 0) {
                    this.el_enable(this.form_filing_wagons_setup.el.input_datetime_time_start, roles);
                    this.el_enable(this.form_filing_wagons_setup.el.input_datetime_time_stop, roles);
                    //this.form_filing_wagons_setup.el.input_datetime_time_start.enable();
                    //this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.$element.removeClass(s_all).addClass(s_reg);
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass(s_all).addClass(s_not_reg);
                    this.form_filing_wagons_setup.el.input_datetime_time_start.val(moment());
                    this.el_enable(this.form_filing_wagons_setup.el.select_id_organization_service, roles);
                    //this.form_filing_wagons_setup.el.select_id_organization_service.enable();
                }
                view_set_date_stop.call(this, false);
            }
            // Проверка на ввод даты окончания операции (режимы править или закрыть)
            var view_set_date_stop = function (isValid) {
                var roles = [this.rRW, this.rAdm];
                if (this.fw_status === 0 || this.fw_status === 1) {
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_open.hide();
                    this.form_filing_wagons_setup.el.button_operation_close.hide();
                    // Проверим введена дата окончания или дата документа
                    if (isValid) {
                        //this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.el_enable(this.form_filing_wagons_setup.el.input_datetime_time_stop, roles);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass(s_all).addClass(s_reg);
                        this.form_filing_wagons_setup.el.select_id_organization_service.$element.removeClass(s_all).addClass(s_reg);
                        this.el_enable(this.form_filing_wagons_setup.el.select_id_organization_service, roles);
                        //this.form_filing_wagons_setup.el.select_id_organization_service.enable();
                        this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass(s_all).addClass(s_reg);
                        this.el_enable(this.form_filing_wagons_setup.el.select_id_status_load, roles);
                        //this.form_filing_wagons_setup.el.select_id_status_load.enable();
                        this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_cleaning, this.default_status_cleaning);
                        if (this.id_filing !== 0) {
                            this.bt_show(this.form_filing_wagons_setup.el.button_operation_close, roles);
                            /*                            this.form_filing_wagons_setup.el.button_operation_close.show();*/
                        }
                    } else {
                        //this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.el_enable(this.form_filing_wagons_setup.el.input_datetime_time_stop, roles);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass(s_all).addClass(s_not_reg);
                        //this.form_filing_wagons_setup.el.select_id_organization_service.enable();
                        this.el_enable(this.form_filing_wagons_setup.el.select_id_organization_service, roles);
                        //this.form_filing_wagons_setup.el.select_id_organization_service.val(-1);
                        this.form_filing_wagons_setup.el.select_id_organization_service.$element.removeClass(s_all).addClass(s_not_reg);
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.val(-1);
                        this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass(s_all);
                        if (this.id_filing !== 0) {
                            if (this.fw_status === 0) {
                                //this.form_filing_wagons_setup.el.button_operation_open.show();
                                this.bt_show(this.form_filing_wagons_setup.el.button_operation_open, roles);
                            } else {
                                //this.form_filing_wagons_setup.el.button_operation_apply.show();
                                this.bt_show(this.form_filing_wagons_setup.el.button_operation_apply, roles);
                            }
                        }
                        //else {
                        //    //this.form_filing_wagons_setup.el.button_operation_open.show();
                        //}
                    }
                }
            }
            // Отображение кнопок (админ и корект)
            var view_set_correct = function () {
                // (Админка) коррекция
                if (this.fw_status === 2 || this.fw_status === 3) {
                    var roles = [this.rCorrect, this.rAdm];
                    //var roles1 = [this.rRW, this.rCorrect, this.rAdm];
                    this.bt_show(this.form_filing_wagons_setup.el.button_edit_date_start, roles);
                    this.bt_show(this.form_filing_wagons_setup.el.button_edit_date_stop, roles);
                    this.bt_show(this.form_filing_wagons_setup.el.button_edit_status_load, roles);
                    //this.bt_show(this.form_filing_wagons_setup.el.button_edit_organization_service, roles);
                }
            }

            this.clear_all();
            // Проверка на команды вызова функций
            if (command) {
                if (typeof command.time_stop === "boolean") { view_set_date_stop.call(this, command.time_stop); return; }
                if (typeof command.status_load_edit === "boolean") { view_set_status_load_edit.call(this, command.status_load_edit); return; }
                if (typeof command.status_load_save === "boolean") { view_set_status_load_save.call(this, command.status_load_save); return; }
            }

            this.filing_wagons_alert_info.clear_message();
            this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_start', App.Langs));

            // Обновим кнопку добавить в подачу\создать черновик
            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row(); // Получим выбранные вагоны в подаче
            var rows_all = this["tfw_" + this.type_filing].tab_com.obj_t_report.rows().data().toArray();    // Получим все вагоны в подаче
            var bts = this["twwf_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            //bts.enable();
            if (this.rRW || this.rAdm) {
                bts.enable();
            } else {
                bts.disable();
            }
            bts.text(langView('vopclc_title_button_new_filing', App.Langs));
            //var fws_bts = this["tfw_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            //fws_bts.disable();

            // Сбросим все настройки
            this.form_filing_wagons_setup.el.button_filing_add.hide();
            this.form_filing_wagons_setup.el.button_filing_apply.hide();
            /*this.form_filing_wagons_setup.el.button_operation_apply.hide();*/
            this.form_filing_wagons_setup.el.button_operation_apply.hide();
            this.form_filing_wagons_setup.el.button_operation_open.hide();
            this.form_filing_wagons_setup.el.button_operation_close.hide();

            this.form_filing_wagons_setup.el.input_datetime_time_start.min(moment().subtract(1, 'days').format("YYYY-MM-DDTHH:mm"));
            this.form_filing_wagons_setup.el.input_datetime_time_start.max(moment().add(1, 'days').format("YYYY-MM-DDTHH:mm"));
            this.form_filing_wagons_setup.el.input_datetime_time_start.$element.removeClass(s_all);
            this.form_filing_wagons_setup.el.input_datetime_time_stop.min(moment().subtract(10, 'days').format("YYYY-MM-DDTHH:mm"));
            this.form_filing_wagons_setup.el.input_datetime_time_stop.max(moment().add(10, 'days').format("YYYY-MM-DDTHH:mm"));

            this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass(s_all);
            this.form_filing_wagons_setup.el.select_id_organization_service.$element.removeClass(s_all);
            this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass(s_all);

            // Время
            this.form_filing_wagons_setup.el.button_edit_date_start.hide();
            this.form_filing_wagons_setup.el.button_save_date_start.hide();
            this.form_filing_wagons_setup.el.button_edit_date_stop.hide();
            this.form_filing_wagons_setup.el.button_save_date_stop.hide();
            this.form_filing_wagons_setup.el.button_edit_organization_service.hide();
            this.form_filing_wagons_setup.el.button_save_organization_service.hide();
            this.form_filing_wagons_setup.el.button_edit_status_load.hide();
            this.form_filing_wagons_setup.el.button_save_status_load.hide();

            this.form_filing_wagons_setup.el.input_datetime_time_start.val(null);
            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
            if (rows_all && rows_all.length > 0) {
                this.form_filing_wagons_setup.el.select_id_organization_service.val(rows_all[0].filingIdOrganizationService);
            }
            //this.form_filing_wagons_setup.el.select_id_organization_service.val(this.default_organization_service);
            this.form_filing_wagons_setup.el.select_id_status_load.val(-1);

            this.form_filing_wagons_setup.el.input_datetime_time_start.disable();
            this.form_filing_wagons_setup.el.input_datetime_time_stop.disable();
            this.form_filing_wagons_setup.el.select_id_organization_service.disable();
            this.form_filing_wagons_setup.el.select_id_status_load.disable();

            if (this.id_filing === 0) {
                // черновик
                //fws_bts.enable();
                this.filing_wagons_alert_info.clear_message();
                this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_draft', App.Langs));
                this.bt_show(this.form_filing_wagons_setup.el.button_filing_add, [this.rRW, this.rAdm]);
                //this.form_filing_wagons_setup.el.button_filing_add.show();
                this.form_filing_wagons_setup.el.button_filing_apply.hide();
                this.form_filing_wagons_setup.el.button_operation_apply.hide();
                this.form_filing_wagons_setup.el.button_operation_open.hide();
                this.form_filing_wagons_setup.el.button_operation_close.hide();
                view_setup_operation_open.call(this);
            };
            if (this.id_filing > 0) {
                bts.text(langView('vopclc_title_button_add_filing', App.Langs));
                this.filing_wagons_alert_info.clear_message();
                if (this.close_filing !== null) bts.disable();
                // Выбрана подача (покажем данные по подаче)
                if (this.create_filing) {
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    if (this.close_filing === null) this.bt_show(this.form_filing_wagons_setup.el.button_filing_apply, [this.rRW]); //this.form_filing_wagons_setup.el.button_filing_apply.show();
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_open.hide();
                    this.form_filing_wagons_setup.el.button_operation_close.hide();
                } else {
                    //this.form_filing_wagons_setup.el.button_filing_add.show();
                    this.bt_show(this.form_filing_wagons_setup.el.button_filing_add, [this.rRW, this.rAdm]);
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_open.hide();
                    this.form_filing_wagons_setup.el.button_operation_close.hide();
                }
                this.form_filing_wagons_setup.el.input_datetime_time_start.val(this.create_filing ? moment(this.create_filing) : moment());
                this.form_filing_wagons_setup.el.input_datetime_time_stop.val(this.create_filing ? moment(this.close_filing) : null);
                if (this.close_filing === null) {
                    this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_filing', App.Langs));
                } else {
                    if (this.fw_status === null) this.bt_show(this.form_filing_wagons_setup.el.button_edit_organization_service, [this.rCorrect, this.rAdm]);
                    this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_filing_close', App.Langs));
                }
                this.form_filing_wagons_setup.el.select_id_status_load.val(this.status_load);
                switch (this.fw_status) {
                    case 0: {
                        // выбраны вагоны без операциии(можно открыть)
                        //fws_bts.enable();
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_wagon_mode_0', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.bt_show(this.form_filing_wagons_setup.el.button_operation_open, [this.rRW, this.rAdm]);
                        /*                        this.form_filing_wagons_setup.el.button_operation_open.show();*/
                        this.form_filing_wagons_setup.el.button_operation_close.hide();
                        view_setup_operation_open.call(this);
                        break;
                    }
                    case 1: {
                        // выбраны вагоны операция открыта (можна закрыть или обновить открытую)

                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_wagon_mode_1', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_open.hide();
                        this.bt_show(this.form_filing_wagons_setup.el.button_operation_close, [this.rRW, this.rAdm]);
                        //this.form_filing_wagons_setup.el.button_operation_close.show();
                        this.el_enable.call(this, this.form_filing_wagons_setup.el.input_datetime_time_stop, [this.rRW]);
                        /*                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();*/
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(moment());
                        this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_cleaning, this.default_status_cleaning)

                        view_set_date_stop.call(this, true); // отобразить закрыть
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length === 1 ? moment(rows[0].currentOperationStart) : null);
                        //this.form_filing_wagons_setup.el.select_id_organization_service.enable();
                        /*                        this.form_filing_wagons_setup.el.select_id_organization_service.val(rows && rows.length > 0 ? rows[0].currentIdOrganizationService : this.default_organization_service); // Заменить на поле организации*/
                        break;
                    }
                    case 2: {
                        // выбраны вагоны операция закрыта (можно исправить админ-операции или обновить документ по грузу)
                        this.filing_wagons_alert_info.clear_message();
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        if (this.close_filing === null) {

                            /*this.form_filing_wagons_setup.el.button_operation_apply.show();*/
                            this.bt_show(this.form_filing_wagons_setup.el.button_operation_apply, [this.rRW, this.rAdm]);
                            this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_wagon_mode_2', App.Langs));
                            this.form_filing_wagons_setup.el.select_id_organization_service.$element.addClass(s_reg);
                            this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length === 1 ? moment(rows[0].filingOperationStart) : null);
                            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length === 1 ? moment(rows[0].filingOperationEnd) : moment());
                            this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass(s_all).addClass(s_reg);
                            this.el_enable.call(this, this.form_filing_wagons_setup.el.input_datetime_time_stop, [this.rRW, this.rAdm]);
                            //this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                            this.el_enable.call(this, this.form_filing_wagons_setup.el.select_id_organization_service, [this.rRW, this.rAdm]);
                            //this.form_filing_wagons_setup.el.select_id_organization_service.enable();
                            /*                            this.form_filing_wagons_setup.el.select_id_organization_service.val(rows && rows.length > 0 ? rows[0].filingIdOrganizationService : this.default_organization_service);*/
                        } else {
                            //this.form_filing_wagons_setup.el.select_id_organization_service.disable();
                            view_set_correct.call(this);
                            this.form_filing_wagons_setup.el.button_operation_apply.hide();
                            this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_wagon_mode_2_close', App.Langs));
                            this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length === 1 ? moment(rows[0].filingOperationStart) : null);
                            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length === 1 ? moment(rows[0].filingOperationEnd) : null);
                            this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length === 1 ? rows[0].filingIdLoadingStatus : -1);
                            /*                            this.form_filing_wagons_setup.el.select_id_organization_service.val(rows && rows.length === 1 ? rows[0].filingIdOrganizationService : -1);*/
                        }
                        break;
                    }
                    case 3: {
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopclc_mess_info_wagon_mode_3', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length === 1 ? moment(rows[0].filingOperationStart) : null);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length === 1 ? moment(rows[0].filingOperationEnd) : null);
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length === 1 ? rows[0].filingIdLoadingStatus : -1);
                        //this.form_filing_wagons_setup.el.select_id_organization_service.disable();
                        //this.form_filing_wagons_setup.el.select_id_organization_service.val(rows && rows.length === 1 ? rows[0].filingIdOrganizationService : -1);
                        view_set_correct.call(this);
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
                        //this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('vopclc_mess_error_start_time_aplly', App.Langs).format(operation_end), false);
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('vopclc_mess_error_start_time_aplly', App.Langs).format((is_processing ? operation_start : operation_end), (is_processing ? "Обработка" : "Не обработка")), false);
                        valid = false;
                    }
                    // проверим на тек дату
                    var curr = moment();
                    var minutes = aplly.diff(curr, 'minutes');
                    if (minutes < App.wsd_setup.cleaning_start_dt_min) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('vopclc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.cleaning_start_dt_min * -1), false);
                        valid = false;
                    }
                    if (minutes > App.wsd_setup.cleaning_start_dt_max) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('vopclc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.cleaning_start_dt_max), false);
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
                        this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopclc_mess_error_stop_time_aplly', App.Langs), false);
                        valid = false;
                    } else {
                        if (minutes < App.wsd_setup.cleaning_period_min) {
                            this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopclc_mess_error_period_time', App.Langs).format(App.wsd_setup.cleaning_period_min), false);
                            valid = false;
                        } else {
                            // проверим на тек дату
                            var curr = moment();
                            var minutes = dtstop.diff(curr, 'minutes');
                            if (minutes < App.wsd_setup.cleaning_stop_dt_min) {

                                this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopclc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.cleaning_stop_dt_min * -1), false);
                                valid = false;
                            }
                            if (minutes > App.wsd_setup.cleaning_stop_dt_max) {
                                this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopclc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.cleaning_stop_dt_max), false);
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
                        this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopclc_mess_error_period_time', App.Langs).format(App.wsd_setup.cleaning_period_min, App.wsd_setup.cleaning_period_max), false);
                        valid = false;
                    }
                }
            }
            // Проверим вагоны в подаче
            if (mode === 0) {
                // Проверим вагоны в подаче
                if (this.filing_wagons === null || this.filing_wagons.length === 0) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopclc_mess_error_not_wagons_filing', App.Langs));
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
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopclc_mess_error_not_wagons_close_filing', App.Langs));
                        valid = false;
                    }
                } else {
                    if (result.new && result.new.select_id_status_load >= 0) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('vopclc_mess_error_time_aplly', App.Langs), false);
                        valid = false;
                    }
                }
            }
            // проверка статуса
            if (mode === 0 || mode === 2 || mode === 3) {
                // должно быть выставлено время конца
                if (result.new && result.new.input_datetime_time_stop && result.new.select_id_status_load < 0) {
                    this.form_filing_wagons_setup.set_element_validation_error('id_status_load', langView('vopclc_mess_error_not_wagons_status_close_filing', App.Langs), false);
                    valid = false;
                }
            }
            // проверка исполнителя
            if (mode === 0 || mode === 1) {
                if (result.new && result.new.select_id_organization_service < 0) {
                    this.form_filing_wagons_setup.set_element_validation_error('id_organization_service', langView('vopclc_mess_error_filing_organization_service', App.Langs), false);
                    valid = false;
                }
            }
            return valid;
        }
        // Создать подачу для выгрузки
        var apply_add_filing = function (data, callback) {
            this.view_com.api_wsd.postAddFilingCleaning(data, function (result) {
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
            this.view_com.api_wsd.postUpdateFilingOperationCleaning(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        // Администрирование операцию погрузки над вагонами подачи
        var apply_correct_filing = function (data, callback) {
            LockScreen(langView('vopclc_mess_run_operation_correct_filing', App.Langs).format(this.id_filing));
            this.view_com.api_wsd.postCorrectFilingOperationCleaning(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        // Завершенеие инициализации [this.view_com]
        var out_init_view_com = function () {

            this.cfiling.init({
                alert: this.settings.alert,

                type_filing: 3, // Очистка
                wagon_operation: App.wsd_setup.operations.cleaning, // операция над вагоном
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
                fn_apply_update_date_filing: null,
                fn_apply_correct_filing: function (data, callback) {
                    apply_correct_filing.call(this, data, callback);
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
                this.view_com.$title.append(langView('vopclc_card_header_panel', App.Langs));
                this.view_com.$op.empty();
                this.view_com.close();
                // Сообщение
                LockScreen(langView('vopclc_mess_init_panel', App.Langs));
                out_init_view_com();
            }.bind(this),
            fn_close: this.settings.fn_close,
        }, function () { }.bind(this));
    };

    view_op_cleaning_cars.prototype.view = function (id_way, access) {
        this.access = access;
        if (access && (this.access.rAdmin || this.access.rOperRW || this.access.rOperCorrect || this.access.rRO)) {
            this.cfiling.view(id_way, (access ? access.rAdmin : false), (access ? access.rOperRW : false), (access ? access.rRO : false), (access ? access.rOperCorrect : false));
        }
    }

    App.view_op_cleaning_cars = view_op_cleaning_cars;

    window.App = App;

})(window);