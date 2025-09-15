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
            'mwsd_mess_load_wagons': 'Загружаю перечень вагонов на выбранном пути...',
            'mwsd_mess_load_operators': 'Загружаю перечень операторов на станции...',
            'mwsd_mess_load_balance': 'Загружаю остаток...',
        }
    };

    // Определим глобальные переменные
    //App.Lang = ($.cookie('lang') === undefined ? 'ru' : $.cookie('lang'));
    App.Lang = 'ru';
    App.Langs = $.extend(true, App.Langs, getLanguages($.Text_View, App.Lang));
    //App.User_Name = $('input#username').val();

    var API_DIRECTORY = App.ids_directory;
    var IDS_WSD = App.ids_wsd;
    //var api_dir = new API_DIRECTORY({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    //var api_wsd = new IDS_WSD({ url_api: "https://krr-app-paweb01.europe.mittalco.com/IDSRW_API" });
    var api_dir = new API_DIRECTORY({ url_api: App.Url_Api });
    var api_wsd = new IDS_WSD({ url_api: App.Url_Api });
    // Модуль инициализаии компонентов формы
    var FE = App.form_element;
    var fe_ui = new FE();

    var FD = App.form_dialog;

    var alert = App.alert_form;
    var main_alert = new alert($('div#main-alert')); // Создадим класс ALERTG

    $(function () {

        var main = $('main');
        //var row = new fe_ui.bs_row({});
        //main.append(row.$html);

        //var bt_append = {
        //    obj: 'bs_button',
        //    options: {
        //        id: null,
        //        name: null,
        //        class: null,
        //        fsize: 'sm',
        //        color: 'success',
        //        text: null,
        //        title: 'append',
        //        icon_fa_left: 'fas fa-search',
        //        icon_fa_right: null,
        //        fn_click: null,
        //    }
        //};
        //var bt_prepend = {
        //    obj: 'bs_button',
        //    options: {
        //        id: null,
        //        name: null,
        //        class: null,
        //        fsize: 'sm',
        //        color: 'success',
        //        text: null,
        //        title: 'prepend',
        //        icon_fa_left: 'fa-solid fa-house',
        //        icon_fa_right: null,
        //        fn_click: null,
        //    }
        //};
        //var element_input_sm = new fe_ui.bs_form_input({
        //    id: 'element_input',
        //    name: 'element_input',
        //    label: 'element_input',
        //    element_type: 'text',
        //    element_fsize: 'sm',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_min: null,
        //    element_max: null,
        //    element_step: null,
        //    validation: true,
        //    feedback_invalid: 'error element_input',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    /*            group_prepend: true,*/
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    group_prepend_objs: null,
        //    /*            group_append: true,*/
        //    group_append_class: null,
        //    group_append_id: null,
        //    //group_append_html: 'append',
        //    group_append_html: null,
        //    group_append_objs: [bt_append],
        //    form_text: 'Это help-element_input',
        //    form_text_class: null,
        //});
        //row.$html.append(element_input_sm.$html);
        //var element_input = new fe_ui.bs_form_input({
        //    id: 'element_input',
        //    name: 'element_input',
        //    label: 'element_input',
        //    element_type: 'text',
        //    element_fsize: null,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_min: null,
        //    element_max: null,
        //    element_step: null,
        //    validation: true,
        //    feedback_invalid: 'error element_input',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input',
        //    form_text_class: null,
        //});
        //row.$html.append(element_input.$html);
        //var element_input_lg = new fe_ui.bs_form_input({
        //    id: 'element_input',
        //    name: 'element_input',
        //    label: 'element_input',
        //    element_type: 'text',
        //    element_fsize: 'lg',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_min: null,
        //    element_max: null,
        //    element_step: null,
        //    validation: true,
        //    feedback_invalid: 'error element_input',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input',
        //    form_text_class: null,
        //});
        //row.$html.append(element_input_lg.$html);

        //var element_select_sm = new fe_ui.bs_form_select({
        //    id: 'element_select',
        //    name: 'element_select',
        //    label: 'element_select',
        //    element_fsize: 'sm',
        //    element_class: null,
        //    element_value: null,
        //    element_multiple: false,
        //    element_title: null,
        //    element_required: null,
        //    element_readonly: false,
        //    element_size: null,
        //    element_list:
        //        [
        //            { value: 'option1', text: 'option1', disabled: false },
        //            { value: 'dddddd', text: 'ddddddd', disabled: true },
        //            { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
        //        ],
        //    validation: true,
        //    feedback_invalid: 'error element_select',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_select',
        //    form_text_class: null,
        //});
        //row.$html.append(element_select_sm.$html);
        //var element_select = new fe_ui.bs_form_select({
        //    id: 'element_select',
        //    name: 'element_select',
        //    label: 'element_select',
        //    element_fsize: null,
        //    element_class: null,
        //    element_value: null,
        //    element_multiple: false,
        //    element_title: null,
        //    element_required: null,
        //    element_readonly: false,
        //    element_size: null,
        //    element_list:
        //        [
        //            { value: 'option1', text: 'option1', disabled: false },
        //            { value: 'dddddd', text: 'ddddddd', disabled: true },
        //            { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
        //        ],
        //    validation: true,
        //    feedback_invalid: 'error element_select',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_select',
        //    form_text_class: null,
        //});
        //row.$html.append(element_select.$html);
        //var element_select_lg = new fe_ui.bs_form_select({
        //    id: 'element_select',
        //    name: 'element_select',
        //    label: 'element_select',
        //    element_fsize: 'lg',
        //    element_class: null,
        //    element_value: null,
        //    element_multiple: false,
        //    element_title: null,
        //    element_required: null,
        //    element_readonly: false,
        //    element_size: null,
        //    element_list:
        //        [
        //            { value: 'option1', text: 'option1', disabled: false },
        //            { value: 'dddddd', text: 'ddddddd', disabled: true },
        //            { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
        //        ],
        //    validation: true,
        //    feedback_invalid: 'error element_select',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_select',
        //    form_text_class: null,
        //});
        //row.$html.append(element_select_lg.$html);

        //var element_input_number_sm = new fe_ui.bs_form_input({
        //    id: 'element_input_number',
        //    name: 'element_input_number',
        //    label: 'element_input_number',
        //    element_type: 'number',
        //    element_fsize: 'sm',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input_number',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_min: 0,
        //    element_max: 100,
        //    element_step: 1,
        //    validation: true,
        //    feedback_invalid: 'error-element_input_number',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input_number',
        //    form_text_class: null,
        //});
        //row.$html.append(element_input_number_sm.$html);
        //var element_input_number = new fe_ui.bs_form_input({
        //    id: 'element_input_number',
        //    name: 'element_input_number',
        //    label: 'element_input_number',
        //    element_type: 'number',
        //    element_fsize: null,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input_number',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_min: 0,
        //    element_max: 100,
        //    element_step: 1,
        //    validation: true,
        //    feedback_invalid: 'error-element_input_number',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input_number',
        //    form_text_class: null,
        //});
        //row.$html.append(element_input_number.$html);
        //var element_input_number_lg = new fe_ui.bs_form_input({
        //    id: 'element_input_number',
        //    name: 'element_input_number',
        //    label: 'element_input_number',
        //    element_type: 'number',
        //    element_fsize: 'lg',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input_number',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_min: 0,
        //    element_max: 100,
        //    element_step: 1,
        //    validation: true,
        //    feedback_invalid: 'error-element_input_number',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input_number',
        //    form_text_class: null,
        //});
        //row.$html.append(element_input_number_lg.$html);

        //var element_input_datalist_sm = new fe_ui.bs_form_input_datalist({
        //    id: 'element_input_datalist',
        //    name: 'element_input_datalist',
        //    label: 'element_input_datalist',
        //    element_fsize: 'sm',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input_datalist',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_list: [
        //        { value: 'option1', text: 'option1', disabled: false },
        //        { value: 'dddddd', text: 'ddddddd', disabled: true },
        //        { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
        //    ],
        //    validation: true,
        //    feedback_invalid: 'error element_input_datalist',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input_datalist',
        //    form_text_class: null
        //});
        //row.$html.append(element_input_datalist_sm.$html);
        //var element_input_datalist = new fe_ui.bs_form_input_datalist({
        //    id: 'element_input_datalist',
        //    name: 'element_input_datalist',
        //    label: 'element_input_datalist',
        //    element_fsize: null,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input_datalist',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_list: [
        //        { value: 'option1', text: 'option1', disabled: false },
        //        { value: 'dddddd', text: 'ddddddd', disabled: true },
        //        { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
        //    ],
        //    validation: true,
        //    feedback_invalid: 'error element_input_datalist',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input_datalist',
        //    form_text_class: null
        //});
        //row.$html.append(element_input_datalist.$html);
        //var element_input_datalist_lg = new fe_ui.bs_form_input_datalist({
        //    id: 'element_input_datalist',
        //    name: 'element_input_datalist',
        //    label: 'element_input_datalist',
        //    element_fsize: 'lg',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_input_datalist',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_pattern: null,
        //    element_readonly: false,
        //    element_list: [
        //        { value: 'option1', text: 'option1', disabled: false },
        //        { value: 'dddddd', text: 'ddddddd', disabled: true },
        //        { value: 'rrrrrrr', text: 'rrrrrrr', disabled: false }
        //    ],
        //    validation: true,
        //    feedback_invalid: 'error element_input_datalist',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_input_datalist',
        //    form_text_class: null
        //});
        //row.$html.append(element_input_datalist_lg.$html);

        //var element_textarea_sm = new fe_ui.bs_form_textarea({
        //    id: 'element_textarea',
        //    name: 'element_textarea',
        //    label: 'element_textarea',
        //    element_fsize: 'sm',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_textarea',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_readonly: false,
        //    element_cols: null,
        //    element_rows: 3,
        //    element_wrap: null,
        //    validation: true,
        //    feedback_invalid: 'error-element_textarea',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_textarea',
        //    form_text_class: null
        //});
        //row.$html.append(element_textarea_sm.$html);
        //var element_textarea = new fe_ui.bs_form_textarea({
        //    id: 'element_textarea',
        //    name: 'element_textarea',
        //    label: 'element_textarea',
        //    element_fsize: null,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_textarea',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_readonly: false,
        //    element_cols: null,
        //    element_rows: 3,
        //    element_wrap: null,
        //    validation: true,
        //    feedback_invalid: 'error-element_textarea',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_textarea',
        //    form_text_class: null
        //});
        //row.$html.append(element_textarea.$html);
        //var element_textarea_lg = new fe_ui.bs_form_textarea({
        //    id: 'element_textarea',
        //    name: 'element_textarea',
        //    label: 'element_textarea',
        //    element_fsize: 'lg',
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_placeholder: 'placeholder element_textarea',
        //    element_required: null,
        //    element_maxlength: null,
        //    element_readonly: false,
        //    element_cols: null,
        //    element_rows: 3,
        //    element_wrap: null,
        //    validation: true,
        //    feedback_invalid: 'error-element_textarea',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 4,
        //    col_class: null,
        //    //group_prepend: true,
        //    group_prepend_class: null,
        //    group_prepend_id: null,
        //    group_prepend_html: 'prepend',
        //    //group_append: true,
        //    group_append_class: null,
        //    group_append_id: null,
        //    group_append_html: 'append',
        //    form_text: 'Это help-element_textarea',
        //    form_text_class: null
        //});
        //row.$html.append(element_textarea_lg.$html);

        //var element_check = new fe_ui.bs_form_check({
        //    id: 'element_check',
        //    name: 'element_check',
        //    label: 'element_check',
        //    element_type: 'checkbox',
        //    element_switch: false,
        //    element_inline: false,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_checked: true,
        //    element_required: null,
        //    element_readonly: false,
        //    validation: true,
        //    feedback_invalid: 'error-element_check',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 6,
        //    col_class: null,
        //    form_text: 'Это help-element_check',
        //    form_text_class: null
        //});
/*        row.$html.append(element_check.$html);*/

        //var element_switch = new fe_ui.bs_form_check({
        //    id: 'element_switch',
        //    name: 'element_switch',
        //    label: 'element_switch',
        //    element_type: 'checkbox',
        //    element_switch: true,
        //    element_inline: false,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_checked: true,
        //    element_required: null,
        //    element_readonly: false,
        //    validation: true,
        //    feedback_invalid: 'error-element_switch',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col_prefix: 'md',
        //    col_size: 6,
        //    col_class: null,
        //    form_text: 'Это help-element_switch',
        //    form_text_class: null
        //});
        //row.$html.append(element_switch.$html);

        //var element_radio = new fe_ui.bs_form_check({
        //    id: 'element_radio',
        //    name: 'element_radio',
        //    label: 'element_radio',
        //    element_type: 'radio',
        //    //element_switch: false,
        //    element_inline: true,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_checked: true,
        //    element_required: null,
        //    element_readonly: false,
        //    validation: true,
        //    feedback_invalid: 'error-element_radio',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col: true,
        //    col_prefix: 'md',
        //    col_size: 6,
        //    col_class: null,
        //    //form_text: 'Это help-element_radio',
        //    //form_text_class: null
        //});
        //row.$html.append(element_radio.$html);

        //var element_radio1 = new fe_ui.bs_form_check({
        //    id: 'element_radio1',
        //    name: 'element_radio1',
        //    label: 'element_radio1',
        //    element_type: 'radio',
        //    //element_switch: false,
        //    element_inline: true,
        //    element_class: null,
        //    element_value: null,
        //    element_title: null,
        //    element_checked: false,
        //    element_required: null,
        //    element_readonly: false,
        //    validation: true,
        //    feedback_invalid: 'error-element_radio1',
        //    feedback_valid: null,
        //    feedback_class: null,
        //    col: false,
        //    //col_prefix: 'md',
        //    //col_size: 6,
        //    //col_class: null,
        //    //form_text: 'Это help-element_radio1',
        //    //form_text_class: null
        //});

        //element_radio.$html.append(element_radio1.$html);

        $('#example-getting-started').multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
                popupContainer: '<div class="multiselect-container dropdown-menu"></div>',
                filter: '<div class="multiselect-filter d-flex align-items-center"><i class="fas fa-sm fa-search text-muted"></i><input type="search" class="multiselect-search form-control" /></div>',
                buttonGroup: '<div class="multiselect-buttons btn-group" style="display:flex;"></div>',
                buttonGroupReset: '<button type="button" class="multiselect-reset btn btn-secondary btn-block"></button>',
                option: '<button type="button" class="multiselect-option dropdown-item"></button>',
                divider: '<div class="dropdown-divider"></div>',
                optionGroup: '<button type="button" class="multiselect-group dropdown-item"></button>',
                resetButton: '<div class="multiselect-reset text-center p-2"><button type="button" class="btn btn-sm btn-block btn-outline-secondary"></button></div>'
            }
        });

        var options = [
            { label: 'Option 1', title: 'Option 1', value: '1', selected: true },
            { label: 'Option 2', title: 'Option 2', value: '2' },
            { label: 'Option 3', title: 'Option 3', value: '3', selected: true },
            { label: 'Option 4', title: 'Option 4', value: '4' },
            { label: 'Option 5', title: 'Option 5', value: '5' },
            { label: 'Option 6', title: 'Option 6', value: '6', disabled: true }
        ];

        var val = [];
        //val.push("1");
        //val.push("4");
        val.push(3);
        val.push(4);

        $('#example-select-button').on('click', function () {
            //$('#example-getting-started').multiselect('select', ['1', '2', '4']);
            //$('#example-getting-started').multiselect('select', val);
            $('#example-getting-started').multiselect('dataprovider', options);
            //alert('Selected 1, 2 and 4.');
        });

        var row_form = new fe_ui.bs_row({});
        main.append(row_form.$html);

        // Создадим форму выбора пути отправки (this.$setup_from)
        this.form_test_dialog = new FD();
        // Создать макет панели
        var objs = [];

        var bt_append_inp = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'append',
                icon_fa_left: 'fas fa-search',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_prepend_inp = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'prepend',
                icon_fa_left: 'fa-solid fa-house',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_append_sel = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'append',
                icon_fa_left: 'fas fa-search',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_prepend_sel = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'prepend',
                icon_fa_left: 'fa-solid fa-house',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_append_dl = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'append',
                icon_fa_left: 'fas fa-search',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_prepend_dl = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'prepend',
                icon_fa_left: 'fa-solid fa-house',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_append_ta = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'append',
                icon_fa_left: 'fas fa-search',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_prepend_ta = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'prepend',
                icon_fa_left: 'fa-solid fa-house',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_append_dt = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'append',
                icon_fa_left: 'fas fa-search',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_prepend_dt = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'prepend',
                icon_fa_left: 'fa-solid fa-house',
                icon_fa_right: null,
                fn_click: null,
            }
        };


        var row1 = {
            obj: 'bs_row',
            options: {
                id: null,
                class: 'mb-1',
                style: null,
            },
            childs: []
        };
        var col1 = {
            obj: 'bs_col',
            options: {
                id: null,
                pref: 'md',
                size: 12,
                class: 'text-left',
                style: null,
            },
            childs: []
        };
        var bt_1 = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'warning',
                text: 'sumbit',
                title: 'Описание....',
                icon_fa_left: null,
                icon_fa_right: null,
                fn_click: function (event) {
                    event.preventDefault();
                    this.form_test_dialog.$form.submit();
                }.bind(this),
            }
        };
        var bt_2 = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: null,
                title: 'Описание....',
                icon_fa_left: 'fas fa-search',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_3 = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'success',
                text: 'Кнопашка',
                title: 'Описание....',
                icon_fa_left: 'fas fa-search',
                icon_fa_right: null,
                fn_click: null,
            }
        };
        var bt_app = {
            obj: 'bs_button',
            options: {
                id: null,
                name: null,
                class: null,
                fsize: 'sm',
                color: 'primary',
                text: null,
                title: 'Описание....',
                icon_fa_left: 'fa-solid fa-user-group',
                icon_fa_right: null,
                fn_click: null,
            }
        };

        var form_input_validationCustom01 = {
            obj: 'bs_form_input',
            options: {
                validation_group: 'common',
                id: 'validationCustom01',
                name: 'validationCustom01',
                label: 'First name',
                element_type: 'text',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'First name',
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: null,
                element_max: null,
                element_step: null,
                element_options: {
                    default: '',
                    fn_change: function (e) {
                        var value = $(e.currentTarget).val();
                        main_alert.clear_message(); main_alert.out_info_message('validationCustom01 : ' + value);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error First name',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: null,
                group_prepend_objs: [bt_prepend_inp],
                group_append_class: null,
                group_append_id: null,
                group_append_html: 'append',
                group_append_objs: [bt_append_inp],
                form_text: 'Это help-element_input',
                form_text_class: null,
            },
            childs: []
        };
        var form_input_validationCustom02 = {
            obj: 'bs_form_input',
            options: {
                validation_group: 'common',
                id: 'validationCustom02',
                name: 'validationCustom02',
                label: 'Last name',
                element_type: 'text',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'Last name',
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: null,
                element_max: null,
                element_step: null,
                element_options: {},
                element_options: {
                    default: 'Eduard',
                    fn_change: function (e) {
                        var value = $(e.currentTarget).val();
                        main_alert.clear_message(); main_alert.out_info_message('validationCustom02 : ' + value);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error Last name',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: null,
                group_append_class: null,
                group_append_id: null,
                group_append_html: null,
                form_text: null,
                form_text_class: null,
            },
            childs: []
        };
        var form_input_validationCustomUsername = {
            obj: 'bs_form_input',
            options: {
                validation_group: 'common',
                id: 'validationCustomUsername',
                name: 'validationCustomUsername',
                label: 'Username',
                element_type: 'text',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'Username',
                element_required: false,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: null,
                element_min: null,
                element_max: null,
                element_step: null,
                validation: false, // ! Отключил validation
                feedback_invalid: 'Please choose a username.',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: null,
                group_append_class: null,
                group_append_id: null,
                group_append_html: '@',
                form_text: null,
                form_text_class: null,
            },
            childs: []
        };
        var form_input_validationSelect = {
            obj: 'bs_form_select',
            options: {
                validation_group: 'common',
                id: 'element_select',
                name: 'element_select',
                label: 'element_select',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_multiple: false,
                element_title: null,
                element_required: true,
                element_readonly: false,
                element_size: null,
                element_options: {
                    data: [
                        { value: '1', text: 'PHP', disabled: false },
                        { value: '2', text: 'Java', disabled: true },
                        { value: '3', text: 'C#', disabled: false },
                        { value: '4', text: 'Fortran', disabled: false }
                    ],
                    default: -1,
                    fn_change: function (e) {
                        var value = $(e.currentTarget).val();
                        var text = $(e.currentTarget).text();
                        main_alert.clear_message();
                        main_alert.out_info_message('element_select : ' + value + '-' + text);
                    }.bind(this),
                    fn_check: function (text) {

                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error element_select',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: 'prepend',
                group_prepend_objs: [bt_prepend_sel],
                group_append_class: null,
                group_append_id: null,
                group_append_html: 'append',
                group_append_objs: [bt_append_sel],
                form_text: 'Это help-element_select',
                form_text_class: null,
            },
            childs: []
        };
        var form_input_validationDatalist = {
            obj: 'bs_form_input_datalist',
            options: {
                validation_group: 'common',
                id: 'element_input_datalist_fm',
                name: 'element_input_datalist_fm',
                label: 'element_input_datalist_fm',
                element_fsize: 'sm',
                element_class: 'flexdatalist',
                element_value: null,
                element_title: null,
                element_placeholder: 'placeholder element_input_datalist',
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_options: {
                    data: [
                        { value: '1', text: 'PHP', disabled: false },
                        { value: '2', text: 'Java', disabled: true },
                        { value: '3', text: 'C#', disabled: false },
                        { value: '4', text: 'Fortran', disabled: false }
                    ],
                    out_value: true,
                    default: null,
                    minLength: 1,
                    searchContain: true,
                    fn_change: function (event, set, options) {
                        main_alert.clear_message();
                        main_alert.out_info_message('element_datalist_change value=: ' + set.value + ' text=' + set.text);
                    }.bind(this),
                    fn_select: function (event, set, options) {
                        main_alert.out_info_message('element_datalist_select value=' + set.value + ' label=' + set.label);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error element_input_datalist',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: 'prepend',
                group_prepend_objs: [bt_prepend_dl],
                group_append_class: null,
                group_append_id: null,
                group_append_html: 'append',
                group_append_objs: [bt_append_dl],
                form_text: 'Это help-element_input_datalist',
                form_text_class: null
            },
            childs: []
        };
        var form_input_validationTextarea = {
            obj: 'bs_form_textarea',
            options: {
                validation_group: 'common',
                id: 'element_textarea',
                name: 'element_textarea',
                label: 'element_textarea',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'placeholder element_textarea',
                element_required: true,
                element_maxlength: null,
                element_readonly: false,
                element_cols: null,
                element_rows: 3,
                element_wrap: null,
                element_options: {
                    default: '',
                    fn_change: function (e) {
                        var text = $(e.currentTarget).val();
                        main_alert.clear_message(); main_alert.out_info_message('element_textarea : ' + text);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error-element_textarea',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: 'prepend',
                group_prepend_objs: [bt_prepend_ta],
                group_append_class: null,
                group_append_id: null,
                group_append_html: 'append',
                group_append_objs: [bt_append_ta],
                form_text: 'Это help-element_textarea',
                form_text_class: null
            },
            childs: []
        };
        var form_input_validationDateTime = {
            obj: 'bs_form_input_datetime',
            options: {
                validation_group: 'common',
                id: 'validationDatetime',
                name: 'validationDatetime',
                label: 'DateTime',
                element_type: 'datetime-local',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'First name',
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: "2024-05-05T00:00",
                element_max: "2024-05-15T00:00",
                element_step: null,
                element_options: {
                    default: moment(),
                    format: 'datetime',
                    out_format: 'moment',
                    fn_change: function (e, dt) {
                        var text = $(e.currentTarget).val();
                        main_alert.clear_message();
                        main_alert.out_info_message('validationDatetime text=: ' + text + ' dt=' + dt);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error First name',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: 'prepend',
                group_prepend_objs: [bt_prepend_dt],
                group_append_class: null,
                group_append_id: null,
                group_append_html: 'append',
                group_append_objs: [bt_append_dt],
                form_text: 'Это help-element_input',
                form_text_class: null,
            },
            childs: []
        };
        var form_input_validationDate = {
            obj: 'bs_form_input_datetime',
            options: {
                validation_group: 'common',
                id: 'validationDate',
                name: 'validationDate',
                label: 'Date',
                element_type: 'date',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'First name',
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: null,
                element_max: null,
                element_step: null,
                element_options: {
                    default: moment(),
                    format: 'date',
                    out_format: 'moment',
                    fn_change: function (e, dt) {
                        var text = $(e.currentTarget).val();
                        main_alert.clear_message();
                        main_alert.out_info_message('validationDate text=: ' + text + ' dt=' + dt);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error First name',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                //group_prepend: true,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: 'prepend',
                //group_append: true,
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
        var form_input_validationTime = {
            obj: 'bs_form_input_datetime',
            options: {
                validation_group: 'common',
                id: 'validationTime',
                name: 'validationTime',
                label: 'Time',
                element_type: 'time',
                element_fsize: 'sm',
                element_class: null,
                element_value: null,
                element_title: null,
                element_placeholder: 'First name',
                element_required: true,
                element_maxlength: null,
                element_pattern: null,
                element_readonly: false,
                element_min: null,
                element_max: null,
                element_step: null,
                element_options: {
                    default: moment(),
                    format: 'time',
                    out_format: 'moment',
                    fn_change: function (e, dt) {
                        var text = $(e.currentTarget).val();
                        main_alert.clear_message();
                        main_alert.out_info_message('validationTime text=: ' + text + ' dt=' + dt);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error First name',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 4,
                col_class: null,
                //group_prepend: true,
                group_prepend_class: null,
                group_prepend_id: null,
                group_prepend_html: 'prepend',
                //group_append: true,
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

        var form_input_validationCheck = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common',
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
                element_required: true,
                element_readonly: false,
                element_options: {
                    default: true,
                    fn_change: function (e) {
                        var value = $(e.currentTarget).val();
                        //main_alert.clear_message(); main_alert.out_info_message('validationCustom02 : ' + value);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error-element_check',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 6,
                col_class: null,
                form_text: 'Это help-element_check',
                form_text_class: null
            },
            childs: []
        };
        var form_input_validationCheck1 = {
            obj: 'bs_form_check',
            options: {
                validation_group: 'common',
                id: 'element_check1',
                name: 'element_check1',
                label: 'element_check1',
                element_type: 'checkbox',
                element_switch: false,
                element_inline: false,
                element_class: null,
                element_value: null,
                element_title: null,
                element_checked: false,
                element_required: true,
                element_readonly: false,
                element_options: {
                    default: false,
                    fn_change: function (e) {
                        var value = $(e.currentTarget).val();
                        //main_alert.clear_message(); main_alert.out_info_message('validationCustom02 : ' + value);
                    }.bind(this),
                },
                validation: true,
                feedback_invalid: 'error-element_check',
                feedback_valid: null,
                feedback_class: null,
                col_prefix: 'md',
                col_size: 6,
                col_class: null,
                form_text: 'Это help-element_check',
                form_text_class: null
            },
            childs: []
        };

        col1.childs.push(bt_1);
        col1.childs.push(bt_2);
        col1.childs.push(bt_3);
        row1.childs.push(col1);
        objs.push(row1);
        objs.push(form_input_validationCustom01);
        objs.push(form_input_validationCustom02);
        objs.push(form_input_validationCustomUsername);
        objs.push(form_input_validationSelect);
        objs.push(form_input_validationDatalist);
        objs.push(form_input_validationTextarea);
        objs.push(form_input_validationDateTime);
        objs.push(form_input_validationDate);
        objs.push(form_input_validationTime);
        objs.push(form_input_validationCheck);
        objs.push(form_input_validationCheck1);
        this.form_test_dialog.init({
            alert: main_alert,
            objs: objs,
            id: null,
            form_class: 'row g-3',
            validation: true,
            fn_validation: function (result) {
                // Валидация успешна
                if (result && result.valid) {

                }
            }.bind(this),
            fn_html_init: function (res) { }.bind(this),
            fn_element_init: null,
            fn_init: function (init) {
                row_form.$html.append(this.form_test_dialog.$form);
            }.bind(this),
        });

    });

})(jQuery); // End of use strict