# Sofa Alarm

This application was built to yell at my dog on my
behalf, in the event that she decides to sleep on the
sofa in our absence. It consists of the following parts:

1. [EvoCam][1], a webcam application that features
   motion detection and is highly scriptable
2. A node app that monitors a designated Philips
   Hue bulb for a "magic" brightness and temperature.

When the Hue bulb changes to the magic setting, the
node app will arm the webcam, and then disarms the
webcam when the bulb changes or is turned off.

Evocam will monitor a webcam pointed at the sofa. It
has a motion-detection region that will fire only when
it is clear that the dog is on the couch, which will
trigger a recording of my voice, and capture a [video][2].

[1]: http://www.evological.com/evocam.html
[2]: https://www.youtube.com/watch?v=GaH4lPxcmxY