/* ===============================================
-= Модуль формирования документов для печати документов по прибытию=-
  + js/view/shared/common.js
  + js/api/shared.js
  + js/api/ids_directory.js
  + js/api/ids_wsd.js
  + js/api/ids_arrival.js
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
            'prn_arr_mess_init_module': 'Инициализация модуля(print_arr)...',
            'prn_arr_mess_load_info': 'Загружаю информацию...',
            'prn_arr_mess_load_print': 'Формирую документ для печати...',
            'prn_arr_title_view_ws_statement': 'Натурная ведомость',
            'prn_arr_title_view_ws_statement_draft': 'Черновик натурной ведомости поезда №',

            'prn_arr_table_title_compositionIndex': 'Индекс поезда',
            'prn_arr_table_title_dateArrival': 'Прибытие',
            'prn_arr_table_title_dateAdoption': 'Прием',
            'prn_arr_table_title_stationOnName': 'Прибыл на станцию',
            'prn_arr_table_title_wayOnName': 'Путь',
            'prn_arr_table_title_numeration': 'Нумерация',

            'prn_arr_table_title_stationFromName': 'Станция отправления',
            'prn_arr_table_title_cargoName': 'Груз',
            'prn_arr_table_title_certificationData': 'Сертиф. данные',
            'prn_arr_table_title_operator': 'Оператор',
            'prn_arr_table_title_limitingLoading': 'Огран',
            'prn_arr_table_title_admCode': 'Код',
            'prn_arr_table_title_numWagon': '№ вагона',
            'prn_arr_table_title_numDoc': '№ ж.д. накладной',
            'prn_arr_table_title_vesg': 'Вес. тн',
            'prn_arr_table_title_devisionOn': 'Цех получ.',
            'prn_arr_table_title_arrCondition': 'Разметка',
            'prn_arr_table_title_note': 'Примечание',

            'prn_ws_warning_wagon_is_adoption': 'В сотаве все вагоны уже приняты!',

            //'prn_arr_title_view_ws_statement_title1': 'По станции {0} на {1}',
            //'prn_arr_title_view_ws_statement_title2': 'Путь {0}',

            //'prn_arr_table_title_rod': 'Род',
            //'prn_arr_table_title_adm': 'Адм.',

            //'prn_arr_table_title_adoption_date': 'Дата приема на АМКР',
            //'prn_arr_table_title_status': 'Статус',
            //'prn_arr_table_title_arr_condition': 'Разм.',
            //'prn_arr_table_title_curr_condition': 'Разм. тек.',
            //'prn_arr_table_title_num_letter': '№ письма',
            //'prn_arr_table_title_date_letter': 'Дата письма',
            //'prn_arr_table_title_code_station_letter': 'Код ст. наз.',
            //'prn_arr_table_title_station_letter': 'Станция назначения',
            //'prn_arr_table_title_text_letter': 'Текст',
            //'prn_arr_table_title_curr_cargo': 'Груз ТЕКЩ',
            //'prn_arr_table_title_arrival_cargo': 'Груз ПРИБ',

            //'prn_arr_table_title_arr_uz_station': 'Стан. отправ.',
            //'prn_arr_table_title_devision_on': 'Цех получ.',
            //'prn_arr_table_title_curr_uz_station': 'Станция УЗ ТЕКУЩ',
            //'prn_arr_table_title_availability_doc': 'Док на УЗ',
            //'prn_arr_table_title_id_filing': 'Id подачи',
            //'prn_arr_table_title_note2': 'Примечание 2',
            //'prn_arr_table_title_note2': 'Примечание 2',
            'prn_arr_title_from_tail': 'с хвоста',
            'prn_arr_title_from_head': 'с головы',
            'prn_arr_title_not_specified': 'не указано',
            'prn_arr_title_yes': 'Да',


            //'prn_arr_title_report_nvt': 'Натурная ведомость поезда № {0}',
            //'prn_arr_title_report_podp_priem': 'Подпись приемосдатчика ______________________',
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
    var IDS_ARRIVAL = App.ids_arrival;

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

    function print_arr() {

    }
    // инициализация модуля
    print_arr.prototype.init = function (options) {
        LockScreen(langView('prn_arr_mess_init_module', App.Langs));
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            api_dir: null,
            api_wsd: null,
            ids_arrival: null,
            fn_init: null,
        }, options);

        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });
        this.ids_arrival = this.settings.ids_arrival ? this.settings.ids_arrival : new IDS_ARRIVAL({ url_api: App.Url_Api });

        this.sostav = null;
        this.vagons = [];

        // Инициализация вначале 
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init.call(this, true);
        }
    };

    print_arr.prototype.view_natural_statement_draft = function (format, id) {
        LockScreen(langView('prn_arr_mess_load_info', App.Langs));
        var wagons = [];

        var natural_statement_title = function ($body, sostav) {
            var $table = $('<table class="table-title"></table>');
            var $tbody = $('<tbody></tbody>');
            var $tr = $('<tr></tr>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_compositionIndex', App.Langs) + " :" + '</th>');
            $tr.append('<td scope="col">' + sostav.compositionIndex + '</td>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_dateArrival', App.Langs) + " :" + '</th>');
            $tr.append('<td scope="col">' + (sostav.dateArrival ? moment(sostav.dateArrival).format(format_datetime_ru) : null) + '</td>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_dateAdoption', App.Langs) + " :" + '</th>');
            $tr.append('<td scope="col">' + (sostav.dateAdoption ? moment(sostav.dateAdoption).format(format_datetime_ru) : null) + '</td>');
            var $tr1 = $('<tr></tr>');
            $tr1.append('<th scope="col">' + langView('prn_arr_table_title_stationOnName', App.Langs) + " :" + '</th>');
            $tr1.append('<td scope="col">' + sostav['stationOnName' + ucFirst(App.Lang)] + '</td>');
            $tr1.append('<th scope="col">' + langView('prn_arr_table_title_wayOnName', App.Langs) + " :" + '</th>');
            $tr1.append('<td scope="col">' + sostav['wayOnName' + ucFirst(App.Lang)] + '</td>');
            $tr1.append('<th scope="col">' + langView('prn_arr_table_title_numeration', App.Langs) + " :" + '</th>');
            $tr1.append('<td scope="col">' + (sostav.numeration === true ? langView('prn_arr_title_from_tail', App.Langs) : sostav.numeration === false ? langView('prn_arr_title_from_head', App.Langs) : langView('prn_arr_title_not_specified', App.Langs)) + '</td>');
            $table.append($tbody.append($tr).append($tr1));
            $body.append($table);
            $body.append('<br />');
        }

        var natural_statement = function ($body, wagons) {
            var operators = [];

            var $table = $('<table class="table-info"></table>');
            var $thead = $('<thead></thead>');
            var $tr = $('<tr></tr>');
            $tr.append('<th scope="col">№</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_stationFromName', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_cargoName', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_certificationData', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_operator', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_limitingLoading', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_admCode', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_numWagon', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_numDoc', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_vesg', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_devisionOn', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_arrCondition', App.Langs) + '</th>');
            $tr.append('<th scope="col">' + langView('prn_arr_table_title_note', App.Langs) + '</th>');
            $table.append($thead.append($tr));
            var $tbody = $('<tbody></tbody>');
            for (var iw = 0; iw < wagons.length; iw++) {
                var $tr = $('<tr></tr>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + wagons[iw].wagonsRent['operatorAbbr' + ucFirst(App.Lang)] + '</td>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + wagons[iw].wagonsRent.countrysCodeSng + '</td>');
                $tr.append('<td>' + wagons[iw].num + '</td>');
                $tr.append('<td>' + wagons[iw].numDoc + '</td>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + '</td>');
                $tr.append('<td>' + '</td>');
                $tbody.append($tr);

                var opr = operators.find(function (i) {
                    return i.id === wagons[iw].wagonsRent.idOperator;
                }.bind(this));
                if (!opr) {
                    if (wagons[iw].wagonsRent['operatorAbbr' + ucFirst(App.Lang)] !== null) {
                        operators.push({ id: wagons[iw].wagonsRent.idOperator, operator: wagons[iw].wagonsRent['operatorAbbr' + ucFirst(App.Lang)], count: 1, vesg: 0 });
                    } else {
                        operators.push({ id: 0, operator: 'Не определен', count: 1, vesg: vesg });
                    }
                } else {
                    opr.count += 1;
                    opr.vesg = Number(opr.vesg) + 0;
                }
            }
            var $tr = $('<tr></tr>');
            $tr.append('<th colspan="6" class="total">Всего вагонов</th>');
            $tr.append('<td class="total">' + wagons.length + '</td>');
            $tr.append('<th colspan="6"></th>');
            var $tr1 = $('<tr></tr>');
            $tbody.append($tr).append($tr1);
            if (operators && operators.length > 0) {
                for (var io = 0; io < operators.length; io++) {
                    var $tr = $('<tr></tr>');
                    $tr.append('<th colspan="6" class="total">' + operators[io].operator + '</th>');
                    $tr.append('<td class="total">' + operators[io].count + '</td>');
                    $tr.append('<th colspan="6"></td>');
                    $tbody.append($tr);
                }
            }
            $table.append($tbody);
            $body.append($table);
            $body.append('<br />');
        }

        var pr_load = 1;

        var out_load = function (pr_load) {
            if (pr_load === 0) {
                if (this.sostav) {
                    LockScreen(langView('prn_arr_mess_load_print', App.Langs));
                    $('head').prepend('<title>' + langView('prn_arr_title_view_ws_statement_draft', App.Langs) + '</title>');
                    if (format == 'A4') {
                        $('body').addClass('a4');
                    }
                    if (format == 'A4L') {
                        $('body').addClass('a4-landscape');
                    }
                    $('body').append('<h2 style="text-align:center;">' + langView('prn_arr_title_view_ws_statement_draft', App.Langs) + this.sostav.train + '</h2>');
                    $('body').append('<br />');
                    natural_statement_title($('body'), this.sostav);
                    $('body').append('<br />');
                    this.vagons = this.sostav.arrivalCars.filter(function (i) {
                        return i.positionArrival === null;
                    }.bind(this));
                    //this.vagons = this.sostav.arrivalCars;
                    if (this.vagons !== null && this.vagons.length > 0) {
                        natural_statement($('body'), this.vagons);
                    } else {
                        $('body').append('<p style="text-align:center;">' + langView('prn_ws_warning_wagon_is_adoption', App.Langs) + '</p>');
                    }

                }
                LockScreenOff();
            }
        }.bind(this);

        this.ids_arrival.getDocumentDraftArrivalSostavOfId(id, function (sostav) {
            if (sostav) {
                this.sostav = sostav;
                pr_load--;
                out_load(pr_load);
            }
        }.bind(this))
    }
    // Выбрать все вагоны выбранного состава 
    print_arr.prototype.destroy = function () {

    };

    App.print_arr = print_arr;

    window.App = App;

})(window);