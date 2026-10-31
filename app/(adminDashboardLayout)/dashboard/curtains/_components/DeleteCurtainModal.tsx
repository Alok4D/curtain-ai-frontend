"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { ICurtain, useDeleteCurtainMutation } from "@/lib/feature/curtain/curtainApi";

interface DeleteCurtainModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabric: ICurtain | null;
}

export default function DeleteCurtainModal({
  isOpen,
  onClose,
  fabric,
}: DeleteCurtainModalProps) {
  const [deleteCurtain, { isLoading }] = useDeleteCurtainMutation();

  if (!isOpen || !fabric) return null;

  const handleDelete = async () => {
    const idToDelete = fabric._id || fabric.id;
    const toastId = toast.loading(`Removing "${fabric.name}"...`);

    try {
      const res = await deleteCurtain(idToDelete).unwrap();
      toast.success(res?.message || `"${fabric.name}" removed from catalog!`, {
        id: toastId,
      });
      onClose();
    } catch (err: any) {
      console.error("Delete fabric error:", err);
      toast.error(
        err?.data?.message || err?.message || "Failed to remove fabric.",
        { id: toastId }
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-xs z-50 flex items-center justify-center p-4 font-['Urbanist',sans-serif]">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between pb-3">
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2">
          <h3 className="text-lg font-bold text-gray-900">
            Remove Fabric from Catalog?
          </h3>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
            Are you sure you want to remove <span className="font-semibold text-gray-800">&quot;{fabric.name}&quot;</span>? This will archive the fabric and hide it from the AI Visualizer and customer storefront.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-5 mt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Removing...</span>
              </>
            ) : (
              <span>Delete Fabric</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

