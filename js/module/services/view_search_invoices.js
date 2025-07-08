/* ===============================================
-= Модуль поиска накладных по прибытию и отправке =-
  + js/view/shared/common.js
==================================================*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;


    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'vs_shinv_card_header_search_invoices': 'ПОИСК НАКЛАДНЫХ',
            'vs_shinv_card_header_search_invoices_arrival': 'ПО ПРИБЫТИЮ',
            'vs_shinv_card_header_search_invoices_outgoing': 'ПО ОТПРАВКЕ',
            'vs_shinv_mess_init_module': 'Инициализация модуля view_search_invoices',
            //    'vs_shinv_mess_load_operation': 'Загружаю форму операции',

            //    'vs_shinv_title_form_button_apply': 'Править документ',
            //    'vs_shinv_title_form_apply_button_title': 'Править документ ...',

            'vs_shinv_title_label_num_epd': 'Найти накладную:',
            'vs_shinv_title_placeholder_num_epd': 'Найти накладную',
            'vs_shinv_text_label_num_epd': 'Введите номер накладной ...',

            //    'vs_shinv_title_label_doc_pay': 'Тариф ПРИБ:',
            //    'vs_shinv_title_placeholder_doc_pay': 'Тариф ПРИБ',
            //    'vs_shinv_text_label_doc_pay': 'Скорректируйте тариф ПРИБЫТИЯ ...',

            //    'vs_shinv_title_label_payer': 'Плательщик:',
            //    'vs_shinv_title_placeholder_payer': 'Плательщик',
            //    'vs_shinv_text_label_payer': 'Выберите плательщика ...',

            //    'vs_shinv_title_label_tariff_contract': 'Ж.д. тариф по договору, грн:',
            //    'vs_shinv_title_placeholder_tariff_contract': 'Ж.д. тариф по договору',
            //    'vs_shinv_text_label_tariff_contract': 'Введите Ж.д. тариф по договору(грн)...',

            'vs_shinv_title_button_num_epd': 'Найти накладную...',
            //    'vs_shinv_title_button_doc_pay': 'Обновить тариф прибытия...',
            //    'vs_shinv_title_button_payer': 'Обновить плательщика...',
            //    'vs_shinv_title_button_tariff_contract': 'Обновить ж.д. тариф по договору...',

            //    'vs_shinv_mess_valid_not_payer': 'Указанного плателщика нет в справочнике ИДС',
            //    'vs_shinv_mess_valid_payer': 'Укажите плательщика',

            'vs_shinv_title_button_Cancel': 'Отмена',
            'vs_shinv_button_Ok': 'Применить',

            //    'vs_shinv_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            //    'vs_shinv_mess_run_update_document_pay': 'Выполнить обновление "Тарифа ПРИБЫТИЯ", заменить тариф [{0}] на новый тариф [{1}].',
            //    'vs_shinv_mess_ok_update_document_pay': 'По документу №{0} обновлен "Тариф ПРИБЫТИЯ", новый тариф [{1}].',
            //    'vs_shinv_mess_error_update_document_pay': 'При обновлении "Тарифа ПРИБЫТИЯ" [{0}], документа № {1} - произошла ошибка. Код ошибки {2}',
            //    'vs_shinv_cancel_update_document_pay': 'Отмена обновления "Тарифа ПРИБЫТИЯ"',

            //    'vs_shinv_mess_run_update_cost_calculation': 'Выполнить обновление расчета по плательщику {0},с тарифом по договору [{1}].',
            //    'vs_shinv_mess_ok_update_cost_calculation': 'По документу №{0} выполнен расчет, обновлен плательщик {1} и тариф {2}.',
            //    'vs_shinv_mess_error_update_cost_calculation': 'При обновлении плательщика {0} и тарифа {1}, документа № {3} - произошла ошибка. Код ошибки {4}',
            //    'vs_shinv_cancel_update_cost_calculation': 'Отмена обновления расчета по плательщику',

            'vs_shinv_mess_error_not_document': 'Не введен № накладной!',
            //    'vs_shinv_mess_error_document_pay_not_change': 'Тариф без изменений!',
            //    'vs_shinv_mess_error_payer_not_change': 'Плательщик без изменений!',
            //    'vs_shinv_mess_error_tariff_contract_not_change': 'Ж.д. тариф по договору без изменений!',а

            'vs_shinv_load_main_docs': 'Загружаю документы за период...',
            'vs_shinv_searsh_main_docs': 'Поиск документов по номеру накладной {0}...',
            //    'vs_shinv_load_docs': 'Загружаю информацию по накладной {0}...',

            'vs_shinv_mess_info_init': 'Введите номер накладной, и нажмите поиск.',
            'vs_shinv_mess_info_add_main_docs': 'По номеру накладной {0} найдено {1} накладных',

            'vs_shinv_mess_war_not_select_docs': 'Не введен номер накладной для поиска накладной!',
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

    var ALERT = App.alert_form;
    var FD = App.form_dialog;

    var VFSP = App.view_form_select_period; // форма выбора периода

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var IDS_ARRIVAL = App.ids_arrival;
    var IDS_OUTGOING = App.ids_outgoing;

    var TSRV = App.table_services;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_search_invoices(selector) {
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
    view_search_invoices.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_search_invoices');
        LockScreen(langView('vs_shinv_mess_init_module', App.Langs));
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
        // Создадим ссылку на модуль работы с базой данных
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });
        this.ids_arrival = this.settings.ids_arrival ? this.settings.ids_arrival : new IDS_ARRIVAL({ url_api: App.Url_Api });
        this.ids_outgoing = this.settings.ids_outgoing ? this.settings.ids_outgoing : new IDS_OUTGOING({ url_api: App.Url_Api });

        this.mcf_lg = new MCF(); // Создадим экземпляр окно сообщений
        this.mcf_lg.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'lg',
            bt_close_text: langView('vs_shinv_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_shinv_button_Ok', App.Langs),
        });

        this.list_epd = [];
        this.id_doc = null;
        this.ArrivalUzDocument = null;
        //this.ArrivalUzVagon = null;
        this.start = null;
        this.stop = null;
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
        // Создать макет панели (Область группа вагонов)
        this.card_services = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 mt-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_shinv_card_header_search_invoices', App.Langs),
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
        this.div_form_period = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 12,
        }); // Окно настроек
        row.$html.append(this.div_form_period.$html)
        this.card_services.body.$html.append(row.$html);
        //------------------------------------------------------
        // Создать макет панели (Документы по прибытию)
        this.search_invoices_arrival = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_shinv_card_header_search_invoices_arrival', App.Langs),
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
        this.search_invoices_arrival_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.search_invoices_arrival_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_search_invoices_arrival = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.search_invoices_arrival_table.$html.append(this.alert_search_invoices_arrival.$html);
        this.search_invoices_arrival_alert = new ALERT(this.alert_search_invoices_arrival.$html);
        row.$html.append(this.search_invoices_arrival_setup.$html).append(this.search_invoices_arrival_table.$html);
        this.search_invoices_arrival.body.$html.append(row.$html);
        //------------------------------------------------------
        // Создать макет панели (Документы по отправке)
        this.search_invoices_outgoing = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_shinv_card_header_search_invoices_outgoing', App.Langs),
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
        this.search_invoices_outgoing_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.search_invoices_outgoing_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_search_invoices_outgoing = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.search_invoices_outgoing_table.$html.append(this.alert_search_invoices_outgoing.$html);
        this.search_invoices_outgoing_alert = new ALERT(this.alert_search_invoices_outgoing.$html);
        row.$html.append(this.search_invoices_outgoing_setup.$html).append(this.search_invoices_outgoing_table.$html);
        this.search_invoices_outgoing.body.$html.append(row.$html);
        //------------------------------------------------------
        this.$main.append(this.card_services.$html.append(this.search_invoices_arrival.$html).append(this.search_invoices_outgoing.$html));
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
                var process = 4;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_search_invoices');
                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия 

                //this.form_select_period = new VFSP(this.div_form_period.$html);
                //this.form_select_period.init({
                //    alert: null,
                //    fn_init: function (init) {
                //        // На проверку окончания инициализации
                //        process--;
                //        out_init(process);
                //    }.bind(this),                                              // Окончание инициализации
                //    apply_text: langView('vs_shinv_load_main_docs', App.Langs), //
                //    fn_apply_select: function (type, start, stop) {
                //        if (type && start && stop) {
                //            //
                //            this.start = start;
                //            this.stop = stop;
                //            this.update(this.start, this.stop, this.id_doc, function () {

                //            }.bind(this));
                //        }

                //    }.bind(this),                                      // Применить выборку
                //});
                //-------------------------------------------------
                // Форма поиска прибытия
                this.form_search_invoices_arrival = new FD();
                // Создать макет панели
                var objs_invarr_setup = [];
                var bt_searsh_epd = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_shinv_title_button_num_epd', App.Langs),
                        icon_fa_left: 'fa-solid fa-magnifying-glass',//<i class="fa-solid fa-magnifying-glass"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.clear_all()
                            var num_epd = this.form_search_invoices_arrival.el.input_text_num_nakl_arrival.val();
                            if (num_epd) {
                                this.action_search_invoices_arrival(num_epd, function (docs) {
                                    this.tab_invoices_arrival.view(this.list_document_arrival);
                                    LockScreenOff();
                                }.bind(this));
                            } else {
                                this.search_invoices_arrival_alert.out_warning_message(langView('vs_shinv_mess_war_not_select_docs', App.Langs));
                                this.form_search_invoices_arrival.set_element_validation_error('num_nakl_arrival', langView('vs_shinv_mess_error_not_document', App.Langs), true);
                                this.tab_invoices_arrival.view([]);
                                LockScreenOff();
                            }

                        }.bind(this),
                    }
                };
                var form_input_num_nakl = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_invarr',
                        id: 'num_nakl_arrival',
                        name: 'num_nakl_arrival',
                        label: langView('vs_shinv_title_label_num_epd', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_shinv_title_placeholder_num_epd', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: null,
                        element_max: null,
                        element_step: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0',
                        group_append_class: null,
                        group_append_id: null,
                        group_append_html: null,
                        group_append_objs: [bt_searsh_epd],
                        form_text: langView('vs_shinv_text_label_num_epd', App.Langs),
                        form_text_class: null,
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
                var alert_info = {
                    obj: 'bs_alert',
                    options: {
                        id: 'alert-info-arrival',
                        class: null,
                        style: null,
                        color: 'primary',
                        bt_close: true,
                        fn_click_close: null,
                    },
                    childs: []
                };
                col_alert.childs.push(alert_info);
                objs_invarr_setup.push(col_alert);
                objs_invarr_setup.push(form_input_num_nakl);
                this.form_search_invoices_arrival.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_invarr_setup,
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
                        this.search_invoices_arrival_setup.$html.append(this.form_search_invoices_arrival.$form);
                        var alert_info_arr = $('div#alert-info-arrival');
                        this.search_invoices_arrival_alert_info = new ALERT(alert_info_arr);
                        this.search_invoices_arrival_alert_info.out_info_message(langView('vs_shinv_mess_info_init', App.Langs));
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this),
                });
                //-------------------------------------------------
                //Создадим таблицы( this.tab_invoices_arrival)
                var row_search_invoices_arrival = new this.fe_ui.bs_row({ id: 'table-search-invoices-arrival', class: 'pt-2' });
                this.search_invoices_arrival_table.$html.append(row_search_invoices_arrival.$html);

                this.tab_invoices_arrival = new TSRV('div#table-search-invoices-arrival');
                this.tab_invoices_arrival.init({
                    alert: this.search_invoices_arrival_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: true,
                    type_report: 'verification_invoices_wagons_arrival',
                    setup_buttons: [
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                    }.bind(this),
                    fn_select_rows: function (rows, type) {

                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {

                    }.bind(this),
                    fn_enable_button: function (tb) {
                    }.bind(this),
                    fn_view_detali: function (id_div, data) {
                        this.tables_detali[data.id] = new TSRV('div#' + id_div);
                        var tab = this.tables_detali[data.id];
                        this.tables_detali[data.id].init({
                            alert: this.search_invoices_arrival_alert,
                            class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                            detali_table: false,
                            type_report: 'verification_invoices_detali_wagons_arrival',
                            setup_buttons: [
                            ],
                            link_num: false,
                            ids_wsd: null,
                            fn_init: function () {
                                // На проверку окончания инициализации
                                tab.view(data.vagons);
                                LockScreenOff();

                            },
                            fn_action_view_detali: function (rows) {

                            },
                            fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                            }.bind(this),
                            fn_select_rows: function (rows, type) {

                            }.bind(this),
                            fn_select_link: function (link) {

                            }.bind(this),
                            fn_button_action: function (name, e, dt, node, config) {

                            }.bind(this),
                            fn_enable_button: function (tb) {

                            }.bind(this),
                        });

                    },

                    fn_init_complete: function () {
                    },

                    fn_draw_callback: function (settings) {
                    }.bind(this)
                });
                //-------------------------------------------------
                // Форма поиска отправки
                this.form_search_invoices_outgoing = new FD();
                // Создать макет панели
                var objs_invout_setup = [];
                var bt_searsh_epd = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_shinv_title_button_num_epd', App.Langs),
                        icon_fa_left: 'fa-solid fa-magnifying-glass',//<i class="fa-solid fa-magnifying-glass"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.clear_all()
                            var num_epd = this.form_search_invoices_outgoing.el.input_text_num_nakl_outgoing.val();
                            if (num_epd) {
                                this.action_search_invoices_outgoing(num_epd, function (docs) {
                                    this.tab_invoices_outgoing.view(this.list_document_outgoing);
                                    LockScreenOff();
                                }.bind(this));
                            } else {
                                this.search_invoices_outgoing_alert.out_warning_message(langView('vs_shinv_mess_war_not_select_docs', App.Langs));
                                this.form_search_invoices_outgoing.set_element_validation_error('num_nakl_outgoing', langView('vs_shinv_mess_error_not_document', App.Langs), true);
                                this.tab_invoices_outgoing.view([]);
                                LockScreenOff();
                            }

                        }.bind(this),
                    }
                };
                var form_input_num_nakl = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_invout',
                        id: 'num_nakl_outgoing',
                        name: 'num_nakl_outgoing',
                        label: langView('vs_shinv_title_label_num_epd', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_shinv_title_placeholder_num_epd', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: null,
                        element_max: null,
                        element_step: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).val();
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0',
                        group_append_class: null,
                        group_append_id: null,
                        group_append_html: null,
                        group_append_objs: [bt_searsh_epd],
                        form_text: langView('vs_shinv_text_label_num_epd', App.Langs),
                        form_text_class: null,
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
                var alert_info = {
                    obj: 'bs_alert',
                    options: {
                        id: 'alert-info-outgoing',
                        class: null,
                        style: null,
                        color: 'primary',
                        bt_close: true,
                        fn_click_close: null,
                    },
                    childs: []
                };
                col_alert.childs.push(alert_info);
                objs_invout_setup.push(col_alert);
                objs_invout_setup.push(form_input_num_nakl);
                this.form_search_invoices_outgoing.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_invout_setup,
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
                        this.search_invoices_outgoing_setup.$html.append(this.form_search_invoices_outgoing.$form);
                        var alert_info_out = $('div#alert-info-outgoing');
                        this.search_invoices_outgoing_alert_info = new ALERT(alert_info_out);
                        this.search_invoices_outgoing_alert_info.out_info_message(langView('vs_shinv_mess_info_init', App.Langs));
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this),
                });
                //-------------------------------------------------
                //Создадим таблицы( this.tab_invoices_outgoing)
                var row_search_invoices_outgoing = new this.fe_ui.bs_row({ id: 'table-search-invoices-outgoing', class: 'pt-2' });
                this.search_invoices_outgoing_table.$html.append(row_search_invoices_outgoing.$html);

                this.tab_invoices_outgoing = new TSRV('div#table-search-invoices-outgoing');
                this.tab_invoices_outgoing.init({
                    alert: this.search_invoices_outgoing_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: true,
                    type_report: 'verification_invoices_wagons_outgoing',
                    setup_buttons: [
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                    }.bind(this),
                    fn_select_rows: function (rows, type) {

                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {

                    }.bind(this),
                    fn_enable_button: function (tb) {
                    }.bind(this),
                    fn_view_detali: function (id_div, data) {
                        this.tables_detali[data.id] = new TSRV('div#' + id_div);
                        var tab = this.tables_detali[data.id];
                        this.tables_detali[data.id].init({
                            alert: this.search_invoices_outgoing_alert,
                            class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                            detali_table: false,
                            type_report: 'verification_invoices_detali_wagons_outgoing',
                            setup_buttons: [
                            ],
                            link_num: false,
                            ids_wsd: null,
                            fn_init: function () {
                                // На проверку окончания инициализации
                                tab.view(data.vagons);
                                LockScreenOff();

                            },
                            fn_action_view_detali: function (rows) {

                            },
                            fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                            }.bind(this),
                            fn_select_rows: function (rows, type) {

                            }.bind(this),
                            fn_select_link: function (link) {

                            }.bind(this),
                            fn_button_action: function (name, e, dt, node, config) {

                            }.bind(this),
                            fn_enable_button: function (tb) {

                            }.bind(this),
                        });

                    },

                    fn_init_complete: function () {
                    },

                    fn_draw_callback: function (settings) {
                    }.bind(this)
                });

            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = [];
        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_search_invoices] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // получить документ
    view_search_invoices.prototype.get_document_arrival = function (document) {
        // Пройдемся по вагонам
        var vagons = [];
        var list_vagons = document.arrivalUzVagons;
        var summ_arrivalUzVagonPays = 0;
        var summ_vesg = 0;
        $.each(list_vagons, function (i, el_vag) {
            // Тариф ПРИБ (Вагоны)
            var arrivalUzVagonPays = 0;
            if (el_vag.arrivalUzVagonPays && el_vag.arrivalUzVagonPays.length > 0) {
                $.each(el_vag.arrivalUzVagonPays, function (i, el_pay) {
                    arrivalUzVagonPays += (el_pay.summa && el_pay.kod === '001' ? Number(el_pay.summa) : 0);
                }.bind(this));
            }
            summ_arrivalUzVagonPays += arrivalUzVagonPays;
            summ_vesg += el_vag.vesg ? Number(el_vag.vesg) : 0;
            //
            vagons.push({
                id: el_vag.id,
                nomMainDoc: document.nomMainDoc,
                num: el_vag.num,
                dateOtpr: document.dateOtpr,
                dateAdoption: el_vag.idArrivalNavigation.dateAdoption,
                nameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                nameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
                arrivalCargoId: el_vag.idCargoNavigation.id,
                arrivalCargoName: el_vag.idCargoNavigation['cargoName' + ucFirst(App.Lang)],
                arrivalOperatorId: el_vag.idWagonsRentArrivalNavigation.idOperator,
                arrivalOperatorAbbr: el_vag.idWagonsRentArrivalNavigation.idOperatorNavigation['abbr' + ucFirst(App.Lang)],
                toDivisionAbbr: el_vag.idDivisionOnAmkrNavigation.id,
                toDivisionAbbr: el_vag.idDivisionOnAmkrNavigation['divisionAbbr' + ucFirst(App.Lang)],
                vesg: el_vag.vesg,
                arrivalUzVagonPays: arrivalUzVagonPays,
            });

        }.bind(this));
        // документ
        var arrivalUZDocumentPay = 0;
        if (document.arrivalUzDocumentPays && document.arrivalUzDocumentPays.length > 0) {
            $.each(document.arrivalUzDocumentPays, function (i, el_dpay) {
                arrivalUZDocumentPay += (el_dpay.summa && el_dpay.kod === '001' ? Number(el_dpay.summa) : 0);
            }.bind(this));
        }
        return {
            id: document.id,
            nomMainDoc: document.nomMainDoc,
            countVagon: vagons.length,
            vagons: vagons,
            codeStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation.code : null,
            nameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
            codeStnTo: document.codeStnToNavigation ? document.codeStnToNavigation.code : null,
            nameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
            arrivalCargoName: vagons[0].arrivalCargoName,
            vesg: summ_vesg,
            tariffContract: document.tariffContract,
            payerLocalCode: document.codePayerLocalNavigation ? document.codePayerLocalNavigation.code : null,
            payerLocalName: document.codePayerLocalNavigation ? document.codePayerLocalNavigation['payerName' + ucFirst(App.Lang)] : null,
            arrivalOperatorAbbr: vagons[0].arrivalOperatorAbbr,
            toDivisionAbbr: vagons[0].toDivisionAbbr,
            payerSenderCode: document.codePayerSenderNavigation ? document.codePayerSenderNavigation.code : null,
            payerSenderName: document.codePayerSenderNavigation ? document.codePayerSenderNavigation['payerName' + ucFirst(App.Lang)] : null,
            payerArrivalCode: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation.code : null,
            payerArrivalName: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation['payerName' + ucFirst(App.Lang)] : null,
            dateOtpr: document.dateOtpr,
            dateAdoption: vagons[0].dateAdoption,
            arrivalUzVagonPays: summ_arrivalUzVagonPays,
            arrivalUZDocumentPay: arrivalUZDocumentPay,
            deffTariff: document.tariffContract !== null && arrivalUZDocumentPay !== null ? document.tariffContract - Number(arrivalUZDocumentPay / 100).toFixed(2) : 0,
            calcPayer: document.calcPayer,
            calcPayerUser: document.calcPayerUser,
            idActServices1: document.idActServices1,
            idActServices2: document.idActServices2,
            idActServices3: document.idActServices3,
            numActServices1: document.numActServices1,
            numActServices2: document.numActServices2,
            numActServices3: document.numActServices3,
            verification: document.verification,
            verificationUser: document.verificationUser,
        };
    };
    // получить документ
    view_search_invoices.prototype.get_document_outgoing = function (document) {
        // Пройдемся по вагонам
        var vagons = [];
        var list_vagons = document.outgoingUzVagons;
        var summ_outgoingUzVagonPays = 0;
        var summ_outgoingUzVagonPaysAdd = 0;
        var summ_vesg = 0;
        $.each(list_vagons, function (i, el_vag) {
            // Тариф ПРИБ (Вагоны)
            var outgoingUzVagonPays = 0;
            var outgoingUzVagonPaysAdd = 0;
            if (el_vag.outgoingUzVagonPays && el_vag.outgoingUzVagonPays.length > 0) {
                $.each(el_vag.outgoingUzVagonPays, function (i, el_pay) {
                    outgoingUzVagonPays += (el_pay.summa && el_pay.kod === '001' ? Number(el_pay.summa) : 0);
                    outgoingUzVagonPaysAdd += (el_pay.summa && el_pay.kod !== '001' ? Number(el_pay.summa) : 0);
                }.bind(this));
            }
            summ_outgoingUzVagonPays += outgoingUzVagonPays;
            summ_outgoingUzVagonPaysAdd += outgoingUzVagonPaysAdd;
            summ_vesg += el_vag.vesg ? Number(el_vag.vesg) : 0;
            //
            vagons.push({
                id: el_vag.id,
                nomDoc: document.nomDoc,
                num: el_vag.num,
                //dateOtpr: document.dateOtpr,
                dateOutgoing: el_vag.idOutgoingNavigation.dateOutgoing,
                dateOutgoingAct: el_vag.idOutgoingNavigation.dateOutgoingAct,
                codeStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation.code : null,
                nameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                codeStnTo: document.codeStnFromNavigation ? document.codeStnToNavigation.code : null,
                nameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
                outgoingCargoId: el_vag.idCargoNavigation.id,
                outgoingCargoName: el_vag.idCargoNavigation['cargoName' + ucFirst(App.Lang)],
                outgoingCargoEtsngCode: el_vag.idCargoNavigation.idCargoEtsngNavigation.code,
                outgoingOperatorId: el_vag.idWagonsRentOutgoingNavigation.idOperator,
                outgoingOperatorAbbr: el_vag.idWagonsRentOutgoingNavigation.idOperatorNavigation['abbr' + ucFirst(App.Lang)],
                vesg: el_vag.vesg,
                outgoingUzVagonPays: outgoingUzVagonPays,
                outgoingUzVagonPaysAdd: outgoingUzVagonPaysAdd,
            });

        }.bind(this));
        // документ
        var outgoingUZDocumentPay = 0;
        var outgoingUZDocumentPayAdd = 0;
        if (document.outgoingUzDocumentPays && document.outgoingUzDocumentPays.length > 0) {
            $.each(document.outgoingUzDocumentPays, function (i, el_dpay) {
                outgoingUZDocumentPay += (el_dpay.summa && el_dpay.kod === '001' ? Number(el_dpay.summa) : 0);
                outgoingUZDocumentPayAdd += (el_dpay.summa && el_dpay.kod !== '001' ? Number(el_dpay.summa) : 0);
            }.bind(this));
        }
        var outgoingUZDocumentPayAll = outgoingUZDocumentPay + outgoingUZDocumentPayAdd;
        return {
            id: document.id,
            nomDoc: document.nomDoc,
            countVagon: vagons.length,
            vagons: vagons,
            outgoingCodeStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation.code : null,
            outgoingNameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
            outgoingCodeStnTo: document.codeStnToNavigation ? document.codeStnToNavigation.code : null,
            outgoingNameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
            outgoingCargoName: vagons[0].outgoingCargoName,
            outgoingCargoEtsngCode: vagons[0].outgoingCargoEtsngCode,
            vesg: summ_vesg,
            tariffContract: document.tariffContract,
            payerSenderCode: document.codePayerNavigation ? document.codePayerNavigation.code : null,
            payerSenderName: document.codePayerNavigation ? document.codePayerNavigation['payerName' + ucFirst(App.Lang)] : null,
            outgoingOperatorAbbr: vagons[0].outgoingOperatorAbbr,
            dateOtpr: document.dateOtpr,
            dateOutgoing: vagons[0].dateOutgoing,
            dateOutgoingAct: vagons[0].dateOutgoingAct,
            outgoingUzVagonPays: summ_outgoingUzVagonPays,
            outgoingUzVagonPaysAdd: summ_outgoingUzVagonPaysAdd,
            outgoingUZDocumentPay: outgoingUZDocumentPay,
            outgoingUZDocumentPayAdd: outgoingUZDocumentPayAdd,
            outgoingUZDocumentPayAll: outgoingUZDocumentPayAll,
            deffTariff: document.tariffContract !== null && outgoingUZDocumentPayAll !== null ? Number(Number(document.tariffContract - outgoingUZDocumentPayAll) / 100).toFixed(2) : 0,
            calcPayer: document.calcPayer,
            calcPayerUser: document.calcPayerUser,
            numList: document.numList,
            dateList: document.dateList,
            verification: document.verification,
            verificationUser: document.verificationUser,
        };
    };
    // Выполнить поиск документа по прибытию
    view_search_invoices.prototype.action_search_invoices_arrival = function (num_epd, callback) {
        this.clear_all();
        LockScreen(langView('vs_shinv_searsh_main_docs', App.Langs).format(num_epd));
        this.ids_arrival.getVerificationArrivalUzDocumentOfNum(num_epd, function (document) {
            this.list_document_arrival = [];
            this.document_arrival = [];
            if (document !== null && document.length > 0) {
                // Пройдемся по документам
                $.each(document, function (i, el_doc) {
                    this.document_arrival.push(this.get_document_arrival(el_doc));
                }.bind(this));
                this.list_document_arrival = this.document_arrival;
            }
            //else {
            //    this.tab_invoices_arrival.view(this.list_document_arrival);
            //}
            this.search_invoices_arrival_alert_info.clear_message();
            this.search_invoices_arrival_alert_info.out_info_message(langView('vs_shinv_mess_info_add_main_docs', App.Langs).format(num_epd, this.document_arrival.length));
            if (typeof callback === 'function') {
                callback(this.list_document_arrival);
            }
        }.bind(this));
    }
    // Выполнить поиск документа по отправке
    view_search_invoices.prototype.action_search_invoices_outgoing = function (num_epd, callback) {
        this.clear_all();
        LockScreen(langView('vs_shinv_searsh_main_docs', App.Langs).format(num_epd));
        this.ids_outgoing.getVerificationOutgoingUzDocumentOfINum(num_epd, function (document) {
            this.list_document_outgoing = [];
            this.document_outgoing = [];
            if (document !== null && document.length > 0) {
                // Пройдемся по документам
                $.each(document, function (i, el_doc) {
                    this.document_outgoing.push(this.get_document_outgoing(el_doc));
                }.bind(this));
                this.list_document_outgoing = this.document_outgoing;
            }
            //else {
            //    this.tab_invoices_arrival.view(this.list_document_outgoing);
            //}
            this.search_invoices_outgoing_alert_info.clear_message();
            this.search_invoices_outgoing_alert_info.out_info_message(langView('vs_shinv_mess_info_add_main_docs', App.Langs).format(num_epd, this.document_outgoing.length));
            if (typeof callback === 'function') {
                callback(this.list_document_outgoing);
            }
        }.bind(this));
    }

    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_search_invoices.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_search_invoices.prototype.clear_all = function () {
        this.search_invoices_arrival_alert.clear_message();
        this.form_search_invoices_arrival.clear_all();
        //this.form_document_pay.clear_all();
        //this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.clear_all();
        //this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_search_invoices.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_search_invoices = view_search_invoices;

    window.App = App;
})(window);