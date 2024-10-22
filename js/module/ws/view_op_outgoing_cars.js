/* ===============================================
-= Модуль панель операции "ОТПРАВИТЬ СОСТАВЫ НА СТАНЦИЮ АМКР" =-
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
            'vopoc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ОТПРАВИТЬ СОСТАВ НА СТАНЦИИ АМКР"',
            'vopoc_card_header_on': 'ОТПРАВИТЬ НА СТАНЦИЮ',
            'vopoc_card_header_from': 'ОТПРАВИТЬ СО СТАНЦИИ',
            'vopoc_fieldset_on_table_title': 'Сформированный состав',
            'vopoc_title_label_station_on': 'Станция прибытия:',
            'vopoc_text_label_station_on': 'Выберите станцию прибытия состава...',

            'vopoc_title_label_station_from': 'Станция отправления:',
            'vopoc_text_label_station_from': 'Выберите станцию отправления состава...',
            'vopoc_title_label_way_from': 'Путь отправления:',
            'vopoc_text_label_way_from': 'Выберите путь отправления состава...',


            //'vopoc_title_placeholder_station_on': 'Станция прибытия:',

            'vopoc_title_label_outer_way': 'Внешний путь:',
            'vopoc_text_label_outer_way': 'Выберите путь примыкания',

            'vopoc_title_label_locomotive1': 'Локомотив №1:',
            'vopoc_title_label_locomotive2': 'Локомотив №2:',
            'vopoc_title_placeholder_locomotive': ' № локомотива',
            'vopoc_title_time_aplly': 'Время выполнения',
            'vopoc_text_time_aplly': 'Время выполнения операции ограниченно +(-)1день',
            'vopoc_title_placeholder_time_aplly': 'Время выполнения',

            'vopoc_title_fieldset_sostav_on': 'Прибывающие составы на выбранную станцию',
            'vopoc_title_fieldset_wagons_on': 'Сформированный состав',

            'vopoc_title_form_apply': 'Выполнить',
            'vopoc_title_form_apply_title': 'Выполнить операцию "ОТПРАВИТЬ СОСТАВ НА СТАНЦИЮ АМКР"',

            'vopoc_title_button_export': 'Экспорт',
            'vopoc_title_button_buffer': 'Буфер',
            'vopoc_title_button_excel': 'Excel',
            'vopoc_title_button_cancel': 'Отменить',
            'vopoc_title_button_return': 'Вернуть',
            'vopoc_title_button_head': 'Голова',
            'vopoc_title_button_tail': 'Хвост',

            'vopoc_title_add_ok': 'ВЫПОЛНИТЬ',

            'vopoc_mess_warning_not_num_sostav': 'Нет названия состава!',
            'vopoc_mess_warning_wagon_ban_operation': 'Вагон № {0} для операций заблокирован (вагон уже принят на станцию: [{1}])',
            'vopoc_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу который имеет статус :[{1}])',

            //'vopoc_mess_warning_wagon_existing_way': 'Вагон № {0} для операций заблокирован (вагон стоит на текущем пути!))',



            'vopoc_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'vopoc_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив № {0}',
            'vopoc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) = {0}',
            'vopoc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) = {0}',
            'vopoc_mess_error_not_wagons': 'Не выбраны вагоны для отправки (в окне «ОТПРАВИТЬ СО СТАНЦИИ», выберите станцию, путь и вагоны для отправки).',
            'vopoc_mess_error_operation_run': 'При выполнении операции «ОТПРАВИТЬ СОСТАВ НА СТАНЦИЮ АМКР» произошла ошибка, код ошибки: {0}',
            'vopoc_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',


            'vopoc_mess_cancel_operation': 'Операция "ОТПРАВИТЬ СОСТАВ НА СТАНЦИЮ АМКР" – отменена',
            'vopoc_mess_run_operation_outgoing': 'Выполняю операцию "ОТПРАВИТЬ СОСТАВ НА СТАНЦИЮ АМКР"',
            'vopoc_mess_not_select_way_on': 'Выберите путь c которого будет сформирован состав!',
            'vopoc_mess_ok_operation': 'Состав отправлен, в количестве {0} (ваг.)',

            'vopoc_mess_load_operation': 'Загружаю операции...',
            'vopoc_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vopoc_mess_load_sostav_outer_ways': 'Загружаю составы на подходах...',
            'vopoc_mess_update_operation': 'Обновляю операции...',
            'vopoc_mess_init_panel': 'Выполняю инициализацию модуля ...',
            'vopoc_mess_destroy_operation': 'Закрываю форму...',
            'vopoc_mess_create_sostav': 'Формирую состав, переношу вагоны...',
            'vopoc_mess_clear_sostav': 'Формирую состав, убираю выбранные вагоны...',
            'vopoc_mess_reverse_head_sostav': 'Формирую состав, реверс голова-хвост',
            'vopoc_mess_reverse_sostav': 'Формирую состав, реверс вагонов...',

            'vopoc_confirm_title': 'Внимание!',
            'vopoc_confirm_mess_new_sostav': 'Вы уверены что хотите изменить станцию отправления? Все выбранные и перенесённые вагоны в количестве {0} будут сброшены! ',
            'vopoc_confirm_mess_new_way': 'Вы уверены что хотите изменить путь отправления? Все выбранные и перенесённые вагоны в количестве {0} будут сброшены! ',
            'vopoc_confirm_mess_apply_outgoing_wagons': 'Выполнить операцию "ОТПРАВИТЬ СОСТАВ НА СТАНЦИЮ АМКР" {0} в количестве: {1} (ваг.), на станцию: {2}?',

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

    // ассинхроная функция (нумерации вагонов)
    var wagons_enumerate_async = function (row, field, position, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback(position);
            }
            return 0;
        }
        function EnumerateWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i][field] = position;
                    position++;
                    EnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback(position);
                } else return 0;
            }
        }
        EnumerateWagonsAsync.call(this, 0);
    }.bind(this);
    // ассинхроная функция (Реверса нумерации вагонов)
    var wagons_reverse_enumerate_async = function (row, field, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            };
            return 0;
        }
        row = row.sort(function (a, b) { return a[field] - b[field]; });
        function ReverseEnumerateWagonsAsync(i) {
            if (len > 0) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i][field] = len;
                    len--;
                    ReverseEnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        ReverseEnumerateWagonsAsync.call(this, 0);
    }.bind(this);
    // ассинхроная функция (Убрать вагоны)
    var wagons_del_async = function (row, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            };
            return 0;
        }
        function DelWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    var wagon = this.wagons.find(
                        function (o) { return o.wirId === row[i].wirId });
                    if (wagon !== null) {
                        wagon.position_new = null;
                    }
                    DelWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        DelWagonsAsync.call(this, 0);
    };
    // ассинхроная функция (Добавить вагоны в состав отправки)
    var wagons_add_async = function (row, position, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            };
            return 0;
        }
        function AddWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    var wagon = this.wagons.find(
                        function (o) { return o.wirId === row[i].wirId });
                    if (wagon !== null) {
                        wagon.position_new = position;
                        position++;
                    }
                    AddWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        AddWagonsAsync.call(this, 0);
    };

    function view_op_outgoing_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_outgoing_cars.prototype.init = function (options) {
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
        this.id_station_on = -1;        // Значения по умолчанию
        this.id_way_on = -1;            // Значения по умолчанию
        this.id_station_from = -1;      // Значения по умолчанию
        this.id_outer_way = -1;         // id перегона
        this.num_sostav = null;         // Номер выбранного состава

        /*        this.id_station = -1;       // По умолчанию не выбрана*/
        /*        this.id_way = -1;           // По умолчанию не выбрана*/
        this.stations = [];         // Список станций (полный)
        this.list_station = [];     // Список станций всех (value\text\desabled)
        this.list_station_on = [];  // Список станций прибытий (value\text\desabled)
        /*        this.was = [];              // Список путей (полный)*/
        //this.list_way = [];         // Список путей (value\text\desabled)
        this.locomotives = [];      // Список локомотивов (полный)
        this.list_locomotive = [];  // Список локомотивов (value\text\desabled)
        this.outer_ways = [];       // Список внешних путей (полный)
        this.list_outer_ways = [];  // Список внешних путей  (value\text\desabled)

        this.station_from = null; // Станция отправления

        //this.head = false;          // Признак голова(true)\хвост(false), по умолчанию хвост
        //this.reverse = false;
        this.wagons = [];           // Список вагонов на пути приема (рабочий)
        //this.wagons_add = [];       // Список вагонов которые нужно перенести на путь (рабочий)

        //this.wagons_sostav = [];    // Список вагонов выбранного состава нп пути прибытия (рабочий)
        this.wagons_all = [];       // Список всех вагонов всех составов (используем для выборки вагонов по составу)
        this.sostav_all = [];       // Список всех составов (получаем из Списока всех вагонов всех составов this.wagons_all)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vopoc_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();
        // Сообщение
        LockScreen(langView('vopoc_mess_init_panel', App.Langs));
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
            header_text: langView('vopoc_card_header_on', App.Langs),
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
            header_text: langView('vopoc_card_header_from', App.Langs),
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
                        console.log('Close view_op_outgoing_cars');
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
                    text: langView('vopoc_title_form_apply', App.Langs),
                    title: langView('vopoc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_on_setup.$form.submit();
                    }.bind(this),
                }
            };
            var form_select_station_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common',
                    id: 'id_station',
                    name: 'id_station',
                    label: langView('vopoc_title_label_station_on', App.Langs),
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
                        default: this.id_station_from,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            this.update_from_station_outer_ways_of_on_station(this.id_station_on, id, null, null, function () {
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
                    form_text: langView('vopoc_text_label_station_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_outer_way = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common',
                    id: 'id_outer_way',
                    name: 'id_outer_way',
                    label: langView('vopoc_title_label_outer_way', App.Langs),
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
                        default: this.id_outer_way,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            this.update_from_station_outer_ways_of_on_station(this.id_station_on, this.id_station_from, id, null, function () {
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
                    form_text: langView('vopoc_text_label_outer_way', App.Langs),
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
                    label: langView('vopoc_title_label_locomotive1', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopoc_title_placeholder_locomotive', App.Langs),
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
                    label: langView('vopoc_title_label_locomotive2', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopoc_title_placeholder_locomotive', App.Langs),
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
                    validation_group: 'common',
                    id: 'time_aplly',
                    name: 'time_aplly',
                    label: langView('vopoc_title_time_aplly', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopoc_title_placeholder_time_aplly', App.Langs),
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
                    form_text: langView('vopoc_text_time_aplly', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            col_bt_apply.childs.push(bt_bt_apply);
            objs_on_setup.push(col_bt_apply);
            objs_on_setup.push(form_select_station_on);
            objs_on_setup.push(form_select_outer_way);
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
                        if (valid) {
                            var wagons = this.wagons.filter(function (i) { return i.position_new !== null; });// получить вагоны
                            this.view_com.mcf.open(
                                langView('vopoc_title_form_apply', App.Langs),
                                langView('vopoc_confirm_mess_apply_outgoing_wagons', App.Langs).format(this.form_from_setup.el.select_id_station.text(), (wagons ? wagons.length : 0), this.form_on_setup.el.select_id_station.text()),
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
                                            id_way_from: this.id_way_on,
                                            wagons: list_wagons,
                                            id_outer_way: this.id_outer_way,
                                            lead_time: result.new.input_datetime_time_aplly._i,
                                            locomotive1: result.new.datalist_locomotive1,
                                            locomotive2: result.new.datalist_locomotive2,
                                        };
                                        this.apply(operation);
                                    }
                                }.bind(this),
                                function () {
                                    this.form_on_setup.validation_common.out_warning_message(langView('vopoc_mess_cancel_operation', App.Langs));
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
                    //console.log('[view_op_outgoing_cars] [form_on_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var fieldset_sostav_on = new this.view_com.fe_ui.fieldset({ legend: langView('vopoc_title_fieldset_sostav_on', App.Langs) });
            var fieldset_wagons_on = new this.view_com.fe_ui.fieldset({ legend: langView('vopoc_title_fieldset_wagons_on', App.Langs) });

            var row_sostav_on = new this.view_com.fe_ui.bs_row({ id: 'op-oc-sostav-outer-ways', class: 'pt-2' });
            var row_wagons_on = new this.view_com.fe_ui.bs_row({ id: 'op-oc-wagons-new-sostav-outer-way', class: 'pt-2' });

            this.on_table.$html.append(fieldset_sostav_on.$html.append(row_sostav_on.$html)).append(fieldset_wagons_on.$html.append(row_wagons_on.$html));
            this.tsow_opoc = new TWS('div#op-oc-sostav-outer-ways');
            this.tsow_opoc.init({
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-striped table-sostav-outer-ways table-bordered border-secondary',
                detali_table: false,
                type_report: 'sostav_outer_ways',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_outgoing_cars] [tsow_opoc] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                }.bind(this),
                fn_select_rows: function (rows, type) {
                    //TODO: Пока оставил при выборе состава определяем номер состава\станцию отправления и id внешнего пути
                    if (type === "select") {
                        // Неиспользую
                        //var num_sostav = null;
                        //this.station_from = null;
                        //this.id_outer_way = null;   // id перегона
                        //if (rows != null && rows.length > 0) {
                        //    num_sostav = rows[0].outerWayNumSostav;
                        //    this.station_from = rows[0]['fromStationAbbr' + ucFirst(App.Lang)]; // Станция отправления
                        //    this.id_outer_way = rows[0].idOuterWay;   // id перегона
                        //}
                    }
                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
            });

            this.twnsow_opoc = new TWS('div#op-oc-wagons-new-sostav-outer-way');
            this.twnsow_opoc.init({
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'wagons_new_sostav_outer_way',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            this.twnsow_opoc.tab_com.obj_t_report.rows().select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'del_wagons_sostav',
                        action: function (e, dt, node, config) {
                            this.twnsow_opoc.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        name: 'reverse',
                        action: function (e, dt, node, config) {
                            this.twnsow_opoc.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_outgoing_cars] [twnsow_opoc] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.on_alert.clear_message();
                    //if (rowData && rowData.length > 0) {
                    //    e.preventDefault();
                    //    this.on_alert.out_warning_message(langView('vopac_mess_warning_wagon_existing_way', App.Langs).format(rowData[0].num));
                    //}
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'del_wagons_sostav') {
                        LockScreen(langView('vopoc_mess_clear_sostav', App.Langs));
                        var base = this;
                        var rows = this.twnsow_opoc.tab_com.get_select_row();
                        // Убрать вагоны
                        wagons_del_async.call(this, rows, function () {
                            // Авто нумерация
                            wagons_enumerate_async(base.wagons.filter(function (i) { return i.position_new !== null; }), 'position_new', 1, function () {
                                this.view_wagons(); // Обновить вагоны на пути приема
                                LockScreenOff();
                            }.bind(base));
                        });
                    }
                    if (name === 'reverse') {
                        LockScreen(langView('vopoc_mess_reverse_sostav', App.Langs));
                        wagons_reverse_enumerate_async(this.wagons.filter(function (i) { return i.position_new !== null; }), 'position_new', function () {
                            this.view_wagons(); // Обновить вагоны на пути приема
                            LockScreenOff();
                        }.bind(this));

                        //this.reverse = !this.reverse;
                        //wagons_reverse_enumerate_async.call(this, function () {
                        //    this.view_wagons(); // Обновить вагоны на пути приема
                        //    LockScreenOff();
                        //}.bind(this));
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
            var form_select_station_from = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_from',
                    id: 'id_station',
                    name: 'id_station',
                    label: langView('vopoc_title_label_station_from', App.Langs),
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
                        default: this.id_station_on,
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
                    form_text: langView('vopoc_text_label_station_from', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_way_from = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_from',
                    id: 'id_way',
                    name: 'id_way',
                    label: langView('vopoc_title_label_way_from', App.Langs),
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
                        default: this.id_way_on,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            this.update(this.id_station_on, id, function () {
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
                    form_text: langView('vopoc_text_label_way_from', App.Langs),
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
                    this.from_setup.$html.append(this.form_from_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_outgoing_cars] [form_from_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_out_cars_way = new this.view_com.fe_ui.bs_row({ id: 'op-oc-outgoing-cars-way', class: 'pt-2' });
            this.from_table.$html.append(row_out_cars_way.$html);

            this.tocw_opoc = new TWS('div#op-oc-outgoing-cars-way');
            this.tocw_opoc.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'outgoing_cars_way',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            this.tocw_opoc.tab_com.obj_t_report.rows().select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'add_sostav',
                        action: function (e, dt, node, config) {
                            this.tocw_opoc.tab_com.button_action(config.button, e, dt, node, config);
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
                    if (rowData && rowData.length > 0 && rowData[0].outgoingSostavStatus > 0) {
                        e.preventDefault();
                        this.from_alert.out_warning_message(langView('vopoc_mess_warning_wagon_ban_status', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus));
                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'add_sostav') {
                        if (this.id_way_on >= 0) {
                            LockScreen(langView('vopoc_mess_create_sostav', App.Langs));
                            // Выполнить операцию добавить вагоны
                            var wagon_max_position = this.wagons.reduce(function (prev, current, index, array) { return prev.position_new > current.position_new ? prev : current });
                            var position_start = wagon_max_position && wagon_max_position.position_new !== null ? wagon_max_position.position_new + 1 : 1;


                            var rows = this.tocw_opoc.tab_com.get_select_row();
                            //if (rows && rows.length > 0) {
                            //    this.wagons_add = this.wagons_add.concat(rows);
                            //};
                            wagons_add_async.call(this, rows, position_start, function (position) {
                                this.view_wagons(); // Обновить вагоны на пути приема
                                LockScreenOff();
                            }.bind(this));
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
    view_op_outgoing_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vopoc_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        // Сбросим установки (время и локомотивы)
        this.form_on_setup.el.datalist_locomotive1.val('');
        this.form_on_setup.el.datalist_locomotive2.val('');
        this.form_on_setup.el.input_datetime_time_aplly.val(moment());
        //this.wagons_add = []; 
        this.form_from_setup.clear_all();
        this.wagons = [];
        // Сбросим вагоны переноса
        this.id_station_on = -1;
        var id_station_on = -1;
        this.id_way_on = -1;
        this.id_station_from = -1;
        this.id_outer_way = -1;
        this.num_sostav = null;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station_on = way.idStation;
                // Отобразим выбор на панеле
                this.form_from_setup.el.select_id_station.val(id_station_on);
            }
        };
        this.update(id_station_on, id_way, function () {
            LockScreenOff();
        }.bind(this));
    };
    // Обновить 
    view_op_outgoing_cars.prototype.update = function (id_station_on, id_way_on, callback) {
        var pr_1 = 2;
        var out_pr1 = function (pr_1) {
            if (pr_1 === 0) {
                this.view_wagons();
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }
        }.bind(this);
        // Обновим пути по станции
        this.update_from_station_on(id_station_on, id_way_on, function () {
            pr_1--;
            out_pr1(pr_1);
        }.bind(this));
        // Обновим станцию прибытия и внешний путь и составы на пути
        this.update_from_station_outer_ways_of_on_station(id_station_on, this.id_station_from, this.id_outer_way, this.num_sostav, function () {
            pr_1--;
            out_pr1(pr_1);
        }.bind(this));
    };
    // Проверка и подтверждение изменений по станции отправки
    view_op_outgoing_cars.prototype.confirm_update_station_on = function (id_station_on, callback_ok, callback_cancel) {
        if (this.id_station_on !== id_station_on) {
            var wagons_add = this.wagons.filter(function (i) {
                return i.position_new !== null;
            });
            if (wagons_add && wagons_add.length > 0) {
                this.view_com.mcf.open(
                    langView('vopoc_confirm_title', App.Langs),
                    langView('vopoc_confirm_mess_new_sostav', App.Langs).format(wagons_add.length),
                    function () {
                        if (typeof callback_ok === 'function') {
                            callback_ok();
                        }
                    }.bind(this),
                    function () {
                        this.form_from_setup.el.select_id_station.val(this.id_station_on);
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
    // Проверка и подтверждение изменений по пути отправки
    view_op_outgoing_cars.prototype.confirm_update_way_on = function (id_way_on, callback_ok, callback_cancel) {
        if (this.id_way_on !== id_way_on) {
            var wagons_add = this.wagons.filter(function (i) {
                return i.position_new !== null;
            });
            if (wagons_add && wagons_add.length > 0) {
                this.view_com.mcf.open(
                    langView('vopoc_confirm_title', App.Langs),
                    langView('vopoc_confirm_mess_new_way', App.Langs).format(wagons_add.length),
                    function () {
                        if (typeof callback_ok === 'function') {
                            callback_ok();
                        }
                    }.bind(this),
                    function () {
                        this.form_from_setup.el.select_id_way.val(this.id_way_on);
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
    // Обновим пути по выбранной станции
    view_op_outgoing_cars.prototype.update_from_station_on = function (id_station_on, id_way_on, callback) {
        this.confirm_update_station_on(
            id_station_on,
            function () { // Ok
                // обновим компонент пути отправки
                this.form_from_setup.el.select_id_way.update(this.view_com.api_dir.getListValueTextWaysOfStation(id_station_on), id_way_on);
                // сбросим вагоны на пути
                this.wagons = [];
                // Обновим станции приема и внешние пути
                this.list_station_on = this.get_list_station_on(id_station_on);
                this.id_station_from = -1;
                // Обновим элемент станции приема
                this.form_on_setup.el.select_id_station.update(this.list_station_on, this.id_station_from);
                // Обновим элемент внешних путей
                this.list_outer_ways = []
                this.id_outer_way = -1;
                // обновим компонент списка внешних путей
                this.form_on_setup.el.select_id_outer_way.update(this.list_outer_ways, this.id_outer_way);
                // обновим составы и вагоны на внешнем пути
                this.sostav_all = [];
                this.wagons_all = [];
                // обновим путь отправки
                this.update_from_way_on(id_way_on, function () {
                    this.id_station_on = id_station_on;
                    if (typeof callback === 'function') {
                        callback();
                    }
                }.bind(this));
            }.bind(this),
            function () { // Cancel
                // обновим компонент пути
                this.update_from_way_on(id_way_on, function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }.bind(this));
            }.bind(this)
        );
    };
    // Обновим пути по выбраному пути
    view_op_outgoing_cars.prototype.update_from_way_on = function (id_way_on, callback) {
        this.confirm_update_way_on(id_way_on,
            function () { // Ok
                // Обновим путь
                this.load_of_way(id_way_on, function () {
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
    };
    // Обновим станции приема и внешние пути по выбранной станции
    view_op_outgoing_cars.prototype.update_from_station_outer_ways_of_on_station = function (id_station_on, id_station_from, id_outer_way, num_sostav, callback) {
        var id_station_from = id_station_from ? id_station_from : -1;
        var id_outer_way = id_outer_way ? id_outer_way : -1;
        // Обновим элемент станции приема
        if (this.id_station_from !== id_station_from) {
            // Обновим компоненты внешние пути
            this.list_outer_ways = this.get_list_outer_ways(id_station_on, id_station_from);
            this.id_outer_way = -1; // сбросим выбранный путь
            // обновим компонент списка внешних путей
            this.form_on_setup.el.select_id_outer_way.update(this.list_outer_ways, this.id_outer_way);
            // Загрузим составы на внешних путях отправленные 
            this.load_sostav_of_outer_ways(id_station_from, function (sostavs, wagons) {
                this.id_station_from = id_station_from; // сохраним выбранный состав
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        } else {
            this.id_outer_way = id_outer_way;
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback();
            }
        }
    }
    // Получить список станций прибытия
    view_op_outgoing_cars.prototype.get_list_station_on = function (id_station_from) {
        // Обновим станции прибытия
        var list_station_on = [];
        // получим внешние пути пренадлежащие выбранной станции
        var list_outer_ways = this.outer_ways.filter(function (i) {
            return i.idStationFrom == id_station_from && !i.wayDelete;
        }.bind(this));
        // Получим уникальные станции прибытия
        if (list_outer_ways && list_outer_ways.length > 0) {
            // Поиск уникальных станций
            $.each(list_outer_ways, function (i, el) {
                var st_on = list_station_on.find(function (o) {
                    return o.value === el.idStationOn;
                }.bind(this))
                if (!st_on) {
                    var st = this.list_station.find(function (o) { return o.value === el.idStationOn }.bind(this));
                    if (st) list_station_on.push(st);
                }
            }.bind(this));
        }
        return list_station_on ? list_station_on.sort(function (a, b) { return a.value - b.value; }) : list_station_on;
    }
    // Получить список внешних путей
    view_op_outgoing_cars.prototype.get_list_outer_ways = function (id_station_from, id_station_on) {
        var list = [];
        var list_outer_ways = this.outer_ways.filter(function (i) {
            return i.idStationFrom == id_station_from && i.idStationOn == id_station_on && !i.wayDelete;
        }.bind(this));
        $.each(list_outer_ways, function (i, el) {
            list.push({ value: el.id, text: el['nameOuterWay' + ucFirst(App.Lang)], desabled: false });
        }.bind(this));
        return list;
    }
    // Загрузить вагоны на выбраном пути отправки в масив this.wagons (подготовить поля для вагонов отправки)
    view_op_outgoing_cars.prototype.load_of_way = function (id_way_on, callback) {
        if (id_way_on !== null && id_way_on >= 0) {
            if (this.id_way_on !== id_way_on) {
                this.update_of_way(id_way_on, function (wagons) {
                    if (typeof callback === 'function') {
                        callback(wagons);
                    }
                }.bind(this));
                //this.id_way_on = id_way_on;
                //LockScreen(langView('vopoc_mess_load_wagons', App.Langs));
                //this.view_com.api_wsd.getViewWagonsOfIdWay(id_way_on, function (wagons) {
                //    // модифицировать данные взависимости от отчета
                //    if (wagons) {
                //        $.each(wagons, function (i, el) {
                //            el['position_new'] = null;
                //        });
                //    }
                //    this.wagons = wagons;
                //    // Событие обновили данные
                //    if (typeof callback === 'function') {
                //        callback(this.wagons);
                //    }
                //}.bind(this));
            } else {
                // Событие данные ненужно обновлять
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }
        } else {
            this.id_way_on = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };

    view_op_outgoing_cars.prototype.update_of_way = function (id_way_on, callback) {
        this.id_way_on = id_way_on;
        LockScreen(langView('vopoc_mess_load_wagons', App.Langs));
        this.view_com.api_wsd.getViewWagonsOfIdWay(id_way_on, function (wagons) {
            // модифицировать данные взависимости от отчета
            if (wagons) {
                $.each(wagons, function (i, el) {
                    el['position_new'] = null;
                });
            }
            this.wagons = wagons;
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }.bind(this));
    };
    // Загрузить составы и вагоны на пути отправки прибывающие на станцию
    view_op_outgoing_cars.prototype.load_sostav_of_outer_ways = function (id_station_on, callback) {
        this.sostav_all = [];
        this.wagons_all = [];
        // обновим состав
        if (id_station_on !== null && id_station_on >= 0) {
            LockScreen(langView('vopoc_mess_load_sostav_outer_ways', App.Langs));
            this.view_com.api_wsd.getViewOpenWagonsOfOuterWaysStationOn(id_station_on, function (wagons) {
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
                            banSostav: false,
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
    // Показать все (сотавы, вагоны)
    view_op_outgoing_cars.prototype.view_wagons = function () {
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать составы на перегонах
        this.view_sostav_outer_ways();
        // Показать вагоны на пути отправки и пути сборки состава
        this.view_wagons_of_way();
    };
    // Показать состав с учетом выбранного внешнего пути
    view_op_outgoing_cars.prototype.view_sostav_outer_ways = function () {
        $.each(this.sostav_all, function (key, el) {
            if (this.id_outer_way === -1 || el.idOuterWay === this.id_outer_way) {
                el.banSostav = false;
            } else {
                el.banSostav = true;
            }
        }.bind(this));
        this.tsow_opoc.view(this.sostav_all, null);
    };
    // Отобразить вагоны на пути отправки
    view_op_outgoing_cars.prototype.view_wagons_of_way = function () {
        // Показать вагоны на пути отправки
        var wagons_from = this.wagons.filter(function (i) {
            return i.position_new === null;
        });
        this.tocw_opoc.view(wagons_from, null);

        // Показать вагоны сформированного состава
        var wagons_on = this.wagons.filter(function (i) {
            return i.position_new !== null;
        });
        this.twnsow_opoc.view(wagons_on, null);
    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_outgoing_cars.prototype.validation = function (result) {
        var valid = true;
        // Проверим локомотивы
        var loc1 = this.form_on_setup.el.datalist_locomotive1.text();
        var loc2 = this.form_on_setup.el.datalist_locomotive2.text();
        var el_loc1 = this.form_on_setup.el.datalist_locomotive1.$element;
        var el_loc2 = this.form_on_setup.el.datalist_locomotive2.$element;
        var el_dta = this.form_on_setup.el.input_datetime_time_aplly.$element;
        if (loc1 === loc2) {
            this.form_on_setup.validation_common.set_object_error($(el_loc1), langView('vopoc_mess_error_equal_locomotive', App.Langs));
            this.form_on_setup.validation_common.set_object_error($(el_loc2), langView('vopoc_mess_error_equal_locomotive', App.Langs));
            valid = false;
        } else {
            if (result.new && !result.new.datalist_locomotive1 && (loc1 !== null || loc1 !== '')) {
                this.form_on_setup.validation_common.set_object_error($(el_loc1), langView('vopoc_mess_error_not_locomotive', App.Langs).format(loc1));
                valid = false;
            }
            if ((loc2 !== null && loc2 !== '') && result.new && !result.new.datalist_locomotive2) {
                this.form_on_setup.validation_common.set_object_error($(el_loc2), langView('vopoc_mess_error_not_locomotive', App.Langs).format(loc2));
                valid = false;
            }
        }
        // Проверим время
        if (result.new && result.new.input_datetime_time_aplly) {
            var curr = moment();
            var aplly = moment(result.new.input_datetime_time_aplly);
            var minutes = aplly.diff(curr, 'minutes');
            if (minutes < min_dt_apply) {
                this.form_on_setup.validation_common.set_object_error($(el_dta), langView('vopoc_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                valid = false;
            }
            if (minutes > max_dt_apply) {
                this.form_on_setup.validation_common.set_object_error($(el_dta), langView('vopoc_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                valid = false;
            }
        }
        // Проверим состав
        var wagons = this.wagons.filter(function (i) {
            return i.position_new !== null;
        });
        if (wagons === null || wagons.length === 0) {
            this.form_on_setup.validation_common.out_error_message(langView('vopoc_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_op_outgoing_cars.prototype.apply = function (data) {
        LockScreen(langView('vopoc_mess_run_operation_outgoing', App.Langs));
        this.view_com.api_wsd.postOutgoingWagonsOfStationAMKR(data, function (result) {
            if (result && result.result > 0) {
                this.form_on_setup.validation_common.clear_all();
                // Сбросим установки (время и локомотивы)
                this.form_on_setup.el.datalist_locomotive1.val('');
                this.form_on_setup.el.datalist_locomotive2.val('');
                this.form_on_setup.el.input_datetime_time_aplly.val(moment());
                // Сбросим вагоны переноса
                this.wagons = [];

                var pr_2 = 2;
                var out_pr2 = function (pr_2) {
                    if (pr_2 === 0) {
                        this.view_wagons();
                        this.form_on_setup.validation_common.out_info_message(langView('vopoc_mess_ok_operation', App.Langs).format(result.moved));
                        if (typeof this.settings.fn_db_update === 'function') {
                            //TODO: можно добавить возвращать перечень для обновления
                            typeof this.settings.fn_db_update();
                        }
                        LockScreenOff();
                    }
                }.bind(this);
                // обновить таблицы вагоны на пути приема, составы, вагоны выбранного состава
                var id_way_on = this.id_way_on;
                this.id_way_on = -1;
                this.update_of_way(id_way_on, function () {
                    pr_2--;
                    out_pr2(pr_2);
                }.bind(this));

                this.load_sostav_of_outer_ways(this.id_station_from, function (sostavs, wagons) {
                    pr_2--;
                    out_pr2(pr_2);
                }.bind(this));
            } else {
                LockScreenOff();
                this.form_on_setup.validation_common.out_error_message(langView('vopoc_mess_error_operation_run', App.Langs).format(result.result));
                // Выведем ошибки по вагонно.
                $.each(result.listResult, function (i, el) {
                    if (el.result <= 0) this.form_on_setup.validation_common.out_error_message(langView('vopoc_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                }.bind(this));
            }
        }.bind(this));
    };
    // Очистить сообщения
    view_op_outgoing_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    view_op_outgoing_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_outgoing_cars = view_op_outgoing_cars;

    window.App = App;

})(window);
