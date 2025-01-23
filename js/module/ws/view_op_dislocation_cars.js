/* ===============================================
-= Модуль панель операции "ДИСЛОКАЦИЯ ВАГОНОВ" =-
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
            'vodlc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ"',
            'vodlc_card_header_on': 'ДИСЛОКАЦИЯ НА СТАНЦИИ',
            'vodlc_card_header_from': 'ВАГОНЫ НА ПУТИ',
            //'vodlc_fieldset_on_table_title': 'Сформированный состав',
            //'vodlc_title_label_station_on': 'Станция прибытия:',

            'vodlc_title_label_way_on': 'Путь дислокации:',
            'vodlc_text_label_way_on': 'Выберите путь дислокации...',


            'vodlc_title_label_station': 'Станция дислокации:',
            'vodlc_text_label_station': 'Выберите станцию дислокации...',
            'vodlc_title_label_way_from': 'Путь отправления:',
            'vodlc_text_label_way_from': 'Выберите путь начала дислокации...',



            'vodlc_title_label_locomotive1': 'Локомотив №1:',
            'vodlc_title_label_locomotive2': 'Локомотив №2:',
            'vodlc_title_placeholder_locomotive': ' № локомотива',
            'vodlc_title_time_aplly': 'Время выполнения',
            'vodlc_text_time_aplly': 'Время выполнения операции ограниченно +(-)1день',
            'vodlc_title_placeholder_time_aplly': 'Время выполнения',

            'vodlc_title_form_apply': 'Выполнить',
            'vodlc_title_form_apply_title': 'Выполнить операцию "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ"',

            'vodlc_title_button_export': 'Экспорт',
            'vodlc_title_button_buffer': 'Буфер',
            'vodlc_title_button_excel': 'Excel',
            'vodlc_title_button_cancel': 'Отменить',
            'vodlc_title_button_return': 'Вернуть',
            'vodlc_title_button_head': 'Голова',
            'vodlc_title_button_tail': 'Хвост',

            'vodlc_title_add_ok': 'ВЫПОЛНИТЬ',

            //'vodlc_mess_warning_not_num_sostav': 'Нет названия состава!',
            'vodlc_mess_warning_wagon_ban_disl_on_way': 'Вагон № {0} для операций заблокирован (вагон стоит на пути приема)',
            'vodlc_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу который имеет статус :[{1}])',
            'voprc_mess_warning_wagon_ban_disl_way': 'Вагон № {0} для операций заблокирован (вагон уже выбран для дислокации)',
            'voprc_mess_warning_wagon_ban_move_busy': 'Вагон № {0} для перемещения заблокирован (вагон принадлежит составу со статусом :[{1}] или вагон пренадлежит подаче :[{2}] по которой не открыта или незакрыта операция :[{3}])',

            'vodlc_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'vodlc_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив № {0}',
            'vodlc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) = {0}',
            'vodlc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) = {0}',
            'vodlc_mess_error_not_wagons': 'Не выбраны вагоны для дислокации (в окне «ВАГОНЫ НА ПУТИ», выберите станцию, путь и вагоны для дислокации).',
            'vodlc_mess_error_operation_run': 'При выполнении операции «ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ» произошла ошибка, код ошибки: {0}',
            'vodlc_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            'vodlc_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',

            'vodlc_mess_cancel_operation': 'Операция "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ" – отменена',
            'vodlc_mess_run_operation_dislocation': 'Выполняю операцию "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ"',
            'vodlc_mess_not_select_wagon_from': 'Выберите вагоны для формирования дислокации!',
            'vodlc_mess_not_select_way_from': 'Выберите путь начала дислокации!',
            'vodlc_mess_not_select_way_on': 'Выберите путь дислокации вагонов!',
            'vodlc_mess_ok_operation': 'Дислокация выполнена, перенесено {0} (ваг.)',

            'vodlc_mess_load_operation': 'Загружаю операции...',
            'vodlc_mess_load_wagons': 'Загружаю вагоны на пути...',
            //'vodlc_mess_load_sostav_outer_ways': 'Загружаю составы на подходах...',
            //'vodlc_mess_update_operation': 'Обновляю операции...',
            'vodlc_mess_init_panel': 'Выполняю инициализацию модуля ...',
            //'vodlc_mess_destroy_operation': 'Закрываю форму...',
            'vodlc_mess_create_sostav': 'Формирую маршрут дислокации, переношу вагоны...',
            'vodlc_mess_clear_sostav': 'Формирую маршрут дислокации, убираю выбранные вагоны...',
            'vodlc_mess_head_sostav': 'Формирую порядок дислокации голова-хвост',
            'vodlc_mess_reverse_sostav': 'Формирую порядок дислокации, реверс вагонов...',

            'vodlc_confirm_title': 'Внимание!',
            //'vodlc_confirm_mess_new_sostav': 'Вы уверены что хотите изменить станцию отправления? Все выбранные и перенесённые вагоны в количестве {0} будут сброшены! ',
            //'vodlc_confirm_mess_new_way': 'Вы уверены что хотите изменить путь отправления? Все выбранные и перенесённые вагоны в количестве {0} будут сброшены! ',
            'vodlc_confirm_mess_apply_outgoing_wagons': 'Выполнить операцию "ДИСЛОКАЦИЯ ВАГОНОВ НА СТАНЦИИ" {0} в количестве: {1} (ваг.), переместить вагоны с пути {2} на путь {3}?',

            'vodlc_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию {0}? Все дислацированные вагоны в количестве {1} будут сброшены! ',
            'vodlc_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь дислокации {0}? Все дислацированные вагоны в количестве {1} будут сброшены! ',

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
    function view_op_dislocation_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_dislocation_cars.prototype.init = function (options) {
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
        this.id_way_on = -1;            // Значения по умолчанию
        this.id_station_from = -1;      // Значения по умолчанию
        this.id_way_from = -1;          // Значения по умолчанию

        this.stations = [];             // Список станций (полный)
        this.list_station = [];         // Список станций всех (value\text\desabled)
        this.list_way = [];             // Список путей (value\text\desabled)

        this.ways = [];                 // Список путей (полный)
        this.locomotives = [];          // Список локомотивов (полный)
        this.list_locomotive = [];      // Список локомотивов (value\text\desabled)

        this.head = false;              // Признак голова(true)\хвост(false), по умолчанию хвост
        this.reverse = false;

        this.wagons = [];               // Список вагонов на пути отправки (рабочий)
        this.wagons_on = [];            // Список вагонов на пути приема (рабочий)
        //this.wagons_add = [];         // Список вагонов которые нужно перенести на путь (рабочий)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vodlc_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();
        // Сообщение
        LockScreen(langView('vodlc_mess_init_panel', App.Langs));
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
            header_text: langView('vodlc_card_header_on', App.Langs),
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
            header_text: langView('vodlc_card_header_from', App.Langs),
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
            var process = 4;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    //----------------------------------
                    if (typeof this.settings.fn_init === 'function') {
                        console.log('Close view_op_dislocation_cars');
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
                    text: langView('vodlc_title_form_apply', App.Langs),
                    title: langView('vodlc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_on_setup.$form.submit();
                    }.bind(this),
                }
            };
            var form_select_way_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common',
                    id: 'id_way_on',
                    name: 'id_way_on',
                    label: langView('vodlc_title_label_way_on', App.Langs),
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
                            this.load_of_way_on(id, function () {
                                this.view_wagons_on();
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
                    form_text: langView('vodlc_text_label_way_on', App.Langs),
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
                    label: langView('vodlc_title_label_locomotive1', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vodlc_title_placeholder_locomotive', App.Langs),
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
                    label: langView('vodlc_title_label_locomotive2', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vodlc_title_placeholder_locomotive', App.Langs),
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
                    label: langView('vodlc_title_time_aplly', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vodlc_title_placeholder_time_aplly', App.Langs),
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
                    form_text: langView('vodlc_text_time_aplly', App.Langs),
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
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        if (valid) {
                            var wagons = this.wagons.filter(function (i) { return i.id_wir_from !== null; });// получить вагоны
                            this.view_com.mcf.open(
                                langView('vodlc_title_form_apply', App.Langs),
                                langView('vodlc_confirm_mess_apply_outgoing_wagons', App.Langs).format(this.form_from_setup.el.select_id_station.text(), (wagons ? wagons.length : 0), this.form_from_setup.el.select_id_way_from.text(), this.form_on_setup.el.select_id_way_on.text()),
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
                                            id_way_from: this.id_way_from,
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
                                    this.form_on_setup.validation_common.out_warning_message(langView('vodlc_mess_cancel_operation', App.Langs));
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
                    //console.log('[view_op_dislocation_cars] [form_on_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_wagons_on = new this.view_com.fe_ui.bs_row({ id: 'op-odl-wagons-on', class: 'pt-2' });
            this.on_table.$html.append(row_wagons_on.$html);

            this.twon_opodl = new TWS('div#op-odl-wagons-on');
            this.twon_opodl.init({
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'arrival_cars_way',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.twon_opodl.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.wimId !== null;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'del_wagons_sostav',
                        action: function (e, dt, node, config) {
                            this.twon_opodl.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        name: 'head_tail',
                        action: function (e, dt, node, config) {
                            this.twon_opodl.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    },
                    {
                        name: 'reverse',
                        action: function (e, dt, node, config) {
                            this.twon_opodl.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                //setup_buttons: [
                //{
                //    name: 'select_all',
                //    action: function () {
                //        this.twon_opodl.tab_com.obj_t_report.rows().select();
                //    }.bind(this)
                //},
                //{ name: 'select_none', action: null },
                //{
                //    name: 'del_wagons_sostav',
                //    action: function (e, dt, node, config) {
                //        this.twon_opodl.tab_com.button_action(config.button, e, dt, node, config);
                //    }.bind(this),
                //    enabled: false
                //},
                //{
                //    name: 'reverse',
                //    action: function (e, dt, node, config) {
                //        this.twon_opodl.tab_com.button_action(config.button, e, dt, node, config);
                //    }.bind(this),
                //    enabled: false
                //}
                //],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_dislocation_cars] [twnsow_opoc] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.on_alert.clear_message();
                    if (rowData && rowData.length > 0) {
                        if (rowData[0].id_wir_from === null) {
                            e.preventDefault();
                            this.on_alert.out_warning_message(langView('vodlc_mess_warning_wagon_ban_disl_on_way', App.Langs).format(rowData[0].num));
                        }
                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'eye') {
                        this.view_wagons_on();
                        LockScreenOff();
                    }
                    if (name === 'del_wagons_sostav') {
                        LockScreen(langView('vodlc_mess_clear_sostav', App.Langs));
                        var rows = this.twon_opodl.tab_com.get_select_row();
                        // Убрать вагоны
                        $.each(rows, function (i, el) {
                            el['position_new'] = null;
                            el['id_wir_from'] = null;
                        }.bind(this));
                        this.view_wagons(); // Обновить вагоны на пути приема
                        LockScreenOff();
                    }
                    if (name === 'reverse') {
                        LockScreen(langView('vodlc_mess_reverse_sostav', App.Langs));
                        this.reverse = !this.reverse;
                        this.view_wagons_on();
                        LockScreenOff();
                    }
                    if (name === 'head_tail') {
                        LockScreen(langView('vodlc_mess_head_sostav', App.Langs));
                        this.head = !this.head;
                        this.view_wagons_on();
                        LockScreenOff();
                    }
                }.bind(this),
                fn_enable_button: function (tb) {
                    var bts = tb.obj_t_report.buttons([8]);
                    if (this.head) {
                        bts.text(langView('vodlc_title_button_head', App.Langs));
                    } else {
                        bts.text(langView('vodlc_title_button_tail', App.Langs));
                    }
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
                    label: langView('vodlc_title_label_station', App.Langs),
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
                    form_text: langView('vodlc_text_label_station', App.Langs),
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
                    label: langView('vodlc_title_label_way_from', App.Langs),
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
                            this.update(this.id_station, id, function () {
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
                    form_text: langView('vodlc_text_label_way_from', App.Langs),
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
                    //console.log('[view_op_dislocation_cars] [form_from_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_out_cars_way = new this.view_com.fe_ui.bs_row({ id: 'op-odl-wagons-from', class: 'pt-2' });
            this.from_table.$html.append(row_out_cars_way.$html);

            this.twfrom_opodl = new TWS('div#op-odl-wagons-from');
            this.twfrom_opodl.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'dislocation_cars_from',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.from_alert.clear_message();
                            this.form_from_setup.clear_all();
                            this.twfrom_opodl.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.position_new === null && !data.currentMoveBusy && !data.outgoingSostavStatus;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'add_sostav',
                        action: function (e, dt, node, config) {
                            this.twfrom_opodl.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_dislocation_cars] [tocw_opoc] process ' + process);
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
                            this.from_alert.out_warning_message(langView('vodlc_mess_warning_wagon_ban_status', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus));
                        }
                        if (rowData[0].id_wir_from !== null) {
                            e.preventDefault();
                            this.from_alert.out_warning_message(langView('voprc_mess_warning_wagon_ban_disl_way', App.Langs).format(rowData[0].num));
                        }
                        if (rowData[0].currentMoveBusy) {
                            e.preventDefault();
                            this.from_alert.out_warning_message(langView('voprc_mess_warning_wagon_ban_move_busy', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus, rowData[0].idFiling, rowData[0]['currentOperationName' + ucFirst(App.Lang)]));
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
                        this.from_alert.clear_message();
                        if (this.id_way_on >= 0) {
                            if (this.id_way_from >= 0) {
                                var rows = this.twfrom_opodl.tab_com.get_select_row();
                                if (rows !== null && rows.length > 0) {
                                    LockScreen(langView('vodlc_mess_create_sostav', App.Langs));
                                    // Выполнить операцию добавить вагоны
                                    $.each(rows, function (i, el) {
                                        el['id_wir_from'] = el.wirId;
                                    }.bind(this));
                                    this.view_wagons(); // Обновить вагоны на пути приема
                                    LockScreenOff();
                                } else {
                                    this.from_alert.out_warning_message(langView('vodlc_mess_not_select_wagon_from', App.Langs));

                                }
                            } else {
                                this.from_alert.out_warning_message(langView('vodlc_mess_not_select_way_from', App.Langs));
                            }
                        } else {
                            this.from_alert.out_warning_message(langView('vodlc_mess_not_select_way_on', App.Langs));
                        }


                    }
                }.bind(this),
                fn_enable_button: function (tb) {

                }.bind(this),
            });

        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    view_op_dislocation_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vodlc_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        // Сбросим установки (время и локомотивы)
        this.form_on_setup.el.datalist_locomotive1.val('');
        this.form_on_setup.el.datalist_locomotive2.val('');
        this.form_on_setup.el.input_datetime_time_aplly.val(moment());
        this.form_from_setup.clear_all();
        this.wagons = [];
        this.wagons_on = [];
        // Сбросим вагоны переноса
        this.id_way_on = -1;
        this.id_station = -1;
        var id_station = -1;
        this.id_way_from = -1;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_from_setup.el.select_id_station.val(id_station);
            }
        };
        this.update(id_station, id_way, function () {
            LockScreenOff();
        }.bind(this));
    };
    // Обновить все
    view_op_dislocation_cars.prototype.update = function (id_station, id_way_from, callback) {
        // Обновим состояние станции
        this.update_station(id_station, id_way_from, function () {
            this.view_wagons();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновим состояние станции
    view_op_dislocation_cars.prototype.update_station = function (id_station, id_way, callback) {
        this.confirm_update_station(id_station,
            function () { // Ok
                //this.wagons_add = [];
                // обновим компонент пути отправки
                this.list_way = this.view_com.api_dir.getListValueTextWaysOfStation(id_station);
                this.form_from_setup.el.select_id_way_from.update(this.list_way, id_way);
                //var sel_way = this.list_way.find(function (o) { return o.value === id_way }.bind(this));
                //if (sel_way) sel_way.disabled = true;
                //this.form_on_setup.el.select_id_way_on.update(this.list_way, -1);

                // Обновим станцию
                this.id_station = id_station;
                // Не сбрасывать в начале
                if (this.id_way_from > 0) {
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
    // Проверка и подтверждение изменений по станции
    view_op_dislocation_cars.prototype.confirm_update_station = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station !== id_station) {
            var wagons_add = this.wagons.filter(function (i) {
                return i.position_new !== null;
            }.bind(this));
            if (wagons_add && wagons_add.length > 0) {
                this.view_com.mcf.open(
                    langView('vodlc_confirm_title', App.Langs),
                    langView('vodlc_confirm_mess_change_station', App.Langs).format(this.form_from_setup.el.select_id_station.text(), wagons_add.length),
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
    view_op_dislocation_cars.prototype.update_from_way = function (id_way, callback) {
        this.confirm_update_way_from(id_way,
            function () { // Ok
                // выберим путь на компоненте пути отправки
                this.form_from_setup.el.select_id_way_from.val(id_way);
                // Запустим паралельно
                var pr_ufw = 1;
                var out_ufw = function (pr_ufw) {
                    if (pr_ufw === 0) {
                        // Обновим список путей приема
                        $.each(this.list_way, function (i, el) {
                            if (el.value === id_way) {
                                el.disabled = true;
                            } else {
                                el.disabled = false;
                            }
                        });
                        // выбраный путь отправки совпал с путем приема
                        if (id_way === this.id_way_on) {
                            this.id_way_on = -1;
                            this.wagons_on = [];
                        }
                        this.form_on_setup.el.select_id_way_on.update(this.list_way, this.id_way_on);
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

                //this.load_dissolution_ways(id_way, function () {
                //    pr_ufw--;
                //    out_ufw(pr_ufw);
                //}.bind(this));

            }.bind(this),
            function () { // Cancel
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
    }
    // Проверка и подтверждение изменений по пути отправки
    view_op_dislocation_cars.prototype.confirm_update_way_from = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way_from !== id_way) {
            var wagons_add = this.wagons.filter(function (i) {
                return i.position_new !== null;
            }.bind(this));
            if (wagons_add && wagons_add.length > 0 && id_way > 0) {
                this.view_com.mcf.open(
                    langView('vodlc_confirm_title', App.Langs),
                    langView('vodlc_confirm_title', App.Langs).format(this.form_from_setup.el.select_id_way_from.text(), wagons_add.length),
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
    // Загрузить вагоны на выбраном пути начала дислокации в масив this.wagons (подготовить поля для вагонов приема)
    view_op_dislocation_cars.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way_from = id_way;
            LockScreen(langView('vodlc_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = null;
                        el['id_wir_from'] = null;
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
    // Загрузить вагоны на выбраном пути приема дислокции в масив this.wagons_on 
    view_op_dislocation_cars.prototype.load_of_way_on = function (id_way_on, callback) {
        if (id_way_on !== null && id_way_on >= 0) {
            this.id_way_on = id_way_on;
            LockScreen(langView('vodlc_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way_on, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = el.position;
                        el['id_wir_from'] = null;
                    });
                }
                this.wagons_on = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons_on);
                }
            }.bind(this));
        } else {
            this.id_way_on = -1;
            this.wagons_on = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons_on);
            }
        }
    };
    // Показать все (сотавы, вагоны)
    view_op_dislocation_cars.prototype.view_wagons = function () {
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать вагоны на пути начала дислокации
        this.view_wagons_from();
        // Показать вагоны на пути дислокации
        this.view_wagons_on();
    };
    // Показать вагоны на пути начала дислокации
    view_op_dislocation_cars.prototype.view_wagons_from = function () {
        var wagons = this.wagons;
        if (this.twfrom_opodl.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wir_from === null;
            });
        }
        this.twfrom_opodl.view(wagons, null);
    };
    // Показать вагоны на пути начала дислокации
    view_op_dislocation_cars.prototype.view_wagons_on = function () {
        var wagons = [];
        if (this.id_way_on !== null && this.id_way_on >= 0) {
            // Выполнить операцию добавить вагоны
            var wagons_add = this.wagons.filter(function (i) {
                return i.id_wir_from !== null;
            }.bind(this));
            //var wagon_max_position = null;
            if (wagons_add !== null && wagons_add.length > 0) {
                if (this.reverse) {
                    wagons_add.sort(function (a, b) { return b.position - a.position });
                } else {
                    wagons_add.sort(function (a, b) { return a.position - b.position });
                }
                var position = 1;
                if (this.head) {
                    $.each(wagons_add, function (i, el) {
                        el['position_new'] = position;
                        position++;
                    }.bind(this));
                    $.each(this.wagons_on, function (i, el) {
                        el['position_new'] = position;
                        position++;
                    }.bind(this));
                    wagons = wagons_add.concat(this.wagons_on);
                } else {
                    $.each(this.wagons_on, function (i, el) {
                        el['position_new'] = position;
                        position++;
                    }.bind(this));
                    $.each(wagons_add, function (i, el) {
                        el['position_new'] = position;
                        position++;
                    }.bind(this));
                    wagons = this.wagons_on.concat(wagons_add);
                }
            } else {
                wagons = this.wagons_on;
            };
            // Добавить выбранные вагоны
            if (this.twon_opodl.tab_com.eye) {
                wagons = wagons.filter(function (i) {
                    return i.id_wir_from !== null;
                });
            }
        };
        this.twon_opodl.view(wagons, null);
    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_dislocation_cars.prototype.validation = function (result) {
        var valid = true;
        // Проверим локомотивы
        var loc1 = this.form_on_setup.el.datalist_locomotive1.text();
        var loc2 = this.form_on_setup.el.datalist_locomotive2.text();
        var el_loc1 = this.form_on_setup.el.datalist_locomotive1.$element;
        var el_loc2 = this.form_on_setup.el.datalist_locomotive2.$element;
        var el_dta = this.form_on_setup.el.input_datetime_time_aplly.$element;
        if (loc1 === loc2) {
            this.form_on_setup.validation_common.set_object_error($(el_loc1), langView('vodlc_mess_error_equal_locomotive', App.Langs));
            this.form_on_setup.validation_common.set_object_error($(el_loc2), langView('vodlc_mess_error_equal_locomotive', App.Langs));
            valid = false;
        } else {
            if (result.new && !result.new.datalist_locomotive1 && (loc1 !== null || loc1 !== '')) {
                this.form_on_setup.validation_common.set_object_error($(el_loc1), langView('vodlc_mess_error_not_locomotive', App.Langs).format(loc1));
                valid = false;
            }
            if ((loc2 !== null && loc2 !== '') && result.new && !result.new.datalist_locomotive2) {
                this.form_on_setup.validation_common.set_object_error($(el_loc2), langView('vodlc_mess_error_not_locomotive', App.Langs).format(loc2));
                valid = false;
            }
        }
        // Проверим время
        if (result.new && result.new.input_datetime_time_aplly) {
            var curr = moment();
            var aplly = moment(result.new.input_datetime_time_aplly);
            var minutes = aplly.diff(curr, 'minutes');
            if (minutes < min_dt_apply) {
                this.form_on_setup.validation_common.set_object_error($(el_dta), langView('vodlc_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                valid = false;
            }
            if (minutes > max_dt_apply) {
                this.form_on_setup.validation_common.set_object_error($(el_dta), langView('vodlc_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                valid = false;
            }
        }
        // Проверим состав
        var wagons = this.wagons.filter(function (i) {
            return i.id_wir_from !== null;
        });
        if (wagons === null || wagons.length === 0) {
            this.form_on_setup.validation_common.out_error_message(langView('vodlc_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_op_dislocation_cars.prototype.apply = function (data) {
        LockScreen(langView('vodlc_mess_run_operation_dislocation', App.Langs));
        this.view_com.api_wsd.postDislocationWagonsOfStationAMKR(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[view_op_dislocation_cars] [postDislocationWagonsOfStationAMKR] :' + mess);
                this.form_on_setup.validation_common.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_on_setup.validation_common.out_error_message(err + ":" + result.errors[err]);
                        console.log('[view_op_dislocation_cars] [postDislocationWagonsOfStationAMKR] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                if (result && result.result > 0) {
                    this.form_on_setup.validation_common.clear_all();
                    // Сбросим установки (время и локомотивы)
                    this.form_on_setup.el.datalist_locomotive1.val('');
                    this.form_on_setup.el.datalist_locomotive2.val('');
                    this.form_on_setup.el.input_datetime_time_aplly.val(moment());
                    this.head = false;              // Признак голова(true)\хвост(false), по умолчанию хвост
                    this.reverse = false;
                    var pr_2 = 2;
                    var out_pr2 = function (pr_2) {
                        if (pr_2 === 0) {
                            this.view_wagons();
                            this.form_on_setup.validation_common.out_info_message(langView('vodlc_mess_ok_operation', App.Langs).format(result.moved));
                            if (typeof this.settings.fn_db_update === 'function') {
                                //TODO: можно добавить возвращать перечень для обновления
                                typeof this.settings.fn_db_update();
                            }
                            LockScreenOff();
                        }
                    }.bind(this);
                    // Обновим пути отправки 1 поток
                    this.load_of_way(this.id_way_from, function () {
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
                    this.form_on_setup.validation_common.out_error_message(langView('vodlc_mess_error_operation_run', App.Langs).format(result ? result.result : -1));
                    // Выведем ошибки по вагонно.
                    if (result && result.list_rs) {
                        $.each(result.listResult, function (i, el) {
                            if (el.result <= 0) this.form_on_setup.validation_common.out_error_message(langView('vodlc_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                        }.bind(this));
                    }

                }
            }
        }.bind(this));
    };
    // Очистить сообщения
    view_op_dislocation_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    view_op_dislocation_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_dislocation_cars = view_op_dislocation_cars;

    window.App = App;

})(window);
