/*Модуль библиотека таблиц для отчета ТД*/
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
            fn_init: null,
        }, options);
        this.$tw.attr("style", "overflow-x:auto");
        this.$tw.empty();
        this.$table = new this.fe_ui.table({
            id: this.selector + '-table',
            class: 'table table-sm table-hover',
            title: null,
        });       
        this.$tw.append(this.$table);
        ////----------------------------------
        //// Создать макет таблицы

        //if (this.html_footer !== '' && this.html_footer !== null) {
        //    this.$table_report = table_tree_way.$table.append($(this.html_footer));
        //}
        ////this.settings.fn_init_footer_report;
        //this.$table_report = table_tree_way.$table;
        //this.$tw.addClass('table-report').append(this.$table_report);
        //// Инициализируем таблицу
        //this.obj_t_report = this.$table_report.DataTable({
        //    "lengthMenu": this.lengthMenu,
        //    "pageLength": this.pageLength,
        //    "deferRender": this.deferRender,
        //    "paging": this.paging,
        //    "searching": this.searching,
        //    "ordering": this.ordering,
        //    "info": this.info,
        //    "keys": true,
        //    columnDefs: this.columnDefs,
        //    colReorder: true,                       // вкл. перетаскивание полей
        //    fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
        //    fixedColumns: {
        //        leftColumns: this.leftColumns,
        //    },
        //    select: this.table_select,
        //    "autoWidth": this.autoWidth,
        //    //"filter": true,
        //    //"scrollY": "600px",
        //    //sScrollX: "100%",
        //    scrollX: true,
        //    /*            sScrollXInner: "100%",*/
        //    //"responsive": true,
        //    //"bAutoWidth": false,
        //    //order: this.order_column,
        //    language: this.language_table(App.Langs),
        //    jQueryUI: false,
        //    drawCallback: this.drawCallback,
        //    "createdRow": this.createdRow,
        //    footerCallback: this.footerCallback,
        //    columns: this.table_columns,
        //    dom: this.dom,
        //    stateSave: true,
        //    buttons: this.table_buttons,
        //});
        //// Обработка события выбора
        //if (this.table_select !== false) {
        //    this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
        //        this.select_rows(); // определим строку
        //        this.enable_button();
        //        // Обработать событие выбрана строка
        //        if (typeof this.settings.fn_select_rows === 'function') {
        //            this.settings.fn_select_rows(this.selected_rows);
        //        }
        //    }.bind(this));
        //}
        // На проверку окончания инициализации
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    // Выбрано
    table_tree_way.prototype.select_rows = function () {
        var index = this.obj_t_report.rows({ selected: true });
        var rows = this.obj_t_report.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Отображение кнопки добавить
    table_tree_way.prototype.enable_button = function () {
        switch (this.settings.type_report) {
            //case 'adoption_sostav': {
            //    if (this.select_rows_sostav && this.select_rows_sostav.length > 0) {
            //        this.obj_t_sostav.button(5).enable(true);
            //        if (this.select_rows_sostav[0].status < 1) {
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(true); // отмена сдачи состава
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_accept', App.Langs));
            //        } else {
            //            // Если статус в работе принят или удален 
            //            this.obj_t_sostav.button(3).enable(true);
            //            this.obj_t_sostav.button(4).enable(false);
            //            //if (this.select_rows_sostav[0].status === 2) { this.obj_t_sostav.button(4).enable(true); } else { this.obj_t_sostav.button(4).enable(false); }
            //            this.obj_t_sostav.button(5).text(langView('tis_title_button_wagon_view', App.Langs));
            //        }
            //    } else {
            //        this.obj_t_sostav.button(3).enable(false);
            //        this.obj_t_sostav.button(4).enable(false);
            //        this.obj_t_sostav.button(5).enable(false);
            //    }
            //    break;
            //};
        };
    };
    // Показать данные
    table_tree_way.prototype.view = function (data, id_select) {
        this.data = data;
        this.id_select = id_select;
        this.out_clear();
        LockScreen(langView('t_com_mess_view_report', App.Langs));
        this.obj_t_report.clear();
        this.obj_t_report.rows.add(data);
        this.obj_t_report.order(this.order_column);
        this.obj_t_report.draw();
        if (id_select !== null) {
            this.id_select = id_select
            //this.obj_t_report.row('#' + this.id_select).select();
        } else {
            this.id_select = null;
        }
        this.view_footer(data);
        this.select_rows();
        this.enable_button();
    };
    //
    table_tree_way.prototype.view_footer = function (data) {

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