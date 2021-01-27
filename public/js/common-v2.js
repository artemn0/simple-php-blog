Vue.component('post', {
	props: ['post'],
	template: '<div class="w3-panel">'+
            '<div class="w3-card w3-display-container">'+
               '<div class="w3-container w3-theme w3-center"><p>{{ post.title }}</p></div>'+
                '<div class="w3-panel">'+
                    '<div v-html="post.text" class="post-text">{{ post.text }}</div>'+
                    '<div class="w3-panel">'+
                        '<span style="float: left;" class="creation-info w3-padding"><a class="link w3-text-theme" data-type="author" v-bind:data-author-id="post.authorId">{{ post.authorNick }}</a> {{ post.created }}</span>'+
                        '<div class="" style="float: right;">'+
                            '<a class="w3-button w3-theme-action w3-hover-theme" v-if="post.readMore" data-type="post" v-bind:data-post-id="post.id">Читать полностью</a>'+
                            '<a class="w3-button w3-theme-action w3-hover-theme" data-type="like" v-bind:data-post-id="post.id">{{ post.likes }} <i class="fas fa-thumbs-up" data-type="like" v-bind:data-post-id="post.id"></i></a>'+
                            '<a class="w3-button w3-theme-action w3-hover-theme" data-type="dislike" v-bind:data-post-id="post.id">{{ post.dislikes }} <i class="fas fa-thumbs-down" data-type="dislike" v-bind:data-post-id="post.id"></i></a>'+
                            '<a class="w3-button w3-theme-action w3-hover-theme" href="#up"><i class="fas fa-arrow-up"></i></a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
});

Vue.component('sidebar-post', {
    props: ['post'],
    template: '<div>'+
        '<div class="w3-border-bottom">'+
            '<a class="link w3-text-theme" data-type="post" v-bind:data-post-id="post.id">{{ post.title }}</a><br> '+
        '</div>'+
        '<div class="creation-info">'+
            '<a class="link w3-text-theme" data-type="author" v-bind:data-author-id="post.authorId">{{ post.authorNick }}</a>'+
            '{{ post.created }}'+
            '<br><br>'+
       ' </div>'+
    '</div>'
});

Vue.component('paginator', {
    props: ['page'],
    template: '<a v-bind:class="page.class" data-type="page" v-bind:data-page="page.id">{{ page.text }}</a>'
});

Vue.component('login', {
    template: '<div>'+
        '<div class="w3-col s12 m1 l2"><p></p></div>'+
        '<div class="w3-col s12 m4 l4">'+
        '<div class="w3-panel">'+
            '<div class="w3-card">'+
                '<div class="w3-container w3-theme w3-center"><p>Войти</p></div>'+
                '<div class="w3-panel w3-center">'+
                    '<div class="w3-panel">'+
                        '<input id="login" minlength="3" maxlength="20" style="width: 100%; max-width: 100%;" placeholder="Логин" />'+
                    '</div>'+
                    '<div class="w3-panel">'+
                        '<input id="password" type="password" minlength="3" maxlength="20" style="width: 100%; max-width: 100%;" placeholder="Пароль" />'+
                    '</div>'+
                    '<div class="w3-panel w3-center">'+
                        '<input data-type="login" type="submit" class="w3-button w3-theme-action w3-hover-theme" value="Отправить"></input>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="w3-col s12 m1 l2"><p></p></div>'+
</div>'
});

Vue.component('registration', {
    template: '<div>'+
    '<div class="w3-col s12 m1 l2"><p></p></div>'+
    '<div class="w3-col s12 m4 l4">'+
        '<div class="w3-panel">'+
            '<div class="w3-card">'+
                '<div class="w3-container w3-theme w3-center"><p>Регистрация</p></div>'+
                '<div class="w3-panel w3-center">'+
                    '<div class="w3-panel">'+
                        '<input id="login" minlength="5" maxlength="20" style="width: 100%; max-width: 100%;" placeholder="Логин" />'+
                    '</div>'+
                    '<div class="w3-panel">'+
                        '<input id="email" minlength="3" maxlength="30" style="width: 100%; max-width: 100%;" placeholder="Email" type="email" />'+
                    '</div>'+
                    '<div class="w3-panel">'+
                        '<input id="password" type="password" minlength="8" maxlength="20" style="width: 100%; max-width: 100%;" placeholder="Пароль, не менее 8 символов" />'+
                    '</div>'+
                    '<div class="w3-panel">'+
                        '<input id="password_repeat" type="password" minlength="8" maxlength="20" style="width: 100%; max-width: 100%;" placeholder="Повторите пароль" />'+
                    '</div>'+
                    '<div class="w3-panel w3-center">'+
                        '<input data-type="registration" type="submit" class="w3-button w3-theme-action w3-hover-theme" value="Отправить"></input>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="w3-col s12 m1 l2"><p></p></div>'+
</div>'
});

