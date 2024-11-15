/* ===============================================
-= Модуль панель операции "ВЫГРУЗКА ВАГОНОВ" =-
  + js/view/shared/common.js
  + js/module/view_op_common.js
  + js/module/ws/table_ws.js
==================================================*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    var min_dt_apply = -1 * (60 * 3); // TODO: Минимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var max_dt_apply = 60 * 3; // TODO: Максимальная разница в минутах даты и времени выполнения операции от текущей даты (перенести в общие настройки)
    var min_period = 5; // TODO: Минимальный период операции 
    var max_period = 60 * 24 * 10; // TODO: Максимальный период операции 
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            //'vounl_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ВЫГРУЗКА ВАГОНОВ"',
            //'vounl_card_header_filing': 'ПОДАЧИ ПО СТАНЦИИ',

            //'vounl_card_header_filing_wagons': 'ВАГОНЫ В ПОДАЧИ',
            //'vounl_card_header_from_way': 'ВАГОНЫ НА ПУТИ',


            //'vounl_title_label_period': 'Выборка за:',
            //'vounl_title_time_period_start': 'С даты',
            //'vounl_text_time_period_start': 'Выборка с указаной даты',
            //'vounl_title_placeholder_time_period_start': 'Время начала',
            //'vounl_title_label_station': 'Станция выгрузки:',
            //'vounl_text_label_station': 'Выберите станцию выгрузки...',
            //'vounl_title_label_devision_on': 'Цех получатель:',
            //'vounl_text_label_devision_on': 'Выберите цех получатель...',
            //'vounl_title_label_status_load': 'Статус:',
            //'vounl_text_label_status_load': 'Выберите статус (груж./порож.)...',
            //'vounl_title_label_station_amkr_on': 'Станция приб. АМКР:',
            //'vounl_text_label_station_amkr_on': 'Выберите станцию приб. АМКР...',

            //'vounl_title_label_way_from': 'Путь отправления:',
            //'vounl_text_label_way_from': 'Выберите путь начала дислокации...',



            //'vounl_title_label_locomotive1': 'Локомотив №1:',
            //'vounl_title_label_locomotive2': 'Локомотив №2:',
            //'vounl_title_placeholder_locomotive': ' № локомотива',

            //'vounl_title_time_start': 'Время начала',
            //'vounl_text_time_start': 'Время начала операции ограниченно +(-)1день',
            //'vounl_title_placeholder_time_start': 'Время начала',

            //'vounl_title_time_stop': 'Время окончания',
            //'vounl_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            //'vounl_title_placeholder_time_stop': 'Время окончания',

            //'vounl_title_form_add': 'Создать подачу',
            //'vounl_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            //'vounl_title_form_apply': 'Править подачу',
            //'vounl_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            //'vounl_title_form_operation_apply': 'Править операцию',
            //'vounl_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            //'vounl_title_period_1': 'ЖД сутки',
            //'vounl_title_period_2': 'Календарные сутки',
            //'vounl_title_period_3': 'От начала месяца',

            //'vounl_title_status_null': 'Неопределен?',
            //'vounl_title_status_0': 'Без операции',
            //'vounl_title_status_1': 'Операция начата',
            //'vounl_title_status_2': 'Операция завершена',
            //'vounl_title_status_3': 'Вагон покинул путь',

            //'vounl_title_button_new_period': 'Обновить данные, применить новый период выборки.',
            //'vounl_title_button_new_filing': 'Создать черновик',
            //'vounl_title_attr_button_new_filing': 'Создать черновик подачи по выбранным вагонам.',
            //'vounl_title_button_add_filing': 'Добавить в подачу',
            //'vounl_title_attr__button_add_filing': 'Добавить в текущую подачу выбранные вагоны.',

            //'vounl_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            //'vounl_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать операцию, для этого укажите дату начала операции и по необходимости дату завершения, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            //'vounl_mess_info_filing': 'Выбрана подача. Чтобы исправить цех погрузки укажите новый цех и нажмите «Править подачу». Чтобы выполнить операции над вагонами выберите вагон(ы).',
            //'vounl_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            //'vounl_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции и по необходимости дату завершения и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны», если нужно выбрать вагоны с открытыми и закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            //'vounl_mess_info_wagon_mode_1': 'Выбран(ы) вагоны, по которым открыта операция. Укажите дату завершения операции и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с открытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            //'vounl_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция. Вы можете править только статус, укажите другой статус и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с закрытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',
            //'vounl_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача. Операции не доступны!',
            //'vounl_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',


            //'vounl_mess_warning_wagon_ban_exists': 'Вагон № {0} для операций заблокирован (вагон уже пренадлежит выбранной подаче :[{1}])',
            //'vounl_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу подготовленому к отправке, который имеет статус :[{1}])',
            //'vounl_mess_warning_wagon_ban_select_status': 'Вагон № {0} для выбора заблокирован (статус вагона :[{1}], отличается от статуса выбранных ранее вагонов :[{2}])',
            //'vounl_mess_warning_change_filing_ban': 'Смена подачи недопустима завершите операцию с "Черновиком"',


            //'voprc_mess_warning_wagon_ban_filing_way': 'Вагон № {0} для операций заблокирован (вагон уже выбран для подачи)',
            //'voprc_mess_warning_wagon_ban_busy': 'Вагон № {0} для операций заблокирован (предъявлен,незакрытая подача, незаконченая операция...)',
            //'voprc_mess_warning_wagon_ban_new_filing': 'Запрет! На пути :[{0}] не закрытая подача [{1}]. Операция создания новой - невозможна!',

            //'voprc_mess_eror_add_new_filing': 'Выбранно № {0} вагонов, не могу сформировать новую подачу (ошибка определения станции {1}, парка {2}, пути {3})',
            //'voprc_mess_eror_new_filing_not_wagon': 'В новой подаче отсутствуют вагоны',

            //'vounl_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            //'vounl_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив № {0}',
            //'vounl_mess_error_time_aplly': 'Укажите дату завершения операции',
            //'vounl_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) = {0}',
            //'vounl_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) = {0}',
            //'vounl_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            //'vounl_mess_error_not_wagons_close_filing': 'Выберите вагоны для завершения операции вподаче (в окне «ВАГОНЫ В ПОДАЧИ», выберите вагоны).',
            //'vounl_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',
            //'vounl_mess_error_filing_division': 'Выберите цех получатель',
            //'vounl_mess_error_filing_station_amkr': 'Выберите станцию выгрузки',
            //'vounl_mess_error_period_time': 'Операция должна длиться в диапазоне от {0} до {1} мин.',
            //'vounl_mess_error_operation_run_add_filing': 'При создании подачи для «ВЫГРУЗКИ ВАГОНОВ» произошла ошибка, код ошибки: {0}',
            //'vounl_mess_error_operation_run_wagon_filing': 'При выполнении операции с вагонами подачи, произошла ошибка, код ошибки: {0}',

            //'vounl_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            //'voprc_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',

            //'vounl_mess_cancel_operation_mode_0': 'Отмена операции создать подачу для "ВЫГРУЗКИ ВАГОНОВ"!',
            //'vounl_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ВЫГРУЗКИ ВАГОНОВ"!',
            //'vounl_mess_cancel_operation_mode_2': 'Отмена операции начала "ВЫГРУЗКИ" над вагонами подачи!',
            //'vounl_mess_cancel_operation_mode_3': 'Отмена завершения операции "ВЫГРУЗКИ" над вагонами подачи!',
            //'vounl_mess_cancel_operation_mode_4': 'Отмена правки статуса вагона после "ВЫГРУЗКИ"!',

            //'vounl_mess_cancel_operation_mode_add_wagon': 'Отмена операции добавления вагонов в подачу для "ВЫГРУЗКИ ВАГОНОВ"',
            //'vounl_mess_cancel_operation_mode_delete_wagon': 'Отмена операции удаления вагонов из подачи "ВЫГРУЗКИ ВАГОНОВ"',
            //'vounl_mess_cancel_operation_mode_clear_draft': 'Отмена операции "Удалить черновик подачи"',

            //'vounl_mess_run_operation_add_filing': 'Выполняю операцию создать подачу для "ВЫГРУЗКИ ВАГОНОВ"',
            //'vounl_mess_run_operation_update_operation_filing': 'Выполняю операцию править операции "ВЫГРУЗКА ВАГОНОВ" в подаче.',
            //'vounl_mess_run_operation_update_filing': 'Выполняю операцию править подачу "ВЫГРУЗКИ ВАГОНОВ"',
            //'vounl_mess_run_operation_add_wagon_filing': 'Выполняю операцию добавить вагон(ы) в подачу.',
            //'vounl_mess_run_operation_del_wagon_filing': 'Выполняю операцию убрать вагон(ы) из подачи.',
            //'vounl_mess_not_select_wagon_from': 'Выберите вагоны для формирования подачи!',
            //'vounl_mess_not_select_way_from': 'Выберите путь с которого будет сформирована подача!',
            //'vounl_mess_not_select_wagon_return': 'Выберите вагоны которые нужно убрать из подачи!',
            //'vounl_mess_not_select_way_return': 'Выберите путь на который будут возвращены вагоны!',

            //'vounl_mess_ok_operation_add_filing': 'Подача создана, определено {0} (ваг.)',
            //'vounl_mess_ok_operation_update_operation_filing': 'Обновлена операция по вагонам {0} шт. в подаче [{1}].',
            //'vounl_mess_ok_operation_update_filing': 'Обновлена информация в подаче [{1}].',
            //'vounl_mess_ok_operation_add_wagon_filing': 'Вагоны в количестве {0} шт. добавлены в подачу [{1}].',
            //'vounl_mess_ok_operation_del_wagon_filing': 'Вагоны в количестве {0} шт. удалены из подачи [{1}].',

            //'vounl_mess_load_operation': 'Загружаю операции...',
            //'vounl_mess_load_wagons': 'Загружаю вагоны на пути...',
            //'vounl_mess_load_filing_wagon': 'Загружаю вагоны подач...',

            //'vounl_mess_init_panel': 'Выполняю инициализацию модуля ...',
            //'vounl_mess_create_filing': 'Формирую "черновик" подачи, переношу вагоны...',
            //'vounl_mess_create_filing_delete_wagon': 'Формирую "черновик" подачи, удаляю вагоны...',
            //'vounl_mess_add_filing': 'Переношу вагоны в существующую подачу.',
            //'vounl_mess_del_filing': 'Удаляю вагоны из существующей подачи.',
            //'vounl_mess_clear_draft': 'Удаляю черновик подачи.',

            //'vounl_confirm_title': 'Внимание!',
            //'vounl_confirm_mess_apply_create_filing': 'Создать подачу для операции "ВЫГРУЗКА ВАГОНОВ" на станции {0}, на пути {1}, в подразделении {2}? Определено для подачи {3} ваг., определено для выгрузки {4} ваг., закрыта выгрузка по {5} вагонам.',
            //'vounl_confirm_mess_apply_update_filing': 'Править подачу {0}, выбрана станция АМКР: [{1}], выбранно подразделение: [{2}]? Станция и подразделение будет обновлено по всем вагонам подачи!',
            //'vounl_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала выгрузки {2} ваг., закрыта выгрузка по {3} вагонам.',
            //'vounl_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}. Определено для правки {1} ваг., закрыта выгрузка по {2} вагонам.',
            //'vounl_confirm_mess_apply_update_filing_status_operation': 'Править подачу {0}. Определено для правки {1} ваг., указан новый статус {2}.',
            //'vounl_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути [{0}]?.',


            //'vounl_confirm_mess_apply_add_wagon_filing': 'Добавить {0} вагона(ов) в существующую подачу {1}.',
            //'vounl_confirm_mess_apply_delete_wagon_filing': 'Удалить {0} вагона(ов) из существующей подачи {1}.',
            //'vounl_confirm_mess_apply_delete_wagon_warning_close': ' ВНИМАНИЕ! подача будет закрыта автоматически (все вагоны в подаче имеют статус завершенной операции).',

            //'vounl_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию {0}? Все вагоны для подачи в количестве {1} будут сброшены! ',
            //'vounl_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь для подачи {0}? Все выбранные для подачи в количестве {1} будут сброшены! ',

        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // js/module/view_op_common.js
    var VIEW_COMMON = App.view_op_common;
    // js/view/shared/common.js

    var ALERT = App.alert_form;
    var FD = App.form_dialog;
    // js/module/ws/table_ws.js
    var TWS = App.table_ws;
    function old_view_op_unloading_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    old_view_op_unloading_cars.prototype.init = function (options) {
        this.result_init = true;
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,
            api_wsd: null,
            fn_db_update: null,
            fn_init: null,
            fn_close: null,
        }, options);

        this.view_com.init({
            alert: this.settings.alert,
            api_dir: this.settings.api_dir,
            api_wsd: this.settings.api_wsd,
            fn_db_update: this.settings.fn_db_update,
            fn_init: null,
            fn_close: this.settings.fn_close,
        }, function () {

        }.bind(this));



        this.type_filing = 1;                       // Тип подачи по умолчанию (1 -очистка)
        this.type = 1;                              // Тип выборки времени
        this.start = moment().set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
        this.stop = moment().set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
        this.id_station_unload = -1;      // Значения по умолчанию
        this.id_way_unload = -1;

        this.id_filing = null;          // id подачи (изменяется при выборе подачи)
        this.id_filing_old = null;      // id подачи (изменяется при выборе подачи)
        this.id_way_filing = null;      // id пути (изменяется при выборе подачи)
        this.station_on = -1;           // станция подачи (изменяется при выборе подачи)
        this.division_on = -1;          // подразделение подачи (изменяется при выборе подачи)
        this.create_filing = null;      // время создания подачи (изменяется при выборе подачи)
        this.close_filing = null;       // время закрытия подачи (изменяется при выборе подачи)
        this.fw_status = null;          // Статус выбраноых вагонов в подаче (0-null, 1-начата, 2-закрыта, 3-закрыта и вагон уже нестоит)

        this.stations = [];             // Список станций (полный)
        this.list_station = [];         // Список станций всех (value\text\desabled)
        this.list_way = [];             // Список путей (value\text\desabled)

        this.ways = [];                 // Список путей (полный)
        this.wagons = [];               // Список вагонов на пути отправки (рабочий)
        this.wagons_filing = [];        // Список вагонов подач (рабочий)
        this.sostav_filing = [];        // Список подач (рабочий)
        this.filing_wagons = [];        // Список вагонов в выбранной подаче (рабочий)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('vounl_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();
        // Сообщение
        LockScreen(langView('vounl_mess_init_panel', App.Langs));
        //----------------------------------
        // Главный Alert
        this.alert = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.view_com.$op.append(this.alert.$html);
        this.main_alert = new ALERT(this.alert.$html);
        // Создать макет панели (Область подачи)
        this.card_filing = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vounl_card_header_filing', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.view_com.fe_ui.bs_row({});
        this.filing_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.filing_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing
        this.alert_filing = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.filing_table.$html.append(this.alert_filing.$html);
        this.filing_alert = new ALERT(this.alert_filing.$html);
        row.$html.append(this.filing_setup.$html).append(this.filing_table.$html);
        this.card_filing.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_filing.$html);
        // Создать макет панели (Область вагоны подачи - детально)
        this.card_filing_wagons = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vounl_card_header_filing_wagons', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.view_com.fe_ui.bs_row({});
        this.filing_wagons_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.filing_wagons_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_filing_wagons
        this.alert_filing_wagons = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.filing_wagons_table.$html.append(this.alert_filing_wagons.$html);
        this.filing_wagons_alert = new ALERT(this.alert_filing_wagons.$html);
        //
        row.$html.append(this.filing_wagons_setup.$html).append(this.filing_wagons_table.$html);
        this.card_filing_wagons.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_filing_wagons.$html);
        //-- Создать макет панели (Область вагонов на пути)
        this.card_from_way = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'mb-3 text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('vounl_card_header_from_way', App.Langs),
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,
        });
        var row = new this.view_com.fe_ui.bs_row({});
        this.from_way_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 2,
        });
        this.from_way_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 10,
            class: 'rounded border border-secondary'
        });
        // Alert_from_way
        this.alert_from_way = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.from_way_table.$html.append(this.alert_from_way.$html);
        this.from_way_alert = new ALERT(this.alert_from_way.$html);
        row.$html.append(this.from_way_setup.$html).append(this.from_way_table.$html);
        this.card_from_way.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_from_way.$html);
        this.view_com.load_db(['station', 'park_ways', 'ways', 'divisions'], false, function (result) {
            // Загрузим статусы согласно операции
            this.view_com.api_dir.getWagonLoadingStatusOfWagonOperations(13, function (list) {
                this.list_status_load = this.view_com.api_dir.api_com.getListObjOfList(list, 'id', 'loadingStatus', ucFirst(App.Lang));
                //--
                var process = 6;
                // Выход из инициализации
                var out_init = function (process) {
                    if (process === 0) {
                        //----------------------------------
                        if (typeof this.settings.fn_init === 'function') {
                            console.log('Close old_view_op_unloading_cars');
                            this.settings.fn_init(this.result_init);
                        }
                        //----------------------------------
                    }
                }.bind(this);
                // инициализациия 
                this.stations = this.view_com.api_dir.getAllStation();
                this.ways = this.view_com.api_dir.getAllWays();
                this.park_ways = this.view_com.api_dir.getAllParkWays();
                this.divisions = this.view_com.api_dir.getAllDivisions();
                // сформируем периоды { value: , text: , disabled: false }
                this.list_period = [];
                this.list_period.push({ value: 1, text: langView('vounl_title_period_1', App.Langs), disabled: false });
                this.list_period.push({ value: 2, text: langView('vounl_title_period_2', App.Langs), disabled: false });
                this.list_period.push({ value: 3, text: langView('vounl_title_period_3', App.Langs), disabled: false });

                // Создадим список станций по которым есть выход в цеха
                this.list_station = [];
                $.each(this.ways, function (i, el) {
                    if (el.idDevision !== null && el.wayDelete === null && el.wayClose === null) {
                        var st = this.list_station.find(function (o) {
                            return o.value === el.idStation
                        }.bind(this));
                        if (!st) {
                            var dst = this.stations.find(function (o) {
                                return o.id === el.idStation && !o.stationUz && o.stationDelete === null;
                            }.bind(this));
                            if (dst)
                                this.list_station.push({ value: dst.id, text: dst['stationName' + ucFirst(App.Lang)], disabled: false });
                        }
                    }
                }.bind(this));

                this.list_devision_on = this.view_com.api_dir.getListValueTextAbbrDivisions();
                //this.list_status_load = this.view_com.api_dir.getListValueTextWagonLoadingStatus();
                this.list_station_amkr_on = this.view_com.api_dir.getListValueTextStation(function (i) {
                    return !i.stationUz && i.stationDelete === null;
                }.bind(this));

                //-------------------------------------------------------------------
                // Создадим форму (this.filing_setup)
                this.form_filing_setup = new FD();
                // Создать макет панели
                var objs_filing_setup = [];
                var bt_new_period = {
                    obj: 'bs_button',
                    options: {
                        id: 'new-period',
                        name: 'new-period',
                        class: null,
                        fsize: 'sm',
                        color: 'success',
                        text: null,
                        title: langView('vounl_title_button_new_period', App.Langs),
                        icon_fa_left: 'fa-solid fa-arrows-rotate',//<i class="fa-solid fa-arrows-rotate"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.view(this.id_way_unload);
                        }.bind(this),
                    }
                };
                var form_select_period = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_filing',
                        id: 'id_period',
                        name: 'id_period',
                        label: langView('vounl_title_label_period', App.Langs),
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
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_label_station', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datetime_time_period_start = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'common_filing',
                        id: 'time_period_start',
                        name: 'time_period_start',
                        label: langView('vounl_title_time_period_start', App.Langs),
                        element_type: 'date',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vounl_title_placeholder_time_period_start', App.Langs),
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
                        col_size: 6,
                        col_class: 'mt-0',
                        group_append_class: null,
                        group_append_id: null,
                        group_append_objs: [bt_new_period],
                        form_text: langView('vounl_text_time_period_start', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_station = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_filing',
                        id: 'id_station_unload',
                        name: 'id_station_unload',
                        label: langView('vounl_title_label_station', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: true,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: this.list_station,
                            default: this.id_station_unload,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                var id = Number($(e.currentTarget).val());
                                this.id_filing_old = this.id_filing;
                                this.id_filing = null;
                                this.update(id, -1, function () {
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_label_station', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                objs_filing_setup.push(form_select_period);
                objs_filing_setup.push(form_input_datetime_time_period_start);
                objs_filing_setup.push(form_select_station);
                this.form_filing_setup.init({
                    alert: this.main_alert,
                    objs: objs_filing_setup,
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
                        this.filing_setup.$html.append(this.form_filing_setup.$form);
                        this.form_filing_setup.el.select_id_period.val(this.type); // выставим отчет по умолчанию
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[old_view_op_unloading_cars] [form_filing_setup] process ' + process);
                        out_init(process);
                    }.bind(this),
                });
                // Создадим таблицы (this.filing_table)
                var row_list_filing = new this.view_com.fe_ui.bs_row({ id: 'op-unlc-list-filing', class: 'pt-2' });
                this.filing_table.$html.append(row_list_filing.$html);

                this.tlf_unlc = new TWS('div#op-unlc-list-filing');
                this.tlf_unlc.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'list_filing',
                    setup_buttons: [
                        {
                            name: 'clear_draft',
                            action: function (e, dt, node, config) {
                                this.tlf_unlc.tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        }
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[old_view_op_unloading_cars] [tlf_unlc] process ' + process);
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.filing_alert.clear_message();
                        this.form_filing_wagons_setup.validation_common_filing_wagons.clear_all();
                        if (rowData && rowData.length > 0) {
                            var wagons_filing_add = this.wagons.filter(function (i) { return i.id_wir_unload !== null; });

                            if (rowData[0].idWf !== 0 && wagons_filing_add.length > 0) {
                                e.preventDefault();
                                this.filing_alert.out_warning_message(langView('vounl_mess_warning_change_filing_ban', App.Langs));
                            }
                        }
                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        this.id_filing = null;
                        this.id_way_filing = this.id_way_unload; // По умолчанию текущее
                        this.station_on = -1;
                        this.division_on = -1;
                        this.status_load = -1;
                        this.create_filing = null;
                        this.close_filing = null;
                        this.fw_status = null; // сбросим статус выбора вагонов
                        var bts = this.tlf_unlc.tab_com.obj_t_report.buttons([5]);
                        bts.disable();
                        if (type === "select") {

                            if (rows != null && rows.length > 0) {
                                this.id_filing = rows[0].idWf;
                                if (this.id_filing === 0) bts.enable(); // активируем очистить черновик
                                this.station_on = rows[0].filingIdStation;
                                this.division_on = rows[0].filingDivisionIdDivision;
                                this.id_way_filing = rows[0].filingIdWay;
                                this.create_filing = rows[0].filingCreate;
                                this.close_filing = rows[0].filingClose;
                            }

                            var out_pr2 = function () {
                                // Показать вагоны на пути формирования подачи
                                this.view_wagons_from();
                                // Убрать выбранные вагоны по которам совподают подачи
                                this.twfrom_unlc.tab_com.obj_t_report.rows(function (idx, data) {
                                    return data.idFiling === this.id_filing;
                                }.bind(this)).deselect();
                                LockScreenOff();

                            }.bind(this);
                            // Обновим пути отправки 1 поток
                            this.update_from_way(this.id_way_filing,
                                function (upd) {
                                    // Обновим вагоны подачи
                                    this.view_wagons_of_filing(this.id_filing,
                                        function (wagons) {
                                            out_pr2();
                                        }.bind(this));

                                }.bind(this));

                        } else {
                            this.view_wagons_of_filing(this.id_filing,
                                function (wagons) {
                                    LockScreenOff();
                                }.bind(this));
                        }
                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            this.view_filing(this.id_filing);
                            LockScreenOff();
                        }
                        if (name === 'clear_draft') {
                            // Проверка это черновик
                            if (this.id_filing === 0) {
                                this.from_way_alert.clear_message();
                                this.view_com.mcf_lg.open(
                                    langView('vounl_title_form_apply', App.Langs),
                                    langView('vounl_confirm_mess_apply_clear_draft', App.Langs).format(this.form_from_setup.el.select_id_way_unload.text()),
                                    function () {
                                        LockScreen(langView('vounl_mess_clear_draft', App.Langs));
                                        // Выполнить операцию добавить вагоны
                                        $.each(this.wagons, function (i, el) {
                                            el['id_wir_unload'] = null;
                                        }.bind(this));
                                        this.id_filing = null;
                                        this.view_wagons(this.id_filing); // Обновить вагоны на пути приема
                                        LockScreenOff();

                                    }.bind(this),
                                    function () {
                                        this.form_filing_setup.validation_common_filing.out_warning_message(langView('vounl_mess_cancel_operation_mode_clear_draft', App.Langs));
                                    }.bind(this)
                                );
                            }
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {
                    }.bind(this),
                });

                //-------------------------------------------------------------------
                // Создадим форму (this.filing_wagons_setup)
                this.form_filing_wagons_setup = new FD();
                // Создать макет панели
                var objs_filing_wagons_setup = [];
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
                var bt_bt_add = {
                    obj: 'bs_button',
                    options: {
                        id: 'filing_add',
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'primary',
                        text: langView('vounl_title_form_add', App.Langs),
                        title: langView('vounl_title_form_add_title', App.Langs),
                        icon_fa_left: 'fa-regular fa-square-plus',  //<i class="fa-regular fa-square-plus"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_filing_wagons_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var bt_bt_apply = {
                    obj: 'bs_button',
                    options: {
                        id: 'filing_apply',
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'primary',
                        text: langView('vounl_title_form_apply', App.Langs),
                        title: langView('vounl_title_form_apply_title', App.Langs),
                        icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_filing_wagons_setup.$form.submit();
                        }.bind(this),
                    }
                };
                var bt_bt_operation = {
                    obj: 'bs_button',
                    options: {
                        id: 'operation_apply',
                        name: null,
                        class: null,
                        fsize: 'sm',
                        color: 'primary',
                        text: langView('vounl_title_form_operation_apply', App.Langs),
                        title: langView('vounl_title_form_operation_apply_title', App.Langs),
                        icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                        icon_fa_right: null,
                        fn_click: function (event) {
                            event.preventDefault();
                            this.form_filing_wagons_setup.$form.submit();
                        }.bind(this),
                    }
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

                var form_input_datetime_time_start = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'common_filing_wagons',
                        id: 'time_start',
                        name: 'time_start',
                        label: langView('vounl_title_time_start', App.Langs),
                        element_type: 'datetime-local',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vounl_title_placeholder_time_start', App.Langs),
                        element_required: true,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: moment().subtract(1, 'days').format("YYYY-MM-DDThh:mm"), //"2024-05-05T00:00"
                        element_max: moment().add(1, 'days').format("YYYY-MM-DDThh:mm"),
                        element_step: null,
                        element_options: {
                            default: moment(),
                            format: 'datetime',
                            out_format: 'moment',
                            fn_change: function (e, dt) {
                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_time_start', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_input_datetime_time_stop = {
                    obj: 'bs_form_input_datetime',
                    options: {
                        validation_group: 'common_filing_wagons',
                        id: 'time_stop',
                        name: 'time_stop',
                        label: langView('vounl_title_time_stop', App.Langs),
                        element_type: 'datetime-local',
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_title: null,
                        element_placeholder: langView('vounl_title_placeholder_time_stop', App.Langs),
                        element_required: false,
                        element_maxlength: null,
                        element_pattern: null,
                        element_readonly: false,
                        element_min: moment().subtract(1, 'days').format("YYYY-MM-DDThh:mm"), //"2024-05-05T00:00"
                        element_max: moment().add(1, 'days').format("YYYY-MM-DDThh:mm"),
                        element_step: null,
                        element_options: {
                            default: moment(),
                            format: 'datetime',
                            out_format: 'moment',
                            fn_change: function (e, dt) {
                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_time_stop', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_devision_on = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_filing_wagons',
                        id: 'id_devision_on',
                        name: 'id_devision_on',
                        label: langView('vounl_title_label_devision_on', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: true,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: this.list_devision_on,
                            default: 1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                var id = Number($(e.currentTarget).val());
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_label_devision_on', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_status_load = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_filing_wagons',
                        id: 'id_status_load',
                        name: 'id_status_load',
                        label: langView('vounl_title_label_status_load', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: false,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: this.list_status_load,
                            default: 1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                var id = Number($(e.currentTarget).val());
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: false,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_label_status_load', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                var form_select_station_amkr_on = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_filing_wagons',
                        id: 'id_station_amkr_on',
                        name: 'id_station_amkr_on',
                        label: langView('vounl_title_label_station_amkr_on', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: true,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: this.list_station_amkr_on,
                            default: 1,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 6,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_label_station_amkr_on', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };
                col_bt_apply.childs.push(bt_bt_add);
                col_bt_apply.childs.push(bt_bt_apply);
                col_bt_apply.childs.push(bt_bt_operation);
                col_alert.childs.push(alert_info)
                objs_filing_wagons_setup.push(col_bt_apply);
                objs_filing_wagons_setup.push(col_alert);
                objs_filing_wagons_setup.push(form_input_datetime_time_start);
                objs_filing_wagons_setup.push(form_input_datetime_time_stop);
                objs_filing_wagons_setup.push(form_select_devision_on);
                objs_filing_wagons_setup.push(form_select_status_load);
                objs_filing_wagons_setup.push(form_select_station_amkr_on);

                this.form_filing_wagons_setup.init({
                    alert: this.main_alert,
                    objs: objs_filing_wagons_setup,
                    id: null,
                    form_class: 'row g-3',
                    validation: true,
                    fn_validation: function (result) {
                        // Валидация успешна
                        if (result && result.valid) {
                            // Дополнительная проверка
                            // Определим режим
                            var mode = null;
                            var rows = this.tfws_unlc.tab_com.get_select_row();
                            if (this.id_filing !== null) {
                                if (this.id_filing === 0) {
                                    mode = 0;
                                } else {
                                    if (!rows || rows.length === 0) {
                                        mode = 1;
                                    } else {
                                        if (this.fw_status !== null) {
                                            mode = 2 + this.fw_status;
                                        }
                                    }
                                }
                            }
                            if (mode !== null) {
                                var valid = this.validation_filing(result, mode);
                                var dt_start = this.form_filing_wagons_setup.el.input_datetime_time_start.val();
                                var dt_stop = this.form_filing_wagons_setup.el.input_datetime_time_stop.val();
                                if (valid) {
                                    var message = "";
                                    switch (mode) {
                                        case 0: {
                                            message = langView('vounl_confirm_mess_apply_create_filing', App.Langs).format(this.form_filing_setup.el.select_id_station_unload.text(),
                                                this.form_from_setup.el.select_id_way_unload.text(),
                                                this.form_filing_wagons_setup.el.select_id_devision_on.text(),
                                                (this.filing_wagons ? this.filing_wagons.length : 0),
                                                (rows ? rows.length : 0),
                                                (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                            break;
                                        }
                                        case 1: {
                                            message = langView('vounl_confirm_mess_apply_update_filing', App.Langs).format(this.id_filing, this.form_filing_setup.el.select_id_station_unload.text(), this.form_filing_wagons_setup.el.select_id_devision_on.text());
                                            break;
                                        }
                                        case 2: {
                                            message = langView('vounl_confirm_mess_apply_update_filing_start_operation', App.Langs).format(this.id_filing,
                                                (rows ? rows.length : 0),
                                                (rows ? rows.length : 0),
                                                (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                            break;
                                        }
                                        case 3: {
                                            message = langView('vounl_confirm_mess_apply_update_filing_stop_operation', App.Langs).format(this.id_filing,
                                                (rows ? rows.length : 0),
                                                (rows ? rows.length : 0),
                                                (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                            break;
                                        }
                                        case 4: {
                                            message = langView('vounl_confirm_mess_apply_update_filing_status_operation', App.Langs).format(this.id_filing,
                                                (rows ? rows.length : 0),
                                                this.form_filing_wagons_setup.el.select_id_status_load.text());
                                            break;
                                        }
                                    }
                                    this.view_com.mcf_lg.open(
                                        langView('vounl_title_form_apply', App.Langs),
                                        message,
                                        function () {
                                            // Создать подачу
                                            if (mode === 0) {
                                                // Проверим наличие вагонов
                                                var list_wagons = [];
                                                if (this.filing_wagons && this.filing_wagons.length > 0) {
                                                    // Получим перечень вагонов и новую позицию
                                                    $.each(this.filing_wagons.sort(function (a, b) {
                                                        return a.position - b.position;
                                                    }), function (i, el) {
                                                        var row = rows.find(function (o) { return o.num === el.num }.bind(this));
                                                        list_wagons.push(
                                                            {
                                                                id_wim: el.idWim,
                                                                start: row && dt_start ? result.new.input_datetime_time_start._i : null,        // можно править пока подача не закрыта
                                                                stop: row && dt_stop ? result.new.input_datetime_time_stop._i : null,           // можно править пока подача не закрыта
                                                                id_wagon_operations: row ? el.currentCargoIdCargo === null ? 13 : 14 : null,    // (13,14) можно править пока подача не закрыта
                                                                id_status_load: row ? Number(result.new.select_id_status_load) : null           // можно править пока подача не закрыта
                                                            }
                                                        )
                                                    }.bind(this));
                                                    // Сформируем операцию

                                                    var operation = {
                                                        id_filing: this.id_filing,              // 0 новая, >0 Правим существующую
                                                        num_filing: null,                       // для погрузки
                                                        type_filing: this.type_filing,          // 1 = выгрузка
                                                        vesg: null,                             // для погрузки
                                                        id_way: this.id_way_unload,             // !только новая подача
                                                        id_division: this.division_on,          // можно править
                                                        create: result.new.input_datetime_time_start._i,// дата новая, null - Правим существующую
                                                        wagons: list_wagons
                                                    };
                                                    this.apply_add_filing(operation);
                                                }
                                            };
                                            // Править подачи
                                            if (mode === 1 && result.new.select_id_devision_on) {
                                                if (this.id_filing !== null) { }
                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    mode: mode,
                                                    id_division: Number(result.new.select_id_devision_on),
                                                };
                                                this.apply_update_filing(operation);
                                            };
                                            // Править открыть (закрыть) операцию
                                            if (mode === 2) {
                                                // Проверим наличие вагонов
                                                var list_wagons = [];
                                                if (rows && rows.length > 0 && this.id_filing !== null) {
                                                    $.each(rows, function (i, el) {
                                                        list_wagons.push(
                                                            {
                                                                id_wim: el.idWim,
                                                                start: row && dt_start ? result.new.input_datetime_time_start._i : null,        // можно править пока подача не закрыта
                                                                stop: row && dt_stop ? result.new.input_datetime_time_stop._i : null,           // можно править пока подача не закрыта
                                                                id_wagon_operations: row ? el.currentCargoIdCargo === null ? 13 : 14 : null,    // (13,14) можно править пока подача не закрыта
                                                                id_status_load: row ? Number(result.new.select_id_status_load) : null           // можно править пока подача не закрыта
                                                            }
                                                        )
                                                    }.bind(this));
                                                    // Сформируем операцию

                                                    var operation = {
                                                        id_filing: this.id_filing,
                                                        mode: mode,
                                                        wagons: list_wagons
                                                    };
                                                    this.apply_update_operation_filing(operation);
                                                }
                                            };
                                            // Править закрыть операцию
                                            if (mode === 3) {
                                                // Проверим наличие вагонов
                                                var list_wagons = [];
                                                if (rows && rows.length > 0 && this.id_filing !== null) {
                                                    $.each(rows, function (i, el) {
                                                        list_wagons.push(
                                                            {
                                                                id_wim: el.idWim,
                                                                start: null,
                                                                stop: row && dt_stop ? result.new.input_datetime_time_stop._i : null,           // можно править пока подача не закрыта
                                                                id_wagon_operations: el.currentIdOperation,
                                                                id_status_load: row ? Number(result.new.select_id_status_load) : null           // можно править пока подача не закрыта
                                                            }
                                                        )
                                                    }.bind(this));
                                                    // Сформируем операцию

                                                    var operation = {
                                                        id_filing: this.id_filing,
                                                        mode: mode,
                                                        wagons: list_wagons
                                                    };
                                                    this.apply_update_operation_filing(operation);
                                                }
                                            };
                                            // Править закрытую операцию (статус)
                                            if (mode === 4) {
                                                // Проверим наличие вагонов
                                                var list_wagons = [];
                                                if (rows && rows.length > 0 && this.id_filing !== null) {
                                                    $.each(rows, function (i, el) {
                                                        list_wagons.push(
                                                            {
                                                                id_wim: el.idWim,
                                                                start: null,
                                                                stop: null,           // можно править пока подача не закрыта
                                                                id_wagon_operations: el.currentIdOperation,
                                                                id_status_load: row ? Number(result.new.select_id_status_load) : null           // можно править пока подача не закрыта
                                                            }
                                                        )
                                                    }.bind(this));
                                                    // Сформируем операцию
                                                    var operation = {
                                                        id_filing: this.id_filing,
                                                        mode: mode,
                                                        wagons: list_wagons
                                                    };
                                                    this.apply_update_operation_filing(operation);
                                                }
                                            };
                                        }.bind(this),
                                        function () {
                                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vounl_mess_cancel_operation_mode_' + mode, App.Langs));
                                        }.bind(this)
                                    );
                                }
                            }
                        }
                    }.bind(this),
                    fn_html_init: function (res) { }.bind(this),
                    fn_element_init: null,
                    fn_init: function (init) {
                        this.filing_wagons_setup.$html.append(this.form_filing_wagons_setup.$form);
                        var alsert_info = $('div#alert-info');
                        this.filing_wagons_alert_info = new ALERT(alsert_info);
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[old_view_op_unloading_cars] [form_on_setup] process ' + process);
                        out_init(process);
                    }.bind(this),
                });
                // Создадим таблицы (this.filing_wagons_table)
                var row_filing_wagons = new this.view_com.fe_ui.bs_row({ id: 'op-unlc-filing-wagons', class: 'pt-2' });
                this.filing_wagons_table.$html.append(row_filing_wagons.$html);

                this.tfws_unlc = new TWS('div#op-unlc-filing-wagons');
                this.tfws_unlc.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'filing_wagons',
                    setup_buttons: [
                        {
                            name: 'select_all',
                            action: function () {
                                // Выбрать только не принятые вагоны
                                switch (this.fw_status) {
                                    case 1: {
                                        this.tfws_unlc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                            return !data.isMoving && data.filingStart !== null && data.filingEnd === null;
                                        }).select();
                                        break;
                                    }
                                    case 2: {
                                        this.tfws_unlc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                            return !data.isMoving && data.filingStart !== null && data.filingEnd !== null;
                                        }).select();
                                        break;
                                    }
                                    case 3: {
                                        this.tfws_unlc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                            return data.isMoving;
                                        }).select();
                                        break;
                                    }
                                    default: {
                                        this.tfws_unlc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                            return data.filingStart === null && data.filingEnd === null;
                                        }).select();
                                        break;
                                    }
                                }
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                        {
                            name: 'del_wagons_filing',
                            action: function (e, dt, node, config) {
                                this.tfws_unlc.tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        }
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[old_view_op_unloading_cars] [tfws_unlc] process ' + process);
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.filing_wagons_alert.clear_message();
                        if (rowData && rowData.length > 0) {
                            var rows = this.tfws_unlc.tab_com.get_select_row();
                            // Определим статус выбранной строки
                            var curr_status = 0;
                            var curr_status = this.get_status_fw_wagons(rowData);
                            if (rows !== null && rows.length > 0 && this.fw_status !== curr_status) {
                                e.preventDefault();
                                this.filing_wagons_alert.out_warning_message(langView('vounl_mess_warning_wagon_ban_select_status', App.Langs).format(rowData[0].num, this.view_status_fw_wagons(curr_status), this.view_status_fw_wagons(this.fw_status)));
                            } else {
                                this.fw_status = curr_status;
                            }
                        }

                    }.bind(this),
                    fn_select_rows: function (rows, type) {
                        // Сбросим статусы 
                        var sel_rows = this.tfws_unlc.tab_com.get_select_row();
                        if (sel_rows === null || sel_rows.length === 0) {
                            this.fw_status = null;
                        } else {
                            this.fw_status = this.get_status_fw_wagons(sel_rows);
                        }

                        this.view_setup_filing();
                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            this.view_wagons_of_filing(this.id_filing, function () { LockScreenOff(); }.bind(this));
                        }
                        if (name === 'del_wagons_filing') {
                            this.from_way_alert.clear_message();
                            this.form_filing_setup.clear_all();
                            this.form_filing_wagons_setup.clear_all();
                            this.form_from_setup.clear_all();
                            if (this.id_way_unload >= 0) {

                                // Убрать
                                var rows = this.tfws_unlc.tab_com.get_select_row();
                                if (rows !== null && rows.length > 0) {
                                    if (this.id_filing === 0) {
                                        // Это черновик
                                        LockScreen(langView('vounl_mess_create_filing_delete_wagon', App.Langs));
                                        // Выполнить операцию добавить вагоны
                                        $.each(rows, function (i, el) {
                                            var wagon = this.wagons.find(function (o) {
                                                return o.wimId === el.idWim;
                                            }.bind(this));
                                            if (wagon) { wagon['id_wir_unload'] = null; }
                                            // Проверим если в черновике нет вагонов тогда удалить признак черновика
                                            var res = this.wagons.filter(function (i) {
                                                return i.id_wir_unload !== null;
                                            }.bind(this));
                                            if (!res || res.length === 0) {
                                                this.id_filing = null;
                                            }

                                        }.bind(this));
                                        this.view_wagons(this.id_filing); // Обновить вагоны на пути приема
                                        LockScreenOff();

                                    } else {
                                        // Подача
                                        var buff = [];
                                        $.each(this.filing_wagons, function (i, el) {
                                            var res = rows.find(function (o) {
                                                return o.idWim === el.idWim;

                                            }.bind(this));
                                            if (!res) { buff.push(el) };
                                        }.bind(this));
                                        // Сколько осталось открытых операций
                                        var open = buff.filter(function (i) {
                                            return i.filingEnd == null;
                                        }.bind(this))
                                        // 
                                        this.view_com.mcf_lg.open(
                                            langView('vounl_title_form_apply', App.Langs),
                                            langView('vounl_confirm_mess_apply_delete_wagon_filing', App.Langs).format(rows.length, this.id_filing) + (!open || open.length === 0 ? langView('vounl_confirm_mess_apply_delete_wagon_warning_close', App.Langs) : ''),
                                            function () {
                                                // убрать вагоны из подачи
                                                LockScreen(langView('vounl_mess_del_filing', App.Langs));
                                                var list_wagons = [];
                                                $.each(rows, function (i, el) {
                                                    list_wagons.push(el.idWim);
                                                }.bind(this));
                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    wagons: list_wagons
                                                };
                                                this.apply_del_wagon_filing(operation);
                                            }.bind(this),
                                            function () {
                                                this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vounl_mess_cancel_operation_mode_delete_wagon', App.Langs));
                                            }.bind(this)
                                        );
                                    }
                                } else {
                                    this.from_way_alert.out_warning_message(langView('vounl_mess_not_select_wagon_return', App.Langs));
                                }

                            } else {
                                this.from_way_alert.out_warning_message(langView('vounl_mess_not_select_way_from', App.Langs));
                            }
                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {

                    }.bind(this),
                });

                //-------------------------------------------------------------------
                // Создадим форму (this.from_way_setup)
                this.form_from_setup = new FD();
                // Создать макет панели
                var objs_from_setup = [];

                var form_select_way_unload = {
                    obj: 'bs_form_select',
                    options: {
                        validation_group: 'common_from',
                        id: 'id_way_unload',
                        name: 'id_way_unload',
                        label: langView('vounl_title_label_way_from', App.Langs),
                        element_fsize: 'sm',
                        element_class: null,
                        element_value: null,
                        element_multiple: false,
                        element_title: null,
                        element_required: true,
                        element_readonly: false,
                        element_size: null,
                        element_options: {
                            data: [],
                            default: this.id_way_unload,
                            fn_change: function (e) {
                                e.preventDefault();
                                // Обработать выбор
                                var id = Number($(e.currentTarget).val());
                                this.id_filing_old = this.id_filing;
                                this.id_filing = null;
                                this.update(this.id_station_unload, id, function () {
                                    LockScreenOff();
                                }.bind(this));
                            }.bind(this),
                            fn_check: function (text) {

                            }.bind(this),
                        },
                        validation: true,
                        feedback_invalid: null,
                        feedback_valid: null,
                        feedback_class: null,
                        col_prefix: 'md',
                        col_size: 12,
                        col_class: 'mt-0',
                        form_text: langView('vounl_text_label_way_from', App.Langs),
                        form_text_class: null,
                    },
                    childs: []
                };

                objs_from_setup.push(form_select_way_unload);
                this.form_from_setup.init({
                    alert: this.main_alert,
                    objs: objs_from_setup,
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
                        this.from_way_setup.$html.append(this.form_from_setup.$form);
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[old_view_op_unloading_cars] [form_from_setup] process ' + process);
                        out_init(process);
                    }.bind(this),
                });
                // Создадим таблицы (this.from_way_table)
                var row_wagons_from_way = new this.view_com.fe_ui.bs_row({ id: 'op-unlc-wagons-from', class: 'pt-2' });
                this.from_way_table.$html.append(row_wagons_from_way.$html);

                this.twfrom_unlc = new TWS('div#op-unlc-wagons-from');
                this.twfrom_unlc.init({
                    alert: this.from_way_alert,
                    class_table: 'table table-sm table-success table-small table-striped table-bordered border-secondary',
                    detali_table: false,
                    type_report: 'unload_cars_from',
                    setup_buttons: [
                        {
                            name: 'select_all',
                            action: function () {
                                // Выбрать только не принятые вагоны
                                this.twfrom_unlc.tab_com.obj_t_report.rows(function (idx, data, node) {
                                    return !data.currentWagonBusy && !(data.idFiling !== null && data.wayFilingEnd === null) && data.id_wir_unload === null;
                                }).select();
                            }.bind(this)
                        },
                        { name: 'select_none', action: null },
                        {
                            name: 'add_filing',
                            action: function (e, dt, node, config) {
                                this.twfrom_unlc.tab_com.button_action(config.button, e, dt, node, config);
                            }.bind(this),
                            enabled: false
                        }
                    ],
                    link_num: false,
                    ids_wsd: null,
                    fn_init: function () {
                        // На проверку окончания инициализации
                        process--;
                        //console.log('[old_view_op_unloading_cars] [tocw_opoc] process ' + process);
                        out_init(process);
                    },
                    fn_action_view_detali: function (rows) {

                    },
                    fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                        this.from_way_alert.clear_message();
                        if (rowData && rowData.length > 0) {
                            if (rowData[0].currentWagonBusy) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('voprc_mess_warning_wagon_ban_busy', App.Langs).format(rowData[0].num));
                            }
                            if (rowData[0].idFiling !== null && rowData[0].idFiling == this.id_filing) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vounl_mess_warning_wagon_ban_exists', App.Langs).format(rowData[0].num, this.id_filing));
                            }
                            if (rowData[0].outgoingSostavStatus > 0) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('vounl_mess_warning_wagon_ban_status', App.Langs).format(rowData[0].num, rowData[0].outgoingSostavStatus));
                            }
                            if (rowData[0].id_wir_unload !== null) {
                                e.preventDefault();
                                this.from_way_alert.out_warning_message(langView('voprc_mess_warning_wagon_ban_filing_way', App.Langs).format(rowData[0].num));
                            }
                        }

                    }.bind(this),
                    fn_select_rows: function (rows) {

                    }.bind(this),
                    fn_select_link: function (link) {

                    }.bind(this),
                    fn_button_action: function (name, e, dt, node, config) {
                        if (name === 'eye') {
                            this.view_wagons_from();
                            LockScreenOff();
                        }
                        if (name === 'add_filing') {
                            this.from_way_alert.clear_message();
                            this.form_filing_setup.clear_all();
                            this.form_filing_wagons_setup.clear_all();
                            this.form_from_setup.clear_all();
                            if (this.id_way_unload >= 0) {
                                var open_filing = this.sostav_filing.find(function (o) {
                                    return o.filingCreate !== null && o.filingClose === null && o.filingIdWay === this.id_way_unload;
                                }.bind(this));
                                // Проверка на открытую подачу на пути создания новой

                                if (this.id_filing == null && open_filing) {
                                    e.preventDefault();
                                    this.from_way_alert.out_warning_message(langView('voprc_mess_warning_wagon_ban_new_filing', App.Langs).format(this.form_from_setup.el.select_id_way_unload.text(), open_filing.idWf));
                                } else {
                                    // Добавить
                                    var rows = this.twfrom_unlc.tab_com.get_select_row();
                                    if (rows !== null && rows.length > 0) {
                                        if (!this.id_filing) {
                                            this.id_filing_old = null;
                                            // Создать черновик
                                            LockScreen(langView('vounl_mess_create_filing', App.Langs));
                                            // Выполнить операцию добавить вагоны
                                            $.each(rows, function (i, el) {
                                                el['id_wir_unload'] = el.wirId;
                                            }.bind(this));
                                            this.view_wagons(this.id_filing); // Обновить вагоны на пути приема
                                            LockScreenOff();

                                        } else {
                                            this.view_com.mcf_lg.open(
                                                langView('vounl_title_form_apply', App.Langs),
                                                langView('vounl_confirm_mess_apply_add_wagon_filing', App.Langs).format(rows.length, this.id_filing),
                                                function () {
                                                    // Добавить вагоны в существующую подачу
                                                    LockScreen(langView('vounl_mess_add_filing', App.Langs));
                                                    var list_wagons = [];
                                                    $.each(rows, function (i, el) {
                                                        list_wagons.push(el.wimId);
                                                    }.bind(this));
                                                    var operation = {
                                                        id_filing: this.id_filing,
                                                        wagons: list_wagons
                                                    };
                                                    this.apply_add_wagon_filing(operation);
                                                }.bind(this),
                                                function () {
                                                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vounl_mess_cancel_operation_mode_add_wagon', App.Langs));
                                                }.bind(this));
                                        }
                                    } else {
                                        this.from_way_alert.out_warning_message(langView('vounl_mess_not_select_wagon_from', App.Langs));
                                    }
                                }
                            } else {
                                this.from_way_alert.out_warning_message(langView('vounl_mess_not_select_way_from', App.Langs));
                            }


                        }
                    }.bind(this),
                    fn_enable_button: function (tb) {

                    }.bind(this),
                });
                //--
            }.bind(this));
        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    old_view_op_unloading_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('vounl_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_filing_setup.clear_all();
        this.form_filing_wagons_setup.clear_all();
        this.form_filing_wagons_setup.el.button_filing_add.hide();
        this.form_filing_wagons_setup.el.button_filing_apply.hide();
        this.form_filing_wagons_setup.el.input_datetime_time_start.val(moment());
        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
        this.wagons = [];
        this.wagons_filing = [];
        this.id_filing = null;          // id подачи (изменяется при выборе подачи)
        this.id_filing_old = null;
        this.id_way_filing = null;      // id пути (изменяется при выборе подачи)
        this.station_on = -1;           // станция подачи (изменяется при выборе подачи)
        this.division_on = -1;          // подразделение подачи (изменяется при выборе подачи)
        this.create_filing = null;      // время создания подачи (изменяется при выборе подачи)
        this.close_filing = null;       // время закрытия подачи (изменяется при выборе подачи)
        this.fw_status = null;          // Статус выбраноых вагонов в подаче (0-null, 1-начата, 2-закрыта, 3-закрыта и вагон уже нестоит)
        // Определим время выборки
        var date = this.form_filing_setup.el.input_datetime_time_period_start.val();
        switch (this.type) {
            case 1: {
                // жд.сутки
                this.start = moment(date).subtract(1, 'd').set({ 'hour': 20, 'minute': 1, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 20, 'minute': 0, 'second': 0 })._d;
                this.card_filing.header.$html.empty().append(langView('vounl_card_header_filing', App.Langs) + ' [ ' + langView('vounl_title_period_1', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
            case 2: {
                //календарные сутки
                this.start = moment(date).set({ 'hour': 0, 'minute': 1, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                this.card_filing.header.$html.empty().append(langView('vounl_card_header_filing', App.Langs) + ' [ ' + langView('vounl_title_period_2', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
            case 3: {
                // месяц
                this.start = moment(date).set({ 'date': 1, 'hour': 0, 'minute': 1, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 0 })._d;
                this.card_filing.header.$html.empty().append(langView('vounl_card_header_filing', App.Langs) + ' [ ' + langView('vounl_title_period_3', App.Langs) + ' : ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
            default: {
                // по умолчанию
                this.start = moment(date).set({ 'hour': 0, 'minute': 0, 'second': 0 })._d;
                this.stop = moment(date).set({ 'hour': 23, 'minute': 59, 'second': 59 })._d;
                this.card_filing.header.$html.empty().append(langView('vounl_card_header_filing', App.Langs) + ' [ ' + moment(this.start).format("YYYY-MM-DD HH:mm") + " - " + moment(this.stop).format("YYYY-MM-DD HH:mm") + " ]");
                break;
            }
        };
        // Сбросим вагоны переноса
        this.id_station_unload = -1;
        var id_station = -1;
        this.id_way_unload = -1;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_filing_setup.el.select_id_station_unload.val(id_station);

            }
        };
        this.update(id_station, id_way, function () {
            LockScreenOff();
        }.bind(this));
    }
    // Проверка вагоны выбраны?
    old_view_op_unloading_cars.prototype.isAddWagon = function (callback_ok, callback_not) {
        var wagons_add = this.wagons.filter(function (i) {
            return i.id_wir_unload !== null;
        }.bind(this));
        if (wagons_add && wagons_add.length > 0) {
            if (typeof callback_ok === 'function') {
                callback_ok(wagons_add.length);
            }
        } else {
            if (typeof callback_not === 'function') {
                callback_not(0);
            }
        }
    }
    // Обновить все
    old_view_op_unloading_cars.prototype.update = function (id_station, id_way_unload, callback) {
        // Обновим состояние станции
        this.update_station(id_station, id_way_unload, function () {
            this.view_wagons(this.id_filing);
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновим состояние станции
    old_view_op_unloading_cars.prototype.update_station = function (id_station, id_way, callback) {
        this.confirm_update_station(id_station,
            function () { // Ok
                // обновим компонент пути отправки
                this.list_way = this.view_com.api_dir.getListValueTextLoadUnloadWaysOfStation(id_station);
                this.form_from_setup.el.select_id_way_unload.update(this.list_way, id_way);
                // Обновим станцию
                this.id_station_unload = id_station;
                // Загрузим подачи по станции
                this.load_of_filing_wagon(id_station, function () {
                    // Не сбрасывать в начале
                    if (this.id_way_unload > 0) {
                        id_way = -1;
                        $.each(this.wagons, function (i, el) {
                            el['id_wir_unload'] = null;
                        }.bind(this));
                    }
                    // Обновим пути
                    this.update_from_way(id_way,
                        function (upd) {
                            if (typeof callback === 'function') {
                                callback(true);
                            }
                        }.bind(this)
                    );
                }.bind(this));

            }.bind(this),
            function () { // Cancel
                // Обновим данные на пути
                this.update_from_way(id_way,
                    function () {
                        if (typeof callback === 'function') {
                            callback(false);
                        }
                    }.bind(this)
                );
            }.bind(this));
    }
    // Проверка и подтверждение изменений по станции
    old_view_op_unloading_cars.prototype.confirm_update_station = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station_unload !== id_station) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vounl_confirm_title', App.Langs),
                        langView('vounl_confirm_mess_change_station', App.Langs).format(this.form_filing_setup.el.select_id_station_unload.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_filing_setup.el.select_id_station_unload.val(this.id_station_unload);
                            if (typeof callback_cancel === 'function') {
                                callback_cancel();
                            }
                        }.bind(this)
                    );
                }.bind(this),
                function () {
                    // нет выбранных вагонов
                    if (typeof callback_ok === 'function') {
                        callback_ok();
                    }
                }.bind(this)
            );
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Обновим вагоны на пути отправки
    old_view_op_unloading_cars.prototype.update_from_way = function (id_way, callback) {
        this.confirm_update_way_from(id_way,
            function () { // Ok
                // выберим путь на компоненте пути отправки
                this.form_from_setup.el.select_id_way_unload.val(id_way);

                this.load_of_way(id_way, function () {
                    //this.id_filing = null;
                    if (typeof callback === 'function') {
                        callback(true);
                    }
                }.bind(this));

            }.bind(this),
            function () { // Cancel
                this.id_filing = this.id_filing_old !== null ? this.id_filing_old : this.id_filing;
                if (typeof callback === 'function') {
                    callback(false);
                }
            }.bind(this));
    }
    // Проверка и подтверждение изменений по пути отправки
    old_view_op_unloading_cars.prototype.confirm_update_way_from = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way_unload !== id_way) {
            this.isAddWagon(
                function (count) {
                    // есть вагоны
                    this.view_com.mcf.open(
                        langView('vounl_confirm_title', App.Langs),
                        langView('vounl_confirm_mess_change_way', App.Langs).format(this.form_from_setup.el.select_id_way_unload.text(), count),
                        function () {
                            if (typeof callback_ok === 'function') {
                                callback_ok();
                            }
                        }.bind(this),
                        function () {
                            this.form_from_setup.el.select_id_way_unload.val(this.id_way_unload);
                            if (typeof callback_cancel === 'function') {
                                callback_cancel();
                            }
                        }.bind(this)
                    );
                }.bind(this),
                function () {
                    // нет выбранных вагонов
                    if (typeof callback_ok === 'function') {
                        callback_ok();
                    }
                }.bind(this)
            );
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Загрузить вагоны на выбраном пути начала дислокации в масив this.wagons (подготовить поля для вагонов приема)
    old_view_op_unloading_cars.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way_unload = id_way;
            LockScreen(langView('vounl_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        /*                        el['position_new'] = null;*/
                        el['id_wir_unload'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.id_way_unload = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    // Загрузим подачи на станции
    old_view_op_unloading_cars.prototype.load_of_filing_wagon = function (id_station, callback) {
        if (id_station !== null && id_station >= 0) {
            LockScreen(langView('vounl_mess_load_filing_wagon', App.Langs));

            var start = moment(this.start).format("YYYY-MM-DDTHH:mm");
            var stop = moment(this.stop).format("YYYY-MM-DDTHH:mm");
            this.view_com.api_wsd.getViewWagonsFilingOfPeriodIdStation(start, stop, id_station, function (wagons) {
                this.sostav_filing = [];
                // Выберем вагоны только определенного типа подач
                var wagons = wagons.filter(function (i) { return i.typeFiling === this.type_filing }.bind(this));
                $.each(wagons, function (key, el) {
                    var st = this.sostav_filing.find(function (o) {
                        return o.idWf === el.idWf;
                    }.bind(this));
                    if (!st) {
                        this.sostav_filing.push({
                            idWf: el.idWf,
                            statusFiling: (el.filingCreate !== null ? (el.filingClose !== null ? 2 : 1) : 0),
                            numFiling: el.numFiling,
                            typeFiling: el.typeFiling,
                            filingIdStation: el.filingIdStation,
                            filingStationNameRu: el.filingStationNameRu,
                            filingStationNameEn: el.filingStationNameEn,
                            filingStationAbbrRu: el.filingStationAbbrRu,
                            filingStationAbbrEn: el.filingStationAbbrEn,
                            filingIdPark: el.filingIdPark,
                            filingParkNameRu: el.filingParkNameRu,
                            filingParkNameEn: el.filingParkNameEn,
                            filingParkAbbrRu: el.filingParkAbbrRu,
                            filingParkAbbrEn: el.filingParkAbbrEn,
                            filingIdWay: el.filingIdWay,
                            filingWayNumRu: el.filingWayNumRu,
                            filingWayNumEn: el.filingWayNumEn,
                            filingWayNameRu: el.filingWayNameRu,
                            filingWayNameEn: el.filingWayNameEn,
                            filingWayAbbrRu: el.filingWayAbbrRu,
                            filingWayAbbrEn: el.filingWayAbbrEn,
                            filingWayIdDevision: el.filingWayIdDevision,
                            countFilingWagons: 1,
                            countUnloadingWagons: el.filingWayEnd !== null ? 1 : 0,
                            filingDivisionIdDivision: el.filingDivisionIdDivision,
                            filingDivisionCode: el.filingDivisionCode,
                            filingDivisionNameRu: el.filingDivisionNameRu,
                            filingDivisionNameEn: el.filingDivisionNameEn,
                            filingDivisionAbbrRu: el.filingDivisionAbbrRu,
                            filingDivisionAbbrEn: el.filingDivisionAbbrEn,
                            startFiling: el.startFiling,
                            endFiling: el.endFiling,
                            filingCreate: el.filingCreate,
                            filingCreateUser: el.filingCreateUser,
                            filingChange: el.filingChange,
                            filingChangeUser: el.filingChangeUser,
                            filingClose: el.filingClose,
                            filingCloseUser: el.filingCloseUser,

                        });
                    } else {
                        st.countFilingWagons++;
                        st.countUnloadingWagons += (el.filingWayEnd !== null ? 1 : 0);
                    }
                }.bind(this));
                this.wagons_filing = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons_filing);
                }
            }.bind(this));
        } else {
            this.sostav_filing = [];
            this.wagons_filing = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons_filing);
            }
        }
    };
    // Показать все (сотавы, вагоны)
    old_view_op_unloading_cars.prototype.view_wagons = function (id_filing) {
        // Очистить сообщения и форму
        this.form_filing_setup.clear_all();
        this.form_filing_wagons_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать вагоны на пути формирования подачи
        this.view_wagons_from();
        // Показать подачи
        this.view_filing(id_filing);
        // Показать вагоны в подаче
        this.view_wagons_of_filing(id_filing, function () {

        });
    };
    // Показать вагоны на пути формирования подачи
    old_view_op_unloading_cars.prototype.view_wagons_from = function () {
        var wagons = this.wagons;
        if (this.twfrom_unlc.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wir_unload === null && !i.currentWagonBusy;
            });
        }
        this.twfrom_unlc.view(wagons, null);
    };
    // Показать список подач
    old_view_op_unloading_cars.prototype.view_filing = function (id_filing) {

        var sostav_filing = [];
        // сделаем копию, что-бы небыло задвоения
        sostav_filing = JSON.parse(JSON.stringify(this.sostav_filing));
        var wagons_filing_add = this.wagons.filter(function (i) {
            return i.id_wir_unload !== null;
        });
        if (wagons_filing_add !== null && wagons_filing_add.length > 0) {

            var station = this.stations.find(function (o) { return o.id === this.id_station_unload }.bind(this));
            var way = this.ways.find(function (o) { return o.id === this.id_way_unload }.bind(this));
            var park = way ? this.park_ways.find(function (o) { return o.id === way.idPark }.bind(this)) : null;
            var division = way ? this.divisions.find(function (o) { return o.id === way.idDevision }.bind(this)) : null;

            if (station && way && park) {
                sostav_filing.push({
                    idWf: 0,
                    statusFiling: 0,
                    numFiling: null,
                    typeFiling: this.type_filing,
                    filingIdStation: this.id_station_unload,
                    filingStationNameRu: station.stationNameRu,
                    filingStationNameEn: station.stationNameEn,
                    filingStationAbbrRu: station.stationAbbrRu,
                    filingStationAbbrEn: station.stationAbbrEn,
                    filingIdPark: park.id,
                    filingParkNameRu: park.parkNameRu,
                    filingParkNameEn: park.parkNameEn,
                    filingParkAbbrRu: park.parkAbbrRu,
                    filingParkAbbrEn: park.parkAbbrEn,
                    filingIdWay: this.id_way_unload,
                    filingWayNumRu: way.wayNumRu,
                    filingWayNumEn: way.wayNumEn,
                    filingWayNameRu: way.wayNameRu,
                    filingWayNameEn: way.wayNameEn,
                    filingWayAbbrRu: way.wayAbbrRu,
                    filingWayAbbrEn: way.wayAbbrEn,
                    filingWayIdDevision: way.idDevision,
                    countFilingWagons: wagons_filing_add.length,
                    countUnloadingWagons: 0,
                    filingDivisionIdDivision: division ? division.id : null,
                    filingDivisionCode: division ? division.code : null,
                    filingDivisionNameRu: division ? division.nameDivisionRu : null,
                    filingDivisionNameEn: division ? division.nameDivisionEn : null,
                    filingDivisionAbbrRu: division ? division.divisionAbbrRu : null,
                    filingDivisionAbbrEn: division ? division.divisionAbbrEn : null,
                    startFiling: null,
                    endFiling: null,
                    filingCreate: null,
                    filingCreateUser: null,
                    filingChange: null,
                    filingChangeUser: null,
                    filingClose: null,
                    filingCloseUser: null,
                });
            } else {
                // Сообщение об ошибке
                this.form_filing_setup.validation_common_filing.out_error_message(langView('voprc_mess_eror_add_new_filing', App.Langs).format(wagons_filing_add.length, !station ? 'error' : 'ok', !park ? 'error' : 'ok', !way ? 'error' : 'ok'));
            }
        }
        if (this.tlf_unlc.tab_com.eye) {
            // Показать открытые на выбнаном пути
            sostav_filing = sostav_filing.filter(function (i) {
                return i.statusFiling !== 2 && i.filingIdWay === this.id_way_unload;
            }.bind(this));
        }
        this.tlf_unlc.view(sostav_filing, id_filing);
    };
    // Показать вагоны подачи
    old_view_op_unloading_cars.prototype.view_wagons_of_filing = function (id_filing, callback) {
        this.filing_wagons = []; // Сформируем вагоны в выбранной подаче 
        if (id_filing !== null) {
            if (id_filing > 0) {
                this.filing_wagons = this.wagons_filing.filter(function (i) {
                    return i.idWf === id_filing;
                }.bind(this));
                if (!this.filing_wagons || this.filing_wagons.length === 0) {
                    this.id_filing = null; this.id_filing_old = null;
                }
            } else {
                var wagons_filing_add = this.wagons.filter(function (i) {
                    return i.id_wir_unload !== null;
                }).sort(function (a, b) { return a.position - b.position });
                if (wagons_filing_add !== null && wagons_filing_add.length > 0) {
                    // Получим список вагонов
                    $.each(wagons_filing_add, function (key, el) {
                        this.filing_wagons.push({
                            idWim: el.wimId,
                            idWir: el.wirId,
                            isMoving: 0,
                            idWf: 0,
                            numFiling: null,
                            note: null,
                            startFiling: null,
                            endFiling: null,
                            filingCreate: null,
                            filingCreateUser: null,
                            filingChange: null,
                            filingChangeUser: null,
                            filingClose: null,
                            filingCloseUser: null,
                            num: el.num,
                            position: el.position,
                            filingWayStart: null,
                            filingWayEnd: null,
                            filingStart: null,
                            filingEnd: null,
                            filingWimCreate: null,
                            filingWimCreateUser: null,
                            filingWimClose: null,
                            filingWimCloseUser: null,
                            filingIdStation: null,
                            filingStationNameRu: null,
                            filingStationNameEn: null,
                            filingStationAbbrRu: null,
                            filingStationAbbrEn: null,
                            filingIdPark: null,
                            filingParkNameRu: null,
                            filingParkNameEn: null,
                            filingParkAbbrRu: null,
                            filingParkAbbrEn: null,
                            filingIdWay: null,
                            filingWayNumRu: null,
                            filingWayNumEn: null,
                            filingWayNameRu: null,
                            filingWayNameEn: null,
                            filingWayAbbrRu: null,
                            filingWayAbbrEn: null,
                            filingWayCapacity: null,
                            filingWayIdDevision: null,
                            filingWayClose: null,
                            filingWayDelete: null,
                            filingWayNote: null,
                            filingDivisionIdDivision: null,
                            filingDivisionCode: null,
                            filingDivisionNameRu: null,
                            filingDivisionNameEn: null,
                            filingDivisionAbbrRu: null,
                            filingDivisionAbbrEn: null,
                            wagonAdm: el.wagonAdm,
                            wagonAdmNameRu: el.wagonAdmNameRu,
                            wagonAdmNameEn: el.wagonAdmNameEn,
                            wagonAdmAbbrRu: el.wagonAdmAbbrRu,
                            wagonAdmAbbrEn: el.wagonAdmAbbrEn,
                            wagonRod: el.wagonRod,
                            wagonRodNameRu: el.wagonRodNameRu,
                            wagonRodNameEn: el.wagonRodNameEn,
                            wagonRodAbbrRu: el.wagonRodAbbrRu,
                            wagonRodAbbrEn: el.wagonRodAbbrEn,
                            wagonTypeRu: el.wagonTypeRu,
                            wagonTypeEn: el.wagonTypeEn,
                            idOperator: el.idOperator,
                            operatorsRu: el.operatorsRu,
                            operatorsEn: el.operatorsEn,
                            operatorAbbrRu: el.operatorAbbrRu,
                            operatorAbbrEn: el.operatorAbbrEn,
                            operatorRentStart: el.operatorRentStart,
                            operatorRentEnd: el.operatorRentEnd,
                            operatorPaid: el.operatorPaid,
                            operatorColor: el.operatorColor,
                            operatorMonitoringIdleTime: el.operatorMonitoringIdleTime,
                            idLimitingLoading: el.idLimitingLoading,
                            limitingNameRu: el.limitingNameRu,
                            limitingNameEn: el.limitingNameEn,
                            limitingAbbrRu: el.limitingAbbrRu,
                            limitingAbbrEn: el.limitingAbbrEn,
                            arrivalConditionNameRu: el.arrivalConditionNameRu,
                            arrivalConditionNameEn: el.arrivalConditionNameEn,
                            arrivalConditionAbbrRu: el.arrivalConditionAbbrRu,
                            arrivalConditionAbbrEn: el.arrivalConditionAbbrEn,
                            arrivalConditionRed: el.arrivalConditionRed,
                            currentConditionNameRu: el.currentConditionNameRu,
                            currentConditionNameEn: el.currentConditionNameEn,
                            currentConditionAbbrRu: el.currentConditionAbbrRu,
                            currentConditionAbbrEn: el.currentConditionAbbrEn,
                            currentConditionRed: el.currentConditionRed,
                            arrivalCargoGroupNameRu: el.arrivalCargoGroupNameRu,
                            arrivalCargoGroupNameEn: el.arrivalCargoGroupNameEn,
                            arrivalCargoNameRu: el.arrivalCargoNameRu,
                            arrivalCargoNameEn: el.arrivalCargoNameEn,
                            arrivalIdSertificationData: el.arrivalIdSertificationData,
                            arrivalSertificationDataRu: el.arrivalSertificationDataRu,
                            arrivalSertificationDataEn: el.arrivalSertificationDataEn,
                            arrivalStationFromCode: el.arrivalStationFromCode,
                            arrivalStationFromNameRu: el.arrivalStationFromNameRu,
                            arrivalStationFromNameEn: el.arrivalStationFromNameEn,
                            arrivalStationAmkrIdStation: el.arrivalStationAmkrIdStation,
                            arrivalStationAmkrNameRu: el.arrivalStationAmkrNameRu,
                            arrivalStationAmkrNameEn: el.arrivalStationAmkrNameEn,
                            arrivalStationAmkrAbbrRu: el.arrivalStationAmkrAbbrRu,
                            arrivalStationAmkrAbbrEn: el.arrivalStationAmkrAbbrEn,
                            arrivalDivisionAmkrIdDivision: el.arrivalDivisionAmkrIdDivision,
                            arrivalDivisionAmkrCode: el.arrivalDivisionAmkrCode,
                            arrivalDivisionAmkrNameRu: el.arrivalDivisionAmkrNameRu,
                            arrivalDivisionAmkrNameEn: el.arrivalDivisionAmkrNameEn,
                            arrivalDivisionAmkrAbbrRu: el.arrivalDivisionAmkrAbbrRu,
                            arrivalDivisionAmkrAbbrEn: el.arrivalDivisionAmkrAbbrEn,
                            currentIdLoadingStatus: el.currentIdLoadingStatus,
                            currentLoadingStatusRu: el.currentLoadingStatusRu,
                            currentLoadingStatusEn: el.currentLoadingStatusEn,
                            currentIdOperation: el.currentIdOperation,
                            currentOperationNameRu: el.currentOperationNameRu,
                            currentOperationNameEn: el.currentOperationNameEn,
                            currentOperationStart: el.currentOperationStart,
                            currentOperationEnd: el.currentOperationEnd,
                            //TODO: После исправления функции вагоны на пути
                            // (будут добавлены новые поля текущий груз, тек цех пол, тек цех погр..)
                            // а пока предварительно эти с null
                            //-------------------------------------------------
                            currentCargoGroupIdGroup: null,
                            currentCargoGroupNameRu: null,
                            currentCargoGroupNameEn: null,
                            currentCargoIdCargo: null,
                            currentCargoNameRu: null,
                            currentCargoNameEn: null,
                            currentDivisionAmkrIdDivision: null,
                            currentDivisionAmkrCode: null,
                            currentDivisionAmkrNameRu: null,
                            currentDivisionAmkrNameEn: null,
                            currentDivisionAmkrAbbrRu: null,
                            currentDivisionAmkrAbbrEn: null,
                            currentStationAmkrIdStation: null,
                            currentStationAmkrNameRu: null,
                            currentStationAmkrNameEn: null,
                            currentStationAmkrAbbrRu: null,
                            currentStationAmkrAbbrEn: null
                            //-------------------------------------------------
                        });
                    }.bind(this))
                } else {
                    this.form_filing_setup.validation_common_filing.out_error_message(langView('voprc_mess_eror_new_filing_not_wagon', App.Langs));
                }
            };
        }
        var vagons_view = this.filing_wagons;
        if (this.tfws_unlc.tab_com.eye) {
            vagons_view = vagons_view.filter(function (i) {
                return i.filingEnd === null;
            });
        }
        this.tfws_unlc.view(vagons_view, null);
        this.view_setup_filing();
        // Событие обновили данные
        if (typeof callback === 'function') {
            callback(vagons_view);
        }
    };
    // Показать статус вагона
    old_view_op_unloading_cars.prototype.view_status_fw_wagons = function (fw_st) {
        switch (fw_st) {
            case 0: { return langView('vounl_title_status_0', App.Langs); }
            case 1: { return langView('vounl_title_status_1', App.Langs); }
            case 2: { return langView('vounl_title_status_2', App.Langs); }
            case 3: { return langView('vounl_title_status_3', App.Langs); }
            default: { return langView('vounl_title_status_null', App.Langs); }
        };
    };
    // Определим статус выбранной строки
    old_view_op_unloading_cars.prototype.get_status_fw_wagons = function (rows) {
        if (rows && rows.length > 0) {

            if (!rows[0].isMoving) {
                if (rows[0].filingStart !== null) {
                    if (rows[0].filingEnd !== null) {
                        return 2;
                    } else {
                        return 1;
                    }
                }
            } else {
                return 3;
            }
        }
        return 0;
    }
    // Показать настройки подачи
    old_view_op_unloading_cars.prototype.view_setup_filing = function () {
        this.form_filing_setup.clear_all();
        this.form_filing_wagons_setup.clear_all();
        this.filing_wagons_alert_info.clear_message();
        this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_start', App.Langs));


        // Обновим кнопку добавить в подачу\создать черновик
        var rows = this.tfws_unlc.tab_com.get_select_row();
        var bts = this.twfrom_unlc.tab_com.obj_t_report.buttons([7]);
        bts.enable();
        bts.text(langView('vounl_title_button_new_filing', App.Langs));
        //bts.titleAttr(langView('vounl_title_attr_button_new_filing', App.Langs));
        var fws_bts = this.tfws_unlc.tab_com.obj_t_report.buttons([7]);
        fws_bts.disable();

        // Сбросим все настройки
        this.form_filing_wagons_setup.el.button_filing_add.hide();
        this.form_filing_wagons_setup.el.button_filing_apply.hide();
        this.form_filing_wagons_setup.el.button_operation_apply.hide();

        this.form_filing_wagons_setup.el.input_datetime_time_start.val(null);
        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
        this.form_filing_wagons_setup.el.select_id_devision_on.val(-1);
        this.form_filing_wagons_setup.el.select_id_status_load.val(-1);
        this.form_filing_wagons_setup.el.select_id_station_amkr_on.val(-1);

        this.form_filing_wagons_setup.el.input_datetime_time_start.disable();
        this.form_filing_wagons_setup.el.input_datetime_time_stop.disable();
        this.form_filing_wagons_setup.el.select_id_devision_on.disable();
        this.form_filing_wagons_setup.el.select_id_status_load.disable();
        this.form_filing_wagons_setup.el.select_id_station_amkr_on.disable();

        if (this.id_filing === 0) {
            // черновик
            fws_bts.enable();
            this.filing_wagons_alert_info.clear_message();
            this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_draft', App.Langs));
            this.form_filing_wagons_setup.el.button_filing_add.show();
            this.form_filing_wagons_setup.el.button_filing_apply.hide();
            this.form_filing_wagons_setup.el.button_operation_apply.hide();
            this.form_filing_wagons_setup.el.input_datetime_time_start.enable();
            this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
            this.form_filing_wagons_setup.el.select_id_devision_on.enable();
            this.form_filing_wagons_setup.el.select_id_status_load.enable();
            //--
            this.form_filing_wagons_setup.el.input_datetime_time_start.val(this.create_filing ? moment(this.create_filing) : moment());
            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(this.create_filing ? moment(this.close_filing) : null);
            this.form_filing_wagons_setup.el.select_id_devision_on.enable();
            this.form_filing_wagons_setup.el.select_id_devision_on.val(this.division_on);
            this.form_filing_wagons_setup.el.select_id_station_amkr_on.val(this.station_on);
        };
        if (this.id_filing > 0) {
            bts.text(langView('vounl_title_button_add_filing', App.Langs));
            this.filing_wagons_alert_info.clear_message();

            //bts.titleAttr(langView('vounl_title_attr__button_add_filing', App.Langs));
            if (this.close_filing !== null) bts.disable();
            // Выбрана подача (покажем данные по подаче)
            if (this.create_filing) {
                this.form_filing_wagons_setup.el.button_filing_add.hide();
                if (this.close_filing === null) this.form_filing_wagons_setup.el.button_filing_apply.show();
                this.form_filing_wagons_setup.el.button_operation_apply.hide();
            } else {
                this.form_filing_wagons_setup.el.button_filing_add.show();
                this.form_filing_wagons_setup.el.button_filing_apply.hide();
                this.form_filing_wagons_setup.el.button_operation_apply.hide();
            }
            this.form_filing_wagons_setup.el.input_datetime_time_start.val(this.create_filing ? moment(this.create_filing) : moment());
            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(this.create_filing ? moment(this.close_filing) : null);
            if (this.close_filing === null) {
                this.form_filing_wagons_setup.el.select_id_devision_on.enable();
                this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_filing', App.Langs));
            } else {
                this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_filing_close', App.Langs));
            }
            //this.form_filing_wagons_setup.el.select_id_station_amkr_on.enable();
            this.form_filing_wagons_setup.el.select_id_devision_on.val(this.division_on);
            this.form_filing_wagons_setup.el.select_id_status_load.val(this.status_load);
            this.form_filing_wagons_setup.el.select_id_station_amkr_on.val(this.station_on);

            switch (this.fw_status) {
                case 0: {
                    fws_bts.enable();
                    this.filing_wagons_alert_info.clear_message();
                    this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_wagon_mode_0', App.Langs));
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_apply.show();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.enable();
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                    this.form_filing_wagons_setup.el.select_id_devision_on.disable();
                    this.form_filing_wagons_setup.el.select_id_status_load.enable();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.val(moment());
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
                    break;
                }
                case 1: {
                    this.filing_wagons_alert_info.clear_message();
                    this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_wagon_mode_1', App.Langs));
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_apply.show();
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                    this.form_filing_wagons_setup.el.select_id_devision_on.disable();
                    this.form_filing_wagons_setup.el.select_id_status_load.enable();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length > 0 ? moment(rows[0].filingStart) : null);
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
                    break;
                }
                case 2: {
                    this.filing_wagons_alert_info.clear_message();
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    this.form_filing_wagons_setup.el.select_id_devision_on.disable();

                    if (this.close_filing === null) {
                        this.form_filing_wagons_setup.el.select_id_status_load.enable();
                        this.form_filing_wagons_setup.el.button_operation_apply.show();
                        this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_wagon_mode_2', App.Langs));

                    } else {
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_wagon_mode_2_close', App.Langs));
                    }
                    //this.form_filing_wagons_setup.el.select_id_station_amkr_on.disable();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length > 0 ? moment(rows[0].filingStart) : null);
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length > 0 ? moment(rows[0].filingEnd) : null);
                    this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length > 0 ? rows[0].currentIdLoadingStatus : -1);
                    break;
                }
                case 3: {
                    this.filing_wagons_alert_info.clear_message();
                    this.filing_wagons_alert_info.out_info_message(langView('vounl_mess_info_wagon_mode_3', App.Langs));
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                    this.form_filing_wagons_setup.el.select_id_devision_on.disable();
                    this.form_filing_wagons_setup.el.select_id_status_load.disable();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length > 0 ? moment(rows[0].filingStart) : null);
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length > 0 ? moment(rows[0].filingEnd) : null);
                    this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length > 0 ? rows[0].currentIdLoadingStatus : -1);
                    break;
                }
            }
        }
    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    old_view_op_unloading_cars.prototype.validation_filing = function (result, mode) {

        // 0- add; >0 id ; null -not edit
        if (this.id_filing === null) { return false; }
        var valid = true;
        var el_dtstart = this.form_filing_wagons_setup.el.input_datetime_time_start.$element;
        var el_dtstop = this.form_filing_wagons_setup.el.input_datetime_time_stop.$element;
        var el_sl = this.form_filing_wagons_setup.el.select_id_status_load.$element;
        var el_dv = this.form_filing_wagons_setup.el.select_id_devision_on.$element;
        var el_stamkr = this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element;

        // Время начала
        if (mode === 0 || mode === 2) {
            // Создать подачу и операции над вагонами
            // Проверим время начала
            if (result.new && result.new.input_datetime_time_start) {
                var curr = moment();
                var aplly = moment(result.new.input_datetime_time_start);
                var minutes = aplly.diff(curr, 'minutes');
                if (minutes < min_dt_apply) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstart), langView('vounl_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                    valid = false;
                }
                if (minutes > max_dt_apply) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstart), langView('vounl_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                    valid = false;
                }
            }
        }
        // Время конца 
        if (mode === 3) {
            if (result.new && result.new.input_datetime_time_stop === null) {
                this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vounl_mess_error_time_aplly', App.Langs));
                valid = false;
            }
        }
        // Время конца
        if (mode === 0 || mode === 2 || mode === 3) {
            // Проверим время окончания
            if (result.new && result.new.input_datetime_time_stop) {
                var curr = moment();
                var dtstop = moment(result.new.input_datetime_time_stop);
                var minutes = dtstop.diff(curr, 'minutes');
                if (minutes < min_dt_apply) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vopss_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                    valid = false;
                }
                if (minutes > max_dt_apply) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vopss_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                    valid = false;
                }
            }
        }
        // Проверим соотношение начало и конца
        if (mode === 0 || mode === 2 || mode === 3) {
            // Проверим время начала и окончания
            if (result.new && result.new.input_datetime_time_start && result.new.input_datetime_time_stop) {
                var dtstart = moment(result.new.input_datetime_time_start);
                var dtstop = moment(result.new.input_datetime_time_stop);
                var minutes = dtstop.diff(dtstart, 'minutes');
                if (minutes < min_period || minutes > max_period) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vounl_mess_error_period_time', App.Langs).format(min_period, max_period));
                    valid = false;
                }
            }
        }
        // Проверим вагоны в подаче
        if (mode === 0) {
            // Проверим вагоны в подаче
            if (this.filing_wagons === null || this.filing_wagons.length === 0) {
                this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vounl_mess_error_not_wagons_filing', App.Langs));
                valid = false;
            }
        }
        // проверка выбранных вагонов
        if (mode === 0 || mode === 2 || mode === 3) {
            // Проверим выбранные вагоны для открытия и закрытия операции
            var rows = this.tfws_unlc.tab_com.get_select_row();
        }
        // проверка выбранных для операций вагонов
        if (mode === 0 || mode === 2 || mode === 3) {
            // должно быть выставлено время конца
            if (result.new && result.new.input_datetime_time_stop) {
                if (!rows || rows.length === 0) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vounl_mess_error_not_wagons_close_filing', App.Langs));
                    valid = false;
                }
            } else {
                if (result.new && result.new.select_id_status_load >= 0) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vounl_mess_error_time_aplly', App.Langs));
                    valid = false;
                }
            }
        }
        // проверка статуса
        if (mode === 0 || mode === 2 || mode === 3) {
            // должно быть выставлено время конца
            if (result.new && result.new.input_datetime_time_stop) {
                valid = valid & this.form_filing_wagons_setup.validation_common_filing_wagons.check_control_select_not_null($(el_sl), langView('vounl_mess_error_not_wagons_status_close_filing', App.Langs), null, true)
            }
        }
        // проверка подразделения
        if (mode === 1) {
            valid = valid & this.form_filing_wagons_setup.validation_common_filing_wagons.check_control_select_not_null($(el_dv), langView('vounl_mess_error_filing_division', App.Langs), null, true)
        }
        // проверка подразделения
        if (mode === 1) {
            valid = valid & this.form_filing_wagons_setup.validation_common_filing_wagons.check_control_select_not_null($(el_stamkr), langView('vounl_mess_error_filing_station_amkr', App.Langs), null, true)
        }
        return valid;
    }
    // выполнить операцию создать подачу
    old_view_op_unloading_cars.prototype.apply_add_filing = function (data) {
        LockScreen(langView('vounl_mess_run_operation_add_filing', App.Langs));
        this.view_com.api_wsd.postAddFilingUnloading(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[old_view_op_unloading_cars] [postAddFilingUnloading] :' + mess);
                this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                        console.log('[old_view_op_unloading_cars] [postAddFilingUnloading] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                if (result && result.result > 0) {
                    // Очистить сообщения и форму
                    this.form_filing_setup.clear_all();
                    this.form_filing_wagons_setup.clear_all();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.val(moment());
                    this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    var pr_2 = 2;
                    var out_pr2 = function (pr_2) {
                        if (pr_2 === 0) {
                            this.view_wagons(this.id_filing);
                            this.form_filing_wagons_setup.validation_common_filing_wagons.out_info_message(langView('vounl_mess_ok_operation_add_filing', App.Langs).format(result.count));
                            if (typeof this.settings.fn_db_update === 'function') {
                                //TODO: можно добавить возвращать перечень для обновления
                                typeof this.settings.fn_db_update();
                            }
                            LockScreenOff();
                        }
                    }.bind(this);
                    // Обновим пути отправки 1 поток
                    this.load_of_way(this.id_way_unload, function () {
                        pr_2--;
                        out_pr2(pr_2);
                    }.bind(this));
                    // Обновим пути приема 2 поток
                    this.load_of_filing_wagon(this.id_station_unload, function () {
                        pr_2--;
                        out_pr2(pr_2);
                    }.bind(this));
                } else {
                    LockScreenOff();
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vounl_mess_error_operation_run_add_filing', App.Langs).format(result ? result.result : -1));
                    // Выведем ошибки по вагонно.
                    if (result && result.listResult) {
                        $.each(result.listResult, function (i, el) {
                            if (el.result <= 0) this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vounl_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                        }.bind(this));
                    }
                }
            }
        }.bind(this));
    };
    // Выполнить операцию править подачу (цех получатель)
    old_view_op_unloading_cars.prototype.apply_update_filing = function (data) {
        LockScreen(langView('vounl_mess_run_operation_update_filing', App.Langs));
        this.view_com.api_wsd.postUpdateFilingUnloading(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[old_view_op_unloading_cars] [postUpdateFilingUnloading] :' + mess);
                this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                        console.log('[old_view_op_unloading_cars] [postUpdateFilingUnloading] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                this.apply_update(result, langView('vounl_mess_ok_operation_update_filing', App.Langs).format(this.id_filing));
            }
        }.bind(this));
    };
    // Выполнить операцию открыть-закрыть операции над вагонами (+ админка)
    old_view_op_unloading_cars.prototype.apply_update_operation_filing = function (data) {
        LockScreen(langView('vounl_mess_run_operation_update_operation_filing', App.Langs));
        this.view_com.api_wsd.postUpdateFilingOperationUnloading(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[old_view_op_unloading_cars] [postUpdateFilingOperationUnloading] :' + mess);
                this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                        console.log('[old_view_op_unloading_cars] [postUpdateFilingOperationUnloading] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                this.apply_update(result, langView('vounl_mess_ok_operation_update_operation_filing', App.Langs).format(result.count, this.id_filing));
            }
        }.bind(this));
    };
    // Выполнить операцию добавить в подачу вагоны
    old_view_op_unloading_cars.prototype.apply_add_wagon_filing = function (data) {
        LockScreen(langView('vounl_mess_run_operation_add_wagon_filing', App.Langs));
        this.view_com.api_wsd.postAddWagonFiling(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[old_view_op_unloading_cars] [postAddWagonFiling] :' + mess);
                this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                        console.log('[old_view_op_unloading_cars] [postAddWagonFiling] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                this.apply_update(result, langView('vounl_mess_ok_operation_add_wagon_filing', App.Langs).format(result.count, this.id_filing));
            }
        }.bind(this));
    }
    // Выполнить операцию убрать вагоны из подачи
    old_view_op_unloading_cars.prototype.apply_del_wagon_filing = function (data) {
        LockScreen(langView('vounl_mess_run_operation_del_wagon_filing', App.Langs));
        this.view_com.api_wsd.postDeleteWagonFiling(data, function (result) {
            // Проверим на ошибку выполнения запроса api
            if (result && result.status) {
                var mess = langView('voprc_mess_error_api', App.Langs).format(result.status, result.title);
                console.log('[old_view_op_unloading_cars] [postDeleteWagonFiling] :' + mess);
                this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(mess);
                if (result.errors) {
                    for (var err in result.errors) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(err + ":" + result.errors[err]);
                        console.log('[old_view_op_unloading_cars] [postDeleteWagonFiling] :' + err + ":" + result.errors[err]);
                    }
                }
                LockScreenOff();
            } else {
                this.apply_update(result, langView('vounl_mess_ok_operation_del_wagon_filing', App.Langs).format(result.count, this.id_filing));
            }
        }.bind(this));
    }
    // Обновить информацию в таблицах или выввести ошибки после выполнения операций
    old_view_op_unloading_cars.prototype.apply_update = function (result, mess_ok, mess_err) {
        if (result && result.result > 0) {
            // Очистить сообщения и форму
            this.form_filing_setup.clear_all();
            this.form_filing_wagons_setup.clear_all();
            var pr_2 = 2;
            var out_pr2 = function (pr_2) {
                if (pr_2 === 0) {
                    // Покажем вагоны и выберем подачу
                    this.view_wagons(this.id_filing);
                    this.view_setup_filing();
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_info_message(mess_ok);
                    if (typeof this.settings.fn_db_update === 'function') {
                        //TODO: можно добавить возвращать перечень для обновления
                        typeof this.settings.fn_db_update();
                    }
                    LockScreenOff();
                }
            }.bind(this);
            // Обновим пути отправки 1 поток
            this.load_of_way(this.id_way_unload, function () {
                pr_2--;
                out_pr2(pr_2);
            }.bind(this));
            // Обновим пути приема 2 поток
            this.load_of_filing_wagon(this.id_station_unload, function () {
                pr_2--;
                out_pr2(pr_2);
            }.bind(this));
        } else {
            LockScreenOff();
            this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vounl_mess_error_operation_run_wagon_filing', App.Langs).format(result ? result.result : -1));
            // Выведем ошибки по вагонно.
            if (result && result.listResult) {
                $.each(result.listResult, function (i, el) {
                    if (el.result <= 0) this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vounl_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                }.bind(this));
            }
        }
    }
    // Очистить сообщения
    old_view_op_unloading_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    old_view_op_unloading_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.old_view_op_unloading_cars = old_view_op_unloading_cars;

    window.App = App;

})(window);
