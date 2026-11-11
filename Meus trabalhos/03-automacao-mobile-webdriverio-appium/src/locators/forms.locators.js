export const FORMS = {
  input: '~text-input',
  inputResult: '~input-text-result',
  switch: '~switch',
  switchText: '~switch-text',
  dropdown: '~Dropdown',
  // O valor selecionado fica no campo de texto interno do dropdown.
  dropdownValue: {
    android: 'android=new UiSelector().resourceId("text_input")',
    ios: '-ios class chain:**/*[`name == "Dropdown"`]/**/*[`name == "text_input"`]',
  },
  dropdownOption: (text) => ({
    android: `android=new UiSelector().resourceId("android:id/text1").text("${text}")`,
    ios: '-ios class chain:**/XCUIElementTypePickerWheel',
  }),
  dropdownDone: { ios: '~done_button' },
  activeButton: '~button-Active',
  inactiveButton: '~button-Inactive',
};
