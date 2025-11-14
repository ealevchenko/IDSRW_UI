/* ===============================================
-= Модуль сервис инструктивные письма =-
  + js/view/shared/common.js
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
            'vs_usfee_card_header_card_services': 'РАСЧЕТ ПЛАТЫ ЗА ПОЛЬЗОВАНИЕ',
            'vs_usfee_card_header_list_of_operators': 'Справочник операторов',
            'vs_usfee_card_header_list_of_rod': 'Род вагонов',
            'vs_usfee_card_header_payment_terms': 'Условия расчета',

            'vs_usfee_mess_init_module': 'Инициализация модуля view_usage_fee',

            'vs_usfee_form_apply': 'Применить',
            'vs_usfee_form_apply_title': 'Применить условие',

            'vs_usfee_label_date_period_start': 'Начало :',
            'vs_usfee_title_placeholder_date_period_start': 'Начало',
            'vs_usfee_title_date_period_start': 'Начало периода...',

            'vs_usfee_label_date_period_stop': 'Окончание :',
            'vs_usfee_title_placeholder_date_period_stop': 'Окончание',
            'vs_usfee_title_date_period_stop': 'Окончание периода...',

            'vs_usfee_label_hour_after_30': 'Округление часа после 30 мин.',

            'vs_usfee_label_rate_currency': 'Валюта :',
            'vs_usfee_text_rate_currency': 'Валюта',

            'vs_usfee_label_rate_value': 'Ставка :',
            'vs_usfee_title_placeholder_rate_value': 'Ставка',
            'vs_usfee_text_rate_value': 'Ставка...',

            'vs_usfee_label_derailment_rate_currency': 'Валюта (сход) :',
            'vs_usfee_text_derailment_rate_currency': 'Валюта (сход)...',

            'vs_usfee_label_derailment_rate_value': 'Ставка (сход) :',
            'vs_usfee_title_placeholder_derailment_rate_value': 'Ставка (сход)',
            'vs_usfee_text_derailment_rate_value': 'Ставка (сход)...',

            'vs_usfee_label_coefficient_route_value': 'Коэф. маршрут :',
            'vs_usfee_title_placeholder_coefficient_route_value': 'Коэф. маршрут',
            'vs_usfee_text_coefficient_route_value': 'Коэф. маршрут...',

            'vs_usfee_label_coefficient_not_route_value': 'Коэф. не маршрут :',
            'vs_usfee_title_placeholder_coefficient_not_route_value': 'Коэф. не маршрут',
            'vs_usfee_text_coefficient_not_route_value': 'Коэф. не маршрут...',

            'vs_usfee_label_grace_time_value1': 'Льгот время 1-е :',
            'vs_usfee_title_placeholder_grace_time_value1': 'Льгот время 1-е',
            'vs_usfee_text_grace_time_value1': 'Льгот время 1-е...',

            'vs_usfee_label_grace_time_value2': 'Льгот время 2-е :',
            'vs_usfee_title_placeholder_grace_time_value2': 'Льгот время 2-е',
            'vs_usfee_text_grace_time_value2': 'Льгот время 2-е...',

            'vs_usfee_add_rate': 'Добавить условие',
            'vs_usfee_add_rate_title': 'Добавить дополнительное условие...',

            'vs_usfee_title_label_code_stn_from': 'Станция (ОТПР) :',
            'vs_usfee_title_placeholder_code_stn_from': 'Станция (ОТПР)',
            'vs_usfee_text_code_stn_from': 'Выберите станцию отправления...',

            'vs_usfee_title_label_arrival_cargo_name': 'Груз (ПРИБ) :',
            'vs_usfee_title_placeholder_arrival_cargo_name': 'Груз (ПРИБ)',
            'vs_usfee_text_arrival_cargo_name': 'Выберите груз прибытия...',

            'vs_usfee_title_label_code_stn_on': 'Станция (ПРИБ) :',
            'vs_usfee_title_placeholder_code_stn_on': 'Станция (ПРИБ)',
            'vs_usfee_text_code_stn_on': 'Выберите станцию прибытия...',

            'vs_usfee_title_label_outgoing_cargo_name': 'Груз (ОТПР) :',
            'vs_usfee_title_placeholder_outgoing_cargo_name': 'Груз (ОТПР)',
            'vs_usfee_text_outgoing_cargo_name': 'Выберите груз отправления...',

            'vs_usfee_label_grace_time_value': 'Льгот время:',
            'vs_usfee_title_placeholder_grace_time_value': 'Льгот время',
            'vs_usfee_text_grace_time_value': 'Льгот время...',

            'vs_usfee_label_end_unload': 'По окончанию выгрузки',
            'vs_usfee_label_start_load': 'С начала погрузки',

            //'vs_usfee_mess_shearch_wagon': 'Обработка вагонов в системе',
            //'vs_usfee_title_button_lett_num_clear': 'Очистить',
            //'vs_usfee_title_button_lett_num_searsh': 'Поиск по № письма',
            //'vs_usfee_title_button_lett_wagon_clear': 'Очистить',
            //'vs_usfee_title_button_lett_wagon_searsh': 'Поиск по № вагона в письме',

            //'vs_usfee_title_placeholder_lett_num_searsh': 'Поиск по № письма',
            //'vs_usfee_text_lett_num_searsh': 'Введите № письма, разделитель ";"',
            //'vs_usfee_title_placeholder_lett_wagon_searsh': 'Поиск по № вагона в письме',
            //'vs_usfee_text_lett_wagon_searsh': 'Введите № вагона, разделитель ";"',

            //'vs_usfee_title_label_create_new': 'Созданные письма',
            //'vs_usfee_title_label_in_progress': 'Письма в работе',
            //'vs_usfee_title_label_done': 'Письма выполненные',
            //'vs_usfee_title_label_replacement': 'Письма заменённые',
            //'vs_usfee_title_label_canceled': 'Письма отменённые',
            //'vs_usfee_title_label_deleted': 'Письма требующие внимания',

            //'vs_usfee_title_letter_num': '№ письма',
            //'vs_usfee_title_placeholder_letter_num': '№ письма',

            //'vs_usfee_title_letter_date': 'Дата письма',
            //'vs_usfee_title_placeholder_letter_date': 'Дата письма',

            //'vs_usfee_title_label_letter_destination_station': 'Ст. назначения',
            //'vs_usfee_title_placeholder_letter_destination_station': 'Ст. назначения',

            //'vs_usfee_title_letter_owner': 'Собственник (по письму)',
            //'vs_usfee_title_placeholder_letter_owner': 'Собственник',

            //'vs_usfee_title_letter_note': 'Примечание',
            //'vs_usfee_title_placeholder_letter_note': 'Примечание',
            //'vs_usfee_text_letter_note': 'Введите примечание...',

            //'vs_usfee_title_placeholder_lett_wagons_searsh': 'Введите № вагона, разделитель ";"',

            //'vs_usfee_title_form_add': 'Добавить новое письмо',
            //'vs_usfee_title_form_edit': 'Править письмо',

            'vs_usfee_title_button_Cancel': 'Отмена',
            'vs_usfee_button_Ok': 'Применить',
            'vs_usfee_title_form_add_additional_conditions': 'Добавить новое условие...',
            'vs_usfee_title_form_edit_additional_conditions': 'Править существующее условие...',

            //'vs_usfee_title_button_add_letter': 'Добавить новое письмо',
            //'vs_usfee_title_button_edit_letter': 'Привить существующее письмо',
            //'vs_usfee_title_button_delete_letter': 'Удалить письмо (вагоны в письме должны быть не закрыты!)',

            //'vs_usfee_title_button_delete_wagon': 'Удалить вагон из письма (ошибочно добавленный)',
            'vs_usfee_cancel_update_additional_conditions': 'Отмена операции правки дополнительного условия.',
            //'vs_usfee_title_button_clear_letter': 'Очистить статус правки вагона (отмена правки!)',

            'vs_usfee_title_form_apply_additional_conditions': 'УДАЛИТЬ ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЕ?',
            'vs_usfee_mess_run_delete_additional_conditions': 'Выполнить операцию "УДАЛИТЬ ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЕ"? Будет удаленно доп. условие по станция отпр.[{0}], груз приб.[{1}], станция приб.[{2}], груз отпр.[{3}], льготное время:[{4}], ставка:[{5}].',
            'vs_usfee_cancel_delete_additional_conditions': 'Отмена операции "УДАЛИТЬ ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЕ"',

            'vs_usfee_load_info': 'Загружаю информацию...',
            //'vs_usfee_update_letters': 'Обновляю письма за период...',
            //'vs_usfee_select_letters': 'Поиск писем согласно выбора...',

            //'vs_usfee_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            //'vs_usfee_mess_info_searsh_letters': 'За период c {0} по {1}, найдено {2} инструктивных писем.',
            //'vs_usfee_mess_info_select_letters': 'За период c {0} по {1}, найдено {2} инструктивных писем, выбрано {3}',
            //'vs_usfee_mess_note_offer_not_close': '!Данный вагон не закрыт в письме {0} от {1} и будет закрыт со статусом [Замена]',
            //'vs_usfee_mess_note_offer_status_0': 'Ожидаем прибытие вагона',
            //'vs_usfee_mess_note_offer_status_1': 'Вагон прибыл',
            //'vs_usfee_mess_note_offer_status_2': 'Вагон сдан',
            //'vs_usfee_mess_note_offer_status_default': 'Статус вагона не определен',

            //'vs_usfee_mess_form_letters_edit_not_wagons': 'В письме отсутствуют вагоны!',
            //'vs_usfee_mess_form_letters_edit_error_wagons': 'В письме по вагонам есть ошибки определения статуса!',
            //'vs_usfee_mess_form_letters_edit_error_wagon': 'Вагон № {0}, статус {1}, ошибка {2}',
            //'vs_usfee_mess_form_letters_edit_letter_destination_station': 'Укажите станцию назначения',
            //'vs_usfee_mess_form_letters_edit_not_db_letter_destination_station': 'Станции назначения нет БД ИДС...',
            //'vs_usfee_mess_form_letters_edit_not_status_wagons': 'Статус вагонов в системе не определен!',
            //'vs_usfee_mess_form_letters_edit_not_edit_wagon': 'Вагон {0} в письме закрыт {1} - правка запрещена!',
            'vs_usfee_mess_war_form_letters_edit_exist_wagon': 'Период условия платы по оператору {0} с {1} по {2} уже завершён. Выбор не доступен!',

            'vs_usfee_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',
            'vs_usfee_mess_error_operation_additional_conditions_run': 'При выполнении операции «ПРАВКИ ДОПОЛНИТЕЛЬНОГО УСЛОВИЯ» произошла ошибка, код ошибки: {0}',
            'vs_usfee_mess_error_operation_delete_additional_conditions_run': 'При выполнении операции «УДАЛИТЬ ДОПОЛНИТЕЛЬНОЕ УСЛОВИЕ» произошла ошибка, код ошибки: {0}',
            'vs_usfee_mess_run_operation_additional_conditions': 'Выполняю операцию "ПРАВКИ ДОПОЛНИТЕЛЬНОГО УСЛОВИЯ"',
            'vs_usfee_mess_run_operation_delete_additional_conditions': 'Выполняю операцию "УДАЛИТЬ ДОПОЛНИТЕЛЬНОЕ УСЛОВИЕ"',
            'vs_usfee_mess_operation_add_additional_conditions_ok': 'Операция "ДОБАВИТЬ ДОПОЛНИТЕЛЬНОЕ УСЛОВИЕ" - выполнена',
            'vs_usfee_mess_operation_edit_additional_conditions_ok': 'Операция "ПРАВИТЬ ДОПОЛНИТЕЛЬНОЕ УСЛОВИЕ" - выполнена',
            'vs_usfee_mess_operation_delete_additional_conditions_ok': 'Операция "УДАЛИТЬ ДОПОЛНИТЕЛЬНОЕ УСЛОВИЕ" - выполнена',
        },
        'en':  //default language: English
        {

        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    var MCF = App.modal_confirm_form;
    var MCFD = App.modal_confirm_form_dialog;


    var ALERT = App.alert_form;
    var FD = App.form_dialog;

    var VFSP = App.view_form_select_period; // форма выбора периода

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var IDS_ARRIVAL = App.ids_arrival;

    var TSRV = App.table_services;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_usage_fee(selector) {
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$main = $(selector);
        if (this.$main.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        this.fe_ui = new FE();
    }
    //------------------------------- ИНИЦИАЛИЗАЦИЯ И ОТОБРАЖЕНИЕ ----------------------------------
    // Инициализация
    view_usage_fee.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_usage_fee');
        LockScreen(langView('vs_usfee_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,                          // сылки на библиотеки api dir
            api_wsd: null,                          // сылки на библиотеки api wsd
            ids_arrival: null,                      // сылки на библиотеки api arrival
            fn_init: null,                          // Окончание инициализации
            fn_db_update: null,                     // Выполнить обновление баз данных если были изменения
            fn_close: null,                         // ? пока неработает
        }, options);
        //
        this.id_usage_fee_period = null;
        this.id_usage_fee_period_detali = null;
        this.list_operators_all = [];
        this.list_operators = [];
        this.list_operators_genus_all = [];
        this.list_operators_genus = [];
        this.list_period = [];

        // Создадим ссылку на модуль работы с базой данных
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });
        this.ids_arrival = this.settings.ids_arrival ? this.settings.ids_arrival : new IDS_ARRIVAL({ url_api: App.Url_Api });

        this.mcf_lg = new MCF(); // Создадим экземпляр окно сообщений
        this.mcf_lg.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'lg',
            bt_close_text: langView('vs_usfee_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_usfee_button_Ok', App.Langs),
        });

        // Главный Alert
        this.alert = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.$main.append(this.alert.$html);
        this.main_alert = new ALERT(this.alert.$html);
        // Создать макет панели (Плата за пользование)
        this.card_services = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 mt-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_usfee_card_header_card_services', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.fe_ui.bs_row({});
        this.div_form_operators = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 6,
        }); // Окно настроек
        this.div_form_rod = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 6,
        }); // Окно выбора
        this.div_form_payment_terms = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 12,
        }); // Окно выбора
        // Создать макет панели (список операторов)
        this.list_of_operators = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_usfee_card_header_list_of_operators', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        // Создать макет панели (список родов вагонов)
        this.list_of_rod = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_usfee_card_header_list_of_rod', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        // Создать макет панели (условие расчета)
        this.list_of_payment_terms = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_usfee_card_header_payment_terms', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });

        this.div_form_operators.$html.append(this.list_of_operators.$html);
        this.div_form_rod.$html.append(this.list_of_rod.$html);
        this.div_form_payment_terms.$html.append(this.list_of_payment_terms.$html);
        // Окно таблицы оператора
        var row_operators = new this.fe_ui.bs_row({});
        this.list_of_operators_table = new this.fe_ui.bs_col({
            id: 'table-list-of-operators',
            pref: 'xl',
            size: 12,
            //class: 'rounded border border-secondary'
        }); // Окно таблицы
        row_operators.$html.append(this.list_of_operators_table.$html);
        this.list_of_operators.body.$html.append(row_operators.$html);
        // Окно таблицы род
        var row_rod = new this.fe_ui.bs_row({});
        this.list_of_rod_table = new this.fe_ui.bs_col({
            id: 'table-list-of-rod',
            pref: 'xl',
            size: 12,
            //class: 'rounded border border-secondary'
        }); // Окно таблицы
        row_rod.$html.append(this.list_of_rod_table.$html);
        this.list_of_rod.body.$html.append(row_rod.$html);
        // Окно условия рачсчета
        var row_payment_terms = new this.fe_ui.bs_row({});
        this.list_of_payment_terms_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
            class: 'rounded border border-secondary p-2'
        }); // Окно таблицы
        this.list_of_payment_terms_table = new this.fe_ui.bs_col({
            id: 'table-payment-terms',
            pref: 'xl',
            size: 9,
            //class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert payment_terms
        this.alert_payment_terms = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.list_of_payment_terms_table.$html.append(this.alert_payment_terms.$html);
        this.payment_terms_alert = new ALERT(this.alert_payment_terms.$html);

        row_payment_terms.$html.append(this.list_of_payment_terms_setup.$html).append(this.list_of_payment_terms_table.$html);
        this.list_of_payment_terms.body.$html.append(row_payment_terms.$html);

        row.$html.append(this.div_form_operators.$html).append(this.div_form_rod.$html).append(this.div_form_payment_terms.$html);
        this.card_services.body.$html.append(row.$html);
        this.$main.append(this.card_services.$html);
        // Инициализация вначале 
        if (typeof this.settings.fn_start_init === 'function') {
            this.settings.fn_start_init.call(this);
        }
        // Определим количество загрузок
        var pr_load = 1;
        // Выход из загрузок
        var out_load = function (process) {
            if (pr_load === 0) {
                //==============================================================
                // Инициализация после загрузки библиотек
                var process = 5;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        // Добавим форму настройки
                        this.list_of_payment_terms_setup.$html.append(this.form_payment_terms_setup.$form);
                        //this.info_alert.out_info_message(langView('vs_usfee_mess_info_init', App.Langs));
                        // На проверку окончания инициализации
                        //----------------------------------
                        //this.start = moment().subtract(3, "year");
                        //this.stop = moment();
                        //this.update(this.start, this.stop, function () {
                        this.tab_list_of_operators.view(this.list_operators);
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_usage_fee');
                            this.settings.fn_init(this.result_init);
                        }
                        //}.bind(this));
                    }
                }.bind(this);
                // инициализациия
                // Список операторов
                this.list_operators_all = this.api_dir.getAllOperatorsWagons();

                this.list_external_station_all = this.api_dir.getAllExternalStation();
                this.list_external_station = this.api_dir.getListValueTextExternalStation();

                this.list_cargo_all = this.api_dir.getAllCargo();
                this.list_cargo = this.api_dir.getListValueTextCodeCargo();

                this.list_currency_all = this.api_dir.getAllCurrency();
                this.list_currency = this.api_dir.getListValueTextCurrency();

                this.list_operators = this.list_operators_all.filter(function (i) {
                    return i.parentId === null;
                }.bind(this));
                // Список операторов и родов вагонов
                this.api_dir.getOperatorsAndGenusWagons(function (data) {
                    this.list_operators_genus_all = data;
                    process--;
                    out_init(process);
                }.bind(this));

                //out_init(process);
                // Таблица списка операторов
                this.tab_list_of_operators = new TSRV('div#table-list-of-operators');
                this.tab_list_of_operators.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'list_of_operators',
                    setup_buttons: [
                        { name: 'show_selection', action: null, text: 'Выб.' },
                        {
                            name: 'select_all',
                            action: function () {
                                // Выбрать только не принятые вагоны
                                this.tab_list_of_operators.tab_com.obj_t_report.rows().select();
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        //bts.titleAttr(langView('vopulc_title_attr_button_new_filing', App.Langs));
                        $('div#tab-tr-table-list-of-operators_wrapper').find('.btn-group').addClass('btn-group-sm');
                        process--;
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        LockScreen(langView('vs_usfee_load_info', App.Langs));
                        var rows_select = this.tab_list_of_operators.tab_com.get_select_row();
                        this.list_operators_genus = [];
                        if (rows_select && rows_select.length > 0) {
                            if (this.list_operators_genus_all && this.list_operators_genus_all.length > 0) {
                                $.each(rows_select, function (key, el) {
                                    var genus = this.list_operators_genus_all.filter(function (i) {
                                        return (i.parentId === null && i.idOperator === el.id) || (i.parentId !== null && i.parentId === el.id); //
                                    }.bind(this));
                                    this.list_operators_genus = this.list_operators_genus.concat(genus);
                                }.bind(this));
                            }
                            this.tab_list_of_rod.view(this.list_operators_genus);

                        } else {
                            this.tab_list_of_rod.view(this.list_operators_genus);
                            this.list_period = [];
                            this.tab_list_payment_terms.view(this.list_period);
                        }
                        LockScreenOff();
                    }.bind(this),
                    fn_select_link: function (link) { }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            //this.view_wagons_from();
                            //LockScreenOff();
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) { }.bind(this),
                    fn_view_detali: function (id_div, data) { },
                    fn_init_complete: function () { },
                    fn_draw_callback: function (settings) { }.bind(this)
                });
                // Таблица списка родов груза
                this.tab_list_of_rod = new TSRV('div#table-list-of-rod');
                this.tab_list_of_rod.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'list_of_rod',
                    setup_buttons: [
                        { name: 'show_selection', action: null, text: 'Выб.' },
                        {
                            name: 'select_all',
                            action: function () {
                                this.tab_list_of_rod.tab_com.obj_t_report.rows().select();
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        //bts.titleAttr(langView('vopulc_title_attr_button_new_filing', App.Langs));
                        $('div#tab-tr-table-list-of-rod_wrapper').find('.btn-group').addClass('btn-group-sm');
                        process--;
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) { }.bind(this),
                    fn_select_rows: function (rows, type) {
                        var process_period = 0;
                        // Выход из инициализации
                        var out_load_period = function (process_period) {
                            if (process_period === 0) {
                                this.tab_list_payment_terms.view(this.list_period);
                                LockScreenOff();
                            }
                        };

                        LockScreen(langView('vs_usfee_load_info', App.Langs));
                        var rows_select = this.tab_list_of_rod.tab_com.get_select_row();
                        process_period = rows_select.length;
                        this.list_period = [];
                        if (rows_select && rows_select.length > 0) {
                            $.each(rows_select, function (key, el) {
                                this.api_wsd.getViewUsageFeePeriodOfOperatorGenus(el.idOperator, el.idGenus, function (data) {
                                    if (data && data.length > 0) {
                                        this.list_period = this.list_period.concat(data);
                                    } else {
                                        // Создадим новую строку
                                        var genus = this.api_dir.getGenusWagons_Of_ID(el.idGenus);
                                        var operator = this.api_dir.getOperatorsWagons_Of_ID(el.idOperator);
                                        this.list_period.push({
                                            "idUsageFeePeriod": 0,
                                            "usageFeePeriodIdOperator": el.idOperator,
                                            "usageFeePeriodOperatorAbbrRu": operator.abbrRu,
                                            "usageFeePeriodOperatorRu": operator.operatorsRu,
                                            "usageFeePeriodOperatorAbbrEn": operator.abbrEn,
                                            "usageFeePeriodOperatorEn": operator.operatorsEn,
                                            "usageFeePeriodOperatorsPaid": null,
                                            "usageFeePeriodOperatorsRop": null,
                                            "usageFeePeriodOperatorsLocalUse": null,
                                            "usageFeePeriodOperatorsColor": null,
                                            "usageFeePeriodIdGenus": el.idGenus,
                                            "usageFeePeriodGenusRu": genus.genusRu,
                                            "usageFeePeriodGenusEn": genus.genusEn,
                                            "usageFeePeriodGenusAbbrRu": genus.abbrRu,
                                            "usageFeePeriodGenusAbbrEn": genus.abbrEn,
                                            "usageFeePeriodRodUz": null,
                                            "usageFeePeriodStart": null,
                                            "usageFeePeriodStop": null,
                                            "usageFeePeriodIdCurrency": null,
                                            "usageFeePeriodCurrencyRu": null,
                                            "usageFeePeriodCurrencyEn": null,
                                            "usageFeePeriodCode": null,
                                            "usageFeePeriodCodeCc": null,
                                            "usageFeePeriodRate": null,
                                            "usageFeePeriodIdCurrencyDerailment": null,
                                            "usageFeePeriodDerailmentCurrencyRu": null,
                                            "usageFeePeriodDerailmentCurrencyEn": null,
                                            "usageFeePeriodDerailmentCode": null,
                                            "usageFeePeriodDerailmentCodeCc": null,
                                            "usageFeePeriodRateDerailment": null,
                                            "usageFeePeriodCoefficientRoute": null,
                                            "usageFeePeriodCoefficientNotRoute": null,
                                            "usageFeePeriodGraceTime1": null,
                                            "usageFeePeriodGraceTime2": null,
                                            "usageFeePeriodNote": null,
                                            "usageFeePeriodCreate": null,
                                            "usageFeePeriodCreateUser": null,
                                            "usageFeePeriodChange": null,
                                            "usageFeePeriodChangeUser": null,
                                            "usageFeePeriodClose": null,
                                            "usageFeePeriodCloseUser": null,
                                            "usageFeePeriodParentId": null,
                                            "usageFeePeriodHourAfter30": null
                                        });
                                    }
                                    process_period--;
                                    out_load_period.call(this, process_period);
                                }.bind(this));
                            }.bind(this));

                        } else {
                            out_load_period.call(this, process_period);
                        }
                    }.bind(this),
                    fn_select_link: function (link) { }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            //this.view_wagons_from();
                            //LockScreenOff();
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) { }.bind(this),
                    fn_view_detali: function (id_div, data) { },
                    fn_init_complete: function () { },
                    fn_draw_callback: function (settings) { }.bind(this)
                });
                // Таблица списка периодов
                this.tab_list_payment_terms = new TSRV('div#table-payment-terms');
                this.tab_list_payment_terms.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'list_usage_fee_period',
                    setup_buttons: [
                        {
                            name: 'select_all',
                            action: function () {
                                this.tab_list_payment_terms.tab_com.obj_t_report.rows(
                                    function (idx, data) {
                                        return data.idUsageFeePeriod === 0 || moment().isBefore(data.usageFeePeriodStop);
                                    }.bind(this)).select();
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        //bts.titleAttr(langView('vopulc_title_attr_button_new_filing', App.Langs));
                        $('div#tab-tr-table-payment-terms_wrapper').find('.btn-group').addClass('btn-group-sm');
                        process--;
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) { },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.payment_terms_alert.clear_message();
                        //if (rowData && rowData.length > 0) {
                        //    if (rowData[0].idUsageFeePeriod > 0 && !moment().isBefore(rowData[0].usageFeePeriodStop)) {
                        //        e.preventDefault();
                        //        this.payment_terms_alert.out_warning_message(langView('vs_usfee_mess_war_form_letters_edit_exist_wagon', App.Langs).format(
                        //            rowData[0]['usageFeePeriodOperatorAbbr' + ucFirst(App.Lang)],
                        //            moment(rowData[0].usageFeePeriodStart).format(format_datetime_ru),
                        //            moment(rowData[0].usageFeePeriodStop).format(format_datetime_ru)));
                        //    }
                        //}
                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        LockScreen(langView('vs_usfee_load_info', App.Langs));

                        //-----------------------------------
                        // Получим выбранные периоды
                        var rows_select = this.tab_list_payment_terms.tab_com.get_select_row();
                        // Пройдемся по периодам и добавим доп условия
                        this.id_usage_fee_period = null;
                        this.id_usage_fee_period_detali = null;
                        if (rows_select && rows_select.length === 1) {
                            this.update_additional_conditions(rows_select[0].idUsageFeePeriod, function () {
                                LockScreenOff();
                            }.bind(this))
                            //this.id_usage_fee_period = rows_select[0].idUsageFeePeriod;
                            //this.$list_rate.empty();
                            //// Добавим первый элемент (Добавить условие)
                            //var $li = $('<li></li>', {
                            //    class: 'list-group-item list-group-item-action list-group-item-secondary'
                            //});
                            //var $div_info = $('<div></div>', {
                            //    class: 'd-flex justify-content-between'
                            //});
                            //var $h6 = $('<h6></h6>', {
                            //    class: 'mb-1'
                            //});
                            //$h6.append('Добавить доп. условие...');
                            //var $btng = $('<div></div>', {
                            //    class: 'btn-group btn-group-sm me-2',
                            //    role: 'group'
                            //});
                            //var $icon_add = $('<i class="fa-solid fa-circle-plus"></i>');
                            //var $btn_add = $('<button></button>', {
                            //    class: 'btn btn-success',
                            //    type: 'button',
                            //});
                            //$btn_add.on("click", function (e) {
                            //    //Дбавить условие
                            //    this.view_form_rate_edit(null);
                            //}.bind(this));
                            //$btn_add.append($icon_add);
                            //$btng.append($btn_add);
                            //$div_info.append($h6).append($btng);
                            //$li.append($div_info)
                            //this.$list_rate.append($li);
                            ////--------------------------------
                            //// Получить детали
                            //this.api_wsd.getViewUsageFeePeriodDetaliOfIdPeriod(rows_select[0].idUsageFeePeriod, function (data_detali) {
                            //    if (data_detali && data_detali.length > 0) {
                            //        //<a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                            //        //    <div class="d-flex w-100 justify-content-between">
                            //        //        <h5 class="mb-1">List group item heading</h5>
                            //        //        <small>3 days ago</small>
                            //        //    </div>
                            //        //    <p class="mb-1">Some placeholder content in a paragraph.</p>
                            //        //    <small>And some small print.</small>
                            //        //</a>

                            //        $.each(data_detali, function (i, el) {
                            //            // Добавить полученные элементы
                            //            var $li = $('<li></li>', {
                            //                class: 'list-group-item list-group-item-action border-top border-success'
                            //            });
                            //            var $div_info = $('<div></div>', {
                            //                class: 'd-flex justify-content-between'
                            //            });
                            //            var $h6 = $('<h6></h6>', {
                            //                class: 'mb-1'
                            //            });
                            //            if (el.codeStnFrom !== null && el.codeStnTo === null) {
                            //                $h6.append('По прибытию...');
                            //            } else if (el.codeStnFrom === null && el.codeStnTo !== null) {
                            //                $h6.append('По отправке...');
                            //            } else {
                            //                if (el.idCargoArrival !== null && el.idCargoOutgoing === null) {
                            //                    $h6.append('По прибытию груза...');
                            //                } else if (el.idCargoArrival === null && el.idCargoOutgoing !== null) {
                            //                    $h6.append('По отправке груза...');
                            //                } else { $h6.append('...'); }
                            //            }
                            //            // Кнопки управления
                            //            var btng = new init_button_edit(el, function (e) {
                            //                //Дбавить условие
                            //                this.view_form_rate_edit(el);
                            //            }.bind(this), function (e) {
                            //                //Дбавить условие
                            //                this.view_form_rate_delete(el);
                            //            }.bind(this));
                            //            $div_info.append($h6).append(btng.$html);
                            //            $li.append($div_info);
                            //            if (el.arrivalEndUnload !== null) {
                            //                $li.append(new init_view_field('arrivalEndUnload', 'По оканчанию выгрузки:', el.arrivalEndUnload ? 'Да' : '').$html);
                            //            }
                            //            if (el.codeStnFrom !== null) {
                            //                $li.append(new init_view_field('codeStnFrom', 'Станция (ОТПР):', el['fromStationName' + ucFirst(App.Lang)]).$html);
                            //            }
                            //            if (el.idCargoArrival !== null) {
                            //                $li.append(new init_view_field('idCargoArrival', 'Груз (ПРИБ):', el['arrivalCargoName' + ucFirst(App.Lang)]).$html);
                            //            }
                            //            if (el.outgoingStartLoad !== null) {
                            //                $li.append(new init_view_field('outgoingStartLoad', 'По оканчанию выгрузки:', el.outgoingStartLoad ? 'Да' : '').$html);
                            //            }
                            //            if (el.codeStnTo !== null) {
                            //                $li.append(new init_view_field('codeStnTo', 'Станция (ПРИБ):', el['toStationName' + ucFirst(App.Lang)]).$html);
                            //            }
                            //            if (el.idCargoOutgoing !== null) {
                            //                $li.append(new init_view_field('idCargoOutgoing', 'Груз (ОТПР):', el['outgoingCargoName' + ucFirst(App.Lang)]).$html);
                            //            }
                            //            if (el.graceTime !== null) {
                            //                $li.append(new init_view_field('graceTime', 'Льготное время:', el.graceTime).$html);
                            //            }
                            //            if (el.rate !== null) {
                            //                //$li.append(new init_view_field('graceTime', 'Льготное время:', el.grace_time).$html);
                            //            }
                            //            this.$list_rate.append($li);
                            //        }.bind(this));
                            //    } else {
                            //    }
                            //}.bind(this));
                        } else {
                            this.$list_rate.empty();
                            LockScreenOff();
                        }
                    }.bind(this),
                    fn_select_link: function (link) { }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            //this.view_wagons_from();
                            //LockScreenOff();
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) { }.bind(this),
                    fn_view_detali: function (id_div, data) { },
                    fn_init_complete: function () { },
                    fn_draw_callback: function (settings) { }.bind(this)
                });

                // форма детального выбора писем
                this.form_payment_terms_setup = new FD();
                var objs_pt_setup = [];

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
                        color: 'success',
                        text: langView('vs_usfee_form_apply', App.Langs),
                        title: langView('vs_usfee_form_apply_title', App.Langs),
                        icon_fa_left: 'fa-solid fa-thumbs-up',  //<i class="fa-solid fa-thumbs-up"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            //this.form_payment_terms_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_date_period_start = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'pt',
                        id: 'date_period_start',
                        name: 'date_period_start',
                        label: langView('vs_usfee_label_date_period_start', App.Langs),
                        element_type: 'date',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_date_period_start', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: moment().subtract(31, 'days').format("YYYY-MM-DDThh:mm"), //"2024-05-05T00:00"
                        element_max: moment().add(31, 'days').format("YYYY-MM-DDThh:mm"),
                        element_step: null,
                        element_options: {
                            default: null, //moment()
                            format: 'date',
                            out_format: 'moment',
                            fn_change: function (e, dt) { }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        form_text: langView('vs_usfee_title_date_period_start', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_input_date_period_stop = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'pt',
                        id: 'date_period_stop',
                        name: 'date_period_stop',
                        label: langView('vs_usfee_label_date_period_stop', App.Langs),
                        element_type: 'date',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_date_period_stop', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: moment().subtract(31, 'days').format("YYYY-MM-DDThh:mm"), //"2024-05-05T00:00"
                        element_max: moment().add(31, 'days').format("YYYY-MM-DDThh:mm"),
                        element_step: null,
                        element_options: {
                            default: null, //moment().add(1, 'hour')
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
                        form_text: langView('vs_usfee_title_date_period_stop', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_check_hour_after_30 = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'pt',
                        id: 'hour_after_30',
                        name: 'hour_after_30',
                        label: langView('vs_usfee_label_hour_after_30', App.Langs),
                        element_type: 'checkbox',
                        element_switch: true,
                        element_inline: false,
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_checked: true,
                        element_required: false,
                        element_readonly: false,
                        element_options: {
                            default: true,
                            fn_change: function (e) {
                                //this.select_apply(this.list_letters, function (select_letters) {
                                //    this.view_select(select_letters);
                                //    LockScreenOff();
                                //}.bind(this));
                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col: 'col-md-12 mt-0',
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: null,
                    },
                    childs: []
                };
                var form_select_rate_currency = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'pt',
                        id: 'rate_currency',
                        name: 'rate_currency',
                        label: langView('vs_usfee_label_rate_currency', App.Langs),
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
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
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
                        //form_text: langView('vs_usfee_text_rate_currency', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_rate_value = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'pt',
                        id: 'rate_value',
                        name: 'rate_value',
                        label: langView('vs_usfee_label_rate_value', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_rate_value', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_rate_value', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_select_derailment_rate_currency = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'pt',
                        id: 'derailment_rate_currency',
                        name: 'derailment_rate_currency',
                        label: langView('vs_usfee_label_derailment_rate_currency', App.Langs),
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
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
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
                        //form_text: langView('vs_usfee_text_derailment_rate_currency', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_derailment_rate_value = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'pt',
                        id: 'derailment_rate_value',
                        name: 'derailment_rate_value',
                        label: langView('vs_usfee_label_derailment_rate_value', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_derailment_rate_value', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_derailment_rate_value', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_coefficient_route_value = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'pt',
                        id: 'coefficient_route_value',
                        name: 'coefficient_route_value',
                        label: langView('vs_usfee_label_coefficient_route_value', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_coefficient_route_value', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_coefficient_route_value', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_coefficient_not_route_value = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'pt',
                        id: 'coefficient_not_route_value',
                        name: 'coefficient_not_route_value',
                        label: langView('vs_usfee_label_coefficient_not_route_value', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_coefficient_not_route_value', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_coefficient_not_route_value', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_grace_time_value1 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'pt',
                        id: 'grace_time_value1',
                        name: 'grace_time_value1',
                        label: langView('vs_usfee_label_grace_time_value1', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_grace_time_value1', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_grace_time_value1', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_grace_time_value2 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'pt',
                        id: 'grace_time_value2',
                        name: 'grace_time_value2',
                        label: langView('vs_usfee_label_grace_time_value2', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_grace_time_value2', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_grace_time_value2', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };

                //var col_add_rate = {
                //    obj: 'bs_col',
                //    options: {
                //        id: null,
                //        pref: 'md',
                //        size: 12,
                //        class: 'text-left mt-2',
                //        style: null,
                //    },
                //    childs: []
                //};
                //var bt_add_rate = {
                //    obj: 'bs_button',
                //    options: {
                //        id: null,
                //        name: null,
                //        class: null,
                //        fsize: 'sm',
                //        color: 'success',
                //        text: langView('vs_usfee_add_rate', App.Langs),
                //        title: langView('vs_usfee_add_rate', App.Langs),
                //        icon_fa_left: 'fa-solid fa-square-plus',  //<i class="fa-solid fa-square-plus"></i>
                //        icon_fa_right: null,
                //        fn_click: function (event) {
                //            event.preventDefault();
                //            //this.form_payment_terms_setup.$form.submit();
                //        }.bind(this),
                //    }
                //};
                var row_list_rate = {
                    obj: 'bs_div',
                    options: {
                        id: 'list-rate',
                        class: 'mt-2 usage_fee_deteli',
                        style: null,
                    },
                    childs: []
                };
                var col_rate = {
                    obj: 'bs_col',
                    options: {
                        id: null,
                        pref: 'md',
                        size: 12,
                        class: 'bx-2',
                        style: null,
                    },
                    childs: []
                };

                //<ul class="list-group">
                //    <li class="list-group-item">An item</li>
                //    <li class="list-group-item">A second item</li>
                //    <li class="list-group-item">A third item</li>
                //    <li class="list-group-item">A fourth item</li>
                //    <li class="list-group-item">And a fifth one</li>
                //</ul>

                col_bt_apply.childs.push(bt_bt_apply);
                objs_pt_setup.push(col_bt_apply);
                objs_pt_setup.push(form_input_date_period_start);
                objs_pt_setup.push(form_input_date_period_stop);
                objs_pt_setup.push(form_check_hour_after_30);
                objs_pt_setup.push(form_select_rate_currency);
                objs_pt_setup.push(form_input_rate_value);
                objs_pt_setup.push(form_select_derailment_rate_currency);
                objs_pt_setup.push(form_input_derailment_rate_value);
                objs_pt_setup.push(form_input_coefficient_route_value);
                objs_pt_setup.push(form_input_coefficient_not_route_value);
                objs_pt_setup.push(form_input_grace_time_value1);
                objs_pt_setup.push(form_input_grace_time_value2);
                //col_add_rate.childs.push(bt_add_rate);
                //objs_pt_setup.push(col_add_rate);
                col_rate.childs.push(row_list_rate);
                objs_pt_setup.push(col_rate);
                this.form_payment_terms_setup.init({
                    alert: this.main_alert,
                    //context: this...$html,
                    objs: objs_pt_setup,
                    id: null,
                    form_class: 'row',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {
                            if (valid) {

                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {

                        this.$list_rate = $('<ol></ol>', {
                            class: 'list-group list-group'
                        });
                        var $div_rate = this.form_payment_terms_setup.$form.find('div#list-rate');//  $('div#list-rate');
                        $div_rate.append(this.$list_rate);


                        //row_on_setup.$html.append(this.form_payment_terms_setup.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                this.form_rate_edit = new FD();
                var objs_rate_edit = [];
                var row_form = {
                    obj: 'bs_row',
                    options: {
                        id: null,
                        class: null,
                        style: null,
                    },
                    childs: []
                };

                var form_input_datalist_from_station_name = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'code_stn_from',
                        name: 'code_stn_from',
                        label: langView('vs_usfee_title_label_code_stn_from', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_code_stn_from', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_external_station,
                            out_value: true,
                            out_group: false,
                            default: '',
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {
                                //// Убрал вывод ошибки, при открытии окна и заполненя этого компонента, приходит событие set.value = '' и вываливается ошибка
                                //if (set.value !== '') {
                                //    this.form_letters_edit.clear_all();
                                //    var valid = this.validation_letter_destination_station(set.value, 'letter_destination_station', true, false);
                                //}
                            }.bind(this),
                            fn_select: function (event, set, options) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 3,
                        col_class: 'mt-0',
                        //form_text: langView('vs_usfee_text_code_stn_from', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datalist_arrival_cargo_name = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'id_cargo_arrival',
                        name: 'id_cargo_arrival',
                        label: langView('vs_usfee_title_label_arrival_cargo_name', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_arrival_cargo_name', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_cargo,
                            out_value: false,
                            out_group: true,
                            default: '',
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {
                                //// Убрал вывод ошибки, при открытии окна и заполненя этого компонента, приходит событие set.value = '' и вываливается ошибка
                                //if (set.value !== '') {
                                //    this.form_letters_edit.clear_all();
                                //    var valid = this.validation_letter_destination_station(set.value, 'letter_destination_station', true, false);
                                //}
                            }.bind(this),
                            fn_select: function (event, set, options) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 5,
                        col_class: 'mt-0',
                        //form_text: langView('vs_usfee_text_arrival_cargo_name', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_check_end_unload = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'end_unload',
                        name: 'end_unload',
                        label: langView('vs_usfee_label_end_unload', App.Langs),
                        element_type: 'checkbox',
                        element_switch: true,
                        element_inline: false,
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_checked: true,
                        element_required: false,
                        element_readonly: false,
                        element_options: {
                            default: false,
                            fn_change: function (e) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col: 'col-md-12 mt-0',
                        col_prefix: 'md',
                        col_size: 4,
                        col_class: null,
                    },
                    childs: []
                };
                var form_input_datalist_on_station_name = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'code_stn_on',
                        name: 'code_stn_on',
                        label: langView('vs_usfee_title_label_code_stn_on', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_code_stn_on', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_external_station,
                            out_value: true,
                            out_group: false,
                            default: '',
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {
                                //// Убрал вывод ошибки, при открытии окна и заполненя этого компонента, приходит событие set.value = '' и вываливается ошибка
                                //if (set.value !== '') {
                                //    this.form_letters_edit.clear_all();
                                //    var valid = this.validation_letter_destination_station(set.value, 'letter_destination_station', true, false);
                                //}
                            }.bind(this),
                            fn_select: function (event, set, options) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 3,
                        col_class: 'mt-0',
                        //form_text: langView('vs_usfee_text_code_stn_on', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datalist_outgoing_cargo_name = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'id_cargo_outgoing',
                        name: 'id_cargo_outgoing',
                        label: langView('vs_usfee_title_label_outgoing_cargo_name', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_outgoing_cargo_name', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_cargo,
                            out_value: false,
                            out_group: true,
                            default: '',
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {
                                //// Убрал вывод ошибки, при открытии окна и заполненя этого компонента, приходит событие set.value = '' и вываливается ошибка
                                //if (set.value !== '') {
                                //    this.form_letters_edit.clear_all();
                                //    var valid = this.validation_letter_destination_station(set.value, 'letter_destination_station', true, false);
                                //}
                            }.bind(this),
                            fn_select: function (event, set, options) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 5,
                        col_class: 'mt-0',
                        //form_text: langView('vs_usfee_text_outgoing_cargo_name', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_check_start_load = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'start_load',
                        name: 'start_load',
                        label: langView('vs_usfee_label_start_load', App.Langs),
                        element_type: 'checkbox',
                        element_switch: true,
                        element_inline: false,
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_checked: true,
                        element_required: false,
                        element_readonly: false,
                        element_options: {
                            default: false,
                            fn_change: function (e) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col: 'col-md-12 mt-0',
                        col_prefix: 'md',
                        col_size: 4,
                        col_class: null,
                    },
                    childs: []
                };
                var form_input_grace_time_value = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'grace_time_value',
                        name: 'grace_time_value',
                        label: langView('vs_usfee_label_grace_time_value', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_grace_time_value', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 4,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_grace_time_value', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_select_add_rate_currency = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'rate_currency',
                        name: 'rate_currency',
                        label: langView('vs_usfee_label_rate_currency', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: this.list_currency,
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 4,
                        col_class: 'mt-0',
                        //form_text: langView('vs_usfee_text_rate_currency', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_add_rate_value = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'rate_edit',
                        id: 'rate_value',
                        name: 'rate_value',
                        label: langView('vs_usfee_label_rate_value', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_usfee_title_placeholder_rate_value', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 0,
                        element_max: 100000000.0,
                        element_step: 0.01,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 4,
                        col_class: 'mt-0',
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        //form_text: langView('vs_usfee_text_rate_value', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };

                row_form.childs.push(form_input_datalist_from_station_name);
                row_form.childs.push(form_input_datalist_arrival_cargo_name);
                row_form.childs.push(form_check_end_unload);
                row_form.childs.push(form_input_datalist_on_station_name);
                row_form.childs.push(form_input_datalist_outgoing_cargo_name);
                row_form.childs.push(form_check_start_load);
                row_form.childs.push(form_input_grace_time_value);
                row_form.childs.push(form_select_add_rate_currency);
                row_form.childs.push(form_input_add_rate_value);
                objs_rate_edit.push(row_form);

                this.form_rate_edit.init({
                    alert: null,
                    //context: this...$html,
                    objs: objs_rate_edit,
                    id: null,
                    form_class: null,
                    validation: true,
                    fn_validation: function (result) {
                        var valid = result.valid;

                        this.form_rate_edit.valid = valid;
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        // Инициалиировать окно правки письма и вагонов в письме
                        this.mcfd_lg = new MCFD(); // Создадим экземпляр окно правки
                        this.mcfd_lg.init({
                            static: true,
                            keyboard: false,
                            hidden: true,
                            centered: true,
                            form_dialog: this.form_rate_edit,
                            fsize: 'lg',
                            bt_close_text: langView('vs_usfee_title_button_Cancel', App.Langs),
                            bt_ok_text: langView('vs_usfee_button_Ok', App.Langs),
                            fn_show_modal: function (data) {
                                this.form_rate_edit.validation_rate_edit.clear_all();
                                if (data) {
                                    // Правим
                                    this.id_usage_fee_period_detali = data.id;
                                    this.form_rate_edit.el.datalist_code_stn_from.val(data.codeStnFrom);
                                    this.form_rate_edit.el.datalist_code_stn_on.val(data.codeStnTo);
                                    this.form_rate_edit.el.datalist_id_cargo_arrival.val(data.idCargoArrival);
                                    this.form_rate_edit.el.datalist_id_cargo_outgoing.val(data.idCargoOutgoing);
                                    this.form_rate_edit.el.input_checkbox_end_unload.val(data.arrivalEndUnload);
                                    this.form_rate_edit.el.input_checkbox_start_load.val(data.outgoingStartLoad);
                                    this.form_rate_edit.el.input_text_grace_time_value.val(data.graceTime);
                                    this.form_rate_edit.el.input_text_rate_value.val(data.rate);
                                    this.form_rate_edit.el.select_rate_currency.val(data.idCurrency);
                                } else {
                                    // Добавляем
                                    this.id_usage_fee_period_detali = 0;
                                    this.form_rate_edit.el.datalist_code_stn_from.val('');
                                    this.form_rate_edit.el.datalist_code_stn_on.val('');
                                    this.form_rate_edit.el.datalist_id_cargo_arrival.val('');
                                    this.form_rate_edit.el.datalist_id_cargo_outgoing.val('');
                                    this.form_rate_edit.el.input_checkbox_end_unload.val(false);
                                    this.form_rate_edit.el.input_checkbox_start_load.val(false);
                                    this.form_rate_edit.el.input_text_grace_time_value.val('');
                                    this.form_rate_edit.el.input_text_rate_value.val('');
                                    this.form_rate_edit.el.select_rate_currency.val(-1);
                                }
                            }.bind(this),
                            fn_shown_modal: function (row) {
                                this.form_rate_edit.validation_rate_edit.clear_all();
                                LockScreenOff();
                            }.bind(this),
                            fn_update: function (data) {

                            }.bind(this),
                            fn_click_ok: function (e) {
                                e.preventDefault();
                                this.form_rate_edit.clear_all();
                                this.form_rate_edit.$form.submit();
                                if (this.form_rate_edit.valid) {
                                    // Валидация успешна
                                    var result = this.form_rate_edit.data;
                                    if (result !== null && this.id_usage_fee_period !== null) {
                                        var operation = {
                                            id: this.id_usage_fee_period_detali,
                                            id_usage_fee_period: this.id_usage_fee_period,
                                            code_stn_from: result.datalist_code_stn_from,
                                            id_cargo_arrival: result.datalist_id_cargo_arrival,
                                            code_stn_to: result.datalist_code_stn_on,
                                            id_cargo_outgoing: result.datalist_id_cargo_outgoing,
                                            grace_time: result.input_text_grace_time_value,
                                            id_currency: result.select_rate_currency,
                                            rate: result.input_text_rate_value,
                                            arrival_end_unload: result.input_checkbox_end_unload,
                                            outgoing_start_load: result.input_checkbox_start_load,
                                            //user: App.User_Name,
                                        };
                                        this.apply_additional_conditions(operation);
                                    }
                                    //this.mcfd_lg.$modal_obj.modal('hide');
                                }
                            }.bind(this),
                        });
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = ['operators_wagons', 'genus_wagon', 'currency', 'external_station', 'cargo'];// [];
        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_usage_fee] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    //------------------------------------------------------------------------
    view_usage_fee.prototype.update_additional_conditions = function (id_usage_fee_period, callback) {

        // Инициализация кнопок правки доп условий
        var init_button_edit = function (el, on_edit, on_del) {
            this.$html = $('<div></div>', {
                id: el.id,
                class: 'btn-group btn-group-sm me-2',
                role: 'group'
            });
            var $icon_edit = $('<i class="fa-solid fa-pen-to-square"></i>');
            var $icon_del = $('<i class="fa-solid fa-trash"></i>');
            var $btn_edit = $('<button></button>', {
                id: 'edit-' + el.id,
                class: 'btn btn-warning',
                type: 'button',
            });
            if (typeof on_edit === 'function') {
                $btn_edit.on("click", on_edit);
            }
            $btn_edit.append($icon_edit);
            var $btn_del = $('<button></button>', {
                class: 'btn btn-danger',
                type: 'button',
            });
            if (typeof on_del === 'function') {
                $btn_del.on("click", on_del);
            }
            $btn_del.append($icon_del);
            this.$html.append($btn_edit).append($btn_del);
        }
        //<div class="input-group input-group-sm mb-3">
        //    <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
        //    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
        //</div>
        var init_view_field = function (id, label, value) {
            this.$html = $('<div></div>', {
                class: 'input-group input-group-sm mb-1'
            });
            var $span = $('<span></span>', {
                class: 'input-group-text fw-bold',
                id: id,
                text: label
            });
            var $input = $('<input></input>', {
                type: 'text',
                class: 'form-control',
                disabled: 'disabled',
                'aria-describedby': id,
                value: value
            });
            this.$html.append($span).append($input);
        }

        // Обновим
        this.clear_all();

        this.id_usage_fee_period = id_usage_fee_period;
        this.$list_rate.empty();
        // Добавим первый элемент (Добавить условие)
        var $li = $('<li></li>', {
            class: 'list-group-item list-group-item-action list-group-item-secondary'
        });
        var $div_info = $('<div></div>', {
            class: 'd-flex justify-content-between'
        });
        var $h6 = $('<h6></h6>', {
            class: 'mb-1'
        });
        $h6.append('Добавить доп. условие...');
        var $btng = $('<div></div>', {
            class: 'btn-group btn-group-sm me-2',
            role: 'group'
        });
        var $icon_add = $('<i class="fa-solid fa-circle-plus"></i>');
        var $btn_add = $('<button></button>', {
            class: 'btn btn-success',
            type: 'button',
        });
        $btn_add.on("click", function (e) {
            //Дбавить условие
            this.view_form_rate_edit(null);
        }.bind(this));
        $btn_add.append($icon_add);
        $btng.append($btn_add);
        $div_info.append($h6).append($btng);
        $li.append($div_info)
        this.$list_rate.append($li);
        //--------------------------------
        // Получить детали
        this.api_wsd.getViewUsageFeePeriodDetaliOfIdPeriod(id_usage_fee_period, function (data_detali) {
            if (data_detali && data_detali.length > 0) {
                //<a href="#" class="list-group-item list-group-item-action active" aria-current="true">
                //    <div class="d-flex w-100 justify-content-between">
                //        <h5 class="mb-1">List group item heading</h5>
                //        <small>3 days ago</small>
                //    </div>
                //    <p class="mb-1">Some placeholder content in a paragraph.</p>
                //    <small>And some small print.</small>
                //</a>

                $.each(data_detali, function (i, el) {
                    // Добавить полученные элементы
                    var $li = $('<li></li>', {
                        class: 'list-group-item list-group-item-action border-top border-success'
                    });
                    var $div_info = $('<div></div>', {
                        class: 'd-flex justify-content-between'
                    });
                    var $h6 = $('<h6></h6>', {
                        class: 'mb-1'
                    });
                    if (el.codeStnFrom !== null && el.codeStnTo === null) {
                        $h6.append('По прибытию...');
                    } else if (el.codeStnFrom === null && el.codeStnTo !== null) {
                        $h6.append('По отправке...');
                    } else {
                        if (el.idCargoArrival !== null && el.idCargoOutgoing === null) {
                            $h6.append('По прибытию груза...');
                        } else if (el.idCargoArrival === null && el.idCargoOutgoing !== null) {
                            $h6.append('По отправке груза...');
                        } else { $h6.append('...'); }
                    }
                    // Кнопки управления
                    var btng = new init_button_edit(el, function (e) {
                        //Дбавить условие
                        this.view_form_rate_edit(el);
                    }.bind(this), function (e) {
                        //Дбавить условие
                        this.view_form_rate_delete(el);
                    }.bind(this));
                    $div_info.append($h6).append(btng.$html);
                    $li.append($div_info);
                    if (el.arrivalEndUnload === true) {
                        $li.append(new init_view_field('arrivalEndUnload', 'По оканчанию выгрузки:', el.arrivalEndUnload ? 'Да' : '').$html);
                    }
                    if (el.codeStnFrom !== null) {
                        $li.append(new init_view_field('codeStnFrom', 'Станция (ОТПР):', el['fromStationName' + ucFirst(App.Lang)]).$html);
                    }
                    if (el.idCargoArrival !== null) {
                        $li.append(new init_view_field('idCargoArrival', 'Груз (ПРИБ):', el['arrivalCargoName' + ucFirst(App.Lang)]).$html);
                    }
                    if (el.outgoingStartLoad === true) {
                        $li.append(new init_view_field('outgoingStartLoad', 'По оканчанию выгрузки:', el.outgoingStartLoad ? 'Да' : '').$html);
                    }
                    if (el.codeStnTo !== null) {
                        $li.append(new init_view_field('codeStnTo', 'Станция (ПРИБ):', el['toStationName' + ucFirst(App.Lang)]).$html);
                    }
                    if (el.idCargoOutgoing !== null) {
                        $li.append(new init_view_field('idCargoOutgoing', 'Груз (ОТПР):', el['outgoingCargoName' + ucFirst(App.Lang)]).$html);
                    }
                    if (el.graceTime !== null) {
                        $li.append(new init_view_field('graceTime', 'Льготное время:', el.graceTime).$html);
                    }
                    if (el.rate !== null) {
                        //$li.append(new init_view_field('graceTime', 'Льготное время:', el.grace_time).$html);
                    }
                    this.$list_rate.append($li);
                }.bind(this));
            } else {
            }
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    //-----------------------------------------------------------------------------
    // Форма правки доп. условий, показать форму
    view_usage_fee.prototype.view_form_rate_edit = function (row) {
        this.main_alert.clear_message();
        this.form_rate_edit.clear_all();
        this.mcfd_lg.open(
            row ? langView('vs_usfee_title_form_edit_additional_conditions', App.Langs) : langView('vs_usfee_title_form_add_additional_conditions', App.Langs),
            row,
            function () {
                //if (typeof callback === 'function') {
                //    callback(this.select_vagons);
                //}
            }.bind(this),
            function () {
                this.main_alert.out_warning_message(langView('vs_usfee_cancel_update_additional_conditions', App.Langs));
            }.bind(this));
    };
    // Форма правки письма, показать форму
    view_usage_fee.prototype.view_form_rate_delete = function (row) {
        this.main_alert.clear_message();
        var mess = langView('vs_usfee_mess_run_delete_additional_conditions', App.Langs).format(
            row['fromStationName' + ucFirst(App.Lang)] ? row['fromStationName' + ucFirst(App.Lang)] : '',
            row['arrivalCargoName' + ucFirst(App.Lang)] ? row['arrivalCargoName' + ucFirst(App.Lang)] : '',
            row['toStationName' + ucFirst(App.Lang)] ? row['toStationName' + ucFirst(App.Lang)] : '',
            row['outgoingCargoName' + ucFirst(App.Lang)] ? row['outgoingCargoName' + ucFirst(App.Lang)] : '',
            row.graceTime ? row.graceTime : '', row.rate ? row.rate : '', row.currencyCodeCc ? row.currencyCodeCc : '');

        this.mcf_lg.open(
            langView('vs_usfee_title_form_apply_additional_conditions', App.Langs),
            mess,
            function () {
                //
                this.apply_additional_conditions_delete(row.id, function () {

                }.bind(this));
            }.bind(this),
            function () {
                this.main_alert.out_warning_message(langView('vs_usfee_cancel_delete_additional_conditions', App.Langs));
            }.bind(this));
    };
    // Применить правку льготного условия
    view_usage_fee.prototype.apply_additional_conditions = function (data) {
        LockScreen(langView('vs_usfee_mess_run_operation_additional_conditions', App.Langs));
        var mes_res = data.id === 0 ? langView('vs_usfee_mess_operation_add_additional_conditions_ok', App.Langs) : langView('vs_usfee_mess_operation_edit_additional_conditions_ok', App.Langs);
        //
        this.api_wsd.postUpdateUsageFeePeriodDetali(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('vs_usfee_mess_error_api', App.Langs).format(result.status, result.title);
                //console.log('[view_usage_fee] [postUpdateUsageFeePeriodDetali] :' + mess);
                this.form_rate_edit.validation_rate_edit.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_rate_edit.validation_rate_edit.out_error_message(err + ":" + result.errors[err]);
                        //console.log('[view_usage_fee] [postUpdateUsageFeePeriodDetali] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                // ошибки выполнения нет проверим ответ запроса
                if (result && result >= 0) {
                    this.form_rate_edit.validation_rate_edit.clear_all();
                    this.mcfd_lg.$modal_obj.modal('hide');
                    this.update_additional_conditions(this.id_usage_fee_period, function () {
                        LockScreenOff();
                        this.main_alert.out_info_message(mes_res);
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.form_rate_edit.validation_rate_edit.out_error_message(langView('vs_usfee_mess_error_operation_additional_conditions_run', App.Langs).format(result.result));
                }
            }

        }.bind(this));
    };
    // Выполнить операцию удалить льготное условие
    view_usage_fee.prototype.apply_additional_conditions_delete = function (id) {
        LockScreen(langView('vs_usfee_mess_run_operation_delete_additional_conditions', App.Langs));
        this.api_wsd.deleteUsageFeePeriodDetali(id, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('vs_usfee_mess_error_api', App.Langs).format(result.status, result.title);
                //console.log('[view_usage_fee] [deleteUsageFeePeriodDetali] :' + mess);
                this.main_alert.out_error_message(mess);

                if (result.errors) {
                    for (var err in result.errors) {
                        this.main_alert.out_error_message(err + ":" + result.errors[err]);
                        //console.log('[view_usage_fee] [deleteUsageFeePeriodDetali] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                // ошибки выполнения нет проверим ответ запроса
                if (result && result >= 0) {
                    this.main_alert.clear_message();
                    this.update_additional_conditions(this.id_usage_fee_period, function () {
                        LockScreenOff();
                        this.main_alert.out_info_message(langView('vs_usfee_mess_operation_delete_additional_conditions_ok', App.Langs));
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.main_alert.out_error_message(langView('vs_usfee_mess_error_operation_delete_additional_conditions_run', App.Langs).format(result));
                }
            }
        }.bind(this));
    };
    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_usage_fee.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    //  
    view_usage_fee.prototype.clear_all = function () {
        //this.info_alert.clear_message();
        //this.form_searsh_letters.clear_all();
        /*        this.form_verification_invoices_setup.clear_all();*/
        //this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_usage_fee.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_usage_fee = view_usage_fee;

    window.App = App;
})(window);
