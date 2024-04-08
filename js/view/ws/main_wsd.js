jQuery(document).ready(function ($) {

    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {

            //'title_select': 'Выберите...',

        },
        'en':  //default language: English
        {
            //'title_select': 'Выберите...',
        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); //, getLanguages($.Text_Common, App.Lang), getLanguages($.Text_Table, App.Lang)
    App.User_Name = $('input#username').val();

    var API_DIRECTORY = App.ids_directory;
    var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

    var TW = App.table_tree_way;
    var tw = new TW('DIV#tree-way');

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    var alert = App.alert_form;
    var main_alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    var validation_form = App.validation_form;
    var validation = new validation_form();

    // Функция обновить данные из базы list-список таблиц, update-обновить принудительно, callback-возврат список обновленных таблиц
    var load_db = function (list, update, callback) {
        LockScreen(langView('mess_load_reference', App.Langs));
        if (list) {
            api_dir.load(list, false, update, function (result) {
                if (typeof callback === 'function') {
                    callback(result);
                }
            });
        }
    };

    var list_station = [];

    $(document).ready(function ($) {

        // Загрузим справочники
        load_db(['station'], true, function (result) {
            //
            list_station = api_dir.getAllStation();
            // Настроим выбор станций
            var $el_dlg_select_station = $('#station-select')
            var $list_select_station = $el_dlg_select_station.find('.list-group');
            // получим из сокета какие станции отображать
            var list_station_visible = null;
            var select_station_tree = $.cookie("select_station_tree");
            if (select_station_tree) list_station_visible = $.parseJSON(select_station_tree);
            // Загрузим список станций
            $list_select_station.empty();
            //<label class="list-group-item">
            //    <input class="form-check-input me-1" type="checkbox" value="" checked="checked">
            //        First checkbox
            //</label>
            $.each(list_station, function (key, el) {
                if (!el.delete) {
                    var checked = 'checked';
                    if (list_station_visible) {
                        var st_enable = list_station_visible.find(function (o) {
                            return o.id == el.id;
                        });
                        if (st_enable && !st_enable.checked) {
                            checked = null;
                        }
                    }
                    var label = new fe_ui.label({
                        class: 'list-group-item list-group-item-secondary p-0 px-2',
                        label: el.stationNameRu
                    });
                    var input = new fe_ui.input({
                        //id: el.id,
                        value: el.id,
                        checked: checked,
                        type: 'checkbox',
                        class: 'form-check-input me-1',
                        title: null,
                        placeholder: null,
                        required: null,
                        maxlength: null,
                        pattern: null,
                        readonly: false,
                        min: null,
                        max: null,
                        step: null,
                    });
                }
                $list_select_station.append(label.$label.prepend(input.$input));
            }.bind(this));
            // Выбрать или отменить выбор
            var CheckedStations = function (checked) {
                var cb_list = $('.list-group input[type="checkbox"]');
                $.each(cb_list, function (i, el) {
                    $(el).prop("checked", checked);
                });
            }
            // Обработка кнопок выбора списка станций
            $('#btn-station-select').on('click', 'button', function (event) {
                switch (event.currentTarget.id) {
                    case 'select-all': {
                        CheckedStations(true);
                        break;
                    };
                    case 'deselect-all': {
                        var cb_list = $('.list-group input[type="checkbox"]');
                        CheckedStations(false);
                        break;
                    };
                    case 'save': {
                        var cb_list = $('.list-group input[type="checkbox"]');
                        var list = [];
                        $.each(cb_list, function (i, el) {
                            list.push({ id: el.value, checked: $(el).prop("checked") })
                        });
                        $.cookie("select_station_tree", JSON.stringify(list), { expires: 365 });
                        $('#dropdownListgroup').collapse('hide');
                        break;
                    };
                    case 'close': {
                        $('#dropdownListgroup').collapse('hide');
                        break;
                    };
                };
            });

            tw.init({
                api_dir: api_dir,
            });
            tw.view(list_station_visible, null, null, null);

            LockScreenOff();
        }.bind(this));
    });

}); // End of use strict