Vue.component('contacts', {
    template: '<div>'+
    '<div class="w3-col s12 m1 l2"><p></p></div>'+
    '<div class="w3-col s12 m4 l4">'+
        '<div class="w3-panel">'+
            '<div class="w3-card">'+
                '<div class="w3-container w3-theme w3-center"><p>Контакты</p></div>'+
                '<div class="w3-panel">Для связи с администрацией вы можете отправить нам сообщение: <br>'+
                    'Telegram, Viber: +380**-***-**-** <br>'+
                    'Email: <a class="link w3-text-theme" href="mailto:mail@mail.ru">mail@mail.ru</a>'+
                '</div>'+
                '<div class="w3-panel"><!-- space --></div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div class="w3-col s12 m1 l2"><p></p></div>'+
</div>'
});

Vue.component('write', {
    template: '<div class="w3-col s12 m6 l8">'+
        '<div class="w3-panel">'+
            '<div class="w3-card">'+
                '<div class="w3-container w3-theme w3-center"><p>Написать в свой блог</p></div>'+
                '<div class="w3-panel w3-center">'+
                    '<div class="w3-panel w3-center">'+
                        '<input class="" id="post_title" minlength=5 maxlength=200 style="width: 100%; max-width: 100%;" placeholder="Заглавие поста" />'+
                    '</div>'+
                    '<div class="w3-panel w3-center">'+
                        '<textarea class="" id="post" minlength=50 maxlength=10000 rows=10 cols=100 style="width: 100%; max-width: 100%;" placeholder="Текст поста..."></textarea>'+
                    '</div>'+
                    '<div class="w3-panel w3-center">'+
                        '<button class="w3-margin-top w3-button w3-theme-action w3-hover-theme markbuttons" onclick="mixedmark('+'b'+')">B</button>'+
                        '<button class="w3-margin-top w3-button w3-theme-action w3-hover-theme markbuttons" onclick="mixedmark('+'i'+')">I</button>'+
                        '<button class="w3-margin-top w3-button w3-theme-action w3-hover-theme markbuttons" onclick="mixedmark('+'u'+')">U</button>'+
                        '<button class="w3-margin-top w3-button w3-theme-action w3-hover-theme markbuttons" onclick="mixedmark('+'s'+')">S</button>'+
                        '<button class="w3-margin-top w3-button w3-theme-action w3-hover-theme markbuttons" onclick="mixedmark('+'img'+')">IMG</button>'+
                    '</div>'+
                    '<div class="w3-panel w3-center">'+
                        '<input type="submit" class="w3-button w3-theme-action w3-hover-theme" data-type="write" value="Отправить" />'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'
});

Vue.component('theme-selector', {
    props: ['theme'],
    template: '<button class="w3-bar-item w3-button w3-theme-d5 w3-hover-theme" v-bind:title="theme.name" data-type="changeTheme" v-bind:data-theme="theme.name"><i class="fas fa-palette" v-bind:title="theme.name" data-type="changeTheme" v-bind:data-theme="theme.name"></i> {{ theme.name }}</button>'
});

function setCookie(cookieName,cookieValue,daysToExpire) {
    var date = new Date();
    date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}
function getCookie(cookieName) {
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for(var i=0; i<allCookieArray.length; i++) {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name)==0)
            return temp.substring(name.length,temp.length);
    }
    return "";
}

function showMessage(message) {
    app.message = message;
    document.getElementById('message').style="display: block;";
}

function hideMessage() {
    document.getElementById('message').style="display: none;";
}

function mixedmark(arg) {
    var d = document.getElementById('post');
    var v = d.value;

    var start, end, cursor;
    start = "["+arg+"]";
    end = "[/"+arg+"]";
    cursor = d.selectionEnd+start.length;

    d.value = v.slice(0, d.selectionStart) + start + v.slice(d.selectionStart, d.selectionEnd) + end + v.slice(d.selectionEnd);
    if(d.createTextRange) {
        var r = d.createTextRange();
        r.move('character', cursor);
        r.select();
    }
    if(d.selectionStart) {
        d.setSelectionRange(cursor, cursor);
    }

    var arr = document.getElementsByClassName('markbuttons');
    for(var i = 0; i < arr.length; i++) {
        arr[i].blur();
    }

    d.focus();
}

