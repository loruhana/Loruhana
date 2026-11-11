// Alerta nativo (AlertDialog no Android, XCUIElementTypeAlert no iOS).
export const ALERT = {
  title: {
    android: 'id=com.wdiodemoapp:id/alert_title',
    ios: '-ios class chain:**/XCUIElementTypeAlert/**/XCUIElementTypeStaticText[1]',
  },
  message: {
    android: 'id=android:id/message',
    ios: '-ios class chain:**/XCUIElementTypeAlert/**/XCUIElementTypeStaticText[2]',
  },
  okButton: {
    android: 'id=android:id/button1',
    ios: '~OK',
  },
};
