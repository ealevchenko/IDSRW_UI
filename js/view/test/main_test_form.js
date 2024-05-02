(function ($) {

    "use strict"; // Start of use strict
    var App = window.App || {};
    var $ = window.jQuery;
    // Массив текстовых сообщений 
    $.Text_View =
    {
        'default':  //default language: ru
        {
            'mwsd_mess_load_wagons': 'Загружаю перечень вагонов на выбранном пути...',
            'mwsd_mess_load_operators': 'Загружаю перечень операторов на станции...',
            'mwsd_mess_load_balance': 'Загружаю остаток...',
        },
        'en':  //default language: English
        {
            //'title_select': 'Выберите...',
        }
    };

    // Определим глобальные переменные
    App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang)); 
    //App.User_Name = $('input#username').val();

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    var api_wsd = new IDS_WSD({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });

    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    var FD = App.form_dialog;

    var alert = App.alert_form;
    var main_alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    $(function () {

        var main = $('main');
        var row = new fe_ui.bs_row({});
        main.append(row.$html);

        var element_input_sm = new fe_ui.bs_form_input({
            id: 'element_input',
            name: 'element_input',
            label: 'element_input',
            element_type: 'text',
            element_fsize: 'sm',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_min: null,
            element_max: null,
            element_step: null,
            validation: true,
            feedback_invalid: 'error element_input',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input',
            form_text_class: null,
        });
        row.$html.append(element_input_sm.$html);
        var element_input = new fe_ui.bs_form_input({
            id: 'element_input',
            name: 'element_input',
            label: 'element_input',
            element_type: 'text',
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_min: null,
            element_max: null,
            element_step: null,
            validation: true,
            feedback_invalid: 'error element_input',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input',
            form_text_class: null,
        });
        row.$html.append(element_input.$html);
        var element_input_lg = new fe_ui.bs_form_input({
            id: 'element_input',
            name: 'element_input',
            label: 'element_input',
            element_type: 'text',
            element_fsize: 'lg',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_min: null,
            element_max: null,
            element_step: null,
            validation: true,
            feedback_invalid: 'error element_input',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input',
            form_text_class: null,
        });
        row.$html.append(element_input_lg.$html);

        var element_select_sm = new fe_ui.bs_form_select({
            id: 'element_select',
            name: 'element_select',
            label: 'element_select',
            element_fsize: 'sm',
            element_class: null,
            element_value: null,
            element_multiple: false,
            element_title: null,
            element_required: null,
            element_readonly: false,
            element_size: null,
            element_list:
                [
                    { value: 'option1', text: 'option1', disabled: false },
                    { value: 'dddddd', text: 'ddddddd', disabled: true },
                    { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
                ],
            validation: true,
            feedback_invalid: 'error element_select',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_select',
            form_text_class: null,
        });
        row.$html.append(element_select_sm.$html);
        var element_select = new fe_ui.bs_form_select({
            id: 'element_select',
            name: 'element_select',
            label: 'element_select',
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_multiple: false,
            element_title: null,
            element_required: null,
            element_readonly: false,
            element_size: null,
            element_list:
                [
                    { value: 'option1', text: 'option1', disabled: false },
                    { value: 'dddddd', text: 'ddddddd', disabled: true },
                    { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
                ],
            validation: true,
            feedback_invalid: 'error element_select',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_select',
            form_text_class: null,
        });
        row.$html.append(element_select.$html);
        var element_select_lg = new fe_ui.bs_form_select({
            id: 'element_select',
            name: 'element_select',
            label: 'element_select',
            element_fsize: 'lg',
            element_class: null,
            element_value: null,
            element_multiple: false,
            element_title: null,
            element_required: null,
            element_readonly: false,
            element_size: null,
            element_list:
                [
                    { value: 'option1', text: 'option1', disabled: false },
                    { value: 'dddddd', text: 'ddddddd', disabled: true },
                    { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
                ],
            validation: true,
            feedback_invalid: 'error element_select',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_select',
            form_text_class: null,
        });
        row.$html.append(element_select_lg.$html);

        var element_input_number_sm = new fe_ui.bs_form_input({
            id: 'element_input_number',
            name: 'element_input_number',
            label: 'element_input_number',
            element_type: 'number',
            element_fsize: 'sm',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input_number',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_min: 0,
            element_max: 100,
            element_step: 1,
            validation: true,
            feedback_invalid: 'error-element_input_number',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input_number',
            form_text_class: null,
        });
        row.$html.append(element_input_number_sm.$html);
        var element_input_number = new fe_ui.bs_form_input({
            id: 'element_input_number',
            name: 'element_input_number',
            label: 'element_input_number',
            element_type: 'number',
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input_number',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_min: 0,
            element_max: 100,
            element_step: 1,
            validation: true,
            feedback_invalid: 'error-element_input_number',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input_number',
            form_text_class: null,
        });
        row.$html.append(element_input_number.$html);
        var element_input_number_lg = new fe_ui.bs_form_input({
            id: 'element_input_number',
            name: 'element_input_number',
            label: 'element_input_number',
            element_type: 'number',
            element_fsize: 'lg',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input_number',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_min: 0,
            element_max: 100,
            element_step: 1,
            validation: true,
            feedback_invalid: 'error-element_input_number',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input_number',
            form_text_class: null,
        });
        row.$html.append(element_input_number_lg.$html);

        var element_input_datalist_sm = new fe_ui.bs_form_input_datalist({
            id: 'element_input_datalist',
            name: 'element_input_datalist',
            label: 'element_input_datalist',
            element_fsize: 'sm',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input_datalist',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_list: [
                { value: 'option1', text: 'option1', disabled: false },
                { value: 'dddddd', text: 'ddddddd', disabled: true },
                { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
            ],
            validation: true,
            feedback_invalid: 'error element_input_datalist',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input_datalist',
            form_text_class: null
        });
        row.$html.append(element_input_datalist_sm.$html);
        var element_input_datalist = new fe_ui.bs_form_input_datalist({
            id: 'element_input_datalist',
            name: 'element_input_datalist',
            label: 'element_input_datalist',
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input_datalist',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_list: [
                { value: 'option1', text: 'option1', disabled: false },
                { value: 'dddddd', text: 'ddddddd', disabled: true },
                { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
            ],
            validation: true,
            feedback_invalid: 'error element_input_datalist',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input_datalist',
            form_text_class: null
        });
        row.$html.append(element_input_datalist.$html);
        var element_input_datalist_lg = new fe_ui.bs_form_input_datalist({
            id: 'element_input_datalist',
            name: 'element_input_datalist',
            label: 'element_input_datalist',
            element_fsize: 'lg',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_input_datalist',
            element_required: null,
            element_maxlength: null,
            element_pattern: null,
            element_readonly: false,
            element_list: [
                { value: 'option1', text: 'option1', disabled: false },
                { value: 'dddddd', text: 'ddddddd', disabled: true },
                { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
            ],
            validation: true,
            feedback_invalid: 'error element_input_datalist',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_input_datalist',
            form_text_class: null
        });
        row.$html.append(element_input_datalist_lg.$html);

        var element_textarea_sm = new fe_ui.bs_form_textarea({
            id: 'element_textarea',
            name: 'element_textarea',
            label: 'element_textarea',
            element_fsize: 'sm',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_textarea',
            element_required: null,
            element_maxlength: null,
            element_readonly: false,
            element_cols: null,
            element_rows: 3,
            element_wrap: null,
            validation: true,
            feedback_invalid: 'error-element_textarea',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_textarea',
            form_text_class: null
        });
        row.$html.append(element_textarea_sm.$html);
        var element_textarea = new fe_ui.bs_form_textarea({
            id: 'element_textarea',
            name: 'element_textarea',
            label: 'element_textarea',
            element_fsize: null,
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_textarea',
            element_required: null,
            element_maxlength: null,
            element_readonly: false,
            element_cols: null,
            element_rows: 3,
            element_wrap: null,
            validation: true,
            feedback_invalid: 'error-element_textarea',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_textarea',
            form_text_class: null
        });
        row.$html.append(element_textarea.$html);
        var element_textarea_lg = new fe_ui.bs_form_textarea({
            id: 'element_textarea',
            name: 'element_textarea',
            label: 'element_textarea',
            element_fsize: 'lg',
            element_class: null,
            element_value: null,
            element_title: null,
            element_placeholder: 'placeholder element_textarea',
            element_required: null,
            element_maxlength: null,
            element_readonly: false,
            element_cols: null,
            element_rows: 3,
            element_wrap: null,
            validation: true,
            feedback_invalid: 'error-element_textarea',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 4,
            col_class: null,
            group_prepend: true,
            group_prepend_class: null,
            group_prepend_id: null,
            group_prepend_html: 'prepend',
            group_append: true,
            group_append_class: null,
            group_append_id: null,
            group_append_html: 'append',
            form_text: 'Это help-element_textarea',
            form_text_class: null
        });
        row.$html.append(element_textarea_lg.$html);

        var element_check = new fe_ui.bs_form_check({
            id: 'element_check',
            name: 'element_check',
            label: 'element_check',
            element_type: 'checkbox',
            element_switch: false,
            element_inline: false,
            element_class: null,
            element_value: null,
            element_title: null,
            element_checked: true,
            element_required: null,
            element_readonly: false,
            validation: true,
            feedback_invalid: 'error-element_check',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 6,
            col_class: null,
            form_text: 'Это help-element_check',
            form_text_class: null
        });
        row.$html.append(element_check.$html);

        var element_switch = new fe_ui.bs_form_check({
            id: 'element_switch',
            name: 'element_switch',
            label: 'element_switch',
            element_type: 'checkbox',
            element_switch: true,
            element_inline: false,
            element_class: null,
            element_value: null,
            element_title: null,
            element_checked: true,
            element_required: null,
            element_readonly: false,
            validation: true,
            feedback_invalid: 'error-element_switch',
            feedback_valid: null,
            feedback_class: null,
            col_prefix: 'md',
            col_size: 6,
            col_class: null,
            form_text: 'Это help-element_switch',
            form_text_class: null
        });
        row.$html.append(element_switch.$html);

        var element_radio = new fe_ui.bs_form_check({
            id: 'element_radio',
            name: 'element_radio',
            label: 'element_radio',
            element_type: 'radio',
            //element_switch: false,
            element_inline: true,
            element_class: null,
            element_value: null,
            element_title: null,
            element_checked: true,
            element_required: null,
            element_readonly: false,
            validation: true,
            feedback_invalid: 'error-element_radio',
            feedback_valid: null,
            feedback_class: null,
            col: true,
            col_prefix: 'md',
            col_size: 6,
            col_class: null,
            //form_text: 'Это help-element_radio',
            //form_text_class: null
        });
        row.$html.append(element_radio.$html);

        var element_radio1 = new fe_ui.bs_form_check({
            id: 'element_radio1',
            name: 'element_radio1',
            label: 'element_radio1',
            element_type: 'radio',
            //element_switch: false,
            element_inline: true,
            element_class: null,
            element_value: null,
            element_title: null,
            element_checked: false,
            element_required: null,
            element_readonly: false,
            validation: true,
            feedback_invalid: 'error-element_radio1',
            feedback_valid: null,
            feedback_class: null,
            col: false,
            //col_prefix: 'md',
            //col_size: 6,
            //col_class: null,
            //form_text: 'Это help-element_radio1',
            //form_text_class: null
        });

        element_radio.$html.append(element_radio1.$html);

        var row_form = new fe_ui.bs_row({});
        main.append(row_form.$html);

        // Создадим форму выбора пути отправки (this.$setup_from)
        this.form_test_dialog = new FD();
        // Создать макет панели
        var objs = [];

        var form_input_validationCustom01 = {
            obj: 'bs_form_input',
            options: {
                validation_group: null,
                id: 'validationCustom01',
                name: 'validationCustom01',
                label: 'First name',
                element_type: 'text',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'First name',
                element_required: null,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: null,
                element_max: null,
                element_step: null,
                validation: true,
                feedback_invalid: 'error First name',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend: true,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: 'prepend',
                group_append: true,
                group_append_class: null,
                group_append_id: null,
                group_append_html: 'append',
                form_text: 'Это help-element_input',
                form_text_class: null,
                element_fn_change: function (e) {
                    var num = Number($(e.currentTarget).val());
                }.bind(this),
            },
            childs: []
        };
        var form_input_validationCustom02 = {
            obj: 'bs_form_input',
            options: {
                validation_group: null,
                id: 'validationCustom02',
                name: 'validationCustom02',
                label: 'Last name',
                element_type: 'text',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'Last name',
                element_required: null,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: null,
                element_max: null,
                element_step: null,
                validation: true,
                feedback_invalid: 'error Last name',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend: false,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: null,
                group_append: false,
                group_append_class: null,
                group_append_id: null,
                group_append_html: null,
                form_text: null,
                form_text_class: null,
                element_fn_change: function (e) {
                    var num = Number($(e.currentTarget).val());
                }.bind(this),
            },
            childs: []
        };
        var form_input_validationCustomUsername = {
            obj: 'bs_form_input',
            options: {
                validation_group: null,
                id: 'validationCustomUsername',
                name: 'validationCustomUsername',
                label: 'Username',
                element_type: 'text',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'Username',
                element_required: null,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: null,
                element_max: null,
                element_step: null,
                validation: true,
                feedback_invalid: 'Please choose a username.',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend: false,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: null,
                group_append: true,
                group_append_class: null,
                group_append_id: null,
                group_append_html: '@',
                form_text: null,
                form_text_class: null,
                element_fn_change: function (e) {
                    var num = Number($(e.currentTarget).val());
                }.bind(this),
            },
            childs: []
        };

        objs.push(form_input_validationCustom01);
        objs.push(form_input_validationCustom02);
        objs.push(form_input_validationCustomUsername);

        this.form_test_dialog.init({
            alert: main_alert,
            objs: objs,
            id: null,
            form_class: 'row g-3',
            validation: true,
            fn_validation: function (res) { }.bind(this),
            fn_html_init: function (res) { }.bind(this),
            fn_init: function (init) {
                row_form.$html.append(this.form_test_dialog.$form);
            }.bind(this),

        });

        
    });

})(jQuery); // End of use strict