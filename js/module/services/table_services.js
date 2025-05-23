/* ===============================================
-= Модуль библиотеки таблицы сервисов =-
  + js/view/shared/common.js
  + js/module/table_common.js
  + css/module/table_common.css
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
            'tsrv_field_num': '№ вагона',
            'tsrv_field_position': '№ поз.',
            'tsrv_field_nomMainDoc': '№ осн. накл.',
            'tsrv_field_nomDoc': '№ накл.',
            'tsrv_field_dateOtpr': 'Дата отправления на АМКР',
            'tsrv_field_DateAdoption': 'Дата приема',
            'tsrv_field_stationFromName': 'Cт. отпр.',
            'tsrv_field_arrivalNameStnFrom': 'Cт. отпр.',
            'tsrv_field_outgoingCodeStnFrom': '(ЭПД) Код ст. отправления',
            'tsrv_field_outgoingNameStnFrom': '(ЭПД) Станция отправления',
            'tsrv_field_stationToName': 'Cт. приб.',
            'tsrv_field_arrivalNameStnTo': 'Cт. приб.',
            'tsrv_field_outgoingCodeStnTo': '(ЭПД) Код ст. назначения',
            'tsrv_field_outgoingNameStnTo': '(ЭПД) Станция назначения',
            'tsrv_field_inlandrailwayAbbr': 'Дорога ОТПР',
            'tsrv_field_arrivalCargoName': 'Груз ПРИБ',
            'tsrv_field_outgoingCargoName': 'Груз ОТПР',
            'tsrv_field_arrivalOperatorAbbr': 'Оператор по АМКР ПРИБ',
            'tsrv_field_outgoingOperatorAbbr': 'Оператор по АМКР ОТПР',
            'tsrv_field_toDivisionName': 'Цех получатель',
            'tsrv_field_arrivalDivisionAbbr': 'Цех получатель',
            'tsrv_field_payerSenderCode': 'Код плат. ПРИБ.(по отправке).',
            'tsrv_field_payerSenderName': 'Плат. ПРИБ.(по отправке).',
            'tsrv_field_outgoing_payerSenderCode': '(ЭПД) Код плат ОТПР.',
            'tsrv_field_outgoing_payerSenderName': '(ЭПД) Плательщик ОТПР',
            'tsrv_field_payerArrivalCode': 'Код плательщика ПРИБ.',
            'tsrv_field_payerArrivalName': 'Плательщик ПРИБ',
            'tsrv_field_payerLocalCode': 'Плательщик',
            'tsrv_field_payerLocalName': 'Плательщик',
            'tsrv_field_vesg': 'Вес ЭПД, тн.',
            'tsrv_field_arrivalUzVagonPays': 'Тариф ПРИБ (ваг.)',
            'tsrv_field_arrivalUZDocumentPay': 'Тариф ПРИБ (док)',
            'tsrv_field_outgoingUZDocumentPay': 'Тариф УЗ (ЭПД)',
            'tsrv_field_outgoingUZDocumentPayAdd': 'Доп.сборы ЭПД',
            'tsrv_field_outgoingUZDocumentPayAll': 'Итого по ЭПД',
            'tsrv_field_outgoingUzVagonPays': 'Тариф УЗ (ЭПД)',
            'tsrv_field_outgoingUzVagonPaysAdd': 'Доп.сборы ЭПД',
            'tsrv_field_outgoingUzVagonPaysAll': 'Итого по ЭПД',

            'tsrv_field_countVagon': 'Кол. ваг.',
            'tsrv_field_tariffContract': 'Ж.д. тариф по договору, грн.',
            'tsrv_field_deffTariff': 'Разница, грн.',
            'tsrv_field_outgoingDeffTariff': 'Разница, грн.',
            'tsrv_field_kolConductor': 'Кол-во проводников',
            'tsrv_field_calcPayer': 'Дата расчета',
            'tsrv_field_calcPayerUser': 'Рассчитал',
            'tsrv_field_numActServices1': 'Предъявлено',
            'tsrv_field_numActServices2': 'Предъявлено',
            'tsrv_field_numActServices3': 'Предъявлено',
            'tsrv_field_verification': 'Дата сверки',
            'tsrv_field_verificationUser': 'Сверил',
            'tsrv_field_distanceWay': '(ЭПД) Тар.расс. ОТПР',
            'tsrv_field_dateReadinessUz': 'Дата и время готовности',
            'tsrv_field_dateReadinessAmkr': 'Дата и время предъявления',
            'tsrv_field_dateOutgoing': 'Дата и время сдачи',
            'tsrv_field_rodAbbr': 'Род',
            'tsrv_field_numList': 'Перечень',
            'tsrv_field_dateList': 'От',
            'tsrv_field_outgoingCargoEtsngCode': '(ЭПД) Код Груз ОТПР',

            'tsrv_title_no_epd': 'без ЭПД',

            //'tsrv_title_link_num': 'Показать историю по вагону...',

            'tsrv_title_button_select_all_wagon': 'Все вагоны',
            'tsrv_title_button_deselect_all': 'Убрать выбор',
            'tsrv_title_button_add_sostav': 'Добавить в состав',
        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    var TAB_COMMON = App.table_common; // Общий модуль таблиц*/

    var getHoursFromMinuts = function (minutes) {
        if (minutes && minutes > 0) {
            var h = parseInt(minutes / 60);
            h = h < 10 ? '0' + h : h;
            var m = minutes % 60;
            m = m < 10 ? '0' + m : m;
            //return `${h.toString().padStart(6, '0')}:${m.toString().padStart(2, '0')}`;
            return `${h.toString().padStart(1, '0')}:${m.toString().padStart(2, '0')}`;
        } else {
            return null;
        }
    };

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_services(selector) {
        this.tab_com = new TAB_COMMON({
            selector: selector,
            fn_init_type_report: this.init_type_report.bind(this),
        });
        // Перечень полей
        var list_collums = [
            {
                field: 'position',
                data: function (row, type, val, meta) {
                    return row.position;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_position', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'num',
                data: function (row, type, val, meta) {
                    return row.num;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_num', App.Langs), width: "30px", orderable: true, searchable: true
            },
            //{
            //    field: 'nomMainDoc',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            return row.idDocumentNavigation.nomMainDoc;
            //        } else {
            //            return row.nomMainDoc;
            //        }
            //    },
            //    className: 'dt-body-center',
            //    title: langView('tsrv_field_nomMainDoc', App.Langs), width: "30px", orderable: true, searchable: true
            //},
            {
                field: 'nomMainDoc',
                data: function (row, type, val, meta) {
                    return row.nomMainDoc;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_nomMainDoc', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'nomDoc',
                data: function (row, type, val, meta) {
                    return row.nomDoc;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_nomDoc', App.Langs), width: "30px", orderable: true, searchable: true
            },
            //{
            //    field: 'dateOtpr',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            return row.idDocumentNavigation.dateOtpr ? moment(row.idDocumentNavigation.dateOtpr).format(format_datetime) : null;
            //        } else {
            //            return row.dateOtpr ? moment(row.dateOtpr).format(format_datetime) : null;
            //        }
            //    },
            //    className: 'dt-body-nowrap',
            //    title: langView('tsrv_field_dateOtpr', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            {
                field: 'dateOtpr',
                data: function (row, type, val, meta) {
                    return row.dateOtpr ? moment(row.dateOtpr).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_dateOtpr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            //{
            //    field: 'dateAdoption',
            //    data: function (row, type, val, meta) {

            //        if (row.IdArrivalNavigation) {
            //            return row.IdArrivalNavigation.dateAdoption ? moment(row.IdArrivalNavigation.dateAdoption).format(format_datetime) : null;
            //        } else {
            //            return row.dateAdoption ? moment(row.dateAdoption).format(format_datetime) : null;
            //        }
            //    },
            //    className: 'dt-body-nowrap',
            //    title: langView('tsrv_field_DateAdoption', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            {
                field: 'dateAdoption',
                data: function (row, type, val, meta) {
                    return row.dateAdoption ? moment(row.dateAdoption).format(format_datetime) : null
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_DateAdoption', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'nameStnFrom',
                data: function (row, type, val, meta) {
                    return row.nameStnFrom;
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_stationFromName', App.Langs), width: "100px", orderable: true, searchable: true
            },

            {
                field: 'arrivalNameStnFrom',
                data: function (row, type, val, meta) {
                    return row['arrivalNameStnFrom' + ucFirst(App.Lang)];
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_arrivalNameStnFrom', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'outgoingCodeStnFrom',
                data: function (row, type, val, meta) {
                    return row.outgoingCodeStnFrom;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_outgoingCodeStnFrom', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'outgoingNameStnFrom',
                data: function (row, type, val, meta) {
                    return row.outgoingNameStnFrom;
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_outgoingNameStnFrom', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'outgoingCodeStnTo',
                data: function (row, type, val, meta) {
                    return row.outgoingCodeStnTo;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_outgoingCodeStnTo', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'outgoingNameStnTo',
                data: function (row, type, val, meta) {
                    return row.outgoingNameStnTo;
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_outgoingNameStnTo', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'inlandrailwayAbbr',
                data: function (row, type, val, meta) {
                    return row.inlandrailwayAbbr;
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_inlandrailwayAbbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'nameStnTo',
                data: function (row, type, val, meta) {
                    return row.nameStnTo;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_stationToName', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'arrivalNameStnTo',
                data: function (row, type, val, meta) {
                    return row['arrivalNameStnTo' + ucFirst(App.Lang)];
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_arrivalNameStnTo', App.Langs), width: "100px", orderable: true, searchable: true
            },

            {
                field: 'idCargoNavigation.cargoName',
                data: function (row, type, val, meta) {

                    if (row.idCargoNavigation) {
                        return row.idCargoNavigation['cargoName' + ucFirst(App.Lang)];
                    } else return null;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_arrivalCargoName', App.Langs), width: "100px", orderable: true, searchable: true
            },
            //{
            //    field: 'arrivalUzVagons.idCargoNavigation.cargoName',
            //    data: function (row, type, val, meta) {

            //        if (row.arrivalUzVagons && row.arrivalUzVagons.length > 0) {
            //            if (row.arrivalUzVagons[0].idCargoNavigation) {
            //                return row.arrivalUzVagons[0].idCargoNavigation['cargoName' + ucFirst(App.Lang)];
            //            } else return null;
            //        } else return null;
            //    },
            //    className: 'dt-body-left shorten mw-100',
            //    title: langView('tsrv_field_arrivalCargoName', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            {
                field: 'arrivalCargoName',
                data: function (row, type, val, meta) {
                    if (row['arrivalCargoName' + ucFirst(App.Lang)] !== undefined) {
                        return row['arrivalCargoName' + ucFirst(App.Lang)]
                    } else {
                        return row.arrivalCargoName;
                    }
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_arrivalCargoName', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'outgoingCargoName',
                data: function (row, type, val, meta) {
                    return row.outgoingCargoName;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_outgoingCargoName', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'outgoingCargoEtsngCode',
                data: function (row, type, val, meta) {
                    return row.outgoingCargoEtsngCode;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_outgoingCargoEtsngCode', App.Langs), width: "100px", orderable: true, searchable: true
            },

            //{
            //    field: 'idWagonsRentArrivalNavigation.idOperatorNavigation.abbr',
            //    data: function (row, type, val, meta) {

            //        if (row.idWagonsRentArrivalNavigation) {
            //            if (row.idWagonsRentArrivalNavigation.idOperatorNavigation) {
            //                return row.idWagonsRentArrivalNavigation.idOperatorNavigation['abbr' + ucFirst(App.Lang)];
            //            } else {
            //                return null;
            //            }
            //        } else return null;
            //    },
            //    className: 'dt-body-left shorten mw-100',
            //    title: langView('tsrv_field_arrivalOperatorAbbr', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            {
                field: 'arrivalOperatorAbbr',
                data: function (row, type, val, meta) {
                    if (row['arrivalOperatorAbbr' + ucFirst(App.Lang)] !== undefined) {
                        return row['arrivalOperatorAbbr' + ucFirst(App.Lang)]
                    } else {
                        return row.arrivalOperatorAbbr;
                    }
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_arrivalOperatorAbbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'outgoingOperatorAbbr',
                data: function (row, type, val, meta) {
                    return row.outgoingOperatorAbbr;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_outgoingOperatorAbbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'toDivisionAbbr',
                data: function (row, type, val, meta) {
                    return row.toDivisionAbbr;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_toDivisionName', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'arrivalDivisionAbbr',
                data: function (row, type, val, meta) {
                    if (row['arrivalDivisionAbbr' + ucFirst(App.Lang)] !== undefined) {
                        return row['arrivalDivisionAbbr' + ucFirst(App.Lang)]
                    } else {
                        return row.arrivalDivisionAbbr;
                    }
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_arrivalDivisionAbbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            //{
            //    field: 'idDocumentNavigation.codePayerSenderNavigation.payerName',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            if (row.idDocumentNavigation.codePayerSenderNavigation) {
            //                return row.idDocumentNavigation.codePayerSenderNavigation['payerName' + ucFirst(App.Lang)];
            //            } else {
            //                return null;
            //            }
            //        } else return null;
            //    },
            //    className: 'dt-body-left shorten mw-100',
            //    title: langView('tsrv_field_payerSenderName', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            //{
            //    field: 'idDocumentNavigation.codePayerSenderNavigation.payerCode',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            if (row.idDocumentNavigation.codePayerSenderNavigation) {
            //                return row.idDocumentNavigation.codePayerSenderNavigation.code;
            //            } else {
            //                return null;
            //            }
            //        } else return null;
            //    },
            //    className: 'dt-body-center',
            //    title: langView('tsrv_field_payerSenderCode', App.Langs), width: "30px", orderable: true, searchable: true
            //},
            {
                field: 'payerSenderName',
                data: function (row, type, val, meta) {
                    return row.payerSenderName;
                },
                className: 'dt-body-left shorten',
                title: langView('tsrv_field_payerSenderName', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'payerSenderCode',
                data: function (row, type, val, meta) {
                    return row.payerSenderCode;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_payerSenderCode', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'payerArrivalName',
                data: function (row, type, val, meta) {
                    return row.payerArrivalName;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_payerArrivalName', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'payerArrivalCode',
                data: function (row, type, val, meta) {
                    return row.payerArrivalCode;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_payerArrivalCode', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'payerLocalName',
                data: function (row, type, val, meta) {
                    if (row['payerLocalName' + ucFirst(App.Lang)] !== undefined) {
                        return row['payerLocalName' + ucFirst(App.Lang)]
                    } else {
                        return row.payerLocalName;
                    }
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_payerLocalName', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'payerLocalCode',
                data: function (row, type, val, meta) {
                    return row.payerLocalCode;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tsrv_field_payerLocalCode', App.Langs), width: "100px", orderable: true, searchable: true
            },
            //{
            //    field: 'idDocumentNavigation.codePayerArrivalNavigation.payerName',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            if (row.idDocumentNavigation.codePayerArrivalNavigation) {
            //                return row.idDocumentNavigation.codePayerArrivalNavigation['payerName' + ucFirst(App.Lang)];
            //            } else {
            //                return null;
            //            }
            //        } else return null;
            //    },
            //    className: 'dt-body-left shorten mw-100',
            //    title: langView('tsrv_field_payerArrivalName', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            //{
            //    field: 'idDocumentNavigation.codePayerArrivalNavigation.payerCode',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            if (row.idDocumentNavigation.codePayerArrivalNavigation) {
            //                return row.idDocumentNavigation.codePayerArrivalNavigation.code;
            //            } else {
            //                return null;
            //            }
            //        } else return null;
            //    },
            //    className: 'dt-body-center',
            //    title: langView('tsrv_field_payerArrivalCode', App.Langs), width: "30px", orderable: true, searchable: true
            //},
            //{
            //    field: 'idDocumentNavigation.codePayerLocalNavigation.payerName',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            if (row.idDocumentNavigation.codePayerLocalNavigation) {
            //                return row.idDocumentNavigation.codePayerLocalNavigation['payerName' + ucFirst(App.Lang)];
            //            } else {
            //                return null;
            //            }
            //        } else return null;
            //    },
            //    className: 'dt-body-left shorten mw-100',
            //    title: langView('tsrv_field_payerLocalName', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            //{
            //    field: 'idDocumentNavigation.codePayerLocalNavigation.payerCode',
            //    data: function (row, type, val, meta) {

            //        if (row.idDocumentNavigation) {
            //            if (row.idDocumentNavigation.codePayerLocalNavigation) {
            //                return row.idDocumentNavigation.codePayerLocalNavigation.code;
            //            } else {
            //                return null;
            //            }
            //        } else return null;
            //    },
            //    className: 'dt-body-center',
            //    title: langView('tsrv_field_payerLocalCode', App.Langs), width: "30px", orderable: true, searchable: true
            //},
            {
                field: 'vesg',
                data: function (row, type, val, meta) {
                    return row.vesg ? Number(Number(row.vesg) / 1000).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_vesg', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'distanceWay',
                data: function (row, type, val, meta) {
                    return row.distanceWay;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_distanceWay', App.Langs), width: "30px", orderable: true, searchable: true
            },
            //{
            //    field: 'arrivalUzVagons.vesg',
            //    data: function (row, type, val, meta) {

            //        if (row.arrivalUzVagons && row.arrivalUzVagons.length > 0) {
            //            var vesg = 0;
            //            $.each(row.arrivalUzVagons, function (i, el) {
            //                vesg += (el.vesg ? Number(el.vesg) : 0);
            //            }.bind(this));
            //            return vesg.toFixed(2);
            //        } else return null;
            //    },
            //    className: 'dt-body-center',
            //    title: langView('tsrv_field_vesg', App.Langs), width: "30px", orderable: true, searchable: true
            //},
            //{
            //    field: 'arrivalUzVagonPays',
            //    data: function (row, type, val, meta) {
            //        if (row.arrivalUzVagonPays && row.arrivalUzVagonPays.length > 0) {
            //            var summa = 0;
            //            $.each(row.arrivalUzVagonPays, function (i, el) {
            //                summa += (el.summa ? Number(el.summa) : 0);
            //            }.bind(this));
            //            return summa.toFixed(2);
            //        } else return null;
            //    },
            //    className: 'dt-body-center',
            //    title: langView('tsrv_field_arrivalUzVagonPays', App.Langs), width: "30px", orderable: true, searchable: true
            //},
            {
                field: 'outgoingUzVagonPays',
                data: function (row, type, val, meta) {
                    return row.outgoingUzVagonPays !== null ? Number(row.outgoingUzVagonPays / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_outgoingUzVagonPays', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'outgoingUzVagonPaysAdd',
                data: function (row, type, val, meta) {
                    return row.outgoingUzVagonPaysAdd !== null ? Number(row.outgoingUzVagonPaysAdd / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_outgoingUzVagonPaysAdd', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'outgoingUzVagonPaysAll',
                data: function (row, type, val, meta) {
                    return (row.outgoingUzVagonPaysAdd !== null && row.outgoingUzVagonPays !== null) ? Number((row.outgoingUzVagonPays + row.outgoingUzVagonPaysAdd) / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_outgoingUzVagonPaysAll', App.Langs), width: "50px", orderable: true, searchable: true
            },

            {
                field: 'outgoingUZDocumentPay',
                data: function (row, type, val, meta) {
                    return row.outgoingUZDocumentPay !== null ? Number(row.outgoingUZDocumentPay / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_outgoingUZDocumentPay', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'outgoingUZDocumentPayAdd',
                data: function (row, type, val, meta) {
                    return row.outgoingUZDocumentPayAdd !== null ? Number(row.outgoingUZDocumentPayAdd / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_outgoingUZDocumentPayAdd', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'outgoingUZDocumentPayAll',
                data: function (row, type, val, meta) {
                    return (row.outgoingUZDocumentPayAdd !== null && row.outgoingUZDocumentPay !== null) ? Number((row.outgoingUZDocumentPay + row.outgoingUZDocumentPayAdd) / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_outgoingUZDocumentPayAll', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'arrivalUzVagonPays',
                data: function (row, type, val, meta) {
                    return row.arrivalUzVagonPays !== null ? Number(row.arrivalUzVagonPays / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_arrivalUzVagonPays', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'arrivalUZDocumentPay',
                data: function (row, type, val, meta) {
                    return row.arrivalUZDocumentPay !== null ? Number(row.arrivalUZDocumentPay / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_arrivalUZDocumentPay', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'countVagon',
                data: function (row, type, val, meta) {
                    return row.countVagon;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_countVagon', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'tariffContract',
                data: function (row, type, val, meta) {
                    return row.tariffContract ? Number(row.tariffContract).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_tariffContract', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'outgoingtariffContract',
                data: function (row, type, val, meta) {
                    return row.tariffContract ? Number(row.tariffContract / 100).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_tariffContract', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'deffTariff',
                data: function (row, type, val, meta) {
                    return row.deffTariff ? Number(row.deffTariff).toFixed(2) : null;
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_deffTariff', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'arrivalDeffTariff',
                data: function (row, type, val, meta) {
                    if (row.tariffContract !== null && row.arrivalUZDocumentPay !== null) {
                        return Number((Number(row.tariffContract * 100).toFixed(0) - Number(row.arrivalUZDocumentPay)) / 100).toFixed(2);
                    } else {
                        return null;
                    }
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_deffTariff', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'outgoingDeffTariff',
                data: function (row, type, val, meta) {
                    if (row.tariffContract !== null && row.outgoingUZDocumentPay !== null && row.outgoingUZDocumentPayAdd !== null) {
                        return (Number(row.tariffContract - (row.outgoingUZDocumentPay + row.outgoingUZDocumentPayAdd)) / 100).toFixed(2);
                    } else {
                        return null;
                    }
                },
                className: 'dt-body-end',
                title: langView('tsrv_field_outgoingDeffTariff', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kolConductor',
                data: function (row, type, val, meta) {
                    return row.kolConductor
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_kolConductor', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'calcPayer',
                data: function (row, type, val, meta) {
                    return row.calcPayer ? moment(row.calcPayer).format(format_datetime) : null
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_calcPayer', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'calcPayerUser',
                data: function (row, type, val, meta) {
                    return row.calcPayerUser;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_calcPayerUser', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'numActServices1',
                data: function (row, type, val, meta) {
                    return row.numActServices1;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_numActServices1', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'numActServices2',
                data: function (row, type, val, meta) {
                    return row.numActServices2;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_numActServices2', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'numActServices3',
                data: function (row, type, val, meta) {
                    return row.numActServices3;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_numActServices3', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'numList',
                data: function (row, type, val, meta) {
                    return row.numList;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_numList', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'dateList',
                data: function (row, type, val, meta) {
                    return row.dateList ? moment(row.dateList).format(format_date) : null
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_dateList', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'verification',
                data: function (row, type, val, meta) {
                    return row.verification ? moment(row.verification).format(format_datetime) : null
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_verification', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'verificationUser',
                data: function (row, type, val, meta) {
                    return row.verificationUser;
                },
                className: 'dt-body-center',
                title: langView('tsrv_field_verificationUser', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'dateReadinessUz',
                data: function (row, type, val, meta) {
                    return row.dateReadinessUz ? moment(row.dateReadinessUz).format(format_datetime) : null
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_dateReadinessUz', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'dateOutgoing',
                data: function (row, type, val, meta) {
                    return row.dateOutgoingAct ? moment(row.dateOutgoingAct).format(format_datetime) : (row.dateOutgoing ? moment(row.dateOutgoing).format(format_datetime) : null)
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_dateOutgoing', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'dateReadinessAmkr',
                data: function (row, type, val, meta) {
                    return row.dateReadinessAmkr ? moment(row.dateReadinessAmkr).format(format_datetime) : null
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_dateReadinessAmkr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'rodAbbr',
                data: function (row, type, val, meta) {
                    return row.rodAbbr
                },
                className: 'dt-body-nowrap',
                title: langView('tsrv_field_rodAbbr', App.Langs), width: "30px", orderable: true, searchable: true
            },

        ];
        this.tab_com.list_collums = this.tab_com.list_collums.concat(list_collums);
        // Перечень кнопок
        var list_buttons = [
            {
                button: 'select_all',
                text: langView('tsrv_title_button_select_all_wagon', App.Langs),
                className: 'btn btn-success'
            },
            {
                button: 'select_none',
                extend: 'selectNone',
                text: langView('tsrv_title_button_deselect_all', App.Langs),
                className: 'btn btn-success'
            },
            {
                button: 'add_sostav',
                text: langView('tsrv_title_button_add_sostav', App.Langs),
                className: 'btn btn-info'
            },
        ];
        this.tab_com.list_buttons = this.tab_com.list_buttons.concat(list_buttons);
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей
    table_services.prototype.init_columns_cost_calculation = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'nomMainDoc', title: null, class: null });
        collums.push({ field: 'countVagon', title: null, class: null });

        collums.push({ field: 'nameStnFrom', title: null, class: null });
        collums.push({ field: 'nameStnTo', title: null, class: null });
        collums.push({ field: 'arrivalCargoName', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'tariffContract', title: null, class: null });
        collums.push({ field: 'payerLocalName', title: null, class: null });
        collums.push({ field: 'arrivalOperatorAbbr', title: null, class: null });
        collums.push({ field: 'toDivisionAbbr', title: null, class: null });
        collums.push({ field: 'payerSenderCode', title: null, class: null });
        collums.push({ field: 'payerArrivalCode', title: null, class: null });
        collums.push({ field: 'dateOtpr', title: null, class: null });
        /*        collums.push({ field: 'arrivalUzVagonPays', title: null, class: null });*/
        collums.push({ field: 'arrivalUZDocumentPay', title: null, class: null });
        collums.push({ field: 'deffTariff', title: null, class: null });
        collums.push({ field: 'calcPayer', title: null, class: null });
        collums.push({ field: 'calcPayerUser', title: null, class: null });
        collums.push({ field: 'numActServices1', title: null, class: null });
        collums.push({ field: 'numActServices2', title: null, class: null });
        collums.push({ field: 'numActServices3', title: null, class: null });
        collums.push({ field: 'verification', title: null, class: null });
        collums.push({ field: 'verificationUser', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_services.prototype.init_columns_register_accepted_wagons = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'nomMainDoc', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'dateOtpr', title: null, class: null });
        collums.push({ field: 'dateAdoption', title: null, class: null });
        collums.push({ field: 'nameStnFrom', title: null, class: null });
        collums.push({ field: 'nameStnTo', title: null, class: null });
        collums.push({ field: 'arrivalCargoName', title: null, class: null });
        collums.push({ field: 'arrivalOperatorAbbr', title: null, class: null });
        collums.push({ field: 'toDivisionAbbr', title: null, class: null });
        collums.push({ field: 'payerSenderCode', title: null, class: null });
        collums.push({ field: 'payerArrivalCode', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'arrivalUzVagonPays', title: null, class: null });
        collums.push({ field: 'payerLocalName', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_services.prototype.init_columns_verification_invoices_wagons_arrival = function () {
        var collums = [];
        if (this.tab_com.settings.detali_table) collums.push({ field: 'details_control', title: null, class: null });
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'nomMainDoc', title: null, class: null });
        collums.push({ field: 'countVagon', title: null, class: null });
        collums.push({ field: 'tariffContract', title: null, class: null });
        collums.push({ field: 'numActServices1', title: null, class: null });
        collums.push({ field: 'arrivalUZDocumentPay', title: null, class: null });
        collums.push({ field: 'numActServices2', title: null, class: null });
        collums.push({ field: 'arrivalDeffTariff', title: null, class: null });
        collums.push({ field: 'numActServices3', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'nameStnFrom', title: null, class: null });
        collums.push({ field: 'nameStnTo', title: null, class: null });
        collums.push({ field: 'arrivalCargoName', title: null, class: null });
        collums.push({ field: 'payerLocalName', title: null, class: null });
        collums.push({ field: 'arrivalOperatorAbbr', title: null, class: null });
        collums.push({ field: 'toDivisionAbbr', title: null, class: null });
        collums.push({ field: 'payerSenderCode', title: null, class: null });
        collums.push({ field: 'payerArrivalCode', title: null, class: null });
        collums.push({ field: 'dateOtpr', title: null, class: null });
        collums.push({ field: 'dateAdoption', title: null, class: null });
        collums.push({ field: 'calcPayer', title: null, class: null });
        collums.push({ field: 'calcPayerUser', title: null, class: null });
        collums.push({ field: 'verification', title: null, class: null });
        collums.push({ field: 'verificationUser', title: null, class: null });

        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_services.prototype.init_columns_verification_invoices_detali_wagons_arrival = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        /*        collums.push({ field: 'dateOtpr', title: null, class: null });*/
        collums.push({ field: 'dateAdoption', title: null, class: null });
        collums.push({ field: 'arrivalCargoName', title: null, class: null });
        collums.push({ field: 'arrivalOperatorAbbr', title: null, class: null });
        collums.push({ field: 'toDivisionAbbr', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'arrivalUzVagonPays', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_services.prototype.init_columns_register_send_wagons = function () {
        var collums = [];
        if (this.tab_com.settings.detali_table) collums.push({ field: 'details_control', title: null, class: null });
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'nomDoc', title: null, class: null });
        collums.push({ field: 'countVagon', title: null, class: null });
        collums.push({ field: 'outgoingCargoName', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'outgoingUZDocumentPay', title: null, class: null });
        collums.push({ field: 'outgoingUZDocumentPayAdd', title: null, class: null });
        collums.push({ field: 'outgoingUZDocumentPayAll', title: null, class: null });
        collums.push({ field: 'outgoingtariffContract', title: null, class: null });
        collums.push({ field: 'outgoingDeffTariff', title: null, class: null });
        collums.push({ field: 'outgoingCodeStnFrom', title: null, class: null });
        collums.push({ field: 'outgoingNameStnFrom', title: null, class: null });
        collums.push({ field: 'outgoingCodeStnTo', title: null, class: null });
        collums.push({ field: 'outgoingNameStnTo', title: null, class: null });
        collums.push({ field: 'inlandrailwayAbbr', title: null, class: null });
        collums.push({ field: 'payerSenderCode', title: langView('tsrv_field_outgoing_payerSenderCode', App.Langs), class: null });
        collums.push({ field: 'payerSenderName', title: langView('tsrv_field_outgoing_payerSenderName', App.Langs), class: null });
        collums.push({ field: 'distanceWay', title: null, class: null });
        collums.push({ field: 'dateOutgoing', title: null, class: null });
        collums.push({ field: 'calcPayer', title: null, class: null });
        collums.push({ field: 'calcPayerUser', title: null, class: null });
        collums.push({ field: 'verification', title: null, class: null });
        collums.push({ field: 'verificationUser', title: null, class: null });

        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_services.prototype.init_columns_register_send_detali_wagons = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'dateOutgoing', title: null, class: null });
        collums.push({ field: 'outgoingCargoName', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'rodAbbr', title: null, class: null });
        collums.push({ field: 'kolConductor', title: null, class: null });
        collums.push({ field: 'outgoingUzVagonPays', title: null, class: null });
        collums.push({ field: 'outgoingUzVagonPaysAdd', title: null, class: null });
        collums.push({ field: 'outgoingUzVagonPaysAll', title: null, class: null });
        collums.push({ field: 'outgoingOperatorAbbr', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_services.prototype.init_columns_verification_invoices_wagons_outgoing = function () {
        var collums = [];
        if (this.tab_com.settings.detali_table) collums.push({ field: 'details_control', title: null, class: null });
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'nomDoc', title: null, class: null });
        collums.push({ field: 'countVagon', title: null, class: null });
        collums.push({ field: 'outgoingCargoName', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'outgoingUZDocumentPay', title: null, class: null });
        collums.push({ field: 'outgoingUZDocumentPayAdd', title: null, class: null });
        collums.push({ field: 'outgoingUZDocumentPayAll', title: null, class: null });
        collums.push({ field: 'outgoingtariffContract', title: null, class: null });

        collums.push({ field: 'numList', title: null, class: null });
        collums.push({ field: 'dateList', title: null, class: null });
        collums.push({ field: 'outgoingDeffTariff', title: null, class: null });

        //collums.push({ field: 'dateOtpr', title: null, class: null });
        collums.push({ field: 'dateOutgoing', title: null, class: null });
        collums.push({ field: 'outgoingCargoEtsngCode', title: null, class: null });

        collums.push({ field: 'outgoingCodeStnFrom', title: null, class: null });
        collums.push({ field: 'outgoingNameStnFrom', title: null, class: null });
        collums.push({ field: 'outgoingCodeStnTo', title: null, class: null });
        collums.push({ field: 'outgoingNameStnTo', title: null, class: null });
        collums.push({ field: 'outgoingOperatorAbbr', title: null, class: null });
        collums.push({ field: 'payerSenderCode', title: null, class: null });
        collums.push({ field: 'payerSenderName', title: null, class: null });
        collums.push({ field: 'calcPayer', title: null, class: null });
        collums.push({ field: 'calcPayerUser', title: null, class: null });
        collums.push({ field: 'verification', title: null, class: null });
        collums.push({ field: 'verificationUser', title: null, class: null });

        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_services.prototype.init_columns_verification_invoices_detali_wagons_outgoing = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'dateOutgoing', title: null, class: null });
        collums.push({ field: 'outgoingCargoName', title: null, class: null });
        collums.push({ field: 'outgoingCargoEtsngCode', title: null, class: null });
        collums.push({ field: 'vesg', title: null, class: null });
        collums.push({ field: 'outgoingOperatorAbbr', title: null, class: null });

        collums.push({ field: 'outgoingUzVagonPays', title: null, class: null });
        collums.push({ field: 'outgoingUzVagonPaysAdd', title: null, class: null });
        collums.push({ field: 'outgoingUzVagonPaysAll', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок  
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_services.prototype.init_type_report = function () {
        switch (this.tab_com.settings.type_report) {
            case 'cost_calculation': {
                //this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                //this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = false;
                this.tab_com.info = true;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.nomMainDoc); // data-num номер вагона
                    if (data.calcPayer !== null) {
                        if (data.numActServices1 === null && data.numActServices2 === null && data.numActServices3 === null) {
                            $(row).addClass('green');  // Отметим вагон заблокирован
                        } else {
                            $(row).addClass('red');  // Отметим вагон заблокирован
                        }
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_cost_calculation();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld(this.tab_com.settings.setup_buttons); //   this.init_button_req1892();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // 
            case 'register_accepted_wagons': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = false;
                this.tab_com.info = true;
                //this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                //this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                //this.tab_com.type_select_rows = 2; // Выбирать одну
                //this.tab_com.table_select = {
                //    style: 'multi'
                //};
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.payerLocalCode !== null) {
                        $(row).addClass('green');  // Отметим вагон заблокирован
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_register_accepted_wagons();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            //
            case 'verification_invoices_wagons_arrival': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 3;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [1, 'asc'];
                //this.tab_com.type_select_rows = 2; // Выбирать одну
                //this.tab_com.table_select = {
                //    style: 'multi'
                //};
                //scrollCollapse: true,
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = false;
                this.tab_com.footerCallback = function (tr, data, start, end, display) {
                    var api = this.api();
                    var count = api
                        .column(3)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(1)
                        .html(count);

                    var tariff_dog = api
                        .column(4)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(2)
                        .html(Number(tariff_dog).toFixed(2));

                    var tariff_doc = api
                        .column(6)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(4)
                        .html(Number(tariff_doc).toFixed(2));

                    var tariff_deff = api
                        .column(8)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(6)
                        .html(Number(tariff_deff).toFixed(2));

                    var vesg = api
                        .column(10)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(8)
                        .html(Number(vesg).toFixed(2));

                };
                this.tab_com.createdRow = function (row, data, index) {
                    //$(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.verification !== null) {
                        if (data.numActServices1 === null && data.numActServices2 === null && data.numActServices3 === null) {
                            $(row).addClass('yellow');  // Отметим вагон расчитан
                        } else {
                            $(row).addClass('green');  // Отметим вагон сверен
                        }
                    }
                }.bind(this);
                this.tab_com.drawCallback = this.tab_com.settings.fn_draw_callback;
                this.tab_com.initComplete = this.tab_com.settings.fn_init_complete;
                this.tab_com.table_columns = this.init_columns_verification_invoices_wagons_arrival();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr>' +
                    '<th colspan="3" class="text-end">ИТОГО:</th>' +
                    '<th class="text-center"></th>' +
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +
                    '<th colspan="14""></th>' +
                    '</tr></tfoot>';
                break;
            };
            //
            case 'verification_invoices_detali_wagons_arrival': {
                //this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                //this.tab_com.pageLength = 10;
                this.tab_com.deferRender = false;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = false;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                //this.tab_com.type_select_rows = 2; // Выбирать одну
                //this.tab_com.table_select = {
                //    style: 'multi'
                //};
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    //$(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    //if (data.calcPayer !== null) {
                    //    $(row).addClass('yellow');  // Отметим вагон расчитан
                    //}
                    //if (data.verification !== null) {
                    //    $(row).addClass('green');  // Отметим вагон сверен
                    //}
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_verification_invoices_detali_wagons_arrival();
                //this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'frtip';
                break;
            };
            //
            case 'register_send_wagons': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 3;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [1, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                //this.tab_com.table_select = {
                //    style: 'multi'
                //};
                this.tab_com.table_select = true;
                this.tab_com.autoWidth = true;
                this.tab_com.footerCallback = function (tr, data, start, end, display) {
                    var api = this.api();
                    var count = api
                        .column(3)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(1)
                        .html(count);

                    var vesg = api
                        .column(5)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(3)
                        .html(Number(vesg).toFixed(2));

                    var tariff_uz = api
                        .column(6)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(4)
                        .html(Number(tariff_uz).toFixed(2));

                    var tariff_uz_dop = api
                        .column(7)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(5)
                        .html(Number(tariff_uz_dop).toFixed(2));

                    var tariff_uz_all = api
                        .column(8)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(6)
                        .html(Number(tariff_uz_all).toFixed(2));

                    var tariff_dog = api
                        .column(9)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(7)
                        .html(Number(tariff_dog).toFixed(2));

                    var tariff_deff = api
                        .column(10)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(8)
                        .html(Number(tariff_deff).toFixed(2));
                };
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона

                    if (data.dateList === null) {
                        if (data.calcPayer !== null) {
                            if (data.tariffContract === null) {
                                $(row).addClass('yellow');  // Отметим вагон расчитан
                            } else {
                                $(row).addClass('green');  // Отметим вагон сверен
                            }
                        }
                    } else {
                        $(row).addClass('ban red');  // Отметим вагон заблокирован
                    }
                }.bind(this);
                this.tab_com.drawCallback = this.tab_com.settings.fn_draw_callback;
                this.tab_com.initComplete = this.tab_com.settings.fn_init_complete;
                this.tab_com.table_columns = this.init_columns_register_send_wagons();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr>' +
                    '<th colspan="3" class="text-end">ИТОГО:</th>' +
                    '<th class="text-center"></th>' +
                    '<th colspan="20" class="text-end"></th>' +
                    '</tr></tfoot>';
                break;
            };

            case 'register_send_detali_wagons': {
                //this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                //this.tab_com.pageLength = 10;
                this.tab_com.deferRender = false;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = false;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                //this.tab_com.type_select_rows = 2; // Выбирать одну
                //this.tab_com.table_select = {
                //    style: 'multi'
                //};
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    //$(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    //if (data.calcPayer !== null) {
                    //    $(row).addClass('yellow');  // Отметим вагон расчитан
                    //}
                    //if (data.verification !== null) {
                    //    $(row).addClass('green');  // Отметим вагон сверен
                    //}
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_register_send_detali_wagons();
                //this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'frtip';
                break;
            };
            //
            case 'verification_invoices_wagons_outgoing': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 3;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [1, 'asc'];
                //this.tab_com.type_select_rows = 2; // Выбирать одну
                //this.tab_com.table_select = {
                //    style: 'multi'
                //};
                //scrollCollapse: true,
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = false;
                this.tab_com.footerCallback = function (tr, data, start, end, display) {
                    var api = this.api();
                    var count = api
                        .column(3)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(1)
                        .html(count);
                    var vesg = api
                        .column(5)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(3)
                        .html(Number(vesg).toFixed(2));
                    var tariff_doc_001 = api
                        .column(6)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(4)
                        .html(Number(tariff_doc_001).toFixed(2));
                    var tariff_doc_dop = api
                        .column(7)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(5)
                        .html(Number(tariff_doc_dop).toFixed(2));
                    var tariff_doc_all = api
                        .column(8)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(6)
                        .html(Number(tariff_doc_all).toFixed(2));
                    var tariff_dog = api
                        .column(9)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(7)
                        .html(Number(tariff_dog).toFixed(2));
                    var tariff_deff = api
                        .column(12)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(10)
                        .html(Number(tariff_deff).toFixed(2));






                };
                this.tab_com.createdRow = function (row, data, index) {
                    //$(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.verification !== null) {
                        if (data.dateList === null) {
                            $(row).addClass('yellow');  // Отметим вагон расчитан
                        } else {
                            $(row).addClass('green');  // Отметим вагон сверен
                        }
                    }
                }.bind(this);
                this.tab_com.drawCallback = this.tab_com.settings.fn_draw_callback;
                this.tab_com.initComplete = this.tab_com.settings.fn_init_complete;
                this.tab_com.table_columns = this.init_columns_verification_invoices_wagons_outgoing();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr>' +
                    '<th colspan="3" class="text-end">ИТОГО:</th>' +
                    '<th class="text-center"></th>' + // кол
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +      // вес
                    '<th class="text-end"></th>' +      //
                    '<th class="text-end"></th>' +      //
                    '<th class="text-end"></th>' +      //
                    '<th class="text-end"></th>' +      //
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +
                    '<th class="text-end"></th>' +      //
                    '<th colspan="13""></th>' +
                    '</tr></tfoot>';
                break;
            };
            //
            case 'verification_invoices_detali_wagons_outgoing': {
                //this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                //this.tab_com.pageLength = 10;
                this.tab_com.deferRender = false;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = false;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                //this.tab_com.type_select_rows = 2; // Выбирать одну
                //this.tab_com.table_select = {
                //    style: 'multi'
                //};
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    //$(row).attr('id', data.id); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    //if (data.calcPayer !== null) {
                    //    $(row).addClass('yellow');  // Отметим вагон расчитан
                    //}
                    //if (data.verification !== null) {
                    //    $(row).addClass('green');  // Отметим вагон сверен
                    //}
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_verification_invoices_detali_wagons_outgoing();
                //this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'frtip';
                break;
            };

            default: {
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = true;
                this.tab_com.table_columns = this.tab_com.init_columns_default();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld();
                break;
            };
        }
    };
    // Инициализация
    table_services.prototype.init = function (options) {
        this.tab_com.init(options);
    };
    // Показать данные
    table_services.prototype.view = function (data, id_select) {
        this.tab_com.view(data, id_select);
        //this.tab_com.select_row(id_select);
    };

    table_services.prototype.select_row = function (id_select) {
        this.tab_com.select_row(id_select);
    };
    // Показать данные
    table_services.prototype.view_of_tag = function (data, tag, id_tag) {
        this.tab_com.view_of_tag(data, tag, id_tag);
    };

    table_services.prototype.select_tag_row = function (tag, id_tag) {
        this.tab_com.select_tag_row(tag, id_tag);
    };
    //
    //table_services.prototype.view_footer = function (data) {
    //    switch (this.settings.type_report) {
    //        //case 'req0002_train': {
    //        //    if (data) {
    //        //        var sum_count_wagon = 0;
    //        //        var sum_vesg = 0;
    //        //        $.each(data, function (i, el) {
    //        //            sum_count_wagon++;
    //        //            sum_vesg += el.ves_gruz ? Number(el.ves_gruz) : 0.00;
    //        //        });
    //        //    }
    //        //    this.obj_t_report.columns('.sum-nom-vag').every(function () {
    //        //        $(this.footer()).html(sum_count_wagon);
    //        //    });
    //        //    this.obj_t_report.columns('.sum-ves-gruz').every(function () {
    //        //        $(this.footer()).html(sum_vesg ? Number(sum_vesg).toFixed(2) : Number(0).toFixed(2));
    //        //    });
    //        //    break;
    //        //};
    //        //case 'req0002_result': {
    //        //    if (data) {
    //        //        var sum_count_wagon = 0;
    //        //        $.each(data, function (i, el) {
    //        //            sum_count_wagon += el.kol_vag ? el.kol_vag : 0;
    //        //        });
    //        //    }
    //        //    //this.obj_t_report.columns('.fl-kol_vag').every(function () {
    //        //    //    $(this.footer()).html(sum_count_wagon);
    //        //    //});
    //        //    //this.$table_cars_way.find('.sum-kol-vag').val(sum_count_wagon);
    //        //    $('td.sum-kol-vag').val(sum_count_wagon);
    //        //    break;
    //        //};
    //    };
    //};
    ////-------------------------------------------------------------------------------------------
    //// Очистить сообщения
    //table_services.prototype.out_clear = function () {
    //    if (this.settings.alert) {
    //        this.settings.alert.clear_message()
    //    }
    //}
    //// Показать ошибки
    //table_services.prototype.out_error = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_error_message(message)
    //    }
    //};
    //// Показать предупреждения
    //table_services.prototype.out_warning = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_warning_message(message)
    //    }
    //};
    //// Показать сообщения о выполнении действий
    //table_services.prototype.out_info = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_info_message(message)
    //    }
    //};
    // Очистить объект
    table_services.prototype.destroy = function () {
        //
        this.tab_com.destroy();
    };
    // Очистить детали по указаному пути
    table_services.prototype.destroy_detali = function (data) {
        this.tab_com.destroy_detali(data);
    };
    //
    App.table_services = table_services;

    window.App = App;
})(window);