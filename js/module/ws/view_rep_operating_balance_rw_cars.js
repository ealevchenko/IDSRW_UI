/* ===============================================
-= Модуль  =-
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
            'vr_obrwc_card_header_group_wagons': 'ОТЧЕТ "ОПЕРАТИВНЫЙ ОСТАТОК ВАГОНОВ НА АМКР"',
            //'vr_obrwc_card_header_cost_calculation': 'РАСЧЕТ СТОИМОСТИ',
            //'vr_obrwc_card_header_register_accepted_wagons': 'РАСЧЕТ ПРИНЯТЫХ ВАГОНОВ',
            'vr_obrwc_mess_init_module': 'Инициализация модуля view_rep_operating_balance_rw_cars',
            //'vr_obrwc_mess_load_operation': 'Загружаю форму операции',

            'vr_obrwc_obrwc_title_button_apply': 'ОБНОВИТЬ',
            'vr_obrwc_obrwc_title_button_title_apply': 'Обновить выборку...',
            'vr_obrwc_obrwc_title_button_clear': 'СБРОСИТЬ',
            'vr_obrwc_obrwc_title_button_title_clear': 'Сбросить настройки выборки...',

            'vr_obrwc_title_label_external_wagon': 'Внешние стороние вагоны',
            'vr_obrwc_title_label_external_wagon_amkr': 'Внешние вагоны АМКР',
            'vr_obrwc_title_label_wagon_amkr_vz': 'Внутризаводские вагоны',
            'vr_obrwc_title_label_wagon_klient': 'Контрагенты',
            'vr_obrwc_title_label_wagon_outgoing': 'Сданные вагоны на УЗ',
            'vr_obrwc_title_label_wagon_cisterna_amkr': 'Цистерны арендованные',

            'vr_obrwc_title_label_over_day': 'Сверх суток:',
            'vr_obrwc_title_button_apply_over_day': 'Применить выборку сверх суток...',
            'vr_obrwc_title_label_not_moved': 'Не перемещается более, час:',
            'vr_obrwc_title_button_apply_not_moved': 'Применить выборку не перемещается более...',

            'vr_obrwc_title_label_operator': 'Оператор:',
            'vr_obrwc_title_label_arrival_condition': 'Разметка по прибытию:',
            'vr_obrwc_title_label_current_condition': 'Разметка текущая:',
            'vr_obrwc_title_label_wagon_rod': 'Род вагона:',
            'vr_obrwc_title_label_wagon_type': 'Тип вагона:',
            'vr_obrwc_title_label_limiting_loading': 'Ограничение:',
            'vr_obrwc_title_label_arrival_cargo_group': 'Группа по ПРИБ:',
            'vr_obrwc_title_label_arrival_cargo': 'Груз по ПРИБ:',
            'vr_obrwc_title_label_sertification_data': 'Сертификационные данные:',
            'vr_obrwc_title_label_station_from_code': 'Станция отправления:',
            'vr_obrwc_title_label_arrival_division_amkr': 'Цех получатель ПРИБ:',

            'vr_obrwc_title_label_view_cargo_name': 'Груз ТЕКУЩ:',
            'vr_obrwc_title_label_view_external_station_on': 'Станция УЗ назначения ТЕКУЩ:',
            'vr_obrwc_title_label_view_division_from': 'Цех погрузки ТЕКУЩ:',
            'vr_obrwc_title_label_view_division_on': 'Цех получатель ТЕКУЩ:',
            'vr_obrwc_title_label_loading_status': 'Статус:',
            'vr_obrwc_title_label_operation': 'Текущая операция:',
            'vr_obrwc_title_label_station': 'Станция нахождения вагона:',
            'vr_obrwc_title_label_view_type_way': 'Дислокация:',
            'vr_obrwc_title_label_view_name_way': 'Ж.д. путь:',

            //'vr_obrwc_title_form_button_apply': 'Править документ',
            //'vr_obrwc_title_form_apply_button_title': 'Править документ ...',

            //'vr_obrwc_title_label_num_epd': 'Найти накладную:',
            //'vr_obrwc_title_placeholder_num_epd': 'Найти накладную',
            //'vr_obrwc_text_label_num_epd': 'Введите номер накладной ...',

            //'vr_obrwc_title_label_doc_pay': 'Тариф ПРИБ:',
            //'vr_obrwc_title_placeholder_doc_pay': 'Тариф ПРИБ',
            //'vr_obrwc_text_label_doc_pay': 'Скорректируйте тариф ПРИБЫТИЯ ...',

            //'vr_obrwc_title_label_payer': 'Плательщик:',
            //'vr_obrwc_title_placeholder_payer': 'Плательщик',
            //'vr_obrwc_text_label_payer': 'Выберите плательщика ...',

            //'vr_obrwc_title_label_tariff_contract': 'Ж.д. тариф по договору, грн:',
            //'vr_obrwc_title_placeholder_tariff_contract': 'Ж.д. тариф по договору',
            //'vr_obrwc_text_label_tariff_contract': 'Введите Ж.д. тариф по договору(грн)...',

            //'vr_obrwc_title_button_num_epd': 'Найти накладную...',
            //'vr_obrwc_title_button_doc_pay': 'Обновить тариф прибытия...',
            //'vr_obrwc_title_button_payer': 'Обновить плательщика...',
            //'vr_obrwc_title_button_tariff_contract': 'Обновить ж.д. тариф по договору...',

            //'vr_obrwc_mess_valid_not_payer': 'Указанного плателщика нет в справочнике ИДС',
            //'vr_obrwc_mess_valid_payer': 'Укажите плательщика',

            'vr_obrwc_title_button_Cancel': 'Отмена',
            'vr_obrwc_button_Ok': 'Применить',

            //'vr_obrwc_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            //'vr_obrwc_mess_run_update_document_pay': 'Выполнить обновление "Тарифа ПРИБЫТИЯ", заменить тариф [{0}] на новый тариф [{1}].',
            //'vr_obrwc_mess_ok_update_document_pay': 'По документу №{0} обновлен "Тариф ПРИБЫТИЯ", новый тариф [{1}].',
            //'vr_obrwc_mess_error_update_document_pay': 'При обновлении "Тарифа ПРИБЫТИЯ" [{0}], документа № {1} - произошла ошибка. Код ошибки {2}',
            //'vr_obrwc_cancel_update_document_pay': 'Отмена обновления "Тарифа ПРИБЫТИЯ"',

            //'vr_obrwc_mess_run_update_cost_calculation': 'Выполнить обновление расчета по плательщику {0},с тарифом по договору [{1}].',
            //'vr_obrwc_mess_ok_update_cost_calculation': 'По документу №{0} выполнен расчет, обновлен плательщик {1} и тариф {2}.',
            //'vr_obrwc_mess_error_update_cost_calculation': 'При обновлении плательщика {0} и тарифа {1}, документа № {3} - произошла ошибка. Код ошибки {4}',
            //'vr_obrwc_cancel_update_cost_calculation': 'Отмена обновления расчета по плательщику',

            //'vr_obrwc_mess_error_not_document': 'Не выбран документ для правки!',
            //'vr_obrwc_mess_error_document_pay_not_change': 'Тариф без изменений!',
            //'vr_obrwc_mess_error_payer_not_change': 'Плательщик без изменений!',
            //'vr_obrwc_mess_error_tariff_contract_not_change': 'Ж.д. тариф по договору без изменений!',

            //'vr_obrwc_load_main_docs': 'Загружаю документы за период...',
            'vr_obrwc_load_docs': 'Загружаю оперативный остаток вагонов на АМКР на {0}...',

            //'vr_obrwc_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            //'vr_obrwc_mess_info_add_main_docs': 'За период c {0} по {1}, загружено {2} накладных',

            //'vr_obrwc_mess_war_not_select_docs': 'Не выбран номер накладной для отображения информации!',
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

    var TWS = App.table_ws;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_rep_operating_balance_rw_cars(selector) {
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
    view_rep_operating_balance_rw_cars.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_rep_operating_balance_rw_cars');
        LockScreen(langView('vr_obrwc_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,                          // сылки на библиотеки api dir
            api_wsd: null,                          // сылки на библиотеки api wsd
            ids_arrival: null,                      // сылки на библиотеки api arrival
            fn_init: null,                          // Окончание инициализации
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
            bt_close_text: langView('vr_obrwc_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vr_obrwc_button_Ok', App.Langs),
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
        // Создать макет панели 
        this.card_report = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 mt-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vr_obrwc_card_header_group_wagons', App.Langs),
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
        this.on_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 2,
        }); // Окно настроек
        this.on_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 10,
        }); // Окно таблицы

        var fieldset_on_setup = new this.fe_ui.fieldset(); //{ class :"col-xl-3"}
        var fieldset_on_table = new this.fe_ui.fieldset(); //{ class :"col-xl-9"}

        var row_on_setup = new this.fe_ui.bs_row({ id: 'vr-obrwc-on-setup', class: 'pt-2' });
        var row_on_table = new this.fe_ui.bs_row({ id: 'vr-obrwc-on-table', class: 'pt-2' });

        this.on_setup.$html.append(fieldset_on_setup.$html.append(row_on_setup.$html));
        this.on_table.$html.append(fieldset_on_table.$html.append(row_on_table.$html));

        row.$html.append(this.on_setup.$html).append(this.on_table.$html);
        this.card_report.body.$html.append(row.$html);

        this.$main.append(this.card_report.$html);
        // Инициализация вначале 
        if (typeof this.settings.fn_start_init === 'function') {
            this.settings.fn_start_init.call(this);
        }
        // Определим количество загрузок
        var pr_load = 3;
        // Выход из загрузок
        var out_load = function (process) {
            if (pr_load === 0) {
                //==============================================================
                // Инициализация после загрузки библиотек
                var process = 1;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        //this.cost_calculation_setup.$html.append(this.form_cost_calculation_setup.$form);
                        //this.cost_calculation_setup.$html.append(this.form_document_pay.$form);

                        // На проверку окончания инициализации
                        //----------------------------------
                        LockScreenOff();
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close view_rep_operating_balance_rw_cars');
                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия

                process--;
                out_init(process);

            }
        }.bind(this);

        // форма детального выбора оперативного остатка
        this.form_obrwc_setup = new FD();
        var objs_obrwc_setup = [];
        var col_bt_apply = {
            obj: 'bs_col',
            options: {
                id: null,
                pref: 'md',
                size: 12,
                class: 'text-center mb-3',
                style: null,
            },
            childs: []
        };
        var bt_apply = {
            obj: 'bs_button',
            options: {
                id: 'obrwc_apply',
                name: 'obrwc_apply',
                class: null,
                fsize: 'sm',
                color: 'success',
                text: langView('vr_obrwc_obrwc_title_button_apply', App.Langs),
                title: langView('vr_obrwc_obrwc_title_button_title_apply', App.Langs),
                icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
                icon_fa_right: null,
                fn_click: function (event) {
                    event.preventDefault();
                    this.clear = false;
                    this.form_obrwc_setup.$form.submit();
                }.bind(this),
            }
        };
        var bt_clear = {
            obj: 'bs_button',
            options: {
                id: 'obrwc_clear',
                name: 'obrwc_clear',
                class: 'ms-2',
                fsize: 'sm',
                color: 'danger',
                text: langView('vr_obrwc_obrwc_title_button_clear', App.Langs),
                title: langView('vr_obrwc_obrwc_title_button_title_clear', App.Langs),
                icon_fa_left: 'fa-solid fa-broom',  //<i class="fa-solid fa-broom"></i>
                icon_fa_right: null,
                fn_click: function (event) {
                    event.preventDefault();
                }.bind(this),
            }
        };
        var form_check_external_wagon = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common_obrwc',
                id: 'external_wagon',
                name: 'external_wagon',
                label: langView('vr_obrwc_title_label_external_wagon', App.Langs),
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
                        var value = $(e.currentTarget).prop('checked');
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: null,
            },
            childs: []
        };
        var form_check_external_wagon_amkr = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common_obrwc',
                id: 'external_wagon_amkr',
                name: 'external_wagon_amkr',
                label: langView('vr_obrwc_title_label_external_wagon_amkr', App.Langs),
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
                        var value = $(e.currentTarget).prop('checked');
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: null,
            },
            childs: []
        };
        var form_check_wagon_amkr_vz = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common_obrwc',
                id: 'wagon_amkr_vz',
                name: 'wagon_amkr_vz',
                label: langView('vr_obrwc_title_label_wagon_amkr_vz', App.Langs),
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
                        var value = $(e.currentTarget).prop('checked');
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: null,
            },
            childs: []
        };
        var form_check_wagon_klient = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common_obrwc',
                id: 'wagon_klient',
                name: 'wagon_klient',
                label: langView('vr_obrwc_title_label_wagon_klient', App.Langs),
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
                        var value = $(e.currentTarget).prop('checked');
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: null,
            },
            childs: []
        };
        var form_check_wagon_outgoing = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common_obrwc',
                id: 'wagon_outgoing',
                name: 'wagon_outgoing',
                label: langView('vr_obrwc_title_label_wagon_outgoing', App.Langs),
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
                        var value = $(e.currentTarget).prop('checked');
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: null,
            },
            childs: []
        };
        var form_check_wagon_cisterna_amkr = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common_obrwc',
                id: 'wagon_cisterna_amkr',
                name: 'wagon_cisterna_amkr',
                label: langView('vr_obrwc_title_label_wagon_cisterna_amkr', App.Langs),
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
                        var value = $(e.currentTarget).prop('checked');
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: null,
            },
            childs: []
        };
        var bt_apply_over_day = {
            obj: 'bs_button',
            options: {
                id: 'apply_over_day',
                name: 'apply_over_day',
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: langView('vr_obrwc_title_button_apply_over_day', App.Langs),
                icon_fa_left: 'fa-solid fa-retweet',//<i class="fa-solid fa-retweet"></i>
                icon_fa_right: null,
                fn_click: function (event) {
                    event.preventDefault();
                    /*                    this.form_document_pay.$form.submit();*/
                }.bind(this),
            }
        };
        var form_input_over_day = {
            obj: 'bs_form_input',
            options: {
                validation_group: 'common_obrwc',
                id: 'over_day',
                name: 'over_day',
                label: langView('vr_obrwc_title_label_over_day', App.Langs),
                element_type: 'number',
                element_fsize: 'sm',
                element_class: null,
                element_value: 0,
                element_title: null,
                /*                element_placeholder: langView('vr_obrwc_title_placeholder_over_day', App.Langs),*/
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: 0,
                element_max: 1000,
                element_step: 1,
                element_options: {
                    default: '',
                    fn_change: function (e) {
                        var value = $(e.currentTarget).val();
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                group_append_class: null,
                group_append_id: null,
                group_append_html: null,
                group_append_objs: [bt_apply_over_day],
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var bt_apply_not_moved = {
            obj: 'bs_button',
            options: {
                id: 'apply_not_moved',
                name: 'apply_not_moved',
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: langView('vr_obrwc_title_button_apply_not_moved', App.Langs),
                icon_fa_left: 'fa-solid fa-retweet',//<i class="fa-solid fa-retweet"></i>
                icon_fa_right: null,
                fn_click: function (event) {
                    event.preventDefault();
                    /*                    this.form_document_pay.$form.submit();*/
                }.bind(this),
            }
        };
        var form_input_not_moved = {
            obj: 'bs_form_input',
            options: {
                validation_group: 'common_obrwc',
                id: 'not_moved',
                name: 'not_moved',
                label: langView('vr_obrwc_title_label_not_moved', App.Langs),
                element_type: 'number',
                element_fsize: 'sm',
                element_class: null,
                element_value: 0,
                element_title: null,
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: 0,
                element_max: 1000,
                element_step: 1,
                element_options: {
                    default: '',
                    fn_change: function (e) {
                        var value = $(e.currentTarget).val();
                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                group_append_class: null,
                group_append_id: null,
                group_append_html: null,
                group_append_objs: [bt_apply_not_moved],
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_operator = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'id_operator',
                name: 'id_operator',
                label: langView('vr_obrwc_title_label_operator', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_limiting_loading = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'id_limiting_loading',
                name: 'id_limiting_loading',
                label: langView('vr_obrwc_title_label_limiting_loading', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_arrival_condition = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'arrival_condition',
                name: 'arrival_condition',
                label: langView('vr_obrwc_title_label_arrival_condition', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_current_condition = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'current_condition',
                name: 'current_condition',
                label: langView('vr_obrwc_title_label_current_condition', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_wagon_rod = {
            obj: 'bs_form_wagon_rod',
            options: {
                validation_group: 'common_obrwc',
                id: 'wagon_rod',
                name: 'wagon_rod',
                label: langView('vr_obrwc_title_label_wagon_rod', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_wagon_type = {
            obj: 'bs_form_wagon_rod',
            options: {
                validation_group: 'common_obrwc',
                id: 'wagon_type',
                name: 'wagon_type',
                label: langView('vr_obrwc_title_label_wagon_type', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_arrival_cargo = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'id_arrival_cargo',
                name: 'id_arrival_cargo',
                label: langView('vr_obrwc_title_label_arrival_cargo', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_arrival_cargo_group = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'id_arrival_cargo_group',
                name: 'id_arrival_cargo_group',
                label: langView('vr_obrwc_title_label_arrival_cargo_group', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_sertification_data = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'id_sertification_data',
                name: 'id_sertification_data',
                label: langView('vr_obrwc_title_label_sertification_data', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_station_from_code = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'station_from_code',
                name: 'station_from_code',
                label: langView('vr_obrwc_title_label_station_from_code', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_arrival_division_amkr = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'station_from_code',
                name: 'station_from_code',
                label: langView('vr_obrwc_title_label_arrival_division_amkr', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_view_cargo_name = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'view_cargo_name',
                name: 'view_cargo_name',
                label: langView('vr_obrwc_title_label_view_cargo_name', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_view_external_station_on = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'view_external_station_on',
                name: 'view_external_station_on',
                label: langView('vr_obrwc_title_label_view_external_station_on', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_view_division_from = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'view_division_from',
                name: 'view_division_from',
                label: langView('vr_obrwc_title_label_view_division_from', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_view_division_on = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'view_division_on',
                name: 'view_division_on',
                label: langView('vr_obrwc_title_label_view_division_on', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_loading_status = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'loading_status',
                name: 'loading_status',
                label: langView('vr_obrwc_title_label_loading_status', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_operation = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'id_operation',
                name: 'id_operation',
                label: langView('vr_obrwc_title_label_operation', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_station = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'id_station',
                name: 'id_station',
                label: langView('vr_obrwc_title_label_station', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_view_type_way = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'view_type_way',
                name: 'view_type_way',
                label: langView('vr_obrwc_title_label_view_type_way', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_view_name_way = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'view_name_way',
                name: 'view_name_way',
                label: langView('vr_obrwc_title_label_view_name_way', App.Langs),
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
                        e.preventDefault();
                    }.bind(this),
                    fn_check: function (e, val) {

                    }.bind(this),
                },
                validation: false,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };

        col_bt_apply.childs.push(bt_apply);
        col_bt_apply.childs.push(bt_clear);
        objs_obrwc_setup.push(col_bt_apply);
        objs_obrwc_setup.push(form_check_external_wagon);
        objs_obrwc_setup.push(form_check_external_wagon_amkr);
        objs_obrwc_setup.push(form_check_wagon_amkr_vz);
        objs_obrwc_setup.push(form_check_wagon_klient);
        objs_obrwc_setup.push(form_check_wagon_outgoing);
        objs_obrwc_setup.push(form_check_wagon_cisterna_amkr);
        objs_obrwc_setup.push(form_input_over_day);
        objs_obrwc_setup.push(form_input_not_moved);
        objs_obrwc_setup.push(form_select_operator);
        objs_obrwc_setup.push(form_select_limiting_loading);
        objs_obrwc_setup.push(form_select_arrival_condition);
        objs_obrwc_setup.push(form_select_current_condition);
        objs_obrwc_setup.push(form_select_wagon_rod);
        objs_obrwc_setup.push(form_select_wagon_type);
        objs_obrwc_setup.push(form_select_arrival_cargo);
        objs_obrwc_setup.push(form_select_arrival_cargo_group);
        objs_obrwc_setup.push(form_select_sertification_data);
        objs_obrwc_setup.push(form_select_station_from_code);
        objs_obrwc_setup.push(form_select_arrival_division_amkr);
        objs_obrwc_setup.push(form_select_view_cargo_name);
        objs_obrwc_setup.push(form_select_view_external_station_on);
        objs_obrwc_setup.push(form_select_view_division_from);
        objs_obrwc_setup.push(form_select_view_division_on);
        objs_obrwc_setup.push(form_select_loading_status);
        objs_obrwc_setup.push(form_select_operation);
        objs_obrwc_setup.push(form_select_station);
        objs_obrwc_setup.push(form_select_view_type_way);
        objs_obrwc_setup.push(form_select_view_name_way);

        this.form_obrwc_setup.init({
            alert: this.main_alert,
            //context: this...$html,
            objs: objs_obrwc_setup,
            id: null,
            form_class: '',
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
                row_on_setup.$html.append(this.form_obrwc_setup.$form);
                // На проверку окончания инициализации
                pr_load--;
                //console.log('[view_rep_operating_balance_rw_cars] [form_obrwc_setup] process ' + process);
                out_load(pr_load);
            }.bind(this),
        });

        // Таблица Оперативный остаток
        this.vr_obrwc = new TWS('div#vr-obrwc-on-table');
        this.vr_obrwc.init({
            alert: this.on_alert,
            class_table: 'table table-sm table-success table-striped table-sostav-outer-ways table-bordered border-secondary',
            detali_table: false,
            type_report: 'balance_cars',     //
            link_num: false,
            ids_wsd: null,
            fn_init: function () {
                // На проверку окончания инициализации
                pr_load--;
                //console.log('[view_rep_operating_balance_rw_cars] [vr_obrwc] process ' + process);
                out_load(pr_load);
            },
            fn_action_view_detali: function (rows) { },
            fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) { }.bind(this),
            fn_select_rows: function (rows, type) { }.bind(this),
            fn_select_link: function (link) { }.bind(this),
        });

        // Библиотеки по умолчанию
        this.default_db_names = [];

        this.wagons = [];
        this.calc_usages = [];

        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_rep_operating_balance_rw_cars] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // Обновить все
    view_rep_operating_balance_rw_cars.prototype.view = function (callback) {
        this.clear_all();
        this.load(function (wagons) {
            if (typeof callback === 'function') {
                this.vr_obrwc.view(wagons)
                callback(wagons);
            }
        }.bind(this));

    };
    // Загрузить отчет
    view_rep_operating_balance_rw_cars.prototype.load = function (callback) {
        LockScreen(langView('vr_obrwc_load_docs', App.Langs).format(moment().format(format_datetime_ru)));

        //if (typeof callback === 'function') {
        //    callback(this.wagons);
        //}
        var start = moment();
        var stop_load = moment();
        var diffTime = null;
        this.wagons = [];
        this.calc_usages = [];
        var pr_load = 2;
        var out_load1 = function (pr_load) {
            if (pr_load === 0) {
                stop_load = moment();
                diffTime = moment(stop_load).diff(start);
                var duration = moment.duration(diffTime);
                var years = duration.years();
                var days = duration.days();
                var months = duration.months();
                var hrs = duration.hours();
                var mins = duration.minutes();
                var secs = duration.seconds();
                //
                $('label#run-time').text('load : ' + mins + ' мин. ' + secs + ' сек.')
                $.each(this.calc_usages, function (i, el) {
                    if (el.error === 0) {
                        var wag = this.wagons.find(function (o) {
                            return o.num === el.num;
                        }.bind(this));
                        if (wag) {
                            wag.arrivalUsageFee = el.calcFeeAmount;
                        }
                    }
                }.bind(this));
                //main_alert.clear_message();
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }
        };
        // плата
        this.api_wsd.getCalcUsageFeeCarsOfBalansce(function (calc_usages) {
            this.calc_usages = calc_usages;
            pr_load--;
            out_load1.call(this, pr_load);
        }.bind(this));
        //  остаток
        this.api_wsd.getViewRemainderWagons(function (wagons) {
            this.wagons = wagons;
            pr_load--;
            out_load1.call(this, pr_load);
        }.bind(this));
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_rep_operating_balance_rw_cars.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_rep_operating_balance_rw_cars.prototype.clear_all = function () {
        //this.register_accepted_wagons_alert.clear_message();
        //this.form_register_accepted_wagons_setup.clear_all();
        //this.form_document_pay.clear_all();
        //this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.clear_all();
        //this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_rep_operating_balance_rw_cars.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_rep_operating_balance_rw_cars = view_rep_operating_balance_rw_cars;

    window.App = App;
})(window);