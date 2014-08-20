function getPhoneGapPath() {
    'use strict';
    var path = window.location.pathname;
    var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
    return phoneGapPath;
};

$(document).on("pagecreate", "#notificationpage", function (event) {

    alertDismissed = function () {
    }

    $("#alertLink").on("click", function (e) {
        navigator.notification.alert('You did the alert!', // message
            alertDismissed, // callback
            'Alert Demo', // title
            'Done' // buttonName
        );
        e.preventDefault();
    });

    onConfirm = function (button) {
        alert('You selected button ' + button);
    }

    // Show a custom confirmation dialog
    //
    $("#confirmLink").on("click", function (e) {
        navigator.notification.confirm(
            'You did the confirm!',  // message
            onConfirm,              // callback to invoke with index of button pressed
            'Confirm Demo',            // title
            'Restart,Exit'          // buttonLabels
        );
        e.preventDefault();
    });

    $("#beepLink").on("click", function () {
        navigator.notification.beep(2);
    });

    $("#vibrationLink").on("click", function () {
        navigator.notification.vibrate(2000);
    });

});

$(document).on("pagecreate", "#devicepage", function (event) {

    //load up device info as a string
    var s = "";
    s += "Device Name: " + device.name + "<br/>";
    s += "Phonegap Version: " + device.phonegap + "<br/>";
    s += "Platform: " + device.platform + "<br/>";
    s += "UUID: " + device.uuid + "<br/>";
    s += "OS Version: " + device.version + "<br/>";

    $("#content", this).html(s);

});

$(document).on("pagecreate", "#connectionpage", function (event) {

    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';

    var s = "";
    s = "Connection Type: " + states[networkState] + "<br/>";

    $("#content", this).html(s);

});

$(document).on("pagecreate", "#accelerometerpage", function (event) {
    var page = $("#accelerometerpage");
    var watchID = null;

    onCurrentSuccess = function (acceleration) {
        var s = 'Acceleration X: ' + acceleration.x + '<br/>' +
            	'Acceleration Y: ' + acceleration.y + '<br/>' +
            	'Acceleration Z: ' + acceleration.z + '<br/>' +
            	'Timestamp: ' + new Date(acceleration.timestamp) + '<br/>';
        $("#status", page).html(s);
    };

    function onAccError() {
        $("#status", page).html("An error with the accelerometer. Sorry");
    };

    $("#currentLink").on("click", function (e) {
        $("#status", page).html("Getting accelerometer...<br/>");
        navigator.accelerometer.getCurrentAcceleration(onCurrentSuccess, onAccError);
        e.preventDefault();
    });

    $("#startTrackingLink").on("click", function (e) {
        $("#status", page).html("Tracking began...<br/>");
        watchID = navigator.accelerometer.watchAcceleration(onCurrentSuccess, onAccError, {frequency: 1000});
        e.preventDefault();
    });

    $("#stopTrackingLink").on("click", function (e) {
        $("#status", page).html("Tracking stopped...<br/>");
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
        e.preventDefault();
    });


});

$(document).on("pagecreate", "#compasspage", function (event) {
    var page = $("#compasspage");
    var watchCompassID = null;

    onCurrentCompassSuccess = function (heading) {
        var s = 'Magnetic Heading: ' + heading.magneticHeading
            + '<br/> True Heading:  ' + heading.trueHeading
            + '<br/> Heading Accuracy: ' + heading.headingAccuracy
            + '<br/> Heading Timestamp: ' + heading.timestamp;
        $("#status", page).html(s);
    };

    function onCompassError() {
        $("#status", page).html("An error with the compass. Sorry");
    };

    $("#currentLink", page).on("click", function (e) {
        $("#status", page).html("Getting compass...<br/>");
        navigator.compass.getCurrentHeading(onCurrentCompassSuccess, onCompassError);
        e.preventDefault();
    });

    $("#startTrackingLink", page).on("click", function (e) {
        $("#status", page).html("Tracking began...<br/>");
        watchCompassID = navigator.compass.watchHeading(onCurrentCompassSuccess, onCompassError);
        e.preventDefault();
    });

    $("#stopTrackingLink", page).on("click", function (e) {
        $("#status", page).html("Tracking stopped...<br/>");
        if (watchCompassID) {
            navigator.compass.clearWatch(watchCompassID);
            watchCompassID = null;
        }
        e.preventDefault();
    });


});

