# Reporting a bug
Aaaaah, bugs. Yes, it is annoying. But how to fight against it ?

> Disclaimer: 99% of the time, **we are aware of the bugs.**
Kindly check your XDA thread/telegram group before reporting it to your maintainer.
{.is-warning}

> **PLEASE AVOID SPAMMING.** It will only lead to your ban.
{.is-danger}

## I've found a bug ! What should I do ?

Here is a list of things you can do before rushing to talk with your maintainer on Discord, XDA...

- Check the **Q&A section** of the website.
- Check your device's group chat (XDA Thread, Discord server, telegram group or whatever)
- Check on internet if it's not a common issue wiht known fixes.
- Try to fix the issue by yourself.


## I've done what is said above, but no one reported it yet...

Okay, maybe your bug is unknow. You should report it to your maintainer obviously, but there is a way to do so !

> Maintainers need real **bugs report**, not just **complaints**.
{.is-success}

If you want to please your maintainer, here is how you should make a bug report.

1. - You will need to write the description of the bug.
2. - Please include the procedure of reproducing of it.
3. - If possible, provide the error link.
4. - If you don't have an error link, provide an `adb logcat` and upload it on our [paste server](https://paste.evolution-x.org).

> Tip: when an application crashes, you can get a **log link** ! Actually, the crash log will be sent to our server to make the bug report easier.
{.is-info}
---

**How can I take a logcat?**

You can use ADB to record a logcat by using the command
```bash
adb logcat -d
```

Alternatively you can use the [syslog](https://play.google.com/store/apps/details?id=com.tortel.syslog&hl=en_US) app.

## Example bug report format

Bug description: `<write the description of the bug here>`
How to reproduce: `<write the method of reproducing the bug here>`
Logcat: `<upload your logcat to our `[paste server](https://paste.evolution-x.org) `and paste the link here>`
Screenshots: `<you can attach screenshots to the bug report>`

## Why do I need to keep the bug reporting rules?
It is **way easier** for the developer and for other users as well, to see your bug report organized and not just a complaint.
This way the developer will be able to implement a solution to the bug you found and other users won't re-report the bug.

---

![keepevolving.png](/keepevolving.png)
