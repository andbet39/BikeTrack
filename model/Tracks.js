/*Tracks = new FS.Collection("tracks", {
    stores: [
        new FS.Store.GridFS("original")
    ]
});

if (Meteor.isServer) {
    /*Tracks.allow({
        insert: function (userId) {
            return (userId ? true : false);
        },
        remove: function (userId) {
            return (userId ? true : false);
        },
        download: function () {
            return true;
        },
        update: function (userId) {
            return (userId ? true : false);
        }
    });

    Meteor.publish('tracks', function() {
        return Tracks.find({});
    });
}*/