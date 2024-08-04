import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Author, Category, Tag } from "@/lib/types";

type FilterProps = {
  categories: Category[];
  authors: Author[];
  tags: Tag[];
  onFilterChange: (type: string, value: string) => void;
  onResetFilters: () => void;
  selectedFilters: {
    category: string;
    author: string;
    tag: string;
  };
};

export function Filter({
  categories,
  authors,
  tags,
  onFilterChange,
  onResetFilters,
  selectedFilters,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <Select
        onValueChange={(value) => onFilterChange("category", value)}
        value={selectedFilters.category || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => onFilterChange("author", value)}
        value={selectedFilters.author || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Author" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Authors</SelectItem>
          {authors.map((author) => (
            <SelectItem key={author.id} value={author.slug}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => onFilterChange("tag", value)}
        value={selectedFilters.tag || "all"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tags</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.slug}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={onResetFilters} variant="outline">
        Reset Filters
      </Button>
    </div>
  );
}
