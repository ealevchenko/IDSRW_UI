/* ===============================================
-= Модуль общая библиотека форма выбора периода ... =-
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
            'vf_sp_mess_init_module': 'Инициализация модуля view_form_select_period',

            'vf_sp_title_label_period': 'Выборка за:',
            'vf_sp_text_label_period': 'Выборка за указанный период',
            'vf_sp_title_time_period_start': 'С даты',
            'vf_sp_text_time_period_start': 'Выборка с указаной даты',
            'vf_sp_title_placeholder_time_period_start': 'Время начала',
            'vf_sp_title_button_new_period': 'Применить',

            'vf_sp_title_period_1': 'ЖД сутки',
            'vf_sp_title_period_2': 'Календарные сутки',
            'vf_sp_title_period_3': 'От начала месяца',

            'vf_sp_apply_text': 'Загружаю информацию за период...',
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

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_form_select_period(selector) {
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
    view_form_select_period.prototype.init = function (options) {
        this.result_init = true;
        console.log('Init view_form_select_period');
        LockScreen(langView('vf_sp_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            fn_init: null,                                          // Окончание инициализации
            apply_text: langView('vf_sp_apply_text', App.Langs),    //
            fn_apply_select: null,                                  // Применить выборку
        }, options);
        //
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        this.type = 1;

        // сформируем периоды { value: , text: , disabled: false }
        this.list_period = [];
        this.list_period.push({ value: 1, text: langView('vf_sp_title_period_1', App.Langs), disabled: false });
        this.list_period.push({ value: 2, text: langView('vf_sp_title_period_2', App.Langs), disabled: false });
        this.list_period.push({ value: 3, text: langView('vf_sp_title_period_3', App.Langs), disabled: false });
        // Создадим форму (this.cost_calculation_setup)- по умолчанию
        this.form_select_period = new FD();
        // Создать макет панели
        var objs_period = [];
        var bt_new_period = {
            obj: 'bs_button',
            options: {
                id: 'new-period',
                name: 'new-period',
                class: 'col-auto',
                fsize: 'sm',
                color: 'success',
                text: 'Выбрать',
                title: langView('vf_sp_title_button_new_period', App.Langs),
                icon_fa_left: 'fa-solid fa-arrows-rotate',//<i class="fa-solid fa-arrows-rotate"></i>
                icon_fa_right: null,
                fn_click: function (event) {
                    //event.preventDefault();
                    this.form_select_period.submit(event);
                }.bind(this),
            }
        };
        var form_select_period = {
            obj: 'bs_form_select',
            options: {
                validation_group: 'select_period',
                id: 'id_period',
                name: 'id_period',
                label: langView('vf_sp_title_label_period', App.Langs),
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_multiple: false,
                element_title: null,
                element_required: true,
                element_readonly: false,
                element_size: null,
                element_options: {
                    data: this.list_period,
                    default: this.type,
                    fn_change: function (e) {
                        e.preventDefault();
                        // Обработать выбор
                        var id = Number($(e.currentTarget).val());
                        if (id !== this.type) {
                            this.type = id;

                        }
                    }.bind(this),
                    fn_check: function (text) {

                    }.bind(this),
                },
                form_inline: true,
                validation: true,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                //col_prefix: null,
                //col_size: 'auto',
                col_class: null,
                //form_text: langView('vf_sp_text_label_period', App.Langs),
                //form_text_class: null,
            },
            childs: []
        };
        var form_input_datetime_time_period_start = {
            obj: 'bs_form_input_datetime',
            options: {
                validation_group: 'select_period',
                id: 'time_period_start',
                name: 'time_period_start',
                label: langView('vf_sp_title_time_period_start', App.Langs),
                element_type: 'date',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: langView('vf_sp_title_placeholder_time_period_start', App.Langs),
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
                form_inline: true,
                validation: true,
                feedback_invalid: null,
                feedback_valid: null,
                feedback_class: null,
                //col_prefix: null,
                //col_size: 'auto',
                col_class: null,
                //form_text: langView('vf_sp_text_time_period_start', App.Langs),
                //form_text_class: null,
            },
            childs: []
        };
        objs_period.push(form_select_period);
        objs_period.push(form_input_datetime_time_period_start);
        objs_period.push(bt_new_period);
        this.form_select_period.init({
            alert: this.main_alert,
            //context: this.div_form_period.$html,
            objs: objs_period,
            id: null,
            form_class: 'row gy-2 gx-3 align-items-center',
            validation: true,
            fn_validation: function (result) {
                // Валидация успешна
                if (result && result.valid) {
                    LockScreen(this.settings.apply_text);
                    // Определим время выборки
                    var date = this.form_select_period.el.input_datetime_time_period_start.val();
                    switch (this.type) {
                        case 1: {
                            // жд.сутки
                            this.start = moment(date).subtract(1, 'd').set({ 'hour': 20, 'minute': 1, 'second': 0 })._d;
                            this.stop = moment(date).set({ 'hour': 20, 'minute': 0, 'second': 0 })._d;
                            //this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + langView('vopcf_title_period_1', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                            break;
                        }
                        case 2: {
                            //календарные сутки
                            this.start = moment(date).set({ 'hour': 0, 'minute': 1, 'second': 0 })._d;
                            this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                            //this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + langView('vopcf_title_period_2', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                            break;
                        }
                        case 3: {
                            // месяц
                            this.start = moment(date).set({ 'date': 1, 'hour': 0, 'minute': 1, 'second': 0 })._d;
                            this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                            //this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + langView('vopcf_title_period_3', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                            break;
                        }
                        default: {
                            // по умолчанию
                            this.start = moment(date).set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
                            this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
                            //this.card_filing.header.$html.empty().append(langView('vopcf_card_header_filing', App.Langs) + ' [ ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                            break;
                        }
                    };
                    var start = moment(this.start).format("YYYY-MM-DDTHH:mm");
                    var stop = moment(this.stop).format("YYYY-MM-DDTHH:mm");
                    // Инициализация вначале 
                    if (typeof this.settings.fn_apply_select === 'function') {
                        this.settings.fn_apply_select.call(this, this.type, this.start, this.stop);
                    }
                }
            }.bind(this),
            fn_html_init: function (res) { }.bind(this),
            fn_element_init: null,
            fn_init: function (init) {
                this.$main.append(this.form_select_period.$form);
                // Инициализация вначале 
                if (typeof this.settings.fn_init === 'function') {
                    this.settings.fn_init.call(this);
                }
            }.bind(this),
        });

    };
    // 
    view_form_select_period.prototype.clear_all = function () {

    }

    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_form_select_period.prototype.destroy = function () {

    };

    App.view_form_select_period = view_form_select_period;

    window.App = App;
})(window);