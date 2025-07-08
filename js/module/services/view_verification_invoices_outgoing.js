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
            'vs_vio_card_header_card_services': 'СВЕРКА НАКЛАДНЫХ ПО ОТПРАВКЕ',
            'vs_vio_card_header_verification_invoices': 'СВЕРКА НАКЛАДНЫХ',

            'vs_vio_mess_init_module': 'Инициализация модуля view_verification_invoices_outgoing',
            'vs_vio_mess_load_operation': 'Загружаю форму операции',

            'vs_vio_title_button_doc_clear': 'Очистить',
            'vs_vio_title_button_doc_searsh': 'Поиск',

            'vs_vio_title_placeholder_doc_searsh': 'Поиск накладных',
            //'vs_vio_text_append_doc_searsh': 'Добавить список вагонов',
            'vs_vio_text_doc_searsh': 'Введите накладные, разделитель ";"',

            //'vs_vio_title_form_button_apply': 'Править документ',
            //'vs_vio_title_form_apply_button_title': 'Править документ ...',

            //'vs_vio_title_label_num_epd': 'Найти накладную:',
            //'vs_vio_title_placeholder_num_epd': 'Найти накладную',
            //'vs_vio_text_label_num_epd': 'Введите номер накладной ...',

            //'vs_vio_title_label_presented1': 'Предъявлено:',
            //'vs_vio_title_placeholder_presented1': '№ Акта',
            //'vs_vio_text_label_presented1': 'Укажите № акта ...',
            //'vs_vio_title_label_presented2': 'Предъявлено:',
            //'vs_vio_title_placeholder_presented2': '№ Акта',
            //'vs_vio_text_label_presented2': 'Укажите № акта ...',
            //'vs_vio_title_label_presented3': 'Предъявлено:',
            //'vs_vio_title_placeholder_presented3': '№ Акта',
            //'vs_vio_text_label_presented3': 'Укажите № акта ...',

            'vs_vio_title_label_payer': 'Плательщик ОТПР:',
            'vs_vio_text_label_payer': 'Выберите плательщика ...',

            'vs_vio_title_label_list': 'Перечень:',
            'vs_vio_title_placeholder_list': 'Перечень',
            'vs_vio_text_label_list': 'Выберите перечень ...',

            'vs_vio_title_label_cargo': 'груз ОТПР:',
            'vs_vio_text_label_cargo': 'Выберите груз ...',

            'vs_vio_title_label_station_from': 'Станция отправления:',
            'vs_vio_text_label_station_from': 'Выберите станцию ...',

            'vs_vio_title_label_station_on': 'Станция назначения:',
            'vs_vio_text_label_station_on': 'Выберите станцию ...',

            'vs_vio_title_label_operator': 'Оператор АМКР:',
            'vs_vio_text_label_operator': 'Выберите оператора ...',

            'vs_vio_title_date_list': 'от:',
            'vs_vio_title_placeholder_date_list': 'Дата перечня',

            'vs_vio_title_label_num_list': 'Перечень:',
            'vs_vio_title_placeholder_num_list': 'Перечень',

            //'vs_vio_title_button_presented1': 'Править акт ...',
            //'vs_vio_title_button_presented2': 'Править акт ...',
            //'vs_vio_title_button_presented3': 'Править акт ...',
            //'vs_vio_title_button_clear': 'очистить акт ...',

            'vs_vio_verification_invoices_title_button_apply': 'Применить сверку',
            'vs_vio_verification_invoices_title_button_title_apply': 'Применить сверку документа № перечня и дату ...',
            'vs_vio_verification_invoices_title_button_clear': 'Очистить сверку',
            'vs_vio_verification_invoices_title_button_title_clear': 'Очистить сверку документа № перечня и дату ...',
            'vs_vio_title_button_Cancel': 'Отмена',
            'vs_vio_button_Ok': 'Применить',



            'vs_vio_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            'vs_vio_mess_run_update_presented': 'Выполнить "СВЕРКУ НАКЛАДНЫХ", будет отмечен перечень {0} от {1}, по всем накладным [{2}].',
            'vs_vio_mess_run_clear_presented': 'Выполнить очистку № и даты перечня, по всем накладным [{0}].',

            'vs_vio_mess_ok_update_presented': 'По накладным [{0}] выполнена "СВЕРКА НАКЛАДНЫХ", Перечень {1} от {2}.',
            'vs_vio_mess_ok_clear_presented': 'По накладным [{0}] были сброшены перечни сверки.',
            'vs_vio_mess_error_update_presented': 'При выполнении "СВЕРКИ НАКЛАДНЫХ" [{0}], - произошла ошибка. Код ошибки {1}',
            'vs_vio_cancel_update_presented': 'Отмена "СВЕРКИ НАКЛАДНЫХ"',

            //'vs_vio_mess_run_update_cost_calculation': 'Выполнить обновление расчета по плательщику {0},с тарифом по договору [{1}].',
            //'vs_vio_mess_ok_update_cost_calculation': 'По документу №{0} выполнен расчет, обновлен плательщик {1} и тариф {2}.',
            //'vs_vio_mess_error_update_cost_calculation': 'При обновлении плательщика {0} и тарифа {1}, документа № {3} - произошла ошибка. Код ошибки {4}',
            //'vs_vio_cancel_update_cost_calculation': 'Отмена обновления расчета по плательщику',

            'vs_vio_mess_error_not_date_list': 'Не указана дата перечня.',
            'vs_vio_mess_error_not_num_list': 'Не указан № перечня.',
            'vs_vio_mess_error_num_list': 'Указан не верный формат № перечня.',
            //'vs_vio_mess_error_not_document': 'Не выбран документ для правки!',
            //'vs_vio_mess_error_document_pay_not_change': 'Тариф без изменений!',
            //'vs_vio_mess_error_payer_not_change': 'Плательщик без изменений!',
            //'vs_vio_mess_error_tariff_contract_not_change': 'Ж.д. тариф по договору без изменений!',

            //'vs_vio_title_period_1': 'ЖД сутки',
            //'vs_vio_title_period_2': 'Календарные сутки',
            //'vs_vio_title_period_3': 'От начала месяца',

            'vs_vio_load_main_docs': 'Загружаю документы за период...',
            /*            'vs_vio_load_docs': 'Загружаю информацию по накладной {0}...',*/
            'vs_vio_update_main_docs': 'Обновляю документы выбранные за период...',
            'vs_vio_select_main_docs': 'Поиск документов согласно выбора...',

            'vs_vio_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            'vs_vio_mess_info_add_main_docs': 'За период c {0} по {1}, найдено {2} документов с расчетом ж.д. тарифа.',
            'vs_vio_mess_info_select_main_docs': 'За период c {0} по {1}, найдено {2} документов с расчетом ж.д. тарифа, выбрано {3}',

            'vs_vio_mess_war_not_select_docs': 'Не выбраны накладные для сверки!',
            //'vs_vio_mess_error_not_presented': 'Укажите № Акта сверки',

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
    function view_verification_invoices_outgoing(selector) {
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
    view_verification_invoices_outgoing.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_verification_invoices_outgoing');
        LockScreen(langView('vs_vio_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,                          // сылки на библиотеки api dir
            api_wsd: null,                          // сылки на библиотеки api wsd
            ids_arrival: null,                      // сылки на библиотеки api arrival
            ids_outgoing: null,                     // сылки на библиотеки api outgoing
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
            bt_close_text: langView('vs_vio_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_vio_button_Ok', App.Langs),
        });

        this.start = null;
        this.stop = null;

        this.list_vagons = [];
        this.select_vagons = [];
        this.code_payer = -1;
        this.lst = '';
        this.id_cargo = -1;
        this.code_station_from = -1;
        this.code_station_on = -1;
        this.id_operator = -1;

        this.select_document_detali = [];
        /*        this.presented = null;*/
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
            header_text: langView('vs_vio_card_header_card_services', App.Langs),
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
            header_text: langView('vs_vio_card_header_verification_invoices', App.Langs),
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
                        this.searsh_alert_info.out_info_message(langView('vs_vio_mess_info_init', App.Langs));

                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_verification_invoices_outgoing');
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
                    apply_text: langView('vs_vio_load_main_docs', App.Langs), //
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
                        title: langView('vs_vio_title_button_doc_clear', App.Langs),
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
                        title: langView('vs_vio_title_button_doc_searsh', App.Langs),
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
                        element_placeholder: langView('vs_vio_title_placeholder_doc_searsh', App.Langs),
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
                        form_text: langView('vs_vio_text_doc_searsh', App.Langs),
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
                        label: langView('vs_vio_title_label_payer', App.Langs),
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
                        form_text: langView('vs_vio_text_label_payer', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datalist_list = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'lists',
                        name: 'lists',
                        label: langView('vs_vio_title_label_list', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_vio_title_placeholder_list', App.Langs),
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
                                    this.lst = set.value;
                                    this.select_apply(function (select) {
                                        this.view_select(select);

                                        LockScreenOff();
                                    }.bind(this));
                                } else {
                                    //var res = this.list_acts.find(function (o) {
                                    //    return o.value === set.value;
                                    //}.bind(this));
                                    //if (res) {
                                    //    this.lst = set.value;

                                    //} else {
                                    //    this.lst = "";
                                    //}
                                    //this.select_apply(function (select) {
                                    //    this.view_select(select);

                                    //    LockScreenOff();
                                    //}.bind(this));
                                }
                            }.bind(this),
                            fn_select: function (event, set, options) {
                                this.lst = set.value;
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
                        form_text: langView('vs_vio_text_label_list', App.Langs),
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
                //        label: langView('vs_vio_title_label_act', App.Langs),
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
                //                this.lst = $(e.currentTarget).val();
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
                //        form_text: langView('vs_vio_text_label_act', App.Langs),
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
                        label: langView('vs_vio_title_label_cargo', App.Langs),
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
                        form_text: langView('vs_vio_text_label_cargo', App.Langs),
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
                        label: langView('vs_vio_title_label_station_from', App.Langs),
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
                        form_text: langView('vs_vio_text_label_station_from', App.Langs),
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
                        label: langView('vs_vio_title_label_station_on', App.Langs),
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
                        form_text: langView('vs_vio_text_label_station_on', App.Langs),
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
                        label: langView('vs_vio_title_label_operator', App.Langs),
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
                        form_text: langView('vs_vio_text_label_operator', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };

                col_alert.childs.push(alert_info);
                objs_sd_setup.push(col_alert);
                objs_sd_setup.push(form_textarea_docs);
                objs_sd_setup.push(form_select_payer);
                objs_sd_setup.push(form_input_datalist_list);
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
                var bt_apply = {
                    obj: 'bs_button',
                    options: {
                        id: 'verification_apply',
                        name: 'verification_apply',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: langView('vs_vio_verification_invoices_title_button_apply', App.Langs),
                        title: langView('vs_vio_verification_invoices_title_button_title_apply', App.Langs),
                        icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.clear = false;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var bt_clear = {
                    obj: 'bs_button',
                    options: {
                        id: 'verification_clear',
                        name: 'verification_clear',
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: langView('vs_vio_verification_invoices_title_button_clear', App.Langs),
                        title: langView('vs_vio_verification_invoices_title_button_title_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom',  //<i class="fa-solid fa-broom"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.clear = true;
                            this.form_verification_invoices_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_list = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'verification_invoice',
                        id: 'num_list',
                        name: 'num_list',
                        label: langView('vs_vio_title_label_num_list', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_vio_title_placeholder_num_list', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: 1,
                        element_max: 999999999,
                        element_step: 1,
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
                        form_text: langView('vs_cccsa_text_label_tariff_contract', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datetime_list = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'verification_invoice',
                        id: 'date_list',
                        name: 'date_list',
                        label: langView('vs_vio_title_date_list', App.Langs),
                        element_type: 'date',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_vio_title_placeholder_date_list', App.Langs),
                        element_required: false,
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
                        //form_text: langView('vf_sp_text_time_period_start', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                col_bt_apply.childs.push(bt_apply);
                col_bt_apply.childs.push(bt_clear);
                objs_vi_setup.push(col_bt_apply);
                objs_vi_setup.push(form_input_list);
                objs_vi_setup.push(form_input_datetime_list);
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

                                $.each(this.select_document_detali, function (i, el) {
                                    id_docs.push(el.id);
                                    num_docs += el.nomDoc + "; ";
                                }.bind(this));

                                var mess = langView('vs_vio_mess_run_update_presented', App.Langs).format(result.new.input_text_num_list, moment(result.new.input_datetime_date_list).format(format_date), num_docs);
                                if (this.clear) {
                                    mess = langView('vs_vio_mess_run_clear_presented', App.Langs).format(num_docs);
                                }
                                this.mcf_lg.open(
                                    langView('vs_vio_title_form_apply', App.Langs),
                                    mess,
                                    function () {
                                        // Принять
                                        var operation = {
                                            id_docs: id_docs,
                                            num_list: !this.clear ? result.new.input_text_num_list : null,
                                            date_list: !this.clear ? moment(result.new.input_datetime_date_list).format(format_date) : null
                                        };
                                        this.apply_update_presented(operation, num_docs, function () {

                                        }.bind(this));
                                    }.bind(this),
                                    function () {
                                        this.main_alert.out_warning_message(langView('vs_vio_cancel_update_presented', App.Langs));
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
                            alert: this.from_way_alert,
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
        this.default_db_names = [];//['payer_arrival'];
        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_verification_invoices_outgoing] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // скрыть элементы выбора
    view_verification_invoices_outgoing.prototype.disable_form_searsh_doc_setup = function () {
        this.form_searsh_doc_setup.el.textarea_documents_searsh.disable();
        this.form_searsh_doc_setup.el.button_docs_clear.prop("disabled", true);
        this.form_searsh_doc_setup.el.button_docs_searsh.prop("disabled", true);

        this.form_searsh_doc_setup.el.select_code_payer.disable();
        this.form_searsh_doc_setup.el.datalist_lists.disable();
        this.form_searsh_doc_setup.el.select_id_cargo.disable();
        this.form_searsh_doc_setup.el.select_id_station_from.disable();
        this.form_searsh_doc_setup.el.select_id_station_on.disable();
        this.form_searsh_doc_setup.el.select_id_operator.disable();
    };
    // активировать элементы выбора
    view_verification_invoices_outgoing.prototype.enable_form_searsh_doc_setup = function () {
        this.form_searsh_doc_setup.el.textarea_documents_searsh.enable();
        this.form_searsh_doc_setup.el.button_docs_clear.prop("disabled", false);
        this.form_searsh_doc_setup.el.button_docs_searsh.prop("disabled", false);
        this.form_searsh_doc_setup.el.select_code_payer.enable();
        this.form_searsh_doc_setup.el.datalist_lists.enable();
        this.form_searsh_doc_setup.el.select_id_cargo.enable();
        this.form_searsh_doc_setup.el.select_id_station_from.enable();
        this.form_searsh_doc_setup.el.select_id_station_on.enable();
        this.form_searsh_doc_setup.el.select_id_operator.enable();
    };
    // получить документ
    view_verification_invoices_outgoing.prototype.get_document = function (document) {
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
    // обновить документы за период
    view_verification_invoices_outgoing.prototype.update = function (start, stop, callback) {
        // Обновим
        this.clear_all();
        this.form_verification_invoices_setup.el.input_text_num_list.val(null);
        this.form_verification_invoices_setup.el.input_datetime_date_list.val(null);
        this.form_searsh_doc_setup.el.select_code_payer.val('');
        this.form_searsh_doc_setup.el.datalist_lists.val('');
        this.form_searsh_doc_setup.el.select_id_cargo.val('');
        this.form_searsh_doc_setup.el.select_id_station_from.val('');
        this.form_searsh_doc_setup.el.select_id_station_on.val('');
        this.form_searsh_doc_setup.el.select_id_operator.val('');
        this.code_payer = -1;
        this.lst = -1;
        this.id_cargo = -1;
        this.code_station_from = -1;
        this.code_station_on = -1;
        this.id_operator = -1;
        this.list_acts = [];

        var sel_start = moment(start).format("YYYY-MM-DDTHH:mm");
        var sel_stop = moment(stop).format("YYYY-MM-DDTHH:mm");
        LockScreen(langView('vs_vio_update_main_docs', App.Langs));
        this.ids_outgoing.getVerificationOutgoingUzDocumentOfPeriod(sel_start, sel_stop, function (document) {
            this.list_document = [];
            this.select_document = [];
            this.select_document_detali = [];
            //this.presented = null;
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
            this.searsh_alert_info.out_info_message(langView('vs_vio_mess_info_add_main_docs', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.documents.length));
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновить списки
    view_verification_invoices_outgoing.prototype.update_select_list = function (data) {
        if (data && data.length > 0) {
            // Обновим выпадающие списки
            var list_payer_sender = [];
            var list_lists = [];
            var list_cargo = [];       // грузы по прибытию
            var list_operators = [];   // операторы по прибытию
            var list_stn_from = [];    // станции по отправлению
            var list_stn_on = [];      // станции по прибытию
            // получим выбранные значения
            var code_payer = this.form_searsh_doc_setup.el.select_code_payer.val();
            var lists = this.form_searsh_doc_setup.el.datalist_lists.val();
            var id_cargo = this.form_searsh_doc_setup.el.select_id_cargo.val();
            var code_station_from = this.form_searsh_doc_setup.el.select_id_station_from.val();
            var code_station_on = this.form_searsh_doc_setup.el.select_id_station_on.val();
            var id_operator = this.form_searsh_doc_setup.el.select_id_operator.val();

            $.each(data, function (i, el) {
                // Платильщик
                var lpl = list_payer_sender.find(function (o) {
                    return o.value === el.payerSenderCode;
                }.bind(this));
                if (!lpl) {
                    list_payer_sender.push({ value: el.payerSenderCode, text: el.payerSenderName, disabled: false });
                }
                // Перечни
                if (el.numList) {
                    var lst = list_lists.find(function (o) {
                        return o.value === el.numList;
                    }.bind(this));
                    if (!lst) {
                        list_lists.push({ value: el.numList, text: el.numList, disabled: false });
                    }
                }
                // Грузы по прибытию
                $.each(el.vagons, function (i, el_wag) {
                    var lcrg = list_cargo.find(function (o) {
                        return o.value === el_wag.outgoingCargoId;
                    }.bind(this));
                    if (!lcrg) {
                        list_cargo.push({ value: el_wag.outgoingCargoId, text: el_wag.outgoingCargoName, disabled: false });
                    }
                    var lops = list_operators.find(function (o) {
                        return o.value === el_wag.outgoingOperatorId;
                    }.bind(this));
                    if (!lops) {
                        list_operators.push({ value: el_wag.outgoingOperatorId, text: el_wag.outgoingOperatorAbbr, disabled: false });
                    }
                }.bind(this));
                // Станция отправления
                var lstf = list_stn_from.find(function (o) {
                    return o.value === el.outgoingCodeStnFrom;
                }.bind(this));
                if (!lstf) {
                    list_stn_from.push({ value: el.outgoingCodeStnFrom, text: el.outgoingNameStnFrom, disabled: false });
                }
                // Станция прибытия
                var lsto = list_stn_on.find(function (o) {
                    return o.value === el.outgoingCodeStnTo;
                }.bind(this));
                if (!lsto) {
                    list_stn_on.push({ value: el.outgoingCodeStnTo, text: el.outgoingNameStnTo, disabled: false });
                }

            }.bind(this));
            // проверим наличие выбранных полей
            var pc = list_payer_sender.find(function (o) {
                return o.value == code_payer;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_code_payer.update(list_payer_sender, (pc ? pc.value : -1));

            var lst = list_lists.find(function (o) {
                return o.value !== null && o.value === lists;
            }.bind(this));
            this.form_searsh_doc_setup.el.datalist_lists.update(list_lists, (lst ? lst.value : ''));
            //this.list_lists = list_lists;
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
    view_verification_invoices_outgoing.prototype.select_docs = function (callback) {
        // Обнулим списки
        LockScreen(langView('vs_vio_select_main_docs', App.Langs));
        this.clear_all();
        //this.list_payer_sender = [];
        //this.presented = null;
        this.clear = false;
        if (this.list_document && this.list_document.length > 0) {
            // Проверим наличие списка документов
            var el_vs = this.form_searsh_doc_setup.el.textarea_documents_searsh;//.$element;
            this.list_docs = this.form_searsh_doc_setup.validation_common_searsh.check_control_is_valid_docs(el_vs, true, false, true);
            if (this.list_docs) {
                this.select_document = this.list_document.filter(function (i) {
                    return this.list_docs.indexOf(i.nomDoc) >= 0;
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
            this.searsh_alert_info.out_info_message(langView('vs_vio_mess_info_init', App.Langs));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document);
            }
        }
    };
    // Применить выбор
    view_verification_invoices_outgoing.prototype.select_apply = function (callback) {
        // Обнулим списки
        LockScreen(langView('vs_vio_select_main_docs', App.Langs));
        //this.clear_all();
        this.searsh_alert_info.clear_message();
        this.select_document_detali = [];
        //this.presented = null;
        this.clear = false;
        if (this.select_document && this.select_document.length > 0) {
            this.select_document_detali = this.select_document;
            if (this.code_payer != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.payerSenderCode === this.code_payer;
                }.bind(this));
            }
            if (this.lst != -1 && this.lst !== null && this.lst !== "") {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.numList === this.lst;
                }.bind(this));
            }
            if (this.id_cargo != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    var gr = i.vagons.find(function (o) { return o.outgoingCargoId === this.id_cargo }.bind(this));
                    return gr !== undefined;
                }.bind(this));
            }
            if (this.code_station_from != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.outgoingCodeStnFrom === this.code_station_from;
                }.bind(this));
            }
            if (this.code_station_on != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.outgoingCodeStnTo === this.code_station_on;
                }.bind(this));
            }
            if (this.id_operator != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    var op = i.vagons.find(function (o) { return o.outgoingOperatorId === this.id_operator }.bind(this));
                    return op !== undefined;
                }.bind(this));
            }
            this.update_select_list(this.select_document_detali);
            this.searsh_alert_info.out_info_message(langView('vs_vio_mess_info_select_main_docs', App.Langs).format(moment(this.start).format("YYYY-MM-DD HH:mm"), moment(this.stop).format("YYYY-MM-DD HH:mm"), this.list_document.length, this.select_document.length));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document_detali);
            }
        } else {
            this.select_document = [];
            this.searsh_alert_info.out_info_message(langView('vs_vio_mess_info_init', App.Langs));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document_detali);
            }
        }
    };
    // Применить выбор
    view_verification_invoices_outgoing.prototype.view_select = function (select) {
        this.tab_verification_invoices_wagons.view(select);
        var num_list = null;
        var date_list = null;
        if (select && select.length > 0) {
            num_list = select[0].numList;
            date_list = select[0].dateList;
            this.form_verification_invoices_setup.el.input_text_num_list.val(num_list);
            this.form_verification_invoices_setup.el.input_datetime_date_list.val(date_list);
        }
        this.form_verification_invoices_setup.el.input_text_num_list.val(num_list);
        this.form_verification_invoices_setup.el.input_datetime_date_list.val(date_list);
    };
    // Очистить данные
    view_verification_invoices_outgoing.prototype.clear_data = function () {
        this.tab_cost_calculation.view([]);
        this.tab_register_accepted_wagons.view([]);
        this.id_doc = null;
        this.ArrivalUzDocument = null;
        this.outgoingUZDocumentPay = null;
        this.codePayerLocal = this.codePayerLocal ? this.codePayerLocal : null;
        this.tariffContract = null;

        this.form_document_pay.el.input_text_doc_pay.val(this.outgoingUZDocumentPay);
        this.form_cost_calculation_setup.el.datalist_payer.val(this.codePayerLocal);
        this.form_cost_calculation_setup.el.input_text_tariff_contract.val(this.tariffContract);
    }
    //--------------------------------------------------------------------------------
    // Дополнительная валидация правки актов
    view_verification_invoices_outgoing.prototype.validation_verification_invoice = function (result) {
        var valid = true;
        if (this.select_document_detali === null || this.select_document_detali.length === 0) {
            this.main_alert.out_error_message(langView('vs_vio_mess_war_not_select_docs', App.Langs));
            valid = false;
        } else {
            if (!this.clear) {
                if (result.new.input_datetime_date_list === null || !result.new.input_datetime_date_list._isValid) {
                    this.form_verification_invoices_setup.set_element_validation_error('date_list', langView('vs_vio_mess_error_not_date_list', App.Langs), false);
                    valid = false;
                }
                if (result.new.input_text_num_list === null) {
                    this.form_verification_invoices_setup.set_element_validation_error('num_list', langView('vs_vio_mess_error_not_num_list', App.Langs), false);
                    valid = false;
                } else {
                    if (result.new.input_text_num_list < 1) {
                        this.form_verification_invoices_setup.set_element_validation_error('num_list', langView('vs_vio_mess_error_num_list', App.Langs), false);
                        valid = false;
                    }
                }
            }
        }
        return valid;
    }
    // Обновить 
    view_verification_invoices_outgoing.prototype.apply_update_presented = function (data, num_docs, callback) {
        var result = -1;
        this.ids_outgoing.postVerificationOutgoingUzDocument(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            var n = 0;
            this.clear_all();
            if (result >= 0) {
                // Ок
                if (data.num_list !== null) {
                    mess_ok = langView('vs_vio_mess_ok_update_presented', App.Langs).format(num_docs, data.num_list, data.date_list);
                } else {
                    mess_ok = langView('vs_vio_mess_ok_clear_presented', App.Langs).format(num_docs);
                }
                if (data && data.id_docs && data.id_docs.length > 0) {
                    LockScreen(langView('vs_vio_update_main_docs', App.Langs));
                    $.each(data.id_docs, function (i, el) {
                        n += 1;
                        this.ids_outgoing.getVerificationOutgoingUzDocumentOfId(el, function (document) {
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
                mess_error = langView('vs_vio_mess_error_update_presented', App.Langs).format(num_docs, result);
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
    view_verification_invoices_outgoing.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_verification_invoices_outgoing.prototype.clear_all = function () {
        this.searsh_alert_info.clear_message();
        this.form_searsh_doc_setup.clear_all();
        this.form_verification_invoices_setup.clear_all();
        //this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_verification_invoices_outgoing.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_verification_invoices_outgoing = view_verification_invoices_outgoing;

    window.App = App;
})(window);