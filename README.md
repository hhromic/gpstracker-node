# gpstracker-node

A simple Live GPS Tracker for Node.js and [OsmAnd](https://play.google.com/store/apps/details?id=net.osmand) clients.

## Installation

To install, use `npm`:

```shell
$ npm install -g gpstracker-node
```

## Usage

This simple program tracks a collection of OsmAnd GPS clients and allows for real-time live display of them into a Google Maps interactive display. The program accepts two optional arguments:

```shell
$ gpstracker -p <portNumber> -c <clientsConfig>
```

* `portNumber` is the HTTP port to use for both static and web socket connections (default: 2223).
* `clientsConfig` is the GPS clients meta-data configuration file in JSON format (default: clients.json).

**Example:**

```shell
$ gpstracker -p 2227 -c examples/clients.json
[2014-11-15 23:57:01.077] [INFO] app - started app server on http://0.0.0.0:2227
```

Then you start your OsmAnd clients and allow for some updates to be sent via the Internet first. Afterwards you point your favourite HTML5 browser to the server address above and you can watch a real-time live display of all your tracked clients. You can click on any client marker in the map to see detailed tracking data such as position, speed and HDOP.

## GPS Clients Configuration

OsmAnd GPS clients can have meta-data associated such as a name. For this, you must create a JSON file with the following format (see the included `examples/clients.json` example file):

```json
{
  "hugo": {"name": "Hugo"},
  "mario": {"name": "Mario"},
  "erik": {"name": "Erik"}
}
```

In this configuration object, the keys correspond to client Ids that you use later when configuring OsmAnd.

## OsmAnd Configuration

You must configure your OsmAnd clients to provide real-time location information via network (Wi-Fi or mobile data) to the tracking server as follows.

1. Go to "Settings" -> "Plugins".
2. Activate the "Record your trips" plugin.
3. Go to "Settings" -> "Trip recording" (should appear after activating the above plugin).
4. In "Online tracking web address" enter the following URL: `http://yourserver:port/update?cid=YOURCLIENTID&lat={0}&lon={1}&timestamp={2}&hdop={3}&altitude={4}&speed={5}&bearing={6}`.
5. Configure the update interval to your taste.

After you configure OsmAnd with the above settings, you are ready to go. In the map view (either browsing or navigating) you will see a "GPX" widget. Touch it and select "Start GPX recording", then click the widget again and select "Start online tracking".