var app = new Vue({
	el: '#app',
	data: {
        init: false,
		loading: true,
        showPaginator: false,
        pageType: 'main',
        year: 0,
        newPosts: [],
        popularPosts: [],
		posts: [],
        pages: [],
        message: ""
	}
});

var header = new Vue({
    el: '#header',
    data: {
        isAuth: false,
        themes: [
            {id: 1, name: 'blue'},
            {id: 2, name: 'orange'},
            {id: 3, name: 'amber'},
            {id: 4, name: 'black'},
            {id: 5, name: 'blue-grey'},
        ]
    }
});

var endpoint = "api.php";
var responseObject, jsonRpcId = 1, jsonRpcLastProcessedId = 0, requests = [];
var config = {
    per_page: 10,
    token: null,
    current_page: 1,
    current_author: 0
};

req = null;
if (window.XMLHttpRequest) {
    try {
        req = new XMLHttpRequest();
    } catch (e){}
} else if (window.ActiveXObject) {
    try {
        req = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e){
        try {
            req = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e){}
    }
}

function jsonRpcCall(method, params) {
    if(req) {
        var reqArray = {jsonrpc: "2.0", id: jsonRpcId, method: method, params: params};
        req.open("POST", endpoint, true);
        req.onreadystatechange = jsonRpcHandler;
        req.send(JSON.stringify(reqArray));
        requests[jsonRpcId] = method;
        jsonRpcId++;
    } else{
        console.log("Cannot make a JsonRpc call: request object not found");
    }
}

function jsonRpcHandler() {
    var i;
    try {
    // "complete"
    if (req.readyState == 4) {
        // "OK"
        if (req.status == 200) {
            //console.log(req.responseText);//return;
            responseObject = JSON.parse(req.responseText);
            if(typeof(responseObject['id']) != 'undefined') {
                var jsonRpcError = typeof(responseObject['error']) != 'undefined';
                if(jsonRpcError) {
                    console.log("Error " + responseObject['error']['code'] + ": " + responseObject['error']['message']);
                    showMessage(responseObject['error']['message']);
                } else if(typeof(responseObject['result']) != 'undefined') {
                    var result = responseObject['result'];
                    //console.log(result);
                    switch(requests[responseObject['id']]) {
                        case 'getPosts':
                            app.posts = result['posts'];
                            app.newPosts = result['newPosts'];
                            app.popularPosts = result['popularPosts'];
                            app.pages = generatePagination(result['pageCurrent'], result['pageCount']);
                            app.showPaginator = true;
                            app.loading = false;
                            app.init = true;
                            break;
                        case 'getPost':
                            app.posts = result['posts'];
                            app.newPosts = result['newPosts'];
                            app.popularPosts = result['popularPosts'];
                            app.showPaginator = false;
                            app.loading = false;
                            break;
                        case 'post':
                            app.pageType = "main";
                            app.posts = result['posts'];
                            app.newPosts = result['newPosts'];
                            app.popularPosts = result['popularPosts'];
                            app.pages = generatePagination(result['pageCurrent'], result['pageCount']);
                            app.showPaginator = true;
                            app.loading = false;
                            app.init = true;
                            break;
                        case 'getToken':
                            //console.log(responseObject);
                            config['token'] = result['token'];
                            setCookie('token', result['token'], 365);
                            header.isAuth = true;
                            app.pageType = "write";
                            app.loading = false;
                            break;
                        case 'rate':
                            app.posts.forEach(function(item, index) {
                                if(item.id == responseObject['result']['post_id']) {
                                    app.posts[index].likes = responseObject['result']['likes'];
                                    app.posts[index].dislikes = responseObject['result']['dislikes'];
                                }
                            });
                            break;
                        case 'registration':
                            app.loading = false;
                            if(result) {
                                showMessage("Вы зарегистрированы, можете войти в аккаунт.");
                            } else{
                                showMessage("Произошла ошибка при регистрации!");
                            }
                            break;
                    }
                }
                //reqParams = {};
                app.loading = false;
            }
        } else {
            alert("Error: " +  req.statusText);
        }
    }
}
    catch( e ) {
        alert('Error: ' + e.description);
    }
}

