let vaccine_centers = [{
    "id": 1,
    "name": "Bukit Batok CC",
}, {
    "id": 2,
    "name": "Bukit Panjang CC",
}, {
    "id": 3,
    "name": "Bukit Timah CC",
}, {
    "id": 4,
    "name": "Outram Park Polyclinic",
}];
module.exports.vaccine_centers = vaccine_centers;

let bookings = [{
    "id": 1,
    "nric": "1",
    "name": "Tan Ah Kow",
    "vaccine_center_id": 1,
    "slot": "2021-10-10 10:00:00"
}, {
    "id": 2,
    "nric": "2",
    "name": "Jean Lee Ah Meow",
    "vaccine_center_id": 1,
    "slot": "2021-10-10 11:00:00"
}, {
    "id": 3,
    "nric": "3",
    "name": "Lew Ah Boi",
    "vaccine_center_id": 2,
    "slot": "2021-10-10 10:00:00"
}, {
    "id": 4,
    "nric": "4",
    "name": "Yoyo",
    "vaccine_center_id": 3,
    "slot": "2021-10-10 10:00:00"
}];
module.exports.bookings = bookings;
