import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";

export const LocaleStringsModel = types
  .model("LocaleStrings")
  .props({
    "app-name": types.string,
    value: types.string,
    label: types.string,
  })
  .props({
    common_button_ok: types.string,
    common_button_cancel: types.string,
    common_button_yes: types.string,
    common_button_no: types.string,
  })
  .props({
    "welcome_new-file": types.string,
    welcome_open: types.string,
    welcome_recents: types.string,
    "welcome_recents-clear": types.string,
  })
  .props({
    header_display: types.string,
    "header_display_show-all": types.string,
    header_display_headfoot: types.string,
    header_display_content: types.string,
  })
  .props({
    toolbar_file: types.string,
    toolbar_file_save: types.string,
    "toolbar_file_save-as": types.string,
    "toolbar_file_auto-save": types.string,
    toolbar_file_export: types.string,
    toolbar_file_close: types.string,
    toolbar_start: types.string,
    toolbar_start_undo: types.string,
    toolbar_start_redo: types.string,
    "toolbar_start_edit-meta": types.string,
    toolbar_view: types.string,
    "toolbar_view_one-page": types.string,
    "toolbar_view_two-page": types.string,
    toolbar_about: types.string,
    toolbar_about_help: types.string,
    toolbar_about_preference: types.string,
  })
  .props({
    footer_sizer: types.string,
    "footer_sizer_fit-width": types.string,
    "footer_sizer_fit-height": types.string,
  })
  .props({
    modal_meta: types.string,
    modal_meta_title: types.string,
    modal_meta_subtitle: types.string,
    modal_meta_author: types.string,
    modal_meta_mark: types.string,
    modal_about: types.string,
    modal_about_license: types.string,
    modal_about_issues: types.string,
    modal_about_releases: types.string,
    modal_about_help: types.string,
    modal_about_content: types.string,
    modal_about_special: types.string,
    modal_preference: types.string,
    modal_preference_theme: types.string,
    modal_preference_language: types.string,
    "modal_preference_export-scale": types.string,
    modal_preference_auto: types.string,
    modal_export: types.string,
    modal_export_path: types.string,
    modal_export_name: types.string,
    modal_export_ext: types.string,
    modal_sure: types.string,
    modal_sure_message: types.string,
  })
  .props({
    "notification_save-fail": types.string,
    "notification_export-success": types.string,
  });

export type LocaleStringsInstance = Instance<typeof LocaleStringsModel>;
export type LocaleStringsSnapshotIn = SnapshotIn<typeof LocaleStringsModel>;
export type LocaleStringsSnapshotOut = SnapshotOut<typeof LocaleStringsModel>;
