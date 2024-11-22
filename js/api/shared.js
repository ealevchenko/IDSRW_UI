/* ----------------------------------------------------------
    Обработчики ajax - функций
-------------------------------------------------------------*/
// Событие перед запросом
var AJAXBeforeSend = function () {
    //OnBegin();
}
// Обработка ошибок
var OnAJAXError = function (metod, x, y, z, callback) {
    var data = {
        message: null,
        status: null,
        statusText: null,
        responseText: null
    };
    if (x && x.status) {
        data.status = x.status;
    }
    if (x && x.statusText) {
        data.statusText = x.statusText;

    }
    if (x && x.responseJSON) {
        data.message = x.responseJSON.Message;
    }

    if (x && x.responseText) {
        data.responseText = x.responseText;
    }
    alert('Metod js : ' + metod + '\nStatus : ' + data.status + '\nStatusText : ' + data.statusText + '\nMessage : ' + data.message + '\nResponseText : ' + data.responseText);
    if (typeof callback === 'function') {
        callback(x.responseJSON);
    }
};
// Событие после выполнения
var AJAXComplete = function () {
    //LockScreenOff();
};

(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    /* ----------------------------------------------------------
                        Список слов
    -------------------------------------------------------------*/

    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mess_load_reference': 'Загружаю справочники...',
            'mess_delay': 'Мы обрабатываем ваш запрос...',
        },
        'en':  //default language: English
        {
            'mess_load_reference': 'Loading references ...',
            'mess_delay': 'We are processing your request ...',
        }

    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));

    //================================================================================
    // Класс для создания объектов 
    //--------------------------------Конструктор и инициализация---------------
    // создать класс
    function api_common(options) {
        this.settings = $.extend({
            list_load: [],
            url_api: null,
        }, options);
    };

    api_common.prototype.load = function (list, lock, update, callback) {
        var process = 0;
        var result = [];
        //{ name='cargo', list=this.list_cargo, fn_get=this.getCargo }
        var out_load = function (process) {
            if (process === 0) {
                if (lock) { LockScreenOff(); }
                if (typeof callback === 'function') {
                    callback(result);
                }
            }
        };
        if (list) {
            $.each(list, function (i, table) {
                $.each(this.settings.list_load, function (i, set_load) {
                    if (table === set_load.name) {
                        if (lock) LockScreen(langView('mess_load_reference', App.Langs));
                        if (update || !set_load.list) {
                            process++;
                            set_load.fn_get(function (data) {
                                set_load.list = data;
                                process--;
                                result.push(set_load.name);
                                out_load(process);
                            }.bind(this));
                        };
                    };
                }.bind(this));
            }.bind(this));
        };
        out_load(process);
    };

    api_common.prototype.get = function (api_url, callback) {
        $.ajax({
            type: 'GET',
            url: this.settings.url_api + api_url,
            async: true,
            xhrFields: {
                withCredentials: true
            },
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
                OnAJAXError("api_common" + api_url, x, y, z);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    api_common.prototype.post = function (api_url, operation, callback, callback_error) {
        $.ajax({
            type: 'POST',
            url: this.settings.url_api + api_url,
            data: JSON.stringify(operation),
            async: true,
            xhrFields: {
                withCredentials: true
            },
            contentType: "application/json;charset=utf-8",
            beforeSend: function () {
                AJAXBeforeSend();
            },
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function (x, y, z) {
                OnAJAXError("api_common" + api_url, x, y, z, callback_error);
            },
            complete: function () {
                AJAXComplete();
            },
        });
    };

    //****************************************************************************************
    //-------------------------------- функции для работы с объектами ------------------------
    // Показать весь список
    api_common.prototype.getAllObj = function (name_list_obj) {
        return this.settings.list_load.find(function (o) { return o.name === name_list_obj })
    };
    // выбрать из списка по полю
    api_common.prototype.getObj_Of_field = function (name_list_obj, field_name, value) {
        var obj = null;
        //var res = this.settings.list_load.find(function (o) { return o.name === name_list_obj });
        var res = this.getAllObj(name_list_obj);
        if (res) {
            if (res.list && res.list.length > 0) {
                obj = res.list.find(function (o) { return $.trim(o[field_name]) == $.trim(value) });
            }
        }
        return obj;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:}
    api_common.prototype.getListObj = function (name_list_obj, fvalue, ftext, lang, filter) {
        var list_obj = this.getAllObj(name_list_obj);
        var list = [];
        var list_filtr = null;
        if (list_obj && list_obj.list) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.list.filter(filter);
            } else { list_filtr = list_obj.list; }
            $.each(list_filtr, function (i, el) {
                if (lang) {
                    list.push({ value: el[fvalue], text: el[ftext + lang], disabled: false });
                } else {
                    list.push({ value: el[fvalue], text: el[ftext], disabled: false });
                }
            }.bind(this));
        }
        return list;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:}
    api_common.prototype.getListObj2 = function (name_list_obj, fvalue, ftext1, ftext2, lang, filter) {
        var list_obj = this.getAllObj(name_list_obj);
        var list = [];
        var list_filtr = null;
        if (list_obj && list_obj.list) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.list.filter(filter);
            } else { list_filtr = list_obj.list; }
            for (var i = 0, j = list_filtr.length; i < j; i++) {
                var l = list_filtr[i];
                if (lang) {
                    list.push({ value: l[fvalue], text: l[ftext1 + lang] + ' - ' + l[ftext2 + lang], disabled: false });
                } else {
                    list.push({ value: l[fvalue], text: l[ftext1] + ' - ' + l[ftext2], disabled: false });
                }
            }
        }
        return list;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:} с учетом языковых полей
    api_common.prototype.getListObj2L = function (name_list_obj, fvalue, ftext1, ftext2, lang1, lang2, filter) {
        var list_obj = this.getAllObj(name_list_obj);
        var list = [];
        var list_filtr = null;
        if (list_obj && list_obj.list) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.list.filter(filter);
            } else { list_filtr = list_obj.list; }
            for (var i = 0, j = list_filtr.length; i < j; i++) {
                var l = list_filtr[i];
                if (lang1 || lang2) {
                    list.push({ value: l[fvalue], text: l[ftext1 + (lang1 !== null ? lang1 : '')] + ' - ' + l[ftext2 + (lang2 !== null ? lang2 : '')], disabled: false });
                } else {
                    list.push({ value: l[fvalue], text: l[ftext1] + ' - ' + l[ftext2], disabled: false });
                }
            }
        }
        return list;
    };
    // Вернуть спсисок объектов таблицы в формате {value:, text:}
    api_common.prototype.getListObjOfList = function (list_obj, fvalue, ftext, lang, filter) {
        var list = [];
        var list_filtr = null;
        if (list_obj && list_obj.length > 0) {
            if (typeof filter === 'function') {
                list_filtr = list_obj.filter(filter);
            } else { list_filtr = list_obj; }
            $.each(list_filtr, function (i, el) {
                if (lang) {
                    list.push({ value: el[fvalue], text: el[ftext + lang], disabled: false });
                } else {
                    list.push({ value: el[fvalue], text: el[ftext], disabled: false });
                }
            }.bind(this));
        }
        return list;
    };
    App.api_common = api_common;

    window.App = App;

})(window);