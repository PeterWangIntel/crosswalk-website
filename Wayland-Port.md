It's very important to understand that we are dealing with three projects here: Ozone-Wayland, Chromium and Crosswalk. Ozone-Wayland is the Wayland specific implementation of Chromium's Aura UI framework, and Crosswalk should be a consumer only of these two projects. 

At the moment the crosswalk-project/ozone-wayland repository is private to crosswalk-project group (https://github.com/crosswalk-project/ozone-wayland) , but once we get the open-source PDT approval then we'll be open to the general public. Therefore, **all the information concerning Crosswalk, tasks, priorities and Intel specific should be kept on this wiki, while the ones targeting more general development of Ozone-Wayland will go there, if not in Chromium upstream wiki**.

# Roadmap

* M2: Sep 20th: "wake-up" only
* M3: Nov  1st: 1st mobile release.
* M5: Jan 31st: Crosswalk/Wayland running with Tizen 3.0

# Ozone-Wayland tasks:

All tasks should be coordinated with Tiago Vignatti and Kalyan Kondapally.

  * https://github.com/crosswalk-project/ozone-wayland/issues?state=open

# Crosswalk tasks

All tasks should be coordinated with Caio, DS and Joone.

* Port Crosswalk to Chromium TiT
  * Ozone-Wayland and Chromium Aura Ozone are beind developed while you're reading this :)
  * therefore, Crosswalk Chromium's should be ported to TiT before starting any work on porting it to Wayland.
  * task estimation: 1, 2 weeks
  * ONGOING: Tiago, Caio and Raphael.

* build Tizen packages of Xwalk
  * It's a good practice to start building the whole infrastructure now
  * Tizen IVI seems a nice target
  * task estimation: simple ???

# Tasks completed

* Submit first batch to upstream review:
  * https://github.com/tiagovignatti/misc/tree/master/chromium
  * Intel's ACL with Tiago as a contributor (DONE by Tiago).
  * contact Google lead developers (DONE by Tiago)
  * waiting Google's response how to proceed (Done by Tiago)
  * DONE by Tiago (July 2013)

* native events conversion to Wayland
  * most of the code is there already within the first batch of patches, but in practice content_shell is not receiving the native input events properly.
  * task estimation:  1 or 2 weeks.
  * DONE by Tiago (21 Jun 2013)