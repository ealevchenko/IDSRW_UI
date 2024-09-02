/* ===============================================
-= Модуль панель операции "ОТПРАВИТЬ СОСТАВЫ НА УЗ" =-
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

    var min_dt_apply = -1 * (60 * 3);           // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var max_dt_apply = 60 * 3;                  // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var min_provide_dt_apply = -1 * (60 * 12);  // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var max_provide_dt_apply = 60 * 12;         // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)


    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vopsuz_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ «ОТПРАВИТЬ СОСТАВ НА УЗ»',
            'vopsuz_card_header_on': 'ОТПРАВИТЬ СОСТАВ',

            'vopsuz_title_label_way': 'Путь отправления:',
            'vopsuz_text_label_way': 'Выберите путь для отправления...',

            'vopsuz_title_label_station': 'Станция отправки:',
            'vopsuz_text_label_station': 'Выберите станцию отправки...',

            'vopsuz_title_time_aplly': 'Время выполнения',
            'vopsuz_text_time_aplly': 'Время выполнения операции ограниченно +(-)1день',
            //'vopsuz_text_append_time_aplly': 'Править',
            'vopsuz_title_placeholder_time_aplly': 'Время выполнения',

            //'vopsuz_title_vagon_searsh': 'Список вагонов',
            //'vopsuz_title_placeholder_vagon_searsh': 'Добавить список вагонов',
            //'vopsuz_text_vagon_searsh': 'Введите номер вагона или несколько вагонов, разделитель номеров ";"',
            //'vopsuz_text_append_vagon_searsh': 'Найти',
            //'vopsuz_title_label_system_number': 'Контроль системной нумерации',
            //'vopsuz_title_text_system_number': 'Выберите, проводить проверку системной нумерации введеных вагонов или нет',

            'vopsuz_title_form_apply': 'ВЫПОЛНИТЬ',
            'vopsuz_title_form_apply_title': 'Выполнить операцию «ОТПРАВИТЬ СОСТАВ НА УЗ»',

            //'vopsuz_title_form_remove': 'СБРОСИТЬ',
            //'vopsuz_confirm_mess_remove': 'Сбросить вагоны? Все вагоны будут убраны с таблицы',

            //'vopsuz_title_form_move': 'ПЕРЕНЕСТИ',
            //'vopsuz_confirm_mess_move': 'Перенести вагоны? Все вагоны в количестве {0} будут перенесены с путей АМКР на станцию {1}, путь {2}',

            'vopsuz_title_button_export': 'Экспорт',
            'vopsuz_title_button_buffer': 'Буфер',
            'vopsuz_title_button_excel': 'Excel',
            'vopsuz_title_button_cancel': 'Отменить',
            'vopsuz_title_button_return': 'Вернуть',
            'vopsuz_title_button_head': 'Голова',
            'vopsuz_title_button_tail': 'Хвост',

            //'vopsuz_title_button_edit_time_aplly': 'Править дату предъявляемого состава (Только при статусе в работе)!',
            //'vopsuz_title_button_vagon_searsh': 'Найти указаные вагоны на путях АМКР!',

            //'vopsuz_title_add_ok': 'ВЫПОЛНИТЬ',
            'vopsuz_table_caption_provide_sostav': 'Предъявленные составы',
            //'vopsuz_table_caption_collect_wagons': 'Вагоны для предъявления',

            //'vopsuz_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу который имеет статус :[{1}])',
            //'vopsuz_mess_warning_wagon_ban_provide_way': 'Вагон № {0} для операций заблокирован (вагон уже предъявлен)',

            //'vopsuz_mess_warning_not_collect_wagons': 'В таблице вагонов для пръедявления - нет вагонов!',
            //'vopsuz_mess_warning_not_collect_wagons_amkr': 'В таблице вагонов для пръедявления - нет вагонов находящихся на АМКР и не предъявленых',

            //'vopsuz_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) = {0}',
            //'vopsuz_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) = {0}',
            //'vopsuz_mess_error_equals_provide_time_aplly': 'Новая и старая дата выполнения операции должна отличаться!',
            //'vopsuz_mess_error_sostav_provide_time_aplly': 'Состав уже предъявлен с датой {0}, при добавлении вагонов нельзя изменить дату предъявления!',
            //'vopsuz_mess_error_min_provide_time_aplly': 'Дата выполнения операции не может быть меньше предыдущей даты предъявления, мин. отклонение (мин) = {0}',
            //'vopsuz_mess_error_max_provide_time_aplly': 'Дата выполнения операции не может быть меньше предыдущей даты предъявления, мак. отклонение (мин) = {0}',
            //'vopsuz_mess_error_not_wagons': 'Не выбраны вагоны для предъявления (в окне «ПРЕДЪЯВИТЬ СОСТАВ» , выберите станцию и путь, в окне «ВАГОНЫ ДЛЯ ПРЕДЪЯВЛЕНИЯ» выберите вагоны).',
            //'vopsuz_mess_error_operation_run': 'При выполнении операции «ПРЕДЪЯВЛЕНИЕ СОСТАВА НА УЗ» произошла ошибка, код ошибки: {0}',
            //'vopsuz_mess_error_edit_dt_apply_provide': 'При выполнении операции правки даты и времени предъявления состава на УЗ, произошла ошибка, код ошибки: {0}',

            //'vopsuz_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            //'vopsuz_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',

            //'vopsuz_mess_cancel_operation': 'Операция «ПРЕДЪЯВЛЕНИЕ СОСТАВА НА УЗ» – отменена',
            //'vopsuz_mess_cancel_operation_edit_dt_apply': 'Операция правки даты и времени предъявления состава УЗ – отменена',
            //'vopsuz_mess_cancel_operation_move': 'Операция сбора вагонов для предявления – отменена',
            //'vopsuz_mess_run_operation_provide': 'Выполняю операцию «ПРЕДЪЯВЛЕНИЕ СОСТАВА НА УЗ»',
            //'vopsuz_mess_run_edit_dt_apply_provide': 'Выполняю операцию правки даты и времени предъявления состава УЗ',
            //'vopsuz_mess_run_operation_move': 'Выполняю операцию сбора вагонов на пути прредъявления',
            //'vopsuz_mess_not_select_wagon_from': 'Выберите вагоны для предъявления!',
            //'vopsuz_mess_not_select_wagon_on': 'Выберите вагоны для отмены предъявления!',
            //'vopsuz_mess_not_select_way_on': 'Выберите путь для предъявления вагонов!',
            //'vopsuz_mess_not_status_provide_sostav': 'Статус предъявленного состава не позволяет выполнить данную операцию',
            //'vopsuz_mess_not_select_provide_sostav': 'Выберите предявленый состав!',
            //'vopsuz_mess_ok_operation': 'Предъявление состава выполнено, предъявлено {0} (ваг.)',
            //'vopsuz_mess_ok_operation_edit_dt_apply': 'Правка даты и времени предъявления состава - выполнено',

            'vopsuz_mess_load_operation': 'Загружаю операции...',
            //'vopsuz_mess_load_wagons': 'Загружаю вагоны на пути...',
            //'vopsuz_mess_load_provide_sostav': 'Загружаю предъявленные и сданные вагоны на пути...',
            //'vopsuz_mess_load_provide_sostav': 'Загружаю вагоны предъявленные в составе...',

            'vopsuz_mess_init_panel': 'Выполняю инициализацию модуля ...',
            //'vopsuz_mess_create_sostav': 'Формирую состав для предъявления, переношу вагоны...',
            //'vopsuz_mess_clear_sostav': 'Формирую состав для предъявления, убираю выбранные вагоны...',

            //'vopsuz_confirm_title': 'Внимание!',

            //'vopsuz_confirm_mess_apply_provide_sostav': 'Выполнить операцию «ПРЕДЪЯВЛЕНИЕ СОСТАВА НА УЗ» в количестве: {0} (ваг.), станция предъявления: {1}, путь предъявления: {2}?',
            //'vopsuz_confirm_mess_apply_add_provide_sostav': 'Добавить вагоны к предъявленному составу {0} в количестве: {1} (ваг.), станция предъявления: {2}, путь предъявления: {3}?',
            //'vopsuz_confirm_mess_edit_dt_apply_provide_sostav': 'Выполнить правку даты и времени предъявления состава на УЗ, старое время предъявления: {0}, новое время предъявления: {1}?',

            //'vopsuz_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию {0}? Все вагоны выбранные для предъявления в количестве {1} будут сброшены! ',
            //'vopsuz_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь предъявления {0}? Все предъявленые вагоны в количестве {1} будут сброшены! ',

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
    function view_op_sending_uz(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_sending_uz.prototype.init = function (options) {
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
        this.id_way = -1;                   // Значения по умолчанию
        this.id_station = -1;               // Значения по умолчанию
        this.id_sostav_provide = null;      // Значения по умолчанию
        this.num_sostav = null;             // Значения по умолчанию
        this.datetime_time_aplly = null;    // Значения по умолчанию
        this.view_collect_sostav = false;

        this.stations = [];                 // Список станций (полный)
        this.list_station = [];             // Список станций всех (value\text\desabled)
        this.list_way = [];                 // Список путей (value\text\desabled)

        this.ways = [];                     // Список путей (полный)

        this.wagons = [];                   // Список вагонов на пути отправки (рабочий)
        this.provide_sostav = [];           // Список составов предявленных но неотправленых (рабочий)
        this.wagons_provide_sostav = [];    // Список вагонов состава предявленных но неотправленых (рабочий)
        this.nums = null;                   // Список вагонов которые нужно найти на АМКР и перенести на путь (рабочий)
        this.list_collect_wagons = [];      // Список вагонов которые нужно найти на АМКР и перенести на путь (рабочий для отображения)


        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vopsuz_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();
        // Сообщение
        LockScreen(langView('vopsuz_mess_init_panel', App.Langs));
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
            header_text: langView('vopsuz_card_header_on', App.Langs),
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
        //this.card_from = new this.view_com.fe_ui.bs_card({
        //    border_color: 'border-primary',
        //    class: 'text-bg-light',
        //    header_class: 'fw-bold text-uppercase',
        //    header_color: null,
        //    header_bg: null,
        //    header_text: langView('vopsuz_card_header_from', App.Langs),
        //    body_color: null,
        //    body_bg: null,
        //    body_text: null,
        //    footer: false,
        //    footer_text: null,
        //    footer_color: null,
        //    footer_bg: null,
        //    max_width: null,
        //});
        //var row = new this.view_com.fe_ui.bs_row({});
        //this.from_table = new this.view_com.fe_ui.bs_col({
        //    //pref: 'xl',
        //    //size: 6,
        //    class: 'rounded border border-secondary'
        //});
        //this.from_collect = new this.view_com.fe_ui.bs_col({
        //    //pref: 'xl',
        //    //size: 6,
        //    id: 'collapse-collect',
        //    class: 'ms-2 rounded border border-secondary collapse'
        //});
        // Alert_from
        //this.alert_from = new this.view_com.fe_ui.bs_alert({
        //    id: null,
        //    class: null,
        //    style: null,
        //    color: null,
        //    bt_close: false,
        //    fn_click_close: null,
        //});
        //row.$html.append(this.alert_from.$html);
        ////this.from_table.$html.append(this.alert_from.$html);
        //this.from_alert = new ALERT(this.alert_from.$html);
        //row.$html.append(this.from_table.$html).append(this.from_collect.$html);
        //this.card_from.body.$html.append(row.$html);
        //this.view_com.$op.append(this.card_from.$html);
        this.view_com.load_db(['station', 'ways'], false, function (result) {
            var process = 3;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    //----------------------------------
                    if (typeof this.settings.fn_init === 'function') {
                        console.log('Close view_op_sending_uz');
                        this.settings.fn_init(this.result_init);
                    }
                    //----------------------------------
                }
            }.bind(this);
            // инициализациия 
            this.stations = this.view_com.api_dir.getAllStation();
            this.list_station = this.view_com.api_dir.getListValueTextStation(function (i) {
                return !i.stationUz && i.stationDelete === null && i.exitUz;
            }.bind(this))
            this.ways = this.view_com.api_dir.getAllWays();

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
                    id: 'apply',
                    name: 'apply',
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('vopsuz_title_form_apply', App.Langs),
                    title: langView('vopsuz_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_on_setup.$form.submit();
                    }.bind(this),
                }
            };
            var form_select_station = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_on',
                    id: 'id_station',
                    name: 'id_station',
                    label: langView('vopsuz_title_label_station', App.Langs),
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
                    form_text: langView('vopsuz_text_label_station', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_way = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_on',
                    id: 'id_way',
                    name: 'id_way',
                    label: langView('vopsuz_title_label_way', App.Langs),
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
                        default: this.id_way,
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
                    form_text: langView('vopsuz_text_label_way', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var col_provide_sostav = {
                obj: 'bs_col',
                options: {
                    id: 'op-suz-provide-sostav',
                    pref: 'md',
                    size: 12,
                    class: 'text-left',
                    style: null,
                },
                childs: []
            };
            //var bt_edit_time_aplly = {
            //    obj: 'bs_button',
            //    options: {
            //        id: 'edit_time',
            //        name: 'edit_time',
            //        class: null,
            //        fsize: 'sm',
            //        color: 'primary',
            //        text: null,
            //        title: langView('vopsuz_title_button_edit_time_aplly', App.Langs),
            //        icon_fa_left: 'fa-solid fa-pen-to-square', //<i class="fa-solid fa-pen-to-square"></i>
            //        icon_fa_right: null,
            //        fn_click: function (event) {
            //            event.preventDefault();
            //            this.edit_dt_provide();
            //        }.bind(this),
            //    }
            //};
            var form_input_datetime_time_aplly = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_on',
                    id: 'time_aplly',
                    name: 'time_aplly',
                    label: langView('vopsuz_title_time_aplly', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopsuz_title_placeholder_time_aplly', App.Langs),
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
                    //group_append_class: null,
                    //group_append_id: null,
                    //group_append_html: langView('vopsuz_text_append_time_aplly', App.Langs), //'Править предъявления'
                    //group_append_objs: [bt_edit_time_aplly],
                    form_text: langView('vopsuz_text_time_aplly', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            col_bt_apply.childs.push(bt_bt_apply);
            objs_on_setup.push(col_bt_apply);
            objs_on_setup.push(form_select_station);
            objs_on_setup.push(form_select_way);
            objs_on_setup.push(col_provide_sostav);
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
                            //var wagons = this.wagons.filter(function (i) { return i.id_wir_from !== null; });// получить вагоны
                            //var mess = "";
                            //if (this.id_sostav_provide !== null) {
                            //    var mess = langView('vopsuz_confirm_mess_apply_add_provide_sostav', App.Langs).format(this.num_sostav, (wagons ? wagons.length : 0), this.form_on_setup.el.select_id_station.text(), this.form_on_setup.el.select_id_way.text())
                            //} else {
                            //    var mess = langView('vopsuz_confirm_mess_apply_provide_sostav', App.Langs).format((wagons ? wagons.length : 0), this.form_on_setup.el.select_id_station.text(), this.form_on_setup.el.select_id_way.text())
                            //}
                            //this.view_com.mcf.open(
                            //    langView('vopsuz_title_form_apply', App.Langs),
                            //    mess,
                            //    function () {
                            //        // Принять
                            //        // Проверим наличие вагонов 
                            //        var list_wagons = [];
                            //        if (wagons && wagons.length > 0) {
                            //            // Получим перечень вагонов и новую позицию
                            //            $.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
                            //                list_wagons.push({ wir_id: el.wirId, position: el.position_new })
                            //            }.bind(this));
                            //            // Сформируем операцию
                            //            var operation = {
                            //                id_way_from: this.id_way,
                            //                id_sostav: this.id_sostav_provide,
                            //                wagons: list_wagons,
                            //                lead_time: result.new.input_datetime_time_aplly._i,
                            //            };
                            //            this.apply(operation);
                            //        }
                            //    }.bind(this),
                            //    function () {
                            //        this.form_on_setup.validation_common_on.out_warning_message(langView('vopsuz_mess_cancel_operation', App.Langs));
                            //    }.bind(this));
                        }
                    }
                }.bind(this),
                fn_html_init: function (res) { }.bind(this),
                fn_element_init: null,
                fn_init: function (init) {
                    this.on_setup.$html.append(this.form_on_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_sending_uz] [form_on_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            // Таблица открытые предъявленые составы
            this.tps_opsuz = new TWS('div#op-suz-provide-sostav');
            this.tps_opsuz.init({
                caption: langView('vopsuz_table_caption_provide_sostav', App.Langs), //
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'provide_sostav',
                setup_buttons: [],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_sending_uz] [twnsow_opoc] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.on_alert.clear_message();
                    this.form_on_setup.validation_common_on.clear_all();
                }.bind(this),
                fn_select_rows: function (rows, type) {
                    this.form_on_setup.validation_common_on.clear_all();
                    this.form_on_setup.el.button_edit_time.prop('disabled', true);
                    this.form_on_setup.el.input_datetime_time_aplly.val(moment());
                    this.id_sostav_provide = null;
                    this.num_sostav = null;
                    this.datetime_time_aplly = null;
                    this.wagons_provide_sostav = [];
                    if (type === "select") {
                        if (rows != null && rows.length > 0) {
                            this.id_sostav_provide = rows[0].id;
                            this.num_sostav = rows[0].numDoc;
                            if (rows[0].status === 0 || rows[0].status === 1) {
                                this.form_on_setup.el.button_edit_time.prop('disabled', false);
                                this.form_on_setup.el.input_datetime_time_aplly.val(moment(rows[0].dateReadinessAmkr));
                                this.datetime_time_aplly = rows[0].dateReadinessAmkr;
                            }
                        }
                        this.load_wagons_sostav_provide(this.id_sostav_provide,
                            function () {
                                this.view_wagons_sostav_provide();
                                LockScreenOff();
                            }.bind(this));
                    } else {
                        this.view_wagons_sostav_provide();
                        LockScreenOff();
                    }
                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {

                }.bind(this),
                fn_enable_button: function (tb) {

                }.bind(this),
            });
            // Панель таблицы вагонов предявляемого состава
            var row_provide_wagon = new this.view_com.fe_ui.bs_row({ id: 'op-suz-provide-wagon', class: 'pt-2' });
            this.on_table.$html.append(row_provide_wagon.$html);
            // Таблица вагонов предявляемого состава
            this.tpw_opsuz = new TWS('div#op-suz-provide-wagon');
            this.tpw_opsuz.init({
                alert: this.on_alert,
                class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'provide_cars_on',
                setup_buttons: [
                    {
                        name: 'select_all',
                        action: function () {
                            // Выбрать только не принятые вагоны
                            this.tpw_opsuz.tab_com.obj_t_report.rows(function (idx, data, node) {
                                return data.id_wir_from !== null;
                            }).select();
                        }.bind(this)
                    },
                    { name: 'select_none', action: null },
                    {
                        name: 'del_wagons_sostav',
                        action: function (e, dt, node, config) {
                            this.tpw_opsuz.tab_com.button_action(config.button, e, dt, node, config);
                        }.bind(this),
                        enabled: false
                    }
                ],
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_sending_uz] [tocw_opoc] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.on_alert.clear_message();
                    this.form_on_setup.validation_common_on.clear_all();
                    //if (rowData && rowData.length > 0) {
                    //    if (rowData[0].id_wir_from === null) {
                    //        e.preventDefault();
                    //        this.on_alert.out_warning_message(langView('vopsuz_mess_warning_wagon_ban_provide_way', App.Langs).format(rowData[0].num));
                    //    }
                    //}
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'eye') {
                        this.view_wagons_sostav_provide();
                        LockScreenOff();
                    }
                    if (name === 'del_wagons_sostav') {
                        //this.on_alert.clear_message();
                        //var rows = this.tpw_opsuz.tab_com.get_select_row();
                        //if (rows !== null && rows.length > 0) {
                        //    LockScreen(langView('vopsuz_mess_clear_sostav', App.Langs));
                        //    // Выполнить операцию добавить вагоны
                        //    $.each(rows, function (i, el) {
                        //        el['id_wir_from'] = null;
                        //        el['position_new'] = null;
                        //    }.bind(this));
                        //    this.view_wagons(); // Обновить вагоны на пути приема
                        //    LockScreenOff();
                        //} else {
                        //    this.on_alert.out_warning_message(langView('vopsuz_mess_not_select_wagon_on', App.Langs));
                        //}
                    }
                }.bind(this),
                fn_enable_button: function (tb) {

                }.bind(this),
            });
            // Панель таблицы новых вагонов предявляемого состава
            var row_add_wagon = new this.view_com.fe_ui.bs_row({ id: 'op-suz-add-wagon', class: 'pt-2' });
            this.on_table.$html.append(row_add_wagon.$html);

        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    view_op_sending_uz.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vopsuz_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        // Сбросим установки (время)
        this.form_on_setup.el.input_datetime_time_aplly.val(moment());
        //this.form_from_setup.clear_all();
        this.wagons = [];
        this.wagons_on = [];
        // Сбросим вагоны переноса
        this.id_sostav_provide = null;
        this.num_sostav = null;
        this.id_way = -1;
        this.id_station = -1;
        var id_station = -1;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_on_setup.el.select_id_station.val(id_station);
            }
        };
        this.update(id_station, id_way, function () {
            LockScreenOff();
        }.bind(this));
    };
    // Проверка вагоны выбраны?
    view_op_sending_uz.prototype.isAddWagon = function (callback_ok, callback_not) {
        var wagons_add = this.wagons.filter(function (i) {
            return i.id_wir_from !== null;
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
    view_op_sending_uz.prototype.update = function (id_station, id_way_from, callback) {
        // Обновим состояние станции
        //this.update_station(id_station, id_way_from, function () {
        //    this.view_wagons();
        //    if (typeof callback === 'function') {
        //        callback();
        //    }
        //}.bind(this));
        if (typeof callback === 'function') {
            callback();
        }
    };
    // Обновим состояние станции
    view_op_sending_uz.prototype.update_station = function (id_station, id_way, callback) {
        this.confirm_update_station(id_station,
            function () { // Ok
                // обновим компонент пути отправки
                this.list_way = this.view_com.api_dir.getListValueTextCrossingUzWaysOfStation(id_station);
                this.form_on_setup.el.select_id_way.update(this.list_way, id_way);
                // Обновим станцию
                this.id_station = id_station;
                // Не сбрасывать в начале
                if (this.id_way > 0) {
                    id_way = -1;
                }
                // Обновим данные на пути
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
    view_op_sending_uz.prototype.confirm_update_station = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station !== id_station) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vopsuz_confirm_title', App.Langs),
                        langView('vopsuz_confirm_mess_change_station', App.Langs).format(this.form_on_setup.el.select_id_station.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_on_setup.el.select_id_station.val(this.id_station);
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
    view_op_sending_uz.prototype.update_from_way = function (id_way, callback) {
        this.confirm_update_way_from(id_way,
            function () { // Ok
                // выберим путь на компоненте пути отправки
                this.form_on_setup.el.select_id_way.val(id_way);
                // Запустим паралельно
                var pr_ufw = 2;
                var out_ufw = function (pr_ufw) {
                    if (pr_ufw === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }.bind(this);

                // загрузим вагоны на пути 1 поток
                this.load_of_way(id_way, function () {
                    pr_ufw--;
                    out_ufw(pr_ufw);
                }.bind(this));

                // загрузим предъявленные составы 2 поток
                this.load_of_provide_sostav(id_way, function () {
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
    // Проверка и подтверждение изменений по пути отправки
    view_op_sending_uz.prototype.confirm_update_way_from = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way !== id_way) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vopsuz_confirm_title', App.Langs),
                        langView('vopsuz_confirm_mess_change_way', App.Langs).format(this.form_on_setup.el.select_id_way.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_on_setup.el.select_id_way.val(this.id_way);
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
    //view_op_sending_uz.prototype.load_of_way = function (id_way, callback) {
    //    if (id_way !== null && id_way >= 0) {
    //        this.id_way = id_way;
    //        LockScreen(langView('vopsuz_mess_load_wagons', App.Langs));
    //        this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
    //            // модифицировать данные взависимости от отчета
    //            if (wagons) {
    //                $.each(wagons, function (i, el) {
    //                    el['position_new'] = null;
    //                    el['id_wir_from'] = null;
    //                });
    //            }
    //            this.wagons = wagons;
    //            // Событие обновили данные
    //            if (typeof callback === 'function') {
    //                callback(this.wagons);
    //            }
    //        }.bind(this));
    //    } else {
    //        this.id_way = -1;
    //        this.wagons = [];
    //        // Событие обновили данные
    //        if (typeof callback === 'function') {
    //            callback(this.wagons);
    //        }
    //    }
    //};
    // Загрузить составы которые имеют статус предъявления
    view_op_sending_uz.prototype.load_of_provide_sostav = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            LockScreen(langView('vopsuz_mess_load_provide_sostav', App.Langs));
            this.view_com.api_wsd.getViewOpenOutgoingSostavOfIdWay(id_way, function (provide_sostav) {
                // модифицировать данные взависимости от отчета
                //if (provide_sostav) {
                //    $.each(provide_sostav, function (i, el) {
                //        el['position_new'] = null;
                //        el['id_wir_from'] = null;
                //    });
                //}
                this.provide_sostav = provide_sostav;
                this.wagons_provide_sostav = [];
                this.id_sostav_provide = null;
                this.num_sostav = null;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.provide_sostav);
                }
            }.bind(this));
        } else {
            this.provide_sostav = [];
            this.wagons_provide_sostav = [];
            this.id_sostav_provide = null;
            this.num_sostav = null;
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.provide_sostav);
            }
        }
    };
    // Загрузить вагоны предъявленного состава
    view_op_sending_uz.prototype.load_wagons_sostav_provide = function (id_sostav_provide, callback) {
        if (id_sostav_provide !== null && id_sostav_provide >= 0) {
            LockScreen(langView('vopsuz_mess_load_provide_sostav', App.Langs));
            this.view_com.api_wsd.getViewWagonsOutgoingSostavOfIdSostav(id_sostav_provide, function (provide_sostav) {
                // модифицировать данные взависимости от отчета
                if (provide_sostav) {
                    $.each(provide_sostav, function (i, el) {
                        el['position_new'] = el.position;
                        el['id_wir_from'] = null;
                    });
                }
                this.wagons_provide_sostav = provide_sostav;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons_provide_sostav);
                }
            }.bind(this));
        } else {
            this.wagons_provide_sostav = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons_provide_sostav);
            }
        }
    };
    // Показать все (сотавы, вагоны)
    view_op_sending_uz.prototype.view_wagons = function () {
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        //this.form_from_setup.clear_all();
        // Показать вагоны на пути начала дислокации
/*        this.view_wagons_from();*/
        //this.view_provide_sostav();
        this.view_wagons_sostav_provide();
        // Показать вагоны на пути дислокации
        //this.view_wagons_on();
    };
    // Показать вагоны на пути начала дислокации
    //view_op_sending_uz.prototype.view_wagons_from = function () {
    //    var wagons = this.wagons;
    //    if (this.twfrom_opprc.tab_com.eye) {
    //        wagons = wagons.filter(function (i) {
    //            return i.id_wir_from === null;
    //        });
    //    }
    //    this.twfrom_opprc.view(wagons, null);
    //};
    // Показать открытые отправленные составы 
    //view_op_sending_uz.prototype.view_provide_sostav = function () {
    //    var sostavs = this.provide_sostav;
    //    //this.tps_opsuz.view(sostavs, null);
    //    this.tps_opsuz.view(sostavs, this.id_sostav_provide);
    //};
    // Показать вагоны предявляемого состава
    view_op_sending_uz.prototype.view_wagons_sostav_provide = function () {
        var wagons = this.wagons_provide_sostav;
        var wagons_add = this.wagons.filter(function (i) {
            return i.id_wir_from !== null;
        }.bind(this));
        if (wagons_add !== null && wagons_add.length > 0) {
            var position = wagons !== null && wagons.length > 0 ? wagons.length + 1 : 1;
            $.each(wagons_add, function (i, el) {
                el['position_new'] = position;
                position++;
            }.bind(this));
            wagons = wagons.concat(wagons_add)
        }
        if (this.tpw_opsuz.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wir_from !== null;
            });
        }
        this.tpw_opsuz.view(wagons, null);
    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_sending_uz.prototype.validation = function (result) {
        var valid = true;
        var el_dta = this.form_on_setup.el.input_datetime_time_aplly.$element;
        // Проверим время
        if (result.new && result.new.input_datetime_time_aplly) {
            //this.id_sostav_provide

            if (this.id_sostav_provide !== null) {
                var curr = moment(this.datetime_time_aplly);
                var aplly = moment(result.new.input_datetime_time_aplly);
                var minutes = aplly.diff(curr, 'minutes');
                if (minutes !== 0) {
                    this.form_on_setup.validation_common_on.set_object_error($(el_dta), langView('vopsuz_mess_error_sostav_provide_time_aplly', App.Langs).format(moment(this.datetime_time_aplly).format(format_datetime)));
                    valid = false;
                }
            } else {
                var curr = moment();
                var aplly = moment(result.new.input_datetime_time_aplly);
                var minutes = aplly.diff(curr, 'minutes');
                if (minutes < min_dt_apply) {
                    this.form_on_setup.validation_common_on.set_object_error($(el_dta), langView('vopsuz_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                    valid = false;
                }
                if (minutes > max_dt_apply) {
                    this.form_on_setup.validation_common_on.set_object_error($(el_dta), langView('vopsuz_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                    valid = false;
                }
            }
        }
        // Проверим состав
        var wagons = this.wagons.filter(function (i) {
            return i.id_wir_from !== null;
        });
        if (wagons === null || wagons.length === 0) {
            this.form_on_setup.validation_common_on.out_error_message(langView('vopsuz_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    view_op_sending_uz.prototype.validation_collect = function (result) {
        var valid = true;
        var el_vs = this.form_collect_setup.el.textarea_vagon_searsh;//.$element;
        this.nums = this.form_collect_setup.validation_common_collect.check_control_is_valid_nums(el_vs, result.new.input_checkbox_system_number, false, true);
        valid = (this.nums !== null);
        return valid;
    }
    // выполнить операцию
    view_op_sending_uz.prototype.apply = function (data) {
        LockScreen(langView('vopsuz_mess_run_operation_provide', App.Langs));
        this.view_com.api_wsd.postProvideWagonsOfStationAMKR(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('vopsuz_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[view_op_sending_uz] [postProvideWagonsOfStationAMKR] :' + mess);
                this.form_on_setup.validation_common_on.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_on_setup.validation_common_on.out_error_message(err + ":" + result.errors[err]);
                        console.log('[view_op_sending_uz] [postProvideWagonsOfStationAMKR] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                //result = {};
                //result.result = 1;
                if (result && result.result > 0) {
                    this.form_on_setup.validation_common_on.clear_all();
                    // Сбросим установки (время и локомотивы)
                    this.form_on_setup.el.input_datetime_time_aplly.val(moment());
                    var pr_2 = 2;
                    var out_pr2 = function (pr_2) {
                        if (pr_2 === 0) {
                            this.view_wagons();
                            this.form_on_setup.validation_common_on.out_info_message(langView('vopsuz_mess_ok_operation', App.Langs).format(result.moved));
                            if (typeof this.settings.fn_db_update === 'function') {
                                //TODO: можно добавить возвращать перечень для обновления
                                typeof this.settings.fn_db_update();
                            }
                            LockScreenOff();
                        }
                    }.bind(this);
                    // Обновим пути отправки 1 поток
                    this.load_of_way(this.id_way, function () {
                        pr_2--;
                        out_pr2(pr_2);
                    }.bind(this));
                    // Обновим пути приема 2 поток
                    this.load_of_provide_sostav(this.id_way, function () {
                        pr_2--;
                        out_pr2(pr_2);
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.form_on_setup.validation_common_on.out_error_message(langView('vopsuz_mess_error_operation_run', App.Langs).format(result ? result.result : -1));
                    // Выведем ошибки по вагонно.
                    if (result && result.list_rs) {
                        $.each(result.listResult, function (i, el) {
                            if (el.result <= 0) this.form_on_setup.validation_common_on.out_error_message(langView('vopsuz_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                        }.bind(this));
                    }
                }
            }
        }.bind(this));
    };
    // Править дату и время предъявления
    view_op_sending_uz.prototype.edit_dt_provide = function () {
        this.form_on_setup.clear_all();
        var valid = true;
        var el_dta = this.form_on_setup.el.input_datetime_time_aplly.$element;
        // Проверим время
        var curr = moment(this.datetime_time_aplly);
        var aplly = moment(this.form_on_setup.el.input_datetime_time_aplly.val());
        var minutes = aplly.diff(curr, 'minutes');
        if (minutes === 0) {
            this.form_on_setup.validation_common_on.set_object_error($(el_dta), langView('vopsuz_mess_error_equals_provide_time_aplly', App.Langs));
            valid = false;
        }
        if (minutes < min_provide_dt_apply) {
            this.form_on_setup.validation_common_on.set_object_error($(el_dta), langView('vopsuz_mess_error_min_provide_time_aplly', App.Langs).format(min_provide_dt_apply * -1));
            valid = false;
        }
        if (minutes > max_provide_dt_apply) {
            this.form_on_setup.validation_common_on.set_object_error($(el_dta), langView('vopsuz_mess_error_max_provide_time_aplly', App.Langs).format(max_provide_dt_apply));
            valid = false;
        }
        if (valid) {
            this.view_com.mcf.open(
                langView('vopsuz_title_form_apply', App.Langs),
                langView('vopsuz_confirm_mess_edit_dt_apply_provide_sostav', App.Langs).format(moment(this.datetime_time_aplly).format(format_datetime), moment(this.form_on_setup.el.input_datetime_time_aplly.val()).format(format_datetime)),
                function () {
                    // Править
                    var operation = {
                        id_sostav: this.id_sostav_provide,
                        lead_time: aplly._i,
                    };
                    LockScreen(langView('vopsuz_mess_run_edit_dt_apply_provide', App.Langs));
                    this.view_com.api_wsd.postDateTimeProvideWagonsOfStationAMKR(operation, function (result) {
                        // Проверим на ошибку выполнения запроса api
                        if (result && result.status) {
                            var mess = langView('vopsuz_mess_error_api', App.Langs).format(result.status, result.title);
                            console.log('[view_op_sending_uz] [postDateTimeProvideWagonsOfStationAMKR] :' + mess);
                            this.form_on_setup.validation_common_on.out_error_message(mess);
                            if (result.errors) {
                                for (var err in result.errors) {
                                    this.form_on_setup.validation_common_on.out_error_message(err + ":" + result.errors[err]);
                                    console.log('[view_op_sending_uz] [postDateTimeProvideWagonsOfStationAMKR] :' + err + ":" + result.errors[err]);
                                }
                            }
                            LockScreenOff();
                        } else {
                            if (result && result >= 0) {
                                // Обновим пути приема 2 поток
                                this.load_of_provide_sostav(this.id_way, function () {
                                    this.view_wagons();
                                    this.form_on_setup.validation_common_on.out_info_message(langView('vopsuz_mess_ok_operation_edit_dt_apply', App.Langs));
                                    if (typeof this.settings.fn_db_update === 'function') {
                                        //TODO: можно добавить возвращать перечень для обновления
                                        typeof this.settings.fn_db_update();
                                    }
                                    LockScreenOff();
                                }.bind(this));
                            } else {
                                this.form_on_setup.validation_common_on.out_error_message(langView('vopsuz_mess_error_edit_dt_apply_provide', App.Langs).format(result));
                            }
                        }
                    }.bind(this));
                }.bind(this),
                function () {
                    this.form_on_setup.validation_common_on.out_warning_message(langView('vopsuz_mess_cancel_operation_edit_dt_apply', App.Langs));
                }.bind(this));
        }
    };

    // Очистить сообщения
    view_op_sending_uz.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    view_op_sending_uz.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_sending_uz = view_op_sending_uz;

    window.App = App;

})(window);
