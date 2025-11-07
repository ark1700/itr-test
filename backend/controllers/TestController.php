<?php

namespace app\controllers;

use yii\web\Controller;

class TestController extends Controller
{
    /**
     * Displays hello page.
     *
     * @return string
     */
    public function actionHello()
    {
        return $this->render('hello', [
            'message' => 'Привет из контроллера!'
        ]);
    }
}
