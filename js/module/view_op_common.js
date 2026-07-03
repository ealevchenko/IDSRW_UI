/* ===============================================
-= Модуль панель операции выдвигающееся окно =-
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
            'vopc_mess_init_module': 'Выполняю инициализацию модуля view_op_common',
            'vopc_title_button_Ok': 'Ok',
            'vopc_title_button_Cancel': 'Отмена',
        },
        'en':  //default language: English
        {
            'vopc_mess_init_module': 'Выполняю инициализацию модуля view_op_common',
            'vopc_title_button_Ok': 'Ok',
            'vopc_title_button_Cancel': 'Отмена',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var MCF = App.modal_confirm_form;

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function view_op_common(selector) {
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
    view_op_common.prototype.init = function (options, fn_init) {
        this.result_init = true;

        console.log('Init view_op_common');
        LockScreen(langView('vopc_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,
            api_wsd: null,
            fn_db_update: null,
            fn_init: null,
            fn_close: null,
        }, options);
        //
        // Создадим ссылку на модуль работы с базой данных
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });

        this.update_wsd = 0; // Признак обновлять данны после закрытия окна (0-нет, 1-только дерево, 2-обновить все)

        this.offcanvas = new this.fe_ui.bs_offcanvas({
            id: null,
            class: 'offcanvas-operation-detal',
            backdrop: 'static',
            position: 'offcanvas-start',
            fn_close: function (even) {
                if (typeof this.settings.fn_close === 'function') {
                    this.settings.fn_close(this.update_wsd);
                    this.update_wsd = 0;
                }
            }.bind(this),
        });
        this.$title = this.offcanvas.header_title.$html;
        this.$op = this.offcanvas.body.$html;
        this.$main.append(this.offcanvas.$html);
        this.bs_offcanvas = new bootstrap.Offcanvas(this.offcanvas.$html);

        this.mcf = new MCF(); // Создадим экземпляр окно сообщений
        this.mcf.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'sm',
            bt_close_text: langView('vopc_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vopc_title_button_Ok', App.Langs),
        });

        this.mcf_lg = new MCF(); // Создадим экземпляр окно сообщений
        this.mcf_lg.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'lg',
            bt_close_text: langView('vopc_title_button_Cancel', App.Langs),
            bt_ok_text: langView('vopc_title_button_Ok', App.Langs),
        });

        // На проверку окончания инициализации
        //----------------------------------
        //if (fn_init === 'function') {
        //    console.log('Close view_op_common');
        //    fn_init(this.result_init);
        //}
        if (typeof this.settings.fn_init === 'function') {
            console.log('Close view_op_common');

            this.settings.fn_init(this.result_init);
        }

        //----------------------------------
    };
    // Показать данные
    view_op_common.prototype.open = function () {
        this.bs_offcanvas.show();
    };
    view_op_common.prototype.close = function () {
        this.bs_offcanvas.hide();
    };
    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    view_op_common.prototype.load_db = function (list, update, callback) {
        if (list) {
            this.api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        };
    }
    //------------------------------- СООБЩЕНИЯ ----------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    view_op_common.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    view_op_common.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    view_op_common.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    view_op_common.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    view_op_common.prototype.destroy = function () {
        //
        if (this.offcanvas) {
            this.offcanvas.$html.empty();
            this.offcanvas.$html.remove();
        }
    };

    App.view_op_common = view_op_common;

    window.App = App;
})(window);