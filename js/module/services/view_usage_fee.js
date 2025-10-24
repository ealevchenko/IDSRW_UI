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

            //'vs_usfee_title_button_add_letter': 'Добавить новое письмо',
            //'vs_usfee_title_button_edit_letter': 'Привить существующее письмо',
            //'vs_usfee_title_button_delete_letter': 'Удалить письмо (вагоны в письме должны быть не закрыты!)',

            //'vs_usfee_title_button_delete_wagon': 'Удалить вагон из письма (ошибочно добавленный)',
            //'vs_usfee_title_button_cancel_letter': 'Отмена вагона в письме (собственник отменил письмо)',
            //'vs_usfee_title_button_clear_letter': 'Очистить статус правки вагона (отмена правки!)',

            //'vs_usfee_title_form_apply_delete_letter': 'УДАЛИТЬ ПИСЬМО?',
            //'vs_usfee_mess_run_delete_letter': 'Выполнить операцию  "УДАЛИТЬ ПИСЬМО"? Будет удаленно письмо [{0}] от {1}.',
            //'vs_usfee_cancel_delete_letter': 'Отмена операции "УДАЛИТЬ ПИСЬМО"',

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
            //'vs_usfee_mess_war_form_letters_edit_exist_wagon': 'Вагон {0} уже добавлен в письмо!',

            //'vs_usfee_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',
            //'vs_usfee_mess_error_operation_run': 'При выполнении операции «ПРАВКИ ИНСТРУКТИВНЫХ ПИСЕМ» произошла ошибка, код ошибки: {0}',
            //'vs_usfee_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',

            //'vs_usfee_mess_run_operation_edit_letter': 'Выполняю операцию "ПРАВКИ ИНСТРУКТИВНЫХ ПИСЕМ"',
            //'vs_usfee_mess_run_operation_delete_letter': 'Выполняю операцию "УДАЛИТЬ ИНСТРУКТИВНОЕ ПИСЬМО"',
            //'vs_usfee_mess_operation_add_letter_ok': 'Операция "ДОБАВИТЬ ИНСТРУКТИВНОЕ ПИСЬМО" - выполнена',
            //'vs_usfee_mess_operation_edit_letter_ok': 'Операция "ПРАВИТЬ ИНСТРУКТИВНОЕ ПИСЬМО" - выполнена',
            //'vs_usfee_mess_operation_delete_letter_ok': 'Операция "УДАЛИТЬ ИНСТРУКТИВНОЕ ПИСЬМО" - выполнена',
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
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        this.list_of_payment_terms_table = new this.fe_ui.bs_col({
            id: 'table-payment-terms',
            pref: 'xl',
            size: 9,
            //class: 'rounded border border-secondary'
        }); // Окно таблицы
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
                var process = 3;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        //this.list_of_letters_setup.$html.append(this.form_letters_setup.$form);
                        //this.info_alert.out_info_message(langView('vs_usfee_mess_info_init', App.Langs));
                        // На проверку окончания инициализации
                        //----------------------------------
                        //this.start = moment().subtract(3, "year");
                        //this.stop = moment();
                        //this.update(this.start, this.stop, function () {
                        this.tab_list_of_letters.view(this.list_operators);
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
                this.tab_list_of_letters = new TSRV('div#table-list-of-operators');
                this.tab_list_of_letters.init({
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
                                this.tab_list_of_letters.tab_com.obj_t_report.rows().select();
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
                        var rows_select = this.tab_list_of_letters.tab_com.get_select_row();
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
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        //this.list_period = [];
                        //if (rowData && rowData.length > 0) {
                        //    LockScreen(langView('vs_usfee_load_info', App.Langs));
                        //    $.each(rowData, function (key, el) {
                        //        this.api_wsd.getViewUsageFeePeriodOfOperatorGenus(el.idOperator, el.idGenus, function (data) {
                        //            if (data && data.length > 0) {
                        //                this.list_period = this.list_period.concat(data);
                        //            } else {

                        //            }
                        //        }.bind(this));
                        //    }.bind(this));
                        //    LockScreenOff();

                        //    //    if (this.list_operators_genus_all && this.list_operators_genus_all.length > 0) {
                        //    //        $.each(rowData, function (key, el) {
                        //    //            var genus = this.list_operators_genus_all.filter(function (i) {
                        //    //                return (i.parentId === null && i.idOperator === el.id) || (i.parentId !== null && i.parentId === el.id); //
                        //    //            }.bind(this));
                        //    //            this.list_operators_genus = this.list_operators_genus.concat(genus);
                        //    //        }.bind(this));
                        //    //    }
                        //} else {

                        //}
                    }.bind(this),
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
                                        return moment().isBefore(data.usageFeePeriodStop);
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
                        //this.filing_wagons_alert.clear_message();
                        if (rowData && rowData.length > 0) {
                            if (!moment().isBefore(rowData[0].usageFeePeriodStop)) {
                                e.preventDefault();
                                //this.filing_wagons_alert.out_warning_message(langView('vopcf_mess_warning_wagon_ban_select_status', App.Langs).format(rowData[0].num, this.view_status_fw_wagons(curr_status), this.view_status_fw_wagons(this.fw_status)));
                            }
                        }
                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        LockScreen(langView('vs_usfee_load_info', App.Langs));
                        var rows_select = this.tab_list_payment_terms.tab_com.get_select_row();
                        //this.list_period = [];
                        if (rows_select && rows_select.length > 0) {

                        } else {

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
    //
    view_usage_fee.prototype.update = function (start, stop, callback) {
        // Обновим
        this.clear_all();
        this.list_letters = [];
        this.select_letters = [];
        //this.form_verification_invoices_setup.el.input_text_presented1.val('');
        //this.form_verification_invoices_setup.el.input_text_presented2.val('');
        //this.form_verification_invoices_setup.el.input_text_presented3.val('');
        //this.form_searsh_letters.el.textarea_documents_searsh.val('');
        //this.form_searsh_letters.el.select_code_payer.val('');
        //this.form_searsh_letters.el.datalist_acts.val('');
        //this.form_searsh_letters.el.select_id_cargo.val('');
        //this.form_searsh_letters.el.select_id_station_from.val('');
        //this.form_searsh_letters.el.select_id_station_on.val('');
        //this.form_searsh_letters.el.select_id_operator.val('');
        //this.code_payer = -1;
        //this.act = -1;
        //this.id_cargo = -1;
        //this.code_station_from = -1;
        //this.code_station_on = -1;
        //this.id_operator = -1;
        //this.list_acts = [];

        var sel_start = moment(start).format("YYYY-MM-DDTHH:mm");
        var sel_stop = moment(stop).format("YYYY-MM-DDTHH:mm");
        LockScreen(langView('vs_usfee_update_letters', App.Langs));
        this.main_alert.clear_message();
        this.info_alert.clear_message();
        this.api_wsd.getViewInstructionalLettersOfPeriod(sel_start, sel_stop, function (letters) {
            if (letters !== null && letters.length > 0) {
                this.list_letters = letters;
                this.select_letters = letters;
                this.select_apply(this.list_letters, function (select_letters) {
                    this.view_select(select_letters);
                    this.info_alert.out_info_message(langView('vs_usfee_mess_info_select_letters', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.list_letters.length, select_letters.length));
                }.bind(this));
            } else {
                this.tab_list_of_letters.view([]);
                this.info_alert.out_info_message(langView('vs_usfee_mess_info_searsh_letters', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.list_letters.length));
            }
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Применить выбор
    view_usage_fee.prototype.select_apply = function (list_letters, callback) {
        // Обнулим списки
        LockScreen(langView('vs_usfee_select_letters', App.Langs));
        //this.clear_all();
        this.main_alert.clear_message();
        this.info_alert.clear_message();

        if (list_letters && list_letters.length > 0) {
            this.select_letters = list_letters;

            var create_new = this.form_letters_setup.el.input_checkbox_create_new.val();
            var in_progress = this.form_letters_setup.el.input_checkbox_in_progress.val();
            var done = this.form_letters_setup.el.input_checkbox_done.val();
            var replacement = this.form_letters_setup.el.input_checkbox_replacement.val();
            var canceled = this.form_letters_setup.el.input_checkbox_canceled.val();
            var deleted = this.form_letters_setup.el.input_checkbox_deleted.val();

            //if (create_new) {
            this.select_letters = this.select_letters.filter(function (i) {
                var close = i.instructionalLettersWagons.filter(function (o) { return o.close !== null }.bind(this));
                var duration = moment.duration(moment().diff(moment(i.dt)));
                var days = duration.asDays();
                if (done && close && close.length === i.instructionalLettersWagons.length) {
                    return true;
                }
                var gr = i.instructionalLettersWagons.find(function (o) {
                    return (create_new && o.status === 0 && o.close === null) ||
                        (in_progress && o.status === 1 && o.close === null) ||
                        (replacement && o.status === 3 || (o.status < 2 && o.close !== null)) ||
                        (canceled && o.status === 4) ||
                        (deleted && o.status === 0 && days >= 30) ||
                        o.status === null;
                }.bind(this));
                return gr !== undefined;
            }.bind(this));
            //}

            // Выборка из списка документов
            var el_tln = this.form_letters_setup.el.textarea_lett_num;//.$element;
            this.list_docs = this.form_letters_setup.validation_common_lett.check_control_is_valid_docs_string(el_tln, true, false, true);
            if (this.list_docs) {
                this.select_letters = this.select_letters.filter(function (i) {
                    return this.list_docs.indexOf(i.num) >= 0;
                }.bind(this));
            };
            // Выборка из списка номеров вагонов
            var el_tlw = this.form_letters_setup.el.textarea_lett_wagon;//.$element;
            this.list_wagons = this.form_letters_setup.validation_common_lett.check_control_is_valid_nums(el_tlw, false, true, true);
            if (this.list_wagons) {
                this.select_letters = this.select_letters.filter(function (i) {
                    var gr = i.instructionalLettersWagons.find(function (o) {
                        return this.list_wagons.indexOf(o.num) >= 0;
                    }.bind(this));
                    return gr !== undefined;
                }.bind(this));
            };
            //this.info_alert.out_info_message(langView('vs_usfee_mess_info_select_letters', App.Langs).format(moment(this.start).format("YYYY-MM-DD HH:mm"), moment(this.stop).format("YYYY-MM-DD HH:mm"), list_letters.length, this.select_letters.length));

        } else {
            this.select_letters = [];
            //this.info_alert.out_info_message(langView('vs_usfee_mess_info_init', App.Langs));
        }
        // Событие обновили данные
        if (typeof callback === 'function') {
            callback(this.select_letters);
        }
    };
    // Применить выбор
    view_usage_fee.prototype.view_select = function (select) {
        this.tab_list_of_letters.view(select);
        //if (select && select.length > 0) {

        //}
    };
    //-----------------------------------------------------------------------------
    // Форма правки письма, показать форму
    view_usage_fee.prototype.view_form_letters_edit = function (row) {
        //this.form_letters_edit.validation_letters_edit.clear_all();
        this.main_alert.clear_message();
        this.form_letters_edit.clear_all();
        this.mcfd_lg.open(
            row ? langView('vs_usfee_title_form_edit', App.Langs) : langView('vs_usfee_title_form_add', App.Langs),
            row,
            function () {
                if (typeof callback === 'function') {
                    callback(this.select_vagons);
                }
            }.bind(this),
            function () {
                //this.main_alert.out_warning_message(langView('vs_via_cancel_update_presented', App.Langs));
            }.bind(this));
    };
    // Форма правки письма, показать форму
    view_usage_fee.prototype.view_form_letters_delete = function (row) {
        this.main_alert.clear_message();
        //this.form_letters_edit.clear_all();
        var mess = langView('vs_usfee_mess_run_delete_letter', App.Langs).format(row.num, moment(row.dt).format(format_date));

        this.mcf_lg.open(
            langView('vs_usfee_title_form_apply_delete_letter', App.Langs),
            mess,
            function () {
                //
                this.apply_delete(row.id, function () {

                }.bind(this));
            }.bind(this),
            function () {
                this.main_alert.out_warning_message(langView('vs_usfee_cancel_delete_letter', App.Langs));
            }.bind(this));
    };
    // Форма правки письма, добавить вагон в список с поиском в системе 
    view_usage_fee.prototype.add_wagons_letter_form_letters_edit = function (callback) {
        // Выборка из списка номеров вагонов
        this.form_letters_edit.validation_letters_edit.clear_all();
        LockScreen(langView('vs_usfee_mess_shearch_wagon', App.Langs));
        // Получим список вагонов для добавления и сделаем проверку
        var el_tlw = this.form_letters_edit.el.textarea_lett_wagons;//.$element;
        this.list_wagons = this.form_letters_edit.validation_letters_edit.check_control_is_valid_nums(el_tlw, true, false, true);
        // Проверим на существующие вагоны
        var valid = true;
        if (this.list_wagons && this.list_wagons.length > 0 && this.wagons_letter && this.wagons_letter.length > 0) {
            $.each(this.wagons_letter, function (i, el) {
                var index = this.list_wagons.indexOf(el.num);
                if (index >= 0) {
                    // ошибка вагон уже существует
                    this.form_letters_edit.validation_letters_edit.out_warning_message(langView('vs_usfee_mess_war_form_letters_edit_exist_wagon', App.Langs).format(el.num));
                    valid = false;
                } else {
                    // Добавим вагон в список если этот вагон был добавлен ранее
                    if (el.id === null) { this.list_wagons.push(el.num); }
                };
            }.bind(this));
        }
        // Проходим далее на добавление вагонов
        if (this.list_wagons && valid) {
            //Получим дату письма
            var dt_lett = this.form_letters_edit.el.input_datetime_letter_date.val();
            var option = {
                nums: this.list_wagons,
                date_lett: moment(dt_lett).format("YYYY-MM-DD"),
            }
            this.api_wsd.postStatusInstructionalLettersWagons(option, function (status_wagon_lett) {
                if ((status_wagon_lett !== null && status_wagon_lett.length > 0) || (this.select_row !== null && this.select_row.instructionalLettersWagons !== null && this.select_row.instructionalLettersWagons.length > 0)) {
                    this.data_add_wagons_letter_form_letters_edit(status_wagon_lett, function (wagons_letter) {
                        this.wagons_letter_add = wagons_letter;
                        this.view_table_form_letters_edit();
                        this.form_letters_edit.el.textarea_lett_wagons.val('');
                    }.bind(this))
                } else {
                    this.wagons_letter_add = [];
                    this.view_table_form_letters_edit();
                    this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_usfee_mess_form_letters_edit_not_status_wagons', App.Langs));
                }
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        } else {
            // Событие обновили данные
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        };

    };
    // Преобразовать информацию по вагонам (режим добавления)
    view_usage_fee.prototype.data_add_wagons_letter_form_letters_edit = function (data, callback) {
        var wagons_letter_add = [];
        // Пройдемся по статусам добавленных вагонов
        var not_close_letter_wagon_id = null;
        var not_close_letter_wagon_status = null;
        var not_close_letter_id = null;
        var not_close_letter_num = null;
        var not_close_letter_dt = null;
        var note_offer = "";

        if (data && data.length > 0) {
            $.each(data, function (i, el) {
                //
                not_close_letter_wagon_id = null;
                not_close_letter_wagon_status = null;
                not_close_letter_id = null;
                not_close_letter_num = null;
                not_close_letter_dt = null;
                note_offer = "";

                if (el.not_close) {
                    not_close_letter_wagon_id = el.not_close.id;
                    not_close_letter_wagon_status = el.not_close.status;
                    not_close_letter_id = el.not_close.idInstructionalLetters;
                    if (el.not_close.idInstructionalLettersNavigation !== null) {
                        not_close_letter_num = el.not_close.idInstructionalLettersNavigation.num;
                        not_close_letter_dt = el.not_close.idInstructionalLettersNavigation.dt;
                    }
                    note_offer = langView('vs_usfee_mess_note_offer_not_close', App.Langs).format(not_close_letter_num, moment(not_close_letter_dt).format(format_date_ru));
                } else {
                    switch (el.status) {
                        case 0: {
                            note_offer = langView('vs_usfee_mess_note_offer_status_0', App.Langs);
                            break;
                        }
                        case 1: {
                            note_offer = langView('vs_usfee_mess_note_offer_status_1', App.Langs);
                            break;
                        }
                        case 2: {
                            note_offer = langView('vs_usfee_mess_note_offer_status_2', App.Langs);
                            break;
                        }
                        default: {
                            note_offer = langView('vs_usfee_mess_note_offer_status_default', App.Langs);
                            break;
                        }
                    }
                }
                //
                wagons_letter_add.push({
                    id: null,
                    status_edit: 1,
                    num: el.num,
                    rentOperatorAbbrRu: (el.rent !== null && el.rent.idOperatorNavigation !== null ? el.rent.idOperatorNavigation.abbrRu : null),
                    rentOperatorAbbrEn: (el.rent !== null && el.rent.idOperatorNavigation !== null ? el.rent.idOperatorNavigation.abbrEn : null),
                    status: el.status,
                    close: el.close,
                    note: el.note,
                    error: el.error,
                    id_wir: el.id_wir,
                    dateAdoption: (el.wir !== null && el.wir.idArrivalCarNavigation !== null && el.wir.idArrivalCarNavigation.idArrivalNavigation !== null ? el.wir.idArrivalCarNavigation.idArrivalNavigation.dateAdoption : null),
                    dateOutgoing: (el.wir !== null && el.wir.idOutgoingCarNavigation !== null && el.wir.idOutgoingCarNavigation.idOutgoingNavigation !== null ? el.wir.idOutgoingCarNavigation.idOutgoingNavigation.dateOutgoing : null),
                    arrivalOperatorAbbrRu: null,
                    arrivalOperatorAbbrEn: null,
                    not_close_letter_wagon_id: not_close_letter_wagon_id,
                    not_close_letter_wagon_status: not_close_letter_wagon_status,
                    not_close_letter_id: not_close_letter_id,
                    not_close_letter_num: not_close_letter_num,
                    not_close_letter_dt: not_close_letter_dt,
                    note_offer: note_offer,
                })
            }.bind(this));
        }
        if (typeof callback === 'function') {
            callback(wagons_letter_add);
        }
    }
    // Преобразовать информацию по вагонам (режим правки)
    view_usage_fee.prototype.data_edit_wagons_letter_form_letters_edit = function (data, callback) {
        var wagons_letter_edit = [];
        // Пройдемся по вагонам для правки
        if (data && data.length > 0) {
            $.each(data, function (i, el) {
                wagons_letter_edit.push({
                    id: el.id,
                    status_edit: null,
                    num: el.num,
                    rentOperatorAbbrRu: el.rentOperatorAbbrRu,
                    rentOperatorAbbrEn: el.rentOperatorAbbrEn,
                    status: el.status,
                    close: el.close,
                    note: el.note,
                    error: 0,
                    id_wir: el.idWir,
                    dateAdoption: el.dateAdoption,
                    dateOutgoing: el.dateOutgoing,
                    arrivalOperatorAbbrRu: el.arrivalOperatorAbbrRu,
                    arrivalOperatorAbbrEn: el.arrivalOperatorAbbrEn,
                    not_close_letter_wagon_id: null,
                    not_close_letter_wagon_status: null,
                    not_close_letter_id: null,
                    not_close_letter_num: null,
                    not_close_letter_dt: null,
                    note_offer: el.note,
                });
            }.bind(this));
        }
        if (typeof callback === 'function') {
            callback(wagons_letter_edit);
        }
    }
    // Отобразить вагоны в таблице (для правки и добавления)
    view_usage_fee.prototype.view_table_form_letters_edit = function () {
        this.wagons_letter = this.wagons_letter_add.concat(this.wagons_letter_edit);
        this.form_letters_edit.tab_wagons.view(this.wagons_letter);
    }
    // Валидация станции отправки
    view_usage_fee.prototype.validation_letter_destination_station = function (code, id, not_null, not_alert) {
        // Нет данных
        var fn_out_null = function (not_null) {
            // нет входных данных данных
            if (not_null) {
                this.form_letters_edit.set_element_validation_error(id, langView('vs_usfee_mess_form_letters_edit_letter_destination_station', App.Langs), not_alert);
                return false;
            } else {
                this.form_letters_edit.set_element_validation_ok(id, "", not_alert);
                return true;
            }
        }
        // Нет данных в базе данных
        var fn_out_undefined = function () {
            this.form_letters_edit.set_element_validation_error(id, langView('vs_usfee_mess_form_letters_edit_not_db_letter_destination_station', App.Langs), not_alert);
            return false;
        }
        // Ок
        var fn_out_ok = function () {
            // Ок
            this.form_letters_edit.set_element_validation_ok(id, "", not_alert);
            return true;
        }
        //this.form_letters_edit.validation_letters_edit.clear_all();
        // Проверка
        if (code === null || code === '') {
            return fn_out_null.call(this, not_null);
        }
        if (code === undefined) {
            // Нет в базе
            return fn_out_undefined.call(this);
        }
        this.select_obj = this.api_dir.getExistExternalStation(code, null);
        if (this.select_obj) {
            return fn_out_ok.call(this);
        } else {
            if (this.select_obj === null) {
                return fn_out_undefined.call(this);
            } else {
                return fn_out_null.call(this, not_null);
            }
        }
    }
    // Применить правку
    view_usage_fee.prototype.apply = function (data) {
        LockScreen(langView('vs_usfee_mess_run_operation_edit_letter', App.Langs));
        var mes_res = data.id === 0 ? langView('vs_usfee_mess_operation_add_letter_ok', App.Langs) : langView('vs_usfee_mess_operation_edit_letter_ok', App.Langs);

        this.api_wsd.postUpdateInstructionalLetters(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('vs_usfee_mess_error_api', App.Langs).format(result.status, result.title);
                //console.log('[view_usage_fee] [postUpdateInstructionalLetters] :' + mess);
                this.form_letters_edit.validation_letters_edit.out_error_message(mess);

                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_letters_edit.validation_letters_edit.out_error_message(err + ":" + result.errors[err]);
                        //console.log('[view_usage_fee] [postUpdateInstructionalLetters] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                // ошибки выполнения нет проверим ответ запроса
                if (result && result.result > 0) {
                    this.form_letters_edit.validation_letters_edit.clear_all();
                    this.mcfd_lg.$modal_obj.modal('hide');
                    this.update(this.start, this.stop, function () {
                        LockScreenOff();
                        this.main_alert.out_info_message(mes_res);
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_usfee_mess_error_operation_run', App.Langs).format(result.result));
                    // Выведем ошибки по вагонно.
                    $.each(result.listResult, function (i, el) {
                        if (el.result <= 0) this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_usfee_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                    }.bind(this));
                }
            }

        }.bind(this));
    };
    // Выполнить операцию удалить
    view_usage_fee.prototype.apply_delete = function (id) {
        LockScreen(langView('vs_usfee_mess_run_operation_delete_letter', App.Langs));
        this.api_wsd.deleteInstructionalLetters(id, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('vs_usfee_mess_error_api', App.Langs).format(result.status, result.title);
                //console.log('[view_usage_fee] [deleteInstructionalLetters] :' + mess);
                this.main_alert.out_error_message(mess);

                if (result.errors) {
                    for (var err in result.errors) {
                        this.main_alert.out_error_message(err + ":" + result.errors[err]);
                        //console.log('[view_usage_fee] [deleteInstructionalLetters] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                // ошибки выполнения нет проверим ответ запроса
                if (result && result.result > 0) {
                    this.main_alert.clear_message();
                    this.update(this.start, this.stop, function () {
                        LockScreenOff();
                        this.main_alert.out_info_message(langView('vs_usfee_mess_operation_delete_letter_ok', App.Langs));
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.main_alert.out_error_message(langView('vs_usfee_mess_error_operation_run', App.Langs).format(result.result));
                    // Выведем ошибки по вагонно.
                    $.each(result.listResult, function (i, el) {
                        if (el.result <= 0) this.main_alert.out_error_message(langView('vs_usfee_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                    }.bind(this));
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
        this.info_alert.clear_message();
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
