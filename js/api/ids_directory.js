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
            /*            'mess_load_reference': 'Загружаю справочники...',*/
        },
        'en':  //default language: English
        {
            /*            'mess_load_reference': 'Loading references ...',*/
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    // Модуль инициализаии компонентов формы
    var API_COMMON = App.api_common;

    //****************************************************************************************
    //-------------------------------- Конструктор и инициализация ---------------
    // создать класс справочники ИДС
    function ids_directory(options) {

        //this.list_cargo = null;
        //this.list_cargo_group = null;
        //this.list_cargo_etsng = null;

        this.settings = $.extend({
            url_api: null,
        }, options);
        this.api_com = new API_COMMON({
            list_load: [
                { name: 'cargo', list: null, fn_get: this.getCargo },
                { name: 'cargo_group', list: null, fn_get: this.getCargoGroup },
                { name: 'cargo_etsng', list: null, fn_get: this.getCargoETSNG },
            ],
            url_api: this.settings.url_api
        });
    }
    ids_directory.prototype.load = function (list, lock, update, callback) {
        this.api_com.load(list, lock, update, callback);
    };

    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------
    //======= Directory_Cargo (Справочник грузов) ======================================
    //
    ids_directory.prototype.getCargo = function (callback) {
        $.ajax({
            type: 'GET',
            url: this.settings.url_api + '/DirectoryCargo/list',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("ids_directory.getCargo", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_CargoGroup (Справочник группа грузов) ======================================
    //
    ids_directory.prototype.getCargoGroup = function (callback) {
        $.ajax({
            type: 'GET',
            url: this.settings.url_api + '/DirectoryCargoGroup',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("ids_directory.getCargoGroup", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };
    //======= Directory_CargoETSNG (Справочник грузов ЕТСНГ) ======================================
    //
    ids_directory.prototype.getCargoETSNG = function (callback) {
        $.ajax({
            type: 'GET',
            url: this.settings.url_api + '/DirectoryCargoEtsng',
            async: true,
            dataType: 'json',
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("ids_directory.getCargoETSNG", x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    //****************************************************************************************
    //-------------------------------- функции для работы с таблицами ------------------------
    //*======= ids_directory.list_cargo  (Справочник грузов) ======================================
    // Получить все записи
    ids_directory.prototype.getAllCargo = function () {
        var obj = this.api_com.getAllObj('cargo');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getCargo_Of_ID = function (id) {
        return this.api_com.getObj_Of_field('cargo', 'id', id);
    };
    // Получить записи по id_etsng
    ids_directory.prototype.getCargo_Of_IDETSNG = function (id) {
        return this.api_com.getObj_Of_field('cargo', 'idCargoEtsng', id);
    };
    // Получить записи по имени
    ids_directory.prototype.getCargo_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('cargo', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListCargo = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('cargo', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextCargo = function () {
        return this.getListCargo('id', 'cargoName', ucFirst(App.Lang));
    };
    //*======= ids_directory.list_cargo_group  (Справочник группы грузов) ======================================
    // Получить все записи
    ids_directory.prototype.getAllCargoGroup = function () {
        var obj = this.api_com.getAllObj('cargo_group');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getCargoGroup_Of_ID = function (id) {
        return this.api_com.getObj_Of_field('cargo_group', 'id', id);
    };
    // Получить записи по имени
    ids_directory.prototype.getCargoGroup_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('cargo_group', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListCargoGroup = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('cargo_group', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextCargoGroup = function () {
        return this.getListCargoGroup('id', 'cargoGroupName', ucFirst(App.Lang));
    };
    //*======= ids_directory.list_cargo_etsng  (Справочник грузов ЕТСНГ) ======================================
    // Получить все записи
    ids_directory.prototype.getAllCargoETSNG = function () {
        var obj = this.api_com.getAllObj('cargo_etsng');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getCargoETSNG_Of_ID = function (id) {
        return this.api_com.getObj_Of_field('cargo_etsng', 'id', id);
    };
    // Получить записи по имени
    ids_directory.prototype.getCargoETSNG_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('cargo_etsng', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListCargoETSNG = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('cargo_etsng', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text1+Text2, Desabled) по указоным полям
    ids_directory.prototype.getListCargoETSNG2 = function (fvalue, ftext1, ftext2, lang, filter) {
        return this.api_com.getListObj2('cargo_etsng', fvalue, ftext1, ftext2, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextCargoETSNG = function () {
        return this.getListCargoETSNG('id', 'cargoEtsngName', ucFirst(App.Lang));
    };
    // Получим первую строку в указаным поле которых есть текст text (проверка убирает все пробелы и выравнивает буквы)
    //ids_directory.prototype.getCargoETSNG_Of_Name_find = function (name, text, lang) {
    //    if (this.list_cargo_etsng) {
    //        return this.getObjs_Of_text_find(this.list_cargo_etsng, name, text, lang);
    //    }
    //    return null;
    //};

    App.ids_directory = ids_directory;

    window.App = App;

})(window);