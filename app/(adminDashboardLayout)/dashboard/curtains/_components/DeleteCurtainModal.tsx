"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { ICurtain, useDeleteCurtainMutation } from "@/lib/feature/curtain/curtainApi";

interface DeleteCurtainModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabric: ICurtain | null;
  onSuccess?: () => void;
}

export default function DeleteCurtainModal({
  isOpen,
  onClose,
  fabric,
  onSuccess,
}: DeleteCurtainModalProps) {
  const [deleteCurtain, { isLoading }] = useDeleteCurtainMutation();

  if (!isOpen || !fabric) return null;

  const handleDelete = async () => {
    const idToDelete = fabric._id || fabric.id || "";
    const toastId = toast.loading(`Removing "${fabric.name}"...`);

    try {
      const res = await deleteCurtain(idToDelete).unwrap();
      toast.success(res?.message || `"${fabric.name}" removed from catalog!`, {
        id: toastId,
      });
      onClose();
      onSuccess?.();
    } catch (err: any) {
      console.error("Delete fabric error:", err);
      toast.error(
        err?.data?.message || err?.message || "Failed to remove fabric.",
        { id: toastId }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 font-['Urbanist',sans-serif]">
      <div className="bg-white rounded-none border border-gray-200 shadow-2xl max-w-md w-full overflow-hidden p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-none bg-red-100 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-none hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-base text-gray-900">
            Delete {fabric.name}?
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Are you sure you want to delete this curtain fabric? It will be removed
            from the active catalog and customer AI visualizer. This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-none hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-none transition-colors disabled:opacity-50"
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Delete Fabric</span>
          </button>
        </div>
      </div>
    </div>
  );
}
