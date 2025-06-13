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
        var pr_load = 2;
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
        this.api_wsd.getViewRemainderWagons(function (wagons) {
            this.wagons = wagons;
            // Событие обновили данные
            LockScreenOff();
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
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