#!/usr/bin/env bash
# Instala o Android SDK mínimo, cria um AVD e sobe o emulador headless.
# Usado pelo job android:emulator do GitLab CI (runner Linux com /dev/kvm).
set -euo pipefail

ANDROID_HOME="${ANDROID_HOME:-/opt/android-sdk}"
API_LEVEL="${ANDROID_API_LEVEL:-34}"
IMAGE="system-images;android-${API_LEVEL};google_apis;x86_64"
AVD_NAME="ci_avd"

if [ ! -e /dev/kvm ]; then
  echo "ERRO: /dev/kvm indisponível. Este job precisa de um runner com virtualização (KVM)." >&2
  exit 1
fi

apt-get update -qq
apt-get install -y -qq openjdk-17-jdk-headless unzip curl libpulse0 libgl1 libnss3 libxcomposite1 libxcursor1 libxi6 libxtst6 > /dev/null

if [ ! -x "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]; then
  mkdir -p "$ANDROID_HOME/cmdline-tools"
  curl -fsSL -o /tmp/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
  unzip -q /tmp/cmdline-tools.zip -d "$ANDROID_HOME/cmdline-tools"
  mv "$ANDROID_HOME/cmdline-tools/cmdline-tools" "$ANDROID_HOME/cmdline-tools/latest"
fi

export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"

yes | sdkmanager --licenses > /dev/null
sdkmanager --install "platform-tools" "emulator" "platforms;android-${API_LEVEL}" "$IMAGE" > /dev/null

echo "no" | avdmanager create avd --force --name "$AVD_NAME" --package "$IMAGE" --device "pixel_6"

nohup emulator -avd "$AVD_NAME" -no-window -no-audio -no-boot-anim -no-snapshot -gpu swiftshader_indirect \
  > /tmp/emulator.log 2>&1 &

adb wait-for-device
echo "Aguardando o boot completo do emulador..."
timeout 600 bash -c 'until [ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d "\r")" = "1" ]; do sleep 5; done'

# Animações desligadas deixam a execução mais estável.
adb shell settings put global window_animation_scale 0
adb shell settings put global transition_animation_scale 0
adb shell settings put global animator_duration_scale 0
adb shell input keyevent 82
echo "Emulador pronto."
