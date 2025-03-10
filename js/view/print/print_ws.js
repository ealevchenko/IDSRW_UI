/* ===============================================
-= Модуль формирования документов для печати =-
  + js/view/shared/common.js
  + js/api/shared.js
  + js/api/ids_wsd.js
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
            'prn_ws_mess_init_module': 'Инициализация модуля(print_ws)...',
            'prn_ws_mess_load_info': 'Загружаю информацию...',
            'prn_ws_mess_load_print': 'Формирую документ для печати...',
            'prn_ws_title_view_ws_statement': 'Натурная ведомость',
            'prn_ws_title_view_ws_statement_title1': 'По станции {0} на {1}',
            'prn_ws_title_view_ws_statement_title2': 'Путь {0}',


            'prn_ws_table_title_num_wagon': '№ вагона',
            'prn_ws_table_title_rod': 'Род',
            'prn_ws_table_title_adm': 'Адм.',
            'prn_ws_table_title_operator': 'Оператор',
            'prn_ws_table_title_adoption_date': 'Дата приема на АМКР',
            'prn_ws_table_title_status': 'Статус',
            'prn_ws_table_title_arr_condition': 'Разм.',
            'prn_ws_table_title_curr_condition': 'Разм. тек.',
            'prn_ws_table_title_num_letter': '№ письма',
            'prn_ws_table_title_date_letter': 'Дата письма',
            'prn_ws_table_title_code_station_letter': 'Код ст. наз.',
            'prn_ws_table_title_station_letter': 'Станция назначения',
            'prn_ws_table_title_text_letter': 'Текст',
            'prn_ws_table_title_curr_cargo': 'Груз ТЕКЩ',
            'prn_ws_table_title_arrival_cargo': 'Груз ПРИБ',
            'prn_ws_table_title_sertification': 'Сертиф. данные',
            'prn_ws_table_title_arr_uz_station': 'Стан. отправ.',
            'prn_ws_table_title_devision_on': 'Цех получ.',
            'prn_ws_table_title_curr_uz_station': 'Станция УЗ ТЕКУЩ',
            'prn_ws_table_title_availability_doc': 'Док на УЗ',
            'prn_ws_table_title_id_filing': 'Id подачи',
            'prn_ws_table_title_note2': 'Примечание 2',

            'prn_ws_title_yes': 'Да',


            //'prn_ws_title_report_nvt': 'Натурная ведомость поезда № {0}',
            //'prn_ws_title_report_podp_priem': 'Подпись приемосдатчика ______________________',
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

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;

    //var ALERT = App.alert_form;
    //var FD = App.form_dialog;
    //// js/module/ws/table_ws.js
    //var TWS = App.table_ws;

    var OutText = function (obj) {
        return obj !== null ? obj : '';
    }

    var OutGroupField = function (i, objs, field) {
        if (field) {
            return (i < objs.length ? objs[i][field] : '')
        } else {
            return (i < objs.length ? '-' : '');
        }
    }
    var OutGroupText = function (i, count, text) {
        if (text) {
            return (i < count ? text : '')
        } else {
            return (i < count ? '-' : '');
        }
    }

    function print_ws() {

    }
    // инициализация модуля
    print_ws.prototype.init = function (options) {
        LockScreen(langView('prn_ws_mess_init_module', App.Langs));
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            api_dir: null,
            api_wsd: null,
            fn_init: null,
        }, options);

        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });

        //this.id_sostav = null;
        //this.wagons = null;
        //this.sostav = {}; // Основная информация по составу

        // Инициализация вначале 
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init.call(this, true);
        }
    };


    // Показать данные 
    //print_ws.prototype.view = function (option) {
    //    //this.statement1(id, false);
    //};
    // Загрузить составы
    //print_ws.prototype.load_sostav = function (id_sostav, callback) {
    //    this.id_sostav = id_sostav;
    //    if (this.id_sostav) {
    //        LockScreen(langView('prn_ws_mess_load_sostav', App.Langs));
    //        this.api_wsd.getViewIncomingCarsOfIdSostav(this.id_sostav, function (wagons) {
    //            this.wagons = wagons;
    //            // Получим информацию по составу
    //            this.get_sostav(wagons);
    //            LockScreenOff();
    //            if (typeof callback === 'function') {
    //                callback(this.wagons);
    //            }
    //        }.bind(this));
    //    } else {
    //        this.wagons = null;
    //        this.sostav = {};
    //        if (typeof callback === 'function') {
    //            callback(null);
    //        }
    //    }
    //}
    //print_ws.prototype.get_sostav = function (wagons) {
    //    if (wagons && wagons.length > 0) {
    //        this.sostav = {};
    //        this.sostav.num_doc = wagons[0].arrivalSostavNumDoc;
    //        this.sostav.station_on = wagons[0]['arrivalSostavStationOnName' + ucFirst(App.Lang)];
    //        this.sostav.way_on_num = wagons[0]['arrivalSostavWayOnNum' + ucFirst(App.Lang)];
    //        this.sostav.way_on_name = wagons[0]['arrivalSostavWayOnName' + ucFirst(App.Lang)];
    //        this.sostav.way_on_abbr = wagons[0]['arrivalSostavWayOnAbbr' + ucFirst(App.Lang)];
    //        this.sostav.composition_index = wagons[0].arrivalSostavCompositionIndex;
    //        this.sostav.date_arrival = wagons[0].arrivalSostavDateArrival ? moment(wagons[0].arrivalSostavDateArrival).format(format_datetime) : '';
    //        this.sostav.date_adoption = wagons[0].arrivalSostavDateAdoption ? moment(wagons[0].arrivalSostavDateAdoption).format(format_datetime) : '';
    //        this.sostav.numeration = wagons[0].arrivalSostavNumeration;
    //    }

    //};
    //// Вывисти заголовок прибытия
    //print_ws.prototype.title_report = function ($body) {
    //    var $table = $('<table class="table-title"></table>');
    //    var $tbody = $('<tbody></tbody>');

    //    //var $tr1 = $('<thead></thead>');

    //    var $tr1 = $('<tr></tr>');
    //    $tr1.append('<th>Индекс поезда</th>');
    //    $tr1.append('<td>' + this.sostav.composition_index + '</td>');
    //    $tr1.append('<th>Прибытие</th>');
    //    $tr1.append('<td>' + this.sostav.date_arrival + '</td>');
    //    $tr1.append('<th>Прием</th>');
    //    $tr1.append('<td>' + this.sostav.date_adoption + '</td>');
    //    var $tr2 = $('<tr></tr>');
    //    $tr2.append('<th>Поезд прибыл на станцию</th>');
    //    $tr2.append('<td>' + this.sostav.station_on + '</td>');
    //    $tr2.append('<th>Путь</th>');
    //    $tr2.append('<td>' + this.sostav.way_on_num + ' - ' + this.sostav.way_on_name + '</td>');
    //    $tr2.append('<th>Нумерация</th>');
    //    $tr2.append('<td>' + (this.sostav.numeration ? 'с хвоста' : this.sostav.numeration === false ? 'с головы' : 'не указана') + '</td>');
    //    $table.append($tbody);
    //    $tbody.append($tr1).append($tr2);
    //    $body.append($table);
    //};
    //print_ws.prototype.view_table_info_car_fst = function ($body, wagons) {
    //    var $table = $('<table class="table-info"></table>');
    //    var $thead = $('<thead></thead>');
    //    var $tr = $('<tr></tr>');
    //    $tr.append('<th scope="col">№</th>');
    //    $tr.append('<th scope="col">Станция отправления</th>');
    //    $tr.append('<th scope="col">Груз</th>');
    //    $tr.append('<th scope="col">Серт. данные</th>');
    //    $tr.append('<th scope="col">Оператор</th>');
    //    $tr.append('<th scope="col">Ограничение</th>');
    //    $tr.append('<th scope="col">Собственник</th>');
    //    $tr.append('<th scope="col">Код</th>');
    //    $tr.append('<th scope="col">№ Вагона</th>');
    //    $tr.append('<th scope="col">№ ж.д. накладной</th>');
    //    $tr.append('<th scope="col">Вес. тн</th>');
    //    $tr.append('<th scope="col">Цех получатель</th>');
    //    $tr.append('<th scope="col">Разметка</th>');
    //    $tr.append('<th scope="col">Примечание</th>');
    //    $table.append($thead.append($tr));
    //    var $tbody = $('<tbody></tbody>');

    //    var list_cars = wagons.filter(function (i) {
    //        return i.arrivalCarPositionArrival
    //    }).sort(function (a, b) {
    //        return Number(a.arrivalCarPositionArrival) - Number(b.arrivalCarPositionArrival)
    //    });
    //    var total_vesg = 0;
    //    var group_operators = [];
    //    // Список вагонов есть
    //    if (list_cars) {
    //        for (var i = 0; i < list_cars.length; i++) {
    //            var certification_data = (list_cars[i].arrivalUzVagonIdCertificationData !== null ? (list_cars[i]['arrivalUzVagonSertificationData' + ucFirst(App.Lang)]) : '');
    //            var id_operator = list_cars[i].arrivalUzVagonArrivalWagonsRentIdOperator ? list_cars[i].arrivalUzVagonArrivalWagonsRentIdOperator : 0;
    //            var operator = list_cars[i]['arrivalUzVagonArrivalWagonsRentOperators' + ucFirst(App.Lang)];
    //            var vesg = list_cars[i].arrivalUzVagonVesg ? Number(Number(list_cars[i].arrivalUzVagonVesg) / 1000) : 0;
    //            var nom_main_doc = list_cars[i].arrivalUzDocumentNomMainDoc !== null && Number(list_cars[i].arrivalUzDocumentNomMainDoc) > 0 ? list_cars[i].arrivalUzDocumentNomMainDoc : '';
    //            var $tr = $('<tr></tr>');
    //            $tr.append('<th>' + list_cars[i].arrivalCarPositionArrival + '</th>');
    //            $tr.append('<td>' + list_cars[i]['arrivalUzDocumentStationFromName' + ucFirst(App.Lang)] + '</td>');
    //            $tr.append('<td>' + list_cars[i]['arrivalUzVagonCargoName' + ucFirst(App.Lang)] + '</td>');
    //            $tr.append('<td>' + certification_data + '</td>');
    //            $tr.append('<td>' + list_cars[i]['arrivalUzVagonArrivalWagonsRentOperatorAbbr' + ucFirst(App.Lang)] + '</td>');
    //            $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonArrivalWagonsRentLimitingAbbr' + ucFirst(App.Lang)]) + '</td>');
    //            $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonOwnerWagon' + ucFirst(App.Lang)]) + '</td>');
    //            $tr.append('<td>' + OutText(list_cars[i].arrivalUzVagonWagonAdm) + '</td>');
    //            $tr.append('<td><b>' + list_cars[i].num + '</b></td>');
    //            $tr.append('<td>' + nom_main_doc + (list_cars[i].arrivalUzDocumentNomDoc ? '(' + list_cars[i].arrivalUzDocumentNomDoc + ')' : '') + '</td>');
    //            $tr.append('<td><b>' + (list_cars[i].arrivalUzVagonVesg ? Number(Number(list_cars[i].arrivalUzVagonVesg) / 1000).toFixed(2) : '0.00') + '</b></td>');
    //            $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonDivisionAbbr' + ucFirst(App.Lang)]) + '</td>');
    //            $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonConditionAbbr' + ucFirst(App.Lang)]) + '</td>');
    //            $tr.append('<td></td>');
    //            $tbody.append($tr);
    //            // Подчет общего веса
    //            total_vesg += vesg;
    //            // Группировка операторов
    //            var opr = group_operators.find(function (i) {
    //                return i.id === id_operator;
    //            }.bind(this));
    //            if (!opr) {
    //                if (operator !== null) {
    //                    group_operators.push({ id: id_operator, operator: operator, count: 1, vesg: vesg });
    //                } else {
    //                    group_operators.push({ id: 0, operator: 'Не определен', count: 1, vesg: vesg });
    //                }
    //            } else {
    //                opr.count += 1;
    //                opr.vesg = Number(opr.vesg) + vesg;
    //            }
    //        }
    //    }
    //    var $tr = $('<tr></tr>');
    //    $tr.append('<th colspan="6" class="total">Всего вагонов</th>');
    //    $tr.append('<td class="total">' + list_cars.length + '</td>');
    //    $tr.append('<th colspan="3" class="total">Общий вес</th>');
    //    $tr.append('<td class="total">' + total_vesg.toFixed(2) + '</td>');
    //    $tr.append('<th colspan="3"></td>');
    //    var $tr1 = $('<tr></tr>');
    //    $tr1.append('<th colspan="14">Информация по операторам</th>');
    //    $tbody.append($tr).append($tr1);
    //    if (group_operators && group_operators.length > 0) {
    //        for (var io = 0; io < group_operators.length; io++) {
    //            var $tr = $('<tr></tr>');
    //            $tr.append('<th colspan="6" class="total">' + group_operators[io].operator + '</th>');
    //            $tr.append('<td class="total">' + group_operators[io].count + '</td>');
    //            $tr.append('<th colspan="3"></th>');
    //            $tr.append('<td class="total">' + group_operators[io].vesg.toFixed(2) + '</td>');
    //            $tr.append('<th colspan="3"></td>');
    //            $tbody.append($tr);
    //        }
    //    }
    //    //$body.append('</table>');
    //    $table.append($tbody);
    //    $body.append($table);
    //};
    // Натурная ведомость
    print_ws.prototype.view_ws_statement = function (type, format, id) {
        LockScreen(langView('prn_ws_mess_load_info', App.Langs));
        var wagons = [];
        var way_name = '';
        var station_name = '';
        var rods = [];
        var cargos = [];
        var operations = [];
        var conditions = [];
        var liters_count = 0;

        var table_statement1 = function ($body, wagons) {
            var $table = $('<table class="table-info"></table>');
            var $thead = $('<thead></thead>');
            var $tr = $('<tr></tr>');
            $tr.append('<th scope="col">№</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_num_wagon', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_rod', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_adm', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_operator', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_status', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_arr_condition', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_curr_condition', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_num_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_date_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_station_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_text_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_curr_cargo', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_curr_uz_station', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_availability_doc', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_id_filing', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_note2', App.Langs) + '</th>');
            $table.append($thead.append($tr));
            var $tbody = $('<tbody></tbody>');
            for (var iw = 0; iw < wagons.length; iw++) {
                var curr_cargo = '';
                var ext_station = '';
                //curr_cargo
                if (wagons[iw].moveCargoCreate !== null && wagons[iw].moveCargoClose === null) {
                    if (wagons[iw].currentCargoIdGroup !== null) {
                        curr_cargo = wagons[iw]['currentCargoName' + ucFirst(App.Lang)];
                    } else {
                        curr_cargo = wagons[iw]['currentInternalCargoName' + ucFirst(App.Lang)];
                    }
                } else {
                    curr_cargo = wagons[iw]['arrivalCargoName' + ucFirst(App.Lang)];;
                }
                //ext_station
                if (wagons[iw].currentIdLoadingStatus !== 0 && wagons[iw].currentIdLoadingStatus !== 3 && wagons[iw].currentIdLoadingStatus !== 8) {
                    if (wagons[iw].moveCargoCreate !== null && wagons[iw].moveCargoClose === null) {
                        ext_station = wagons[iw]['currentExternalStationOnName' + ucFirst(App.Lang)];
                    } else {
                        ext_station = wagons[iw]['arrivalStationFromName' + ucFirst(App.Lang)];;
                    }
                };
                // группировка элементов
                var re = rods.find(function (o) { return o.id == wagons[iw].wagonRod }.bind(this));
                if (!re) { rods.push({ id: wagons[iw].wagonRod, text: wagons[iw]['wagonRodAbbr' + ucFirst(App.Lang)], count: 1 }) } else { re.count += 1; }
                var oe = operations.find(function (o) { return o.id == wagons[iw].currentIdOperation && o.cargo == curr_cargo }.bind(this));
                if (!oe) { operations.push({ id: wagons[iw].currentIdOperation, text: wagons[iw]['operatorAbbr' + ucFirst(App.Lang)], cargo: curr_cargo, count: 1 }) } else { oe.count += 1; }
                var ce = conditions.find(function (o) { return o.text == wagons[iw]['currentConditionAbbr' + ucFirst(App.Lang)] }.bind(this));
                if (!ce) { conditions.push({ text: wagons[iw]['currentConditionAbbr' + ucFirst(App.Lang)], count: 1 }) } else { ce.count += 1; }
                if (wagons[iw].instructionalLettersNum) { liters_count += 1; }
                var $tr = $('<tr></tr>');
                $tr.append('<td>' + wagons[iw].position + '</td>');
                $tr.append('<td>' + wagons[iw].num + '</td>');
                $tr.append('<td>' + wagons[iw]['wagonRodAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw].wagonAdm + '</td>');
                $tr.append('<td>' + wagons[iw]['operatorAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw]['currentLoadingStatus' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw]['arrivalConditionAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw]['currentConditionAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersNum) + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersDatetime) + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersStationName) + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersNote) + '</td>');
                $tr.append('<td>' + curr_cargo + '</td>');
                $tr.append('<td>' + OutText(ext_station) + '</td>');
                $tr.append('<td>' + (wagons[iw].docOutgoingCar ? langView('prn_ws_title_yes', App.Langs) : '') + '</td>');
                $tr.append('<td>' + (wagons[iw].endPreviousFiling===null ? OutText(wagons[iw].idPreviousFiling) : '') + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].wirNote2) + '</td>');
                $tbody.append($tr);
            }
            $table.append($tbody);
            $body.append($table);
            $body.append('<br />');
            var $table_gr = $('<table class=""></table>');
            var $tbody_gr = $('<tbody></tbody>');
            var count = Math.max(rods.length, operations.length, conditions.length, liters_count);
            for (var ig = 0; ig < count; ig++) {
                var $tr_gr = $('<tr></tr>');
                $tr_gr.append('<td>&nbsp;</td>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, rods, 'count') + '</td>');
                $tr_gr.append('<td>' + OutGroupField(ig, rods) + '</td>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, rods, 'text') + '</td>');
                $tr_gr.append('<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, operations, 'text') + '</td>');
                $tr_gr.append('<td>' + OutGroupField(ig, operations) + '</td>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, operations, 'count') + '</td>');
                $tr_gr.append('<td>' + OutGroupField(ig, operations) + '</th>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, operations, 'cargo') + '</td>');
                $tr_gr.append('<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, conditions, 'text') + '</td>');
                $tr_gr.append('<td>' + OutGroupField(ig, conditions) + '</th>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, conditions, 'count') + '</td>');
                $tr_gr.append('<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
                $tr_gr.append('<td class="total">' + OutGroupText(ig, liters_count, 'Писем :') + '</td>');
                $tr_gr.append('<td class="total">' + OutGroupText(ig, liters_count, liters_count) + '</td>');
                $table_gr.append($tbody_gr.append($tr_gr));
            }
            $body.append($table_gr);

        }

        var table_statement2 = function ($body, wagons) {
            var $table = $('<table class="table-info"></table>');
            var $thead = $('<thead></thead>');
            var $tr = $('<tr></tr>');
            $tr.append('<th scope="col">№</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_num_wagon', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_rod', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_adm', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_operator', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_adoption_date', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_status', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_arr_condition', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_curr_condition', App.Langs) + '</th>');

            $tr.append('<th scope="col">' + langView('prn_ws_table_title_num_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_date_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_code_station_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_station_letter', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_text_letter', App.Langs) + '</th>');


            $tr.append('<th scope="col">' + langView('prn_ws_table_title_arrival_cargo', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_sertification', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_arr_uz_station', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_devision_on', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_ws_table_title_note2', App.Langs) + '</th>');
            $table.append($thead.append($tr));
            var $tbody = $('<tbody></tbody>');
            for (var iw = 0; iw < wagons.length; iw++) {
                // группировка элементов
                var re = rods.find(function (o) { return o.id == wagons[iw].wagonRod }.bind(this));
                if (!re) { rods.push({ id: wagons[iw].wagonRod, text: wagons[iw]['wagonRodAbbr' + ucFirst(App.Lang)], count: 1 }) } else { re.count += 1; }
                var cge = cargos.find(function (o) { return o.text == wagons[iw]['arrivalCargoName' + ucFirst(App.Lang)] }.bind(this));
                if (!cge) { cargos.push({ text: wagons[iw]['arrivalCargoName' + ucFirst(App.Lang)], count: 1 }) } else { cge.count += 1; }
                var ce = conditions.find(function (o) { return o.text == wagons[iw]['currentConditionAbbr' + ucFirst(App.Lang)] }.bind(this));
                if (!ce) { conditions.push({ text: wagons[iw]['currentConditionAbbr' + ucFirst(App.Lang)], count: 1 }) } else { ce.count += 1; }
                if (wagons[iw].instructionalLettersNum) { liters_count += 1; }
                var $tr = $('<tr></tr>');
                $tr.append('<td>' + wagons[iw].position + '</td>');
                $tr.append('<td>' + wagons[iw].num + '</td>');
                $tr.append('<td>' + wagons[iw]['wagonRodAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw].wagonAdm + '</td>');
                $tr.append('<td>' + wagons[iw]['operatorAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + (wagons[iw].arrivalDateAdoption ? moment(wagons[iw].arrivalDateAdoption).format(format_datetime_ru) : '') + '</td>');
                $tr.append('<td>' + wagons[iw]['currentLoadingStatus' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw]['arrivalConditionAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw]['currentConditionAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersNum) + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersDatetime) + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersStationCode) + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersStationName) + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].instructionalLettersNote) + '</td>');
                $tr.append('<td>' + wagons[iw]['arrivalCargoName' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + OutText(wagons[iw]['arrivalSertificationData' + ucFirst(App.Lang)]) + '</td>');
                $tr.append('<td>' + wagons[iw]['arrivalStationFromName' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + wagons[iw]['arrivalDivisionAmkrAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + OutText(wagons[iw].wirNote2) + '</td>');
                $tbody.append($tr);
            }
            $table.append($tbody);
            $body.append($table);
            $body.append('<br />');
            var $table_gr = $('<table class=""></table>');
            var $tbody_gr = $('<tbody></tbody>');
            var count = Math.max(rods.length, cargos.length, conditions.length);
            for (var ig = 0; ig < count; ig++) {
                var $tr_gr = $('<tr></tr>');
                $tr_gr.append('<td>&nbsp;</td>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, rods, 'count') + '</td>');
                $tr_gr.append('<td>' + OutGroupField(ig, rods) + '</td>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, rods, 'text') + '</td>');
                $tr_gr.append('<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, conditions, 'text') + '</td>');
                $tr_gr.append('<td>' + OutGroupField(ig, conditions) + '</th>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, conditions, 'count') + '</td>');
                $tr_gr.append('<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, cargos, 'count') + '</td>');
                $tr_gr.append('<td>' + OutGroupField(ig, cargos) + '</th>');
                $tr_gr.append('<td class="total">' + OutGroupField(ig, cargos, 'text') + '</td>');
                $table_gr.append($tbody_gr.append($tr_gr));
            }
            $body.append($table_gr);

        }
        var pr_load = 2;

        var out_load = function (pr_load) {
            if (pr_load === 0) {
                if (wagons && wagons.length > 0) {
                    LockScreen(langView('prn_ws_mess_load_print', App.Langs));
                    $('head').prepend('<title>' + langView('prn_ws_title_view_ws_statement', App.Langs) + '</title>');
/*                    $('head').append('<link rel="stylesheet" type="text/css" href="../../../idsrw_ui/css/module/print/print.css">');*/
                    if (format == 'A4') {
                        $('body').addClass('a4');
                    }
                    if (format == 'A4L') {
                        $('body').addClass('a4-landscape');
                    }
                    $('body').append('<h2 style="text-align:center;">' + langView('prn_ws_title_view_ws_statement', App.Langs) + '</h2>');
                    $('body').append('<p style="text-align:center;">' + langView('prn_ws_title_view_ws_statement_title1', App.Langs).format(station_name, moment().format(format_datetime_ru)) + '</p>');
                    $('body').append('<p style="text-align:center;">' + langView('prn_ws_title_view_ws_statement_title2', App.Langs).format(way_name) + '</p>');
                    $('body').append('<br />');
                    if (type === 1) {
                        table_statement1($('body'), wagons);
                    }
                    if (type === 2) {
                        table_statement2($('body'), wagons);
                    }
                }
                LockScreenOff();
            }
        }.bind(this);
        // Загрузим путь и станцию
        this.api_dir.getWaysOfId(id, function (way) {
            if (way) {
                way_name = way['wayNum' + ucFirst(App.Lang)] + '-' + way['wayAbbr' + ucFirst(App.Lang)];
                this.api_dir.getStationOfId(way.idStation, function (station) {
                    if (station) {
                        station_name = station['stationName' + ucFirst(App.Lang)];
                    }
                    pr_load--;
                    out_load(pr_load);
                }.bind(this));
            }
        }.bind(this))
        // Загрузить вагоны на пути
        this.api_wsd.getViewWagonsOfIdWay(id, function (wgn) {
            wagons = wgn.sort(function (a, b) {
                return Number(a.position) - Number(b.position)
            });
            pr_load--;
            out_load(pr_load);
        }.bind(this));
    }
    // Выбрать все вагоны выбранного состава 
    print_ws.prototype.destroy = function () {

    };

    App.print_ws = print_ws;

    window.App = App;

})(window);