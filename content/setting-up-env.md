# Setting up Environments to build Evolution X

This guide is for __Linux Users__ targeting Ubuntu 22.04 LTS users.

> Make sure you have the appropriate performance requirements to build Android !
Minimum requirements for A14 are : 12 cores, 64Gb of RAM and 64 bit system.
{.is-warning}

> This guide has been tested to work on WSL 2 Ubuntu 24.04.1 LTS
{.is-info}


**Don't wanna go thru hassles? Introduce [akhilnarang's script](https://github.com/akhilnarang/scripts) repository.**
**This method is the fastest one.**

```bash
sudo apt install git curl ccache
```
```bash
git clone https://github.com/akhilnarang/scripts; cd scripts; sudo bash setup/android_build_env.sh
```
after you've done these commands you can skip to [Step 3](#h-3-make-a-folder-and-initialize-repo)

---------------------------------------

## 1: Setting up a build environment! ##

> Android builds are typically done on Ubuntu LTS (like 22.04), which has the necessary tools. A 64-bit system architecture and CPU are required for building Android
{.is-info}


## 2: Installing required packages ##

A 64-bit version of Ubuntu (22.04 is recommended as of now because of LTS).

```bash
sudo apt-get update && sudo apt-get install git git-lfs gnupg flex bison gperf libsdl1.2-dev libesd0-dev squashfs-tools build-essential zip curl ccache libncurses5-dev zlib1g-dev openjdk-11-jre openjdk-11-jdk pngcrush schedtool libxml2 libxml2-utils xsltproc lzop libc6-dev schedtool g++-multilib lib32z1-dev lib32ncurses5-dev gcc-multilib maven tmux screen w3m ncftp rsync libssl-dev
```

If you face a problem while installing libesd0-dev package, follow the steps from [this Stack Overflow post](https://askubuntu.com/questions/1082722/unable-to-locate-package-libesd0-dev-on-ubuntu-18-04#)

You can install those packages instead: `libncurses5 curl python-is-python3`

## 3: Make A Folder And Initialize Repo ##

This will create a folder under `/home/$user` (your current user)
Change it to your convenience.

```bash
cd && mkdir evo && cd evo
```

```bash
repo init -u https://github.com/Evolution-X/manifest -b vic --git-lfs
```
```bash
repo sync -c -j$(nproc --all) --force-sync --no-clone-bundle --no-tags
```

> You can find EvolutionX's manifest [right here](https://github.com/Evolution-X/manifest)
{.is-info}


## 4: Source the Build Environment

Run this command to load the necessary tools required for building.

```bash
. build/envsetup.sh
```

> You can add this in your `.bashrc` to automatically run it:
>
> ```bash
> echo 'cd evo && source build/envsetup.sh && cd' >> ~/.bashrc
> ```
>
{.is-info}

## 5: The Keys. ##

> Without this, your build won't be able to pass DEVICE or BASIC integrity.
Remember to **BACKUP** your keys !
{.is-danger}

### First case: Unofficial Build: ###

If you are an unofficial builder, there is a [script](https://github.com/Evolution-X/vendor_evolution-priv_keys-template) that will generate the keys for you. Simply execute:

```bash
croot && git clone https://github.com/Evolution-X/vendor_evolution-priv_keys-template vendor/evolution-priv/keys
cd vendor/evolution-priv/keys
```

```bash
./keys.sh
```

#### Second case: Official Build: ###

This will need you to be logged in git on your server.

```bash
croot && git clone https://github.com/Evolution-X/vendor_evolution-priv_keys vendor/evolution-priv/keys
```

> If any of you leak this, whether that be intentionally, or on accident, you will be removed from the project and never allowed back. So, if you use a shared server, be careful, otherwise it could very well mean the end of your time at Evolution X
{.is-warning}

## 6: Building ##

### A: Note for official maintainers
> Skip this part if you are not an official maintainer.
{.is-danger}

In the case where you are an official maintainer, please remember to set up the build type !

```bash
export EVO_BUILD_TYPE=Official
```

In order to set it up, you only have to
To make sure it's applied every time, you can add it at the end of your `~/.bashrc` file:

```bash
echo 'export EVO_BUILD_TYPE=Official' >> ~/.bashrc
source ~/.bashrc
```

Then keep reading this.

### B: For official and unofficial maintainers

---

```bash
lunch lineage_$device-$release-userdebug
```

> Kindly visit [the lunch page](/lunch) to learn about the lunch command.
{.is-info}

Using Sargo as an example, building AP4A release, the command would be `lunch lineage_sargo-ap4a-userdebug`.

When the device is lunched, simply execute
```bash
m evolution
```
And the build will start.

---

> That's all you need to do! You're good to compile the build and #KeepEvolving!
{.is-success}


**Reference**
* [AOSP](https://source.android.com/setup/build/initializing)
