/**
 *
 * @param context Instance object
 * @param fn Method to run on the "context"
 * @param done Callback function
 *
 * @author maxleiko
 */
function injectAsync(context, fn, done) {
    // Async flag.
    var async = false;

    // run the method
    var complete = function(success) {
        var err = null;
        if (success === false) {
            // Since false was passed, the method failed generically.
            err = new Error('Method failed.');
        } else if (success instanceof Error || {}.toString.call(success) === '[object Error]') {
            // An error object was passed, so the method failed specifically.
            err = success;
            success = false;
        } else {
            // The task succeeded.
            success = true;
        }

        done(err, success);
    }.bind(this);

    context.async = function() {
        async = true;
        // The returned function should execute asynchronously in case
        // someone tries to do this.async()(); inside a method (WTF).
        return function(success) {
            process.nextTick(function () {
                delete context.async;
                complete(success);
            });
        };
    };

    try {
        // Run method
        fn.call(context);
        // If the async flag wasn't set, remove async mixin and complete method
        if (!async) {
            delete context.async;
            complete(true);
        }
    } catch (err) {
        complete(err);
    }
}

module.exports = injectAsync;