gpstracker-node
===============

A simple Live GPS Tracker for Node.JS and [OsmAnd](https://play.google.com/store/apps/details?id=net.osmand) clients.

Module Requirements
-------------------

This program requires the following modules to be installed:

```shell
npm install commander
npm install express
npm install log4js
npm install websocket
```

Usage
-----

This simple program tracks a collection of OsmAnd GPS clients and allows for real-time live display of them into a Google Maps interactive display. The program accepts two optional arguments:

```shell
$ node gpstracker.js <portNumber> <clientsConfig>
```

* ```portNumber``` is the HTTP port to use for both static and websocket connections.
* ```clientsConfig``` is the GPS clients meta-data configuration file in JSON format.

**Example:**

```shell
$ node gpstracker.js -p 2227
[2014-11-15 23:57:01.077] [INFO] gpstracker - server listening at http://0.0.0.0:2227
```

Then you start your OsmAnd clients and allow for some updates to be sent via the Internet first. Afterwards you point your favourite HTML5 browser to the server address above and you can watch a real-time live display of all your tracked clients. You can click on any client marker in the map to see detailed tracking data such as position, speed and HDOP.

**Note:** if you plan to run this server behind a proxy such as [nginx](http://nginx.org/) and a custom URL-path, don't forget to adjust the ```WS_URL``` variable accordingly in the ```public/index.html``` file.

GPS Clients Configuration
-------------------------

OsmAnd GPS clients can have meta-data associated such as a name. For this, you must create a JSON file with the following format (see the included ```clients.json``` example file):

```json
{
  "hugo": {"name": "Hugo"},
  "mario": {"name": "Mario"},
  "erik": {"name": "Erik"}
}
```

In this configuration object, the keys correspond to client Ids that you use later when configuring OsmAnd.

OsmAnd Configuration
--------------------

You must configure your OsmAnd clients to provide real-time location information via network (Wi-Fi or mobile data) to the tracking server as follows.

1. Go to "Settings" -> "Plugins".
2. Activate the "Record your trips" plugin.
3. Go to "Settings" -> "Trip recording" (should appear after activating the above plugin).
4. In "Online tracking web address" enter the following URL: ```http://yourserver:port/update?cid=YOURCLIENTID&lat={0}&lon={1}&timestamp={2}&hdop={3}&altitude={4}&speed={5}&bearing={6}```.
5. Configure the update interval to your taste.

After you configure OsmAnd with the above settings, you are ready to go. In the map view (either browsing or navigating) you will see a "GPX" widget. Touch it and select "Start GPX recording", then click the widget again and select "Start online tracking".
