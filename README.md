# Sofa Alarm

This application was built to yell at my dog on my
behalf, in the event that she decides to sleep on the
sofa in our absence. It is essentially an [EvoCam][1]
configuration file that will trigger a [video capture][2]
when motion is sensed on the surface of the couch.

The alarm can be integrated into a HomeKit configuration
using the [HomeBridge][3] platform, and the simple
[AppleScript plug-in][4] that I wrote.

[1]: http://www.evological.com/evocam.html
[2]: https://www.youtube.com/watch?v=GaH4lPxcmxY
[3]: https://github.com/nfarina/homebridge
[4]: https://github.com/dansays/homebridge-applescript