/* ===============================================
-= Модуль панель операции "РОСПУСК ВАГОНОВ" =-
  + js/view/shared/common.js
  + js/module/view_op_common.js
  + js/module/ws/table_ws.js
==================================================*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    //var min_dt_apply = -1 * (60 * 3); // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    //var max_dt_apply = 60 * 3; // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    //var min_period = 5; // TODO: Минимальный период операции 
    //var max_period = 120; // TODO: Максимальный период операции 


    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vopss_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "РОСПУСК СОСТАВА НА СТАНЦИИ"',
            'vopss_card_header_on': 'ПУТИ РОСПУСКА',
            'vopss_card_header_from': 'ВАГОНЫ ДЛЯ РОСПУСКА',
            'vopss_title_label_station': 'Станция роспуска:',
            'vopss_text_label_station': 'Выберите станцию роспуска ...',
            'vopss_title_label_way_from': 'Путь роспуска:',
            'vopss_title_text_way_from': 'Выберите путь роспуска вагонов ...',

            'vopss_title_label_locomotive1': 'Локомотив №1:',
            'vopss_title_placeholder_locomotive': ' № локомотива',
            'vopss_title_time_start': 'Начало выполнения',
            'vopss_title_time_stop': 'Конец выполнения',
            'vopss_title_placeholder_time_start': 'Начало выполнения',
            'vopss_title_placeholder_time_stop': 'Конец выполнения',
            'vopss_title_form_apply': 'Выполнить',
            'vopss_title_form_apply_title': 'Выполнить операцию "РОСПУСК СОСТАВА НА СТАНЦИИ"',

            'vopss_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу который имеет статус :[{1}])',
            'vopss_mess_warning_wagon_ban_dess_way': 'Вагон № {0} для операций заблокирован (вагон уже перенесен на путь роспуска :[{1}])',
            'vopss_mess_warning_wagon_ban_move_busy': 'Вагон № {0} для перемещения заблокирован (вагон принадлежит составу со статусом :[{1}] или вагон пренадлежит подаче :[{2}] по которой не открыта или незакрыта операция :[{3}])',



            'vopss_mess_warning_wagon_existing_way': 'Вагон № {0} для операций заблокирован (вагон стоит на текущем пути!))',

            //'vopss_mess_error_required_locomotive': 'Выберите Локомотив',
            //'vopss_mess_error_required_datetime_start': 'Укажите время начала',
            //'vopss_mess_error_required_datetime_stop': 'Укажите время конца',
            'vopss_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты выполнения последней операции [{0}]',
            'vopss_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',
            'vopss_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            'vopss_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'vopss_mess_error_period_time': 'Операция должна длиться не менее {0} мин.',

            'vopss_mess_error_not_wagons': 'Не выбраны вагоны для операции роспуск (в окне «ВАГОНЫ ДЛЯ РОСПУСКА», выберите станцию и путь начала роспуска, в окне «ПУТИ РОСПУСКА» выберите путь на который будет произведен роспуск и перенесите вагоны роспуска).',
            'vopss_mess_error_operation_run': 'При выполнении операции «РОСПУСК СОСТАВА НА СТАНЦИИ» произошла ошибка, код ошибки: {0}',
            'vopss_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            'vopss_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',

            'vopss_mess_cancel_operation': 'Операция "РОСПУСК СОСТАВА НА СТАНЦИИ" – отменена',
            'vopss_mess_run_operation': 'Выполняю операцию "РОСПУСК СОСТАВА НА СТАНЦИИ"',

            'vopoc_mess_not_select_way_on': 'Выберите путь для роспуска',
            'vopoc_mess_not_select_wagon_from': 'Выберите вагоны для роспуска',
            'vopoc_mess_not_select_wagon_on': 'Выберите вагоны для отмены роспуска',
            'vopss_mess_ok_operation': 'Вагоны перенесены на пути роспуска, в количестве {0} (ваг.)',

            'vopss_mess_load_operation': 'Загружаю операции...',
            'vopss_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vopss_mess_load_ways': 'Загружаю пути дислокации...',

            'vopss_mess_init_panel': 'Выполняю инициализацию модуля ...',

            'vopss_mess_clear_sostav': 'Формирую роспуск, убираю выбранные вагоны...',

            'vopss_confirm_title': 'Внимание!',
            'vopss_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию роспуска {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'vopss_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь роспуска {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'vopss_confirm_mess_apply_dissolutionl_wagons': 'Выполнить операцию "РОСПУСКА ВАГОНОВ" в количестве: {0} (ваг.), станция роспуска {1}, путь начала роспуска {2}',
        },
        'en':  //default language: English
        {
            'vopss_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "РОСПУСК СОСТАВА НА СТАНЦИИ"',
            'vopss_card_header_on': 'ПУТИ РОСПУСКА',
            'vopss_card_header_from': 'ВАГОНЫ ДЛЯ РОСПУСКА',
            'vopss_title_label_station': 'Станция роспуска:',
            'vopss_text_label_station': 'Выберите станцию роспуска ...',
            'vopss_title_label_way_from': 'Путь роспуска:',
            'vopss_title_text_way_from': 'Выберите путь роспуска вагонов ...',

            'vopss_title_label_locomotive1': 'Локомотив №1:',
            'vopss_title_placeholder_locomotive': ' № локомотива',
            'vopss_title_time_start': 'Начало выполнения',
            'vopss_title_time_stop': 'Конец выполнения',
            'vopss_title_placeholder_time_start': 'Начало выполнения',
            'vopss_title_placeholder_time_stop': 'Конец выполнения',
            'vopss_title_form_apply': 'Выполнить',
            'vopss_title_form_apply_title': 'Выполнить операцию "РОСПУСК СОСТАВА НА СТАНЦИИ"',

            'vopss_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу который имеет статус :[{1}])',
            'vopss_mess_warning_wagon_ban_dess_way': 'Вагон № {0} для операций заблокирован (вагон уже перенесен на путь роспуска :[{1}])',
            'vopss_mess_warning_wagon_ban_move_busy': 'Вагон № {0} для перемещения заблокирован (вагон принадлежит составу со статусом :[{1}] или вагон пренадлежит подаче :[{2}] по которой не открыта или незакрыта операция :[{3}])',



            'vopss_mess_warning_wagon_existing_way': 'Вагон № {0} для операций заблокирован (вагон стоит на текущем пути!))',

            //'vopss_mess_error_required_locomotive': 'Выберите Локомотив',
            //'vopss_mess_error_required_datetime_start': 'Укажите время начала',
            //'vopss_mess_error_required_datetime_stop': 'Укажите время конца',
            'vopss_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты выполнения последней операции [{0}]',
            'vopss_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',
            'vopss_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            'vopss_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'vopss_mess_error_period_time': 'Операция должна длиться не менее {0} мин.',

            'vopss_mess_error_not_wagons': 'Не выбраны вагоны для операции роспуск (в окне «ВАГОНЫ ДЛЯ РОСПУСКА», выберите станцию и путь начала роспуска, в окне «ПУТИ РОСПУСКА» выберите путь на который будет произведен роспуск и перенесите вагоны роспуска).',
            'vopss_mess_error_operation_run': 'При выполнении операции «РОСПУСК СОСТАВА НА СТАНЦИИ» произошла ошибка, код ошибки: {0}',
            'vopss_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            'vopss_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',

            'vopss_mess_cancel_operation': 'Операция "РОСПУСК СОСТАВА НА СТАНЦИИ" – отменена',
            'vopss_mess_run_operation': 'Выполняю операцию "РОСПУСК СОСТАВА НА СТАНЦИИ"',

            'vopoc_mess_not_select_way_on': 'Выберите путь для роспуска',
            'vopoc_mess_not_select_wagon_from': 'Выберите вагоны для роспуска',
            'vopoc_mess_not_select_wagon_on': 'Выберите вагоны для отмены роспуска',
            'vopss_mess_ok_operation': 'Вагоны перенесены на пути роспуска, в количестве {0} (ваг.)',

            'vopss_mess_load_operation': 'Загружаю операции...',
            'vopss_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vopss_mess_load_ways': 'Загружаю пути дислокации...',

            'vopss_mess_init_panel': 'Выполняю инициализацию модуля ...',

            'vopss_mess_clear_sostav': 'Формирую роспуск, убираю выбранные вагоны...',

            'vopss_confirm_title': 'Внимание!',
            'vopss_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию роспуска {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'vopss_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь роспуска {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'vopss_confirm_mess_apply_dissolutionl_wagons': 'Выполнить операцию "РОСПУСКА ВАГОНОВ" в количестве: {0} (ваг.), станция роспуска {1}, путь начала роспуска {2}',

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

    function view_op_dissolution_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_dissolution_cars.prototype.init = function (options) {
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
            fn_init: null,
            fn_close: this.settings.fn_close,
        }, function () { }.bind(this));

        this.id_station = -1;       // По умолчанию не выбрана
        this.id_way = -1;           // По умолчанию не выбрана
        this.stations = [];         // Список станций (полный)
        this.list_station = [];     // Список станций (value\text\desabled)
        this.was = [];              // Список путей (полный)
        this.list_way = [];         // Список путей (value\text\desabled)
        this.locomotives = [];      // Список локомотивов (полный)
        this.list_locomotive = [];  // Список локомотивов (value\text\desabled)

        //this.station = null;        // Станция отправления
        this.wagons = [];               // Список вагонов на пути отправки (рабочий)
        this.dissolution_ways = [];     // Список путей приема роспуска (рабочий)
        this.wagons_on = [];            // Список вагонов на пути выбранного приема (рабочий)
        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vopss_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();

        // Сообщение
        LockScreen(langView('vopss_mess_init_panel', App.Langs));
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
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopss_card_header_on', App.Langs),
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
        // Alert_from
        this.alert_on = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.on_table.$html.append(this.alert_on.$html);
        this.on_alert = new ALERT(this.alert_on.$html);
        row.$html.append(this.on_setup.$html).append(this.on_table.$html);
        this.card_on.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_on.$html);
        //--
        this.card_from = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopss_card_header_from', App.Langs),
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
        this.view_com.load_db(['station', 'ways', 'locomotive'], false, function (result) {
            var process = 5;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    //----------------------------------
                    if (typeof this.settings.fn_init === 'function') {
                        console.log('Close view_op_dissolution_cars');
                        this.settings.fn_init(this.result_init);
                    }
                    //----------------------------------
                }
            }.bind(this);
            // инициализациия 
            this.stations = this.view_com.api_dir.getAllStation();
            this.ways = this.view_com.api_dir.getAllWays();
            this.locomotives = this.view_com.api_dir.getAllLocomotive();
            this.list_locomotive = this.view_com.api_dir.getListValueTextLocomotiveOfActive();
            // Создадим список станций
            this.list_station = [];
            $.each(this.ways, function (i, el) {
                if (el.outputDissolution && el.wayDelete === null && el.wayClose === null) {
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
                    text: langView('vopss_title_form_apply', App.Langs),
                    title: langView('vopss_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_on_setup.$form.submit();
                    }.bind(this),
                }
            };
            var col_diss_ways = {
                obj: 'bs_col',
                options: {
                    id: 'op-dc-dissolution-ways',
                    pref: 'md',
                    size: 12,
                    class: 'text-left pt-2',
                    style: null,
                },
                childs: []
            };
            var form_input_datalist_locomotive1 = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common',
                    id: 'locomotive1',
                    name: 'locomotive1',
                    label: langView('vopss_title_label_locomotive1', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopss_title_placeholder_locomotive', App.Langs),
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
                    form_text: null,
                    form_text_class: null
                },
                childs: []
            };
            var form_input_datetime_time_start = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common',
                    id: 'time_start',
                    name: 'time_start',
                    label: langView('vopss_title_time_start', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopss_title_placeholder_time_start', App.Langs),
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
                    form_text: langView('vopss_title_time_start', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datetime_time_stop = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common',
                    id: 'time_stop',
                    name: 'time_stop',
                    label: langView('vopss_title_time_stop', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopss_title_placeholder_time_stop', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: moment().subtract(1, 'days').format("YYYY-MM-DDTHH:mm"), //"2024-05-05T00:00"
                    element_max: moment().add(1, 'days').format("YYYY-MM-DDTHH:mm"),
                    element_step: null,
                    element_options: {
                        default: moment().add(1, 'hour'),
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
                    form_text: langView('vopss_title_time_stop', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            col_bt_apply.childs.push(bt_bt_apply);
            objs_on_setup.push(col_bt_apply);
            objs_on_setup.push(form_input_datalist_locomotive1);
            objs_on_setup.push(form_input_datetime_time_start);
            objs_on_setup.push(form_input_datetime_time_stop);
            objs_on_setup.push(col_diss_ways);
            this.form_on_setup.init({
                alert: this.main_alert,
                objs: objs_on_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        if (valid) {
                            var wagons = this.wagons.filter(function (i) {
                                return i.id_way_dissolution !== null;
                            }.bind(this));
                            var message = langView('vopss_confirm_mess_apply_dissolutionl_wagons', App.Langs).format((wagons ? wagons.length : 0), this.form_from_setup.el.select_id_station.text(), this.form_from_setup.el.select_id_way_from.text());
                            this.view_com.mcf.open(
                                langView('vopss_title_form_apply', App.Langs),
                                message,
                                function () {
                                    // Принять
                                    // Проверим наличие вагонов 
                                    var list_dissolution = [];
                                    if (wagons && wagons.length > 0) {
                                        // Получим перечень вагонов и новую позицию
                                        $.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
                                            list_dissolution.push({ wir_id: el.wirId, position: el.position_new, id_way_dissolution: el.id_way_dissolution })
                                        }.bind(this));
                                        // Сформируем операцию
                                        var operation = {
                                            id_way_from: Number(this.id_way),
                                            list_dissolution: list_dissolution,
                                            date_start: result.new.input_datetime_time_start._i,
                                            date_stop: result.new.input_datetime_time_stop._i,
                                            locomotive1: result.new.datalist_locomotive1,
                                            /*user: App.User_Name*/
                                        };
                                        this.apply(operation);
                                    }
                                }.bind(this),
                                function () {
                                    this.form_on_setup.validation_common.out_warning_message(langView('vopss_mess_cancel_operation', App.Langs));
                                }.bind(this));
                        }
                    }
                }.bind(this),
                fn_html_init: function (res) { }.bind(this),
                fn_element_init: null,
                fn_init: function (init) {
                    this.on_setup.$html.append(this.form_on_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_dissolution_cars] [form_on_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_diss_way_cars = new this.view_com.fe_ui.bs_row({ id: 'op-dc-dissolution-way-cars', class: '' });
            //this.on_table.$html.empty();
            this.on_table.$html.append(row_diss_way_cars.$html);
            /*console.log('add row_arr_cars_way');*/
            this.tdw_opdc = new TWS('div#op-dc-dissolution-ways');
            this.tdw_opdc.init({
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-success table-small table-striped',
                detali_table: false,
                type_report: 'dissolution_ways',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_dissolution_cars] [tacw_opr] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                }.bind(this),
                fn_select_rows: function (rows, type, indexes) {
                    this.id_way_dissolution = null;
                    this.num_way_dissolution = null;
                    if (type === "select") {
                        if (rows != null && rows.length > 0) {
                            this.id_way_dissolution = rows[0].id;
                            this.num_way_dissolution = rows[0]['wayNum' + ucFirst(App.Lang)];
                        }
                        this.load_wagons_dissolution_way_on(this.id_way_dissolution,
                            function () {
                                this.view_wagons_dissolution()
                                LockScreenOff();
                            }.bind(this));
                    }
                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {

                }.bind(this),
                fn_enable_button: function (tb) {

                }.bind(this),
            });

            this.tdwc_opdc = new TWS('div#op-dc-dissolution-way-cars');
            this.tdwc_opdc.init({
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'arrival_cars_way',     //
                setup_buttons: [
                    {
                        name: 'select_all_wagon',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.tdwc_opdc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.id_way_dissolution !== null;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'del_wagons_sostav',
                        action: function (e, dt, node, config) {
                            this.tdwc_opdc.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_arrival_cars] [tacw_opac] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.on_alert.clear_message();
                    if (rowData && rowData.length > 0 && rowData[0].id_way_dissolution === null) {
                        e.preventDefault();
                        this.on_alert.out_warning_message(langView('vopss_mess_warning_wagon_existing_way', App.Langs).format(rowData[0].num));
                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'eye') {
                        this.view_wagons_dissolution_on();
                        LockScreenOff();
                    }
                    if (name === 'del_wagons_sostav') {
                        this.on_alert.clear_message();
                        var rows = this.tdwc_opdc.tab_com.get_select_row();
                        if (rows && rows.length > 0) {
                            LockScreen(langView('vopss_mess_clear_sostav', App.Langs));
                            $.each(rows, function (i, el) {
                                el['position_new'] = null;
                                el['id_way_dissolution'] = null;
                                el['num_way_dissolution'] = null
                            }.bind(this));
                            var wagon_max_position = (this.wagons_on !== null && this.wagons_on.length > 0) ? this.wagons_on.reduce(function (prev, current, index, array) { return prev.position_new > current.position_new ? prev : current }) : null;
                            var position_start = wagon_max_position && wagon_max_position.position_new !== null ? wagon_max_position.position_new + 1 : 1;
                            // Выполнить операцию добавить вагоны
                            var wagons_from = this.wagons.filter(function (i) {
                                return i.id_way_dissolution === this.id_way_dissolution;
                            }.bind(this));
                            // перенумеруем
                            $.each(wagons_from, function (i, el) {
                                el['position_new'] = position_start;
                                position_start++;
                            }.bind(this));
                            var tr = this.tdw_opdc.tab_com.$table_report.find('tr.selected');
                            if (tr && tr.length > 0) {
                                var $td = $(tr[0].cells[2]);
                                // Получим количество
                                var wagons_add = this.wagons.filter(function (i) {
                                    return i.id_way_dissolution === this.id_way_dissolution;
                                }.bind(this));
                                if (wagons_add !== null && wagons_add.length > 0) {
                                    $(tr).addClass('yellow');
                                    $td.empty().append(wagons_add.length);
                                } else {
                                    $td.empty().append(0);
                                    $(tr).removeClass('yellow');
                                }
                            }
                            this.view_wagons_dissolution()
                            LockScreenOff();
                        } else {

                            this.on_alert.out_warning_message(langView('vopoc_mess_not_select_wagon_on', App.Langs));
                        };
                    }
                }.bind(this),
                fn_enable_button: function (tb) {
                }.bind(this),
            });
            //-------------------------------------------------------------------
            // Создадим форму (this.from_setup)
            this.form_from_setup = new FD();
            // Создать макет панели
            var objs_from_setup = [];
            var form_select_station = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_from',
                    id: 'id_station',
                    name: 'id_station',
                    label: langView('vopss_title_label_station', App.Langs),
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
                            this.update(id, this.id_way, function () {
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
                    form_text: langView('vopss_title_label_station', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_way_from = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common',
                    id: 'id_way_from',
                    name: 'id_way_from',
                    label: langView('vopss_title_label_way_from', App.Langs),
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
                            this.update(this.id_station, id, function () {
                                //this.view_wagons();
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
                    form_text: langView('vopss_title_text_way_from', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            objs_from_setup.push(form_select_station);
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
                    this.from_setup.$html.append(this.form_from_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_dissolution_cars] [form_from_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_diss_cars_from = new this.view_com.fe_ui.bs_row({ id: 'op-dc-dissolution-cars-from', class: 'pt-2' });
            this.from_table.$html.append(row_diss_cars_from.$html);

            this.todcf_opdc = new TWS('div#op-dc-dissolution-cars-from');
            this.todcf_opdc.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'dissolution_cars_from',
                setup_buttons: [
                    {
                        name: 'select_all_wagon',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.from_alert.clear_message();
                            this.form_from_setup.clear_all();
                            this.todcf_opdc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.id_way_dissolution === null && !data.currentMoveBusy && !data.outgoingSostavStatus;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'add_sostav',
                        action: function (e, dt, node, config) {
                            this.todcf_opdc.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_outgoing_cars] [tocw_opoc] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.from_alert.clear_message();
                    this.form_from_setup.clear_all();
                    if (rowData && rowData.length > 0) {
                        if (rowData[0].outgoingSostavStatus > 0) {
                            e.preventDefault();
                            this.from_alert.out_warning_message(langView('vopss_mess_warning_wagon_ban_status', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus));
                        }
                        if (rowData[0].num_way_dissolution !== null) {
                            e.preventDefault();
                            this.from_alert.out_warning_message(langView('vopss_mess_warning_wagon_ban_dess_way', App.Langs).format(rowData[0].num, rowData[0].num_way_dissolution));
                        }
                        if (rowData[0].currentMoveBusy) {
                            e.preventDefault();
                            this.from_alert.out_warning_message(langView('vopss_mess_warning_wagon_ban_move_busy', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus, rowData[0].idFiling, rowData[0]['currentOperationName' + ucFirst(App.Lang)]));
                        }
                    }
                }.bind(this),
                fn_select_rows: function (rows) {
                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'eye') {
                        this.view_wagons_dissolution_from();
                        LockScreenOff();
                    }
                    if (name === 'add_sostav') {
                        this.from_alert.clear_message();
                        if (this.id_way_dissolution > 0) {
                            var rows = this.todcf_opdc.tab_com.get_select_row();
                            if (rows !== null && rows.length > 0) {
                                LockScreen(langView('vopoc_mess_create_sostav', App.Langs));
                                // Выполнить операцию добавить вагоны
                                var wagons_add = this.wagons.filter(function (i) {
                                    return i.id_way_dissolution === this.id_way_dissolution;
                                }.bind(this));
                                var wagon_max_position = null;
                                if (wagons_add !== null && wagons_add.length > 0) {
                                    wagon_max_position = wagons_add.reduce(function (prev, current, index, array) { return prev.position_new > current.position_new ? prev : current });
                                } else {
                                    wagon_max_position = (this.wagons_on !== null && this.wagons_on.length > 0) ? this.wagons_on.reduce(function (prev, current, index, array) { return prev.position_new > current.position_new ? prev : current }) : null;
                                }
                                var position_start = wagon_max_position && wagon_max_position.position_new !== null ? wagon_max_position.position_new + 1 : 1;

                                $.each(rows, function (i, el) {
                                    el['position_new'] = position_start;
                                    el['id_way_dissolution'] = this.id_way_dissolution;
                                    el['num_way_dissolution'] = this.num_way_dissolution
                                    position_start++;
                                }.bind(this));
                                var tr = this.tdw_opdc.tab_com.$table_report.find('tr.selected');
                                if (tr && tr.length > 0) {
                                    var $td = $(tr[0].cells[2]);
                                    // Получим количество
                                    var wagons_add = this.wagons.filter(function (i) {
                                        return i.id_way_dissolution === this.id_way_dissolution;
                                    }.bind(this));
                                    if (wagons_add !== null && wagons_add.length > 0) {
                                        $(tr).addClass('yellow');
                                        $td.empty().append(wagons_add.length);
                                    } else {
                                        $td.empty().append(0);
                                        $(tr).removeClass('yellow');
                                    }
                                }
                                this.view_wagons_dissolution()
                                LockScreenOff();
                            } else {
                                this.from_alert.out_warning_message(langView('vopoc_mess_not_select_wagon_from', App.Langs));
                            }
                        } else {
                            this.from_alert.out_warning_message(langView('vopoc_mess_not_select_way_on', App.Langs));
                        }
                    }
                }.bind(this),
                fn_enable_button: function (tb) {

                }.bind(this),
            });

        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    view_op_dissolution_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vopss_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Сбросим установки (время и локомотивы)
        this.form_on_setup.el.datalist_locomotive1.val('');
        //this.form_on_setup.el.datalist_locomotive2.val('');
        this.form_on_setup.el.input_datetime_time_start.val(moment());
        this.form_on_setup.el.input_datetime_time_stop.val(moment().add(1, 'hour'));
        // Сбросим вагоны переноса
        var id_station = -1;
        this.id_station = -1;
        this.id_way = -1;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_from_setup.el.select_id_station.val(id_station);
                //this.id_way = id_way;
            }
        };
        this.update(id_station, id_way, function () {
            LockScreenOff();
        }.bind(this));

    };
    // Обновить информацию
    view_op_dissolution_cars.prototype.update = function (id_station, id_way, callback) {
        // Обновим пути по станции
        this.update_station(id_station, id_way, function () {
            this.view_wagons();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновим составы отправленные со станции
    view_op_dissolution_cars.prototype.update_station = function (id_station, id_way, callback) {
        this.confirm_update_station(id_station,
            function () { // Ok
                //this.wagons_add = [];
                // обновим компонент пути отправки
                this.form_from_setup.el.select_id_way_from.update(this.view_com.api_dir.getListValueTextOutDissolutionWaysOfStation(id_station), id_way);
                // обновим таблицу пути роспуска 
                this.dissolution_ways = [];
                // Обновим станцию
                this.id_station = id_station;
                // Не сбрасывать в начале
                if (this.id_way > 0) {
                    id_way = -1;
                }
                // Обновим данные на пути (второй поток)
                this.update_from_way(id_way,
                    function () {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }.bind(this)
                );
            }.bind(this),
            function () { // Cancel
                // Обновим данные на пути
                this.update_from_way(id_way,
                    function () {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }.bind(this)
                );
            }.bind(this));
    }
    // Проверка и подтверждение изменений по станции отправки
    view_op_dissolution_cars.prototype.confirm_update_station = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station !== id_station) {
            var wagons_add = this.wagons.filter(function (i) {
                return i.id_way_dissolution !== null;
            }.bind(this));
            if (wagons_add && wagons_add.length > 0) {
                this.view_com.mcf.open(
                    langView('vopss_confirm_title', App.Langs),
                    langView('vopss_confirm_mess_change_station', App.Langs).format(this.form_from_setup.el.select_id_station.text(), wagons_add.length),
                    function () {
                        if (typeof callback_ok === 'function') {
                            callback_ok();
                        }
                    }.bind(this),
                    function () {
                        this.form_from_setup.el.select_id_station.val(this.id_station);
                        if (typeof callback_cancel === 'function') {
                            callback_cancel();
                        }
                    }.bind(this)
                );
            } else {
                if (typeof callback_ok === 'function') {
                    callback_ok();
                }
            }
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Обновим вагоны на пути отправки
    view_op_dissolution_cars.prototype.update_from_way = function (id_way, callback) {
        this.confirm_update_way_from(id_way,
            function () { // Ok
                // выберим путь на компоненте пути возврата
                this.form_from_setup.el.select_id_way_from.val(id_way);
                // Запустим паралельно
                var pr_ufw = 2;
                var out_ufw = function (pr_ufw) {
                    if (pr_ufw === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }.bind(this);
                // загрузим вагоны на пути
                this.load_of_way(id_way, function () {
                    pr_ufw--;
                    out_ufw(pr_ufw);
                }.bind(this));

                this.load_dissolution_ways(id_way, function () {
                    pr_ufw--;
                    out_ufw(pr_ufw);
                }.bind(this));

            }.bind(this),
            function () { // Cancel
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
    }
    // Проверка и подтверждение изменений по пути роспуска
    view_op_dissolution_cars.prototype.confirm_update_way_from = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way !== id_way) {
            var wagons_add = this.wagons.filter(function (i) {
                return i.id_way_dissolution !== null;
            }.bind(this));
            if (wagons_add && wagons_add.length > 0 && id_way > 0) {
                this.view_com.mcf.open(
                    langView('vopss_confirm_title', App.Langs),
                    langView('vopss_confirm_mess_change_way', App.Langs).format(this.form_from_setup.el.select_id_way_from.text(), wagons_add.length),
                    function () {
                        if (typeof callback_ok === 'function') {
                            callback_ok();
                        }
                    }.bind(this),
                    function () {
                        this.form_from_setup.el.select_id_way_from.val(this.id_way);
                        if (typeof callback_cancel === 'function') {
                            callback_cancel();
                        }
                    }.bind(this)
                );
            } else {
                if (typeof callback_ok === 'function') {
                    callback_ok();
                }
            }
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Загрузить вагоны на выбраном пути прибытия в масив this.wagons (подготовить поля для вагонов приема)
    view_op_dissolution_cars.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way = id_way;
            LockScreen(langView('vopss_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = null;
                        el['id_way_dissolution'] = null;
                        el['num_way_dissolution'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.id_way = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    // Загрузить пути прибытия роспуска
    view_op_dissolution_cars.prototype.load_dissolution_ways = function (id_way, callback) {
        this.id_way_dissolution = null;
        this.num_way_dissolution = null;
        this.wagons_on = [];
        if (id_way !== null && id_way >= 0) {
            LockScreen(langView('vopss_mess_load_ways', App.Langs));
            var way = this.ways.find(function (o) {
                return o.id === id_way;
            }.bind(this));
            if (way && way.outputDissolution) {
                this.view_com.api_dir.GetViewStatusAllWayOfStationId(way.stationDissolution, function (ways) { //way.idStation
                    // модифицировать данные взависимости от отчета
                    var ways_diss = ways.filter(function (i) {
                        return i.dissolution;
                    }.bind(this));
                    if (ways_diss) {
                        $.each(ways_diss, function (i, el) {
                            el['countDissWagons'] = 0;
                        });
                    }
                    this.dissolution_ways = ways_diss;
                    // Событие обновили данные
                    if (typeof callback === 'function') {
                        callback(this.wagons);
                    }
                }.bind(this));
            } else {
                this.dissolution_ways = [];
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }
        } else {
            this.dissolution_ways = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    // Загрузить пути выбраные для приема роспуска
    view_op_dissolution_cars.prototype.load_wagons_dissolution_way_on = function (id_way_on, callback) {
        if (id_way_on !== null && id_way_on >= 0) {
            LockScreen(langView('vopss_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way_on, function (wagons) {
                // модифицировать данные взависимости от отчета
                this.wagons_on = [];
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = el.position;
                        el['id_way_dissolution'] = null;
                    });
                    this.wagons_on = wagons;
                };

                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons_on);
                }
            }.bind(this));
        } else {
            this.wagons_on = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons_on);
            }
        }
    };
    // Отобразить вагоны на путях роспуска
    view_op_dissolution_cars.prototype.view_wagons_dissolution = function () {
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать вагоны отправляемые
        this.view_wagons_dissolution_from();
        // Показать пути приема роспуска
        this.view_wagons_dissolution_on();
    };
    // Отобразить вагоны все вагоны
    view_op_dissolution_cars.prototype.view_wagons = function () {
        this.view_wagons_dissolution();
        // Показать пути роспуска
        this.view_dissolution_ways();
    };
    // Показать вагоны выбранного состава без учета уже перенесенных в состав
    view_op_dissolution_cars.prototype.view_wagons_dissolution_from = function () {
        var wagons = this.wagons;
        //var wagons = this.wagons_sostav.filter(function (i) {
        //    return i.id_way_arrival === undefined || i.id_way_arrival === null;
        //});
        if (this.todcf_opdc.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_way_dissolution === null;
            });
        }
        this.todcf_opdc.view(wagons, null);
    };
    // Показать пути куда будет производится роспуск
    view_op_dissolution_cars.prototype.view_dissolution_ways = function () {
        this.tdw_opdc.view(this.dissolution_ways, null);
    };
    //
    view_op_dissolution_cars.prototype.view_wagons_dissolution_on = function () {
        var wagons = this.wagons_on;
        var wagons_add = this.wagons.filter(function (i) {
            return i.id_way_dissolution === this.id_way_dissolution && this.id_way_dissolution !== null;
        }.bind(this));
        if (wagons_add !== null && wagons_add.length > 0) {
            wagons = wagons.concat(wagons_add)
        }
        if (this.tdwc_opdc.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_way_dissolution !== null;
            });
        }
        this.tdwc_opdc.view(wagons, null);
    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_dissolution_cars.prototype.validation = function (result) {
        var valid = true;
        var wagons = this.wagons.filter(function (i) { return i.id_way_dissolution !== null; }.bind(this));
        var operation_end = get_max_element(wagons, 'currentOperationEnd');
        // Проверим локомотивы
        var loc1 = this.form_on_setup.el.datalist_locomotive1.text();
        if (result.new && !result.new.datalist_locomotive1 && (loc1 !== null || loc1 !== '')) {
            this.form_on_setup.set_element_validation_error('locomotive1', langView('vodlc_mess_error_not_locomotive', App.Langs).format(loc1), false);
            valid = false;
        }
        // Проверим время начала
        if (result.new && result.new.input_datetime_time_start) {
            var aplly = moment(result.new.input_datetime_time_start);
            // проверим на последнюю операцию
            var old = moment(operation_end);
            var minutes = old.diff(aplly, 'minutes');
            if (minutes > 0) {
                this.form_on_setup.set_element_validation_error('time_start', langView('vopss_mess_error_start_time_aplly', App.Langs).format(operation_end), false);
                valid = false;
            }
            // проверим на тек дату
            var curr = moment();
            var minutes = aplly.diff(curr, 'minutes');
            if (minutes < App.wsd_setup.dissolution_start_dt_min) {

                this.form_on_setup.set_element_validation_error('time_start', langView('vopss_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.dissolution_start_dt_min * -1), false);
                valid = false;
            }
            if (minutes > App.wsd_setup.dissolution_start_dt_max) {
                this.form_on_setup.set_element_validation_error('time_start', langView('vopss_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.dissolution_start_dt_max), false);
                valid = false;
            }
        }
        // Проверим время начала и конца времени
        if (result.new && result.new.input_datetime_time_start && result.new.input_datetime_time_stop) {
            var dtstart = moment(result.new.input_datetime_time_start);
            var dtstop = moment(result.new.input_datetime_time_stop);
            var minutes = dtstop.diff(dtstart, 'minutes');
            if (minutes <= 0) {
                this.form_on_setup.set_element_validation_error('time_stop', langView('vopss_mess_error_stop_time_aplly', App.Langs), false);
                valid = false;
            } else {
                if (minutes < App.wsd_setup.dissolution_period_min) {
                    this.form_on_setup.set_element_validation_error('time_stop', langView('vopss_mess_error_period_time', App.Langs).format(App.wsd_setup.dissolution_period_min), false);
                    valid = false;
                } else {
                    // проверим на тек дату
                    var curr = moment();
                    var minutes = dtstop.diff(curr, 'minutes');
                    if (minutes < App.wsd_setup.dissolution_stop_dt_min) {

                        this.form_on_setup.set_element_validation_error('time_stop', langView('vopss_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.dissolution_stop_dt_min * -1), false);
                        valid = false;
                    }
                    if (minutes > App.wsd_setup.dissolution_stop_dt_max) {
                        this.form_on_setup.set_element_validation_error('time_stop', langView('vopss_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.dissolution_stop_dt_max), false);
                        valid = false;
                    }
                }
            }
        }
        // Проверим вагоны на путях роспуска
        if (wagons === null || wagons.length === 0) {
            this.form_on_setup.validation_common.out_error_message(langView('vopss_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_op_dissolution_cars.prototype.apply = function (data) {
        LockScreen(langView('vopss_mess_run_operation', App.Langs));
        this.view_com.api_wsd.postDissolutionWagonsOfStationAMKR(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('vopss_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[view_op_dissolution_cars] [postDissolutionWagonsOfStationAMKR] :' + mess);
                this.form_on_setup.validation_common.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_on_setup.validation_common.out_error_message(err + ":" + result.errors[err]);
                        console.log('[view_op_dissolution_cars] [postDissolutionWagonsOfStationAMKR] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                // ошибки выполнения нет проверим ответ запроса
                if (result && result.result > 0) {
                    this.form_on_setup.validation_common.clear_all();
                    // Сбросим установки (время и локомотивы)
                    this.form_on_setup.el.datalist_locomotive1.val('');
                    this.form_on_setup.el.input_datetime_time_start.val(moment());
                    this.form_on_setup.el.input_datetime_time_stop.val(moment().add(1, 'hour'));
                    // Обновим
                    var pr_ufw = 2;
                    var out_ufw = function (pr_ufw) {
                        if (pr_ufw === 0) {
                            this.view_wagons();
                            this.form_on_setup.validation_common.out_info_message(langView('vopss_mess_ok_operation', App.Langs).format(result.moved));
                            if (typeof this.settings.fn_db_update === 'function') {
                                //TODO: можно добавить возвращать перечень для обновления
                                typeof this.settings.fn_db_update();
                            }
                            LockScreenOff();
                        }
                    }.bind(this);
                    // загрузим вагоны на пути
                    this.load_of_way(this.id_way, function () {
                        pr_ufw--;
                        out_ufw(pr_ufw);
                    }.bind(this));

                    this.load_dissolution_ways(this.id_way, function () {
                        pr_ufw--;
                        out_ufw(pr_ufw);
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.form_on_setup.validation_common.out_error_message(langView('vopss_mess_error_operation_run', App.Langs).format(result ? result.result : -1));
                    // Выведем ошибки по вагонно.
                    if (result && result.list_rs) {
                        $.each(result.list_rs, function (i, el) {
                            if (el.result <= 0) {
                                $.each(el.listResult, function (i, el_wag) {
                                    if (el_wag.result <= 0) this.form_on_setup.validation_common.out_error_message(langView('vopss_mess_error_operation_wagons_run', App.Langs).format(el_wag.num, el_wag.result));
                                }.bind(this))
                            }
                        }.bind(this));
                    }
                }
            }
        }.bind(this));
    };
    // Очистить сообщения
    view_op_dissolution_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    view_op_dissolution_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_dissolution_cars = view_op_dissolution_cars;

    window.App = App;

})(window);