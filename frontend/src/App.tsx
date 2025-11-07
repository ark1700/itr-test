import { useState, useEffect, useCallback } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import SortOptions from './components/SortOptions';
import { fetchPosts } from './api/posts';
import type { Post, SortOption } from './types/post';

function App() {
    const [posts, setPosts] = useState<Post[]>([]);

    // Инициализация состояния сортировки из URL
    const getInitialSort = (): SortOption => {
        const params = new URLSearchParams(window.location.search);
        const sortParam = params.get('sort') as SortOption;
        const validSorts: SortOption[] = ['random', 'oldest_first', 'newest_first'];
        return validSorts.includes(sortParam) ? sortParam : 'random';
    };

    const [sort, setSort] = useState<SortOption>(getInitialSort());

    const loadPosts = useCallback(async () => {
        try {
            const data = await fetchPosts(sort);
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            alert('Не удалось загрузить посты.');
        }
    }, [sort]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    // Синхронизация URL при изменении сортировки
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('sort', sort);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
    }, [sort]);

    // Обработка изменений URL (кнопки назад/вперед)
    useEffect(() => {
        const handlePopState = () => {
            const newSort = getInitialSort();
            setSort(newSort);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl font-bold text-center bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-5">
                        Лента постов
                    </h1>
                <main className="space-y-6">
                    <PostForm onPostCreated={loadPosts} />

                    <div className="flex justify-between items-center gap-5 flex-col sm:flex-row">
                        <h2 className="text-2xl font-semibold">Посты</h2>
                        <SortOptions currentSort={sort} onSortChange={setSort} />
                    </div>

                    <PostList posts={posts} />
                </main>
            </div>
        </div>
    );
}

export default App;
