/* ===============================================
-= Модуль панель операции "ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ" =-
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

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'voprc_card_header_panel': 'ВЫПОЛНИТЬ ОПЕРАЦИЮ "ВОЗВРАТ ИЛИ ОТМЕНА ОПЕРАЦИИ ОТПРАВКИ"',
            'voprc_card_header_on': 'ВЕРНУТЬ НА СТАНЦИЮ',
            'voprc_card_header_from': 'ОТПРАВЛЕННЫЕ СОСТАВЫ',
            'voprc_fieldset_on_table_title': 'Сформированный состав',

            'voprc_title_label_station_on': 'Станция отправления:',
            'voprc_text_label_station_on': 'Выберите станцию отправления состава...',
            //'voprc_title_placeholder_station_on': 'Станция прибытия:',

            'voprc_title_label_type_return': 'Отмена операции',
            'voprc_title_text_type_return': 'Выберите тип операции отмена или возврат',
            'voprc_title_label_way_on': 'Путь возврата:',
            'voprc_title_text_way_on': 'Выберите путь возврата вагонов состава...',

            //'voprc_title_placeholder_way_on': 'Выберите путь',


            //'voprc_title_label_outer_way': 'Внешний путь:',
            //'voprc_title_placeholder_outer_way': 'Внешний путь',
            'voprc_title_label_locomotive1': 'Локомотив №1:',
            'voprc_title_label_locomotive2': 'Локомотив №2:',
            'voprc_title_placeholder_locomotive': ' № локомотива',
            'voprc_title_time_aplly': 'Время выполнения',
            'voprc_text_time_aplly': 'Время выполнения операции ограниченно +(-)1день',
            'voprc_title_placeholder_time_aplly': 'Время выполнения',

            'voprc_title_form_apply': 'Выполнить',
            'voprc_title_form_apply_title': 'Выполнить операцию "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР"',

            'voprc_title_button_export': 'Экспорт',
            'voprc_title_button_buffer': 'Буфер',
            'voprc_title_button_excel': 'Excel',
            'voprc_title_button_cancel': 'Отменить',
            'voprc_title_button_return': 'Вернуть',
            'voprc_title_button_head': 'Голова',
            'voprc_title_button_tail': 'Хвост',

            //'voprc_title_add_ok': 'ВЫПОЛНИТЬ',

            //'voprc_mess_warning_not_num_sostav': 'Нет названия состава!',
            'voprc_mess_warning_wagon_ban_operation': 'Вагон № {0} для операций заблокирован (вагон уже принят на станцию: [{1}])',
            'voprc_mess_warning_wagon_existing_way': 'Вагон № {0} для операций заблокирован (вагон стоит на текущем пути!))',



            //'voprc_mess_error_equal_locomotive': 'Локомотив №1 и №2 равны',
            //'voprc_mess_error_not_locomotive': 'В справочнике ИДС отсутствует локомотив № {0}',
            //'voprc_mess_error_min_time_aplly': 'Дата выполнения операции не может быть меньше текущей даты, мин. отклонение (мин) = {0}',
            //'voprc_mess_error_max_time_aplly': 'Дата выполнения операции не может быть больше текущей даты, мак. отклонение (мин) = {0}',
            //'voprc_mess_error_not_wagons': 'Не выбраны вагоны для приема (в окне «СОСТАВЫ НА ПОДХОДАХ», выберите станцию, прибывающий состав и сформируйте прибытие).',
            //'voprc_mess_error_operation_run': 'При выполнении операции «ПРИНЯТЬ СОСТАВ НА СТАНЦИЮ» произошла ошибка, код ошибки: {0}',
            //'voprc_mess_error_operation_wagons_run': 'Вагон № {0}, код ошибки: {1}',


            //'voprc_mess_cancel_operation': 'Операция "ПРИНЯТЬ НА СТАНЦИЮ АМКР" – отменена',
            //'voprc_mess_run_operation_arrival': 'Выполняю операцию приема вагонов прибывающего состава на станцию АМКР',
            'voprc_mess_not_select_way_on': 'Выберите путь для возврата вагонов!',
            //'voprc_mess_ok_operation' : 'Состав принят, в количестве {0} (ваг.)',

            'voprc_mess_load_operation': 'Загружаю операции...',
            'voprc_mess_load_wagons': 'Загружаю вагоны на пути...',
            'voprc_mess_load_sostav_outer_ways': 'Загружаю отправленные составы...',
            //'voprc_mess_update_operation': 'Обновляю операции...',
            'voprc_mess_init_panel': 'Выполняю инициализацию модуля ...',
            //'voprc_mess_destroy_operation': 'Закрываю форму...',
            'voprc_mess_create_sostav': 'Формирую возврат, переношу вагоны...',
            'voprc_mess_clear_sostav': 'Формирую возврат, убираю выбранные вагоны...',
            'voprc_mess_reverse_head_sostav': 'Формирую возврат, реверс голова-хвост',
            'voprc_mess_reverse_sostav': 'Формирую возврат, реверс вагонов...',

            'voprc_confirm_title': 'Внимание!',
            'voprc_confirm_mess_change_station': 'Вы уверены что хотите выбрать новую станцию отправления {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'voprc_confirm_mess_change_way': 'Вы уверены что хотите выбрать новый путь приема {0}? Все выбранные вагоны в количестве {1} будут сброшены! ',
            'voprc_confirm_mess_new_sostav': 'Вы уверены что хотите выбрать новый состав {0} для возврата? Все выбранные вагоны в количестве {1} будут сброшены! ',
            //'voprc_confirm_mess_apply_arrival_wagons': 'Выполнить операцию "ПРИНЯТЬ СОСТАВОВ НА СТАНЦИЮ АМКР" в количестве: {0} (ваг.), станция отправки: {1}?',

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


    // ассинхроная функция (нумерации вагонов)
    var wagons_enumerate_async = function (row, field, position, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback(position);
            }
            return 0;
        }
        function EnumerateWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i][field] = position;
                    position++;
                    EnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback(position);
                } else return 0;
            }
        }
        EnumerateWagonsAsync.call(this, 0);
    }.bind(this);
    // ассинхроная функция (Реверса нумерации вагонов)
    var wagons_reverse_enumerate_async = function (callback) {
        var row = this.wagons.filter(function (i) {
            return i.id_wim_arrival !== null;
        })
        if (row && row.length > 0) {
            row = row.sort(function (a, b) {
                return a.position_new - b.position_new;
            });
        };
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            } else return 0;
        } else {
            var position = row[row.length - 1].position_new;
        };
        //row = row.sort(function (a, b) { return a[field] - b[field]; });
        function ReverseEnumerateWagonsAsync(i) {
            if (len > 0) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    row[i].position_new = position;
                    position--;
                    len--;
                    ReverseEnumerateWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        ReverseEnumerateWagonsAsync.call(this, 0);
    };
    // ассинхроная функция (Убрать вагоны)
    var wagons_del_async = function (row, callback) {
        var len = row.length;
        if (len === 0) {
            if (typeof callback === 'function') {
                callback();
            };
            return 0;
        }
        function DelWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    // Найти и удалить с пути приема
                    var wagon = this.wagons.find(
                        function (o) { return o.wimId === row[i].wimId });
                    if (wagon !== null) {
                        // Удалить
                        var index = this.wagons.indexOf(wagon);
                        this.wagons.splice(index, 1);
                    };
                    // Пометим вагон в составе перегона
                    var wagon_sostav = this.wagons_sostav.find(
                        function (o) { return o.fromIdWim === row[i].wimId });
                    if (wagon_sostav !== null) {
                        wagon_sostav.id_way_arrival = null;
                    }
                    DelWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback();
                } else return 0;
            }
        }
        DelWagonsAsync.call(this, 0);
    };
    // ассинхроная функция (Добавить вагоны на путь прибытия)
    var wagons_add_async = function (row, position, callback) {
        var len = row.length;
        this.position = position;

        function AddWagonsAsync(i) {
            if (i < len) {
                // Поместим следующий вызов функции в цикл событий.
                setTimeout(function () {
                    // Создадим строку вагон на пути
                    var new_car_way = {
                        position_new: this.position,
                        id_wim_arrival: row[i].fromIdWim,
                        arrivalCargoGroupNameEn: row[i].arrivalCargoGroupNameEn,
                        arrivalCargoGroupNameRu: row[i].arrivalCargoGroupNameRu,
                        arrivalCargoNameEn: row[i].arrivalCargoNameEn,
                        arrivalCargoNameRu: row[i].arrivalCargoNameRu,
                        arrivalCommercialConditionEn: null,
                        arrivalCommercialConditionRu: null,
                        arrivalCompositionIndex: null,
                        arrivalConditionAbbrEn: row[i].arrivalConditionAbbrEn,
                        arrivalConditionAbbrRu: row[i].arrivalConditionAbbrRu,
                        arrivalConditionNameEn: row[i].arrivalConditionNameEn,
                        arrivalConditionNameRu: row[i].arrivalConditionNameRu,
                        arrivalConditionRed: row[i].arrivalCompositionRed,
                        arrivalDateAdoption: null,
                        arrivalDivisionAmkrAbbrEn: row[i].arrivalDivisionAmkrAbbrEn,
                        arrivalDivisionAmkrAbbrRu: row[i].arrivalDivisionAmkrAbbrRu,
                        arrivalDivisionAmkrCode: row[i].arrivalDivisionAmkrCode,
                        arrivalDivisionAmkrNameEn: row[i].arrivalDivisionAmkrNameEn,
                        arrivalDivisionAmkrNameRu: row[i].arrivalDivisionAmkrNameRu,
                        arrivalDuration: null,
                        arrivalIdCommercialCondition: null,
                        arrivalIdSertificationData: row[i].arrivalIdSertificationData,
                        arrivalIdleTime: null,
                        arrivalNomDoc: row[i].arrivalNomDoc,
                        arrivalNomMainDoc: row[i].arrivalNomMainDoc,
                        arrivalSertificationDataEn: row[i].arrivalSertificationDataEn,
                        arrivalSertificationDataRu: row[i].arrivalSertificationDataRu,
                        arrivalShipperCode: null,
                        arrivalShipperNameEn: null,
                        arrivalShipperNameRu: null,
                        arrivalStationAmkrAbbrEn: null,
                        arrivalStationAmkrAbbrRu: null,
                        arrivalStationAmkrNameEn: null,
                        arrivalStationAmkrNameRu: null,
                        arrivalStationFromCode: null,
                        arrivalStationFromNameEn: null,
                        arrivalStationFromNameRu: null,
                        arrivalUsageFee: null,
                        currentConditionAbbrEn: row[i].fromOperationConditionAbbrEn,
                        currentConditionAbbrRu: row[i].fromOperationConditionAbbrRu,
                        currentConditionNameEn: row[i].fromOperationConditionNameEn,
                        currentConditionNameRu: row[i].fromOperationConditionNameRu,
                        currentConditionRed: null,
                        currentIdLoadingStatus: row[i].fromOperationIdLoadingStatus,
                        currentIdOperation: row[i].fromIdOperation,
                        currentLoadingStatusEn: row[i].fromOperationLoadingStatusEn,
                        currentLoadingStatusRu: row[i].fromOperationLoadingStatusRu,
                        currentOperationEnd: row[i].fromOperationEnd,
                        currentOperationNameEn: row[i].fromOperationNameEn,
                        currentOperationNameRu: row[i].fromOperationNameRu,
                        currentOperationStart: row[i].fromOperationStart,
                        currentStationDuration: null,
                        currentStationIdleTime: null,
                        currentWagonBusy: row[i].fromBusy,
                        currentWayDuration: null,
                        diffVesg: null,
                        docOutgoingCar: row[i].docOutgoingCar,
                        idLimitingLoading: row[i].idLimitingLoading,
                        idOperator: row[i].idOperator,
                        idOwnerWagon: null,
                        instructionalLettersDatetime: null,
                        instructionalLettersNote: null,
                        instructionalLettersNum: null,
                        instructionalLettersStationCode: null,
                        instructionalLettersStationName: null,
                        limitingAbbrEn: row[i].limitingAbbrEn,
                        limitingAbbrRu: row[i].limitingAbbrRu,
                        limitingNameEn: row[i].limitingNameEn,
                        limitingNameRu: row[i].limitingNameRu,
                        num: row[i].num,
                        operatorAbbrEn: row[i].operatorAbbrEn,
                        operatorAbbrRu: row[i].operatorAbbrRu,
                        operatorColor: null,
                        operatorMonitoringIdleTime: null,
                        operatorPaid: null,
                        operatorRentEnd: null,
                        operatorRentStart: null,
                        operatorsEn: row[i].operatorsEn,
                        operatorsRu: row[i].operatorsRu,
                        outgoingDate: null,
                        outgoingIdReturn: null,
                        outgoingReturnCauseEn: null,
                        outgoingReturnCauseRu: null,
                        outgoingSostavStatus: null,
                        ownerWagonAbbrEn: null,
                        ownerWagonAbbrRu: null,
                        ownerWagonEn: null,
                        ownerWagonRu: null,
                        position: null,
                        sapIncomingSupplyCargoCode: null,
                        sapIncomingSupplyCargoName: null,
                        sapIncomingSupplyDate: null,
                        sapIncomingSupplyNum: null,
                        sapIncomingSupplyPos: null,
                        sapIncomingSupplyTime: null,
                        sapIncomingSupplyWarehouseCode: null,
                        sapIncomingSupplyWarehouseName: null,
                        wagonAdm: row[i].wagonAdm,
                        wagonAdmAbbrEn: row[i].wagonAdmAbbrEn,
                        wagonAdmAbbrRu: row[i].wagonAdmAbbrRu,
                        wagonAdmNameEn: row[i].wagonAdmNameEn,
                        wagonAdmNameRu: row[i].wagonAdmNameRu,
                        wagonBanUz: null,
                        wagonBruttoAmkr: null,
                        wagonBruttoDoc: null,
                        wagonClosedRoute: null,
                        wagonDateRemUz: null,
                        wagonGruzpDoc: null,
                        wagonGruzpUz: null,
                        wagonRod: row[i].wagonRod,
                        wagonRodAbbrEn: row[i].wagonRodAbbrEn,
                        wagonRodAbbrRu: row[i].wagonRodAbbrRu,
                        wagonRodNameEn: row[i].wagonRodNameEn,
                        wagonRodNameRu: row[i].wagonRodNameRu,
                        wagonTaraArcDoc: null,
                        wagonTaraDoc: null,
                        wagonTaraUz: null,
                        wagonTypeEn: null,
                        wagonTypeRu: null,
                        wagonVesgAmkr: null,
                        wagonVesgDoc: null,
                        wimId: row[i].fromIdWim,
                        wioId: 0,
                        wirId: row[i].idWir,
                    };
                    this.wagons.push(new_car_way);
                    this.position++;
                    // Пометим вагон в составе перегона
                    var wagon_sostav = this.wagons_sostav.find(
                        function (o) { return o.fromIdWim === row[i].fromIdWim });
                    if (wagon_sostav !== null) {
                        wagon_sostav.id_way_arrival = this.id_way;
                    }
                    AddWagonsAsync.call(this, i + 1);
                }.bind(this), 0);
            } else {
                // Так как достигнут конец массива, мы вызываем коллбэк
                if (typeof callback === 'function') {
                    callback(this.position);
                } else return 0;
            }
        };
        // получим вагоны на пути существующие
        var row_old = this.wagons.filter(function (i) {
            return i.id_wim_arrival === null;
        }).sort(function (a, b) {
            return a.position_new - b.position_new;
        });
        // получим вагоны на пути ранее добавленные
        var row_new = this.wagons.filter(function (i) {
            return i.id_wim_arrival !== null;
        }).sort(function (a, b) {
            return a.position_new - b.position_new;
        });
        // выполним добавление
        if (!this.head) {
            // добавим в хвост
            wagons_enumerate_async.call(this, row_old, 'position_new', 1, function (position) {
                this.position = position;
                wagons_enumerate_async.call(this, row_new, 'position_new', position, function (position) {
                    // Если указан вагоны для добавления тогда добавить иначе пропустить
                    if (len === 0) {
                        if (typeof callback === 'function') {
                            callback(this.position);
                        };
                        return 0;
                    } else {
                        this.position = position;
                        AddWagonsAsync.call(this, 0);
                    }
                }.bind(this))
            }.bind(this))
        } else {
            // добавим в голову
            wagons_enumerate_async.call(this, row_new, 'position_new', 1, function (position) {
                this.position = position;
                wagons_enumerate_async.call(this, row_old, 'position_new', position + len, function (position) {
                    // Если указан вагоны для добавления тогда добавить иначе пропустить
                    if (len === 0) {
                        if (typeof callback === 'function') {
                            callback(this.position);
                        };
                        return 0;
                    } else {
                        AddWagonsAsync.call(this, 0);
                    }
                }.bind(this));
            }.bind(this));
        }
    };

    function view_op_return_cars(selector) {
        this.view_com = new VIEW_COMMON(selector);
    }
    // инициализация модуля
    view_op_return_cars.prototype.init = function (options) {
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
            fn_init: this.settings.fn_init,
            fn_close: this.settings.fn_close,
        }, function () { }.bind(this));
        this.id_station = -1;       // По умолчанию не выбрана
        this.id_way = -1;           // По умолчанию не выбрана
        this.stations = [];         // Список станций (полный)
        this.list_station = [];     // Список станций (value\text\desabled)
        this.was = [];              // Список путей (полный)
        this.list_way = [];         // Список путей (value\text\desabled)
        this.locomotives = [];      // Список локомотивов (полный)
        this.list_locomotive = [];  // Список локомотивов (value\text\desabled)
        this.outer_ways = [];       // Список внешних путей (полный)
        this.list_outer_ways = [];  // Список внешних путей  (value\text\desabled)

        this.id_outer_way = -1;   // id перегона
        this.station_from = null; // Станция отправления

        this.head = false;          // Признак голова(true)\хвост(false), по умолчанию хвост
        this.reverse = false;
        this.wagons = [];           // Список вагонов на пути приема (рабочий)
        this.wagons_add = [];       // Список вагонов которые нужно перенести на путь (рабочий)
        this.num_sostav = null;     // Номер выбранного состава
        this.wagons_sostav = [];    // Список вагонов выбранного состава нп пути прибытия (рабочий)
        this.wagons_all = [];       // Список всех вагонов всех составов (используем для выборки вагонов по составу)
        this.sostav_all = [];       // Список всех составов (получаем из Списока всех вагонов всех составов this.wagons_all)

        this.view_com.$title.empty();
        this.view_com.$title.append(langView('voprc_card_header_panel', App.Langs));
        this.view_com.$op.empty();
        this.view_com.close();

        // Сообщение
        LockScreen(langView('voprc_mess_init_panel', App.Langs));
        //----------------------------------
        // Alert
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
        // Создать макет панели
        this.card_on = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('voprc_card_header_on', App.Langs),
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
        this.on_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 3,
        }); // Окно настроек
        this.on_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 9,
            class: 'rounded border border-secondary'
        }); // Окно таблицы
        // Alert_from
        this.alert_on = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.on_table.$html.append(this.alert_on.$html);
        this.on_alert = new ALERT(this.alert_on.$html);
        row.$html.append(this.on_setup.$html).append(this.on_table.$html);
        this.card_on.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_on.$html);
        //--
        this.card_from = new this.view_com.fe_ui.bs_card({
            border_color: 'border-primary',
            class: 'text-bg-light',
            header_class: 'fw-bold text-uppercase',
            header_color: null,
            header_bg: null,
            header_text: langView('voprc_card_header_from', App.Langs),
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
        this.from_setup = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 2,
        });
        this.from_table = new this.view_com.fe_ui.bs_col({
            pref: 'xl',
            size: 10,
            class: 'rounded border border-secondary'
        });
        // Alert_from
        this.alert_from = new this.view_com.fe_ui.bs_alert({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        });
        this.from_table.$html.append(this.alert_from.$html);
        this.from_alert = new ALERT(this.alert_from.$html);
        row.$html.append(this.from_setup.$html).append(this.from_table.$html);
        this.card_from.body.$html.append(row.$html);
        this.view_com.$op.append(this.card_from.$html);
        this.view_com.load_db(['station', 'ways', 'outer_ways', 'locomotive'], false, function (result) {
            var process = 5;
            // Выход из инициализации
            var out_init = function (process) {
                if (process === 0) {
                    //----------------------------------
                    if (typeof this.settings.fn_init === 'function') {
                        console.log('Close view_op_return_cars');
                        this.settings.fn_init(this.result_init);
                    }
                    //----------------------------------
                }
            }.bind(this);
            // инициализациия 
            this.stations = this.view_com.api_dir.getAllStation();
            this.list_station = this.view_com.api_dir.getListValueTextStation(function (i) {
                return !i.stationUz && i.stationDelete === null;
            }.bind(this))
            this.ways = this.view_com.api_dir.getAllWays();
            this.locomotives = this.view_com.api_dir.getAllLocomotive();
            this.list_locomotive = this.view_com.api_dir.getListValueTextLocomotiveOfActive();
            this.outer_ways = this.view_com.api_dir.getAllOuterWays();
            //-------------------------------------------------------------------
            // Создадим форму (this.on_setup)
            this.form_on_setup = new FD();
            // Создать макет панели
            var objs_on_setup = [];
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
            var bt_bt_apply = {
                obj: 'bs_button',
                options: {
                    id: null,
                    name: null,
                    class: null,
                    fsize: 'sm',
                    color: 'primary',
                    text: langView('voprc_title_form_apply', App.Langs),
                    title: langView('voprc_title_form_apply_title', App.Langs),
                    icon_fa_left: 'fa-solid fa-train-subway',  //<i class="fa-solid fa-train-subway"></i>
                    icon_fa_right: null,
                    fn_click: function (event) {
                        event.preventDefault();
                        this.form_on_setup.$form.submit();
                    }.bind(this),
                }
            };
            var form_checkbox_type_return = {
                obj: 'bs_form_check',
                options: {
                    validation_group: 'common',
                    id: 'type_return',
                    name: 'type_return',
                    label: langView('voprc_title_label_type_return', App.Langs),
                    element_type: 'checkbox',
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
                            var value = $(e.currentTarget).prop('checked');
                            if (value) {
                                this.form_on_setup.el.datalist_locomotive1.disable();
                                this.form_on_setup.el.datalist_locomotive2.disable();
                                this.form_on_setup.el.input_datetime_time_aplly.disable();
                            } else {
                                this.form_on_setup.el.datalist_locomotive1.enable();
                                this.form_on_setup.el.datalist_locomotive2.enable();
                                this.form_on_setup.el.input_datetime_time_aplly.enable();
                            }
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: null,
                    form_text: langView('voprc_title_text_type_return', App.Langs),
                    form_text_class: null
                },
                childs: []
            };
            var form_select_way_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common',
                    id: 'id_way',
                    name: 'id_way',
                    label: langView('voprc_title_label_way_on', App.Langs),
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_multiple: false,
                    element_title: null,
                    element_required: true,
                    element_readonly: false,
                    element_size: null,
                    element_options: {
                        data: this.view_com.api_dir.getListValueTextWaysOfStation(this.id_station),
                        default: this.id_way,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
                            this.update(this.id_station, id, function () {
                                this.view_wagons();
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
                    form_text: langView('voprc_title_text_way_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            var form_input_datalist_locomotive1 = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common',
                    id: 'locomotive1',
                    name: 'locomotive1',
                    label: langView('voprc_title_label_locomotive1', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voprc_title_placeholder_locomotive', App.Langs),
                    element_required: true,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_locomotive,
                        out_value: false,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            //main_alert.clear_message();
                            //main_alert.out_info_message('element_datalist_change value=: ' + set.value + ' text=' + set.text);
                        }.bind(this),
                        fn_select: function (event, set, options) {
                            /*                        main_alert.out_info_message('element_datalist_select value=' + set.value + ' label=' + set.label);*/
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: null,
                    form_text_class: null
                },
                childs: []
            };
            var form_input_datalist_locomotive2 = {
                obj: 'bs_form_input_datalist',
                options: {
                    validation_group: 'common',
                    id: 'locomotive2',
                    name: 'locomotive2',
                    label: langView('voprc_title_label_locomotive2', App.Langs),
                    element_fsize: 'sm',
                    element_class: 'flexdatalist',
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voprc_title_placeholder_locomotive', App.Langs),
                    element_required: false,
                    element_maxlength: null,
                    element_pattern: null,
                    element_readonly: false,
                    element_options: {
                        data: this.list_locomotive,
                        out_value: false,
                        default: null,
                        minLength: 1,
                        searchContain: true,
                        fn_change: function (event, set, options) {
                            //main_alert.clear_message();
                            //main_alert.out_info_message('element_datalist_change value=: ' + set.value + ' text=' + set.text);
                        }.bind(this),
                        fn_select: function (event, set, options) {
                            /*                        main_alert.out_info_message('element_datalist_select value=' + set.value + ' label=' + set.label);*/
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 6,
                    col_class: 'mt-0',
                    form_text: null,
                    form_text_class: null
                },
                childs: []
            };
            var form_input_datetime_time_aplly = {
                obj: 'bs_form_input_datetime',
                options: {
                    validation_group: 'common',
                    id: 'time_aplly',
                    name: 'time_aplly',
                    label: langView('voprc_title_time_aplly', App.Langs),
                    element_type: 'datetime-local',
                    element_fsize: 'sm',
                    element_class: null,
                    element_value: null,
                    element_title: null,
                    element_placeholder: langView('voprc_title_placeholder_time_aplly', App.Langs),
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
                            //var text = $(e.currentTarget).val();
                            //main_alert.clear_message();
                            //main_alert.out_info_message('validationDatetime text=: ' + text + ' dt=' + dt);
                        }.bind(this),
                    },
                    validation: true,
                    feedback_invalid: null,
                    feedback_valid: null,
                    feedback_class: null,
                    col_prefix: 'md',
                    col_size: 12,
                    col_class: 'mt-0',
                    form_text: langView('voprc_text_time_aplly', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };

            col_bt_apply.childs.push(bt_bt_apply);
            objs_on_setup.push(col_bt_apply);
            objs_on_setup.push(form_checkbox_type_return);
            objs_on_setup.push(form_select_way_on);
            objs_on_setup.push(form_input_datalist_locomotive1);
            objs_on_setup.push(form_input_datalist_locomotive2);
            objs_on_setup.push(form_input_datetime_time_aplly);
            this.form_on_setup.init({
                alert: this.main_alert,
                objs: objs_on_setup,
                id: null,
                form_class: 'row g-3',
                validation: true,
                fn_validation: function (result) {
                    // Валидация успешна
                    if (result && result.valid) {
                        // Дополнительная проверка
                        var valid = this.validation(result);
                        if (valid) {
                            var wagons = this.wagons.filter(function (i) { return i.position_new !== null && i.id_wim_arrival !== null; });// получить вагоны
                            this.view_com.mcf.open(
                                langView('voprc_title_form_apply', App.Langs),
                                langView('voprc_confirm_mess_apply_arrival_wagons', App.Langs).format((wagons ? wagons.length : 0), this.station_from),
                                function () {
                                    // Принять
                                    // Проверим наличие вагонов 
                                    var list_wagons = [];
                                    if (wagons && wagons.length > 0) {
                                        // Получим перечень вагонов и новую позицию
                                        $.each(wagons.sort(function (a, b) { return a.position_new - b.position_new; }), function (i, el) {
                                            list_wagons.push({ wir_id: el.wirId, position: el.position_new })
                                        }.bind(this));
                                        // Сформируем операцию
                                        var operation = {
                                            id_outer_way: this.id_outer_way,
                                            wagons: list_wagons,
                                            id_way_on: Number(result.new.select_id_way_on),
                                            head: this.head,
                                            lead_time: result.new.input_datetime_time_aplly._i,
                                            //lead_time: moment.utc(result.new.input_datetime_time_aplly).toISOString(),
                                            locomotive1: result.new.datalist_locomotive1,
                                            locomotive2: result.new.datalist_locomotive2,
                                            /*                                            user: App.User_Name*/
                                        };
                                        this.apply(operation);
                                    }
                                }.bind(this),
                                function () {
                                    this.form_on_setup.validation_common.out_warning_message(langView('voprc_mess_cancel_operation', App.Langs));
                                }.bind(this));
                        }
                    }
                }.bind(this),
                fn_html_init: function (res) { }.bind(this),
                fn_element_init: null,
                fn_init: function (init) {
                    this.on_setup.$html.append(this.form_on_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [form_on_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_arr_cars_way = new this.view_com.fe_ui.bs_row({ id: 'arrival-cars-way', class: 'pt-2' });
            this.on_table.$html.append(row_arr_cars_way.$html);
            this.tacw_opr = new TWS('div#arrival-cars-way');
            this.tacw_opr.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-wagons-outer-way table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'arrival_cars_way',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [tacw_opr] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.on_alert.clear_message();
                    if (rowData && rowData.length > 0 && rowData[0].id_wim_arrival === null) {
                        e.preventDefault();
                        this.on_alert.out_warning_message(langView('voprc_mess_warning_wagon_existing_way', App.Langs).format(rowData[0].num));
                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'eye') {
                        this.view_wagons_arrival();
                        LockScreenOff();
                    }
                    if (name === 'del_wagons_sostav') {
                        LockScreen(langView('voprc_mess_clear_sostav', App.Langs));
                        var base = this;
                        var rows = this.tacw_opr.tab_com.get_select_row();
                        if (rows && rows.length > 0) {
                            var new_wagons_add = [];
                            $.each(this.wagons_add, function (i, el) {
                                var element = rows.find(function (o) {
                                    return o.num === el.num;
                                }.bind(this));
                                if (!element) {
                                    new_wagons_add.push(el);
                                }
                            }.bind(this));
                            this.wagons_add = new_wagons_add;
                        };
                        // Убрать вагоны
                        wagons_del_async.call(this, rows, function () {
                            // Авто нумерация
                            // Выполнить операцию перенумеровать (добавить 0 - вагонов)
                            wagons_add_async.call(base, [], 1, function (position) {
                                this.view_wagons(); // Обновить вагоны на пути приема
                                LockScreenOff();
                            }.bind(base));
                        });
                    }
                    if (name === 'head_tail') {
                        LockScreen(langView('voprc_mess_reverse_head_sostav', App.Langs));
                        this.head = !this.head;
                        // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
                        wagons_add_async.call(this, [], 1, function (position) {
                            this.view_wagons(); // Обновить вагоны на пути приема
                            LockScreenOff();
                        }.bind(this));
                    }
                    if (name === 'reverse') {
                        LockScreen(langView('voprc_mess_reverse_sostav', App.Langs));
                        this.reverse = !this.reverse;
                        wagons_reverse_enumerate_async.call(this, function () {
                            // Выполнить операцию перенумеровать с учетом голова хвост (добавить 0 - вагонов)
                            wagons_add_async.call(this, [], 1, function (position) {
                                this.view_wagons(); // Обновить вагоны на пути приема
                                LockScreenOff();
                            }.bind(this));
                        }.bind(this));
                    }
                }.bind(this),
                fn_enable_button: function (tb) {
                    var bts = tb.obj_t_report.buttons([8]);
                    if (this.head) {
                        bts.text(langView('voprc_title_button_head', App.Langs));
                    } else {
                        bts.text(langView('voprc_title_button_tail', App.Langs));
                    }
                }.bind(this),
            });
            //-------------------------------------------------------------------
            // Создадим форму (this.from_setup)
            this.form_from_setup = new FD();
            // Создать макет панели
            var objs_from_setup = [];
            var form_select_station_on = {
                obj: 'bs_form_select',
                options: {
                    validation_group: 'common_from',
                    id: 'id_station',
                    name: 'id_station',
                    label: langView('voprc_title_label_station_on', App.Langs),
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
                        default: this.id_station,
                        fn_change: function (e) {
                            e.preventDefault();
                            // Обработать выбор
                            var id = Number($(e.currentTarget).val());
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
                    form_text: langView('voprc_text_label_station_on', App.Langs),
                    form_text_class: null,
                },
                childs: []
            };
            objs_from_setup.push(form_select_station_on);
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
                    this.from_setup.$html.append(this.form_from_setup.$form);
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [form_from_setup] process ' + process);
                    out_init(process);
                }.bind(this),
            });

            var row_sostav_from = new this.view_com.fe_ui.bs_row({ id: 'sostav-outer-ways', class: 'pt-2' });
            var row_wagons_from = new this.view_com.fe_ui.bs_row({ id: 'wagons-outer-way', class: 'pt-2' });
            this.from_table.$html.append(row_sostav_from.$html).append(row_wagons_from.$html);
            this.tsf_opr = new TWS('div#sostav-outer-ways');
            this.tsf_opr.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-striped table-sostav-outer-ways table-bordered border-secondary',
                detali_table: false,
                type_report: 'sostav_outer_ways',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [tsf_opr] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    if (this.wagons_add !== null && this.wagons_add.length > 0 && rowData !== null && rowData.length > 0) {
                        var new_sostav = rowData[0].outerWayNumSostav;
                        e.preventDefault();
                        this.view_com.mcf.open(
                            langView('voprc_confirm_title', App.Langs),
                            langView('voprc_confirm_mess_new_sostav', App.Langs).format(new_sostav, this.wagons_add.length),
                            function () {
                                // новый сотав
                                this.tsf_opr.tab_com.select_row(new_sostav);
                            }.bind(this),
                            function () {

                            }.bind(this)
                        );
                    }
                }.bind(this),
                fn_select_rows: function (rows, type) {
                    if (type === "select") {
                        var num_sostav = null;
                        //this.station_from = null;
                        this.id_outer_way = null;   // id перегона
                        if (rows != null && rows.length > 0) {
                            num_sostav = rows[0].outerWayNumSostav;
                            //this.station_from = rows[0]['fromStationAbbr' + ucFirst(App.Lang)]; // Станция отправления
                            this.id_outer_way = rows[0].idOuterWay;   // id перегона
                            var id_way = rows[0].fromIdWay;
                            // Запустим паралельно
                            var pr_ss = 2;
                            var out_prss = function (pr_ss) {
                                if (pr_ss === 0) {
                                    LockScreenOff();
                                }
                            }.bind(this);
                            // Покажем вагоны состава (первый поток)
                            this.view_wagons_of_sostav_outer_ways(num_sostav, function () {
                                // Показать вагоны состава прибытия
                                this.view_wagons_of_sostav();
                                pr_ss--;
                                out_prss(pr_ss);

                            }.bind(this));
                            // Обновим данные на пути (второй поток)
                            this.update_on_way(id_way,
                                function () {
                                    // Показать вагоны на пути приема
                                    this.view_wagons_arrival();
                                    pr_ss--;
                                    out_prss(pr_ss);
                                }.bind(this)
                            );

                        }
                    }
                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
            });

            this.twf_opr = new TWS('div#wagons-outer-way');
            this.twf_opr.init({
                alert: this.from_alert,
                class_table: 'table table-sm table-success table-wagons-outer-way table-striped table-bordered border-secondary',
                detali_table: false,
                type_report: 'wagons_outer_way',     //
                link_num: false,
                ids_wsd: null,
                fn_init: function () {
                    // На проверку окончания инициализации
                    process--;
                    //console.log('[view_op_return_cars] [twf_opr] process ' + process);
                    out_init(process);
                },
                fn_action_view_detali: function (rows) {

                },
                fn_user_select_rows: function (e, dt, type, cell, originalEvent, rowData) {
                    this.from_alert.clear_message();
                    if (rowData && rowData.length > 0 && rowData[0].outerWayEnd !== null) {
                        e.preventDefault();
                        this.from_alert.out_warning_message(langView('voprc_mess_warning_wagon_ban_operation', App.Langs).format(rowData[0].num, rowData[0]['arrivalStationName' + ucFirst(App.Lang)]));
                    }
                }.bind(this),
                fn_select_rows: function (rows) {

                }.bind(this),
                fn_select_link: function (link) {

                }.bind(this),
                fn_button_action: function (name, e, dt, node, config) {
                    if (name === 'add_sostav') {
                        if (this.id_way >= 0) {
                            LockScreen(langView('voprc_mess_create_sostav', App.Langs));
                            // Выполнить операцию добавить вагоны
                            var rows = this.twf_opr.tab_com.get_select_row();
                            if (rows && rows.length > 0) {
                                this.wagons_add = this.wagons_add.concat(rows);
                            };
                            wagons_add_async.call(this, rows, 1, function (position) {
                                this.view_wagons(); // Обновить вагоны на пути приема
                                LockScreenOff();
                            }.bind(this));
                        } else {
                            this.from_alert.out_warning_message(langView('voprc_mess_not_select_way_on', App.Langs));
                        }
                    }
                    if (name === 'eye') {
                        this.view_wagons_of_sostav();
                        LockScreenOff();
                    }
                }.bind(this),
                fn_enable_button: function (tb) {
                    var index = tb.obj_t_report.rows({ selected: true });
                    var bts = tb.obj_t_report.buttons([6]);
                    bts.enable(index && index.length > 0 && index[0].length > 0); // отображение кнопки добавить
                }.bind(this),
            });

        }.bind(this)); //------- {end this.view_com.load_db}
    };
    // Показать данные 
    view_op_return_cars.prototype.view = function (id_way) {
        // Если указана станция выполним коррекцию по станции
        this.view_com.open();
        LockScreen(langView('voprc_mess_load_operation', App.Langs));
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Сбросим установки (время и локомотивы)
        this.form_on_setup.el.datalist_locomotive1.val('');
        this.form_on_setup.el.datalist_locomotive2.val('');
        this.form_on_setup.el.input_datetime_time_aplly.val(moment());
        this.wagons_add = [];
        this.form_from_setup.clear_all();
        // Сбросим вагоны переноса
        var id_station = -1;
        this.id_station = -1;
        this.id_outer_way = -1;
        this.num_sostav = null;     // Номер выбранного состава
        this.id_way = -1;
        if (id_way > 0) {
            var way = this.view_com.api_dir.getWays_Of_Id(id_way);
            if (way) {
                id_station = way.idStation;
                // Отобразим выбор на панеле
                this.form_from_setup.el.select_id_station.val(id_station);
                //this.id_way = id_way;
            }
        };
        this.update(id_station, id_way, function () {
            LockScreenOff();
        }.bind(this));
    };
    //// Обновить информацию
    //view_op_return_cars.prototype.update = function (id_station, id_way, callback) {
    //    this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
    //    this.reverse = false;
    //    var pr_1 = 1;
    //    var out_pr1 = function (pr_1) {
    //        if (pr_1 === 0) {
    //            this.view_wagons();
    //            if (typeof callback === 'function') {
    //                callback();
    //            }
    //        }
    //    }.bind(this);
    //    // Обновим пути по станции
    //    this.update_outgoing_sostav(id_station, id_way, function () {
    //        pr_1--;
    //        out_pr1(pr_1);
    //    }.bind(this));
    //    // Обновим составы на пути перегона
    //    //this.update_sostavs_of_outer_ways(id_station, num_sostav, function () {
    //    //    pr_1--;
    //    //    out_pr1(pr_1);
    //    //}.bind(this));
    //};
    // Обновить информацию
    view_op_return_cars.prototype.update = function (id_station, id_way, callback) {
        this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
        this.reverse = false;
        // Обновим пути по станции
        this.update_outgoing_sostav(id_station, id_way, function () {
            this.view_wagons();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновим составы отправленные со станции
    view_op_return_cars.prototype.update_outgoing_sostav = function (id_station, id_way, callback) {
        this.confirm_update_station_on(id_station,
            function () { // Ok
                // обновим компонент пути отправки
                this.form_on_setup.el.select_id_way.update(this.view_com.api_dir.getListValueTextWaysOfStation(id_station), id_way);
                // Обновим станцию
                this.id_station = id_station;
                this.num_sostav = null;
                this.wagons_sostav = [];
                this.wagons_add = [];
                // Запустим паралельно
                var pr_us = 2;
                var out_prus = function (pr_us) {
                    if (pr_us === 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }.bind(this);

                // загрузим составы отправленные состанции (первый поток)
                this.load_of_outer_ways(id_station,
                    function () {
                        pr_us--;
                        out_prus(pr_us);
                    }.bind(this)
                );
                // Обновим данные на пути (второй поток)
                this.update_on_way(id_way,
                    function () {
                        pr_us--;
                        out_prus(pr_us);
                    }.bind(this)
                );
            }.bind(this),
            function () { // Cancel
                // Обновим данные на пути
                this.update_on_way(id_way,
                    function () {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }.bind(this)
                );
            }.bind(this));
    }
    // Проверка и подтверждение изменений по станции отправки
    view_op_return_cars.prototype.confirm_update_station_on = function (id_station, callback_ok, callback_cancel) {
        if (this.id_station !== id_station) {
            if (this.wagons_add && this.wagons_add.length > 0) {
                this.view_com.mcf.open(
                    langView('voprc_confirm_title', App.Langs),
                    langView('voprc_confirm_mess_change_station', App.Langs).format(this.form_from_setup.el.select_id_station.text(), this.wagons_add.length),
                    function () {
                        if (typeof callback_ok === 'function') {
                            callback_ok();
                        }
                    }.bind(this),
                    function () {
                        this.form_from_setup.el.select_id_station.val(this.id_station);
                        if (typeof callback_cancel === 'function') {
                            callback_cancel();
                        }
                    }.bind(this)
                );
            } else {
                if (typeof callback_ok === 'function') {
                    callback_ok();
                }
            }
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Обновим вагоны на пути возврата
    view_op_return_cars.prototype.update_on_way = function (id_way, callback) {
        this.confirm_update_way_on(id_way,
            function () { // Ok
                // выберим путь на компоненте пути возврата
                this.form_on_setup.el.select_id_way.val(id_way);
                // загрузим вагоны на пути
                this.load_of_way(id_way, function () {
                    //this.id_way = id_way;
                    // Событие обновили данные
                    if (typeof callback === 'function') {
                        callback();
                    }
                }.bind(this));
            }.bind(this),
            function () { // Cancel
                if (typeof callback === 'function') {
                    callback();
                }
            }.bind(this));
    }
    // Проверка и подтверждение изменений по пути возврата вагонов
    view_op_return_cars.prototype.confirm_update_way_on = function (id_way, callback_ok, callback_cancel) {
        if (this.id_way !== id_way) {
            if (this.wagons_add && this.wagons_add.length > 0) {
                this.view_com.mcf.open(
                    langView('voprc_confirm_title', App.Langs),
                    langView('voprc_confirm_mess_change_way', App.Langs).format(this.form_on_setup.el.select_id_way.text(), this.wagons_add.length),
                    function () {
                        if (typeof callback_ok === 'function') {
                            callback_ok();
                        }
                    }.bind(this),
                    function () {
                        this.form_on_setup.el.select_id_way.val(this.id_way);
                        if (typeof callback_cancel === 'function') {
                            callback_cancel();
                        }
                    }.bind(this)
                );
            } else {
                if (typeof callback_ok === 'function') {
                    callback_ok();
                }
            }
        } else {
            if (typeof callback_cancel === 'function') {
                callback_cancel();
            }
        }
    };
    // Загрузить вагоны на выбраном пути прибытия в масив this.wagons (подготовить поля для вагонов приема)
    view_op_return_cars.prototype.load_of_way = function (id_way, callback) {
        if (id_way !== null && id_way >= 0) {
            this.id_way = id_way;
            LockScreen(langView('voprc_mess_load_wagons', App.Langs));
            this.view_com.api_wsd.getViewWagonsOfIdWay(id_way, function (wagons) {
                // модифицировать данные взависимости от отчета
                if (wagons) {
                    $.each(wagons, function (i, el) {
                        el['position_new'] = el.position;
                        el['id_wim_arrival'] = null;
                    });
                }
                this.wagons = wagons;
                // Событие обновили данные
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.id_way = -1;
            this.wagons = [];
            // Событие обновили данные
            if (typeof callback === 'function') {
                callback(this.wagons);
            }
        }
    };
    // Загрузим все вагоны (this.wagons_all) на перегоне по указанной станции, сформирум составы (this.sostav_all)
    view_op_return_cars.prototype.load_of_outer_ways = function (id_station, callback) {
        this.sostav_all = [];
        this.wagons_all = [];
        if (id_station !== null && id_station >= 0) {
            LockScreen(langView('voprc_mess_load_sostav_outer_ways', App.Langs));
            this.view_com.api_wsd.getViewOpenWagonsOfOuterWaysStationFrom(id_station, function (wagons) {
                this.wagons_all = wagons;
                $.each(wagons, function (key, el) {
                    var st = this.sostav_all.find(function (o) {
                        return $.trim(o.outerWayNumSostav) === $.trim(el.outerWayNumSostav);
                    }.bind(this));
                    if (!st) {
                        this.sostav_all.push({
                            outerWayNumSostav: $.trim(el.outerWayNumSostav),
                            idOuterWay: el.idOuterWay,
                            nameOuterWayRu: el.nameOuterWayRu,
                            nameOuterWayEn: el.nameOuterWayEn,
                            fromStationNameRu: el.fromStationNameRu,
                            fromStationNameEn: el.fromStationNameEn,
                            fromStationAbbrRu: el.fromStationAbbrRu,
                            fromStationAbbrEn: el.fromStationAbbrEn,
                            fromIdWay: el.fromIdWay,
                            fromIdPark: el.fromIdPark,
                            fromWayNumRu: el.fromWayNumRu,
                            fromWayNumEn: el.fromWayNumEn,
                            fromWayNameRu: el.fromWayNameRu,
                            fromWayNameEn: el.fromWayNameEn,
                            fromWayAbbrRu: el.fromWayAbbrRu,
                            fromWayAbbrEn: el.fromWayAbbrEn,
                            fromOperationStart: el.fromOperationStart,
                            fromOperationEnd: el.fromOperationEnd,
                            fromOperationCreateUser: el.fromOperationCreateUser,
                            fromOperationLocomotive1: el.fromOperationLocomotive1,
                            fromOperationLocomotive2: el.fromOperationLocomotive2,
                            countWagonsSend: 1,
                            countWagonsArrival: el.onIdOperation === 6 ? 1 : 0,
                            countWagonsReturn: el.onIdOperation === 11 || el.onIdOperation === 12 ? 1 : 0,
                            countWagonsAccepted: el.outerWayEnd !== null ? 1 : 0,
                        });
                    } else {
                        st.countWagonsSend++;
                        st.countWagonsArrival += (el.onIdOperation === 6 ? 1 : 0);
                        st.countWagonsReturn += (el.onIdOperation === 11 || el.onIdOperation === 12 ? 1 : 0)
                        st.countWagonsAccepted += (el.outerWayEnd !== null ? 1 : 0)
                    }
                }.bind(this));
                if (typeof callback === 'function') {
                    callback(this.sostav_all, this.wagons_all);
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback(this.sostav_all, this.wagons_all);
            }
        }
    };
    // Отобразить вагоны все вагоны на пути приема и прибывающего состава
    view_op_return_cars.prototype.view_wagons = function () {
        // Очистить сообщения и форму
        this.form_on_setup.clear_all();
        this.form_from_setup.clear_all();
        // Показать составы отправленные
        this.view_sostavs_of_outer_ways();
        // Показать вагоны на пути приема
        this.view_wagons_arrival();
        // Показать вагоны состава прибытия
        this.view_wagons_of_sostav();
    };
    // Отобразить вагоны на пути возврата
    view_op_return_cars.prototype.view_wagons_arrival = function () {
        // Показать вагоны на пути приема
        var wagons = this.wagons;
        if (this.tacw_opr.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.id_wim_arrival !== null;
            });
        }
        this.tacw_opr.view(wagons, null);
    };

    // Показать вагоны выбранного состава без учета уже перенесенных в состав
    view_op_return_cars.prototype.view_wagons_of_sostav = function () {
        var wagons = this.wagons_sostav.filter(function (i) {
            return i.id_way_arrival === undefined || i.id_way_arrival === null;
        });
        if (this.twf_opr.tab_com.eye) {
            wagons = wagons.filter(function (i) {
                return i.outerWayEnd === null;
            });
        }
        this.twf_opr.view(wagons, null);
    };

    // Показать составы отправленные со станции
    view_op_return_cars.prototype.view_sostavs_of_outer_ways = function () {
        // Очистить сообщения и форму
        this.form_from_setup.clear_all();
        // Показать составы на перегоне
        this.tsf_opr.view(this.sostav_all, this.num_sostav); // сработает событие выбора и отработает view_wagons_of_sostav_outer_ways
        if (this.num_sostav !== null) {
            this.view_wagons_of_sostav_outer_ways(this.num_sostav, function () { LockScreenOff(); }.bind(this));
        }
    };
    // Показать вагоны состава на перегоне
    view_op_return_cars.prototype.view_wagons_of_sostav_outer_ways = function (num_sostav, callback) {
        // Очистить сообщения и форму
        this.form_from_setup.clear_all();
        if (this.num_sostav !== num_sostav) {
            // Показать вагоны состава на перегоне
            // выполнить сброс 
            this.wagons_sostav = [];
            this.wagons_add = [];
            this.head = false;      // Признак голова(true)\хвост(false), по умолчанию хвост
            this.reverse = false;
            if (num_sostav !== null && this.wagons_all != null && this.wagons_all.length > 0) {
                LockScreen(langView('voprc_mess_load_wagons', App.Langs));
                this.num_sostav = num_sostav;
                this.wagons_sostav = this.wagons_all.filter(function (i) {
                    return $.trim(i.outerWayNumSostav) === $.trim(num_sostav);
                }.bind(this))
            }
        }
        if (typeof callback === 'function') {
            callback();
        }
    };
    //--------------------------------------------------------------------------------
    // Уточняющая валидация данных
    view_op_return_cars.prototype.validation = function (result) {
        var valid = true;
        // Проверим локомотивы
        var loc1 = this.form_on_setup.el.datalist_locomotive1.text();
        var loc2 = this.form_on_setup.el.datalist_locomotive2.text();
        var el_loc1 = this.form_on_setup.el.datalist_locomotive1.$element;
        var el_loc2 = this.form_on_setup.el.datalist_locomotive2.$element;
        var el_dta = this.form_on_setup.el.input_datetime_time_aplly.$element;
        if (loc1 === loc2) {
            this.form_on_setup.validation_common.set_object_error($(el_loc1), langView('voprc_mess_error_equal_locomotive', App.Langs));
            this.form_on_setup.validation_common.set_object_error($(el_loc2), langView('voprc_mess_error_equal_locomotive', App.Langs));
            valid = false;
        } else {
            if (result.new && !result.new.datalist_locomotive1 && (loc1 !== null || loc1 !== '')) {
                this.form_on_setup.validation_common.set_object_error($(el_loc1), langView('voprc_mess_error_not_locomotive', App.Langs).format(loc1));
                valid = false;
            }
            if ((loc2 !== null && loc2 !== '') && result.new && result.new.locomotive2 === null) {
                this.form_on_setup.validation_common.set_object_error($(el_loc2), langView('voprc_mess_error_not_locomotive', App.Langs).format(loc2));
                valid = false;
            }
        }
        // Проверим время
        if (result.new && result.new.input_datetime_time_aplly) {
            var curr = moment();
            var aplly = moment(result.new.input_datetime_time_aplly);
            var minutes = aplly.diff(curr, 'minutes');
            if (minutes < min_dt_apply) {
                this.form_on_setup.validation_common.set_object_error($(el_dta), langView('voprc_mess_error_min_time_aplly', App.Langs).format(min_dt_apply * -1));
                valid = false;
            }
            if (minutes > max_dt_apply) {
                this.form_on_setup.validation_common.set_object_error($(el_dta), langView('voprc_mess_error_max_time_aplly', App.Langs).format(max_dt_apply));
                valid = false;
            }
        }
        // Проверим состав
        var wagons = this.wagons.filter(function (i) { return i.position_new !== null && i.id_wim_arrival !== null; });
        if (wagons === null || wagons.length === 0) {
            this.form_on_setup.validation_common.out_error_message(langView('voprc_mess_error_not_wagons', App.Langs))
            valid = false;
        }
        return valid;
    }
    // выполнить операцию
    view_op_return_cars.prototype.apply = function (data) {
        LockScreen(langView('voprc_mess_run_operation_arrival', App.Langs));
        this.view_com.api_wsd.postArrivalWagonsOfStationAMKR(data, function (result) {
            if (result && result.result > 0) {
                this.form_on_setup.validation_common.clear_all();
                // Сбросим установки (время и локомотивы)
                this.form_on_setup.el.datalist_locomotive1.val('');
                this.form_on_setup.el.datalist_locomotive2.val('');
                this.form_on_setup.el.input_datetime_time_aplly.val(moment());
                // Сбросим вагоны переноса
                this.wagons_add = [];
                // обновить таблицы вагоны на пути приема, составы, вагоны выбранного состава
                this.update(this.id_station, this.id_way, this.num_sostav, function () {
                    this.form_on_setup.validation_common.out_info_message(langView('voprc_mess_ok_operation', App.Langs).format(result.moved));
                    if (typeof this.settings.fn_db_update === 'function') {
                        //TODO: можно добавить возвращать перечень для обновления
                        typeof this.settings.fn_db_update();
                    }
                    LockScreenOff();
                }.bind(this));

            } else {
                LockScreenOff();
                this.form_on_setup.validation_common.out_error_message(langView('voprc_mess_error_operation_run', App.Langs).format(result.result));
                // Выведем ошибки по вагонно.
                $.each(result.listResult, function (i, el) {
                    if (el.result <= 0) this.form_on_setup.validation_common.out_error_message(langView('voprc_mess_error_operation_wagons_run', App.Langs).format(el.num, el.result));
                }.bind(this));
            }
        }.bind(this));
    };
    // Очистить сообщения
    view_op_return_cars.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Выбрать все вагоны выбранного состава 
    view_op_return_cars.prototype.destroy = function () {
        // удалим элементы этого модуля, затем view_com
        this.view_com.destroy();
    };

    App.view_op_return_cars = view_op_return_cars;

    window.App = App;

})(window);