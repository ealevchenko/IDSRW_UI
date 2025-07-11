﻿var format_date = "YYYY-MM-DD";
var format_time = "HH:mm:ss";
var format_datetime = "YYYY-MM-DD HH:mm:ss";
var format_datetime_ru = "DD.MM.YYYY HH:mm:ss";
var url_api_main = "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API";
var url_api_test = "https://krr-tst-padev02.europe.mittalco.com/IDSRW_API";
//var url_api_test = "https://localhost:7280";
//var url_api_main = "https://localhost:7280";

/* ----------------------------------------------------------
        Вывод текста согласно региональных настроек
-------------------------------------------------------------*/
// Метод определения списка по указаному языку
getLanguages = function (languages, lang) {
    if (lang === 'ru') {
        var language = navigator.language ? navigator.language : navigator.browserLanguage;
        if (!language) return languages['default'];
        language = language.toLowerCase();
        for (var key in languages) {
            if (language.indexOf(key) != -1) {
                return languages[key];
            }
        }
        return languages['default'];
    }
    else if (lang && lang in languages) {
        return languages[lang];
    }
    else {
        return languages['default'];
    }
};
// Показать текст
langView = function (t, langs) {
    var _t = t.toLowerCase();
    var re = (t in langs) ? langs[t] : (_t in langs) ? langs[_t] : null;
    if (re === null) {
        throw new Error('Неопределённ параметр : ' + t);
    }
    return re;
};
// Вернуть строку с первой заглавной
ucFirst = function (str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
};
// Показать форматированный текст
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}
//==============================================================================================
/* ----------------------------------------------------------
                Блокировка экрана
-------------------------------------------------------------*/
// Блокировать с текстом
var LockScreen = function (message) {
    var lock = document.getElementById('lockPanel');
    if (lock)
        lock.className = 'LockOn';
    lock.innerHTML = message;
};
// Разблокировать 
var LockScreenOff = function () {
    var lock = document.getElementById('lockPanel');
    if (lock)
        lock.className = 'LockOff';
};
//------------------------------------------------------------------------
// Определение параметров переданных по url
var getUrlVars = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
};
var getUrlVar = function (name) {
    return getUrlVars()[name];
};

// Remove the formatting to get integer data for summation
var intVal = function (i) {
    return typeof i === 'string'
        ? i.replace(/[\$,]/g, '') * 1
        : typeof i === 'number'
            ? i
            : 0;
};
var isNumeric = function (value) {
    return /^\d+$/.test(value);
};
var is_valid_num_wagon = function (num) {
    if (num) {
        if (!isNumeric(num)) return false;
        if (!(Number(num) >= 10000000 && Number(num) <= 99999999)) return false;
        var symbols = String(num).split(""); // разбиваем на массив символов
        if (symbols.length !== 8) return false;
        var cs = Number(symbols[7]);
        symbols.length--;
        var kof = [2, 1, 2, 1, 2, 1, 2];
        var result = 0;
        for (ni = 0; ni < symbols.length; ni++) {
            var res_k = symbols[ni] * kof[ni];
            if (res_k > 9) {
                var symbols_k = String(res_k).split(""); // разбиваем на массив символов
                res_k = Number(symbols_k[0]) + Number(symbols_k[1]);
            }
            result += Number(res_k);
        }
        result = Number(result) + cs;
        var res = result % 10;
        if (res === 0) { return true; } else { return false; }
    }
    return false;
};

var get_result_select = function (value) {
    if (value === null) return value;
    if (!isNaN(Number(value))) {
        var val = Number(value);
        return val === -1 ? null : val;
    }
    return value;
};

// Получить максимальное значение
var get_max_element = function (rows, name_field) {
    if (rows && rows.length > 0) {
        var oe = rows.filter(function (i) { return i[name_field]; }.bind(this)).sort(function (a, b) { return new Date(b[name_field]) - new Date(a[name_field]); }.bind(this));
        return oe && oe.length > 0 ? oe[0][name_field] : null;
    }
    return null;
};
var get_belongs_element = function (rows, name_field, id) {
    if (rows && rows.length > 0) {
        var oe = rows.filter(function (i) { return i[name_field] === id; }.bind(this));
        return oe && oe.length === rows.length ? true : false;
    }
    return false;
};

