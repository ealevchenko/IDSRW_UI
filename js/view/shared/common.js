var format_date = "YYYY-MM-DD";
var format_time = "HH:mm:ss";
var format_datetime = "YYYY-MM-DD HH:mm:ss";
var format_datetime_ru = "DD.MM.YYYY HH:mm:ss";

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

(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    // Определим язык
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
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
            'mess_error_input_num_cars': 'Ошибка ввода, номер позиции :{0}, введен неправильный номер :{1}',
            'mess_error_input_num_cars1': 'Ошибка ввода, номер позиции :{0}, номер не может быть меньше или равен 0 :{1}',
            'mess_error_input_num_cars2': 'Ошибка ввода, номер позиции :{0}, не системная нумерация (ошибка контрольной суммы) :{1}',
            'mess_error_input_num_cars_duble': 'Ошибка ввода, введеный номер :{0} - повторяется!',

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
        },
        'en':  //default language: English
        {
            'title_label_date': 'PERIOD:',
            'title_select': 'Select ...',
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

    form_element.prototype.init_select = function ($element, options) {
        //TODO: создать и настроить SELECT сделать надпись выберите через placeholder, чтобы работала required
        if (!$element) {
            throw new Error('Не указан элемент $element');
        }
        this.$element = $element;
        var $default_option = $('<option></option>', {
            'value': '-1',
            'text': langView('title_select', App.Langs),
            'disabled': false,
        });
        this.settings = $.extend({
            data: [],
            default_value: null,
            fn_change: null,
            check: null,
        }, options);
        this.init = function () {
            this.update(this.settings.data, this.settings.default_value);
            if (typeof this.settings.fn_change === 'function') {
                this.$element.on("change", function (event) {
                    //this.settings.fn_change.bind(this);
                    if (typeof this.settings.fn_change) {
                        this.settings.fn_change(event);
                    }
                    if (typeof this.settings.check === 'function') {
                        this.settings.check(this.$element.val());
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
                return this.$element.text();
            };
        };
        this.update = function (data, default_value) {
            this.$element.empty();
            if (default_value === -1) {
                this.$element.append($default_option);
            }
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
    // Инициализация текстового поля "INPUT"
    form_element.prototype.init_input = function ($element, options) {
        this.settings = $.extend({
            default_value: null,
            fn_change: null,
        }, options);
        this.type = element.attr('type');
        this.$element = $element;
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
                if (this.type === 'date') {
                    return this.$element.val() !== '' ? moment(this.$element.val()) : null;
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
    // Элемент <label for="..." class="..">..</label>
    form_element.prototype.label = function (options) {
        this.settings = $.extend({
            class: null,
            id: null,
            for: null,
            label: null
        }, options);
        this.$label = $('<label></label>');
        if (!this.$label || this.$label.length === 0) {
            throw new Error('Не удалось создать элемент <div></div>');
        } else {
            add_class(this.$label, this.settings.class);
            add_id(this.$label, this.settings.id);
            append_label(this.$label, this.settings.label);
            add_for(this.$label, this.settings.for);
        }
    };
    // Элемент <button class="btn btn-primary" type="button">Toggle right offcanvas</button>
    form_element.prototype.button = function (options) {
        this.settings = $.extend({
            id: null,
            name: null,
            class: null,
            color: null,
            text: null
        }, options);
        this.$html = $('<button></button>');
        if (!this.$html || this.$html.length === 0) {
            throw new Error('Не удалось создать элемент <button></button>');
        } else {
            add_id(this.$html, this.settings.id);
            add_tag(this.$html, 'name', this.settings.name);
            add_tag(this.$html, 'type', 'button');
            add_class(this.$html, 'btn');
            add_class(this.$html, this.settings.class);
            add_class(this.$html, this.settings.color);
            append_text(this.$html, this.settings.text);
        }
    };


    // Элемент <input type=".." class=".." id="num_car" title=".." name="..".>
    form_element.prototype.input = function (options) {
        this.settings = $.extend({
            id: null,
            value: null,
            checked: null,
            type: 'text',
            class: null,
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
        this.$input = $('<input></input>', {
            'type': this.settings.type
        });

        if (!this.$input || this.$input.length === 0) {
            throw new Error('Не удалось создать элемент <input></input>');
        } else {
            add_class(this.$input, this.settings.class);
            add_id(this.$input, this.settings.id);
            add_tag(this.$input, 'value', this.settings.value);
            add_tag(this.$input, 'checked', this.settings.checked);
            add_tag(this.$input, 'name', this.settings.id);
            add_tag(this.$input, 'title', this.settings.title);
            add_tag(this.$input, 'placeholder', this.settings.placeholder);
            add_tag(this.$input, 'required', this.settings.required);
            add_tag(this.$input, 'maxlength', this.settings.maxlength);
            add_tag(this.$input, 'pattern', this.settings.pattern);
            add_tag(this.$input, 'min', this.settings.min);
            add_tag(this.$input, 'max', this.settings.max);
            add_tag(this.$input, 'step', this.settings.step);
            this.$input.prop('readonly', this.settings.readonly);
        }
    };

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

    form_element.prototype.bs_dropdown = function (options) {
        this.settings = $.extend({
            color: 'secondary',
            size: null,
            class: null,
            id: 'dropdownMenuButton',
            label: null,
            title: null,
            list_menu: null,
        }, options);
        this.fe = new form_element();
        var div_dropdown = new this.fe.div({ class: 'dropdown' });
        this.$element = div_dropdown.$div;
        add_class(this.$element, this.settings.class);
        var button = new this.fe.bs_button({
            color: this.settings.color,
            size: this.settings.size,
            class: 'dropdown-toggle',
            id: this.settings.id,
            label: this.settings.label,
            title: this.settings.title,
        });
        add_tag(button.$button, 'data-toggle', 'dropdown');
        add_tag(button.$button, 'aria-expanded', 'false');
        var div_dropdown_menu = new this.fe.div({ class: 'dropdown-menu' });
        this.$dropdown_menu = div_dropdown_menu.$div
        add_tag(this.$dropdown_menu, 'aria-labelledby', this.settings.id);
        this.$element.append(button.$button).append(this.$dropdown_menu);
        if (this.settings.list_menu && this.settings.list_menu.length > 0) {
            $.each(this.settings.list_menu, function (index, element) {
                var a_link = new this.fe.a({
                    id: element.id,
                    class: 'dropdown-item',
                    href: element.href,
                    text: element.label,
                    target: null,
                    title: null,
                });
                add_class(a_link.$alink, element.disable ? 'disabled' : '');

                if (typeof element.click === 'function') {
                    a_link.$alink.on("click", element.click);
                }
                this.$dropdown_menu.append(a_link.$alink);
            }.bind(this));
        }
    };

    form_element.prototype.bs_droplistgroup = function (options) {
        this.settings = $.extend({
            color: 'secondary',
            size: null,
            class: null,
            id: 'dropdownMenuButton',
            label: null,
            title: null,
            list_menu: null,
        }, options);
        this.fe = new form_element();
        var div_dropdown = new this.fe.div({ class: 'dropdown' });
        this.$element = div_dropdown.$div;
        add_class(this.$element, this.settings.class);
        var button = new this.fe.bs_button({
            color: this.settings.color,
            size: this.settings.size,
            class: 'dropdown-toggle',
            id: this.settings.id,
            label: this.settings.label,
            title: this.settings.title,
        });
        add_tag(button.$button, 'data-toggle', 'dropdown');
        add_tag(button.$button, 'aria-expanded', 'false');
        var div_dropdown_menu = new this.fe.div({ class: 'dropdown-menu' });
        this.$dropdown_menu = div_dropdown_menu.$div
        add_tag(this.$dropdown_menu, 'aria-labelledby', this.settings.id);
        this.$element.append(button.$button).append(this.$dropdown_menu);
        if (this.settings.list_menu && this.settings.list_menu.length > 0) {
            $.each(this.settings.list_menu, function (index, element) {
                var a_link = new this.fe.a({
                    id: element.id,
                    class: 'dropdown-item',
                    href: element.href,
                    text: element.label,
                    target: null,
                    title: null,
                });
                add_class(a_link.$alink, element.disable ? 'disabled' : '');

                if (typeof element.click === 'function') {
                    a_link.$alink.on("click", element.click);
                }
                this.$dropdown_menu.append(a_link.$alink);
            }.bind(this));
        }
    };

    App.form_element = form_element;


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
    // Вывести информационное сообщение
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
    //
    validation_form.prototype.set_control_error = function (o, message) {
        o.removeClass('is-valid').addClass('is-invalid');
        if (message) {
            o.nextAll(".invalid-feedback").text(message);
        } else { o.nextAll(".invalid-feedback").text('') };
    };
    // Установить признак Ok
    validation_form.prototype.set_control_ok = function (o, message) {
        o.removeClass('is-invalid').addClass('is-valid');
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
        if (o.val() !== null && o.val() !== '') {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(o.$element, mes_error);
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
    // Проверка на пустое значение "SELECT"
    validation_form.prototype.check_control_select_not_null = function (o, mes_error, mes_ok, out_message) {
        if (Number(o.val()) >= 0) {
            this.set_control_ok(o.$element, mes_ok);
            if (out_message) this.out_info_message(mes_ok);
            return true;
        } else {
            this.set_control_error(o.$element, mes_error);
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
        //this.selector = this.$alert.attr('id');
        this.clear_message();
    };
    // Очистить сообщения
    alert_form.prototype.clear_message = function () {
        this.$alert.hide().text('').removeClass('alert-success alert-warning alert-danger');
    };
    // Вывести сообщение об ошибке
    alert_form.prototype.out_error_message = function (message) {
        this.$alert.show().removeClass('alert-success alert-warning').addClass('alert-danger');
        if (message) {
            this.$alert.append(message).append($('<br />'));
        }
    };
    // Вывести сообщение об ошибке
    alert_form.prototype.out_warning_message = function (message) {
        this.$alert.show().removeClass('alert-success alert-danger').addClass('alert-warning');
        if (message) {
            this.$alert.append(message).append($('<br />'));
        }
    };
    // Вывести информационное сообщение
    alert_form.prototype.out_info_message = function (message) {
        this.$alert.show().removeClass('alert-danger alert-warning').addClass('alert-success');
        if (message) {
            this.$alert.append(message).append($('<br />'));
        }
    };

    App.alert_form = alert_form;

    window.App = App;

})(window);