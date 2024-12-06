/* ===============================================
-= Модуль панель операции "ПОГРУЗКА ВАГОНОВ" =-
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
            'vopulc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ВЫГРУЗКА ВАГОНОВ"',

            'vopulc_title_form_add': 'Создать подачу',
            'vopulc_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            'vopulc_title_form_apply': 'Править подачу',
            'vopulc_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            'vopulc_title_form_operation_apply': 'Править операцию',
            'vopulc_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            'vopulc_title_time_start': 'Время начала',
            'vopulc_text_time_start': 'Время начала операции ограниченно +(-)1день',
            'vopulc_title_placeholder_time_start': 'Время начала',

            'vopulc_title_time_stop': 'Время окончания',
            'vopulc_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            'vopulc_title_placeholder_time_stop': 'Время окончания',

            'vopulc_title_label_devision_on': 'Цех получатель:',
            'vopulc_text_label_devision_on': 'Выберите цех получатель...',
            'vopulc_title_label_status_load': 'Статус:',
            'vopulc_text_label_status_load': 'Выберите статус (груж./порож.)...',
            'vopulc_title_label_station_amkr_on': 'Станция приб. АМКР:',
            'vopulc_text_label_station_amkr_on': 'Выберите станцию приб. АМКР...',




            //'vopulc_title_label_period': 'Выборка за:',
            //'vopulc_title_time_period_start': 'С даты',
            //'vopulc_text_time_period_start': 'Выборка с указаной даты',
            //'vopulc_title_placeholder_time_period_start': 'Время начала',
            //'vopulc_title_label_station': 'Станция выгрузки:',
            //'vopulc_text_label_station': 'Выберите станцию выгрузки...',
            //'vopulc_title_label_devision_on': 'Цех получатель:',
            //'vopulc_text_label_devision_on': 'Выберите цех получатель...',
            //'vopulc_title_label_status_load': 'Статус:',
            //'vopulc_text_label_status_load': 'Выберите статус (груж./порож.)...',
            //'vopulc_title_label_station_amkr_on': 'Станция приб. АМКР:',
            //'vopulc_text_label_station_amkr_on': 'Выберите станцию приб. АМКР...',

            //'vopulc_title_label_way_from': 'Путь отправления:',
            //'vopulc_text_label_way_from': 'Выберите путь начала дислокации...',



            //'vopulc_title_label_locomotive1': 'Локомотив №1:',
            //'vopulc_title_label_locomotive2': 'Локомотив №2:',
            //'vopulc_title_placeholder_locomotive': ' № локомотива',

            //'vopulc_title_time_start': 'Время начала',
            //'vopulc_text_time_start': 'Время начала операции ограниченно +(-)1день',
            //'vopulc_title_placeholder_time_start': 'Время начала',

            //'vopulc_title_time_stop': 'Время окончания',
            //'vopulc_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            //'vopulc_title_placeholder_time_stop': 'Время окончания',

            //'vopulc_title_form_add': 'Создать подачу',
            //'vopulc_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            //'vopulc_title_form_apply': 'Править подачу',
            //'vopulc_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            //'vopulc_title_form_operation_apply': 'Править операцию',
            //'vopulc_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            //'vopulc_title_period_1': 'ЖД сутки',
            //'vopulc_title_period_2': 'Календарные сутки',
            //'vopulc_title_period_3': 'От начала месяца',

            //'vopulc_title_status_null': 'Неопределен?',
            //'vopulc_title_status_0': 'Без операции',
            //'vopulc_title_status_1': 'Операция начата',
            //'vopulc_title_status_2': 'Операция завершена',
            //'vopulc_title_status_3': 'Вагон покинул путь',

            //'vopulc_title_button_new_period': 'Обновить данные, применить новый период выборки.',
            'vopulc_title_button_new_filing': 'Создать черновик',
            //'vopulc_title_attr_button_new_filing': 'Создать черновик подачи по выбранным вагонам.',
            'vopulc_title_button_add_filing': 'Добавить в подачу',
            //'vopulc_title_attr__button_add_filing': 'Добавить в текущую подачу выбранные вагоны.',

            'vopulc_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            'vopulc_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать операцию, для этого укажите дату начала операции и по необходимости дату завершения, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            'vopulc_mess_info_filing': 'Выбрана подача. Чтобы исправить цех погрузки укажите новый цех и нажмите «Править подачу». Чтобы выполнить операции над вагонами выберите вагон(ы).',
            'vopulc_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            'vopulc_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции и по необходимости дату завершения и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны», если нужно выбрать вагоны с открытыми и закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopulc_mess_info_wagon_mode_1': 'Выбран(ы) вагоны, по которым открыта операция. Укажите дату завершения операции и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с открытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или закрытыми операциями нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopulc_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция. Вы можете править только статус, укажите другой статус и нажмите “править операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны с закрытой операцией нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',
            'vopulc_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача. Операции не доступны!',
            'vopulc_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',


            //'vopulc_mess_warning_wagon_ban_exists': 'Вагон № {0} для операций заблокирован (вагон уже пренадлежит выбранной подаче :[{1}])',
            //'vopulc_mess_warning_wagon_ban_status': 'Вагон № {0} для операций заблокирован (вагон принадлежит составу подготовленому к отправке, который имеет статус :[{1}])',
            //'vopulc_mess_warning_wagon_ban_select_status': 'Вагон № {0} для выбора заблокирован (статус вагона :[{1}], отличается от статуса выбранных ранее вагонов :[{2}])',
            //'vopulc_mess_warning_change_filing_ban': 'Смена подачи недопустима завершите операцию с "Черновиком"',


            //'voprc_mess_warning_wagon_ban_filing_way': 'Вагон № {0} для операций заблокирован (вагон уже выбран для подачи)',
            //'voprc_mess_warning_wagon_ban_busy': 'Вагон № {0} для операций заблокирован (предъявлен,незакрытая подача, незаконченая операция...)',
            //'voprc_mess_warning_wagon_ban_new_filing': 'Запрет! На пути :[{0}] не закрытая подача [{1}]. Операция создания новой - невозможна!',

            //'voprc_mess_eror_add_new_filing': 'Выбранно № {0} вагонов, не могу сформировать новую подачу (ошибка определения станции {1}, парка {2}, пути {3})',
            //'voprc_mess_eror_new_filing_not_wagon': 'В новой подаче отсутствуют вагоны',

            //'vopulc_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            //'vopulc_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив № {0}',
            'vopulc_mess_error_time_aplly': 'Укажите дату завершения операции',
            'vopulc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) = {0}',
            'vopulc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) = {0}',
            'vopulc_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            'vopulc_mess_error_not_wagons_close_filing': 'Выберите вагоны для завершения операции вподаче (в окне «ВАГОНЫ В ПОДАЧИ», выберите вагоны).',
            'vopulc_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',
            'vopulc_mess_error_filing_division': 'Выберите цех получатель',
            'vopulc_mess_error_filing_station_amkr': 'Выберите станцию выгрузки',
            'vopulc_mess_error_period_time': 'Операция должна длиться в диапазоне от {0} до {1} мин.',
            //'vopulc_mess_error_operation_run_add_filing': 'При создании подачи для «ВЫГРУЗКИ ВАГОНОВ» произошла ошибка, код ошибки: {0}',
            //'vopulc_mess_error_operation_run_wagon_filing': 'При выполнении операции с вагонами подачи, произошла ошибка, код ошибки: {0}',

            //'vopulc_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',
            //'voprc_mess_error_api': 'Ошибка выполнения запроса status: {0}, title: {1}',


            'vopulc_mess_cancel_operation_mode_0': 'Отмена операции создать подачу для "ВЫГРУЗКИ ВАГОНОВ"!',
            'vopulc_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ВЫГРУЗКИ ВАГОНОВ"!',
            'vopulc_mess_cancel_operation_mode_2': 'Отмена операции начала "ВЫГРУЗКИ" над вагонами подачи!',
            'vopulc_mess_cancel_operation_mode_3': 'Отмена завершения операции "ВЫГРУЗКИ" над вагонами подачи!',
            'vopulc_mess_cancel_operation_mode_4': 'Отмена правки статуса вагона после "ВЫГРУЗКИ"!',



            //'vopulc_mess_cancel_operation_mode_add_wagon': 'Отмена операции добавления вагонов в подачу для "ВЫГРУЗКИ ВАГОНОВ"',
            //'vopulc_mess_cancel_operation_mode_delete_wagon': 'Отмена операции удаления вагонов из подачи "ВЫГРУЗКИ ВАГОНОВ"',
            //'vopulc_mess_cancel_operation_mode_clear_draft': 'Отмена операции "Удалить черновик подачи"',

            //'vopulc_title_operation_type_filing_1': '"ВЫГРУЗКИ ВАГОНОВ"',
            //'vopulc_mess_run_operation_add_filing': 'Выполняю операцию создать подачу для "ВЫГРУЗКИ ВАГОНОВ"',
            //'vopulc_mess_run_operation_update_operation_filing': 'Выполняю операцию править операции "ВЫГРУЗКА ВАГОНОВ" в подаче.',
            //'vopulc_mess_run_operation_update_filing': 'Выполняю операцию править подачу "ВЫГРУЗКИ ВАГОНОВ"',
            //'vopulc_mess_run_operation_add_wagon_filing': 'Выполняю операцию добавить вагон(ы) в подачу.',
            //'vopulc_mess_run_operation_del_wagon_filing': 'Выполняю операцию убрать вагон(ы) из подачи.',
            //'vopulc_mess_not_select_wagon_from': 'Выберите вагоны для формирования подачи!',
            //'vopulc_mess_not_select_way_from': 'Выберите путь с которого будет сформирована подача!',
            //'vopulc_mess_not_select_wagon_return': 'Выберите вагоны которые нужно убрать из подачи!',
            //'vopulc_mess_not_select_way_return': 'Выберите путь на который будут возвращены вагоны!',

            //'vopulc_mess_ok_operation_add_filing': 'Подача создана, определено {0} (ваг.)',
            //'vopulc_mess_ok_operation_update_operation_filing': 'Обновлена операция по вагонам {0} шт. в подаче [{1}].',
            //'vopulc_mess_ok_operation_update_filing': 'Обновлена информация в подаче [{1}].',
            //'vopulc_mess_ok_operation_add_wagon_filing': 'Вагоны в количестве {0} шт. добавлены в подачу [{1}].',
            //'vopulc_mess_ok_operation_del_wagon_filing': 'Вагоны в количестве {0} шт. удалены из подачи [{1}].',

            'vopulc_mess_load_operation': 'Загружаю операции...',
            //'vopulc_mess_load_wagons': 'Загружаю вагоны на пути...',
            //'vopulc_mess_load_filing_wagon': 'Загружаю вагоны подач...',

            'vopulc_mess_init_panel': 'Выполняю инициализацию модуля ...',
            //'vopulc_mess_create_filing': 'Формирую "черновик" подачи, переношу вагоны...',
            //'vopulc_mess_create_filing_delete_wagon': 'Формирую "черновик" подачи, удаляю вагоны...',
            //'vopulc_mess_add_filing': 'Переношу вагоны в существующую подачу.',
            //'vopulc_mess_del_filing': 'Удаляю вагоны из существующей подачи.',
            //'vopulc_mess_clear_draft': 'Удаляю черновик подачи.',

            'vopulc_confirm_title': 'Внимание!',
            'vopulc_confirm_mess_apply_create_filing': 'Создать подачу для операции "ВЫГРУЗКА ВАГОНОВ" на станции {0}, на пути {1}, в подразделении {2}? Определено для подачи {3} ваг., определено для выгрузки {4} ваг., закрыта выгрузка по {5} вагонам.',
            'vopulc_confirm_mess_apply_update_filing': 'Править подачу {0}, выбрана станция АМКР: [{1}], выбранно подразделение: [{2}]? Станция и подразделение будет обновлено по всем вагонам подачи!',
            'vopulc_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала выгрузки {2} ваг., закрыта выгрузка по {3} вагонам.',
            'vopulc_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}. Определено для правки {1} ваг., закрыта выгрузка по {2} вагонам.',
            'vopulc_confirm_mess_apply_update_filing_status_operation': 'Править подачу {0}. Определено для правки {1} ваг., указан новый статус {2}.',
            'vopulc_confirm_mess_apply_clear_draft': 'Убрать черновик подачи созданный на пути [{0}]?.',


            //'vopulc_confirm_mess_apply_add_wagon_filing': 'Добавить {0} вагона(ов) в существующую подачу {1}.',
            //'vopulc_confirm_mess_apply_delete_wagon_filing': 'Удалить {0} вагона(ов) из существующей подачи {1}.',
            //'vopulc_confirm_mess_apply_delete_wagon_warning_close': ' ВНИМАНИЕ! подача будет закрыта автоматически (все вагоны в подаче имеют статус завершенной операции).',

            //'vopulc_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию {0}? Все вагоны для подачи в количестве {1} будут сброшены! ',
            //'vopulc_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь для подачи {0}? Все выбранные для подачи в количестве {1} будут сброшены! ',

        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // js/module/view_op_common.js
    var VIEW_COMMON = App.view_op_common;
    var VIEW_CFILING = App.view_op_common_filing;

    var ALERT = App.alert_form;
    var FD = App.form_dialog;
    // js/module/ws/table_ws.js
    var TWS = App.table_ws;
    function view_op_unloading_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
        this.cfiling = new VIEW_CFILING();
    }

    // инициализация модуля
    view_op_unloading_cars.prototype.init = function (options) {
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
        // Инициализация при старте (обявдение доп переменных)
        var start_init = function () {

        }
        // Загрузка дополнительных библиотек ()
        var load_db_operation = function (callback) {
            if (typeof callback === 'function') {
                callback();
            }
        }
        // Продолжение инициализации после загрузки всех библиотек (привязка к новым переменным)
        var after_loading_init = function (callback) {

            this.list_status_load = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(this.settings.wagon_operation);
            if (typeof callback === 'function') {
                callback();
            }
        }
        // Инициализация формы выбора периода и станции подач
        var init_form_filing_setup = function (callback) {
            //-------------------------------------------------------------------
            // Создадим форму (this.filing_setup)
        }
        // Инициализация формы правки вагонов в подаче
        var init_form_filing_wagons_setup = function (callback) {
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
                    text: langView('vopulc_title_form_add', App.Langs),
                    title: langView('vopulc_title_form_add_title', App.Langs),
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
                    text: langView('vopulc_title_form_apply', App.Langs),
                    title: langView('vopulc_title_form_apply_title', App.Langs),
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
                    text: langView('vopulc_title_form_operation_apply', App.Langs),
                    title: langView('vopulc_title_form_operation_apply_title', App.Langs),
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
                    label: langView('vopulc_title_time_start', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopulc_title_placeholder_time_start', App.Langs),
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
                    form_text: langView('vopulc_text_time_start', App.Langs),
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
                    label: langView('vopulc_title_time_stop', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('vopulc_title_placeholder_time_stop', App.Langs),
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
                    form_text: langView('vopulc_text_time_stop', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_devision_from = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_devision_from',
                    name: 'id_devision_from',
                    label: langView('vopulc_title_label_devision_on', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: true,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.list_devision,
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
                    form_text: langView('vopulc_text_label_devision_on', App.Langs),
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
                    label: langView('vopulc_title_label_status_load', App.Langs),
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
                    form_text: langView('vopulc_text_label_status_load', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_select_station_amkr_from = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_station_amkr_from',
                    name: 'id_station_amkr_from',
                    label: langView('vopulc_title_label_station_amkr_on', App.Langs),
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
                    form_text: langView('vopulc_text_label_station_amkr_on', App.Langs),
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
            objs_filing_wagons_setup.push(form_select_devision_from);
            objs_filing_wagons_setup.push(form_select_status_load);
            objs_filing_wagons_setup.push(form_select_station_amkr_from);

            this.form_filing_wagons_setup.init({
                alert: this.main_alert,
                objs: objs_filing_wagons_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка. Определим режим
                        var mode = null;
                        var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
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
                            var valid = this.validation(result, mode);
                            var dt_start = this.form_filing_wagons_setup.el.input_datetime_time_start.val();
                            var dt_stop = this.form_filing_wagons_setup.el.input_datetime_time_stop.val();
                            if (valid) {
                                var message = "";
                                switch (mode) {
                                    case 0: {
                                        message = langView('vopulc_confirm_mess_apply_create_filing', App.Langs).format(this.form_filing_setup.el.select_id_station_unload.text(),
                                            this.form_from_setup.el.select_id_way_unload.text(),
                                            this.form_filing_wagons_setup.el.select_id_devision_from.text(),
                                            (this.filing_wagons ? this.filing_wagons.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                        break;
                                    }
                                    case 1: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing', App.Langs).format(this.id_filing, this.form_filing_setup.el.select_id_station_unload.text(), this.form_filing_wagons_setup.el.select_id_devision_from.text());
                                        break;
                                    }
                                    case 2: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing_start_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                        break;
                                    }
                                    case 3: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing_stop_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            (rows ? rows.length : 0),
                                            (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                        break;
                                    }
                                    case 4: {
                                        message = langView('vopulc_confirm_mess_apply_update_filing_status_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            this.form_filing_wagons_setup.el.select_id_status_load.text());
                                        break;
                                    }
                                }
                                this.view_com.mcf_lg.open(
                                    langView('vopulc_title_form_apply', App.Langs),
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
                                                    id_division: this.division_from,          // можно править
                                                    //create: result.new.input_datetime_time_start._i,// дата новая, null - Правим существующую
                                                    wagons: list_wagons
                                                };
                                                this.apply_add_filing(operation);
                                            }
                                        };
                                        // Править подачи
                                        if (mode === 1 && result.new.select_id_devision_from) {
                                            if (this.id_filing !== null) { }
                                            var operation = {
                                                id_filing: this.id_filing,
                                                mode: mode,
                                                id_division: Number(result.new.select_id_devision_from),
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
                                                            start: dt_start ? result.new.input_datetime_time_start._i : null,   // можно править пока подача не закрыта
                                                            stop: dt_stop ? result.new.input_datetime_time_stop._i : null,      // можно править пока подача не закрыта
                                                            id_wagon_operations: el.currentCargoIdCargo === null ? 13 : 14,     // (13,14) можно править пока подача не закрыта
                                                            id_status_load: Number(result.new.select_id_status_load)            // можно править пока подача не закрыта
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
                                                            stop: dt_stop ? result.new.input_datetime_time_stop._i : null,           // можно править пока подача не закрыта
                                                            id_wagon_operations: el.currentIdOperation,
                                                            id_status_load: Number(result.new.select_id_status_load)            // можно править пока подача не закрыта
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
                                                            stop: null,                                                     // можно править пока подача не закрыта
                                                            id_wagon_operations: el.currentIdOperation,
                                                            id_status_load: Number(result.new.select_id_status_load)       // можно править пока подача не закрыта
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
                                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('vopulc_mess_cancel_operation_mode_' + mode, App.Langs));
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
                    if (typeof callback === 'function') {
                        callback();
                    }
                }.bind(this),
            });
        }
        // Инициализация формы вагонов на пути
        var init_form_from_setup = function (callback) {
            //-------------------------------------------------------------------
            // Создадим форму (this.from_way_setup)
        }

        // Завершенеие инициализации [this.cfiling]
        var out_init_cfiling = function () {
            // Выход с общей инициализации
            if (typeof this.settings.fn_init === 'function') {
                console.log('Close view_op_unloading_cars');

                this.settings.fn_init(this.result_init);
            }
        }
        // Получение строки подача из списка вагонов (для операции)
        var get_sostav_filing = function (row, station, way, park, division, wagons) {
            return {
                idFiling: row ? row.idFiling : 0,
                statusFiling: row ? (row.createFiling !== null ? (row.closeFiling !== null ? 2 : 1) : 0) : 0,
                numFiling: row ? row.numFiling : null,
                typeFiling: row ? row.typeFiling : this.type_filing,
                filingIdStation: row ? row.filingIdStation : this.id_station_unload,
                filingStationNameRu: row ? row.filingStationNameRu : station.stationNameRu,
                filingStationNameEn: row ? row.filingStationNameEn : station.stationNameEn,
                filingStationAbbrRu: row ? row.filingStationAbbrRu : station.stationAbbrRu,
                filingStationAbbrEn: row ? row.filingStationAbbrEn : station.stationAbbrEn,
                filingIdPark: row ? row.filingIdPark : park.id,
                filingParkNameRu: row ? row.filingParkNameRu : park.parkNameRu,
                filingParkNameEn: row ? row.filingParkNameEn : park.parkNameEn,
                filingParkAbbrRu: row ? row.filingParkAbbrRu : park.parkAbbrRu,
                filingParkAbbrEn: row ? row.filingParkAbbrEn : park.parkAbbrEn,
                filingIdWay: row ? row.filingIdWay : this.id_way_unload,
                filingWayNumRu: row ? row.filingWayNumRu : way.wayNumRu,
                filingWayNumEn: row ? row.filingWayNumEn : way.wayNumEn,
                filingWayNameRu: row ? row.filingWayNameRu : way.wayNameRu,
                filingWayNameEn: row ? row.filingWayNameEn : way.wayNameEn,
                filingWayAbbrRu: row ? row.filingWayAbbrRu : way.wayAbbrRu,
                filingWayAbbrEn: row ? row.filingWayAbbrEn : way.wayAbbrEn,
                filingWayIdDevision: row ? row.filingWayIdDevision : way.idDevision,
                countFilingWagons: row ? 1 : wagons.length,
                countUnloadingWagons: row ? (row.filingWayEnd !== null ? 1 : 0) : 0,
                filingDivisionIdDivision: row ? row.filingDivisionIdDivision : division ? division.id : null,
                filingDivisionCode: row ? row.filingDivisionCode : division ? division.code : null,
                filingDivisionNameRu: row ? row.filingDivisionNameRu : division ? division.nameDivisionRu : null,
                filingDivisionNameEn: row ? row.filingDivisionNameEn : division ? division.nameDivisionEn : null,
                filingDivisionAbbrRu: row ? row.filingDivisionAbbrRu : division ? division.divisionAbbrRu : null,
                filingDivisionAbbrEn: row ? row.filingDivisionAbbrEn : division ? division.divisionAbbrEn : null,
                startFiling: row ? row.startFiling : null,
                endFiling: row ? row.endFiling : null,
                createFiling: row ? row.createFiling : null,
                createUserFiling: row ? row.createUserFiling : null,
                changeFiling: row ? row.changeFiling : null,
                changeUserFiling: row ? row.changeUserFiling : null,
                closeFiling: row ? row.closeFiling : null,
                closeUserFiling: row ? row.closeUserFiling : null,
            }
        }
        // Получение строки вагона в подаче (для операции)
        var get_filing_wagons = function (row) {
            return {
                idWim: row.wimId,
                idWir: row.wirId,
                isMoving: 0,
                idFiling: 0,
                numFiling: null,
                note: null,
                startFiling: null,
                endFiling: null,
                createFiling: null,
                createUserFiling: null,
                changeFiling: null,
                changeUserFiling: null,
                closeFiling: null,
                closeUserFiling: null,
                num: row.num,
                position: row.position,
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
                wagonAdm: row.wagonAdm,
                wagonAdmNameRu: row.wagonAdmNameRu,
                wagonAdmNameEn: row.wagonAdmNameEn,
                wagonAdmAbbrRu: row.wagonAdmAbbrRu,
                wagonAdmAbbrEn: row.wagonAdmAbbrEn,
                wagonRod: row.wagonRod,
                wagonRodNameRu: row.wagonRodNameRu,
                wagonRodNameEn: row.wagonRodNameEn,
                wagonRodAbbrRu: row.wagonRodAbbrRu,
                wagonRodAbbrEn: row.wagonRodAbbrEn,
                wagonTypeRu: row.wagonTypeRu,
                wagonTypeEn: row.wagonTypeEn,
                idOperator: row.idOperator,
                operatorsRu: row.operatorsRu,
                operatorsEn: row.operatorsEn,
                operatorAbbrRu: row.operatorAbbrRu,
                operatorAbbrEn: row.operatorAbbrEn,
                operatorRentStart: row.operatorRentStart,
                operatorRentEnd: row.operatorRentEnd,
                operatorPaid: row.operatorPaid,
                operatorColor: row.operatorColor,
                operatorMonitoringIdleTime: row.operatorMonitoringIdleTime,
                idLimitingLoading: row.idLimitingLoading,
                limitingNameRu: row.limitingNameRu,
                limitingNameEn: row.limitingNameEn,
                limitingAbbrRu: row.limitingAbbrRu,
                limitingAbbrEn: row.limitingAbbrEn,
                arrivalConditionNameRu: row.arrivalConditionNameRu,
                arrivalConditionNameEn: row.arrivalConditionNameEn,
                arrivalConditionAbbrRu: row.arrivalConditionAbbrRu,
                arrivalConditionAbbrEn: row.arrivalConditionAbbrEn,
                arrivalConditionRed: row.arrivalConditionRed,
                currentConditionNameRu: row.currentConditionNameRu,
                currentConditionNameEn: row.currentConditionNameEn,
                currentConditionAbbrRu: row.currentConditionAbbrRu,
                currentConditionAbbrEn: row.currentConditionAbbrEn,
                currentConditionRed: row.currentConditionRed,
                arrivalCargoGroupNameRu: row.arrivalCargoGroupNameRu,
                arrivalCargoGroupNameEn: row.arrivalCargoGroupNameEn,
                arrivalCargoNameRu: row.arrivalCargoNameRu,
                arrivalCargoNameEn: row.arrivalCargoNameEn,
                arrivalIdSertificationData: row.arrivalIdSertificationData,
                arrivalSertificationDataRu: row.arrivalSertificationDataRu,
                arrivalSertificationDataEn: row.arrivalSertificationDataEn,
                arrivalStationFromCode: row.arrivalStationFromCode,
                arrivalStationFromNameRu: row.arrivalStationFromNameRu,
                arrivalStationFromNameEn: row.arrivalStationFromNameEn,
                arrivalStationAmkrIdStation: row.arrivalStationAmkrIdStation,
                arrivalStationAmkrNameRu: row.arrivalStationAmkrNameRu,
                arrivalStationAmkrNameEn: row.arrivalStationAmkrNameEn,
                arrivalStationAmkrAbbrRu: row.arrivalStationAmkrAbbrRu,
                arrivalStationAmkrAbbrEn: row.arrivalStationAmkrAbbrEn,
                arrivalDivisionAmkrIdDivision: row.arrivalDivisionAmkrIdDivision,
                arrivalDivisionAmkrCode: row.arrivalDivisionAmkrCode,
                arrivalDivisionAmkrNameRu: row.arrivalDivisionAmkrNameRu,
                arrivalDivisionAmkrNameEn: row.arrivalDivisionAmkrNameEn,
                arrivalDivisionAmkrAbbrRu: row.arrivalDivisionAmkrAbbrRu,
                arrivalDivisionAmkrAbbrEn: row.arrivalDivisionAmkrAbbrEn,
                currentIdLoadingStatus: row.currentIdLoadingStatus,
                currentLoadingStatusRu: row.currentLoadingStatusRu,
                currentLoadingStatusEn: row.currentLoadingStatusEn,
                currentIdOperation: row.currentIdOperation,
                currentOperationNameRu: row.currentOperationNameRu,
                currentOperationNameEn: row.currentOperationNameEn,
                currentOperationStart: row.currentOperationStart,
                currentOperationEnd: row.currentOperationEnd,
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
            };
        }
        // Отображение элементов окна правки и создания подачи и операции (в зависимости от операции)
        var view_setup_filing = function () {
            this.form_filing_setup.clear_all();
            this.form_filing_wagons_setup.clear_all();
            this.filing_wagons_alert_info.clear_message();
            this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_start', App.Langs));

            // Обновим кнопку добавить в подачу\создать черновик
            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
            var bts = this["twwf_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            bts.enable();
            bts.text(langView('vopulc_title_button_new_filing', App.Langs));
            //bts.titleAttr(langView('vopulc_title_attr_button_new_filing', App.Langs));
            var fws_bts = this["tfw_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            fws_bts.disable();

            // Сбросим все настройки
            this.form_filing_wagons_setup.el.button_filing_add.hide();
            this.form_filing_wagons_setup.el.button_filing_apply.hide();
            this.form_filing_wagons_setup.el.button_operation_apply.hide();

            this.form_filing_wagons_setup.el.input_datetime_time_start.val(null);
            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
            this.form_filing_wagons_setup.el.select_id_devision_from.val(-1);
            this.form_filing_wagons_setup.el.select_id_status_load.val(-1);
            this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(-1);

            this.form_filing_wagons_setup.el.input_datetime_time_start.disable();
            this.form_filing_wagons_setup.el.input_datetime_time_stop.disable();
            this.form_filing_wagons_setup.el.select_id_devision_from.disable();
            this.form_filing_wagons_setup.el.select_id_status_load.disable();
            this.form_filing_wagons_setup.el.select_id_station_amkr_from.disable();

            if (this.id_filing === 0) {
                // черновик
                fws_bts.enable();
                this.filing_wagons_alert_info.clear_message();
                this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_draft', App.Langs));
                this.form_filing_wagons_setup.el.button_filing_add.show();
                this.form_filing_wagons_setup.el.button_filing_apply.hide();
                this.form_filing_wagons_setup.el.button_operation_apply.hide();
                this.form_filing_wagons_setup.el.input_datetime_time_start.enable();
                this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                this.form_filing_wagons_setup.el.select_id_devision_from.enable();
                this.form_filing_wagons_setup.el.select_id_status_load.enable();
                //--
                this.form_filing_wagons_setup.el.input_datetime_time_start.val(this.create_filing ? moment(this.create_filing) : moment());
                this.form_filing_wagons_setup.el.input_datetime_time_stop.val(this.create_filing ? moment(this.close_filing) : null);
                this.form_filing_wagons_setup.el.select_id_devision_from.enable();
                this.form_filing_wagons_setup.el.select_id_devision_from.val(this.division_from);
                this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(this.station_from);
            };
            if (this.id_filing > 0) {
                bts.text(langView('vopulc_title_button_add_filing', App.Langs));
                this.filing_wagons_alert_info.clear_message();

                //bts.titleAttr(langView('vopulc_title_attr__button_add_filing', App.Langs));
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
                    this.form_filing_wagons_setup.el.select_id_devision_from.enable();
                    this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_filing', App.Langs));
                } else {
                    this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_filing_close', App.Langs));
                }
                this.form_filing_wagons_setup.el.select_id_station_amkr_from.enable();
                this.form_filing_wagons_setup.el.select_id_devision_from.val(this.division_from);
                this.form_filing_wagons_setup.el.select_id_status_load.val(this.status_load);
                this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(this.station_from);

                switch (this.fw_status) {
                    case 0: {
                        fws_bts.enable();
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_0', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.show();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.enable();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.select_id_devision_from.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.enable();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(moment());
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
                        break;
                    }
                    case 1: {
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_1', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.show();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.select_id_devision_from.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.enable();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length > 0 ? moment(rows[0].filingStart) : null);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
                        break;
                    }
                    case 2: {
                        this.filing_wagons_alert_info.clear_message();
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.select_id_devision_from.disable();

                        if (this.close_filing === null) {
                            this.form_filing_wagons_setup.el.select_id_status_load.enable();
                            this.form_filing_wagons_setup.el.button_operation_apply.show();
                            this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_2', App.Langs));

                        } else {
                            this.form_filing_wagons_setup.el.select_id_status_load.disable();
                            this.form_filing_wagons_setup.el.button_operation_apply.hide();
                            this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_2_close', App.Langs));
                        }
                        this.form_filing_wagons_setup.el.select_id_station_amkr_from.disable();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length > 0 ? moment(rows[0].filingStart) : null);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length > 0 ? moment(rows[0].filingEnd) : null);
                        this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length > 0 ? rows[0].currentIdLoadingStatus : -1);
                        break;
                    }
                    case 3: {
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('vopulc_mess_info_wagon_mode_3', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.select_id_devision_from.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length > 0 ? moment(rows[0].filingStart) : null);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length > 0 ? moment(rows[0].filingEnd) : null);
                        this.form_filing_wagons_setup.el.select_id_status_load.val(rows && rows.length > 0 ? rows[0].currentIdLoadingStatus : -1);
                        break;
                    }
                }
            }
        }
        // Валидация правки подачи и операций над вагонами
        var validation = function (result, mode) {
            // 0- add; >0 id ; null -not edit
            if (this.id_filing === null) { return false; }
            var valid = true;
            var el_dtstart = this.form_filing_wagons_setup.el.input_datetime_time_start.$element;
            var el_dtstop = this.form_filing_wagons_setup.el.input_datetime_time_stop.$element;
            var el_sl = this.form_filing_wagons_setup.el.select_id_status_load.$element;
            var el_dv = this.form_filing_wagons_setup.el.select_id_devision_from.$element;
            var el_stamkr = this.form_filing_wagons_setup.el.select_id_station_amkr_from.$element;

            // Время начала
            if (mode === 0 || mode === 2) {
                // Создать подачу и операции над вагонами
                // Проверим время начала
                if (result.new && result.new.input_datetime_time_start) {
                    var curr = moment();
                    var aplly = moment(result.new.input_datetime_time_start);
                    var minutes = aplly.diff(curr, 'minutes');
                    if (minutes < min_dt_apply) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstart), langView('vopulc_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                        valid = false;
                    }
                    if (minutes > max_dt_apply) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstart), langView('vopulc_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                        valid = false;
                    }
                }
            }
            // Время конца 
            if (mode === 3) {
                if (result.new && result.new.input_datetime_time_stop === null) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vopulc_mess_error_time_aplly', App.Langs));
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
                        this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vopulc_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                        valid = false;
                    }
                    if (minutes > max_dt_apply) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vopulc_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
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
                        this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vopulc_mess_error_period_time', App.Langs).format(min_period, max_period));
                        valid = false;
                    }
                }
            }
            // Проверим вагоны в подаче
            if (mode === 0) {
                // Проверим вагоны в подаче
                if (this.filing_wagons === null || this.filing_wagons.length === 0) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopulc_mess_error_not_wagons_filing', App.Langs));
                    valid = false;
                }
            }
            // проверка выбранных вагонов
            if (mode === 0 || mode === 2 || mode === 3) {
                // Проверим выбранные вагоны для открытия и закрытия операции
                var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
            }
            // проверка выбранных для операций вагонов
            if (mode === 0 || mode === 2 || mode === 3) {
                // должно быть выставлено время конца
                if (result.new && result.new.input_datetime_time_stop) {
                    if (!rows || rows.length === 0) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('vopulc_mess_error_not_wagons_close_filing', App.Langs));
                        valid = false;
                    }
                } else {
                    if (result.new && result.new.select_id_status_load >= 0) {
                        this.form_filing_wagons_setup.validation_common_filing_wagons.set_object_error($(el_dtstop), langView('vopulc_mess_error_time_aplly', App.Langs));
                        valid = false;
                    }
                }
            }
            // проверка статуса
            if (mode === 0 || mode === 2 || mode === 3) {
                // должно быть выставлено время конца
                if (result.new && result.new.input_datetime_time_stop) {
                    valid = valid & this.form_filing_wagons_setup.validation_common_filing_wagons.check_control_select_not_null($(el_sl), langView('vopulc_mess_error_not_wagons_status_close_filing', App.Langs), null, true)
                }
            }
            // проверка подразделения
            if (mode === 1) {
                valid = valid & this.form_filing_wagons_setup.validation_common_filing_wagons.check_control_select_not_null($(el_dv), langView('vopulc_mess_error_filing_division', App.Langs), null, true)
            }
            // проверка подразделения
            if (mode === 1) {
                valid = valid & this.form_filing_wagons_setup.validation_common_filing_wagons.check_control_select_not_null($(el_stamkr), langView('vopulc_mess_error_filing_station_amkr', App.Langs), null, true)
            }
            return valid;
        }
        // Создать подачу для выгрузки
        var apply_add_filing = function (data, callback) {
            this.view_com.api_wsd.postAddFilingUnloading(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        // Открыть(закрыть) операцию выгрузки над вагонами подачи 
        var apply_update_operation_filing = function (data, callback) {
            this.view_com.api_wsd.postUpdateFilingOperationUnloading(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }

        // Завершенеие инициализации [this.view_com]
        var out_init_view_com = function () {

            this.cfiling.init({
                alert: this.settings.alert,

                type_filing: 1, // Выгрузка
                wagon_operation: 13, // операция над вагоном
                view_com: this.view_com,
                api_dir: this.settings.api_dir,
                api_wsd: this.settings.api_wsd,
                fn_start_init: function () {
                    start_init.call(this);
                },
                fn_load_db_operation: function (callback) {
                    load_db_operation.call(this, callback);
                },
                fn_after_loading_init: function (callback) {
                    after_loading_init.call(this, callback);
                },
                fn_init_form_filing_setup: null,
                fn_init_form_filing_wagons_setup: function (callback) {
                    init_form_filing_wagons_setup.call(this, callback);
                },
                fn_init_form_from_setup: null,
                fn_init: function () {
                    out_init_cfiling.call(this);
                }.bind(this),

                fn_get_sostav_filing: function (row, station, way, park, division, wagons) {
                    return get_sostav_filing.call(this, row, station, way, park, division, wagons);
                },
                fn_get_filing_wagons: function (row) {
                    return get_filing_wagons.call(this, row);
                },
                fn_view_setup_filing: function () {
                    view_setup_filing.call(this);
                },
                fn_validation: function (result, mode) {
                    return validation.call(this, result, mode);
                },
                fn_apply_add_filing: function (data, callback) {
                    apply_add_filing.call(this, data, callback);
                },
                fn_apply_update_filing: null,
                fn_apply_update_operation_filing: function (data, callback) {
                    apply_update_operation_filing.call(this, data, callback);
                },
                fn_apply_add_wagon_filing: null,
                fn_apply_del_wagon_filing: null,
                fn_apply_update: null,
                fn_db_update: this.settings.fn_db_update,
                fn_close: this.settings.fn_close,
            });
        }.bind(this);

        this.view_com.init({
            alert: this.settings.alert,
            api_dir: this.settings.api_dir,
            api_wsd: this.settings.api_wsd,
            fn_db_update: this.settings.fn_db_update,
            fn_init: function () {
                this.view_com.$title.empty();
                this.view_com.$title.append(langView('vopulc_card_header_panel', App.Langs));
                this.view_com.$op.empty();
                this.view_com.close();
                // Сообщение
                LockScreen(langView('vopulc_mess_init_panel', App.Langs));
                out_init_view_com();
            }.bind(this),
            fn_close: this.settings.fn_close,
        }, function () { }.bind(this));


    };

    view_op_unloading_cars.prototype.view = function (id_way) {
        this.cfiling.view(id_way);
    }

    App.view_op_unloading_cars = view_op_unloading_cars;

    window.App = App;

})(window);