$(document).on("pagecreate", "#geolocationpage", function (event) {
    var page = $("#geolocationpage");
    var watchGeoID = null;

    onCurrentGeoSuccess = function (position) {

        var s = 'Latitude: ' + position.coords.latitude + '<br/>' +
            'Longitude: ' + position.coords.longitude + '<br/>' +
            'Altitude: ' + position.coords.altitude + '<br/>' +
            'Accuracy: ' + position.coords.accuracy + '<br/>' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br/>' +
            'Heading: ' + position.coords.heading + '<br/>' +
            'Speed: ' + position.coords.speed + '<br/>' +
            'Timestamp: ' + new Date(position.timestamp) + '<br/>';

        $("#status", page).html(s);
    };

    onGeoError = function () {
        $("#status", page).html("An error with the geolocation. Sorry");
    };

    $("#currentLink", page).on("click", function (e) {
        $("#status", page).html("Getting location...<br/>");
        navigator.geolocation.getCurrentPosition(onCurrentGeoSuccess, onGeoError);
        e.preventDefault();
    });

    $("#startTrackingLink", page).on("click", function (e) {
        $("#status", page).html("Tracking began...<br/>");
        watchGeoID = navigator.geolocation.watchPosition(onCurrentGeoSuccess, onGeoError);
        e.preventDefault();
    });

    $("#stopTrackingLink", page).on("click", function (e) {
        $("#status", page).html("Tracking stopped...<br/>");
        if (watchGeoID) {
            navigator.geolocation.clearWatch(watchGeoID);
            watchGeoID = null;
        }
        e.preventDefault();
    });


});

$(document).on("pagecreate", "#contactpage", function (event) {
    var page = this;

    $("#createContactLink").on("click", function (e) {
        $("#status", page).html("Creating a contact...<br/>");
        var contact = navigator.contacts.create({
            "displayName": "Random Dude" + Math.floor(Math.random() * 100)
        });
        contact.save();
        $("#status", page).html("Done. Made " + contact.displayName + ".<br/>");

        e.preventDefault();
    });

    contactError = function () {
        $("#status", page).html("An error with the contact search. Sorry");
    };

    contactSuccess = function (contacts) {
        var s = "";

        s = "Found " + contacts.length + " contacts...<br/>";
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];

            if (contact.photos && contact.photos.length) {
                for (var z = 0; z < contact.photos.length; z++) {
                    if (contact.photos[z].type == "url" && contact.photos[z].value.length > 0) {
                        s += "<img src='" + contact.photos[z].value + "' align='left'>";
                        break;
                    }
                }
            }

            s += "<h2>" + contact.displayName + "</h2>";

            if (contact.phoneNumbers && contact.phoneNumbers.length) {
                for (var z = 0; z < contact.phoneNumbers.length; z++) {
                    s += "<b>" + contact.phoneNumbers[z].type + ":</b> " + contact.phoneNumbers[z].value + "<br/>";
                }
            }

            s += "<br clear='left'><p/>";

        }

        $("#status", page).html(s);

    };

    $("#contactsearch").on("click", function (e) {
        var searchterm = $.trim($("#contactname").val());
        if (searchterm == "") return;
        $("#status", page).html("Searching contacts...<br/>");
        var fields = ["*"];
        var options = new ContactFindOptions();
        options.filter = searchterm;
        options.multiple = true;

        navigator.contacts.find(fields, contactSuccess, contactError, options);
        e.preventDefault();
    });

});

