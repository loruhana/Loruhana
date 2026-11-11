# Binários do app

Os binários não são versionados. Baixe a release oficial do
[native-demo-app](https://github.com/webdriverio/native-demo-app/releases/tag/v2.2.0) e salve aqui:

| Plataforma | Arquivo da release | Salvar como |
|---|---|---|
| Android | `android.wdio.native.app.v2.2.0.apk` | `apps/android.wdio.native.app.apk` |
| iOS Simulator | `ios.simulator.wdio.native.app.v2.2.0.zip` (descompactar) | `apps/ios.simulator.wdio.native.app.app` |

Sem o `.apk`, a configuração Android abre o app já instalado no dispositivo
(`com.wdiodemoapp`). Caminhos alternativos: `ANDROID_APP_PATH` e `IOS_APP_PATH`.
