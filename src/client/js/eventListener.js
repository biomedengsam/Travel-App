import $ from "jquery";
function data() {
    let tripsArray = localStorage.getItem('trips')
        ? JSON.parse(localStorage.getItem('trips'))
        : []
    console.log('trips array');
    console.log(tripsArray);
    localStorage.setItem('trips', JSON.stringify(tripsArray))
    const data = JSON.parse(localStorage.getItem('trips'))
    console.log('data');
    console.log(data);

    const trip = (text) => {
        const p = document.createElement('p')
        p.textContent = text.destination
        $('#myTrips').append(p)
    }
    function ui() {
        if (data.length > 1) {
            data.forEach((item) => {
                trip(item);
            })
        } else {
            trip(data);

        }
    }
    ui();
}


// i have to do the below function it with event listener
function enterApp() {
    $("#landing").css("transform", "translate(-200vw)");
    $("#dimmed-bg").css("visibility", "visible");
    $("#dimmed-bg").css("transform", "translate(0)");
    // $("#above-fold").css("opacity", "1");
    $("#full-site").css("visibility", "visible");
    $("#full-site").css("overflow", "visible");
    $("#full-site").css("animation", "2s content");
    $("#full-site").css("max-height", "auto");
    data();


    // $("#register-side-bar").css("transform", "translate(0)");
}

export {
    enterApp
}