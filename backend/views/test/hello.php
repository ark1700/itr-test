<?php

/* @var $this yii\web\View */
/* @var $message string */
$post = new app\models\Post();
use yii\helpers\Html;

$this->title = 'Моя первая страница';
?>
<div class="site-hello">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        Это представление для страницы "hello".
    </p>

    <code><?= __FILE__ ?></code>

    <div class="alert alert-success">
        <?= Html::encode($message) ?>
    </div>
</div>