$(document).on("pagecreate", "#camerapage", function (event) {
    var page = this;


    onCamSuccess = function (imageData) {
        var image = $("#camImg")[0];
        image.src = "data:image/jpeg;base64," + imageData;
    };

    onCamError = function () {
        $("#status", page).html("An error with the camera. Sorry");
    };

    $("#newPicLink").on("click", function (e) {
        navigator.camera.getPicture(onCamSuccess, onCamError, {sourceType: Camera.PictureSourceType.CAMERA, destinationType: Camera.DestinationType.DATA_URL, quality: 50, targetWidth: 200, targetHeight: 200});
        e.preventDefault();
    });

    $("#existingPicLink").on("click", function (e) {
        navigator.camera.getPicture(onCamSuccess, onCamError, {sourceType: Camera.PictureSourceType.PHOTOLIBRARY, destinationType: Camera.DestinationType.DATA_URL, quality: 50, targetWidth: 200, targetHeight: 200});
        e.preventDefault();
    });

});

//Credit for a lot of this logic goes to @Jagautier, Julian Gautier. I had a REAL hard
//time with the deferred stuff and he helped quite a bit.
$(document).on("pagecreate", "#capturepage", function (event) {
    var page = this;

    var deferredTask = function (mediafile) {
        var dfd = $.Deferred();
        mediafile.getFormatData(function (r) {
            dfd.resolve(r)
        });
        return dfd.promise();
    };

    onCaptureSuccess = function (mediaFiles) {
        var dTasks = [];
        var results = [];
        var s = "";
        $("#status", page).html(s);

        for (var i = 0; i < mediaFiles.length; i++) {
            var mf = mediaFiles[i];
            (function (mf) {
                dTasks.push(deferredTask(mf).then(function (data) {
                    var topData = {
                        media: mf,
                        data: data
                    };
                    results.push(topData);
                }));
            })(mf);
        }

        $.when.apply(null, dTasks).done(function () {
            s += results.length + ' media items captured.<p/>';
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                s += results[i].media.fullPath + ' [' + result.media.size + ']<br/>';
                //will always be now, but show it anyway
                s += new Date(result.media.lastModifiedDate) + '<br/>';
                s += 'Mime: ' + results.type + '<br/>';
                //format stuff
                s += 'Bitrate: ' + result.data.bitrate + '<br/>';
                s += 'Height: ' + result.data.height + '<br/>';
                s += 'Width: ' + result.data.width + '<br/>';
                s += 'Duration: ' + result.data.duration + '<br/>';
                s += '<p/>';
            }
            $("#status", page).html(s);
        });


    };

    onCaptureError = function () {
        $("#status", page).html("An error with the capture. Sorry");
    };

    $("#captureAudioLink").on("click", function (e) {
        navigator.device.capture.captureAudio(onCaptureSuccess, onCaptureError, {});
        e.preventDefault();
    });

    $("#capturePictureLink").on("click", function (e) {
        navigator.device.capture.captureImage(onCaptureSuccess, onCaptureError, {limit: 2});
        e.preventDefault();
    });

    $("#captureVideoLink").on("click", function (e) {
        navigator.device.capture.captureVideo(onCaptureSuccess, onCaptureError, {});
        e.preventDefault();
    });

});

$(document).on("pagecreate", "#mediapage", function (event) {
    var page = this;
    var mediaStatus;

    mediaSuccess = function () {
    }

    mediaError = function (error) {
        alert('Media Error: ' + error.message);
    }

    var myMedia = new Media(getPhoneGapPath() + 'media/midnight-ride.mp3', mediaSuccess, mediaError);

    $("#mediaplayLink").on("click", function (e) {
        myMedia.play();
        mediaStatus = setInterval(function () {
            myMedia.getCurrentPosition(
                function (position) {
                    if (position > -1) $("#status", page).html("Second " + position + " of " + myMedia.getDuration() + " seconds.");

                })
        }, 1000);
        e.preventDefault();
    });
    $("#mediapauseLink").on("click", function (e) {
        myMedia.pause();
        e.preventDefault();
    });
    $("#mediastopLink").on("click", function (e) {
        $("#status", page).html("");
        clearInterval(mediaStatus);
        myMedia.stop();
        e.preventDefault();
    });


});

