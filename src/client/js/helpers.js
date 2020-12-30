const tripsDelete = () => {
    // Get all trips
    let cards = document.getElementsByClassName('card');
    // Convert HTMLCollection to array
    let trips = [...cards];
    // Remove all trips cards
    trips.forEach((trip) => {
        trip.remove();
    });
}

export {
    tripsDelete
}