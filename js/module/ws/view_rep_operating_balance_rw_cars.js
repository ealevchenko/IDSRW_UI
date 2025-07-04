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
            'vr_obrwc_load': 'Загружаю оперативный остаток вагонов на АМКР на {0}...',
            'vr_obrwc_where': 'Обновляю оперативный остаток вагонов на АМКР...',
            'vr_obrwc_clear': 'Сбрасываю выборку оперативного остатка вагонов на АМКР...',
            //'vr_obrwc_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            //'vr_obrwc_mess_info_add_main_docs': 'За период c {0} по {1}, загружено {2} накладных',

            //'vr_obrwc_mess_war_not_select_docs': 'Не выбран номер накладной для отображения информации!',
            'vr_obrwc_field_view_type_way_outer_way': 'ПЕРЕГОН',
            'vr_obrwc_field_view_type_way_way': 'ПУТЬ СТАНЦИИ',
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
                    this.update_view(function () {
                        LockScreenOff();
                    }.bind(this));
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
                    this.clear_select(function () {
                        LockScreenOff();
                    }.bind(this));
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
                        //var value = $(e.currentTarget).prop('checked');
                        this.update_view(function () {
                            LockScreenOff();
                        }.bind(this));
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
                        //var value = $(e.currentTarget).prop('checked');
                        this.update_view(function () {
                            LockScreenOff();
                        }.bind(this));
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
                        //var value = $(e.currentTarget).prop('checked');
                        this.update_view(function () {
                            LockScreenOff();
                        }.bind(this));
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
                        //var value = $(e.currentTarget).prop('checked');
                        this.update_view(function () {
                            LockScreenOff();
                        }.bind(this));
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
                        //var value = $(e.currentTarget).prop('checked');
                        this.update_view(function () {
                            LockScreenOff();
                        }.bind(this));
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
                        //var value = $(e.currentTarget).prop('checked');
                        this.update_view(function () {
                            LockScreenOff();
                        }.bind(this));
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
                    this.update_view(function () {
                        LockScreenOff();
                    }.bind(this));
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
                    default: 0,
                    fn_change: function (e) {
                        //var value = $(e.currentTarget).val();
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
                    this.update_view(function () {
                        LockScreenOff();
                    }.bind(this));
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
                    default: 0,
                    fn_change: function (e) {
                        //var value = $(e.currentTarget).val();
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
                        this.view_button_container('id_operator', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('id_limiting_loading', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('arrival_condition', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('current_condition', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('id_arrival_cargo', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('id_arrival_cargo_group', val.length > 0);
                        this.update_view(function () {
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
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        //var form_select_wagon_rod = {
        //    obj: 'bs_form_wagon_rod',
        //    options: {
        //        validation_group: 'common_obrwc',
        //        id: 'wagon_rod',
        //        name: 'wagon_rod',
        //        label: langView('vr_obrwc_title_label_wagon_rod', App.Langs),
        //        element_fsize: 'sm',
        //        element_class: null,
        //        element_value: null,
        //        element_multiple: true,
        //        element_title: null,
        //        element_required: false,
        //        element_readonly: false,
        //        element_size: null,
        //        element_options: {
        //            data: [],
        //            default: -1,
        //            fn_change: function (e, val) {
        //                e.preventDefault();
        //            }.bind(this),
        //            fn_check: function (e, val) {

        //            }.bind(this),
        //        },
        //        validation: false,
        //        feedback_invalid: null,
        //        feedback_valid: null,
        //        feedback_class: null,
        //        col_prefix: 'md',
        //        col_size: 12,
        //        col_class: 'mt-0',
        //    },
        //    childs: []
        //};
        //var form_select_wagon_type = {
        //    obj: 'bs_form_wagon_rod',
        //    options: {
        //        validation_group: 'common_obrwc',
        //        id: 'wagon_type',
        //        name: 'wagon_type',
        //        label: langView('vr_obrwc_title_label_wagon_type', App.Langs),
        //        element_fsize: 'sm',
        //        element_class: null,
        //        element_value: null,
        //        element_multiple: true,
        //        element_title: null,
        //        element_required: false,
        //        element_readonly: false,
        //        element_size: null,
        //        element_options: {
        //            data: [],
        //            default: -1,
        //            fn_change: function (e, val) {
        //                e.preventDefault();
        //            }.bind(this),
        //            fn_check: function (e, val) {

        //            }.bind(this),
        //        },
        //        validation: false,
        //        feedback_invalid: null,
        //        feedback_valid: null,
        //        feedback_class: null,
        //        col_prefix: 'md',
        //        col_size: 12,
        //        col_class: 'mt-0',
        //    },
        //    childs: []
        //};

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
                        this.view_button_container('id_sertification_data', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('station_from_code', val.length > 0);
                        this.update_view(function () {
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
                col_size: 12,
                col_class: 'mt-0',
            },
            childs: []
        };
        var form_select_arrival_division_amkr = {
            obj: 'bs_form_select_multiple',
            options: {
                validation_group: 'common_obrwc',
                id: 'arrival_division_amkr',
                name: 'arrival_division_amkr',
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
                        this.view_button_container('arrival_division_amkr', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('view_cargo_name', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('view_external_station_on', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('view_division_from', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('view_division_on', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('loading_status', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('id_operation', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('id_station', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('view_type_way', val.length > 0);
                        this.update_view(function () {
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
                        this.view_button_container('view_name_way', val.length > 0);
                        this.update_view(function () {
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
        //objs_obrwc_setup.push(form_select_wagon_rod);
        //objs_obrwc_setup.push(form_select_wagon_type);
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

        this.select_data = []; // выборка 

        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_rep_operating_balance_rw_cars] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // Отобразить элемент выбора селект
    view_rep_operating_balance_rw_cars.prototype.view_button_container = function (id, selected) {
        if (selected) {
            $('div#' + id + '-button-container button').addClass('btn btn-outline-success');
        } else {
            $('div#' + id + '-button-container button').removeClass('btn btn-outline-success');
        }
    };
    // загрузить и показать
    view_rep_operating_balance_rw_cars.prototype.view = function (callback) {
        this.clear_all();
        this.load(function (wagons) {
            this.vr_obrwc.view(wagons);
            if (typeof callback === 'function') {
                LockScreenOff();
                callback(wagons);
            }
        }.bind(this));
    };
    // выбрать и показать
    view_rep_operating_balance_rw_cars.prototype.update_view = function (callback) {
        this.clear_all();
        LockScreen(langView('vr_obrwc_where', App.Langs));

        setTimeout(function () {
            this.where_select_list(this.wagons, function (wagons) {
                this.update_select_list(wagons, function (wagons) {
                    this.vr_obrwc.view(wagons);
                    if (typeof callback === 'function') {
                        callback(wagons);
                    }
                }.bind(this)); // обновим списки
            }.bind(this)); // обновим списки
        }.bind(this), 0);




    };
    // Загрузить отчет
    view_rep_operating_balance_rw_cars.prototype.load = function (callback) {
        LockScreen(langView('vr_obrwc_load', App.Langs).format(moment().format(format_datetime_ru)));
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
                // определим время выполнения
                stop_load = moment();
                diffTime = moment(stop_load).diff(start);
                var duration = moment.duration(diffTime);
                var years = duration.years();
                var days = duration.days();
                var months = duration.months();
                var hrs = duration.hours();
                var mins = duration.minutes();
                var secs = duration.seconds();
                // отобразим время выполнения
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
                this.clear_select_element();
                this.where_select_list(this.wagons, function (wagons) {
                    this.update_select_list(wagons, function (wagons) {
                        if (typeof callback === 'function') {
                            callback(wagons);
                        }
                    }.bind(this)); // обновим списки
                }.bind(this)); // обновим списки
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
    // Обновим элемиент списка
    view_rep_operating_balance_rw_cars.prototype.update_element_list = function (list, el, fvalue, ftext, disabled) {
        if (list && el && fvalue && ftext) {
            var obj = list.find(function (o) {
                //return (el[fvalue] !== null && o.value === el[fvalue]) || el[fvalue] === null && o.value === null;
                return o.value === el[fvalue];
            }.bind(this));
            if (!obj) {
                list.push({ value: el[fvalue], text: el[fvalue] !== null ? el[ftext] : '[пустой]', disabled: disabled ? disabled : false });
                //list.push({ value: el[fvalue], text: el[ftext], disabled: disabled ? disabled : false });
            }
        }
    };
    // Обновим элемиент списка
    view_rep_operating_balance_rw_cars.prototype.where_element_list = function (element, fvalue) {
        if (element !== null) {
            var val = element.val();
            if (val.length > 0) {
                this.select_data = this.select_data.filter(function (i) {
                    var res = i[fvalue] !== null ? String(i[fvalue]) : "[пустой]";
                    return val.indexOf(res) >= 0;
                }.bind(this));
            }
        }
    };
    // Обновить списки
    view_rep_operating_balance_rw_cars.prototype.update_select_list = function (data, callback) {
        var list_operators = [];
        var list_limiting_loading = [];
        var list_arrival_condition = [];
        var list_current_condition = [];
        var list_arrival_cargo = [];
        var list_arrival_cargo_group = [];
        var list_sertification_data = [];
        var list_station_from_code = [];
        var list_arrival_division_amkr = [];
        var list_view_cargo_name = [];
        var list_view_external_station_on = [];
        var list_view_division_from = [];
        var list_view_division_on = [];
        var list_loading_status = [];
        var list_operation = [];
        var list_station = [];
        var list_view_type_way = [];
        var list_view_name_way = [];

        var id_operator = this.form_obrwc_setup.el.select_id_operator.val();
        var id_limiting_loading = this.form_obrwc_setup.el.select_id_limiting_loading.val();
        var arrival_condition = this.form_obrwc_setup.el.select_arrival_condition.val();
        var current_condition = this.form_obrwc_setup.el.select_current_condition.val();
        var id_arrival_cargo = this.form_obrwc_setup.el.select_id_arrival_cargo.val();
        var id_arrival_cargo_group = this.form_obrwc_setup.el.select_id_arrival_cargo_group.val();
        var id_sertification_data = this.form_obrwc_setup.el.select_id_sertification_data.val();
        var station_from_code = this.form_obrwc_setup.el.select_station_from_code.val();
        var arrival_division_amkr = this.form_obrwc_setup.el.select_arrival_division_amkr.val();
        var view_cargo_name = this.form_obrwc_setup.el.select_view_cargo_name.val();
        var view_external_station_on = this.form_obrwc_setup.el.select_view_external_station_on.val();
        var view_division_from = this.form_obrwc_setup.el.select_view_division_from.val();
        var view_division_on = this.form_obrwc_setup.el.select_view_division_on.val();
        var loading_status = this.form_obrwc_setup.el.select_loading_status.val();
        var id_operation = this.form_obrwc_setup.el.select_id_operation.val();
        var id_station = this.form_obrwc_setup.el.select_id_station.val();
        var view_type_way = this.form_obrwc_setup.el.select_view_type_way.val();
        var view_name_way = this.form_obrwc_setup.el.select_view_name_way.val();

        if (data && data.length > 0) {
            $.each(data, function (i, el) {
                this.update_element_list(list_operators, el, 'idOperator', 'operatorAbbr' + ucFirst(App.Lang));
                this.update_element_list(list_limiting_loading, el, 'idLimitingLoading', 'limitingAbbr' + ucFirst(App.Lang));
                this.update_element_list(list_arrival_condition, el, 'arrivalIdCondition', 'arrivalConditionAbbr' + ucFirst(App.Lang));
                this.update_element_list(list_current_condition, el, 'currentIdCondition', 'currentConditionAbbr' + ucFirst(App.Lang));
                this.update_element_list(list_arrival_cargo, el, 'arrivalIdCargo', 'arrivalCargoName' + ucFirst(App.Lang));
                this.update_element_list(list_arrival_cargo_group, el, 'arrivalIdCargoGroup', 'arrivalCargoGroupName' + ucFirst(App.Lang));
                this.update_element_list(list_sertification_data, el, 'arrivalIdSertificationData', 'arrivalSertificationData' + ucFirst(App.Lang));
                this.update_element_list(list_station_from_code, el, 'arrivalStationFromCode', 'arrivalStationFromName' + ucFirst(App.Lang));
                this.update_element_list(list_arrival_division_amkr, el, 'arrivalIdStationAmkr', 'arrivalStationAmkrAbbr' + ucFirst(App.Lang));
                this.update_element_list(list_view_cargo_name, el, 'viewCargoName' + ucFirst(App.Lang), 'viewCargoName' + ucFirst(App.Lang));
                this.update_element_list(list_view_external_station_on, el, 'viewExternalStationOnName' + ucFirst(App.Lang), 'viewExternalStationOnName' + ucFirst(App.Lang));
                this.update_element_list(list_view_division_from, el, 'viewDivisionFromAbbr' + ucFirst(App.Lang), 'viewDivisionFromAbbr' + ucFirst(App.Lang));
                this.update_element_list(list_view_division_on, el, 'viewDivisionOnAbbr' + ucFirst(App.Lang), 'viewDivisionOnAbbr' + ucFirst(App.Lang));
                this.update_element_list(list_loading_status, el, 'idLoadingStatus', 'loadingStatus' + ucFirst(App.Lang));
                this.update_element_list(list_operation, el, 'idOperation', 'operationName' + ucFirst(App.Lang));
                this.update_element_list(list_station, el, 'idStationAmkr', 'stationAmkrAbbr' + ucFirst(App.Lang));
                // Определим тип пути (с переводом)
                var obj = list_view_type_way.find(function (o) {
                    return o.value === el.viewTypeWay;
                }.bind(this));
                if (!obj) {
                    list_view_type_way.push({ value: el.viewTypeWay, text: langView('vr_obrwc_field_view_type_way_' + el.viewTypeWay, App.Langs), disabled: false });
                }

                var obj1 = list_view_name_way.find(function (o) {
                    return o.value === el['viewNameWay' + ucFirst(App.Lang)];
                }.bind(this));
                if (!obj1) {
                    list_view_name_way.push({ value: el['viewNameWay' + ucFirst(App.Lang)], text: el['stationAmkrAbbr' + ucFirst(App.Lang)] + ' : ' + el['viewNameWay' + ucFirst(App.Lang)], group: el.idStationAmkr, disabled: false });
                }
            }.bind(this));
            // Списки по возрастанию
            list_operators = list_operators.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_limiting_loading = list_limiting_loading.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_arrival_condition = list_arrival_condition.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_current_condition = list_current_condition.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_arrival_cargo = list_arrival_cargo.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_arrival_cargo_group = list_arrival_cargo_group.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_sertification_data = list_sertification_data.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_station_from_code = list_station_from_code.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_arrival_division_amkr = list_arrival_division_amkr.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_view_cargo_name = list_view_cargo_name.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_view_external_station_on = list_view_external_station_on.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_view_division_from = list_view_division_from.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_view_division_on = list_view_division_on.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_loading_status = list_loading_status.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_operation = list_operation.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_station = list_station.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_view_type_way = list_view_type_way.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
            list_view_name_way = list_view_name_way.sort(function (a, b) { return a.text.localeCompare(b.text); }.bind(this));
        }
        this.form_obrwc_setup.el.select_id_operator.update(list_operators, id_operator.length > 0 ? id_operator : -1);
        if (list_operators.length === 0) $('div#id_operator-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_id_limiting_loading.update(list_limiting_loading, id_limiting_loading.length > 0 ? id_limiting_loading : -1);
        if (list_limiting_loading.length === 0) $('div#id_limiting_loading-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_arrival_condition.update(list_arrival_condition, arrival_condition.length > 0 ? arrival_condition : -1);
        if (list_arrival_condition.length === 0) $('div#arrival_condition-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_current_condition.update(list_current_condition, current_condition.length > 0 ? current_condition : -1);
        if (list_current_condition.length === 0) $('div#current_condition-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_id_arrival_cargo.update(list_arrival_cargo, id_arrival_cargo.length > 0 ? id_arrival_cargo : -1);
        if (list_arrival_cargo.length === 0) $('div#id_arrival_cargo-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_id_arrival_cargo_group.update(list_arrival_cargo_group, id_arrival_cargo_group.length > 0 ? id_arrival_cargo_group : -1);
        if (list_arrival_cargo_group.length === 0) $('div#id_arrival_cargo_group-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_id_sertification_data.update(list_sertification_data, id_sertification_data.length > 0 ? id_sertification_data : -1);
        if (list_sertification_data.length === 0) $('div#id_sertification_data-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_station_from_code.update(list_station_from_code, station_from_code.length > 0 ? station_from_code : -1);
        if (list_station_from_code.length === 0) $('div#station_from_code-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_arrival_division_amkr.update(list_arrival_division_amkr, arrival_division_amkr.length > 0 ? arrival_division_amkr : -1);
        if (list_arrival_division_amkr.length === 0) $('div#arrival_division_amkr-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_view_cargo_name.update(list_view_cargo_name, view_cargo_name.length > 0 ? view_cargo_name : -1);
        if (list_view_cargo_name.length === 0) $('div#view_cargo_name-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_view_external_station_on.update(list_view_external_station_on, view_external_station_on.length > 0 ? view_external_station_on : -1);
        if (list_view_external_station_on.length === 0) $('div#view_external_station_on-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_view_division_from.update(list_view_division_from, view_division_from.length > 0 ? view_division_from : -1);
        if (list_view_division_from.length === 0) $('div#view_division_from-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_view_division_on.update(list_view_division_on, view_division_on.length > 0 ? view_division_on : -1);
        if (list_view_division_on.length === 0) $('div#view_division_on-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_loading_status.update(list_loading_status, loading_status.length > 0 ? loading_status : -1);
        if (list_loading_status.length === 0) $('div#loading_status-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_id_operation.update(list_operation, id_operation.length > 0 ? id_operation : -1);
        if (list_operation.length === 0) $('div#id_operation-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_id_station.update(list_station, id_station.length > 0 ? id_station : -1);
        if (list_station.length === 0) $('div#id_station-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_view_type_way.update(list_view_type_way, view_type_way.length > 0 ? view_type_way : -1);
        if (list_view_type_way.length === 0) $('div#view_type_way-button-container button').removeClass('btn btn-outline-success');
        this.form_obrwc_setup.el.select_view_name_way.update(list_view_name_way.sort(function (a, b) {
            return a.group - b.group;
        }.bind(this)), view_name_way.length > 0 ? view_name_way : -1);
        if (typeof callback === 'function') {
            callback(data); // вернем выборку
        }
        if (list_view_name_way.length === 0) $('div#view_name_way-button-container button').removeClass('btn btn-outline-success');
    };
    // Сделаем выборку
    view_rep_operating_balance_rw_cars.prototype.where_select_list = function (data, callback) {
        if (data && data.length > 0) {
            this.select_data = data;

            var external_wagon = this.form_obrwc_setup.el.input_checkbox_external_wagon.val(); //.prop('checked');
            var external_wagon_amkr = this.form_obrwc_setup.el.input_checkbox_external_wagon_amkr.val();
            var wagon_amkr_vz = this.form_obrwc_setup.el.input_checkbox_wagon_amkr_vz.val();
            var wagon_klient = this.form_obrwc_setup.el.input_checkbox_wagon_klient.val();
            var wagon_outgoing = this.form_obrwc_setup.el.input_checkbox_wagon_outgoing.val();
            var wagon_cisterna_amkr = this.form_obrwc_setup.el.input_checkbox_wagon_cisterna_amkr.val();

            if (!external_wagon || !external_wagon_amkr || !wagon_amkr_vz || !wagon_klient || !wagon_outgoing || !wagon_cisterna_amkr) {
                this.select_data = this.select_data.filter(function (i) {

                    return (external_wagon && i.operatorGroup === null && !i.arrivalKlient && i.outgoingDate === null)
                        || (external_wagon && wagon_klient && i.operatorGroup === null && i.arrivalKlient && i.outgoingDate === null)
                        || (external_wagon && wagon_outgoing && i.operatorGroup === null && !i.arrivalKlient && i.outgoingDate !== null)

                        || (external_wagon_amkr && i.operatorGroup === 'amkr' && !i.arrivalKlient && i.outgoingDate === null)
                        || (external_wagon_amkr && wagon_klient && i.operatorGroup === 'amkr' && i.arrivalKlient && i.outgoingDate === null)
                        || (external_wagon_amkr && wagon_outgoing && i.operatorGroup === 'amkr' && !i.arrivalKlient && i.outgoingDate !== null)

                        || (wagon_cisterna_amkr && i.operatorGroup === 'cisterns' && !i.arrivalKlient && i.outgoingDate === null)
                        || (wagon_cisterna_amkr && wagon_klient && i.operatorGroup === 'cisterns' && i.arrivalKlient && i.outgoingDate === null)
                        || (wagon_cisterna_amkr && wagon_outgoing && i.operatorGroup === 'cisterns' && !i.arrivalKlient && i.outgoingDate !== null)

                        || (wagon_amkr_vz && i.operatorGroup === 'amkr_vz' && !i.arrivalKlient && i.outgoingDate === null)
                        || (wagon_amkr_vz && wagon_klient && i.operatorGroup === 'amkr_vz' && i.arrivalKlient && i.outgoingDate === null)
                        || (wagon_amkr_vz && wagon_outgoing && i.operatorGroup === 'amkr_vz' && !i.arrivalKlient && i.outgoingDate !== null)

                        || (!external_wagon && !external_wagon_amkr && !wagon_amkr_vz && !wagon_cisterna_amkr && wagon_klient && i.arrivalKlient)
                        || (!external_wagon && !external_wagon_amkr && !wagon_amkr_vz && !wagon_cisterna_amkr && wagon_outgoing && i.outgoingDate !== null)
                        ;
                }.bind(this));
            }
            this.where_element_list(this.form_obrwc_setup.el.select_id_operator, 'idOperator');
            this.where_element_list(this.form_obrwc_setup.el.select_id_limiting_loading, 'idLimitingLoading');
            this.where_element_list(this.form_obrwc_setup.el.select_arrival_condition, 'arrivalIdCondition');
            this.where_element_list(this.form_obrwc_setup.el.select_current_condition, 'currentIdCondition');
            this.where_element_list(this.form_obrwc_setup.el.select_id_arrival_cargo, 'arrivalIdCargo');
            this.where_element_list(this.form_obrwc_setup.el.select_id_arrival_cargo_group, 'arrivalIdCargoGroup');
            this.where_element_list(this.form_obrwc_setup.el.select_id_sertification_data, 'arrivalIdSertificationData');
            this.where_element_list(this.form_obrwc_setup.el.select_station_from_code, 'arrivalStationFromCode');
            this.where_element_list(this.form_obrwc_setup.el.select_arrival_division_amkr, 'arrivalIdStationAmkr');
            this.where_element_list(this.form_obrwc_setup.el.select_view_cargo_name, 'viewCargoName' + ucFirst(App.Lang));
            this.where_element_list(this.form_obrwc_setup.el.select_view_external_station_on, 'viewExternalStationOnName' + ucFirst(App.Lang));
            this.where_element_list(this.form_obrwc_setup.el.select_view_division_from, 'viewDivisionFromAbbr' + ucFirst(App.Lang));
            this.where_element_list(this.form_obrwc_setup.el.select_view_division_on, 'viewDivisionOnAbbr' + ucFirst(App.Lang));
            this.where_element_list(this.form_obrwc_setup.el.select_loading_status, 'idLoadingStatus');
            this.where_element_list(this.form_obrwc_setup.el.select_id_operation, 'idOperation');
            this.where_element_list(this.form_obrwc_setup.el.select_id_station, 'idStationAmkr');
            var val = this.form_obrwc_setup.el.select_view_type_way.val();
            if (val.length > 0) {
                this.select_data = this.select_data.filter(function (i) {
                    var res = i.viewTypeWay;
                    return val.indexOf(res) >= 0;
                }.bind(this));
            }
            this.where_element_list(this.form_obrwc_setup.el.select_view_name_way, 'viewNameWay' + ucFirst(App.Lang));

            if (typeof callback === 'function') {
                callback(this.select_data); // вернем выборку
            }
        } else {
            this.select_data = [];
            if (typeof callback === 'function') {
                callback(this.select_data); // вернем выборку
            }
        }
    };
    // Сбросим элементы выбора
    view_rep_operating_balance_rw_cars.prototype.clear_select_element = function () {
        this.form_obrwc_setup.el.input_checkbox_external_wagon.val(true);
        this.form_obrwc_setup.el.input_checkbox_external_wagon_amkr.val(true);
        this.form_obrwc_setup.el.input_checkbox_wagon_amkr_vz.val(true);
        this.form_obrwc_setup.el.input_checkbox_wagon_klient.val(true);
        this.form_obrwc_setup.el.input_checkbox_wagon_outgoing.val(true);
        this.form_obrwc_setup.el.input_checkbox_wagon_cisterna_amkr.val(true);

        this.form_obrwc_setup.el.select_id_operator.val(-1);
        this.form_obrwc_setup.el.select_id_limiting_loading.val(-1);
        this.form_obrwc_setup.el.select_arrival_condition.val(-1);
        this.form_obrwc_setup.el.select_current_condition.val(-1);
        this.form_obrwc_setup.el.select_id_arrival_cargo.val(-1);
        this.form_obrwc_setup.el.select_id_arrival_cargo_group.val(-1);
        this.form_obrwc_setup.el.select_id_sertification_data.val(-1);
        this.form_obrwc_setup.el.select_station_from_code.val(-1);
        this.form_obrwc_setup.el.select_arrival_division_amkr.val(-1);
        this.form_obrwc_setup.el.select_view_cargo_name.val(-1);
        this.form_obrwc_setup.el.select_view_external_station_on.val(-1);
        this.form_obrwc_setup.el.select_view_division_from.val(-1);
        this.form_obrwc_setup.el.select_view_division_on.val(-1);
        this.form_obrwc_setup.el.select_loading_status.val(-1);
        this.form_obrwc_setup.el.select_id_operation.val(-1);
        this.form_obrwc_setup.el.select_id_station.val(-1);
        this.form_obrwc_setup.el.select_view_type_way.val(-1);
        this.form_obrwc_setup.el.select_view_name_way.val(-1);
        this.form_obrwc_setup.el.input_text_over_day.val(0);
        this.form_obrwc_setup.el.input_text_not_moved.val(0);

        $('div#id_operator-button-container button').removeClass('btn btn-outline-success');
        $('div#id_limiting_loading-button-container button').removeClass('btn btn-outline-success');
        $('div#arrival_condition-button-container button').removeClass('btn btn-outline-success');
        $('div#current_condition-button-container button').removeClass('btn btn-outline-success');
        $('div#id_arrival_cargo-button-container button').removeClass('btn btn-outline-success');
        $('div#id_arrival_cargo_group-button-container button').removeClass('btn btn-outline-success');
        $('div#id_sertification_data-button-container button').removeClass('btn btn-outline-success');
        $('div#station_from_code-button-container button').removeClass('btn btn-outline-success');
        $('div#arrival_division_amkr-button-container button').removeClass('btn btn-outline-success');
        $('div#view_cargo_name-button-container button').removeClass('btn btn-outline-success');
        $('div#view_external_station_on-button-container button').removeClass('btn btn-outline-success');
        $('div#view_division_from-button-container button').removeClass('btn btn-outline-success');
        $('div#view_division_on-button-container button').removeClass('btn btn-outline-success');
        $('div#loading_status-button-container button').removeClass('btn btn-outline-success');
        $('div#id_operation-button-container button').removeClass('btn btn-outline-success');
        $('div#id_station-button-container button').removeClass('btn btn-outline-success');
        $('div#view_type_way-button-container button').removeClass('btn btn-outline-success');
        $('div#view_name_way-button-container button').removeClass('btn btn-outline-success');
    };

    view_rep_operating_balance_rw_cars.prototype.clear_select = function (callback) {
        LockScreen(langView('vr_obrwc_clear', App.Langs).format(moment().format(format_datetime_ru)));
        this.clear_select_element();
        // сбросим
        setTimeout(function () {
            this.select_data = this.wagons;
            this.update_select_list(this.select_data, function (wagons) {
                this.vr_obrwc.view(wagons);
                if (typeof callback === 'function') {
                    callback(wagons);
                }
            }.bind(this)); // обновим списки
        }.bind(this), 0);
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