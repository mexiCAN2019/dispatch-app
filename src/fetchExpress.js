// const baseUrl = 'http://localhost:5000';
const baseUrl = 'http://dispatchapi.elementbalance.com';
const Express = {};



Express.getDrivers = () => {
    const url = `${baseUrl}/drivers`
    return fetch(url).then(response => {
            if(!response.ok){
                return console.log('error');
            }
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.drivers;
        });
};

Express.getDriver = (driverID) => {
    const url = `${baseUrl}/drivers/${driverID}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.driver[0];
    });
};

Express.newDriver = (newDriver) => {
    const url = `${baseUrl}/drivers`;
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({driver: newDriver})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return 400;
        }
        return response;
    });
};

Express.updateDriverInfo = (driverID, updatedDriver) => {
    const url = `${baseUrl}/drivers/${driverID}`;
    const fetchOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({driver: updatedDriver})
    };
    console.log(updatedDriver);
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return 400;
        }
        return response;
    });
};

Express.getMostRecentLoads = (driverId, year) => {
    const url = `${baseUrl}/drivers/${driverId}/latestLoads/${year}`;
    return fetch(url).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Request failed')
    }, networkError => {
        console.log(networkError.message);
    }).then(jsonResponse => {
        if(!jsonResponse) return;
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

Express.getDriverBookedMonthLoads = (driverID, year, month) => {
    const url = `${baseUrl}/drivers/${driverID}/bookedLoads/${year}/${month}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.loads;
    });
};

Express.getDriverBookedYearLoads = (driverID, year) => {
    const url = `${baseUrl}/drivers/${driverID}/bookedLoads/${year}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        console.log(jsonResponse.loads);
        return jsonResponse.loads;
    });
};

Express.getUnassignedLoads = () => {
    const url = `${baseUrl}/unassignedLoads`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.loads;
    });
};

Express.getUnbookedLoads = () => {
    const url = `${baseUrl}/unbookedLoads`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.loads;
    });
};

Express.getYearUnbookedLoads = (year) => {
    const url = `${baseUrl}/unbookedLoads/${year}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.loads;
    });
};

Express.getMonthUnbookedLoads = (year, month) => {
    const url = `${baseUrl}/unbookedLoads/${year}/${month}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.loads;
    });
};

Express.updateLoad = (loadID, updatedLoad) => {
    const url = `${baseUrl}/loads/${loadID}`;
    const fetchOptions = {
        method: `PUT`,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({load: updatedLoad})
    };
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok){
            return 400;
        }
        return response;
    });
};

Express.getYearLoads = (year) => {
    const url = `${baseUrl}/loadsForCalendar/${year}`
    return fetch(url).then(response => {
            if(!response.ok){
                return console.log('error');
            }
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.loads;
        });
};

Express.getMonthLoads = (year, month) => {
    const url = `${baseUrl}/loadsForCalendar/${year}/${month}`
    return fetch(url).then(response => {
            if(!response.ok){
                return console.log('error');
            }
            return response.json();
        }).then(jsonResponse => {
            return jsonResponse.loads;
        });
};

Express.createLoad = (newLoad) => {
    const url = `${baseUrl}/loads`;
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({load: newLoad})
    };
    console.log(fetchOptions);
    return fetch(url, fetchOptions).then(response => {
        if(!response.ok) {
            return 'error 400';
        }
    });
};

Express.deleteLoad = (loadID) => {
    const url = `${baseUrl}/unbookedLoads/${loadID}`;
    const fetchOptions = {
        method: 'DELETE'
    };
    return fetch(url, fetchOptions);
};

//Data stuff
Express.getRateAverage = () => {
    const url = `${baseUrl}/bookedRateAverage`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.average[0].averageRate;
    });
};

Express.getYearRateAverage = (year, reloadLoad) => {
    const url = `${baseUrl}/bookedRateAverage/${year}/${reloadLoad}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.average[0];
    });
};

Express.getMonthRateAverage = (year, month, reloadLoad) => {
    const url = `${baseUrl}/bookedRateAverage/${year}/${month}/${reloadLoad}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.average[0];
    });
};

Express.getDriverYearRateAverage = (year, reloadLoad, driverID) => {
    const url = `${baseUrl}/bookedRateAverage/${year}/${reloadLoad}/driver/${driverID}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.average[0];
    });
};

Express.getDriverMonthRateAverage = (year, month, reloadLoad, driverID) => {
    const url = `${baseUrl}/bookedRateAverage/${year}/${month}/${reloadLoad}/driver/${driverID}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.average[0];
    });
};

Express.getYearRateSum = (year, reloadLoad) => {
    const url = `${baseUrl}/bookedRateSum/${year}/${reloadLoad}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.sum[0];
    });
};

Express.getMonthRateSum = (year, month, reloadLoad) => {
    const url = `${baseUrl}/bookedRateSum/${year}/${month}/${reloadLoad}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.sum[0];
    });
};

Express.getDriverYearRateSum = (year, reloadLoad, driverID) => {
    const url = `${baseUrl}/bookedRateSum/${year}/${reloadLoad}/driver/${driverID}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.sum[0];
    });
};

Express.getDriverMonthRateSum = (year, month, reloadLoad, driverID) => {
    const url = `${baseUrl}/bookedRateSum/${year}/${month}/${reloadLoad}/driver/${driverID}`;
    return fetch(url).then(response => {
        if(!response.ok){
            return [];
        }
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.sum[0];
    });
};

module.exports = Express;