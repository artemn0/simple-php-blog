<?php

use Datto\JsonRpc\Evaluator;
use Datto\JsonRpc\Exceptions\ApplicationException;
use Datto\JsonRpc\Exceptions\MethodException;
use Datto\JsonRpc\Exceptions\ArgumentException;
use Datto\JsonRpc\Exceptions\ImplementationException;

use \RedBeanPHP\R as R;
use Respect\Validation\Validator as v;

class Api implements Evaluator {

    const STATUS_INVALID_TOKEN = 1;
    const STATUS_INCORRECT_AUTH_INFO = 2;
    const STATUS_GENERAL_ERROR = 3;
    const STATUS_NOT_FOUND = 4;
    const STATUS_INCORRECT_ARGUMENTS = -32602;

    public function evaluate($method, $params) {
        if(method_exists($this, "_$method")) {
            return call_user_func([$this, "_$method"], $params);
        } else{
            throw new MethodException();
        }
    }

    private function _getToken($params) {
        $validator = v::keySet(
            v::key('nick', v::stringType()->length(3, 20, true)),
            v::key('password', v::stringType()->length(8, 20, true))
        );

        if($validator->validate($params)) {
            $obj = R::findOne('user', 'nick = ?', [$params['nick']]);
            if($obj) {
                if(checkPasswordHash($params['password'], $obj->password)) {
                    $apiToken = R::dispense('token');
                    $apiToken->user = $obj;
                    $apiToken->token = generateToken();
                    $apiToken->created = date("Y-m-d H:i:s");
                    R::store($apiToken);
                    return $apiToken;
                } else{
                    throw new ApplicationException("Неправильный логин или пароль!", self::STATUS_INCORRECT_AUTH_INFO);
                }
            } else{
                throw new ApplicationException("Неправильный логин или пароль!", self::STATUS_INCORRECT_AUTH_INFO);
            }
        } else{
            throw new ApplicationException("Некорректный ввод, проверьте правильность заполнения полей!", self::STATUS_INCORRECT_ARGUMENTS);
        }
    }

