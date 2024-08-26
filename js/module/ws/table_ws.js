/* ===============================================
-= Модуль библиотеки таблицы АРМа диспетчера =-
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
            'tws_field_position': '№ поз.',
            'tws_field_num': '№ вагона',
            'tws_field_operator_abbr': 'Оператор',
            'tws_field_limiting_abbr': 'Огран.',
            'tws_field_owner_wagon_abbr': 'Собст. УЗ',
            'tws_field_operator_paid': 'Приз. платн.',
            'tws_field_wagon_rod_abbr': 'Род',
            'tws_field_wagon_type': 'Тип вагона',
            'tws_field_arrival_condition_abbr': 'Разм.',
            'tws_field_current_condition_abbr': 'Разм. тек.',
            'tws_field_wagon_date_rem_uz': 'Рем. УЗ',
            'tws_field_wagon_gruzp_doc': 'ГП, тн (док.)',
            'tws_field_wagon_gruzp_uz': 'ГП, тн (УЗ.)',
            'tws_field_wagon_adm': 'Адм.',
            'tws_field_wagon_adm_name': 'Адм.',
            'tws_field_wagon_adm_abbr': 'Адм.',
            'tws_field_arrival_cargo_group_name': 'Группа груза',
            'tws_field_arrival_cargo_name': 'Груз ПРИБ',
            'tws_field_arrival_sertification_data': 'Сертиф. данные',
            'tws_field_arrival_id_commercial_condition': 'id ком. сост.',
            'tws_field_arrival_commercial_condition': 'Комм. сост.',
            'tws_field_arrival_station_from_code': 'Код. ст. отпр.',
            'tws_field_arrival_station_from_name': 'Стан. отправ.',
            'tws_field_arrival_shipper_code': 'Код отпр.',
            'tws_field_arrival_shipper_name': 'Отправитель',
            'tws_field_arrival_station_amkr_name': 'Стан. назн. АМКР',
            'tws_field_arrival_division_amkr_abbr': 'Цех получ.',
            'tws_field_current_loading_status': 'Статус',
            'tws_field_current_wagon_busy': 'Занят (операция)',
            'tws_field_current_operation_name': 'Последняя операция над вагоном',
            'tws_field_current_operation_start': 'Дата начала выполнения операции',
            'tws_field_current_operation_end': 'Дата окончания выполнения операции',
            'tws_field_arrival_duration': 'Простой  УЗ, час',
            'tws_field_arrival_idle_time': 'Норма, час',
            'tws_field_arrival_usage_fee': 'Плата на текущий момент, грн',
            'tws_field_current_station_indicator': 'Инд.',
            'tws_field_current_station_idle_time': 'Норма ст., ч',
            'tws_field_current_station_duration': 'Факт ст., ч',
            'tws_field_current_way_duration': 'Факт путь, ч',
            'tws_field_instructional_letters_num': '№ письма',
            'tws_field_instructional_letters_datetime': 'Дата письма',
            'tws_field_instructional_letters_station_code': 'Код ст. наз.',
            'tws_field_instructional_letters_station_name': 'Станция назначения',
            'tws_field_instructional_letters_note': 'Текст',
            'tws_field_sap_incoming_supply_cargo_ban': 'Вх. пост. Запрет',
            'tws_field_sap_incoming_supply_num': 'Вх. пост. №',
            'tws_field_sap_incoming_supply_date': 'Вх. пост. дата созд.',
            'tws_field_sap_incoming_supply_time': 'Вх. пост. время созд.',
            'tws_field_sap_incoming_supply_cargo_code': 'Вх. пост. Код мат.',
            'tws_field_sap_incoming_supply_cargo_name': 'Вх. пост. материал (груз)',
            'tws_field_sap_incoming_supply_warehouse_code': 'Вх. пост. склад',
            'tws_field_sap_incoming_supply_warehouse_name': 'Вх. пост. Наименование склада',
            'tws_field_sap_outgoing_supply_num': 'Исх. пост. №',
            'tws_field_sap_outgoing_supply_date': 'Исх. пост. дата созд.',
            'tws_field_sap_outgoing_supply_cargo_code': 'Исх. пост. Код ЕТСНГ',
            'tws_field_sap_outgoing_supply_cargo_name': 'Исх. пост. Наименование груза',
            'tws_field_sap_outgoing_supply_shipper_code': 'Исх. пост. Код получателя',
            'tws_field_sap_outgoing_supply_shipper_name': 'Исх. пост. Получатель',
            'tws_field_sap_outgoing_supply_destination_station_code': 'Исх. пост. Код станции назначения',
            'tws_field_sap_outgoing_supply_destination_station_name': 'Исх. пост. Станция назначения',
            'tws_field_sap_outgoing_supply_border_checkpoint_code': 'Исх. пост. Код погранперехода',
            'tws_field_sap_outgoing_supply_border_checkpoint_name': 'Исх. пост. Погранпереход',
            'tws_field_sap_outgoing_supply_netto': 'Исх. пост. Вес нетто',
            'tws_field_sap_outgoing_supply_warehouse_code': 'Исх. пост. склад',
            'tws_field_sap_outgoing_supply_warehouse_name': 'Исх. пост. Наименование склада',
            'tws_field_sap_outgoing_supply_responsible_post': 'Исх. пост. Долж. отв. за погрузку',
            'tws_field_sap_outgoing_supply_responsible_fio': 'Исх. пост. ФИО отв. за погрузку',
            'tws_field_sap_outgoing_supply_payer_code': 'Исх. пост. Код плательщик',
            'tws_field_sap_outgoing_supply_payer_name': 'Исх. пост. Плательщик',
            'tws_field_wagon_brutto_doc': 'Брутто по ЭПД, тн',
            'tws_field_wagon_brutto_amkr': 'Брутто АМКР, тн',
            'tws_field_wagon_tara_doc': 'Тара по ЭПД, тн.',
            'tws_field_wagon_tara_arc_doc': 'Тара по ЭПД уточ., тн.',
            'tws_field_wagon_tara_uz': 'Тара по УЗ, тн.',
            'tws_field_wagon_vesg_doc': 'Нетто по ЭПД, тн',
            'tws_field_wagon_vesg_amkr': 'Нетто АМКР, тн',
            'tws_field_diff_vesg': 'Разница нетто, тн.',
            'tws_field_doc_outgoing_car': 'Наличие документа для сдачи на  УЗ',
            'tws_field_arrival_nom_main_doc': '№ накладной по приб',
            'tws_field_arrival_nom_doc': '№ досылки по приб',
            'tws_field_arrival_composition_index': 'Индекс поезда',
            'tws_field_arrival_date_adoption': 'Дата приема на АМКР',
            'tws_field_outgoing_date': 'Дата сдачи на УЗ',
            'tws_field_outgoing_id_return': 'id возврат',
            'tws_field_outgoing_return_cause': 'Причина возврата по отправлению',
            'tws_field_outgoing_sostav_status': 'Код стат. отпр. сост.',
            'tws_field_outgoing_sostav_status_name': 'Статус отпр. сост.',
            'tws_field_wagon_ban_uz': 'Запреты по УЗ',
            'tws_field_wagon_closed_route': 'Замкнутый маршрут (кольцо)',
            'tws_field_wir_note': 'Примечание',
            'tws_field_old_outgoing_uz_vagon_cargo_name': 'Груз по ОТПР предыдущий',
            'tws_field_old_date_outgoing': 'Дата последней сдачи',
            'tws_field_old_outgoing_uz_document_station_to_name': 'Станция ОТПР предыдущая',
            'tws_field_count': 'Кол.',
            'tws_field_park_abbr': 'Парк (аббр.)',
            'tws_field_way_name': 'Путь (аббр.)',
            'tws_field_name_outer_way': 'Перегон',
            'tws_field_from_station_name': 'Станция отправления',
            'tws_field_from_way': 'Путь отпр. (аббр.)',
            'tws_field_count_wagons_send': 'Отпр. ваг.',
            'tws_field_count_wagons_arrival': 'Прин. факт.',
            'tws_field_count_wagons_return': 'Возв (Отм).',
            'tws_field_count_wagons_accepted': 'Прин. ИДС',
            'tws_field_from_operation_locomotive1': 'Лок.№1',
            'tws_field_from_operation_locomotive2': 'Лок.№2',
            'tws_field_from_operation_end': 'Отправлен',
            'tws_field_from_operation_create_user': 'Вып. опер. отпр.',
            'tws_field_outer_way_position': '№ поз.',
            'tws_field_from_operation_condition_abbr': 'Разм. отпр (аббр.)',
            'tws_field_from_operation_loading_status': 'Состояние загрузки при отправке',
            'tws_field_outer_way_start': 'Перегон ваг. пост.',
            'tws_field_outer_way_end': 'Перегон ваг. сняли',
            'tws_field_from_wim_close': 'Дисл. отпр. закрыта',
            'tws_field_from_wim_close_user': 'Дисл. отпр. закрыл',
            'tws_field_on_station_name': 'Прибыв на ст.',
            'tws_field_on_station_abbr': 'Прибыв на ст. (аббр)',
            'tws_field_arrival_station_name': 'Принят на ст.',
            'tws_field_arrival_station_abbr': 'Принят на ст. (аббр)',
            'tws_field_on_way': 'Путь приб. (аббр.)',
            'tws_field_on_operation_end': 'Кон. опер. приб.',
            'tws_field_way': 'Путь (аббр.)',
            'tws_field_count_all_wagons': 'Стоит',
            'tws_field_count_diss_wagons': 'План',
            'tws_field_capacity_wagons': 'Вмещает',
            'tws_field_dissolution_way': 'Путь роспуска',
            'tws_field_outgoing_sostav_num_doc': '№ вед.',
            'tws_field_outgoing_sostav_date_readiness_amkr': 'Предъявлен',
            'tws_field_date_outgoing': 'Сдан',
            'tws_field_count_all': 'Кол. ваг.',
            'tws_field_valid_sys_numbering': 'Тип нумерации',
            'tws_field_dislocation_vagon_of_amkr': 'Дислокация на АМКР',

            'tws_field_id': 'Остаток',
            'tws_field_all': 'Все вагоны',
            'tws_field_amkr': 'Вагоны АМКР',
            'tws_field_id_1': 'ВСЕГО',
            'tws_field_id_2': 'ОСТАТОК ВНЕШНИХ',
            'tws_field_id_3': 'УЧЕТНЫЙ ОСТАТОК',

            'tws_title_status_0': 'Предъявлен',
            'tws_title_status_1': 'В работе',
            'tws_title_status_2': 'Сдан',
            'tws_title_status_3': 'Отправлен',
            'tws_title_status_4': 'Возврат',

            'tws_title_sys_numbering': 'Системная',
            'tws_title_not_sys_numbering': 'Не системная',

            'tws_title_no_epd': 'без ЭПД',

            'tws_title_link_num': 'Показать историю по вагону...',

            'tws_title_button_select_all_wagon': 'Все вагоны',
            'tws_title_button_deselect_all': 'Убрать выбор',
            'tws_title_button_add_sostav': 'Добавить в состав',
            'tws_title_button_collect_sostav': 'Собрать',
            'tws_title_button_title_collect_sostav': 'Собрать вагоны для предъявления по номерам вагонов...',
            'tws_title_button_del_wagons_sostav': 'Убрать из состава',
            'tws_title_button_head_tail': 'Голова\Хвост',
            'tws_title_button_reverse': 'Реверс',
            'tws_title_button_remove_wagons': 'Сбросить',
            'tws_title_button_move_wagons': 'Перенести на путь',
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
    function table_ws(selector) {
        this.tab_com = new TAB_COMMON({
            selector: selector,
            fn_init_type_report: this.init_type_report.bind(this),
        });
        // Перечень полей
        var list_collums = [
            // +++ ViewCarWay
            {
                field: 'position',
                data: function (row, type, val, meta) {
                    return row.position;
                },
                className: 'dt-body-center',
                title: langView('tws_field_position', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'position_new',
                data: function (row, type, val, meta) {
                    return row.position_new;
                },
                className: 'dt-body-center',
                title: langView('tws_field_position', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'num',
                data: function (row, type, val, meta) {
                    return row.num;
                },
                className: 'dt-body-center num-wagon',
                title: langView('tws_field_num', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'num_link',
                data: function (row, type, val, meta) {
                    var $link = new fe_ui.a({
                        id: row.num,
                        class: 'num-wagon',
                        href: '#',
                        text: row.num,
                        target: '_blank',
                        title: langView('tws_title_link_num', App.Langs),
                    });
                    if ($link) {
                        return $link.$html[0].outerHTML;
                    }
                },
                className: 'dt-body-center num-wagon',
                title: langView('tws_field_num', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'operator_abbr',
                data: function (row, type, val, meta) {
                    return row['operatorAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_operator_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'limiting_abbr',
                data: function (row, type, val, meta) {
                    return row['limitingAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_limiting_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'owner_wagon_abbr',
                data: function (row, type, val, meta) {
                    return row['ownerWagonAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_owner_wagon_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'operator_paid',
                data: function (row, type, val, meta) {
                    return row.operatorPaid ? langView('t_com_title_yes', App.Langs) : '';
                },
                className: 'dt-body-centr',
                title: langView('tws_field_operator_paid', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'wagon_rod_abbr',
                data: function (row, type, val, meta) {
                    return row['wagonRodAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-50',
                title: langView('tws_field_wagon_rod_abbr', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'wagon_type',
                data: function (row, type, val, meta) {
                    return row['wagonType' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_wagon_type', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'arrival_condition_abbr',
                data: function (row, type, val, meta) {
                    return row['arrivalConditionAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_arrival_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_condition_abbr',
                data: function (row, type, val, meta) {
                    return row['currentConditionAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_current_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'wagon_date_rem_uz',
                data: function (row, type, val, meta) {
                    return row.wagonDateRemUz ? moment(row.wagonDateRemUz).format(format_date) : null;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_wagon_date_rem_uz', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'wagon_gruzp_doc',
                data: function (row, type, val, meta) {
                    return row.wagonGruzpDoc ? Number(row.wagonGruzpDoc).toFixed(1) : null;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_wagon_gruzp_doc', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'wagon_gruzp_uz',
                data: function (row, type, val, meta) {
                    return row.wagonGruzpUz ? Number(row.wagonGruzpUz).toFixed(1) : null;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_wagon_gruzp_uz', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'wagon_adm',
                data: function (row, type, val, meta) {
                    return row.wagonAdm;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_wagon_adm', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'wagon_adm_name',
                data: function (row, type, val, meta) {
                    return row['wagonAdmName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_wagon_adm_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'wagon_adm_abbr',
                data: function (row, type, val, meta) {
                    return row['wagonAdmAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_wagon_adm_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'arrival_cargo_group_name',
                data: function (row, type, val, meta) {
                    return row['arrivalCargoGroupName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_arrival_cargo_group_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'arrival_cargo_name',
                data: function (row, type, val, meta) {
                    return row['arrivalCargoName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_arrival_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'arrival_sertification_data',
                data: function (row, type, val, meta) {
                    return row['arrivalSertificationData' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_arrival_sertification_data', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'arrival_commercial_condition',
                data: function (row, type, val, meta) {
                    return row['arrivalCommercialCondition' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_arrival_commercial_condition', App.Langs), width: "150px", orderable: true, searchable: true
            },
            {
                field: 'arrival_station_from_code',
                data: function (row, type, val, meta) {
                    return row.arrivalStationFromCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_arrival_station_from_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'arrival_station_from_name',
                data: function (row, type, val, meta) {
                    return row['arrivalStationFromName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_arrival_station_from_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'arrival_shipper_code',
                data: function (row, type, val, meta) {
                    return row.arrivalShipperCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_arrival_shipper_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'arrival_shipper_name',
                data: function (row, type, val, meta) {
                    return row['arrivalShipperName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-nowrap text-left',
                title: langView('tws_field_arrival_shipper_name', App.Langs), width: "300px", orderable: true, searchable: true
            },
            {
                field: 'arrival_station_amkr_name',
                data: function (row, type, val, meta) {
                    return row['arrivalStationAmkrName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_arrival_station_amkr_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'arrival_division_amkr_abbr',
                data: function (row, type, val, meta) {
                    return row['arrivalDivisionAmkrAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_arrival_division_amkr_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_loading_status',
                data: function (row, type, val, meta) {
                    return row['currentLoadingStatus' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_current_loading_status', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_wagon_busy',
                data: function (row, type, val, meta) {
                    return row.currentWagonBusy ? langView('t_com_title_yes', App.Langs) : '';
                },
                className: 'dt-body-center',
                title: langView('tws_field_current_wagon_busy', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'current_operation_name',
                data: function (row, type, val, meta) {
                    return row['currentOperationName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_current_operation_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_operation_start',
                data: function (row, type, val, meta) {
                    return row.currentOperationStart ? moment(row.currentOperationStart).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_current_operation_start', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_operation_end',
                data: function (row, type, val, meta) {
                    return row.currentOperationEnd ? moment(row.currentOperationEnd).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_current_operation_end', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Простой  УЗ, час
            {
                field: 'arrival_duration',
                data: function (row, type, val, meta) {
                    return row.arrivalDuration !== null ? getHoursFromMinuts(Number(row.arrivalDuration)) : null;
                },
                className: 'dt-body-nowrap arrival-duration',
                title: langView('tws_field_arrival_duration', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Норма, час
            {
                field: 'arrival_idle_time',
                data: function (row, type, val, meta) {
                    return row.arrivalIdleTime !== null ? Number(row.arrivalIdleTime / 60).toFixed(1) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_arrival_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Плата на текущий момент, грн
            {
                field: 'arrival_usage_fee',
                data: function (row, type, val, meta) {
                    return row.arrivalUsageFee !== null ? Number(row.arrivalUsageFee).toFixed(2) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_arrival_usage_fee', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'current_station_indicator',
                data: function (row, type, val, meta) {
                    if (row.current_station_idle_time !== null) {
                        // Показать индикатор простоя
                        var $pb = new fe_ui.bs_progressbar({
                            //id: 'way',
                            //name: 'way',
                            class: 'm-1',
                            value: (row.currentStationDuration !== null ? Number(row.currentStationDuration) : 0),
                            max :(row.currentStationIdleTime !== null ? Number(row.currentStationIdleTime) : 0),
                            //value: (row.currentStationIdleTime !== null ? Number(row.currentStationIdleTime) : 0),
                            //max: (row.currentStationDuration !== null ? Number(row.currentStationDuration) : 0),
                        });
                        if ($pb) {
                            return $pb.$html[0].outerHTML;
                        }
                    } else {
                        // Не задана норма, индикатор не показываеи
                        return null;
                    }
                },
                className: 'dt-body-justify mw-100',
                title: langView('tws_field_current_station_indicator', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_station_idle_time',
                data: function (row, type, val, meta) {
                    return row.currentStationIdleTime !== null ? Number(row.currentStationIdleTime / 60).toFixed(1) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_current_station_idle_time', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Факт станция, ч
            {
                field: 'current_station_duration',
                data: function (row, type, val, meta) {
                    return row.currentStationDuration !== null ? getHoursFromMinuts(Number(row.currentStationDuration)) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_current_station_duration', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'current_way_duration',
                data: function (row, type, val, meta) {
                    return row.currentWayDuration !== null ? getHoursFromMinuts(Number(row.currentWayDuration)) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_current_way_duration', App.Langs), width: "50px", orderable: true, searchable: true
            },
            //=============== ИНСТРУКТИВНЫЕ ПИСЬМА ==================
            // № письма
            {
                field: 'instructional_letters_num',
                data: function (row, type, val, meta) {
                    return row.instructionalLettersNum;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_instructional_letters_num', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Дата письма
            {
                field: 'instructional_letters_datetime',
                data: function (row, type, val, meta) {
                    return row.instructionalLettersDatetime ? moment(row.instructionalLettersDatetime).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_instructional_letters_datetime', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Станция назначения
            {
                field: 'instructional_letters_station_code',
                data: function (row, type, val, meta) {
                    return row.instructionalLettersStationCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_instructional_letters_station_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'instructional_letters_station_name',
                data: function (row, type, val, meta) {
                    return row.instructionalLettersStationName;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_instructional_letters_station_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Текст
            {
                field: 'instructional_letters_note',
                data: function (row, type, val, meta) {
                    return row.instructionalLettersNote;
                },
                className: 'dt-body-nowrap text-left',
                title: langView('tws_field_instructional_letters_note', App.Langs), width: "150px", orderable: true, searchable: true
            },
            //
            {
                field: 'sap_incoming_supply_cargo_ban',
                data: function (row, type, val, meta) {
                    switch (row.sapIncomingSupplyCargoBan) {
                        case '@5C@': return "<i class='fas fa-ban' style='color:#ff4d4d;'></i>";
                        case '@5B@': return "<i class='fas fa-check' style='color:#00ce00;'></i>";
                        default: return null;
                    }
                },
                className: 'dt-body-nowrap sap-inc-supp',
                title: langView('tws_field_sap_incoming_supply_cargo_ban', App.Langs), width: "30px", orderable: true, searchable: true
            },
            //=============== ВХОДЯЩАЯ ПОСТАВКА ==================
            {
                field: 'sap_incoming_supply_num',
                data: function (row, type, val, meta) {
                    return row.sapIncomingSupplyNum;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_sap_incoming_supply_num', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // дата создания
            {
                field: 'sap_incoming_supply_date',
                data: function (row, type, val, meta) {
                    return row.sapIncomingSupplyDate ? moment(row.sapIncomingSupplyDate).format(format_date) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_sap_incoming_supply_date', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // время создания
            {
                field: 'sap_incoming_supply_time',
                data: function (row, type, val, meta) {
                    return row.sapIncomingSupplyTime;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_sap_incoming_supply_time', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Материал
            {
                field: 'sap_incoming_supply_cargo_code',
                data: function (row, type, val, meta) {
                    return row.sapIncomingSupplyCargoCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_incoming_supply_cargo_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_incoming_supply_cargo_name',
                data: function (row, type, val, meta) {
                    return row.sapIncomingSupplyCargoName;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_sap_incoming_supply_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            // Склад, Наименование склада
            {
                field: 'sap_incoming_supply_warehouse_code',
                data: function (row, type, val, meta) {
                    return row.sapIncomingSupplyWarehouseCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_incoming_supply_warehouse_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_incoming_supply_warehouse_name',
                data: function (row, type, val, meta) {
                    return row.sapIncomingSupplyWarehouseName;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_sap_incoming_supply_warehouse_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            //=============== ИСХОДЯЩАЯ ПОСТАВКА ==================
            {
                field: 'sap_outgoing_supply_num',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyNum;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_sap_outgoing_supply_num', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // дата создания
            {
                field: 'sap_outgoing_supply_date',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyDate ? moment(row.sapOutgoingSupplyDate).format(format_date) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_sap_outgoing_supply_date', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Груз
            {
                field: 'sap_outgoing_supply_cargo_code',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyCargoCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_outgoing_supply_cargo_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_outgoing_supply_cargo_name',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyCargoName;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_sap_outgoing_supply_cargo_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            // Грузополучатель
            {
                field: 'sap_outgoing_supply_shipper_code',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyShipperCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_outgoing_supply_shipper_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_outgoing_supply_shipper_name',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyShipperName;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_sap_outgoing_supply_shipper_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            // Станция назначения
            {
                field: 'sap_outgoing_supply_destination_station_code',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyDestinationStationCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_outgoing_supply_destination_station_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_outgoing_supply_destination_station_name',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyDestinationStationName;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_sap_outgoing_supply_destination_station_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Погран переход
            {
                field: 'sap_outgoing_supply_border_checkpoint_code',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyBorderCheckpointCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_outgoing_supply_border_checkpoint_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_outgoing_supply_border_checkpoint_name',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyBorderCheckpointName;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_sap_outgoing_supply_border_checkpoint_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Нетто по исх пост, тн
            {
                field: 'sap_outgoing_supply_netto',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyNetto !== null ? (row.sapOutgoingSupplyNetto > 0 ? Number(row.sapOutgoingSupplyNetto / 1000).toFixed(2) : Number(row.sapOutgoingSupplyNetto).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_sap_outgoing_supply_netto', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Склад, Наименование склада
            {
                field: 'sap_outgoing_supply_warehouse_code',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyWarehouseCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_outgoing_supply_warehouse_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_outgoing_supply_warehouse_name',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyWarehouseName;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_sap_outgoing_supply_warehouse_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Ответственный за погрузку
            {
                field: 'sap_outgoing_supply_responsible_post',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyResponsiblePost;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_sap_outgoing_supply_responsible_post', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'sap_outgoing_supply_responsible_fio',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyResponsibleFio;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_sap_outgoing_supply_responsible_fio', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Плательщик ж.д. тарифа
            {
                field: 'sap_outgoing_supply_payer_code',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyPayerCode;
                },
                className: 'dt-body-center',
                title: langView('tws_field_sap_outgoing_supply_payer_code', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'sap_outgoing_supply_payer_name',
                data: function (row, type, val, meta) {
                    return row.sapOutgoingSupplyPayerName;
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_sap_outgoing_supply_payer_name', App.Langs), width: "150px", orderable: true, searchable: true
            },
            //=============== ВХОДНОЕ ВЗВЕШИВАНИЕ С УЗ ==================
            // Брутто по ЭПД, тн
            {
                field: 'wagon_brutto_doc',
                data: function (row, type, val, meta) {
                    return row.wagonBruttoDoc !== null ? (row.wagonBruttoDoc > 0 ? Number(row.wagonBruttoDoc / 1000).toFixed(2) : Number(row.wagonBruttoDoc).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_wagon_brutto_doc', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Брутто по ЭПД, тн
            {
                field: 'wagon_brutto_amkr',
                data: function (row, type, val, meta) {
                    return row.wagonBruttoAmkr !== null ? (row.wagonBruttoAmkr > 0 ? Number(row.wagonBruttoAmkr / 1000).toFixed(2) : Number(row.wagonBruttoAmkr).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_wagon_brutto_amkr', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Тара
            {
                field: 'wagon_tara_doc',
                data: function (row, type, val, meta) {
                    return row.wagonTaraDoc !== null ? (row.wagonTaraDoc > 0 ? Number(row.wagonTaraDoc / 1000).toFixed(2) : Number(row.wagonTaraDoc).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_wagon_tara_doc', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'wagon_tara_arc_doc',
                data: function (row, type, val, meta) {
                    return row.wagonTaraArcDoc !== null ? (row.wagonTaraArcDoc > 0 ? Number(row.wagonTaraArcDoc / 1000).toFixed(2) : Number(row.wagonTaraArcDoc).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_wagon_tara_arc_doc', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'wagon_tara_uz',
                data: function (row, type, val, meta) {
                    return row.wagonTaraUz !== null ? (row.wagonTaraUz > 0 ? Number(row.wagonTaraUz).toFixed(2) : 0.00) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_wagon_tara_uz', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Нетто по ЭПД, тн
            {
                field: 'wagon_vesg_doc',
                data: function (row, type, val, meta) {
                    return row.wagonVesgDoc !== null ? (row.wagonVesgDoc > 0 ? Number(row.wagonVesgDoc / 1000).toFixed(2) : Number(row.wagonVesgDoc).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_wagon_vesg_doc', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Нетто АМКР, тн
            {
                field: 'wagon_vesg_amkr',
                data: function (row, type, val, meta) {
                    return row.wagonVesgAmkr !== null ? (row.wagonVesgAmkr > 0 ? Number(row.wagonVesgAmkr / 1000).toFixed(2) : Number(row.wagonVesgAmkr).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_wagon_vesg_amkr', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Разница нетто, тн.
            {
                field: 'diff_vesg',
                data: function (row, type, val, meta) {
                    return row.diffVesg !== null ? (row.diffVesg > 0 ? Number(row.diffVesg / 1000).toFixed(2) : Number(row.diffVesg).toFixed(2)) : null;
                },
                className: 'dt-body-right',
                title: langView('tws_field_diff_vesg', App.Langs), width: "50px", orderable: true, searchable: true
            },
            //=============== ДОПОЛНИТЕЛЬНО ==================
            // Наличие документа для сдачи на  УЗ
            {
                field: 'doc_outgoing_car',
                data: function (row, type, val, meta) {
                    return row.docOutgoingCar ? langView('t_com_title_yes', App.Langs) : '';
                },
                className: 'dt-body-centr',
                title: langView('tws_field_doc_outgoing_car', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // № накладной по приб
            {
                field: 'arrival_nom_main_doc',
                data: function (row, type, val, meta) {
                    return row.arrivalNomMainDoc ? (Number(row.arrivalNomMainDoc) > 0 ? row.arrivalNomMainDoc : langView('tws_title_no_epd', App.Langs)) : (row.arrivalNomDoc ? row.arrivalNomDoc : '');
                },
                className: 'dt-body-centr',
                title: langView('tws_field_arrival_nom_main_doc', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // № досылки по приб
            {
                field: 'arrival_nom_doc',
                data: function (row, type, val, meta) {
                    return row.arrivalNomDoc ? row.arrivalNomDoc : '';
                },
                className: 'dt-body-centr',
                title: langView('tws_field_arrival_nom_doc', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Индекс поезда
            {
                field: 'arrival_composition_index',
                data: function (row, type, val, meta) {
                    return row.arrivalCompositionIndex;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_arrival_composition_index', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Дата приема на АМКР
            {
                field: 'arrival_date_adoption',
                data: function (row, type, val, meta) {
                    return row.arrivalDateAdoption ? moment(row.arrivalDateAdoption).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_arrival_date_adoption', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Дата сдачи на УЗ
            {
                field: 'outgoing_date',
                data: function (row, type, val, meta) {
                    return row.outgoingDate ? moment(row.outgoingDate).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_outgoing_date', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Причина возврата по отправлению
            {
                field: 'outgoing_id_return',
                data: function (row, type, val, meta) {
                    return row.outgoingIdReturn;
                },
                className: 'dt-body-center',
                title: langView('tws_field_outgoing_id_return', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'outgoing_return_cause',
                data: function (row, type, val, meta) {
                    return row['outgoingReturnCause' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-150',
                title: langView('tws_field_outgoing_return_cause', App.Langs), width: "150px", orderable: true, searchable: true
            },
            // Статус отправляемого состава
            {
                field: 'outgoing_sostav_status',
                data: function (row, type, val, meta) {
                    return row.outgoingSostavStatus;
                },
                className: 'dt-body-center',
                title: langView('tws_field_outgoing_sostav_status', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'outgoing_sostav_status_name',
                data: function (row, type, val, meta) {
                    var status = null
                    if (row.outgoingSostavStatus !== undefined) {
                        status = row.outgoingSostavStatus;
                    }
                    if (row.status !== undefined) {
                        status = row.status;
                    }
                    switch (status) {
                        default: return status;
                        case 0: return langView('tws_title_status_0', App.Langs);
                        case 1: return langView('tws_title_status_1', App.Langs);
                        case 2: return langView('tws_title_status_2', App.Langs);
                        case 3: return langView('tws_title_status_3', App.Langs);
                        case 4: return langView('tws_title_status_4', App.Langs);
                    }
                    //return row.outgoing_sostav_status;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_outgoing_sostav_status_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Запреты по УЗ 
            {
                field: 'wagon_ban_uz',
                data: function (row, type, val, meta) {
                    return row.wagonBanUz;
                },
                className: 'dt-body-nowrap text-left',
                title: langView('tws_field_wagon_ban_uz', App.Langs), width: "150px", orderable: true, searchable: true
            },
            // Замкнутый маршрут (кольцо)
            {
                field: 'wagon_closed_route',
                data: function (row, type, val, meta) {
                    return row.wagonClosedRoute ? langView('t_com_title_yes', App.Langs) : '';
                },
                className: 'dt-body-centr',
                title: langView('tws_field_wagon_closed_route', App.Langs), width: "30px", orderable: true, searchable: true
            },
            // Примечание
            {
                field: 'wir_note',
                data: function (row, type, val, meta) {
                    return row.wirNote;
                },
                className: 'dt-body-nowrap text-left',
                title: langView('tws_field_wir_note', App.Langs), width: "150px", orderable: true, searchable: true
            },
            // Груз по отправке предыдущий
            {
                field: 'old_outgoing_uz_vagon_cargo_name',
                data: function (row, type, val, meta) {
                    return row['oldOutgoingUzVagonCargoName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_old_outgoing_uz_vagon_cargo_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Дата последней здачи
            {
                field: 'old_date_outgoing',
                data: function (row, type, val, meta) {
                    return row.oldDateOutgoingAct ? moment(row.oldDateOutgoingAct).format(format_datetime) : (row.oldDateOutgoing ? moment(row.oldDateOutgoing).format(format_datetime) : null);
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_old_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Станция ОТПР предыдущая
            {
                field: 'old_outgoing_uz_document_station_to_name',
                data: function (row, type, val, meta) {
                    return row['oldOutgoingUzDocumentStationToName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_old_outgoing_uz_document_station_to_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // --- END ViewCarWay
            // +++ ViewTotalBalance
            {
                field: 'remainder_type',
                data: function (row, type, val, meta) {

                    return langView('tws_field_id_' + row.id, App.Langs);
                },
                className: 'dt-body-left',
                title: langView('tws_field_id', App.Langs), width: "50px", orderable: false, searchable: false
            },
            // --- ViewTotalBalance
            {
                field: 'park_abbr',
                data: function (row, type, val, meta) {
                    return row['parkAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_park_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_way_amkr_name',
                data: function (row, type, val, meta) {
                    return row["currentWayAmkrNum" + ucFirst(App.Lang)] + '-' + row["currentWayAmkrAbbr" + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_way_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'current_way_amkr_name_link',
                data: function (row, type, val, meta) {
                    var $link = new fe_ui.a({
                        id: row.idWay,
                        class: 'link-cell',
                        href: '#',
                        text: row["currentWayAmkrNum" + ucFirst(App.Lang)] + '-' + row["currentWayAmkrAbbr" + ucFirst(App.Lang)],
                        target: null,
                        /*                        title: langView('tws_title_link_num', App.Langs),*/
                    });
                    if ($link) {
                        return $link.$html[0].outerHTML;
                    }
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_way_name', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'name_outer_way',
                data: function (row, type, val, meta) {
                    return row['nameOuterWay' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-250',
                title: langView('tws_field_name_outer_way', App.Langs), width: "250px", orderable: true, searchable: true
            },
            // +++ ViewWagonsOfOuterWay
            // Станция отправления
            {
                field: 'from_station_name',
                data: function (row, type, val, meta) {
                    return row['fromStationName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_from_station_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Станция прибытия (план)
            {
                field: 'on_station_name',
                data: function (row, type, val, meta) {
                    return row['onStationName' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_on_station_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'on_station_abbr',
                data: function (row, type, val, meta) {
                    return row['onStationAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_on_station_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Станция прибытия (факт)
            {
                field: 'arrival_station_name',
                data: function (row, type, val, meta) {
                    if (row.arrivalIdStation) {
                        return row['arrivalStationName' + ucFirst(App.Lang)];
                    } else {
                        return '';
                    }
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_arrival_station_name', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'arrival_station_abbr',
                data: function (row, type, val, meta) {
                    if (row.arrivalIdStation) {
                        return row['arrivalStationAbbr' + ucFirst(App.Lang)]
                    } else {
                        return '';
                    }
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_arrival_station_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Путь отправки
            {
                field: 'from_way',
                data: function (row, type, val, meta) {
                    return row["fromWayNum" + ucFirst(App.Lang)] + '-' + row["fromWayAbbr" + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_from_way', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Путь прибытия
            {
                field: 'on_way',
                data: function (row, type, val, meta) {
                    if (row.onIdWay) {
                        return row["onWayNum" + ucFirst(App.Lang)] + '-' + row["onWayAbbr" + ucFirst(App.Lang)];
                    } else {
                        return '';
                    }

                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_on_way', App.Langs), width: "100px", orderable: true, searchable: true
            },

            // Количество вагонов (отпр, принятых, возвращ...)
            {
                field: 'count_wagons_send',
                data: function (row, type, val, meta) {
                    return row.countWagonsSend;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_count_wagons_send', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'count_wagons_arrival',
                data: function (row, type, val, meta) {
                    return row.countWagonsArrival;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_count_wagons_arrival', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'count_wagons_return',
                data: function (row, type, val, meta) {
                    return row.countWagonsReturn;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_count_wagons_return', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'count_wagons_accepted',
                data: function (row, type, val, meta) {
                    return row.countWagonsAccepted;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_count_wagons_accepted', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Локомотивы
            {
                field: 'from_operation_locomotive1',
                data: function (row, type, val, meta) {
                    return row.fromOperationLocomotive1;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_from_operation_locomotive1', App.Langs), width: "50px", orderable: true, searchable: true
            },
            {
                field: 'from_operation_locomotive2',
                data: function (row, type, val, meta) {
                    return row.fromOperationLocomotive2;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_from_operation_locomotive2', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Дата и пользователь создавший состав
            {
                field: 'from_operation_end',
                data: function (row, type, val, meta) {
                    return row.fromOperationEnd ? moment(row.fromOperationEnd).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_from_operation_end', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'from_operation_create_user',
                data: function (row, type, val, meta) {
                    return row.fromOperationCreateUser;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_from_operation_create_user', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'outer_way_position',
                data: function (row, type, val, meta) {
                    return row.outerWayPosition;
                },
                className: 'dt-body-center',
                title: langView('tws_field_outer_way_position', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'from_operation_condition_abbr',
                data: function (row, type, val, meta) {
                    return row['fromOperationConditionAbbr' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_from_operation_condition_abbr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'from_operation_loading_status',
                data: function (row, type, val, meta) {
                    return row['fromOperationLoadingStatus' + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_from_operation_loading_status', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Дата поставки и снятия с перегона
            {
                field: 'outer_way_start',
                data: function (row, type, val, meta) {
                    return row.outerWayStart ? moment(row.outerWayStart).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_outer_way_start', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'outer_way_end',
                data: function (row, type, val, meta) {
                    return row.outerWayEnd ? moment(row.outerWayEnd).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_outer_way_end', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'from_wim_close',
                data: function (row, type, val, meta) {
                    return row.fromWimClose ? moment(row.fromWimClose).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_from_wim_close', App.Langs), width: "100px", orderable: true, searchable: true
            },
            {
                field: 'from_wim_close_user',
                data: function (row, type, val, meta) {
                    return row.fromWimCloseUser;
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_from_wim_close_user', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // конец операции прибытия
            {
                field: 'on_operation_end',
                data: function (row, type, val, meta) {
                    return row.onOperationEnd ? moment(row.onOperationEnd).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_on_operation_end', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // --- ViewWagonsOfOuterWay
            // +++ ViewStatusWay
            // Путь
            {
                field: 'way',
                data: function (row, type, val, meta) {
                    return row["wayNum" + ucFirst(App.Lang)] + '-' + row["wayAbbr" + ucFirst(App.Lang)];
                },
                className: 'dt-body-left shorten mw-100',
                title: langView('tws_field_way', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Количество вагонов стоит на пути
            {
                field: 'count_all_wagons',
                data: function (row, type, val, meta) {
                    return row.countAllWagons;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_count_all_wagons', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Количество вагонов роспуска
            {
                field: 'count_diss_wagons',
                data: function (row, type, val, meta) {
                    return row.countDissWagons;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_count_diss_wagons', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // Количество вагонов которое вмещает путь
            {
                field: 'capacity_wagons',
                data: function (row, type, val, meta) {
                    return row.capacityWagons;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_capacity_wagons', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // --- ViewStatusWay
            // Путь
            {
                field: 'dissolution_way',
                data: function (row, type, val, meta) {
                    return row.num_way_dissolution;
                },
                className: 'dt-body-left shorten mw-50',
                title: langView('tws_field_dissolution_way', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // +++ ViewOutgoingSostav
            //{
            //    field: 'view_outgoing_sostav_status_name',
            //    data: function (row, type, val, meta) {
            //        switch (row.status) {
            //            default: return row.status;
            //            case 0: return langView('tws_title_status_0', App.Langs);
            //            case 1: return langView('tws_title_status_1', App.Langs);
            //            case 2: return langView('tws_title_status_2', App.Langs);
            //            case 3: return langView('tws_title_status_3', App.Langs);
            //            case 4: return langView('tws_title_status_4', App.Langs);
            //        }
            //        //return row.outgoing_sostav_status;
            //    },
            //    className: 'dt-body-left shorten mw-100',
            //    title: langView('tws_field_outgoing_sostav_status_name', App.Langs), width: "100px", orderable: true, searchable: true
            //},
            {
                field: 'outgoing_sostav_num_doc',
                data: function (row, type, val, meta) {
                    return row.numDoc;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_outgoing_sostav_num_doc', App.Langs), width: "30px", orderable: true, searchable: true
            },
            {
                field: 'outgoing_sostav_date_readiness_amkr',
                data: function (row, type, val, meta) {
                    return row.dateReadinessAmkr ? moment(row.dateReadinessAmkr).format(format_datetime) : null;
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_outgoing_sostav_date_readiness_amkr', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Дата последней здачи
            {
                field: 'outgoing_sostav_date_outgoing',
                data: function (row, type, val, meta) {
                    return row.dateOutgoingAct ? moment(row.dateOutgoingAct).format(format_datetime) : (row.dateOutgoing ? moment(row.dateOutgoing).format(format_datetime) : null);
                },
                className: 'dt-body-nowrap',
                title: langView('tws_field_date_outgoing', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Количество вагонов стоит на пути
            {
                field: 'outgoing_sostav_count_all',
                data: function (row, type, val, meta) {
                    return row.countAll;
                },
                className: 'dt-body-centr',
                title: langView('tws_field_count_all', App.Langs), width: "50px", orderable: true, searchable: true
            },
            // --- ViewOutgoingSostav
            // Тип нумерации вагонов системна-несистемная
            {
                field: 'valid_sys_numbering',
                data: function (row, type, val, meta) {
                    return !is_valid_num_wagon(Number(row.num)) ? langView('tws_title_not_sys_numbering', App.Langs) : langView('tws_title_sys_numbering', App.Langs)
                },
                className: 'dt-body-left',
                title: langView('tws_field_valid_sys_numbering', App.Langs), width: "100px", orderable: true, searchable: true
            },
            // Тип нумерации вагонов системна-несистемная
            {
                field: 'dislocation_vagon_of_amkr',
                data: function (row, type, val, meta) {
                    return this.tab_com.settings.fn_data(row, type, val, meta, 'dislocation_vagon_of_amkr');
                }.bind(this),
                className: 'dt-body-left',
                title: langView('tws_field_dislocation_vagon_of_amkr', App.Langs), width: "300px", orderable: true, searchable: true
            },
        ];
        this.tab_com.list_collums = this.tab_com.list_collums.concat(list_collums);
        // Перечень кнопок
        var list_buttons = [
            {
                button: 'select_all',
                text: langView('tws_title_button_select_all_wagon', App.Langs),
                className: 'btn btn-success'
            },
            {
                button: 'select_none',
                extend: 'selectNone',
                text: langView('tws_title_button_deselect_all', App.Langs),
                className: 'btn btn-success'
            },
            {
                button: 'add_sostav',
                text: langView('tws_title_button_add_sostav', App.Langs),
                className: 'btn btn-info'
            },
            {
                button: 'collect_sostav',
                text: langView('tws_title_button_collect_sostav', App.Langs),
                className: 'btn btn-success',
                attr: {
                    'data-bs-toggle': 'collapse',
                    'data-bs-target': '#collapse-collect',
                    'aria-expanded': 'false',
                    'aria-controls': 'collapse-collect',
                    title: langView('tws_title_button_title_collect_sostav', App.Langs),
                },
            },
            {
                button: 'del_wagons_sostav',
                text: langView('tws_title_button_del_wagons_sostav', App.Langs),
                className: 'btn btn-danger'
            },
            {
                button: 'head_tail',
                text: langView('tws_title_button_head_tail', App.Langs),
                className: 'btn btn-info'
            },
            {
                button: 'reverse',
                text: langView('tws_title_button_reverse', App.Langs),
                className: 'btn btn-info'
            },
            {
                button: 'remove_wagons',
                text: langView('tws_title_button_remove_wagons', App.Langs),
                className: 'btn btn-danger'
            },
            {
                button: 'move_wagons',
                text: langView('tws_title_button_move_wagons', App.Langs),
                className: 'btn btn-success'
            },
        ];
        this.tab_com.list_buttons = this.tab_com.list_buttons.concat(list_buttons);
    }
    //==========================================================================================
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей req1892
    table_ws.prototype.init_columns_cars_way = function () {
        var collums = [];
        collums.push({ field: 'position', title: null, class: null });
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'owner_wagon_abbr', title: null, class: null });
        collums.push({ field: 'operator_paid', title: null, class: null });
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'wagon_type', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'wagon_date_rem_uz', title: null, class: null });
        collums.push({ field: 'wagon_gruzp_doc', title: null, class: null });
        collums.push({ field: 'wagon_gruzp_uz', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        //collums.push({
        //    create: true,
        //    field: 'arrivalIdCommercialCondition',
        //    title: langView('tws_field_arrival_id_commercial_condition', App.Langs),
        //    class: 'dt-body-center', ft: 'int', width: 30, orderable: true, searchable: true
        //});
        //collums.push({
        //    create: true,
        //    field: 'arrivalCommercialCondition',
        //    title: langView('tws_field_arrival_commercial_condition', App.Langs),
        //    class: 'dt-body-left shorten mw-150', ft: 'string', width: 150, orderable: true, searchable: true
        //});
        collums.push({ field: 'arrival_commercial_condition', title: null, class: null });
        collums.push({ field: 'arrival_station_from_code', title: null, class: null });
        collums.push({ field: 'arrival_station_from_name', title: null, class: null });
        collums.push({ field: 'arrival_shipper_code', title: null, class: null });
        collums.push({ field: 'arrival_shipper_name', title: null, class: null });
        collums.push({ field: 'arrival_station_amkr_name', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'current_wagon_busy', title: null, class: null });
        collums.push({ field: 'current_operation_name', title: null, class: null });
        collums.push({ field: 'current_operation_start', title: null, class: null });
        collums.push({ field: 'current_operation_end', title: null, class: null });
        collums.push({ field: 'arrival_duration', title: null, class: null });
        collums.push({ field: 'arrival_idle_time', title: null, class: null });
        collums.push({ field: 'arrival_usage_fee', title: null, class: null });
        collums.push({ field: 'current_station_indicator', title: null, class: 'pink' });
        collums.push({ field: 'current_station_idle_time', title: null, class: 'pink' });
        collums.push({ field: 'current_station_duration', title: null, class: 'pink' });
        collums.push({ field: 'current_way_duration', title: null, class: 'pink' });
        collums.push({ field: 'instructional_letters_num', title: null, class: 'violet' });
        collums.push({ field: 'instructional_letters_datetime', title: null, class: 'violet' });
        collums.push({ field: 'instructional_letters_station_code', title: null, class: 'violet' });
        collums.push({ field: 'instructional_letters_station_name', title: null, class: 'violet' });
        collums.push({ field: 'instructional_letters_note', title: null, class: 'violet' });
        collums.push({ field: 'sap_incoming_supply_cargo_ban', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_num', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_date', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_time', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_cargo_code', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_cargo_name', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_warehouse_code', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_warehouse_name', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_outgoing_supply_num', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_date', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_cargo_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_cargo_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_destination_station_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_destination_station_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_border_checkpoint_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_border_checkpoint_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_shipper_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_shipper_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_payer_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_payer_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_warehouse_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_warehouse_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_netto', title: null, class: 'lblue' });
        collums.push({ field: 'wagon_brutto_doc', title: null, class: 'lgrey' });
        collums.push({ field: 'wagon_brutto_amkr', title: null, class: 'lgrey' });
        collums.push({ field: 'wagon_tara_doc', title: null, class: 'lgrey' });
        collums.push({ field: 'wagon_tara_arc_doc', title: null, class: 'lgrey' });
        collums.push({ field: 'wagon_tara_uz', title: null, class: 'lgrey' });
        collums.push({ field: 'wagon_vesg_doc', title: null, class: 'lgrey' });
        collums.push({ field: 'wagon_vesg_amkr', title: null, class: 'lgrey' });
        collums.push({ field: 'diff_vesg', title: null, class: 'lgrey' });
        collums.push({ field: 'doc_outgoing_car', title: null, class: null });
        collums.push({ field: 'arrival_nom_main_doc', title: null, class: null });
        collums.push({ field: 'arrival_nom_doc', title: null, class: null });
        collums.push({ field: 'arrival_composition_index', title: null, class: null });
        collums.push({ field: 'arrival_date_adoption', title: null, class: null });
        collums.push({ field: 'outgoing_date', title: null, class: null });
        collums.push({ field: 'outgoing_return_cause', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_status_name', title: null, class: null });
        collums.push({ field: 'wagon_ban_uz', title: null, class: null });
        collums.push({ field: 'wagon_closed_route', title: null, class: null });
        collums.push({ field: 'wir_note', title: null, class: null });
        collums.push({ field: 'old_outgoing_uz_vagon_cargo_name', title: null, class: 'lgreen' });
        collums.push({ field: 'old_date_outgoing', title: null, class: 'lgreen' });
        collums.push({ field: 'old_outgoing_uz_document_station_to_name', title: null, class: 'lgreen' });

        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_arrival_cars_way = function () {
        var collums = [];
        collums.push({ field: 'position_new', title: null, class: null });
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_outgoing_cars_way = function () {
        var collums = [];
        collums.push({ field: 'position', title: null, class: null });
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'outgoing_sostav_status_name', title: null, class: null });
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_total_balance = function () {
        var collums = [];
        collums.push({ field: 'remainder_type', title: null, class: null });
        collums.push({
            create: true,
            field: 'all',
            title: langView('tws_field_all', App.Langs),
            class: 'dt-body-center dt-head-center', ft: 'int', width: 50, orderable: false, searchable: false
        });
        collums.push({
            create: true,
            field: 'amkr',
            title: langView('tws_field_amkr', App.Langs),
            class: 'dt-body-center dt-head-center', ft: 'int', width: 50, orderable: false, searchable: false
        });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_operators_station = function () {
        var collums = [];
        collums.push({ field: 'operator_abbr', title: null, class: null });
        collums.push({
            create: true,
            field: 'countOperators',
            title: langView('tws_field_count', App.Langs),
            class: 'dt-body-right dt-head-center', ft: 'int', width: 50, orderable: true, searchable: false
        });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_operators_way_station = function () {
        var collums = [];
        //collums.push({ field: 'current_way_amkr_name', title: null, class: null });
        collums.push({ field: 'current_way_amkr_name_link', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: null });
        collums.push({
            create: true,
            field: 'countOperators',
            title: langView('tws_field_count', App.Langs),
            class: 'dt-body-right dt-head-center', ft: 'int', width: 50, orderable: true, searchable: false
        });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_operators_send_station = function () {
        var collums = [];
        collums.push({ field: 'name_outer_way', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: null });
        collums.push({
            create: true,
            field: 'countOperators',
            title: langView('tws_field_count', App.Langs),
            class: 'dt-body-right dt-head-center', ft: 'int', width: 50, orderable: true, searchable: false
        });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_operators_arrival_station = function () {
        var collums = [];
        collums.push({ field: 'name_outer_way', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: null });
        collums.push({
            create: true,
            field: 'countOperators',
            title: langView('tws_field_count', App.Langs),
            class: 'dt-body-right dt-head-center', ft: 'int', width: 50, orderable: true, searchable: false
        });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_sostav_outer_ways = function () {
        var collums = [];
        collums.push({ field: 'name_outer_way', title: null, class: null });
        collums.push({ field: 'from_station_name', title: null, class: null });
        collums.push({ field: 'from_way', title: null, class: null });
        collums.push({ field: 'count_wagons_send', title: null, class: null });
        collums.push({ field: 'count_wagons_arrival', title: null, class: null });
        collums.push({ field: 'count_wagons_return', title: null, class: null });
        collums.push({ field: 'count_wagons_accepted', title: null, class: null });
        collums.push({ field: 'from_operation_locomotive1', title: null, class: null });
        collums.push({ field: 'from_operation_locomotive2', title: null, class: null });
        collums.push({ field: 'from_operation_end', title: null, class: null });
        collums.push({ field: 'from_operation_create_user', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_wagons_outer_way = function () {
        var collums = [];
        collums.push({ field: 'outer_way_position', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'arrival_nom_main_doc', title: null, class: null });
        collums.push({ field: 'arrival_nom_doc', title: null, class: null });
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'wagon_adm_abbr', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'from_operation_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        collums.push({ field: 'outer_way_start', title: null, class: null });
        collums.push({ field: 'outer_way_end', title: null, class: null });
        collums.push({ field: 'from_wim_close', title: null, class: null });
        collums.push({ field: 'from_wim_close_user', title: null, class: null });
        collums.push({ field: 'arrival_station_abbr', title: null, class: null });
        collums.push({ field: 'on_way', title: null, class: null });
        collums.push({ field: 'on_operation_end', title: null, class: null });

        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_wagons_new_sostav_outer_way = function () {
        var collums = [];
        collums.push({ field: 'position_new', title: null, class: null });
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_dissolution_cars_from = function () {
        var collums = [];
        collums.push({ field: 'position', title: null, class: null });
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'outgoing_sostav_status_name', title: null, class: null });
        collums.push({ field: 'dissolution_way', title: null, class: null });
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_dissolution_ways = function () {
        var collums = [];
        collums.push({ field: 'way', title: null, class: null });
        collums.push({ field: 'count_all_wagons', title: null, class: null });
        collums.push({ field: 'count_diss_wagons', title: null, class: null });
        collums.push({ field: 'capacity_wagons', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_dislocation_cars_from = function () {
        var collums = [];
        collums.push({ field: 'position', title: null, class: null });
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'outgoing_sostav_status_name', title: null, class: null });
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_provide_cars_from = function () {
        var collums = [];
        collums.push({ field: 'position', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_status_name', title: null, class: null });//
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'operator_paid', title: null, class: null });//        
        collums.push({ field: 'current_wagon_busy', title: null, class: null });//
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });//
        collums.push({ field: 'wagon_type', title: null, class: null });
        collums.push({ field: 'wagon_gruzp_doc', title: null, class: null });
        collums.push({ field: 'wagon_gruzp_uz', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'arrival_station_from_name', title: null, class: null });
        collums.push({ field: 'arrival_station_amkr_name', title: null, class: null });
        collums.push({ field: 'current_operation_name', title: null, class: null });
        collums.push({ field: 'current_operation_start', title: null, class: null });
        collums.push({ field: 'current_operation_end', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        collums.push({ field: 'sap_incoming_supply_cargo_ban', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_num', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_date', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_time', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_cargo_code', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_cargo_name', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_warehouse_code', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_warehouse_name', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_outgoing_supply_num', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_date', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_cargo_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_cargo_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_destination_station_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_destination_station_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_border_checkpoint_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_border_checkpoint_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_shipper_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_shipper_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_payer_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_payer_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_warehouse_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_warehouse_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_netto', title: null, class: 'lblue' });


        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_provide_sostav = function () {
        var collums = [];
        collums.push({ field: 'outgoing_sostav_status_name', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_num_doc', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_count_all', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_date_readiness_amkr', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_date_outgoing', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_provide_cars_on = function () {
        var collums = [];
        collums.push({ field: 'position_new', title: null, class: null });
        collums.push({ field: 'outgoing_sostav_status_name', title: null, class: null });//
        if (this.tab_com.settings.link_num) {
            collums.push({ field: 'num_link', title: null, class: null });
        } else {
            collums.push({ field: 'num', title: null, class: null });
        }
        collums.push({ field: 'operator_abbr', title: null, class: 'operator' });
        collums.push({ field: 'limiting_abbr', title: null, class: null });
        collums.push({ field: 'operator_paid', title: null, class: null });//        
        collums.push({ field: 'current_wagon_busy', title: null, class: null });//
        collums.push({ field: 'wagon_rod_abbr', title: null, class: null });//
        collums.push({ field: 'wagon_type', title: null, class: null });
        collums.push({ field: 'wagon_gruzp_doc', title: null, class: null });
        collums.push({ field: 'wagon_gruzp_uz', title: null, class: null });
        collums.push({ field: 'wagon_adm', title: null, class: null });
        collums.push({ field: 'arrival_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_condition_abbr', title: null, class: null });
        collums.push({ field: 'current_loading_status', title: null, class: null });
        collums.push({ field: 'arrival_cargo_group_name', title: null, class: null });
        collums.push({ field: 'arrival_cargo_name', title: null, class: null });
        collums.push({ field: 'arrival_sertification_data', title: null, class: null });
        collums.push({ field: 'arrival_station_from_name', title: null, class: null });
        collums.push({ field: 'arrival_station_amkr_name', title: null, class: null });
        collums.push({ field: 'current_operation_name', title: null, class: null });
        collums.push({ field: 'current_operation_start', title: null, class: null });
        collums.push({ field: 'current_operation_end', title: null, class: null });
        collums.push({ field: 'arrival_division_amkr_abbr', title: null, class: null });
        collums.push({ field: 'sap_incoming_supply_cargo_ban', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_num', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_date', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_time', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_cargo_code', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_cargo_name', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_warehouse_code', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_incoming_supply_warehouse_name', title: null, class: 'lyellow' });
        collums.push({ field: 'sap_outgoing_supply_num', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_date', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_cargo_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_cargo_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_destination_station_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_destination_station_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_border_checkpoint_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_border_checkpoint_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_shipper_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_shipper_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_payer_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_payer_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_warehouse_code', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_warehouse_name', title: null, class: 'lblue' });
        collums.push({ field: 'sap_outgoing_supply_netto', title: null, class: 'lblue' });


        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    table_ws.prototype.init_columns_collect_wagons = function () {
        var collums = [];
        collums.push({ field: 'position', title: null, class: null });
        collums.push({ field: 'num', title: null, class: null });
        collums.push({ field: 'valid_sys_numbering', title: null, class: null });
        collums.push({ field: 'dislocation_vagon_of_amkr', title: null, class: null });
        return this.tab_com.init_columns_detali(collums, this.tab_com.list_collums);
    };

    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок  
    //-------------------------------------------------------------------------------------------
    // Инициализация тип отчета
    table_ws.prototype.init_type_report = function () {
        switch (this.tab_com.settings.type_report) {
            case 'cars_way': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = true;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.wimId); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.wirHighlightColor !== null) {
                        $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    }
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(2).attr('style', 'background-color:' + data.operatorColor)
                        //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    }
                    // Проверим если по оператору контролировать норму времени, тогда проверить
                    if (data.arrivalIdleTime < data.arrivalDuration) {
                        // Превышена норма нахождения вагона на АМКР
                        $('td', row).eq(29).addClass('idle-time-error');
                        //$('td.arrival-duration', row).addClass('idle-time-error');
                        if (data.operatorMonitoringIdleTime) {
                            $('td', row).eq(1).addClass('idle-time-error');
                        };
                    }
                    // Прибыл
                    if (data.currentIdOperation === 1) {
                        //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                        $('td', row).eq(0).addClass('red');
                        $('td', row).eq(1).addClass('red');
                    }
                    // Предъявлен или сдан
                    if (data.currentIdOperation === 9 || data.currentIdOperation === 8) {
                        if (data.outgoingSostavStatus === 2) {
                            $('td', row).eq(0).addClass('green');
                            $('td', row).eq(1).addClass('green');
                        }
                        if (data.outgoingSostavStatus === 1 || data.outgoingSostavStatus === 0) {
                            $('td', row).eq(0).addClass('yellow');
                            $('td', row).eq(1).addClass('yellow');
                        }
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_cars_way();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag(); //   this.init_button_req1892();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Вагоны на пути прибытия
            case 'arrival_cars_way': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.wimId); // id строки дислокации вагона
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.wirHighlightColor !== null) {
                        $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    }
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(2).attr('style', 'background-color:' + data.operatorColor)
                        //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    }
                    // Проверим если по оператору контролировать норму времени, тогда проверить
                    if (data.arrivalIdleTime < data.arrivalDuration) {
                        // Превышена норма нахождения вагона на АМКР
                        $('td', row).eq(29).addClass('idle-time-error');
                        //$('td.arrival-duration', row).addClass('idle-time-error');
                        if (data.operatorMonitoringIdleTime) {
                            $('td', row).eq(1).addClass('idle-time-error');
                        };
                    }
                    // Прибыл
                    if (data.currentIdOperation === 1) {
                        //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                        $('td', row).eq(0).addClass('red');
                        $('td', row).eq(1).addClass('red');
                    }
                    // Предъявлен или сдан
                    if (data.currentIdOperation === 9 || data.currentIdOperation === 8) {
                        if (data.outgoingSostavStatus === 2) {
                            $('td', row).eq(0).addClass('green');
                            $('td', row).eq(1).addClass('green');
                        }
                        if (data.outgoingSostavStatus === 1 || data.outgoingSostavStatus === 0) {
                            $('td', row).eq(0).addClass('yellow');
                            $('td', row).eq(1).addClass('yellow');
                        }
                    }
                    if (data.id_wir_from === null) {
                        $(row).addClass('ban');  // Отметим вагон заблокирован
                    }
                    if (data.id_way_dissolution === null) {
                        $(row).addClass('ban');  // Отметим вагон заблокирован
                    }
                    if (data.id_wim_arrival === null) {
                        $(row).addClass('ban');  // Отметим вагон заблокирован
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_arrival_cars_way();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_EyE_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Вагоны на пути отправки
            case 'outgoing_cars_way': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.fromIdWim); // id строки дислокации вагона в момент отправки
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.wirHighlightColor !== null) {
                        $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    }
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(7).attr('style', 'background-color:' + data.operatorColor)
                        //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    }
                    //// Проверим если по оператору контролировать норму времени, тогда проверить
                    //if (data.arrivalIdleTime < data.arrivalDuration) {
                    //    // Превышена норма нахождения вагона на АМКР
                    //    $('td', row).eq(29).addClass('idle-time-error');
                    //    //$('td.arrival-duration', row).addClass('idle-time-error');
                    //    if (data.operatorMonitoringIdleTime) {
                    //        $('td', row).eq(1).addClass('idle-time-error');
                    //    };
                    //}
                    // Прибыл
                    if (data.currentIdOperation === 1) {
                        //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                        $('td', row).eq(0).addClass('red');
                        $('td', row).eq(1).addClass('red');
                    }
                    // Предъявлен или сдан
                    if (data.currentIdOperation === 9 || data.currentIdOperation === 8) {
                        if (data.outgoingSostavStatus === 2) {
                            $('td', row).eq(0).addClass('green');
                            $('td', row).eq(1).addClass('green');
                        }
                        if (data.outgoingSostavStatus === 1 || data.outgoingSostavStatus === 0) {
                            $('td', row).eq(0).addClass('yellow');
                            $('td', row).eq(1).addClass('yellow');
                        }
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_outgoing_cars_way();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            case 'total_balance': {
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = false;
                this.tab_com.info = false;
                //this.tab_com.columnDefs = null;
                //this.tab_com.order_column = [0, 'asc'];
                /*                this.tab_com.type_select_rows = 1; // Выбирать одну*/
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = false;
                this.tab_com.createdRow = function (row, data, index) {

                }.bind(this);
                this.tab_com.table_columns = this.init_columns_total_balance();
                this.tab_com.table_buttons = []; //
                this.tab_com.dom = 'frtip';
                break;
            };
            case 'operators_station': {
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = false;
                //this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                /*                this.tab_com.type_select_rows = 1; // Выбирать одну*/
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = false;
                //"scrollY": "600px",
                this.tab_com.footerCallback = function (tr, data, start, end, display) {
                    var api = this.api();
                    var count = api
                        .column(1)
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);
                    $(tr)
                        .find('th span')
                        .eq(1)
                        .html(count);
                };
                this.tab_com.createdRow = function (row, data, index) {
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(1).attr('style', 'background-color:' + data.operatorColor)
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_operators_station();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld();
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr><th class="text-end">ИТОГО:</th><th class="text-end"></th></tr></tfoot>';
                break;
            };
            case 'operators_way_station': {
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = false;
                //this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                /*                this.tab_com.type_select_rows = 1; // Выбирать одну*/
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = false;
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
                this.tab_com.createdRow = function (row, data, index) {
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(1).attr('style', 'background-color:' + data.operatorColor)
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_operators_way_station();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn();
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr><th colspan="2" class="text-end">ИТОГО:</th><th class="text-end"></th></tr></tfoot>';

                break;
            };
            case 'operators_send_station': {
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = false;
                //this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                /*                this.tab_com.type_select_rows = 1; // Выбирать одну*/
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = false;
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
                this.tab_com.createdRow = function (row, data, index) {
                    $('td', row).eq(0).attr('title', data.nameOuterWayRu);
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(1).attr('style', 'background-color:' + data.operatorColor)
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_operators_send_station();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn();
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr><th colspan="2" class="text-end">ИТОГО:</th><th class="text-end"></th></tr></tfoot>';

                break;
            };
            case 'operators_arrival_station': {
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = true;
                this.tab_com.info = false;
                //this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                /*                this.tab_com.type_select_rows = 1; // Выбирать одну*/
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = false;
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
                this.tab_com.createdRow = function (row, data, index) {
                    $('td', row).eq(0).attr('title', data.nameOuterWayRu);
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(1).attr('style', 'background-color:' + data.operatorColor)
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_operators_arrival_station();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn();
                this.tab_com.dom = 'Bfrtip';
                this.tab_com.html_footer = '<tfoot><tr><th colspan="2" class="text-end">ИТОГО:</th><th class="text-end"></th></tr></tfoot>';

                break;
            };
            case 'sostav_outer_ways': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [9, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = true;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.outerWayNumSostav); // id строки дислокации вагона
                    if (data.countWagonsAccepted >= 1) {
                        $(row).addClass('yellow');
                    }
                    if (data.banSostav) {
                        $(row).addClass('ban');  // Отметим вагон заблокирован
                    }
                    $('td', row).eq(0).attr('title', data.nameOuterWayRu);
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_sostav_outer_ways();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag();
                this.tab_com.dom = 'Bfrtip'; //p
                break;
            };
            // Вагоны прибывшего сотава
            case 'wagons_outer_way': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.fromIdWim); // id строки дислокации вагона в момент отправки
                    if (data.outerWayEnd !== null) {
                        $(row).addClass('ban');  // Отметим вагон заблокирован
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_wagons_outer_way();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_EyE_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Вагоны сформированого состава для отправки
            case 'wagons_new_sostav_outer_way': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.fromIdWim); // id строки дислокации вагона в момент отправки
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_wagons_new_sostav_outer_way();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Вагоны на пути начала роспуска
            case 'dissolution_cars_from': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.fromIdWim); // id строки дислокации вагона в момент отправки
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    //if (data.wirHighlightColor !== null) {
                    //    $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    //}
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(7).attr('style', 'background-color:' + data.operatorColor)
                        //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    }
                    //// Проверим если по оператору контролировать норму времени, тогда проверить
                    //if (data.arrivalIdleTime < data.arrivalDuration) {
                    //    // Превышена норма нахождения вагона на АМКР
                    //    $('td', row).eq(29).addClass('idle-time-error');
                    //    //$('td.arrival-duration', row).addClass('idle-time-error');
                    //    if (data.operatorMonitoringIdleTime) {
                    //        $('td', row).eq(1).addClass('idle-time-error');
                    //    };
                    //}
                    if (data.num_way_dissolution) {
                        $(row).addClass('red');
                    };
                    // Прибыл
                    if (data.currentIdOperation === 1) {
                        //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                        $('td', row).eq(0).addClass('red');
                        $('td', row).eq(1).addClass('red');
                    }
                    // Предъявлен или сдан
                    if (data.currentIdOperation === 9 || data.currentIdOperation === 8) {
                        if (data.outgoingSostavStatus === 2) {
                            $('td', row).eq(0).addClass('green');
                            $('td', row).eq(1).addClass('green');
                        }
                        if (data.outgoingSostavStatus === 1 || data.outgoingSostavStatus === 0) {
                            $('td', row).eq(0).addClass('yellow');
                            $('td', row).eq(1).addClass('yellow');
                        }
                    }
                    if (data.id_way_dissolution !== null) {
                        $(row).addClass('ban');  // Отметим вагон заблокирован
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_dissolution_cars_from();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_EyE_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Пути роспуска
            case 'dissolution_ways': {
                //this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                //this.tab_com.pageLength = 10;
                this.tab_com.deferRender = false;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = false;
                this.tab_com.info = false;
                this.tab_com.fixedHeader = false;            // вкл. фикс. заголовка
                //this.tab_com.leftColumns = 1;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = true;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.id); // id строки дислокации вагона в момент отправки
                    if (data.countDissWagons > 0) {
                        $(row).addClass('yellow');  // Отметим путь 
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_dissolution_ways();
                //this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Ref_EyE();
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Вагоны на пути отправки
            case 'dislocation_cars_from': {
                this.tab_com.lengthMenu = [[10, 20, 50, 100, -1], [10, 20, 50, 100, langView('t_com_title_all', App.Langs)]];
                this.tab_com.pageLength = 10;
                this.tab_com.deferRender = true;
                this.tab_com.paging = true;
                this.tab_com.searching = true;
                this.tab_com.ordering = true;
                this.tab_com.info = true;
                this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.fromIdWim); // id строки дислокации вагона в момент отправки
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.wirHighlightColor !== null) {
                        $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    }
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(7).attr('style', 'background-color:' + data.operatorColor)
                        //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    }
                    //// Проверим если по оператору контролировать норму времени, тогда проверить
                    //if (data.arrivalIdleTime < data.arrivalDuration) {
                    //    // Превышена норма нахождения вагона на АМКР
                    //    $('td', row).eq(29).addClass('idle-time-error');
                    //    //$('td.arrival-duration', row).addClass('idle-time-error');
                    //    if (data.operatorMonitoringIdleTime) {
                    //        $('td', row).eq(1).addClass('idle-time-error');
                    //    };
                    //}
                    if (data.id_wir_from !== null) {
                        $(row).addClass('ban red');  // Отметим вагон заблокирован
                    }
                    // Прибыл
                    if (data.currentIdOperation === 1) {
                        //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                        $('td', row).eq(0).addClass('red');
                        $('td', row).eq(1).addClass('red');
                    }
                    // Предъявлен или сдан
                    if (data.currentIdOperation === 9 || data.currentIdOperation === 8) {
                        if (data.outgoingSostavStatus === 2) {
                            $('td', row).eq(0).addClass('green');
                            $('td', row).eq(1).addClass('green');
                        }
                        if (data.outgoingSostavStatus === 1 || data.outgoingSostavStatus === 0) {
                            $('td', row).eq(0).addClass('yellow');
                            $('td', row).eq(1).addClass('yellow');
                        }
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_dislocation_cars_from();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_EyE_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Вагоны на пути отправки
            case 'provide_cars_from': {
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
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.fromIdWim); // id строки дислокации вагона в момент отправки
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.wirHighlightColor !== null) {
                        $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    }
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(3).attr('style', 'background-color:' + data.operatorColor)
                        //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    }
                    //// Проверим если по оператору контролировать норму времени, тогда проверить
                    //if (data.arrivalIdleTime < data.arrivalDuration) {
                    //    // Превышена норма нахождения вагона на АМКР
                    //    $('td', row).eq(29).addClass('idle-time-error');
                    //    //$('td.arrival-duration', row).addClass('idle-time-error');
                    //    if (data.operatorMonitoringIdleTime) {
                    //        $('td', row).eq(1).addClass('idle-time-error');
                    //    };
                    //}
                    if (data.id_wir_from !== null) {
                        $(row).addClass('ban red');  // Отметим вагон заблокирован
                    }
                    // Прибыл
                    //if (data.currentIdOperation === 1) {
                    //    //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                    //    $('td', row).eq(0).addClass('red');
                    //    $('td', row).eq(1).addClass('red');
                    //}
                    // Предъявлен или сдан
                    if (data.currentIdOperation === 9 || data.currentIdOperation === 8) {
                        if (data.outgoingSostavStatus === 2) {
                            $('td', row).eq(0).addClass('green');
                            $('td', row).eq(1).addClass('green');
                            $('td', row).eq(2).addClass('green');
                        }
                        if (data.outgoingSostavStatus === 1 || data.outgoingSostavStatus === 0) {
                            $('td', row).eq(0).addClass('yellow');
                            $('td', row).eq(1).addClass('yellow');
                            $('td', row).eq(2).addClass('yellow');
                        }
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_provide_cars_from();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_EyE_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Таблица отправленные составы 
            case 'provide_sostav': {
                this.tab_com.deferRender = true;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = false;
                this.tab_com.info = false;
                //this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                //this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = true;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.id); // id строки дислокации вагона
                    ////$(row).attr('data-num', data.num); // data-num номер вагона
                    ////if (data.wirHighlightColor !== null) {
                    ////    $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    ////}
                    //// Цвет оператора
                    //if (data.operatorColor && data.operatorColor !== '') {
                    //    $('td', row).eq(2).attr('style', 'background-color:' + data.operatorColor)
                    //    //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    //}
                    //// Проверим если по оператору контролировать норму времени, тогда проверить
                    //if (data.arrivalIdleTime < data.arrivalDuration) {
                    //    // Превышена норма нахождения вагона на АМКР
                    //    $('td', row).eq(29).addClass('idle-time-error');
                    //    //$('td.arrival-duration', row).addClass('idle-time-error');
                    //    if (data.operatorMonitoringIdleTime) {
                    //        $('td', row).eq(1).addClass('idle-time-error');
                    //    };
                    //}
                    //// Прибыл
                    //if (data.currentIdOperation === 1) {
                    //    //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                    //    $('td', row).eq(0).addClass('red');
                    //    $('td', row).eq(1).addClass('red');
                    //}
                    // Предъявлен или сдан
                    if (data.status === 2) {
                        $(row).addClass('green');
                    }
                    if (data.status === 1 || data.status === 0) {
                        $(row).addClass('yellow');
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_provide_sostav();
                //this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref([]);
                this.tab_com.dom = 'frtip';
                break;
            };
            // Вагоны на пути отправки
            case 'provide_cars_on': {
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
                this.tab_com.order_column = [0, 'asc'];
                this.tab_com.type_select_rows = 2; // Выбирать одну
                this.tab_com.table_select = {
                    style: 'multi'
                };
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.fromIdWim); // id строки дислокации вагона в момент отправки
                    $(row).attr('data-num', data.num); // data-num номер вагона
                    if (data.wirHighlightColor !== null) {
                        $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    }
                    // Цвет оператора
                    if (data.operatorColor && data.operatorColor !== '') {
                        $('td', row).eq(3).attr('style', 'background-color:' + data.operatorColor)
                        //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    }
                    //// Проверим если по оператору контролировать норму времени, тогда проверить
                    //if (data.arrivalIdleTime < data.arrivalDuration) {
                    //    // Превышена норма нахождения вагона на АМКР
                    //    $('td', row).eq(29).addClass('idle-time-error');
                    //    //$('td.arrival-duration', row).addClass('idle-time-error');
                    //    if (data.operatorMonitoringIdleTime) {
                    //        $('td', row).eq(1).addClass('idle-time-error');
                    //    };
                    //}
                    if (data.id_wir_from === null) {
                        $(row).addClass('ban');  // Отметим вагон заблокирован
                    }
                    // Прибыл
                    //if (data.currentIdOperation === 1) {
                    //    //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                    //    $('td', row).eq(0).addClass('red');
                    //    $('td', row).eq(1).addClass('red');
                    //}
                    // Предъявлен или сдан
                    if (data.currentIdOperation === 9 || data.currentIdOperation === 8) {
                        if (data.outgoingSostavStatus === 2) {
                            $('td', row).eq(0).addClass('green');
                            $('td', row).eq(1).addClass('green');
                            $('td', row).eq(2).addClass('green');
                        }
                        if (data.outgoingSostavStatus === 1 || data.outgoingSostavStatus === 0) {
                            $('td', row).eq(0).addClass('yellow');
                            $('td', row).eq(1).addClass('yellow');
                            $('td', row).eq(2).addClass('yellow');
                        }
                    }
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_provide_cars_on();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn_Fld_Ref_EyE_Pag(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
                break;
            };
            // Таблица отправленные составы 
            case 'collect_wagons': {
                this.tab_com.deferRender = false;
                this.tab_com.paging = false;
                this.tab_com.searching = false;
                this.tab_com.ordering = false;
                this.tab_com.info = false;
                //this.tab_com.fixedHeader = true;            // вкл. фикс. заголовка
                //this.tab_com.leftColumns = 2;
                this.tab_com.columnDefs = null;
                this.tab_com.order_column = [0, 'asc'];
                //this.tab_com.type_select_rows = 1; // Выбирать одну
                this.tab_com.table_select = false;
                this.tab_com.autoWidth = true;
                this.tab_com.createdRow = function (row, data, index) {
                    $(row).attr('id', data.num); // id строки дислокации вагона
                    ////$(row).attr('data-num', data.num); // data-num номер вагона
                    ////if (data.wirHighlightColor !== null) {
                    ////    $(row).attr('style', 'background-color:' + data.wirHighlightColor + ' !important;');
                    ////}
                    //// Цвет оператора
                    //if (data.operatorColor && data.operatorColor !== '') {
                    //    $('td', row).eq(2).attr('style', 'background-color:' + data.operatorColor)
                    //    //$('td.operator', row).attr('style', 'background-color:' + data.operatorColor)
                    //}
                    //// Проверим если по оператору контролировать норму времени, тогда проверить
                    //if (data.arrivalIdleTime < data.arrivalDuration) {
                    //    // Превышена норма нахождения вагона на АМКР
                    //    $('td', row).eq(29).addClass('idle-time-error');
                    //    //$('td.arrival-duration', row).addClass('idle-time-error');
                    //    if (data.operatorMonitoringIdleTime) {
                    //        $('td', row).eq(1).addClass('idle-time-error');
                    //    };
                    //}
                    //// Прибыл
                    //if (data.currentIdOperation === 1) {
                    //    //$('td.fixed-column', row).addClass('red'); // Отметим прибытие
                    //    $('td', row).eq(0).addClass('red');
                    //    $('td', row).eq(1).addClass('red');
                    //}
                    // Предъявлен или сдан
                    //if (data.status === 2) {
                    //    $(row).addClass('green');
                    //}
                    //if (data.status === 1 || data.status === 0) {
                    //    $(row).addClass('yellow');
                    //}
                }.bind(this);
                this.tab_com.table_columns = this.init_columns_collect_wagons();
                this.tab_com.table_buttons = this.tab_com.init_button_Ex_Prn(this.tab_com.settings.setup_buttons);
                this.tab_com.dom = 'Bfrtip';
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
    table_ws.prototype.init = function (options) {
        this.tab_com.init(options);
    };
    // Показать данные
    table_ws.prototype.view = function (data, id_select) {
        this.tab_com.view(data, id_select);
    };
    //
    //table_ws.prototype.view_footer = function (data) {
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
    //table_ws.prototype.out_clear = function () {
    //    if (this.settings.alert) {
    //        this.settings.alert.clear_message()
    //    }
    //}
    //// Показать ошибки
    //table_ws.prototype.out_error = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_error_message(message)
    //    }
    //};
    //// Показать предупреждения
    //table_ws.prototype.out_warning = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_warning_message(message)
    //    }
    //};
    //// Показать сообщения о выполнении действий
    //table_ws.prototype.out_info = function (message) {
    //    if (this.settings.alert) {
    //        this.settings.alert.out_info_message(message)
    //    }
    //};
    // Очистить объект
    table_ws.prototype.destroy = function () {
        //
        this.tab_com.destroy();
    };
    // Очистить детали по указаному пути
    table_ws.prototype.destroy_detali = function (data) {
        this.tab_com.destroy_detali(data);
    };
    //
    App.table_ws = table_ws;

    window.App = App;
})(window);