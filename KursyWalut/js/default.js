// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.oncheckpoint = function (args) {
        //Przed susppendem co zrobić dla całego programu
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };


    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }


            // Zapisujemy dane które były zachowane po suspendzie do previousExecutionState aby funkcje przywracające miały do nich dostęp
            // Save the previous execution state. 
            WinJS.Application.sessionState.previousExecutionState = args.detail.previousExecutionState;

            //jeżeli byłsuspend i jest historia to ją odczytuje czyli zapisuje sobie
            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }

            //kieruje do strony która była odpalona
            //lub jeśli nie była do aliasu home który jest w pliku .html
            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    app.start();
})();
