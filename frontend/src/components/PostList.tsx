import type { Post } from '../types/post';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    if (!posts.length) {
      return (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Постов пока нет. Создайте первый!</p>
          </CardContent>
        </Card>
      );
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <Card key={post.id}>
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>
                            Опубликовано: {new Date(post.created_at * 1000).toLocaleString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm whitespace-pre-wrap">{post.body}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default PostList;
