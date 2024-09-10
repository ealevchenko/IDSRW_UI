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
            'title_st_prk_way': 'Станция\\Парк\\Путь',
            'title_inp_out': 'Прин.-Отпр.',
            'title_count': 'Всего',
            'title_count_amkr': 'АМКР',
            'title_max': 'max',
            'title_totals': 'ИТОГО:',
            'title_info_detali': 'Информация детально...',
            'title_open_tree_park': 'Открыть парки дерева путей...',
            'title_open_tree_way': 'Открыть все пути...',
            'title_close_tree': 'Закрыть дерево путей',
            'title_refresh_tree': 'Обновить дерево путей',
            'title_button_total': 'Показать детально по операторам...',
            'mess_load_station': 'Загружаю список станций...',
            'mess_load_park': 'Загружаю список парков...',
            'mess_load_way': 'Загружаю список путей...',
            'mess_update_status': 'Обновляю информацию по состоянию дерева путей...',
            'mess_open_tree': 'Раскрываю дерево путей...',
        },
        'en':  //default language: English
        {
            'title_card_header': 'Path Tree',
            'title_st_prk_way': 'Station\\Park\\Way',
            'title_inp_out': 'Receive-Send',
            'title_count': 'Total',
            'title_count_amkr': 'AMKR',
            'title_max': 'max',
            'title_totals': 'TOTAL:',
            'title_info_detali': 'Information in detail ...',
            'title_open_tree_park': 'Open path tree parks ...',
            'title_open_tree_way': 'Open all paths ...',
            'title_close_tree': 'Close path tree',
            'title_refresh_tree': 'Refresh path tree',
            'title_button_total': 'Show details by operators...',
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
            fn_select_way: null,
            fn_select_station: null,
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
            class: 'table-secondary p-2', //thead-light fw-normal text-uppercase
        });
        this.$tr = new this.fe_ui.tr({

        });
        this.$th_name = new this.fe_ui.th({
            width: '60%',
            scope: 'col',
            colspan: '5',
            text: langView('title_st_prk_way', App.Langs),
            class: 'text-start text-uppercase',
        });
        this.$th_pb = new this.fe_ui.th({
            width: '20%',
            scope: 'col',
            colspan: '1',
            text: langView('title_inp_out', App.Langs),
            class: 'text-center text-uppercase',
        });
        this.$th_count = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            text: langView('title_count', App.Langs),
            class: 'text-end text-uppercase',
        });
        this.$th_amkr = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            text: langView('title_count_amkr', App.Langs),
            class: 'text-end text-uppercase',
        });
        this.$th_capacity = new this.fe_ui.th({
            width: '10%',
            scope: 'col',
            colspan: '1',
            text: langView('title_max', App.Langs),
            class: 'text-end text-uppercase',
        });
        this.$table.$html.append(this.$thead.$html.append(this.$tr.$html.append(this.$th_name.$html).append(this.$th_pb.$html).append(this.$th_count.$html).append(this.$th_amkr.$html).append(this.$th_capacity.$html)));
        // ДАННЫЕ
        this.$tbody = new this.fe_ui.tbody({
        });
        this.$table.$html.append(this.$tbody.$html);
        // ПОДВАЛ
        this.$tfoot = new this.fe_ui.tfoot({
            class: 'table-dark text-white',
        });
        this.$trf = new this.fe_ui.tr({
            /*            class: 'bg-dark text-white',*/
        });
        this.$thf_name = new this.fe_ui.th({
            width: '60%',
            scope: 'col',
            colspan: '5',
            text: langView('title_totals', App.Langs),
            class: 'fw-bold text-uppercase text-end',
        });
        this.$thf_pb = new this.fe_ui.th({
            width: '20%',
            scope: 'col',
            colspan: '1',
            class: 'fw-bold text-center',
        });
        this.$thf_count = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            class: 'fw-bold text-end',
        });
        this.$thf_amkr = new this.fe_ui.th({
            width: '5%',
            scope: 'col',
            colspan: '1',
            class: 'fw-bold text-end',
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
    table_tree_way.prototype.view = function (list_station, id_station, id_park, id_way, callback) {
        this.view_station(list_station, id_station, id_park, id_way, function () {
            if (typeof callback === 'function') {
                callback();
            }
            //LockScreenOff();
        })
    };
    // обновление дерева путей
    table_tree_way.prototype.update = function (callback) {
        var tr = this.$tbody.$html.find('tr');
        this.count_update = tr.length;
        if (tr && tr.length > 0) LockScreen(langView('mess_update_status', App.Langs)); // выведем сообщение
        $.each(tr, function (i, el) {
            var area = $(el).attr('data-tree-area');
            var id_station = $(el).attr('data-station');
            var id_park = $(el).attr('data-park');
            var id_way = $(el).attr('data-way');
            switch (area) {
                case 'station': {
                    this.update_station_of_id(Number(id_station), function () {
                        this.count_update--;
                        if (this.count_update <= 0) {
                            this.update_foot();
                            if (typeof callback === 'function') {
                                callback();
                            }
                        }
                    }.bind(this));
                    break
                };
                case 'park': {
                    this.update_park_of_id(Number(id_station), Number(id_park), function () {
                        this.count_update--;
                        if (this.count_update <= 0) {
                            this.update_foot();
                            if (typeof callback === 'function') {
                                callback();
                            }
                        }
                    }.bind(this));
                    break
                };
                case 'way': {
                    this.update_way_of_id(Number(id_way), function () {
                        this.count_update--;
                        if (this.count_update <= 0) {
                            this.update_foot();
                            if (typeof callback === 'function') {
                                callback();
                            }
                        }
                    }.bind(this));
                    break
                };
            };
        }.bind(this));

    };

    //--------------------------------Станции-----------------------------------
    table_tree_way.prototype.create_html_arr_out = function (base, id, arr, out) {
        var div = new base.fe_ui.div({
            id: 'data-as-id' + id,
            class: 'text-center',
        });
        var linl_arr = new base.fe_ui.a({
            href: '#',
        });
        var arr_bange = new base.fe_ui.bs_badge({
            text: arr,
            color: 'bg-warning',
        });
        var linl_out = new base.fe_ui.a({
            href: '#',
        });
        var out_bange = new base.fe_ui.bs_badge({
            text: out,
            color: 'bg-success',
        });
        div.$html.append(arr > 0 ? linl_arr.$html.append(arr_bange.$html) : '0').append('-').append(out > 0 ? linl_out.$html.append(out_bange.$html) : '0');
        this.$html = div.$html;
    }

    table_tree_way.prototype.create_html_btn_all = function (base, id, count) {

        var $bt_count = new base.fe_ui.bs_button({
            id: id,
            color: 'outline-dark',
            class: 'btn-all btn-sm',
            text: count,
            title: langView('title_button_total', App.Langs)
        })
        $bt_count.$html.attr('data-bs-toggle', 'offcanvas');
        $bt_count.$html.attr('data-bs-target', '#offcanvas-operator-detali');
        $bt_count.$html.attr('aria-controls', '#offcanvas-operator-detali');
        $bt_count.$html.on('click', function (event) {
            if (typeof this.settings.fn_select_station === 'function') {
                this.settings.fn_select_station(event.currentTarget.id);
            };
        }.bind(base));
        this.$html = $bt_count.$html;
    }
    //
    table_tree_way.prototype.create_html_tr_station = function (base, el) {
        this.$tr = new base.fe_ui.tr({});
        this.$tr.$html.attr('data-tree-area', 'station');
        this.$tr.$html.attr('data-station', el.id);
        var $td_control = new base.fe_ui.td({
            width: '18px',
            class: 'station-control',
        });
        var $td_img_station = new base.fe_ui.td({
            width: '18px',
            class: (el.exitUz ? 'text-primary' : (el.id === 99 ? 'text-danger' : 'text-secondary')),
            text: '<i class="fa-solid fa-house-medical"></i>'
        });
        // + 
        var $td_name = new base.fe_ui.td({
            class: 'text-start px-1 fw-semibold',
            text: el["stationName" + ucFirst(App.Lang)],
            colspan: '3'
        });
        $td_name.$html.attr('title', 'id_station = ' + el.id);
        // элемент прибыло отправл
        var $arr_out = new base.create_html_arr_out(base, el.id, el.countArrivesWagons, el.countSentWagons);
        var $td_pb = new base.fe_ui.td({
            class: 'text-center',
        });
        var $td_count = new base.fe_ui.td({
            class: 'text-end',
            //text: el.countAllWagons,
        });
        $td_count.$html.append(new base.create_html_btn_all(base, el.id, el.countAllWagons).$html);

        var $td_amkr = new base.fe_ui.td({
            class: 'text-end',
            text: el.countAmkrWagons,
        });
        var $td_capacity = new base.fe_ui.td({
            class: 'text-end',
            text: el.capacityWagons,
        });
        $td_pb.$html.append($arr_out.$html);
        this.$tr.$html.append($td_control.$html).append($td_img_station.$html).append($td_name.$html).append($td_pb.$html).append($td_count.$html).append($td_amkr.$html).append($td_capacity.$html);
    };
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
    // Загрузить станцию по id из базы
    table_tree_way.prototype.load_station_of_id = function (id, callback) {
        this.api_dir.getViewStatusStationOfId(id, function (station) {
            if (typeof callback === 'function') {
                callback(station);
            }
        }.bind(this));
    };
    // Показать станции
    table_tree_way.prototype.view_station = function (list_station, id_station, id_park, id_way, callback) {
        this.$tbody.$html.empty();
        //var base = this;
        this.list_station = list_station;
        this.load_station(this.list_station, function (stations) {
            $.each(stations, function (i, el) {

                var $trbody = new this.create_html_tr_station(this, el);
                $trbody.$tr.$html.on('click', 'td.station-control', function (e) {
                    var tr = $(e.currentTarget).closest('tr');
                    var id_station = tr.attr('data-station');
                    this.view_park(id_station, null, null, function () {
                        LockScreenOff();
                    }); // Показать парки
                }.bind(this));
                this.$tbody.$html.append($trbody.$tr.$html);
                if (id_station && el.id === id_station) {
                    this.view_park(id_station, id_park, id_way, function () {
                        LockScreenOff();
                    }); // Показать парки
                };
            }.bind(this));
            this.select_way(id_way);
            this.update_foot();
            if (typeof callback === 'function') {
                callback();
            }
        }.bind(this));
    };
    // Обновить станциию по id
    table_tree_way.prototype.update_station_of_id = function (id_station, callback) {
        // Получим строку 
        var tr = this.$tbody.$html.find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
        if (tr && tr.length > 0) {
            var $div_pb = $(tr[0].cells[3]);
            var $td_count = $(tr[0].cells[4]);
            var $td_amkr = $(tr[0].cells[5]);
            var $td_capacity = $(tr[0].cells[6]);
            // Получаем данные
            this.load_station_of_id(id_station, function (station) {
                if (station) {
                    var $arr_out = new this.create_html_arr_out(this, station.id, station.countArrivesWagons, station.countSentWagons);
                    $div_pb.empty().append($arr_out.$html);
                    $td_count.empty().append(new this.create_html_btn_all(this, station.id, station.countAllWagons).$html);
                    $td_amkr.empty().text(station.countAmkrWagons);
                    $td_capacity.empty().text(station.capacityWagons);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    //--------------------------------ПАРКИ-----------------------------------
    //
    table_tree_way.prototype.create_html_tr_park = function (base, id_station, el, i) {
        this.$tr = new base.fe_ui.tr({});
        this.$tr.$html.attr('data-tree-area', 'park');
        this.$tr.$html.attr('data-station', id_station);
        this.$tr.$html.attr('data-park', el.id);
        this.$tr.$html.attr('data-tree-end', i === 0 ? '1' : '0');
        var $td_img_true_open = new base.fe_ui.td({
            width: '18px',
            class: i === 0 ? 'icon-tree-open-end' : 'icon-tree-open',
            style: 'border-color:#fff'
        });
        var $td_control = new base.fe_ui.td({
            width: '18px',
            class: 'park-control',
        });
        var $td_img_park = new base.fe_ui.td({
            width: '18px',
            class: 'icon-park',
            //text: '<i class="fa-solid fa-timeline"></i>'
            //text: '<i class="fa-solid fa-shuffle"></i>'
            text: '<i class="fa-solid fa-share-nodes"></i>'
        });
        var $td_name = new base.fe_ui.td({
            class: 'text-start px-1 fw-normal',
            text: el["parkAbbr" + ucFirst(App.Lang)],
            colspan: '2'
        });
        $td_name.$html.attr('title', 'id_station = ' + id_station + ', id_park = ' + el.id);
        var $td_pb = new base.fe_ui.td({
            class: 'text-center',
        });
        var $td_count = new base.fe_ui.td({
            class: 'text-end',
            text: el.countAllWagons ? el.countAllWagons : 0,
        });
        var $td_amkr = new base.fe_ui.td({
            class: 'text-end',
            text: el.countAmkrWagons ? el.countAmkrWagons : 0,
        });
        var $td_capacity = new base.fe_ui.td({
            class: 'text-end',
            text: el.capacityWagons ? el.capacityWagons : 0,
        });
        //$td_pb.$html.append(as_Element.$element);
        this.$tr.$html.append($td_img_true_open.$html).append($td_control.$html).append($td_img_park.$html).append($td_name.$html).append($td_pb.$html).append($td_count.$html).append($td_amkr.$html).append($td_capacity.$html);
    };
    // Загрузить парки станции из базы
    table_tree_way.prototype.load_park = function (id_station, callback) {
        LockScreen(langView('mess_load_park', App.Langs));
        this.api_dir.getViewStatusAllParkOfStationId(id_station, function (park) {
            if (typeof callback === 'function') {
                callback(park);
            }
        }.bind(this));
    };
    // Загрузить парк по id станции из базы
    table_tree_way.prototype.load_park_of_id = function (id_station, id_park, callback) {
        //LockScreen(langView('mess_load_park', App.Langs));
        this.api_dir.getViewStatusParkOfId(id_station, id_park, function (park) {
            if (typeof callback === 'function') {
                callback(park);
            }
        }.bind(this));
    };
    // показать парки станции
    table_tree_way.prototype.view_park = function (id_station, id_park, id_way, callback) {
        var station = this.$tbody.$html.find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
        if (station && station.length > 0) {
            // Проверим парк открыт
            var show = $(station).hasClass('shown');
            if (show) {
                this.close_way_of_station(id_station); // Удалить (закрыть) - пути
                this.close_park_of_station(id_station); // Удалить (закрыть) - парки
                $(station).removeClass('shown');
                if (typeof callback === 'function') {
                    callback(id_station);
                }
            } else {
                $(station).addClass('shown');
                this.load_park(id_station, function (parks) {
                    //var base = this;
                    // Отобразим парки
                    $.each(parks.sort(function (a, b) { return b.id - a.id; }), function (i, el) {
                        var $trbody = new this.create_html_tr_park(this, id_station, el, i);
                        $trbody.$tr.$html.on('click', 'td.park-control', function (e) {
                            var tr = $(e.currentTarget).closest('tr');
                            var id_station = tr.attr('data-station');
                            var id_park = tr.attr('data-park');
                            this.view_way(id_station, id_park, null, function () {
                                LockScreenOff();
                            }); // Показать пути
                        }.bind(this));
                        station.after($trbody.$tr.$html);
                        if (id_park && el.id === id_park) {
                            this.view_way(id_station, id_park, id_way, function () {
                                LockScreenOff();
                            }); // Показать пути
                        };
                    }.bind(this));
                    if (typeof callback === 'function') {
                        callback(id_station);
                    }
                }.bind(this));
            }
        } else {
            if (typeof callback === 'function') {
                callback(id_station);
            }
        }
    };
    // Обновить положение парка по id
    table_tree_way.prototype.update_park_of_id = function (id_station, id_park, callback) {
        // Получим строку 
        var tr = this.$tbody.$html.find('tr[data-tree-area="park"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        if (tr && tr.length > 0) {
            var $div_pb = $(tr[0].cells[4]);
            var $td_count = $(tr[0].cells[5]);
            var $td_amkr = $(tr[0].cells[6]);
            var $td_capacity = $(tr[0].cells[7]);
            // Получаем данные
            this.load_park_of_id(id_station, id_park, function (park) {
                if (park) {
                    $td_count.empty().text(park.countAllWagons);
                    $td_amkr.empty().text(park.countAmkrWagons);
                    $td_capacity.empty().text(park.capacityWagons);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    //--------------------------------Пути-----------------------------------
    table_tree_way.prototype.create_html_tr_way = function (base, id_station, id_park, el, i, end_tree) {
        this.$tr = new base.fe_ui.tr({ style: 'cursor:pointer' });
        this.$tr.$html.attr('data-tree-area', 'way');
        this.$tr.$html.attr('data-station', id_station);
        this.$tr.$html.attr('data-park', id_park);
        this.$tr.$html.attr('data-way', el.id);
        this.$tr.$html.attr('crossing-uz', el.crossingUz ? '1' : '0');
        this.$tr.$html.attr('crossing-amkr', el.crossingAmkr ? '1' : '0');
        this.$tr.$html.attr('dissolution', el.dissolution ? '1' : '0');
        this.$tr.$html.attr('output-dissolution', el.outputDissolution ? '1' : '0');
        var $td_img_tree_open_skeep = new base.fe_ui.td({
            width: '18px',
            class: end_tree === 0 ? 'icon-tree-open-skeep' : '',
            style: 'border-color:#fff'
        });
        var $td_not = new base.fe_ui.td({
            width: '18px',
            class: 'row-select',
            style: 'border-color:#fff'
        });
        var $td_img_true_open = new base.fe_ui.td({
            width: '18px',
            class: i === 0 ? 'icon-tree-open-end' : 'icon-tree-open',
            style: 'border-color:#fff'
        });
        var $td_img_way = new base.fe_ui.td({
            width: '18px',
            class: (el.deadlock ? 'text-danger' : (el.crossingUz ? 'text-primary' : (el.dissolution ? 'text-success' : null))),
            text: '<i class="fa-solid fa-pallet"></i>',
        });
        var $td_name = new base.fe_ui.td({
            class: 'text-start px-1 fst-italic',
            text: el["wayNum" + ucFirst(App.Lang)] + '-' + el["wayAbbr" + ucFirst(App.Lang)],
            colspan: '1'
        });
        $td_name.$html.attr('title', 'id_way = ' + el.id);
        var $td_pb = new base.fe_ui.td({
            class: 'text-center ',
            //style: 'text-align: center;'
        });
        var $pb = new base.fe_ui.bs_progressbar({
            id: 'way',
            name: 'way',
            class: 'mt-1',
            value: el.countAllWagons,
            max: el.capacityWagons,
        });
        var $td_count = new base.fe_ui.td({
            class: 'text-end',
            text: el.countAllWagons ? el.countAllWagons : 0,
        });
        var $td_amkr = new base.fe_ui.td({
            class: 'text-end',
            text: el.countAmkrWagons ? el.countAmkrWagons : 0,
        });
        var $td_capacity = new base.fe_ui.td({
            class: 'text-end',
            text: el.capacityWagons ? el.capacityWagons : 0,
        });
        $td_pb.$html.append($pb.$html);
        this.$tr.$html.append($td_img_tree_open_skeep.$html).append($td_not.$html).append($td_img_true_open.$html).append($td_img_way.$html).append($td_name.$html).append($td_pb.$html).append($td_count.$html).append($td_amkr.$html).append($td_capacity.$html);
    };
    // Загрузить пути из базы
    table_tree_way.prototype.load_way = function (id_station, id_park, callback) {
        LockScreen(langView('mess_load_way', App.Langs));
        this.api_dir.GetViewStatusAllWayOfStationParkId(id_station, id_park, function (ways) {
            if (typeof callback === 'function') {
                callback(ways);
            }
        }.bind(this));
    };
    // Загрузить парк по id станции из базы
    table_tree_way.prototype.load_way_of_id = function (id_way, callback) {
        //LockScreen(langView('mess_load_park', App.Langs));
        this.api_dir.GetViewStatusWayOfId(id_way, function (way) {
            if (typeof callback === 'function') {
                callback(way);
            }
        }.bind(this));
    };
    // показать пути станции
    table_tree_way.prototype.view_way = function (id_station, id_park, id_way, callback) {
        var park = this.$tbody.$html.find('tr[data-tree-area="park"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        var end_park = park.attr('data-tree-end');
        if (park && park.length > 0) {
            var show = $(park).hasClass('shown');
            if (show) {
                this.close_way_of_park(id_station, id_park);
                $(park).removeClass('shown');
                if (typeof callback === 'function') {
                    callback([]);
                }
            } else {
                $(park).addClass('shown');
                this.load_way(id_station, id_park, function (ways) {
                    //var base = this;
                    // Отобразим парки
                    $.each(ways.sort(function (a, b) { return b.positionWay - a.positionWay; }), function (i, el) {
                        var $trbody = new this.create_html_tr_way(this, id_station, id_park, el, i, Number(end_park));
                        // Обработать события выбора пути
                        $trbody.$tr.$html.on('click', function (e) {
                            var tr = $(e.currentTarget).closest('tr');
                            if (tr && tr.length > 0) {
                                this.select_way(Number(tr.attr('data-way')));
                            }
                        }.bind(this));
                        park.after($trbody.$tr.$html);
                    }.bind(this));
                    if (id_way) {
                        this.select_way(id_way);
                    }
                    if (typeof callback === 'function') {
                        callback(ways);
                    }
                }.bind(this));
            }
        } else {
            if (typeof callback === 'function') {
                callback([]);
            }
        }
    };
    // Обновить путь по id
    table_tree_way.prototype.update_way_of_id = function (id_way, callback) {
        // Получим строку 
        var tr = this.$tbody.$html.find('tr[data-tree-area="way"][data-way="' + id_way + '"]');
        if (tr && tr.length > 0) {
            var $div_pb = $(tr[0].cells[5]);
            var $td_count = $(tr[0].cells[6]);
            var $td_amkr = $(tr[0].cells[7]);
            var $td_capacity = $(tr[0].cells[8]);
            // Получаем данные
            this.load_way_of_id(id_way, function (way) {
                if (way) {
                    //var pbElement = new progress_bar(this.selector, 'park', park[0].id, park[0].capacity_wagons, park[0].count_all_wagons);
                    var $pb = new this.fe_ui.bs_progressbar({
                        id: 'way',
                        name: 'way',
                        class: 'mt-1',
                        value: way.countAllWagons,
                        max: way.capacityWagons,
                    });
                    $div_pb.empty().append($pb.$html);
                    $td_count.empty().text(way.countAllWagons);
                    $td_amkr.empty().text(way.countAmkrWagons);
                    $td_capacity.empty().text(way.capacityWagons);
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            }.bind(this));
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };
    // Выбрать путь
    table_tree_way.prototype.select_way = function (id_way) {
        var way = this.$tbody.$html.find('tr[data-way="' + id_way + '"]');
        if (way && way.length > 0) {
            this.deselect_way();
            way.addClass('select');
            // добавим глазик
            var $td_select = $(way[0].cells[1]);
            $td_select.empty().append('<i class="fa-solid fa-eye"></i>');
            //
            var id_station = Number(way.attr('data-station'));
            var id_park = Number(way.attr('data-park'));
            var id_way = Number(way.attr('data-way'));
            // получим опции
            var crossing_uz = Number(way.attr('crossing-uz'));
            var crossing_amkr = Number(way.attr('crossing-amkr'));
            var dissolution = Number(way.attr('dissolution'));
            var output_dissolution = Number(way.attr('output-dissolution'));
            var option = new Object;
            option['crossing-uz'] = crossing_uz;
            option['crossing-amkr'] = crossing_amkr;
            option['dissolution'] = dissolution;
            option['output-dissolution'] = output_dissolution;
            if (typeof this.settings.fn_select_way === 'function') {
                this.settings.fn_select_way(id_station, id_park, id_way, option);
            }
        } else {
            if (typeof this.settings.fn_select_way === 'function') {
                this.settings.fn_select_way(null, null, null, null);
            }
        }
    };

    //-----------------------------Управление ветками дерева-----------------
    // Закрыть все дерево
    table_tree_way.prototype.close_tree = function () {
        $(this.$tbody.$html).find('tr[data-tree-area="station"]').removeClass('shown'); // Сбросить признак раскрыт
        this.close_way();
        this.close_park();
        if (typeof this.settings.fn_select_way === 'function') {
            this.settings.fn_select_way(null, null, null, null);
        }
    };
    // Закрыть все парки
    table_tree_way.prototype.close_park = function () {
        var ways = $(this.$tbody.$html).find('tr[data-tree-area="park"]');
        ways.remove();
    };
    // Закрыть все парки по станции
    table_tree_way.prototype.close_park_of_station = function (id_station) {
        var park = $(this.$tbody.$html).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
        park.remove();
    };
    // Закрыть все пути
    table_tree_way.prototype.close_way = function () {
        var ways = $(this.$tbody.$html).find('tr[data-tree-area="way"]');
        ways.remove();
    };
    // Закрыть все пути по станции
    table_tree_way.prototype.close_way_of_station = function (id_station) {
        var ways = $(this.$tbody.$html).find('tr[data-tree-area="way"][data-station="' + id_station + '"]');
        ways.remove();
    };
    // Закрыть все пути парка
    table_tree_way.prototype.close_way_of_park = function (id_station, id_park) {
        var ways = $(this.$tbody.$html).find('tr[data-tree-area="way"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        ways.remove();
    };
    // Убрать все выбранные пути
    table_tree_way.prototype.deselect_way = function () {
        var ways = $(this.$tbody.$html).find('tr[data-tree-area="way"].select');
        if (ways && ways.length > 0) {
            var $td_select = $(ways[0].cells[1]);
            $td_select.empty();
            ways.removeClass('select');
        }

    };
    // Раскрыть парки по указаной станции и раскрыть пути и выбрать путь
    table_tree_way.prototype.open_way = function (id_station, id_park, id_way) {
        var tr_station = this.$tbody.$html.find('tr[data-tree-area="station"][data-station="' + id_station + '"]');
        if (tr_station && tr_station.length > 0) {
            var show = $(tr_station).hasClass('shown');
            if (!show) {
                // Раскроем парки и пути
                this.view_park(id_station, null, null, function (id_stat) {
                    // раскрыть путь
                    this.open_park(id_station, id_park, id_way);
                }.bind(this));
            } else {
                this.open_park(id_station, id_park, id_way);
            }
        }

    };
    // Раскрыть пути по выбранному парку и выбрать путь
    table_tree_way.prototype.open_park = function (id_station, id_park, id_way) {
        var tr_park = this.$tbody.$html.find('tr[data-tree-area="park"][data-station="' + id_station + '"][data-park="' + id_park + '"]');
        if (tr_park && tr_park.length > 0) {
            var show = $(tr_park).hasClass('shown');
            if (!show) {
                // Раскрыть пути и выбрать путь
                this.view_way(id_station, id_park, null, function () {
                    // выбрать путь
                    this.select_way(id_way);
                    //LockScreenOff();
                }.bind(this));
            } else {
                // пути раскрыты выбрать путь
                this.select_way(id_way);
                //LockScreenOff();
            }
        }
    };
    // открыть все ветки (b_way - true раскрыть путь)
    table_tree_way.prototype.open_tree = function (b_way) {
        var tr = this.$tbody.$html.find('tr[data-tree-area="station"]');
        this.count_tr_st = tr.length;
        if (tr && tr.length > 0) LockScreen(langView('mess_open_tree', App.Langs)); // выведем сообщение
        $.each(tr, function (i, el) {
            var id_station = $(el).attr('data-station');
            var show = $(el).hasClass('shown');
            if (!show) {
                // Раскроем парки и пути
                this.view_park(id_station, null, null, function (id_stat) {
                    if (b_way) {
                        // раскрыть путь
                        this.open_way_of_park_station(id_stat, function () {
                            this.count_tr_st--;
                            if (this.count_tr_st <= 0) {
                                LockScreenOff();
                            }
                        }.bind(this));
                    } else {
                        // путь не раскрывать
                        this.count_tr_st--;
                        if (this.count_tr_st <= 0) {
                            LockScreenOff();
                        }
                    }


                }.bind(this));
            } else {
                if (b_way) {
                    // раскрыть путь
                    this.open_way_of_park_station(id_station, function () {
                        this.count_tr_st--;
                        if (this.count_tr_st <= 0) {
                            LockScreenOff();
                        }
                    }.bind(this));
                } else {
                    // путь не раскрывать
                    this.count_tr_st--;
                    if (this.count_tr_st <= 0) {
                        LockScreenOff();
                    }
                }
            }
        }.bind(this));
    };
    // открыть все ветки путей по паркам указаной станции
    table_tree_way.prototype.open_way_of_park_station = function (id_station, callback) {
        var tr_park = $(this.$tbody.$html).find('tr[data-tree-area="park"][data-station="' + id_station + '"]');
        var count_tr_prk = tr_park.length;
        if (!tr_park || count_tr_prk === 0) {
            if (typeof callback === 'function') {
                callback();
            }
        }
        //this.count_tr_prk[id_station] = tr_park.length;
        $.each(tr_park, function (i, el_park) {
            var id_park = $(el_park).attr('data-park');
            var show_tr_park = $(el_park).hasClass('shown');
            if (!show_tr_park) {
                this.view_way(id_station, id_park, null, function () {
                    count_tr_prk--;
                    if (count_tr_prk <= 0) {
                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                }.bind(this));
            } else {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        }.bind(this));

    };
    // Обновить подвал
    table_tree_way.prototype.update_foot = function () {
        var count_send = 0;
        var count_all = 0;
        var amkr_all = 0;
        var capacity_all = 0;
        var tr = this.$tbody.$html.find('tr[data-tree-area="station"]');
        $.each(tr, function (i, el) {
            var $div_name = $(el.cells[2]);
            var $div_pb = $(el.cells[3]);
            var $td_count = $(el.cells[4]);
            var $td_amkr = $(el.cells[5]);
            var $td_capacity = $(el.cells[6]);

            var name = $div_name.text();
            var send = $div_pb.text();
            // Получить только отправленные
            if (send.indexOf('-') >= 0) {
                send = send.slice(send.indexOf('-') + 1);
            }
            var count = $td_count.text();
            var amkr = $td_amkr.text();
            var capacity = $td_capacity.text();
            if (name !== 'Кирова') {
                count_send += send ? Number(send) : 0;
                count_all += count ? Number(count) : 0;
                amkr_all += amkr ? Number(amkr) : 0;
                capacity_all += capacity ? Number(capacity) : 0;
            }

        }.bind(this));
        // вывести итого
        var tr_foot = this.$tfoot.$html.find('tr');
        if (tr_foot) {
            $(tr_foot[0].cells[1]).text(count_send);
            $(tr_foot[0].cells[2]).text(count_all);
            $(tr_foot[0].cells[3]).text(amkr_all);
            //$(tr_foot.cells[4]).text(capacity_all);
        };
    };
    //------------------------------- СООБЩЕНИЯ ----------------------------------------------------
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
        //if (this.obj_t_report) {
        //    this.obj_t_report.destroy(true);
        //    this.obj_t_report = null;
        //}
        this.$tw.empty(); // empty in case the columns change
    };

    App.table_tree_way = table_tree_way;

    window.App = App;
})(window);