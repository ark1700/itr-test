import { useState } from 'react';
import type { FormEvent } from 'react';
import { createPost } from '../api/posts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface PostFormProps {
    onPostCreated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Заголовок и текст не могут быть пустыми!');
            return;
        }

        setIsSubmitting(true);
        try {
            await createPost({ title, content });
            setTitle('');
            setContent('');
            onPostCreated();
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('Не удалось создать пост.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Создать новый пост</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Заголовок поста"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Что у вас нового?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isSubmitting}
                            className="min-h-[100px]"
                        />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="block w-full sm:w-fit ml-auto">
                        {isSubmitting ? 'Публикация...' : 'Опубликовать'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default PostForm;
