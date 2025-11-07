import type { SortOption } from '../types/post';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SortOptionsProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ currentSort, onSortChange }) => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Сортировка:</span>
            <Select value={currentSort} onValueChange={(value) => onSortChange(value as SortOption)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="random">Случайно</SelectItem>
                    <SelectItem value="oldest_first">Сначала старые</SelectItem>
                    <SelectItem value="newest_first">Сначала новые</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortOptions;
