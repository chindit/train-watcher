type Connection = {
    alerts: {
        number: number,
        alert: Array<String>,
    },
    arrival: {
        arrived: Boolean,
        canceled: Boolean,
        delay: number,
        direction: {
            name: String,
        },
        platform: String,
        platforminfo: {
            name: String,
            normal: String,
        },
        station: String,
        stationinfo: {
            id: String,
            locationX: number,
            locationY: number,
            name: String,
            standardname: String,
        },
        time: number,
        vehicle: String,
        vehicleinfo: {
            locationX: number,
            locationY: number,
            name: String,
            shortname: String,
            type: String,
        },
        walking: number,
    },
    departure: {
        canceled: Boolean,
        delay: number,
        departureConnection: String,
        direction: {
            name: String,
        },
        left: number,
        platform: 2,
        platforminfo: {
            name: String,
            normal: String,
        },
        station: String,
        stationinfo: {
            id: String,
            locationX: number,
            locationY: number,
            name: String,
            standardname: String,
        },
        time: number,
        vehicle: String,
        vehicleinfo: {
            locationX: number,
            locationY: number,
            number: number,
            name: String,
            shortname: String,
            type: String,
        },
        walking: number,
        remarks: {
            number: number,
            remark: Array<String>
        }
    }
}