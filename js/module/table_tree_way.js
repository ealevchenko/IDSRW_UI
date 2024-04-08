/*Модуль библиотека таблиц для отчета ТД*/
(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var API_DIRECTORY = App.ids_directory;

    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'title_card_header': 'Дерево путей',
            'title_inp_out': 'Прин.-Отпр.',
            'title_count': 'Всего',
            'title_count_amkr': 'АМКР',
            'title_max': 'Мак.',
            'title_totals': 'ИТОГО:',
            'title_info_detali': 'Информация детально...',
            'title_open_tree_park': 'Открыть парки дерева путей...',
            'title_open_tree_way': 'Открыть все пути...',
            'title_close_tree': 'Закрыть дерево путей',
            'title_refresh_tree': 'Обновить дерево путей',
            'mess_load_station': 'Загружаю список станций...',
            'mess_load_park': 'Загружаю список парков...',
            'mess_load_way': 'Загружаю список путей...',
            'mess_update_status': 'Обновляю информацию по состоянию дерева путей...',
            'mess_open_tree': 'Раскрываю дерево путей...',
        },
        'en':  //default language: English
        {
            'title_card_header': 'Path Tree',
            'title_inp_out': 'Receive-Send',
            'title_count': 'Total',
            'title_count_amkr': 'AMKR',
            'title_max': 'Mac.',
            'title_totals': 'TOTAL:',
            'title_info_detali': 'Information in detail ...',
            'title_open_tree_park': 'Open path tree parks ...',
            'title_open_tree_way': 'Open all paths ...',
            'title_close_tree': 'Close path tree',
            'title_refresh_tree': 'Refresh path tree',
            'mess_load_station': 'Loading the list of stations ...',
            'mess_load_park': 'Loading list of parks ...',
            'mess_load_way': 'Loading the list of paths ...',
            'mess_update_status': 'Updating information on the state of the path tree ...',
            'mess_open_tree': 'Expanding the path tree ...',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_tree_way(selector) {
        // Инициализация компонента и модуля
        if (!selector) {
            throw new Error('Не указан селектор');
        }
        this.$tw = $(selector);
        if (this.$tw.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + selector);
        }
        //this.fc_ui = new FC();
        this.fe_ui = new FE();
        this.selector = this.$tw.attr('id');
    }
    //------------------------------- ИНИЦИАЛИЗАЦИЯ И ОТОБРАЖЕНИЕ ----------------------------------
    // Инициализация
    table_tree_way.prototype.init = function (options) {
        this.result_init = true;
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            api_dir: null,
            fn_init: null,
        }, options);
        // определим библиотеку  dir
        this.api_dir = this.settings.api_dir ? this.settings.api_dir : new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

        this.$tw.attr("style", "overflow-x:auto");
        this.$tw.empty();
        this.$table = new this.fe_ui.table({
            id: this.selector + '-table',
            class: 'table table-sm table-hover',
            title: null,
        });
        this.$tw.append(this.$table.$html);
        // Создаем макет таблицы дерева
        // ЗАГОЛОВОК
        this.$thead = new this.fe_ui.thead({
            class: 'thead-light fw-normal text-uppercase',
        });
        this.$tr = new this.fe_ui.tr({

        });
        this.$th_name = new this.fe_ui.th({
            width: '60%',
            scope: 'col',
            colspan: '5',
            class: 'fw-normal text-uppercase',
        });
        this.$th_pb = new this.fe_ui.th({
            width: '20%',
            scope: 'col',
            colspan: '1',
            text: langView('title_inp_out', App.Langs),
            class: 'fw-normal text-uppercase',
        });
        this.$th_count = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            text: langView('title_count', App.Langs),
            class: 'fw-normal text-uppercase',
        });
        this.$th_amkr = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            text: langView('title_count_amkr', App.Langs),
            class: 'fw-normal text-uppercase',
        });
        this.$th_capacity = new this.fe_ui.th({
            width: '10%',
            scope: 'col',
            colspan: '1',
            text: langView('title_max', App.Langs),
            class: 'fw-normal text-uppercase',
        });
        this.$table.$html.append(this.$thead.$html.append(this.$tr.$html.append(this.$th_name.$html).append(this.$th_pb.$html).append(this.$th_count.$html).append(this.$th_amkr.$html).append(this.$th_capacity.$html)));
        // ДАННЫЕ
        this.$tbody = new this.fe_ui.tbody({
        });
        this.$table.$html.append(this.$tbody.$html);
        // ПОДВАЛ
        this.$tfoot = new this.fe_ui.tfoot({
            class: 'bg-secondary text-white',
        });
        this.$trf = new this.fe_ui.tr({
        });
        this.$thf_name = new this.fe_ui.th({
            width: '60%',
            scope: 'col',
            colspan: '5',
            text: langView('title_totals', App.Langs),
            class: 'fw-normal text-uppercase',
        });
        this.$thf_pb = new this.fe_ui.th({
            width: '20%',
            scope: 'col',
            colspan: '1',
            class: 'fw-normal text-uppercase',
        });
        this.$thf_count = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            class: 'fw-normal text-uppercase',
        });
        this.$thf_amkr = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            class: 'fw-normal text-uppercase',
        });
        this.$thf_capacity = new this.fe_ui.th({
            width: '10%',
            scope: 'col',
            colspan: '1',
            class: 'fw-normal text-uppercase',
        });
        this.$table.$html.append(this.$tfoot.$html.append(this.$trf.$html.append(this.$thf_name.$html).append(this.$thf_pb.$html).append(this.$thf_count.$html).append(this.$thf_amkr.$html).append(this.$thf_capacity.$html)));

        // На проверку окончания инициализации
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    //
    table_tree_way.prototype.view = function (list_station, id_station, id_park, id_way) {
        this.view_station(list_station, id_station, id_park, id_way, function () {
            LockScreenOff();
        })
    };

    table_tree_way.prototype.view_tr_station = function (base, el) {
        this.$tr = new base.fe_ui.tr({});
        this.$tr.$html.attr('data-tree-area', 'station');
        this.$tr.$html.attr('data-station', el.id);
        var $td_control = new base.fe_ui.td({
            width: '18px',
            class: 'station-control',
        });
        var $td_img_station = new base.fe_ui.td({
            width: '18px',
            class: 'icon-station',
        });
        var $td_name = new base.fe_ui.td({
            class: 'text-left',
            text: el["stationName" + ucFirst(App.Lang)],
            colspan: '3'
        });
        //
        var $td_pb = new base.fe_ui.td({
            class: 'text-centr',
        });
        var $td_count = new base.fe_ui.td({
            class: 'text-right',
            text: el.countAllWagons,
        });
        var $td_amkr = new base.fe_ui.td({
            class: 'text-right',
            text: el.countAmkrWagons,
        });
        var $td_capacity = new base.fe_ui.td({
            class: 'text-right',
            text: el.capacityWagons,
        });
        //$td_pb.$html.append(as_Element.$element);
        this.$tr.$html.append($td_control.$html).append($td_img_station.$html).append($td_name.$html).append($td_pb.$html).append($td_count.$html).append($td_amkr.$html).append($td_capacity.$html);
    };

    // Показать станции
    table_tree_way.prototype.view_station = function (list_station, id_station, id_park, id_way, callback) {
        this.$tbody.$html.empty();
        //var base = this;
        this.list_station = list_station;
        this.load_station(this.list_station, function (stations) {
            $.each(stations, function (i, el) {

                var $trbody = new this.view_tr_station(this, el);
                $trbody.$tr.$html.on('click', 'td.station-control', function (e) {
                    var tr = $(e.currentTarget).closest('tr');
                    var id_station = tr.attr('data-station');
                    //this.view_park(id_station, null, null, function () {
                    //    LockScreenOff();
                    //}); // Показать парки
                }.bind(this));
                this.$tbody.$html.append($trbody.$tr.$html);
                //        var trbodyElement = new table_tr_station(base.selector, el); // Получим парк
                //        // Настроим событие нажатия на "открыть"\"закрыть" парк
                //        trbodyElement.$element.on('click', 'td.station-control', function (e) {
                //            var tr = $(e.currentTarget).closest('tr');
                //            var id_station = tr.attr('data-station');
                //            this.view_park(id_station, null, null, function () {
                //                LockScreenOff();
                //            }); // Показать парки
                //        }.bind(base));
                //        // Добавим элемент
                //        base.body.append(trbodyElement.$element);
                //        if (id_station && el.id === id_station) {
                //            base.view_park(id_station, id_park, id_way, function () {
                //                LockScreenOff();
                //            }); // Показать парки
                //        }
            }.bind(this));
            //    base.select_way(id_way);
            //    base.update_foot();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };

    //--------------------------------Станции-----------------------------------
    // Загрузить станции из базы
    table_tree_way.prototype.load_station = function (list_station, callback) {
        LockScreen(langView('mess_load_station', App.Langs));
        this.api_dir.getViewStatusAllStation(function (stations) {
            if (typeof callback === 'function') {
                var current_stations = stations.filter(function (i) {
                    return !i.station_uz;
                });
                if (list_station && list_station.length > 0) {
                    current_stations = current_stations.filter(function (i) {
                        return list_station.find(function (o) {
                            return o.id == i.id && o.checked;
                        });
                    });
                }
                callback(current_stations);
            }
        }.bind(this));
    };


    //------------------------------- СООБЩЕНИЯ ----------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_tree_way.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_tree_way.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    table_tree_way.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    table_tree_way.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    table_tree_way.prototype.destroy = function () {
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$tw.empty(); // empty in case the columns change
    };
    // Очистить детали по указаному пути
    table_tree_way.prototype.destroy_detali = function (data) {
        if (this.tables_detali[data.id]) {
            this.tables_detali[data.id].destroy();
            delete this.tables_detali[data.id];
        }
    };
    // Очистить все детали
    table_tree_way.prototype.destroy_all_detali = function () {
        $.each(this.tables_detali, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.tables_detali = {};
    };

    App.table_tree_way = table_tree_way;

    window.App = App;
})(window);