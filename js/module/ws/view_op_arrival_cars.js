/* ===============================================
-= Модуль панель операции "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР" =-
  + js/view/shared/common.js
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
            'vac_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР"',
            'vac_card_header_on': 'ПРИНЯТЬ НА СТАНЦИЮ',
            'vac_card_header_from': 'СОСТАВЫ НА ПОДХОДАХ',
            'vac_fieldset_on_table_title': 'Сформированный состав',

            'vac_title_label_station_on': 'Станция прибытия:',
            'vac_title_placeholder_station_on': 'Станция прибытия:',

            'vac_title_label_way_on': 'Путь прибытия:',
            'vac_title_placeholder_way_on': 'Выберите путь',


            'vac_title_label_outer_way': 'Внешний путь:',
            'vac_title_placeholder_outer_way': 'Внешний путь',
            'vac_title_label_locomotive1': 'Локомотив №1:',
            'vac_title_label_locomotive2': 'Локомотив №2:',
            'vac_title_placeholder_locomotive': ' № локомотива',
            'vac_title_time_aplly': 'Время выполнения',
            'vac_title_placeholder_time_aplly': 'Время выполнения',

            'vac_title_form_apply': 'Выполнить?',

            'vac_title_button_export': 'Экспорт',
            'vac_title_button_buffer': 'Буфер',
            'vac_title_button_excel': 'Excel',
            'vac_title_button_cancel': 'Отменить',
            'vac_title_button_return': 'Вернуть',
            'vac_title_button_head': 'Голова',
            'vac_title_button_tail': 'Хвост',

            'vac_title_add_ok': 'ВЫПОЛНИТЬ',


            'vac_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            'vac_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив №',
            'vac_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) =',
            'vac_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) =',
            'vac_mess_error_not_wagons': 'Не выбраны вагоны для приема (в окне «СОСТАВЫ НА ПОДХОДАХ», выберите станцию, прибывающий состав и сформируйте прибытие).',
            'vac_mess_error_operation_run': 'При выполнении операции «ПРИНЯТЬ СОСТАВ НА СТАНЦИЮ» произошла ошибка, код ошибки:',

            'vac_mess_cancel_operation': 'Операция "ПРИНЯТЬ НА СТАНЦИЮ АМКР" – отменена',
            'vac_mess_run_operation_arrival': 'Выполняю операцию приема вагонов прибывающего состава на станцию АМКР',
            'vac_mess_not_select_way_on': 'Выберите путь для приема вагонов!',

            'vac_mess_load_operation': 'Загружаю операции...',
            'vac_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vac_mess_update_operation': 'Обновляю операции...',
            'vac_mess_init_panel': 'Выполняю инициализацию модуля ...',
            'vac_mess_destroy_operation': 'Закрываю форму...',
            'vac_mess_create_sostav': 'Формирую состав, переношу вагоны...',
            'vac_mess_clear_sostav': 'Формирую состав, убираю выбранные вагоны...',
            'vac_mess_reverse_head_sostav': 'Формирую состав, реверс голова-хвост',
            'vac_mess_reverse_sostav': 'Формирую состав, реверс вагонов...',
        },
        'en':  //default language: English
        {
            'vac_card_header_panel': 'PERFORM THE OPERATION "RECEIVE CONSTRUCTIONS TO AMKR STATION"',
            'vac_card_header_on': 'ACCEPT TO STATION',
            'vac_card_header_from': 'COMPOSITIONS ON APPROACHES',
            'vac_fieldset_on_table_title': 'Squad formed',

            'vac_title_label_station_on': 'Arrival station:',
            'vac_title_placeholder_station_on': 'Arrival station:',

            'vac_title_label_way_on': 'Arrival path:',
            'vac_title_placeholder_way_on': 'Select path',


            'vac_title_label_outer_way': 'External path:',
            'vac_title_placeholder_outer_way': 'External path',
            'vac_title_label_locomotive1': 'Locomotive # 1:',
            'vac_title_label_locomotive2': 'Locomotive # 2:',
            'vac_title_placeholder_locomotive': 'Locomotive #',
            'vac_title_time_aplly': 'Runtime',
            'vac_title_placeholder_time_aplly': 'Execution time',

            'vac_title_form_apply': 'Execute?',

            'vac_title_button_export': 'Export',
            'vac_title_button_buffer': 'Buffer',
            'vac_title_button_excel': 'Excel',
            'vac_title_button_cancel': 'Cancel',
            'vac_title_button_return': 'Return',
            'vac_title_button_head': 'Head',
            'vac_title_button_tail': 'Tail',

            'vac_title_add_ok': 'EXECUTE',


            'vac_mess_error_equal_locomotive': 'Locomotive # 1 and # 2 are equal',
            'vac_mess_error_not_locomotive': 'There is no locomotive # in the IDS directory',
            'vac_mess_error_min_time_aplly': 'The date of the operation cannot be less than the current date, min. deviation (min) = ',
            'vac_mess_error_max_time_aplly': 'The date of the operation cannot be greater than the current date, mac. deviation (min) = ',
            'vac_mess_error_not_wagons': 'No wagons have been selected to receive (in the "TRAFFIC ON APPROACHES" window, select a station, an arriving train and form an arrival).',
            'vac_mess_error_operation_run': 'An error occurred while executing the "RECEIVE CONSTITUTION TO STATION" operation, error code:',

            'vac_mess_cancel_operation': 'The operation "ACCEPT TO AMKR STATION" - canceled',
            'vac_mess_run_operation_arrival': 'I am performing the operation of receiving wagons of the arriving train at the AMKR station',
            'vac_mess_not_select_way_on': 'Please select a track to receive wagons!',

            'vac_mess_load_operation': 'Loading operations ...',
            'vac_mess_load_wagons': 'Loading wagons on the way ...',
            'vac_mess_update_operation': 'Updating operations ...',
            'vac_mess_init_panel': 'Initializing module ...',
            'vac_mess_destroy_operation': 'Closing the form ...',
            'vac_mess_create_sostav': 'Forming train, moving wagons ...',
            'vac_mess_clear_sostav': 'Forming the train, removing the selected wagons ...',
            'vac_mess_reverse_head_sostav': 'Form composition, reverse head-tail',
            'vac_mess_reverse_sostav': 'Forming the train, reversing the wagons ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //var API_DIRECTORY = App.ids_directory;
    //var IDS_WSD = App.ids_wsd;

    var VIEW_COMMON = App.view_op_common;

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    function view_op_arrival_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
//        if (!selector) {
//            throw new Error('Не указан селектор');
//        }
//        this.$panel = $(selector);
//        if (this.$panel.length === 0) {
//            throw new Error('Не удалось найти элемент с селектором: ' + selector);
//        }
///*        this.selector = this.$panel.attr('id');*/
//        this.fe_ui = new FE();
//        this.offcanvas = new this.fe_ui.bs_offcanvas({
//            id: null,
//            class: 'offcanvas-operation-detal',
//            backdrop: 'static',
//            position: 'offcanvas-start',
//            fn_close: function (even) {