$(document).on("pagecreate", "#storagepage", function (event) {
    var page = this;
    var db = window.openDatabase("mydb", "1.0", "Mega Demo", 1000000);
    var dbReady = false;

    populate = function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS dblog(message,timestamp)');
    }

    dbErrorHandler = function (err) {
        alert("Database Error: [" + err.code + "] " + err.message);
    }

    dbReadyHandler = function () {
        dbReady = true;
    }

    //always run populate
    db.transaction(populate, dbErrorHandler, dbReadyHandler);

    showLog = function (tx, results) {
        var s = "<p>There are " + results.rows.length + " rows in the table so far.</p>";
        for (var i = 0; i < results.rows.length; i++) {
            s += results.rows.item(i).message + " at time " + results.rows.item(i).timestamp + "<br>";
        }
        $("#status", page).html(s);
    }

    //Note, we are going to check dbReady status here and handle it,
    //but in theory it would be better to simply disable the buttons and then
    //renable them. It happens so quick though I don't think it matter.
    $("#storageShowLink").on("click", function (e) {
        if (!dbReady) {
            alert("Database not quite ready - try again...");
            return;
        }
        db.transaction(function (tx) {
            tx.executeSql("select message, timestamp from dblog order by timestamp desc", [], showLog, dbErrorHandler);
        }, dbErrorHandler);
        e.preventDefault();
    });

    $("#storageAddLink").on("click", function (e) {
        if (!dbReady) {
            alert("Database not quite ready - try again...");
            return;
        }
        db.transaction(function (tx) {
            var msg = "Some random message: " + Math.floor(Math.random() * 100);
            tx.executeSql("insert into dblog(message,timestamp) values(?,?)", [msg, new Date()]);
            $("#status", page).html("A new row was inserted.");
        }, dbErrorHandler);
        e.preventDefault();
    });

});

$(document).on("pagecreate", "#barcodepage", function (event) {
    $("#scan-code").on("click", function (e) {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("Scanned Code: " + result.text
                    + ". Format: " + result.format
                    + ". Cancelled: " + result.cancelled);
            }, function (error) {
                alert("Scan failed: " + error);
            });
    });

    $("#encode-text").on("click", function (e) {
        cordova.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.TEXT_TYPE,
            "This text was encoded",
            function (success) {
                alert("Encode success: " + success);
            }, function (fail) {
                alert("Encoding failed: " + fail);
            });
    });

    $("#encode-email").on("click", function (e) {
        cordova.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.EMAIL_TYPE,
            "surname.name@gmail.com", function (success) {
                alert("Encode success: " + success);
            }, function (fail) {
                alert("Encoding failed: " + fail);
            });
    });

    $("#encode-phone").on("click", function (e) {
        cordova.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.PHONE_TYPE,
            "777 77 77", function (success) {
                alert("Encode success: " + success);
            }, function (fail) {
                alert("Encoding failed: " + fail);
            });
    });

    $("#encode-sms").on("click", function (e) {
        cordova.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.SMS_TYPE,
            "An important message for someone", function (success) {
                alert("Encode success: " + success);
            }, function (fail) {
                alert("Encoding failed: " + fail);
            });
    });
});

$(document).on("pagecreate", "#remotedatapage", function (event) {
    var page = this;

    $("#getDataLink").on("click", function (e) {
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            {
                tags: "mount hotham",
                tagmode: "any",
                format: "json"
            }, function (data) {
                $.each(data.items, function (i, item) {
                    $("<img/>").attr("src", item.media.m).appendTo("#images");
                    if (i == 3) return false;
                });
            });
    });


});
var iabRef = null;

