/* ===============================================
-= Модуль сервис расчет стоимости перевозки по прибытию =-
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
            'vs_via_card_header_card_services': 'СВЕРКА НАКЛАДНЫХ ПО ПРИБЫТИЮ',
            'vs_via_card_header_verification_invoices': 'СВЕРКА НАКЛАДНЫХ',

            'vs_via_mess_init_module': 'Инициализация модуля view_verification_invoices_arrival',
            'vs_via_mess_load_operation': 'Загружаю форму операции',

            'vs_via_title_button_doc_clear': 'Очистить',
            'vs_via_title_button_doc_searsh': 'Поиск',

            'vs_via_title_placeholder_doc_searsh': 'Поиск накладных',
            //'vs_via_text_append_doc_searsh': 'Добавить список вагонов',
            'vs_via_text_doc_searsh': 'Введите накладные, разделитель ";"',

            //'vs_via_title_form_button_apply': 'Править документ',
            //'vs_via_title_form_apply_button_title': 'Править документ ...',

            //'vs_via_title_label_num_epd': 'Найти накладную:',
            //'vs_via_title_placeholder_num_epd': 'Найти накладную',
            //'vs_via_text_label_num_epd': 'Введите номмер накладной ...',

            'vs_via_title_label_presented1': 'Предъявлено:',
            'vs_via_title_placeholder_presented1': '№ Акта',
            'vs_via_text_label_presented1': 'Укажите № акта ...',
            'vs_via_title_label_presented2': 'Предъявлено:',
            'vs_via_title_placeholder_presented2': '№ Акта',
            'vs_via_text_label_presented2': 'Укажите № акта ...',
            'vs_via_title_label_presented3': 'Предъявлено:',
            'vs_via_title_placeholder_presented3': '№ Акта',
            'vs_via_text_label_presented3': 'Укажите № акта ...',

            'vs_via_title_label_payer': 'Плательщик:',
            'vs_via_text_label_payer': 'Выберите плательщика ...',

            'vs_via_title_label_act': 'Акт №:',
            'vs_via_text_label_act': 'Выберите № акта ...',

            'vs_via_title_label_cargo': 'груз ПРИБ:',
            'vs_via_text_label_cargo': 'Выберите груз ...',

            'vs_via_title_label_station_from': 'Станция отправления:',
            'vs_via_text_label_station_from': 'Выберите станцию ...',

            'vs_via_title_label_station_on': 'Станция прибытия:',
            'vs_via_text_label_station_on': 'Выберите станцию ...',

            'vs_via_title_label_operator': 'Оператор АМКР:',
            'vs_via_text_label_operator': 'Выберите оператора ...',

            'vs_via_title_button_presented1': 'Править акт ...',
            'vs_via_title_button_presented2': 'Править акт ...',
            'vs_via_title_button_presented3': 'Править акт ...',

            'vs_via_title_button_Cancel': 'Отмена',
            'vs_via_button_Ok': 'Применить',


            //'vs_via_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            //'vs_via_mess_run_update_document_pay': 'Выполнить обновление "Тарифа ПРИБЫТИЯ", заменить тариф [{0}] на новый тариф [{1}].',
            //'vs_via_mess_ok_update_document_pay': 'По документу №{0} обновлен "Тариф ПРИБЫТИЯ", новый тариф [{1}].',
            //'vs_via_mess_error_update_document_pay': 'При обновлении "Тарифа ПРИБЫТИЯ" [{0}], документа № {1} - произошла ошибка. Код ошибки {2}',
            //'vs_via_cancel_update_document_pay': 'Отмена обновления "Тарифа ПРИБЫТИЯ"',

            //'vs_via_mess_run_update_cost_calculation': 'Выполнить обновление расчета по плательщику {0},с тарифом по договору [{1}].',
            //'vs_via_mess_ok_update_cost_calculation': 'По документу №{0} выполнен расчет, обновлен плательщик {1} и тариф {2}.',
            //'vs_via_mess_error_update_cost_calculation': 'При обновлении плательщика {0} и тарифа {1}, документа № {3} - произошла ошибка. Код ошибки {4}',
            //'vs_via_cancel_update_cost_calculation': 'Отмена обновления расчета по плательщику',

            //'vs_via_mess_error_not_document': 'Не выбран документ для правки!',
            //'vs_via_mess_error_document_pay_not_change': 'Тариф без изменений!',
            //'vs_via_mess_error_payer_not_change': 'Плательщик без изменений!',
            //'vs_via_mess_error_tariff_contract_not_change': 'Ж.д. тариф по договору без изменений!',

            //'vs_via_title_period_1': 'ЖД сутки',
            //'vs_via_title_period_2': 'Календарные сутки',
            //'vs_via_title_period_3': 'От начала месяца',

            'vs_via_load_main_docs': 'Загружаю документы за период...',
            /*            'vs_via_load_docs': 'Загружаю информацию по накладной {0}...',*/
            'vs_via_update_main_docs': 'Обнавляю документы выбранные за период...',
            'vs_via_select_main_docs': 'Поиск документов согласно выбора...',

            'vs_via_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            'vs_via_mess_info_add_main_docs': 'За период c {0} по {1}, найдено {2} документов с рассчетом ж.д. тарифа.',
            'vs_via_mess_info_select_main_docs': 'За период c {0} по {1}, найдено {2} документов с рассчетом ж.д. тарифа, выбранно {3}',

            //'vs_via_mess_war_not_select_docs': 'Не выбран номер накладной для отображения информации!',

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

    var TSRV = App.table_services;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_verification_invoices_arrival(selector) {
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
    view_verification_invoices_arrival.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_verification_invoices_arrival');
        LockScreen(langView('vs_via_mess_init_module', App.Langs));
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

        this.mcf_lg = new MCF(); // Создадим экземпляр окно сообщений
        this.mcf_lg.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'lg',
            bt_close_text: langView('vs_via_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_via_button_Ok', App.Langs),
        });


        this.start = null;
        this.stop = null;

        this.list_vagons = [];
        this.select_vagons = [];
        this.code_payer = -1;
        this.act = -1;
        this.id_cargo = -1;
        this.code_station_from = -1;
        this.code_station_on = -1;
        this.id_operator = -1;

        this.column_payer = null;

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
            header_text: langView('vs_via_card_header_card_services', App.Langs),
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
        row.$html.append(this.div_form_period.$html);
        var row1 = new this.fe_ui.bs_row({});
        this.div_form_searsh = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 12,
        }); // Окно выбора
        row1.$html.append(this.div_form_searsh.$html);
        this.card_services.body.$html.append(row.$html).append(row1.$html);

        // Создать макет панели (Сверка накладных)
        this.verification_invoices = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_via_card_header_verification_invoices', App.Langs),
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
        this.verification_invoices_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.verification_invoices_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert verification_invoices
        this.alert_verification_invoices = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.verification_invoices_table.$html.append(this.alert_verification_invoices.$html);
        this.verification_invoices_alert = new ALERT(this.alert_verification_invoices.$html);

        row.$html.append(this.verification_invoices_setup.$html).append(this.verification_invoices_table.$html);
        this.verification_invoices.body.$html.append(row.$html);

        this.$main.append(this.card_services.$html.append(this.verification_invoices.$html));
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
                        this.div_form_searsh.$html.append(this.form_searsh_doc_setup.$form);
                        this.verification_invoices_setup.$html.append(this.form_verification_invoices_setup.$form);

                        var alsert_info = $('div#alert-info');
                        this.searsh_alert_info = new ALERT(alsert_info);
                        this.searsh_alert_info.out_info_message(langView('vs_via_mess_info_init', App.Langs));

                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_verification_invoices_arrival');
                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия 
                this.payer_arrival = this.api_dir.getAllPayerArrival();

                this.list_payer_arrival = this.api_dir.getListValueTextPayerArrival();

                this.form_select_period = new VFSP(this.div_form_period.$html);
                this.form_select_period.init({
                    alert: null,
                    form_class: 'row g-3 border-bottom border-primary',//
                    fn_init: function (init) {
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),                                              // Окончание инициализации
                    apply_text: langView('vs_via_load_main_docs', App.Langs), //
                    fn_apply_select: function (type, start, stop) {
                        if (type && start && stop) {
                            //
                            this.start = start;
                            this.stop = stop;
                            this.update(this.start, this.stop, function () {
                                LockScreenOff();
                            }.bind(this));
                        }

                    }.bind(this),                                      // Применить выборку
                })
                // Поиск документов
                this.form_searsh_doc_setup = new FD();
                var objs_sd_setup = [];
                var col_alert = {
                    obj: 'bs_col',
                    options: {
                        id: 'col-alert-info',
                        pref: 'md',
                        size: 6,
                        class: 'text-left',
                        style: null,
                    },
                    childs: []
                };
                var alert_info = {
                    obj: 'bs_alert',
                    options: {
                        id: 'alert-info',
                        class: null,
                        style: null,
                        color: 'primary',
                        bt_close: false,
                        fn_click_close: null,
                    },
                    childs: []
                };

                var bt_append_docs_clear = {
                    obj: 'bs_button',
                    options: {
                        id: 'docs_clear',
                        name: 'docs_clear',
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_via_title_button_doc_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom', //<i class="fa-solid fa-broom"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_searsh_doc_setup.el.textarea_documents_searsh.val('');
                            this.select_docs(function (select) {
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this));
                        }.bind(this),
                    }
                };
                var bt_append_docs_searsh = {
                    obj: 'bs_button',
                    options: {
                        id: 'docs_searsh',
                        name: 'docs_searsh',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_via_title_button_doc_searsh', App.Langs),
                        icon_fa_left: 'fas fa-search',
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.select_docs(function (select) {
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this));
                        }.bind(this),
                    }
                };
                var form_textarea_docs = {
                    obj: 'bs_form_textarea',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'documents_searsh',
                        name: 'documents_searsh',
                        //label: langView('voprc_title_vagon_searsh', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_doc_searsh', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_readonly: false,
                        element_cols: null,
                        element_rows: 3,
                        element_wrap: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var text = $(e.currentTarget).val();
                                /*main_alert.clear_message(); main_alert.out_info_message('element_textarea : ' + text);*/
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'row',
                        group_append_class: null,
                        group_append_id: null,
                        /*                        group_append_html: langView('vopcgr_text_append_vagon_searsh', App.Langs),*/
                        group_append_objs: [bt_append_docs_clear, bt_append_docs_searsh],
                        form_text: langView('vs_via_text_doc_searsh', App.Langs),
                        form_text_class: null
                    },
                    childs: []
                };
                var form_select_payer = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'code_payer',
                        name: 'code_payer',
                        label: langView('vs_via_title_label_payer', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                this.code_payer = $(e.currentTarget).val();
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                                //var val = $(e.currentTarget).val();
                                //if (val == -1) val = '';
                                ////this.column_payer.search(val, { exact: true }).draw();
                                //this.column_payer.search(val ? '^' + val + '$' : '', true, false).draw();

                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        form_text: langView('vs_via_text_label_payer', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_acts = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'act',
                        name: 'act',
                        label: langView('vs_via_title_label_act', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                this.act = $(e.currentTarget).val();
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 1,
                        col_class: 'mt-0',
                        form_text: langView('vs_via_text_label_act', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_cargo = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'id_cargo',
                        name: 'id_cargo',
                        label: langView('vs_via_title_label_cargo', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                this.id_cargo = Number($(e.currentTarget).val());
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        form_text: langView('vs_via_text_label_cargo', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_station_from = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'id_station_from',
                        name: 'id_station_from',
                        label: langView('vs_via_title_label_station_from', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                this.code_station_from = Number($(e.currentTarget).val());
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        form_text: langView('vs_via_text_label_station_from', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_station_on = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'id_station_on',
                        name: 'id_station_on',
                        label: langView('vs_via_title_label_station_on', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                this.code_station_on = Number($(e.currentTarget).val());
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        form_text: langView('vs_via_text_label_station_on', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_operator = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'id_operator',
                        name: 'id_operator',
                        label: langView('vs_via_title_label_operator', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: -1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                this.id_operator = Number($(e.currentTarget).val());
                                this.select_apply(function (select) {
                                    this.tab_verification_invoices_wagons.view(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        form_text: langView('vs_via_text_label_operator', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };

                col_alert.childs.push(alert_info);
                objs_sd_setup.push(col_alert);
                objs_sd_setup.push(form_textarea_docs);
                objs_sd_setup.push(form_select_payer);
                objs_sd_setup.push(form_select_acts);
                objs_sd_setup.push(form_select_cargo);
                objs_sd_setup.push(form_select_station_from);
                objs_sd_setup.push(form_select_station_on);
                objs_sd_setup.push(form_select_operator);
                this.form_searsh_doc_setup.init({
                    alert: this.main_alert,
                    //context: ,
                    objs: objs_sd_setup,
                    id: null,
                    form_class: 'row g-3',// border-top border-primary
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
                        //this.div_form_searsh.$html.append(this.form_searsh_doc_setup.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                // форма сверки
                this.form_verification_invoices_setup = new FD();
                var objs_vi_setup = [];
                var bt_apply_presented1 = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_via_title_button_presented1', App.Langs),
                        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            /*                            this.form_document_pay.$form.submit();*/
                        }.bind(this),
                    }
                };
                var form_input_presented1 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_vi',
                        id: 'doc_pay',
                        name: 'doc_pay',
                        label: langView('vs_via_title_label_presented1', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_presented1', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var value = $(e.currentTarget).val();
                                //this.validation_doc_pay(value, 'doc_pay', false, true)
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
                        group_append_objs: [bt_apply_presented1],
                        form_text: langView('vs_via_text_label_presented1', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var bt_apply_presented2 = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_via_title_button_presented2', App.Langs),
                        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            /*                            this.form_document_pay.$form.submit();*/
                        }.bind(this),
                    }
                };
                var form_input_presented2 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_vi',
                        id: 'doc_pay',
                        name: 'doc_pay',
                        label: langView('vs_via_title_label_presented2', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_presented2', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var value = $(e.currentTarget).val();
                                //this.validation_doc_pay(value, 'doc_pay', false, true)
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
                        group_append_objs: [bt_apply_presented2],
                        form_text: langView('vs_via_text_label_presented2', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var bt_apply_presented3 = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_via_title_button_presented3', App.Langs),
                        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            /*                            this.form_document_pay.$form.submit();*/
                        }.bind(this),
                    }
                };
                var form_input_presented3 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_vi',
                        id: 'doc_pay',
                        name: 'doc_pay',
                        label: langView('vs_via_title_label_presented3', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_presented3', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var value = $(e.currentTarget).val();
                                //this.validation_doc_pay(value, 'doc_pay', false, true)
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
                        group_append_objs: [bt_apply_presented3],
                        form_text: langView('vs_via_text_label_presented3', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                objs_vi_setup.push(form_input_presented1);
                objs_vi_setup.push(form_input_presented2);
                objs_vi_setup.push(form_input_presented3);
                this.form_verification_invoices_setup.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_vi_setup,
                    id: null,
                    form_class: 'row g-3 mt-2',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {
                            /*                            var valid = this.validation_document_pay(result);*/
                            if (valid) {
                                //this.mcf_lg.open(
                                //    langView('vs_via_title_form_apply', App.Langs),
                                //    langView('vs_via_mess_run_update_document_pay', App.Langs).format(this.arrivalUZDocumentPay, result.new.input_text_doc_pay),
                                //    function () {
                                //        // Принять
                                //        var operation = {
                                //            id_document: this.ArrivalUzDocument.id,
                                //            summa: result.new.input_text_doc_pay,
                                //            kod: "001",
                                //        };
                                //        this.apply_update_doc_pay(operation, function () {

                                //        }.bind(this));
                                //    }.bind(this),
                                //    function () {
                                //        this.main_alert.out_warning_message(langView('vs_via_cancel_update_document_pay', App.Langs));
                                //    }.bind(this));
                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        //this.verification_invoices_setup.$html.append(this.form_verification_invoices_setup.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( this.tab_verification_invoices_wagons)
                var row_verification_invoices_wagons = new this.fe_ui.bs_row({ id: 'table-verification-invoices-wagons', class: 'pt-2' });
                this.verification_invoices_table.$html.append(row_verification_invoices_wagons.$html);

                this.tab_verification_invoices_wagons = new TSRV('div#table-verification-invoices-wagons');
                this.tab_verification_invoices_wagons.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: true,
                    type_report: 'verification_invoices_wagons',
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
                            alert: this.from_way_alert,
                            class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                            detali_table: false,
                            type_report: 'verification_invoices_detali_wagons',
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
                        //$.fn.dataTable.ext.search.pop()
                        //this.api()
                        //    .columns()
                        //    .every(function () {
                        //        let column = this;

                        //        // Create select element
                        //        //let select = document.createElement('select');
                        //        //select.add(new Option(''));
                        //        //column.footer().replaceChildren(select);

                        //        //// Apply listener for user change in value
                        //        //select.addEventListener('change', function () {
                        //        //    column
                        //        //        .search(select.value, { exact: true })
                        //        //        .draw();
                        //        //});

                        //        //// Add list of options
                        //        //column
                        //        //    .data()
                        //        //    .unique()
                        //        //    .sort()
                        //        //    .each(function (d, j) {
                        //        //        select.add(new Option(d));
                        //        //    });
                        //    });
                    },

                    fn_draw_callback: function (settings) {
                        //var base = this;
                        //var list_payer_local = [];
                        //settings.api
                        //    .columns()
                        //    .every(function () {
                        //        var column = this;
                        //        //var num = column[0][0];

                        //        var name = (column.header().firstChild && column.header().firstChild.firstChild ? column.header().firstChild.firstChild.data : null);
                        //        //var select = [];
                        //        if (name === "Плательщик") {
                        //            base.column_payer = column;
                        //            var val_code_payer = base.form_searsh_doc_setup.el.select_code_payer.val();
                        //            //base.form_searsh_doc_setup.el.select_code_payer.$element.on("change", function (event) {
                        //            //    //val_code_payerl = $(this).val();
                        //            //    column //.search($(this).val(), { exact: true }).draw();
                        //            //        .search($(this).val() ? '^' + $(this).val() + '$' : '', true, false).draw();
                        //            //});
                        //            column
                        //                .data()
                        //                .unique()
                        //                .sort()
                        //                .each(function (d, j) {
                        //                    list_payer_local.push({ value: d, text: d, disabled: false })
                        //                });
                        //            base.form_searsh_doc_setup.el.select_code_payer.update(list_payer_local, val_code_payer);
                        //        }
                        //        // Create select element
                        //        //let select = document.createElement('select');
                        //        //select.add(new Option(''));
                        //        //column.footer().replaceChildren(select);

                        //        //// Apply listener for user change in value
                        //        //select.addEventListener('change', function () {
                        //        //    column
                        //        //        .search(select.value, { exact: true })
                        //        //        .draw();
                        //        //});

                        //        //// Add list of options
                        //        //column
                        //        //    .data()
                        //        //    .unique()
                        //        //    .sort()
                        //        //    .each(function (d, j) {
                        //        //        select.add(new Option(d));
                        //        //    });
                        //    });

                    }.bind(this)
                });

            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = ['payer_arrival'];
        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_verification_invoices_arrival] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // скрыть элементы выбора
    view_verification_invoices_arrival.prototype.disable_form_searsh_doc_setup = function () {
        this.form_searsh_doc_setup.el.textarea_documents_searsh.disable();
        this.form_searsh_doc_setup.el.button_docs_clear.prop("disabled", true);
        this.form_searsh_doc_setup.el.button_docs_searsh.prop("disabled", true);
        this.form_searsh_doc_setup.el.select_code_payer.disable();
        this.form_searsh_doc_setup.el.select_act.disable();
        this.form_searsh_doc_setup.el.select_id_cargo.disable();
        this.form_searsh_doc_setup.el.select_id_station_from.disable();
        this.form_searsh_doc_setup.el.select_id_station_on.disable();
        this.form_searsh_doc_setup.el.select_id_operator.disable();
    };
    // активировать элементы выбора
    view_verification_invoices_arrival.prototype.enable_form_searsh_doc_setup = function () {
        this.form_searsh_doc_setup.el.textarea_documents_searsh.enable();
        this.form_searsh_doc_setup.el.button_docs_clear.prop("disabled", false);
        this.form_searsh_doc_setup.el.button_docs_searsh.prop("disabled", false);
        this.form_searsh_doc_setup.el.select_code_payer.enable();
        this.form_searsh_doc_setup.el.select_act.enable();
        this.form_searsh_doc_setup.el.select_id_cargo.enable();
        this.form_searsh_doc_setup.el.select_id_station_from.enable();
        this.form_searsh_doc_setup.el.select_id_station_on.enable();
        this.form_searsh_doc_setup.el.select_id_operator.enable();
    };
    // обновить документы за период
    view_verification_invoices_arrival.prototype.update = function (start, stop, callback) {
        // Обновим
        this.clear_all();
        var sel_start = moment(start).format("YYYY-MM-DDTHH:mm");
        var sel_stop = moment(stop).format("YYYY-MM-DDTHH:mm");
        LockScreen(langView('vs_via_update_main_docs', App.Langs));
        this.ids_arrival.getVerificationArrivalUzDocument(sel_start, sel_stop, function (document) {
            this.list_document = [];
            this.select_document = [];
            this.documents = [];
            if (document !== null && document.length > 0) {
                this.enable_form_searsh_doc_setup();
                // Пройдемся по документам
                $.each(document, function (i, el_doc) {

                    // Пройдемся по вагонам
                    var vagons = [];
                    var list_vagons = el_doc.arrivalUzVagons;
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
                            nomMainDoc: el_doc.nomMainDoc,
                            num: el_vag.num,
                            dateOtpr: el_doc.dateOtpr,
                            dateAdoption: el_vag.idArrivalNavigation.dateAdoption,
                            nameStnFrom: el_doc.codeStnFromNavigation ? el_doc.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                            nameStnTo: el_doc.codeStnToNavigation ? el_doc.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
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
                    //arrivalUZDocumentPay
                    var arrivalUZDocumentPay = 0;
                    if (el_doc.arrivalUzDocumentPays && el_doc.arrivalUzDocumentPays.length > 0) {
                        $.each(el_doc.arrivalUzDocumentPays, function (i, el_dpay) {
                            arrivalUZDocumentPay += (el_dpay.summa && el_dpay.kod === '001' ? Number(el_dpay.summa) : 0);
                        }.bind(this));
                    }
                    //
                    this.documents.push({
                        id: el_doc.id,
                        nomMainDoc: el_doc.nomMainDoc,
                        countVagon: vagons.length,
                        vagons: vagons,
                        codeStnFrom: el_doc.codeStnFromNavigation ? el_doc.codeStnFromNavigation.code : null,
                        nameStnFrom: el_doc.codeStnFromNavigation ? el_doc.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                        codeStnTo: el_doc.codeStnToNavigation ? el_doc.codeStnToNavigation.code : null,
                        nameStnTo: el_doc.codeStnToNavigation ? el_doc.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
                        arrivalCargoName: vagons[0].arrivalCargoName,
                        vesg: summ_vesg,
                        tariffContract: el_doc.tariffContract,
                        payerLocalCode: el_doc.codePayerLocalNavigation ? el_doc.codePayerLocalNavigation.code : null,
                        payerLocalName: el_doc.codePayerLocalNavigation ? el_doc.codePayerLocalNavigation['payerName' + ucFirst(App.Lang)] : null,
                        arrivalOperatorAbbr: vagons[0].arrivalOperatorAbbr,
                        toDivisionAbbr: vagons[0].toDivisionAbbr,
                        payerSenderCode: el_doc.codePayerSenderNavigation ? el_doc.codePayerSenderNavigation.code : null,
                        payerSenderName: el_doc.codePayerSenderNavigation ? el_doc.codePayerSenderNavigation['payerName' + ucFirst(App.Lang)] : null,
                        payerArrivalCode: el_doc.codePayerArrivalNavigation ? el_doc.codePayerArrivalNavigation.code : null,
                        payerArrivalName: el_doc.codePayerArrivalNavigation ? el_doc.codePayerArrivalNavigation['payerName' + ucFirst(App.Lang)] : null,
                        dateOtpr: el_doc.dateOtpr,
                        dateAdoption: vagons[0].dateAdoption,
                        arrivalUzVagonPays: summ_arrivalUzVagonPays,
                        arrivalUZDocumentPay: arrivalUZDocumentPay,
                        deffTariff: el_doc.tariffContract !== null && arrivalUZDocumentPay !== null ? el_doc.tariffContract - Number(arrivalUZDocumentPay / 100).toFixed(2) : 0,
                        calcPayer: el_doc.calcPayer,
                        calcPayerUser: el_doc.calcPayerUser,
                        idActServices1: el_doc.idActServices1,
                        idActServices2: el_doc.idActServices2,
                        idActServices3: el_doc.idActServices3,
                        numActServices1: el_doc.numActServices1,
                        numActServices2: el_doc.numActServices2,
                        numActServices3: el_doc.numActServices3,
                        verification: el_doc.verification,
                        verificationUser: el_doc.verificationUser,
                    });
                }.bind(this));
                this.list_document = this.documents;
                this.select_docs(function (select) {
                    this.select_apply(function (select) {
                        this.tab_verification_invoices_wagons.view(select);
                    }.bind(this));
                }.bind(this));
            } else {
                this.tab_verification_invoices_wagons.view([]);
                this.disable_form_searsh_doc_setup();
            }
            this.searsh_alert_info.clear_message();
            this.searsh_alert_info.out_info_message(langView('vs_via_mess_info_add_main_docs', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.documents.length));
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };

    //view_verification_invoices_arrival.prototype.validation_documents_searsh = function () {
    //    var valid = true;
    //    var el_vs = this.form_searsh_doc_setup.el.textarea_documents_searsh;//.$element;
    //    this.list_docs = this.form_searsh_doc_setup.validation_common_searsh.check_control_is_valid_nums(el_vs, this.form_searsh_doc_setup.el.textarea_documents_searsh.val(), false, true);
    //    valid = (list_docs !== null);
    //    return valid;
    //}
    // Обновить списки
    view_verification_invoices_arrival.prototype.update_select_list = function (data) {
        if (data && data.length > 0) {
            // Обновим выпадающие списки
            var list_payer_local = [];
            var list_acts = [];        // numActServices1
            var list_cargo = [];       // грузы по прибытию
            var list_operators = [];   // операторы по прибытию
            var list_stn_from = [];    // станции по отправлению
            var list_stn_on = [];      // станции по прибытию
            // получим выбранные значения
            var code_payer = this.form_searsh_doc_setup.el.select_code_payer.val();
            //this.act
            var id_cargo = this.form_searsh_doc_setup.el.select_id_cargo.val();
            var code_station_from = this.form_searsh_doc_setup.el.select_id_station_from.val();
            var code_station_on = this.form_searsh_doc_setup.el.select_id_station_on.val();
            var id_operator = this.form_searsh_doc_setup.el.select_id_operator.val();

            $.each(data, function (i, el) {
                // Платильщик
                var lpl = list_payer_local.find(function (o) {
                    return o.value === el.payerLocalCode;
                }.bind(this));
                if (!lpl) {
                    list_payer_local.push({ value: el.payerLocalCode, text: el.payerLocalName, disabled: false });
                }
                // Акты

                // Грузы по прибытию
                $.each(el.vagons, function (i, el_wag) {
                    var lcrg = list_cargo.find(function (o) {
                        return o.value === el_wag.arrivalCargoId;
                    }.bind(this));
                    if (!lcrg) {
                        list_cargo.push({ value: el_wag.arrivalCargoId, text: el_wag.arrivalCargoName, disabled: false });
                    }
                    var lops = list_operators.find(function (o) {
                        return o.value === el_wag.arrivalOperatorId;
                    }.bind(this));
                    if (!lops) {
                        list_operators.push({ value: el_wag.arrivalOperatorId, text: el_wag.arrivalOperatorAbbr, disabled: false });
                    }

                }.bind(this));
                // Станция отправления
                var lstf = list_stn_from.find(function (o) {
                    return o.value === el.codeStnFrom;
                }.bind(this));
                if (!lstf) {
                    list_stn_from.push({ value: el.codeStnFrom, text: el.nameStnFrom, disabled: false });
                }
                // Станция прибытия
                var lsto = list_stn_on.find(function (o) {
                    return o.value === el.codeStnTo;
                }.bind(this));
                if (!lsto) {
                    list_stn_on.push({ value: el.codeStnTo, text: el.nameStnTo, disabled: false });
                }

            }.bind(this));
            // проверим наличие выбранных полей
            var pc = list_payer_local.find(function (o) {
                return o.value == code_payer;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_code_payer.update(list_payer_local, (pc ? pc.value : -1));
            //this.act
            var crg = list_cargo.find(function (o) {
                return o.value == id_cargo;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_id_cargo.update(list_cargo, (crg ? crg.value : -1));
            var sf = list_stn_from.find(function (o) {
                return o.value == code_station_from;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_id_station_from.update(list_stn_from, (sf ? sf.value : -1));
            var so = list_stn_on.find(function (o) {
                return o.value == code_station_on;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_id_station_on.update(list_stn_on, (so ? so.value : -1));
            var op = list_operators.find(function (o) {
                return o.value == id_operator;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_id_operator.update(list_operators, (op ? op.value : -1));
        }
    }

    view_verification_invoices_arrival.prototype.select_docs = function (callback) {
        // Обнулим списки
        LockScreen(langView('vs_via_select_main_docs', App.Langs));
        this.clear_all();
        this.list_payer_local = [];
        if (this.list_document && this.list_document.length > 0) {
            //this.list_payer_local.push({ value: el[fvalue], text: el[ftext + lang], disabled: false });
            // Проверим наличие списка документов
            var el_vs = this.form_searsh_doc_setup.el.textarea_documents_searsh;//.$element;
            this.list_docs = this.form_searsh_doc_setup.validation_common_searsh.check_control_is_valid_docs(el_vs, true, true);
            if (this.list_docs) {
                this.select_document = this.list_document.filter(function (i) {
                    return this.list_docs.indexOf(i.nomMainDoc) >= 0;
                }.bind(this));
            } else {
                this.select_document = this.list_document;
            }
            // Обновим выпадающие списки
            this.update_select_list(this.select_document);
            //this.list_payer_local = [];
            //this.list_acts = [];        // numActServices1
            //this.list_cargo = [];       // грузы по прибытию
            //this.list_operators = [];   // операторы по прибытию
            //this.list_stn_from = [];    // станции по отправлению
            //this.list_stn_on = [];      // станции по прибытию
            //$.each(this.select_document, function (i, el) {
            //    // Платильщик
            //    var lpl = this.list_payer_local.find(function (o) {
            //        return o.value === el.payerLocalCode;
            //    }.bind(this));
            //    if (!lpl) {
            //        this.list_payer_local.push({ value: el.payerLocalCode, text: el.payerLocalName, disabled: false });
            //    }
            //    // Акты

            //    // Грузы по прибытию
            //    $.each(el.vagons, function (i, el_wag) {
            //        var lcrg = this.list_cargo.find(function (o) {
            //            return o.value === el_wag.arrivalCargoId;
            //        }.bind(this));
            //        if (!lcrg) {
            //            this.list_cargo.push({ value: el_wag.arrivalCargoId, text: el_wag.arrivalCargoName, disabled: false });
            //        }
            //        var lops = this.list_operators.find(function (o) {
            //            return o.value === el_wag.arrivalOperatorId;
            //        }.bind(this));
            //        if (!lops) {
            //            this.list_operators.push({ value: el_wag.arrivalOperatorId, text: el_wag.arrivalOperatorAbbr, disabled: false });
            //        }

            //    }.bind(this));
            //    // Станция отправления
            //    var lstf = this.list_stn_from.find(function (o) {
            //        return o.value === el.codeStnFrom;
            //    }.bind(this));
            //    if (!lstf) {
            //        this.list_stn_from.push({ value: el.codeStnFrom, text: el.nameStnFrom, disabled: false });
            //    }
            //    // Станция прибытия
            //    var lsto = this.list_stn_on.find(function (o) {
            //        return o.value === el.codeStnTo;
            //    }.bind(this));
            //    if (!lsto) {
            //        this.list_stn_on.push({ value: el.codeStnTo, text: el.nameStnTo, disabled: false });
            //    }

            //}.bind(this));
            //this.form_searsh_doc_setup.el.select_code_payer.update(this.list_payer_local, this.code_payer);
            ////this.act
            //this.form_searsh_doc_setup.el.select_id_cargo.update(this.list_cargo, this.id_cargo);
            //this.form_searsh_doc_setup.el.select_id_station_from.update(this.list_stn_from, this.code_station_from);
            //this.form_searsh_doc_setup.el.select_id_station_on.update(this.list_stn_on, this.code_station_on);
            //this.form_searsh_doc_setup.el.select_id_operator.update(this.list_operators, this.id_operator);

            //this.searsh_alert_info.out_info_message(langView('vs_via_mess_info_select_main_docs', App.Langs).format(moment(this.start).format("YYYY-MM-DD HH:mm"), moment(this.stop).format("YYYY-MM-DD HH:mm"), this.list_document.length, this.select_document.length));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document);
            }
        } else {
            this.select_document = [];
            this.searsh_alert_info.out_info_message(langView('vs_via_mess_info_init', App.Langs));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document);
            }
        }
    };
    // Применить выбор
    view_verification_invoices_arrival.prototype.select_apply = function (callback) {
        // Обнулим списки
        LockScreen(langView('vs_via_select_main_docs', App.Langs));
        this.clear_all();
        this.select_document_detali = [];
        if (this.select_document && this.select_document.length > 0) {
            this.select_document_detali = this.select_document;
            if (this.code_payer != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.payerLocalCode === this.code_payer;
                }.bind(this));
            }
            if (this.act != -1) {

            }
            if (this.id_cargo != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    var gr = i.vagons.find(function (o) { return o.arrivalCargoId === this.id_cargo }.bind(this));
                    return gr !== undefined;
                }.bind(this));
            }
            if (this.code_station_from != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.codeStnFrom === this.code_station_from;
                }.bind(this));
            }
            if (this.code_station_on != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.codeStnTo === this.code_station_on;
                }.bind(this));
            }
            if (this.id_operator != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    var op = i.vagons.find(function (o) { return o.arrivalOperatorId === this.id_operator }.bind(this));
                    return op !== undefined;
                }.bind(this));
            }
            this.update_select_list(this.select_document_detali);
            this.searsh_alert_info.out_info_message(langView('vs_via_mess_info_select_main_docs', App.Langs).format(moment(this.start).format("YYYY-MM-DD HH:mm"), moment(this.stop).format("YYYY-MM-DD HH:mm"), this.list_document.length, this.select_document.length));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document_detali);
            }
        } else {
            this.select_document = [];
            this.searsh_alert_info.out_info_message(langView('vs_via_mess_info_init', App.Langs));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document_detali);
            }
        }
    };
    // Очистить данные
    view_verification_invoices_arrival.prototype.clear_data = function () {
        this.tab_cost_calculation.view([]);
        this.tab_register_accepted_wagons.view([]);
        this.id_doc = null;
        this.ArrivalUzDocument = null;
        this.arrivalUZDocumentPay = null;
        this.codePayerLocal = this.codePayerLocal ? this.codePayerLocal : null;
        this.tariffContract = null;

        this.form_document_pay.el.input_text_doc_pay.val(this.arrivalUZDocumentPay);
        this.form_cost_calculation_setup.el.datalist_payer.val(this.codePayerLocal);
        this.form_cost_calculation_setup.el.input_text_tariff_contract.val(this.tariffContract);
    }

    // Дополнительная валидация doc_pay
    view_verification_invoices_arrival.prototype.validation_doc_pay = function (value, id, not_null, not_alert) {
        var valid = true;
        this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        if (value !== null && value !== "") {
            if (Number(value) !== this.arrivalUZDocumentPay) {
                this.form_document_pay.el.input_text_doc_pay.$element.addClass('check-field');
            } else {
                this.form_document_pay.el.input_text_doc_pay.$element.addClass('is-valid');
            }
        } else {
            this.form_document_pay.el.input_text_doc_pay.$element.addClass('is-invalid');
            valid = false;
        }
        return valid;
    }

    // Дополнительная валидация payer
    view_verification_invoices_arrival.prototype.validation_payer = function (code, id, not_null, not_alert) {
        // Нет данных
        var fn_out_null = function (not_null) {
            // нет входных данных данных
            if (not_null) {
                this.form_cost_calculation_setup.set_element_validation_error(id, langView('vs_via_mess_valid_not_payer', App.Langs), not_alert);
                return false;
            } else {
                this.form_cost_calculation_setup.set_element_validation_ok(id, "", not_alert);
                return true;
            }
        }
        // Нет данных в базе данных
        var fn_out_undefined = function () {
            this.form_cost_calculation_setup.set_element_validation_error(id, langView('vs_via_mess_valid_payer', App.Langs), not_alert);
            return false;
        }
        // Ок
        var fn_out_ok = function () {
            // Ок
            this.form_cost_calculation_setup.set_element_validation_ok(id, "", not_alert);
            return true;
        }
        // Проверка
        if (code === null) {
            return fn_out_null.call(this, not_null);
        }
        if (code === undefined) {
            // Нет в базе
            return fn_out_undefined.call(this);
        }
        this.select_payer = this.api_dir.getExistPayerArrival(code, null);
        if (this.select_payer) {
            return fn_out_ok.call(this);
        } else {
            if (this.select_payer === null) {
                return fn_out_undefined.call(this);
            } else {
                return fn_out_null.call(this, not_null);
            }
        }
    }
    // Дополнительная валидация tariff_contract
    view_verification_invoices_arrival.prototype.validation_tariff_contract = function (value, id, not_null, not_alert) {
        var valid = true;
        this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
        if (value !== null && value !== "") {
            if (Number(value) !== this.tariffContract) {
                this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.addClass('check-field');
            } else {
                this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.addClass('is-valid');
            }
        } else {
            this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.addClass('is-invalid');
            valid = false;
        }
        return valid;
    }
    //--------------------------------------------------------------------------------

    // Уточняющая валидация данных
    view_verification_invoices_arrival.prototype.validation_document_pay = function (result) {
        var valid = true;
        valid = valid & this.validation_doc_pay(result.new.input_text_doc_pay, 'doc_pay', false, false);
        if (this.ArrivalUzDocument == null) {
            this.form_document_pay.validation_common_dp_setup.out_error_message(langView('vs_via_mess_error_not_document', App.Langs));
            valid = false;
        }
        if (result.new && result.new.input_text_doc_pay >= 0) {
            if (Number(result.new.input_text_doc_pay) === this.arrivalUZDocumentPay) {
                this.form_document_pay.set_element_validation_error('doc_pay', langView('vs_via_mess_error_document_pay_not_change', App.Langs), false);
                valid = false;
            }
        }
        return valid;
    }
    // Уточняющая валидация данных
    view_verification_invoices_arrival.prototype.validation_cost_calculation = function (result) {
        var valid = true;
        valid = valid & this.validation_payer(result.new.datalist_payer, 'payer', false, false);
        valid = valid & this.validation_tariff_contract(result.new.input_text_tariff_contract, 'tariff_contract', false, false);
        if (this.ArrivalUzDocument == null) {
            //this.form_cost_calculation_setup.validation_common_cc_setup.out_error_message(langView('vs_via_mess_error_not_document', App.Langs));
            this.form_register_accepted_wagons_setup.set_element_validation_error('num_epd', langView('vs_via_mess_error_not_document', App.Langs), false);
            valid = false;
        }
        if (result.new && result.new.input_text_tariff_contract >= 0 && result.new.datalist_payer !== null) {
            if (Number(result.new.input_text_tariff_contract) === this.tariffContract && result.new.datalist_payer === this.codePayerLocal) {
                this.form_cost_calculation_setup.set_element_validation_error('tariff_contract', langView('vs_via_mess_error_tariff_contract_not_change', App.Langs), false);
                this.form_cost_calculation_setup.set_element_validation_error('payer', langView('vs_via_mess_error_payer_not_change', App.Langs), false);
                valid = false;
            }
        }
        return valid;
    }

    // Обновить тариф прибытия
    view_verification_invoices_arrival.prototype.apply_update_doc_pay = function (data, callback) {
        this.ids_arrival.postUpdateArrivalUzDocumentPay(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            var num_doc = this.ArrivalUzDocument.nomMainDoc;
            var doc_pay = this.form_document_pay.el.input_text_doc_pay.val();
            if (result >= 0) {
                // Ок
                mess_ok = langView('vs_via_mess_ok_update_document_pay', App.Langs).format(num_doc, doc_pay);
            } else {
                mess_error = langView('vs_via_mess_error_update_document_pay', App.Langs).format(doc_pay, num_doc, result);

            }
            this.apply_update(mess_ok, mess_error, function () {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this))
        }.bind(this));
    }
    // Обновить плательщика
    view_verification_invoices_arrival.prototype.apply_update_payer_local = function (data, callback) {
        this.ids_arrival.postArrivalUzDocumentPayerLocal(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            var num_doc = this.ArrivalUzDocument.nomMainDoc;
            var payer_local = this.form_cost_calculation_setup.el.datalist_payer.text();
            var tariff_contract = this.form_cost_calculation_setup.el.input_text_tariff_contract.val();
            if (result >= 0) {
                // Ок
                /*this.id_doc = null;*/
                mess_ok = langView('vs_via_mess_ok_update_cost_calculation', App.Langs).format(num_doc, payer_local, tariff_contract);
            } else {
                mess_error = langView('vs_via_mess_error_update_cost_calculation', App.Langs).format(payer_local, tariff_contract, num_doc, result);
            }
            this.apply_update(mess_ok, mess_error, function () {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this))
        }.bind(this));
    }

    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    view_verification_invoices_arrival.prototype.apply_update = function (mess_ok, mess_err, callback) {
        this.clear_all();

        this.update(this.start, this.stop, this.id_doc, function () {
            if (mess_ok) {
                this.main_alert.out_info_message(mess_ok);
                this.id_doc = null;
                this.form_register_accepted_wagons_setup.el.datalist_num_epd.val(null);
            }
            if (mess_err) {
                this.main_alert.out_error_message(mess_err);
            }
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    }
    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_verification_invoices_arrival.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_verification_invoices_arrival.prototype.clear_all = function () {
        this.searsh_alert_info.clear_message();
        this.form_searsh_doc_setup.clear_all();
        this.form_verification_invoices_setup.clear_all();
        //this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_verification_invoices_arrival.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_verification_invoices_arrival = view_verification_invoices_arrival;

    window.App = App;
})(window);