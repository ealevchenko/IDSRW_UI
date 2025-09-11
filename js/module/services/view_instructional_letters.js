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
            'vs_ilet_mess_shearch_wagon': 'Обработка вагонов в системе',

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
            'vs_ilet_title_label_deleted': 'Письма удалить',

            'vs_ilet_title_letter_num': '№ письма',
            'vs_ilet_title_placeholder_letter_num': '№ письма',
            //'vs_ilet_text_letter_num': 'Введите № письма...',

            'vs_ilet_title_letter_date': 'Дата письма',
            'vs_ilet_title_placeholder_letter_date': 'Дата письма',
            //'vs_ilet_text_letter_date': 'Выберите дату письма',

            //'vs_ilet_title_letter_code': 'Код',
            //'vs_ilet_title_placeholder_letter_code': 'Код',
            //'vs_ilet_text_letter_code': 'Код',

            'vs_ilet_title_label_letter_destination_station': 'Ст. назначения',
            'vs_ilet_title_placeholder_letter_destination_station': 'Ст. назначения',
            //'vs_ilet_text_letter_destination_station': 'Выберите станцию назначения',

            'vs_ilet_title_letter_owner': 'Собственник (по письму)',
            'vs_ilet_title_placeholder_letter_owner': 'Собственник',
            //'vs_ilet_text_letter_owner': 'Введите собственника по письму...',

            'vs_ilet_title_letter_note': 'Примечание',
            'vs_ilet_title_placeholder_letter_note': 'Примечание',
            'vs_ilet_text_letter_note': 'Введите примечание...',

            //'vs_ilet_title_placeholder_lett_wagons_searsh': 'Перечень вагонов в письме',
            'vs_ilet_title_placeholder_lett_wagons_searsh': 'Введите № вагона, разделитель ";"',
            //'vs_ilet_text_lett_wagons_searsh': 'Введите № вагона, разделитель ";"',


            'vs_ilet_title_form_add': 'Добавить новое письмо',
            'vs_ilet_title_form_edit': 'Править письмо',
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
            'vs_ilet_mess_note_offer_not_close': '!Данный вагон не закрыт в письме {0} от {1} и будет закрыт со статусом [Отмена]',
            'vs_ilet_mess_note_offer_status_0': 'Ожидаем прибытие вагона',
            'vs_ilet_mess_note_offer_status_1': 'Вагон прибыл',
            'vs_ilet_mess_note_offer_status_2': 'Вагон сдан',
            'vs_ilet_mess_note_offer_status_default': 'Статус вагона не определен',

            'vs_ilet_mess_form_letters_edit_not_wagons': 'В письме отсутствуют вагоны!',
            'vs_ilet_mess_form_letters_edit_error_wagons': 'В письме по вагонам есть ошибки определения статуса!',
            'vs_ilet_mess_form_letters_edit_error_wagon': 'Вагон № {0}, статус {1}, ошибка {2}',
            'vs_ilet_mess_form_letters_edit_letter_destination_station': 'Укажите станцию назначения',
            'vs_ilet_mess_form_letters_edit_not_db_letter_destination_station': 'Станции назначения нет БД ИДС...',
            'vs_ilet_mess_form_letters_edit_not_status_wagons': 'Статус вагонов в системе не определен!',
            'vs_ilet_mess_form_letters_edit_not_edit_wagon': 'Вагон {0} в письме закрыт {1} - правка запрещена!',
            'vs_ilet_mess_war_form_letters_edit_exist_wagon': 'Вагон {0} уже добавлен в письмо!',

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
    var MCFD = App.modal_confirm_form_dialog;

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

        this.start = null;
        this.stop = null;
        this.list_external_station = [];
        this.select_row = null;     // 
        this.wagons_letter = [];    // Вагоны в указаные в письме (отображаются в форме редактирования)

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
                var process = 4;
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

                this.list_external_station = this.api_dir.getListValueTextExternalStation();

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
                                this.select_apply(this.list_letters, function (select_letters) {
                                    this.view_select(select_letters);
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
                                this.select_apply(this.list_letters, function (select_letters) {
                                    this.view_select(select_letters);
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
                                this.select_apply(this.list_letters, function (select_letters) {
                                    this.view_select(select_letters);
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
                                this.select_apply(this.list_letters, function (select_letters) {
                                    this.view_select(select_letters);
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
                                this.select_apply(this.list_letters, function (select_letters) {
                                    this.view_select(select_letters);
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
                var form_check_deleted = {
                    obj: 'bs_form_check',
                    options: {
                        validation_group: 'common_lett',
                        id: 'deleted',
                        name: 'deleted',
                        label: langView('vs_ilet_title_label_deleted', App.Langs),
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
                                this.select_apply(this.list_letters, function (select_letters) {
                                    this.view_select(select_letters);
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
                objs_lett_setup.push(form_check_deleted);
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

                // форма правки выборки
                this.form_letters_edit = new FD();
                var objs_lett_edit = [];
                var row_form = {
                    obj: 'bs_row',
                    options: {
                        id: null,
                        class: null,
                        style: null,
                    },
                    childs: []
                };
                var row_form_wagon = {
                    obj: 'bs_row',
                    options: {
                        id: null,
                        class: null,
                        style: null,
                    },
                    childs: []
                };
                var form_input_letter_num = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'letters_edit',
                        id: 'letter_num',
                        name: 'letter_num',
                        label: langView('vs_ilet_title_letter_num', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_letter_num', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        //element_pattern: '[0-9]{4}[-]{1}[0-9]{3}[-]{1}[0-9]{4}',
                        element_readonly: false,
                        element_min: null,
                        element_max: null,
                        element_step: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 2,
                        col_class: 'mt-0',
                        //form_text: langView('vs_ilet_text_letter_num', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_letter_date = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'letters_edit',
                        id: 'letter_date',
                        name: 'letter_date',
                        label: langView('vs_ilet_title_letter_date', App.Langs),
                        element_type: 'date',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_letter_date', App.Langs),
                        element_required: true,
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
                        col_size: 3,
                        col_class: 'mt-0',
                        //form_text: langView('vs_ilet_text_letter_date', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datalist_letter_destination_station = {
                    obj: 'bs_form_input_datalist',
                    options: {
                        validation_group: 'letters_edit',
                        id: 'letter_destination_station',
                        name: 'letter_destination_station',
                        label: langView('vs_ilet_title_label_letter_destination_station', App.Langs),
                        element_fsize: 'sm',
                        element_class: 'flexdatalist',
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_letter_destination_station', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_options: {
                            data: this.list_external_station,
                            out_value: true,
                            out_group: false,
                            default: '',
                            minLength: 1,
                            searchContain: true,
                            fn_change: function (event, set, options) {
                                // Убрал вывод ошибки, при открытии окна и заполненя этого компонента, приходит событие set.value = '' и вываливается ошибка
                                if (set.value !== '') {
                                    this.form_letters_edit.clear_all();
                                    var valid = this.validation_letter_destination_station(set.value, 'letter_destination_station', true, false);
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
                        col_size: 4,
                        col_class: 'mt-0',
                        //form_text: langView('vs_ilet_text_letter_destination_station', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_input_letter_owner = {
                    obj: 'bs_form_input',
                    options: {
                        validation_group: 'letters_edit',
                        id: 'letter_owner',
                        name: 'letter_owner',
                        label: langView('vs_ilet_title_letter_owner', App.Langs),
                        element_type: 'text',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_letter_owner', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_readonly: false,
                        element_min: null,
                        element_max: null,
                        element_step: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 3,
                        col_class: 'mt-0',
                        //form_text: langView('vs_ilet_text_letter_owner', App.Langs),
                        //form_text_class: null,
                    },
                    childs: []
                };
                var form_textarea_letter_note = {
                    obj: 'bs_form_textarea',
                    options: {
                        validation_group: 'letters_edit',
                        id: 'letter_note',
                        name: 'letter_note',
                        label: langView('vs_ilet_title_letter_note', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_letter_note', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_readonly: false,
                        element_cols: null,
                        element_rows: 2,
                        element_wrap: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var text = $(e.currentTarget).val();
                                /*main_alert.clear_message(); main_alert.out_info_message('element_textarea : ' + text);*/
                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0',
                        group_append_class: null,
                        group_append_id: null,
                        /*                        group_append_html: langView('vopcgr_text_append_vagon_searsh', App.Langs),*/
                        group_append_objs: null,
                        //form_text: langView('vs_ilet_text_letter_note', App.Langs),
                        //form_text_class: null
                    },
                    childs: []
                };
                var form_hr_letter_wagons = {
                    obj: 'bs_hr',
                    options: {
                        class: 'my-2 mx-2',
                        style: null,
                    },
                    childs: []
                };
                var col_table_letter_wagons = {
                    obj: 'bs_col',
                    options: {
                        id: 'vs-ilet-letter-wagons',
                        pref: 'md',
                        size: 12,
                        class: null,
                        style: null,
                    },
                    childs: []
                };
                var bt_append_lett_wagons_clear = {
                    obj: 'bs_button',
                    options: {
                        id: 'lett_wagons_clear',
                        name: 'lett_wagons_clear',
                        class: null,
                        fsize: 'sm',
                        color: 'danger',
                        text: null,
                        title: langView('vs_ilet_title_button_lett_wagon_clear', App.Langs),
                        icon_fa_left: 'fa-solid fa-broom', //<i class="fa-solid fa-broom"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_letters_edit.validation_letters_edit.clear_all();
                            this.form_letters_edit.el.textarea_lett_wagons.val('');
                            //this.form_letters_edit.$form.submit();
                            //this.select_apply(this.list_letters, function (select_letters) {
                            //    this.view_select(select_letters);
                            //    LockScreenOff();
                            //}.bind(this));
                        }.bind(this),
                    }
                };
                var bt_append_lett_wagons_searsh = {
                    obj: 'bs_button',
                    options: {
                        id: 'lett_wagons_searsh',
                        name: 'lett_wagons_searsh',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vs_ilet_title_button_lett_wagon_searsh', App.Langs),
                        icon_fa_left: 'fas fa-search',
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_letters_edit.validation_letters_edit.clear_all();
                            // добавим вагоны
                            this.add_wagons_letter_form_letters_edit(function () {
                                //this.view_select(select_letters);
                                //LockScreenOff();
                            }.bind(this));
                        }.bind(this),
                    }
                };
                var form_textarea_lett_wagons = {
                    obj: 'bs_form_textarea',
                    options: {
                        validation_group: 'letters_edit',
                        id: 'lett_wagons',
                        name: 'lett_wagons',
                        //label: langView('voprc_title_vagon_searsh', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vs_ilet_title_placeholder_lett_wagons_searsh', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_readonly: false,
                        element_cols: null,
                        element_rows: 2,
                        element_wrap: null,
                        element_options: {
                            default: '',
                            fn_change: function (e) {
                                //var text = $(e.currentTarget).val();
                                /*main_alert.clear_message(); main_alert.out_info_message('element_textarea : ' + text);*/
                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0 mb-2',
                        group_append_class: null,
                        group_append_id: null,
                        /*                        group_append_html: langView('vopcgr_text_append_vagon_searsh', App.Langs),*/
                        group_append_objs: [bt_append_lett_wagons_clear, bt_append_lett_wagons_searsh],
                        //form_text: langView('vs_ilet_text_lett_wagons_searsh', App.Langs),
                        //form_text_class: null
                    },
                    childs: []
                };

                row_form.childs.push(form_input_letter_num);
                row_form.childs.push(form_input_letter_date);
                row_form.childs.push(form_input_datalist_letter_destination_station);
                row_form.childs.push(form_input_letter_owner);
                row_form.childs.push(form_textarea_letter_note);
                objs_lett_edit.push(row_form);
                objs_lett_edit.push(form_hr_letter_wagons);
                row_form_wagon.childs.push(form_textarea_lett_wagons);
                row_form_wagon.childs.push(col_table_letter_wagons);
                objs_lett_edit.push(row_form_wagon);

                this.form_letters_edit.init({
                    alert: null,
                    //context: this...$html,
                    objs: objs_lett_edit,
                    id: null,
                    form_class: null,
                    validation: true,
                    fn_validation: function (result) {
                        var valid = result.valid;
                        // Валидация успешна
                        //if (result && result.valid) {
                        valid = valid & this.validation_letter_destination_station(result.new.datalist_letter_destination_station, 'letter_destination_station', true, false);
                        // проверим наличие вагонов в письме
                        if (this.form_letters_edit.tab_wagons.tab_com.data.length > 0) {
                            var errors = this.form_letters_edit.tab_wagons.tab_com.data.filter(function (i) {
                                return i.error > 0;
                            }.bind(this));
                            if (errors && errors.length > 0) {
                                this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_ilet_mess_form_letters_edit_error_wagons', App.Langs));
                                $.each(errors, function (i, er) {
                                    this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_ilet_mess_form_letters_edit_error_wagon', App.Langs).format(er.num, er.status, er.error));
                                }.bind(this));
                                valid = false;
                            }
                        } else {
                            this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_ilet_mess_form_letters_edit_not_wagons', App.Langs));
                            valid = false;
                        }
                        //}
                        this.form_letters_edit.valid = valid;
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        // Инициалиировать таблицы
                        this.form_letters_edit.tab_wagons = new TSRV('div#vs-ilet-letter-wagons', this.form_letters_edit.$form);
                        this.form_letters_edit.tab_wagons.init({
                            alert: this.from_way_alert,
                            class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                            detali_table: false,
                            type_report: 'letter_wagons',
                            setup_buttons: [
                                //{
                                //    name: 'edit',
                                //    action: function (e, dt, node, config) {
                                //        this.form_letters_edit.tab_wagons.tab_com.button_action(config.button, e, dt, node, config);
                                //    }.bind(this),
                                //    enabled: false
                                //},
                                {
                                    name: 'delete',
                                    action: function (e, dt, node, config) {
                                        this.form_letters_edit.tab_wagons.tab_com.button_action(config.button, e, dt, node, config);
                                    }.bind(this),
                                    enabled: false
                                },
                                {
                                    name: 'cancel',
                                    action: function (e, dt, node, config) {
                                        this.form_letters_edit.tab_wagons.tab_com.button_action(config.button, e, dt, node, config);
                                    }.bind(this),
                                    enabled: false
                                },
                            ],
                            link_num: false,
                            ids_wsd: null,
                            fn_init: function () {
                                // На проверку окончания инициализации
                                /*                                tab.view(data.instructionalLettersWagons);*/
                                LockScreenOff();

                            },
                            fn_action_view_detali: function (rows) {

                            },
                            fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                                this.form_letters_edit.validation_letters_edit.clear_all();

                                var no_close = this.form_letters_edit.tab_wagons.tab_com.obj_t_report.rows().data().toArray().find(function (o) {
                                    return o.close === null;
                                }.bind(this));

                                if (rowData && rowData.length > 0 && !no_close) {
                                    if (rowData[0].id !== null && rowData[0].close !== null) {
                                        e.preventDefault();
                                        this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_ilet_mess_form_letters_edit_not_edit_wagon', App.Langs).format(rowData[0].num, moment(rowData[0].close).format(format_datetime_ru)));
                                    }
                                }
                            }.bind(this),
                            fn_select_rows: function (rows, type) {

                            }.bind(this),
                            fn_select_link: function (link) {

                            }.bind(this),
                            fn_button_action: function (name, e, dt, node, config) {
                                if (name === 'delete') {
                                    //LockScreen(langView('vodlc_mess_clear_sostav', App.Langs));
                                    var rows = this.form_letters_edit.tab_wagons.tab_com.get_select_row();
                                    if (rows.length > 0 && this.wagons_letter && this.wagons_letter.length > 0) {
                                        $.each(rows, function (i, el) {

                                            var check_wagon = function (row) {
                                                return row.num === el.num;
                                            }
                                            var index = this.wagons_letter.findIndex(check_wagon);
                                            if (index >= 0) {
                                                this.wagons_letter.splice(index, 1);
                                            }
                                        }.bind(this));
                                        this.form_letters_edit.tab_wagons.view(this.wagons_letter);
                                        LockScreenOff();
                                    }
                                    //
                                }
                                if (name === 'cancel') {
                                    //LockScreen(langView('vodlc_mess_clear_sostav', App.Langs));
                                    var rows = this.form_letters_edit.tab_wagons.tab_com.get_select_row();
                                    if (rows.length > 0 && this.wagons_letter && this.wagons_letter.length > 0) {
                                        //$.each(rows, function (i, el) {

                                        //    var check_wagon = function (row) {
                                        //        return row.num === el.num;
                                        //    }
                                        //    var index = this.wagons_letter.findIndex(check_wagon);
                                        //    if (index >= 0) {
                                        //        this.wagons_letter.splice(index, 1);
                                        //    }
                                        //}.bind(this));
                                        //this.form_letters_edit.tab_wagons.view(this.wagons_letter);
                                        //LockScreenOff();
                                    }
                                    //
                                }

                            }.bind(this),
                            fn_enable_button: function (tb) {
                                var index = tb.obj_t_report.rows({ selected: true })
                                var bts = tb.obj_t_report.buttons([2, 3]);
                                bts.enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки 
                            }.bind(this),
                        });
                        // Инициалиировать окно правки письма и вагонов в письме
                        this.mcfd_lg = new MCFD(); // Создадим экземпляр окно правки
                        this.mcfd_lg.init({
                            static: true,
                            keyboard: false,
                            hidden: true,
                            centered: true,
                            form_dialog: this.form_letters_edit,
                            fsize: 'xl',
                            bt_close_text: langView('vs_ilet_title_button_Cancel', App.Langs),
                            bt_ok_text: langView('vs_ilet_button_Ok', App.Langs),
                            fn_show_modal: function (data) {
                                this.form_letters_edit.validation_letters_edit.clear_all();
                                if (data) {
                                    this.form_letters_edit.el.input_text_letter_num.val(data.num);
                                    this.form_letters_edit.el.input_datetime_letter_date.disable();
                                    this.form_letters_edit.el.input_datetime_letter_date.val(data.dt);
                                    this.form_letters_edit.el.datalist_letter_destination_station.val(data.destinationStation);
                                    this.form_letters_edit.el.input_text_letter_owner.val(data.owner);
                                    //this.form_letters_edit.el.textarea_lett_wagons.val(data.num);
                                    this.form_letters_edit.el.textarea_letter_note.val(data.note);
                                    //this.form_letters_edit.el.button_lett_wagons_clear;
                                    //this.form_letters_edit.tab_wagons.view(data.instructionalLettersWagons);
                                    this.data_wagons_letter_form_letters_edit(null, data.instructionalLettersWagons, false, function (wagons_letter) {
                                        this.wagons_letter = wagons_letter;
                                        this.form_letters_edit.tab_wagons.view(this.wagons_letter);
                                        //LockScreenOff();
                                    }.bind(this))
                                    //LockScreenOff();
                                } else {
                                    this.form_letters_edit.el.input_text_letter_num.val('');
                                    this.form_letters_edit.el.input_datetime_letter_date.enable();
                                    this.form_letters_edit.el.input_datetime_letter_date.val(moment());
                                    this.form_letters_edit.el.datalist_letter_destination_station.val(null);
                                    this.form_letters_edit.el.input_text_letter_owner.val('');
                                    this.form_letters_edit.el.textarea_letter_note.val('');
                                    this.form_letters_edit.el.textarea_lett_wagons.val('');
                                    //this.form_letters_edit.el.button_lett_wagons_clear;
                                    this.wagons_letter = [];
                                    this.form_letters_edit.tab_wagons.view(this.wagons_letter);
                                }
                            }.bind(this),
                            fn_shown_modal: function (row) {
                                this.form_letters_edit.validation_letters_edit.clear_all();
                                LockScreenOff();
                            }.bind(this),
                            fn_update: function (data) {

                            }.bind(this),
                            fn_click_ok: function (e) {
                                e.preventDefault();
                                this.form_letters_edit.clear_all();
                                this.form_letters_edit.$form.submit();
                                if (this.form_letters_edit.valid) {
                                    this.mcfd_lg.$modal_obj.modal('hide');
                                    //this.form_letters_edit.data;
                                }
                            }.bind(this),
                        });
                        // На проверку окончания инициализации
                        process--;
                        out_init(process);
                    }.bind(this),
                });

                //Создадим таблицы( this.tab_list_of_letters)
                var row_list_of_letters = new this.fe_ui.bs_row({ id: 'table-list-of-letters', class: 'pt-2' });
                this.list_of_letters_table.$html.append(row_list_of_letters.$html);
                // Таблица списка писем
                this.tab_list_of_letters = new TSRV('div#table-list-of-letters');
                this.tab_list_of_letters.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: true,
                    type_report: 'list_letters',
                    setup_buttons: [
                        {
                            name: 'add',
                            action: function (e, dt, node, config) {
                                this.tab_list_of_letters.tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        },
                        {
                            name: 'edit',
                            action: function (e, dt, node, config) {
                                this.tab_list_of_letters.tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        },
                        {
                            name: 'delete',
                            action: function (e, dt, node, config) {
                                this.tab_list_of_letters.tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        },
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
                        if (name === 'add') {
                            this.select_row = null;
                            this.view_form_letters_edit(this.select_row);
                        }
                        if (name === 'edit') {
                            var rows = this.tab_list_of_letters.tab_com.get_select_row();
                            if (rows.length > 0) {
                                this.select_row = rows[0];
                                this.view_form_letters_edit(this.select_row);
                            }
                        }
                        if (name === 'delete') {
                            //LockScreen(langView('vodlc_mess_clear_sostav', App.Langs));
                            var rows = this.tab_list_of_letters.tab_com.get_select_row();
                            //LockScreenOff();
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {
                        //var index = tb.obj_t_report.rows({ selected: true });
                        var data = tb.obj_t_report.rows({ selected: true }).data();
                        var bts = tb.obj_t_report.buttons([4, 5]);
                        if (data && data.length > 0) {
                            var row = data[0];
                            var in_progress = row.instructionalLettersWagons.filter(function (i) { return i.status < 2 && i.close === null }.bind(this));

                            bts.enable(data && data.length > 0 && in_progress && in_progress.length > 0); // отображение кнопки добавить
                        } else bts.enable(false);

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
        this.default_db_names = ['external_station'];// [];
        // Загружаем стандартные библиотеки
        this.load_db(this.default_db_names, false, function (result) {
            // Закончена загрузка
            pr_load--;
            //console.log('[view_instructional_letters] [load_db] pr_load: ' + pr_load);
            out_load(pr_load);
        }.bind(this)); //------- {end this.load_db}
    };
    //------------------------------------------------------------------------
    //
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
            var deleted = this.form_letters_setup.el.input_checkbox_deleted.val();

            //if (create_new) {
            this.select_letters = this.select_letters.filter(function (i) {
                var gr = i.instructionalLettersWagons.find(function (o) {
                    return (create_new && o.status === 0 && o.close === null) ||
                        (in_progress && o.status === 1 && o.close === null) ||
                        (done && o.status === 2) ||
                        (replacement && o.status === 3 || (o.status < 2 && o.close !== null)) ||
                        (canceled && o.status === 4) ||
                        (deleted && o.status === 5) || o.status === null;
                }.bind(this));
                return gr !== undefined;
            }.bind(this));
            //}

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
    };
    // Применить выбор
    view_instructional_letters.prototype.view_select = function (select) {
        this.tab_list_of_letters.view(select);
        //if (select && select.length > 0) {

        //}
    };
    //-----------------------------------------------------------------------------
    // Форма правки письма, показать форму
    view_instructional_letters.prototype.view_form_letters_edit = function (row) {
        //this.form_letters_edit.clear_all();
        //this.form_letters_edit.validation_letters_edit.clear_all();
        this.mcfd_lg.open(
            row ? langView('vs_ilet_title_form_edit', App.Langs) : langView('vs_ilet_title_form_add', App.Langs),
            row,
            function () {
                if (typeof callback === 'function') {
                    callback(this.select_vagons);
                }
            }.bind(this),
            function () {
                //this.main_alert.out_warning_message(langView('vs_via_cancel_update_presented', App.Langs));
            }.bind(this));
    };
    // Форма правки письма, добавить вагон в список с поиском в системе 
    view_instructional_letters.prototype.add_wagons_letter_form_letters_edit = function (callback) {
        // Выборка из списка номеров вагонов
        this.form_letters_edit.validation_letters_edit.clear_all();
        LockScreen(langView('vs_ilet_mess_shearch_wagon', App.Langs));
        // Получим список вагонов для добавления и сделаем проверку
        var el_tlw = this.form_letters_edit.el.textarea_lett_wagons;//.$element;
        this.list_wagons = this.form_letters_edit.validation_letters_edit.check_control_is_valid_nums(el_tlw, true, false, true);
        // Проверим на существующие вагоны
        var valid = true;
        if (this.list_wagons && this.list_wagons.length > 0 && this.wagons_letter && this.wagons_letter.length > 0) {
            $.each(this.wagons_letter, function (i, el) {
                var index = this.list_wagons.indexOf(el.num);
                if (index >= 0) {
                    // ошибка вагон уже существует
                    this.form_letters_edit.validation_letters_edit.out_warning_message(langView('vs_ilet_mess_war_form_letters_edit_exist_wagon', App.Langs).format(el.num));
                    valid = false;
                } else {
                    // Добавим вагон в список если этот вагон был добавлен ранее
                    if (el.id === null) { this.list_wagons.push(el.num); }
                };
            }.bind(this));
        }
        // Проходим далее на добавление вагонов
        if (this.list_wagons && valid) {
            //Получим дату письма
            var dt_lett = this.form_letters_edit.el.input_datetime_letter_date.val();
            var option = {
                nums: this.list_wagons,
                date_lett: moment(dt_lett).format("YYYY-MM-DD"),
            }
            this.api_wsd.postStatusInstructionalLettersWagons(option, function (status_wagon_lett) {
                if ((status_wagon_lett !== null && status_wagon_lett.length > 0) || (this.select_row !== null && this.select_row.instructionalLettersWagons !== null && this.select_row.instructionalLettersWagons.length > 0)) {
                    this.data_wagons_letter_form_letters_edit(status_wagon_lett, (this.select_row !== null ? this.select_row.instructionalLettersWagons : null), true, function (wagons_letter) {
                        this.wagons_letter = wagons_letter;
                        this.form_letters_edit.tab_wagons.view(this.wagons_letter);
                        this.form_letters_edit.el.textarea_lett_wagons.val('');
                    }.bind(this))
                } else {
                    this.form_letters_edit.tab_wagons.view([]);
                    this.form_letters_edit.validation_letters_edit.out_error_message(langView('vs_ilet_mess_form_letters_edit_not_status_wagons', App.Langs));
                }
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
        } else {
            // Событие обновили данные
            LockScreenOff();
            if (typeof callback === 'function') {
                callback();
            }
        };

    };
    // Преобразовать информацию по вагонам
    view_instructional_letters.prototype.data_wagons_letter_form_letters_edit = function (data_add, row_edit, type, callback) {
        var wagons_letter = [];
        // Пройдемся по статусам добавленных вагонов
        //
        var not_close_letter_wagon_id = null;
        var not_close_letter_wagon_status = null;
        var not_close_letter_id = null;
        var not_close_letter_num = null;
        var not_close_letter_dt = null;
        var note_offer = "";

        // Пройдемся по вагонам для правки
        if (row_edit && row_edit.length > 0) {
            $.each(row_edit, function (i, el) {
                wagons_letter.push({
                    id: el.id,
                    num: el.num,
                    rentOperatorAbbrRu: el.rentOperatorAbbrRu,
                    rentOperatorAbbrEn: el.rentOperatorAbbrEn,
                    status: el.status,
                    close: el.close,
                    note: el.note,
                    error: 0,
                    id_wir: el.idWir,
                    dateAdoption: el.dateAdoption,
                    dateOutgoing: el.dateOutgoing,
                    arrivalOperatorAbbrRu: el.arrivalOperatorAbbrRu,
                    arrivalOperatorAbbrEn: el.arrivalOperatorAbbrEn,
                    not_close_letter_wagon_id: not_close_letter_wagon_id,
                    not_close_letter_wagon_status: not_close_letter_wagon_status,
                    not_close_letter_id: not_close_letter_id,
                    not_close_letter_num: not_close_letter_num,
                    not_close_letter_dt: not_close_letter_dt,
                    note_offer: el.note,
                });
            }.bind(this));
        }

        if (data_add && data_add.length > 0) {
            $.each(data_add, function (i, el) {
                //
                not_close_letter_wagon_id = null;
                not_close_letter_wagon_status = null;
                not_close_letter_id = null;
                not_close_letter_num = null;
                not_close_letter_dt = null;
                note_offer = "";

                if (el.not_close) {
                    not_close_letter_wagon_id = el.not_close.id;
                    not_close_letter_wagon_status = el.not_close.status;
                    not_close_letter_id = el.not_close.idInstructionalLetters;
                    if (el.not_close.idInstructionalLettersNavigation !== null) {
                        not_close_letter_num = el.not_close.idInstructionalLettersNavigation.num;
                        not_close_letter_dt = el.not_close.idInstructionalLettersNavigation.dt;
                    }
                    note_offer = langView('vs_ilet_mess_note_offer_not_close', App.Langs).format(not_close_letter_num, moment(not_close_letter_dt).format(format_date_ru));
                } else {
                    switch (el.status) {
                        case 0: {
                            note_offer = langView('vs_ilet_mess_note_offer_status_0', App.Langs);
                            break;
                        }
                        case 1: {
                            note_offer = langView('vs_ilet_mess_note_offer_status_1', App.Langs);
                            break;
                        }
                        case 2: {
                            note_offer = langView('vs_ilet_mess_note_offer_status_2', App.Langs);
                            break;
                        }
                        default: {
                            note_offer = langView('vs_ilet_mess_note_offer_status_default', App.Langs);
                            break;
                        }
                    }
                }
                //
                wagons_letter.push({
                    id: null,
                    num: el.num,
                    rentOperatorAbbrRu: (el.rent !== null && el.rent.idOperatorNavigation !== null ? el.rent.idOperatorNavigation.abbrRu : null),
                    rentOperatorAbbrEn: (el.rent !== null && el.rent.idOperatorNavigation !== null ? el.rent.idOperatorNavigation.abbrEn : null),
                    status: el.status,
                    close: el.close,
                    note: el.note,
                    error: el.error,
                    id_wir: el.id_wir,
                    dateAdoption: (el.wir !== null && el.wir.idArrivalCarNavigation !== null && el.wir.idArrivalCarNavigation.idArrivalNavigation !== null ? el.wir.idArrivalCarNavigation.idArrivalNavigation.dateAdoption : null),
                    dateOutgoing: (el.wir !== null && el.wir.idOutgoingCarNavigation !== null && el.wir.idOutgoingCarNavigation.idOutgoingNavigation !== null ? el.wir.idOutgoingCarNavigation.idOutgoingNavigation.dateOutgoing : null),
                    arrivalOperatorAbbrRu: null,
                    arrivalOperatorAbbrEn: null,
                    not_close_letter_wagon_id: not_close_letter_wagon_id,
                    not_close_letter_wagon_status: not_close_letter_wagon_status,
                    not_close_letter_id: not_close_letter_id,
                    not_close_letter_num: not_close_letter_num,
                    not_close_letter_dt: not_close_letter_dt,
                    note_offer: note_offer,
                })
            }.bind(this));
        }


        if (typeof callback === 'function') {
            callback(wagons_letter);
        }
    }
    // 
    view_instructional_letters.prototype.validation_letter_destination_station = function (code, id, not_null, not_alert) {
        // Нет данных
        var fn_out_null = function (not_null) {
            // нет входных данных данных
            if (not_null) {
                this.form_letters_edit.set_element_validation_error(id, langView('vs_ilet_mess_form_letters_edit_letter_destination_station', App.Langs), not_alert);
                return false;
            } else {
                this.form_letters_edit.set_element_validation_ok(id, "", not_alert);
                return true;
            }
        }
        // Нет данных в базе данных
        var fn_out_undefined = function () {
            this.form_letters_edit.set_element_validation_error(id, langView('vs_ilet_mess_form_letters_edit_not_db_letter_destination_station', App.Langs), not_alert);
            return false;
        }
        // Ок
        var fn_out_ok = function () {
            // Ок
            this.form_letters_edit.set_element_validation_ok(id, "", not_alert);
            return true;
        }
        //this.form_letters_edit.validation_letters_edit.clear_all();
        // Проверка
        if (code === null || code === '') {
            return fn_out_null.call(this, not_null);
        }
        if (code === undefined) {
            // Нет в базе
            return fn_out_undefined.call(this);
        }
        this.select_obj = this.api_dir.getExistExternalStation(code, null);
        if (this.select_obj) {
            return fn_out_ok.call(this);
        } else {
            if (this.select_obj === null) {
                return fn_out_undefined.call(this);
            } else {
                return fn_out_null.call(this, not_null);
            }
        }
    }
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
