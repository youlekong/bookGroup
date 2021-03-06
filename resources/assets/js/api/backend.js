
import * as endpoint from './endpoint.js';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start();
    return config;
}, function (error) {
    NProgress.start();
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done();
    return response;
}, function (error) {
    let statusCode = error.response.status;
    if (statusCode == 401)
        app.$router.push({name: 'login'});

    // 对响应错误做点什么
    NProgress.done();
    return Promise.reject(error);
});

function _serialize (data) {
    return Object.keys(data).map( (keyName) => {
        return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName])
    }).join('&')
}

// 登录
export function apiLogin(params) {
    return axios.post(endpoint.login, params).then(res => {
        return res.data;
    });
}

// 登出
export function apiLogout() {
    return axios.get(endpoint.logout).then(function (res) {
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}

// 检测
export function apiCheckStatus() {
    return axios.get(endpoint.checkStatus).then(function(res) {
        return res.data;
    })
}

// index
export function apiGetSysInfo() {
    return axios.get(endpoint.getSysInfo).then(function (res) {
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}

// user
export function apiGetUsers(params) {
    return axios.get(endpoint.getUsers, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateUser(params) {
    return axios.post(endpoint.createUser, params).then( res => {
        return res.data;
    });
}

export function apiUpdateUser(params) {
    return axios.post(endpoint.updateUser, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteUser(params) {
    return axios.get(endpoint.deleteUser, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// book
export function apiGetBooks(params) {
    return axios.get(endpoint.getBooks, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateBook(params) {
    return axios.post(endpoint.createBook, params).then( res => {
        return res.data;
    });
}

export function apiUpdateBook(params) {
    return axios.post(endpoint.updateBook, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteBook(params) {
    return axios.get(endpoint.deleteBook, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// 书籍类别
export function apiGetBookCates(params) {
    return axios.get(endpoint.getBookCates, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateBookCate(params) {
    return axios.post(endpoint.createBookCate, params).then( res => {
        return res.data;
    });
}

export function apiUpdateBookCate(params) {
    return axios.post(endpoint.updateBookCate, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteBookCate(params) {
    return axios.get(endpoint.deleteBookCate, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiGetAllBookCate() {
    return axios.get(endpoint.getAllBookCates).then(function (res) {
        return res.data;
    })
}

// 书籍评论
export function apiGetBookComments(params) {
    return axios.get(endpoint.getBookComments, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// export function apiCreateBookComment(params) {
//     return axios.post(endpoint.createBookComment, params).then( res => {
//         return res.data;
//     });
// }

// export function apiUpdateBookComment(params) {
//     return axios.post(endpoint.updateBookComment, params).then(function (res) {
//         return res.data;
//     })
// }

export function apiDeleteBookComment(params) {
    return axios.get(endpoint.deleteBookComment, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// 文章
export function apiGetArticles(params) {
    return axios.get(endpoint.getArticles, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateArticle(params) {
    return axios.post(endpoint.createArticle, params).then( res => {
        return res.data;
    });
}

export function apiUpdateArticle(params) {
    return axios.post(endpoint.updateArticle, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteArticle(params) {
    return axios.get(endpoint.deleteArticle, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// 文章评论
export function apiGetArticleComments(params) {
    return axios.get(endpoint.getArticleComments, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiDeleteArticleComment(params) {
    return axios.get(endpoint.deleteArticleComment, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// 书圈
export function apiGetGroups(params) {
    return axios.get(endpoint.getGroups, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateGroup(params) {
    return axios.post(endpoint.createGroup, params).then( res => {
        return res.data;
    });
}

export function apiUpdateGroup(params) {
    return axios.post(endpoint.updateGroup, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteGroup(params) {
    return axios.get(endpoint.deleteGroup, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}


// 书籍类别
export function apiGetGroupCates(params) {
    return axios.get(endpoint.getGroupCates, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateGroupCate(params) {
    return axios.post(endpoint.createGroupCate, params).then( res => {
        return res.data;
    });
}

export function apiUpdateGroupCate(params) {
    return axios.post(endpoint.updateGroupCate, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteGroupCate(params) {
    return axios.get(endpoint.deleteGroupCate, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

export function apiGetAllGroupCate() {
    return axios.get(endpoint.getAllGroupCates).then(function (res) {
        return res.data;
    })
}

// 活动
export function apiGetActivities(params) {
    return axios.get(endpoint.getActivities, {
        params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateActivity(params) {
    return axios.post(endpoint.createActivity, params).then( res => {
        return res.data;
    });
}

export function apiUpdateActivity(params) {
    return axios.post(endpoint.updateActivity, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteActivity(params) {
    return axios.get(endpoint.deleteActivity, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// 租赁
export function apiGetRentals(params) {
    return axios.get(endpoint.getRentals, {
        params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateRental(params) {
    return axios.post(endpoint.createRental, params).then( res => {
        return res.data;
    });
}

export function apiUpdateRental(params) {
    return axios.post(endpoint.updateRental, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteRental(params) {
    return axios.get(endpoint.deleteRental, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}

// 分享
export function apiGetShares(params) {
    return axios.get(endpoint.getShares, {
        params
    }).then(function (res) {
        return res.data;
    })
}

export function apiCreateShare(params) {
    return axios.post(endpoint.createShare, params).then( res => {
        return res.data;
    });
}

export function apiUpdateShare(params) {
    return axios.post(endpoint.updateShare, params).then(function (res) {
        return res.data;
    })
}

export function apiDeleteShare(params) {
    return axios.get(endpoint.deleteShare, {
        params: params
    }).then(function (res) {
        return res.data;
    })
}