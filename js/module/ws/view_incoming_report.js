/* ===============================================
-= Модуль документы по прибытию =-
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
            'vicr_mess_init_module': 'Инициализация модуля(view_incoming_report)...',
            'vicr_mess_load_sostav': 'Загружаю информацию по составу...',
            'vicr_mess_load_print': 'Формирую документ для печати...',
            'vicr_title_report_nvt': 'Натурная ведомость поезда № {0}',
            'vicr_title_report_podp_priem': 'Подпись приемосдатчика ______________________',
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

    //var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;

    //var ALERT = App.alert_form;
    //var FD = App.form_dialog;
    //// js/module/ws/table_ws.js
    //var TWS = App.table_ws;

    var OutText = function (obj) {
        return obj !== null ? obj : '';
    }

    function view_incoming_report() {

    }
    // инициализация модуля
    view_incoming_report.prototype.init = function (options) {
        LockScreen(langView('vicr_mess_init_module', App.Langs));
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            api_dir: null,
            api_wsd: null,
            fn_init: null,
        }, options);

        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });

        this.id_sostav = null;
        this.wagons = null;
        this.sostav = {}; // Основная информация по составу

        // Инициализация вначале 
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init.call(this, true);
        }
    };
    // Показать данные 
    view_incoming_report.prototype.view = function (id) {
        this.fst(id, false);
    };
    // Загрузить составы
    view_incoming_report.prototype.load_sostav = function (id_sostav, callback) {
        this.id_sostav = id_sostav;
        if (this.id_sostav) {
            LockScreen(langView('vicr_mess_load_sostav', App.Langs));
            this.api_wsd.getViewIncomingCarsOfIdSostav(this.id_sostav, function (wagons) {
                this.wagons = wagons;
                // Получим информацию по составу
                this.get_sostav(wagons);
                LockScreenOff();
                if (typeof callback === 'function') {
                    callback(this.wagons);
                }
            }.bind(this));
        } else {
            this.wagons = null;
            this.sostav = {};
            if (typeof callback === 'function') {
                callback(null);
            }
        }
    }
    view_incoming_report.prototype.get_sostav = function (wagons) {
        if (wagons && wagons.length > 0) {
            this.sostav = {};
            this.sostav.num_doc = wagons[0].arrivalSostavNumDoc;
            this.sostav.station_on = wagons[0]['arrivalSostavStationOnName' + ucFirst(App.Lang)];
            this.sostav.way_on_num = wagons[0]['arrivalSostavWayOnNum' + ucFirst(App.Lang)];
            this.sostav.way_on_name = wagons[0]['arrivalSostavWayOnName' + ucFirst(App.Lang)];
            this.sostav.way_on_abbr = wagons[0]['arrivalSostavWayOnAbbr' + ucFirst(App.Lang)];
            this.sostav.composition_index = wagons[0].arrivalSostavCompositionIndex;
            this.sostav.date_arrival = wagons[0].arrivalSostavDateArrival ? moment(wagons[0].arrivalSostavDateArrival).format(format_datetime) : '';
            this.sostav.date_adoption = wagons[0].arrivalSostavDateAdoption ? moment(wagons[0].arrivalSostavDateAdoption).format(format_datetime) : '';
            this.sostav.numeration = wagons[0].arrivalSostavNumeration;
        }

    };
    // Вывисти заголовок прибытия
    view_incoming_report.prototype.title_report = function ($body) {
        var $table = $('<table class="table-title"></table>');
        var $tbody = $('<tbody></tbody>');

        //var $tr1 = $('<thead></thead>');

        var $tr1 = $('<tr></tr>');
        $tr1.append('<th>Индекс поезда</th>');
        $tr1.append('<td>' + this.sostav.composition_index + '</td>');
        $tr1.append('<th>Прибытие</th>');
        $tr1.append('<td>' + this.sostav.date_arrival + '</td>');
        $tr1.append('<th>Прием</th>');
        $tr1.append('<td>' + this.sostav.date_adoption + '</td>');
        var $tr2 = $('<tr></tr>');
        $tr2.append('<th>Поезд прибыл на станцию</th>');
        $tr2.append('<td>' + this.sostav.station_on + '</td>');
        $tr2.append('<th>Путь</th>');
        $tr2.append('<td>' + this.sostav.way_on_num + ' - ' + this.sostav.way_on_name + '</td>');
        $tr2.append('<th>Нумерация</th>');
        $tr2.append('<td>' + (this.sostav.numeration ? 'с хвоста' : this.sostav.numeration === false ? 'с головы' : 'не указана') + '</td>');
        $table.append($tbody);
        $tbody.append($tr1).append($tr2);
        $body.append($table);
    };
    view_incoming_report.prototype.view_table_info_car_fst = function ($body, wagons) {
        var $table = $('<table class="table-info"></table>');
        var $thead = $('<thead></thead>');
        var $tr = $('<tr></tr>');
        $tr.append('<th scope="col">№</th>');
        $tr.append('<th scope="col">Станция отправления</th>');
        $tr.append('<th scope="col">Груз</th>');
        $tr.append('<th scope="col">Серт. данные</th>');
        $tr.append('<th scope="col">Оператор</th>');
        $tr.append('<th scope="col">Ограничение</th>');
        $tr.append('<th scope="col">Собственник</th>');
        $tr.append('<th scope="col">Код</th>');
        $tr.append('<th scope="col">№ Вагона</th>');
        $tr.append('<th scope="col">№ ж.д. накладной</th>');
        $tr.append('<th scope="col">Вес. тн</th>');
        $tr.append('<th scope="col">Цех получатель</th>');
        $tr.append('<th scope="col">Разметка</th>');
        $tr.append('<th scope="col">Примечание</th>');
        $table.append($thead.append($tr));
        var $tbody = $('<tbody></tbody>');

        var list_cars = wagons.filter(function (i) {
            return i.arrivalCarPositionArrival
        }).sort(function (a, b) {
            return Number(a.arrivalCarPositionArrival) - Number(b.arrivalCarPositionArrival)
        });
        var total_vesg = 0;
        var group_operators = [];
        // Список вагонов есть
        if (list_cars) {
            for (var i = 0; i < list_cars.length; i++) {
                var certification_data = (list_cars[i].arrivalUzVagonIdCertificationData !== null ? (list_cars[i]['arrivalUzVagonSertificationData' + ucFirst(App.Lang)]) : '');
                var id_operator = list_cars[i].arrivalUzVagonArrivalWagonsRentIdOperator ? list_cars[i].arrivalUzVagonArrivalWagonsRentIdOperator : 0;
                var operator = list_cars[i]['arrivalUzVagonArrivalWagonsRentOperators' + ucFirst(App.Lang)];
                var vesg = list_cars[i].arrivalUzVagonVesg ? Number(Number(list_cars[i].arrivalUzVagonVesg) / 1000) : 0;
                var nom_main_doc = list_cars[i].arrivalUzDocumentNomMainDoc !== null && Number(list_cars[i].arrivalUzDocumentNomMainDoc) > 0 ? list_cars[i].arrivalUzDocumentNomMainDoc : '';
                var $tr = $('<tr></tr>');
                $tr.append('<th>' + list_cars[i].arrivalCarPositionArrival + '</th>');
                $tr.append('<td>' + list_cars[i]['arrivalUzDocumentStationFromName' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + list_cars[i]['arrivalUzVagonCargoName' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + certification_data + '</td>');
                $tr.append('<td>' + list_cars[i]['arrivalUzVagonArrivalWagonsRentOperatorAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonArrivalWagonsRentLimitingAbbr' + ucFirst(App.Lang)]) + '</td>');
                $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonOwnerWagon' + ucFirst(App.Lang)]) + '</td>');
                $tr.append('<td>' + OutText(list_cars[i].arrivalUzVagonWagonAdm) + '</td>');
                $tr.append('<td><b>' + list_cars[i].num + '</b></td>');
                $tr.append('<td>' + nom_main_doc + (list_cars[i].arrivalUzDocumentNomDoc ? '(' + list_cars[i].arrivalUzDocumentNomDoc + ')' : '') + '</td>');
                $tr.append('<td><b>' + (list_cars[i].arrivalUzVagonVesg ? Number(Number(list_cars[i].arrivalUzVagonVesg) / 1000).toFixed(2) : '0.00') + '</b></td>');
                $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonDivisionAbbr' + ucFirst(App.Lang)]) + '</td>');
                $tr.append('<td>' + OutText(list_cars[i]['arrivalUzVagonConditionAbbr' + ucFirst(App.Lang)]) + '</td>');
                $tr.append('<td></td>');
                $tbody.append($tr);
                // Подчет общего веса
                total_vesg += vesg;
                // Группировка операторов
                var opr = group_operators.find(function (i) {
                    return i.id === id_operator;
                }.bind(this));
                if (!opr) {
                    if (operator !== null) {
                        group_operators.push({ id: id_operator, operator: operator, count: 1, vesg: vesg });
                    } else {
                        group_operators.push({ id: 0, operator: 'Не определен', count: 1, vesg: vesg });
                    }
                } else {
                    opr.count += 1;
                    opr.vesg = Number(opr.vesg) + vesg;
                }
            }
        }
        var $tr = $('<tr></tr>');
        $tr.append('<th colspan="6" class="total">Всего вагонов</th>');
        $tr.append('<td class="total">' + list_cars.length + '</td>');
        $tr.append('<th colspan="3" class="total">Общий вес</th>');
        $tr.append('<td class="total">' + total_vesg.toFixed(2) + '</td>');
        $tr.append('<th colspan="3"></td>');
        var $tr1 = $('<tr></tr>');
        $tr1.append('<th colspan="14">Информация по операторам</th>');
        $tbody.append($tr).append($tr1);
        if (group_operators && group_operators.length > 0) {
            for (var io = 0; io < group_operators.length; io++) {
                var $tr = $('<tr></tr>');
                $tr.append('<th colspan="6" class="total">' + group_operators[io].operator + '</th>');
                $tr.append('<td class="total">' + group_operators[io].count + '</td>');
                $tr.append('<th colspan="3"></th>');
                $tr.append('<td class="total">' + group_operators[io].vesg.toFixed(2) + '</td>');
                $tr.append('<th colspan="3"></td>');
                $tbody.append($tr);
            }
        }
        //$body.append('</table>');
        $table.append($tbody);
        $body.append($table);
    };
    // Натурная ведомость
    view_incoming_report.prototype.fst = function (id_sostav, landscape) {
        this.type_report = null;
        this.load_sostav(id_sostav, function (wagons) {
            if (wagons && wagons.length > 0) {
                LockScreen(langView('vicr_mess_load_print', App.Langs));
                $('head').prepend('<title>' + langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc) + '</title>');
                $('head').append('<link rel="stylesheet" type="text/css" href="../../../idsrw_ui/css/module/print/print.css">');
                $('body').addClass('a4');
                $('body').append('<h2>' + langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc) + '</h2>');
                this.title_report($('body'));      // Заголовок
                this.view_table_info_car_fst($('body'), wagons);  // Вагоны в составе
                $('body').append('<br />');
                $('body').append('<br />');
                $('body').append('<div>' + langView('vicr_title_report_podp_priem', App.Langs) + '</div>');

                //var mywindow = window.open('', langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc));
                //mywindow.document.write('<html><head><title>' + langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc) + '</title>');
                //mywindow.document.write('<link rel="stylesheet" type="text/css" href="../../Content/view/shared/print.css">');
                //if (landscape) {
                //    mywindow.document.write('</head><body class="a4-landscape">');
                //} else {
                //    mywindow.document.write('</head><body class="a4">');
                //}
                //mywindow.document.write('<h2>' + langView('vicr_title_report_nvt', App.Langs).format(this.sostav.num_doc) + '</h2>');
                //this.title_report(mywindow.document);      // Заголовок
                ////this.view_table_info_car_fst(mywindow.document, wagons);  // Вагоны в составе
                //mywindow.document.write('<br />');
                //mywindow.document.write('<br />');
                //mywindow.document.write('<div>' + langView('vicr_title_report_podp_priem', App.Langs) + '</div>');
                //mywindow.document.write('</body></html>');
                LockScreenOff();
                //mywindow.document.close(); // necessary for IE >= 10
                //mywindow.focus(); // necessary for IE >= 10
            }
        }.bind(this));
    }
    // Выбрать все вагоны выбранного состава 
    view_incoming_report.prototype.destroy = function () {

    };

    App.view_incoming_report = view_incoming_report;

    window.App = App;

})(window);