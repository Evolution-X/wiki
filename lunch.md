> **23/02/2024**
> **FROM NOW ON, FOR ANDROID 15, YOU NEED TO DO `lunch lineage_$device-ap4a-$build_type`.**
{.is-danger}

Every time a release will change (E.g changing from ap3a to ap4a) I will update the wiki. If you find out it's not up-to-date, feel free to ping me on discord @onelots.

> Since I will not update the whole wiki every time, I'll use `$release` instead of specifying the actual release.
{.is-info}

**As of Now : Release is :**

![ap4a.png](/ap4a.png)

So commands will be in the form `lunch lineage_$device-ap4a-$build_type`.

# A quick lunch guide.

In this guide, we'll see how to use lunch, how it works and how to setup it properly.
We'll see how to setup a device for building too.

> Please check [Setup Environment](/setting-up-env) before starting. A minimum git knowledge is required.
Besides, make sure the disk you will work on is formatted with **Ext4**.
{.is-warning}

# 1: Unofficial build

When you make an unofficial build (community), you will have to find the sources by yourself, and add it in a `.xml` file.
This file well need to be named following your device's codename.
**During this guide, when I'll talk about `device.xml`, replace `device` with your device's codename, of course...**
In this file, we'll add all the trees we need. It usually depends on the device and the OEM, but you'll generally need :
- The device tree(s)
- The vendor tree(s)
- Kernel sources
- Sometimes, extra dependencies (such as hardware dependencies)

I say tree(s) because sometimes, a device shares commons trees with other devices using the same CPU, for example.

> During all this guide, we'll use Polaris (Xiaomi Mi Mix 2s) as an example.
{.is-info}

> Quick tip: if a device is supported by LineageOs, look into lineage.dependencies, usually everything is in it !
{.is-success}

---

Once you found your trees, let's build our xml.
Here is the classic strucure of a `.xml` (in this case, like I said, for Polaris.)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest>
    <!--Remotes-->
    <remote name="los"            fetch="https://github.com/LineageOS"           revision="lineage-21" />
    <remote name="muppets"        fetch="https://github.com/TheMuppets"          revision="lineage-21" />

    <!--Devices Trees-->
    <project name="android_device_xiaomi_polaris"           path="device/xiaomi/polaris"       remote="los" />
    <project name="android_device_xiaomi_sdm845-common"     path="device/xiaomi/sdm845-common" remote="los" />

    <!--Vendors Tree-->
    <project name="proprietary_vendor_xiaomi_polaris"       path="vendor/xiaomi/polaris"       remote="muppets" />
    <project name="proprietary_vendor_xiaomi_sdm845-common" path="vendor/xiaomi/sdm845-common" remote="muppets" />

    <!--Kernel Tree-->
    <project name="android_kernel_xiaomi_sdm845"            path="kernel/xiaomi/sdm845"        remote="los" />

    <!--Hardware dependencies-->
    <project name="android_hardware_xiaomi"                 path="hardware/xiaomi"             remote="los" />
</manifest>
```

Let's explain what is in here.

```xml
<!--Remotes-->
    <remote name="los"            fetch="https://github.com/LineageOS"           revision="lineage-21" />
    <remote name="muppets"        fetch="https://github.com/TheMuppets"          revision="lineage-21" />
```

These lines tells the `repo sync` command where to look for when syncing dependencies. The remotes are the roots of where `repo sync` will have to look for.

If we look closer at this line for example :
```xml
<project name="android_device_xiaomi_polaris"           path="device/xiaomi/polaris"       remote="los" />
```

We tell the `repo sync` command to clone https://github.com/lineageos/android_device_xiaomi_polaris under the `device/xiaomi/polaris` folder.

---

> `device.xml` will need to be located under .repo/local_manifests/device.xml
{.is-warning}

When your device.xml is written, and in the right directory, simply sync the sources:

```bash
repo sync -c -j$(nproc --all) --force-sync --no-clone-bundle --no-tags
```

And everything will be retrieved. Then you only need to

```bash
lunch lineage_$device-$release-$build_type
```
(Where `$device` is your device's codename and `$build_type` is the build type. There is a paragraph about it at the end of this guide, we'll come back to it later.)

But for Polaris, it would look like
```bash
lunch lineage_polaris-$release-userdebug
```

> If everything went well, `m evolution` will start the build.
{.is-success}

---

# 2: Official Build

Congrats! you are an official maintainer.
Now that you have been granted access to your device's trees, you can setup the automatic lunch.

> When you are an official maintainer, you don't need device.xml anymore since everything will be synced automatically when lunch command is called.
{.is-info}

EvolutionX uses the same system as LineageOs for syncing dependencies automatically without having to rewrite the device.xml every time.

When you become a maintainer, remove the `lineage.dependencies` file and replace it with an `evolution.dependencies` instead in your tree.

Here is the evolution.dependencies for Polaris:

```json
[
  {
    "repository": "device_xiaomi_sdm845-common",
    "target_path": "device/xiaomi/sdm845-common"
  },
  {
    "repository": "vendor_xiaomi_polaris",
    "target_path": "vendor/xiaomi/polaris"
  }
]
```

As you can see, we find only 2 trees instead of 6 in the `polaris.xml`
But as you can see too, there is a `device_xiaomi_sdm845-common` repository.
Looking at the `evolution.dependencies` in this repo, we see that it contains all the trees needed for the devices using the same common tree, so no need to set it up __again__

> In this situation, don't add the trees again ! it will generate a conflict.
{.is-danger}

Of course, it may depend. Always check the `lineage.dependencies`, it will contains all you need.

You can of course setup external repos. exemple with polaris with Xiaomi cam added to it:

```json
[
  {
    "repository": "device_xiaomi_sdm845-common",
    "target_path": "device/xiaomi/sdm845-common"
  },
  {
    "repository": "vendor_xiaomi_polaris",
    "target_path": "vendor/xiaomi/polaris"
  },
  {
    "repository": "ItzDFPlayer/vendor_xiaomi_miuicamera",
    "target_path": "vendor/xiaomi/miuicamera",
    "branch": "leica-5.0",
    "remote": "gitlab"
  }
]
```

As you can see, we find almost the same thing as `polaris.xml`: `repository`, `target_path`, `branch`.
What will change is the `remote`. You have to pick a remote already defined by EvolutionX.

> Remotes are defined by EvolutionX directly, and you can find remotes list [here](https://github.com/Evolution-X/manifest/blob/udc/snippets/evolution.xml).
{.is-info}

When it's done, simply lunch

```bash
lunch lineage_$device-$release-$build_type
```

This command will clone everything for you directly !


> This is explained [here](/onboarding) too.
{.is-success}


# 3: A quick memo about the build args

When lunching, you noticed every time we `lunch lineage_polaris-$release-userdebug`.
Actually, a few more args are available.


| Build Type | Description                                      |
|------------|--------------------------------------------------|
| `user`     | Optimized for end users, with limited access to debugging and development tools. Used for official releases. |
| `userdebug`| Similar to `user` but with additional debugging tools enabled. Used for testing and debugging on near-final builds. Can be used for releases as well. |
| `eng`      | Includes all development tools and debugging options. Used by developers during active development and testing.       |


The different commands would be :

```bash
lunch lineage_polaris-$release-user
```
or

```bash
lunch lineage_polaris-$release-userdebug
```
or
```bash
lunch lineage_polaris-$release-eng
```

> eng build is **NOT** intended for release.
{.is-danger}


When it's done,

```bash
m evolution
```

**and #KeepEvolving!** <img src="/favicons/sfav.png" alt="sitefav" style="width:20px; vertical-align:middle;">
