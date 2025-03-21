import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { UserData } from "@/components/userData";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Get user initials for avatar
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

interface UserMenuProps extends UserData {
  handleLogout: () => void;
}

export function UserMenu({
  name,
  email,
  role,
  avatarUrl,
  handleLogout,
}: UserMenuProps) {
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userInitials = getInitials(name);

  const DEFAULT_AVATAR =
    "https://ui-avatars.com/api?background=0D8ABC&color=fff";
  avatarUrl = avatarUrl || `${DEFAULT_AVATAR}&name=${userInitials}`;

  const profileImage = (
    <Image
      loader={() => avatarUrl}
      src={avatarUrl}
      alt={name}
      className="w-full h-full object-cover"
      width={32}
      height={32}
    />
  );

  return (
    <div className="relative" ref={userMenuRef}>
      <button
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        aria-expanded={isUserMenuOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
          {profileImage}
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden mr-3">
                {profileImage}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">{email}</p>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {role}
              </span>
            </div>
          </div>

          <div className="py-1">
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsUserMenuOpen(false)}
            >
              <User className="h-4 w-4 mr-2 text-gray-500" />
              Your Profile
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsUserMenuOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2 text-gray-500" />
              Settings
            </Link>
          </div>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
