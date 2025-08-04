import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

type Creator = {
  _id: Id<"users">;
  email: string;
  first_name: string;
};

type ProfileDropdownProps = {
  creator: Creator;
};

function getInitials(first_name: string): string {
  const parts = first_name.trim().split(/\s+/);

  const firstName = parts[0] || "";
  const lastName = parts[1] || "";

  const firstTwo = firstName.slice(0, 2);
  const secondTwo = lastName.slice(0, 2);

  return `${firstTwo}${secondTwo}`;
}

export function ProfileDropdown(props: ProfileDropdownProps) {
  const { signIn, signOut } = useAuthActions();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://robohash.org/${props.creator._id}.png`}
              alt="user profile"
            />
            <AvatarFallback>
              {getInitials(props.creator.first_name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {props.creator.first_name}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {props.creator?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/donate/${props.creator._id}`}>
            Your Page
            <DropdownMenuShortcut>
              <ExternalLink />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
