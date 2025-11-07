<?php

namespace app\services;

use app\models\Post;
use yii\base\InvalidConfigException;

/**
 * Сервис для работы с постами
 * Содержит бизнес-логику, которая не должна находиться в контроллере
 */
class PostService
{
    /**
     * Получить посты с учетом сортировки
     *
     * @param string $sortType Тип сортировки: random, oldest_first, newest_first
     * @return Post[] Массив постов
     */
    public function getPosts(string $sortType = 'random'): array
    {
        $query = Post::find();

        switch ($sortType) {
            case 'random':
                $query->orderBy('RAND()');
                break;

            case 'oldest_first':
                $query->orderBy(['created_at' => SORT_ASC]);
                break;

            default:
                $query->orderBy('RAND()');
        }

        return $query->all();
    }

    /**
     * Создать новый пост
     *
     * @param array $data Данные поста (title, body)
     * @return Post Созданный пост
     * @throws InvalidConfigException Если не удалось сохранить пост
     */
    public function createPost(array $data): Post
    {
        $post = new Post();

        // Используем load() для загрузки данных
        $post->load($data, '');

        // Явная валидация
        if (!$post->validate()) {
            throw new InvalidConfigException('Ошибка валидации: ' . json_encode($post->errors));
        }

        if (!$post->save(false)) { // false - пропускаем повторную валидацию
            throw new InvalidConfigException('Не удалось сохранить пост');
        }

        return $post;
    }
}
