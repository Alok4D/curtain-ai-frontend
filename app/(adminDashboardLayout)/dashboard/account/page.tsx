
import { ChangePassword, ProfileInfo } from "./_components/SettingsSections";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="space-y-2 border-b border-gray-900 pb-8">
          <h1 className="text-white text-3xl font-medium tracking-tight">Account Settings</h1>
          <p className="text-gray-400 text-md">Manage your profile and subscription</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <ProfileInfo />
          <ChangePassword />
        </div>

      </div>
    </div>
  );
}