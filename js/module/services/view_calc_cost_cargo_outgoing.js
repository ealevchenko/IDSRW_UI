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
            'vs_ccco_card_header_card_services': 'РЕЕСТР ОТПРАВЛЕННЫХ ВАГОНОВ',
            'vs_ccco_card_header_register_sent_wagons': 'РАСЧЕТ ОТПРАВЛЕННЫХ ВАГОНОВ',

            'vs_ccco_mess_init_module': 'Инициализация модуля view_calc_cost_cargo_outgoing',
            'vs_ccco_mess_load_operation': 'Загружаю форму операции',

            'vs_ccco_mess_war_not_select_docs': 'Не выбран номер накладной для отображения информации!',
            'vs_ccco_mess_error_not_document': 'Не выбран документ для правки!',

            'vs_ccco_title_label_doc_pay': 'Тариф ЭПД (kod=001):',
            'vs_ccco_title_placeholder_doc_pay': 'Тариф ЭПД',
            'vs_ccco_text_label_doc_pay': 'Скорректируйте тариф ЭПД ...',

            'vs_ccco_title_label_tariff_contract': 'Ж.д. тариф по договору, грн:',
            'vs_ccco_title_placeholder_tariff_contract': 'Ж.д. тариф по договору',
            'vs_ccco_text_label_tariff_contract': 'Введите Ж.д. тариф по договору(грн)...',

            'vs_ccco_title_label_payer': 'Плательщик ОТПР:',
            'vs_ccco_text_label_payer': 'Выберите плательщика ...',

            'vs_ccco_title_label_cargo': 'груз ОТПР:',
            'vs_ccco_text_label_cargo': 'Выберите груз ...',

            'vs_ccco_title_label_station_from': 'Станция отправления:',
            'vs_ccco_text_label_station_from': 'Выберите станцию ...',

            'vs_ccco_title_button_Cancel': 'Отмена',
            'vs_ccco_button_Ok': 'Применить',

            'vs_ccco_title_button_doc_pay': 'Обновить тариф отправки (kod=001)...',
            'vs_ccco_title_button_tariff_contract': 'Обновить ж.д. тариф по договору...',
            'vs_ccco_title_button_clear_tariff_contract': 'Очистить ж.д. тариф по договору...',

            'vs_ccco_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            'vs_ccco_mess_run_update_doc_pay': 'Править тариф ЭПД (kod=001) по документу [{0}], будет внесен новый тариф :{1} вместо тарифа :{2}.',
            'vs_ccco_cancel_update_doc_pay': 'Отмена правки тарифа ЭПД.',
            'vs_ccco_mess_ok_update_doc_pay': 'По документу  [{0}] обнавлен тариф ЭПД (kod=001)',
            'vs_ccco_mess_error_update_doc_pay': 'При обновлении тарифа ЭПД по документу [{0}], - произошла ошибка. Код ошибки {1}',

            'vs_ccco_mess_run_update_tariff_contract': 'Править ж.д. тариф по договору по документу [{0}], будет внесен новый ж.д. тариф :{1}',
            'vs_ccco_cancel_update_tariff_contract': 'Отмена правки ж.д. тарифа.',
            'vs_ccco_mess_ok_update_tariff_contract': 'По документу  [{0}] обнавлен ж.д. тариф по договору',
            'vs_ccco_mess_error_update_tariff_contract': 'При обновлении ж.д. тарифа по договору по документу [{0}], - произошла ошибка. Код ошибки {1}',

            'vs_ccco_mess_run_clear_tariff_contract': 'Очистить ж.д. тариф по договору по документу [{0}]',
            'vs_ccco_cancel_clear_tariff_contract': 'Отмена очистки ж.д. тарифа.',
            'vs_ccco_mess_ok_clear_tariff_contract': 'По документу  [{0}] удален ж.д. тариф по договору',
            'vs_ccco_mess_error_clear_tariff_contract': 'При очистки ж.д. тарифа по договору по документу [{0}], - произошла ошибка. Код ошибки {1}',

            'vs_ccco_mess_error_select': 'Документ {0} для правки закрыт, по документу была произведена сверка, перечень №{1} от {2}',

            'vs_ccco_load_main_docs': 'Загружаю документы за период...',
            'vs_ccco_update_main_docs': 'Обнавляю документы выбранные за период...',
            'vs_ccco_select_main_docs': 'Поиск документов согласно выбора...',

            'vs_ccco_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            'vs_ccco_mess_info_add_main_docs': 'За период c {0} по {1}, найдено {2} документов.',
            'vs_ccco_mess_info_select_main_docs': 'За период c {0} по {1}, найдено {2} документов, выбрано {3}',

            'vs_ccco_mess_error_not_doc_pay': 'Не указан новый тариф ЭПД!',
            'vs_ccco_mess_error_exist_doc_pay': 'Указаный тариф ЭПД не отличается от существующего!',

            'vs_ccco_mess_error_not_tariff_contract': 'Не указан тариф по договору!',
            'vs_ccco_mess_error_exist_tariff_contract': 'Указаный тариф по договору не отличается от существующего!',

            'vs_ccco_mess_war_not_select_docs': 'Не выбрана накладная для правки!',

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
    function view_calc_cost_cargo_outgoing(selector) {
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
    view_calc_cost_cargo_outgoing.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_calc_cost_cargo_outgoing');
        LockScreen(langView('vs_ccco_mess_init_module', App.Langs));
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
            bt_close_text: langView('vs_ccco_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_ccco_button_Ok', App.Langs),
        });

        this.start = null;
        this.stop = null;

        this.id = null;
        this.type = null;
        this.current_doc_pay = null;
        this.current_tariff_contract = null;
        this.nomDoc = null;


        this.code_payer = -1;
        this.id_cargo = [];
        this.code_stn_from = -1;

        this.select_document_detali = [];

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
            header_text: langView('vs_ccco_card_header_card_services', App.Langs),
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

        // Создать макет панели (Реестр отправленных вагонов)
        this.register_sent_wagons = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_ccco_card_header_register_sent_wagons', App.Langs),
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
        this.register_sent_wagons_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.register_sent_wagons_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert verification_invoices
        this.alert_register_sent_wagons = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.register_sent_wagons_table.$html.append(this.alert_register_sent_wagons.$html);
        this.register_sent_wagons_alert = new ALERT(this.alert_register_sent_wagons.$html);

        row.$html.append(this.register_sent_wagons_setup.$html).append(this.register_sent_wagons_table.$html);
        this.register_sent_wagons.body.$html.append(row.$html);

        this.$main.append(this.card_services.$html.append(this.register_sent_wagons.$html));
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
                        this.register_sent_wagons_setup.$html.append(this.form_register_sent_wagons.$form);

                        var alsert_info = $('div#alert-info');
                        this.searsh_alert_info = new ALERT(alsert_info);
                        this.searsh_alert_info.out_info_message(langView('vs_ccco_mess_info_init', App.Langs));

                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_calc_cost_cargo_outgoing');
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
                    apply_text: langView('vs_ccco_load_main_docs', App.Langs), //
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

                var form_select_payer = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'code_payer',
                        name: 'code_payer',
                        label: langView('vs_ccco_title_label_payer', App.Langs),
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
                        form_text: langView('vs_ccco_text_label_payer', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_cargo = {
                    obj: 'bs_form_select_multiple',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'id_cargo',
                        name: 'id_cargo',
                        label: langView('vs_ccco_title_label_cargo', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: true,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: -1,
                            fn_change: function (e, val) {
                                //e.preventDefault();
                                // Обработать выбор
                                this.id_cargo = val;

                                //this.id_cargo = Number($(e.currentTarget).val());
                                this.select_apply(function (select) {
                                    this.view_select(select);
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (e, val) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        form_text: langView('vs_ccco_text_label_cargo', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                //var form_select_cargo = {
                //    obj: 'bs_form_select',
                //    options: {
                //        validation_group: 'common_searsh',
                //        id: 'id_cargo',
                //        name: 'id_cargo',
                //        label: langView('vs_ccco_title_label_cargo', App.Langs),
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
                //                this.id_cargo = Number($(e.currentTarget).val());
                //                this.select_apply(function (select) {
                //                    this.view_select(select);
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
                //        col_size: 2,
                //        col_class: 'mt-0',
                //        form_text: langView('vs_ccco_text_label_cargo', App.Langs),
                //        form_text_class: null,
                //    },
                //    childs: []
                //};

                var form_select_station_from = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_searsh',
                        id: 'code_stn_from',
                        name: 'code_stn_from',
                        label: langView('vs_ccco_title_label_station_from', App.Langs),
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
                                this.code_stn_from = Number($(e.currentTarget).val());
                                this.select_apply(function (select) {
                                    this.view_select(select);
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
                        form_text: langView('vs_ccco_text_label_station_from', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                col_alert.childs.push(alert_info);
                objs_sd_setup.push(col_alert);
                objs_sd_setup.push(form_select_payer);
                objs_sd_setup.push(form_select_cargo);
                objs_sd_setup.push(form_select_station_from);
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
                this.form_register_sent_wagons = new FD();
                var objs_rsw = [];
                var bt_apply_doc_pay = {
                    obj: 'bs_button',
                    options: {
                        id: 'apply_doc_pay',
                        name: 'apply_doc_pay',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_ccco_title_button_doc_pay', App.Langs),
                        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.type = 0;
                            this.form_register_sent_wagons.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_doc_pay = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_rsw',
                        id: 'doc_pay',
                        name: 'doc_pay',
                        label: langView('vs_ccco_title_label_doc_pay', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ccco_title_placeholder_doc_pay', App.Langs),
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
                        group_append_objs: [bt_apply_doc_pay],
                        form_text: langView('vs_ccco_text_label_doc_pay', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var bt_apply_tariff_contract = {
                    obj: 'bs_button',
                    options: {
                        id: 'apply_tariff_contract',
                        name: 'apply_tariff_contract',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_ccco_title_button_tariff_contract', App.Langs),
                        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.type = 1;
                            this.form_register_sent_wagons.$form.submit();
                        }.bind(this),
                    }
                };
                var bt_clear_tariff_contract = {
                    obj: 'bs_button',
                    options: {
                        id: 'clear_tariff_contract',
                        name: 'clear_tariff_contract',
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_ccco_title_button_clear_tariff_contract', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom',//<i class="fa-solid fa-broom"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.type = 2;
                            this.form_register_sent_wagons.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_tariff_contract = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_rsw',
                        id: 'tariff_contract',
                        name: 'tariff_contract',
                        label: langView('vs_ccco_title_label_tariff_contract', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ccco_title_placeholder_tariff_contract', App.Langs),
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
                                var value = $(e.currentTarget).val();
                                //this.validation_tariff_contract(value, 'tariff_contract', false, true);
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
                        group_append_objs: [bt_clear_tariff_contract, bt_apply_tariff_contract],
                        form_text: langView('vs_ccco_text_label_tariff_contract', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                objs_rsw.push(form_input_doc_pay);
                objs_rsw.push(form_input_tariff_contract);
                this.form_register_sent_wagons.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_rsw,
                    id: null,
                    form_class: 'row g-3 mt-2',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {
                            var valid = this.validation_register_sent_wagons(result);
                            if (valid) {
                                var pay = null;
                                if (this.type === 0) {
                                    var mess = langView('vs_ccco_mess_run_update_doc_pay', App.Langs).format(this.nomDoc, result.new.input_text_doc_pay, this.current_doc_pay);
                                    pay = result.new.input_text_doc_pay ? Number(Number(result.new.input_text_doc_pay * 100).toFixed(0)) : null;
                                }
                                if (this.type === 1) {
                                    var mess = langView('vs_ccco_mess_run_update_tariff_contract', App.Langs).format(this.nomDoc, result.new.input_text_tariff_contract);
                                    pay = result.new.input_text_tariff_contract ? Number(Number(result.new.input_text_tariff_contract * 100).toFixed(0)) : null;
                                }
                                if (this.type === 2) {
                                    var mess = langView('vs_ccco_mess_run_clear_tariff_contract', App.Langs).format(this.nomDoc);
                                    pay = null;
                                }
                                this.mcf_lg.open(
                                    langView('vs_ccco_title_form_apply', App.Langs),
                                    mess,
                                    function () {
                                        // Принять
                                        var operation = {
                                            id_document: this.id,
                                            type: this.type,
                                            value: pay
                                        };
                                        this.apply_update(operation, function () {

                                        }.bind(this));
                                    }.bind(this),
                                    function () {
                                        if (this.type === 0) this.main_alert.out_warning_message(langView('vs_ccco_cancel_update_doc_pay', App.Langs));
                                        if (this.type === 1) this.main_alert.out_warning_message(langView('vs_ccco_cancel_update_tariff_contract', App.Langs));
                                        if (this.type === 2) this.main_alert.out_warning_message(langView('vs_ccco_cancel_clear_tariff_contract', App.Langs));
                                    }.bind(this)
                                );
                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        //this.register_sent_wagons_setup.$html.append(this.form_register_sent_wagons.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( this.tab_register_send_wagons)
                var row_register_send_wagons = new this.fe_ui.bs_row({ id: 'table-register-send-wagons', class: 'pt-2' });
                this.register_sent_wagons_table.$html.append(row_register_send_wagons.$html);

                this.tab_register_send_wagons = new TSRV('div#table-register-send-wagons');
                this.tab_register_send_wagons.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: true,
                    type_report: 'register_send_wagons',
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
                        this.main_alert.clear_message();
                        if (rowData && rowData.length > 0) {
                            if (rowData[0].dateList !== null) {
                                e.preventDefault();
                                //this.id = null;
                                //this.type = null;
                                //this.current_doc_pay = null;
                                //this.current_tariff_contract = null;
                                this.main_alert.out_warning_message(langView('vs_ccco_mess_error_select', App.Langs).format(rowData[0].nomDoc, rowData[0].numList, moment(rowData[0].dateList).format(format_datetime_ru)));
                                //this.form_register_sent_wagons.el.input_text_doc_pay.val(null);
                                //this.form_register_sent_wagons.el.input_text_tariff_contract.val(null);
                            }
                        }
                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        this.form_register_sent_wagons.clear_all();
                        this.id = null;
                        this.type = null;
                        this.current_doc_pay = null;
                        this.current_tariff_contract = null;
                        this.nomDoc = null;
                        if (type === "select") {
                            this.id = rows[0].id;
                            this.current_doc_pay = rows[0].outgoingUZDocumentPay !== null ? Number(rows[0].outgoingUZDocumentPay / 100).toFixed(2) : null;
                            this.current_tariff_contract = rows[0].tariffContract !== null ? Number(rows[0].tariffContract / 100).toFixed(2) : null;
                            this.nomDoc = rows[0].nomDoc;
                        }
                        this.form_register_sent_wagons.el.input_text_doc_pay.val(this.current_doc_pay);
                        this.form_register_sent_wagons.el.input_text_tariff_contract.val(this.current_tariff_contract);
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
                            type_report: 'register_send_detali_wagons',
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
            //console.log('[view_calc_cost_cargo_outgoing] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // скрыть элементы выбора
    view_calc_cost_cargo_outgoing.prototype.disable_form_searsh_doc_setup = function () {
        this.form_searsh_doc_setup.el.select_code_payer.disable();
        this.form_searsh_doc_setup.el.select_id_cargo.disable();
        this.form_searsh_doc_setup.el.select_code_stn_from.disable();
    };
    // активировать элементы выбора
    view_calc_cost_cargo_outgoing.prototype.enable_form_searsh_doc_setup = function () {
        this.form_searsh_doc_setup.el.select_code_payer.enable();
        this.form_searsh_doc_setup.el.select_id_cargo.enable();
        this.form_searsh_doc_setup.el.select_code_stn_from.enable();
    };
    // получить документ
    view_calc_cost_cargo_outgoing.prototype.get_document = function (document) {
        // Пройдемся по вагонам
        var vagons = [];
        var list_vagons = document.outgoingUzVagons;
        $.each(list_vagons, function (i, el_vag) {
            vagons.push({
                id: el_vag.id,
                nomDoc: document.nomDoc,
                num: el_vag.num,
                outgoingIdCargo: el_vag.outgoingIdCargo,
                outgoingCargoName: el_vag['outgoingCargoName' + ucFirst(App.Lang)],
                vesg: el_vag.vesg,
                arrivalIdOperator: el_vag.arrivalIdOperator,
                arrivalOperatorAbbr: el_vag['arrivalOperatorAbbr' + ucFirst(App.Lang)],
                outgoingIdOperator: el_vag.outgoingIdOperator,
                outgoingOperatorAbbr: el_vag['outgoingOperatorAbbr' + ucFirst(App.Lang)],
                rodUz: el_vag.rodUz,
                rodAbbr: el_vag['rodAbbr' + ucFirst(App.Lang)],
                outgoingUzVagonPays: el_vag.outgoingUzVagonPays,
                outgoingUzVagonPaysAdd: el_vag.outgoingUzVagonPaysAdd,
                dateReadinessUz: el_vag.dateReadinessUz,
                dateReadinessAmkr: el_vag.dateReadinessAmkr,
                dateOutgoing: el_vag.dateOutgoing,
                dateOutgoingAct: el_vag.dateOutgoingAct,
                dateDepartureAmkr: el_vag.dateDepartureAmkr,
                kolConductor: el_vag.kolConductor,
            });
        }.bind(this));
        // документ
        return {
            id: document.id,
            nomDoc: document.nomDoc,
            countVagon: vagons.length,
            vagons: vagons,
            payerSenderCode: document.payerSenderCode,
            payerSenderName: document['payerSenderName' + ucFirst(App.Lang)],
            outgoingUZDocumentPay: document.outgoingUZDocumentPay,
            outgoingUZDocumentPayAdd: document.outgoingUZDocumentPayAdd,
            outgoingUZDocumentPayAll: document.outgoingUZDocumentPay + document.outgoingUZDocumentPayAdd,
            kolConductor: vagons[0].kolConductor,
            outgoingCodeStnFrom: document.outgoingCodeStnFrom,
            outgoingNameStnFrom: document['outgoingNameStnFrom' + ucFirst(App.Lang)],
            outgoingCodeStnTo: document.outgoingCodeStnTo,
            outgoingNameStnTo: document['outgoingNameStnTo' + ucFirst(App.Lang)],
            inlandrailwayCode: document.inlandrailwayCode,
            inlandrailwayAbbr: document['inlandrailwayAbbr' + ucFirst(App.Lang)],
            distanceWay: document.distanceWay,
            outgoingIdCargo: vagons[0].outgoingIdCargo,
            outgoingCargoName: vagons[0].outgoingCargoName,
            vesg: document.vesg,
            tariffContract: document.tariffContract,
            arrivalOperatorAbbr: vagons[0].arrivalOperatorAbbr,
            outgoingOperatorAbbr: vagons[0].outgoingOperatorAbbr,
            outgoingOperatorAbbr: vagons[0].rodAbbr,
            dateReadinessUz: vagons[0].dateReadinessUz,
            //outgoingUzVagonPays: vagons.where(v => v.outgoingUzVagonPays != null).Sum(p => p.outgoingUzVagonPays),
            //outgoingUzVagonPaysAdd: vagons.where(v => v.outgoingUzVagonPaysAdd != null).Sum(p => p.outgoingUzVagonPaysAdd),
            //outgoingUzVagonPaysAll: vagons.where(v => v.outgoingUzVagonPays != null).Sum(p => p.outgoingUzVagonPays) + vagons.where(v => v.outgoingUzVagonPaysAdd != null).Sum(p => p.outgoingUzVagonPaysAdd),
            outgoingUZDocumentPay: document.outgoingUZDocumentPay,
            //deffTariff: document.tariffContract !== null && document.outgoingUZDocumentPay !== null ? Number((document.tariffContract - document.outgoingUZDocumentPay) / 100).toFixed(2) : 0,
            calcPayer: document.calcPayer,
            calcPayerUser: document.calcPayerUser,
            numList: document.numList,
            dateList: document.dateList,
            verification: document.verification,
            verificationUser: document.verificationUser,
        };
    };
    // обновить документы за период
    view_calc_cost_cargo_outgoing.prototype.update = function (start, stop, callback) {
        // Обновим
        this.clear_all();
        //this.code_payer = -1;
        //this.id_cargo = [];
        //this.code_stn_from = -1;
        var sel_start = moment(start).format("YYYY-MM-DDTHH:mm");
        var sel_stop = moment(stop).format("YYYY-MM-DDTHH:mm");
        LockScreen(langView('vs_ccco_update_main_docs', App.Langs));
        this.ids_arrival.getRegisterOutgoingUzDocument(sel_start, sel_stop, function (document) {
            this.list_document = [];
            this.select_document = [];
            this.select_document_detali = [];
            this.documents = [];
            if (document !== null && document.length > 0) {
                this.enable_form_searsh_doc_setup();
                // Пройдемся по документам
                $.each(document, function (i, el_doc) {
                    this.documents.push(this.get_document(el_doc));
                }.bind(this));
                this.list_document = this.documents;
                this.select_document = this.list_document;
                if (this.list_document !== null && this.list_document.length > 0) {
                    this.update_select_list(this.select_document);
                }
                this.select_apply(function (select) {
                    this.view_select(select);
                }.bind(this));
            } else {
                this.tab_register_send_wagons.view([]);
                this.disable_form_searsh_doc_setup();
            }
            this.searsh_alert_info.clear_message();
            this.searsh_alert_info.out_info_message(langView('vs_ccco_mess_info_add_main_docs', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.documents.length));
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновить списки
    view_calc_cost_cargo_outgoing.prototype.update_select_list = function (data) {
        if (data && data.length > 0) {
            // Обновим выпадающие списки
            var list_payer_local = [];
            var list_cargo = [];       // грузы по прибытию
            var list_stn_from = [];    // станции по отправлению
            // получим выбранные значения
            var code_payer = this.form_searsh_doc_setup.el.select_code_payer.val();
            var id_cargo = this.form_searsh_doc_setup.el.select_id_cargo.val();
            var code_stn_from = this.form_searsh_doc_setup.el.select_code_stn_from.val();

            $.each(data, function (i, el) {
                // Платильщик
                var lpl = list_payer_local.find(function (o) {
                    return o.value === el.payerSenderCode;
                }.bind(this));
                if (!lpl) {
                    list_payer_local.push({ value: el.payerSenderCode, text: el.payerSenderName, disabled: false });
                }
                // Грузы по прибытию
                $.each(el.vagons, function (i, el_wag) {
                    var lcrg = list_cargo.find(function (o) {
                        return o.value === el_wag.outgoingIdCargo;
                    }.bind(this));
                    if (!lcrg) {
                        list_cargo.push({ value: el_wag.outgoingIdCargo, text: el_wag.outgoingCargoName, disabled: false });
                    }
                }.bind(this));
                // Станция отправления
                var lstf = list_stn_from.find(function (o) {
                    return o.value === el.outgoingCodeStnFrom;
                }.bind(this));
                if (!lstf) {
                    list_stn_from.push({ value: el.outgoingCodeStnFrom, text: el.outgoingNameStnFrom, disabled: false });
                }
            }.bind(this));
            // проверим наличие выбранных полей
            var pc = list_payer_local.find(function (o) {
                return o.value == code_payer;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_code_payer.update(list_payer_local, (pc ? pc.value : -1));

            var cargos = [];
            $.each(id_cargo, function (i, el) {
                var crg = list_cargo.find(function (o) {
                    return o.value == el;
                }.bind(this));
                if (crg) {
                    cargos.push(String(crg.value));
                    //cargos.push(crg.value);
                }
            }.bind(this))
            //this.form_searsh_doc_setup.el.select_id_cargo.update(list_cargo, cargos);
            this.form_searsh_doc_setup.el.select_id_cargo.update(list_cargo, id_cargo);

            var sf = list_stn_from.find(function (o) {
                return o.value == code_stn_from;
            }.bind(this));
            this.form_searsh_doc_setup.el.select_code_stn_from.update(list_stn_from, (sf ? sf.value : -1));
        }
    }
    // Применить выбор
    view_calc_cost_cargo_outgoing.prototype.select_apply = function (callback) {
        // Обнулим списки
        LockScreen(langView('vs_ccco_select_main_docs', App.Langs));
        //this.clear_all();
        this.searsh_alert_info.clear_message();
        this.select_document_detali = [];
        if (this.select_document && this.select_document.length > 0) {
            this.select_document_detali = this.select_document;
            if (this.code_payer != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.payerSenderCode === this.code_payer;
                }.bind(this));
            }
            if (this.id_cargo !== null && this.id_cargo.length > 0) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    var gr = i.vagons.find(function (o) {
                        return this.id_cargo.indexOf(String(o.outgoingIdCargo)) >= 0
                    }.bind(this));
                    return gr !== undefined;
                }.bind(this));
            }
            if (this.code_stn_from != -1) {
                this.select_document_detali = this.select_document_detali.filter(function (i) {
                    return i.outgoingCodeStnFrom === this.code_stn_from;
                }.bind(this));
            }
            //this.update_select_list(this.select_document_detali);
            this.searsh_alert_info.out_info_message(langView('vs_ccco_mess_info_select_main_docs', App.Langs).format(moment(this.start).format("YYYY-MM-DD HH:mm"), moment(this.stop).format("YYYY-MM-DD HH:mm"), this.list_document.length, this.select_document_detali.length));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document_detali);
            }
        } else {
            this.select_document = [];
            this.searsh_alert_info.out_info_message(langView('vs_ccco_mess_info_init', App.Langs));
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.select_document_detali);
            }
        }
    };
    // Применить выбор
    view_calc_cost_cargo_outgoing.prototype.view_select = function (select, id) {

        this.tab_register_send_wagons.view(select, id);
        this.form_register_sent_wagons.el.input_text_doc_pay.val(this.current_doc_pay);
        this.form_register_sent_wagons.el.input_text_tariff_contract.val(this.current_tariff_contract);
        if (select && select.length > 0) {

        }
    };
    //--------------------------------------------------------------------------------
    // Дополнительная валидация
    view_calc_cost_cargo_outgoing.prototype.validation_register_sent_wagons = function (result) {
        var valid = true;
        //if (this.select_document_detali === null || this.select_document_detali.length === 0) {
        if (this.id === null) {
            this.main_alert.out_error_message(langView('vs_ccco_mess_war_not_select_docs', App.Langs));
            valid = false;
        } else {

            if (this.type === 0) {
                if (!result.new.input_text_doc_pay) {
                    this.form_register_sent_wagons.set_element_validation_error('doc_pay', langView('vs_ccco_mess_error_not_doc_pay', App.Langs), false);
                    valid = false;
                } else {
                    if (Number(result.new.input_text_doc_pay).toFixed(2) === this.current_doc_pay) {
                        this.form_register_sent_wagons.set_element_validation_error('doc_pay', langView('vs_ccco_mess_error_exist_doc_pay', App.Langs), false);
                        valid = false;
                    }
                }
            }
            if (this.type === 1) {
                if (!result.new.input_text_tariff_contract) {
                    this.form_register_sent_wagons.set_element_validation_error('tariff_contract', langView('vs_ccco_mess_error_not_tariff_contract', App.Langs), false);
                    valid = false;
                } else {
                    if (result.new.input_text_tariff_contract === this.current_tariff_contract) {
                        this.form_register_sent_wagons.set_element_validation_error('tariff_contract', langView('vs_ccco_mess_error_exist_tariff_contract', App.Langs), false);
                        valid = false;
                    }
                }
            }
            //if (this.type === 2) {
            //    if (!result.new.input_text_tariff_contract) {
            //        this.form_register_sent_wagons.set_element_validation_error('tariff_contract', langView('vs_ccco_mess_error_not_tariff_contract', App.Langs), false);
            //        valid = false;
            //    } else {
            //        if (result.new.input_text_tariff_contract === this.current_tariff_contract) {
            //            this.form_register_sent_wagons.set_element_validation_error('tariff_contract', langView('vs_ccco_mess_error_exist_tariff_contract', App.Langs), false);
            //            valid = false;
            //        }
            //    }
            //}
        }
        return valid;
    }
    // Обновить 
    view_calc_cost_cargo_outgoing.prototype.apply_update = function (data, callback) {
        //var result = 1;
        this.ids_arrival.postUpdatePayOutgoingUzDocument(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            this.clear_all();
            if (result >= 0) {
                // Ок
                if (data.type === 0) {
                    mess_ok = langView('vs_ccco_mess_ok_update_doc_pay', App.Langs).format(this.nomDoc);
                }
                if (data.type === 1) {
                    mess_ok = langView('vs_ccco_mess_ok_update_tariff_contract', App.Langs).format(this.nomDoc);
                }
                if (data.type === 2) {
                    mess_ok = langView('vs_ccco_mess_ok_clear_tariff_contract', App.Langs).format(this.nomDoc);
                }
                LockScreen(langView('vs_ccco_update_main_docs', App.Langs));
                this.ids_arrival.getRegisterOutgoingUzDocumentOfId(data.id_document, function (document) {
                    var doc = this.get_document(document);
                    var exist_doc = this.list_document.find(function (o) {
                        return o.id === doc.id;
                    }.bind(this));
                    if (exist_doc && doc) {
                        var res = this.list_document.indexOf(exist_doc);
                        this.list_document[res] = doc;
                        this.select_apply(function (select) {
                            this.view_select(select, doc.id);
                            this.main_alert.out_info_message(mess_ok);
                            LockScreenOff();
                            if (typeof callback === 'function') {
                                callback(result);
                            }
                        }.bind(this));
                    }
                }.bind(this));
            } else {

                if (data.type === 0) {
                    mess_error = langView('vs_ccco_mess_error_update_doc_pay', App.Langs).format(this.nomDoc, result);
                }
                if (data.type === 1) {
                    mess_error = langView('vs_ccco_mess_error_update_tariff_contract', App.Langs).format(this.nomDoc, result);
                }
                if (data.type === 1) {
                    mess_error = langView('vs_ccco_mess_error_clear_tariff_contract', App.Langs).format(this.nomDoc, result);
                }
                this.main_alert.out_error_message(mess_error);
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(result);
                }
            }
        }.bind(this));
    }
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_calc_cost_cargo_outgoing.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_calc_cost_cargo_outgoing.prototype.clear_all = function () {
        this.searsh_alert_info.clear_message();
        this.form_searsh_doc_setup.clear_all();
        this.form_register_sent_wagons.clear_all();
        this.type = null;
        this.form_register_sent_wagons.el.input_text_doc_pay.val('');
        this.form_register_sent_wagons.el.input_text_tariff_contract.val('');
        this.form_register_sent_wagons.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        this.form_register_sent_wagons.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_calc_cost_cargo_outgoing.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_calc_cost_cargo_outgoing = view_calc_cost_cargo_outgoing;

    window.App = App;
})(window);