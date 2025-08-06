/* ===============================================
-= Модуль сервис инструктивные письма =-
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
            'vs_ilet_card_header_card_services': 'ИНСТРУКТИВНЫЕ ПИСЬМА',
            'vs_ilet_card_header_list_of_letters': 'ПЕРЕЧЕНЬ ПИСЕМ',

            'vs_ilet_mess_init_module': 'Инициализация модуля view_instructional_letters',
            //'vs_ilet_mess_load_operation': 'Загружаю форму операции',

            'vs_ilet_title_button_lett_num_clear': 'Очистить',
            'vs_ilet_title_button_lett_num_searsh': 'Поиск по № письма',
            'vs_ilet_title_button_lett_wagon_clear': 'Очистить',
            'vs_ilet_title_button_lett_wagon_searsh': 'Поиск по № вагона в письме',

            'vs_ilet_title_placeholder_lett_num_searsh': 'Поиск по № письма',
            'vs_ilet_text_lett_num_searsh': 'Введите № письма, разделитель ";"',
            'vs_ilet_title_placeholder_lett_wagon_searsh': 'Поиск по № вагона в письме',
            'vs_ilet_text_lett_wagon_searsh': 'Введите № вагона, разделитель ";"',

            'vs_ilet_title_label_create_new': 'Созданные письма',
            'vs_ilet_title_label_in_progress': 'Письма в работе',
            'vs_ilet_title_label_done': 'Письма выполненные',
            'vs_ilet_title_label_replacement': 'Письма заменённые',
            'vs_ilet_title_label_canceled': 'Письма отменённые',

            //'vs_ilet_title_label_presented1': 'Предъявлено:',
            //'vs_ilet_title_placeholder_presented1': '№ Акта',
            //'vs_ilet_text_label_presented1': 'Укажите № акта ...',
            //'vs_ilet_title_label_presented2': 'Предъявлено:',
            //'vs_ilet_title_placeholder_presented2': '№ Акта',
            //'vs_ilet_text_label_presented2': 'Укажите № акта ...',
            //'vs_ilet_title_label_presented3': 'Предъявлено:',
            //'vs_ilet_title_placeholder_presented3': '№ Акта',
            //'vs_ilet_text_label_presented3': 'Укажите № акта ...',

            //'vs_ilet_title_label_payer': 'Плательщик:',
            //'vs_ilet_text_label_payer': 'Выберите плательщика ...',

            //'vs_ilet_title_label_act': 'Акт №:',
            //'vs_ilet_title_placeholder_act': '№ Акта',
            //'vs_ilet_text_label_act': 'Выберите № акта ...',

            //'vs_ilet_title_label_cargo': 'груз ПРИБ:',
            //'vs_ilet_text_label_cargo': 'Выберите груз ...',

            //'vs_ilet_title_label_station_from': 'Станция отправления:',
            //'vs_ilet_text_label_station_from': 'Выберите станцию ...',

            //'vs_ilet_title_label_station_on': 'Станция прибытия:',
            //'vs_ilet_text_label_station_on': 'Выберите станцию ...',

            //'vs_ilet_title_label_operator': 'Оператор АМКР:',
            //'vs_ilet_text_label_operator': 'Выберите оператора ...',

            //'vs_ilet_title_button_presented1': 'Править акт ...',
            //'vs_ilet_title_button_presented2': 'Править акт ...',
            //'vs_ilet_title_button_presented3': 'Править акт ...',
            //'vs_ilet_title_button_clear': 'очистить акт ...',

            'vs_ilet_title_button_Cancel': 'Отмена',
            'vs_ilet_button_Ok': 'Применить',

            //'vs_ilet_title_form_apply': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ',

            //'vs_ilet_mess_run_update_presented': 'Выполнить "СВЕРКУ НАКЛАДНЫХ", будет внесен в поле {0}, акт сверки № {1} по всем накладным [{2}].',
            //'vs_ilet_mess_run_clear_presented': 'Выполнить очистку акта сверки в поле {0}, по всем накладным [{1}].',

            //'vs_ilet_mess_ok_update_presented': 'По накладным [{0}] выполнена "СВЕРКА НАКЛАДНЫХ", Акт сверки [{1}].',
            //'vs_ilet_mess_ok_clear_presented': 'По накладным [{0}] были сброшены акты сверки.',
            //'vs_ilet_mess_error_update_presented': 'При выполнении "СВЕРКИ НАКЛАДНЫХ" [{0}], - произошла ошибка. Код ошибки {1}',
            //'vs_ilet_cancel_update_presented': 'Отмена "СВЕРКИ НАКЛАДНЫХ"',

            'vs_ilet_load_litters': 'Загружаю письма за период...',
            'vs_ilet_update_letters': 'Обновляю письма за период...',
            'vs_ilet_select_letters': 'Поиск писем согласно выбора...',

            'vs_ilet_mess_info_init': 'Выберите период и дату и нажмите кнопку [Выбрать]',
            'vs_ilet_mess_info_searsh_letters': 'За период c {0} по {1}, найдено {2} инструктивных писем.',
            'vs_ilet_mess_info_select_letters': 'За период c {0} по {1}, найдено {2} инструктивных писем, выбрано {3}',

            //'vs_ilet_mess_war_not_select_docs': 'Не выбраны накладные для сверки!',
            //'vs_ilet_mess_error_not_presented': 'Укажите № Акта сверки',

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
    function view_instructional_letters(selector) {
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
    view_instructional_letters.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_instructional_letters');
        LockScreen(langView('vs_ilet_mess_init_module', App.Langs));
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
            bt_close_text: langView('vs_ilet_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vs_ilet_button_Ok', App.Langs),
        });


        this.start = null;
        this.stop = null;

        //this.list_vagons = [];
        //this.select_vagons = [];
        //this.code_payer = -1;
        //this.act = '';
        //this.id_cargo = -1;
        //this.code_station_from = -1;
        //this.code_station_on = -1;
        //this.id_operator = -1;

        //this.select_document_detali = [];
        //this.presented = null;
        //this.clear = false;

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
        // Создать макет панели (Инструктивных писем)
        this.card_services = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 mt-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_ilet_card_header_card_services', App.Langs),
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
            size: 4,
        }); // Окно настроек
        this.div_form_searsh = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 8,
        }); // Окно выбора

        row.$html.append(this.div_form_period.$html).append(this.div_form_searsh.$html);
        this.card_services.body.$html.append(row.$html);

        this.alert_info = new this.fe_ui.bs_alert({
            id: 'alert-info',
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.div_form_searsh.$html.append(this.alert_info.$html);
        this.info_alert = new ALERT(this.alert_info.$html);

        // Создать макет панели (список писем)
        this.list_of_letters = new this.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'm-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vs_ilet_card_header_list_of_letters', App.Langs),
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
        this.list_of_letters_setup = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.list_of_letters_table = new this.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert list_of_letters
        this.alert_list_of_letters = new this.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.list_of_letters_table.$html.append(this.alert_list_of_letters.$html);
        this.list_of_letters_alert = new ALERT(this.alert_list_of_letters.$html);
        row.$html.append(this.list_of_letters_setup.$html).append(this.list_of_letters_table.$html);

        this.list_of_letters.body.$html.append(row.$html);

        this.$main.append(this.card_services.$html.append(this.list_of_letters.$html));
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
                        this.list_of_letters_setup.$html.append(this.form_letters_setup.$form);
                        this.info_alert.out_info_message(langView('vs_ilet_mess_info_init', App.Langs));
                        // На проверку окончания инициализации
                        //----------------------------------
                        this.update(moment().subtract(3, "year"), moment(), function () {
                            //LockScreenOff();
                            if (typeof this.settings.fn_init === 'function') {
                                console.log('Close view_instructional_letters');
                                this.settings.fn_init(this.result_init);
                            }
                        }.bind(this));
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
                    apply_text: langView('vs_ilet_load_litters', App.Langs), //
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

                // форма детального выбора писем
                this.form_letters_setup = new FD();

                var objs_lett_setup = [];

                var form_check_create_new = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'common_lett',
                        id: 'create_new',
                        name: 'create_new',
                        label: langView('vs_ilet_title_label_create_new', App.Langs),
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
                                //this.update_view(function () {
                                //    LockScreenOff();
                                //}.bind(this));
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
                var form_check_in_progress = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'common_lett',
                        id: 'in_progress',
                        name: 'in_progress',
                        label: langView('vs_ilet_title_label_in_progress', App.Langs),
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
                                //this.update_view(function () {
                                //    LockScreenOff();
                                //}.bind(this));
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
                var form_check_done = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'common_lett',
                        id: 'done',
                        name: 'done',
                        label: langView('vs_ilet_title_label_done', App.Langs),
                        element_type: 'checkbox',
                        element_switch: true,
                        element_inline: false,
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_checked: false,
                        element_required: false,
                        element_readonly: false,
                        element_options: {
                            default: false,
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).prop('checked');
                                //this.update_view(function () {
                                //    LockScreenOff();
                                //}.bind(this));
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
                var form_check_replacement = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'common_lett',
                        id: 'replacement',
                        name: 'replacement',
                        label: langView('vs_ilet_title_label_replacement', App.Langs),
                        element_type: 'checkbox',
                        element_switch: true,
                        element_inline: false,
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_checked: false,
                        element_required: false,
                        element_readonly: false,
                        element_options: {
                            default: false,
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).prop('checked');
                                //this.update_view(function () {
                                //    LockScreenOff();
                                //}.bind(this));
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
                var form_check_canceled = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'common_lett',
                        id: 'canceled',
                        name: 'canceled',
                        label: langView('vs_ilet_title_label_canceled', App.Langs),
                        element_type: 'checkbox',
                        element_switch: true,
                        element_inline: false,
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_checked: false,
                        element_required: false,
                        element_readonly: false,
                        element_options: {
                            default: false,
                            fn_change: function (e) {
                                //var value = $(e.currentTarget).prop('checked');
                                //this.update_view(function () {
                                //    LockScreenOff();
                                //}.bind(this));
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
                var bt_append_lett_num_clear = {
                    obj: 'bs_button',
                    options: {
                        id: 'lett_num_clear',
                        name: 'lett_num_clear',
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_ilet_title_button_lett_num_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom', //<i class="fa-solid fa-broom"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_letters_setup.el.textarea_lett_num.val('');
                            this.select_apply(this.list_letters, function (select_letters) {
                                this.view_select(select_letters);
                                LockScreenOff();
                            }.bind(this));
                        }.bind(this),
                    }
                };
                var bt_append_lett_num_searsh = {
                    obj: 'bs_button',
                    options: {
                        id: 'lett_num_searsh',
                        name: 'lett_num_searsh',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_ilet_title_button_lett_num_searsh', App.Langs),
                        icon_fa_left: 'fas fa-search',
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.select_apply(this.list_letters, function (select_letters) {
                                this.view_select(select_letters);
                                LockScreenOff();
                            }.bind(this));
                        }.bind(this),
                    }
                };
                var form_textarea_lett_num = {
                    obj: 'bs_form_textarea',
                    options: {
                        validation_group: 'common_lett',
                        id: 'lett_num',
                        name: 'lett_num',
                        //label: langView('voprc_title_vagon_searsh', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_lett_num_searsh', App.Langs),
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
                        col_size: 12,
                        col_class: 'row',
                        group_append_class: null,
                        group_append_id: null,
                        /*                        group_append_html: langView('vopcgr_text_append_vagon_searsh', App.Langs),*/
                        group_append_objs: [bt_append_lett_num_clear, bt_append_lett_num_searsh],
                        form_text: langView('vs_ilet_text_lett_num_searsh', App.Langs),
                        form_text_class: null
                    },
                    childs: []
                };

                var bt_append_lett_wagon_clear = {
                    obj: 'bs_button',
                    options: {
                        id: 'lett_wagon_clear',
                        name: 'lett_wagon_clear',
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_ilet_title_button_lett_wagon_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom', //<i class="fa-solid fa-broom"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_letters_setup.el.textarea_lett_wagon.val('');
                            this.select_apply(this.list_letters, function (select_letters) {
                                this.view_select(select_letters);
                                LockScreenOff();
                            }.bind(this));
                        }.bind(this),
                    }
                };
                var bt_append_lett_wagon_searsh = {
                    obj: 'bs_button',
                    options: {
                        id: 'lett_wagon_searsh',
                        name: 'lett_wagon_searsh',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_ilet_title_button_lett_wagon_searsh', App.Langs),
                        icon_fa_left: 'fas fa-search',
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.select_apply(this.list_letters, function (select_letters) {
                                this.view_select(select_letters);
                                LockScreenOff();
                            }.bind(this));
                        }.bind(this),
                    }
                };
                var form_textarea_lett_wagon = {
                    obj: 'bs_form_textarea',
                    options: {
                        validation_group: 'common_lett',
                        id: 'lett_wagon',
                        name: 'lett_wagon',
                        //label: langView('voprc_title_vagon_searsh', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_lett_wagon_searsh', App.Langs),
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
                        col_size: 12,
                        col_class: 'row',
                        group_append_class: null,
                        group_append_id: null,
                        /*                        group_append_html: langView('vopcgr_text_append_vagon_searsh', App.Langs),*/
                        group_append_objs: [bt_append_lett_wagon_clear, bt_append_lett_wagon_searsh],
                        form_text: langView('vs_ilet_text_lett_wagon_searsh', App.Langs),
                        form_text_class: null
                    },
                    childs: []
                };

                objs_lett_setup.push(form_check_create_new);
                objs_lett_setup.push(form_check_in_progress);
                objs_lett_setup.push(form_check_done);
                objs_lett_setup.push(form_check_replacement);
                objs_lett_setup.push(form_check_canceled);
                objs_lett_setup.push(form_textarea_lett_num);
                objs_lett_setup.push(form_textarea_lett_wagon);

                this.form_letters_setup.init({
                    alert: this.main_alert,
                    //context: this...$html,
                    objs: objs_lett_setup,
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
                        //row_on_setup.$html.append(this.form_letters_setup.$form);
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( this.tab_list_of_letters)
                var row_list_of_letters = new this.fe_ui.bs_row({ id: 'table-list-of-letters', class: 'pt-2' });
                this.list_of_letters_table.$html.append(row_list_of_letters.$html);

                this.tab_list_of_letters = new TSRV('div#table-list-of-letters');
                this.tab_list_of_letters.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: true,
                    type_report: 'list_letters',
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
                            type_report: 'list_letters_detali',
                            setup_buttons: [
                            ],
                            link_num: false,
                            ids_wsd: null,
                            fn_init: function () {
                                // На проверку окончания инициализации
                                tab.view(data.instructionalLettersWagons);
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
            //console.log('[view_instructional_letters] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    // скрыть элементы выбора
    view_instructional_letters.prototype.disable_form_searsh_doc_setup = function () {
        this.form_searsh_letters.el.textarea_documents_searsh.disable();
        this.form_searsh_letters.el.button_docs_clear.prop("disabled", true);
        this.form_searsh_letters.el.button_docs_searsh.prop("disabled", true);

        this.form_searsh_letters.el.select_code_payer.disable();
        this.form_searsh_letters.el.datalist_acts.disable();
        this.form_searsh_letters.el.select_id_cargo.disable();
        this.form_searsh_letters.el.select_id_station_from.disable();
        this.form_searsh_letters.el.select_id_station_on.disable();
        this.form_searsh_letters.el.select_id_operator.disable();
    };
    // активировать элементы выбора
    view_instructional_letters.prototype.enable_form_searsh_doc_setup = function () {
        this.form_searsh_letters.el.textarea_documents_searsh.enable();
        this.form_searsh_letters.el.button_docs_clear.prop("disabled", false);
        this.form_searsh_letters.el.button_docs_searsh.prop("disabled", false);
        this.form_searsh_letters.el.select_code_payer.enable();
        this.form_searsh_letters.el.datalist_acts.enable();
        this.form_searsh_letters.el.select_id_cargo.enable();
        this.form_searsh_letters.el.select_id_station_from.enable();
        this.form_searsh_letters.el.select_id_station_on.enable();
        this.form_searsh_letters.el.select_id_operator.enable();
    };
    // обновить документы за период
    view_instructional_letters.prototype.update = function (start, stop, callback) {
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
        LockScreen(langView('vs_ilet_update_letters', App.Langs));
        this.info_alert.clear_message();
        this.api_wsd.getViewInstructionalLettersOfPeriod(sel_start, sel_stop, function (letters) {
            if (letters !== null && letters.length > 0) {
                this.list_letters = letters;
                this.select_letters = letters;
                this.select_apply(this.list_letters, function (select_letters) {
                    this.view_select(select_letters);
                    this.info_alert.out_info_message(langView('vs_ilet_mess_info_select_letters', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.list_letters.length, select_letters.length));
                }.bind(this));
            } else {
                this.tab_list_of_letters.view([]);
                this.info_alert.out_info_message(langView('vs_ilet_mess_info_searsh_letters', App.Langs).format(moment(start).format("YYYY-MM-DD HH:mm"), moment(stop).format("YYYY-MM-DD HH:mm"), this.list_letters.length));
            }
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Применить выбор
    view_instructional_letters.prototype.select_apply = function (list_letters, callback) {
        // Обнулим списки
        LockScreen(langView('vs_ilet_select_letters', App.Langs));
        //this.clear_all();
        this.info_alert.clear_message();

        if (list_letters && list_letters.length > 0) {
            this.select_letters = list_letters;

            var create_new = this.form_letters_setup.el.input_checkbox_create_new.val();
            var in_progress = this.form_letters_setup.el.input_checkbox_in_progress.val();
            var done = this.form_letters_setup.el.input_checkbox_done.val();
            var replacement = this.form_letters_setup.el.input_checkbox_replacement.val();
            var canceled = this.form_letters_setup.el.input_checkbox_canceled.val();

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
            //this.info_alert.out_info_message(langView('vs_ilet_mess_info_select_letters', App.Langs).format(moment(this.start).format("YYYY-MM-DD HH:mm"), moment(this.stop).format("YYYY-MM-DD HH:mm"), list_letters.length, this.select_letters.length));

        } else {
            this.select_letters = [];
            //this.info_alert.out_info_message(langView('vs_ilet_mess_info_init', App.Langs));
        }
        // Событие обновили данные
        if (typeof callback === 'function') {
            callback(this.select_letters);
        }
        //if (this.select_document && this.select_document.length > 0) {
        //    this.select_document_detali = this.select_document;
        //    if (this.code_payer != -1) {
        //        this.select_document_detali = this.select_document_detali.filter(function (i) {
        //            return i.payerLocalCode === this.code_payer;
        //        }.bind(this));
        //    }
        //    if (this.act != -1 && this.act !== null && this.act !== "") {
        //        this.select_document_detali = this.select_document_detali.filter(function (i) {
        //            return i.numActServices1 === this.act
        //                || i.numActServices2 === this.act
        //                || i.numActServices3 === this.act
        //        }.bind(this));
        //    }
        //    if (this.id_cargo != -1) {
        //        this.select_document_detali = this.select_document_detali.filter(function (i) {
        //            var gr = i.vagons.find(function (o) { return o.arrivalCargoId === this.id_cargo }.bind(this));
        //            return gr !== undefined;
        //        }.bind(this));
        //    }
        //    if (this.code_station_from != -1) {
        //        this.select_document_detali = this.select_document_detali.filter(function (i) {
        //            return i.codeStnFrom === this.code_station_from;
        //        }.bind(this));
        //    }
        //    if (this.code_station_on != -1) {
        //        this.select_document_detali = this.select_document_detali.filter(function (i) {
        //            return i.codeStnTo === this.code_station_on;
        //        }.bind(this));
        //    }
        //    if (this.id_operator != -1) {
        //        this.select_document_detali = this.select_document_detali.filter(function (i) {
        //            var op = i.vagons.find(function (o) { return o.arrivalOperatorId === this.id_operator }.bind(this));
        //            return op !== undefined;
        //        }.bind(this));
        //    }
        //    this.update_select_list(this.select_document_detali);
        //    this.info_alert.out_info_message(langView('vs_ilet_mess_info_select_main_docs', App.Langs).format(moment(this.start).format("YYYY-MM-DD HH:mm"), moment(this.stop).format("YYYY-MM-DD HH:mm"), this.list_document.length, this.select_document.length));
        //    // Событие обновили данные
        //    if (typeof callback === 'function') {
        //        callback(this.select_document_detali);
        //    }
        //} else {
        //    this.select_document = [];
        //    this.info_alert.out_info_message(langView('vs_ilet_mess_info_init', App.Langs));
        //    // Событие обновили данные
        //    if (typeof callback === 'function') {
        //        callback(this.select_document_detali);
        //    }
        //}
    };
    // Применить выбор
    view_instructional_letters.prototype.view_select = function (select) {
        this.tab_list_of_letters.view(select);
        //if (select && select.length > 0) {

        //}
    };
    // Очистить данные
    //view_instructional_letters.prototype.clear_data = function () {
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
    //view_instructional_letters.prototype.validation_verification_invoice = function (result) {
    //    var valid = true;
    //    if (this.select_document_detali === null || this.select_document_detali.length === 0) {
    //        this.main_alert.out_error_message(langView('vs_ilet_mess_war_not_select_docs', App.Langs));
    //        valid = false;
    //    } else {
    //        if (!this.clear && this.presented === 1 && !result.new.input_text_presented1) {
    //            this.form_verification_invoices_setup.set_element_validation_error('presented1', langView('vs_ilet_mess_error_not_presented', App.Langs), false);
    //            valid = false;
    //        }
    //        if (!this.clear && this.presented === 2 && !result.new.input_text_presented2) {
    //            this.form_verification_invoices_setup.set_element_validation_error('presented2', langView('vs_ilet_mess_error_not_presented', App.Langs), false);
    //            valid = false;
    //        }
    //        if (!this.clear && this.presented === 3 && !result.new.input_text_presented3) {
    //            this.form_verification_invoices_setup.set_element_validation_error('presented3', langView('vs_ilet_mess_error_not_presented', App.Langs), false);
    //            valid = false;
    //        }
    //    }
    //    return valid;
    //}
    // Обновить 
    //view_instructional_letters.prototype.apply_update_presented = function (data, num_docs, callback) {
    //    //var result = 1;
    //    this.ids_arrival.postVerificationArrivalUzDocument(data, function (result) {
    //        var mess_ok = null;
    //        var mess_error = null;
    //        var n = 0;
    //        this.clear_all();
    //        if (result >= 0) {
    //            // Ок
    //            if (data.num_act !== null) {
    //                mess_ok = langView('vs_ilet_mess_ok_update_presented', App.Langs).format(num_docs, data.num_act);
    //            } else {
    //                mess_ok = langView('vs_ilet_mess_ok_clear_presented', App.Langs).format(num_docs);
    //            }
    //            if (data && data.id_docs && data.id_docs.length > 0) {
    //                LockScreen(langView('vs_ilet_update_main_docs', App.Langs));
    //                $.each(data.id_docs, function (i, el) {
    //                    n += 1;
    //                    this.ids_arrival.getVerificationArrivalUzDocumentOfId(el, function (document) {
    //                        n -= 1;
    //                        var doc = this.get_document(document);
    //                        var exist_doc = this.list_document.find(function (o) {
    //                            return o.id === doc.id;
    //                        }.bind(this));
    //                        if (exist_doc && doc) {
    //                            var res = this.list_document.indexOf(exist_doc);
    //                            this.list_document[res] = doc;
    //                            //this.list_document.splice(res, 1);
    //                            //this.list_document.push(doc);
    //                        }
    //                        if (n === 0) {

    //                            this.select_docs(function (select) {
    //                                this.select_apply(function (select) {
    //                                    this.view_select(select);
    //                                    //this.tab_list_of_letters.view(select);
    //                                    // Очистить поля правки
    //                                    //this.form_verification_invoices_setup.el['input_text_presented' + data.presented].val('');
    //                                    this.main_alert.out_info_message(mess_ok);
    //                                    LockScreenOff();
    //                                    if (typeof callback === 'function') {
    //                                        callback(result);
    //                                    }
    //                                }.bind(this));
    //                            }.bind(this));
    //                        }
    //                    }.bind(this));
    //                }.bind(this));
    //            }
    //        } else {
    //            mess_error = langView('vs_ilet_mess_error_update_presented', App.Langs).format(num_docs, result);
    //            this.main_alert.out_error_message(mess_error);
    //            LockScreenOff();
    //            if (typeof callback === 'function') {
    //                callback(result);
    //            }
    //        }
    //    }.bind(this));
    //}
    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_instructional_letters.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    // 
    view_instructional_letters.prototype.clear_all = function () {
        this.info_alert.clear_message();
        //this.form_searsh_letters.clear_all();
        /*        this.form_verification_invoices_setup.clear_all();*/
        //this.form_document_pay.el.input_text_doc_pay.$element.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.datalist_payer.$element_fl.removeClass('check-field is-valid is-invalid');
        //this.form_cost_calculation_setup.el.input_text_tariff_contract.$element.removeClass('check-field is-valid is-invalid');
    }
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_instructional_letters.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_instructional_letters = view_instructional_letters;

    window.App = App;
})(window);