function generatePagination(pageCurrent, pageCount) {
    var result = [], pages = [];
    var temp;
    var classActive = 'w3-button w3-theme-action w3-hover-theme';
    var classInactive = 'w3-button w3-theme w3-hover-theme';
    var classEmpty = 'w3-button w3-theme-l5';

    var i, last = 1;
    for(i = 1; i <= pageCount; i++) {
        if(i > 1 && Math.abs(i-pageCurrent) > 1 && (pageCount-i) > 0) {
            continue;
        }

        if(i-last > 1) {
            pages.push([0,0]);
        }

        temp = (pageCurrent == i) ? [i,0] : [i,1];
        pages.push(temp);

        last = i;
    }

    for(i = 0; i < pages.length; i++) {
        if(pages[i][0]) {
            temp = pages[i][1] ? classActive : classInactive;
            result.push({id: pages[i][0], text: pages[i][0], class: temp});
        } else{
            result.push({id: -i, text: '...', class: classEmpty});
        }
    }

    return result;
}

function clickHandler(evt) {
    // Event tweaks, since IE wants to go its own way...
    var event = evt || window.event;
    var target = event.target || event.srcElement;

    //console.log(target.tagName+' '+target.dataset.type);
    var el, dataType = target.dataset.type;
    if(dataType) {
        app.loading = true;

        switch(dataType) {
            case 'page':
                app.pageType = "main";
                var newPage = target.dataset.page;
                config['current_page'] = newPage;
                jsonRpcCall("getPosts", {from: (newPage-1)*config['per_page'], amount: config['per_page'], user_id: config['current_author']});
                break;
            case 'author':
                app.pageType = "main";
                var authorId = target.dataset.authorId, newPage = 1;
                config['current_author'] = authorId;
                config['current_page'] = newPage;
                jsonRpcCall("getPosts", {from: (newPage-1)*config['per_page'], amount: config['per_page'], user_id: config['current_author']});
                break;
            case 'post':
                app.pageType = "main";
                var postId = target.dataset.postId;
                jsonRpcCall("getPost", {post_id: postId});
                break;
            case 'navigation':
                app.pageType = target.dataset.to;
                app.loading = false;
                break;
            case 'changeTheme':
                var obj = document.getElementById('theme');
                obj.href = 'css/w3-theme-' + target.dataset.theme + '.css';
                app.loading = false;
                break;
            case 'registration':
                var login = document.getElementById('login'), email = document.getElementById('email'),
                    password = document.getElementById('password'),
                    password_repeat = document.getElementById('password_repeat'),
                    email = document.getElementById('email');
                if(password.value != password_repeat.value) {
                    showMessage("Пароли не совпадают!");
                    app.loading = false;
                } else{
                    jsonRpcCall("registration", {login: login.value, password: password.value, email: email.value});
                }
                break;
            case 'login':
                var login = document.getElementById('login'), password = document.getElementById('password');
                jsonRpcCall("getToken", {nick: login.value, password: password.value});
                break;
            case 'logout':
                setCookie('token', "", -1);
                config['token'] = null;
                header.isAuth = false;
                app.loading = false;
                break;

            case 'like':
                var postId = target.dataset.postId;
                if(config['token']) {
                    jsonRpcCall("rate", {token: config['token'], post_id: postId, rate: 1});
                } else{
                    app.loading = false;
                }
                break;
            case 'dislike':
                var postId = target.dataset.postId;
                if(config['token']) {
                    jsonRpcCall("rate", {token: config['token'], post_id: postId, rate: -1});
                } else{
                    app.loading = false;
                }
                break;
            case 'write':
                var post = document.getElementById('post'),
                    title = document.getElementById('post_title');
                jsonRpcCall("post", {text: post.value, title: title.value, token: config['token']});
                break;

            default: console.log('UNKNOWN: '+dataType); break;
        }

        //loadXMLDoc("test.py?t="+dataType, dataType);
    }
}

function bindEvents() {
    //document.getElementById('app').onclick = clickHandler;
    document.getElementById('body').addEventListener('click', clickHandler, false);
}

var date = new Date();
app.year = date.getFullYear();
var v_token;
if(t_token = getCookie('token')) {
    config['token'] = t_token;
    header.isAuth = true;
}
bindEvents();
jsonRpcCall("getPosts", {from: 0, amount: config['per_page'], user_id: 0});