function changeBackgroundColor() {
    iabRef.insertCSS({
        code: "body { background: #ffff00}"
    }, function() {
        alert("Styles Altered");
    });
} 

function replaceHeaderImage() {
    iabRef.executeScript({
        code: "var img=document.querySelector('#header img'); img.src='http://cordova.apache.org/images/cordova_bot.png';"
    }, function() {
        alert("Image Element Successfully Hijacked");
    });
}

function iabClose(event) {
     alert("Closing inAppBrowser");
     iabRef.removeEventListener('loadstop', changeBackgroundColor);
     iabRef.removeEventListener('loadstop', replaceHeaderImage);
     iabRef.removeEventListener('exit', iabClose);
}

$(document).on("pagecreate", "#splashscreenpage", function (event) {
    $("#splashScreenButton").on("click", function (e) {
        navigator.splashscreen.show();
        setTimeout(function() {navigator.splashscreen.hide();}, 3000);
    });
});

$(document).on("pagecreate", "#inappbrowserpage", function (event) {
    
    $("#inAppInsertCss").on("click", function (e) {
         iabRef = window.open('http://apache.org', '_blank', 'location=yes');
         iabRef.addEventListener('loadstop', changeBackgroundColor);
         iabRef.addEventListener('exit', iabClose);  
    });

    $("#inAppExecScript").on("click", function (e) {
         iabRef = window.open('http://apache.org', '_blank', 'location=yes');
         iabRef.addEventListener('loadstop', replaceHeaderImage);
         iabRef.addEventListener('exit', iabClose);    
     });
});

$(document).on("pagecreate", "#childbrowserpage", function (event) {
    $("#childBrShowWebPage").on("click", function (e) {
        window.plugins.childBrowser.showWebPage('http://edition.cnn.com/', { showLocationBar: true });
        
        window.plugins.childBrowser.onLocationChange = function (url) {
            alert('childBrowser has loaded ' + url);
        };
        
        window.plugins.childBrowser.onClose = function () {
            alert('Closing ChildBrowser');
            window.plugins.childBrowser.onLocationChange = null;
            window.plugins.childBrowser.onClose = null;
        };

    });
});


var backbuttonFunction;


$(document).on("pagehide", "#eventpage", function (event) {
    document.removeEventListener("backbutton", backbuttonFunction, false);
    document.removeEventListener("menubutton", menubuttonFunction, false);
    document.removeEventListener("searchbutton", searchbuttonFunction, false);
    //not removing pause,resume,offline,online purposively
});

//Todo - I may want to deregister the event handlers on page exit
$(document).on("pagecreate", "#eventpage", function (event) {
    var page = this;

    backbuttonFunction = function () {
        $("#status", page).append("Back button clicked.<br/>");
    }
    menubuttonFunction = function () {
        $("#status", page).append("Menu button clicked.<br/>");
    }
    searchbuttonFunction = function () {
        $("#status", page).append("Search button clicked.<br/>");
    }
    pauseFunction = function () {
        $("#status", page).append("Pause event.<br/>");
    }
    resumeFunction = function () {
        $("#status", page).append("Resume event.<br/>");
    }
    offlineFunction = function () {
        $("#status", page).append("Offline event.<br/>");
    }
    onlineFunction = function () {
        $("#status", page).append("Online event.<br/>");
    }


    document.addEventListener("backbutton", backbuttonFunction, false);
    document.addEventListener("menubutton", menubuttonFunction, false);
    document.addEventListener("searchbutton", searchbuttonFunction, false);

    document.addEventListener("pause", pauseFunction, false);
    document.addEventListener("resume", resumeFunction, false);

    document.addEventListener("offline", offlineFunction, false);
    document.addEventListener("online", onlineFunction, false);

});