(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Url_Api = url_api_main;
    //App.Url_Api = url_api_test;

    // Определим AdminInfo - информацию об api которое подключено к UI
    App.AdminInfo = {};
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open("GET", App.Url_Api + "/Admin/user_info");
    // обработчик получения ответа сервера
    xhr.onload = () => {
        if (xhr.status == 200) {
            // если код ответа 200
            App.AdminInfo = JSON.parse(xhr.responseText);
            console.log("Server response: ", xhr.statusText);
        } else {                                // иначе выводим текст статуса
            App.AdminInfo = {};
            console.log("Server response: ", xhr.statusText);
        }
    };
    xhr.send();     // выполняем запрос

    //let cnt = localStorage.getItem('visitCount');
    //// Устанавливаем счетчик в 0, если посещение впервые
    //if (cnt === null) { cnt = 0; };
    //// Увеличиваем счетчик на 1
    //cnt++;
    //// Обновляем значение счетчика в localStorage
    //localStorage.setItem('visitCount', cnt);
    //// Выводим значение счетчика на страницу
    //console.log("visitCount: ", cnt);

    /* ----------------------------------------------------------
                        Список слов
    -------------------------------------------------------------*/
    $.Text_Common =
    {
        'default':  //default language: ru
        {
            'mess_delay': 'Мы обрабатываем ваш запрос...',
            'mess_load_table': 'Формируем таблицу...',
            'mess_load': 'Загрузка справочников...',
            'mess_save': 'Запись и обновление данных...',
            'mess_load_data': 'Получение запрашиваемых данных...',
            'mess_operation': 'Выполняю операцию...',
            'mess_update_uz': 'Обновляю данные на УЗ...',
            'mess_checking_data': 'Проверяю данные...',

            'mess_error_not_cars': 'Введите номер вагона или несколько вагонов, разделитель номеров ";"',
            'mess_error_cars': 'Ошибка ввода, номеров вагонов!',
            'mess_error_input_num_cars': 'Ошибка ввода, номер позиции :{0}, введен неправильный номер :{1}',
            'mess_error_input_num_cars1': 'Ошибка ввода, номер позиции :{0}, номер не может быть меньше или равен 0 :{1}',
            'mess_error_input_num_cars2': 'Ошибка ввода, номер позиции :{0}, не системная нумерация (ошибка контрольной суммы) :{1}',
            'mess_error_input_num_cars_duble': 'Ошибка ввода, введеный номер :{0} - повторяется!',

            'mess_error_docs': 'Ошибка ввода, номеров накладных!',
            'mess_error_not_docs': 'Введите номер документа или несколько документов, разделитель номеров ";"',
            'mess_error_input_num_docs': 'Ошибка ввода, номер позиции :{0}, введен неправильный номер :{1}',
            'mess_error_input_num_docs1': 'Ошибка ввода, номер позиции :{0}, номер не может быть меньше или равен 0 :{1}',
            'mess_error_input_num_docs_duble': 'Ошибка ввода, введеный номер :{0} - повторяется!',


            'epd_status_unknown': 'Статус невідомий',
            'epd_status_draft': 'Чернетка',
            'epd_status_sending': 'Документ передається товарному касиру',
            'epd_status_registered': 'Документ переданий товарному касиру',
            'epd_status_reclaiming': 'Документ відкликається від товарного касира',
            'epd_status_accepted': 'Вантаж прийнято до перевезення',
            'epd_status_delivered': 'Вантаж прибув',
            'epd_status_recieved': 'Вантаж отримано одержувачем',
            'epd_status_uncredited': 'Документ розкредитовано товарним касиром',
            'epd_status_recieved_draft': 'Вантаж отримано одержувачем і редагується',
            'epd_status_recieved_sending': 'Вантаж отримано одержувачем і переданий товарному касиру',
            'epd_status_recieved_reclaiming': 'Вантаж отримано одержувачем і відкликається від товарного касира',
            'epd_status_canceled': 'Документ зіпсований товарним касиром',
            'epd_status_locked': 'Документ заблокований',

        },
        'en':  //default language: English
        {
            'mess_delay': 'We are processing your request ...',
            'mess_load_table': 'Forming table ...',
            'mess_load': 'Downloading reference books...',
            'mess_save': 'Writing and updating data ...',
            'mess_load_data': 'Receiving the requested data...',
            'mess_operation': 'Performing an operation...',
            'mess_update_uz': 'I am updating the data on the UZ ...',
            'mess_checking_data': 'Checking data...',

            'mess_error_not_cars': 'Enter the number of a car or several cars, number separator ";"',
            'mess_error_input_num_cars': 'Input error, item number :{0}, wrong number entered :{1}',
            'mess_error_input_num_cars1': 'Input error, position number :{0}, number cannot be less than or equal to 0 :{1}',
            'mess_error_input_num_cars2': 'Input error, position number :{0}, non-system numbering (checksum error) :{1}',
            'mess_error_input_num_cars_duble': 'Input error, number entered :{0} - repeated!',

            'epd_status_unknown': 'Unknown status',
            'epd_status_draft': 'Darling',
            'epd_status_sending': 'Document is being sent to the commodity cashier',
            'epd_status_registered': 'Document of transfers to the commodity cashier',
            'epd_status_reclaiming': 'Document reclaimed by cashier',
            'epd_status_accepted': 'Vantage accepted before moving',
            'epd_status_delivered': 'Epd_status_delivered',
            'epd_status_recieved': 'Vantage received by owner',
            'epd_status_uncredited': 'Document uncredited by commodity cashier',
            'epd_status_recieved_draft': 'Vantage received and edited',
            'epd_status_recieved_sending': 'Vantage received by the receiver and the goods cashier',
            'epd_status_recieved_reclaiming': 'Vantage received by the owner and reclaimed by the cashier',
            'epd_status_canceled': 'Document of zіpsovaniya commodity cashier',
            'epd_status_locked': 'Lock Document',
        }

    };
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'title_label_date': 'ПЕРИОД :',
            'title_select': 'Выберите...',
            'title_select_all': 'Выбрать все',
        },
        'en':  //default language: English
        {
            'title_label_date': 'PERIOD:',
            'title_select': 'Select ...',
            'title_select_all': 'Select all',
        }
    };
    // Определлим список текста для этого модуля
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang), getLanguages($.Text_Common, App.Lang));

    //================================================================================
    // Класс для создания объектов 
    //--------------------------------Конструктор и инициализация---------------
    // создать класс
    function form_element() {

    };

    var add_tag = function (element, tag_name, tag_value) {
        if (element && tag_name && tag_name !== '' && tag_value !== null) {
            element.attr(tag_name, tag_value);
        }
    }

    var add_class = function (element, tag) {
        if (element && tag && tag !== '') {
            element.addClass(tag);
        }
    }

    var add_id = function (element, tag) {
        if (element && tag && tag !== '') {
            element.attr('id', tag);
        }
    }

    var add_for = function (element, tag) {
        if (element && tag && tag !== '') {
            element.attr('for', tag);
        }
    }

    var add_title = function (element, tag) {
        if (element && tag && tag !== '') {
            element.attr('title', tag);
        }
    }

    var add_value = function (element, value) {
        if (element && value && value !== '') {
            element.attr('value', value);
        }
    }

    var add_val = function (element, value) {
        if (element && value && value !== '') {
            element.val(value);
        }
    }

    var append_label = function (element, label) {
        if (element && label && label !== '') {
            element.append(label);
        }
    };

    var append_text = function (element, text) {
        if (element && text !== '') {
            element.append(text);
        }
    };

    var add_click = function (element, fn) {
        if (element && typeof fn === 'function') {
            element.on('click', fn);
        }
    };

    //--------------HTML-----------------------------------
    //<form novalidate></form>
    form_element.prototype.form = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
            novalidate: null,
        }, options);
        this.$html = $('<form></form>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <form></form>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'novalidate', this.settings.novalidate);
        }
    };

    form_element.prototype.select = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            title: null,
            placeholder: null,
            required: null,
            size: null,
            multiple: null,
            readonly: false,
        }, options);
        this.$select = $('<select></select>');
        if (!this.$select || this.$select.length === 0) {
            throw new Error('Не удалось создать элемент <select></select>');
        } else {
            add_class(this.$select, this.settings.class);
            add_id(this.$select, this.settings.id);
            add_tag(this.$select, 'name', this.settings.id);
            add_tag(this.$select, 'title', this.settings.title);
            add_tag(this.$select, 'placeholder', this.settings.placeholder);
            add_tag(this.$select, 'required', this.settings.required);
            if (this.settings.size !== null || this.settings.size !== '') {
                add_class(this.$select, 'form-control-' + this.settings.size);
            }
            if (this.settings.multiple) {
                add_tag(this.$select, 'multiple', 'multiple');
            }
            this.$select.prop('readonly', this.settings.readonly);
        }
    };
    // <table></table>
    form_element.prototype.table = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            title: null,
            style: null,
        }, options);
        this.$html = $('<table></table>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <table></table>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'title', this.settings.title);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // <thead></thead>
    form_element.prototype.thead = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        this.$html = $('<thead></thead>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <thead></thead>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // <tbody></tbody>
    form_element.prototype.tbody = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        this.$html = $('<tbody></tbody>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <tbody></tbody>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // <tfoot></tfoot>
    form_element.prototype.tfoot = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        this.$html = $('<tfoot></tfoot>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <tfoot></tfoot>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // Элемент <tr</tr>
    form_element.prototype.tr = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        this.$html = $('<tr></tr>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <tr></tr>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // Элемент <th</th>
    form_element.prototype.th = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
            width: null,
            scope: null,
            text: null,
            colspan: null,
            colrow: null,
        }, options);
        this.$html = $('<th></th>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <th></th>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'style', this.settings.style);
            add_tag(this.$html, 'width', this.settings.width);
            add_tag(this.$html, 'scope', this.settings.scope);
            append_text(this.$html, this.settings.text);
            add_tag(this.$html, 'colspan', this.settings.colspan);
            add_tag(this.$html, 'colrow', this.settings.colrow);
        }
    };
    // Элемент <td</td>
    form_element.prototype.td = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
            width: null,
            scope: null,
            text: null,
            colspan: null,
            colrow: null,
        }, options);
        this.$html = $('<td></td>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <td></td>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'style', this.settings.style);
            add_tag(this.$html, 'width', this.settings.width);
            add_tag(this.$html, 'scope', this.settings.scope);
            append_text(this.$html, this.settings.text);
            add_tag(this.$html, 'colspan', this.settings.colspan);
            add_tag(this.$html, 'colrow', this.settings.colrow);
        }
    };
    // Элемент <div></div>
    form_element.prototype.div = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        this.$html = $('<div></div>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <div></div>');
        } else {
            add_id(this.$html, this.settings.id);
            add_class(this.$html, this.settings.class);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // Элемент <span></span>
    form_element.prototype.span = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            text: null,
            class: null,
            color: null,
            style: null,
        }, options);
        this.$html = $('<span></span>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <span></span>');
        } else {
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'name', this.settings.name);
            add_class(this.$html, this.settings.class);
            add_class(this.$html, this.settings.color);
            add_tag(this.$html, 'style', this.settings.style);
            append_text(this.$html, this.settings.text);
        }
    };
    //Элемент <a class="..." id="..." href='...' target="_blank">...</a>
    form_element.prototype.a = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            href: null,
            text: null,
            target: null,
            title: null,
        }, options);
        this.$html = $('<a></a>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <a></a>');
        } else {
            add_id(this.$html, this.settings.id);
            add_class(this.$html, this.settings.class);
            add_title(this.$html, this.settings.title);
            append_label(this.$html, this.settings.text);
            add_tag(this.$html, 'target', this.settings.target);
            add_tag(this.$html, 'href', this.settings.href);
        }
    };
    //<fieldset>
    //    <legend>Do you agree?</legend>
    //</fieldset>
    form_element.prototype.fieldset = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            legend: null,
            class_legend: null,
        }, options);
        this.$html = $('<fieldset></fieldset>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <fieldset></fieldset>');
        } else {
            add_id(this.$html, this.settings.id);
            add_class(this.$html, this.settings.class);
            if (this.settings.legend) {
                this.$legend = $('<legend></legend>');
                add_class(this.$legend, this.settings.class_legend);
                append_text(this.$legend, this.settings.legend);
                this.$html.append(this.$legend);
            }
        }
    };

    // Элемент <label for="..." class="..">..</label>
    form_element.prototype.label = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
            for: null,
            label: null
        }, options);
        this.$html = $('<label></label>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <div></div>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            append_label(this.$html, this.settings.label);
            add_for(this.$html, this.settings.for);
        }
    };
    // <h5 class="offcanvas-title" id="offcanvas-title-operation-detali">Offcanvas</h5>
    form_element.prototype.hx = function (options) {
        this.settings = $.extend({
            size: 1,
            id: null,
            class: null,
            text: null
        }, options);
        this.$html = $('<h' + this.settings.size + '></h' + this.settings.size + '>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <div></div>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            append_text(this.$html, this.settings.text);
        }
    };
    // Элемент <input type=".." class=".." id="num_car" title=".." name="..".>
    form_element.prototype.input = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            type: 'text',
            class: null,
            value: null,
            checked: null,
            title: null,
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            readonly: false,
            min: null,
            max: null,
            step: null,
        }, options);
        this.$html = $('<input></input>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <input></input>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'name', this.settings.name ? this.settings.name : this.settings.id);
            add_tag(this.$html, 'type', this.settings.type);
            add_tag(this.$html, 'value', this.settings.value);
            add_tag(this.$html, 'checked', this.settings.checked);
            add_tag(this.$html, 'title', this.settings.title);
            add_tag(this.$html, 'placeholder', this.settings.placeholder);
            add_tag(this.$html, 'required', this.settings.required);
            add_tag(this.$html, 'maxlength', this.settings.maxlength);
            add_tag(this.$html, 'pattern', this.settings.pattern);
            add_tag(this.$html, 'min', this.settings.min);
            add_tag(this.$html, 'max', this.settings.max);
            add_tag(this.$html, 'step', this.settings.step);
            this.$html.prop('readonly', this.settings.readonly);
        }
    };
    //<select>
    //    <option>Пункт 1</option>
    //    <option>Пункт 2</option>
    //</select>
    form_element.prototype.select = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            class: null,
            value: null,
            multiple: false,
            title: null,
            required: null,
            readonly: false,
            size: null,
            options: null,
        }, options);
        this.$html = $('<select></select>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <select></select>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'name', this.settings.name ? this.settings.name : this.settings.id);
            add_tag(this.$html, 'value', this.settings.value);
            add_tag(this.$html, 'multiple', this.settings.multiple);
            add_tag(this.$html, 'title', this.settings.title);
            add_tag(this.$html, 'required', this.settings.required);
            add_tag(this.$html, 'size', this.settings.size);
            this.$html.prop('readonly', this.settings.readonly);
            $.each(this.settings.options, function (i, el) {
                var option = $('<option value="' + el.value + '">');
                option.append(el.text);
                option.prop('disabled', el.disabled);
                option.prop('selected ', el.selected);
                this.$html.append(option);
            }.bind(this));
        }
    };
    // Элемент <textarea rows="10" cols="45" name="text"></textarea>
    form_element.prototype.textarea = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            class: null,
            value: null,
            title: null,
            placeholder: null,
            required: null,
            maxlength: null,
            readonly: false,
            cols: null,
            rows: null,
            wrap: null,
        }, options);
        this.$html = $('<textarea></textarea>');

        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <textarea></textarea>');
        } else {
            add_class(this.$html, this.settings.class);
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'name', this.settings.name ? this.settings.name : this.settings.id);
            add_tag(this.$html, 'value', this.settings.value);
            add_tag(this.$html, 'title', this.settings.title);
            add_tag(this.$html, 'placeholder', this.settings.placeholder);
            add_tag(this.$html, 'required', this.settings.required);
            add_tag(this.$html, 'maxlength', this.settings.maxlength);
            add_tag(this.$html, 'cols', this.settings.cols);
            add_tag(this.$html, 'rows', this.settings.rows);
            add_tag(this.$html, 'wrap', this.settings.wrap);
            this.$html.prop('readonly', this.settings.readonly);
        }
    };
    //<datalist id="datalistOptions">
    //  <option value="San Francisco">
    //  <option value="New York">
    //  <option value="Seattle">
    //  <option value="Los Angeles">
    //  <option value="Chicago">
    //</datalist>
    form_element.prototype.datalist = function (options) {
        this.settings = $.extend({
            id: null,
            //name: null,
            class: null,
            options: [],
        }, options);
        this.$html = $('<datalist></datalist>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <datalist></datalist>');
        } else {
            add_id(this.$html, this.settings.id);
            //add_tag(this.$html, 'name', this.settings.id);
            add_class(this.$html, this.settings.class);
            $.each(this.settings.options, function (i, el) {
                var option = $('<option value="' + el.value + '">');
                option.append(el.text);
                option.prop('disabled', el.disabled);
                this.$html.append(option);
            }.bind(this));
        }
    };
    //--------------BOOTSTRAP-----------------------------------
    form_element.prototype.bs_form = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        var form = new this.fe.form({
            class: this.settings.class,
            id: this.settings.id,
            novalidate: true,
        });
        add_class(form.$html, 'needs-validation');
        add_tag(form.$html, 'style', this.settings.style);
        this.$html = form.$html;
    };
    //<div class="alert alert-primary" role="alert">
    //    A simple primary alert—check it out!
    //</div>
    form_element.prototype.bs_alert = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
            color: null,
            bt_close: false,
            fn_click_close: null,
        }, options);
        var div = new this.fe.div({
            class: 'alert',
            id: this.settings.id,
            style: this.settings.style,
        });
        var div_message = new this.fe.div({
            class: 'message',
        });
        add_tag(div.$html, 'role', 'alert');

        if (this.settings.color !== null) {
            add_class(div.$html, 'alert-' + this.settings.color);
        }
        if (this.settings.bt_close) {
            var button = new this.fe.bs_button({
                class: 'btn-close',
                fn_click: this.settings.fn_click_close,
            });
            add_class(div.$html, 'd-flex justify-content-end') // если будет кнопка добавим прижим к правому краю
            add_tag(button.$html, 'data-bs-dismiss', 'alert');
            add_tag(button.$html, 'aria-label', 'Close');
            div.$html.append(div_message.$html).append(button.$html);
        }
        this.$html = div.$html;
    };
    //<div class="row">
    form_element.prototype.bs_row = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
            obj_form: null,
            append_objs: null,
        }, options);
        this.$html = $('<div></div>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <div class="row"></div>');
        } else {
            add_class(this.$html, 'row');
            add_id(this.$html, this.settings.id);
            add_class(this.$html, this.settings.class);
            add_tag(this.$html, 'style', this.settings.style);
            if (this.settings.obj_form !== null && this.settings.append_objs !== null && this.settings.append_objs.length > 0) {
                this.fe.add_obj(this.$html, this.settings.append_objs, this.settings.obj_form, function (content) {

                }.bind(this));
            }
        }
    };
    //<div class="col-6">.col-6</div>
    form_element.prototype.bs_col = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            pref: null,
            size: null,
            class: null,
            style: null,
            obj_form: null,
            append_objs: null,
        }, options);
        this.$html = $('<div></div>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <div class="col"></div>');
        } else {

            var cls = 'col';
            if (this.settings.pref !== null) {
                cls += '-' + this.settings.pref;
            }
            if (this.settings.size !== null) {
                cls += '-' + this.settings.size;
            }
            add_class(this.$html, cls);
            add_id(this.$html, this.settings.id);
            add_class(this.$html, this.settings.class);
            add_tag(this.$html, 'style', this.settings.style);
            if (this.settings.obj_form !== null && this.settings.append_objs !== null && this.settings.append_objs.length > 0) {
                this.fe.add_obj(this.$html, this.settings.append_objs, this.settings.obj_form, function (content) {

                }.bind(this));
            }
        }
    };
    // Элемент <div class="input-group"></div>
    form_element.prototype.bs_input_group = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        this.$html = $('<div></div>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <div class="input-group"></div>');
        } else {
            add_id(this.$html, this.settings.id);
            add_class(this.$html, 'input-group');
            add_class(this.$html, this.settings.class);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // Элемент <div class="form-check"></div>
    form_element.prototype.bs_div_form_check = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            style: null,
        }, options);
        this.$html = $('<div></div>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <div class="form-check"></div>');
        } else {
            add_id(this.$html, this.settings.id);
            add_class(this.$html, 'form-check');
            add_class(this.$html, this.settings.class);
            add_tag(this.$html, 'style', this.settings.style);
        }
    };
    // Элемент <button class="btn btn-primary" type="button">Toggle right offcanvas</button>
    form_element.prototype.bs_button = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            class: null,
            fsize: null,
            color: null,
            text: null,
            title: null,
            icon_fa_left: null,
            icon_fa_right: null,
            fn_click: null,
        }, options);
        this.$html = $('<button></button>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <button></button>');
        } else {
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'name', this.settings.name);
            add_tag(this.$html, 'type', 'button');
            add_tag(this.$html, 'title', this.settings.title);
            add_class(this.$html, 'btn');
            add_class(this.$html, this.settings.fsize !== null ? 'btn-' + this.settings.fsize : null);
            add_class(this.$html, this.settings.color !== null ? 'btn-' + this.settings.color : null);
            add_class(this.$html, this.settings.class);
            append_text(this.$html, this.settings.text);

            if (this.settings.icon_fa_left !== null && this.settings.icon_fa_left !== '') {
                var icon = $('<i></i>', {
                    'class': this.settings.icon_fa_left,
                    'aria-hidden': 'true'
                });
                this.$html.prepend(' ').prepend(icon);
            };
            if (this.settings.icon_fa_right && this.settings.icon_fa_right !== '') {
                var icon = $('<i></i>', {
                    'class': this.settings.icon_fa_right,
                    'aria-hidden': 'true'
                });
                this.$html.append(' ').append(icon);
            };
            if (this.settings.fn_click !== null) {
                this.$html.on("click", this.settings.fn_click);
            }

        }
    };
    //<input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
    form_element.prototype.bs_input = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            type: 'text',
            class: null,
            fsize: null,
            value: null,
            title: null,
            placeholder: null,
            required: null,
            maxlength: null,
            pattern: null,
            readonly: false,
            min: null,
            max: null,
            step: null,

        }, options);
        var input = new this.fe.input({
            id: this.settings.id,
            name: this.settings.name,
            type: this.settings.type,
            class: 'form-control',
            value: this.settings.value,
            title: this.settings.title,
            placeholder: this.settings.placeholder,
            required: this.settings.required,
            maxlength: this.settings.maxlength,
            pattern: this.settings.pattern,
            readonly: this.settings.readonly,
            min: this.settings.min,
            max: this.settings.max,
            step: this.settings.step,
        });
        add_class(input.$html, this.settings.fsize !== null ? 'form-control-' + this.settings.fsize : null);
        add_class(input.$html, this.settings.class);
        this.$html = input.$html;
    };
    //<select class="form-select" id="validationCustom04" required>
    //    <option selected disabled value="">Choose...</option>
    //    <option>...</option>
    //</select>
    form_element.prototype.bs_select = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            class: null,
            fsize: null,
            value: null,
            multiple: false,
            title: null,
            required: null,
            readonly: false,
            size: null,
            options: null,
        }, options);
        var select = new this.fe.select({
            id: this.settings.id,
            name: this.settings.name,
            class: 'form-control',
            value: this.settings.value,
            multiple: this.settings.multiple,
            title: this.settings.title,
            required: this.settings.required,
            readonly: this.settings.readonly,
            size: this.settings.size,
            options: this.settings.options,
        });
        add_class(select.$html, this.settings.fsize !== null ? 'form-control-' + this.settings.fsize : null);
        add_class(select.$html, this.settings.class);
        this.$html = select.$html;
    };
    // <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
    form_element.prototype.bs_check_input = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            type: 'checkbox',
            class: null,
            value: null,
            title: null,
            checked: null,
            required: null,
            readonly: false,
        }, options);
        var input = new this.fe.input({
            id: this.settings.id,
            name: this.settings.name,
            type: this.settings.type,
            class: 'form-check-input',
            value: this.settings.value,
            title: this.settings.title,
            checked: this.settings.checked,
            required: this.settings.required,
            readonly: this.settings.readonly,
        });
        //add_class(input.$html, this.settings.size !== null ? 'form-control-' + this.settings.size : null);
        add_class(input.$html, this.settings.class);
        this.$html = input.$html;
    };
    //  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    form_element.prototype.bs_textarea = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            class: null,
            fsize: null,
            value: null,
            title: null,
            placeholder: null,
            required: null,
            maxlength: null,
            readonly: false,
            cols: null,
            rows: null,
            wrap: null,
        }, options);
        var textarea = new this.fe.textarea({
            id: this.settings.id,
            name: this.settings.name,
            class: 'form-control',
            value: this.settings.value,
            title: this.settings.title,
            placeholder: this.settings.placeholder,
            required: this.settings.required,
            maxlength: this.settings.maxlength,
            readonly: this.settings.readonly,
            cols: this.settings.cols,
            rows: this.settings.rows,
            wrap: this.settings.wrap,
        });
        add_class(textarea.$html, this.settings.fsize !== null ? 'form-control-' + this.settings.fsize : null);
        add_class(textarea.$html, this.settings.class);
        this.$html = textarea.$html;
    };
    // ============================= Элементы форм ==============================
    //<div class="col-md-4">
    //    <label for="validationCustomUsername" class="form-label">Username</label>
    //    <div class="input-group has-validation">
    //        <span class="input-group-text" id="inputGroupPrepend">@</span>
    //        ...............................................................  
    //            <div class="invalid-feedback">
    //                Please choose a username.
    //            </div>
    //    </div>
    //</div>
    form_element.prototype.bs_form_input_group = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            label: null,
            element_html: null,
            validation: false,
            feedback_invalid: null,
            feedback_valid: null,
            feedback_class: null,
            col_prefix: null,
            col_size: null,
            col_class: null,
            group_fsize: null,
            obj_form: null,
            /*            group_prepend: false,*/
            // В начало
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: null,
            group_prepend_objs: null,
            /*            group_append: false,*/
            // В конец
            group_append_class: null,
            group_append_id: null,
            group_append_html: null,
            group_append_objs: null,
            form_text: null,
            form_text_class: null,
        }, options);
        var col = new this.fe.bs_col({
            pref: this.settings.col_prefix,
            size: this.settings.col_size,
            class: this.settings.col_class,
        });
        var label = new this.fe.label({
            class: 'form-label',
            for: this.settings.id,
            label: this.settings.label
        });
        var input_group = new this.fe.bs_input_group({
            class: this.settings.validation ? 'has-validation' : null,
        });
        add_class(input_group.$html, this.settings.group_fsize !== null ? 'input-group-' + this.settings.group_fsize : null);
        // group_prepend
        if (this.settings.group_prepend_html !== null) {
            var span_prepend = new this.fe.span({
                id: this.settings.group_prepend_id,
                class: 'input-group-text ' + (this.settings.group_prepend_class !== null ? this.settings.group_prepend_class : ''),
                text: this.settings.group_prepend_html,
            });
            input_group.$html.prepend(span_prepend.$html);
        }
        if (this.settings.obj_form !== null && this.settings.group_prepend_objs !== null && this.settings.group_prepend_objs.length > 0) {
            this.fe.add_obj(input_group.$html, this.settings.group_prepend_objs, this.settings.obj_form, function (content) {

            }.bind(this));
        };
        // element_html
        input_group.$html.append(this.settings.element_html);
        // group_append
        if (this.settings.group_append_html !== null) {
            var span_append = new this.fe.span({
                id: this.settings.group_append_id,
                class: 'input-group-text ' + (this.settings.group_append_class !== null ? this.settings.group_append_class : ''),
                text: this.settings.group_append_html,
            });
            input_group.$html.append(span_append.$html);
        };
        if (this.settings.obj_form !== null && this.settings.group_append_objs !== null && this.settings.group_append_objs.length > 0) {
            this.fe.add_obj(input_group.$html, this.settings.group_append_objs, this.settings.obj_form, function (content) {

            }.bind(this));
        }

        if (this.settings.validation) {
            var feedback = new this.fe.div({
                class: 'invalid-feedback' + (this.settings.feedback_class !== null ? this.settings.feedback_class : ''),
            });
            add_class(feedback.$html, this.settings.feedback_class);
            feedback.$html.append(this.settings.feedback_invalid);
            input_group.$html.append(feedback.$html);
        }
        col.$html.append(label.$html).append(input_group.$html);
        if (this.settings.form_text !== null) {
            var ftext = new this.fe.div({
                id: this.settings.id + '-help',
                class: 'form-text',
            });
            add_class(ftext.$html, this.settings.form_text_class);
            ftext.$html.append(this.settings.form_text);
            col.$html.append(ftext.$html);
        }
        this.$html = col.$html;
    }
    //<div class="col-auto">
    //  <label for="inputPassword6" class="col-form-label">Password</label>
    //</div>
    //<div class="col-auto">
    //  <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline">
    //</div>
    form_element.prototype.bs_form_inline_input_group = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            label: null,
            element_html: null,
            validation: false,
            feedback_invalid: null,
            feedback_valid: null,
            feedback_class: null,
            //col_prefix: null,
            //col_size: null,
            col_class: null,
            group_fsize: null,
            obj_form: null,
            // В начало
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: null,
            group_prepend_objs: null,
            // В конец
            group_append_class: null,
            group_append_id: null,
            group_append_html: null,
            group_append_objs: null,
            form_text: null,
            form_text_class: null,
        }, options);
        var col_label = new this.fe.bs_col({
            pref: null,
            size: 'auto',
            class: this.settings.col_class,
        });
        var col_input = new this.fe.bs_col({
            pref: null,
            size: 'auto',
            class: this.settings.col_class,
        });
        var label = new this.fe.label({
            class: 'col-form-label',
            for: this.settings.id,
            label: this.settings.label
        });
        var input_group = new this.fe.bs_input_group({
            class: this.settings.validation ? 'has-validation' : null,
        });
        add_class(input_group.$html, this.settings.group_fsize !== null ? 'input-group-' + this.settings.group_fsize : null);
        // group_prepend
        if (this.settings.group_prepend_html !== null) {
            var span_prepend = new this.fe.span({
                id: this.settings.group_prepend_id,
                class: 'input-group-text ' + (this.settings.group_prepend_class !== null ? this.settings.group_prepend_class : ''),
                text: this.settings.group_prepend_html,
            });
            input_group.$html.prepend(span_prepend.$html);
        }
        if (this.settings.obj_form !== null && this.settings.group_prepend_objs !== null && this.settings.group_prepend_objs.length > 0) {
            this.fe.add_obj(input_group.$html, this.settings.group_prepend_objs, this.settings.obj_form, function (content) {

            }.bind(this));
        };
        // element_html
        input_group.$html.append(this.settings.element_html);
        // group_append
        if (this.settings.group_append_html !== null) {
            var span_append = new this.fe.span({
                id: this.settings.group_append_id,
                class: 'input-group-text ' + (this.settings.group_append_class !== null ? this.settings.group_append_class : ''),
                text: this.settings.group_append_html,
            });
            input_group.$html.append(span_append.$html);
        };
        if (this.settings.obj_form !== null && this.settings.group_append_objs !== null && this.settings.group_append_objs.length > 0) {
            this.fe.add_obj(input_group.$html, this.settings.group_append_objs, this.settings.obj_form, function (content) {

            }.bind(this));
        }

        if (this.settings.validation) {
            var feedback = new this.fe.div({
                class: 'invalid-feedback' + (this.settings.feedback_class !== null ? this.settings.feedback_class : ''),
            });
            add_class(feedback.$html, this.settings.feedback_class);
            feedback.$html.append(this.settings.feedback_invalid);
            input_group.$html.append(feedback.$html);
        }
        col_label.$html.append(label.$html);
        col_input.$html.append(input_group.$html);
        if (this.settings.form_text !== null) {
            var ftext = new this.fe.div({
                id: this.settings.id + '-help',
                class: 'form-text',
            });
            add_class(ftext.$html, this.settings.form_text_class);
            ftext.$html.append(this.settings.form_text);
            col_input.$html.append(ftext.$html);
        }
        this.$html = [col_label.$html, col_input.$html];
    }

    //<div class="col-md-4">
    //    <label for="validationCustomUsername" class="form-label">Username</label>
    //    <div class="input-group has-validation">
    //        <span class="input-group-text" id="inputGroupPrepend">@</span>
    //        <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
    //        <div class="invalid-feedback">
    //          Please choose a username.
    //        </div>
    //    </div>
    //</div>
    form_element.prototype.bs_form_input = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            label: null,
            element_type: 'text',
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: null,
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_min: null,
            element_max: null,
            element_step: null,
            element_fn_change: null,
            form_inline: false,
            validation: false,
            feedback_invalid: null,
            feedback_valid: null,
            feedback_class: null,
            col_prefix: null,
            col_size: null,
            col_class: null,
            obj_form: null,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: null,
            group_prepend_objs: null,
            group_append_class: null,
            group_append_id: null,
            group_append_html: null,
            group_append_objs: null,
            form_text: null,
            form_text_class: null,
        }, options);
        var element = new this.fe.bs_input({
            id: this.settings.id,
            name: this.settings.name,
            type: this.settings.element_type,
            class: this.settings.element_class,
            fsize: this.settings.element_fsize,
            value: this.settings.element_value,
            title: this.settings.element_title,
            placeholder: this.settings.element_placeholder,
            required: this.settings.element_required,
            maxlength: this.settings.element_maxlength,
            pattern: this.settings.element_pattern,
            readonly: this.settings.element_readonly,
            min: this.settings.element_min,
            max: this.settings.element_max,
            step: this.settings.element_step,
        });
        var form_input = null;
        if (this.settings.form_inline) {
            form_input = new this.fe.bs_form_inline_input_group({
                id: this.settings.id,
                name: this.settings.name,
                label: this.settings.label,
                element_html: element.$html,
                validation: this.settings.validation,
                feedback_invalid: this.settings.feedback_invalid,
                feedback_valid: this.settings.feedback_valid,
                feedback_class: this.settings.feedback_class,
                col_class: this.settings.col_class,
                group_fsize: this.settings.element_fsize,
                obj_form: this.settings.obj_form,
                group_prepend_class: this.settings.group_prepend_class,
                group_prepend_id: this.settings.group_prepend_id,
                group_prepend_html: this.settings.group_prepend_html,
                group_prepend_objs: this.settings.group_prepend_objs,
                group_append_class: this.settings.group_append_class,
                group_append_id: this.settings.group_append_id,
                group_append_html: this.settings.group_append_html,
                group_append_objs: this.settings.group_append_objs,
                form_text: this.settings.form_text,
                form_text_class: this.settings.form_text_class,
            });
        } else {
            form_input = new this.fe.bs_form_input_group({
                id: this.settings.id,
                name: this.settings.name,
                label: this.settings.label,
                element_html: element.$html,
                validation: this.settings.validation,
                feedback_invalid: this.settings.feedback_invalid,
                feedback_valid: this.settings.feedback_valid,
                feedback_class: this.settings.feedback_class,
                col_prefix: this.settings.col_prefix,
                col_size: this.settings.col_size,
                col_class: this.settings.col_class,
                group_fsize: this.settings.element_fsize,
                obj_form: this.settings.obj_form,
                /*            group_prepend: this.settings.group_prepend,*/
                group_prepend_class: this.settings.group_prepend_class,
                group_prepend_id: this.settings.group_prepend_id,
                group_prepend_html: this.settings.group_prepend_html,
                group_prepend_objs: this.settings.group_prepend_objs,
                /*            group_append: this.settings.group_append,*/
                group_append_class: this.settings.group_append_class,
                group_append_id: this.settings.group_append_id,
                group_append_html: this.settings.group_append_html,
                group_append_objs: this.settings.group_append_objs,
                form_text: this.settings.form_text,
                form_text_class: this.settings.form_text_class,
            });
        }
        this.$html = form_input.$html;
        this.$element = element.$html;
    }
    //<div class="col-md-3">
    //  <label for="validationCustom04" class="form-label">State</label>
    //  <select class="form-select" id="validationCustom04" required>
    //    <option selected disabled value="">Choose...</option>
    //    <option>...</option>
    //  </select>
    //  <div class="invalid-feedback">
    //    Please select a valid state.
    //  </div>
    //</div>
    form_element.prototype.bs_form_select = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            label: null,
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_multiple: null,
            element_title: null,
            element_required: null,
            element_readonly: false,
            element_size: null,
            form_inline: false,
            validation: false,
            feedback_invalid: null,
            feedback_valid: null,
            feedback_class: null,
            col_prefix: null,
            col_size: null,
            col_class: null,
            obj_form: null,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: null,
            group_prepend_objs: null,
            group_append_class: null,
            group_append_id: null,
            group_append_html: null,
            group_append_objs: null,
            form_text: null,
            form_text_class: null,
        }, options);
        var element = new this.fe.bs_select({
            id: this.settings.id,
            name: this.settings.name,
            type: this.settings.element_type,
            class: this.settings.element_class,
            fsize: this.settings.element_fsize,
            value: this.settings.element_value,
            multiple: this.settings.element_multiple,
            title: this.settings.element_title,
            required: this.settings.element_required,
            readonly: this.settings.element_readonly,
            size: this.settings.element_size,
            options: [],
        });
        var form_input = null;
        if (this.settings.form_inline) {
            form_input = new this.fe.bs_form_inline_input_group({
                id: this.settings.id,
                name: this.settings.name,
                label: this.settings.label,
                element_html: element.$html,
                validation: this.settings.validation,
                feedback_invalid: this.settings.feedback_invalid,
                feedback_valid: this.settings.feedback_valid,
                feedback_class: this.settings.feedback_class,
                //col_prefix: this.settings.col_prefix,
                //col_size: this.settings.col_size,
                col_class: this.settings.col_class,
                group_fsize: this.settings.element_fsize,
                obj_form: this.settings.obj_form,
                group_prepend_class: this.settings.group_prepend_class,
                group_prepend_id: this.settings.group_prepend_id,
                group_prepend_html: this.settings.group_prepend_html,
                group_prepend_objs: this.settings.group_prepend_objs,
                group_append_class: this.settings.group_append_class,
                group_append_id: this.settings.group_append_id,
                group_append_html: this.settings.group_append_html,
                group_append_objs: this.settings.group_append_objs,
                form_text: this.settings.form_text,
                form_text_class: this.settings.form_text_class,
            });
        } else {
            form_input = new this.fe.bs_form_input_group({
                id: this.settings.id,
                name: this.settings.name,
                label: this.settings.label,
                element_html: element.$html,
                validation: this.settings.validation,
                feedback_invalid: this.settings.feedback_invalid,
                feedback_valid: this.settings.feedback_valid,
                feedback_class: this.settings.feedback_class,
                col_prefix: this.settings.col_prefix,
                col_size: this.settings.col_size,
                col_class: this.settings.col_class,
                group_fsize: this.settings.element_fsize,
                obj_form: this.settings.obj_form,
                group_prepend_class: this.settings.group_prepend_class,
                group_prepend_id: this.settings.group_prepend_id,
                group_prepend_html: this.settings.group_prepend_html,
                group_prepend_objs: this.settings.group_prepend_objs,
                group_append_class: this.settings.group_append_class,
                group_append_id: this.settings.group_append_id,
                group_append_html: this.settings.group_append_html,
                group_append_objs: this.settings.group_append_objs,
                form_text: this.settings.form_text,
                form_text_class: this.settings.form_text_class,
            });
        }
        this.$html = form_input.$html;
        this.$element = element.$html;
    }
    //<div class="col-md-4">
    //    <label for="validationCustomUsername" class="form-label">Username</label>
    //    <div class="input-group has-validation">
    //        <span class="input-group-text" id="inputGroupPrepend">@</span>
    //        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    //        <div class="invalid-feedback">
    //          Please choose a username.
    //        </div>
    //    </div>
    //</div>
    form_element.prototype.bs_form_textarea = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            label: null,
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: null,
            element_required: null,
            element_maxlength: null,
            element_readonly: false,
            element_cols: null,
            element_rows: null,
            element_wrap: null,
            validation: false,
            feedback_invalid: null,
            feedback_valid: null,
            feedback_class: null,
            col_prefix: null,
            col_size: null,
            col_class: null,
            obj_form: null,

            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: null,
            group_prepend_objs: null,

            group_append_class: null,
            group_append_id: null,
            group_append_html: null,
            group_append_objs: null,
            form_text: null,
            form_text_class: null,
        }, options);
        var element = new this.fe.bs_textarea({
            id: this.settings.id,
            name: this.settings.name,
            type: this.settings.element_type,
            class: this.settings.element_class,
            fsize: this.settings.element_fsize,
            value: this.settings.element_value,
            title: this.settings.element_title,
            placeholder: this.settings.element_placeholder,
            required: this.settings.element_required,
            maxlength: this.settings.element_maxlength,
            pattern: this.settings.element_pattern,
            readonly: this.settings.element_readonly,
            cols: this.settings.element_cols,
            rows: this.settings.element_rows,
            wrap: this.settings.element_wrap,
        });
        var form_input = new this.fe.bs_form_input_group({
            id: this.settings.id,
            name: this.settings.name,
            label: this.settings.label,
            element_html: element.$html,
            validation: this.settings.validation,
            feedback_invalid: this.settings.feedback_invalid,
            feedback_valid: this.settings.feedback_valid,
            feedback_class: this.settings.feedback_class,
            col_prefix: this.settings.col_prefix,
            col_size: this.settings.col_size,
            col_class: this.settings.col_class,
            group_fsize: this.settings.element_fsize,
            obj_form: this.settings.obj_form,
            /*            group_prepend: this.settings.group_prepend,*/
            group_prepend_class: this.settings.group_prepend_class,
            group_prepend_id: this.settings.group_prepend_id,
            group_prepend_html: this.settings.group_prepend_html,
            group_prepend_objs: this.settings.group_prepend_objs,
            /*            group_append: this.settings.group_append,*/
            group_append_class: this.settings.group_append_class,
            group_append_id: this.settings.group_append_id,
            group_append_html: this.settings.group_append_html,
            group_append_objs: this.settings.group_append_objs,
            form_text: this.settings.form_text,
            form_text_class: this.settings.form_text_class,
        });
        this.$html = form_input.$html;
        this.$element = element.$html;
    }
    //<input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
    //<datalist id="datalistOptions">
    //  <option value="San Francisco">
    //  <option value="New York">
    //  <option value="Seattle">
    //  <option value="Los Angeles">
    //  <option value="Chicago">
    //</datalist>
    form_element.prototype.bs_form_input_datalist = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            label: null,
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: null,
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            /*            element_list: [],*/
            validation: false,
            feedback_invalid: null,
            feedback_valid: null,
            feedback_class: null,
            col_prefix: null,
            col_size: null,
            col_class: null,
            obj_form: null,

            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: null,
            group_prepend_objs: null,

            group_append_class: null,
            group_append_id: null,
            group_append_html: null,
            group_append_objs: null,
            form_text: null,
            form_text_class: null,
        }, options);
        var element = new this.fe.bs_input({
            id: this.settings.id,
            name: this.settings.name,
            type: 'text',
            class: this.settings.element_class,
            fsize: this.settings.element_fsize,
            value: this.settings.element_value,
            title: this.settings.element_title,
            placeholder: this.settings.element_placeholder,
            required: this.settings.element_required,
            maxlength: this.settings.element_maxlength,
            pattern: this.settings.element_pattern,
            readonly: this.settings.element_readonly,
        });
        add_tag(element.$html, 'list', this.settings.id + '_datalistOptions');
        var datalist = new this.fe.datalist({
            id: this.settings.id + '_datalistOptions',
            //name: null,
            class: null,
            //options: this.settings.element_options,
        });
        var div = $('<div></div>');
        div.append(element.$html).append(datalist.$html);
        var form_input = new this.fe.bs_form_input_group({
            id: this.settings.id,
            name: this.settings.name,
            label: this.settings.label,
            element_html: div[0].innerHTML,
            validation: this.settings.validation,
            feedback_invalid: this.settings.feedback_invalid,
            feedback_valid: this.settings.feedback_valid,
            feedback_class: this.settings.feedback_class,
            col_prefix: this.settings.col_prefix,
            col_size: this.settings.col_size,
            col_class: this.settings.col_class,
            group_fsize: this.settings.element_fsize,
            obj_form: this.settings.obj_form,
            group_prepend_class: this.settings.group_prepend_class,
            group_prepend_id: this.settings.group_prepend_id,
            group_prepend_html: this.settings.group_prepend_html,
            group_prepend_objs: this.settings.group_prepend_objs,
            group_append_class: this.settings.group_append_class,
            group_append_id: this.settings.group_append_id,
            group_append_html: this.settings.group_append_html,
            group_append_objs: this.settings.group_append_objs,
            form_text: this.settings.form_text,
            form_text_class: this.settings.form_text_class,
        });
        this.$html = form_input.$html;
        this.$element = element.$html;
        //this.$datalist = datalist.$html;
    }
    //< div class="col-12" >
    //    <div class="form-check">
    //        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
    //            <label class="form-check-label" for="invalidCheck">
    //                Agree to terms and conditions
    //            </label>
    //            <div class="invalid-feedback">
    //                You must agree before submitting.
    //            </div>
    //    </div>
    //</div >
    form_element.prototype.bs_form_check = function (options) {
        this.fe = new form_element();
        this.settings = $.extend({
            id: null,
            name: null,
            label: null,
            element_type: 'checkbox',
            element_switch: false,
            element_inline: false,
            element_class: null,
            element_value: null,
            element_title: null,
            element_checked: null,
            element_required: null,
            element_readonly: false,
            validation: false,
            feedback_invalid: null,
            feedback_valid: null,
            feedback_class: null,
            col: null,
            col_prefix: null,
            col_size: null,
            col_class: null,
            form_text: null,
            form_text_class: null,
        }, options);
        var element = new this.fe.bs_check_input({
            id: this.settings.id,
            name: this.settings.name,
            type: this.settings.element_type,
            class: this.settings.element_class,
            value: this.settings.element_value,
            title: this.settings.element_title,
            checked: this.settings.element_checked,
            required: this.settings.element_required,
            readonly: this.settings.element_readonly,
        });
        //var col = this.settings.col;
        //if (!this.settings.col) {
        var col = new this.fe.bs_col({
            pref: this.settings.col_prefix,
            size: this.settings.col_size,
            class: this.settings.col_class,
        });
        //}
        var div_form_check = new this.fe.bs_div_form_check({
            //class: this.settings.validation ? 'has-validation' : null,
        });
        if (this.settings.element_switch) {
            add_class(div_form_check.$html, 'form-switch');
            add_tag(element.$html, 'role', 'switch');
        }
        if (this.settings.element_inline) {
            add_class(div_form_check.$html, 'form-check-inline');
        }
        var label = new this.fe.label({
            class: 'form-check-label',
            for: this.settings.id,
            label: this.settings.label
        });
        div_form_check.$html.prepend(element.$html);
        div_form_check.$html.prepend(label.$html);
        if (this.settings.validation) {
            var feedback = new this.fe.div({
                class: 'invalid-feedback' + (this.settings.feedback_class !== null ? this.settings.feedback_class : ''),
            });
            add_class(feedback.$html, this.settings.feedback_class);
            feedback.$html.append(this.settings.feedback_invalid);
            div_form_check.$html.append(feedback.$html);
        }
        col.$html.append(div_form_check.$html);
        if (this.settings.form_text !== null) {
            var ftext = new this.fe.div({
                id: this.settings.id + '-help',
                class: 'form-text',
            });
            add_class(ftext.$html, this.settings.form_text_class);
            ftext.$html.append(this.settings.form_text);
            col.$html.append(ftext.$html);
        }
        if (this.settings.col) {
            this.$html = col.$html;
        } else {
            this.$html = col.$html[0].innerHTML;
        }
        this.$element = element.$html;
    }
    //< div class="form-check form-check-inline" >
    //  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
    //  <label class="form-check-label" for="inlineRadio1">1</label>
    //</div>
    //<div class="form-check form-check-inline">
    //  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
    //  <label class="form-check-label" for="inlineRadio2">2</label>
    //</div>
    //<div class="form-check form-check-inline">
    //  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
    //  <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
    //</div >
    //form_element.prototype.bs_form_list_check = function (options) {
    //    this.fe = new form_element();
    //    this.settings = $.extend({
    //        id: null,
    //        name: null,
    //        label: null,
    //        element_type: 'checkbox',
    //        element_switch: false,
    //        element_inline: false,
    //        element_class: null,
    //        element_value: null,
    //        element_title: null,
    //        element_checked: null,
    //        element_required: null,
    //        element_readonly: false,
    //        validation: false,
    //        feedback_invalid: null,
    //        feedback_valid: null,
    //        feedback_class: null,
    //        col: true,
    //        col_prefix: null,
    //        col_size: null,
    //        col_class: null,
    //        form_text: null,
    //        form_text_class: null,
    //    }, options);
    //    var element = new this.fe.bs_check_input({
    //        id: this.settings.id,
    //        name: this.settings.name,
    //        type: this.settings.element_type,
    //        class: this.settings.element_class,
    //        value: this.settings.element_value,
    //        title: this.settings.element_title,
    //        checked: this.settings.element_checked,
    //        required: this.settings.element_required,
    //        readonly: this.settings.element_readonly,
    //    });
    //    var col = new this.fe.bs_col({
    //        pref: this.settings.col_prefix,
    //        size: this.settings.col_size,
    //        class: this.settings.col_class,
    //    });
    //    var div_form_check = new this.fe.bs_div_form_check({
    //        //class: this.settings.validation ? 'has-validation' : null,
    //    });
    //    if (this.settings.element_switch) {
    //        add_class(div_form_check.$html, 'form-switch');
    //        add_tag(element.$html, 'role', 'switch');
    //    }
    //    if (this.settings.element_inline) {
    //        add_class(div_form_check.$html, 'form-check-inline');
    //    }
    //    var label = new this.fe.label({
    //        class: 'form-check-label',
    //        for: this.settings.id,
    //        label: this.settings.label
    //    });
    //    div_form_check.$html.prepend(element.$html);
    //    div_form_check.$html.prepend(label.$html);
    //    if (this.settings.validation) {
    //        var feedback = new this.fe.div({
    //            class: 'invalid-feedback' + (this.settings.feedback_class !== null ? this.settings.feedback_class : ''),
    //        });
    //        add_class(feedback.$html, this.settings.feedback_class);
    //        feedback.$html.append(this.settings.feedback_invalid);
    //        div_form_check.$html.append(feedback.$html);
    //    }
    //    col.$html.append(div_form_check.$html);
    //    if (this.settings.form_text !== null) {
    //        var ftext = new this.fe.div({
    //            id: this.settings.id + '-help',
    //            class: 'form-text',
    //        });
    //        add_class(ftext.$html, this.settings.form_text_class);
    //        ftext.$html.append(this.settings.form_text);
    //        col.$html.append(ftext.$html);
    //    }
    //    if (this.settings.col) {
    //        this.$html = col.$html;
    //    } else {
    //        this.$html = col.$html[0].innerHTML;
    //    }
    //    this.$element = element.$html;
    //}

    // bootstrap-components ----------------------------------


    //<div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
    //    <div class="progress-bar bg-success" style="width: 25%">25%</div>
    //</div>
    form_element.prototype.bs_progressbar = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            value: 0,
            min: 0,
            max: 100,
            class: null,
        }, options);
        this.fe = new form_element();
        var div_progress = new this.fe.div({ class: 'progress' });
        add_class(div_progress.$html, this.settings.class);
        div_progress.$html.attr('role', 'progressbar');
        div_progress.$html.attr('aria-valuenow', this.settings.value);
        div_progress.$html.attr('aria-valuemin', this.settings.min);
        div_progress.$html.attr('aria-valuemax', this.settings.max);
        this.settings.max = this.settings.max === null ? 100.0 : this.settings.max;
        this.settings.max = this.settings.value > this.settings.max ? this.settings.value : (this.settings.max === 0 && this.settings.value === 0 ? 100.0 : this.settings.max);
        var current = Number((this.settings.value * 100.0) / this.settings.max);

        //var current = Number(this.settings.max === 0 && this.settings.value === 0 ? 0.0 : (this.settings.value > this.settings.max ? 100.0 : (this.settings.value * 100.0) / this.settings.max));
        //var current = Number(this.settings.value > this.settings.max ? 100.0 : this.settings.max === 0 && this.settings.value===0 ? 0.0 : (this.settings.value * 100.0) / this.settings.max);
        var pb_color = '';
        var txt_color = '';
        if (current <= 25) {
            pb_color = ' bg-success';

        } else {
            if (current <= 50) {
                pb_color = ' bg-info';
                txt_color = ' text-dark';
            } else {
                if (current <= 75) {
                    pb_color = ' bg-warning';
                    txt_color = ' text-dark';
                } else {
                    pb_color = ' bg-danger';
                }
            }
        };
        var div_progress_bar = new this.fe.div({
            class: 'progress-bar' + pb_color + txt_color,
            style: 'width: ' + current + '%',
        });
        append_text(div_progress_bar.$html, current.toFixed(0) + '%');
        this.$html = div_progress.$html.append(div_progress_bar.$html);
    };
    //<span class="badge bg-secondary">New</span>
    form_element.prototype.bs_badge = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            text: null,
            class: null,
            color: null,
            style: null,
        }, options);
        this.fe = new form_element();
        var span = new this.fe.span({
            id: this.settings.id,
            name: this.settings.name,
            text: this.settings.text,
            class: 'badge',
            color: this.settings.color,
            style: this.settings.style,
        });
        add_class(this.$html, this.settings.class);
        this.$html = span.$html;
    };
    //form_element.prototype.bs_dropdown = function (options) {
    //    this.settings = $.extend({
    //        color: 'secondary',
    //        size: null,
    //        class: null,
    //        id: 'dropdownMenuButton',
    //        label: null,
    //        title: null,
    //        list_menu: null,
    //    }, options);
    //    this.fe = new form_element();
    //    var div_dropdown = new this.fe.div({ class: 'dropdown' });
    //    this.$element = div_dropdown.$div;
    //    add_class(this.$element, this.settings.class);
    //    var button = new this.fe.bs_button({
    //        color: this.settings.color,
    //        size: this.settings.size,
    //        class: 'dropdown-toggle',
    //        id: this.settings.id,
    //        label: this.settings.label,
    //        title: this.settings.title,
    //    });
    //    add_tag(button.$button, 'data-toggle', 'dropdown');
    //    add_tag(button.$button, 'aria-expanded', 'false');
    //    var div_dropdown_menu = new this.fe.div({ class: 'dropdown-menu' });
    //    this.$dropdown_menu = div_dropdown_menu.$div
    //    add_tag(this.$dropdown_menu, 'aria-labelledby', this.settings.id);
    //    this.$element.append(button.$button).append(this.$dropdown_menu);
    //    if (this.settings.list_menu && this.settings.list_menu.length > 0) {
    //        $.each(this.settings.list_menu, function (index, element) {
    //            var a_link = new this.fe.a({
    //                id: element.id,
    //                class: 'dropdown-item',
    //                href: element.href,
    //                text: element.label,
    //                target: null,
    //                title: null,
    //            });
    //            add_class(a_link.$alink, element.disable ? 'disabled' : '');

    //            if (typeof element.click === 'function') {
    //                a_link.$alink.on("click", element.click);
    //            }
    //            this.$dropdown_menu.append(a_link.$alink);
    //        }.bind(this));
    //    }
    //};
    //<div class="card border-success mb-3" style="max-width: 18rem;">
    //    <div class="card-header bg-transparent border-success">Header</div>
    //    <div class="card-body text-success">
    //        <h5 class="card-title">Success card title</h5>
    //        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //    </div>
    //    <div class="card-footer bg-transparent border-success">Footer</div>
    //</div>
    form_element.prototype.bs_card = function (options) {
        this.settings = $.extend({
            border_color: 'border-secondary',
            id: null,
            class: null,
            header_class: null,
            header_color: null,
            header_bg: null,
            header_text: null,
            body_class: null,
            body_color: null,
            body_bg: null,
            body_text: null,
            footer: false,
            footer_class: null,
            footer_text: null,
            footer_color: null,
            footer_bg: null,
            max_width: null,

        }, options);
        this.fe = new form_element();
        var card = new this.fe.div({ class: 'card', id: this.settings.id });
        add_class(card.$html, this.settings.border_color);
        add_class(card.$html, this.settings.class);
        if (this.settings.max_width !== null) card.$html.attr('style', 'max-width: ' + this.settings.max_width + 'rem;');
        this.header = new this.fe.div({ class: 'card-header' });
        add_class(this.header.$html, this.settings.header_color);
        add_class(this.header.$html, this.settings.header_bg);
        add_class(this.header.$html, this.settings.header_class);
        append_label(this.header.$html, this.settings.header_text);
        card.$html.append(this.header.$html);
        this.body = new this.fe.div({ class: 'card-body' });
        add_class(this.body.$html, this.settings.body_color);
        add_class(this.body.$html, this.settings.body_bg);
        add_class(this.body.$html, this.settings.body_class);
        append_label(this.body.$html, this.settings.body_text);
        card.$html.append(this.body.$html);
        if (footer) {
            var footer = new this.fe.div({ class: 'card-footer' });
            add_class(footer.$html, this.settings.footer_color);
            add_class(footer.$html, this.settings.footer_bg);
            add_class(this.body.$html, this.settings.footer_class);
            append_label(footer.$html, this.settings.footer_text);
            card.$html.append(this.footer.$html);
        }
        this.$html = card.$html;
    };

    //<div class="offcanvas offcanvas-start offcanvas-operation-detal" data-bs-backdrop="static" tabindex="-1" id="operation-detali" aria-labelledby="">
    //    <div class="offcanvas-header">
    //        <h5 class="offcanvas-title" id="offcanvas-title-operation-detali">Offcanvas</h5>
    //        <button type="button" class="btn-close" id="btn-close-operation-detali" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
    //    </div>
    //    <div class="offcanvas-body">
    //        <div id="offcanvas-body-operation-detali">

    //        </div>
    //    </div>
    //</div>
    form_element.prototype.bs_offcanvas = function (options) {
        this.settings = $.extend({
            id: null,
            class: null,
            backdrop: 'static',
            position: 'offcanvas-start',
            fn_close: null,
        }, options);
        this.fe = new form_element();
        var offcanvas = new this.fe.div({ class: 'offcanvas' });
        add_class(offcanvas.$html, this.settings.position);
        add_class(offcanvas.$html, this.settings.class);
        add_tag(offcanvas.$html, 'data-bs-backdrop', this.settings.backdrop);
        add_tag(offcanvas.$html, 'tabindex', '-1');
        add_id(offcanvas.$html, this.settings.id);
        add_tag(offcanvas.$html, 'aria-labelledby', null);
        var header = new this.fe.div({ class: 'offcanvas-header' });
        this.header_title = new this.fe.hx({
            size: 5,
            id: null,
            class: 'offcanvas-title',
            text: null
        });
        var button = new this.fe.bs_button({
            class: 'btn-close',
            fn_click: this.settings.fn_close,
        });
        add_tag(button.$html, 'data-bs-dismiss', 'offcanvas');
        add_tag(button.$html, 'aria-label', 'Закрыть');
        header.$html.append(this.header_title.$html).append(button.$html);
        this.body = new this.fe.div({ class: 'offcanvas-body' });
        offcanvas.$html.append(header.$html).append(this.body.$html);
        this.$html = offcanvas.$html;
    };

    //form_element.prototype.bs_droplistgroup = function (options) {
    //    this.settings = $.extend({
    //        color: 'secondary',
    //        size: null,
    //        class: null,
    //        id: 'dropdownMenuButton',
    //        label: null,
    //        title: null,
    //        list_menu: null,
    //    }, options);
    //    this.fe = new form_element();
    //    var div_dropdown = new this.fe.div({ class: 'dropdown' });
    //    this.$element = div_dropdown.$div;
    //    add_class(this.$element, this.settings.class);
    //    var button = new this.fe.bs_button({
    //        color: this.settings.color,
    //        size: this.settings.size,
    //        class: 'dropdown-toggle',
    //        id: this.settings.id,
    //        label: this.settings.label,
    //        title: this.settings.title,
    //    });
    //    add_tag(button.$button, 'data-toggle', 'dropdown');
    //    add_tag(button.$button, 'aria-expanded', 'false');
    //    var div_dropdown_menu = new this.fe.div({ class: 'dropdown-menu' });
    //    this.$dropdown_menu = div_dropdown_menu.$div
    //    add_tag(this.$dropdown_menu, 'aria-labelledby', this.settings.id);
    //    this.$element.append(button.$button).append(this.$dropdown_menu);
    //    if (this.settings.list_menu && this.settings.list_menu.length > 0) {
    //        $.each(this.settings.list_menu, function (index, element) {
    //            var a_link = new this.fe.a({
    //                id: element.id,
    //                class: 'dropdown-item',
    //                href: element.href,
    //                text: element.label,
    //                target: null,
    //                title: null,
    //            });
    //            add_class(a_link.$alink, element.disable ? 'disabled' : '');

    //            if (typeof element.click === 'function') {
    //                a_link.$alink.on("click", element.click);
    //            }
    //            this.$dropdown_menu.append(a_link.$alink);
    //        }.bind(this));
    //    }
    //};

    //---------------- ИНИЦИАЛИЗАЦИЯ ЭЛЕМЕНТОВ ----------------------
    // Инициализация текстового поля "INPUT"
    form_element.prototype.init_input = function (element, options) {
        this.settings = $.extend({
            default_value: null,
            fn_change: null,
        }, options);
        this.type = element.attr('type');
        this.$element = element;
        this.init = function () {
            this.update(this.settings.default_value);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", this.settings.fn_change.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
                //this.$element.change();
            } else {
                if (this.type === 'number') {
                    return this.$element.val() !== '' ? Number(this.$element.val()) : null;
                }
                if (this.type === 'text') {
                    return this.$element.val() !== '' ? $.trim(String(this.$element.val())) : null;
                }
                return this.$element.val();
            };
        };
        this.update = function (default_value) {
            this.$element.val(default_value);
        };
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function (clear) {
            if (clear) this.$element.val('');
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация поля дата "INPUT" типа SELECT
    form_element.prototype.init_select = function (element, options) {
        //TODO: создать и настроить SELECT сделать надпись выберите через placeholder, чтобы работала required
        this.$element = element;
        var $default_option = $('<option></option>', {
            'value': '-1',
            'text': langView('title_select', App.Langs),
        });
        this.settings = $.extend({
            data: [],
            default: null,
            fn_change: null,
            fn_check: null,
        }, options);
        this.init = function () {
            this.update(this.settings.data, this.settings.default);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", function (event) {
                    if (typeof this.settings.fn_change) {
                        this.settings.fn_change(event);
                    }
                    if (typeof this.settings.fn_check === 'function') {
                        this.settings.fn_check(element.val());
                    };
                }.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                var disabled = this.$element.prop("disabled");
                if (disabled) {
                    this.$element.prop("disabled", false);
                }
                this.$element.val(value);
                if (disabled) {
                    this.$element.prop("disabled", true);
                }
            } else {
                return this.$element.val();
            };
        };
        this.getNumber = function () {
            return this.$element.val() === null ? null : Number(this.$element.val());
        };
        this.getNumberNull = function () {
            return this.$element.val() === null || Number(this.$element.val()) === -1 ? null : Number(this.$element.val());
        };
        this.text = function (text) {
            if (text !== undefined) {
                var disabled = this.$element.prop("disabled");
                if (disabled) {
                    this.$element.prop("disabled", false);
                }
                this.$element.val(text === null ? '' : text);
                if (disabled) {
                    this.$element.prop("disabled", true);
                }
            } else {
                //return this.$element.text();
                return this.$element.find(":selected").text();
            };
        };
        this.update = function (data, default_value) {
            this.$element.empty();
            element.append($default_option);
            //if (default_value === -1) {
            //    element.append($default_option);
            //}
            if (data) {
                $.each(data, function (i, el) {
                    // Преобразовать формат
                    if (el) {
                        var $option = $('<option></option>', {
                            'value': el.value,
                            'text': el.text,
                            'disabled': el.disabled,
                        });
                        this.$element.append($option);
                    }
                }.bind(this));
            };
            this.$element.val(default_value);
        };
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function (clear) {
            if (clear) this.$element.val(-1);
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация поля дата "INPUT" типа SELECT multiple
    form_element.prototype.init_select_multiple = function (element, options, content) {
        //TODO: создать и настроить SELECT сделать надпись выберите через placeholder, чтобы работала required
        this.$element = element;
        this.buf = null;
        this.settings = $.extend({
            data: [],
            default_value: null,
            fn_change: null,
            fn_check: null,
        }, options);
        this.init = function () {
            this.$el = element;
            this.$element = this.$el.multiselect({
                templates: {
                    button: '<button type="button" class="multiselect dropdown-toggle form-control" style="text-align:left" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
                    popupContainer: '<div class="multiselect-container dropdown-menu"></div>',
                    filter: '<div class="multiselect-filter d-flex align-items-center"><i class="fas fa-sm fa-search text-muted"></i><input type="search" class="multiselect-search form-control" /></div>',
                    buttonGroup: '<div class="multiselect-buttons btn-group" style="display:flex;"></div>',
                    buttonGroupReset: '<button type="button" class="multiselect-reset btn btn-secondary btn-block"></button>',
                    option: '<button type="button" class="multiselect-option dropdown-item"></button>',
                    divider: '<div class="dropdown-divider"></div>',
                    optionGroup: '<button type="button" class="multiselect-group dropdown-item"></button>',
                    resetButton: '<div class="multiselect-reset text-center p-2"><button type="button" class="btn btn-sm btn-block btn-outline-secondary"></button></div>'
                },
                buttonContainer: '<div class="btn-group d-grid text-left" id="' + element[0].id + '-button-container" />',
                buttonTextAlignment: 'left',
                enableFiltering: false,
                includeSelectAllOption: true,
                nonSelectedText: langView('title_select', App.Langs),
                selectAllText: langView('title_select_all', App.Langs),
                //                buttonText: function (options, select) {
                //                    if (this.disabledText.length > 0
                //                        && (this.disableIfEmpty || select.prop('disabled'))
                //                        && options.length == 0) {

                //                        return this.disabledText;
                //                    }
                //                    else if (options.length === 0) {
                //                        return this.nonSelectedText;
                //                    }
                //                    var $select = $(select);
                ///*                    var $optgroups = $('optgroup', $select);*/

                //                    var delimiter = this.delimiterText;
                //                    var text = '';

                //                    // Go through groups.
                //                    //$optgroups.each(function () {
                //                    //    var $selectedOptions = $('option:selected', this);
                //                    //    var $options = $('option', this);

                //                    //    if ($selectedOptions.length == $options.length) {
                //                    //        text += $(this).attr('label') + delimiter;
                //                    //    }
                //                    //    else {
                //                    //        $selectedOptions.each(function () {
                //                    //            text += $(this).text() + delimiter;
                //                    //        });
                //                    //    }
                //                    //});

                //                    var $remainingOptions = $('option:selected', $select).not('optgroup option');
                //                    $remainingOptions.each(function () {
                //                        text += $(this).text() + delimiter;
                //                    });

                //                    return text.substr(0, text.length - 2);

                //                },
                onChange: function (element, checked) {
                    if (typeof this.settings.fn_check === 'function') {
                        this.settings.fn_check(null, element.val());
                    };
                }.bind(this),
                onDropdownHide: function (event) {
                    if (typeof this.settings.fn_change === 'function') {
                        if (JSON.stringify(this.buf) !== JSON.stringify(element.val())) {
                            this.settings.fn_change(event, element.val());
                        }
                    }
                }.bind(this),
                onDropdownShown: function (event) {
                    this.buf = element.val();
                }.bind(this)
            });
            this.update(this.settings.data, this.settings.default_value);
        };
        this.val = function (value) {
            if (value !== undefined) {
                if (value === -1 || (value !== null && value.length == 0)) {
                    this.$el.multiselect('deselectAll', false);
                } else {
                    this.$el.multiselect('select', value);
                }
            } else {
                var res = this.$el.val();
                return res;
            };
        };
        this.getNumber = function () {
            return this.$element.val() === null ? null : Number(this.$element.val());
        };
        this.getNumberNull = function () {
            return this.$element.val() === null || Number(this.$element.val()) === -1 ? null : Number(this.$element.val());
        };
        this.text = function (text) {
            if (text !== undefined) {
                var disabled = this.$element.prop("disabled");

                if (disabled) {
                    this.$el.multiselect('disable');
                    //this.$element.prop("disabled", false);
                }
                this.$element.val(text === null ? '' : text);
                if (disabled) {
                    this.$el.multiselect('enable');
                    //this.$element.prop("disabled", true);
                }
            } else {
                return this.$element.text();
            };
        };
        this.update = function (data, default_value) {
            this.$element.empty();
            var options = [];
            if (data) {
                $.each(data, function (i, el) {
                    // Преобразовать формат
                    if (el) { options.push({ label: el.text, title: el.text, value: el.value, selected: el.disabled }); }
                }.bind(this));
                this.$el.multiselect('dataprovider', options);
            };
            this.val(default_value);
        };
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$el.multiselect('enable');
        };
        this.disable = function (clear) {
            if (clear) this.$el.multiselect('deselectAll', false);
            this.$el.multiselect('disable');
        };
        this.destroy = function () {
            this.$el.multiselect('destroy');
        };
        //this.buttonContainer = function (class) {

        //};
        this.init();
    };
    // Инициализация поля дата "INPUT" типа DATALIST
    form_element.prototype.init_datalist = function (element, options, content) {
        var get_alist = function (data) {
            var alist = [];
            $.each(data, function (i, el) {
                //if (this.settings.out_value) {
                //    alist.push({ value: (el.text !== null ? $.trim(el.text) : el.text), label: el.value + '-' + (el.text !== null ? $.trim(el.text) : el.text), disabled: el.disabled ? el.disabled : null });
                //} else {
                //    alist.push({ value: el.text !== null ? $.trim(el.text) : el.text, label: el.text !== null ? $.trim(el.text) : el.text, disabled: el.disabled ? el.disabled : null });
                //}
                alist.push({ value: el.value, label: el.text, group: el.group, disabled: el.disabled ? el.disabled : null });
            }.bind(this));
            return alist;
        }.bind(this);
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            data: [],
            out_value: false,
            out_group: false,
            default: null,
            minLength: 1,
            searchContain: true,
            fn_change: null,
            fn_select: null,
            val_inp: 'value',
            check: null,
        }, options);

        //this.escapeHtml = function (unsafe) {
        //    return unsafe
        //        .replace(/&/g, "&amp;")
        //        .replace(/</g, "&lt;")
        //        .replace(/>/g, "&gt;")
        //        .replace(/"/g, "&quot;")
        //        .replace(/'/g, "&#039;");
        //};
        this.init = function () {
            this.id = element[0].id;
            this.alist = get_alist(this.settings.data);
            //var el = content.find('#' + element[0].id);
            var el = content.find('#' + this.id);
            this.$element = el.flexdatalist({
                minLength: this.settings.minLength,
                //selectionRequired: true,
                searchContain: this.settings.searchContain,
                valueProperty: 'value',
                textProperty: this.settings.out_value ? '{value}, {label}'.concat(this.settings.out_group ? [' [{group}]'] : ['']) : '{label}'.concat(this.settings.out_group ? [' [{group}]'] : ['']),
                visibleProperties: this.settings.out_value ? ["value", "label", "group"] : ["label", "group"],
                searchIn: this.settings.out_value ? ['label', 'value', 'group'] : ['label', 'group'],
                data: this.alist,
            });
            this.$element_fl = content.find('#' + element[0].id + '-flexdatalist');
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on('change:flexdatalist', function (event, set, options) {
                    //console.log(set.value);
                    //console.log(set.text);
                    this.settings.fn_change(event, set, options);//.bind(this);
                }.bind(this));
            }
            if (typeof this.settings.fn_select === 'function') {
                this.$element.on('select:flexdatalist', function (event, set, options) {
                    //console.log(set.value);
                    //console.log(set.text);
                    this.settings.fn_select(event, set, options);//.bind(this);
                }.bind(this));
            }
        };
        this.update = function (data, value) {
            this.settings.data = data;
            this.alist = get_alist(this.settings.data);
            this.$element.flexdatalist("data", this.alist);
            var ex_val = this.$element.flexdatalist("value");
            if (value != ex_val) {
                //this.$element.flexdatalist("value", value);
                this.val(value);
            }
        };
        // вернуть value
        this.val = function (value) {
            if (value !== undefined) {
                var text_out = null;
                if (value !== -1 && value !== "-1" && value !== null) {
                    var select = this.alist.find(function (o) {
                        return o.value == $.trim(value);
                    }.bind(this));
                    //text_out = select ? select.label : "";
                    text_out = select ? select.value : null;
                };
                var disabled = this.$element.flexdatalist("disabled");
                if (disabled) {
                    this.$element.flexdatalist("disabled", !disabled);
                    //this.$element.prop("disabled", !disabled);
                }
                this.$element.flexdatalist("value", { value: text_out });
                this.$element.flexdatalist("disabled", disabled);
                //if (disabled) {
                //    this.$element.prop("disabled", disabled);
                //}
            } else {
                // чтение
                var value = this.$element.flexdatalist("value");
                if (value !== "" && value !== null) {
                    var select = this.alist.find(function (o) {
                        return o.value == $.trim(value);
                    }.bind(this));
                    return select ? select.value : undefined;
                } else {
                    return null;
                }
            };
        };
        // вернуть техт
        this.text = function (text) {
            if (text !== undefined) {
                var select = this.alist.find(function (o) {
                    return o.label == $.trim(text);
                }.bind(this));
                this.$element.flexdatalist("value", { value: select ? select.value : null });
            } else {
                // чтение
                var value = this.$element.flexdatalist("value");
                if (value !== "" && value !== null) {
                    var select = this.alist.find(function (o) {
                        return o.value == $.trim(value);
                    }.bind(this));
                    return select ? select.label : undefined;
                } else {
                    return null;
                }
                //var text = this.$element_flexdatalist.val();
                //return text !== "" && text !== null ? text : null;
            };
        };

        this.destroy = function (data) {
            this.$element.flexdatalist("destroy");
        };
        this.reset = function (data) {
            this.$element.flexdatalist("reset");
        };
        this.show = function () {
            /*            this.$element.autocomplete("enable");*/
            this.$element.show();
        };
        this.hide = function () {
            /*            this.$element.autocomplete("disable");*/
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.flexdatalist("disabled", false);
        };
        this.disable = function (clear) {
            this.$element.flexdatalist("disabled", true);
            //if (clear) this.$element.val('');
            //this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация поля дата "TEXTAREA"
    form_element.prototype.init_textarea = function (element, options) {
        this.settings = $.extend({
            default_value: null,
            fn_change: null,
        }, options);
        this.$element = element;
        this.init = function () {
            this.update(this.settings.default_value);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", this.settings.fn_change.bind(this));
            }
        };
        this.val = function (value) {
            if (value !== undefined) {
                this.$element.val(value);
            } else {
                return this.$element.val();
            };
        };
        this.update = function (default_value) {
            this.$element.val(default_value);
        };
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function (clear) {
            if (clear) this.val(null);
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация поля дата и время "INPUT" (стандартные компоненты Edge)
    form_element.prototype.init_input_datetime = function (element, options, content) {
        this.settings = $.extend({
            default: null,
            format: 'datetime',
            out_format: 'iso', // формат получения результата ('iso','moment', date)
            fn_change: null,
        }, options);
        this.$element = element;
        this.init = function () {
            this.val(this.settings.default);
            this.$element.on('change', function (e) {
                var date = $(e.currentTarget).val();
                var dt = moment(date);
                if (typeof this.settings.fn_change === 'function') {
                    this.settings.fn_change(e, dt);
                }
            }.bind(this));
        };
        this.val = function (value) {
            if (value !== undefined && moment(value).isValid) {
                switch (this.settings.format) {
                    case 'datetime': { var dt = moment(value).format('YYYY-MM-DDTHH:mm'); break; }
                    case 'date': { var dt = moment(value).format('YYYY-MM-DD'); break; }
                    case 'time': { var dt = moment(value).format('HH:mm'); break; }
                }
                this.$element.val(dt);
            } else {
                var date = this.$element.val();
                if (date === null || date === "") return null;
                if (this.settings.out_format === 'iso' || this.settings.format === 'time') return date;
                var dt = moment(date);
                if (this.settings.out_format == 'moment') {
                    return dt;
                } else {
                    return dt.isValid ? dt._d : undefined;
                }
            };
        };
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function (clear) {
            if (clear) this.val(null);
            this.$element.prop("disabled", true);
        };
        this.init();
    };
    // Инициализация текстового поля "INPUT"
    form_element.prototype.init_checkbox = function (element, options, content) {
        this.settings = $.extend({
            default_value: null,
            fn_change: null,
            fn_click: null,
        }, options);
        this.type = element.attr('type');
        //this.$element = element;
        this.id = element[0].id;
        //var el = content.find('#' + this.id);
        this.$element = content.find('#' + this.id);
        this.init = function () {
            this.update(this.settings.default_value);
            this.$element.on('change', function (event) {
                this.settings.fn_change(event);//.bind(this);
            }.bind(this));
        };


        this.val = function (value) {
            if (value !== undefined) {
                this.$element.prop('checked', Boolean(value));
            } else {
                return this.$element.prop('checked');
            };
        };
        this.update = function (default_value) {
            this.$element.val(default_value);
        };
        this.show = function () {
            this.$element.show();
        };
        this.hide = function () {
            this.$element.hide();
        };
        this.enable = function () {
            this.$element.prop("disabled", false);
        };
        this.disable = function (clear) {
            if (clear) this.$element.val(false);
            this.$element.prop("disabled", true);
        };
        this.init();
    };

    //form_element.prototype.init_alert = function (element, options) {
    //    this.settings = $.extend({
    //        id: null,
    //        class: null,
    //        style: null,
    //        color: null,
    //        bt_close: false,
    //        fn_click_close: null,
    //    }, options);
    //    this.$element = new ALERT(element) ;
    //    this.init = function () {

    //    };
    //    this.val = function (value) {

    //    };
    //    this.update = function (default_value) {

    //    };
    //    this.show = function () {

    //    };
    //    this.hide = function () {

    //    };
    //    this.enable = function () {

    //    };
    //    this.disable = function (clear) {

    //    };
    //    this.init();
    //};
    //----------------------------------------------------------------------------
    // Автоматически формируем документы на форме
    form_element.prototype.add_obj = function (content, objs, obj_form, callback) {
        this.fe = new form_element();
        // Добавить элемент
        var add_element = function (element, content, obj, callback) {
            if (element && element.length > 0) {
                if (obj.childs && obj.childs.length > 0) {
                    this.add_obj(element, obj.childs, obj_form, function (content) {
                        if (typeof callback === 'function') {
                            callback(content);
                        };
                    }.bind(this));
                }
                content.append(element);
                if (typeof callback === 'function') {
                    callback(content);
                };
            } else {
                if (typeof callback === 'function') {
                    callback(content);
                };
            }
        }.bind(this);
        // Пройдемся по элементам
        $.each(objs, function (i, obj) {
            if (obj && obj.obj) {
                if (obj.obj === 'bs_row') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_row(obj.options);
                    add_element(obj_html.$html, content, obj);
                };
                if (obj.obj === 'bs_col') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_col(obj.options);
                    add_element(obj_html.$html, content, obj);
                    //obj_form.views.push({
                    //    name: obj.options.id,
                    //    validation_group: null,
                    //    type: 'col',
                    //    $element: obj_html.$html,
                    //    destroy: false
                    //});
                };
                if (obj.obj === 'bs_alert') {
                    var obj_html = new this.bs_alert(obj.options);
                    add_element(obj_html.$html, content, obj);
                    //obj_form.views.push({
                    //    name: obj.options.id,
                    //    validation_group: null,
                    //    type: 'alert',
                    //    //element: new this.fe.init_alert(obj_html.$html, obj.options),
                    //    $element: obj_html.$html,
                    //    destroy: false
                    //});
                };
                if (obj.obj === 'bs_button') {
                    var obj_html = new this.bs_button(obj.options);
                    if (obj_html && obj_html.$html) {
                        add_element(obj_html.$html, content, obj);
                        obj_form.buttons.push({
                            name: obj.options.id, // может быть null
                            validation_group: obj.options.validation_group,
                            type: 'button',
                            $element: obj_html.$html,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                };
                if (obj.obj === 'bs_form_input') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_form_input(obj.options);
                    if (obj_html && obj_html.$element) {
                        add_element(obj_html.$html, content, obj);
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'input_text',
                            element: new this.fe.init_input(obj_html.$element, obj.options.element_options),
                            $element: obj_html.$element,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                };
                if (obj.obj === 'bs_form_select') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_form_select(obj.options);
                    if (obj_html && obj_html.$element) {
                        add_element(obj_html.$html, content, obj);
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'select',
                            element: new this.fe.init_select(obj_html.$element, obj.options.element_options),
                            $element: obj_html.$element,
                            destroy: true
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }

                };
                if (obj.obj === 'bs_form_select_multiple') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_form_select(obj.options);
                    if (obj_html && obj_html.$element) {
                        add_element(obj_html.$html, content, obj);
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'select',
                            element: new this.fe.init_select_multiple(obj_html.$element, obj.options.element_options, content),
                            $element: obj_html.$element,
                            destroy: true
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }

                };
                if (obj.obj === 'bs_form_input_datalist') {
                    obj.options.obj_form = obj_form;
                    //var obj_html = new this.bs_form_input_datalist(obj.options);
                    var obj_html = new this.bs_form_input(obj.options);
                    if (obj_html && obj_html.$element) {
                        add_element(obj_html.$html, content, obj);
                        var element = new this.fe.init_datalist(obj_html.$element, obj.options.element_options, content);
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'datalist',
                            element: element,
                            $element: element.$element,
                            destroy: true
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                };
                if (obj.obj === 'bs_form_textarea') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_form_textarea(obj.options);
                    if (obj_html && obj_html.$element) {
                        add_element(obj_html.$html, content, obj);
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'textarea',
                            element: new this.fe.init_textarea(obj_html.$element, obj.options.element_options),
                            $element: obj_html.$element,
                            destroy: true
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                };
                if (obj.obj === 'bs_form_input_datetime') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_form_input(obj.options);
                    if (obj_html && obj_html.$element) {
                        add_element(obj_html.$html, content, obj);
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'input_datetime',
                            element: new this.fe.init_input_datetime(obj_html.$element, obj.options.element_options),
                            $element: obj_html.$element,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                };
                if (obj.obj === 'bs_form_check') {
                    obj.options.obj_form = obj_form;
                    var obj_html = new this.bs_form_check(obj.options);
                    if (obj_html && obj_html.$element) {
                        add_element(obj_html.$html, content, obj);
                        var element = new this.fe.init_checkbox(obj_html.$element, obj.options.element_options, content);
                        obj_form.views.push({
                            name: obj.options.id,
                            validation_group: obj.options.validation_group,
                            type: 'input_checkbox',
                            element: element,
                            $element: obj_html.$element,
                            destroy: false
                        });
                    } else {
                        throw new Error('Не удалось создать элемент ' + obj.obj);
                    }
                };
            }
        }.bind(this));
        if (typeof callback === 'function') {
            callback(content);
        };
    };

    App.form_element = form_element;

    //================================================================================
    // Класс модальной формы
    function modal_confirm_form() {
        this.fe = new form_element();
    }
    // Инициализация модальной формы
    modal_confirm_form.prototype.init = function (options) {
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            static: true,
            keyboard: false,
            hidden: true,
            centered: true,
            fsize: null,
            modal_class: null,
            header_class: null,
            header_text: null,
            body_class: null,
            body_text: null,
            bt_close_text: 'Close',
            bt_ok_text: 'Ok',
            fn_init: null,              // Обработаем событие форма инициализировалась
            fn_close: null,             // Обработаем событие форма закрывается
            fn_click_ok: null,          // Обработаем событие нажатия на кнопку
        }, options);
        this.result = false;
        //---------------------------------------------------------
        // Создадим модальную форму для редактирования и добавим ее в секции body
        //<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        //    <div class="modal-dialog">
        //        <div class="modal-content">
        //            <div class="modal-header">
        //                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        //                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        //            </div>
        //            <div class="modal-body">
        //                ...
        //            </div>
        //            <div class="modal-footer">
        //                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        //                <button type="button" class="btn btn-primary">Understood</button>
        //            </div>
        //        </div>
        //    </div>
        //</div>
        var modal = new this.fe.div({
            id: 'modal-form',
            class: 'modal fade',
        });
        add_tag(modal.$html, 'data-bs-backdrop', this.settings.static ? 'static' : null);
        add_tag(modal.$html, 'data-bs-keyboard', this.settings.keyboard);
        add_tag(modal.$html, 'tabindex', '-1');
        add_tag(modal.$html, 'aria-hidden', this.settings.hidden);
        var modal_dialog = new this.fe.div({
            class: 'modal-dialog',
        });
        add_class(modal_dialog.$html, this.settings.centered ? 'modal-dialog-centered' : null);
        add_class(modal_dialog.$html, this.settings.fsize !== null ? 'modal-' + this.settings.fsize : null);
        add_class(modal_dialog.$html, this.settings.modal_class !== null ? this.settings.modal_class : null);
        var modal_content = new this.fe.div({
            class: 'modal-content',
        });
        var modal_header = new this.fe.div({
            class: 'modal-header',
        });
        var h5 = new this.fe.hx({
            size: 5,
            id: null,
            class: 'modal-title',
            text: this.settings.header_text
        });
        add_class(h5.$html, this.settings.header_class);

        var bt_hclose = new this.fe.bs_button({
            class: 'btn-close',
            /*            fn_click: this.settings.fn_close,*/
        });
        add_tag(bt_hclose.$html, 'data-bs-dismiss', 'modal');
        add_tag(bt_hclose.$html, 'aria-label', 'Close');

        var modal_body = new this.fe.div({
            class: 'modal-body',
        });
        add_class(modal_body.$html, this.settings.body_class);
        append_text(modal_body.$html, this.settings.body_text);
        var modal_footer = new this.fe.div({
            class: 'modal-footer',
        });
        var bt_close = new this.fe.bs_button({
            /*            class: 'btn-close',*/
            color: 'secondary',
            text: this.settings.bt_close_text
        });
        add_tag(bt_close.$html, 'data-bs-dismiss', 'modal');
        var bt_ok = new this.fe.bs_button({
            /*            class: 'btn-close',*/
            color: 'primary',
            text: this.settings.bt_ok_text,
            fn_click: function (e) {
                if (typeof this.settings.fn_click_ok === 'function') {
                    this.settings.fn_click_ok.call(this, e);
                } else {
                    e.preventDefault();
                    this.result = true;
                    this.$modal_obj.modal('hide');
                }


            }.bind(this)
        });

        this.$header = h5.$html;
        modal_header.$html.append(h5.$html).append(bt_hclose.$html);
        this.$body = modal_body.$html;
        modal_footer.$html.append(bt_close.$html).append(bt_ok.$html);
        modal_content.$html.append(modal_header.$html).append(modal_body.$html).append(modal_footer.$html);
        modal_dialog.$html.append(modal_content.$html);
        modal.$html.append(modal_dialog.$html);
        $('body').append(modal.$html);
        //---------------------------------------------------------
        // Инициализация модальной формы
        this.$modal_obj = modal.$html.modal({
            keyboard: this.settings.keyboard,
            show: !this.settings.hidden
        })
            .on('show.bs.modal', function (event) {
                // 
            }.bind(this))
            .on('shown.bs.modal', function (event) {
                // Обновим таблицы
                $($.fn.dataTable.tables(false)).DataTable().columns.adjust();//.responsive.recalc();
            }.bind(this))
            .on('hide.bs.modal', function (event) {
                if (typeof this.settings.fn_close === 'function') {
                    this.settings.fn_close(this.result);
                }
            }.bind(this));
    };
    // Показать данные 
    modal_confirm_form.prototype.open = function (title, message, fn_ok, fn_cancel) {
        this.result = false;
        this.$header.empty().append(title);
        if (message) { this.$body.empty().append(message); }
        this.settings.fn_close = function (res) {
            if (res) {
                // Ok
                if (typeof fn_ok === 'function') {
                    fn_ok();
                }
            } else {
                // Отмена выполнения
                if (typeof fn_cancel === 'function') {
                    fn_cancel();
                }
            }
        };
        this.$modal_obj.modal('show');
    };
    //// Выполнить отображение и обработку результатов диалогового окна
    //modal_confirm_form.prototype.action_view = function (options) {
    //    if (!options) { throw new Error('Не указан опции'); }
    //    // Настройки формы правки строк таблицы
    //    var settings = $.extend({
    //        form_name: '',
    //        form_message: '',
    //        message_operation: '',
    //        fn_run: null,
    //        fn_cancel: null,
    //    }, options);
    //    this.view(settings.form_name, settings.form_message, function (res) {
    //        if (res) {
    //            // Выполнить операцию
    //            LockScreen(settings.message_operation);
    //            if (typeof settings.fn_run === 'function') {
    //                settings.fn_run();
    //            }
    //        } else {
    //            // Отмена выполнения
    //            if (typeof settings.fn_cancel === 'function') {
    //                settings.fn_cancel();
    //            }
    //        }
    //    }.bind(this));
    //};
    // Закрыть форму 
    modal_confirm_form.prototype.close = function () {
        this.$modal_obj.modal('hide');
    };
    // 
    modal_confirm_form.prototype.destroy = function () {
        if (this.$modal_obj) {
            this.$modal_obj.modal('dispose');
        }
        // Удалить старый элемент
        var $mcf = $('div#modal-form');
        if ($mcf.length > 0) {
            $mcf.remove();
        }
    };

    App.modal_confirm_form = modal_confirm_form;

    //================================================================================
    // Класс окна формы "Диалог"
    function form_dialog() {
        this.fe = new form_element();
        this.el = {};       // Все элементы формы
        this.data_val = {}; // Значение элементов после создания формы
    }

    form_dialog.prototype.init = function (options) {
        this.init = true;
        // Настройки формы правки строк таблицы
        this.settings = $.extend({
            alert: null,
            context: null,
            objs: [],
            id: null,
            add_type_element: true, // Добавлять в название $elementa тип.
            form_class: null,
            validation: true,       // Выполнить встроиную обработку валидации
            fn_html_init: null,     // 1. Обработаем событие html - отрисовался
            fn_element_init: null,  // 2. Обработаем событие создания элементов
            fn_init: null,          // 3. Обработаем событие форма инициализировалась
            fn_validation: null,    // 3. Обработаем событие после sumbit встроиная обработка валидации если validation: true
        }, options);

        var form = new this.fe.bs_form({
            id: this.settings.id,
            class: this.settings.form_class,
        });

        this.$form = form.$html;
        if (this.settings.context !== null) {
            this.settings.context.append(this.$form);
        }
        // Алерт 
        //if (!this.settings.alert) {
        //    var $alert = new this.fc.el_alert();
        //    if ($alert && $alert.$alert && $alert.$alert.length > 0) {
        //        var $alert = $alert.$alert;
        //        this.$form.append($alert);
        //        this.alert = new alert_form($alert);
        //    }
        //};
        // Привяжем событие submit
        this.$form.on('submit', function (event) {
            this.submit(event);
        }.bind(this));
        //---------------------------------------------------------
        // Создаем элементы и отрисовываем их на форме
        // Получим список элементов которые должны отображатся на форме
        this.obj_form = {
            //ini_el: [],
            alerts: [],
            views: [],
            buttons: [],
            validations: [],
        };
        // Пройдемся по элементам
        this.fe.add_obj(this.$form, this.settings.objs, this.obj_form, function (form) {
            // Отложенная инициализация

            // Построение HTML закончена, обработаем событие
            if (typeof this.settings.fn_html_init === 'function') {
                this.settings.fn_html_init();
            }
            // Обработаем событие создания элементов
            if (typeof this.settings.fn_element_init === 'function') {
                this.settings.fn_element_init();
            } else {
                this.create_element(this.el, this.settings.add_type_element);
            }
            // -------------НАСТРОИМ ВАЛИДАЦИЮ -----------------------
            // Получим список validation
            this.list_validation = [];
            $.each(this.obj_form.views, function (i, obj) {
                if (obj.validation_group) {
                    var val = this.list_validation.find(function (o) { return o === obj.validation_group; }.bind(this));
                    if (!val) {
                        this.list_validation.push(obj.validation_group);
                    }
                }
            }.bind(this));
            // Создадим validation для элементов
            $.each(this.list_validation, function (i, validation_name) {
                this['validation_' + validation_name] = new validation_form();
                // Настроим валидацию
                var validation = {};
                validation.name = validation_name;
                validation.elements = [];
                // Настроим Alert
                if (validation_name === 'common') {
                    validation.alert = this.settings.alert;
                } else {
                    var alert = this.obj_form.alerts.find(function (o) { return o.validation_group === validation_name && o.type === 'alert'; });
                    validation.alert = alert && alert.element ? alert.element : this.settings.alert;
                }
                // Получим перечень элементов
                $.each(this.obj_form.views.filter(function (i) { return i.validation_group === validation_name; }),
                    function (i, obj) {
                        validation.elements.push(obj.$element);
                    }.bind(this));
                validation.$elements = $([]).add($(validation.elements));
                this['validation_' + validation_name].init({
                    alert: validation.alert,
                    elements: validation.$elements,
                });
                validation.validation = this['validation_' + validation_name];
                this.obj_form.validations.push(validation);
            }.bind(this));
            // -------------------------------------------------------
            if (typeof this.settings.fn_init === 'function') {
                this.settings.fn_init(this.init);
            }
            // -------------------------------------------------------
        }.bind(this));
    };
    // Создать элементы и привязать элементы к ссылке
    form_dialog.prototype.create_element = function (link, add_type) {
        this.data_val = {}
        $.each(this.obj_form.views, function (i, obj) {
            if (add_type) {
                link[obj.type + '_' + obj.name] = obj.element;
                this.data_val[obj.type + '_' + obj.name] = obj.element.val();
            } else {
                link[obj.name] = obj.element;
                this.data_val[obj.name] = obj.element.val();
            }

        }.bind(this));
        $.each(this.obj_form.buttons, function (i, obj) {
            if (add_type) {
                link[obj.type + '_' + obj.name] = obj.$element;
            } else {
                link['$bt_' + obj.name] = obj.$element;

            }
        }.bind(this));
    };
    // Выполнить обработку события отправка формы
    form_dialog.prototype.submit = function (event) {
        this.clear_validation();
        this.valid = true;
        var result = {};
        if (this.settings.validation) {
            event.preventDefault();
            $.each(this.obj_form.validations, function (i, el_val) {
                $.each(el_val.$elements, function (i, el) {
                    if (el && el.length > 0 && !el[0].disabled) {
                        var valid_element = true;
                        // Да активный выполнить проверку
                        if (el[0].tagName === "SELECT") {
                            var value = el.val();
                            if (value !== null && Number(value) === -1 && el[0].required) {
                                this.valid = false;
                                valid_element = false;
                                el_val.validation.set_object_error($(el), "Элемент [" + (el[0].placeholder && el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - не выбран.");
                            }
                        }

                        var valid = el[0].validity;
                        // Установилась ошибка
                        if (!valid.valid) {
                            this.valid = false;
                            valid_element = false;
                            if (valid.badInput) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - ошибка преобразования.");
                            }
                            if (valid.valueMissing) {
                                el_val.validation.set_object_error($(el), "Элемент [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - не заполнен.");
                            }
                            if (valid.patternMismatch) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - не соответствует шаблону.");
                            }
                            if (valid.rangeOverflow) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - больше максимально допустимого (" + el[0].max + ").");
                            }
                            if (valid.rangeUnderflow) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - меньше минимально допустимого (" + el[0].min + ").");
                            }
                            if (valid.tooLong) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - значение превышает лимит (" + el[0].maxLength + ").");
                            }
                            if (valid.tooShort) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - не достигает минимума (" + el[0].minLength + ").");
                            }
                            if (valid.typeMismatch) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - не соответствует требуемому синтаксису (" + el[0].type + ").");
                            }
                            if (valid.stepMismatch) {
                                el_val.validation.set_object_error($(el), "Значение элемента [" + (el[0].placeholder !== "" ? el[0].placeholder : el[0].id) + "] - не соответствует ограничению step (" + el[0].step + ").");
                            }
                        } else {
                            if (valid_element) el_val.validation.set_control_ok($(el), "");
                        }
                        if (!this.valid) {
                            event.stopPropagation();
                        }
                    }
                }.bind(this));
            }.bind(this));
        };
        // Заполним result полями
        $.each(this.obj_form.views, function (i, obj) {
            if (this.settings.add_type_element) {
                result[obj.type + '_' + obj.name] = obj.element.val();
            } else {
                result[obj.name] = obj.element.val();
            }
        }.bind(this));
        if (typeof this.settings.fn_validation === 'function') {
            this.settings.fn_validation({ valid: Boolean(this.valid), old: this.data_val, new: result });
        }
    };
    // Работа с элементами
    form_dialog.prototype.get_element = function (id) {
        if (this.obj_form.views) {
            var element = this.obj_form.views.find(function (o) {
                return o.name === id;
            });
            if (element && element.element) {
                return element;
            }
        }
        return undefined;
    };

    form_dialog.prototype.clear_validation = function () {
        $.each(this.obj_form.validations, function (i, el_val) {
            el_val.validation.clear_all();
        }.bind(this));
    };
    // Вывести сообщение по элементу валидация ок
    form_dialog.prototype.set_element_validation_ok = function (id, message, not_alert) {
        var element = this.get_element(id);
        if (element) {
            if (element.validation_group && this['validation_' + element.validation_group]) {
                if (not_alert) {
                    this['validation_' + element.validation_group].set_control_ok(element.$element, message);
                } else {
                    this['validation_' + element.validation_group].set_object_ok(element.$element, message);
                }
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    // Вывести сообщение по элементу валидация error
    form_dialog.prototype.set_element_validation_error = function (id, message, not_alert) {
        var element = this.get_element(id);
        if (element) {
            if (element.validation_group && this['validation_' + element.validation_group]) {
                if (not_alert) {
                    this['validation_' + element.validation_group].set_control_error(element.$element, message);
                } else {
                    this['validation_' + element.validation_group].set_object_error(element.$element, message);
                }
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    //
    form_dialog.prototype.set_element_add_class = function (id, name_class) {
        var element = this.get_element(id);
        if (element) {
            if (element.$element) {
                element.$element.addClass(name_class);
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    //
    form_dialog.prototype.set_element_delete_class = function (id, name_class) {
        var element = this.get_element(id);
        if (element) {
            if (element.$element) {
                element.$element.removeClass(name_class);
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    //
    form_dialog.prototype.set_element_chenge_class = function (id, name_class_delete, name_class_add) {
        var element = this.get_element(id);
        if (element) {
            if (element.$element) {
                element.$element.removeClass(name_class_delete).addClass(name_class_add);
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };
    // Сбросить элемент
    form_dialog.prototype.set_element_clear = function (id, not_alert) {
        var element = this.get_element(id);
        if (element) {
            if (element.validation_group && this['validation_' + element.validation_group]) {
                if (not_alert) {
                    this['validation_' + element.validation_group].clear_error(element.$element);
                } else {
                    this.clear_message();
                    this['validation_' + element.validation_group].clear_error(element.$element);
                }
            }
        } else {
            throw new Error('Не удалось найти элемент ' + id);
        }
    };

    // Выполнить очистку сообщений на форме
    form_dialog.prototype.clear_all = function (not_clear_message) {
        if (!not_clear_message && this.settings.alert !== null) this.settings.alert.clear_message();
        this.clear_validation();
    };

    App.form_dialog = form_dialog;


    //================================================================================
    // Класс валидации элементов формы
    function validation_form() {

    }

    validation_form.prototype.init = function (options) {
        this.settings = $.extend({
            alert: null,
            elements: null,
        }, options);
        this.type_message = 0; // 0- ок 1-warning 2-error
        this.$alert = null;
        if (this.settings.alert && this.settings.alert.$alert) {
            this.$alert = this.settings.alert.$alert;
        }
    };

    validation_form.prototype.view_element = function (value, fn_ok, fn_null, fn_undefined) {
        if (value) {
            if (typeof fn_ok === 'function') {
                fn_ok(value);
            }
        } else {
            if (value === null) {
                if (typeof fn_null === 'function') {
                    fn_null(value);
                }
            } else {
                if (typeof fn_undefined === 'function') {
                    fn_undefined(value);
                }
            }
        }
    };

    validation_form.prototype.clear_all = function (not_clear_message) {
        if (!not_clear_message) this.clear_message();
        this.clear_error();
    };
    // Очистить все ошибки
    validation_form.prototype.clear_error = function (obj) {
        if (obj) {
            obj.removeClass('is-valid is-invalid');
        } else {
            if (this.settings.elements && this.settings.elements.length > 0) {
                this.settings.elements.each(function () {
                    $(this).removeClass('is-valid is-invalid').nextAll(".invalid-feedback").text('');
                    // Поиск замещенных компонентов
                    $(this).nextAll($(this)[0].nodeName + "[id^='" + $(this)[0].id + "']").removeClass('is-valid is-invalid');
                });
            };
        };
    };
    // Очистить сообщения
    validation_form.prototype.clear_message = function () {
        if (this.$alert) {
            this.$alert.hide().text('').removeClass('alert-success alert-warning alert-danger');
            this.type_message = 0;
        }
    };
    // Вывести сообщение об ошибке
    validation_form.prototype.out_error_message = function (message) {
        if (this.$alert) {
            if (this.type_message <= 1) {
                this.$alert.show().removeClass('alert-success alert-warning').addClass('alert-danger');
                this.type_message = 2;
            }
            if (message) {
                this.$alert.append(message).append($('<br />'));
            }
        }
    };
    // Вывести сообщение внимание
    validation_form.prototype.out_warning_message = function (message) {
        if (this.$alert) {
            if (this.type_message <= 0) {
                this.$alert.show().removeClass('alert-success alert-danger').addClass('alert-warning');
                this.type_message = 1;
            }
            if (message) {
                this.$alert.append(message).append($('<br />'));
            }
        }
    };
    //* Вывести информационное сообщение
    validation_form.prototype.out_info_message = function (message) {
        if (this.$alert) {
            if (this.type_message === 0) {
                this.$alert.show().removeClass('alert-warning alert-danger').addClass('alert-success');
            }
            if (message) {
                this.$alert.text(message).append($('<br />'));
            }
        }
    };
    //* Вывести сообщение под компонетном
    validation_form.prototype.set_control_error = function (o, message) {
        o.removeClass('is-valid').addClass('is-invalid');
        // Поиск замещенных компонентов
        o.nextAll(o[0].nodeName + "[id^='" + o[0].id + "']").removeClass('is-valid').addClass('is-invalid');
        if (message) {
            o.nextAll(".invalid-feedback").text(message);
        } else { o.nextAll(".invalid-feedback").text('') };
    };
    // Установить признак Ok
    validation_form.prototype.set_control_ok = function (o, message) {
        o.removeClass('is-invalid').addClass('is-valid');
        // Поиск замещенных компонентов
        o.nextAll(o[0].nodeName + "[id^='" + o[0].id + "']").removeClass('is-invalid').addClass('is-valid');
        if (message) {
            o.nextAll(".valid-feedback").text(message);
        } else { o.nextAll(".invalid-feedback").text('') };
    };
    // Установить признак ошибка
    validation_form.prototype.set_object_error = function (o, mes_error) {
        this.set_control_error(o, mes_error);
        this.out_error_message(mes_error);
        return false;
    };
    // Установить признак ок
    validation_form.prototype.set_object_ok = function (o, mes_ok) {
        this.set_control_ok(o, mes_ok);
        this.out_info_message(mes_ok);
        return true;
    };
    // --------------------------------------------------------------------------
    // Установить признак ошибка
    validation_form.prototype.set_form_element_error = function (o, mes_error, out_message) {
        this.set_control_error(o.$element, mes_error);
        if (out_message) this.out_error_message(mes_error);
        return false;
    };
    // Установить признак ок
    validation_form.prototype.set_form_element_ok = function (o, mes_ok, out_message) {
        this.set_control_ok(o.$element, mes_ok);
        if (out_message) this.out_info_message(mes_ok);
        return true;
    };
    // Проверка на условие если true-Ок, false - error
    validation_form.prototype.check_control_condition = function (result, o, mes_error, mes_ok, out_message) {
        if (result) {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(o.$element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверка на пустое значение "INPUT"
    validation_form.prototype.check_control_input_not_null = function (o, mes_error, mes_ok, out_message) {
        var val = o.val();
        var element = o.$element ? o.$element : o;
        if (o.val() !== null && o.val() !== '') {
            this.set_control_ok(element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверим Input введенное значение входит в диапазон (пустое значение - не допускается)
    validation_form.prototype.checkInputOfRange = function (o, min, max, mes_error, mes_ok, out_message) {
        if (o.val() !== '' && o.val() !== null) {
            var value = Number(o.val());
            if (isNaN(value) || value > max || value < min) {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            } else {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            }
        } else {
            this.set_control_error(o.$element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверим Input введенное значение входит в диапазон (пустое значение - допускается)
    validation_form.prototype.checkInputOfRange_IsNull = function (o, min, max, mes_error, mes_ok, out_message) {
        if (o.val() !== '' && o.val() !== null) {
            var value = Number(o.val());
            if (isNaN(value) || value > max || value < min) {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            } else {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            }
        } else {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }
    };
    //* Проверка на пустое значение "SELECT"
    validation_form.prototype.check_control_select_not_null = function (o, mes_error, mes_ok, out_message) {
        //var res1 = o.val();
        //var res = Number(o.val());
        var element = o.$element ? o.$element : o;
        if (o.val() !== '' && Number(o.val()) >= 0) {
            this.set_control_ok(element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    };
    // Проверить элемент "autocomplete" на введенное значение
    validation_form.prototype.check_control_autocomplete = function (o, mes_error, mes_ok, mes_null, out_message) {
        if (o.text()) {
            var s = o.val();
            var s1 = o.text();
            if (o.val() !== null) {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            } else {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            }
        } else {
            this.set_control_error(o.$element, mes_null);
            if (out_message) this.out_error_message(mes_null);
            return false;
        }
    };
    // Проверить элемент "autocomplete" на введенное значение (c учетом value = null)
    validation_form.prototype.check_control_autocomplete_is_value_null = function (o, mes_error, mes_ok, mes_null, out_message) {
        if (o.text()) {
            var s = o.val();
            if (o.val() !== undefined) {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            } else {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            }
        } else {
            this.set_control_error(o.$element, mes_null);
            if (out_message) this.out_error_message(mes_null);
            return false;
        }
    };
    // Проверить элемент "autocomplete" на введенное значение
    validation_form.prototype.check_control_autocomplete_null = function (o, mes_error, mes_ok, out_message) {
        if (o.text()) {
            if (o.val()) {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            } else {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            }
        } else {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }
    };
    // Проверить элемент "datetime_input" на введенное значение
    validation_form.prototype.check_control_datetime_input = function (o, mes_error, mes_ok, out_message) {
        var datetime = moment(o.val());
        var element = o.$element ? o.$element : o;
        if (!datetime.isValid()) {
            this.set_control_error(element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        } else {
            this.set_control_ok(element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }
    };
    // Проверить элемент "datetime_input" на введенное значение (с подержкой пустого значения)
    validation_form.prototype.check_control_datetime_input_null = function (o, mes_error, mes_ok, out_message) {
        if (o.val() !== null && o.val() !== '') {
            var datetime = moment(o.val());
            if (!datetime.isValid()) {
                this.set_control_error(o.$element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            } else {
                this.set_control_ok(o.$element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            }
        } else {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        }

    };
    // Проверить элемент "textarea" на введенные номера вогонов с проверкой на системную нумерацию
    validation_form.prototype.check_control_is_valid_nums = function (o, valid_sys_numbering, valid_not_null, out_message) {
        var val = o.val();
        var element = o.$element ? o.$element : o;
        var mes_ok = 'ок';
        var mes_error = langView('mess_error_cars', App.Langs);
        var mes_warning = 'warning';
        if (!val || val === null) {
            if (!valid_not_null) {
                mes_warning = langView('mess_error_not_cars', App.Langs);
                this.set_control_error(element, mes_warning);
                if (out_message) this.out_error_message(mes_warning);
            }
            return null;
        }
        var valid = true;
        var car_valid = [];
        var car_out = [];
        var cars = val.split(';');
        $.each(cars, function (i, el) {
            if (!isNumeric($.trim(el))) {
                mes_warning = langView('mess_error_input_num_cars', App.Langs).format((i + 1), el);
                if (out_message) this.out_error_message(mes_warning);
                valid = false;
            } else {
                if (Number($.trim(el)) <= 0) {
                    mes_warning = langView('mess_error_input_num_cars1', App.Langs).format((i + 1), el);
                    if (out_message) this.out_error_message(mes_warning);
                    valid = false;
                } else {
                    // Разрешена проверка системной нумерации
                    if (valid_sys_numbering) {
                        var num_val = is_valid_num_wagon(Number($.trim(el)));
                        // Если валидный добавим в список
                        if (num_val) {
                            car_valid.push(Number($.trim(el)));
                            car_out.push(Number($.trim(el)));
                        } else {
                            mes_warning = langView('mess_error_input_num_cars2', App.Langs).format((i + 1), el);
                            if (out_message) this.out_error_message(mes_warning);
                        }
                        valid = valid & num_val;
                    } else {
                        // добавим в список
                        car_valid.push(Number($.trim(el)));
                        car_out.push(Number($.trim(el)));
                    }
                }
            }
        }.bind(this));
        // Провкерка на повторяющиеся номера
        var arr_res = [];
        car_valid.sort();
        for (var i = 1; i < car_valid.length; i++) {
            if (car_valid[i] === car_valid[i - 1]) {
                var is_unique = true;
                for (var k = 0; k < arr_res.length; k++) {
                    if (arr_res[k] === car_valid[i]) {
                        is_unique = false;
                        break;
                    }
                }
                if (is_unique) {
                    arr_res.push(car_valid[i]);
                }
            }
        }
        // Вывод сообщений повторяющихся номеров
        $.each(arr_res, function (i, el) {
            mes_warning = langView('mess_error_input_num_cars_duble', App.Langs).format(el);
            if (out_message) this.out_error_message(mes_warning);
            valid = false;
        }.bind(this));
        if (valid) {
            this.set_control_ok(element, mes_ok);
        } else {
            this.set_control_error(element, mes_error);
        }
        return valid ? car_out : null;

    };
    // Проверить элемент "textarea" на введенные номера документов
    validation_form.prototype.check_control_is_valid_docs = function (o, valid_not_null, valid_dublecate, out_message) {
        var val = o.val();
        var element = o.$element ? o.$element : o;
        var mes_ok = 'ок';
        var mes_error = langView('mess_error_docs', App.Langs);
        var mes_warning = 'warning';
        if (!val || val === null) {
            if (!valid_not_null) {
                mes_warning = langView('mess_error_not_docs', App.Langs);
                this.set_control_error(element, mes_warning);
                if (out_message) this.out_error_message(mes_warning);
            }
            return null;
        }
        var valid = true;
        var car_valid = [];
        var car_out = [];
        var cars = val.split(';');
        $.each(cars, function (i, el) {
            if (!isNumeric($.trim(el))) {
                mes_warning = langView('mess_error_input_num_docs', App.Langs).format((i + 1), el);
                if (out_message) this.out_error_message(mes_warning);
                valid = false;
            } else {
                if (Number($.trim(el)) <= 0) {
                    mes_warning = langView('mess_error_input_num_docs1', App.Langs).format((i + 1), el);
                    if (out_message) this.out_error_message(mes_warning);
                    valid = false;
                } else {
                    car_valid.push(Number($.trim(el)));
                    car_out.push(Number($.trim(el)));
                }
            }
        }.bind(this));
        // Провкерка на повторяющиеся номера
        var arr_res = [];
        car_valid.sort();
        for (var i = 1; i < car_valid.length; i++) {
            if (car_valid[i] === car_valid[i - 1]) {
                var is_unique = true;
                for (var k = 0; k < arr_res.length; k++) {
                    if (arr_res[k] === car_valid[i]) {
                        is_unique = false;
                        break;
                    }
                }
                if (is_unique) {
                    arr_res.push(car_valid[i]);
                }
            }
        }
        // Вывод сообщений повторяющихся номеров
        if (valid_dublecate) {
            $.each(arr_res, function (i, el) {
                mes_warning = langView('mess_error_input_num_docs_duble', App.Langs).format(el);
                if (out_message) this.out_error_message(mes_warning);
                valid = false;
            }.bind(this));
        }
        if (valid) {
            this.set_control_ok(element, mes_ok);
        } else {
            this.set_control_error(element, mes_error);
        }
        return valid ? car_out : null;
    };
    // Проверить элемент "input" на шаблон (пустое значение - нет допускается)
    validation_form.prototype.check_control_regexp_not_null = function (o, regexp, mes_error, mes_ok, out_message) {
        var val = o.val();
        var element = o.$element ? o.$element : o;
        if (val !== null && val !== '') {
            if (!(regexp.test(val))) {
                this.set_control_error(element, mes_error);
                if (out_message) this.out_error_message(mes_error);
                return false;
            } else {
                this.set_control_ok(element, mes_ok);
                if (out_message) this.out_info_message(mes_ok);
                return true;
            }
        } else {
            this.set_control_error(element, mes_error);
            if (out_message) this.out_error_message(mes_error);
            return false;
        }
    }

    App.validation_form = validation_form;

    //================================================================================
    // Класс вывода сообщений (Алерт)
    var alert_form = function ($alert) {
        if (!$alert) {
            throw new Error('Не указан элемент $alert');
        }
        if ($alert.length === 0) {
            throw new Error('Элемент $alert - неопределен');
        }
        this.$alert = $alert;
        this.$mess = $alert.find('.message');
        if (!this.$mess || this.$mess.length === 0) {
            this.$mess = this.$alert;
        }
        //this.selector = this.$alert.attr('id');
        this.clear_message();
    };
    // Очистить сообщения
    alert_form.prototype.clear_message = function () {
        var $div_mes = this.$alert.find('.message');
        this.$mess.text('');
        this.$alert.hide().removeClass('alert-success alert-warning alert-danger');
    };
    // Вывести сообщение об ошибке
    alert_form.prototype.out_error_message = function (message) {
        this.$alert.show().removeClass('alert-success alert-warning').addClass('alert-danger');
        if (message) {
            this.$mess.append(message).append($('<br />'));
            //this.$alert.append(message).append($('<br />'));
        }
    };
    // Вывести сообщение об ошибке
    alert_form.prototype.out_warning_message = function (message) {
        this.$alert.show().removeClass('alert-success alert-danger').addClass('alert-warning');
        if (message) {
            this.$mess.append(message).append($('<br />'));
            //this.$alert.append(message).append($('<br />'));
        }
    };
    // Вывести информационное сообщение
    alert_form.prototype.out_info_message = function (message) {
        this.$alert.show().removeClass('alert-danger alert-warning').addClass('alert-success');
        if (message) {
            this.$mess.append(message).append($('<br />'));
            //this.$alert.append(message).append($('<br />'));
        }
    };

    App.alert_form = alert_form;

    window.App = App;

})(window);