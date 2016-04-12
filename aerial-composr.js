// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See aerial-composr-tests.js for an example of importing.

let connect = null;

AerialComposr = function (conf) {
  if (conf) {
    this.configured = true;
  }

  if (!connect) {
    connect = new Connect({ config:conf });
  }

  var wCB = Meteor.wrapAsync(function (coll, f) {
    if (!f)
      return function () {};

    return function (/*args*/) {
      var context = this,
          args = arguments;

      if (coll.paused)
        return;

      coll._observeQueue.queueTask(function () {
        f.apply(context, args);
      });
    };
  });

  this.get = (coll, selector, options) => {
    // TODO: transform here the selector for the composr query.

    connect.get(coll.name, selector).then(wCB(coll, (res) => {
      _.each(res[coll.name], (doc) => {
        doc._id = doc.id;
        try {
          coll.insert(doc);
        }
        catch (e) {

          let id = doc._id;
          delete doc._id;

          coll.update(id, doc);
        }
      });
    })).catch((err) => {console.error(err);});
  };
};
