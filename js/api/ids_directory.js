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
                { name: 'cargo', list: null, fn_get: this.getCargo.bind(this) },
                { name: 'cargo_group', list: null, fn_get: this.getCargoGroup.bind(this) },
                { name: 'cargo_etsng', list: null, fn_get: this.getCargoETSNG.bind(this) },
                { name: 'genus_wagon', list: null, fn_get: this.getGenusWagons.bind(this) },
                { name: 'operators_wagons', list: null, fn_get: this.getOperatorsWagons.bind(this) },
                { name: 'wagons', list: null, fn_get: this.getWagons.bind(this) },
                { name: 'wagons_rent', list: null, fn_get: this.getWagonsRent.bind(this) },
                { name: 'owners_wagons', list: null, fn_get: this.getOwnersWagons.bind(this) },
                { name: 'owners_operations_uz', list: null, fn_get: this.getWagonOperationsUz.bind(this) },
                { name: 'station', list: null, fn_get: this.getStation.bind(this) },
                { name: 'park_ways', list: null, fn_get: this.getParkWays.bind(this) },
                { name: 'ways', list: null, fn_get: this.getWays.bind(this) },
                { name: 'outer_ways', list: null, fn_get: this.getOuterWays.bind(this) },
                { name: 'locomotive', list: null, fn_get: this.getLocomotive.bind(this) },
                { name: 'divisions', list: null, fn_get: this.getDivisions.bind(this) },
            ],
            url_api: this.settings.url_api
        });
    }
    ids_directory.prototype.load = function (list, lock, update, callback) {
        this.api_com.load(list, lock, update, callback);
    };

    //****************************************************************************************
    //-------------------------------- Функции работы с БД через api ---------------

    //======= [Directory_Divisions] (Справочник подразделений предприятия) ======================================
    ids_directory.prototype.getDivisions = function (callback) {
        this.api_com.get('/DirectoryDivision', callback);
    };
    //======= [Directory_Locomotive] (Справочник локомотивов) ======================================
    ids_directory.prototype.getLocomotive = function (callback) {
        this.api_com.get('/DirectoryLocomotive', callback);
    };

    //======= Directory_OuterWay (Справочник внешних путей) ======================================
    ids_directory.prototype.getOuterWays = function (callback) {
        this.api_com.get('/DirectoryOuterWay', callback);
    };

    //======= Directory_Cargo (Справочник грузов) ======================================
    ids_directory.prototype.getCargo = function (callback) {
        this.api_com.get('/DirectoryCargo', callback);
    };
    //======= Directory_CargoGroup (Справочник группа грузов) ======================================
    //ids_directory.prototype.getCargoGroup = function (callback) {
    //    $.ajax({
    //        type: 'GET',
    //        url: this.settings.url_api + '/DirectoryCargoGroup',
    //        async: true,
    //        dataType: 'json',
    //        beforeSend: function () {
    //            AJAXBeforeSend();
    //        },
    //        success: function (data) {
    //            if (typeof callback === 'function') {
    //                callback(data);
    //            }
    //        },
    //        error: function (x, y, z) {
    //            OnAJAXError("ids_directory.getCargoGroup", x, y, z);
    //        },
    //        complete: function () {
    //            AJAXComplete();
    //        },
    //    });
    //};
    ids_directory.prototype.getCargoGroup = function (callback) {
        this.api_com.get('/DirectoryCargoGroup', callback);
    };
    //======= Directory_CargoETSNG (Справочник грузов ЕТСНГ) ======================================
    //ids_directory.prototype.getCargoETSNG = function (callback) {
    //    $.ajax({
    //        type: 'GET',
    //        url: this.settings.url_api + '/DirectoryCargoEtsng',
    //        async: true,
    //        dataType: 'json',
    //        beforeSend: function () {
    //            AJAXBeforeSend();
    //        },
    //        success: function (data) {
    //            if (typeof callback === 'function') {
    //                callback(data);
    //            }
    //        },
    //        error: function (x, y, z) {
    //            OnAJAXError("ids_directory.getCargoETSNG", x, y, z);
    //        },
    //        complete: function () {
    //            AJAXComplete();
    //        },
    //    });
    //};
    ids_directory.prototype.getCargoETSNG = function (callback) {
        this.api_com.get('/DirectoryCargoEtsng', callback);
    };
    //======= Directory_Countrys (Справочник стран) ======================================
    //ids_directory.prototype.getCountrys = function (callback) {
    //    $.ajax({
    //        type: 'GET',
    //        url: this.settings.url_api + '/DirectoryCountry',
    //        async: true,
    //        dataType: 'json',
    //        beforeSend: function () {
    //            AJAXBeforeSend();
    //        },
    //        success: function (data) {
    //            if (typeof callback === 'function') {
    //                callback(data);
    //            }
    //        },
    //        error: function (x, y, z) {
    //            OnAJAXError("ids_directory.getCountrys", x, y, z);
    //        },
    //        complete: function () {
    //            AJAXComplete();
    //        },
    //    });
    //};
    ids_directory.prototype.getCountrys = function (callback) {
        this.api_com.get('/DirectoryCountry', callback);
    };
    //======= Directory_GenusWagons (Справочник РОД ВАГОНА) ======================================
    ids_directory.prototype.getGenusWagons = function (callback) {
        this.api_com.get('/DirectoryGenusWagon', callback);
    };
    //
    //ids_directory.prototype.getGenusWagonsID = function (id, callback) {
    //    $.ajax({
    //        type: 'GET',
    //        url: this.settings.url_api + '/DirectoryGenusWagon/' + id,
    //        async: true,
    //        dataType: 'json',
    //        beforeSend: function () {
    //            AJAXBeforeSend();
    //        },
    //        success: function (data) {
    //            if (typeof callback === 'function') {
    //                callback(data);
    //            }
    //        },
    //        error: function (x, y, z) {
    //            OnAJAXError("ids_directory.getGenusWagonsID", x, y, z);
    //        },
    //        complete: function () {
    //            AJAXComplete();
    //        },
    //    });
    //};
    ids_directory.prototype.getGenusWagonsID = function (id, callback) {
        this.api_com.get('/DirectoryGenusWagon/' + id, callback);
    };
    //======= Directory_OperatorsWagons (Справочник операторов вагонов) ======================================
    ids_directory.prototype.getOperatorsWagons = function (callback) {
        this.api_com.get('/DirectoryOperatorsWagon', callback);
    };
    // Получить парки по указаной станции c позицией
    ids_directory.prototype.getOperatorsWagonsID = function (id, callback) {
        this.api_com.get('/DirectoryOperatorsWagon/' + id, callback);
    };
    //======= Directory_OwnersWagons (Справочник собствинеков вагонов) ======================================
    ids_directory.prototype.getOwnersWagons = function (callback) {
        this.api_com.get('/DirectoryOwnersWagon', callback);
    };
    //
    ids_directory.prototype.getOwnersWagonsID = function (id, callback) {
        this.api_com.get('/DirectoryOwnersWagon/' + id, callback);
    };
    //======= Directory_Wagons (Справочник вагонов) ======================================
    ids_directory.prototype.getWagons = function (callback) {
        this.api_com.get('/DirectoryWagon', callback);
    };
    // Получить по номеру вагона
    ids_directory.prototype.getWagonsOfNum = function (num, callback) {
        this.api_com.get('/DirectoryWagon/num/' + num, callback);
    };
    //======= Directory_WagonsRent (Справочник аренд вагонов) ======================================
    ids_directory.prototype.getWagonsRent = function (callback) {
        this.api_com.get('/DirectoryWagonsRent', callback);
    };
    // Получить аренды по номеру вагона
    ids_directory.prototype.getWagonsRentOfNum = function (num, callback) {
        this.api_com.get('/DirectoryWagonsRent/num/' + num, callback);
    };
    //======= Directory_WagonOperationsUz (Довідник Операції) ======================================
    ids_directory.prototype.getWagonOperationsUz = function (callback) {
        this.api_com.get('/DirectoryWagonOperationsUz', callback);
    };
    // Получить операцию по коду и pr_op
    ids_directory.prototype.getWagonsRentOfKodOp_PrOp = function (kod_op, pr_op, callback) {
        this.api_com.get('/DirectoryWagonOperationsUz/' + kod_op + '/PrOp/' + pr_op, callback);
    };
    //======= Directory_Station (Справочник станций) ======================================
    ids_directory.prototype.getStation = function (callback) {
        this.api_com.get('/DirectoryStation', callback);
    };
    // Получить состояние всех станций 
    ids_directory.prototype.getViewStatusAllStation = function (callback) {
        this.api_com.get('/DirectoryStation/status', callback);
    };
    // Получить состояние станции по id 
    ids_directory.prototype.getViewStatusStationOfId = function (id, callback) {
        this.api_com.get('/DirectoryStation/status/' + id, callback);
    };
    //======= Directory_ParkWays (Справочник парков станций) ======================================
    ids_directory.prototype.getParkWays = function (callback) {
        this.api_com.get('/DirectoryParkWay', callback);
    };
    ids_directory.prototype.getViewStatusAllParkOfStationId = function (id_station, callback) {
        this.api_com.get('/DirectoryParkWay/status/station/' + id_station, callback);
    };
    ids_directory.prototype.getViewStatusParkOfId = function (id_station, id_park, callback) {
        this.api_com.get('/DirectoryParkWay/status/station/' + id_station + '/park/' + id_park, callback);
    };
    //======= Directory_Ways (Справочник путей станций) ======================================
    ids_directory.prototype.getWays = function (callback) {
        this.api_com.get('/DirectoryWay', callback);
    };
    ids_directory.prototype.getWaysOfId = function (id_way, callback) {
        this.api_com.get('/DirectoryWay/' + id_way, callback);
    };
    ids_directory.prototype.GetViewStatusAllWayOfStationParkId = function (id_station, id_park, callback) {
        this.api_com.get('/DirectoryWay/status/station/' + id_station + '/park/' + id_park, callback);
    };
    ids_directory.prototype.GetViewStatusAllWayOfStationId = function (id_station, callback) {
        this.api_com.get('/DirectoryWay/status/station/' + id_station, callback);
    };
    ids_directory.prototype.GetViewStatusWayOfId = function (id_way, callback) {
        this.api_com.get('/DirectoryWay/status/way/' + id_way, callback);
    };
    //****************************************************************************************
    //-------------------------------- функции для работы с таблицами ------------------------
    //*======= (Справочник divisions) ======================================
    // Получить все записи
    ids_directory.prototype.getAllDivisions = function () {
        var obj = this.api_com.getAllObj('divisions');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getDivision_Of_Id = function (id) {
        return this.api_com.getObj_Of_field('divisions', 'id', id);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListDivisions = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('divisions', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextDivisions = function () {
        return this.getListDivisions('id', 'name_division', ucFirst(App.Lang));
    };
    //*======= (Справочник locomotive) ======================================
    // Получить все записи
    ids_directory.prototype.getAllLocomotive = function () {
        var obj = this.api_com.getAllObj('locomotive');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getLocomotive_Of_Id = function (locomotive) {
        return this.api_com.getObj_Of_field('locomotive', 'locomotive', locomotive);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListLocomotive = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('locomotive', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextLocomotive = function () {
        return this.getListLocomotive('locomotive', 'locomotive', ucFirst(App.Lang));
    };
    // Получить списки (Value, Text, Desabled) по умолчанию активных локомотивов
    ids_directory.prototype.getListValueTextLocomotiveOfActive = function () {
        var list_obj = this.api_com.getAllObj('locomotive');
        var list = [];
        var fvalue = 'locomotive';
        var ftext = 'locomotive';
            $.each(list_obj.list, function (i, el) {
                list.push({ value: el[fvalue], text: el[ftext], disabled: el.idLocomotiveStatus !== 1 });
            }.bind(this));
        return list;
    };

    //*======= (Справочник outer_ways) ======================================
    // Получить все записи
    ids_directory.prototype.getAllOuterWays = function () {
        var obj = this.api_com.getAllObj('outer_ways');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getOuterWays_Of_Id = function (id) {
        return this.api_com.getObj_Of_field('outer_ways', 'id', id);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListOuterWays = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('outer_ways', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextOuterWays = function () {
        return this.getListOuterWays('id', 'nameOuterWay', ucFirst(App.Lang));
    };
    //*======= (Справочник ways) ======================================
    // Получить все записи
    ids_directory.prototype.getAllWays = function () {
        var obj = this.api_com.getAllObj('ways');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getWays_Of_Id = function (id) {
        return this.api_com.getObj_Of_field('ways', 'id', id);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListWays = function (fvalue, ftext1, ftext2, lang, filter) {
        return this.api_com.getListObj2('ways', fvalue, ftext1, ftext2, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextWays = function () {
        return this.getListWays('id', 'wayNum', 'wayName', ucFirst(App.Lang));
    };
    // Получить списки (Value, Text, Desabled) по умолчанию с учетом станции
    ids_directory.prototype.getListValueTextWaysOfStation = function (id_station) {
        return this.getListWays('id', 'wayNum', 'wayName', ucFirst(App.Lang), function (i) {
            return !i.wayDelete && i.idStation === id_station
        });
    };
    // Получить списки путей с выходом на УЗ (Value, Text, Desabled) по умолчанию с учетом станции
    ids_directory.prototype.getListValueTextCrossingUzWaysOfStation = function (id_station) {
        return this.getListWays('id', 'wayNum', 'wayName', ucFirst(App.Lang), function (i) {getAllWays
            return !i.wayDelete && i.idStation === id_station && i.crossingUz
        });
    };
    // Получить списки путей роспуска (Value, Text, Desabled) по умолчанию с учетом станции
    ids_directory.prototype.getListValueTextDissolutionWaysOfStation = function (id_station) {
        return this.getListWays('id', 'wayNum', 'wayName', ucFirst(App.Lang), function (i) {
            return !i.wayDelete && i.idStation === id_station && i.dissolution
        });
    };
    // Получить списки путей с которых производится роспуск (Value, Text, Desabled) по умолчанию с учетом станции
    ids_directory.prototype.getListValueTextOutDissolutionWaysOfStation = function (id_station) {
        return this.getListWays('id', 'wayNum', 'wayName', ucFirst(App.Lang), function (i) {
            return !i.wayDelete && i.idStation === id_station && i.outputDissolution
        });
    };
    // Получить списки путей с которых производится погрузка\разгрузка (Value, Text, Desabled) по умолчанию с учетом станции
    ids_directory.prototype.getListValueTextLoadUnloadWaysOfStation = function (id_station) {
        return this.getListWays('id', 'wayNum', 'wayName', ucFirst(App.Lang), function (i) {
            return !i.wayDelete && i.idStation === id_station && i.idDevision>0
        });
    };
    //*======= (Справочник park_ways) ======================================
    // Получить все записи
    ids_directory.prototype.getAllParkWays = function () {
        var obj = this.api_com.getAllObj('park_ways');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getParkWays_Of_Id = function (id) {
        return this.api_com.getObj_Of_field('park_ways', 'id', id);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListParkWays = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('park_ways', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextParkWays = function (filter) {
        return this.getListParkWays('id', 'parkName', ucFirst(App.Lang), filter);
    };
    //*======= (Справочник station) ======================================
    // Получить все записи
    ids_directory.prototype.getAllStation = function () {
        var obj = this.api_com.getAllObj('station');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getStation_Of_Id = function (id) {
        return this.api_com.getObj_Of_field('station', 'id', id);
    };
    // Получить запись по id
    ids_directory.prototype.getStation_Of_Code = function (code) {
        return this.api_com.getObj_Of_field('station', 'code', code);
    };
    // Получить записи по имени
    ids_directory.prototype.getStation_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('station', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListStation = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('station', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextStation = function (filter) {
        return this.getListStation('id', 'stationName', ucFirst(App.Lang), filter);
    };

    //*======= (Справочник owners_operations_uz) ======================================
    // Получить все записи
    ids_directory.prototype.getAllWagonOperationsUz = function () {
        var obj = this.api_com.getAllObj('owners_operations_uz');
        return obj ? obj.list : null;
    };
    // Получить запись по kodOp
    ids_directory.prototype.getWagonOperationsUz_Of_kodOp = function (kodOp) {
        return this.api_com.getObj_Of_field('owners_operations_uz', 'kodOp', id);
    };
    // Получить запись по mnkOp
    ids_directory.prototype.getWagonOperationsUz_Of_mnkOp = function (mnkOp) {
        return this.api_com.getObj_Of_field('owners_operations_uz', 'mnkOp', mnkOp);
    };
    // Получить записи по имени
    ids_directory.prototype.getWagonOperationsUz_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('owners_operations_uz', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListWagonOperationsUz = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('owners_operations_uz', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextWagonOperationsUz = function () {
        return this.getListWagonOperationsUz('mnkOp', 'nameOp', null);
    };

    //*======= (Справочник owners_wagons) ======================================
    // Получить все записи
    ids_directory.prototype.getAllOwnersWagons = function () {
        var obj = this.api_com.getAllObj('owners_wagons');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getOwnersWagons_Of_ID = function (id) {
        return this.api_com.getObj_Of_field('owners_wagons', 'id', id);
    };
    // Получить записи по имени
    ids_directory.prototype.getOwnersWagons_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('owners_wagons', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListOwnersWagons = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('owners_wagons', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextOwnersWagons = function () {
        return this.getListOwnersWagons('id', 'owner', ucFirst(App.Lang));
    };

    //*======= (Справочник operators_wagons) ======================================
    // Получить все записи
    ids_directory.prototype.getAllOperatorsWagons = function () {
        var obj = this.api_com.getAllObj('operators_wagons');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getOperatorsWagons_Of_ID = function (id) {
        return this.api_com.getObj_Of_field('operators_wagons', 'id', id);
    };
    // Получить записи по имени
    ids_directory.prototype.getOperatorsWagons_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('operators_wagons', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListOperatorsWagons = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('operators_wagons', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextOperatorsWagons = function () {
        return this.getListOperatorsWagons('id', 'operators', ucFirst(App.Lang));
    };

    //*======= (Справочник genus_wagon) ======================================
    // Получить все записи
    ids_directory.prototype.getAllGenusWagons = function () {
        var obj = this.api_com.getAllObj('genus_wagon');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getGenusWagons_Of_ID = function (id) {
        return this.api_com.getObj_Of_field('genus_wagon', 'id', id);
    };
    // Получить записи по имени
    ids_directory.prototype.getGenusWagons_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('genus_wagon', name, text);
    };
    // Получить списки (Value, Text, Desabled) по указоным полям
    ids_directory.prototype.getListGenusWagons = function (fvalue, ftext, lang, filter) {
        return this.api_com.getListObj('genus_wagon', fvalue, ftext, lang, filter);
    };
    // Получить списки (Value, Text, Desabled) по умолчанию
    ids_directory.prototype.getListValueTextGenusWagons = function () {
        return this.getListGenusWagons('id', 'genus', ucFirst(App.Lang));
    };

    //*======= (Справочник wagons) ======================================
    // Получить все записи
    ids_directory.prototype.getAllWagons = function () {
        var obj = this.api_com.getAllObj('wagons');
        return obj ? obj.list : null;
    };
    // Получить запись по id
    ids_directory.prototype.getWagons_Of_num = function (num) {
        return this.api_com.getObj_Of_field('wagons', 'num', num);
    };
    // Получить записи по имени
    ids_directory.prototype.getWagons_Of_Name = function (name, text) {
        return this.api_com.getObj_Of_field('wagons', name, text);
    };

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