/* ===============================================
-= Модуль сервис РАСЧЕТ ПЛАТЫ ЗА ПОЛЬЗОВАНИЕ (КОРРЕКЦИЯ) =-
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
            'vs_ufeem_card_header_card_services': 'КОРРЕКТИРОВКА ИТОГОВОЙ СУММЫ ПЛАТЫ В РУЧНОМ РЕЖИМЕ',
            'vs_ufeem_card_header_usage_fee_wagons': 'ПЕРЕЧЕНЬ ВАГОНОВ ДЛЯ КОРРЕКЦИИ',

            'vs_ufeem_mess_init_module': 'Инициализация модуля view_usage_fee_manual',
            'vs_ufeem_mess_search_wagons': 'Загружаю информацию по вагону...',
            //'vs_ufeem_mess_load_operation': 'Загружаю форму операции',

            //'vs_ufeem_mess_war_not_select_docs': 'Не выбран номер накладной для отображения информации!',
            //'vs_ufeem_mess_error_not_document': 'Не выбран документ для правки!',

            'vs_ufeem_title_label_num_wagon': 'Найти вагон:',
            'vs_ufeem_title_placeholder_num_wagon': '№ вагона',
            //'vs_ufeem_text_label_num_wagon': 'Скорректируйте тариф ЭПД ...',

            'vs_ufeem_title_label_fee_amount': 'Плата(расч.):',
            'vs_ufeem_title_placeholder_fee_amount': 'Плата, грн.',
            'vs_ufeem_text_label_fee_amount': 'Расчитанная плата за пользование вагоном ...',

            'vs_ufeem_title_label_fee_amount_manual': 'Плата(ручн.):',
            'vs_ufeem_title_placeholder_fee_amount_manual': 'Плата, грн.',
            'vs_ufeem_text_label_fee_amount_manual': 'Плата за пользование вагоном введена в ручную ...',

            'vs_ufeem_mess_error_wagon_num_error': 'Номер вагона не прошел проверку на системную нумерацию!',


            //'vs_ufeem_title_label_doc_pay': 'Тариф ЭПД (kod=001):',
            //'vs_ufeem_title_placeholder_doc_pay': 'Тариф ЭПД',
            //'vs_ufeem_text_label_doc_pay': 'Скорректируйте тариф ЭПД ...',

            //'vs_ufeem_title_label_tariff_contract': 'Ж.д. тариф по договору, грн:',
            //'vs_ufeem_title_placeholder_tariff_contract': 'Ж.д. тариф по договору',
            //'vs_ufeem_text_label_tariff_contract': 'Введите Ж.д. тариф по договору(грн)...',

            //'vs_ufeem_title_label_payer': 'Плательщик ОТПР:',
            //'vs_ufeem_text_label_payer': 'Выберите плательщика ...',

            //'vs_ufeem_title_label_cargo': 'груз ОТПР:',
            //'vs_ufeem_text_label_cargo': 'Выберите груз ...',

            //'vs_ufeem_title_label_station_from': 'Станция отправления:',
            //'vs_ufeem_text_label_station_from': 'Выберите станцию ...',

            'vs_ufeem_title_button_Cancel': 'Отмена',
            'vs_ufeem_button_Ok': 'Применить',

            'vs_ufeem_button_search': 'Найти',
            'vs_ufeem_title_button_search': 'Найти все платы по вагону...',
            //'vs_ufeem_title_button_tariff_contract': 'Обновить ж.д. тариф по договору...',
            //'vs_ufeem_title_button_clear_tariff_contract': 'Очистить ж.д. тариф по договору...',

            //'vs_ufeem_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            //'vs_ufeem_mess_run_update_doc_pay': 'Править тариф ЭПД (kod=001) по документу [{0}], будет внесен новый тариф :{1} вместо тарифа :{2}.',
            //'vs_ufeem_cancel_update_doc_pay': 'Отмена правки тарифа ЭПД.',
            //'vs_ufeem_mess_ok_update_doc_pay': 'По документу  [{0}] обнавлен тариф ЭПД (kod=001)',
            //'vs_ufeem_mess_error_update_doc_pay': 'При обновлении тарифа ЭПД по документу [{0}], - произошла ошибка. Код ошибки {1}',

            //'vs_ufeem_mess_run_update_tariff_contract': 'Править ж.д. тариф по договору по документу [{0}], будет внесен новый ж.д. тариф :{1}',
            //'vs_ufeem_cancel_update_tariff_contract': 'Отмена правки ж.д. тарифа.',
            //'vs_ufeem_mess_ok_update_tariff_contract': 'По документу  [{0}] обнавлен ж.д. тариф по договору',
            //'vs_ufeem_mess_error_update_tariff_contract': 'При обновлении ж.д. тарифа по договору по документу [{0}], - произошла ошибка. Код ошибки {1}',

            //'vs_ufeem_mess_run_clear_tariff_contract': 'Очистить ж.д. тариф по договору по документу [{0}]',
            //'vs_ufeem_cancel_clear_tariff_contract': 'Отмена очистки ж.д. тарифа.',
            //'vs_ufeem_mess_ok_clear_tariff_contract': 'По документу  [{0}] удален ж.д. тариф по договору',
            //'vs_ufeem_mess_error_clear_tariff_contract': 'При очистки ж.д. тарифа по договору по документу [{0}], - произошла ошибка. Код ошибки {1}',

            //'vs_ufeem_mess_error_select': 'Документ {0} для правки закрыт, по документу была произведена сверка, перечень №{1} от {2}',

            //'vs_ufeem_load_main_docs': 'Загружаю документы за период...',
            //'vs_ufeem_update_main_docs': 'Обновляю документы выбранные за период...',
            //'vs_ufeem_select_main_docs': 'Поиск документов согласно выбора...',

            //'vs_ufeem_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            //'vs_ufeem_mess_info_add_main_docs': 'За период c {0} по {1}, найдено {2} документов.',
            //'vs_ufeem_mess_info_select_main_docs': 'За период c {0} по {1}, найдено {2} документов, выбрано {3}',

            //'vs_ufeem_mess_error_not_doc_pay': 'Не указан новый тариф ЭПД!',
            //'vs_ufeem_mess_error_exist_doc_pay': 'Указаный тариф ЭПД не отличается от существующего!',

            //'vs_ufeem_mess_error_not_tariff_contract': 'Не указан тариф по договору!',
            //'vs_ufeem_mess_error_exist_tariff_contract': 'Указаный тариф по договору не отличается от существующего!',

            //'vs_ufeem_mess_war_not_select_docs': 'Не выбрана накладная для правки!',

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

    /*    var VFSP = App.view_form_select_period; // форма выбора периода*/

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var IDS_ARRIVAL = App.ids_arrival;
    var IDS_OUTGOING = App.ids_outgoing;

    var TSRV = App.table_services;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_usage_fee_manual(selector) {
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
    view_usage_fee_manual.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_usage_fee_manual');
        LockScreen(langView('vs_ufeem_mess_init_module', App.Langs));
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
            bt_close_text: langView('vs_ufeem_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_ufeem_button_Ok', App.Langs),
        });

        this.num = null; // Номер вагона
        this.usage_fee_wagons = []; // список расчетов
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
        // Создать макет панели (КОРРЕКТИРОВКА ИТОГОВОЙ СУММЫ ПЛАТЫ В РУЧНОМ РЕЖИМЕ)
        this.card_services = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 mt-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_ufeem_card_header_card_services', App.Langs),
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
        this.div_form_search = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 12,
        }); // Окно настроек
        row.$html.append(this.div_form_search.$html);
        this.card_services.body.$html.append(row.$html);

        // Создать макет панели (Перечень вагонов для коррекции)
        this.usage_fee_wagons = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_ufeem_card_header_usage_fee_wagons', App.Langs),
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
        this.usage_fee_wagons_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.usage_fee_wagons_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert 
        this.alert_usage_fee_wagons = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.usage_fee_wagons_table.$html.append(this.alert_usage_fee_wagons.$html);
        this.usage_fee_wagons_alert = new ALERT(this.alert_usage_fee_wagons.$html);

        row.$html.append(this.usage_fee_wagons_setup.$html).append(this.usage_fee_wagons_table.$html);
        this.usage_fee_wagons.body.$html.append(row.$html);

        this.$main.append(this.card_services.$html.append(this.usage_fee_wagons.$html));
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
                        this.usage_fee_wagons_setup.$html.append(this.form_edit_usege_fee.$form);

                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_usage_fee_manual');
                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия

                this.form_select_wagons = new FD();
                // Создать макет панели
                var objs_select = [];
                var bt_search = {
                    obj: 'bs_button',
                    options: {
                        id: 'search-wagon',
                        name: 'search-wagon',
                        class: 'col-auto',
                        fsize: 'sm',
                        color: 'success',
                        text: langView('vs_ufeem_button_search', App.Langs),
                        title: langView('vs_ufeem_title_button_search', App.Langs),
                        icon_fa_left: 'fa-solid fa-magnifying-glass',//<i class="fa-solid fa-magnifying-glass"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            //event.preventDefault();
                            this.form_select_wagons.submit(event);
                            if (this.form_select_wagons.valid) {
                                var result = this.form_select_wagons.data;
                                // Обновим информацию
                                this.update(result.input_text_num_wagon, function (usage_fee_wagons) {
                                    this.view_usage_fee_wagons(usage_fee_wagons, function () {
                                        LockScreenOff();
                                    }.bind(this));
                                }.bind(this));
                            }
                        }.bind(this),
                    }
                };
                var form_input_num_wagon = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'select_wagons',
                        id: 'num_wagon',
                        name: 'num_wagon',
                        label: langView('vs_ufeem_title_label_num_wagon', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ufeem_title_placeholder_num_wagon', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        //element_min: 0,
                        //element_max: 99999999,
                        element_step: 1,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                var value = $(e.currentTarget).val();
                                //this.validation_doc_pay(value, 'doc_pay', false, true)
                            }.bind(this),
                        },
                        form_inline: true,
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        //col_prefix: null,
                        //col_size: null,
                        col_class: null
                        /*                        col_class: 'mt-0',*/
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: [bt_apply_doc_pay],
                        //form_text: langView('vs_ufeem_text_label_doc_pay', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                objs_select.push(form_input_num_wagon);
                objs_select.push(bt_search);
                this.form_select_wagons.init({
                    alert: this.main_alert,
                    //context: this.div_form_period.$html,
                    objs: objs_select,
                    id: null,
                    //form_class: 'row gy-2 gx-3 align-items-center',
                    form_class: 'row gy-2 gx-3 align-items-center needs-validation',
                    //form_class: 'row g-3',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {
                            var valid = result.valid;
                            var num_val = is_valid_num_wagon(Number($.trim(result.new.input_text_num_wagon)));
                            if (!num_val) {
                                this.form_select_wagons.set_element_validation_error('num_wagon', langView('vs_ufeem_mess_error_wagon_num_error', App.Langs), false);
                                valid = false;
                            }
                            this.form_select_wagons.valid = valid;
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        this.div_form_search.$html.append(this.form_select_wagons.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                // форма правки платы за пользование
                this.form_edit_usege_fee = new FD();
                var objs_eufee = [];
                var form_input_fee_amount = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'edit_ufee',
                        id: 'fee_amount',
                        name: 'fee_amount',
                        label: langView('vs_ufeem_title_label_fee_amount', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ufeem_title_placeholder_fee_amount', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: true,
                        //element_min: 0,
                        //element_max: 100000000.0,
                        //element_step: 0.01,
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
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: null,
                        form_text: langView('vs_ufeem_text_label_fee_amount', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_input_fee_amount_manual = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'edit_ufee',
                        id: 'fee_amount_manual',
                        name: 'fee_amount_manual',
                        label: langView('vs_ufeem_title_label_fee_amount_manual', App.Langs),
                        element_type: 'number',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ufeem_title_placeholder_fee_amount_manual', App.Langs),
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
                        //group_append_class: null,
                        //group_append_id: null,
                        //group_append_html: null,
                        //group_append_objs: null,
                        form_text: langView('vs_ufeem_text_label_fee_amount_manual', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                objs_eufee.push(form_input_fee_amount);
                objs_eufee.push(form_input_fee_amount_manual);
                this.form_edit_usege_fee.init({
                    alert: this.main_alert,
                    //context: this.div_form_search.$html,
                    objs: objs_eufee,
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
                                    var mess = langView('vs_ufeem_mess_run_update_doc_pay', App.Langs).format(this.nomDoc, result.new.input_text_doc_pay, this.current_doc_pay);
                                    pay = result.new.input_text_doc_pay ? Number(Number(result.new.input_text_doc_pay * 100).toFixed(0)) : null;
                                }
                                if (this.type === 1) {
                                    var mess = langView('vs_ufeem_mess_run_update_tariff_contract', App.Langs).format(this.nomDoc, result.new.input_text_tariff_contract);
                                    pay = result.new.input_text_tariff_contract ? Number(Number(result.new.input_text_tariff_contract * 100).toFixed(0)) : null;
                                }
                                if (this.type === 2) {
                                    var mess = langView('vs_ufeem_mess_run_clear_tariff_contract', App.Langs).format(this.nomDoc);
                                    pay = null;
                                }
                                this.mcf_lg.open(
                                    langView('vs_ufeem_title_form_apply', App.Langs),
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
                                        if (this.type === 0) this.main_alert.out_warning_message(langView('vs_ufeem_cancel_update_doc_pay', App.Langs));
                                        if (this.type === 1) this.main_alert.out_warning_message(langView('vs_ufeem_cancel_update_tariff_contract', App.Langs));
                                        if (this.type === 2) this.main_alert.out_warning_message(langView('vs_ufeem_cancel_clear_tariff_contract', App.Langs));
                                    }.bind(this)
                                );
                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        //this.usage_fee_wagons_setup.$html.append(this.form_edit_usege_fee.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( Перечень вагонов с оплатой)
                var row_wagons_usege_fee = new this.fe_ui.bs_row({ id: 'table-usage-fee-wagons', class: 'pt-2' });
                this.usage_fee_wagons_table.$html.append(row_wagons_usege_fee.$html);

                this.tab_usage_fee_wagons = new TSRV('div#table-usage-fee-wagons');
                this.tab_usage_fee_wagons.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: true,
                    type_report: 'usage_fee_wagons',
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
                                //this.main_alert.out_warning_message(langView('vs_ufeem_mess_error_select', App.Langs).format(rowData[0].nomDoc, rowData[0].numList, moment(rowData[0].dateList).format(format_datetime_ru)));
                                //this.form_edit_usege_fee.el.input_text_doc_pay.val(null);
                                //this.form_edit_usege_fee.el.input_text_tariff_contract.val(null);
                            }
                        }
                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        this.form_edit_usege_fee.clear_all();
                        //this.id = null;
                        //this.type = null;
                        //this.current_doc_pay = null;
                        //this.current_tariff_contract = null;
                        //this.nomDoc = null;
                        if (type === "select") {
                            //this.id = rows[0].id;
                            //this.current_doc_pay = rows[0].outgoingUZDocumentPay !== null ? Number(rows[0].outgoingUZDocumentPay / 100).toFixed(2) : null;
                            //this.current_tariff_contract = rows[0].tariffContract !== null ? Number(rows[0].tariffContract / 100).toFixed(2) : null;
                            //this.nomDoc = rows[0].nomDoc;
                        }
                        //this.form_edit_usege_fee.el.input_text_doc_pay.val(this.current_doc_pay);
                        //this.form_edit_usege_fee.el.input_text_tariff_contract.val(this.current_tariff_contract);
                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {

                    }.bind(this),
                    fn_enable_button: function (tb) {
                    }.bind(this),
                    fn_view_detali: function (id_div, data) {
                        //this.tables_detali[data.id] = new TSRV('div#' + id_div);
                        //var tab = this.tables_detali[data.id];
                        //this.tables_detali[data.id].init({
                        //    alert: this.from_way_alert,
                        //    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                        //    detali_table: false,
                        //    type_report: 'register_send_detali_wagons',
                        //    setup_buttons: [
                        //    ],
                        //    link_num: false,
                        //    ids_wsd: null,
                        //    fn_init: function () {
                        //         На проверку окончания инициализации
                        //        tab.view(data.vagons);
                        //        LockScreenOff();

                        //    },
                        //    fn_action_view_detali: function (rows) {

                        //    },
                        //    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {

                        //    }.bind(this),
                        //    fn_select_rows: function (rows, type) {

                        //    }.bind(this),
                        //    fn_select_link: function (link) {

                        //    }.bind(this),
                        //    fn_button_action: function (name, e, dt, node, config) {

                        //    }.bind(this),
                        //    fn_enable_button: function (tb) {

                        //    }.bind(this),
                        //});
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
            //console.log('[view_usage_fee_manual] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // обновить информацию по вагонам
    view_usage_fee_manual.prototype.update = function (num, callback) {
        // Обновим
        this.clear_all();
        this.num = num;
        this.usage_fee_wagons = [];
        LockScreen(langView('vs_ufeem_mess_search_wagons', App.Langs));
        this.api_wsd.getViewUsageFeeWagonOfNum(this.num, function (usage_fee_wagons) {
            this.usage_fee_wagons = usage_fee_wagons;
            if (typeof callback === 'function') {
                callback(usage_fee_wagons);
            }
        }.bind(this));
    };
    // обновить информацию по вагонам
    view_usage_fee_manual.prototype.view_usage_fee_wagons = function (usage_fee_wagons, callback) {
        this.usage_fee_wagons = usage_fee_wagons;
        LockScreen(langView('vs_ufeem_mess_search_wagons', App.Langs));
        this.tab_usage_fee_wagons.view(this.usage_fee_wagons);
        if (typeof callback === 'function') {
            callback(usage_fee_wagons);
        }
    };
    //--------------------------------------------------------------------------------
    // Обновить 
    view_usage_fee_manual.prototype.apply_update = function (data, callback) {
        //var result = 1;
        this.ids_outgoing.postUpdatePayOutgoingUzDocument(data, function (result) {
            var mess_ok = null;
            var mess_error = null;
            this.clear_all();
            if (result >= 0) {
                // Ок
                if (data.type === 0) {
                    mess_ok = langView('vs_ufeem_mess_ok_update_doc_pay', App.Langs).format(this.nomDoc);
                }
                if (data.type === 1) {
                    mess_ok = langView('vs_ufeem_mess_ok_update_tariff_contract', App.Langs).format(this.nomDoc);
                }
                if (data.type === 2) {
                    mess_ok = langView('vs_ufeem_mess_ok_clear_tariff_contract', App.Langs).format(this.nomDoc);
                }
                LockScreen(langView('vs_ufeem_update_main_docs', App.Langs));
                this.ids_outgoing.getRegisterOutgoingUzDocumentOfId(data.id_document, function (document) {
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
                    mess_error = langView('vs_ufeem_mess_error_update_doc_pay', App.Langs).format(this.nomDoc, result);
                }
                if (data.type === 1) {
                    mess_error = langView('vs_ufeem_mess_error_update_tariff_contract', App.Langs).format(this.nomDoc, result);
                }
                if (data.type === 1) {
                    mess_error = langView('vs_ufeem_mess_error_clear_tariff_contract', App.Langs).format(this.nomDoc, result);
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
    view_usage_fee_manual.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_usage_fee_manual.prototype.clear_all = function () {
        this.main_alert.clear_message();
        this.form_select_wagons.clear_all();
        this.form_edit_usege_fee.clear_all();
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_usage_fee_manual.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_usage_fee_manual = view_usage_fee_manual;

    window.App = App;
})(window);