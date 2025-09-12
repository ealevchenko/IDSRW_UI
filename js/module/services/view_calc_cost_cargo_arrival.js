/* ===============================================
-= Модуль сервис расчет стоимости перевозки по прибытию =-
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
            'vs_cccsa_card_header_group_wagons': 'РЕЕСТР ПРИНЯТЫХ ВАГОНОВ',
            'vs_cccsa_card_header_cost_calculation': 'РАСЧЕТ СТОИМОСТИ',
            'vs_cccsa_card_header_register_accepted_wagons': 'РАСЧЕТ ПРИНЯТЫХ ВАГОНОВ',
            'vs_cccsa_mess_init_module': 'Инициализация модуля view_calc_cost_cargo_arrival',
            'vs_cccsa_mess_load_operation': 'Загружаю форму операции',

            'vs_cccsa_title_form_button_apply': 'Править документ',
            'vs_cccsa_title_form_apply_button_title': 'Править документ ...',

            'vs_cccsa_title_label_num_epd': 'Найти накладную:',
            'vs_cccsa_title_placeholder_num_epd': 'Найти накладную',
            'vs_cccsa_text_label_num_epd': 'Введите номер накладной ...',

            'vs_cccsa_title_label_doc_pay': 'Тариф ПРИБ:',
            'vs_cccsa_title_placeholder_doc_pay': 'Тариф ПРИБ',
            'vs_cccsa_text_label_doc_pay': 'Скорректируйте тариф ПРИБЫТИЯ ...',

            'vs_cccsa_title_label_payer': 'Плательщик:',
            'vs_cccsa_title_placeholder_payer': 'Плательщик',
            'vs_cccsa_text_label_payer': 'Выберите плательщика ...',

            'vs_cccsa_title_label_tariff_contract': 'Ж.д. тариф по договору, грн:',
            'vs_cccsa_title_placeholder_tariff_contract': 'Ж.д. тариф по договору',
            'vs_cccsa_text_label_tariff_contract': 'Введите Ж.д. тариф по договору(грн)...',

            'vs_cccsa_title_button_num_epd': 'Найти накладную...',
            'vs_cccsa_title_button_doc_pay': 'Обновить тариф прибытия...',
            'vs_cccsa_title_button_payer': 'Обновить плательщика...',
            'vs_cccsa_title_button_tariff_contract': 'Обновить ж.д. тариф по договору...',

            'vs_cccsa_mess_valid_not_payer': 'Указанного плателщика нет в справочнике ИДС',
            'vs_cccsa_mess_valid_payer': 'Укажите плательщика',

            'vs_cccsa_title_button_Cancel': 'Отмена',
            'vs_cccsa_button_Ok': 'Применить',

            'vs_cccsa_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            'vs_cccsa_mess_run_update_document_pay': 'Выполнить обновление "Тарифа ПРИБЫТИЯ", заменить тариф [{0}] на новый тариф [{1}].',
            'vs_cccsa_mess_ok_update_document_pay': 'По документу №{0} обновлен "Тариф ПРИБЫТИЯ", новый тариф [{1}].',
            'vs_cccsa_mess_error_update_document_pay': 'При обновлении "Тарифа ПРИБЫТИЯ" [{0}], документа № {1} - произошла ошибка. Код ошибки {2}',
            'vs_cccsa_cancel_update_document_pay': 'Отмена обновления "Тарифа ПРИБЫТИЯ"',

            'vs_cccsa_mess_run_update_cost_calculation': 'Выполнить обновление расчета по плательщику {0},с тарифом по договору [{1}].',
            'vs_cccsa_mess_ok_update_cost_calculation': 'По документу №{0} выполнен расчет, обновлен плательщик {1} и тариф {2}.',
            'vs_cccsa_mess_error_update_cost_calculation': 'При обновлении плательщика {0} и тарифа {1}, документа № {3} - произошла ошибка. Код ошибки {4}',
            'vs_cccsa_cancel_update_cost_calculation': 'Отмена обновления расчета по плательщику',

            'vs_cccsa_mess_error_not_document': 'Не выбран документ для правки!',
            'vs_cccsa_mess_error_document_pay_not_change': 'Тариф без изменений!',
            'vs_cccsa_mess_error_payer_not_change': 'Плательщик без изменений!',
            'vs_cccsa_mess_error_tariff_contract_not_change': 'Ж.д. тариф по договору без изменений!',

            'vs_cccsa_load_main_docs': 'Загружаю документы за период...',
            'vs_cccsa_load_docs': 'Загружаю информацию по накладной {0}...',

            'vs_cccsa_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            'vs_cccsa_mess_info_add_main_docs': 'За период c {0} по {1}, загружено {2} накладных',

            'vs_cccsa_mess_war_not_select_docs': 'Не выбран номер накладной для отображения информации!',
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
    function view_calc_cost_cargo_arrival(selector) {
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
    view_calc_cost_cargo_arrival.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_calc_cost_cargo_arrival');
        LockScreen(langView('vs_cccsa_mess_init_module', App.Langs));
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
            bt_close_text: langView('vs_cccsa_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_cccsa_button_Ok', App.Langs),
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
            header_text: langView('vs_cccsa_card_header_group_wagons', App.Langs),
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

        // Создать макет панели (Расчет стоимости)
        this.cost_calculation = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_cccsa_card_header_cost_calculation', App.Langs),
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
        this.cost_calculation_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.cost_calculation_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_cost_calculation = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.cost_calculation_table.$html.append(this.alert_cost_calculation.$html);
        this.cost_calculation_alert = new ALERT(this.alert_cost_calculation.$html);
        row.$html.append(this.cost_calculation_setup.$html).append(this.cost_calculation_table.$html);
        this.cost_calculation.body.$html.append(row.$html);

        //------------------------------------------------------
        // Создать макет панели (Реестр принятых вагонов)
        this.register_accepted_wagons = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_cccsa_card_header_register_accepted_wagons', App.Langs),
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
        this.register_accepted_wagons_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.register_accepted_wagons_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_register_accepted_wagons = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.register_accepted_wagons_table.$html.append(this.alert_register_accepted_wagons.$html);
        this.register_accepted_wagons_alert = new ALERT(this.alert_register_accepted_wagons.$html);
        row.$html.append(this.register_accepted_wagons_setup.$html).append(this.register_accepted_wagons_table.$html);
        this.register_accepted_wagons.body.$html.append(row.$html);
        //------------------------------------------------------

        this.$main.append(this.card_services.$html.append(this.cost_calculation.$html).append(this.register_accepted_wagons.$html));
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
                var process = 6;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        this.cost_calculation_setup.$html.append(this.form_cost_calculation_setup.$form);
                        this.cost_calculation_setup.$html.append(this.form_document_pay.$form);

                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_calc_cost_cargo_arrival');
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
                    fn_init: function (init) {
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),                                              // Окончание инициализации
                    apply_text: langView('vs_cccsa_load_main_docs', App.Langs), //
                    fn_apply_select: function (type, start, stop) {
                        if (type && start && stop) {
                            //
                            this.start = start;
                            this.stop = stop;
                            this.update(this.start, this.stop, this.id_doc, function () {

                            }.bind(this));
                        }

                    }.bind(this),                                      // Применить выборку
                })

                // Платильщики
                this.form_cost_calculation_setup = new FD();
                var objs_cc_setup = [];
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
                        id: 'filing_apply',
                        name: 'filing_apply',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: langView('vs_cccsa_title_form_button_apply', App.Langs),
                        title: langView('vs_cccsa_title_form_apply_button_title', App.Langs),
                        icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_cost_calculation_setup.$form.submit();
                        }.bind(this),
                    }
                };
                //var bt_apply_payer = {
                //    obj: 'bs_button',
                //    options: {
                //        id: null,
                //        name: null,
                //        class: null,
                //        fsize: 'sm',
                //        color: 'success',
                //        text: null,
                //        title: langView('vs_cccsa_title_button_payer', App.Langs),
                //        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                //        icon_fa_right: null,
                //        fn_click: null,
                //    }
                //};
                var form_input_datalist_payer = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'common_cc_setup',
                        id: 'payer',
                        name: 'payer',
                        label: langView('vs_cccsa_title_label_payer', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_cccsa_title_placeholder_payer', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_payer_arrival,
                            out_value: false,
                            out_group: false,
                            default: null,
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {
                                var valid = this.validation_payer(set.value, 'payer', false, true);
                                if (valid) {
                                    if (this.codePayerLocal !== set.value) {
                                        this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('is-valid').addClass('check-field');
                                    }
                                }
                            }.bind(this),
                            fn_select: function (event, set, options) {

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
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_payer],
                        form_text: langView('vs_cccsa_text_label_payer', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                //var bt_apply_tariff_contract = {
                //    obj: 'bs_button',
                //    options: {
                //        id: null,
                //        name: null,
                //        class: null,
                //        fsize: 'sm',
                //        color: 'success',
                //        text: null,
                //        title: langView('vs_cccsa_title_button_tariff_contract', App.Langs),
                //        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                //        icon_fa_right: null,
                //        fn_click: null,
                //    }
                //};
                var form_input_tariff_contract = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_cc_setup',
                        id: 'tariff_contract',
                        name: 'tariff_contract',
                        label: langView('vs_cccsa_title_label_tariff_contract', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_cccsa_title_placeholder_tariff_contract', App.Langs),
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
                                this.validation_tariff_contract(value, 'tariff_contract', false, true);
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
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_tariff_contract],
                        form_text: langView('vs_cccsa_text_label_tariff_contract', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                col_bt_apply.childs.push(bt_apply);
                objs_cc_setup.push(col_bt_apply);
                objs_cc_setup.push(form_input_datalist_payer);
                objs_cc_setup.push(form_input_tariff_contract);
                this.form_cost_calculation_setup.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_cc_setup,
                    id: null,
                    form_class: 'row g-3',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        //this.clear_all();
                        if (result && result.valid) {
                            var valid = this.validation_cost_calculation(result);
                            if (valid) {
                                this.mcf_lg.open(
                                    langView('vs_cccsa_title_form_apply', App.Langs),
                                    langView('vs_cccsa_mess_run_update_cost_calculation', App.Langs).format(this.form_cost_calculation_setup.el.datalist_payer.text(), result.new.input_text_tariff_contract),
                                    function () {
                                        // Принять
                                        var operation = {
                                            id_document: this.ArrivalUzDocument.id,
                                            code_payer_local: result.new.datalist_payer,
                                            tariff_contract: result.new.input_text_tariff_contract,
                                        };
                                        this.apply_update_payer_local(operation, function () {

                                        }.bind(this));

                                    }.bind(this),
                                    function () {
                                        this.main_alert.out_warning_message(langView('vs_cccsa_cancel_update_cost_calculation', App.Langs));
                                    }.bind(this));
                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        //this.cost_calculation_setup.$html.append(this.form_cost_calculation_setup.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                // Тариф по прибытию
                this.form_document_pay = new FD();
                var objs_dp_setup = [];
                var bt_apply_doc_pay = {
                    obj: 'bs_button',
                    options: {
                        id: 'apply_doc_pay',
                        name: 'apply_doc_pay',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_cccsa_title_button_doc_pay', App.Langs),
                        icon_fa_left: 'fa-solid fa-check',//<i class="fa-solid fa-check"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_document_pay.$form.submit();
                        }.bind(this),
                    }
                };
                var form_input_doc_pay = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'common_dp_setup',
                        id: 'doc_pay',
                        name: 'doc_pay',
                        label: langView('vs_cccsa_title_label_doc_pay', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_cccsa_title_placeholder_doc_pay', App.Langs),
                        element_required: true,
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
                                this.validation_doc_pay(value, 'doc_pay', false, true)
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
                        form_text: langView('vs_cccsa_text_label_doc_pay', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                objs_dp_setup.push(form_input_doc_pay);
                this.form_document_pay.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_dp_setup,
                    id: null,
                    form_class: 'row g-3 mt-2 border-top border-primary',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {
                            var valid = this.validation_document_pay(result);
                            if (valid) {
                                this.mcf_lg.open(
                                    langView('vs_cccsa_title_form_apply', App.Langs),
                                    langView('vs_cccsa_mess_run_update_document_pay', App.Langs).format(this.arrivalUZDocumentPay, result.new.input_text_doc_pay),
                                    function () {
                                        // Принять
                                        var operation = {
                                            id_document: this.ArrivalUzDocument.id,
                                            summa: Number(result.new.input_text_doc_pay * 100).toFixed(0),
                                            kod: "001",
                                        };
                                        this.apply_update_doc_pay(operation, function () {

                                        }.bind(this));
                                    }.bind(this),
                                    function () {
                                        this.main_alert.out_warning_message(langView('vs_cccsa_cancel_update_document_pay', App.Langs));
                                    }.bind(this));
                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        //this.cost_calculation_setup.$html.append(this.form_document_pay.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( this.tab_cost_calculation)
                var row_cost_calculation = new this.fe_ui.bs_row({ id: 'services-table-cost-calculation', class: 'pt-2' });
                this.cost_calculation_table.$html.append(row_cost_calculation.$html);

                this.tab_cost_calculation = new TSRV('div#services-table-cost-calculation');
                this.tab_cost_calculation.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'cost_calculation',
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
                });



                this.form_register_accepted_wagons_setup = new FD();
                // Создать макет панели
                var objs_raw_setup = [];

                var bt_searsh_epd = {
                    obj: 'bs_button',
                    options: {
                        id: null,
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_cccsa_title_button_num_epd', App.Langs),
                        icon_fa_left: 'fa-solid fa-magnifying-glass',//<i class="fa-solid fa-magnifying-glass"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.clear_all()
                            var id = this.form_register_accepted_wagons_setup.el.datalist_num_epd.val();
                            if (id) {
                                this.update_document(id, function (vagon) {
                                    LockScreenOff();
                                }.bind(this));
                            } else {
                                this.register_accepted_wagons_alert.out_warning_message(langView('vs_cccsa_mess_war_not_select_docs', App.Langs));
                                this.form_register_accepted_wagons_setup.set_element_validation_error('num_epd', langView('vs_cccsa_mess_error_not_document', App.Langs), true);
                                this.clear_data();
                                LockScreenOff();
                            }

                        }.bind(this),
                    }
                };
                var form_input_datalist_num_epd = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'common_raw_setup',
                        id: 'num_epd',
                        name: 'num_epd',
                        label: langView('vs_cccsa_title_label_num_epd', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_cccsa_title_placeholder_num_epd', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_epd,
                            out_value: false,
                            out_group: true,
                            default: null,
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {

                            }.bind(this),
                            fn_select: function (event, set, options) {

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
                        form_text: langView('vs_cccsa_text_label_num_epd', App.Langs),
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
                        id: 'alert-info',
                        class: null,
                        style: null,
                        color: 'primary',
                        bt_close: true,
                        fn_click_close: null,
                    },
                    childs: []
                };

                col_alert.childs.push(alert_info);
                objs_raw_setup.push(col_alert);
                objs_raw_setup.push(form_input_datalist_num_epd);

                this.form_register_accepted_wagons_setup.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_raw_setup,
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
                        this.register_accepted_wagons_setup.$html.append(this.form_register_accepted_wagons_setup.$form);
                        var alsert_info = $('div#alert-info');
                        this.register_accepted_wagons_alert_info = new ALERT(alsert_info);
                        this.register_accepted_wagons_alert_info.out_info_message(langView('vs_cccsa_mess_info_init', App.Langs));
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[view_op_common_filing] [form_filing_setup]process: ' + process);
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( this.tab_register_accepted_wagons)
                var row_register_accepted_wagons = new this.fe_ui.bs_row({ id: 'table-register-accepted-wagons', class: 'pt-2' });
                this.register_accepted_wagons_table.$html.append(row_register_accepted_wagons.$html);

                this.tab_register_accepted_wagons = new TSRV('div#table-register-accepted-wagons');
                this.tab_register_accepted_wagons.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'register_accepted_wagons',
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
                });

            }
        }.bind(this);
        // Библиотеки по умолчанию
        this.default_db_names = ['payer_arrival'];
        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_calc_cost_cargo_arrival] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    //
    //view_calc_cost_cargo_arrival.prototype.view = function (id_way) {
    //    // Если указана станция выполним коррекцию по станции
    //    /*        this.view_com.open();*/
    //    LockScreen(langView('vs_cccsa_mess_load_operation', App.Langs));
    //    // Очистить сообщения и форму
    //    this.from_way_alert.clear_message();
    //    this.group_wagons_alert.clear_message();
    //    this.form_group_wagons_setup.clear_all();
    //    this.form_from_setup.clear_all();
    //    this.form_searsh_wagon.el.textarea_vagon_searsh.val('');
    //    this.wagons = [];
    //    this.wagons_group = [];
    //    // Сбросим вагоны переноса
    //    this.id_station_from = -1;
    //    var id_station = -1;
    //    this.id_way_from = -1;

    //    //if (id_way > 0) {
    //    //    var way = this.view_com.api_dir.getWays_Of_Id(id_way);
    //    //    if (way) {
    //    //        id_station = way.idStation;
    //    //        // Отобразим выбор на панеле
    //    //        this.form_from_setup.el.select_id_station_from.val(id_station);
    //    //    }
    //    //};
    //    // Дополнительная обработка в панели выбранной операции
    //    if (typeof this.settings.fn_view_open === 'function') {
    //        this.settings.fn_view_open.call(this, function () {
    //        }.bind(this));
    //    };
    //    this.update(id_station, id_way, function (wagons) {
    //        LockScreenOff();
    //    }.bind(this));
    //}
    // Обновить все
    view_calc_cost_cargo_arrival.prototype.update = function (start, stop, id_doc, callback) {
        // Обновим
        this.clear_all();
        var sel_start = moment(start).format("YYYY-MM-DDTHH:mm");
        var sel_stop = moment(stop).format("YYYY-MM-DDTHH:mm");
        this.ids_arrival.getListMainDocArrivalUzDocument(sel_start, sel_stop, function (list) {
            this.list_epd = [];
            if (list !== null && list.length > 0) {

                $.each(list, function (i, el) {
                    if (el.nomMainDoc > 0 && !el.nomDoc) {
                        this.list_epd.push({ value: el.id, text: el.nomMainDoc, group: (el.calcPayer !== null ? "расчет :" + moment(el.calcPayer).format("YYYY-MM-DDTHH:mm") : "без расчета") });
                    }
                }.bind(this));
                var exist_id = this.list_epd.find(function (o) {
                    return o.value === id_doc;
                }.bind(this));
                if (!exist_id) {
                    this.id_doc = null;
                } else {
                    this.id_doc = id_doc;
                }
                this.form_register_accepted_wagons_setup.el.datalist_num_epd.update(this.list_epd, this.id_doc);
                if (this.id_doc) {
                    this.update_document(this.id_doc, function (document) {
                        LockScreenOff();
                    }.bind(this));
                } else {
                    this.clear_data();
                }
            }
            this.register_accepted_wagons_alert_info.clear_message();
            this.register_accepted_wagons_alert_info.out_info_message(langView('vs_cccsa_mess_info_add_main_docs', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.list_epd.length));
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Загрузить вагоны на выбраном пути прибытия в масив this.wagons (подготовить поля для вагонов приема)
    view_calc_cost_cargo_arrival.prototype.load_of_id_doc = function (id_doc, callback) {
        if (id_doc !== null && id_doc >= 0) {
            this.id_doc = id_doc;
            LockScreen(langView('vs_cccsa_load_docs', App.Langs).format(this.form_register_accepted_wagons_setup.el.datalist_num_epd.text()));

            this.ids_arrival.getArrivalUzDocument(id_doc, function (ArrivalUzDocument) {
                this.ArrivalUzDocument = ArrivalUzDocument;
                // Событие обновили данные
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.ArrivalUzDocument);
                }
            }.bind(this));
        } else {
            this.id_doc = null;
            this.ArrivalUzDocument = null;
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.ArrivalUzDocument);
            }
        }
    };

    view_calc_cost_cargo_arrival.prototype.update_document = function (id_doc, callback) {
        if (id_doc) {
            this.load_of_id_doc(id_doc, function (document, vagons) {
                if (document !== null && document) {
                    var vagons = document.arrivalUzVagons;
                    var vagons_data = [];
                    var document_data = [];
                    var summ_vesg = 0;
                    var summ_arrivalUzVagonPays = 0;
                    $.each(vagons, function (i, el) {
                        // Тариф ПРИБ (Вагоны)
                        var arrivalUzVagonPays = 0;
                        if (el.arrivalUzVagonPays && el.arrivalUzVagonPays.length > 0) {
                            $.each(el.arrivalUzVagonPays, function (i, el) {
                                arrivalUzVagonPays += (el.summa && el.kod === '001' ? Number(el.summa) : 0);
                            }.bind(this));
                        }
                        summ_arrivalUzVagonPays += arrivalUzVagonPays;
                        summ_vesg += el.vesg ? Number(el.vesg) : 0;
                        //
                        vagons_data.push({
                            id: el.id,
                            nomMainDoc: document.nomMainDoc,
                            num: el.num,
                            dateOtpr: document.dateOtpr,
                            dateAdoption: el.idArrivalNavigation.dateAdoption,
                            nameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                            nameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
                            arrivalCargoName: el.idCargoNavigation['cargoName' + ucFirst(App.Lang)],
                            arrivalOperatorAbbr: el.idWagonsRentArrivalNavigation.idOperatorNavigation['abbr' + ucFirst(App.Lang)],
                            toDivisionAbbr: el.idDivisionOnAmkrNavigation['divisionAbbr' + ucFirst(App.Lang)],
                            payerSenderCode: document.codePayerSenderNavigation ? document.codePayerSenderNavigation.code : null,
                            payerSenderName: document.codePayerSenderNavigation ? document.codePayerSenderNavigation['payerName' + ucFirst(App.Lang)] : null,
                            payerArrivalCode: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation.code : null,
                            payerArrivalName: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation['payerName' + ucFirst(App.Lang)] : null,
                            payerLocalCode: document.codePayerLocalNavigation ? document.codePayerLocalNavigation.code : null,
                            payerLocalName: document.codePayerLocalNavigation ? document.codePayerLocalNavigation['payerName' + ucFirst(App.Lang)] : null,
                            vesg: el.vesg,
                            arrivalUzVagonPays: arrivalUzVagonPays,
                        });
                    }.bind(this));
                    //
                    // Тариф ПРИБ (Документ)
                    //arrivalUZDocumentPay
                    var arrivalUZDocumentPay = 0;
                    if (document.arrivalUzDocumentPays && document.arrivalUzDocumentPays.length > 0) {
                        $.each(document.arrivalUzDocumentPays, function (i, el) {
                            arrivalUZDocumentPay += (el.summa && el.kod === '001' ? Number(el.summa) : 0);
                        }.bind(this));
                    }
                    //
                    document_data.push({
                        id: document.id,
                        nomMainDoc: document.nomMainDoc,
                        countVagon: vagons.length,
                        nameStnFrom: document.codeStnFromNavigation ? document.codeStnFromNavigation['stationName' + ucFirst(App.Lang)] : null,
                        nameStnTo: document.codeStnToNavigation ? document.codeStnToNavigation['stationName' + ucFirst(App.Lang)] : null,
                        arrivalCargoName: vagons_data[0].arrivalCargoName,
                        vesg: summ_vesg,
                        tariffContract: document.tariffContract,
                        payerLocalCode: document.codePayerLocalNavigation ? document.codePayerLocalNavigation.code : null,
                        payerLocalName: document.codePayerLocalNavigation ? document.codePayerLocalNavigation['payerName' + ucFirst(App.Lang)] : null,
                        arrivalOperatorAbbr: vagons_data[0].arrivalOperatorAbbr,
                        toDivisionAbbr: vagons_data[0].toDivisionAbbr,
                        payerSenderCode: document.codePayerSenderNavigation ? document.codePayerSenderNavigation.code : null,
                        payerSenderName: document.codePayerSenderNavigation ? document.codePayerSenderNavigation['payerName' + ucFirst(App.Lang)] : null,
                        payerArrivalCode: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation.code : null,
                        payerArrivalName: document.codePayerArrivalNavigation ? document.codePayerArrivalNavigation['payerName' + ucFirst(App.Lang)] : null,
                        dateOtpr: document.dateOtpr,
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
                    });
                    this.tab_cost_calculation.view(document_data);
                    this.tab_register_accepted_wagons.view(vagons_data);
                    //
                    this.arrivalUZDocumentPay = arrivalUZDocumentPay !== null ? Number(arrivalUZDocumentPay / 100) : null;
                    this.codePayerLocal = (document.codePayerLocalNavigation && this.codePayerLocal == null) ? document.codePayerLocalNavigation.code : this.codePayerLocal;
                    this.tariffContract = document.tariffContract;
                    this.verification = document.numActServices1 !== null || document.numActServices2 !== null || document.numActServices3 !== null;


                    this.form_document_pay.el.input_text_doc_pay.val(this.arrivalUZDocumentPay);
                    this.form_cost_calculation_setup.el.datalist_payer.val(this.codePayerLocal);
                    this.form_cost_calculation_setup.el.input_text_tariff_contract.val(this.tariffContract);
                    this.view_edit(this.verification);
                } else {
                    this.clear_data();
                }
                LockScreenOff();
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(document);
                }
            }.bind(this));
        } else {
            this.clear_data();
        }
    };
    view_calc_cost_cargo_arrival.prototype.view_edit = function (disable) {
        if (disable) {
            this.form_document_pay.el.button_apply_doc_pay.prop("disabled", true);
            this.form_document_pay.el.input_text_doc_pay.disable();
            this.form_cost_calculation_setup.el.button_filing_apply.prop("disabled", true);
            this.form_cost_calculation_setup.el.datalist_payer.disable();
            this.form_cost_calculation_setup.el.input_text_tariff_contract.disable();
        } else {
            this.form_document_pay.el.button_apply_doc_pay.prop("disabled", false);
            this.form_document_pay.el.input_text_doc_pay.enable();
            this.form_cost_calculation_setup.el.button_filing_apply.prop("disabled", false);
            this.form_cost_calculation_setup.el.datalist_payer.enable();
            this.form_cost_calculation_setup.el.input_text_tariff_contract.enable();
        }
    };
    // Очистить данные
    view_calc_cost_cargo_arrival.prototype.clear_data = function () {
        this.tab_cost_calculation.view([]);
        this.tab_register_accepted_wagons.view([]);
        this.id_doc = null;
        this.ArrivalUzDocument = null;
        this.arrivalUZDocumentPay = null;
        this.codePayerLocal = this.codePayerLocal ? this.codePayerLocal : null;
        this.tariffContract = null;
        this.verification = false;

        this.form_document_pay.el.input_text_doc_pay.val(this.arrivalUZDocumentPay);
        this.form_cost_calculation_setup.el.datalist_payer.val(this.codePayerLocal);
        this.form_cost_calculation_setup.el.input_text_tariff_contract.val(this.tariffContract);
        this.view_edit(this.verification);
    }

    // Дополнительная валидация doc_pay
    view_calc_cost_cargo_arrival.prototype.validation_doc_pay = function (value, id, not_null, not_alert) {
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
    view_calc_cost_cargo_arrival.prototype.validation_payer = function (code, id, not_null, not_alert) {
        // Нет данных
        var fn_out_null = function (not_null) {
            // нет входных данных данных
            if (not_null) {
                this.form_cost_calculation_setup.set_element_validation_error(id, langView('vs_cccsa_mess_valid_not_payer', App.Langs), not_alert);
                return false;
            } else {
                this.form_cost_calculation_setup.set_element_validation_ok(id, "", not_alert);
                return true;
            }
        }
        // Нет данных в базе данных
        var fn_out_undefined = function () {
            this.form_cost_calculation_setup.set_element_validation_error(id, langView('vs_cccsa_mess_valid_payer', App.Langs), not_alert);
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
    view_calc_cost_cargo_arrival.prototype.validation_tariff_contract = function (value, id, not_null, not_alert) {
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
    view_calc_cost_cargo_arrival.prototype.validation_document_pay = function (result) {
        var valid = true;
        valid = valid & this.validation_doc_pay(result.new.input_text_doc_pay, 'doc_pay', false, false);
        if (this.ArrivalUzDocument == null) {
            this.form_document_pay.validation_common_dp_setup.out_error_message(langView('vs_cccsa_mess_error_not_document', App.Langs));
            valid = false;
        }
        if (result.new && result.new.input_text_doc_pay >= 0) {
            if (Number(result.new.input_text_doc_pay) === this.arrivalUZDocumentPay) {
                this.form_document_pay.set_element_validation_error('doc_pay', langView('vs_cccsa_mess_error_document_pay_not_change', App.Langs), false);
                valid = false;
            }
        }
        return valid;
    }
    // Уточняющая валидация данных
    view_calc_cost_cargo_arrival.prototype.validation_cost_calculation = function (result) {
        var valid = true;
        valid = valid & this.validation_payer(result.new.datalist_payer, 'payer', false, false);
        valid = valid & this.validation_tariff_contract(result.new.input_text_tariff_contract, 'tariff_contract', false, false);
        if (this.ArrivalUzDocument == null) {
            //this.form_cost_calculation_setup.validation_common_cc_setup.out_error_message(langView('vs_cccsa_mess_error_not_document', App.Langs));
            this.form_register_accepted_wagons_setup.set_element_validation_error('num_epd', langView('vs_cccsa_mess_error_not_document', App.Langs), false);
            valid = false;
        }
        if (result.new && result.new.input_text_tariff_contract >= 0 && result.new.datalist_payer !== null) {
            if (Number(result.new.input_text_tariff_contract) === this.tariffContract && result.new.datalist_payer === this.codePayerLocal) {
                this.form_cost_calculation_setup.set_element_validation_error('tariff_contract', langView('vs_cccsa_mess_error_tariff_contract_not_change', App.Langs), false);
                this.form_cost_calculation_setup.set_element_validation_error('payer', langView('vs_cccsa_mess_error_payer_not_change', App.Langs), false);
                valid = false;
            }
        }
        return valid;
    }
    // Обновить тариф прибытия
    view_calc_cost_cargo_arrival.prototype.apply_update_doc_pay = function (data, callback) {
        this.ids_arrival.postUpdateArrivalUzDocumentPay(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            var num_doc = this.ArrivalUzDocument.nomMainDoc;
            var doc_pay = this.form_document_pay.el.input_text_doc_pay.val();
            if (result >= 0) {
                // Ок
                mess_ok = langView('vs_cccsa_mess_ok_update_document_pay', App.Langs).format(num_doc, doc_pay);
            } else {
                mess_error = langView('vs_cccsa_mess_error_update_document_pay', App.Langs).format(doc_pay, num_doc, result);

            }
            this.apply_update(mess_ok, mess_error, function () {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this))
        }.bind(this));
    }
    // Обновить плательщика
    view_calc_cost_cargo_arrival.prototype.apply_update_payer_local = function (data, callback) {
        this.ids_arrival.postArrivalUzDocumentPayerLocal(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            var num_doc = this.ArrivalUzDocument.nomMainDoc;
            var payer_local = this.form_cost_calculation_setup.el.datalist_payer.text();
            var tariff_contract = this.form_cost_calculation_setup.el.input_text_tariff_contract.val();
            if (result >= 0) {
                // Ок
                /*this.id_doc = null;*/
                mess_ok = langView('vs_cccsa_mess_ok_update_cost_calculation', App.Langs).format(num_doc, payer_local, tariff_contract);
            } else {
                mess_error = langView('vs_cccsa_mess_error_update_cost_calculation', App.Langs).format(payer_local, tariff_contract, num_doc, result);
            }
            this.apply_update(mess_ok, mess_error, function () {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this))
        }.bind(this));
    }

    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    view_calc_cost_cargo_arrival.prototype.apply_update = function (mess_ok, mess_err, callback) {
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
    view_calc_cost_cargo_arrival.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_calc_cost_cargo_arrival.prototype.clear_all = function () {
        this.register_accepted_wagons_alert.clear_message();
        this.form_register_accepted_wagons_setup.clear_all();
        this.form_document_pay.clear_all();
        this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        this.form_cost_calculation_setup.clear_all();
        this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('check-field is-valid is-invalid');
        this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_calc_cost_cargo_arrival.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_calc_cost_cargo_arrival = view_calc_cost_cargo_arrival;

    window.App = App;
})(window);