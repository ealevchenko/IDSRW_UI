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
            'vs_via_text_doc_searsh': 'Введите накладные, разделитель ";"',

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
            'vs_via_title_placeholder_act': '№ Акта',
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
            'vs_via_title_button_clear': 'очистить акт ...',

            'vs_via_title_button_Cancel': 'Отмена',
            'vs_via_button_Ok': 'Применить',

            'vs_via_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            'vs_via_mess_run_update_presented': 'Выполнить "СВЕРКУ НАКЛАДНЫХ", будет внесен в поле {0}, акт сверки № {1} по всем накладным [{2}].',
            'vs_via_mess_run_clear_presented': 'Выполнить очистку акта сверки в поле {0}, по всем накладным [{1}].',

            'vs_via_mess_ok_update_presented': 'По накладным [{0}] выполнена "СВЕРКА НАКЛАДНЫХ", Акт сверки [{1}].',
            'vs_via_mess_ok_clear_presented': 'По накладным [{0}] были сброшены акты сверки.',
            'vs_via_mess_error_update_presented': 'При выполнении "СВЕРКИ НАКЛАДНЫХ" [{0}], - произошла ошибка. Код ошибки {1}',
            'vs_via_cancel_update_presented': 'Отмена "СВЕРКИ НАКЛАДНЫХ"',

            'vs_via_load_main_docs': 'Загружаю документы за период...',
            'vs_via_update_main_docs': 'Обновляю документы выбранные за период...',
            'vs_via_select_main_docs': 'Поиск документов согласно выбора...',

            'vs_via_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            'vs_via_mess_info_add_main_docs': 'За период c {0} по {1}, найдено {2} документов с расчетом ж.д. тарифа.',
            'vs_via_mess_info_select_main_docs': 'За период c {0} по {1}, найдено {2} документов с расчетом ж.д. тарифа, выбрано {3}',

            'vs_via_mess_war_not_select_docs': 'Не выбраны накладные для сверки!',
            'vs_via_mess_error_not_presented': 'Укажите № Акта сверки',

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
        this.act = '';
        this.id_cargo = -1;
        this.code_station_from = -1;
        this.code_station_on = -1;
        this.id_operator = -1;

        this.select_document_detali = [];
        this.presented = null;
        this.clear = false;

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
                //this.payer_arrival = this.api_dir.getAllPayerArrival();

                //this.list_payer_arrival = this.api_dir.getListValueTextPayerArrival();

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
                                    this.view_select(select);
                                    //this.tab_verification_invoices_wagons.view(select);
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
                                    this.view_select(select);
                                    //this.tab_verification_invoices_wagons.view(select);
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
                                    this.view_select(select);
                                    //this.tab_verification_invoices_wagons.view(select);
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
                var form_input_datalist_acts = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'acts',
                        name: 'acts',
                        label: langView('vs_via_title_label_act', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_act', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: [],
                            out_value: false,
                            out_group: false,
                            default: '',
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {
                                if (set.value === "") {
                                    this.act = set.value;
                                    this.select_apply(function (select) {
                                        this.view_select(select);

                                        LockScreenOff();
                                    }.bind(this));
                                } else {
                                    //var res = this.list_acts.find(function (o) {
                                    //    return o.value === set.value;
                                    //}.bind(this));
                                    //if (res) {
                                    //    this.act = set.value;

                                    //} else {
                                    //    this.act = "";
                                    //}
                                    //this.select_apply(function (select) {
                                    //    this.view_select(select);

                                    //    LockScreenOff();
                                    //}.bind(this));
                                }
                            }.bind(this),
                            fn_select: function (event, set, options) {
                                this.act = set.value;
                                this.select_apply(function (select) {
                                    this.view_select(select);

                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        form_text: langView('vs_via_text_label_act', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                //var form_select_acts = {
                //    obj: 'bs_form_select',
                //    options: {
                //        validation_group: 'common_searsh',
                //        id: 'act',
                //        name: 'act',
                //        label: langView('vs_via_title_label_act', App.Langs),
                //        element_fsize: 'sm',
                //        element_class: null,
                //        element_value: null,
                //        element_multiple: false,
                //        element_title: null,
                //        element_required: false,
                //        element_readonly: false,
                //        element_size: null,
                //        element_options: {
                //            data: [],
                //            default: -1,
                //            fn_change: function (e) {
                //                e.preventDefault();
                //                // Обработать выбор
                //                this.act = $(e.currentTarget).val();
                //                this.select_apply(function (select) {
                //                    this.view_select(select);
                //                    //this.tab_verification_invoices_wagons.view(select);
                //                    LockScreenOff();
                //                }.bind(this));
                //            }.bind(this),
                //            fn_check: function (text) {

                //            }.bind(this),
                //        },
                //        validation: false,
                //        feedback_invalid: null,
                //        feedback_valid: null,
                //        feedback_class: null,
                //        col_prefix: 'md',
                //        col_size: 1,
                //        col_class: 'mt-0',
                //        form_text: langView('vs_via_text_label_act', App.Langs),
                //        form_text_class: null,
                //    },
                //    childs: []
                //};
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
                                    this.view_select(select);
                                    //this.tab_verification_invoices_wagons.view(select);
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
                                    this.view_select(select);
                                    //this.tab_verification_invoices_wagons.view(select);
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
                                    this.view_select(select);
                                    //this.tab_verification_invoices_wagons.view(select);
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
                                    this.view_select(select);
                                    //this.tab_verification_invoices_wagons.view(select);
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
                objs_sd_setup.push(form_input_datalist_acts);
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
                            this.presented = 1;
                            this.clear = false;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var bt_clear_presented1 = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_via_title_button_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.presented = 1;
                            this.clear = true;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_presented1 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_vi',
                        id: 'presented1',
                        name: 'presented1',
                        label: langView('vs_via_title_label_presented1', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_presented1', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var value = $(e.currentTarget).val();
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
                        group_append_objs: [bt_apply_presented1, bt_clear_presented1],
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
                            this.presented = 2;
                            this.clear = false;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var bt_clear_presented2 = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_via_title_button_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.presented = 2;
                            this.clear = true;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_presented2 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_vi',
                        id: 'presented2',
                        name: 'presented2',
                        label: langView('vs_via_title_label_presented2', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_presented2', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var value = $(e.currentTarget).val();
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
                        group_append_objs: [bt_apply_presented2, bt_clear_presented2],
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
                            this.presented = 3;
                            this.clear = false;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var bt_clear_presented3 = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_via_title_button_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.presented = 3;
                            this.clear = true;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_presented3 = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_vi',
                        id: 'presented3',
                        name: 'presented3',
                        label: langView('vs_via_title_label_presented3', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_via_title_placeholder_presented3', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var value = $(e.currentTarget).val();
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
                        group_append_objs: [bt_apply_presented3, bt_clear_presented3],
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
                            var valid = this.validation_verification_invoice(result);
                            if (valid) {
                                var id_docs = []
                                var num_docs = "";
                                var num_act = null;
                                switch (this.presented) {
                                    case 1: { num_act = result.new.input_text_presented1; break; }
                                    case 2: { num_act = result.new.input_text_presented2; break; }
                                    case 3: { num_act = result.new.input_text_presented3; break; }
                                }

                                $.each(this.select_document_detali, function (i, el) {
                                    id_docs.push(el.id);
                                    num_docs += el.nomMainDoc + "; ";
                                }.bind(this));

                                var mess = langView('vs_via_mess_run_update_presented', App.Langs).format(this.presented, num_act, num_docs);
                                if (this.clear) {
                                    mess = langView('vs_via_mess_run_clear_presented', App.Langs).format(this.presented, num_docs);
                                }
                                this.mcf_lg.open(
                                    langView('vs_via_title_form_apply', App.Langs),
                                    mess,
                                    function () {
                                        // Принять
                                        var operation = {
                                            id_docs: id_docs,
                                            presented: this.presented,
                                            num_act: !this.clear ? num_act : null
                                        };
                                        this.apply_update_presented(operation, num_docs, function () {

                                        }.bind(this));
                                    }.bind(this),
                                    function () {
                                        this.main_alert.out_warning_message(langView('vs_via_cancel_update_presented', App.Langs));
                                    }.bind(this));
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
                            alert: this.from_way_alert,
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
            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = [];// ['payer_arrival'];
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
        this.form_searsh_doc_setup.el.datalist_acts.disable();
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
        this.form_searsh_doc_setup.el.datalist_acts.enable();
        this.form_searsh_doc_setup.el.select_id_cargo.enable();
        this.form_searsh_doc_setup.el.select_id_station_from.enable();
        this.form_searsh_doc_setup.el.select_id_station_on.enable();
        this.form_searsh_doc_setup.el.select_id_operator.enable();
    };
    // получить документ
    view_verification_invoices_arrival.prototype.get_document = function (document) {
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
    // обновить документы за период
    view_verification_invoices_arrival.prototype.update = function (start, stop, callback) {
        // Обновим
        this.clear_all();
        this.form_verification_invoices_setup.el.input_text_presented1.val('');
        this.form_verification_invoices_setup.el.input_text_presented2.val('');
        this.form_verification_invoices_setup.el.input_text_presented3.val('');
        this.form_searsh_doc_setup.el.textarea_documents_searsh.val('');
        this.form_searsh_doc_setup.el.select_code_payer.val('');
        this.form_searsh_doc_setup.el.datalist_acts.val('');
        this.form_searsh_doc_setup.el.select_id_cargo.val('');
        this.form_searsh_doc_setup.el.select_id_station_from.val('');
        this.form_searsh_doc_setup.el.select_id_station_on.val('');
        this.form_searsh_doc_setup.el.select_id_operator.val('');
        this.code_payer = -1;
        this.act = -1;
        this.id_cargo = -1;
        this.code_station_from = -1;
        this.code_station_on = -1;
        this.id_operator = -1;
        //this.list_acts = [];

        var sel_start = moment(start).format("YYYY-MM-DDTHH:mm");
        var sel_stop = moment(stop).format("YYYY-MM-DDTHH:mm");
        LockScreen(langView('vs_via_update_main_docs', App.Langs));
        this.ids_arrival.getVerificationArrivalUzDocumentOfPeriod(sel_start, sel_stop, function (document) {
            this.list_document = [];
            this.select_document = [];
            this.select_document_detali = [];
            this.presented = null;
            this.clear = false;
            this.documents = [];
            if (document !== null && document.length > 0) {
                this.enable_form_searsh_doc_setup();
                // Пройдемся по документам
                $.each(document, function (i, el_doc) {
                    this.documents.push(this.get_document(el_doc));
                }.bind(this));
                this.list_document = this.documents;
                this.select_docs(function (select) {
                    this.select_apply(function (select) {
                        this.view_select(select);
                        //this.tab_verification_invoices_wagons.view(select);
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
            var act = this.form_searsh_doc_setup.el.datalist_acts.val();
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
                if (el.numActServices1) {
                    var act1 = list_acts.find(function (o) {
                        return o.value === el.numActServices1;
                    }.bind(this));
                    if (!act1) {
                        list_acts.push({ value: el.numActServices1, text: el.numActServices1, disabled: false });
                    }
                }
                if (el.numActServices2) {
                    var act2 = list_acts.find(function (o) {
                        return o.value === el.numActServices2;
                    }.bind(this));
                    if (!act2) {
                        list_acts.push({ value: el.numActServices2, text: el.numActServices2, disabled: false });
                    }
                }
                if (el.numActServices3) {
                    var act3 = list_acts.find(function (o) {
                        return o.value === el.numActServices3;
                    }.bind(this));
                    if (!act3) {
                        list_acts.push({ value: el.numActServices3, text: el.numActServices3, disabled: false });
                    }
                }

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
            var ac = list_acts.find(function (o) {
                return o.value !== null && o.value === act;
            }.bind(this));
            this.form_searsh_doc_setup.el.datalist_acts.update(list_acts, (ac ? ac.value : ''));
            //this.list_acts = list_acts;
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
    // 
    view_verification_invoices_arrival.prototype.select_docs = function (callback) {
        // Обнулим списки
        LockScreen(langView('vs_via_select_main_docs', App.Langs));
        this.clear_all();
        //this.list_payer_local = [];
        this.presented = null;
        this.clear = false;
        if (this.list_document && this.list_document.length > 0) {
            // Проверим наличие списка документов
            var el_vs = this.form_searsh_doc_setup.el.textarea_documents_searsh;//.$element;
            this.list_docs = this.form_searsh_doc_setup.validation_common_searsh.check_control_is_valid_docs(el_vs, true, false, true);
            if (this.list_docs) {
                this.select_document = this.list_document.filter(function (i) {
                    return this.list_docs.indexOf(i.nomMainDoc) >= 0;
                }.bind(this));
            } else {
                this.select_document = this.list_document;
            }
            // Обновим выпадающие списки
            this.update_select_list(this.select_document);
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
        //this.clear_all();
        this.searsh_alert_info.clear_message();
        this.select_document_detali = [];
        this.presented = null;
        this.clear = false;
        if (this.select_document && this.select_document.length > 0) {
            this.select_document_detali = this.select_document;
            if (this.code_payer != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.payerLocalCode === this.code_payer;
                }.bind(this));
            }
            if (this.act != -1 && this.act !== null && this.act !== "") {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.numActServices1 === this.act
                        || i.numActServices2 === this.act
                        || i.numActServices3 === this.act
                }.bind(this));
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
    // Применить выбор
    view_verification_invoices_arrival.prototype.view_select = function (select) {
        this.tab_verification_invoices_wagons.view(select);
        if (select && select.length > 0) {

            var presented1 = select[0].numActServices1;
            var pr1 = select.filter(function (i) { return i.numActServices1 === presented1 }.bind(this));
            presented1 = (pr1.length !== select.length ? null : presented1);
            var presented2 = select[0].numActServices2;
            var pr2 = select.filter(function (i) { return i.numActServices2 === presented2 }.bind(this));
            presented2 = (pr2.length !== select.length ? null : presented2);
            var presented3 = select[0].numActServices3;
            var pr3 = select.filter(function (i) { return i.numActServices3 === presented3 }.bind(this));
            presented3 = (pr3.length !== select.length ? null : presented3);
            this.form_verification_invoices_setup.el.input_text_presented1.val(presented1);
            this.form_verification_invoices_setup.el.input_text_presented2.val(presented2);
            this.form_verification_invoices_setup.el.input_text_presented3.val(presented3);
        }
    };
    // Очистить данные
    //view_verification_invoices_arrival.prototype.clear_data = function () {
    //    this.tab_cost_calculation.view([]);
    //    this.tab_register_accepted_wagons.view([]);
    //    this.id_doc = null;
    //    this.ArrivalUzDocument = null;
    //    this.arrivalUZDocumentPay = null;
    //    this.codePayerLocal = this.codePayerLocal ? this.codePayerLocal : null;
    //    this.tariffContract = null;

    //    this.form_document_pay.el.input_text_doc_pay.val(this.arrivalUZDocumentPay);
    //    this.form_cost_calculation_setup.el.datalist_payer.val(this.codePayerLocal);
    //    this.form_cost_calculation_setup.el.input_text_tariff_contract.val(this.tariffContract);
    //}
    //--------------------------------------------------------------------------------
    // Дополнительная валидация правки актов
    view_verification_invoices_arrival.prototype.validation_verification_invoice = function (result) {
        var valid = true;
        if (this.select_document_detali === null || this.select_document_detali.length === 0) {
            this.main_alert.out_error_message(langView('vs_via_mess_war_not_select_docs', App.Langs));
            valid = false;
        } else {
            if (!this.clear && this.presented === 1 && !result.new.input_text_presented1) {
                this.form_verification_invoices_setup.set_element_validation_error('presented1', langView('vs_via_mess_error_not_presented', App.Langs), false);
                valid = false;
            }
            if (!this.clear && this.presented === 2 && !result.new.input_text_presented2) {
                this.form_verification_invoices_setup.set_element_validation_error('presented2', langView('vs_via_mess_error_not_presented', App.Langs), false);
                valid = false;
            }
            if (!this.clear && this.presented === 3 && !result.new.input_text_presented3) {
                this.form_verification_invoices_setup.set_element_validation_error('presented3', langView('vs_via_mess_error_not_presented', App.Langs), false);
                valid = false;
            }
        }
        return valid;
    }
    // Обновить 
    view_verification_invoices_arrival.prototype.apply_update_presented = function (data, num_docs, callback) {
        //var result = 1;
        this.ids_arrival.postVerificationArrivalUzDocument(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            var n = 0;
            this.clear_all();
            if (result >= 0) {
                // Ок
                if (data.num_act !== null) {
                    mess_ok = langView('vs_via_mess_ok_update_presented', App.Langs).format(num_docs, data.num_act);
                } else {
                    mess_ok = langView('vs_via_mess_ok_clear_presented', App.Langs).format(num_docs);
                }
                if (data && data.id_docs && data.id_docs.length > 0) {
                    LockScreen(langView('vs_via_update_main_docs', App.Langs));
                    $.each(data.id_docs, function (i, el) {
                        n += 1;
                        this.ids_arrival.getVerificationArrivalUzDocumentOfId(el, function (document) {
                            n -= 1;
                            var doc = this.get_document(document);
                            var exist_doc = this.list_document.find(function (o) {
                                return o.id === doc.id;
                            }.bind(this));
                            if (exist_doc && doc) {
                                var res = this.list_document.indexOf(exist_doc);
                                this.list_document[res] = doc;
                                //this.list_document.splice(res, 1);
                                //this.list_document.push(doc);
                            }
                            if (n === 0) {

                                this.select_docs(function (select) {
                                    this.select_apply(function (select) {
                                        this.view_select(select);
                                        //this.tab_verification_invoices_wagons.view(select);
                                        // Очистить поля правки
                                        //this.form_verification_invoices_setup.el['input_text_presented' + data.presented].val('');
                                        this.main_alert.out_info_message(mess_ok);
                                        LockScreenOff();
                                        if (typeof callback === 'function') {
                                            callback(result);
                                        }
                                    }.bind(this));
                                }.bind(this));
                            }
                        }.bind(this));
                    }.bind(this));
                }
            } else {
                mess_error = langView('vs_via_mess_error_update_presented', App.Langs).format(num_docs, result);
                this.main_alert.out_error_message(mess_error);
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(result);
                }
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