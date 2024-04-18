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
            "dt_decimal": "",
            "dt_emptyTable": "Нет данных в таблице",
            "dt_info": "Отображение _START_ по _END_ из _TOTAL_ записей",
            "dt_infoEmpty": "Отображение 0 to 0 of 0 записей",
            "dt_infoFiltered": "(отфильтровано из _MAX_ всего записей)",
            "dt_infoPostFix": "",
            "dt_thousands": ".",
            "dt_lengthMenu": "Показать  _MENU_ записей",
            "dt_loadingRecords": "Загрузка...",
            "dt_processing": "Обработка ...",
            "dt_search": "Найти:",
            "dt_zeroRecords": "Не найдено совпадающих записей",
            "dt_paginate": {
                "first": "Первая",
                "last": "Последняя",
                "next": "Следующая",
                "previous": "Предыдущая"
            },
            "dt_aria": {
                "sortAscending": ": активировать сортировку столбца по возрастанию",
                "sortDescending": ": активировать сортировку колонки по убыванию"
            },


            't_com_field_numeration': '№п.п',

            't_com_mess_init_module': 'Инициализация модуля (table_common) ...',
            't_com_mess_view_report': 'Показать отчет ...',


            't_com_title_all': 'Все',
            't_com_title_yes': 'Да',

            't_com_title_button_export': 'Экспорт',
            't_com_title_button_buffer': 'Буфер',
            't_com_title_button_excel': 'Excel',
            't_com_title_excel_sheet_name': 'Отчет',
            't_com_title_button_field': 'Поля',
            't_com_title_button_field_select': 'Выбрать',
            't_com_title_button_field_view_all': 'Показать все',
            't_com_title_button_field_clear': 'Сбросить',
        },
        'en':  //default language: English
        {
            "dt_decimal": "",
            "dt_emptyTable": "No data available in table",
            "dt_info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "dt_infoEmpty": "Showing 0 to 0 of 0 entries",
            "dt_infoFiltered": "(filtered from _MAX_ total entries)",
            "dt_infoPostFix": "",
            "dt_thousands": ",",
            "dt_lengthMenu": "Show _MENU_ entries",
            "dt_loadingRecords": "Loading...",
            "dt_processing": "Processing...",
            "dt_search": "Search:",
            "dt_zeroRecords": "No matching records found",
            "dt_paginate": {
                "first": "First",
                "last": "Last",
                "next": "Next",
                "previous": "Previous"
            },
            "dt_aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;

    // Перечень полей
    table_common.prototype.list_collums = [
        // Поля составы принятые
        {
            field: 'numeration',
            data: function (row, type, val, meta) {
                return ++meta.row;
            },
            className: 'dt-body-center',
            title: langView('t_com_field_numeration', App.Langs), width: "30px", orderable: true, searchable: false
        },

    ];
    // Перечень кнопок
    table_common.prototype.list_buttons = [
        {
            button: 'export',
            extend: 'collection',
            text: langView('t_com_title_button_export', App.Langs),
            buttons: [
                {
                    text: langView('t_com_title_button_buffer', App.Langs),
                    extend: 'copyHtml5',
                },
                {
                    text: langView('t_com_title_button_excel', App.Langs),
                    extend: 'excelHtml5',
                    sheetName: langView('t_com_title_excel_sheet_name', App.Langs),
                    messageTop: function () {
                        return '';
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'field',
            extend: 'collection',
            text: langView('t_com_title_button_field', App.Langs),
            buttons: [
                {
                    extend: 'colvis',
                    text: langView('t_com_title_button_field_select', App.Langs),
                    collectionLayout: 'fixed two-column',
                },
                {
                    extend: 'colvisGroup',
                    text: langView('t_com_title_button_field_view_all', App.Langs),
                    show: ':hidden'
                },
                {
                    text: langView('t_com_title_button_field_clear', App.Langs),
                    action: function (e, dt, node, conf) {
                        this.colReorder.reset();
                    }
                },
            ],
            autoClose: true
        },
        {
            button: 'print',
            extend: 'print',
        },
        {
            button: 'refresh',
            text: '<i class="fas fa-retweet"></i>',
        },
        {
            button: 'page_length',
            extend: 'pageLength',
        },
    ];
    //-----------------------------------------------------------------------------------------
    // Конструктор
    function table_common(options) {
        this.settings_module = $.extend({
            selector: null,
            fn_init_type_report: function () {
                this.fixedHeader = false;            // вкл. фикс. заголовка
                this.leftColumns = 0;
                this.order_column = [0, 'asc'];
                this.type_select_rows = 1; // Выбирать одну
                this.table_select = true;
                this.table_columns = this.init_columns_default();
                this.table_buttons = this.init_button_default();
            },
        }, options);
        // Инициализация компонента и модуля
        if (!this.settings_module.selector) {
            throw new Error('Не указан селектор');
        }
        this.$td_report = $(this.settings_module.selector);
        if (this.$td_report.length === 0) {
            throw new Error('Не удалось найти элемент с селектором: ' + this.settings_module.selector);
        }
        this.fe_ui = new FE();
        this.selector = this.$td_report.attr('id');
    }

    //------------------------------- Общие методы ----------------------------------------------------
    // Настройка language(DataTables)
    table_common.prototype.language_table = function (langs) {
        return {
            "decimal": langView('dt_decimal', langs),
            "emptyTable": langView('dt_emptyTable', langs),
            "info": langView('dt_info', langs),
            "infoEmpty": langView('dt_infoEmpty', langs),
            "infoFiltered": langView('dt_infoFiltered', langs),
            "infoPostFix": langView('dt_infoPostFix', langs),
            "thousands": langView('dt_thousands', langs),
            "lengthMenu": langView('dt_lengthMenu', langs),
            "loadingRecords": langView('dt_loadingRecords', langs),
            "processing": langView('dt_processing', langs),
            "search": langView('dt_search', langs),
            "zeroRecords": langView('dt_zeroRecords', langs),
            "paginate": langView('dt_paginate', langs),
            "aria": langView('dt_aria', langs),
        };
    };

    table_common.prototype.init_columns = function (collums_name, list_collums) {
        var collums = [];
        if (collums_name && collums_name.length > 0) {
            $.each(collums_name, function (i, el) {
                var field = list_collums.find(function (o) {
                    return o.field === el;
                });
                // Если поле не найдено, создадим по умолчанию (чтобы небыло ошибки)
                if (!field) {
                    field = {
                        field: el,
                        data: function (row, type, val, meta) {
                            return "Field_error";
                        },
                        title: el, width: "100px", orderable: false, searchable: false
                    };
                }
                field.className += ' fl-' + el;
                collums.push(field);
            });
        }
        return collums;
    };

    table_common.prototype.init_columns_detali = function (collums_detali, list_collums) {
        var collums = [];
        var field = null;
        if (collums_detali && collums_detali.length > 0) {
            $.each(collums_detali, function (i, el) {
                if (el.create) {
                    field = {
                        field: el.field,
                        data: function (row, type, val, meta) {
                            switch (el.ft) {
                                case 'int': { return row[el.field]; }
                                case 'string': { return row[el.field + ucFirst(App.Lang)]; }
                                default: return null;
                            }
                        },
                        className: el.class,
                        title: el.title, width: el.width + "px", orderable: el.orderable, searchable: el.searchable
                    }
                } else {
                    field = list_collums.find(function (o) {
                        return o.field === el.field;
                    });
                    // Если поле не найдено, создадим по умолчанию (чтобы небыло ошибки)
                    if (!field) {
                        field = {
                            field: el,
                            data: function (row, type, val, meta) {
                                return "Field_error";
                            },
                            title: el, width: "100px", orderable: false, searchable: false
                        };
                    }
                    field.className += ' fl-' + el.field;
                    // Добавим детали
                    if (el.title !== null) {
                        field.title = el.title;
                    }
                    if (el.class !== null) {
                        field.className += ' ' + el.class;
                    }
                }
                collums.push(field);
            });
        }
        return collums;
    };

    table_common.prototype.init_buttons = function (buttons_name, list_buttons) {
        var buttons = [];
        if (buttons_name && buttons_name.length > 0) {
            $.each(buttons_name, function (i, el) {
                var button = list_buttons.find(function (o) {
                    return o.button === el.name;
                });
                // Если кнопка не найдена, создадим по умолчанию (чтобы небыло ошибки)
                if (!button) {
                    button = {
                        button: el.name,
                        text: button_error,
                        action: function (e, dt, node, config) {

                        },
                        enabled: false
                    };
                }
                if (el.action) {
                    button.action = el.action;
                }
                buttons.push(button);
            });
        }
        return buttons;
    };
    //------------------------------- ПОЛЯ ----------------------------------------------------
    // инициализация полей по умолчанию
    table_common.prototype.init_columns_default = function () {
        var collums = [];
        collums.push({ field: 'numeration', title: null, class: null });
        // gruz
        return this.init_columns(collums, this.list_collums);
    };
    //------------------------------- КНОПКИ ----------------------------------------------------
    // инициализация кнопок по умолчанию
    table_common.prototype.init_button_default = function () {
        var buttons = [];
        //buttons.push({ name: 'export', action: null });
        //buttons.push({ name: 'field', action: null });
        /*        buttons.push({ name: 'page_length', action: null });*/
        return this.init_buttons(buttons, this.list_buttons);
    };
    // инициализация кнопок стандартная 
    table_common.prototype.init_button_Ex_Prn_Fld_Ref_Pag = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        buttons.push({ name: 'page_length', action: null });
        return this.init_buttons(buttons, this.list_buttons);
    };
    // инициализация кнопок стандартная
    table_common.prototype.init_button_Ex_Prn_Fld_Ref = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        buttons.push({
            name: 'refresh',
            action: function (e, dt, node, config) {
                //this.action_refresh();
            }.bind(this)
        });
        return this.init_buttons(buttons, this.list_buttons);
    };
    // инициализация кнопок стандартная
    table_common.prototype.init_button_Ex_Prn_Fld = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
        buttons.push({ name: 'field', action: null });
        return this.init_buttons(buttons, this.list_buttons);
    };
    // инициализация кнопок стандартная
    table_common.prototype.init_button_Ex_Prn = function () {
        var buttons = [];
        buttons.push({ name: 'export', action: null });
        buttons.push({ name: 'print', action: null });
/*        buttons.push({ name: 'field', action: null });*/
        return this.init_buttons(buttons, this.list_buttons);
    };
    //------------------------------- ИНИЦИАЛИЗАЦИЯ И ОТОБРАЖЕНИЕ ----------------------------------
    // Инициализация
    table_common.prototype.init = function (options) {
        this.result_init = true;
        LockScreen(langView('t_com_mess_init_module', App.Langs));
        // теперь выполним инициализацию
        // Определим основные свойства
        this.settings = $.extend({
            alert: null,
            class_table: 'table',
            detali_table: false,
            type_report: null,     // 
            link_num: false,
            fn_init: null,
            fn_select_rows: null,
            fn_select_link: null,
        }, options);
        //
        // Настройки отчета по умолчанию
        this.lengthMenu = null;
        this.pageLength = null;
        this.deferRender = true;
        this.paging = false;
        this.searching = false;
        this.ordering = false;
        this.info = false;
        this.fixedHeader = false;            // вкл. фикс. заголовка
        this.leftColumns = 0;
        this.columnDefs = null;
        this.order_column = [0, 'asc'];
        this.type_select_rows = 0; // не показывать
        this.table_select = false;
        this.drawCallback = null;
        this.createdRow = function (row, data, index) { }.bind(this);
        this.footerCallback = null;
        this.autoWidth = false;
        this.table_columns = [];
        this.table_buttons = [];
        this.dom = 'Bfrtip';
        this.html_footer = null;
        // Настройки отчета по типу отчета
        this.settings_module.fn_init_type_report();
        this.data = [];
        this.selected_rows = null;
        this.tables_detali = [];    // Массив таблиц детально
        //----------------------------------
        // Создать макет таблицы
        var table_common = new this.fe_ui.table({
            id: 'tab-tr-' + this.selector,
            class: this.settings.class_table,
            //class: 'table table-success table-striped',
            title: null,
            //style: 'width: 100%',
        });
        if (this.html_footer !== '' && this.html_footer !== null) {
            this.$table_report = table_common.$html.append($(this.html_footer));
        }
        //this.settings.fn_init_footer_report;
        this.$table_report = table_common.$html;
        //this.$td_report.addClass('table-report').append(this.$table_report);
        this.$td_report.append(this.$table_report);
        // Инициализируем таблицу
        this.obj_t_report = this.$table_report.DataTable({
            "lengthMenu": this.lengthMenu,
            "pageLength": this.pageLength,
            "deferRender": this.deferRender,
            "paging": this.paging,
            "searching": this.searching,
            "ordering": this.ordering,
            "info": this.info,
            "keys": true,
            columnDefs: this.columnDefs,
            colReorder: true,                       // вкл. перетаскивание полей
            fixedHeader: this.fixedHeader,          // вкл. фикс. заголовка
            fixedColumns: {
                leftColumns: this.leftColumns,
            },
            select: this.table_select,
            "autoWidth": this.autoWidth,
            //"filter": true,
            //"scrollY": "600px",
            //sScrollX: "100%",
            scrollX: true,
            /*            sScrollXInner: "100%",*/
            //"responsive": true,
            //"bAutoWidth": false,
            //order: this.order_column,
            language: this.language_table(App.Langs),
            jQueryUI: false,
            drawCallback: this.drawCallback,
            "createdRow": this.createdRow,
            footerCallback: this.footerCallback,
            columns: this.table_columns,
            dom: this.dom,
            stateSave: true,
            buttons: this.table_buttons,
        });
        // Обработка события выбора
        if (this.table_select !== false) {
            this.obj_t_report.on('select deselect', function (e, dt, type, indexes) {
                this.select_rows(); // определим строку
                this.enable_button();
                // Обработать событие выбрана строка
                if (typeof this.settings.fn_select_rows === 'function') {
                    this.settings.fn_select_rows(this.selected_rows);
                }
            }.bind(this));
        }
        this.$table_report.on('click', 'a.link-cell', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var id = $(e.currentTarget).attr('id')
            if (typeof this.settings.fn_select_link === 'function') {
                this.settings.fn_select_link(id);
            }
        }.bind(this));
        // На проверку окончания инициализации
        //----------------------------------
        if (typeof this.settings.fn_init === 'function') {
            this.settings.fn_init(this.result_init);
        }
        //----------------------------------
    };
    // Выбрано
    table_common.prototype.select_rows = function () {
        var index = this.obj_t_report.rows({ selected: true });
        var rows = this.obj_t_report.rows(index && index.length > 0 ? index[0] : null).data().toArray();
        this.selected_rows = rows;
        this.id_sostav = this.select_rows_sostav && this.select_rows_sostav.length > 0 ? this.select_rows_sostav[0].id : null;
    };
    // Отображение кнопки добавить
    table_common.prototype.enable_button = function () {
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
    table_common.prototype.view = function (data, id_select) {
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
    table_common.prototype.view_footer = function (data) {

    };
    //------------------------------- СООБЩЕНИЯ ----------------------------------------------------
    //-------------------------------------------------------------------------------------------
    // Очистить сообщения
    table_common.prototype.out_clear = function () {
        if (this.settings.alert) {
            this.settings.alert.clear_message()
        }
    }
    // Показать ошибки
    table_common.prototype.out_error = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_error_message(message)
        }
    };
    // Показать предупреждения
    table_common.prototype.out_warning = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_warning_message(message)
        }
    };
    // Показать сообщения о выполнении действий
    table_common.prototype.out_info = function (message) {
        if (this.settings.alert) {
            this.settings.alert.out_info_message(message)
        }
    };
    //------------------------------- УДАЛЕНИЕ ОБЪЕКТОВ ---------------------------------------------
    // Очистить объект
    table_common.prototype.destroy = function () {
        //
        if (this.obj_t_report) {
            this.obj_t_report.destroy(true);
            this.obj_t_report = null;
        }
        this.$td_report.empty(); // empty in case the columns change
    };
    // Очистить детали по указаному пути
    table_common.prototype.destroy_detali = function (data) {
        if (this.tables_detali[data.id]) {
            this.tables_detali[data.id].destroy();
            delete this.tables_detali[data.id];
        }
    };
    // Очистить все детали
    table_common.prototype.destroy_all_detali = function () {
        $.each(this.tables_detali, function (i, el) {
            if (el) {
                el.destroy();
            }
        }.bind(this));
        this.tables_detali = {};
    };

    App.table_common = table_common;

    window.App = App;
})(window);