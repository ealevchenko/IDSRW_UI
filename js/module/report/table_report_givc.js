/* ===============================================
-= Модуль библиотеки таблиц отчетов ГИЦ УЗ =-
  + js/view/shared/common.js
  + js/module/table_common.js
  + css/module/table_common.css
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
            't_mtr_field_gruz_detali_etsng': 'Код ЕТСНГ',
            't_mtr_field_gruz_detali_nvs': 'Груз ПРИБ',
            't_mtr_field_km': 'Расстояние от станции дислокации поезда до станции назначения (км).',
            't_mtr_field_ves_gruz': 'Вес груза (в кг)',
            't_mtr_field_mnkua_opv': 'Мнемокод операции с вагоном вне поезда',
            't_mtr_field_kol_vag': 'Количество вагонов в поезде ст. отправления',
            't_mtr_field_kol_vag_dor': 'Кл-во вагонов на дороге',
            't_mtr_field_st_otpr_detali_esr_otpr': 'Код ст. отправления',
            't_mtr_field_st_otpr_detali_n_rpus': 'Наименование ст. отправления',
            't_mtr_field_kod_grotp': 'Код грузоотправителя',
            't_mtr_field_mname_rv': 'Род вагона (мнемокод)',
            't_mtr_field_esr_form': 'Первая составляющая индекса поезда (код ЕСР станции формирования текущего индекса поезда)',
            't_mtr_field_esr_form1': 'Код станции формирования ',
            't_mtr_field_st_nazn_detali_n_rpus': 'Станция назначения',
            't_mtr_field_st_nazn_detali_esr_nazn_vag': 'Код станции назначения',
            't_mtr_field_n_dorus': 'Наименование железной дороги (сокращенное)',
            't_mtr_field_date_pogr': 'Дата погрузки',
            't_mtr_field_kod_grp': 'Код грузополучателя',
            't_mtr_field_nom_sost': 'Вторая составляющая индекса поезда (Номер склада текущего индекса поезда)',
            't_mtr_field_nom_sost1': '№ состава',
            't_mtr_field_date_op': 'Время совершения операции с объектом',
            't_mtr_field_date_op1': 'Дата операции',
            't_mtr_field_stan_detali_n_rpus': 'Станция совершения операции',
            't_mtr_field_stan_detali_esr_op': 'Код ЕСР станции совершения операции',
            't_mtr_field_prog_cha_prib': 'Прогнозное время прибытия',
            't_mtr_field_kod_dor': 'Код железной дороги',
            't_mtr_field_rod_vag': 'Код рода вагона',
            't_mtr_field_esr_nazn': 'Третья составляющая индекса поезда (код ЕСР станции назначения текущего индекса поезда)',
            't_mtr_field_esr_nazn1': 'Код станции назначения',
            't_mtr_field_pr_nrp': 'Признак вагонов нерабочего парка',
            't_mtr_field_cargo_group_name': 'Наименование груза',
            't_mtr_field_date_pogr_min_max': 'Дата погрузки',
            't_mtr_field_train_index': 'Индекс поезда',
            't_mtr_field_stan_railway_detali': 'Станция и дорога дислокации',
            't_mtr_field_loading_stations': 'Станции погрузки',
            't_mtr_field_st_disl_n_rpus': 'Станции дислокации грузов',
            't_mtr_field_pr_rol': 'Отметка о роликах',
            't_mtr_field_pr_marsh': 'Признак маршрута',
            't_mtr_field_prymitka': 'Примечание',
            't_mtr_field_ves_gruz': 'Вес груза',
            't_mtr_field_ves_tary_pogruzka': 'Вес тары',
            't_mtr_field_kol_plomb': 'Кол-во пломб',
            't_mtr_field_kod_prikr': 'Код прикрытия',
            't_mtr_field_esr_nazn_vag': 'код ст.назначения',
            't_mtr_field_nom_vag': '№ вагона',
            't_mtr_field_kol_zav_kont': 'Количество груженых контейнеров',
            't_mtr_field_esr_sd_ukr': 'Код пограничного пункта',
            't_mtr_field_kod_grp': 'Код грузополуч',
            't_mtr_field_por_nom': '№п/п',
            't_mtr_field_pr_negab': 'Призн. Негабарит.',
            't_mtr_field_etsng': 'Код ЕТСНГ',
            't_mtr_field_kod_adm_arc': 'Код Адм.',
            't_mtr_field_kol_por_kont': 'Количество пустых контейнеров',
            't_mtr_field_genus_wagon_abbr': 'Род.',
            't_mtr_field_operators_wagons_amkr_abbr': 'Оператор по АМКР.',
            't_mtr_field_owners_wagon_abbr': 'Собственник вагона.',
            't_mtr_field_operators_wagons_uz_abbr': 'Оператор УЗ',
            't_mtr_field_cargo_cargo_name': 'Груз ПРИБ',
            't_mtr_field_mn_park': 'Тип парка по нагрузке.',
            't_mtr_field_idf_op': 'Идентификатор операции.',
            't_mtr_field_date_inf': 'Время начала обработки информации.',
            't_mtr_field_code_op': 'Код операции с объектом.',
            't_mtr_field_code_op1': 'Код операции.',
            't_mtr_field_disl': 'Текущая дислокация.',
            't_mtr_field_tip_parka_teh_sost': 'Тип парка техническое состояние.',
            't_mtr_field_sost_pogr_pp': 'Состояние вагона на подъездном пути.',
            't_mtr_field_nom_p': 'Четвертая составляющая индекса поезда (Номер поезда создание текущего индекса поезда)',
            't_mtr_field_nom_p1': '№ поезда',
            't_mtr_field_esr_op': 'Код ЕСР станции совершения операции',
            't_mtr_field_esr_op1': 'Код станции дислокации',
            't_mtr_field_wagon_operations_uz_name_op': 'Наименование  операции с вагоном вне поезда',
            't_mtr_field_mnk_esr_op': 'Станция дислокации',
            't_mtr_field_mnk_op': 'Операция с вагоном',
            't_mtr_field_mnk_esr_nazn': 'Станция назначения',
            't_mtr_field_esr_otpr': 'Код станции отправления',
            't_mtr_field_mnk_esr_otpr': 'Станция отправления',
            't_mtr_field_date_otpr': 'Дата отправления',
            't_mtr_field_docnom': '№ жд накладной',

        },
        'en':  //default language: English
        {
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var TAB_COMMON = App.table_common; // Общий модуль таблиц*/

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_report_givc(selector) {
        this.tab_com = new TAB_COMMON({
            selector: selector,
            fn_init_type_report: this.init_type_report.bind(this),
        });
        // Перечень полей
        var list_collums = [
            // +++ req1892.disl_vag_detali
            {
                field: 'gruz_detali_etsng',
                data: function (row, type, val, meta) {
                    return row.gruz !== null ? row.gruz.etsng : null;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_gruz_detali_etsng', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'gruz_detali_nvs',
                data: function (row, type, val, meta) {
                    if (row.gruz_nvs) {
                        return row.gruz_nvs;
                    } else {
                        return row.gruz !== null ? row.gruz.nvs : null;
                    }

                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_gruz_detali_nvs', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'km',
                data: function (row, type, val, meta) {
                    return row.km;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_km', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'ves_gruz',
                data: function (row, type, val, meta) {
                    return row.ves_gruz ? Number(row.ves_gruz).toFixed(2) : 0.00;
                },
                className: 'dt-body-right',
                title: langView('t_mtr_field_ves_gruz', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'mnkua_opv',
                data: function (row, type, val, meta) {
                    return row.mnkua_opv;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_mnkua_opv', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'kol_vag',
                data: function (row, type, val, meta) {
                    return row.kol_vag;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kol_vag', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kol_vag_dor',
                data: function (row, type, val, meta) {
                    return row.kol_vag_dor;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kol_vag_dor', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'st_otpr_detali_esr_otpr',
                data: function (row, type, val, meta) {
                    return row.st_otpr !== null ? row.st_otpr.esr_otpr : null;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_st_otpr_detali_esr_otpr', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'st_otpr_detali_n_rpus',
                data: function (row, type, val, meta) {
                    if (row.st_otpr_n_rpus) {
                        return row.st_otpr_n_rpus
                    } else {
                        return row.st_otpr && row.st_otpr.n_rpus ? row.st_otpr.n_rpus : null;
                    }
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('t_mtr_field_st_otpr_detali_n_rpus', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'loading_stations',
                data: function (row, type, val, meta) {
                    return row.loading_stations !== null ? row.loading_stations : null;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_loading_stations', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'kod_grotp',
                data: function (row, type, val, meta) {
                    return row.kod_grotp;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kod_grotp', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'mname_rv',
                data: function (row, type, val, meta) {
                    return row.mname_rv;
                },
                className: 'dt-body-left shorten mw-50',
                title: langView('t_mtr_field_mname_rv', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'esr_form',
                data: function (row, type, val, meta) {
                    return row.esr_form;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_esr_form', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'st_nazn_detali_n_rpus',
                data: function (row, type, val, meta) {
                    return row.st_nazn !== null ? row.st_nazn.n_rpus : null;
                },
                className: 'dt-body-center shorten mw-100',
                title: langView('t_mtr_field_st_nazn_detali_n_rpus', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'st_nazn_detali_esr_nazn_vag',
                data: function (row, type, val, meta) {
                    return row.st_nazn !== null ? row.st_nazn.esr_nazn_vag : null;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_st_nazn_detali_esr_nazn_vag', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'n_dorus',
                data: function (row, type, val, meta) {
                    return row.n_dorus;
                },
                className: 'dt-body-left shorten mw-50',
                title: langView('t_mtr_field_n_dorus', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'date_pogr',
                data: function (row, type, val, meta) {
                    return row.date_pogr;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_date_pogr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'kod_grp',
                data: function (row, type, val, meta) {
                    return row.kod_grp;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kod_grp', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'nom_sost',
                data: function (row, type, val, meta) {
                    return row.nom_sost;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_nom_sost', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'date_op',
                data: function (row, type, val, meta) {
                    return row.date_op;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_date_op', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'stan_detali_n_rpus',
                data: function (row, type, val, meta) {
                    return row.stan !== null ? row.stan.n_rpus : null;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_stan_detali_n_rpus', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'stan_detali_esr_op',
                data: function (row, type, val, meta) {
                    return row.stan !== null ? row.stan.esr_op : null;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_stan_detali_esr_op', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'prog_cha_prib',
                data: function (row, type, val, meta) {
                    return row.prog_cha_prib;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_prog_cha_prib', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'kod_dor',
                data: function (row, type, val, meta) {
                    return row.kod_dor;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kod_dor', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'rod_vag',
                data: function (row, type, val, meta) {
                    return row.rod_vag;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_rod_vag', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'esr_nazn',
                data: function (row, type, val, meta) {
                    return row.esr_nazn;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_esr_nazn', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'pr_nrp',
                data: function (row, type, val, meta) {
                    return row.pr_nrp;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_pr_nrp', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // --- END req1892.disl_vag_detali
            // +++ req0002 - Справки
            {
                field: 'cargo_group_name',
                data: function (row, type, val, meta) {
                    return row.cargo_group_name;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('t_mtr_field_cargo_group_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'date_pogr_min_max',
                data: function (row, type, val, meta) {
                    var dt_start = row.date_pogr_min ? moment(row.date_pogr_min).format(format_date) + ' - ' : '';
                    var dt_stop = row.date_pogr_max ? moment(row.date_pogr_max).format(format_date) : '';
                    if (row.date_pogr_min !== row.date_pogr_max) {
                        return dt_start + dt_stop;
                    } else {
                        return dt_stop;
                    }
                },
                className: 'dt-body-center shorten mw-150',
                title: langView('t_mtr_field_date_pogr_min_max', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'train_index',
                data: function (row, type, val, meta) {
                    return row.esr_form && row.nom_sost && row.esr_nazn ? row.esr_form.slice(0, 4) + '-' + row.nom_sost + '-' + row.esr_nazn.slice(0, 4) : null;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('t_mtr_field_train_index', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'stan_railway_detali',
                data: function (row, type, val, meta) {
                    return row.stan_railway_detali;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('t_mtr_field_stan_railway_detali', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'st_disl_n_rpus',
                data: function (row, type, val, meta) {
                    return row.st_disl_n_rpus !== null ? row.st_disl_n_rpus : null;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_st_disl_n_rpus', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // --- END req0002 - Справки
            // +++ req0002.info_fraza_detali
            {
                field: 'pr_rol',
                data: function (row, type, val, meta) {
                    return row.pr_rol;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_pr_rol', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'pr_marsh',
                data: function (row, type, val, meta) {
                    return row.pr_marsh;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_pr_marsh', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'prymitka',
                data: function (row, type, val, meta) {
                    return row.prymitka;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_prymitka', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'ves_gruz',
                data: function (row, type, val, meta) {
                    return row.ves_gruz;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_ves_gruz', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'ves_tary_pogruzka',
                data: function (row, type, val, meta) {
                    return row.ves_tary_pogruzka;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_ves_tary_pogruzka', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kol_plomb',
                data: function (row, type, val, meta) {
                    return row.kol_plomb;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kol_plomb', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kod_prikr',
                data: function (row, type, val, meta) {
                    return row.kod_prikr;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kod_prikr', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'esr_nazn_vag',
                data: function (row, type, val, meta) {
                    return row.esr_nazn_vag;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_esr_nazn_vag', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'nom_vag',
                data: function (row, type, val, meta) {
                    return row.nom_vag;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_nom_vag', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kol_zav_kont',
                data: function (row, type, val, meta) {
                    return row.kol_zav_kont;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kol_zav_kont', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'esr_sd_ukr',
                data: function (row, type, val, meta) {
                    return row.esr_sd_ukr;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_esr_sd_ukr', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kod_grp',
                data: function (row, type, val, meta) {
                    return row.kod_grp;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kod_grp', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'por_nom',
                data: function (row, type, val, meta) {
                    return row.por_nom;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_por_nom', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'pr_negab',
                data: function (row, type, val, meta) {
                    return row.pr_negab;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_pr_negab', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'etsng',
                data: function (row, type, val, meta) {
                    return row.etsng;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_etsng', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kod_adm_arc',
                data: function (row, type, val, meta) {
                    return row.kod_adm_arc;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kod_adm_arc', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'kol_por_kont',
                data: function (row, type, val, meta) {
                    return row.kol_por_kont;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_kol_por_kont', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // --- END req0002.info_fraza_detali
            // +++ req0002_train
            {
                field: 'genus_wagon_abbr',
                data: function (row, type, val, meta) {
                    return row.GenusWagon && row.GenusWagon['abbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_genus_wagon_abbr', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'operators_wagons_amkr_abbr',
                data: function (row, type, val, meta) {
                    return row.OperatorsWagonsAMKR && row.OperatorsWagonsAMKR['abbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_operators_wagons_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'owners_wagon_abbr',
                data: function (row, type, val, meta) {
                    return row.OwnersWagon && row.OwnersWagon['abbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_owners_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'operators_wagons_uz_abbr',
                data: function (row, type, val, meta) {
                    return row.OperatorsWagonsUZ && row.OperatorsWagonsUZ['abbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_operators_wagons_uz_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'cargo_cargo_name',
                data: function (row, type, val, meta) {
                    return row.Cargo && row.Cargo['cargoName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_cargo_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // --- END req0002_train
            // +++ req8858_train
            {
                field: 'mn_park',
                data: function (row, type, val, meta) {
                    return row.mn_park;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_mn_park', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'idf_op',
                data: function (row, type, val, meta) {
                    return row.idf_op;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_idf_op', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'date_inf',
                data: function (row, type, val, meta) {
                    return row.date_inf ? moment(row.date_inf, format_datetime_ru).format(format_datetime) : '';
                },
                className: 'dt-body-center shorten mw-100',
                title: langView('t_mtr_field_date_inf', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'code_op',
                data: function (row, type, val, meta) {
                    return row.code_op;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_code_op', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'disl',
                data: function (row, type, val, meta) {
                    return row.disl;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_disl', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'tip_parka_teh_sost',
                data: function (row, type, val, meta) {
                    return row.tip_parka_teh_sost;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_tip_parka_teh_sost', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'sost_pogr_pp',
                data: function (row, type, val, meta) {
                    return row.sost_pogr_pp;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_sost_pogr_pp', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'nom_p',
                data: function (row, type, val, meta) {
                    return row.nom_p;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_nom_p', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'esr_op',
                data: function (row, type, val, meta) {
                    return row.esr_op;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_esr_op', App.Langs), width: "50px", orderable: true, searchable: true
            },

            // --- END req8858_train
            {
                field: 'wagon_operations_uz_name_op',
                data: function (row, type, val, meta) {
                    return row.WagonOperationsUz ? row.WagonOperationsUz.nameOp : null;
                },
                className: 'dt-body-left shorten mw-200',
                title: langView('t_mtr_field_wagon_operations_uz_name_op', App.Langs), width: "200px", orderable: true, searchable: true
            },
            // +++ regDisvag
            {
                field: 'mnk_esr_op',
                data: function (row, type, val, meta) {
                    return row.mnk_esr_op;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_mnk_esr_op', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'mnk_op',
                data: function (row, type, val, meta) {
                    return row.mnk_op;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_mnk_op', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'mnk_esr_nazn',
                data: function (row, type, val, meta) {
                    return row.mnk_esr_nazn;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_mnk_esr_nazn', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'esr_otpr',
                data: function (row, type, val, meta) {
                    return row.esr_otpr;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_esr_otpr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'mnk_esr_otpr',
                data: function (row, type, val, meta) {
                    return row.mnk_esr_otpr;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('t_mtr_field_mnk_esr_otpr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'date_otpr',
                data: function (row, type, val, meta) {
                    return row.date_otpr ? moment(row.date_otpr, format_datetime_ru).format(format_datetime) : '';
                },
                className: 'dt-body-center shorten mw-100',
                title: langView('t_mtr_field_date_otpr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'docnom',
                data: function (row, type, val, meta) {
                    return row.docnom;
                },
                className: 'dt-body-center',
                title: langView('t_mtr_field_docnom', App.Langs), width: "50px", orderable: true, searchable: true
            },

            //
            // --- END regDisvag
        ];
        this.tab_com.list_collums = this.tab_com.list_collums.concat(list_collums);
        // Перечень кнопок
        var list_buttons = [];
        this.tab_com.list_buttons = this.tab_com.list_buttons.concat(list_buttons);
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей req1892
    table_report_givc.prototype.init_columns_req1892 = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        collums.push({ field: 'gruz_detali_etsng', title: null, class: null });
        collums.push({ field: 'gruz_detali_nvs', title: null, class: null });
        collums.push({ field: 'km', title: null, class: null });
        collums.push({ field: 'ves_gruz', title: null, class: null });
        collums.push({ field: 'mnkua_opv', title: null, class: null });
        collums.push({ field: 'kol_vag', title: null, class: null });
        collums.push({ field: 'st_otpr_detali_esr_otpr', title: null, class: null });
        collums.push({ field: 'st_otpr_detali_n_rpus', title: null, class: null });
        collums.push({ field: 'kod_grotp', title: null, class: null });
        collums.push({ field: 'mname_rv', title: null, class: null });
        collums.push({ field: 'esr_form', title: null, class: null });
        collums.push({ field: 'st_nazn_detali_n_rpus', title: null, class: null });
        collums.push({ field: 'st_nazn_detali_esr_nazn_vag', title: null, class: null });
        collums.push({ field: 'n_dorus', title: null, class: null });
        collums.push({ field: 'date_pogr', title: null, class: null });
        collums.push({ field: 'kod_grp', title: null, class: null });
        collums.push({ field: 'nom_sost', title: null, class: null });
        collums.push({ field: 'date_op', title: null, class: null });
        collums.push({ field: 'stan_detali_n_rpus', title: null, class: null });
        collums.push({ field: 'stan_detali_esr_op', title: null, class: null });
        collums.push({ field: 'prog_cha_prib', title: null, class: null });
        collums.push({ field: 'kod_dor', title: null, class: null });
        collums.push({ field: 'rod_vag', title: null, class: null });
        collums.push({ field: 'esr_nazn', title: null, class: null });
        collums.push({ field: 'pr_nrp', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей req1892_formed_routes
    table_report_givc.prototype.init_columns_req1892_formed_routes = function () {
        var collums = [];
        collums.push({ field: 'cargo_group_name', title: null, class: null });
        collums.push({ field: 'st_otpr_detali_n_rpus', title: null, class: null });
        collums.push({ field: 'kol_vag', title: null, class: null });
        collums.push({ field: 'date_pogr_min_max', title: null, class: null });
        collums.push({ field: 'train_index', title: null, class: null });
        collums.push({ field: 'mnkua_opv', title: null, class: null });
        collums.push({ field: 'stan_railway_detali', title: null, class: null });
        collums.push({ field: 'date_op', title: null, class: null });
        collums.push({ field: 'loading_stations', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей req1892_total_cargo
    table_report_givc.prototype.init_columns_req1892_total_cargo = function () {
        var collums = [];
        collums.push({ field: 'gruz_detali_nvs', title: null, class: null });
        collums.push({ field: 'st_otpr_detali_n_rpus', title: null, class: null });
        collums.push({ field: 'kol_vag', title: null, class: null });
        collums.push({ field: 'kol_vag_dor', title: null, class: null });
        collums.push({ field: 'n_dorus', title: null, class: null });
        collums.push({ field: 'st_disl_n_rpus', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей req0002
    table_report_givc.prototype.init_columns_req0002 = function () {
        var collums = [];
        collums.push({ field: 'pr_rol', title: null, class: null });
        collums.push({ field: 'pr_marsh', title: null, class: null });
        collums.push({ field: 'prymitka', title: null, class: null });
        collums.push({ field: 'ves_gruz', title: null, class: null });
        collums.push({ field: 'ves_tary_pogruzka', title: null, class: null });
        collums.push({ field: 'kol_plomb', title: null, class: null });
        collums.push({ field: 'kod_prikr', title: null, class: null });
        collums.push({ field: 'esr_nazn_vag', title: null, class: null });
        collums.push({ field: 'nom_vag', title: null, class: null });
        collums.push({ field: 'kol_zav_kont', title: null, class: null });
        collums.push({ field: 'esr_sd_ukr', title: null, class: null });
        collums.push({ field: 'kod_grp', title: null, class: null });
        collums.push({ field: 'por_nom', title: null, class: null });
        collums.push({ field: 'pr_negab', title: null, class: null });
        collums.push({ field: 'etsng', title: null, class: null });
        collums.push({ field: 'kod_adm_arc', title: null, class: null });
        collums.push({ field: 'kol_por_kont', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей req0002_train
    table_report_givc.prototype.init_columns_req0002_train = function () {
        var collums = [];
        collums.push({ field: 'por_nom', title: null, class: null });
        collums.push({ field: 'nom_vag', title: null, class: null });
        collums.push({ field: 'kod_adm_arc', title: null, class: null });
        collums.push({ field: 'genus_wagon_abbr', title: null, class: null });
        collums.push({ field: 'operators_wagons_amkr_abbr', title: null, class: null });
        collums.push({ field: 'etsng', title: null, class: null });
        collums.push({ field: 'cargo_cargo_name', title: null, class: null });
        collums.push({ field: 'ves_gruz', title: null, class: null });
        collums.push({ field: 'esr_nazn_vag', title: null, class: null });
        collums.push({ field: 'kod_grp', title: null, class: null });
        collums.push({ field: 'owners_wagon_abbr', title: null, class: null });
        collums.push({ field: 'operators_wagons_uz_abbr', title: null, class: null });

        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей req0002_result
    table_report_givc.prototype.init_columns_req0002_result = function () {
        var collums = [];
        collums.push({ field: 'cargo_cargo_name', title: null, class: null });
        collums.push({ field: 'operators_wagons_amkr_abbr', title: null, class: null });
        collums.push({ field: 'kol_vag', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей req8858
    table_report_givc.prototype.init_columns_req8858 = function () {
        var collums = [];
        collums.push({ field: 'prymitka', title: null, class: null });
        collums.push({ field: 'mn_park', title: null, class: null });
        collums.push({ field: 'ves_gruz', title: null, class: null });
        collums.push({ field: 'mnkua_opv', title: null, class: null });
        collums.push({ field: 'idf_op', title: null, class: null });
        collums.push({ field: 'esr_form', title: null, class: null });
        collums.push({ field: 'esr_nazn_vag', title: null, class: null });
        collums.push({ field: 'nom_vag', title: null, class: null });
        collums.push({ field: 'date_inf', title: null, class: null });
        collums.push({ field: 'code_op', title: null, class: null });
        collums.push({ field: 'disl', title: null, class: null });
        collums.push({ field: 'tip_parka_teh_sost', title: null, class: null });
        collums.push({ field: 'kod_grp', title: null, class: null });
        collums.push({ field: 'nom_sost', title: null, class: null });
        collums.push({ field: 'date_op', title: null, class: null });
        collums.push({ field: 'etsng', title: null, class: null });
        collums.push({ field: 'esr_nazn', title: null, class: null });
        collums.push({ field: 'nom_p', title: null, class: null });
        collums.push({ field: 'esr_op', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей req8858_train
    table_report_givc.prototype.init_columns_req8858_train = function () {
        var collums = [];
        collums.push({ field: 'date_op', title: null, class: null });
        collums.push({ field: 'mnkua_opv', title: null, class: null });
        collums.push({ field: 'wagon_operations_uz_name_op', title: null, class: null });
        collums.push({ field: 'esr_op', title: null, class: null });
        //
        collums.push({ field: 'train_index', title: null, class: null });
        collums.push({ field: 'esr_nazn_vag', title: null, class: null });
        collums.push({ field: 'kod_grp', title: null, class: null });
        collums.push({ field: 'sost_pogr_pp', title: null, class: null });
        collums.push({ field: 'etsng', title: null, class: null });
        collums.push({ field: 'cargo_cargo_name', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей reqDisvag
    table_report_givc.prototype.init_columns_reqDisvag = function () {
        var collums = [];
        collums.push({ field: 'esr_op', title: langView('t_mtr_field_esr_op1', App.Langs), class: null });
        collums.push({ field: 'mnk_esr_op', title: null, class: null });
        collums.push({ field: 'date_op', title: langView('t_mtr_field_date_op1', App.Langs), class: null });
        collums.push({ field: 'code_op', title: langView('t_mtr_field_code_op1', App.Langs), class: null });
        collums.push({ field: 'mnk_op', title: null, class: null });
        collums.push({ field: 'nom_p', title: langView('t_mtr_field_nom_p1', App.Langs), class: null });
        collums.push({ field: 'esr_form', title: langView('t_mtr_field_esr_form1', App.Langs), class: null });
        collums.push({ field: 'nom_sost', title: langView('t_mtr_field_nom_sost1', App.Langs), class: null });
        collums.push({ field: 'esr_nazn', title: langView('t_mtr_field_esr_nazn1', App.Langs), class: null });
        collums.push({ field: 'nom_vag', title: null, class: null });
        collums.push({ field: 'ves_gruz', title: null, class: null });
        collums.push({ field: 'esr_nazn_vag', title: null, class: null });
        collums.push({ field: 'mnk_esr_nazn', title: null, class: null });
        collums.push({ field: 'etsng', title: null, class: null });
        collums.push({ field: 'kod_grp', title: null, class: null });
        collums.push({ field: 'kod_grotp', title: null, class: null });
        collums.push({ field: 'esr_otpr', title: null, class: null });
        collums.push({ field: 'mnk_esr_otpr', title: null, class: null });
        collums.push({ field: 'date_otpr', title: null, class: null });
        collums.push({ field: 'docnom', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    // инициализация полей reqDisvag_sheet
    table_report_givc.prototype.init_columns_reqDisvag_sheet = function () {
        var collums = [];
        collums.push({ field: 'nom_sost', title: langView('t_mtr_field_nom_sost1', App.Langs), class: null });
        collums.push({ field: 'kol_vag', title: null, class: null });
        collums.push({ field: 'cargo_cargo_name', title: null, class: null });
        collums.push({ field: 'mnk_esr_op', title: null, class: null });
        collums.push({ field: 'date_op', title: langView('t_mtr_field_date_op1', App.Langs), class: null });
        collums.push({ field: 'wagon_operations_uz_name_op', title: null, class: null });
        //
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_report_givc.prototype.init_type_report = function () {
        switch (this.tab_com.settings.type_report) {
            case 'req1892': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = true;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    if (data.stan.esr_op === 467004 || data.stan.esr_op === 467201 || data.stan.esr_op === 467108) {
                        $(row).addClass('green');
                    } else if (data.kod_dor === 45) {
                        $(row).addClass('yellow');
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_req1892();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag(); //   this.init_button_req1892();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'req1892_formed_routes': {
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    if (data.stan_esr_op === 467004 || data.stan_esr_op === 467201 || data.stan_esr_op === 467108) {
                        $(row).addClass('green');
                    } else if (data.kod_dor === 45) {
                        $(row).addClass('yellow');
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_req1892_formed_routes();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref(); //this.init_button_req1892_formed_routes();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'req1892_total_cargo': {
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    if (data.stan_esr_op === 467004 || data.stan_esr_op === 467201 || data.stan_esr_op === 467108) {
                        $(row).addClass('green');
                    } else if (data.kod_dor === 45) {
                        $(row).addClass('yellow');
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_req1892_total_cargo();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref(); //this.init_button_req1892_total_cargo();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'req0002': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.table_columns = this.init_columns_req0002();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag(); // this.init_button_req0002();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'req0002_train': {
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.footerCallback = function (tr, data, start, end, display) {
                    var api = this.api();
                    var total = api
                        .column(7)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    var count = api
                        .column(7)
                        .data()
                        .reduce(function (a, b) {
                            if (b) {
                                return a += 1;
                            } else return a;
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(1)
                        .html(count);
                    $(tr)
                        .find('th span')
                        .eq(3)
                        .html(Number(total).toFixed(2));
                };
                this.tab_com.table_columns = this.init_columns_req0002_train();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref(); //this.init_button_req0002_train();
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr><th class="dt-right">ИТОГО:</th><th class="dt-head-center"></th><th colspan="5"></th><th class="dt-head-right"></th><th colspan="4"></th></tr></tfoot>';
                break;
            };
            case 'req0002_result': {
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.footerCallback = function (tr, data, start, end, display) {
                    var api = this.api();
                    var count = api
                        .column(2)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(1)
                        .html(count);
                };
                this.tab_com.table_columns = this.init_columns_req0002_result();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref(); //this.init_button_req0002_result();
                this.tab_com.dom = 'Brtlip';
                this.tab_com.html_footer = '<tfoot><tr><th colspan="2" class="dt-right">ИТОГО:</th><th class="dt-head-center"></th></tr></tfoot>';
                break;
            };
            case 'req8858': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.table_columns = this.init_columns_req8858();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag(); // this.init_button_req0002();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'req8858_train': {
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.table_columns = this.init_columns_req8858_train();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref(); //this.init_button_req0002_train();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'reqDisvag': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.table_columns = this.init_columns_reqDisvag();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag(); // this.init_button_req0002();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'reqDisvag_sheet': {
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.table_columns = this.init_columns_reqDisvag_sheet();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref(); //this.init_button_req0002_train();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Таблица составы по умолчанию (если не выставят тип отчета)
            default: {
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 0;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = true;
                this.tab_com.table_columns = this.tab_com.init_columns_default();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld(); //this.tab_com.init_button_default();
                break;
            };
        }
    };
    // Инициализация
    table_report_givc.prototype.init = function (options) {
        this.tab_com.init(options);
    };
    // Показать данные
    table_report_givc.prototype.view = function (data, id_select) {
        this.tab_com.view(data, id_select);
    };
    //
    //table_report_givc.prototype.view_footer = function (data) {
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
    //        //    //this.$table_report_givc.find('.sum-kol-vag').val(sum_count_wagon);
    //        //    $('td.sum-kol-vag').val(sum_count_wagon);
    //        //    break;
    //        //};
    //    };
    //};
    ////-------------------------------------------------------------------------------------------
    //// Очистить сообщения
    //table_report_givc.prototype.out_clear = function () {
    //    if (this.settings.alert) {
    //        this.settings.alert.clear_message()
    //    }
    //}
    //// Показать ошибки
    //table_report_givc.prototype.out_error = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_error_message(message)
    //    }
    //};
    //// Показать предупреждения
    //table_report_givc.prototype.out_warning = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_warning_message(message)
    //    }
    //};
    //// Показать сообщения о выполнении действий
    //table_report_givc.prototype.out_info = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_info_message(message)
    //    }
    //};
    // Очистить объект
    table_report_givc.prototype.destroy = function () {
        //
        this.tab_com.destroy();
    };
    // Очистить детали по указаному пути
    table_report_givc.prototype.destroy_detali = function (data) {
        this.tab_com.destroy_detali(data);
    };
    //
    App.table_report_givc = table_report_givc;

    window.App = App;
})(window);