    private function _getPosts($params) {
        $validator = v::keySet(
            v::key('from', v::intVal()->min(0, true)),
            v::key('amount', v::intVal()->min(1, true)->max(100, true)),
            v::key('user_id', v::intVal()->min(0, true))
        );
        $result = [];

        if($validator->validate($params)) {
            if($params['user_id']) {
                $data = R::getAll('SELECT post.*, user.id as authorId, user.nick as authorNick FROM post, user WHERE post.user_id = ? AND user.id = post.user_id
                    ORDER BY id DESC LIMIT ?,?', [$params['user_id'], $params['from'], $params['amount']]);
            } else{
                $data = R::getAll('SELECT post.*, user.id as authorId, user.nick as authorNick FROM post, user WHERE user.id = post.user_id
                    ORDER BY id DESC LIMIT ?,?', [$params['from'], $params['amount']]);
            }
            if($data) {
                $keys = $keyToId = $idToKey = [];
                foreach($data as $key=>$value) {
                    $keys[] = $value['id'];
                    $keyToId[$key] = $value['id'];
                    $idToKey[$value['id']] = $key;
                    $data[$key]['likes'] = 0;
                    $data[$key]['dislikes'] = 0;
                    $data[$key]['readMore'] = true;
                    $data[$key]['text'] = implode("\n", array_slice(explode("\n", $data[$key]['text']), 0, 6));
                }

                $in = str_repeat('?,', count($keys)-1).'?';
                $likeInfo = R::getAll("SELECT post_id, count(1) as likes, -1 as dislikes FROM `like` WHERE plus = 1 AND post_id IN($in) GROUP BY post_id
UNION
SELECT post_id, -1, count(1) as dislikes FROM `like` WHERE plus = 0 AND post_id IN($in) GROUP BY post_id", array_merge($keys, $keys));

                //var_dump($data);var_dump($idToKey);var_dump($likeInfo);die;
                foreach($likeInfo as $var) {
                    if($var['post_id']) {
                        if($var['likes'] != -1) {
                            $data[$idToKey[$var['post_id']]]['likes'] = $var['likes'];
                        } else{
                            $data[$idToKey[$var['post_id']]]['dislikes'] = $var['dislikes'];
                        }
                    }
                }
            }

            $result['posts'] = $data;
            $result['newPosts'] = R::getAll("SELECT post.*, user.id as authorId, user.nick as authorNick FROM post, user WHERE post.user_id = user.id ORDER BY id DESC LIMIT 3;");
            $count = R::count('post');
            $result['pageCount'] = ceil($count/$params['amount']);
            $result['pageCurrent'] = ceil($params['from']/$params['amount'])+1;
            $result['popularPosts'] = R::getAll("SELECT post.*, user.id as authorId, user.nick as authorNick, sum(`like`.plus) as likes FROM post, `like`, user
WHERE `like`.post_id = post.id AND user.id = post.user_id GROUP BY `like`.post_id ORDER BY SUM(`like`.plus) DESC LIMIT 3");

            $result = formatResult($result);
            return $result;
        } else{
            throw new ApplicationException("Некорректный ввод, проверьте правильность заполнения полей!", self::STATUS_INCORRECT_ARGUMENTS);
        }
    }

    private function _getPost($params) {
        $validator = v::keySet(
            v::key('post_id', v::intVal()->min(1, true))
        );
        $result = [];

        if($validator->validate($params)) {
            $data = R::getAll('SELECT post.*, user.id as authorId, user.nick as authorNick, 0 as likes, 0 as dislikes FROM post, user WHERE post.id = ? AND user.id = post.user_id',
                [$params['post_id']]);

            if($data) {
                foreach($data as $key=>$value) {
                    $data[$key]['likes'] = 0;
                    $data[$key]['dislikes'] = 0;
                    $data[$key]['readMore'] = false;
                }
                
                $likeInfo = R::getAll("SELECT count(1) as likes, -1 as dislikes FROM `like` WHERE plus = 1 AND post_id = ?
    UNION
    SELECT -1, count(1) as dislikes FROM `like` WHERE plus = 0 AND post_id = ? GROUP BY post_id", [$params['post_id'], $params['post_id']]);
                foreach($likeInfo as $var) {
                    if($var['likes'] != -1) {
                        $data[0]['likes'] = $var['likes'];
                    } else{
                        $data[0]['dislikes'] = $var['dislikes'];
                    }
                }
            }
            $result['posts'] = $data;

            $result['newPosts'] = R::getAll("SELECT post.*, user.id as authorId, user.nick as authorNick FROM post, user WHERE post.user_id = user.id ORDER BY id DESC LIMIT 3;");
            $result['popularPosts'] = R::getAll("SELECT post.*, user.id as authorId, user.nick as authorNick, sum(`like`.plus) as likes FROM post, `like`, user
WHERE `like`.post_id = post.id AND user.id = post.user_id GROUP BY `like`.post_id ORDER BY SUM(`like`.plus) DESC LIMIT 3");

            $result = formatResult($result);
            return $result;
        } else{
            throw new ApplicationException("Некорректный ввод, проверьте правильность заполнения полей!", self::STATUS_INCORRECT_ARGUMENTS);
        }
    }

    private function _post($params) {
        $validator = v::keySet(
            v::key('token', v::stringType()->length(32, 32, true)),
            v::key('title', v::stringType()->length(5, 200, true)),
            v::key('text', v::stringType()->length(50, 20000, true))
        );

        if($validator->validate($params)) {
            $token = R::findOne('token', 'token = ?', [$params['token']]);
            if($token) {
                $post = R::dispense('post');
                $post->user_id = $token->user_id;
                $post->title = $params['title'];
                $post->text = $params['text'];
                $post->created = date("Y-m-d H:i:s");
                $postId = R::store($post);

                return $this->_getPosts(['from'=>0, 'amount'=>10, 'user_id'=>0]);
            } else{
                throw new ApplicationException("Недействительный токен!", self::STATUS_INVALID_TOKEN);
            }
        } else{
            throw new ApplicationException("Некорректный ввод, проверьте правильность заполнения полей!", self::STATUS_INCORRECT_ARGUMENTS);
        }
    }

    private function _registration($params) {
        $validator = v::keySet(
            v::key('login', v::stringType()->length(5, 15, true)),
            v::key('email', v::email()),
            v::key('password', v::stringType()->length(8, 20, true))
        );

        if($validator->validate($params)) {
            $data = R::findOne('user', 'nick = ? OR email = ?', [$params['login'], $params['email']]);
            if($data) {
                throw new ApplicationException("Логин или email уже используются!", self::STATUS_GENERAL_ERROR);
            }

            $user = R::dispense('user');
            $user->nick = $params['login'];
            $user->email = $params['email'];
            $user->password = generatePasswordHash($params['password']);
            $user->created = date("Y-m-d H:i:s");
            $userId = R::store($user);
            return $userId ? true : false;
        } else{
            throw new ApplicationException("Некорректный ввод, проверьте правильность заполнения полей!", self::STATUS_INCORRECT_ARGUMENTS);
        }
    }

    private function _rate($params) {
        $validator = v::keySet(
            v::key('token', v::stringType()->length(32, 32, true)),
            v::key('post_id', v::intVal()->min(1, true)),
            v::key('rate', v::intVal()->between(-1, 1))
        );

        if($validator->validate($params)) {
            $token = R::findOne('token', 'token = ?', [$params['token']]);
            if($token) {
                $post = R::load('post', $params['post_id']);
                if(!$post->id) {
                    throw new ApplicationException("Пост не найден!", self::STATUS_NOT_FOUND);
                }

                $rate = R::findOne('like', 'post_id = ? AND user_id = ?', [$params['post_id'], $token->user_id]);
                if(isset($rate->id) && $rate->id) {
                    if($params['rate']) {
                        $rate->plus = ($params['rate'] == 1) ? 1 : 0;
                        R::store($rate);
                    } else{
                        R::trash($rate);
                    }
                } else{
                    if($params['rate']) {
                        $like = R::dispense('like');
                        $like->user_id = $token->user_id;
                        $like->post_id = $params['post_id'];
                        $like->plus = ($params['rate'] == 1) ? 1 : 0;;
                        R::store($like);
                    }
                }

                $likeInfo = R::getAll("SELECT count(1) as likes, -1 as dislikes FROM `like` WHERE plus = 1 AND post_id = ?
    UNION
    SELECT -1, count(1) as dislikes FROM `like` WHERE plus = 0 AND post_id = ? GROUP BY post_id", [$params['post_id'], $params['post_id']]);
                $result = ['post_id'=>$params['post_id'], 'likes'=>0, 'dislikes'=>0];
                foreach($likeInfo as $var) {
                    if($var['likes'] != -1) {
                        $result['likes'] = $var['likes'];
                    } else{
                        $result['dislikes'] = $var['dislikes'];
                    }
                }
                return $result;
            } else{
                throw new ApplicationException("Недействительный токен!", self::STATUS_INVALID_TOKEN);
            }
        } else{
            throw new ApplicationException("Некорректный ввод, проверьте правильность заполнения полей!", self::STATUS_INCORRECT_ARGUMENTS);
        }
    }

}
