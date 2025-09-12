/* ===============================================
-= Модуль панель операции "ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ" =-
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
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vortc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ"',
            'vortc_card_header_on': 'ВЕРНУТЬ НА СТАНЦИЮ',
            'vortc_card_header_from': 'ОТПРАВЛЕННЫЕ СОСТАВЫ',
            'vortc_fieldset_on_table_title': 'Сформированный состав',

            'vortc_title_label_station_on': 'Станция отправления:',
            'vortc_text_label_station_on': 'Выберите станцию отправления состава...',
            //'vortc_title_placeholder_station_on': 'Станция прибытия:',

            'vortc_title_label_type_return': 'Отмена операции',
            'vortc_title_text_type_return': 'Выберите тип операции отмена или возврат',
            'vortc_title_label_way_on': 'Путь возврата:',
            'vortc_title_text_way_on': 'Выберите путь возврата вагонов состава...',

            //'vortc_title_placeholder_way_on': 'Выберите путь',


            //'vortc_title_label_outer_way': 'Внешний путь:',
            //'vortc_title_placeholder_outer_way': 'Внешний путь',
            'vortc_title_label_locomotive1': 'Локомотив №1:',
            'vortc_title_label_locomotive2': 'Локомотив №2:',
            'vortc_title_placeholder_locomotive': ' № локомотива',
            'vortc_title_time_aplly': 'Время выполнения',
            'vortc_text_time_aplly': 'Время выполнения операции ограниченно +(-)1день',
            'vortc_title_placeholder_time_aplly': 'Время выполнения',

            'vortc_title_form_apply': 'Выполнить',
            'vortc_title_form_apply_title': 'Выполнить операцию "ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ"',

            'vortc_title_button_export': 'Экспорт',
            'vortc_title_button_buffer': 'Буфер',
            'vortc_title_button_excel': 'Excel',
            'vortc_title_button_cancel': 'Отменить',
            'vortc_title_button_return': 'Вернуть',
            'vortc_title_button_head': 'Голова',
            'vortc_title_button_tail': 'Хвост',

            //'vortc_title_add_ok': 'ВЫПОЛНИТЬ',

            //'vortc_mess_warning_not_num_sostav': 'Нет названия состава!',
            'vortc_mess_warning_wagon_ban_operation': 'Вагон № {0} для операций заблокирован (вагон уже принят на станцию: [{1}])',
            'vortc_mess_warning_wagon_ban_operation_return': 'Вагон № {0} для операций заблокирован (вагон уже выбран для возврата: [{1}])',
            'vortc_mess_warning_wagon_existing_way': 'Вагон № {0} для операций заблокирован (вагон стоит на текущем пути!))',


            'vortc_mess_error_required_locomotive': 'Выберите Локомотив №1',
            'vortc_mess_error_required_datetime': 'Укажите время',
            'vortc_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'vortc_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив № {0}',
            'vortc_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты выполнения последней операции [{0}]',
            'vortc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты,  отклонение {0} мин',
            'vortc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'vortc_mess_error_not_wagons': 'Не выбраны вагоны для операции возврата или отмены (в окне «ОТПРАВЛЕННЫЕ СОСТАВЫ», выберите станцию, отправленный состав и сформируйте возврат или отмену).',
            'vortc_mess_error_not_wagons_cancel': 'Не выбраны вагоны для отмены переноса.',
            'vortc_mess_error_operation_run': 'При выполнении операции «ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ» произошла ошибка, код ошибки: {0}',
            'vortc_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            'vortc_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',

            'vortc_mess_cancel_operation_cancel': 'Операция "ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ ВАГОНОВ СОСТАВА" – отменена',
            'vortc_mess_cancel_operation_return': 'Операция "ВОЗРАТ ОТПРАВЛЕННЫХ ВАГОНОВ ИЗ СОСТАВА" – отменена',
            'vortc_mess_run_operation_cancel': 'Выполняю операцию "ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ ВАГОНОВ СОСТАВА"',
            'vortc_mess_run_operation_return': 'Выполняю операцию "ВОЗРАТ ОТПРАВЛЕННЫХ ВАГОНОВ ИЗ СОСТАВА"',

            //'vortc_mess_run_operation_arrival': 'Выполняю операцию приема вагонов прибывающего состава на станцию АМКР',
            'vortc_mess_not_select_way_on': 'Выберите путь для возврата вагонов!',
            'vortc_mess_ok_operation': 'Вагоны возвращены, в количестве {0} (ваг.)',

            'vortc_mess_load_operation': 'Загружаю операции...',
            'vortc_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vortc_mess_load_sostav_outer_ways': 'Загружаю отправленные составы...',
            //'vortc_mess_update_operation': 'Обновляю операции...',
            'vortc_mess_init_panel': 'Выполняю инициализацию модуля ...',
            //'vortc_mess_destroy_operation': 'Закрываю форму...',
            'vortc_mess_create_sostav': 'Формирую возврат, переношу вагоны...',
            'vortc_mess_clear_sostav': 'Формирую возврат, убираю выбранные вагоны...',
            'vortc_mess_reverse_head_sostav': 'Формирую возврат, реверс голова-хвост',
            'vortc_mess_reverse_sostav': 'Формирую возврат, реверс вагонов...',

            'vortc_confirm_title': 'Внимание!',
            'vortc_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию отправления {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'vortc_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь приема {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'vortc_confirm_mess_new_sostav': 'Вы уверены что хотите выбрать новый состав {0} для возврата? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'vortc_confirm_mess_apply_return_wagons': 'Выполнить операцию "ВОЗРАТ ВАГОНОВ ОТПРАВЛЕННОГО СОСТАВА" в количестве: {0} (ваг.), станция отправки: {1}? Будет выполнен возврат вагонов с перегона на указанный путь станции отправления. В отчетах будет зафиксировано возврат с перегона!',
            'vortc_confirm_mess_apply_cancel_wagons': 'Выполнить операцию "ОТМЕНА ОТПРАВКИ ВАГОНОВ СОСТАВА" в количестве: {0} (ваг.), станция отправки: {1}? В отчетах будет отраженно что операция была выполнена ошибочно, вагоны будут возвращены на путь отправки!',

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
    function view_op_return_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_return_cars.prototype.init = function (options) {
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
        this.outer_ways = [];       // Список внешних путей (полный)
        this.list_outer_ways = [];  // Список внешних путей  (value\text\desabled)

        this.id_outer_way = -1;   // id перегона
        this.station_from = null; // Станция отправления

        this.head = false;          // Признак голова(true)\хвост(false), по умолчанию хвост
        this.reverse = false;
        this.wagons = [];           // Список вагонов на пути приема (рабочий)
        /*        this.wagons_add = [];       // Список вагонов которые нужно перенести на путь (рабочий)*/
        this.num_sostav = null;     // Номер выбранного состава
        this.wagons_sostav = [];    // Список вагонов выбранного состава нп пути прибытия (рабочий)
        this.wagons_all = [];       // Список всех вагонов всех составов (используем для выборки вагонов по составу)
        this.sostav_all = [];       // Список всех составов (получаем из Списока всех вагонов всех составов this.wagons_all)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vortc_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();

        // Сообщение
        LockScreen(langView('vortc_mess_init_panel', App.Langs));
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
            header_text: langView('vortc_card_header_on', App.Langs),
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
            header_text: langView('vortc_card_header_from', App.Langs),
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
                        console.log('Close view_op_return_cars');
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
                    text: langView('vortc_title_form_apply', App.Langs),
                    title: langView('vortc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_on_setup.$form.submit();
                    }.bind(this),
                }
            };
            var form_checkbox_type_return = {
                obj: 'bs_form_check',
                options: {
                    validation_group: 'common_on',
                    id: 'type_return',
                    name: 'type_return',
                    label: langView('vortc_title_label_type_return', App.Langs),
                    element_type: 'checkbox',
                    element_switch: false,
                    element_inline: false,
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_checked: false,
                    element_required: false,
                    element_readonly: false,
                    element_options: {
                        default: false,
                        fn_change: function (e) {
                            var value = $(e.currentTarget).prop('checked');
                            this.enableCancel(value, function () {
                                this.view_wagons_arrival();
                                this.view_wagons_of_sostav();
                                LockScreenOff();
                            }.bind(this));
                        }.bind(this),
                        //fn_click: function (e) {
                        //    var value = $(e.currentTarget).prop('checked');
                        //    this.enableCancel(value, function () {
                        //        this.view_wagons_arrival();
                        //        this.view_wagons_of_sostav();
                        //        LockScreenOff();
                        //    }.bind(this));
                        //}.bind(this),

                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: null,
                    form_text: langView('vortc_title_text_type_return', App.Langs),
                    form_text_class: null
                },
                childs: []
            };
            var form_select_way_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_on',
                    id: 'id_way',
                    name: 'id_way',
                    label: langView('vortc_title_label_way_on', App.Langs),
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
                            this.update(this.id_station, id, this.num_sostav, function () {
                                this.view_wagons();
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
                    form_text: langView('vortc_title_text_way_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datalist_locomotive1 = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common_on',
                    id: 'locomotive1',
                    name: 'locomotive1',
                    label: langView('vortc_title_label_locomotive1', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vortc_title_placeholder_locomotive', App.Langs),
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
                    validation_group: 'common_on',
                    id: 'locomotive2',
                    name: 'locomotive2',
                    label: langView('vortc_title_label_locomotive2', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vortc_title_placeholder_locomotive', App.Langs),
                    element_required: false,
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
                    validation_group: 'common_on',
                    id: 'time_aplly',
                    name: 'time_aplly',
                    label: langView('vortc_title_time_aplly', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vortc_title_placeholder_time_aplly', App.Langs),
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
                    form_text: langView('vortc_text_time_aplly', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            col_bt_apply.childs.push(bt_bt_apply);
            objs_on_setup.push(col_bt_apply);
            objs_on_setup.push(form_checkbox_type_return);
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
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        var message = null;
                        if (valid) {
                            //var wagons = this.wagons.filter(function (i) { return i.position_new !== null && i.id_wim_arrival !== null; });// получить вагоны
                            var wagons = this.wagons_sostav.filter(function (i) {
                                return i.return !== null;
                            }.bind(this));

                            if (result.new.input_checkbox_type_return) {
                                // отмена
                                message = langView('vortc_confirm_mess_apply_cancel_wagons', App.Langs).format((wagons ? wagons.length : 0), this.station_from)
                            } else {
                                // возврат
                                message = langView('vortc_confirm_mess_apply_return_wagons', App.Langs).format((wagons ? wagons.length : 0), this.station_from)
                            }
                            this.view_com.mcf.open(
                                langView('vortc_title_form_apply', App.Langs),
                                message,
                                function () {
                                    // Принять
                                    // Проверим наличие вагонов 
                                    var list_wagons = [];
                                    if (wagons && wagons.length > 0) {
                                        // Получим перечень вагонов и новую позицию
                                        var position = 1;
                                        if (this.reverse) {
                                            wagons.sort(function (a, b) { return b.outerWayPosition - a.outerWayPosition });
                                        } else {
                                            wagons.sort(function (a, b) { return a.outerWayPosition - b.outerWayPosition });
                                        }
                                        $.each(wagons, function (i, el) {
                                            list_wagons.push({ wir_id: el.idWir, position: position++ })
                                        }.bind(this));
                                        //$.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
                                        //    list_wagons.push({ wir_id: el.wirId, position: el.position_new })
                                        //}.bind(this));
                                        // Сформируем операцию
                                        var operation = {
                                            id_outer_way: this.id_outer_way,
                                            wagons: list_wagons,
                                            id_way: Number(result.new.select_id_way),
                                            head: this.head,
                                            lead_time: result.new.input_datetime_time_aplly._i,
                                            //lead_time: moment.utc(result.new.input_datetime_time_aplly).toISOString(),
                                            locomotive1: result.new.datalist_locomotive1,
                                            locomotive2: result.new.datalist_locomotive2,
                                            type_return: result.new.input_checkbox_type_return,
                                            /*                                            user: App.User_Name*/
                                        };
                                        this.apply(operation);
                                    }
                                }.bind(this),
                                function () {
                                    this.form_on_setup.validation_common_on.out_warning_message(langView((result.new.input_checkbox_type_return ? 'vortc_mess_cancel_operation_cancel' : 'vortc_mess_cancel_operation_return'), App.Langs));
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
                    //console.log('[view_op_return_cars] [form_on_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_arr_cars_way = new this.view_com.fe_ui.bs_row({ id: 'op-rc-arrival-cars-way', class: 'pt-2' });
            //this.on_table.$html.empty();
            this.on_table.$html.append(row_arr_cars_way.$html);
            /*            console.log('add row_arr_cars_way');*/
            this.tacw_opr = new TWS('div#op-rc-arrival-cars-way');
            this.tacw_opr.init({
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'arrival_cars_way',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.tacw_opr.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.id_wim_arrival !== null;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'del_wagons_sostav',
                        action: function (e, dt, node, config) {
                            this.tacw_opr.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        name: 'head_tail',
                        action: function (e, dt, node, config) {
                            this.tacw_opr.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        name: 'reverse',
                        action: function (e, dt, node, config) {
                            this.tacw_opr.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [tacw_opr] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.on_alert.clear_message();
                    if (rowData && rowData.length > 0 && rowData[0].id_wim_arrival === null) {
                        e.preventDefault();
                        this.on_alert.out_warning_message(langView('vortc_mess_warning_wagon_existing_way', App.Langs).format(rowData[0].num));
                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'eye') {
                        this.view_wagons_arrival();
                        LockScreenOff();
                    }
                    if (name === 'del_wagons_sostav') {
                        LockScreen(langView('vortc_mess_clear_sostav', App.Langs));
                        //var base = this;
                        var rows = this.tacw_opr.tab_com.get_select_row();
                        if (rows && rows.length > 0) {
                            //var new_wagons_add = [];
                            $.each(rows, function (i, el) {
                                var element = this.wagons_sostav.find(function (o) {
                                    return o.num === el.num;
                                }.bind(this));
                                if (element) { element.return = null; }
                            }.bind(this));
                            this.view_wagons_arrival(); // Обновить
                            this.view_wagons_of_sostav();
                            LockScreenOff();
                            /*                            this.wagons_add = new_wagons_add;*/
                        } else {
                            this.from_alert.out_warning_message(langView('vortc_mess_error_not_wagons_cancel', App.Langs));
                        };
                        // Убрать вагоны
                        //wagons_del_async.call(this, rows, function () {
                        //    // Авто нумерация
                        //    // Выполнить операцию перенумеровать (добавить 0 - вагонов)
                        //    wagons_add_async.call(base, [], 1, function (position) {
                        //        this.view_wagons(); // Обновить вагоны на пути приема
                        //        LockScreenOff();
                        //    }.bind(base));
                        //});
                    }
                    if (name === 'head_tail') {
                        LockScreen(langView('vortc_mess_reverse_head_sostav', App.Langs));
                        this.head = !this.head;
                        // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
                        this.view_wagons_arrival();
                        LockScreenOff();
                        //wagons_add_async.call(this, [], 1, function (position) {
                        //    this.view_wagons(); // Обновить вагоны на пути приема
                        //    LockScreenOff();
                        //}.bind(this));
                    }
                    if (name === 'reverse') {
                        LockScreen(langView('vortc_mess_reverse_sostav', App.Langs));
                        this.reverse = !this.reverse;
                        this.view_wagons_arrival();
                        LockScreenOff();
                        //wagons_reverse_enumerate_async.call(this, function () {
                        //    // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
                        //    wagons_add_async.call(this, [], 1, function (position) {
                        //        this.view_wagons(); // Обновить вагоны на пути приема
                        //        LockScreenOff();
                        //    }.bind(this));
                        //}.bind(this));
                    }
                }.bind(this),
                fn_enable_button: function (tb) {
                    var bts = tb.obj_t_report.buttons([8]);
                    if (this.head) {
                        bts.text(langView('vortc_title_button_head', App.Langs));
                    } else {
                        bts.text(langView('vortc_title_button_tail', App.Langs));
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
                    label: langView('vortc_title_label_station_on', App.Langs),
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
                            this.update(id, this.id_way, this.num_sostav, function () {
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
                    form_text: langView('vortc_text_label_station_on', App.Langs),
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
                    //this.$radio_loading = $('input[name="type_return"]').change(function (event) {
                    //    //
                    //}.bind(this));
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [form_from_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_sostav_from = new this.view_com.fe_ui.bs_row({ id: 'op-rc-sostav-outer-ways', class: 'pt-2' });
            var row_wagons_from = new this.view_com.fe_ui.bs_row({ id: 'op-rc-wagons-outer-way', class: 'pt-2' });
            this.from_table.$html.append(row_sostav_from.$html).append(row_wagons_from.$html);
            //console.log('add row_sostav_from');
            //console.log('add row_wagons_from');
            this.tsf_opr = new TWS('div#op-rc-sostav-outer-ways');
            this.tsf_opr.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-striped table-sostav-outer-ways table-bordered border-secondary',
                detali_table: false,
                type_report: 'sostav_outer_ways',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [tsf_opr] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    if (rowData !== null && rowData.length > 0) {
                        e.preventDefault();
                        var new_sostav = rowData[0].outerWayNumSostav;
                        //this.id_way_cancel = rowData[0].fromIdWay;
                        this.update_num_sostav(new_sostav, function (update) {
                            //var countWagonsAccepted = rows[0].countWagonsAccepted;
                            //if (countWagonsAccepted > 0) {
                            //    this.form_on_setup.el.input_checkbox_type_return.disable();
                            //    this.form_on_setup.el.input_checkbox_type_return.val(false);
                            //    this.enableCancel(false);
                            //} else {
                            //    this.form_on_setup.el.input_checkbox_type_return.enable();
                            //}
                            if (update) this.tsf_opr.tab_com.select_row(new_sostav);
                        }.bind(this));
                    }
                    //if (this.wagons_add !== null && this.wagons_add.length > 0 && rowData !== null && rowData.length > 0) {
                    //    var new_sostav = rowData[0].outerWayNumSostav;
                    //    e.preventDefault();
                    //    this.view_com.mcf.open(
                    //        langView('vortc_confirm_title', App.Langs),
                    //        langView('vortc_confirm_mess_new_sostav', App.Langs).format(new_sostav, this.wagons_add.length),
                    //        function () {
                    //            // новый сотав
                    //            this.tsf_opr.tab_com.select_row(new_sostav);
                    //        }.bind(this),
                    //        function () {

                    //        }.bind(this)
                    //    );
                    //}
                }.bind(this),
                fn_select_rows: function (rows, type) {
                    if (type === "select") {
                        //
                        this.station_from = null;
                        this.id_outer_way = null;   // id перегона
                        this.id_way_cancel = null;  // Путь отмены
                        if (rows != null && rows.length > 0) {
                            this.station_from = rows[0]['fromStationAbbr' + ucFirst(App.Lang)]; // Станция отправления
                            this.id_outer_way = rows[0].idOuterWay;   // id перегона
                            this.id_way_cancel = rows[0].fromIdWay;
                            //var cancel = this.form_on_setup.el.input_checkbox_type_return.val();
                            //// если выбрана отмена операции тогда выбор состава приводит к изменению пути
                            //if (cancel) {
                            //    // Обновим данные на пути (второй поток)
                            //    this.update_on_way(this.id_way_cancel,
                            //        function () {
                            //            // Показать вагоны на пути приема
                            //            this.view_wagons_arrival();
                            //            this.view_wagons_of_sostav();
                            //            LockScreenOff();
                            //        }.bind(this)
                            //    );
                            //} else {
                            //    this.view_wagons_arrival();
                            //    this.view_wagons_of_sostav();
                            //    LockScreenOff();
                            //}
                            LockScreenOff();
                        } else {
                            LockScreenOff();
                        }
                    }

                    //if (type === "select") {
                    //    var num_sostav = null;
                    //    this.station_from = null;
                    //    this.id_outer_way = null;   // id перегона
                    //    if (rows != null && rows.length > 0) {
                    //        num_sostav = rows[0].outerWayNumSostav;
                    //        this.station_from = rows[0]['fromStationAbbr' + ucFirst(App.Lang)]; // Станция отправления
                    //        this.id_outer_way = rows[0].idOuterWay;   // id перегона
                    //        var id_way = rows[0].fromIdWay;
                    //        // Запустим паралельно
                    //        var pr_ss = 2;
                    //        var out_prss = function (pr_ss) {
                    //            if (pr_ss === 0) {
                    //                LockScreenOff();
                    //            }
                    //        }.bind(this);
                    //        // Покажем вагоны состава (первый поток)
                    //        this.view_wagons_of_sostav_outer_ways(num_sostav, function () {
                    //            // Показать вагоны состава прибытия
                    //            this.view_wagons_of_sostav();
                    //            pr_ss--;
                    //            out_prss(pr_ss);

                    //        }.bind(this));
                    //        // Обновим данные на пути (второй поток)
                    //        this.update_on_way(id_way,
                    //            function () {
                    //                // Показать вагоны на пути приема
                    //                this.view_wagons_arrival();
                    //                pr_ss--;
                    //                out_prss(pr_ss);
                    //            }.bind(this)
                    //        );

                    //    }
                    //} else {
                    //    //// Сбросим вагоны
                    //    //this.num_sostav = null;
                    //    //this.wagons_sostav = [];
                    //    //this.wagons_add = [];
                    //    //this.view_wagons_of_sostav_outer_ways(num_sostav, function () {
                    //    //    // Показать вагоны состава прибытия
                    //    //    this.view_wagons_of_sostav();
                    //    //    LockScreenOff();

                    //    //}.bind(this));
                    //}
                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
            });

            this.twf_opr = new TWS('div#op-rc-wagons-outer-way');
            this.twf_opr.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'wagons_outer_way',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.twf_opr.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.outerWayEnd === null && data.return === null;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'add_sostav',
                        action: function (e, dt, node, config) {
                            this.twf_opr.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [twf_opr] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.from_alert.clear_message();
                    if (rowData && rowData.length > 0) {
                        if (rowData[0].outerWayEnd !== null) {
                            e.preventDefault();
                            this.from_alert.out_warning_message(langView('vortc_mess_warning_wagon_ban_operation', App.Langs).format(rowData[0].num, rowData[0]['arrivalStationName' + ucFirst(App.Lang)]));
                        }
                        if (rowData[0].return !== null) {
                            e.preventDefault();
                            this.from_alert.out_warning_message(langView('vortc_mess_warning_wagon_ban_operation_return', App.Langs).format(rowData[0].num));
                        }
                    } else {
                        e.preventDefault();
                        this.from_alert.out_warning_message(langView('vortc_mess_error_not_wagons', App.Langs));
                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'add_sostav') {
                        if (this.id_way >= 0) {
                            var rows = this.twf_opr.tab_com.get_select_row();
                            // Выполнить операцию добавить вагоны
                            if (rows && rows.length > 0) {
                                LockScreen(langView('vortc_mess_create_sostav', App.Langs));
                                $.each(rows, function (i, el) {
                                    el['return'] = true;
                                });
                                /*                                this.view_wagons(); // Обновить вагоны на пути приема*/
                                this.view_wagons_arrival(); // Обновить
                                this.view_wagons_of_sostav();
                                LockScreenOff();
                            } else {
                                this.from_alert.out_warning_message(langView('vortc_mess_error_not_wagons', App.Langs));
                            };

                        } else {
                            this.from_alert.out_warning_message(langView('vortc_mess_not_select_way_on', App.Langs));
                        }
                    }
                    if (name === 'eye') {
                        this.view_wagons_of_sostav();
                        LockScreenOff();
                    }
                }.bind(this),
                fn_enable_button: function (tb) {
                    var index = tb.obj_t_report.rows({ selected: true });
                    var bts = tb.obj_t_report.buttons([6]);
                    bts.enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
                }.bind(this),
            });

        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    view_op_return_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vortc_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Сбросим установки (время и локомотивы)
        this.form_on_setup.el.datalist_locomotive1.val('');
        this.form_on_setup.el.datalist_locomotive2.val('');
        this.form_on_setup.el.input_datetime_time_aplly.val(moment());
        /*        this.wagons_add = [];*/
        this.form_from_setup.clear_all();
        // Сбросим вагоны переноса
        var id_station = -1;
        this.id_station = -1;
        this.id_outer_way = -1;
        this.head = false;          // Признак голова(true)\хвост(false), по умолчанию хвост
        this.reverse = false;
        this.wagons = [];           // Список вагонов на пути приема (рабочий)
        this.num_sostav = null;     // Номер выбранного состава
        this.wagons_sostav = [];    // Список вагонов выбранного состава нп пути прибытия (рабочий)
        this.wagons_all = [];       // Список всех вагонов всех составов (используем для выборки вагонов по составу)
        this.sostav_all = [];       // Список всех составов (получаем из Списока всех вагонов всех составов this.wagons_all)
        this.form_on_setup.el.input_checkbox_type_return.disable();
        this.form_on_setup.el.input_checkbox_type_return.val(false);
        this.enableCancel(false, function () {
            //this.view_wagons_arrival();
            //this.view_wagons_of_sostav();
            //LockScreenOff();
        }.bind(this));
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
        this.update(id_station, id_way, this.num_sostav, function () {
            LockScreenOff();
        }.bind(this));
    };
    // Проверим есть перенесенные вагоны
    view_op_return_cars.prototype.isAddWagon = function (callback_ok, callback_not) {
        //var wagons_add = this.wagons.filter(function (i) {
        //    return i.id_wim_arrival !== null;
        //}.bind(this));
        var wagons_add = this.wagons_sostav.filter(function (i) {
            return i.return !== null;
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
    // Активировать режим отмена операции
    view_op_return_cars.prototype.enableCancel = function (cancel, callback) {
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        if (cancel) {
            this.head = false;          // Признак голова(true)\хвост(false), по умолчанию хвост
            this.reverse = false;
            this.form_on_setup.el.datalist_locomotive1.disable();
            this.form_on_setup.el.datalist_locomotive2.disable();
            this.form_on_setup.el.input_datetime_time_aplly.disable();
            this.form_on_setup.el.select_id_way.disable();
            var bts = this.tacw_opr.tab_com.obj_t_report.buttons([5, 7, 8, 9]);
            if (bts) bts.disable();
            if (this.num_sostav !== null && this.id_way_cancel) {
                this.form_on_setup.el.select_id_way.val(this.id_way_cancel);
                // Выберем все вагоны состава
                $.each(this.wagons_sostav, function (i, el) {
                    el['return'] = cancel ? cancel : null;
                });
                // загрузим вагоны на пути
                this.load_of_way(this.id_way_cancel, function () {
                    //// Показать вагоны на пути приема
                    //this.view_wagons_arrival();
                    //LockScreenOff();
                    if (typeof callback === 'function') {
                        callback(this.wagons_sostav);
                    }
                }.bind(this));
            }

        } else {
            this.form_on_setup.el.datalist_locomotive1.enable();
            this.form_on_setup.el.datalist_locomotive2.enable();
            this.form_on_setup.el.input_datetime_time_aplly.enable();
            this.form_on_setup.el.select_id_way.enable();
            var bts = this.tacw_opr.tab_com.obj_t_report.buttons([5, 7, 8, 9]);
            if (bts) bts.enable();
            if (typeof callback === 'function') {
                callback(this.wagons_sostav);
            }
        }
    }

    view_op_return_cars.prototype.update = function (id_station, id_way, num_sostav, callback) {
        //this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
        //this.reverse = false;
        // Обновим пути по станции
        this.update_outgoing_sostav(id_station, id_way, function (update_station) {
            if (update_station) {
                num_sostav = null;
            }
            this.update_num_sostav(num_sostav, function (update_sostav) {
                this.view_wagons();
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        }.bind(this));
    };
    //! Обновим составы отправленные со станции
    view_op_return_cars.prototype.update_outgoing_sostav = function (id_station, id_way, callback) {
        this.confirm_update_station_on(id_station,
            function () { // Ok
                this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
                this.reverse = false;
                // обновим компонент пути отправки
                this.form_on_setup.el.select_id_way.update(this.view_com.api_dir.getListValueTextWaysOfStation(id_station), id_way);
                // Обновим станцию
                this.id_station = id_station;
                this.form_on_setup.el.input_checkbox_type_return.val(false);
                this.form_on_setup.el.input_checkbox_type_return.disable();
                this.form_on_setup.el.input_checkbox_type_return.val(false);
                this.enableCancel(false, function () {
                    //this.view_wagons_arrival();
                    //this.view_wagons_of_sostav();
                    //LockScreenOff();
                }.bind(this));

                this.num_sostav = null;
                this.wagons_sostav = [];
                //this.wagons_add = [];
                // Запустим паралельно
                var pr_us = 2;
                var out_prus = function (pr_us) {
                    if (pr_us === 0) {
                        if (typeof callback === 'function') {
                            callback(true);
                        }
                    }
                }.bind(this);
                // загрузим составы отправленные состанции (первый поток)
                this.load_of_outer_ways(id_station,
                    function () {
                        pr_us--;
                        out_prus(pr_us);
                    }.bind(this)
                );
                // Обновим данные на пути (второй поток)
                // Не сбрасывать в начале
                if (this.id_way > 0) {
                    id_way = -1;
                }
                this.update_on_way(id_way,
                    function () {
                        pr_us--;
                        out_prus(pr_us);
                    }.bind(this)
                );
            }.bind(this),
            function () { // Cancel
                // Обновим данные на пути
                this.update_on_way(id_way,
                    function () {
                        if (typeof callback === 'function') {
                            callback(false);
                        }
                    }.bind(this)
                );
            }.bind(this));
    }
    //! Проверка и подтверждение изменений по станции отправки
    view_op_return_cars.prototype.confirm_update_station_on = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station !== id_station) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vortc_confirm_title', App.Langs),
                        langView('vortc_confirm_mess_change_station', App.Langs).format(this.form_from_setup.el.select_id_station.text(), count),
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
    //! Обновим вагоны на пути возврата
    view_op_return_cars.prototype.update_on_way = function (id_way, callback) {
        this.confirm_update_way_on(id_way,
            function () { // Ok
                // выберим путь на компоненте пути возврата
                this.form_on_setup.el.select_id_way.val(id_way);
                // загрузим вагоны на пути
                this.load_of_way(id_way, function () {
                    // Событие обновили данные
                    if (typeof callback === 'function') {
                        callback();
                    }
                }.bind(this));
            }.bind(this),
            function () { // Cancel
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
    }
    //! Проверка и подтверждение изменений по пути возврата вагонов
    view_op_return_cars.prototype.confirm_update_way_on = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way !== id_way) {
            //var cancel = this.form_on_setup.el.input_checkbox_type_return.val();
            //// если выбрана операция отмена тогда путь поменять нельзя
            //if (cancel && this.num_sostav !== null) {
            //    this.form_on_setup.el.select_id_way.val(this.id_way_cancel);
            //    if (typeof callback_cancel === 'function') {
            //        callback_cancel();
            //    }
            //} else {
            ////this.isAddWagon(
            ////    function (count) {
            ////        // есть вагоны
            ////        this.view_com.mcf.open(
            ////            langView('vortc_confirm_title', App.Langs),
            ////            langView('vortc_confirm_mess_change_way', App.Langs).format(this.form_on_setup.el.select_id_way.text(), count),
            ////            function () {
            ////                if (typeof callback_ok === 'function') {
            ////                    callback_ok();
            ////                }
            ////            }.bind(this),
            ////            function () {
            ////                this.form_on_setup.el.select_id_way.val(this.id_way);
            ////                if (typeof callback_cancel === 'function') {
            ////                    callback_cancel();
            ////                }
            ////            }.bind(this)
            ////        );
            ////    }.bind(this),
            ////    function () {
            ////        // нет выбранных вагонов
            ////        if (typeof callback_ok === 'function') {
            ////            callback_ok();
            ////        }
            ////    }.bind(this)
            ////);
            //}
            if (typeof callback_ok === 'function') {
                callback_ok();
            }
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    //! Обновить информацию по новому составу
    view_op_return_cars.prototype.update_num_sostav = function (num_sostav, callback) {
        this.confirm_update_num_sostav(num_sostav,
            function () { // Ok
                // загрузим вагоны на пути
                this.load_of_sostav_outer_ways(num_sostav, function () {
                    this.num_sostav = num_sostav;
                    // Событие обновили данные
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
    //! Проверим изменился номер состава
    view_op_return_cars.prototype.confirm_update_num_sostav = function (num_sostav, callback_ok, callback_cancel) {
        if (this.num_sostav !== num_sostav) {
            /*var cancel = this.form_on_setup.el.input_checkbox_type_return.val();*/
            this.isAddWagon(
                function (count) {
                    this.view_com.mcf.open(
                        langView('vortc_confirm_title', App.Langs),
                        langView('vortc_confirm_mess_new_sostav', App.Langs).format(num_sostav, count),
                        function () {
                            // новый сотав
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
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
    //! Загрузить вагоны на выбраном пути прибытия в масив this.wagons (подготовить поля для вагонов приема)
    view_op_return_cars.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way = id_way;
            LockScreen(langView('vortc_mess_load_wagons', App.Langs));
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
            this.id_way = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    //! Загрузим все вагоны (this.wagons_all) на перегоне по указанной станции, сформирум составы (this.sostav_all)
    view_op_return_cars.prototype.load_of_outer_ways = function (id_station, callback) {
        this.sostav_all = [];
        this.wagons_all = [];
        //this.num_sostav = null;
        if (id_station !== null && id_station >= 0) {
            LockScreen(langView('vortc_mess_load_sostav_outer_ways', App.Langs));
            this.view_com.api_wsd.getViewOpenWagonsOfOuterWaysStationFrom(id_station, function (wagons) {
                $.each(wagons, function (i, el) {
                    el['return'] = null;
                });
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
                if (typeof callback === 'function') {
                    callback(this.sostav_all, this.wagons_all);
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback(this.sostav_all, this.wagons_all);
            }
        }
    };
    //! Загрузить вагоны состава
    view_op_return_cars.prototype.load_of_sostav_outer_ways = function (num_sostav, callback) {
        this.wagons_sostav = [];
        if (num_sostav !== null) {
            if (this.wagons_all != null && this.wagons_all.length > 0) {
                LockScreen(langView('vortc_mess_load_wagons', App.Langs));
                // сбросим выбранные вагоны
                $.each(this.wagons_all, function (i, el) {
                    el['return'] = null;
                });
                this.wagons_sostav = this.wagons_all.filter(function (i) {
                    return $.trim(i.outerWayNumSostav) === $.trim(num_sostav);
                }.bind(this));
                if (this.wagons_sostav !== null && this.wagons_sostav.length > 0) {
                    this.id_way_cancel = this.wagons_sostav[0].fromIdWay;
                    var countWagonsAccepted = this.wagons_sostav.find(function (i) { return i.outerWayEnd !== null }.bind(this));
                    if (countWagonsAccepted) {
                        this.form_on_setup.el.input_checkbox_type_return.disable();
                        this.form_on_setup.el.input_checkbox_type_return.val(false);
                        //this.enableCancel(false);
                    } else {
                        this.form_on_setup.el.input_checkbox_type_return.enable();
                        //this.enableCancel(true);
                    };
                    var cancel = this.form_on_setup.el.input_checkbox_type_return.val();
                    this.enableCancel(cancel, function () {
                        this.view_wagons_arrival();
                        this.view_wagons_of_sostav();
                        LockScreenOff();
                    }.bind(this));
                    //if (cancel) {
                    //    this.head = false;          // Признак голова(true)\хвост(false), по умолчанию хвост
                    //    this.reverse = false;
                    //};
                    //$.each(this.wagons_sostav, function (i, el) {
                    //    el['return'] = cancel ? cancel : null;
                    //});
                }
            }
            if (typeof callback === 'function') {
                callback(this.wagons_sostav);
            }
        } else {
            if (typeof callback === 'function') {
                callback(this.wagons_sostav);
            }
        }
    };
    //! Отобразить вагоны все вагоны на пути приема и прибывающего состава
    view_op_return_cars.prototype.view_wagons = function () {
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать вагоны на пути приема
        this.view_wagons_arrival();
        // Показать составы отправленные
        this.view_sostavs_of_outer_ways();
        // Показать вагоны состава прибытия
        //this.view_wagons_of_sostav();
    };
    //! Отобразить вагоны на пути возврата
    view_op_return_cars.prototype.view_wagons_arrival = function () {

        //this.head = false;          // Признак голова(true)\хвост(false), по умолчанию хвост
        //this.reverse = false;
        // Показать вагоны на пути приема
        var wagons = this.wagons;   // стоят на пути
        var new_wagons = [];        // будут добавлены
        var wagons_add = this.wagons_sostav.filter(function (i) {
            return i.return !== null;
        }.bind(this));

        //var wagon_max_position = null;
        if (wagons_add !== null && wagons_add.length > 0) {
            if (this.reverse) {
                wagons_add.sort(function (a, b) { return b.outerWayPosition - a.outerWayPosition });
            } else {
                wagons_add.sort(function (a, b) { return a.outerWayPosition - b.outerWayPosition });
            }
            var position = 1;
            if (this.head) {
                $.each(wagons_add, function (i, el) {
                    // Создадим строку вагон на пути
                    var new_car_way = {
                        position_new: position,
                        id_wim_arrival: el.fromIdWim,
                        arrivalCargoGroupNameEn: el.arrivalCargoGroupNameEn,
                        arrivalCargoGroupNameRu: el.arrivalCargoGroupNameRu,
                        arrivalCargoNameEn: el.arrivalCargoNameEn,
                        arrivalCargoNameRu: el.arrivalCargoNameRu,
                        arrivalCommercialConditionEn: null,
                        arrivalCommercialConditionRu: null,
                        arrivalCompositionIndex: null,
                        arrivalConditionAbbrEn: el.arrivalConditionAbbrEn,
                        arrivalConditionAbbrRu: el.arrivalConditionAbbrRu,
                        arrivalConditionNameEn: el.arrivalConditionNameEn,
                        arrivalConditionNameRu: el.arrivalConditionNameRu,
                        arrivalConditionRed: el.arrivalCompositionRed,
                        arrivalDateAdoption: null,
                        arrivalDivisionAmkrAbbrEn: el.arrivalDivisionAmkrAbbrEn,
                        arrivalDivisionAmkrAbbrRu: el.arrivalDivisionAmkrAbbrRu,
                        arrivalDivisionAmkrCode: el.arrivalDivisionAmkrCode,
                        arrivalDivisionAmkrNameEn: el.arrivalDivisionAmkrNameEn,
                        arrivalDivisionAmkrNameRu: el.arrivalDivisionAmkrNameRu,
                        arrivalDuration: null,
                        arrivalIdCommercialCondition: null,
                        arrivalIdSertificationData: el.arrivalIdSertificationData,
                        arrivalIdleTime: null,
                        arrivalNomDoc: el.arrivalNomDoc,
                        arrivalNomMainDoc: el.arrivalNomMainDoc,
                        arrivalSertificationDataEn: el.arrivalSertificationDataEn,
                        arrivalSertificationDataRu: el.arrivalSertificationDataRu,
                        arrivalShipperCode: null,
                        arrivalShipperNameEn: null,
                        arrivalShipperNameRu: null,
                        arrivalStationAmkrAbbrEn: null,
                        arrivalStationAmkrAbbrRu: null,
                        arrivalStationAmkrNameEn: null,
                        arrivalStationAmkrNameRu: null,
                        arrivalStationFromCode: null,
                        arrivalStationFromNameEn: null,
                        arrivalStationFromNameRu: null,
                        arrivalUsageFee: null,
                        currentConditionAbbrEn: el.fromOperationConditionAbbrEn,
                        currentConditionAbbrRu: el.fromOperationConditionAbbrRu,
                        currentConditionNameEn: el.fromOperationConditionNameEn,
                        currentConditionNameRu: el.fromOperationConditionNameRu,
                        currentConditionRed: null,
                        currentIdLoadingStatus: el.fromOperationIdLoadingStatus,
                        currentIdOperation: el.fromIdOperation,
                        currentLoadingStatusEn: el.fromOperationLoadingStatusEn,
                        currentLoadingStatusRu: el.fromOperationLoadingStatusRu,
                        currentOperationEnd: el.fromOperationEnd,
                        currentOperationNameEn: el.fromOperationNameEn,
                        currentOperationNameRu: el.fromOperationNameRu,
                        currentOperationStart: el.fromOperationStart,
                        currentStationDuration: null,
                        currentStationIdleTime: null,
                        currentWagonBusy: el.fromBusy,
                        currentWayDuration: null,
                        diffVesg: null,
                        docOutgoingCar: el.docOutgoingCar,
                        idLimitingLoading: el.idLimitingLoading,
                        idOperator: el.idOperator,
                        idOwnerWagon: null,
                        instructionalLettersDatetime: null,
                        instructionalLettersNote: null,
                        instructionalLettersNum: null,
                        instructionalLettersStationCode: null,
                        instructionalLettersStationName: null,
                        limitingAbbrEn: el.limitingAbbrEn,
                        limitingAbbrRu: el.limitingAbbrRu,
                        limitingNameEn: el.limitingNameEn,
                        limitingNameRu: el.limitingNameRu,
                        num: el.num,
                        operatorAbbrEn: el.operatorAbbrEn,
                        operatorAbbrRu: el.operatorAbbrRu,
                        operatorColor: null,
                        operatorMonitoringIdleTime: null,
                        operatorPaid: null,
                        operatorRentEnd: null,
                        operatorRentStart: null,
                        operatorsEn: el.operatorsEn,
                        operatorsRu: el.operatorsRu,
                        outgoingDate: null,
                        outgoingIdReturn: null,
                        outgoingReturnCauseEn: null,
                        outgoingReturnCauseRu: null,
                        outgoingSostavStatus: null,
                        ownerWagonAbbrEn: null,
                        ownerWagonAbbrRu: null,
                        ownerWagonEn: null,
                        ownerWagonRu: null,
                        position: null,
                        sapIncomingSupplyCargoCode: null,
                        sapIncomingSupplyCargoName: null,
                        sapIncomingSupplyDate: null,
                        sapIncomingSupplyNum: null,
                        sapIncomingSupplyPos: null,
                        sapIncomingSupplyTime: null,
                        sapIncomingSupplyWarehouseCode: null,
                        sapIncomingSupplyWarehouseName: null,
                        wagonAdm: el.wagonAdm,
                        wagonAdmAbbrEn: el.wagonAdmAbbrEn,
                        wagonAdmAbbrRu: el.wagonAdmAbbrRu,
                        wagonAdmNameEn: el.wagonAdmNameEn,
                        wagonAdmNameRu: el.wagonAdmNameRu,
                        wagonBanUz: null,
                        wagonBruttoAmkr: null,
                        wagonBruttoDoc: null,
                        wagonClosedRoute: null,
                        wagonDateRemUz: null,
                        wagonGruzpDoc: null,
                        wagonGruzpUz: null,
                        wagonRod: el.wagonRod,
                        wagonRodAbbrEn: el.wagonRodAbbrEn,
                        wagonRodAbbrRu: el.wagonRodAbbrRu,
                        wagonRodNameEn: el.wagonRodNameEn,
                        wagonRodNameRu: el.wagonRodNameRu,
                        wagonTaraArcDoc: null,
                        wagonTaraDoc: null,
                        wagonTaraUz: null,
                        wagonTypeEn: null,
                        wagonTypeRu: null,
                        wagonVesgAmkr: null,
                        wagonVesgDoc: null,
                        wimId: el.fromIdWim,
                        wioId: 0,
                        wirId: el.idWir,
                    };
                    new_wagons.push(new_car_way);
                    position++;
                }.bind(this));
                $.each(wagons, function (i, el) {
                    el['position_new'] = position;
                    position++;
                }.bind(this));
                wagons = new_wagons.concat(wagons);
            } else {
                $.each(wagons, function (i, el) {
                    el['position_new'] = position;
                    position++;
                }.bind(this));
                $.each(wagons_add, function (i, el) {
                    // Создадим строку вагон на пути
                    var new_car_way = {
                        position_new: position,
                        id_wim_arrival: el.fromIdWim,
                        arrivalCargoGroupNameEn: el.arrivalCargoGroupNameEn,
                        arrivalCargoGroupNameRu: el.arrivalCargoGroupNameRu,
                        arrivalCargoNameEn: el.arrivalCargoNameEn,
                        arrivalCargoNameRu: el.arrivalCargoNameRu,
                        arrivalCommercialConditionEn: null,
                        arrivalCommercialConditionRu: null,
                        arrivalCompositionIndex: null,
                        arrivalConditionAbbrEn: el.arrivalConditionAbbrEn,
                        arrivalConditionAbbrRu: el.arrivalConditionAbbrRu,
                        arrivalConditionNameEn: el.arrivalConditionNameEn,
                        arrivalConditionNameRu: el.arrivalConditionNameRu,
                        arrivalConditionRed: el.arrivalCompositionRed,
                        arrivalDateAdoption: null,
                        arrivalDivisionAmkrAbbrEn: el.arrivalDivisionAmkrAbbrEn,
                        arrivalDivisionAmkrAbbrRu: el.arrivalDivisionAmkrAbbrRu,
                        arrivalDivisionAmkrCode: el.arrivalDivisionAmkrCode,
                        arrivalDivisionAmkrNameEn: el.arrivalDivisionAmkrNameEn,
                        arrivalDivisionAmkrNameRu: el.arrivalDivisionAmkrNameRu,
                        arrivalDuration: null,
                        arrivalIdCommercialCondition: null,
                        arrivalIdSertificationData: el.arrivalIdSertificationData,
                        arrivalIdleTime: null,
                        arrivalNomDoc: el.arrivalNomDoc,
                        arrivalNomMainDoc: el.arrivalNomMainDoc,
                        arrivalSertificationDataEn: el.arrivalSertificationDataEn,
                        arrivalSertificationDataRu: el.arrivalSertificationDataRu,
                        arrivalShipperCode: null,
                        arrivalShipperNameEn: null,
                        arrivalShipperNameRu: null,
                        arrivalStationAmkrAbbrEn: null,
                        arrivalStationAmkrAbbrRu: null,
                        arrivalStationAmkrNameEn: null,
                        arrivalStationAmkrNameRu: null,
                        arrivalStationFromCode: null,
                        arrivalStationFromNameEn: null,
                        arrivalStationFromNameRu: null,
                        arrivalUsageFee: null,
                        currentConditionAbbrEn: el.fromOperationConditionAbbrEn,
                        currentConditionAbbrRu: el.fromOperationConditionAbbrRu,
                        currentConditionNameEn: el.fromOperationConditionNameEn,
                        currentConditionNameRu: el.fromOperationConditionNameRu,
                        currentConditionRed: null,
                        currentIdLoadingStatus: el.fromOperationIdLoadingStatus,
                        currentIdOperation: el.fromIdOperation,
                        currentLoadingStatusEn: el.fromOperationLoadingStatusEn,
                        currentLoadingStatusRu: el.fromOperationLoadingStatusRu,
                        currentOperationEnd: el.fromOperationEnd,
                        currentOperationNameEn: el.fromOperationNameEn,
                        currentOperationNameRu: el.fromOperationNameRu,
                        currentOperationStart: el.fromOperationStart,
                        currentStationDuration: null,
                        currentStationIdleTime: null,
                        currentWagonBusy: el.fromBusy,
                        currentWayDuration: null,
                        diffVesg: null,
                        docOutgoingCar: el.docOutgoingCar,
                        idLimitingLoading: el.idLimitingLoading,
                        idOperator: el.idOperator,
                        idOwnerWagon: null,
                        instructionalLettersDatetime: null,
                        instructionalLettersNote: null,
                        instructionalLettersNum: null,
                        instructionalLettersStationCode: null,
                        instructionalLettersStationName: null,
                        limitingAbbrEn: el.limitingAbbrEn,
                        limitingAbbrRu: el.limitingAbbrRu,
                        limitingNameEn: el.limitingNameEn,
                        limitingNameRu: el.limitingNameRu,
                        num: el.num,
                        operatorAbbrEn: el.operatorAbbrEn,
                        operatorAbbrRu: el.operatorAbbrRu,
                        operatorColor: null,
                        operatorMonitoringIdleTime: null,
                        operatorPaid: null,
                        operatorRentEnd: null,
                        operatorRentStart: null,
                        operatorsEn: el.operatorsEn,
                        operatorsRu: el.operatorsRu,
                        outgoingDate: null,
                        outgoingIdReturn: null,
                        outgoingReturnCauseEn: null,
                        outgoingReturnCauseRu: null,
                        outgoingSostavStatus: null,
                        ownerWagonAbbrEn: null,
                        ownerWagonAbbrRu: null,
                        ownerWagonEn: null,
                        ownerWagonRu: null,
                        position: null,
                        sapIncomingSupplyCargoCode: null,
                        sapIncomingSupplyCargoName: null,
                        sapIncomingSupplyDate: null,
                        sapIncomingSupplyNum: null,
                        sapIncomingSupplyPos: null,
                        sapIncomingSupplyTime: null,
                        sapIncomingSupplyWarehouseCode: null,
                        sapIncomingSupplyWarehouseName: null,
                        wagonAdm: el.wagonAdm,
                        wagonAdmAbbrEn: el.wagonAdmAbbrEn,
                        wagonAdmAbbrRu: el.wagonAdmAbbrRu,
                        wagonAdmNameEn: el.wagonAdmNameEn,
                        wagonAdmNameRu: el.wagonAdmNameRu,
                        wagonBanUz: null,
                        wagonBruttoAmkr: null,
                        wagonBruttoDoc: null,
                        wagonClosedRoute: null,
                        wagonDateRemUz: null,
                        wagonGruzpDoc: null,
                        wagonGruzpUz: null,
                        wagonRod: el.wagonRod,
                        wagonRodAbbrEn: el.wagonRodAbbrEn,
                        wagonRodAbbrRu: el.wagonRodAbbrRu,
                        wagonRodNameEn: el.wagonRodNameEn,
                        wagonRodNameRu: el.wagonRodNameRu,
                        wagonTaraArcDoc: null,
                        wagonTaraDoc: null,
                        wagonTaraUz: null,
                        wagonTypeEn: null,
                        wagonTypeRu: null,
                        wagonVesgAmkr: null,
                        wagonVesgDoc: null,
                        wimId: el.fromIdWim,
                        wioId: 0,
                        wirId: el.idWir,
                    };
                    new_wagons.push(new_car_way);
                    position++;
                }.bind(this));
                wagons = wagons.concat(new_wagons);
            }
        };
        //wagons_add_async.call(this, wagons_add, 1, function (position) {
        //    //this.view_wagons(); // Обновить вагоны на пути приема
        //    //LockScreenOff();
        //}.bind(this));
        // ++this.wagons_sostav + голова хвост
        if (this.tacw_opr.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wim_arrival !== null;
            });
        }
        this.tacw_opr.view(wagons, null);
    };

    //! Показать составы отправленные со станции
    view_op_return_cars.prototype.view_sostavs_of_outer_ways = function () {
        // Очистить сообщения и форму
        this.form_from_setup.clear_all();
        // Показать составы на перегоне
        this.tsf_opr.view(this.sostav_all, this.num_sostav); // сработает событие выбора и отработает this.view_wagons_of_sostav
        if (this.num_sostav === null) {
            this.view_wagons_of_sostav();
        }
        //if (this.num_sostav !== null) {
        //    this.view_wagons_of_sostav_outer_ways(this.num_sostav, function () { LockScreenOff(); }.bind(this));
        //}
    };

    //! Показать вагоны выбранного состава без учета уже перенесенных в состав
    view_op_return_cars.prototype.view_wagons_of_sostav = function () {
        //var wagons = this.wagons_sostav.filter(function (i) {
        //    return i.return === null;
        //});
        var wagons = this.wagons_sostav;
        if (this.twf_opr.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.outerWayEnd === null;
            });
        }
        this.twf_opr.view(wagons, null);
    };
    // Показать вагоны состава на перегоне
    //view_op_return_cars.prototype.view_wagons_of_sostav_outer_ways = function (num_sostav, callback) {
    //    // Очистить сообщения и форму
    //    this.form_from_setup.clear_all();
    //    // если новый номер состава
    //    if (this.num_sostav !== num_sostav) {
    //        // Показать вагоны состава на перегоне
    //        // выполнить сброс 
    //        this.wagons_sostav = [];
    //        /*            this.wagons_add = [];*/
    //        this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
    //        this.reverse = false;
    //        if (num_sostav !== null && this.wagons_all != null && this.wagons_all.length > 0) {
    //            LockScreen(langView('vortc_mess_load_wagons', App.Langs));
    //            this.num_sostav = num_sostav;
    //            this.wagons_sostav = this.wagons_all.filter(function (i) {
    //                return $.trim(i.outerWayNumSostav) === $.trim(num_sostav);
    //            }.bind(this))
    //        }
    //    }
    //    if (typeof callback === 'function') {
    //        callback();
    //    }
    //};
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_return_cars.prototype.validation = function (result) {
        var valid = true;
        var wagons = this.wagons_sostav.filter(function (i) { return i.return !== null; }.bind(this));
        if (!result.new.input_checkbox_type_return) {
            // Проверим локомотивы
            var loc1 = this.form_on_setup.el.datalist_locomotive1.text();
            var loc2 = this.form_on_setup.el.datalist_locomotive2.text();
            var operation_end = get_max_element(wagons, 'currentOperationEnd');
            if (loc1 === loc2) {
                this.form_on_setup.set_element_validation_error('locomotive1', langView('vortc_mess_error_equal_locomotive', App.Langs), false);
                this.form_on_setup.set_element_validation_error('locomotive2', langView('vortc_mess_error_equal_locomotive', App.Langs), false);
                valid = false;
            } else {
                if (result.new && !result.new.datalist_locomotive1 && (loc1 !== null || loc1 !== '')) {
                    this.form_on_setup.set_element_validation_error('locomotive1', langView('vortc_mess_error_not_locomotive', App.Langs).format(loc1), false);
                    valid = false;
                }
                if ((loc2 !== null && loc2 !== '') && result.new && !result.new.datalist_locomotive2) {
                    this.form_on_setup.set_element_validation_error('locomotive2', langView('vortc_mess_error_not_locomotive', App.Langs).format(loc2), false);
                    valid = false;
                }
            }
            //valid = this.form_on_setup.validation_common_on.check_control_input_not_null($(el_loc1), langView('vortc_mess_error_required_locomotive', App.Langs), null, true);
            //if (valid) {
            //    if (loc1 === loc2) {
            //        this.form_on_setup.validation_common_on.set_object_error($(el_loc1), langView('vortc_mess_error_equal_locomotive', App.Langs));
            //        this.form_on_setup.validation_common_on.set_object_error($(el_loc2), langView('vortc_mess_error_equal_locomotive', App.Langs));
            //        valid = false;
            //    } else {
            //        if (result.new && !result.new.datalist_locomotive1 && (loc1 !== null || loc1 !== '')) {
            //            this.form_on_setup.validation_common_on.set_object_error($(el_loc1), langView('vortc_mess_error_not_locomotive', App.Langs).format(loc1));
            //            valid = false;
            //        }
            //        if ((loc2 !== null && loc2 !== '') && result.new && !result.new.datalist_locomotive2) {
            //            this.form_on_setup.validation_common_on.set_object_error($(el_loc2), langView('vortc_mess_error_not_locomotive', App.Langs).format(loc2));
            //            valid = false;
            //        }
            //    }
            //}
            //valid = valid & this.form_on_setup.validation_common_on.check_control_datetime_input($(el_dta), langView('vortc_mess_error_required_datetime', App.Langs), null, true);
            // Проверим время
            if (result.new && result.new.input_datetime_time_aplly) {
                var curr = moment();
                var aplly = moment(result.new.input_datetime_time_aplly);
                var old = moment(operation_end);

                var minutes = old.diff(aplly, 'minutes');
                if (minutes > 0) {
                    this.form_on_setup.set_element_validation_error('time_aplly', langView('vortc_mess_error_start_time_aplly', App.Langs).format(operation_end), false);
                    valid = false;
                }
                var minutes = aplly.diff(curr, 'minutes');
                if (minutes < App.wsd_setup.return_start_dt_min) {
                    this.form_on_setup.set_element_validation_error('time_aplly', langView('vortc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.return_start_dt_min * -1), false);
                    valid = false;
                }
                if (minutes > App.wsd_setup.return_start_dt_max) {
                    this.form_on_setup.set_element_validation_error('time_aplly', langView('vortc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.return_start_dt_max), false);
                    valid = false;
                }
            }
        } else {

        }
        // Проверим состав
        if (wagons === null || wagons.length === 0) {
            this.form_on_setup.validation_common_on.out_error_message(langView('vortc_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_op_return_cars.prototype.apply = function (data) {
        LockScreen(langView((type_return ? 'vortc_mess_run_operation_cancel' : 'vortc_mess_run_operation_return'), App.Langs));
        this.view_com.api_wsd.postReturnWagonsOfStationAMKR(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('vortc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[view_op_return_cars] [postReturnWagonsOfStationAMKR] :' + mess);
                this.form_on_setup.validation_common_on.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_on_setup.validation_common_on.out_error_message(err + ":" + result.errors[err]);
                        console.log('[view_op_return_cars] [postReturnWagonsOfStationAMKR] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                // ошибки выполнения нет проверим ответ запроса
                if (result && result.result > 0) {
                    this.form_on_setup.validation_common_on.clear_all();
                    // Сбросим установки (время и локомотивы)
                    this.form_on_setup.el.datalist_locomotive1.val('');
                    this.form_on_setup.el.datalist_locomotive2.val('');
                    this.form_on_setup.el.input_datetime_time_aplly.val(moment());
                    // Сбросим вагоны
                    this.num_sostav = null;
                    this.wagons_sostav = [];
                    this.wagons_add = [];
                    // Обновить таблицы. Запустим паралельно
                    var pr_us = 2;
                    var out_prus = function (pr_us) {
                        if (pr_us === 0) {
                            this.view_wagons();
                            this.form_on_setup.validation_common_on.out_info_message(langView('vortc_mess_ok_operation', App.Langs).format(result.moved));
                            if (typeof this.settings.fn_db_update === 'function') {
                                //TODO: можно добавить возвращать перечень для обновления
                                typeof this.settings.fn_db_update();
                            }
                            LockScreenOff();
                        }
                    }.bind(this);
                    // загрузим составы отправленные состанции (первый поток)
                    this.load_of_outer_ways(this.id_station,
                        function () {
                            pr_us--;
                            out_prus(pr_us);
                        }.bind(this)
                    );
                    // загрузим вагоны на пути (второй поток)
                    this.load_of_way(this.id_way,
                        function () {
                            pr_us--;
                            out_prus(pr_us);
                        }.bind(this)
                    );
                } else {
                    LockScreenOff();
                    this.form_on_setup.validation_common_on.out_error_message(langView('vortc_mess_error_operation_run', App.Langs).format(result.result));
                    // Выведем ошибки по вагонно.
                    $.each(result.listResult, function (i, el) {
                        if (el.result <= 0) this.form_on_setup.validation_common_on.out_error_message(langView('vortc_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                    }.bind(this));
                }
            }


        }.bind(this));
    };
    // Очистить сообщения
    view_op_return_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    view_op_return_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_return_cars = view_op_return_cars;

    window.App = App;

})(window);