//            }.bind(this),
//        });
//        this.$title = this.offcanvas.header_title.$html;
//        this.$op = this.offcanvas.body.$html;
//        this.$panel.append(this.offcanvas.$html);
//        this.bs_offcanvas = new bootstrap.Offcanvas(this.offcanvas.$html);
    }
    // инициализация модуля
    view_op_arrival_cars.prototype.init = function (options) {
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
        });
        this.id_station = -1;   // По умолчанию не выбрана
        this.id_way = -1;       // По умолчанию не выбрана
        this.list_station = []; // По умолчанию пустой список
        this.list_way = [];     // По умолчанию пустой список

        this.id_outer_way = -1;   // id перегона
        this.station_from = null; // Станция отправления

        this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
        this.wagons = [];       // Список вагонов на пути (рабочий)
        this.num_sostav = null; // Номер выбранного состава
        this.wagons_sostav = [];// Список вагонов выбранного состава (рабочий)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vac_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();
        
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------

        // Сообщение
        //LockScreen(langView('vac_mess_init_panel', App.Langs));
        //----------------------------------
        // Создать макет панели
        //var panelElement = new div_panel(this);
        //this.$panel.empty();
        //this.$setup_on = panelElement.$setup_on;
        //this.$setup_from = panelElement.$setup_from;
        //this.$table_on = panelElement.$table_on;
        //this.$table_from = panelElement.$table_from;

        //this.alert_on = new alert(panelElement.$alert_on);
        //this.alert_from = new alert(panelElement.$alert_from);

        //this.$panel.append(panelElement.$element);

        // Создадим и добавим макет таблицы

        // Загрузим справочные данные, определим поля формы правки

        //this.load_db(['station', 'ways', 'outer_ways', 'locomotive'], false, function (result) {
        //    // Подгрузили списки
        //    this.list_station = this.ids_dir.getListStation('id', 'station_name', App.Lang, function (i) { return i.station_uz === false && i.station_delete === null; });
        //    // Список локомотивов
        //    this.list_locomotive = this.ids_dir.getListLocomotive('locomotive', 'locomotive', function (i) { return i.id_locomotive_status === 1; });
        //    //--------------------ФОРМА FROM ---------------------------
        //    // Создадим форму выбора пути отправки (this.$setup_from)
        //    this.form_setup_from = new FIF();
        //    var fl_station = {
        //        field: 'id_station',
        //        type: 'int',
        //        add: null,
        //        edit: 'select',
        //        name: 'station',
        //        prefix: 'sm', //'sm','','lg'
        //        label: langView('vac_title_label_station_on', App.Langs),
        //        placeholder: langView('vac_title_placeholder_station_on', App.Langs),
        //        maxlength: null,
        //        required: true,
        //        control: null,
        //        list: this.list_station,
        //        select: function (e, ui) {
        //            event.preventDefault();
        //            // Обработать выбор
        //            var id = Number($(e.currentTarget).val());
        //            this.update_sostav_outer_ways_and_way_of_station(id, -1, null); // Обновим составы в прибытии и пути по выбранной станции

        //        }.bind(this),
        //        update: null,
        //        close: null,
        //        change: null,
        //        add_validation: null,
        //        edit_validation: null,
        //        default: -1,
        //        row: 1,
        //        col: 1,
        //        col_prefix: 'md',
        //        col_size: 12,
        //    };
        //    var fields = [];
        //    fields.push(fl_station);
        //    //// Инициализация формы
        //    this.form_setup_from.init({
        //        alert: this.alert_from,
        //        mode: 'edit', // Указали что будем использовать форму типа edit
        //        fields: fields,
        //        mb: 2,
        //        id: null,
        //        cl_form: '',
        //        validation: true,
        //        fn_validation: function (result) {
        //            // Валидация успешна
        //            if (result && result.valid) {
        //            }
        //        }.bind(this),
        //    });
        //    // 
        //    // Отображение формы
        //    this.$setup_from.append(this.form_setup_from.$form_edit);
        //    var sel_sostav_from = 'table-sfrom-' + this.selector;
        //    var sel_wagon_from = 'table-wfrom-' + this.selector;
        //    // Создадим таблицу вангонов на пути отправки
        //    var $div_table_sfrom = $('<div></div>', {
        //        'id': sel_sostav_from,
        //    });
        //    // Создадим таблицу вангонов на пути отправки
        //    var $div_table_wfrom = $('<div></div>', {
        //        'id': sel_wagon_from,
        //    });
        //    //------- FROM SOSTAV -----------------------------------
        //    if ($div_table_sfrom && $div_table_sfrom.length > 0) {
        //        this.$table_from.append($div_table_sfrom);
        //        this.tab_sostav_from = new TSOW('div#' + sel_sostav_from); // Создадим экземпляр составы на подходах
        //        this.tab_sostav_from.init({
        //            alert: this.alert_from,
        //            type_report: 'arrival-sostav-outer-way',  // Прибвыающие составы на внешнем пути
        //            ids_wsd: this.ids_wsd,
        //            fn_select_sostav: function (row) {
        //                this.id_outer_way = null;   // id перегона
        //                this.station_from = null; // Станция отправления
        //                // получим строку состава
        //                if (row && row.length > 0) {
        //                    this.id_outer_way = row[0].id_outer_way;   // id перегона
        //                    this.station_from = row[0]['from_station_abbr_' + App.Lang]; // Станция отправления
        //                    // обновим вагоны по выбранному сотаву
        //                    this.load_wagons_of_sostav(row[0].outer_way_num_sostav);
        //                };
        //            }.bind(this),
        //        }, function () {

        //        });
        //    };
        //    //------- FROM WAGON -----------------------------------
        //    if ($div_table_wfrom && $div_table_wfrom.length > 0) {
        //        this.$table_from.append($div_table_wfrom);
        //        this.tab_wagon_from = new TCOW('div#' + sel_wagon_from); // Создадим экземпляр составы на подходах
        //        this.tab_wagon_from.init({
        //            alert: this.alert_from,
        //            type_report: 'arrival-wagons-outer-way',  // Прибвыающие составы на внешнем пути
        //            ids_wsd: this.ids_wsd,
        //            // инициализируем кнопки
        //            buttons: [
        //                {
        //                    name: 'add_wagons_send',
        //                    action: function (e, dt, node, config) {
        //                        if (this.id_way >= 0) {
        //                            LockScreen(langView('vac_mess_create_sostav', App.Langs));
        //                            // Выполнить операцию добавить вагоны
        //                            wagons_add_async.call(this, this.tab_wagon_from.select_rows_wagons, 1, function (position) {
        //                                this.tab_wagon_from.select_rows_wagons = null;
        //                                this.view_wagons();
        //                            }.bind(this));
        //                        } else {
        //                            this.form_setup_from.out_warning(langView('vac_mess_not_select_way_on', App.Langs));
        //                        }

        //                    }.bind(this)
        //                },
        //            ],
        //            fn_change_data: function (wagons) {
        //                //this.wagons = wagons;
        //                //this.tab_cars_on.view(this.wagons.filter(function (i) { return i.position_new !== null; }), null);
        //            }.bind(this),
        //        }, function () {

        //        });
        //    };
        //    //--------------------ФОРМА ON ---------------------------
        //    // Создадим форму выбора пути прибытия (this.$setup_on)
        //    this.form_setup_on = new FIF();
        //    var fl_way_on = {
        //        field: 'id_way',
        //        type: 'int',
        //        add: 'select',
        //        edit: null,
        //        name: 'way',
        //        prefix: 'sm',
        //        label: langView('vac_title_label_way_on', App.Langs),
        //        placeholder: langView('vac_title_placeholder_way_on', App.Langs),
        //        maxlength: null,
        //        required: true,
        //        control: null,
        //        list: this.get_list_way(-1),
        //        select: function (e, ui) {
        //            event.preventDefault();
        //            // Обработать выбор
        //            var id = Number($(e.currentTarget).val());
        //            this.load_wagons_of_way(id);
        //        }.bind(this),
        //        update: null,
        //        close: null,
        //        change: null,
        //        add_validation: null,
        //        edit_validation: null,
        //        default: -1,
        //        row: 2,
        //        col: 1,
        //        col_prefix: 'md',
        //        col_size: 12,
        //    };
        //    var fl_locomotive1 = {
        //        field: 'locomotive1',
        //        type: 'string',
        //        add: 'autocomplete',
        //        edit: null,
        //        name: 'locomotive1',
        //        prefix: 'sm',
        //        label: langView('vac_title_label_locomotive1', App.Langs),
        //        placeholder: langView('vac_title_placeholder_locomotive', App.Langs),
        //        maxlength: 20,
        //        required: true,
        //        control: null,
        //        list: this.list_locomotive,
        //        select: null,
        //        //select: function (e, ui) {
        //        //    event.preventDefault();
        //        //    // Обработать выбор
        //        //    var id = Number($(e.currentTarget).val());
        //        //    //view_wagons_from_way(id);
        //        //}.bind(this),
        //        update: null,
        //        close: null,
        //        change: null,
        //        add_validation: null,
        //        edit_validation: null,
        //        default: -1,
        //        row: 3,
        //        col: 1,
        //        col_prefix: 'md',
        //        col_size: 6,
        //    };
        //    var fl_locomotive2 = {
        //        field: 'locomotive2',
        //        type: 'string',
        //        add: 'autocomplete',
        //        edit: null,
        //        name: 'locomotive2',
        //        prefix: 'sm',
        //        label: langView('vac_title_label_locomotive2', App.Langs),
        //        placeholder: langView('vac_title_placeholder_locomotive', App.Langs),
        //        maxlength: 20,
        //        required: false,
        //        control: null,
        //        list: this.list_locomotive,
        //        select: null,
        //        update: null,
        //        close: null,
        //        change: null,
        //        add_validation: null,
        //        edit_validation: null,
        //        default: -1,
        //        row: 3,
        //        col: 2,
        //        col_prefix: 'md',
        //        col_size: 6,
        //    };
        //    var fl_time_aplly = {
        //        field: 'time_aplly',
        //        type: 'datetime',
        //        add: 'datetime',
        //        edit: null,
        //        name: 'time_aplly',
        //        prefix: 'sm',
        //        label: langView('vac_title_time_aplly', App.Langs),
        //        placeholder: langView('vac_title_placeholder_time_aplly', App.Langs),
        //        maxlength: null,
        //        required: true,
        //        control: null,
        //        list: null,
        //        select: null,
        //        update: null,
        //        close: function (datetime) {

        //        },
        //        change: null,
        //        add_validation: null,
        //        edit_validation: null,
        //        default: null,
        //        row: 4,
        //        col: 1,
        //        col_prefix: 'md',
        //        col_size: 6,
        //    };
        //    var fields_on = [];
        //    fields_on.push(fl_way_on);
        //    fields_on.push(fl_locomotive1);
        //    fields_on.push(fl_locomotive2);
        //    fields_on.push(fl_time_aplly);
        //    //// Инициализация формы
        //    this.form_setup_on.init({
        //        alert: this.alert_on,
        //        mode: 'add', // Указали что будем использовать форму типа add
        //        fields: fields_on,
        //        mb: 2,
        //        id: null,
        //        cl_form: '',
        //        validation: true,
        //        fn_validation: function (result) {
        //            // Валидация успешна
        //            if (result && result.valid) {
        //                // Дополнительная проверка
        //                var valid = this.validation(result);
        //                if (valid) {
        //                    var wagons = this.wagons.filter(function (i) { return i.position_new !== null && i.id_wim_arrival !== null; });// получить вагоны
        //                    this.modal_confirm_form.view(langView('vac_title_form_apply', App.Langs), 'Выполнить операцию "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР" в количестве: ' + (wagons ? wagons.length : 0) + ' (ваг.), станция отправки: ' + this.station_from + '?', function (res) {
        //                        if (res) {
        //                            // Проверим наличие вагонов 
        //                            var list_wagons = [];
        //                            if (wagons && wagons.length > 0) {
        //                                // Получим перечень вагонов и новую позицию
        //                                $.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
        //                                    list_wagons.push({ wir_id: el.wir_id, position: el.position_new })
        //                                }.bind(this));
        //                                // Сформируем операцию
        //                                var operation = {
        //                                    id_outer_way: this.id_outer_way,
        //                                    wagons: list_wagons,
        //                                    id_way_on: result.new.id_way,
        //                                    head: this.head,
        //                                    lead_time: result.new.time_aplly,
        //                                    locomotive1: result.new.locomotive1,
        //                                    locomotive2: result.new.locomotive2,
        //                                    user: App.User_Name
        //                                };
        //                                this.apply(operation);
        //                            }
        //                        } else {
        //                            // Отмена
        //                            this.form_setup_on.out_warning(langView('vac_mess_cancel_operation', App.Langs));
        //                        }
        //                    }.bind(this));
        //                }
        //            }
        //        }.bind(this),
        //        button_add_ok: {
        //            title: langView('vac_title_add_ok', App.Langs),
        //            click: function (event) {
        //                event.preventDefault();
        //                this.form_setup_on.$form_add.submit();
        //            }.bind(this),
        //        },
        //    });
        //    // Отображение формы
        //    this.$setup_on.append(this.form_setup_on.$form_add);

        //    // Создадим таблицу вангонов собранных для отправки
        //    var $div_table_on = $('<div></div>', {
        //        'id': 'table-on-' + this.selector,
        //    });
        //    if ($div_table_on && $div_table_on.length > 0) {
        //        this.$table_on.append($div_table_on);
        //        this.tab_cars_on = new TCWay('div#table-on-' + this.selector);
        //        this.tab_cars_on.init({
        //            type_report: 3,
        //            alert: this.alert_on,
        //            // инициализируем кнопки
        //            buttons: [
        //                {
        //                    name: 'del_wagons_send',
        //                    action: function (e, dt, node, config) {
        //                        LockScreen(langView('vac_mess_clear_sostav', App.Langs));
        //                        var base = this;
        //                        // Убрать вагоны
        //                        wagons_del_async.call(this, this.tab_cars_on.select_rows_wagons, function () {
        //                            // Авто нумерация
        //                            // Выполнить операцию перенумеровать (добавить 0 - вагонов)
        //                            wagons_add_async.call(base, [], 1, function (position) {
        //                                this.tab_cars_on.select_rows_wagons = null;
        //                                this.view_wagons();
        //                            }.bind(base));
        //                        });
        //                    }.bind(this),
        //                },
        //                {
        //                    name: 'head_tail',
        //                    action: function (e, dt, node, config) {
        //                        LockScreen(langView('vac_mess_reverse_head_sostav', App.Langs));
        //                        this.head = !this.head;
        //                        // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
        //                        wagons_add_async.call(this, [], 1, function (position) {
        //                            this.view_wagons();
        //                        }.bind(this));
        //                    }.bind(this),
        //                },
        //                {
        //                    name: 'reverse_num_wagon',
        //                    action: function (e, dt, node, config) {
        //                        LockScreen(langView('vac_mess_reverse_sostav', App.Langs));
        //                        wagons_reverse_enumerate_async.call(this, function () {
        //                            // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
        //                            wagons_add_async.call(this, [], 1, function (position) {
        //                                this.view_wagons();
        //                            }.bind(this));
        //                        }.bind(this));
        //                    }.bind(this),
        //                },
        //            ],
        //            fn_change_data: function (wagons) {

        //            }.bind(this),
        //        }, function () {

        //        });
        //    };

        //    //----------------------------------
        //    if (typeof fn_init_ok === 'function') {
        //        fn_init_ok(this.result_init);
        //    }
        //    //----------------------------------
        //}.bind(this));
    };
    // Показать данные 
    view_op_arrival_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        //LockScreen(langView('vac_mess_load_operation', App.Langs));
        //this.id_station = -1;
        //this.id_way = -1;
        //if (id_way) {
        //    var way = this.ids_dir.getWays_Of_ID(id_way);
        //    if (way) {
        //        this.id_station = way.id_station;
        //        // Отобразим выбор на панеле
        //        this.form_setup_from.view_edit({ id_station: this.id_station });
        //        this.id_way = id_way;
        //    }
        //};
        //this.update_sostav_outer_ways_and_way_of_station(this.id_station, this.id_way, this.num_sostav);
    };

    view_op_arrival_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_arrival_cars = view_op_arrival_cars;

    window.App = App;

})(window);