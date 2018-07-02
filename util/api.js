const HOST = 'https://fitnessdev.shapejoy.com/api/';

const dataToUrl = (data) => {
    let params = '';
    for( let item in data){
        if (typeof data[item] == 'object') {
            data[item].map((ele) => {
                params += `&${item}=${ele}`;
            })
        } else {
            params += `&${item}=${data[item]}`;
        }
    }
    params.split('').slice(1).join('');
    return params;
}

const ajax = (url, method, data, callBack) => {
    url = HOST + url;
    if(data.id){
        url += `/${data.id}`;
    }else {
        if (method == 'GET') {
            url += '?' + dataToUrl(data);
        }
    }
    return fetch(url, {
        method,
        headers: {
            "x-fit-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDMiLCJpc3MiOiJTVFNZRU0iLCJleHAiOjE1MzEyOTcwOTB9.TR6BSChshc_DF611xD7U5jIyro_yTnb70c9lm_GPSRg",
            "content-type":"application/json;charset=UTF-8;"
        },
        body: method == 'POST' ? JSON.stringify(data) : ''
    }).then(res => res.json()).then(res=>{
        callBack && callBack(res)
    }).catch(err => {
        console.log(JSON.stringify(err));
    })
}

const GET = (url, callBack, data = {}) => {
    return ajax(url, 'GET', data, callBack)
}

const POST = (url, data, callBack) => {
    return ajax(url, 'POST', data, callBack)
}

const PUT = (url, data, callBack) => {
    return ajax(url, 'PUT', data, callBack)
}

const DELETE = (url, data, callBack) => {
    return ajax(url, 'DELETE', data, callBack)
}

const api = {
    getStatic(dispath) {
        return GET('storage/wechat/accesstoken', (res)=> {
            dispath({
                type: "CHANGE_STATIC",
                data: res
            })
        })
    },
    getCourses(data, callBack) {
        GET('courses', callBack, data)
    },
    getSeries(callBack) {
        GET('courses/series', callBack)
    },
    FavoritesApi(method, callBack, data = {}) {
        ajax('favorites', method, data, callBack)
    },
    getCategory(data, callBack) {
        GET('courses/category', callBack, data)
    },
    getCourseClassify(data, callBack) {
        GET('courses/classify', callBack, data)
    },
}


export default api;
