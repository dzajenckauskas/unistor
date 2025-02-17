export const stage2Inputs = [
    {label: "First name", name: "firstName", r: true, disabled: true},
    {label: "Last name", name: "lastName", r: false, disabled: true},
    {
        label: "Building number/name",
        name: "buildingnrname",
        r: false,
    },
    {label: "Address line 1", name: "addressLine1", r: false},
    {label: "Address line 2", name: "addressLine2", r: false},
    {label: "Town", name: "town", r: true},
];
export const itemsofstorageandmats = {
    storage: [
        {
            pos: "smallBox",
            name: "Small box",
            price: 0,
            totalName: "box",
        },
        {
            pos: "mediumBox",
            name: "Medium box",
            price: 0,
            totalName: "box",
        },
        {
            pos: "largeBox",
            name: "Large box",
            price: 0,
            totalName: "box",
        },
        {
            pos: "mediumSuitcase",
            name: "Medium suitcase",
            price: 0,
            totalName: "suitcase",
        },
        {
            pos: "largeSuitcase",
            name: "Large suitcase",
            price: 0,
            totalName: "suitcase",
        },
        {
            pos: "bike",
            name: "bike",
            price: 0,
            totalName: "bike",
        },
        {
            pos: "guitar",
            name: "guitar",
            price: 0,
            totalName: "guitar",
        },
        {
            pos: "keyboard",
            name: "keyboard",
            price: 0,
            totalName: "keyboard",
        },
        {
            pos: "tv",
            name: "tv",
            price: 0,
            totalName: "tv",
        },
        {
            pos: "clothesRack",
            name: "Clothes rack",
            price: 0,
            totalName: "rack",
        },
        {
            pos: "ironingBoard",
            name: "Ironing board",
            price: 0,
            totalName: "board",
        },
        {
            pos: "otherSmallItem",
            name: "Small item",
            price: 0,
            totalName: "item",
        },
    ],

    packingMaterials: [
        {
            pos: "mediumBoxEmpty",
            name: "Medium box",
            price: 0,
            totalName: "box",
        },
        {
            pos: "largeBoxEmpty",
            name: "Large box",
            price: 0,
            totalName: "box",
        },
        {
            pos: "packingTape",
            name: "Packing tape",
            price: 0,
            totalName: "tape",
        },
    ],
};
export const times = [
    "08.00 - 18.00",
    "08.00 - 12.00",
    "12.00 - 18.00",
];
export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const weekdays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
];
export const returnDeliveryPerItem = "8.50";
export const postcodeDistancePrice = "35.00";
export const packingMaterialsDeliveryPrice = "8.50";
export const weekendCollectionPrice = 25;

export const coverageprices = [0.25, 0.72];

export const coverageTxt = [
    `Up to £100 coverage (FREE)`,
    `Up to £250 coverage (+£${coverageprices[0]} per box - monthly)`,
    `Up to £500 coverage (+£${coverageprices[1]} per box - monthly)`,
];
export const precollprice = [`FREE`, 25];

export const precolltxt = [
    `Premium collection (from ground floor)`,
    `Premium collection (from doorstep and guaranteed 2 hour timeslot)`,
];
export const prerettxt = [
    `Premium return (to ground floor)`,
    `Premium return (to doorstep and guaranteed 2 hour timeslot)`,
];
export const types = ["All jobs", "In storage", "Returned"];

export const addonstotypes = ["Settings", "Profit", "Referrals"];

export const credentials = {
    company: "Unistor Ltd",
    address: "8 Field Road",
    zip: "UB9 4HL",
    city: "Uxbridge",
    country: "United Kingdom",
};
