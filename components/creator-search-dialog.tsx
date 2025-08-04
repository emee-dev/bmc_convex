import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounced";
import { usePaginatedQuery } from "convex/react";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface CreatorSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatorSearchDialog = ({
  open,
  onOpenChange,
}: CreatorSearchDialogProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  const {
    isLoading,
    status,
    loadMore,
    results: creators,
  } = usePaginatedQuery(
    api.template.searchCreators,
    debouncedQuery ? { query: debouncedQuery } : "skip",
    { initialNumItems: 10 }
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0">
        <DialogHeader className="p-6 sr-only pb-4 border-b border-border">
          <DialogTitle>Search creator dialog</DialogTitle>
        </DialogHeader>

        <div className="p-2 pb-4 border-b border-border">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search creators by Fullname, Twitter or Github"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
          </div>
        </div>

        <div className="p-6 pt-4">
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
            {creators.map((creator, index) => (
              <Link href={`/donate/${creator.id}`} key={creator.id}>
                <div className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="text-sm text-muted-foreground font-medium w-6">
                    #{index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      alt={creator.first_name || "creator image"}
                      src={`https://robohash.org/${creator.first_name}.png`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm">
                      {creator.first_name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {creator.description?.slice(0, 80)}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">
                    {creator.supporters.toLocaleString()} supporters
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {creators.length === 0 && query && (
            <div className="text-center py-8 text-muted-foreground">
              No creators found matching "{query}"
            </div>
          )}

          {creators.length === 0 && !query && (
            <div className="text-center py-8 text-muted-foreground">
              No creators found at this moment
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatorSearchDialog;
