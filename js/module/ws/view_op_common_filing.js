/* ===============================================
-= Модуль общая библиотека "ПОДАЧИ" =-
  + js/view/shared/common.js
==================================================*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;


    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var operation_load_uz = 15; // TODO: загружать 
    var operation_load_vz = 16; // TODO: загружать 


    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vopcf_card_header_filing': 'ПОДАЧИ ПО СТАНЦИИ',

            'vopcf_card_header_filing_wagons': 'ВАГОНЫ В ПОДАЧИ',
            'vopcf_card_header_from_way': 'ВАГОНЫ НА ПУТИ',
            'vopcf_mess_init_module': 'Инициализация модуля view_op_common_filing',

            'vopcf_title_period_1': 'ЖД сутки',
            'vopcf_title_period_2': 'Календарные сутки',
            'vopcf_title_period_3': 'От начала месяца',

            'vopcf_title_button_new_period': 'Обновить данные, применить новый период выборки.',

            'vopcf_title_type_filing_0': '',
            'vopcf_title_type_filing_1': 'выгрузки',
            'vopcf_title_type_filing_2': 'погрузки',

            'vopcf_title_operation_type_filing_0': '',
            'vopcf_title_operation_type_filing_1': '"ВЫГРУЗКИ ВАГОНОВ"',
            'vopcf_title_operation_type_filing_2': '"ПОГРУЗКИ ВАГОНОВ"',

            'vopcf_title_label_period': 'Выборка за:',
            'vopcf_text_label_period': 'Выборка за указанный период',
            'vopcf_title_time_period_start': 'С даты',
            'vopcf_text_time_period_start': 'Выборка с указаной даты',
            'vopcf_title_placeholder_time_period_start': 'Время начала',
            'vopcf_title_label_station': 'Станция {0}:',
            'vopcf_text_label_station': 'Выберите станцию {0}...',

            'vopcf_title_label_way_from': 'Путь {0}:',
            'vopcf_text_label_way_from': 'Выберите путь {0}...',

            'vopcf_confirm_title': 'Внимание!',
            'vopcf_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию {0}? Все вагоны для подачи в количестве {1} будут сброшены! ',
            'vopcf_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь для подачи {0}? Все выбранные для подачи в количестве {1} будут сброшены! ',

            'vopcf_mess_load_wagons': 'Загружаю вагоны на пути...',
            'vopcf_mess_load_filing_wagon': 'Загружаю вагоны подач...',

            'vopcf_mess_eror_add_new_filing': 'Выбранно № {0} вагонов, не могу сформировать новую подачу (ошибка определения станции {1}, парка {2}, пути {3})',
            'vopcf_mess_eror_new_filing_not_wagon': 'В новой подаче отсутствуют вагоны',

            'vopcf_title_status_null': 'Неопределен?',
            'vopcf_title_status_0': 'Без операции',
            'vopcf_title_status_1': 'Операция начата',
            'vopcf_title_status_2': 'Операция завершена',
            'vopcf_title_status_3': 'Вагон покинул путь',

            'vopcf_mess_create_filing': 'Формирую "черновик" подачи, переношу вагоны...',
            'vopcf_mess_create_filing_delete_wagon': 'Формирую "черновик" подачи, удаляю вагоны...',
            'vopcf_mess_add_filing': 'Переношу вагоны в существующую подачу.',
            'vopcf_mess_del_filing': 'Удаляю вагоны из существующей подачи.',
            'vopcf_mess_clear_draft': 'Удаляю черновик подачи.',

            'vopcf_mess_run_operation_add_filing': 'Выполняю операцию создать подачу для {0}',
            'vopcf_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',
            'vopcf_mess_ok_operation_add_filing': 'Подача создана, определено {0} (ваг.)',
            'vopcf_mess_error_operation_run_add_filing': 'При создании подачи для {0} произошла ошибка, код ошибки: {1}',
            'vopcf_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            'vopcf_mess_error_operation_run_wagon_filing': 'При выполнении операции с вагонами подачи, произошла ошибка, код ошибки: {0}',

            'vopcf_mess_run_operation_update_filing': 'Выполняю операцию править подачу {0}',
            'vopcf_mess_run_operation_update_operation_filing': 'Выполняю операцию править операции {0} в подаче.',
            'vopcf_mess_run_operation_add_wagon_filing': 'Выполняю операцию добавить вагон(ы) в подачу.',
            'vopcf_mess_run_operation_del_wagon_filing': 'Выполняю операцию убрать вагон(ы) из подачи.',

            'vopcf_mess_not_select_wagon_from': 'Выберите вагоны для формирования подачи!',
            'vopcf_mess_not_select_way_from': 'Выберите путь с которого будет сформирована подача!',
            'vopcf_mess_not_select_wagon_return': 'Выберите вагоны которые нужно убрать из подачи!',
            //'vopcf_mess_not_select_way_return': 'Выберите путь на который будут возвращены вагоны!',

            'vopcf_mess_ok_operation_update_filing': 'Обновлена информация в подаче [{1}].',
            'vopcf_mess_ok_operation_update_operation_filing': 'Обновлена операция по вагонам {0} шт. в подаче [{1}].',
            'vopcf_mess_ok_operation_add_wagon_filing': 'Вагоны в количестве {0} шт. добавлены в подачу [{1}].',
            'vopcf_mess_ok_operation_del_wagon_filing': 'Вагоны в количестве {0} шт. удалены из подачи [{1}].',

            'vopcf_title_form_apply': 'Править подачу',
            'vopcf_mess_warning_wagon_ban_select_status': 'Вагон № {0} для выбора заблокирован (статус вагона :[{1}], отличается от статуса выбранных ранее вагонов :[{2}])',
            'vopcf_mess_warning_wagon_ban_error_operation': 'Вагон № {0} для выбора заблокирован (операция вагона отличается от операций выбранных ранее вагонов!)',
            'vopcf_mess_warning_wagon_ban_error_status': 'Вагон № {0} для выбора заблокирован (статус вагона отличается от статусов выбранных ранее вагонов!)',
            'vopcf_mess_warning_wagon_ban_error_doc_received': 'Вагон № {0} для выбора заблокирован (Отличаются даты получения документа!)',

            'vopcf_mess_warning_wagon_ban_busy': 'Вагон № {0} для операций заблокирован (предъявлен,незакрытая подача, незаконченая операция...)',
            'vopcf_mess_warning_wagon_ban_exists': 'Вагон № {0} для операций заблокирован (вагон уже пренадлежит выбранной подаче :[{1}])',
            //'vopcf_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу подготовленому к отправке, который имеет статус :[{1}])',
            'vopcf_mess_warning_wagon_ban_filing_way': 'Вагон № {0} для операций заблокирован (вагон уже выбран для подачи)',
            'vopcf_mess_warning_wagon_current_load_busy': 'Вагон № {0} для операций погрузка заблокирован (несоответствие статуса {1})',
            'vopcf_mess_warning_wagon_current_unload_busy': 'Вагон № {0} для операций выгрузка заблокирован (несоответствие статуса {1} или нет даты получения документа {2})',
            //'vopcf_mess_warning_wagon_ban_filing_load_doc': 'Вагон № {0} для операций заблокирован (вагон погружен, но документ не получен!)',
            'vopcf_mess_warning_wagon_ban_new_filing': 'Запрет! На пути :[{0}] не закрытая подача [{1}]. Операция создания новой - невозможна!',
            'vopcf_mess_warning_change_filing_ban': 'Смена подачи недопустима завершите операцию с "Черновиком"',

            'vopcf_confirm_mess_apply_add_wagon_filing': 'Добавить {0} вагона(ов) в существующую подачу {1}.',
            'vopcf_confirm_mess_apply_delete_wagon_filing': 'Удалить {0} вагона(ов) из существующей подачи {1}.',
            'vopcf_confirm_mess_apply_delete_wagon_warning_close': ' ВНИМАНИЕ! подача будет закрыта автоматически (все вагоны в подаче имеют статус завершенной операции).',

            'vopcf_mess_cancel_operation_mode_add_wagon': 'Отмена операции добавления вагонов в подачу для "ВЫГРУЗКИ ВАГОНОВ"',
            'vopcf_mess_cancel_operation_mode_delete_wagon': 'Отмена операции удаления вагонов из подачи "ВЫГРУЗКИ ВАГОНОВ"',
            'vopcf_mess_cancel_operation_mode_clear_draft': 'Отмена операции "Удалить черновик подачи"',

            'vopcf_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути [{0}]?.',



        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    //var FE = App.form_element;
    //var MCF = App.modal_confirm_form;

    var ALERT = App.alert_form;
    var FD = App.form_dialog;

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var TWS = App.table_ws;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_op_common_filing() {
        //this.fe_ui = new FE();
    }
    //------------------------------- ИНИЦИАЛИЗАЦИЯ И ОТОБРАЖЕНИЕ ----------------------------------
    // Инициализация
    view_op_common_filing.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_op_common_filing');
        LockScreen(langView('vopcf_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            type_filing: 0,
            wagon_operation: 0,
            view_com: null,                         // Ссылка на общюю библиотеку операций (view_op_common)
            api_dir: null,                          // сылки на библиотеки api dir
            api_wsd: null,                          // сылки на библиотеки api wsd
            fn_start_init: null,                    // Объявление переменых
            fn_load_db_operation: null,             // Загрузка дополнительных библиотек
            fn_after_loading_init: null,            // Инициализация переменых после загрузки всех библиотек
            fn_init_form_filing_setup: null,        // Инициализация окна выбора периода и станции операции
            fn_init_form_filing_wagons_setup: null, // Инициализация окна правки и создания подачи и операции
            fn_init_form_from_setup: null,          // Инициализация окна вагонов на пути операции
            fn_init: null,                          // Окончание инициализации
            fn_get_sostav_filing: null,             // Получение строки подача из списка вагонов (в зависимости от операции)
            fn_get_filing_wagons: null,             // Получение строки вагона в подаче (в зависимости от операции)
            fn_view_open: null,                     // Открытие панели (дополнительная обработка перед открытием выбранной панели)
            fn_view_setup_filing: null,             // Отображение элементов окна правки и создания подачи и операции (в зависимости от операции)
            fn_validation: null,                    // Валидация правки подачи и операций над вагонами (в зависимости от операции)
            fn_apply_add_filing: null,              // Выполнить операцию создать подачу
            fn_apply_update_filing: null,           // Выполнить операцию править подачу 
            fn_apply_update_operation_filing: null, // Выполнить операцию открыть-закрыть операции над вагонами (+ админка)
            fn_apply_add_wagon_filing: null,        // Выполнить операцию добавить в подачу вагоны
            fn_apply_del_wagon_filing: null,        // Выполнить операцию убрать вагоны из подачи
            fn_apply_update: null,                  // Выполнить update таблиц после выполнения операций над вагонами или подачи
            fn_db_update: null,                     // Выполнить обновление баз данных если были изменения
            fn_close: null,                         // ? пока неработает
        }, options);
        //
        // Создадим ссылку на модуль работы с базой данных
        this.view_com = this.settings.view_com ? this.settings.view_com : null;  // Определим ссылку на базовую библиотеку api
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });

        this.type_filing = this.settings.type_filing;   // Тип подачи
        this.type = 1;                                  // Тип выборки времени
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        this.id_station_unload = -1;      // Значения по умолчанию
        this.id_way_unload = -1;

        this.id_filing = null;          // id подачи (изменяется при выборе подачи)
        this.id_filing_old = null;      // id подачи (изменяется при выборе подачи)
        this.id_way_filing = null;      // id пути (изменяется при выборе подачи)
        this.station_from = -1;         // станция подачи (изменяется при выборе подачи)
        this.division_from = -1;        // подразделение подачи (изменяется при выборе подачи)
        this.num_filing = null;         // номер накладной подачи (изменяется при выборе подачи)
        this.vesg_filing = null;        // вес всей подачи (изменяется при выборе подачи)
        this.doc_received_filing = null;// дата получения документа (изменяется при выборе подачи)

        this.create_filing = null;      // время создания подачи (изменяется при выборе подачи)
        this.close_filing = null;       // время закрытия подачи (изменяется при выборе подачи)
        this.fw_status = null;          // Статус выбраноых вагонов в подаче (0-null, 1-начата, 2-закрыта, 3-закрыта и вагон уже нестоит)

        this.stations = [];             // Список станций (полный)
        this.ways = [];                 // Список путей (полный)
        this.park_ways = [];            // Список парков (полный)
        this.divisions = [];            // Список подразделений (полный)
        this.wagon_operations = [];     // Список операций над вагонами (полный)


        this.list_period = [];          // Список периодов (value\text\desabled)
        this.list_station = [];         // Список станций всех (value\text\desabled)
        this.list_way = [];             // Список путей (value\text\desabled)
        this.list_devision = [];        // Список подразделений АМКР (value\text\desabled)
        this.list_amkr_cargo = [];      // Список грузов АМКР (value\text\desabled)


        this.wagons = [];               // Список вагонов на пути отправки (рабочий)
        this.wagons_filing = [];        // Список вагонов подач (рабочий)
        this.sostav_filing = [];        // Список подач (рабочий)
        this.filing_wagons = [];        // Список вагонов в выбранной подаче (рабочий)

        // Главный Alert
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
        // Создать макет панели (Область подачи)
        this.card_filing = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopcf_card_header_filing', App.Langs),
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
        this.filing_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.filing_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_filing = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.filing_table.$html.append(this.alert_filing.$html);
        this.filing_alert = new ALERT(this.alert_filing.$html);
        row.$html.append(this.filing_setup.$html).append(this.filing_table.$html);
        this.card_filing.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_filing.$html);
        // Создать макет панели (Область вагоны подачи - детально)
        this.card_filing_wagons = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopcf_card_header_filing_wagons', App.Langs),
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
        this.filing_wagons_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.filing_wagons_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing_wagons
        this.alert_filing_wagons = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.filing_wagons_table.$html.append(this.alert_filing_wagons.$html);
        this.filing_wagons_alert = new ALERT(this.alert_filing_wagons.$html);
        //
        row.$html.append(this.filing_wagons_setup.$html).append(this.filing_wagons_table.$html);
        this.card_filing_wagons.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_filing_wagons.$html);
        //-- Создать макет панели (Область вагонов на пути)
        this.card_from_way = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vopcf_card_header_from_way', App.Langs),
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
        this.from_way_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 2,
        });
        this.from_way_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 10,
            class: 'rounded border border-secondary'
        });
        // Alert_from_way
        this.alert_from_way = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.from_way_table.$html.append(this.alert_from_way.$html);
        this.from_way_alert = new ALERT(this.alert_from_way.$html);
        row.$html.append(this.from_way_setup.$html).append(this.from_way_table.$html);
        this.card_from_way.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_from_way.$html);
        // Инициализация вначале 
        if (typeof this.settings.fn_start_init === 'function') {
            this.settings.fn_start_init.call(this);
        }

        var pr_load = 2;
        // Выход из загрузок
        var out_load = function (process) {
            if (pr_load === 0) {
                //==============================================================
                // Инициализация после загрузки библиотек

                var process = 7;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        // На проверку окончания инициализации
                        //----------------------------------
                        //if (fn_init === 'function') {
                        //    console.log('Close view_op_common_filing');
                        //    fn_init(this.result_init);
                        //}
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_op_common_filing');

                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия 
                this.stations = this.view_com.api_dir.getAllStation();
                this.ways = this.view_com.api_dir.getAllWays();
                this.park_ways = this.view_com.api_dir.getAllParkWays();
                this.divisions = this.view_com.api_dir.getAllDivisions();
                this.wagon_operations = this.view_com.api_dir.getAllWagonOperations();
                // сформируем периоды { value: , text: , disabled: false }
                this.list_period = [];
                this.list_period.push({ value: 1, text: langView('vopcf_title_period_1', App.Langs), disabled: false });
                this.list_period.push({ value: 2, text: langView('vopcf_title_period_2', App.Langs), disabled: false });
                this.list_period.push({ value: 3, text: langView('vopcf_title_period_3', App.Langs), disabled: false });

                // Создадим список станций по которым есть выход в цеха
                this.list_station = [];
                $.each(this.ways, function (i, el) {
                    if (el.idDevision !== null && el.wayDelete === null && el.wayClose === null) {
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

                this.list_devision = this.view_com.api_dir.getListValueTextCodeAbbrDivisions();
                //this.list_status_load = this.view_com.api_dir.getListValueTextWagonLoadingStatus();
                this.list_station_amkr_on = this.view_com.api_dir.getListValueTextStation(function (i) {
                    return !i.stationUz && i.stationDelete === null;
                }.bind(this));

                if (typeof this.settings.fn_after_loading_init === 'function') {
                    this.settings.fn_after_loading_init.call(this, function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this));
                } else {
                    process--;
                    out_init(process);
                }
                // Инициализация окна выбора периода и станции отчета
                if (typeof this.settings.fn_init_form_filing_setup === 'function') {
                    this.settings.fn_init_form_filing_setup.call(this, function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this));
                } else {
                    if (true) {
                        //-------------------------------------------------------------------
                        // Создадим форму (this.filing_setup)- по умолчанию
                        this.form_filing_setup = new FD();
                        // Создать макет панели
                        var objs_filing_setup = [];
                        var bt_new_period = {
                            obj: 'bs_button',
                            options: {
                                id: 'new-period',
                                name: 'new-period',
                                class: null,
                                fsize: 'sm',
                                color: 'success',
                                text: null,
                                title: langView('vopcf_title_button_new_period', App.Langs),
                                icon_fa_left: 'fa-solid fa-arrows-rotate',//<i class="fa-solid fa-arrows-rotate"></i>
                                icon_fa_right: null,
                                fn_click: function (event) {
                                    event.preventDefault();
                                    // Очистить сообщения и форму
                                    this.clear_all();
                                    this.view(this.id_way_unload);
                                }.bind(this),
                            }
                        };
                        var form_select_period = {
                            obj: 'bs_form_select',
                            options: {
                                validation_group: 'common_filing',
                                id: 'id_period',
                                name: 'id_period',
                                label: langView('vopcf_title_label_period', App.Langs),
                                element_fsize: 'sm',
                                element_class: null,
                                element_value: null,
                                element_multiple: false,
                                element_title: null,
                                element_required: true,
                                element_readonly: false,
                                element_size: null,
                                element_options: {
                                    data: this.list_period,
                                    default: this.type,
                                    fn_change: function (e) {
                                        e.preventDefault();
                                        // Обработать выбор
                                        var id = Number($(e.currentTarget).val());
                                        if (id !== this.type) {
                                            this.type = id;

                                        }
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
                                form_text: langView('vopcf_text_label_period', App.Langs),
                                form_text_class: null,
                            },
                            childs: []
                        };
                        var form_input_datetime_time_period_start = {
                            obj: 'bs_form_input_datetime',
                            options: {
                                validation_group: 'common_filing',
                                id: 'time_period_start',
                                name: 'time_period_start',
                                label: langView('vopcf_title_time_period_start', App.Langs),
                                element_type: 'date',
                                element_fsize: 'sm',
                                element_class: null,
                                element_value: null,
                                element_title: null,
                                element_placeholder: langView('vopcf_title_placeholder_time_period_start', App.Langs),
                                element_required: true,
                                element_maxlength: null,
                                element_pattern: null,
                                element_readonly: false,
                                element_min: null,
                                element_max: null,
                                element_step: null,
                                element_options: {
                                    default: moment(),
                                    format: 'date',
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
                                group_append_objs: [bt_new_period],
                                form_text: langView('vopcf_text_time_period_start', App.Langs),
                                form_text_class: null,
                            },
                            childs: []
                        };
                        var form_select_station = {
                            obj: 'bs_form_select',
                            options: {
                                validation_group: 'common_filing',
                                id: 'id_station_unload',
                                name: 'id_station_unload',
                                label: langView('vopcf_title_label_station', App.Langs).format(langView('vopcf_title_type_filing_' + this.type_filing, App.Langs)),
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
                                    default: this.id_station_unload,
                                    fn_change: function (e) {
                                        e.preventDefault();
                                        // Обработать выбор
                                        var id = Number($(e.currentTarget).val());
                                        this.id_filing_old = this.id_filing;
                                        this.id_filing = null;
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
                                form_text: langView('vopcf_text_label_station', App.Langs).format(langView('vopcf_title_type_filing_' + this.type_filing, App.Langs)),
                                form_text_class: null,
                            },
                            childs: []
                        };
                        objs_filing_setup.push(form_select_period);
                        objs_filing_setup.push(form_input_datetime_time_period_start);
                        objs_filing_setup.push(form_select_station);
                        this.form_filing_setup.init({
                            alert: this.main_alert,
                            objs: objs_filing_setup,
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
                                this.filing_setup.$html.append(this.form_filing_setup.$form);
                                this.form_filing_setup.el.select_id_period.val(this.type); // выставим отчет по умолчанию
                                // На проверку окончания инициализации
                                process--;
                                //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                                out_init(process);
                            }.bind(this),
                        });
                    } else {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }
                }

                //Создадим таблицы(this.filing_table)
                var row_list_filing = new this.view_com.fe_ui.bs_row({ id: 'op-unlc-list-filing_' + this.type_filing, class: 'pt-2' });
                this.filing_table.$html.append(row_list_filing.$html);

                this["tlf_" + this.type_filing] = new TWS('div#op-unlc-list-filing_' + this.type_filing);
                this["tlf_" + this.type_filing].init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'list_filing',
                    setup_buttons: [
                        {
                            name: 'clear_draft',
                            action: function (e, dt, node, config) {
                                this["tlf_" + this.type_filing].tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        }
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_unloading_cars] [tlf_unlc]process: ' + process);
                        out_init(process); this.division_from
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.filing_alert.clear_message();
                        this.form_filing_wagons_setup.validation_common_filing_wagons.clear_all();
                        if (rowData && rowData.length > 0) {
                            var wagons_filing_add = this.wagons.filter(function (i) { return i.id_wir_unload !== null; });

                            if (rowData[0].idFiling !== 0 && wagons_filing_add.length > 0) {
                                e.preventDefault();
                                this.filing_alert.out_warning_message(langView('vopcf_mess_warning_change_filing_ban', App.Langs));
                            }
                        }
                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        this.id_filing = null;
                        this.id_way_filing = this.id_way_unload; // По умолчанию текущее
                        this.station_from = -1;
                        this.division_from = -1;
                        this.num_filing = null;         // номер накладной подачи (изменяется при выборе подачи)
                        this.vesg_filing = null;        // вес всей подачи (изменяется при выборе подачи)
                        this.doc_received_filing = null;// дата получения документа (изменяется при выборе подачи)
                        this.status_load = -1;
                        this.create_filing = null;
                        this.close_filing = null;
                        this.fw_status = null; // сбросим статус выбора вагонов
                        var bts = this["tlf_" + this.type_filing].tab_com.obj_t_report.buttons([5]);
                        bts.disable();
                        if (type === "select") {

                            if (rows != null && rows.length > 0) {
                                this.id_filing = rows[0].idFiling;
                                if (this.id_filing === 0) bts.enable(); // активируем очистить черновик
                                this.station_from = rows[0].filingIdStation;
                                this.division_from = rows[0].filingDivisionIdDivision;
                                this.num_filing = rows[0].numFiling;
                                this.vesg_filing = rows[0].vesgFiling;
                                this.doc_received_filing = rows[0].docReceivedFiling;
                                this.id_way_filing = rows[0].filingIdWay;
                                this.create_filing = rows[0].createFiling;
                                this.close_filing = rows[0].closeFiling;
                            }

                            var out_pr2 = function () {
                                // Показать вагоны на пути формирования подачи
                                this.view_wagons_from();
                                // Убрать выбранные вагоны по которам совподают подачи
                                this["twwf_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data) {
                                    return data.idFiling === this.id_filing;
                                }.bind(this)).deselect();
                                LockScreenOff();

                            }.bind(this);
                            // Обновим пути отправки 1 поток
                            this.update_from_way(this.id_way_filing,
                                function (upd) {
                                    // Обновим вагоны подачи
                                    this.view_wagons_of_filing(this.id_filing,
                                        function (wagons) {
                                            out_pr2();
                                        }.bind(this));

                                }.bind(this));

                        } else {
                            this.view_wagons_of_filing(this.id_filing,
                                function (wagons) {
                                    LockScreenOff();
                                }.bind(this));
                        }
                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            this.view_filing(this.id_filing);
                            LockScreenOff();
                        }
                        if (name === 'clear_draft') {
                            // Проверка это черновик
                            if (this.id_filing === 0) {
                                this.from_way_alert.clear_message();
                                this.view_com.mcf_lg.open(
                                    langView('vopcf_title_form_apply', App.Langs),
                                    langView('vopcf_confirm_mess_apply_clear_draft', App.Langs).format(this.form_from_setup.el.select_id_way_unload.text()),
                                    function () {
                                        LockScreen(langView('vopcf_mess_clear_draft', App.Langs));
                                        // Выполнить операцию добавить вагоны
                                        $.each(this.wagons, function (i, el) {
                                            el['id_wir_unload'] = null;
                                        }.bind(this));
                                        this.id_filing = null;
                                        this.view_wagons(this.id_filing); // Обновить вагоны на пути приема
                                        LockScreenOff();

                                    }.bind(this),
                                    function () {
                                        this.form_filing_setup.validation_common_filing.out_warning_message(langView('vopcf_mess_cancel_operation_mode_clear_draft', App.Langs));
                                    }.bind(this)
                                );
                            }
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {
                    }.bind(this),
                });

                //-------------------------------------------------------------------
                // Создадим форму (this.filing_wagons_setup)
                if (typeof this.settings.fn_init_form_filing_wagons_setup === 'function') {
                    this.settings.fn_init_form_filing_wagons_setup.call(this, function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this));
                } else {
                    // На проверку окончания инициализации
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                    out_init(process);
                }
                // Создадим таблицы (this.filing_wagons_table)
                var row_filing_wagons = new this.view_com.fe_ui.bs_row({ id: 'op-unlc-filing-wagons_' + this.type_filing, class: 'pt-2' });
                this.filing_wagons_table.$html.append(row_filing_wagons.$html);

                this["tfw_" + this.type_filing] = new TWS('div#op-unlc-filing-wagons_' + this.type_filing);
                this["tfw_" + this.type_filing].init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'filing_wagons_' + this.type_filing,
                    setup_buttons: [
                        {
                            name: 'select_all',
                            action: function () {
                                var sel_rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                                var id_operation = sel_rows !== null && sel_rows.length > 0 ? sel_rows[0].currentIdOperation : null;
                                var data_doc = sel_rows !== null && sel_rows.length > 0 ? sel_rows[0].moveCargoDocReceived : null;
                                var id_loading = sel_rows !== null && sel_rows.length > 0 ? sel_rows[0].currentIdLoadingStatus : null;
                                // Выбрать только не принятые вагоны
                                switch (this.fw_status) {
                                    case 1: {
                                        this["tfw_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data, node) {
                                            return !data.isMoving && data.filingStart !== null && data.filingEnd === null && data.currentIdOperation === id_operation;
                                        }).select();
                                        break;
                                    }
                                    case 2: {
                                        if (this.type_filing === 2) {
                                            this["tfw_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data, node) {
                                                return !data.isMoving && data.filingStart !== null && data.filingEnd !== null && data.currentIdOperation === id_operation && data.moveCargoDocReceived === data_doc;
                                            }).select();
                                        } else {
                                            this["tfw_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data, node) {
                                                return !data.isMoving && data.filingStart !== null && data.filingEnd !== null && data.currentIdOperation === id_operation;
                                            }).select();
                                        }

                                        break;
                                    }
                                    case 3: {
                                        this["tfw_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data, node) {
                                            return data.isMoving;
                                        }).select();
                                        break;
                                    }
                                    default: {
                                        if (this.type_filing === 1) {
                                            this["tfw_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data, node) {
                                                return data.filingStart === null && data.filingEnd === null && data.currentIdLoadingStatus === id_loading;
                                            }).select();
                                        }
                                        if (this.type_filing === 2) {
                                            this["tfw_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data, node) {
                                                return data.filingStart === null && data.filingEnd === null;
                                            }).select();
                                        }
                                        break;
                                    }
                                }
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                        {
                            name: 'del_wagons_filing',
                            action: function (e, dt, node, config) {
                                this["tfw_" + this.type_filing].tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        }
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_unloading_cars] [tfws_unlc]process: ' + process);
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.filing_wagons_alert.clear_message();
                        if (rowData && rowData.length > 0) {
                            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                            // Определим статус выбранной строки
                            var curr_status = 0;
                            var curr_status = this.get_status_fw_wagons(rowData);

                            if (rows !== null && rows.length > 0 && this.fw_status !== curr_status) {
                                e.preventDefault();
                                this.filing_wagons_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_select_status', App.Langs).format(rowData[0].num, this.view_status_fw_wagons(curr_status), this.view_status_fw_wagons(this.fw_status)));
                            } else {
                                // Погрузки
                                if (this.type_filing == 2) {
                                    if (rows !== null && rows.length > 0 && rowData !== null && rowData.length > 0 && rows[0].currentIdOperation !== rowData[0].currentIdOperation) {
                                        e.preventDefault();
                                        this.filing_wagons_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_error_operation', App.Langs).format(rowData[0].num));
                                    } else {
                                        if (rows !== null && rows.length > 0 && rowData !== null && rowData.length > 0 && rows[0].moveCargoDocReceived !== rowData[0].moveCargoDocReceived) {
                                            e.preventDefault();
                                            this.filing_wagons_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_error_doc_received', App.Langs).format(rowData[0].num));
                                        } else {
                                            this.fw_status = curr_status;
                                        }
                                    }
                                }
                                // выгрузки
                                if (this.type_filing == 1) {

                                    if (rows !== null && rows.length > 0 && rowData !== null && rowData.length > 0 && rows[0].currentIdLoadingStatus !== rowData[0].currentIdLoadingStatus) {
                                        e.preventDefault();
                                        this.filing_wagons_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_error_status', App.Langs).format(rowData[0].num));
                                    } else {
                                        this.fw_status = curr_status;
                                    }


                                }
                            }
                            //if (rows !== null && rows.length > 0 && rowData !== null && rowData.length > 0 && rows[0].currentIdOperation !== rowData[0].currentIdOperation) {
                            //    e.preventDefault();
                            //    this.filing_wagons_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_error_operation', App.Langs).format(rowData[0].num));
                            //} else {
                            //    if (rows !== null && rows.length > 0 && this.fw_status !== curr_status) {
                            //        e.preventDefault();
                            //        this.filing_wagons_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_select_status', App.Langs).format(rowData[0].num, this.view_status_fw_wagons(curr_status), this.view_status_fw_wagons(this.fw_status)));
                            //    } else {
                            //        this.fw_status = curr_status;
                            //    }
                            //}
                        }

                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        // Сбросим статусы 
                        var sel_rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                        if (sel_rows === null || sel_rows.length === 0) {
                            this.fw_status = null;
                        } else {
                            this.fw_status = this.get_status_fw_wagons(sel_rows);
                        }

                        this.view_setup_filing();
                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            this.view_wagons_of_filing(this.id_filing, function () { LockScreenOff(); }.bind(this));
                        }
                        if (name === 'del_wagons_filing') {
                            this.from_way_alert.clear_message();
                            this.form_filing_setup.clear_all();
                            this.form_filing_wagons_setup.clear_all();
                            this.form_from_setup.clear_all();
                            if (this.id_way_unload >= 0) {

                                // Убрать
                                var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                                if (rows !== null && rows.length > 0) {
                                    if (this.id_filing === 0) {
                                        // Это черновик
                                        LockScreen(langView('vopcf_mess_create_filing_delete_wagon', App.Langs));
                                        // Выполнить операцию добавить вагоны
                                        $.each(rows, function (i, el) {
                                            var wagon = this.wagons.find(function (o) {
                                                return o.wimId === el.idWim;
                                            }.bind(this));
                                            if (wagon) { wagon['id_wir_unload'] = null; }
                                            // Проверим если в черновике нет вагонов тогда удалить признак черновика
                                            var res = this.wagons.filter(function (i) {
                                                return i.id_wir_unload !== null;
                                            }.bind(this));
                                            if (!res || res.length === 0) {
                                                this.id_filing = null;
                                            }

                                        }.bind(this));
                                        this.view_wagons(this.id_filing); // Обновить вагоны на пути приема
                                        LockScreenOff();

                                    } else {
                                        // Подача
                                        var buff = [];
                                        $.each(this.filing_wagons, function (i, el) {
                                            var res = rows.find(function (o) {
                                                return o.idWim === el.idWim;

                                            }.bind(this));
                                            if (!res) { buff.push(el) };
                                        }.bind(this));
                                        // Сколько осталось открытых операций
                                        var open = buff.filter(function (i) {
                                            return i.filingEnd == null;
                                        }.bind(this))
                                        // 
                                        this.view_com.mcf_lg.open(
                                            langView('vopcf_title_form_apply', App.Langs),
                                            langView('vopcf_confirm_mess_apply_delete_wagon_filing', App.Langs).format(rows.length, this.id_filing) + (!open || open.length === 0 ? langView('vopcf_confirm_mess_apply_delete_wagon_warning_close', App.Langs) : ''),
                                            function () {
                                                // убрать вагоны из подачи
                                                LockScreen(langView('vopcf_mess_del_filing', App.Langs));
                                                var list_wagons = [];
                                                $.each(rows, function (i, el) {
                                                    list_wagons.push(el.idWim);
                                                }.bind(this));
                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    wagons: list_wagons
                                                };
                                                this.apply_del_wagon_filing(operation);
                                            }.bind(this),
                                            function () {
                                                this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vopcf_mess_cancel_operation_mode_delete_wagon', App.Langs));
                                            }.bind(this)
                                        );
                                    }
                                } else {
                                    this.from_way_alert.out_warning_message(langView('vopcf_mess_not_select_wagon_return', App.Langs));
                                }

                            } else {
                                this.from_way_alert.out_warning_message(langView('vopcf_mess_not_select_way_from', App.Langs));
                            }
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {

                    }.bind(this),
                });

                //-------------------------------------------------------------------
                // Создадим форму (this.from_way_setup)
                if (typeof this.settings.fn_init_form_from_setup === 'function') {
                    this.settings.fn_init_form_from_setup.call(this, function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this));
                } else {
                    this.form_from_setup = new FD();
                    // Создать макет панели
                    var objs_from_setup = [];

                    var form_select_way_unload = {
                        obj: 'bs_form_select',
                        options: {
                            validation_group: 'common_from',
                            id: 'id_way_unload',
                            name: 'id_way_unload',
                            label: langView('vopcf_title_label_way_from', App.Langs).format(langView('vopcf_title_type_filing_' + this.type_filing, App.Langs)),
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
                                default: this.id_way_unload,
                                fn_change: function (e) {
                                    e.preventDefault();
                                    // Обработать выбор
                                    var id = Number($(e.currentTarget).val());
                                    this.id_filing_old = this.id_filing;
                                    this.id_filing = null;
                                    this.update(this.id_station_unload, id, function () {
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
                            form_text: langView('vopcf_text_label_way_from', App.Langs).format(langView('vopcf_title_type_filing_' + this.type_filing, App.Langs)),
                            form_text_class: null,
                        },
                        childs: []
                    };

                    objs_from_setup.push(form_select_way_unload);
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
                            this.from_way_setup.$html.append(this.form_from_setup.$form);
                            // На проверку окончания инициализации
                            process--;
                            //console.log('[view_op_unloading_cars] [form_from_setup]process: ' + process);
                            out_init(process);
                        }.bind(this),
                    });
                }

                // Создадим таблицы (this.from_way_table)
                var row_wagons_from_way = new this.view_com.fe_ui.bs_row({ id: 'op-unlc-wagons-from_' + this.type_filing, class: 'pt-2' });
                this.from_way_table.$html.append(row_wagons_from_way.$html);

                this["twwf_" + this.type_filing] = new TWS('div#op-unlc-wagons-from_' + this.type_filing);
                this["twwf_" + this.type_filing].init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'unload_cars_from_' + this.type_filing,
                    setup_buttons: [
                        {
                            name: 'select_all',
                            action: function () {
                                // Выбрать только не принятые вагоны
                                this["twwf_" + this.type_filing].tab_com.obj_t_report.rows(function (idx, data, node) {
                                    return !data.currentWagonBusy &&
                                        !(this.type_filing === 2 && data.currentLoadBusy) &&
                                        !(this.type_filing === 1 && data.currentUnloadBusy) &&
                                        !(data.idFiling !== null && data.wayFilingEnd === null) && data.id_wir_unload === null;
                                }.bind(this)).select();
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                        {
                            name: 'add_filing',
                            action: function (e, dt, node, config) {
                                this["twwf_" + this.type_filing].tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        }
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_unloading_cars] [tocw_opoc]process: ' + process);
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.from_way_alert.clear_message();
                        if (rowData && rowData.length > 0) {
                            if (rowData[0].currentWagonBusy) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_busy', App.Langs).format(rowData[0].num));
                            }
                            if (rowData[0].idFiling !== null && rowData[0].idFiling == this.id_filing) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_exists', App.Langs).format(rowData[0].num, this.id_filing));
                            }
                            //if (rowData[0].outgoingSostavStatus > 0) {
                            //    e.preventDefault();
                            //    this.from_way_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_status', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus));
                            //}
                            if (rowData[0].id_wir_unload !== null) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_filing_way', App.Langs).format(rowData[0].num));
                            }
                            if (this.type_filing === 1 && rowData[0].currentUnloadBusy) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vopcf_mess_warning_wagon_current_load_busy', App.Langs).format(rowData[0].num, rowData[0]['currentLoadingStatus' + ucFirst(App.Lang)], rowData[0].moveCargoDocReceived));

                            }
                            if (this.type_filing === 2 && rowData[0].currentLoadBusy) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vopcf_mess_warning_wagon_current_load_busy', App.Langs).format(rowData[0].num, rowData[0]['currentLoadingStatus' + ucFirst(App.Lang)]));

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
                        if (name === 'add_filing') {
                            this.from_way_alert.clear_message();
                            this.form_filing_setup.clear_all();
                            this.form_filing_wagons_setup.clear_all();
                            this.form_from_setup.clear_all();
                            if (this.id_way_unload >= 0) {
                                var open_filing = this.sostav_filing.find(function (o) {
                                    return o.createFiling !== null && o.closeFiling === null && o.filingIdWay === this.id_way_unload;
                                }.bind(this));
                                // Проверка на открытую подачу на пути создания новой

                                if (this.id_filing == null && open_filing) {
                                    e.preventDefault();
                                    this.from_way_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_new_filing', App.Langs).format(this.form_from_setup.el.select_id_way_unload.text(), open_filing.idFiling));
                                } else {
                                    // Добавить
                                    var rows = this["twwf_" + this.type_filing].tab_com.get_select_row();
                                    if (rows !== null && rows.length > 0) {
                                        if (!this.id_filing) {
                                            this.id_filing_old = null;
                                            // Создать черновик
                                            LockScreen(langView('vopcf_mess_create_filing', App.Langs));
                                            // Выполнить операцию добавить вагоны
                                            $.each(rows, function (i, el) {
                                                el['id_wir_unload'] = el.wirId;
                                            }.bind(this));
                                            this.view_wagons(this.id_filing); // Обновить вагоны на пути приема
                                            LockScreenOff();

                                        } else {
                                            this.view_com.mcf_lg.open(
                                                langView('vopcf_title_form_apply', App.Langs),
                                                langView('vopcf_confirm_mess_apply_add_wagon_filing', App.Langs).format(rows.length, this.id_filing),
                                                function () {
                                                    // Добавить вагоны в существующую подачу
                                                    LockScreen(langView('vopcf_mess_add_filing', App.Langs));
                                                    var list_wagons = [];
                                                    $.each(rows, function (i, el) {
                                                        list_wagons.push(el.wimId);
                                                    }.bind(this));
                                                    var operation = {
                                                        id_filing: this.id_filing,
                                                        wagons: list_wagons
                                                    };
                                                    this.apply_add_wagon_filing(operation);
                                                }.bind(this),
                                                function () {
                                                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vopcf_mess_cancel_operation_mode_add_wagon', App.Langs));
                                                }.bind(this));
                                        }
                                    } else {
                                        this.from_way_alert.out_warning_message(langView('vopcf_mess_not_select_wagon_from', App.Langs));
                                    }
                                }
                            } else {
                                this.from_way_alert.out_warning_message(langView('vopcf_mess_not_select_way_from', App.Langs));
                            }


                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {

                    }.bind(this),
                });
                //====================================================================
            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = ['station', 'park_ways', 'ways', 'divisions', 'wagon_operations'];
        // Загружаем стандартные библиотеки
        this.view_com.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_op_common_filing] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.view_com.load_db}

        if (typeof this.settings.fn_load_db_operation === 'function') {
            this.settings.fn_load_db_operation.call(this, function () {
                // На проверку окончания инициализации
                pr_load--;
                //console.log('[view_op_common_filing] [fn_load_db_operation] pr_load: ' + pr_load);
                out_load(pr_load);
            }.bind(this));
        } else {
            pr_load--;
            out_load(pr_load);
        }
    };
    view_op_common_filing.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('voplc_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_filing_setup.clear_all();
        this.form_filing_wagons_setup.clear_all();
        this.wagons = [];
        this.wagons_filing = [];
        this.id_filing = null;          // id подачи (изменяется при выборе подачи)
        this.id_filing_old = null;
        this.id_way_filing = null;      // id пути (изменяется при выборе подачи)
        this.station_from = -1;           // станция подачи (изменяется при выборе подачи)
        this.division_from = -1;          // подразделение подачи (изменяется при выборе подачи)
        this.create_filing = null;      // время создания подачи (изменяется при выборе подачи)
        this.close_filing = null;       // время закрытия подачи (изменяется при выборе подачи)
        this.fw_status = null;          // Статус выбраноых вагонов в подаче (0-null, 1-начата, 2-закрыта, 3-закрыта и вагон уже нестоит)
        // Определим время выборки
        var date = this.form_filing_setup.el.input_datetime_time_period_start.val();
        switch (this.type) {
            case 1: {
                // жд.сутки
                this.start = moment(date).subtract(1, 'd').set({ 'hour': 20, 'minute': 1, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 20, 'minute': 0, 'second': 0 })._d;
                this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + langView('vopcf_title_period_1', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
            case 2: {
                //календарные сутки
                this.start = moment(date).set({ 'hour': 0, 'minute': 1, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + langView('vopcf_title_period_2', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
            case 3: {
                // месяц
                this.start = moment(date).set({ 'date': 1, 'hour': 0, 'minute': 1, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + langView('vopcf_title_period_3', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
            default: {
                // по умолчанию
                this.start = moment(date).set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
                this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
        };
        // Сбросим вагоны переноса
        this.id_station_unload = -1;
        var id_station = -1;
        this.id_way_unload = -1;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_filing_setup.el.select_id_station_unload.val(id_station);

            }
        };
        // Дополнительная обработка в панели выбранной операции
        if (typeof this.settings.fn_view_open === 'function') {
            this.settings.fn_view_open.call(this, function () {
            }.bind(this));
        };
        this.update(id_station, id_way, function () {
            LockScreenOff();
        }.bind(this));
    }
    view_op_common_filing.prototype.isAddWagon = function (callback_ok, callback_not) {
        var wagons_add = this.wagons.filter(function (i) {
            return i.id_wir_unload !== null;
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
    view_op_common_filing.prototype.update = function (id_station, id_way_unload, callback) {
        // Обновим состояние станции
        this.update_station(id_station, id_way_unload, function () {
            this.view_wagons(this.id_filing);
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновим состояние станции
    view_op_common_filing.prototype.update_station = function (id_station, id_way, callback) {
        this.confirm_update_station(id_station,
            function () { // Ok
                // обновим компонент пути отправки
                this.list_way = this.view_com.api_dir.getListValueTextLoadUnloadWaysOfStation(id_station);
                this.form_from_setup.el.select_id_way_unload.update(this.list_way, id_way);
                // Обновим станцию
                this.id_station_unload = id_station;
                // Загрузим подачи по станции
                this.load_of_filing_wagon(id_station, function () {
                    // Не сбрасывать в начале
                    if (this.id_way_unload > 0) {
                        id_way = -1;
                        $.each(this.wagons, function (i, el) {
                            el['id_wir_unload'] = null;
                        }.bind(this));
                    }
                    // Обновим пути
                    this.update_from_way(id_way,
                        function (upd) {
                            if (typeof callback === 'function') {
                                callback(true);
                            }
                        }.bind(this)
                    );
                }.bind(this));

            }.bind(this),
            function () { // Cancel
                // Обновим данные на пути
                this.update_from_way(id_way,
                    function () {
                        if (typeof callback === 'function') {
                            callback(false);
                        }
                    }.bind(this)
                );
            }.bind(this));
    }
    // Проверка и подтверждение изменений по станции
    view_op_common_filing.prototype.confirm_update_station = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station_unload !== id_station) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vopcf_confirm_title', App.Langs),
                        langView('vopcf_confirm_mess_change_station', App.Langs).format(this.form_filing_setup.el.select_id_station_unload.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_filing_setup.el.select_id_station_unload.val(this.id_station_unload);
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
    view_op_common_filing.prototype.update_from_way = function (id_way, callback) {
        this.confirm_update_way_from(id_way,
            function () { // Ok
                // выберим путь на компоненте пути отправки
                this.form_from_setup.el.select_id_way_unload.val(id_way);

                this.load_of_way(id_way, function () {
                    //this.id_filing = null;
                    if (typeof callback === 'function') {
                        callback(true);
                    }
                }.bind(this));

            }.bind(this),
            function () { // Cancel
                this.id_filing = this.id_filing_old !== null ? this.id_filing_old : this.id_filing;
                if (typeof callback === 'function') {
                    callback(false);
                }
            }.bind(this));
    }
    // Проверка и подтверждение изменений по пути отправки
    view_op_common_filing.prototype.confirm_update_way_from = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way_unload !== id_way) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vopcf_confirm_title', App.Langs),
                        langView('vopcf_confirm_mess_change_way', App.Langs).format(this.form_from_setup.el.select_id_way_unload.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_from_setup.el.select_id_way_unload.val(this.id_way_unload);
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
    view_op_common_filing.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way_unload = id_way;
            LockScreen(langView('vopcf_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['id_wir_unload'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.id_way_unload = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    // Загрузим подачи на станции
    view_op_common_filing.prototype.load_of_filing_wagon = function (id_station, callback) {
        if (id_station !== null && id_station >= 0) {
            LockScreen(langView('vopcf_mess_load_filing_wagon', App.Langs));

            var start = moment(this.start).format("YYYY-MM-DDTHH:mm");
            var stop = moment(this.stop).format("YYYY-MM-DDTHH:mm");
            this.view_com.api_wsd.getViewWagonsFilingOfPeriodIdStation(start, stop, id_station, function (wagons) {
                this.sostav_filing = [];
                // Выберем вагоны только определенного типа подач
                var wagons = wagons.filter(function (i) { return i.typeFiling === this.type_filing }.bind(this));
                $.each(wagons, function (key, el) {
                    var st = this.sostav_filing.find(function (o) {
                        return o.idFiling === el.idFiling;
                    }.bind(this));
                    if (!st) {
                        if (typeof this.settings.fn_get_sostav_filing === 'function') {
                            this.sostav_filing.push(this.settings.fn_get_sostav_filing.call(this, el));
                        }

                    } else {
                        st.countFilingWagons++;
                        st.countUnloadingWagons += (el.filingWayEnd !== null ? 1 : 0);
                    }
                }.bind(this));
                this.wagons_filing = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons_filing);
                }
            }.bind(this));
        } else {
            this.sostav_filing = [];
            this.wagons_filing = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons_filing);
            }
        }
    };
    // Показать все (сотавы, вагоны)
    view_op_common_filing.prototype.view_wagons = function (id_filing) {
        // Очистить сообщения и форму
        this.form_filing_setup.clear_all();
        this.form_filing_wagons_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать вагоны на пути формирования подачи
        this.view_wagons_from();
        // Показать подачи
        this.view_filing(id_filing);
        // Показать вагоны в подаче
        this.view_wagons_of_filing(id_filing, function () {

        });
    };
    // Показать вагоны на пути формирования подачи
    view_op_common_filing.prototype.view_wagons_from = function () {
        var wagons = this.wagons;
        if (this["twwf_" + this.type_filing].tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wir_unload === null && !i.currentWagonBusy;
            });
        }
        this["twwf_" + this.type_filing].view(wagons, null);
    };
    // Показать список подач
    view_op_common_filing.prototype.view_filing = function (id_filing) {

        var sostav_filing = [];
        // сделаем копию, что-бы небыло задвоения
        sostav_filing = JSON.parse(JSON.stringify(this.sostav_filing));
        var wagons_filing_add = this.wagons.filter(function (i) {
            return i.id_wir_unload !== null;
        });
        if (wagons_filing_add !== null && wagons_filing_add.length > 0) {

            var station = this.stations.find(function (o) { return o.id === this.id_station_unload }.bind(this));
            var way = this.ways.find(function (o) { return o.id === this.id_way_unload }.bind(this));
            var park = way ? this.park_ways.find(function (o) { return o.id === way.idPark }.bind(this)) : null;
            var division = way ? this.divisions.find(function (o) { return o.id === way.idDevision }.bind(this)) : null;

            if (station && way && park) {

                if (typeof this.settings.fn_get_sostav_filing === 'function') {
                    sostav_filing.push(this.settings.fn_get_sostav_filing.call(this, null, station, way, park, division, wagons_filing_add));
                }
            } else {
                // Сообщение об ошибке
                this.form_filing_setup.validation_common_filing.out_error_message(langView('vopcf_mess_eror_add_new_filing', App.Langs).format(wagons_filing_add.length, !station ? 'error' : 'ok', !park ? 'error' : 'ok', !way ? 'error' : 'ok'));
            }
        }
        if (this["tlf_" + this.type_filing].tab_com.eye) {
            // Показать открытые на выбнаном пути
            sostav_filing = sostav_filing.filter(function (i) {
                return i.statusFiling !== 2 && i.filingIdWay === this.id_way_unload;
            }.bind(this));
        }
        this["tlf_" + this.type_filing].view(sostav_filing, id_filing);
    };
    // Показать вагоны подачи
    view_op_common_filing.prototype.view_wagons_of_filing = function (id_filing, callback) {
        this.filing_wagons = []; // Сформируем вагоны в выбранной подаче 
        if (id_filing !== null) {
            if (id_filing > 0) {
                this.filing_wagons = this.wagons_filing.filter(function (i) {
                    return i.idFiling === id_filing;
                }.bind(this));
                if (!this.filing_wagons || this.filing_wagons.length === 0) {
                    this.id_filing = null; this.id_filing_old = null;
                }
            } else {
                var wagons_filing_add = this.wagons.filter(function (i) {
                    return i.id_wir_unload !== null;
                }).sort(function (a, b) { return a.position - b.position });
                if (wagons_filing_add !== null && wagons_filing_add.length > 0) {
                    // Получим список вагонов
                    $.each(wagons_filing_add, function (key, el) {
                        if (typeof this.settings.fn_get_filing_wagons === 'function') {
                            this.filing_wagons.push(this.settings.fn_get_filing_wagons.call(this, el));
                        }
                    }.bind(this))
                } else {
                    this.form_filing_setup.validation_common_filing.out_error_message(langView('vopcf_mess_eror_new_filing_not_wagon', App.Langs));
                }
            };
        }
        var vagons_view = this.filing_wagons;
        if (this["tfw_" + this.type_filing].tab_com.eye) {
            vagons_view = vagons_view.filter(function (i) {
                return i.filingEnd === null;
            });
        }
        this["tfw_" + this.type_filing].view(vagons_view, null);
        this.view_setup_filing();
        // Событие обновили данные
        if (typeof callback === 'function') {
            callback(vagons_view);
        }
    };
    // Показать статус вагона
    view_op_common_filing.prototype.view_status_fw_wagons = function (fw_st) {
        switch (fw_st) {
            case 0: { return langView('vopcf_title_status_0', App.Langs); }
            case 1: { return langView('vopcf_title_status_1', App.Langs); }
            case 2: { return langView('vopcf_title_status_2', App.Langs); }
            case 3: { return langView('vopcf_title_status_3', App.Langs); }
            default: { return langView('vopcf_title_status_null', App.Langs); }
        };
    };
    // Определим статус выбранной строки
    view_op_common_filing.prototype.get_status_fw_wagons = function (rows) {
        if (rows && rows.length > 0) {
            if (!rows[0].isMoving) {
                if (rows[0].filingStart !== null) {
                    if (rows[0].filingEnd !== null) {
                        return 2;
                    } else {
                        return 1;
                    }
                }
            } else {
                return 3;
            }
        }
        return 0;
    }
    // Показать настройки подачи
    view_op_common_filing.prototype.view_setup_filing = function (command) {
        if (typeof this.settings.fn_view_setup_filing === 'function') {
            this.settings.fn_view_setup_filing.call(this, command)
        }
    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_common_filing.prototype.validation = function (result, mode) {
        if (typeof this.settings.fn_validation === 'function') {
            return this.settings.fn_validation.call(this, result, mode);
        }
    }
    // Выполнить операцию создать подачу
    view_op_common_filing.prototype.apply_add_filing = function (data) {
        LockScreen(langView('vopcf_mess_run_operation_add_filing', App.Langs).format(langView('vopcf_title_operation_type_filing_' + this.type_filing, App.Langs)));
        if (typeof this.settings.fn_apply_add_filing === 'function') {
            this.settings.fn_apply_add_filing.call(this, data, function (result) {
                // Проверим на ошибку выполнения запроса api
                if (result && result.status) {
                    var mess = langView('vopcf_mess_error_api', App.Langs).format(result.status, result.title);
                    console.log('[view_op_common_filing] [postAddFiling] :' + mess);
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                    if (result.errors) {
                        for (var err in result.errors) {
                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                            console.log('[view_op_common_filing] [postAddFiling] :' + err + ":" + result.errors[err]);
                        }
                    }
                    LockScreenOff();
                } else {
                    this.apply_update(result, langView('vopcf_mess_ok_operation_add_filing', App.Langs).format(result.count));
                }
            }.bind(this));
        }
    };
    // Выполнить операцию править подачу 
    view_op_common_filing.prototype.apply_update_filing = function (data) {
        LockScreen(langView('vopcf_mess_run_operation_update_filing', App.Langs).format(langView('vopcf_title_operation_type_filing_' + this.type_filing, App.Langs)));
        if (typeof this.settings.fn_apply_update_filing === 'function') {
            this.settings.fn_apply_update_filing.call(this, data, function (result) {
                // Проверим на ошибку выполнения запроса api
                if (result && result.status) {
                    var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                    console.log('[view_op_common_filing] [postUpdateFilingUnloading] :' + mess);
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                    if (result.errors) {
                        for (var err in result.errors) {
                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                            console.log('[view_op_common_filing] [postUpdateFilingUnloading] :' + err + ":" + result.errors[err]);
                        }
                    }
                    LockScreenOff();
                } else {
                    this.apply_update(result, langView('vopcf_mess_ok_operation_update_filing', App.Langs).format(this.id_filing));
                }
            }.bind(this));
        }
    };
    // Выполнить операцию открыть-закрыть операции над вагонами (+ админка)
    view_op_common_filing.prototype.apply_update_operation_filing = function (data) {
        LockScreen(langView('vopcf_mess_run_operation_update_operation_filing', App.Langs).format(langView('vopcf_title_operation_type_filing_' + this.type_filing, App.Langs)));

        if (typeof this.settings.fn_apply_update_operation_filing === 'function') {
            this.settings.fn_apply_update_operation_filing.call(this, data, function (result) {
                // Проверим на ошибку выполнения запроса api
                if (result && result.status) {
                    var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                    console.log('[view_op_common_filing] [postUpdateFilingOperation] :' + mess);
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                    if (result.errors) {
                        for (var err in result.errors) {
                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                            console.log('[view_op_common_filing] [postUpdateFilingOperation] :' + err + ":" + result.errors[err]);
                        }
                    }
                    LockScreenOff();
                } else {
                    this.apply_update(result, langView('vopcf_mess_ok_operation_update_operation_filing', App.Langs).format(result.count, this.id_filing));
                }
            }.bind(this));
        }
    };
    // Выполнить операцию добавить в подачу вагоны
    view_op_common_filing.prototype.apply_add_wagon_filing = function (data) {
        if (typeof this.settings.fn_apply_add_wagon_filing === 'function') {
            this.settings.fn_apply_add_wagon_filing.call(this, data);
        } else {
            LockScreen(langView('vopcf_mess_run_operation_add_wagon_filing', App.Langs));
            this.view_com.api_wsd.postAddWagonFiling(data, function (result) {
                // Проверим на ошибку выполнения запроса api
                if (result && result.status) {
                    var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                    console.log('[view_op_common_filing] [postAddWagonFiling] :' + mess);
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                    if (result.errors) {
                        for (var err in result.errors) {
                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                            console.log('[view_op_common_filing] [postAddWagonFiling] :' + err + ":" + result.errors[err]);
                        }
                    }
                    LockScreenOff();
                } else {
                    this.apply_update(result, langView('vopcf_mess_ok_operation_add_wagon_filing', App.Langs).format(result.count, this.id_filing));
                }
            }.bind(this));
        }


    }
    // Выполнить операцию убрать вагоны из подачи
    view_op_common_filing.prototype.apply_del_wagon_filing = function (data) {
        if (typeof this.settings.fn_apply_del_wagon_filing === 'function') {
            this.settings.fn_apply_del_wagon_filing.call(this, data);
        } else {
            LockScreen(langView('vopcf_mess_run_operation_del_wagon_filing', App.Langs));
            this.view_com.api_wsd.postDeleteWagonFiling(data, function (result) {
                // Проверим на ошибку выполнения запроса api
                if (result && result.status) {
                    var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                    console.log('[view_op_common_filing] [postDeleteWagonFiling] :' + mess);
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                    if (result.errors) {
                        for (var err in result.errors) {
                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                            console.log('[view_op_common_filing] [postDeleteWagonFiling] :' + err + ":" + result.errors[err]);
                        }
                    }
                    LockScreenOff();
                } else {
                    this.apply_update(result, langView('vopcf_mess_ok_operation_del_wagon_filing', App.Langs).format(result.count, this.id_filing));
                }
            }.bind(this));
        }



    }
    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    view_op_common_filing.prototype.apply_update = function (result, mess_ok, mess_err) {
        if (typeof this.settings.fn_apply_update === 'function') {
            this.settings.fn_apply_update.call(this, result, mess_ok, mess_err);
        } else {
            // По умолчанию
            if (result && result.result > 0) {
                // Очистить сообщения и форму
                this.form_filing_setup.clear_all();
                this.form_filing_wagons_setup.clear_all();
                var pr_2 = 2;
                var out_pr2 = function (pr_2) {
                    if (pr_2 === 0) {
                        // Покажем вагоны и выберем подачу
                        this.view_wagons(this.id_filing);
                        this.view_setup_filing();
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_info_message(mess_ok);
                        if (typeof this.settings.fn_db_update === 'function') {
                            //TODO: можно добавить возвращать перечень для обновления
                            typeof this.settings.fn_db_update();
                        }
                        LockScreenOff();
                    }
                }.bind(this);
                // Обновим пути отправки 1 поток
                this.load_of_way(this.id_way_unload, function () {
                    pr_2--;
                    out_pr2(pr_2);
                }.bind(this));
                // Обновим пути приема 2 поток
                this.load_of_filing_wagon(this.id_station_unload, function () {
                    pr_2--;
                    out_pr2(pr_2);
                }.bind(this));
            } else {
                LockScreenOff();
                this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopcf_mess_error_operation_run_wagon_filing', App.Langs).format(result ? result.result : -1));
                // Выведем ошибки по вагонно.
                if (result && result.listResult) {
                    $.each(result.listResult, function (i, el) {
                        if (el.result <= 0) this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopcf_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                    }.bind(this));
                }
            }
        }
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_op_common_filing.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_op_common_filing.prototype.clear_all = function () {
        this.filing_alert.clear_message();
        this.filing_wagons_alert.clear_message();
        this.from_way_alert.clear_message();
        this.form_filing_setup.clear_all();
        this.form_filing_wagons_setup.clear_all();
        this.form_from_setup.clear_all();

    }

    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_op_common_filing.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_op_common_filing = view_op_common_filing;

    window.App = App;
})(window);