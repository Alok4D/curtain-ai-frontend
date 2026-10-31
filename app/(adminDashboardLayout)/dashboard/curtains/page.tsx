"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  ICurtain,
  useGetAllCurtainsQuery,
  useSeedCurtainsMutation,
} from "@/lib/feature/curtain/curtainApi";

// Modular Components
import CurtainsHeader from "./_components/CurtainsHeader";
import CurtainFilters from "./_components/CurtainFilters";
import CurtainCard from "./_components/CurtainCard";
import CurtainGridSkeleton from "./_components/CurtainGridSkeleton";
import DeleteCurtainModal from "./_components/DeleteCurtainModal";
import EmptyCurtainsState from "./_components/EmptyCurtainsState";

export default function CurtainManagementPage() {
  // Query state
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingFabric, setDeletingFabric] = useState<ICurtain | null>(null);

  // RTK Query hooks
  const { data: curtainsResponse, isLoading, refetch } = useGetAllCurtainsQuery();
  const [seedCurtains, { isLoading: isSeeding }] = useSeedCurtainsMutation();

  const allFabrics: ICurtain[] = useMemo(() => {
    return curtainsResponse?.data || [];
  }, [curtainsResponse]);

  // Counts per category
  const counts = useMemo(() => {
    return {
      all: allFabrics.length,
      curtains: allFabrics.filter((f) => f.category === "curtains").length,
      sheers: allFabrics.filter((f) => f.category === "sheers").length,
      rollers: allFabrics.filter((f) => f.category === "rollers").length,
    };
  }, [allFabrics]);

  // Filtered list
  const filteredFabrics = useMemo(() => {
    return allFabrics.filter((fabric) => {
      const matchesTab = activeTab === "all" || fabric.category === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        fabric.name.toLowerCase().includes(q) ||
        fabric.material?.toLowerCase().includes(q) ||
        fabric.category.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [allFabrics, activeTab, searchQuery]);

  // Seed handler
  const handleSeedCatalog = async () => {
    const toastId = toast.loading("Populating catalog with default curtains...");
    try {
      const res = await seedCurtains().unwrap();
      toast.success(res.message || "Database seeded successfully!", { id: toastId });
      refetch();
    } catch (err: any) {
      console.error("Seed error:", err);
      toast.error(err?.data?.message || err?.message || "Failed to seed catalog.", { id: toastId });
    }
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (fabric: ICurtain) => {
    setDeletingFabric(fabric);
    setIsDeleteModalOpen(true);
  };

  // Show Skeleton while loading initial data
  if (isLoading) {
    return <CurtainGridSkeleton />;
  }

  const hasFilters = activeTab !== "all" || Boolean(searchQuery.trim());

  return (
    <div className="space-y-6 font-['Urbanist',sans-serif]">
      {/* 1. Header with Stats & Actions (Add New Fabric navigates to /dashboard/curtains/add-curtain) */}
      <CurtainsHeader
        onSeedCatalog={handleSeedCatalog}
        isSeeding={isSeeding}
        totalCount={allFabrics.length}
      />

      {/* 2. Category Filter Tabs & Search Bar */}
      <CurtainFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
      />

      {/* 3. Fabrics Grid */}
      {filteredFabrics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredFabrics.map((fabric) => (
            <CurtainCard
              key={fabric._id || fabric.id}
              fabric={fabric}
              onDelete={handleOpenDeleteModal}
            />
          ))}
        </div>
      ) : (
        /* 4. Empty State */
        <EmptyCurtainsState
          hasFilters={hasFilters}
          onClearFilters={() => {
            setActiveTab("all");
            setSearchQuery("");
          }}
          onSeedCatalog={handleSeedCatalog}
          isSeeding={isSeeding}
        />
      )}

      {/* 5. Delete Confirmation Modal */}
      <DeleteCurtainModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingFabric(null);
        }}
        fabric={deletingFabric}
      />
    </div>
  );
}
