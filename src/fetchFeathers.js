const baseUrl = 'http://localhost:3030';
const ExpressF = {};
const token = localStorage.getItem('token');
const header = {'Content-Type': 'application/json', authorization: `Bearer ${token}`};

ExpressF.getDrivers = () => {
    const url = `${baseUrl}/drivers?employed=1`;
    console.log(token);
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    return fetch(url, fetchOptions).then(response => {
            if(!response.ok){
                return console.log('error');
            }
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.data;
        });
};

ExpressF.getDriver = (driverId) => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/drivers/${driverId}`;
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse;
    });
};

ExpressF.newDriver = (newDriver) => {
    const url = `${baseUrl}/drivers`;
    const fetchOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(newDriver)
    };
    console.log(newDriver);
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return 400;
        }
        return response;
    });
};

ExpressF.updateDriverInfo = (driverId, updatedDriver) => {
    const url = `${baseUrl}/drivers/${driverId}`;
    const fetchOptions = {
        method: 'PATCH',
        headers: header,
        body: JSON.stringify(updatedDriver)
    };
    console.log(updatedDriver);
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return 400;
        }
        return response;
    });
};

// skipped this one
ExpressF.getMostRecentLoads = (driverId, year) => {
    const url = `${baseUrl}/drivers/${driverId}/latestLoads/${year}`;
    return fetch(url).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Request failed')
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
        return jsonResponse.loads[0];
    })
    // return fetch(url).then(response => {
    //     if(!response.ok){
    //         return [];
    //     }
    //     return response.json();
    // }).then(jsonResponse => {
    //     return jsonResponse.loads[0];
    // });
};

ExpressF.getDriverBookedMonthLoads = (driverId, year, month) => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loads?driverId=${driverId}&booked=1&delDate[$like]=${month}____${year}&$sort[puDate]=-1`;
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.data;
    });
};

ExpressF.getDriverBookedYearLoads = (driverId, year) => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loads?driverId=${driverId}&booked=1&delDate[$like]=______${year}&$sort[puDate]=-1`;
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        console.log(jsonResponse.loads);
        return jsonResponse.data;
    });
};

ExpressF.getUnassignedLoads = () => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loads?driverId=1&booked=1`;
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.data;
    });
};

ExpressF.getUnbookedLoads = () => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loads?booked=false`;
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.data;
    });
};

ExpressF.getYearUnbookedLoads = (year) => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loads?booked=0&delDate[$like]=______${year}&$sort[puDate]=-1`;
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.data;
    });
};

ExpressF.getMonthUnbookedLoads = (year, month) => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loads?booked=0&delDate[$like]=${month}____${year}&$sort[puDate]=-1`;
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.data;
    });
};

ExpressF.updateLoad = (loadID, updatedLoad) => {
    const url = `${baseUrl}/loads/${loadID}`;
    const fetchOptions = {
        method: `PUT`,
        headers: header,
        body: JSON.stringify(updatedLoad)
    };
    console.log(updatedLoad);
    console.log(typeof(updatedLoad.driverId));
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return 400;
        }
        return response.json();
    }).then(jsonResponse => {
        console.log(jsonResponse);
    });
};

ExpressF.getYearLoads = (year) => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loadsForCalendar/${year}`
    return fetch(url, fetchOptions).then(response => {
            if(!response.ok){
                return console.log('error');
            }
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.loads;
        });
};

ExpressF.getMonthLoads = (year, month) => {
    const fetchOptions = {
        method: 'GET',
        headers: header
    };
    const url = `${baseUrl}/loadsForCalendar/${year}/${month}`
    return fetch(url, fetchOptions).then(response => {
            if(!response.ok){
                return console.log('error');
            }
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.loads;
        });
};

ExpressF.createLoad = (newLoad) => {
    const url = `${baseUrl}/loads`;
    const fetchOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify(newLoad)
    };
    console.log(fetchOptions);
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return 'error 400';
        }
    });
};

ExpressF.deleteLoad = (loadID) => {
    const url = `${baseUrl}/loads/${loadID}`;
    const fetchOptions = {
        method: 'DELETE',
        headers: header
    };
    return fetch(url, fetchOptions);
};

module.exports = ExpressF;