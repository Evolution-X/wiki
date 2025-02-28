# Installing Evolution X

> This guide provides **basic** instructions for installing our ROM. **Always check** your device's [XDA thread](https://xdaforums.com) for specific exceptions.
{.is-warning}

## 1: First time install

### Downloading the ROM ###

Since 08/2024, we support vanilla builds (without gapps) but it's up to the maintainer. Be careful and download the correct package !

---

To get started, you will need to download the ROM for your device. It is important to download the correct build for your device.

> Do not flash builds for other devices, it will brick your device!
{.is-danger}

You can download the ROM zip from various sources.

- [<img src="/favicons/sfav.png" alt="sitefav" style="width:20px; vertical-align:middle;"> EvolutionX's website](https://evolution-x.org/downloads)
- [<img src="/favicons/sfav.svg" alt="sitefav" style="width:20px; vertical-align:middle;"> EvolutionX's SourceForge](https://sourceforge.net/projects/evolution-x/files/)
- [<img src="/favicons/sfav.png" alt="sitefav" style="width:20px; vertical-align:middle;"> EvolutionX's Mirror](https://evolution-x.org/) (Currently under test)

You will need to know your **device model** or **codename** to find the correct build.
To do so, you can visit our website and check if your device is available.

> If you can't find your device, it doesn't mean that no one did it outside EvoX . It's called an "Unofficial build" and it may work. That said, we won't provide any support for it.
{.is-info}

### Selecting the correct vendor ###

> Note that Google apps and services (gapps) are already included !

Check the XDA thread of your device to find the required vendor or firmware for the ROM and download it.
The softwares needed will **always** be highlighted on XDA.

### Flashing the ROM ###
After having downloaded the correct ROM build and vendor/firmware zip file, we can proceed with the flashing process. Boot your device into recovery mode, and wipe data, cache and system using our recovery.

Flash the required vendor/firmware and the downloaded ROM build. Reboot to system and enjoy the ROM.

*The first bootup could take some additional time*

> Once again, the instructions provided here are **only for reference**; you should **ALWAYS** follow the instructions on the XDA thread.
{.is-warning}

> Since our new website (available [here](https://evolution-x.org/downloads)), instructions are given for each device. Please check it if you want to know how to flash the rom for your device !
{.is-success}

### Rooting your device ###

There are many ways to root a device, and we won't provide support for it. That said, the more used methods are :

- [Magisk](https://github.com/topjohnwu/Magisk)
- Apatch
- [Kernel SU](https://kernelsu.org/)

> Each method can be supported, or may not be ! Always ask people having the same device as you.
{.is-info}

## 2: Updating EvolutionX

> As usual, **Always** check what your device's group/XDA thread says about it.
Sometimes, **updates may break your system** so stay tuned when an update is out.
{.is-warning}

### 1: OTA Updates

EvolutionX has a built-in OTA update system. This means that when an update is out, it'll come directly in your settings with a notification, like if it was an "official" update (like if OnePlus or Xiaomi deployed one)

To update via OTA, please follow the following tutorial.

![ota_updates.png](/guides/ota_updates.png)

### 2: Update via ADB

*Here, we assume you have [adb drivers](https://www.xda-developers.com/install-adb-windows-macos-linux/) installed on your computer.*

---

Simply download the ROM package from the source you want.
Then:

1. Reboot to recovery
2. Select "Apply update"
3. Tap "Apply from ADB"

Then plug your phone to your computer, and simply execute this command:

```bash
adb sideload YourZipFile.zip
```

Now, you just have to wait for the sideload to complete.
Follow the instructions displayed on the screen, depending on the device, it could propose you to update the recovery at the same time.

> Depending on the build type, the sideload can be "stuck" but it's **normal** !
• A userdebug build will stop around 47%
• A user build will stop around 97%
{.is-success}

### 3: Update from internal storage

Depending on the device, you may have the "Update from internal storage" option while updating from **bootloader**.

If you want to do so, put the zip file on your sd card, and select this build after clicking "Update from internal storage"

The rom will update itself like with ADB.

# Do not relock your bootloader !

We know it can be tempting, you may want to do it since you've seen the option in developer settings.
Right, NO. **DO NOT.**

## DO NOT RELOCK YOUR BOOTLOADER. Not with EvolutionX on it.

Only a few roms (GrapheneOs for example) and only a few devices (some pixels, and some oneplus) are able to do this safely. Otherwise you will only brick your device, and it'll be a REALLY COMPLICATED situation.

> Please, never re-lock your bootloader while being on EvoX. You'll lose your device forever.
{.is-danger}
