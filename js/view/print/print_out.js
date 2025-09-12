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
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'prn_out_mess_init_module': 'Инициализация модуля(print_out)...',
            'prn_out_mess_load_info': 'Загружаю информацию...',
            'prn_out_mess_load_print': 'Формирую документ для печати...',

            'prn_out_title_register_doc_transfer': 'Реєстр передач документів',
            'prn_out_title_type_payers': 'Платник АМКР',
            'prn_out_title_list_outgoing': 'Список відправлень № {0} ',
            'prn_out_title_date_outgoing': 'Дата відправлення {0} ',
            'prn_out_title_station_from': 'ст. {0} ',
            'prn_out_title_total_outgoing': 'Усього - {0} відправки',
            'prn_out_table_title_position': '№з/п',
            'prn_out_table_title_numWagon': 'Номер вагона',
            'prn_out_table_title_numDoc': 'Номер відправки',
            'prn_out_table_title_cargoName': 'Вантаж',
            'prn_out_table_title_payers': 'Платник',
            'prn_out_table_title_pays': 'Тариф',
            'prn_out_table_title_pays_dop': 'Дод. збори',
            'prn_out_table_title_pays_all': 'Всього сплачено відправником',

            //'prn_out_title_view_ws_statement': 'Натурная ведомость',
            //'prn_out_title_view_ws_statement_draft': 'Черновик натурной ведомости поезда №',

            //'prn_out_table_title_compositionIndex': 'Индекс поезда',
            //'prn_out_table_title_dateArrival': 'Прибытие',
            //'prn_out_table_title_dateAdoption': 'Прием',
            //'prn_out_table_title_stationOnName': 'Прибыл на станцию',
            //'prn_out_table_title_wayOnName': 'Путь',
            //'prn_out_table_title_numeration': 'Нумерация',

            //'prn_out_table_title_stationFromName': 'Станция отправления',
            //'prn_out_table_title_cargoName': 'Груз',
            //'prn_out_table_title_certificationData': 'Сертиф. данные',
            //'prn_out_table_title_operator': 'Оператор',
            //'prn_out_table_title_limitingLoading': 'Огран',
            //'prn_out_table_title_admCode': 'Код',
            //'prn_out_table_title_vesg': 'Вес. тн',
            //'prn_out_table_title_devisionOn': 'Цех получ.',
            //'prn_out_table_title_arrCondition': 'Разметка',
            //'prn_out_table_title_note': 'Примечание',

            'prn_ws_warning_wagon_is_outgoing': 'В сотаве нет отправленных вагонов!',

            'prn_out_title_from_tail': 'с хвоста',
            'prn_out_title_from_head': 'с головы',
            'prn_out_title_not_specified': 'не указано',
            'prn_out_title_yes': 'Да',

            'prn_out_title_button_Ok': 'Показать',
            'prn_out_title_button_Cancel': 'Отмена',
            'prn_out_title_form_apply': 'Укажите вагоны',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    var FE = App.form_element;
    var MCF = App.modal_confirm_form;

    // js/module/view_op_common.js
    // var VIEW_COMMON = App.view_op_common;
    // js/view/shared/common.js

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var IDS_OUTGOING = App.ids_outgoing;

    var OutText = function (obj) {
        return obj !== null ? obj : '';
    }

    var OutPay = function (obj) {
        return obj !== null ? Number(obj / 100).toFixed(2) : '';
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

    var getSpace = function (n) {
        var res = "";
        for (var i = 0; i < n; i++) {
            res += "&nbsp;"
        }
        return res
    }

    function print_out() {

    }
    // инициализация модуля
    print_out.prototype.init = function (options) {
        LockScreen(langView('prn_out_mess_init_module', App.Langs));
        // теперь выполним инициализацию, определим основные свойства
        this.settings = $.extend({
            api_dir: null,
            api_wsd: null,
            ids_outgoing: null,
            fn_init: null,
        }, options);

        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: App.Url_Api });
        this.api_wsd = this.settings.api_wsd ? this.settings.api_wsd : new IDS_WSD({ url_api: App.Url_Api });
        this.ids_outgoing = this.settings.ids_outgoing ? this.settings.ids_outgoing : new IDS_OUTGOING({ url_api: App.Url_Api });

        this.fe_ui = new FE();

        this.sdw = new MCF(); // Создадим экземпляр окно сообщений
        this.sdw.init({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: 'sm',
            bt_close_text: langView('prn_out_title_button_Cancel', App.Langs),
            bt_ok_text: langView('prn_out_title_button_Ok', App.Langs),
        });

        this.sostav = null;
        this.vagons = [];
        this.select_vagons = [];

        // Инициализация вначале 
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init.call(this, true);
        }
    };

    print_out.prototype.view_register_doc_transfer = function (format, id, type) {
        LockScreen(langView('prn_out_mess_load_info', App.Langs));
        var wagons = [];

        var register_doc_transfer = function ($body, wagons) {
            /*            var operators = [];*/
            var wagons = wagons.sort(function (a, b) {
                return Number(a.positionOutgoing) - Number(b.positionOutgoing)
            })
            $body.empty();
            var $table = $('<table class="table-info"></table>');
            var $thead = $('<thead></thead>');
            var $tr = $('<tr></tr>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_position', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-20">' + langView('prn_out_table_title_numWagon', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-20">' + langView('prn_out_table_title_numDoc', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_position', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-20">' + langView('prn_out_table_title_numWagon', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-20">' + langView('prn_out_table_title_numDoc', App.Langs) + '</th>');

            $table.append($thead.append($tr));
            var $tbody = $('<tbody></tbody>');
            var docs = [];
            $.each(wagons, function (i, el) {

                var doc = docs.find(function (i) {
                    return i.numDoc === el.numDoc;
                }.bind(this));
                if (!doc) {
                    docs.push({ numDoc: el.numDoc, count: 1 });
                } else {
                    docs.count += 1;
                }
            }.bind(this));




            for (var iw = 0; iw < 30; iw++) {
                var $tr = $('<tr></tr>');

                if (iw < wagons.length) {
                    $tr.append('<td>' + (iw + 1) + '</td>'); //OutText(wagons[iw].positionOutgoing) 
                    $tr.append('<td class="large">' + OutText(wagons[iw].num) + '</td>');
                    $tr.append('<td class="large">' + OutText(wagons[iw].numDoc) + '</td>');
                } else {
                    $tr.append('<td>&nbsp</td>');
                    $tr.append('<td>&nbsp</td>');
                    $tr.append('<td>&nbsp</td>');
                }
                var pos = iw + 30;
                if (pos < wagons.length) {
                    $tr.append('<td>' + (iw + 31) + '</td>'); // OutText(wagons[iw + 30].positionOutgoing)
                    $tr.append('<td class="large">' + OutText(wagons[iw + 30].num) + '</td>');
                    $tr.append('<td class="large">' + OutText(wagons[iw + 30].numDoc) + '</td>');
                } else {
                    $tr.append('<td>&nbsp</td>');
                    $tr.append('<td>&nbsp</td>');
                    $tr.append('<td>&nbsp</td>');
                }

                $tbody.append($tr);
            }
            $table.append($tbody);
            $body.append($table);
            $body.append('<br />');
            $body.append('<h3 style="text-align:center;">' + langView('prn_out_title_total_outgoing', App.Langs).format(docs.length) + '</h3>');
        }

        var register_doc_transfer_amkr = function ($body, wagons) {
            /*            var operators = [];*/
            var wagons = wagons.sort(function (a, b) {
                return Number(a.positionOutgoing) - Number(b.positionOutgoing)
            })
            $body.empty();
            var $table = $('<table class="table-info"></table>');
            var $thead = $('<thead></thead>');
            var $tr = $('<tr></tr>');
            $tr.append('<th scope="col" class="wp-5">' + langView('prn_out_table_title_position', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_numWagon', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_numDoc', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-20">' + langView('prn_out_table_title_cargoName', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_payers', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_pays', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_pays_dop', App.Langs) + '</th>');
            $tr.append('<th scope="col" class="wp-10">' + langView('prn_out_table_title_pays_all', App.Langs) + '</th>');
            $table.append($thead.append($tr));
            var $tbody = $('<tbody></tbody>');
            var docs = [];
            var summ_pays = 0;
            //
            $.each(wagons, function (i, el) {
                var doc = docs.find(function (i) {
                    return i.numDoc === el.numDoc;
                }.bind(this));
                if (!doc) {
                    docs.push({ numDoc: el.numDoc, count: 1 });
                } else {
                    docs.count += 1;
                }
                if (el.codePayer = 8116733) {
                    summ_pays += el.outgoingUzVagonPaysAll;
                }
                var $tr = $('<tr></tr>');
                $tr.append('<td>' + (i + 1) + '</td>');
                $tr.append('<td class="large">' + OutText(el.num) + '</td>');
                $tr.append('<td class="large">' + OutText(el.numDoc) + '</td>');
                $tr.append('<td>' + OutText(el.cargoNameRu) + '</td>');
                $tr.append('<td>' + OutText(el.codePayer != 8116733 ? el.payerNameRu : 'АМКР') + '</td>');
                $tr.append('<td class="large">' + OutPay(el.outgoingUzVagonPays001) + '</td>');
                $tr.append('<td class="large">' + OutPay(el.outgoingUzVagonPaysAdd) + '</td>');
                $tr.append('<td class="large">' + OutPay(el.outgoingUzVagonPaysAll) + '</td>');
                $tbody.append($tr);
            }.bind(this));
            //$table.append($tbody)
            //var $tfoot = $('<tfoot></tfoot>');
            var $tr = $('<tr></tr>');
            $tr.append('<th class="total" colspan="7">Всього сплачено платником ПАТ "АРСЕЛОРМІТТАЛ КРИВИЙ РІГ"</th>');
            $tr.append('<td class="total">' + OutPay(summ_pays) + '</td>');
            //$tfoot.append($tr);
            $tbody.append($tr);
            //$table.append($tfoot);
            $table.append($tbody);
            $body.append($table);
            $body.append('<br />');
            $body.append('<h3 style="text-align:center;">' + langView('prn_out_title_total_outgoing', App.Langs).format(docs.length) + '</h3>');
        }

        var pr_load = 1;

        var out_load = function (pr_load) {
            if (pr_load === 0) {

                if (this.sostav) {
                    LockScreen(langView('prn_out_mess_load_print', App.Langs));
                    $('head').prepend('<title>' + langView('prn_out_title_register_doc_transfer', App.Langs) + '</title>');
                    if (format == 'A4') {
                        $('body').addClass('a4');
                    }
                    if (format == 'A4L') {
                        $('body').addClass('a4-landscape');
                    }
                    var $title = $('<h2 style="text-align:center;">' + langView('prn_out_title_register_doc_transfer', App.Langs) + '</h2>');
                    // Заглавие с функцией выбора вагонов
                    $title.on('click', function (e) {
                        // выбрать новые вагоны
                        this.view_select(null, function (select_vagons) {
                            // Показать
                            register_doc_transfer($('div#register'), select_vagons);
                        }.bind(this));
                    }.bind(this));
                    $('body').append($title);
                    $('body').append('<h3 style="text-align:center;">' + langView('prn_out_title_list_outgoing', App.Langs).format(this.sostav.numDoc) + '</h3>');
                    if (type === 1) {
                        $('body').append('<h3 style="text-align:center;">' + langView('prn_out_title_type_payers', App.Langs) + '</h3>');
                    }
                    $('body').append('<h3 style="text-align:center;">' + langView('prn_out_title_date_outgoing', App.Langs).format(this.sostav.dateOutgoing !== null ? moment(this.sostav.dateOutgoing).format(format_datetime_ru) : '') + '</h3>');
                    $('body').append('<h3 style="text-align:center;">' + langView('prn_out_title_station_from', App.Langs).format(this.sostav.stationOnNameRu) + '</h3>');
                    $('body').append('<br />');
                    $('body').append('<div id="register"></div>');
                    $('body').append('<br />');
                    $('body').append('<br />');
                    $('body').append('<p>Передано:_______________________ пр.зд.ТОВ “СТАЛЬ УКРАЇНА” _________________________________</p>');
                    $('body').append('<p class="smal">' + getSpace(50) + '(дата, год., хв.)' + getSpace(130) + '(підпис,  прізвище та ініціали) </p>');
                    $('body').append('<br />');
                    $('body').append('<p>Прийнято:____________________________________________________________________________________</p>');
                    $('body').append('<p class="smal">' + getSpace(50) + '(дата, год., хв.)' + getSpace(130) + '(підпис,  прізвище та ініціали) </p>');
                    $('body').append('<br />');

                    //natural_statement_title($('div#register'), this.sostav);
                    this.vagons = this.sostav.outgoingCars.filter(function (i) {
                        return i.positionOutgoing !== null;
                    }.bind(this));

                    if (this.vagons !== null && this.vagons.length > 0) {
                        //-- инициализировать и открыть выбор вагонов
                        this.init_select(type, function (select_vagons) {
                            // Показать
                            if (type === 0) register_doc_transfer($('div#register'), select_vagons);
                            if (type === 1) register_doc_transfer_amkr($('div#register'), select_vagons);

                        }.bind(this));
                    } else {
                        $('body').append('<p style="text-align:center;">' + langView('prn_ws_warning_wagon_is_outgoing', App.Langs) + '</p>');
                    }
                }
                LockScreenOff();
            }
        }.bind(this);

        this.ids_outgoing.getRegisterDocumentTransferOutgoingSostavOfId(id, function (sostav) {
            if (sostav) {
                this.sostav = sostav;
                pr_load--;
                out_load(pr_load);
            }
        }.bind(this))
    }

    print_out.prototype.view_register_doc_transfer_amkr = function (format, id) {

    }
    // Инициализировать окно выбора вагонов 
    print_out.prototype.init_select = function (type, callback) {
        this.row_table = new this.fe_ui.bs_row({ id: 'table-select-wagons', class: 'pt-2' });
        //this.verification_invoices_table.$html.append(row_table.$html);
        var $table = $('<table id="select-docs-wagons" class="table table-sm table-success table-small table-striped table-bordered border-secondary"></table>');
        var $thead = $('<thead></thead>');
        var $tr = $('<tr></tr>');
        var $th_chk = $('<th></th>');
        var $th_doc = $('<th>Документ</th>');
        var $th_num = $('<th>№ Вагона</th>');
        $tr.append($th_chk).append($th_doc).append($th_num);
        $thead.append($tr);
        $table.append($thead);
        this.row_table.$html.append($table);

        this.view_select(this.row_table.$html, function (select_vagons) {
            if (typeof callback === 'function') {
                callback(select_vagons);
            }
        }.bind(this));

        var $tbody = $('<tbody></tbody>');
        $.each(this.vagons, function (i, el) {
            if ((type == 0) || (type == 1 && el.codePayer == 8116733)) {
                var $tr = $('<tr id="' + el.id + '"></tr>');
                var $td_chk = $('<td></td>');
                var $td_doc = $('<td>' + (el.numDoc !== null ? el.numDoc : '') + '</td>');
                var $td_num = $('<td>' + el.num + '</td>');
                $tr.append($td_chk).append($td_doc).append($td_doc).append($td_num);
                $tbody.append($tr);
            }
        }.bind(this));
        $table.append($tbody);

        this.table_select = new DataTable('#select-docs-wagons', {
            columnDefs: [
                {
                    orderable: false,
                    render: DataTable.render.select(),
                    targets: 0
                }
            ],
            order: [1, 'asc'],
            ordering: true,
            info: false,
            scrollY: '200px',
            scrollCollapse: true,
            paging: false,
            select: {
                style: 'multi',
                selector: 'td:first-child',
                headerCheckbox: 'select-page'
            }
        });
    };
    // Открыть окно выбора вагонов 
    print_out.prototype.view_select = function (body, callback) {
        this.select_vagons = [];
        this.sdw.open(
            langView('prn_out_title_form_apply', App.Langs),
            body, //this.row_table.$html,
            function () {
                var rows = this.table_select.rows({ selected: true }).data().toArray();
                if (rows && rows.length > 0) {
                    $.each(rows, function (i, el_rw) {
                        var sel = this.vagons.find(function (o) { return o.id == el_rw.DT_RowId }.bind(this));
                        if (sel) { this.select_vagons.push(sel); }
                    }.bind(this));
                    if (typeof callback === 'function') {
                        callback(this.select_vagons);
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback(this.select_vagons);
                    }
                }
            }.bind(this),
            function () {
                //this.main_alert.out_warning_message(langView('vs_via_cancel_update_presented', App.Langs));
            }.bind(this));
    };
    // 
    print_out.prototype.destroy = function () {

    };

    App.print_out = print_out;

    window.App = App;

})(window);