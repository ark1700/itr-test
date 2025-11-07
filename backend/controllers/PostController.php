<?php

namespace app\controllers;

use app\models\Post;
use app\services\PostService;
use yii\rest\Controller;
use yii\web\NotFoundHttpException;
use yii\web\Response;

/**
 * PostController implements REST API for Post model.
 */
class PostController extends Controller
{
    private PostService $postService;

    /**
     * Constructor with dependency injection
     */
    public function __construct($id, $module, PostService $postService, $config = [])
    {
        $this->postService = $postService;
        parent::__construct($id, $module, $config);
    }

    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Настройка CORS для REST API
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Credentials' => false,
                'Access-Control-Max-Age' => 3600,
            ],
        ];

        return $behaviors;
    }

    /**
     * Lists all Post models (REST API).
     * GET /posts?sort=random|oldest_first|newest_first
     * @return Post[]
     */
    public function actionIndex()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;

        $sort = \Yii::$app->request->get('sort', 'random');
        return $this->postService->getPosts($sort);
    }

    /**
     * Creates a new Post model (REST API).
     * POST /posts
     * @return Post|array
     */
    public function actionCreate()
    {
        \Yii::$app->response->format = Response::FORMAT_JSON;

        $data = \Yii::$app->request->getBodyParams();

        try {
            $post = $this->postService->createPost($data);
            \Yii::$app->response->setStatusCode(201);
            return $post;
        } catch (\yii\base\InvalidConfigException $e) {
            \Yii::$app->response->setStatusCode(422);
            return [
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->getMessage(),
            ];
        } catch (\Exception $e) {
            \Yii::$app->response->setStatusCode(500);
            return [
                'success' => false,
                'message' => 'Server error',
                'errors' => $e->getMessage(),
            ];
        }
    }

}
