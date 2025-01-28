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
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'voplc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ПОГРУЗКА ВАГОНОВ"',

            'voplc_title_form_add': 'Создать подачу',
            'voplc_title_form_add_title': 'Создать новую "ПОДАЧА ВАГОНОВ"',
            'voplc_title_form_apply': 'Править подачу',
            'voplc_title_form_apply_title': 'Выполнить операцию "ПОДАЧА ВАГОНОВ"',
            'voplc_title_form_operation_open': 'Открыть операцию',
            'voplc_title_form_operation_open_title': 'Открыть операцию по вагону(ам) в подаче.',
            'voplc_title_form_operation_close': 'Закрыть операцию',
            'voplc_title_form_operation_close_title': 'Закрыть операцию по вагону(ам) в подаче.',
            'voplc_title_form_operation_apply': 'Править операцию',
            'voplc_title_form_operation_apply_title': 'Править операцию по вагону(ам) в подаче.',

            'voplc_title_time_start': 'Время начала:',
            'voplc_text_time_start': 'Время начала операции ограниченно +(-)1день',
            'voplc_title_placeholder_time_start': 'Время начала',

            'voplc_title_time_stop': 'Время окончания:',
            'voplc_text_time_stop': 'Время окончания операции ограниченно +(-)1день',
            'voplc_title_placeholder_time_stop': 'Время окончания',

            'voplc_title_time_document': 'Документ получен:',
            'voplc_text_time_document': 'Время получения документа  ограниченно +(-)1день',
            'voplc_title_placeholder_time_document': 'Время документа',

            'voplc_title_time_document_total': 'Общ. док получен:',
            'voplc_text_time_document_total': 'Время получения общ. док. ограниченно +(-)1день',
            'voplc_title_placeholder_time_document_total': 'Время документа',

            'voplc_title_label_loading_uz': 'Погрузка УЗ',
            'voplc_title_label_loading_ip': 'Погрузка В/З',

            'voplc_title_label_station_amkr_from': 'Станция погр. ТЕКУЩ:',
            'voplc_text_label_station_amkr_from': 'Выберите станцию погр. ТЕКУЩУЮ...',
            'voplc_title_label_devision_from': 'Цех погр. ТЕКУЩ:',
            'voplc_title_placeholder_devision_from': 'Цех погр. ТЕКУЩ',
            'voplc_text_label_devision_from': 'Выберите цех погр. ТЕКУЩИЙ ...',

            'voplc_title_label_station_amkr_on': 'Станция назн. ТЕКУЩ:',
            'voplc_text_label_station_amkr_on': 'Выберите станцию назн. ТЕКУЩУЮ...',
            'voplc_title_label_devision_on': 'Цех получ. ТЕКУЩ:',
            'voplc_title_placeholder_devision_on': 'Цех получ. ТЕКУЩ',
            'voplc_text_label_devision_on': 'Выберите цех получ. ТЕКУЩИЙ ...',

            'voplc_title_label_num_nakl': 'Номер  накл.  В/З:',
            'voplc_title_placeholder_num_nakl': '№ накладной  В/З',
            'voplc_text_label_num_nakl': 'Введите № накладной В/З ...',

            'voplc_title_label_num_nakl_total': '№ Общ. нак.',
            'voplc_title_placeholder_num_nakl_total': '№ Общей накладной',
            'voplc_text_label_num_nakl_total': 'Введите № общ. накл. ...',

            'voplc_title_label_amkr_cargo': 'Груз В/З:',
            'voplc_title_placeholder_amkr_cargo': 'Груз ТЕКУЩИЙ',
            'voplc_text_label_amkr_cargo': 'Введите груз В/З ТЕКУЩИЙ ...',

            'voplc_title_label_station_uz': 'Станция назначения (УЗ):',
            'voplc_title_placeholder_station_uz': 'Ст. назн. ТЕКУЩАЯ',
            'voplc_text_label_station_uz': 'Введите cтанцию назначения (УЗ) ТЕКУЩАЯ ...',

            'voplc_title_label_code_etsng': 'Код ЕТСНГ:',
            'voplc_title_placeholder_code_etsng': 'Код ЕТСНГ',
            'voplc_text_label_code_etsng': 'Введите код ЕТСНГ ...',

            'voplc_title_label_cargo_etsng': 'Название груза по ЕТСНГ:',
            'voplc_title_placeholder_cargo_etsng': 'Груз ЕТСНГ',
            'voplc_text_label_cargo_etsng': 'Введите название груза по ЕТСНГ ...',

            'voplc_title_label_vesg': 'Вес:',
            'voplc_title_placeholder_vesg': 'Вес',
            'voplc_text_label_vesg': 'Введите вес груза (кг.) ...',

            'voplc_title_label_vesg_total': 'Вес подачи:',
            'voplc_title_placeholder_vesg_total': 'Вес подачи',
            'voplc_text_label_vesg_total': 'Введите общий вес (кг.) ...',

            'voplc_title_label_status_load': 'Статус:',
            'voplc_text_label_status_load': 'Выберите статус (груж./порож.)...',

            'voplc_mess_info_start': 'Выберите существующую подачу для правки или создаете черновик подачи.',
            'voplc_mess_info_draft': 'Выбран черновик подачи, создайте подачу или удалите черновик!  (ВНИМАНИЕ! выбрав вагоны в черновике, вы можете задать начало операции , для этого укажите дату начала тип погрузки и если известно станцию, цех получатель и груз отправки, если вагоны не выбраны тогда будет создана пустая подача с вагонами без операции).',
            'voplc_mess_info_filing': 'Выбрана подача. Чтобы исправить цех погрузки укажите новый цех и нажмите «Править подачу». Чтобы выполнить операции над вагонами выберите вагон(ы).',
            'voplc_mess_info_filing_close': 'Выбрана закрытая подача. Операции не доступны!',
            'voplc_mess_info_wagon_mode_0': 'Выбран(ы) вагоны, по которым неопределенна операция. Укажите дату начала операции тип погрузки УЗ-ВЗ и необязательные данные: станция и цех назначения, груз, и нажмите “Открыть операцию”. (ВНИМАНИЕ! Если необходимо выбрать все вагоны без операций нажмите «все вагоны». Обязательные для заполнения поля выделены красным контуром, необязательные желтым.)', 'voplc_mess_info_wagon_mode_1_stop': 'Выбран(ы) вагоны, по которым открыта операция и указано время окончания операции. Проверьте статус и укажите необязательные данные станция, цех назначения, груз и (вес и дату получения документа если выбран 1 вагон). Если выбраны все вагоны подачи вы можете указать дату получения общего документа, общей накладной, общий вес на подачу. (ВНИМАНИЕ! Обязательные для заполнения поля выделены красным контуром, необязательные желтым, если выбрано несколько вагонов и по ним не совпадают поля эти поля выделены синим).',
            'voplc_mess_info_wagon_mode_1_edit': 'Выбран(ы) вагоны, по которым открыта операция. Вы можете изменить данные: станция и цех назначения, груз, (вес если выбран 1 вагон) нажав «Править операцию». Указав время окончания, вы можете закрыть операцию. Указав документ получен (если выбран 1 вагон), вы можете полностью закрыть документ на вагон. (ВНИМАНИЕ! Обязательные для заполнения поля выделены красным контуром, необязательные желтым, если выбрано несколько вагонов и по ним не совпадают поля эти поля выделены синим).',
            'voplc_mess_info_wagon_mode_1_close': 'Выбран(ы) вагоны, по которым открыта операция и указана дата получения документа. Заполните все обязательные поля и нажмите «закрыть операцию». (ВНИМАНИЕ! Обязательные для заполнения поля выделены красным контуром, необязательные желтым, если выбрано несколько вагонов и по ним не совпадают поля эти поля выделены синим).',
            'voplc_mess_info_wagon_mode_1_stop': 'Выбран(ы) вагоны, по которым открыта операция и указано время окончания операции. Проверьте статус и укажите необязательные данные: станция, цех назначения, груз и (вес и дату получения документа если выбран 1 вагон). Если выбраны все вагоны подачи вы можете указать дату получения общего документа, общей накладной, общий вес на подачу. (ВНИМАНИЕ! Обязательные для заполнения поля выделены красным контуром, необязательные желтым, если выбрано несколько вагонов и по ним не совпадают поля эти поля выделены синим).',
            'voplc_mess_info_wagon_mode_2': 'Выбран(ы) вагоны, по которым закрыта операция, но нет подтверждения получения документа. Укажите дату получения документа и заполните все обязательные поля и нажмите «Править операцию». (ВНИМАНИЕ! Обязательные для заполнения поля выделены красным контуром, необязательные желтым, если выбрано несколько вагонов и по ним не совпадают поля эти поля выделены синим).',
            'voplc_mess_info_wagon_mode_2_close': 'Выбран(ы) вагоны, по которым закрыта операция и закрыта подача или указана дата получения документа. Операции не доступны!.',
            'voplc_mess_info_wagon_mode_3': 'Выбран(ы) вагоны, по которым закрыта операция и они покинули путь подачи. По данным вагонам операции невозможны. (ВНИМАНИЕ! Если необходимо выбрать все вагоны которые покинули путь нажмите «все вагоны», если нужно выбрать вагоны без операции или открытой и закрытой операцией нажмите «убрать выбор» и выберите нужные вагоны).',

            'voplc_mess_valid_station_uz': 'Указанной станции УЗ нет в справочнике ИДС',
            'voplc_mess_valid_not_station_uz': 'Укажите станцию УЗ',
            'voplc_mess_valid_cargo_etsng': 'Указанного груза ЕТСНГ нет в справочнике ИДС',
            'voplc_mess_valid_not_cargo_etsng': 'Укажите груз ЕТСНГ',
            'voplc_mess_valid_internal_cargo': 'Указанного внутреннего груза нет в справочнике ИДС',
            'voplc_mess_valid_not_internal_cargo': 'Укажите внутренний груз',
            'voplc_mess_valid_devision': 'Указанного цеха нет в справочнике ИДС',
            'voplc_mess_valid_not_devision': 'Укажите цех',
            'voplc_mess_radio_loading_ip': 'Выбран вагон АМКР ВЗ',

            'voplc_title_button_new_filing': 'Создать черновик',

            'voplc_title_button_add_filing': 'Добавить в подачу',

            'voplc_mess_error_num_nakl': 'Укажите номер накладной',
            'voplc_mess_error_vesg': 'Укажите вес (кг.)',
            'voplc_mess_error_vesg_null': 'Укажите вес > 0 (кг.)',
            'voplc_mess_error_max_vesg': 'Указанный вес больше грузоподъемности {0}т. вагона.',
            'voplc_mess_error_max_vesg_total': 'Указанный вес больше общей грузоподъемности {0}т. по всем вагонам.',
            'voplc_mess_error_time_aplly': 'Укажите дату завершения операции',
            'voplc_mess_error_start_time_aplly': 'Дата начала выполнения операции не может быть меньше даты выполнения последней операции [{0}]',
            'voplc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, отклонение {0} мин',
            'voplc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, отклонение {0} мин.',
            'voplc_mess_error_min_time_docum': 'Дата получения документа не может быть меньше текущей даты, отклонение {0} мин.',
            'voplc_mess_error_max_time_docum': 'Дата получения документа не может быть больше текущей даты, отклонение {0} мин.',
            'voplc_mess_error_not_wagons_filing': 'Нет вагонов для формирования подачи (в окне «ВАГОНЫ НА ПУТИ», выберите путь и вагоны, затем добавьте вагоны в подачу).',
            'voplc_mess_error_not_wagons_status_close_filing': 'Выберите статус вагонов после операции',
            'voplc_mess_error_not_wagons_cargo_not_status': 'Выбранный груз несоответствует статусу.',

            'voplc_mess_error_filing_station_on_amkr': 'Выберите станцию назначения',
            'voplc_mess_error_period_time': 'Операция должна длиться в диапазоне от {0} до {1} мин.',
            'voplc_mess_error_stop_time_aplly': 'Дата окончания операции не может быть меньше или равна дате начала операции',

            'voplc_mess_cancel_operation_mode_0': 'Отмена операции создать подачу для "ПОГРУЗКИ ВАГОНОВ"!',
            'voplc_mess_cancel_operation_mode_1': 'Отмена операции правки подачи "ПОГРУЗКИ ВАГОНОВ"!',
            'voplc_mess_cancel_operation_mode_2': 'Отмена операции начала "ПОГРУЗКИ" над вагонами подачи!',
            'voplc_mess_cancel_operation_mode_3': 'Отмена завершения операции "ПОГРУЗКИ" над вагонами подачи!',
            'voplc_mess_cancel_operation_mode_4': 'Отмена правки информации по закрытым операциям "ПОГРУЗКИ"!',

            'voplc_mess_load_operation': 'Загружаю операции...',

            'voplc_mess_init_panel': 'Выполняю инициализацию модуля ...',

            'voplc_confirm_title': 'Внимание!',
            'voplc_confirm_mess_apply_create_filing': 'Создать подачу для операции "ПОГРУЗКА ВАГОНОВ" на станции {0}, на пути {1}, в подразделении {2}? Определено для подачи {3} ваг., определено для погрузки {4} ваг.',
            'voplc_confirm_mess_apply_update_filing': 'Править подачу {0}, выбрана станция АМКР: {1}, выбранно подразделение: {2}? Станция и подразделение будет обновлено по всем вагонам подачи!',
            'voplc_confirm_mess_apply_update_filing_start_operation': 'Править подачу {0}. Определено для правки {1} ваг., определено для начала погрузки {2} ваг.',
            'voplc_confirm_mess_apply_update_filing_edit_operation': 'Править подачу {0}? Определено для правки {1} ваг. Внимание! Исправления коснутся информации по грузу, станции назначения и цеха получателя. Если выбрано более одного вагона вся информация по вагонам будет заменена по всем выбранным вагонам.',
            'voplc_confirm_mess_apply_update_filing_stop_operation': 'Править подачу {0}? Определено для правки {1} ваг., определено для закрытия операции {2} ваг. Внимание! Так как по вагонам не указана дата получения документа данная подача не будет считаться закрытой, и вы сможете править данные по грузу, станции назначения и цех получатель.',
            'voplc_confirm_mess_apply_update_filing_close_operation': 'Править подачу {0}? Определено для окончания и закрытия операции {1} ваг. Внимание! Так как по вагонам указана дата получения документа вагон для правки груза, станции назначения и цеха получателя будет закрыт. Если в подаче по всем вагонам закрыты операции и введена дата получения документа – подача будет закрыта!',
            'voplc_confirm_mess_apply_update_filing_close_total_operation': 'Закрыть подачу {0}? Определено для окончания и закрытия операции {1} ваг. Внимание! Указана общая для всех вагонов дата получения документа, общий вес и накладная, соответственно подача будет закрыта по всем вагонам!',

            'voplc_confirm_mess_apply_update_filing_edit_document': 'Править документы в подаче {0}? Определено для правки {1} ваг. Внимание! Так как по вагонам указана дата получения документа вагон для правки груза, станции назначения и цеха получателя будет закрыт. Если в подаче по всем вагонам закрыты операции и введена дата получения документа – подача будет закрыта!',
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
    function view_op_loading_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
        this.cfiling = new VIEW_CFILING();
    }

    // инициализация модуля
    view_op_loading_cars.prototype.init = function (options) {
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
            this.select_devision_from = null;       // Выбранный элемент
            this.select_devision_on = null;       // Выбранный элемент
            this.select_external_station = null;    // Выбранный элемент
            this.select_cargo = null;               // Выбранный элемент
            this.select_internal_cargo = null;      // Выбранный элемент

            this.default_status_load = -1;

            this.cargo = [];            // Список грузов (полный)
            this.internal_cargo = [];      // Список грузов etsng (полный)
            this.external_station = [];      // Список грузов etsng (полный)

            this.list_cargo = [];
            this.list_internal_cargo = [];
            this.list_external_station = [];

            this.$div_loading_ip = null;
            this.$div_loading_uz = null;
            this.$radio_loading = null;

            this.view_radio_loading = function (id) {
                switch (id) {
                    case 'loading_uz': {
                        // Погрузка УЗ
                        this.$div_loading_uz.show();
                        this.$div_loading_ip.hide();
                        this.view_setup_filing();
                        break;
                    }
                    case 'loading_ip': {
                        // Погрузка ВЗ
                        this.$div_loading_uz.hide();
                        this.$div_loading_ip.show();
                        this.view_setup_filing();
                        break;
                    }
                }
            }
            // Дополнительная валидация divisions
            this.validation_exist_divisions = function (code, id, not_null, not_alert) {
                // Нет данных
                var fn_out_null = function (not_null) {
                    // нет входных данных данных
                    if (not_null) {
                        this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_not_devision', App.Langs), not_alert);
                        return false;
                    } else {
                        this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                        return true;
                    }
                }
                // Нет данных в базе данных
                var fn_out_undefined = function () {
                    this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_devision', App.Langs), not_alert);
                    return false;
                }
                // Ок
                var fn_out_ok = function () {
                    // Ок
                    this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                    return true;
                }
                // Проверка
                if (code === null) {
                    return fn_out_null.call(this, not_null);
                }
                if (code === undefined) {
                    // Нет в базе
                    return fn_out_undefined.call(this);
                }
                this.select_devision_from = this.view_com.api_dir.getExistDivisions(code, null);
                if (this.select_devision_from) {
                    return fn_out_ok.call(this);
                } else {
                    if (this.select_devision_from === null) {
                        return fn_out_undefined.call(this);
                    } else {
                        return fn_out_null.call(this, not_null);
                    }
                }
            }
            // Дополнительная валидация external_statio
            this.validation_exist_external_station = function (code, id, not_null, not_alert) {
                // Нет данных
                var fn_out_null = function (not_null) {
                    // нет входных данных данных
                    if (not_null) {
                        this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_not_station_uz', App.Langs), not_alert);
                        return false;
                    } else {
                        this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                        return true;
                    }
                }
                // Нет данных в базе данных
                var fn_out_undefined = function () {
                    this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_station_uz', App.Langs), not_alert);
                    return false;
                }
                // Ок
                var fn_out_ok = function () {
                    // Ок
                    this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                    return true;
                }
                // Проверка
                if (code === null) {
                    return fn_out_null.call(this, not_null);
                }
                if (code === undefined) {
                    // Нет в базе
                    return fn_out_undefined.call(this);
                }
                this.select_external_station = this.view_com.api_dir.getExistExternalStation(code, null);
                if (this.select_external_station) {
                    return fn_out_ok.call(this);
                } else {
                    if (this.select_external_station === null) {
                        return fn_out_undefined.call(this);
                    } else {
                        return fn_out_null.call(this, not_null);
                    }
                }
            }
            // Дополнительная валидация cargo
            this.validation_exist_cargo = function (code, id, not_null, not_alert) {
                // Нет данных
                var fn_out_null = function (not_null) {
                    // нет входных данных данных
                    if (not_null) {
                        this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_not_cargo_etsng', App.Langs), not_alert);
                        return false;
                    } else {
                        this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                        return true;
                    }
                }
                // Нет данных в базе данных
                var fn_out_undefined = function () {
                    this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_cargo_etsng', App.Langs), not_alert);
                    return false;
                }
                // Ок
                var fn_out_ok = function () {
                    // Ок
                    this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                    return true;
                }
                // Проверка
                if (code === null) {
                    return fn_out_null.call(this, not_null);
                }
                if (code === undefined) {
                    // Нет в базе
                    return fn_out_undefined.call(this);
                }
                this.select_cargo = this.view_com.api_dir.getExistCargo(code, null);
                if (this.select_cargo) {
                    return fn_out_ok.call(this);
                } else {
                    if (this.select_cargo === null) {
                        return fn_out_undefined.call(this);
                    } else {
                        return fn_out_null.call(this, not_null);
                    }
                }
            }
            // Дополнительная валидация internal_cargo
            this.validation_exist_internal_cargo = function (code, id, not_null, not_alert) {
                // Нет данных
                var fn_out_null = function (not_null) {
                    // нет входных данных данных
                    if (not_null) {
                        this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_not_internal_cargo', App.Langs), not_alert);
                        return false;
                    } else {
                        // Ок
                        this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                        return true;
                    }
                }
                // Нет данных в базе данных
                var fn_out_undefined = function () {
                    this.form_filing_wagons_setup.set_element_validation_error(id, langView('voplc_mess_valid_internal_cargo', App.Langs), not_alert);
                    return false;
                }
                // Ок
                var fn_out_ok = function () {
                    // Ок
                    this.form_filing_wagons_setup.set_element_validation_ok(id, "", not_alert);
                    return true;
                }

                if (code === null) {
                    return fn_out_null.call(this, not_null);
                }
                if (code === undefined) {
                    // Нет в базе
                    return fn_out_undefined.call(this);
                }
                this.select_internal_cargo = this.view_com.api_dir.getExistInternalCargo(code, null);
                if (this.select_internal_cargo) {
                    return fn_out_ok.call(this);
                } else {
                    if (this.select_internal_cargo === null) {
                        return fn_out_undefined.call(this);
                    } else {
                        return fn_out_null.call(this, not_null);
                    }
                }
            }
        }
        // Загрузка дополнительных библиотек ()
        var load_db_operation = function (callback) {
            this.view_com.load_db(['cargo', 'internal_cargo', 'external_station'], false, function (result) {
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this)); //------- {end this.view_com.load_db}
        }
        // Продолжение инициализации после загрузки всех библиотек (привязка к новым переменным)
        var after_loading_init = function (callback) {

            this.list_status_load = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(this.settings.wagon_operation);

            // инициализациия 
            this.cargo = this.view_com.api_dir.getAllCargo();
            this.internal_cargo = this.view_com.api_dir.getAllInternalCargo();
            this.external_station = this.view_com.api_dir.getAllExternalStation();

            this.list_cargo = this.view_com.api_dir.getListValueTextCodeCargo();    //getListValueTextCargo();
            this.list_internal_cargo = this.view_com.api_dir.getListValueTextGroupInternalCargo();
            this.list_external_station = this.view_com.api_dir.getListValueTextExternalStation();

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
            var bt_add = {
                obj: 'bs_button',
                options: {
                    id: 'filing_add',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('voplc_title_form_add', App.Langs),
                    title: langView('voplc_title_form_add_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-square-plus',  //<i class="fa-regular fa-square-plus"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_apply = {
                obj: 'bs_button',
                options: {
                    id: 'filing_apply',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: langView('voplc_title_form_apply', App.Langs),
                    title: langView('voplc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_operation_open = {
                obj: 'bs_button',
                options: {
                    id: 'operation_open',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'warning',
                    text: langView('voplc_title_form_operation_open', App.Langs),
                    title: langView('voplc_title_form_operation_open_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-folder-open',  //<i class="fa-regular fa-folder-open"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_operation_close = {
                obj: 'bs_button',
                options: {
                    id: 'operation_close',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'danger',
                    text: langView('voplc_title_form_operation_close', App.Langs),
                    title: langView('voplc_title_form_operation_close_title', App.Langs),
                    icon_fa_left: 'fa-regular fa-folder-closed',  //<i class="fa-regular fa-folder-closed"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_filing_wagons_setup.$form.submit();
                    }.bind(this),
                }
            };
            var bt_operation_apply = {
                obj: 'bs_button',
                options: {
                    id: 'operation_apply',
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: langView('voplc_title_form_operation_apply', App.Langs),
                    title: langView('voplc_title_form_operation_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-pen-to-square',  //<i class="fa-solid fa-pen-to-square"></i>
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
                    label: langView('voplc_title_time_start', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_time_start', App.Langs),
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
                    form_text: langView('voplc_text_time_start', App.Langs),
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
                    label: langView('voplc_title_time_stop', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_time_stop', App.Langs),
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
                            // Если открыты операции возможны 2 под-режима правка и закрытие
                            if (this.fw_status === 1) {
                                this.view_setup_filing({ time_stop: dt._isValid });
                            }
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_time_stop', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            var form_input_num_nakl_total = {
                obj: 'bs_form_input',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'num_nakl_total',
                    name: 'num_nakl_total',
                    label: langView('voplc_title_label_num_nakl_total', App.Langs),
                    element_type: 'text',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_num_nakl_total', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: null,
                    element_max: null,
                    element_step: null,
                    element_options: {
                        default: '',
                        fn_change: function (e) {
                            var value = $(e.currentTarget).val();
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 3,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_num_nakl_total', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_vesg_total = {
                obj: 'bs_form_input',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'vesg_total',
                    name: 'vesg_total',
                    label: langView('voplc_title_label_vesg_total', App.Langs),
                    element_type: 'number',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_vesg_total', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: null,
                    element_max: null,
                    element_step: null,
                    element_options: {
                        default: '',
                        fn_change: function (e) {
                            var value = $(e.currentTarget).val();
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 3,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_vesg_total', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datetime_time_document_total = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'time_document_total',
                    name: 'time_document_total',
                    label: langView('voplc_title_time_document_total', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_time_document_total', App.Langs),
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
                            // Если открыты операции и признак документ получен тогда все заполнить
                            if (this.fw_status === 1 || this.fw_status === 2) {
                                this.view_setup_filing({ time_document_total: dt._isValid });
                            }
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_time_document_total', App.Langs),
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
                    label: langView('voplc_title_label_station_amkr_from', App.Langs),
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
                    form_text: langView('voplc_text_label_station_amkr_from', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datalist_devision_from = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_devision_from',
                    name: 'id_devision_from',
                    label: langView('voplc_title_label_devision_from', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_devision_from', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_devision,
                        out_value: false,
                        out_group: true,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            this.validation_exist_divisions(set.value, 'id_devision_from', false, true);
                        }.bind(this),
                        fn_select: function (event, set, options) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_devision_from', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            var form_input_datetime_time_document = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'time_document',
                    name: 'time_document',
                    label: langView('voplc_title_time_document', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_time_document', App.Langs),
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
                            // Если открыты операции и признак документ получен тогда все заполнить
                            if (this.fw_status === 1 || this.fw_status === 2) {
                                this.view_setup_filing({ time_document: dt._isValid });
                            }
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_time_document', App.Langs),
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
                    label: langView('voplc_title_label_station_amkr_on', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: false,
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
                    form_text: langView('voplc_text_label_station_amkr_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datalist_devision_on = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_devision_on',
                    name: 'id_devision_on',
                    label: langView('voplc_title_label_devision_on', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_devision_on', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_devision,
                        out_value: false,
                        out_group: true,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            this.validation_exist_divisions(set.value, 'id_devision_on', false, true);
                        }.bind(this),
                        fn_select: function (event, set, options) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_devision_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            var form_input_num_nakl = {
                obj: 'bs_form_input',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'num_nakl',
                    name: 'num_nakl',
                    label: langView('voplc_title_label_num_nakl', App.Langs),
                    element_type: 'text',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_num_nakl', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: null,
                    element_max: null,
                    element_step: null,
                    element_options: {
                        default: '',
                        fn_change: function (e) {
                            var value = $(e.currentTarget).val();
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_num_nakl', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var bt_append_internal_cargo = {
                obj: 'bs_button',
                options: {
                    id: null,
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'success',
                    text: null,
                    title: 'append',
                    icon_fa_left: 'fa-solid fa-plus',//<i class="fa-solid fa-plus"></i>
                    icon_fa_right: null,
                    fn_click: null,
                }
            };
            var form_input_datalist_internal_cargo = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'id_internal_cargo',
                    name: 'id_internal_cargo',
                    label: langView('voplc_title_label_amkr_cargo', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_amkr_cargo', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_internal_cargo,
                        out_value: false,
                        out_group: true,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            this.validation_exist_internal_cargo(set.value, 'id_internal_cargo', false, true);
                        }.bind(this),
                        fn_select: function (event, set, options) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: 'mt-0',
                    group_append_class: null,
                    group_append_id: null,
                    group_append_html: null,
                    group_append_objs: [bt_append_internal_cargo],
                    form_text: langView('voplc_text_label_amkr_cargo', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            var form_input_datalist_station_uz = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'code_station_uz',
                    name: 'code_station_uz',
                    label: langView('voplc_title_label_station_uz', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_station_uz', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_external_station,
                        out_value: true,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {

                            this.validation_exist_external_station(set.value, 'code_station_uz', false, true);
                        }.bind(this),
                        fn_select: function (event, set, options) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_station_uz', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_textarea_datalist_cargo_etsng = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'cargo_etsng',
                    name: 'cargo_etsng',
                    label: langView('voplc_title_label_cargo_etsng', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_cargo_etsng', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_cargo,
                        out_value: false,
                        out_group: true,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            this.validation_exist_cargo(set.value, 'cargo_etsng', false, true);
                        }.bind(this),
                        fn_select: function (event, set, options) {

                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_cargo_etsng', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            var form_input_vesg = {
                obj: 'bs_form_input',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'vesg',
                    name: 'vesg',
                    label: langView('voplc_title_label_vesg', App.Langs),
                    element_type: 'number',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voplc_title_placeholder_vesg', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_min: 0,
                    element_max: 100000,
                    element_step: null,
                    element_options: {
                        default: '',
                        fn_change: function (e) {
                            var value = $(e.currentTarget).val();
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: langView('voplc_text_label_vesg', App.Langs),
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
                    label: langView('voplc_title_label_status_load', App.Langs),
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
                        default: this.default_status_load,
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
                    form_text: langView('voplc_text_label_status_load', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            var form_radio_loading_uz = {
                obj: 'bs_form_check',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'loading_uz',
                    name: 'radio_loading', //radio_loading
                    label: langView('voplc_title_label_loading_uz', App.Langs),
                    element_type: 'radio',
                    element_switch: false,
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
                            /*    var value = $(e.currentTarget).prop('checked');*/
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
            var form_radio_loading_ip = {
                obj: 'bs_form_check',
                options: {
                    validation_group: 'common_filing_wagons',
                    id: 'loading_ip',
                    name: 'radio_loading', // radio_loading
                    label: langView('voplc_title_label_loading_ip', App.Langs),
                    element_type: 'radio',
                    element_switch: false,
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
            var col_loading = {
                obj: 'bs_col',
                options: {
                    id: null,
                    pref: 'md',
                    size: 6,
                    class: null,
                    style: null,
                    append_objs: [form_radio_loading_uz, form_radio_loading_ip],
                },
                childs: []
            };

            var row_loading_ip = {
                obj: 'bs_row',
                options: {
                    id: 'loading-ip',
                    class: null,
                    style: null,
                    append_objs: [form_select_station_amkr_on, form_input_datalist_devision_on, form_input_num_nakl, form_input_datalist_internal_cargo],
                },
                childs: []
            };
            var row_loading_uz = {
                obj: 'bs_row',
                options: {
                    id: 'loading-uz',
                    class: null,
                    style: null,
                    append_objs: [form_input_datalist_station_uz, form_textarea_datalist_cargo_etsng],
                },
                childs: []
            };

            col_bt_apply.childs.push(bt_add);
            col_bt_apply.childs.push(bt_apply);
            col_bt_apply.childs.push(bt_operation_open);
            col_bt_apply.childs.push(bt_operation_close);
            col_bt_apply.childs.push(bt_operation_apply);
            col_alert.childs.push(alert_info)
            objs_filing_wagons_setup.push(col_bt_apply);
            objs_filing_wagons_setup.push(col_alert);
            objs_filing_wagons_setup.push(form_input_datetime_time_start);
            objs_filing_wagons_setup.push(form_input_datetime_time_stop);

            objs_filing_wagons_setup.push(form_input_datetime_time_document_total);
            objs_filing_wagons_setup.push(form_input_num_nakl_total);
            objs_filing_wagons_setup.push(form_input_vesg_total);

            objs_filing_wagons_setup.push(form_select_station_amkr_from);
            objs_filing_wagons_setup.push(form_input_datalist_devision_from);
            objs_filing_wagons_setup.push(form_input_datetime_time_document);
            objs_filing_wagons_setup.push(col_loading);
            objs_filing_wagons_setup.push(row_loading_ip);
            objs_filing_wagons_setup.push(row_loading_uz);

            objs_filing_wagons_setup.push(form_input_vesg);
            objs_filing_wagons_setup.push(form_select_status_load);

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
                        // Определим выделеные вагоны
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
                            var uz_select = $(this.$radio_loading[0]).prop('checked');

                            var dt_start = this.form_filing_wagons_setup.el.input_datetime_time_start.val();
                            var dt_stop = this.form_filing_wagons_setup.el.input_datetime_time_stop.val();
                            var dt_doc = this.form_filing_wagons_setup.el.input_datetime_time_document.val();
                            var dt_doc_total = this.form_filing_wagons_setup.el.input_datetime_time_document_total.val();
                            if (valid) {
                                var message = "";
                                switch (mode) {
                                    case 0: {
                                        message = langView('voplc_confirm_mess_apply_create_filing', App.Langs).format(
                                            this.form_filing_setup.el.select_id_station_unload.text(),
                                            this.form_from_setup.el.select_id_way_unload.text(),
                                            this.form_filing_wagons_setup.el.datalist_id_devision_from.text(),
                                            (this.filing_wagons ? this.filing_wagons.length : 0),
                                            (rows ? rows.length : 0)
                                        );
                                        break;
                                    }
                                    case 1: {
                                        message = langView('voplc_confirm_mess_apply_update_filing', App.Langs).format(
                                            this.id_filing,
                                            this.form_filing_setup.el.select_id_station_unload.text(),
                                            this.form_filing_wagons_setup.el.datalist_id_devision_from.text()
                                        );
                                        break;
                                    }
                                    case 2: {
                                        message = langView('voplc_confirm_mess_apply_update_filing_start_operation', App.Langs).format(this.id_filing,
                                            (rows ? rows.length : 0),
                                            (rows ? rows.length : 0));
                                        break;
                                    }
                                    case 3: {
                                        if (dt_doc_total !== null) {
                                            message = langView('voplc_confirm_mess_apply_update_filing_close_total_operation', App.Langs).format(this.id_filing,
                                                (dt_doc_total !== null ? (rows ? rows.length : 0) : 0));
                                        } else {
                                            if (dt_doc !== null) {
                                                message = langView('voplc_confirm_mess_apply_update_filing_close_operation', App.Langs).format(this.id_filing,
                                                    (dt_doc !== null ? (rows ? rows.length : 0) : 0));
                                            } else if (dt_stop !== null) {
                                                message = langView('voplc_confirm_mess_apply_update_filing_stop_operation', App.Langs).format(this.id_filing,
                                                    (rows ? rows.length : 0),
                                                    (dt_stop !== null ? (rows ? rows.length : 0) : 0));
                                            } else {
                                                message = langView('voplc_confirm_mess_apply_update_filing_edit_operation', App.Langs).format(this.id_filing,
                                                    (rows ? rows.length : 0));
                                            }
                                        }
                                        break;
                                    }
                                    // опрации закрыты (введем документ или правим данные груза)
                                    case 4: {
                                        if (dt_doc_total !== null) {
                                            message = langView('voplc_confirm_mess_apply_update_filing_close_total_operation', App.Langs).format(this.id_filing,
                                                (dt_doc_total !== null ? (rows ? rows.length : 0) : 0));
                                        } else {
                                            if (dt_doc !== null) {
                                                message = langView('voplc_confirm_mess_apply_update_filing_edit_document', App.Langs).format(this.id_filing,
                                                    (dt_doc !== null ? (rows ? rows.length : 0) : 0));
                                            } else {
                                                message = langView('voplc_confirm_mess_apply_update_filing_edit_operation', App.Langs).format(this.id_filing,
                                                    (rows ? rows.length : 0));
                                            }
                                        }

                                        break;
                                    }
                                }
                                this.view_com.mcf_lg.open(
                                    langView('voplc_title_form_apply', App.Langs),
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
                                                            start: row && dt_start ? result.new.input_datetime_time_start._i : null,    // можно править пока подача не закрыта
                                                            stop: null,                                                                 // только начало
                                                            id_wagon_operations: row ? uz_select ? App.wsd_setup.operations.loading_uz : App.wsd_setup.operations.loading_if : null,                      // (15,16) можно править пока подача не закрыта
                                                            doc_received: null,                                                         // документ получен
                                                            id_cargo: row && uz_select ? result.new.datalist_cargo_etsng : null,                 // Груз ЕТСНГ
                                                            code_station_uz: row && uz_select ? result.new.datalist_code_station_uz : null,         // Станция УЗ
                                                            id_station_amkr_on: row && !uz_select ? get_result_select(result.new.select_id_station_amkr_on) : null,    // Станция АМКР прибытия
                                                            id_devision_on: row && !uz_select ? result.new.datalist_id_devision_on : null,          // Подразделение АМКР прибытия
                                                            num_nakl: row && !uz_select ? result.new.input_text_num_nakl : null,                    // Накладная на вагон
                                                            id_internal_cargo: row && !uz_select ? result.new.datalist_id_internal_cargo : null,    // Внутрений груз
                                                            vesg: null,                                                                             // Вес груза
                                                            id_status_load: null                                                        // только начало операции
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию

                                                var operation = {
                                                    id_filing: this.id_filing,              // 0 новая, >0 Правим существующую
                                                    num_filing: null,                       // для погрузки
                                                    type_filing: this.type_filing,          // 2 = погрузка
                                                    vesg: null,                             // для погрузки
                                                    id_way: this.id_way_unload,             // !только новая подача
                                                    //id_division: this.division_from,          // можно править
                                                    id_division: Number(result.new.datalist_id_devision_from),  // можно править
                                                    wagons: list_wagons
                                                };
                                                this.apply_add_filing(operation);
                                            }
                                        };
                                        // Править подачи
                                        if (mode === 1 && result.new.datalist_id_devision_from) {
                                            if (this.id_filing !== null) { }
                                            var operation = {
                                                id_filing: this.id_filing,
                                                mode: mode,
                                                id_division: Number(result.new.datalist_id_devision_from),
                                            };
                                            this.apply_update_filing(operation);
                                        };
                                        // Править открыть операцию
                                        if (mode === 2) {
                                            // Проверим наличие вагонов
                                            var list_wagons = [];
                                            if (rows && rows.length > 0 && this.id_filing !== null) {
                                                $.each(rows, function (i, el) {
                                                    list_wagons.push({
                                                        id_wim: el.idWim,
                                                        start: result.new.input_datetime_time_start._i,                                                     // можно править пока подача не закрыта
                                                        stop: null,                                                                                         // только начало
                                                        id_wagon_operations: uz_select ? App.wsd_setup.operations.loading_uz : App.wsd_setup.operations.loading_if,                                                           // (15,16) можно править пока подача не закрыта
                                                        doc_received: null,                                                                                 // документ получен
                                                        id_cargo: uz_select ? result.new.datalist_cargo_etsng : null,                                       // Груз ЕТСНГ
                                                        code_station_uz: uz_select ? result.new.datalist_code_station_uz : null,                            // Станция УЗ
                                                        id_station_amkr_on: !uz_select ? get_result_select(result.new.select_id_station_amkr_on) : null,    // Станция АМКР прибытия
                                                        id_devision_on: !uz_select ? result.new.datalist_id_devision_on : null,                             // Подразделение АМКР прибытия
                                                        num_nakl: !uz_select ? result.new.input_text_num_nakl : null,                                       // Накладная на вагон
                                                        id_internal_cargo: !uz_select ? result.new.datalist_id_internal_cargo : null,                       // Внутрений груз
                                                        vesg: null,                                                                                         // Вес груза
                                                        id_status_load: null                                                                                // только начало операции
                                                    })
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
                                                            start: null,    // можно править пока подача не закрыта
                                                            stop: result.new.input_datetime_time_stop !== null ? result.new.input_datetime_time_stop._i : null,                                                                 // только начало
                                                            id_wagon_operations: uz_select ? App.wsd_setup.operations.loading_uz : App.wsd_setup.operations.loading_if,                      // (15,16) можно править пока подача не закрыта
                                                            doc_received: result.new.input_datetime_time_document !== null ? result.new.input_datetime_time_document._i : null,                                                         // документ получен
                                                            id_cargo: uz_select ? result.new.datalist_cargo_etsng : null,                 // Груз ЕТСНГ
                                                            code_station_uz: uz_select ? result.new.datalist_code_station_uz : null,         // Станция УЗ
                                                            id_station_amkr_on: !uz_select ? get_result_select(result.new.select_id_station_amkr_on) : null,    // Станция АМКР прибытия
                                                            id_devision_on: !uz_select ? result.new.datalist_id_devision_on : null,          // Подразделение АМКР прибытия
                                                            num_nakl: !uz_select ? result.new.input_text_num_nakl : null,                    // Накладная на вагон
                                                            id_internal_cargo: !uz_select ? result.new.datalist_id_internal_cargo : null,    // Внутрений груз
                                                            vesg: result.new.input_text_vesg,                                                                             // Вес груза
                                                            id_status_load: get_result_select(result.new.select_id_status_load)
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию

                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    num_filing: result.new.input_text_num_nakl_total,
                                                    vesg: result.new.input_text_vesg_total,
                                                    doc_received: result.new.input_datetime_time_document_total !== null ? result.new.input_datetime_time_document_total._i : null,
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
                                                            start: null,    // можно править пока подача не закрыта
                                                            stop: null,                                                                 // только начало
                                                            id_wagon_operations: uz_select ? App.wsd_setup.operations.loading_uz : App.wsd_setup.operations.loading_if,                      // (15,16) можно править пока подача не закрыта
                                                            doc_received: result.new.input_datetime_time_document !== null ? result.new.input_datetime_time_document._i : null,                                                         // документ получен
                                                            id_cargo: uz_select ? result.new.datalist_cargo_etsng : null,                 // Груз ЕТСНГ
                                                            code_station_uz: uz_select ? result.new.datalist_code_station_uz : null,         // Станция УЗ
                                                            id_station_amkr_on: !uz_select ? get_result_select(result.new.select_id_station_amkr_on) : null,    // Станция АМКР прибытия
                                                            id_devision_on: !uz_select ? result.new.datalist_id_devision_on : null,          // Подразделение АМКР прибытия
                                                            num_nakl: !uz_select ? result.new.input_text_num_nakl : null,                    // Накладная на вагон
                                                            id_internal_cargo: !uz_select ? result.new.datalist_id_internal_cargo : null,    // Внутрений груз
                                                            vesg: result.new.input_text_vesg,                                                                             // Вес груза
                                                            id_status_load: get_result_select(result.new.select_id_status_load)
                                                        }
                                                    )
                                                }.bind(this));
                                                // Сформируем операцию
                                                var operation = {
                                                    id_filing: this.id_filing,
                                                    num_filing: result.new.input_text_num_nakl_total,
                                                    vesg: result.new.input_text_vesg_total,
                                                    doc_received: result.new.input_datetime_time_document_total !== null ? result.new.input_datetime_time_document_total._i : null,
                                                    mode: mode,
                                                    wagons: list_wagons
                                                };
                                                this.apply_update_operation_filing(operation);
                                            }
                                        };
                                    }.bind(this),
                                    function () {
                                        this.form_filing_wagons_setup.validation_common_filing_wagons.out_warning_message(langView('voplc_mess_cancel_operation_mode_' + mode, App.Langs));
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
                    // Обработка переключателя
                    this.$radio_loading = $('input[name="radio_loading"]').change(function (event) {
                        this.view_radio_loading(event.currentTarget.id);
                    }.bind(this));
                    // Панели
                    this.$div_loading_ip = $('div#loading-ip');
                    this.$div_loading_uz = $('div#loading-uz');
                    // Алерт
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
                console.log('Close view_op_loading_cars');
                this.settings.fn_init(this.result_init);
            }
        }
        //            

        // Получить строку состава для определенной операции
        var get_sostav_filing = function (row, station, way, park, division, wagons) {
            return {
                idFiling: row ? row.idFiling : 0,
                statusFiling: row ? (row.createFiling !== null ? (row.closeFiling !== null ? 2 : 1) : 0) : 0,
                numFiling: row ? row.numFiling : null,
                typeFiling: row ? row.typeFiling : this.type_filing,
                vesgFiling: row ? row.vesgFiling : null,
                docReceivedFiling: row ? row.docReceivedFiling : null,
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
                countLoadingWagons: row ? (row.filingWayEnd !== null ? 1 : 0) : 0,
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
        // Получить строку вагона в составе для определенной операции
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
                // Справочные данные по вагону
                wagonGruzp: row.wagonGruzp,
                wagonTara: row.wagonTara,
                wagonKolOs: row.wagonKolOs,
                wagonUslTip: row.wagonUslTip,
                wagonDateRemUz: row.wagonDateRemUz,
                wagonDateRemVag: row.wagonDateRemVag,
                wagonSign: row.wagonSign,
                wagonFactoryNumber: row.wagonFactoryNumber,
                wagonInventoryNumber: row.wagonInventoryNumber,
                wagonYearBuilt: row.wagonYearBuilt,
                wagonExitBan: row.wagonExitBan,
                wagonNote: row.wagonNote,
                wagonClosedRoute: row.wagonClosedRoute,
                wagonNewConstruction: row.wagonNewConstruction,
                //
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
                operatorGroup: row.operatorGroup,
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
                internalDocNum: row.internalDocNum,
                idWeighingNum: row.idWeighingNum,
                moveCargoDocReceived: row.moveCargoDocReceived,
                currentCargoIdGroup: row.currentCargoIdGroup,
                currentCargoGroupNameRu: row.currentCargoGroupNameRu,
                currentCargoGroupNameEn: row.currentCargoGroupNameEn,
                currentCargoIdCargo: row.currentCargoIdCargo,
                currentCargoNameRu: row.currentCargoNameRu,
                currentCargoNameEn: row.currentCargoNameEn,
                currentInternalCargoIdGroup: row.currentInternalCargoIdGroup,
                currentInternalCargoGroupNameRu: row.currentInternalCargoGroupNameRu,
                currentInternalCargoGroupNameEn: row.currentInternalCargoGroupNameEn,
                currentInternalCargoIdInternalCargo: row.currentInternalCargoIdInternalCargo,
                currentInternalCargoNameRu: row.currentInternalCargoNameRu,
                currentInternalCargoNameEn: row.currentInternalCargoNameEn,
                currentVesg: row.currentVesg,
                idStationFromAmkr: row.idStationFromAmkr,
                currentStationFromAmkrNameRu: row.currentStationFromAmkrNameRu,
                currentStationFromAmkrNameEn: row.currentStationFromAmkrNameEn,
                currentStationFromAmkrAbbrRu: row.currentStationFromAmkrAbbrRu,
                currentStationFromAmkrAbbrEn: row.currentStationFromAmkrAbbrEn,
                idDivisionFrom: row.idDivisionFrom,
                currentDivisionFromCode: row.currentDivisionFromCode,
                currentDivisionFromNameRu: row.currentDivisionFromNameRu,
                currentDivisionFromNameEn: row.currentDivisionFromNameEn,
                currentDivisionFromAbbrRu: row.currentDivisionFromAbbrRu,
                currentDivisionFromAbbrEn: row.currentDivisionFromAbbrEn,
                idWimLoad: row.idWimLoad,
                idWimRedirection: row.idWimRedirection,
                codeExternalStation: row.codeExternalStation,
                currentExternalStationOnNameRu: row.currentExternalStationOnNameRu,
                currentExternalStationOnNameEn: row.currentExternalStationOnNameEn,
                idStationOnAmkr: row.idStationOnAmkr,
                currentStationOnAmkrNameRu: row.currentStationOnAmkrNameRu,
                currentStationOnAmkrNameEn: row.currentStationOnAmkrNameEn,
                currentStationOnAmkrAbbrRu: row.currentStationOnAmkrAbbrRu,
                currentStationOnAmkrAbbrEn: row.currentStationOnAmkrAbbrEn,
                idDivisionOn: row.idDivisionOn,
                currentDivisionOnCode: row.currentDivisionOnCode,
                currentDivisionOnNameRu: row.currentDivisionOnNameRu,
                currentDivisionOnNameEn: row.currentDivisionOnNameEn,
                currentDivisionOnAbbrRu: row.currentDivisionOnAbbrRu,
                currentDivisionOnAbbrEn: row.currentDivisionOnAbbrEn,
                idWimUnload: row.idWimUnload,
                moveCargoCreate: row.moveCargoCreate,
                moveCargoCreateUser: row.moveCargoCreateUser,
                moveCargoChange: row.moveCargoChange,
                moveCargoChangeUser: row.moveCargoChangeUser,
                moveCargoClose: row.moveCargoClose,
                moveCargoCloseUser: row.moveCargoCloseUser,
                //-------------------------------------------------
            };
        }
        // Открытие панели операции дополнительная обработка
        var view_open = function () {
            this.view_radio_loading('loading_uz'); // выставим по умолчанию УЗ
        }
        // Получить состояние элементов формы в зависисмости от выбранных условий в таблице
        var view_setup_filing = function (command) {
            // Отобразить настройки для открытии операции
            var view_setup_operation_open = function () {
                if (this.id_filing === 0) {
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.enable();
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.$element_fl.addClass('required-field');
                } else {
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.$element_fl.removeClass('required-field');
                }
                // есть выбранные вагоны
                if (rows.length > 0) {
                    this.form_filing_wagons_setup.el.input_datetime_time_start.enable();
                    this.form_filing_wagons_setup.el.input_datetime_time_start.$element.addClass('required-field');
                    // Определим есть вагон с амкр
                    var amkr_vz = rows.find(function (o) {
                        return o.operatorGroup === 'amkr_vz';
                    }.bind(this));

                    if (uz_select && amkr_vz) {
                        //this.default_status_load = App.wsd_setup.loading_status.loaded_ip // по умолчанию гружонный вз
                        this.$radio_loading[1].click();
                        return;
                    }
                    // выбрана погрузкка уз
                    if (uz_select && this.fw_status === 0) {
                        this.$div_loading_uz.show();
                        this.$div_loading_ip.hide();
                        this.form_filing_wagons_setup.el.datalist_code_station_uz.enable();
                        this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.addClass('not-required-field');
                        this.form_filing_wagons_setup.el.datalist_cargo_etsng.enable();
                        this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.addClass('not-required-field');
                    }
                    // выбрана погрузкка вз
                    if (ip_select && this.fw_status === 0) {
                        this.$div_loading_uz.hide();
                        this.$div_loading_ip.show();
                        this.form_filing_wagons_setup.el.select_id_station_amkr_on.enable();
                        this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.addClass('not-required-field');
                        this.form_filing_wagons_setup.el.datalist_id_devision_on.enable();
                        this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.addClass('not-required-field');
                        this.form_filing_wagons_setup.el.datalist_id_internal_cargo.enable();
                        this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.addClass('not-required-field');
                    }
                }
                //-- Заполним
                this.form_filing_wagons_setup.el.input_datetime_time_start.val(this.create_filing ? moment(this.create_filing) : moment());
                this.form_filing_wagons_setup.el.input_datetime_time_stop.val(this.create_filing ? moment(this.close_filing) : null);
                this.form_filing_wagons_setup.el.datalist_id_devision_from.val(this.division_from);
                this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(this.station_from);
            }

            // Проверка на ввод даты окончания операции (режимы править или закрыть)
            var view_set_date_stop = function (isValid) {
                if (this.fw_status === 1) {
                    var date_document = this.form_filing_wagons_setup.el.input_datetime_time_document.val();
                    var date_document_total = this.form_filing_wagons_setup.el.input_datetime_time_document_total.val();
                    // Проверим введена дата окончания или дата документа
                    if (isValid || (date_document !== null && date_document._isValid) || (date_document_total !== null && date_document_total._isValid)) {
                        this.filing_wagons_alert_info.clear_message();
                        if ((date_document !== null && date_document._isValid) || (date_document_total !== null && date_document_total._isValid)) {
                            this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_1_close', App.Langs));
                        } else {
                            this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_1_stop', App.Langs));
                        }
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_close.show();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('not-required-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.select_id_status_load.$element.addClass('required-field');
                        this.form_filing_wagons_setup.el.select_id_status_load.enable();
                        this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_load, this.default_status_load)
                    } else {
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_1_edit', App.Langs));
                        this.form_filing_wagons_setup.el.button_operation_apply.show();
                        this.form_filing_wagons_setup.el.button_operation_close.hide();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('required-field').addClass('not-required-field');
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.val(-1);
                        this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass('required-field');
                    }
                }
            }
            // Проверка на ввод даты получения документа (режимы закрыть все по операции)
            var view_set_date_document = function (isValid) {
                if (this.fw_status === 1 || this.fw_status === 2) {
                    // Определим выбор панели
                    var ip_select = $(this.$radio_loading[1]).prop('checked');
                    var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                    var date_stop = this.form_filing_wagons_setup.el.input_datetime_time_stop.val();
                    this.form_filing_wagons_setup.el.input_datetime_time_document_total.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_num_nakl.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_vesg.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_num_nakl_total.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_vesg_total.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass('required-field not-required-field is-valid check-field').addClass('required-field');

                    if (isValid) {
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.input_datetime_time_document.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        //this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        if (rows.length === 1 && ip_select) {
                            this.form_filing_wagons_setup.el.input_text_num_nakl.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                            this.form_filing_wagons_setup.el.input_text_vesg.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        }
                    } else {
                        // Дата документа
                        this.form_filing_wagons_setup.el.input_datetime_time_document.$element.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        // Станцияназначения уз
                        if (this.not_equal_code_external_station) {
                            this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        //
                        if (this.not_equal_current_cargo_id_cargo) {
                            this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        //
                        if (this.not_equal_id_station_on_amkr) {
                            this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        //
                        if (this.not_equal_id_division_on) {
                            this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        if (this.not_equal_current_internal_cargo_id_internal_cargo) {
                            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        if (rows.length === 1) {
                            if (ip_select) {
                                // только если вз
                                this.form_filing_wagons_setup.el.input_text_num_nakl.$element.removeClass('required-field is-valid').addClass('not-required-field');
                                this.form_filing_wagons_setup.el.input_text_vesg.$element.removeClass('required-field is-valid').addClass('not-required-field');
                            }
                        } else {
                            this.form_filing_wagons_setup.el.input_datetime_time_document.$element.removeClass('required-field not-required-field check-field is-valid');
                        }
                    }
                    if (this.fw_status === 1) view_set_date_stop.call(this, date_stop !== null ? date_stop._isValid : false); // отобразить закрыть операцию и обязательный ввод данных по закрытию

                }
            }
            // Проверка на ввод даты получения общего документа (режимы закрыть все по операции)
            var view_set_date_document_total = function (isValid) {
                if (this.fw_status === 1 || this.fw_status === 2) {
                    // Определим выбор панели
                    var ip_select = $(this.$radio_loading[1]).prop('checked');
                    var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
                    var select_all = this.filing_wagons !== null && rows !== null && this.filing_wagons.length === rows.length;
                    var date_stop = this.form_filing_wagons_setup.el.input_datetime_time_stop.val();
                    this.form_filing_wagons_setup.el.input_datetime_time_document.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_num_nakl.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_vesg.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_num_nakl_total.$element.removeClass('required-field not-required-field is-valid check-field');
                    this.form_filing_wagons_setup.el.input_text_vesg_total.$element.removeClass('required-field not-required-field is-valid check-field');
                    if (isValid) {
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.input_datetime_time_document_total.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        if (rows.length !== 1 && select_all && ip_select) {
                            this.form_filing_wagons_setup.el.input_text_num_nakl_total.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                            this.form_filing_wagons_setup.el.input_text_vesg_total.$element.removeClass('not-required-field is-valid check-field').addClass('required-field');
                        }
                    } else {
                        this.form_filing_wagons_setup.el.input_datetime_time_document_total.$element.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        // Станцияназначения уз
                        if (this.not_equal_code_external_station) {
                            this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        //
                        if (this.not_equal_current_cargo_id_cargo) {
                            this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        //
                        if (this.not_equal_id_station_on_amkr) {
                            this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        //
                        if (this.not_equal_id_division_on) {
                            this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        if (this.not_equal_current_internal_cargo_id_internal_cargo) {
                            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.removeClass('not-required-field is-valid required-field').addClass('check-field');
                        } else {
                            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.removeClass('check-field is-valid required-field').addClass('not-required-field');
                        }
                        if (rows.length !== 1 && select_all && ip_select) {
                            this.form_filing_wagons_setup.el.input_text_num_nakl_total.$element.removeClass('required-field is-valid').addClass('not-required-field');
                            this.form_filing_wagons_setup.el.input_text_vesg_total.$element.removeClass('required-field is-valid').addClass('not-required-field');
                        }
                    }
                    if (this.fw_status === 1) view_set_date_stop.call(this, date_stop !== null ? date_stop._isValid : false); // отобразить закрыть операцию и обязательный ввод данных по закрытию
                }
            }

            // Определим поля которые не повторяются (подсветим синим)
            var get_change_field = function (rows) {
                // Проврим выбраные стрики на равны между собой поля
                this.not_equal_code_external_station = false;
                this.not_equal_current_cargo_id_cargo = false;
                this.not_equal_id_station_on_amkr = false;
                this.not_equal_id_division_on = false;
                this.not_equal_internal_doc_num = false;
                this.not_equal_current_internal_cargo_id_internal_cargo = false;
                this.not_equal_current_vesg = false;
                if (rows && rows.length > 1) {
                    var move_cargo_doc_received = rows[0].moveCargoDocReceived;
                    var code_external_station = rows[0].codeExternalStation;
                    var current_cargo_id_cargo = rows[0].currentCargoIdCargo;
                    var id_station_on_amkr = rows[0].idStationOnAmkr;
                    var id_division_on = rows[0].idDivisionOn;
                    var internal_doc_num = rows[0].internalDocNum;
                    var current_internal_cargo_id_internal_cargo = rows[0].currentInternalCargoIdInternalCargo;
                    var current_vesg = rows[0].currentVesg;
                    $.each(rows, function (i, el) {
                        //if (el.moveCargoDocReceived !== move_cargo_doc_received) { this.not_equal_move_cargo_doc_received = true; }
                        if (el.codeExternalStation !== code_external_station) { this.not_equal_code_external_station = true; }
                        if (el.currentCargoIdCargo !== current_cargo_id_cargo) { this.not_equal_current_cargo_id_cargo = true; }
                        if (el.idStationOnAmkr !== id_station_on_amkr) { this.not_equal_id_station_on_amkr = true; }
                        if (el.idDivisionOn !== id_division_on) { this.not_equal_id_division_on = true; }
                        if (el.internalDocNum !== internal_doc_num) { this.not_equal_internal_doc_num = true; }
                        if (el.currentInternalCargoIdInternalCargo !== current_internal_cargo_id_internal_cargo) { this.not_equal_current_internal_cargo_id_internal_cargo = true; }
                        if (el.currentVesg !== current_vesg) { this.not_equal_current_vesg = true; }
                    }.bind(this));
                }
            }
            // Проверка на команды вызова функций
            if (command) {
                if (typeof command.time_stop === "boolean") { view_set_date_stop.call(this, command.time_stop); return; }
                if (typeof command.time_document === "boolean") { view_set_date_document.call(this, command.time_document); return; }
                if (typeof command.time_document_total === "boolean") { view_set_date_document_total.call(this, command.time_document_total); return; }
            }

            this.clear_all();
            this.filing_wagons_alert_info.clear_message();
            this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_start', App.Langs));

            // Обновим кнопку добавить в подачу\создать черновик
            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row(); // Получим выбранные вагоны в подаче
            var bts = this["twwf_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            bts.enable();
            bts.text(langView('voplc_title_button_new_filing', App.Langs));
            //bts.titleAttr(langView('voplc_title_attr_button_new_filing', App.Langs));
            var fws_bts = this["tfw_" + this.type_filing].tab_com.obj_t_report.buttons([7]);
            fws_bts.disable();

            // Определим выбор панели
            var uz_select = $(this.$radio_loading[0]).prop('checked');
            var ip_select = $(this.$radio_loading[1]).prop('checked');
            // Сбросим все настройки
            this.form_filing_wagons_setup.el.button_filing_add.hide();
            this.form_filing_wagons_setup.el.button_filing_apply.hide();
            this.form_filing_wagons_setup.el.button_operation_apply.hide();
            this.form_filing_wagons_setup.el.button_operation_open.hide();
            this.form_filing_wagons_setup.el.button_operation_close.hide();
            this.form_filing_wagons_setup.el.input_datetime_time_start.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.input_datetime_time_stop.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.input_text_num_nakl_total.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.input_text_vesg_total.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.input_datetime_time_document_total.$element.removeClass('required-field not-required-field check-field is-valid');

            this.form_filing_wagons_setup.el.datalist_id_devision_from.$element_fl.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.select_id_station_amkr_from.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.input_datetime_time_document.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.datalist_code_station_uz.$element_fl.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.datalist_cargo_etsng.$element_fl.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.select_id_station_amkr_on.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.datalist_id_devision_on.$element_fl.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.input_text_num_nakl.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.$element_fl.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.input_text_vesg.$element.removeClass('required-field not-required-field check-field is-valid');
            this.form_filing_wagons_setup.el.select_id_status_load.$element.removeClass('required-field not-required-field check-field is-valid');


            this.form_filing_wagons_setup.el.input_datetime_time_start.val(null);
            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);

            this.form_filing_wagons_setup.el.input_text_num_nakl_total.val(null);
            this.form_filing_wagons_setup.el.input_text_vesg_total.val(null);
            this.form_filing_wagons_setup.el.input_datetime_time_document_total.val(null);

            this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(-1);
            this.form_filing_wagons_setup.el.datalist_id_devision_from.val(-1);

            this.form_filing_wagons_setup.el.input_datetime_time_document.val(null);
            this.form_filing_wagons_setup.el.datalist_code_station_uz.val(-1);
            this.form_filing_wagons_setup.el.datalist_cargo_etsng.val(-1);
            this.form_filing_wagons_setup.el.select_id_station_amkr_on.val(-1);
            this.form_filing_wagons_setup.el.datalist_id_devision_on.val(-1);
            this.form_filing_wagons_setup.el.input_text_num_nakl.val(null);
            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.val(-1);

            this.form_filing_wagons_setup.el.input_text_vesg.val(null);
            this.form_filing_wagons_setup.el.select_id_status_load.val(-1);

            this.form_filing_wagons_setup.el.input_datetime_time_start.disable();
            this.form_filing_wagons_setup.el.input_datetime_time_stop.disable();

            this.form_filing_wagons_setup.el.input_text_num_nakl_total.disable();
            this.form_filing_wagons_setup.el.input_text_vesg_total.disable();
            this.form_filing_wagons_setup.el.input_datetime_time_document_total.disable();

            this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
            this.form_filing_wagons_setup.el.select_id_station_amkr_from.disable();
            this.form_filing_wagons_setup.el.input_datetime_time_document.disable();
            // Погрузка УЗ
            this.form_filing_wagons_setup.el.datalist_code_station_uz.disable();
            this.form_filing_wagons_setup.el.datalist_cargo_etsng.disable();
            // Погрузка ВЗ
            this.form_filing_wagons_setup.el.select_id_station_amkr_on.disable();
            this.form_filing_wagons_setup.el.datalist_id_devision_on.disable();
            this.form_filing_wagons_setup.el.input_text_num_nakl.disable();
            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.disable();
            // Общие
            this.form_filing_wagons_setup.el.input_text_vesg.disable();
            this.form_filing_wagons_setup.el.select_id_status_load.disable();

            if (this.id_filing === 0) {
                // черновик
                fws_bts.enable();
                this.filing_wagons_alert_info.clear_message();
                this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_draft', App.Langs));
                this.form_filing_wagons_setup.el.button_filing_add.show();
                this.form_filing_wagons_setup.el.button_filing_apply.hide();
                this.form_filing_wagons_setup.el.button_operation_apply.hide();
                this.form_filing_wagons_setup.el.button_operation_open.hide();
                this.form_filing_wagons_setup.el.button_operation_close.hide();
                view_setup_operation_open.call(this);
            };
            if (this.id_filing > 0) {
                // Выбрана подача
                bts.text(langView('voplc_title_button_add_filing', App.Langs));
                this.filing_wagons_alert_info.clear_message();
                // Проверим закрыта подача
                if (this.close_filing !== null) bts.disable();
                // Выбрана подача (покажем данные по подаче)
                if (this.create_filing) {
                    this.form_filing_wagons_setup.el.button_filing_add.hide();
                    if (this.close_filing === null) this.form_filing_wagons_setup.el.button_filing_apply.show();
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_open.hide();
                    this.form_filing_wagons_setup.el.button_operation_close.hide();
                } else {
                    this.form_filing_wagons_setup.el.button_filing_add.show();
                    this.form_filing_wagons_setup.el.button_filing_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_apply.hide();
                    this.form_filing_wagons_setup.el.button_operation_open.hide();
                    this.form_filing_wagons_setup.el.button_operation_close.hide();
                }
                // подача закрыта ?
                if (this.close_filing === null) {
                    this.form_filing_wagons_setup.el.datalist_id_devision_from.enable();
                    //this.form_filing_wagons_setup.el.select_id_station_amkr_from.enable();
                    this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_filing', App.Langs));
                } else {
                    this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_filing_close', App.Langs));
                }
                this.form_filing_wagons_setup.el.select_id_station_amkr_from.val(this.station_from);
                this.form_filing_wagons_setup.el.datalist_id_devision_from.val(this.division_from);

                this.form_filing_wagons_setup.el.input_text_num_nakl_total.val(this.num_filing);
                this.form_filing_wagons_setup.el.input_text_vesg_total.val(this.vesg_filing);
                this.form_filing_wagons_setup.el.input_datetime_time_document_total.val(this.doc_received_filing);
                // Проверим выбраны вагоны
                switch (this.fw_status) {
                    case 0: {
                        // выбраны вагоны без операциии
                        fws_bts.enable();
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_0', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_open.show();
                        this.form_filing_wagons_setup.el.button_operation_close.hide();
                        view_setup_operation_open.call(this);
                        break;
                    }
                    case 1: {
                        // выбраны вагоны операция открыта
                        this.default_status_load = App.wsd_setup.loading_status.loaded_uz; // по умолчанию гружонный уз
                        // выбор уз или вз
                        //App.wsd_setup.operations.loading_uz
                        if (ip_select && rows[0].currentIdOperation === App.wsd_setup.operations.loading_uz) {
                            //this.default_status_load = App.wsd_setup.loading_status.loaded_uz; // по умолчанию гружонный уз
                            this.$radio_loading[0].click();
                            return;
                        }
                        if (uz_select && rows[0].currentIdOperation === App.wsd_setup.operations.loading_if) {
                            //this.default_status_load = App.wsd_setup.loading_status.loaded_ip // по умолчанию гружонный вз
                            this.$radio_loading[1].click();
                            return;
                        }

                        if (rows[0].currentIdOperation === App.wsd_setup.operations.loading_uz) {
                            this.default_status_load = App.wsd_setup.loading_status.loaded_uz; // по умолчанию гружонный уз
                            this.$div_loading_uz.show();
                            this.$div_loading_ip.hide();
                        } else {
                            this.default_status_load = App.wsd_setup.loading_status.loaded_ip // по умолчанию гружонный вз
                            this.$div_loading_uz.hide();
                            this.$div_loading_ip.show();
                        }
                        // загрузить статусы взависимости от операции
                        this.list_status_load = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(rows[0].currentIdOperation);

                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_1_stop', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_open.hide();
                        this.form_filing_wagons_setup.el.button_operation_close.show();
                        this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.enable();
                        this.form_filing_wagons_setup.el.select_id_status_load.enable();

                        this.form_filing_wagons_setup.el.input_text_num_nakl_total.disable();
                        this.form_filing_wagons_setup.el.input_text_vesg_total.disable();
                        this.form_filing_wagons_setup.el.input_datetime_time_document_total.disable();

                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(moment());
                        this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_load, this.default_status_load);
                        this.form_filing_wagons_setup.el.input_datetime_time_document.val(null);

                        view_set_date_stop.call(this, true); // отобразить закрыть

                        this.form_filing_wagons_setup.el.datalist_code_station_uz.enable();
                        this.form_filing_wagons_setup.el.datalist_cargo_etsng.enable();
                        this.form_filing_wagons_setup.el.select_id_station_amkr_on.enable();
                        this.form_filing_wagons_setup.el.datalist_id_devision_on.enable();
                        this.form_filing_wagons_setup.el.datalist_id_internal_cargo.enable();

                        if (rows.length === 1) {
                            this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows[0].currentOperationStart);
                            this.form_filing_wagons_setup.el.input_datetime_time_document.enable();
                            if (ip_select) {
                                this.form_filing_wagons_setup.el.input_text_num_nakl.enable();
                                this.form_filing_wagons_setup.el.input_text_vesg.enable();
                            }
                        } else {
                            this.form_filing_wagons_setup.el.input_datetime_time_start.val(null);
                            this.form_filing_wagons_setup.el.input_text_num_nakl.disable();
                            this.form_filing_wagons_setup.el.input_text_vesg.disable();
                            this.form_filing_wagons_setup.el.input_datetime_time_document.disable();
                        }

                        get_change_field.call(this, rows);
                        view_set_date_document.call(this, rows[0].moveCargoDocReceived !== null);
                        // Выбраны все вагоны
                        if (rows.length !== 1 && this.filing_wagons !== null && this.filing_wagons.length === rows.length) {
                            this.form_filing_wagons_setup.el.input_datetime_time_document_total.enable();
                            if (ip_select) {
                                this.form_filing_wagons_setup.el.input_text_num_nakl_total.enable();
                                this.form_filing_wagons_setup.el.input_text_vesg_total.enable();
                            }
                            view_set_date_document_total.call(this, false);
                        }

                        this.form_filing_wagons_setup.el.datalist_code_station_uz.val(rows[0].codeExternalStation)//code_external_station
                        this.form_filing_wagons_setup.el.datalist_cargo_etsng.val(rows[0].currentCargoIdCargo)//current_cargo_id_cargo
                        this.form_filing_wagons_setup.el.select_id_station_amkr_on.val(rows[0].idStationOnAmkr === null ? -1 : rows[0].idStationOnAmkr); // id_station_on_amkr
                        this.form_filing_wagons_setup.el.datalist_id_devision_on.val(rows[0].idDivisionOn);// id_division_on
                        this.form_filing_wagons_setup.el.datalist_id_internal_cargo.val(rows[0].currentInternalCargoIdInternalCargo);//current_internal_cargo_id_internal_cargo

                        this.form_filing_wagons_setup.el.input_text_num_nakl.val(null);
                        this.form_filing_wagons_setup.el.input_text_vesg.val(null);
                        break;
                    }
                    case 2: {
                        // выбор уз или вз
                        if (ip_select && rows[0].currentIdOperation === App.wsd_setup.operations.loading_uz) {
                            this.$radio_loading[0].click();
                            return;
                        }
                        if (uz_select && rows[0].currentIdOperation === App.wsd_setup.operations.loading_if) {
                            this.$radio_loading[1].click();
                            return;
                        }
                        if (rows[0].currentIdOperation === App.wsd_setup.operations.loading_uz) {
                            this.$div_loading_uz.show();
                            this.$div_loading_ip.hide();
                        } else {
                            this.$div_loading_uz.hide();
                            this.$div_loading_ip.show();
                        }
                        // загрузить статусы взависимости от операции
                        this.list_status_load = this.view_com.api_dir.getListValueTextWagonLoadingStatusOfWagonOperation(rows[0].currentIdOperation);
                        this.form_filing_wagons_setup.el.select_id_status_load.update(this.list_status_load, -1);
                        this.form_filing_wagons_setup.el.input_datetime_time_document.val(rows[0].moveCargoDocReceived); // move_cargo_doc_received
                        // выбраны вагоны операция закрыта (но надо проверить на документ)
                        this.filing_wagons_alert_info.clear_message();
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_open.hide();
                        this.form_filing_wagons_setup.el.button_operation_close.hide();

                        if (rows.length === 1) {
                            this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows[0].currentOperationStart);
                            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows[0].currentOperationEnd);
                            this.form_filing_wagons_setup.el.input_text_num_nakl.val(rows[0].internalDocNum);
                            this.form_filing_wagons_setup.el.input_text_vesg.val(rows[0].currentVesg);
                            this.form_filing_wagons_setup.el.select_id_status_load.val(rows[0].currentIdLoadingStatus);

                        } else {
                            this.form_filing_wagons_setup.el.input_datetime_time_start.val(null);
                            this.form_filing_wagons_setup.el.input_datetime_time_stop.val(null);
                            this.form_filing_wagons_setup.el.input_text_num_nakl.val(null);
                            this.form_filing_wagons_setup.el.input_text_vesg.val(null);
                            this.form_filing_wagons_setup.el.select_id_status_load.val(null);
                        }

                        this.form_filing_wagons_setup.el.input_datetime_time_document.val(rows[0].moveCargoDocReceived);
                        this.form_filing_wagons_setup.el.datalist_code_station_uz.val(rows[0].codeExternalStation)//code_external_station
                        this.form_filing_wagons_setup.el.datalist_cargo_etsng.val(rows[0].currentCargoIdCargo)//current_cargo_id_cargo
                        this.form_filing_wagons_setup.el.select_id_station_amkr_on.val(rows[0].idStationOnAmkr === null ? -1 : rows[0].idStationOnAmkr); // id_station_on_amkr
                        this.form_filing_wagons_setup.el.datalist_id_devision_on.val(rows[0].idDivisionOn);// id_division_on
                        this.form_filing_wagons_setup.el.datalist_id_internal_cargo.val(rows[0].currentInternalCargoIdInternalCargo);//current_internal_cargo_id_internal_cargo

                        this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
                        this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        // документ введен
                        if (rows[0].moveCargoDocReceived !== null || this.close_filing !== null) {
                            // Подача закрыта или документ введен
                            this.form_filing_wagons_setup.el.button_operation_apply.hide();
                            this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_2_close', App.Langs));
                            // this.form_filing_wagons_setup.el.input_datetime_time_document.val(rows[0].moveCargoDocReceived);

                            this.form_filing_wagons_setup.el.datalist_code_station_uz.disable();
                            this.form_filing_wagons_setup.el.datalist_cargo_etsng.disable();
                            this.form_filing_wagons_setup.el.select_id_station_amkr_on.disable();
                            this.form_filing_wagons_setup.el.datalist_id_devision_on.disable();
                            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.disable();
                            this.form_filing_wagons_setup.el.datalist_id_devision_from.disable();
                            this.form_filing_wagons_setup.el.select_id_status_load.disable();
                        } else {
                            this.form_filing_wagons_setup.el.button_operation_apply.show();
                            this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_2', App.Langs));

                            get_change_field.call(this, rows);
                            view_set_date_document.call(this, rows[0].moveCargoDocReceived !== null);
                            // выбраны не все
                            this.form_filing_wagons_setup.el.datalist_code_station_uz.enable();
                            this.form_filing_wagons_setup.el.datalist_cargo_etsng.enable();
                            this.form_filing_wagons_setup.el.select_id_station_amkr_on.enable();
                            this.form_filing_wagons_setup.el.datalist_id_devision_on.enable();
                            this.form_filing_wagons_setup.el.datalist_id_internal_cargo.enable();
                            this.form_filing_wagons_setup.el.select_id_status_load.enable();
                            // выбран 1
                            if (rows.length === 1) {
                                this.form_filing_wagons_setup.el.input_datetime_time_document.enable();
                                this.form_filing_wagons_setup.el.input_text_num_nakl.enable();
                                this.form_filing_wagons_setup.el.input_text_vesg.enable();
                            }
                            // выбраны все
                            if (rows.length > 1 && this.filing_wagons !== null && this.filing_wagons.length === rows.length) {
                                this.form_filing_wagons_setup.el.input_datetime_time_document.disable();

                                this.form_filing_wagons_setup.el.input_text_num_nakl.disable();
                                this.form_filing_wagons_setup.el.input_text_vesg.disable();
                                //
                                this.form_filing_wagons_setup.el.input_text_num_nakl_total.enable();
                                this.form_filing_wagons_setup.el.input_text_vesg_total.enable();
                                this.form_filing_wagons_setup.el.input_datetime_time_document_total.enable();

                                // Засветить общие
                            }
                        }
                        break;
                    }
                    case 3: {
                        // выбор уз или вз
                        if (ip_select && rows[0].currentIdOperation === App.wsd_setup.operations.loading_uz) {
                            //this.default_status_load = App.wsd_setup.loading_status.loaded_uz; // по умолчанию гружонный уз
                            this.$radio_loading[0].click();
                            return;
                        }
                        if (uz_select && rows[0].currentIdOperation === App.wsd_setup.operations.loading_if) {
                            //this.default_status_load = App.wsd_setup.loading_status.loaded_ip // по умолчанию гружонный вз
                            this.$radio_loading[1].click();
                            return;
                        }
                        if (rows[0].currentIdOperation === App.wsd_setup.operations.loading_uz) {
                            this.$div_loading_uz.show();
                            this.$div_loading_ip.hide();
                        } else {
                            this.$div_loading_uz.hide();
                            this.$div_loading_ip.show();
                        }
                        // выбраны вагоны ушли (но надо проверить на документ)
                        this.filing_wagons_alert_info.clear_message();
                        this.filing_wagons_alert_info.out_info_message(langView('voplc_mess_info_wagon_mode_3', App.Langs));
                        this.form_filing_wagons_setup.el.button_filing_add.hide();
                        this.form_filing_wagons_setup.el.button_filing_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_apply.hide();
                        this.form_filing_wagons_setup.el.button_operation_open.hide();
                        this.form_filing_wagons_setup.el.button_operation_close.hide();
                        this.form_filing_wagons_setup.el.input_datetime_time_start.val(rows && rows.length > 0 ? moment(rows[0].filingStart) : null);
                        this.form_filing_wagons_setup.el.input_datetime_time_stop.val(rows && rows.length > 0 ? moment(rows[0].filingEnd) : null);
                        break;
                    }
                }
            }
        }
        // Валидация формы 
        var validation = function (result, mode) {
            // 0- add; >0 id ; null -not edit
            if (this.id_filing === null) { return false; }
            var valid = true;
            var rows = this["tfw_" + this.type_filing].tab_com.get_select_row();
            // Получим последнюю дату операции
            var operation_end = get_max_element(rows, 'currentOperationEnd');
            var start_date = get_max_element(rows, 'filingStart');

            var uz_select = $(this.$radio_loading[0]).prop('checked');

            var mode_close = 0;     // режим закрытия операции 0-правка, 1-закрыть только операцию, 2-закрыть все по грузу (введена дата документа)
            var all_rows = false;   // признак выбраны все поля подачи

            if (mode === 3 || mode === 4) {
                if ((result.new.input_datetime_time_document !== null || result.new.input_datetime_time_document_total !== null) && rows !== null && (rows.length === 1 || (this.filing_wagons !== null && this.filing_wagons.length === rows.length))) {
                    mode_close = 2;
                    if (this.filing_wagons !== null && this.filing_wagons.length === rows.length) { all_rows = true; } // выбраны все поля
                } else if (result.new.input_datetime_time_document === null && result.new.input_datetime_time_stop !== null && rows.length > 0) {
                    mode_close = 1;
                }
            }
            // Режим создать подачу и выбраны вагоны
            if (mode === 0 && rows && rows.length > 0) {
                // Проверим время начала
                if (result.new && result.new.input_datetime_time_start) {
                    var aplly = moment(result.new.input_datetime_time_start);
                    // проверим на последнюю операцию
                    var old = moment(operation_end);
                    var minutes = old.diff(aplly, 'minutes');
                    if (minutes > 0) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('voplc_mess_error_start_time_aplly', App.Langs).format(operation_end), false);
                        valid = false;
                    }
                    // проверим на тек дату
                    var curr = moment();
                    var minutes = aplly.diff(curr, 'minutes');
                    if (minutes < App.wsd_setup.load_start_dt_min) {

                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('voplc_mess_error_min_time_aplly', App.Langs).format(App.wsd_setup.load_start_dt_min * -1), false);
                        valid = false;
                    }
                    if (minutes > App.wsd_setup.load_start_dt_max) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_start', langView('voplc_mess_error_max_time_aplly', App.Langs).format(App.wsd_setup.load_start_dt_max), false);
                        valid = false;
                    }
                }

            }
            // Время конца операции
            if (mode === 3 && mode_close > 0) {
                if (result.new && result.new.input_datetime_time_stop === null) {
                    this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('voplc_mess_error_time_aplly', App.Langs), false);
                    valid = false;
                } else {
                    // Проверим время окончания
                    var dtstop = moment(result.new.input_datetime_time_stop);
                    if (start_date) {
                        // Проверим время начала и окончания
                        var dtstart = moment(start_date);
                        var dtstop = moment(result.new.input_datetime_time_stop);
                        var minutes = dtstop.diff(dtstart, 'minutes');
                        if (minutes <= 0) {
                            this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('voplc_mess_error_stop_time_aplly', App.Langs), false);
                            valid = false;
                        } else {
                            if (minutes < App.wsd_setup.load_period_min || minutes > App.wsd_setup.load_period_max) {
                                this.form_filing_wagons_setup.set_element_validation_error('time_stop', langView('voplc_mess_error_period_time', App.Langs).format(App.wsd_setup.load_period_min, App.wsd_setup.load_period_max), false);
                                valid = false;
                            }
                        }
                    }
                }
            }
            // Проверка даты документа (на вагон)
            if (mode_close === 2 && rows !== null && rows.length === 1) {
                // Проверим время документа
                if (result.new && result.new.input_datetime_time_document) {
                    var curr = moment();
                    var aplly = moment(result.new.input_datetime_time_document);
                    var minutes = aplly.diff(curr, 'minutes');

                    if (minutes < App.wsd_setup.load_document_dt_min) {

                        this.form_filing_wagons_setup.set_element_validation_error('time_document', langView('voplc_mess_error_min_time_docum', App.Langs).format(App.wsd_setup.load_document_dt_min * -1), false);
                        valid = false;
                    }
                    if (minutes > App.wsd_setup.load_document_dt_max) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_document', langView('voplc_mess_error_max_time_docum', App.Langs).format(App.wsd_setup.load_document_dt_max), false);
                        valid = false;
                    }
                }
            }
            // Проверка даты документа (на все вагоны)
            if (mode_close === 2 && all_rows && rows !== null && rows.length > 1) {
                // Проверим время документа
                if (result.new && result.new.input_datetime_time_document_total) {
                    var curr = moment();
                    var aplly = moment(result.new.input_datetime_time_document_total);
                    var minutes = aplly.diff(curr, 'minutes');
                    if (minutes < App.wsd_setup.load_document_dt_min) {

                        this.form_filing_wagons_setup.set_element_validation_error('time_document_total', langView('voplc_mess_error_min_time_docum', App.Langs).format(App.wsd_setup.load_document_dt_min * -1), false);
                        valid = false;
                    }
                    if (minutes > App.wsd_setup.load_document_dt_max) {
                        this.form_filing_wagons_setup.set_element_validation_error('time_document_total', langView('voplc_mess_error_max_time_docum', App.Langs).format(App.wsd_setup.load_document_dt_max), false);
                        valid = false;
                    }
                }
            }
            // Проверка ввода номера накладной и веса
            if (mode_close === 2) {
                // Проверка на общий вес и накладную
                if (all_rows && rows !== null && rows.length > 1) {
                    //
                    if (result.new.input_text_vesg_total === null && !uz_select) {
                        this.form_filing_wagons_setup.set_element_validation_error('vesg_total', langView('voplc_mess_error_vesg', App.Langs), false);
                        valid = false;
                    }
                    if (result.new.input_text_vesg_total <= 0 && !uz_select) {

                        this.form_filing_wagons_setup.set_element_validation_error('vesg_total', langView('voplc_mess_error_vesg_null', App.Langs), false);
                        valid = false;
                    }
                    if (result.new.input_text_num_nakl_total === null && !uz_select) {
                        this.form_filing_wagons_setup.set_element_validation_error('num_nakl_total', langView('voplc_mess_error_num_nakl', App.Langs), false);
                        valid = false;
                    }
                }
                // Проверка накладной и веса 
                if (rows !== null && rows.length === 1) {
                    if (result.new.input_text_vesg === null && !uz_select && (get_result_select(result.new.select_id_status_load) !== App.wsd_setup.loading_status.empty)) {
                        this.form_filing_wagons_setup.set_element_validation_error('vesg', langView('voplc_mess_error_vesg', App.Langs), false);
                        valid = false;
                    }
                    if (result.new.input_text_num_nakl === null && !uz_select) {
                        this.form_filing_wagons_setup.set_element_validation_error('num_nakl', langView('voplc_mess_error_num_nakl', App.Langs), false);
                        valid = false;
                    }
                }
                // проверим станцию назначения (только для вз)
                if (result.new.select_id_station_amkr_on < 0 && !uz_select) {
                    this.form_filing_wagons_setup.set_element_validation_error('id_station_amkr_on', langView('voplc_mess_error_filing_station_on_amkr', App.Langs), false);
                    valid = false;
                }
            }
            // Проверим введенный вес
            //if (result.new.input_text_vesg > 0 && rows !== null && rows.length === 1) {
            //    //var gruzp = rows[0].wagonGruzp !== null ? Number(rows[0].wagonGruzp) : null;
            //    //if (gruzp !== null && result.new.input_text_vesg > (gruzp * 1000)) {
            //    //    this.form_filing_wagons_setup.set_element_validation_error('vesg', langView('voplc_mess_error_max_vesg', App.Langs).format(gruzp), false);
            //    //    valid = false;
            //    //}
            //}
            // проверка статуса закрытия операции
            if (mode_close > 0) {
                // Обязательно при закрытии операции время конца и статус операции
                if (result.new && result.new.input_datetime_time_stop && result.new.select_id_status_load < 0) {
                    this.form_filing_wagons_setup.set_element_validation_error('id_status_load', langView('voplc_mess_error_not_wagons_status_close_filing', App.Langs), false);
                    valid = false;
                }
            }
            // Проверим вагоны в подаче
            if (mode === 0) {
                // Проверим вагоны в подаче
                if (this.filing_wagons === null || this.filing_wagons.length === 0) {
                    this.form_filing_wagons_setup.validation_common_filing_wagons.out_error_message(langView('voplc_mess_error_not_wagons_filing', App.Langs));
                    valid = false;
                }
            }
            // проверка подразделения погрузки
            if (mode === 0) {
                valid = valid & this.validation_exist_divisions(result.new.datalist_id_devision_from, 'id_devision_from', true, false);
            }

            if ((mode === 0 || mode === 3 || mode === 4) && rows && rows.length > 0) {
                if (uz_select) {
                    // станция обязательна если не порожний и закрытие
                    valid = valid & this.validation_exist_external_station(result.new.datalist_code_station_uz, 'code_station_uz', (get_result_select(result.new.select_id_status_load) !== App.wsd_setup.loading_status.empty) && mode_close === 2, false);
                    valid = valid & this.validation_exist_cargo(result.new.datalist_cargo_etsng, 'cargo_etsng', mode_close === 2, false);
                    // Проверим соотношение груз - сотояние
                    if (result.new.datalist_cargo_etsng !== null && result.new.select_id_status_load !== null) {
                        var cargo = this.cargo.find(function (o) {
                            return o.id === result.new.datalist_cargo_etsng;
                        }.bind(this));
                        if (cargo) {
                            if ((get_result_select(result.new.select_id_status_load) === App.wsd_setup.loading_status.empty && App.wsd_setup.list_empty_group.indexOf(cargo.idGroup) === -1) ||
                                (get_result_select(result.new.select_id_status_load) !== App.wsd_setup.loading_status.empty && App.wsd_setup.list_empty_group.indexOf(cargo.idGroup) >= 0)) {
                                this.form_filing_wagons_setup.set_element_validation_error('id_status_load', langView('voplc_mess_error_not_wagons_cargo_not_status', App.Langs), false);
                                this.form_filing_wagons_setup.set_element_validation_error('cargo_etsng', langView('voplc_mess_error_not_wagons_cargo_not_status', App.Langs), false);
                                valid = false;
                            }
                        }
                    }
                } else {
                    valid = valid & this.validation_exist_divisions(result.new.datalist_id_devision_on, 'id_devision_on', mode_close === 2, false);
                    valid = valid & this.validation_exist_internal_cargo(result.new.datalist_id_internal_cargo, 'id_internal_cargo', mode_close === 2, false);
                    var cargo = this.internal_cargo.find(function (o) {
                        return o.id === result.new.datalist_id_internal_cargo;
                    }.bind(this));
                    if (cargo) {
                        if ((get_result_select(result.new.select_id_status_load) === App.wsd_setup.loading_status.empty && !cargo.emptyWeight) ||
                            (get_result_select(result.new.select_id_status_load) !== App.wsd_setup.loading_status.empty && cargo.emptyWeight)) {
                            this.form_filing_wagons_setup.set_element_validation_error('id_status_load', langView('voplc_mess_error_not_wagons_cargo_not_status', App.Langs), false);
                            this.form_filing_wagons_setup.set_element_validation_error('id_internal_cargo', langView('voplc_mess_error_not_wagons_cargo_not_status', App.Langs), false);
                            valid = false;
                        }


                    }

                }
            }
            return valid;
        }
        // Создать подачу для погрузки
        var apply_add_filing = function (data, callback) {
            this.view_com.api_wsd.postAddFilingLoading(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        //
        var apply_update_filing = function (data, callback) {
            this.view_com.api_wsd.postUpdateFiling(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        // Открыть(закрыть) операцию погрузки над вагонами подачи
        var apply_update_operation_filing = function (data, callback) {
            this.view_com.api_wsd.postUpdateFilingOperationLoading(data, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            }.bind(this));
        }
        // Завершенеие инициализации [this.view_com]
        var out_init_view_com = function () {

            this.cfiling.init({
                alert: this.settings.alert,

                type_filing: 2,         // Погрузка
                wagon_operation: App.wsd_setup.operations.loading_uz,    // операция над вагоном
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
                fn_view_open: function () {
                    view_open.call(this);
                },
                fn_view_setup_filing: function (command) {
                    view_setup_filing.call(this, command);
                },
                fn_validation: function (result, mode) {
                    return validation.call(this, result, mode);
                },
                fn_apply_add_filing: function (data, callback) {
                    apply_add_filing.call(this, data, callback);
                },
                fn_apply_update_filing: function (data, callback) {
                    apply_update_filing.call(this, data, callback);
                },
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
                this.view_com.$title.append(langView('voplc_card_header_panel', App.Langs));
                this.view_com.$op.empty();
                this.view_com.close();
                // Сообщение
                LockScreen(langView('voplc_mess_init_panel', App.Langs));
                out_init_view_com();
            }.bind(this),
            fn_close: this.settings.fn_close,
        }, function () { }.bind(this));

    };

    view_op_loading_cars.prototype.view = function (id_way) {
        this.cfiling.view(id_way);
    }
    // Отображение после нажатия выбора погрузка уз\вз 

    App.view_op_loading_cars = view_op_loading_cars;

    window.App = App;

})(window);